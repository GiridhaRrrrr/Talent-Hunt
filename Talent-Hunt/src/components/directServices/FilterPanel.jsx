// src/components/directService/FilterPanel/FilterPanel.jsx
import React, { useState } from 'react';

const FilterPanel = ({ 
  filters, 
  onChange, 
  domains,
  keywords, 
  locations,
  sortBy,
  sortOrder,
  onSortChange
}) => {
  const [expanded, setExpanded] = useState({
    confidence: true,
    domains: true,
    keywords: true,
    locations: true,
    sorting: true
  });
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle confidence score slider
  const handleConfidenceChange = (e) => {
    onChange({ minConfidence: parseInt(e.target.value, 10) });
  };
  
  // Handle domain checkbox
  const handleDomainChange = (domain) => {
    const newDomains = [...filters.domains];
    
    if (newDomains.includes(domain)) {
      // Remove domain
      onChange({ 
        domains: newDomains.filter(d => d !== domain) 
      });
    } else {
      // Add domain
      onChange({ 
        domains: [...newDomains, domain] 
      });
    }
  };
  
  // Handle keyword checkbox
  const handleKeywordChange = (keyword) => {
    const newKeywords = [...filters.keywords];
    
    if (newKeywords.includes(keyword)) {
      // Remove keyword
      onChange({ 
        keywords: newKeywords.filter(k => k !== keyword) 
      });
    } else {
      // Add keyword
      onChange({ 
        keywords: [...newKeywords, keyword] 
      });
    }
  };
  
  // Handle location checkbox
  const handleLocationChange = (location) => {
    const newLocations = [...filters.locations];
    
    if (newLocations.includes(location)) {
      // Remove location
      onChange({ 
        locations: newLocations.filter(l => l !== location) 
      });
    } else {
      // Add location
      onChange({ 
        locations: [...newLocations, location] 
      });
    }
  };
  
  // Handle sort option selection
  const handleSortClick = (field) => {
    onSortChange(field);
  };
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Results</h2>
      
      {/* Confidence Score Filter */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('confidence')}
        >
          <h3 className="text-md font-medium text-gray-900">Confidence Score</h3>
          <svg
            className={`h-5 w-5 text-gray-500 transform ${expanded.confidence ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expanded.confidence && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Min: {filters.minConfidence}%</span>
              {filters.minConfidence > 0 && (
                <button
                  onClick={() => onChange({ minConfidence: 0 })}
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  Reset
                </button>
              )}
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.minConfidence}
              onChange={handleConfidenceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
      
      {/* Domains Filter */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('domains')}
        >
          <h3 className="text-md font-medium text-gray-900">Domains</h3>
          <div className="flex items-center">
            {filters.domains?.length > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mr-2">
                {filters.domains.length}
              </span>
            )}
            <svg
              className={`h-5 w-5 text-gray-500 transform ${expanded.domains ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {expanded.domains && (
          <div className="mt-2">
            {filters.domains?.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => onChange({ domains: [] })}
                  className="text-xs text-indigo-600 hover:text-indigo-800 mb-2"
                >
                  Clear all
                </button>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto pr-2">
              {!domains || domains.length === 0 ? (
                <p className="text-sm text-gray-500">No domains available</p>
              ) : (
                <div className="space-y-2">
                  {domains.map(domain => (
                    <div key={domain} className="flex items-center">
                      <input
                        id={`domain-${domain}`}
                        type="checkbox"
                        checked={filters.domains?.includes(domain)}
                        onChange={() => handleDomainChange(domain)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`domain-${domain}`} className="ml-2 text-sm text-gray-700">
                        {domain}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Keywords Filter */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('keywords')}
        >
          <h3 className="text-md font-medium text-gray-900">Keywords</h3>
          <div className="flex items-center">
            {filters.keywords?.length > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mr-2">
                {filters.keywords.length}
              </span>
            )}
            <svg
              className={`h-5 w-5 text-gray-500 transform ${expanded.keywords ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {expanded.keywords && (
          <div className="mt-2">
            {filters.keywords?.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => onChange({ keywords: [] })}
                  className="text-xs text-indigo-600 hover:text-indigo-800 mb-2"
                >
                  Clear all
                </button>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto pr-2">
              {!keywords || keywords.length === 0 ? (
                <p className="text-sm text-gray-500">No keywords available</p>
              ) : (
                <div className="space-y-2">
                  {keywords.map(keyword => (
                    <div key={keyword} className="flex items-center">
                      <input
                        id={`keyword-${keyword}`}
                        type="checkbox"
                        checked={filters.keywords?.includes(keyword)}
                        onChange={() => handleKeywordChange(keyword)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`keyword-${keyword}`} className="ml-2 text-sm text-gray-700">
                        {keyword}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Locations Filter */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('locations')}
        >
          <h3 className="text-md font-medium text-gray-900">Locations</h3>
          <div className="flex items-center">
            {filters.locations?.length > 0 && (
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full mr-2">
                {filters.locations.length}
              </span>
            )}
            <svg
              className={`h-5 w-5 text-gray-500 transform ${expanded.locations ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {expanded.locations && (
          <div className="mt-2">
            {filters.locations?.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => onChange({ locations: [] })}
                  className="text-xs text-indigo-600 hover:text-indigo-800 mb-2"
                >
                  Clear all
                </button>
              </div>
            )}
            
            <div className="max-h-60 overflow-y-auto pr-2">
              {!locations || locations.length === 0 ? (
                <p className="text-sm text-gray-500">No locations available</p>
              ) : (
                <div className="space-y-2">
                  {locations.map(location => (
                    <div key={location} className="flex items-center">
                      <input
                        id={`location-${location}`}
                        type="checkbox"
                        checked={filters.locations?.includes(location)}
                        onChange={() => handleLocationChange(location)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                        {location}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Sorting Options */}
      <div>
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('sorting')}
        >
          <h3 className="text-md font-medium text-gray-900">Sort By</h3>
          <svg
            className={`h-5 w-5 text-gray-500 transform ${expanded.sorting ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {expanded.sorting && (
          <div className="mt-2 space-y-2">
            <button
              onClick={() => handleSortClick('confidence')}
              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                sortBy === 'confidence' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Confidence Score</span>
                {sortBy === 'confidence' && (
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={sortOrder === 'desc' 
                        ? "M19 9l-7 7-7-7" 
                        : "M5 15l7-7 7 7"} 
                    />
                  </svg>
                )}
              </div>
            </button>
            
            <button
              onClick={() => handleSortClick('experienceYears')}
              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                sortBy === 'experienceYears' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Experience Years</span>
                {sortBy === 'experienceYears' && (
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={sortOrder === 'desc' 
                        ? "M19 9l-7 7-7-7" 
                        : "M5 15l7-7 7 7"} 
                    />
                  </svg>
                )}
              </div>
            </button>
            
            <button
              onClick={() => handleSortClick('location')}
              className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                sortBy === 'location' 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Location</span>
                {sortBy === 'location' && (
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d={sortOrder === 'desc' 
                        ? "M19 9l-7 7-7-7" 
                        : "M5 15l7-7 7 7"} 
                    />
                  </svg>
                )}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;