export default function ResultsDisplay({ results }) {
    // Add null check to prevent errors during build
    if (!results || results.length === 0) {
      return null;
    }
  
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Verification Results</h2>
        {results.map((result, i) => (
        <div key={i}>
            <h3>{result.url}</h3>
            {result.success ? (
                <p>✅ Successfully loaded with parameters: {JSON.stringify(result.parameters)}</p>
            ) : (
                <div>
                    <p>❌ Failed to load with parameters: {JSON.stringify(result.parameters)}</p>
                    <p>Error: {result.error}</p>
                </div>
            )}
        </div>
    ))} 
    </div>
    );
  }