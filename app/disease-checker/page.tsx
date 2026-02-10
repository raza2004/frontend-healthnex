"use client";

import { useState } from "react";
import axios from "../../lib/axios";
import ResultCard from "@/components/ResultCard";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function DiseaseCheckerPage() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [predictedDisease, setPredictedDisease] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setPredictedDisease("");

    try {
      // Call Flask backend for prediction
      const res = await axios.post("/predict", { symptoms });
      setResult(res.data);

      if (res.data.ok && res.data.predicted_disease) {
        setPredictedDisease(res.data.predicted_disease);

        // ✅ Save to history using native fetch (for Next.js API routes)
        try {
          const historyRes = await fetch("/api/history", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              disease: res.data.predicted_disease,
              city: city || "Not specified",
              symptoms: symptoms,
            }),
          });

          if (historyRes.ok) {
            console.log("History saved successfully");
          } else {
            const errorData = await historyRes.json();
            console.error("Failed to save history:", errorData);
          }
        } catch (historyErr) {
          console.error("Failed to save history:", historyErr);
        }
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleFindDoctors = () => {
    // Navigate to doctors page with disease and city as query params
    const params = new URLSearchParams();
    if (predictedDisease) params.append("disease", predictedDisease);
    if (city) params.append("city", city);

    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block mb-3 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-2 border border-[#0DAB83]/20">
              <span className="text-sm font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                🤖 AI Powered Diagnosis
              </span>
            </div>

            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Symptom Checker
            </h2>

            <p className="text-gray-600">
              Describe your symptoms to receive AI-based health insights and
              nearby doctor recommendations.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Symptoms
            </label>
            <textarea
              rows={5}
              placeholder="e.g. fever, headache, sore throat..."
              className="w-full rounded-lg border-2 border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-[#0DAB83] focus:border-transparent mb-6 text-gray-900"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City (optional)
            </label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-full rounded-lg border-2 border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-[#117F9E] focus:border-transparent mb-6 text-gray-900"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              disabled={loading || !symptoms.trim()}
              className="w-full rounded-full cursor-pointer bg-gradient-to-r from-[#0DAB83] to-[#117F9E] py-4 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
            >
              {loading ? "Analyzing Symptoms..." : "Check Disease"}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-10 space-y-6">
              <ResultCard result={result} />

              {/* Find Doctors Button */}
              {predictedDisease && (
                <button
                  onClick={handleFindDoctors}
                  className="w-full rounded-full border-2 border-[#0DAB83] bg-white px-8 py-4 text-gray-800 font-semibold hover:bg-[#0DAB83]/10 hover:border-[#0DAB83] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  See Relevant Doctors →
                </button>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
