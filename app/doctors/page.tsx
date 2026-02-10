"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "../../lib/axios";
import Navbar from "@/components/Navbar";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Separate component that uses useSearchParams
function DoctorsContent() {
  const searchParams = useSearchParams();
  const diseaseParam = searchParams.get('disease');
  const cityParam = searchParams.get('city');

  const [disease, setDisease] = useState(diseaseParam || "");
  const [city, setCity] = useState(cityParam || "");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorAdvice, setDoctorAdvice] = useState("");

  useEffect(() => {
    if (diseaseParam && cityParam) {
      searchDoctors(diseaseParam, cityParam);
    }
  }, [diseaseParam, cityParam]);

  const searchDoctors = async (searchDisease?: string, searchCity?: string) => {
    const diseaseToSearch = searchDisease || disease;
    const cityToSearch = searchCity || city;

    if (!diseaseToSearch || !cityToSearch) {
      alert("Please enter both disease and city");
      return;
    }

    setLoading(true);
    try {
      const docRes = await axios.post("/doctors", {
        disease: diseaseToSearch,
        city: cityToSearch,
      });

      setDoctors(docRes.data.doctors || []);
      setDoctorAdvice(docRes.data.doctor_advice || "");
    } catch (err) {
      console.error(err);
      alert("Error fetching doctors");
    }
    setLoading(false);
  };

  const handleSearch = () => {
    searchDoctors();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3 rounded-full bg-gradient-to-r from-[#0DAB83]/10 to-[#117F9E]/10 px-6 py-2 border border-[#0DAB83]/20">
            <span className="text-sm font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
              👨‍⚕️ Find Healthcare Professionals
            </span>
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Recommended Doctors
          </h2>

          <p className="text-gray-600">
            Find verified healthcare professionals in your area
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disease / Condition
              </label>
              <input
                type="text"
                placeholder="e.g. Diabetes, Common Cold"
                className="w-full rounded-lg border-2 border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-[#0DAB83] focus:border-transparent text-gray-900"
                value={disease}
                onChange={(e: { target: { value: any; }; }) => setDisease(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full rounded-lg border-2 border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-[#117F9E] focus:border-transparent text-gray-900"
                value={city}
                onChange={(e: { target: { value: any; }; }) => setCity(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full mt-6 rounded-full bg-gradient-to-r from-[#0DAB83] to-[#117F9E] py-4 text-white font-semibold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
          >
            {loading ? "Searching..." : "Find Doctors"}
          </button>
        </div>

        {/* Doctor Advice */}
        {doctorAdvice && (
          <div className="bg-gradient-to-r from-[#0DAB83]/5 to-[#117F9E]/5 border-2 border-[#0DAB83]/20 rounded-2xl p-6 mb-10">
            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span>💡</span> Doctor Recommendation
            </h3>
            <p className="text-gray-700 leading-relaxed">{doctorAdvice}</p>
          </div>
        )}

        {/* Doctors List */}
        {doctors.length > 0 ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Available Doctors in{" "}
              <span className="bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent">
                {city}
              </span>
            </h3>

            {doctors.map((doc: any, index: number) => (
              <div
                key={index}
                className="group border-2 border-gray-200 p-6 rounded-2xl shadow-sm bg-white hover:shadow-xl hover:border-[#0DAB83] transition-all duration-300"
              >
                {/* NAME */}
                <h4 className="text-2xl font-bold bg-gradient-to-r from-[#0DAB83] to-[#117F9E] bg-clip-text text-transparent mb-3">
                  {doc.name}
                </h4>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-2">
                    {/* SPECIALTY */}
                    <p className="text-gray-700">
                      <strong className="text-gray-900">Specialty:</strong> {doc.specialty}
                    </p>

                    {/* QUALIFICATIONS */}
                    {doc.qualifications && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Qualifications:</strong> {doc.qualifications}
                      </p>
                    )}

                    {/* EXPERIENCE */}
                    {doc.experience && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Experience:</strong> {doc.experience}
                      </p>
                    )}

                    {/* FEE */}
                    {doc.fee && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Fee:</strong> {doc.fee}
                      </p>
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    {/* REVIEWS & RATING */}
                    {doc.reviews !== null && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Reviews:</strong> {doc.reviews}
                      </p>
                    )}
                    {doc.rating && (
                      <p className="text-gray-700">
                        <strong className="text-gray-900">Satisfaction:</strong> {doc.rating}%
                      </p>
                    )}

                    {/* PMDC VERIFIED */}
                    <p className="text-sm">
                      {doc.pmdc_verified ? (
                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">
                          ✔ PMDC Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 font-semibold px-3 py-1 rounded-full">
                          ✘ Not PMDC Verified
                        </span>
                      )}
                    </p>

                    {/* VIDEO CONSULTATION */}
                    <p className="text-sm">
                      {doc.video_consultation ? (
                        <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-semibold px-3 py-1 rounded-full">
                          📹 Video consultation available
                        </span>
                      ) : (
                        <span className="text-gray-500 text-sm">
                          No online consultation
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* PROFILE LINK */}
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-white bg-gradient-to-r from-[#0DAB83] to-[#117F9E] px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    View Profile →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          !loading && disease && city && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                No doctors found. Try searching with different criteria.
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}

// Main component with Suspense wrapper
export default function DoctorsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#0DAB83] border-r-transparent mb-4"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      }>
        <DoctorsContent />
      </Suspense>
    </>
  );
}