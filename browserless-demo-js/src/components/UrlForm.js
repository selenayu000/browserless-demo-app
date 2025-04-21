'use client';  
import { useState } from 'react';  

export default function UrlForm({ onSubmit }) {
  const [urlInput, setUrlInput] = useState(''); 
  const [urls, setUrls] = useState([]);  

  const handleAddUrl = () => {
    try {
      new URL(urlInput);  
      if (!urls.includes(urlInput)) {  
        setUrls([...urls, urlInput]); 
      }
      setUrlInput('');  
    } catch (err) {
      alert('Please enter a valid URL'); 
    }
  };

  const handleRemoveUrl = (urlToRemove) => {
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (urls.length > 0) {  
      onSubmit(urls); 
    } else {
      alert('Please add at least one URL to verify'); 
    }
  };
  return (
    <div className="mb-6">
      <div className="flex mb-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Enter URL (e.g., https://example.com)"
          className="flex-grow p-2 border rounded"
        />
        <button 
          onClick={handleAddUrl}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
          type="button"
        >
          Add URL
        </button>
      </div>
      
      {urls.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">URLs to verify:</h3>
          <ul className="list-disc pl-5">
            {urls.map((url, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>{url}</span>
                <button 
                  onClick={() => handleRemoveUrl(url)}
                  className="text-red-500"
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <button 
        onClick={handleSubmit}
        className="bg-green-500 text-white p-2 rounded"
        disabled={urls.length === 0}
      >
        Verify URLs
      </button>
    </div>
  );
}