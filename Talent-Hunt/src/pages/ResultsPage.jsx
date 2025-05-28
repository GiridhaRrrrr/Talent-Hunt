import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// The useLocation hook gives you access to the location object from React Router.
// The location object represents the current URL in the browser and provides various pieces of information about it.
import { MainLayout } from '../components/layout';
import { ExpertCard } from '../components/directService';
import { FilterPanel } from '../components/directService';
import { LoadingSpinner } from '../components/common';
import { searchExperts } from '../store/searchSlice';
import { motion } from 'framer-motion';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { results, loading, error, lastSearch } = useSelector(state => state.search);
  
  const queryParams = new URLSearchParams(location.search);//search: A string representing the URL's query parameters, including the leading ? (e.g., ?category=electronics&page=2).
  // Creates a URLSearchParams object, It provides a convenient way to work with the query string of a URL. You can parse it, add parameters, remove parameters, and retrieve specific parameter values. its part of js
  const domain = queryParams.get('domain') || '';
  const keywords = queryParams.get('keywords') || '';
  
  const [filteredResults, setFilteredResults] = useState([]);
  const [filters, setFilters] = useState({
    minConfidence: 0,
    locations: [],
    technologies: []
  });
  const [sortBy, setSortBy] = useState('confidenceScore');
  const [sortOrder, setSortOrder] = useState('desc');
  
  useEffect(() => {
    if (domain && results.length === 0 && !loading) {
      dispatch(searchExperts({ domain, keywords }));
    }
  }, [domain, keywords, dispatch, results.length, loading]);
  
  useEffect(() => {
    if (results.length === 0) return;
    
    let filtered = [...results];
    
    if (filters.minConfidence > 0) {
      filtered = filtered.filter(expert => expert.confidenceScore >= filters.minConfidence);
    }
    
    if (filters.locations.length > 0) {
      filtered = filtered.filter(expert => 
        expert.location && filters.locations.includes(expert.location)
      );
    }
    
    if (filters.technologies.length > 0) {
      filtered = filtered.filter(expert => {
        const expertTechs = expert.technologies.map(tech => tech.toLowerCase());
        return filters.technologies.some(tech => 
          expertTechs.includes(tech.toLowerCase())
        );
      });
    }
    
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'location') {
        aValue = a.location || '';
        bValue = b.location || '';
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    
    setFilteredResults(filtered);
  }, [results, filters, sortBy, sortOrder]);
  
  const availableTechnologies = React.useMemo(() => {
    if (results.length === 0) return [];
    
    const techSet = new Set();
    results.forEach(expert => {
      expert.technologies.forEach(tech => {
        techSet.add(tech);
      });
    });
    
    return Array.from(techSet).sort();
  }, [results]);
  
  const availableLocations = React.useMemo(() => {
    if (results.length === 0) return [];
    
    const locationSet = new Set();
    results.forEach(expert => {
      if (expert.location) {
        locationSet.add(expert.location);
      }
    });
    
    return Array.from(locationSet).sort();
  }, [results]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {domain ? (
              <>
                Results for <span className="text-indigo-600">{domain}</span>
                {keywords && <span> with {keywords}</span>}
              </>
            ) : (
              'Search Results'
            )}
          </h1>
          
          {!loading && results.length > 0 && (
            <p className="mt-2 text-gray-600">
              Found {results.length} experts{filteredResults.length < results.length && ` (${filteredResults.length} shown after filtering)`}
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-lg text-gray-600">Searching for experts...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No experts found matching your criteria.</p>
            <button 
              onClick={() => navigate('/app/direct-service')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Start a New Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <FilterPanel 
                filters={filters}
                onChange={handleFilterChange}
                technologies={availableTechnologies}
                locations={availableLocations}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
            </div>
            
            <div className="lg:col-span-3">
              {filteredResults.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-gray-600">No experts match your current filters.</p>
                  <button
                    onClick={() => setFilters({
                      minConfidence: 0,
                      locations: [],
                      technologies: []
                    })}
                    className="mt-2 text-indigo-600 hover:text-indigo-800"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredResults.map(expert => (
                    <motion.div 
                      key={expert.$id}
                      variants={itemVariants}
                    >
                      <ExpertCard expert={expert} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ResultsPage;