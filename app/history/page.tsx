"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type HistoryItem = {
  disease?: string;
  city?: string;
  symptoms?: string;
  at?: string;
};

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/history", { method: "GET" });
        const data = await res.json().catch(() => ({}));

        console.log("History API Response:", data); // Debug log

        if (!res.ok) {
          setErr(data?.error || "Failed to load history");
          return;
        }

        setItems(Array.isArray(data.history) ? data.history : []);
      } catch (error) {
        console.error("History fetch error:", error); // Debug log
        setErr("Network error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block mb-3 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-2 border border-[#0DAB83]/20">
              <span className="text-sm font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                📋 Your Medical Records
              </span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Search History
            </h1>

            <p className="text-gray-600">
              View your previous symptom checks and diagnoses
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0DAB83] border-r-transparent"></div>
              <p className="text-gray-700 mt-4">Loading your history...</p>
            </div>
          )}

          {/* Error State */}
          {err && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-semibold">{err}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !err && items.length === 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No History Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Your symptom check history will appear here once you start using the checker.
              </p>
              
              <a
                href="/disease-checker"
                className="inline-block rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Check Symptoms Now
              </a>
            </div>
          )}

          {/* History Items */}
          {!loading && !err && items.length > 0 && (
            <div className="space-y-4">
              {items
                .slice()
                .reverse()
                .map((h, idx) => (
                  <div
                    key={idx}
                    className="group bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {h.disease || "Unknown Condition"}
                        </h3>
                        
                        {h.symptoms && (
                          <p className="text-gray-600 mb-3">
                            <span className="font-semibold text-gray-900">Symptoms:</span>{" "}
                            {h.symptoms}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm">
                          {h.city && (
                            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 text-gray-700 px-3 py-1 rounded-full font-medium">
                              📍 {h.city}
                            </span>
                          )}
                          
                          {h.at && (
                            <span className="text-gray-500">
                              🕐 {new Date(h.at).toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="ml-4">
                        <a
                          href={`/doctors?disease=${encodeURIComponent(h.disease || '')}&city=${encodeURIComponent(h.city || '')}`}
                          className="inline-block text-white bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200"
                        >
                          Find Doctors
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}