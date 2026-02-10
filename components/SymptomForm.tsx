"use client";
import { useState } from "react";

export default function HomePage() {
  const [symptoms, setSymptoms] = useState<string[]>([""]);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const addSymptom = () => setSymptoms([...symptoms, ""]);
  const updateSymptom = (i: number, value: string) => {
    const updated = [...symptoms];
    updated[i] = value;
    setSymptoms(updated);
  };

  const search = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms })
    });
    const data = await res.json();
    setResults(data);
    setShowResults(true);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      {!showResults && (
        <>
          <h1 className="text-2xl font-bold mb-4">HealthNexus</h1>
          {symptoms.map((s, i) => (
            <input
              key={i}
              value={s}
              onChange={(e) => updateSymptom(i, e.target.value)}
              placeholder="Enter symptom"
              className="border p-2 mb-2 w-full"
            />
          ))}
          <button
            onClick={addSymptom}
            className="bg-blue-500 text-white px-4 py-2 mr-2"
          >
            Add More Symptoms
          </button>
          <button
            onClick={search}
            className="bg-green-500 text-white px-4 py-2"
          >
            Search
          </button>
        </>
      )}

      {showResults && (
        <>
          <h2 className="text-xl font-semibold mb-4">Possible Conditions</h2>
          <ul>
            {results.map((r, i) => (
              <li key={i} className="mb-4">
                <strong>{r.name}</strong> ({Math.round(r.score * 100)}%)
                <p>{r.explanation}</p>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowResults(false)}
            className="bg-gray-500 text-white px-4 py-2 mt-4"
          >
            Back to Symptoms
          </button>
        </>
      )}
    </div>
  );
}
