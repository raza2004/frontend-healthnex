import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// Example: Replace this URL with real open dataset API
const DATA_URL = "https://disease.sh/";

async function updateSymptomMap() {
  const res = await fetch(DATA_URL);
  const rawData = await res.json();
  console.log(rawData, "Fetched raw data");

  // Transform into { symptom: [diseases...] }
//   const map: Record<string, string[]> = {};
//   rawData.forEach((entry: any) => {
//     const symptom = entry.symptom.toLowerCase();
//     if (!map[symptom]) map[symptom] = [];
//     map[symptom].push(entry.disease);
//   });

//   const filePath = path.join(process.cwd(), "data", "symptomMap.json");
//   fs.writeFileSync(filePath, JSON.stringify(map, null, 2));
//   console.log(`✅ symptomMap.json updated with ${Object.keys(map).length} symptoms`);
}

updateSymptomMap().catch(console.error);
