"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

type HistoryItem = {
  disease?: string;
  city?: string;
  symptoms?: string;
  severity?: string;
  description?: string;
  precautions?: string[];
  doctorAdvice?: string;
  at?: string;
  createdAt?: string;
};

function getDate(h: HistoryItem) {
  const raw = h.at || h.createdAt;
  const d = raw ? new Date(raw) : null;
  return d && !isNaN(d.getTime()) ? d : null;
}

function severityStyle(text?: string) {
  const t = (text || "").toLowerCase();
  if (/(severe|high|emergency|urgent|serious)/.test(t))
    return "bg-red-50 text-red-700 border-red-200";
  if (/(moderate|medium)/.test(t))
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/history", { method: "GET" });
        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          setErr(data?.error || "Failed to load history");
          return;
        }

        setItems(Array.isArray(data.history) ? data.history : []);
      } catch {
        setErr("Network error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Keep original index so expand state stays stable while filtering
  const entries = useMemo(
    () =>
      items
        .map((h, i) => ({ h, i }))
        .reverse()
        .filter(({ h }) => {
          const q = query.trim().toLowerCase();
          if (!q) return true;
          return [h.disease, h.city, h.symptoms]
            .filter(Boolean)
            .some((v) => v!.toLowerCase().includes(q));
        }),
    [items, query]
  );

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((h) => {
      if (h.disease) counts[h.disease] = (counts[h.disease] || 0) + 1;
    });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const last = items.length ? getDate(items[items.length - 1]) : null;
    return {
      total: items.length,
      unique: Object.keys(counts).length,
      top: top ? top[0] : "None",
      last: last ? last.toLocaleDateString() : "None",
    };
  }, [items]);

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

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
              View your previous symptom checks and results
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0DAB83] border-r-transparent"></div>
              <p className="text-gray-700 mt-4">Loading your history...</p>
            </div>
          )}

          {err && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-semibold">{err}</p>
            </div>
          )}

          {!loading && !err && items.length === 0 && (
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-12 text-center shadow-lg">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No History Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Your symptom check history will appear here once you start using
                the checker.
              </p>
              <a
                href="/disease-checker"
                className="inline-block rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-8 py-3 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Check Symptoms Now
              </a>
            </div>
          )}

          {!loading && !err && items.length > 0 && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Checks", value: stats.total },
                  { label: "Unique Conditions", value: stats.unique },
                  { label: "Most Frequent", value: stats.top },
                  { label: "Last Check", value: stats.last },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-4 text-center shadow-sm"
                  >
                    <div className="text-lg md:text-xl font-bold text-gray-900 truncate">
                      {s.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Search */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by condition, symptom or city"
                className="w-full rounded-full border-2 border-gray-300 bg-white px-6 py-3 mb-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0DAB83] focus:border-transparent"
              />

              {entries.length === 0 && (
                <p className="text-center text-gray-600 py-8">
                  No records match your search.
                </p>
              )}

              {/* Timeline */}
              <div className="space-y-4">
                {entries.map(({ h, i }) => {
                  const date = getDate(h);
                  const isOpen = expanded.has(i);
                  const hasDetails =
                    h.severity ||
                    h.description ||
                    h.doctorAdvice ||
                    (h.precautions && h.precautions.length > 0);

                  return (
                    <div
                      key={i}
                      className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {h.disease || "Unknown Condition"}
                            </h3>
                            {h.severity && (
                              <span
                                className={`text-xs font-semibold border px-3 py-1 rounded-full ${severityStyle(
                                  h.severity
                                )}`}
                              >
                                {h.severity}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-3 text-sm mb-3">
                            {h.city && (
                              <span className="bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 text-gray-700 px-3 py-1 rounded-full font-medium">
                                📍 {h.city}
                              </span>
                            )}
                            {date && (
                              <span className="text-gray-500 py-1">
                                🕐 {date.toLocaleDateString(undefined, {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}{" "}
                                at{" "}
                                {date.toLocaleTimeString(undefined, {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>

                          {h.symptoms && (
                            <div className="flex flex-wrap gap-2">
                              {h.symptoms
                                .split(/[,\n]+/)
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .map((s, k) => (
                                  <span
                                    key={k}
                                    className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                                  >
                                    {s}
                                  </span>
                                ))}
                            </div>
                          )}
                        </div>

                        <a
                          href={`/doctors?disease=${encodeURIComponent(
                            h.disease || ""
                          )}&city=${encodeURIComponent(h.city || "")}`}
                          className="self-start whitespace-nowrap text-white bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-200"
                        >
                          Find Doctors
                        </a>
                      </div>

                      {hasDetails && (
                        <>
                          <button
                            onClick={() => toggle(i)}
                            className="mt-4 text-sm font-semibold text-[#117F9E] hover:underline cursor-pointer"
                          >
                            {isOpen ? "Hide details ▲" : "Show details ▼"}
                          </button>

                          {isOpen && (
                            <div className="mt-4 space-y-4 border-t border-gray-200 pt-4 text-gray-700">
                              {h.description && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    Description
                                  </h4>
                                  <p>{h.description}</p>
                                </div>
                              )}
                              {h.precautions && h.precautions.length > 0 && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    Precautions
                                  </h4>
                                  <ul className="list-disc ml-5 space-y-1">
                                    {h.precautions.map((p, k) => (
                                      <li key={k}>{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {h.doctorAdvice && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    Doctor advice
                                  </h4>
                                  <p>{h.doctorAdvice}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
