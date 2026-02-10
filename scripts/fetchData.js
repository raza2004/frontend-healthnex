import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Parser from "rss-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Updated API endpoints
const WHO_RSS_URL = "https://www.who.int/feeds/entity/csr/don/en/rss.xml";
const CDC_RSS_URL = "https://tools.cdc.gov/api/v2/resources/media/404952.rss";
const OPENFDA_API = "https://api.fda.gov/drug/event.json?search=patient.reaction.reactionmeddrapt.exact:";

// Fetch WHO outbreak data
async function fetchWHO() {
  console.log("Fetching WHO data...");
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(WHO_RSS_URL);
    const whoData = {};

    feed.items.forEach((item) => {
      const title = item.title.toLowerCase();
      const content = item.content?.toLowerCase() || "";
      const text = title + " " + content;

      const symptoms = ["fever", "cough", "headache", "rash", "nausea", "fatigue", "diarrhea"];
      
      symptoms.forEach(symptom => {
        if (text.includes(symptom)) {
          whoData[symptom] = whoData[symptom] || [];
          whoData[symptom].push({
            title: item.title,
            link: item.link,
            date: item.pubDate
          });
        }
      });
    });

    return whoData;
  } catch (error) {
    console.error("Error fetching WHO data:", error.message);
    return {};
  }
}

// Fetch CDC health alerts
async function fetchCDC() {
  console.log("Fetching CDC data...");
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(CDC_RSS_URL);
    const cdcData = {};

    feed.items.forEach((item) => {
      const title = item.title.toLowerCase();
      const symptoms = ["fever", "cough", "headache"];
      
      symptoms.forEach(symptom => {
        if (title.includes(symptom)) {
          cdcData[symptom] = cdcData[symptom] || [];
          cdcData[symptom].push({
            title: item.title,
            link: item.link,
            date: item.pubDate
          });
        }
      });
    });

    return cdcData;
  } catch (error) {
    console.error("Error fetching CDC data:", error.message);
    return {};
  }
}

// Fetch adverse event data from OpenFDA (no API key needed)
async function fetchAdverseEvents() {
  console.log("Fetching adverse event data...");
  try {
    const symptoms = ["headache", "nausea", "dizziness"];
    const adverseData = {};
    
    for (const symptom of symptoms) {
      const response = await axios.get(`${OPENFDA_API}"${symptom}"&limit=5`);
      adverseData[symptom] = response.data.results.map(event => ({
        drug: event.patient.drug[0]?.medicinalproduct,
        date: event.receiveDate,
        reportId: event.safetyreportid
      }));
    }
    
    return adverseData;
  } catch (error) {
    console.error("Error fetching adverse event data:", error.message);
    return {};
  }
}

async function mergeData() {
  const [whoData, cdcData, adverseEvents] = await Promise.all([
    fetchWHO(),
    fetchCDC(),
    fetchAdverseEvents()
  ]);

  const merged = {
    sources: {
      who: Object.keys(whoData).length > 0,
      cdc: Object.keys(cdcData).length > 0,
      openfda: Object.keys(adverseEvents).length > 0
    },
    data: {
      ...whoData,
      ...cdcData,
      ...adverseEvents
    },
    lastUpdated: new Date().toISOString()
  };

  const filePath = path.join(__dirname, "../data/symptomMap.json");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
  console.log(`symptomMap.json updated at: ${filePath}`);
}

mergeData().catch(console.error);