'use client';  // Marks this as a client component
import { useState } from 'react';  // Imports state hook

export default function UrlForm({ onSubmit }) {
  const [urlInput, setUrlInput] = useState('');  // State for the current URL input
  const [urls, setUrls] = useState([]);  // State for the list of added URLs

  const handleAddUrl = () => {
    // Basic URL validation using the URL constructor
    try {
      new URL(urlInput);  // Will throw an error if URL is invalid
      if (!urls.includes(urlInput)) {  // Check for duplicates
        setUrls([...urls, urlInput]);  // Add new URL to the list
      }
      setUrlInput('');  // Clear the input field
    } catch (err) {
      alert('Please enter a valid URL');  // Show error for invalid URL
    }
  };

  const handleRemoveUrl = (urlToRemove) => {
    // Filter out the URL to be removed
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission
    if (urls.length > 0) {  // Check if we have URLs to verify
      onSubmit(urls);  // Call the parent's onSubmit function with URLs
    } else {
      alert('Please add at least one URL to verify');  // Show error if no URLs
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

  // The rest of the code renders the form UI