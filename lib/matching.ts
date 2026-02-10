import symptomMapData from "../data/symptomMap.json";

const symptomMap: Record<string, string[]> = symptomMapData;

export function matchSymptoms(userSymptoms: string[]) {
  const results: Record<string, number> = {};

  userSymptoms.forEach(symptom => {
    const diseases = symptomMap[symptom.toLowerCase()] || [];
    diseases.forEach(disease => {
      results[disease] = (results[disease] || 0) + 1;
    });
  });

  return Object.entries(results)
    .map(([name, score]) => ({
      name,
      score: score / userSymptoms.length
    }))
    .sort((a, b) => b.score - a.score);
}
