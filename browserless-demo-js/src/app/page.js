'use client';

import { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (urls) => {
    setLoading(true);
    try{
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ urls}), 
      });

      const data = await response.json()
      setResults(data);
    } catch (error) {
      console.error('Error: verifying URLs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">URL Verification Tool</h1>
      <UrlForm onSubmit={handleSubmit} />
      {loading && <p className="text-gray-600 mt-4">Testing URLs, please wait</p>}
      {results && <ResultsDisplay results={results} />}
    </main>
  );
}