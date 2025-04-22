export default function ResultsDisplay({ results }) {
  if (!results || results.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Verification Results</h2>
      {results.map((result, i) => (
        <div key={i} className="mb-4 p-4 border rounded">
          <h3 className="font-medium">{result.url}</h3>

          {result.success ? (
            <p>
              ✅ Successfully loaded with parameters:
              <br />
              <code>{JSON.stringify(result.usedParams)}</code>
            </p>
          ) : (
            <p>❌ Failed to load with any session settings</p>
          )}

          {result.attemptedSettings?.length > 0 && (
            <details className="mt-2">
              <summary className="text-sm text-gray-600">Settings attempted:</summary>
              <ul className="text-xs mt-1 pl-4 list-disc">
                {result.attemptedSettings.map((attempt, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <code>{JSON.stringify(attempt.settings)}</code>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      ))}
    </div>
  );
}
