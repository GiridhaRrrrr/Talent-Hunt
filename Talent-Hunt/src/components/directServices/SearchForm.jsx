import React, { useState } from 'react';

export const SearchForm = ({ onSearch, loading }) => {
  const [domain, setDomain] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (domain.trim()) {
      onSearch(domain.trim(), keywords.trim());
    }
  };
  

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
            Domain <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="domain"
            placeholder="e.g., Cybersecurity, Renewable Energy"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Keywords (Optional)
          </label>
          <input
            type="text"
            id="keywords"
            placeholder="e.g., Python, Fintech, Cloud Migration"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate multiple keywords with commas
          </p>
        </div>
        
        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={!domain.trim() || loading}
            className={`
              px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg
              shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-indigo-500 focus:ring-offset-2 transition-colors
              ${(!domain.trim() || loading) ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </div>
            ) : 'Find Experts'}
          </button>
        </div>
      </form>
    </div>
  );
};
