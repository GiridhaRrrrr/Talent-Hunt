import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  { MainLayout }  from '../components/layout';
import { SearchForm } from '../components/directServices/SearchForm';
import  { ResultsTable }  from '../components/directServices/ResultTable';
import  LoadingSpinner  from '../components/common/LoadingSpinner';
import { searchExperts } from '../store/searchSlice';

const DirectServicePage = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector(state => state.search);
  const [searchParams, setSearchParams] = useState({ domain: '', keywords: '' });

  const handleSearch = (domain, keywords) => {
    setSearchParams({ domain, keywords });
    dispatch(searchExperts({ domain, keywords }));
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Find Domain Experts
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Enter a domain and optional keywords to discover experts with 10+ years of experience
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
          <ResultsTable results={results} />
        )}
        
        {!loading && results?.length === 0 && searchParams.domain && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg text-gray-600">No experts found matching your criteria.</p>
            <p className="text-gray-500">Try broadening your search or using different keywords.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DirectServicePage;