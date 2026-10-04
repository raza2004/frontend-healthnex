export default function ResultCard({ result }: { result: any }) {
  const suggestions: string[] =
    result.suggestions ?? result.precautions ?? [];

  return (
    <div className="mt-6 p-4 bg-white text-gray-900 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>

      <p>
        <strong>Disease:</strong>{" "}
        {result.predicted_disease || "Not clear from internal dataset"}
      </p>

      {result.severity_message && (
        <p className="mt-2">
          <strong>Severity:</strong> {result.severity_message}
        </p>
      )}

      {result.description && (
        <p className="mt-2">
          <strong>Description:</strong> {result.description}
        </p>
      )}

      {/* NEW: AI explanation for uncommon / unclear cases */}
      {result.ai_explanation && (
        <p className="mt-3 text-sm text-gray-700">
          <strong>AI insight:</strong> {result.ai_explanation}
        </p>
      )}

      <h4 className="mt-4 font-semibold">Suggestions / Precautions:</h4>
      {suggestions.length > 0 ? (
        <ul className="list-disc ml-5">
          {suggestions.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      ) : (
        <p>No specific suggestions available, please consult a doctor.</p>
      )}

      {result.disclaimer && (
        <p className="mt-4 text-sm text-red-600 italic">
          {result.disclaimer}
        </p>
      )}
        {result.doctor_advice && (
  <p className="mt-3 text-sm text-gray-700">
    <strong>Doctor advice:</strong> {result.doctor_advice}
  </p>
)}
    </div>
  );
}

  