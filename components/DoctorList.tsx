"use client";

export default function DoctorList({ doctors }: { doctors: any[] }) {
  if (!doctors || doctors.length === 0)
    return null;

  return (
    <div className="mt-8 space-y-5">
      <h3 className="text-2xl font-bold mb-3">Recommended Doctors In Your City</h3>

      {doctors.map((doc, index) => (
        <div
          key={index}
          className="border p-4 rounded-lg shadow-sm bg-white flex flex-col gap-2"
        >
          {/* NAME */}
          <h4 className="text-xl font-semibold text-blue-700">
            {doc.name}
          </h4>

          {/* SPECIALTY + QUALIFICATIONS */}
          <p className="text-gray-600">
            <strong>Specialty:</strong> {doc.specialty}
          </p>

          {doc.qualifications && (
            <p className="text-gray-600">
              <strong>Qualifications:</strong> {doc.qualifications}
            </p>
          )}

          {/* EXPERIENCE */}
          {doc.experience && (
            <p className="text-gray-600">
              <strong>Experience:</strong> {doc.experience}
            </p>
          )}

          {/* FEE */}
          {doc.fee && (
            <p className="text-gray-600">
              <strong>Fee:</strong> {doc.fee}
            </p>
          )}

          {/* REVIEWS & RATING */}
          <div className="text-gray-600">
            {doc.reviews !== null && (
              <p>
                <strong>Reviews:</strong> {doc.reviews}
              </p>
            )}
            {doc.rating && (
              <p>
                <strong>Satisfaction:</strong> {doc.rating}%
              </p>
            )}
          </div>

          {/* PMDC VERIFIED */}
          <p className="text-sm">
            {doc.pmdc_verified ? (
              <span className="text-green-600 font-semibold">
                ✔ PMDC Verified
              </span>
            ) : (
              <span className="text-red-500 font-semibold">
                ✘ Not PMDC Verified
              </span>
            )}
          </p>

          {/* VIDEO CONSULTATION */}
          <p className="text-sm">
            {doc.video_consultation ? (
              <span className="text-green-600 font-semibold">
                📹 Video consultation available
              </span>
            ) : (
              <span className="text-gray-500">
                No online consultation
              </span>
            )}
          </p>

          {/* PROFILE LINK */}
          {doc.url && (
            <a
              href={doc.url}
              target="_blank"
              className="text-blue-600 underline font-medium mt-2"
            >
              View Profile →
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
