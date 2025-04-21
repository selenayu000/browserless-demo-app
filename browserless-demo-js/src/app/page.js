'use client';

import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (urls) => {
    setLoading(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          urls: Array.isArray(urls) ? urls : [urls]
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error verifying URLs:', error);
      setResults([{
        error: `Failed to verify URLs: ${error.message}`,
        success: false
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">🔍 Browserless URL Verification Tool</h1>
        <p className="text-gray-600 text-center mb-4">
          Enter one or more URLs to test if they can be loaded using Browserless.
        </p>

        <UrlForm onSubmit={handleSubmit} url={url} setUrl={setUrl} />

        {loading && (
          <p className="text-yellow-600 font-medium text-center mt-4 animate-pulse">
            ⏳ Testing URLs, please wait...
          </p>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <ResultsDisplay results={results} />
          </div>
        )}
      </div>
    </main>
  );
}
