import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout';
import { SearchForm } from '../components/directServices/SearchForm';
import { ResultsTable } from '../components/directServices/ResultsTable';
import { FilterPanel } from '../components/directServices';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { searchExperts } from '../store/searchSlice';

const DirectServicePage = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector(state => state.search);
  const [searchParams, setSearchParams] = useState({ domain: '', keywords: '' });
  const [filters, setFilters] = useState({
    minConfidence: 0,
    domains: [],
    keywords: [],
    locations: []
  });
  const [sortBy, setSortBy] = useState('confidence');
  const [sortOrder, setSortOrder] = useState('desc');
  const [availableDomains, setAvailableDomains] = useState([]);
  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  // Extract unique values for filters when results change
  useEffect(() => {
    if (results?.length > 0) {
      // Extract unique domains
      const domains = [...new Set(results.map(expert => expert.domain).filter(Boolean))];
      setAvailableDomains(domains);

      // Extract and parse unique keywords
      const allKeywords = results
        .map(expert => expert.keywords || '')
        .flatMap(kwString => kwString.split(',').map(kw => kw.trim()))
        .filter(Boolean);
      setAvailableKeywords([...new Set(allKeywords)]);

      // Extract unique locations
      const locations = [...new Set(results.map(expert => expert.location).filter(Boolean))];
      setAvailableLocations(locations);
    }
  }, [results]);

  const handleSearch = (domain, keywords) => {
    setSearchParams({ domain, keywords });
    dispatch(searchExperts({ domain, keywords }));
  };

  const handleFilterChange = (newFilterValues) => {
    setFilters({
      ...filters,
      ...newFilterValues
    });
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Apply filters to results
  const filteredResults = results.filter(expert => {
    // Filter by confidence score
    if (expert.confidence < filters.minConfidence) {
      return false;
    }

    // Filter by domains
    if (filters.domains?.length > 0 && !filters.domains.includes(expert.domain)) {
      return false;
    }

    // Filter by keywords
    if (filters.keywords?.length > 0) {
      const expertKeywords = (expert.keywords || '').split(',').map(kw => kw.trim());
      if (!filters.keywords.some(kw => expertKeywords.includes(kw))) {
        return false;
      }
    }

    // Filter by locations
    if (filters.locations?.length > 0 && !filters.locations.includes(expert.location)) {
      return false;
    }

    return true;
  });

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Domain Experts
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Enter a domain and optional keywords to discover experts in your field
          </p>
        </div>
        
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        {loading && (
          <div className="text-center py-16">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-lg text-gray-600">Searching for experts in {searchParams.domain}...</p>
          </div>
        )}
        
        {error && (
          <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {!loading && results?.length > 0 && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={filters}
                onChange={handleFilterChange}
                domains={availableDomains}
                keywords={availableKeywords}
                locations={availableLocations}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>
            <div className="lg:col-span-3">
              <ResultsTable results={filteredResults} />
            </div>
          </div>
        )}
        
        {!loading && results?.length === 0 && searchParams.domain && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No experts found matching your criteria.</p>
            <p className="text-gray-500">Try broadening your search or using different keywords.</p>
            <a
              href="/app/expert/add"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Expert
            </a>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DirectServicePage;