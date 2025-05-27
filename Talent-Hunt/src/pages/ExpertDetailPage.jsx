import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MainLayout } from '../components/layout';
import {DetailView} from "../components/directServices"
import { LoadingSpinner } from '../components/common';
import { databaseServices } from '../services/appwrite';

const ExpertDetailPage = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { results } = useSelector(state => state.search);
  
  useEffect(() => {
    const fetchExpert = async () => {
      // First check if the expert is in the search results
      const expertFromResults = results.find(e => e.$id === id);
      
      if (expertFromResults) {
        setExpert(expertFromResults);
        setLoading(false);
        return;
      }
      
      // If not, fetch from the API
      try {
        setLoading(true);
        const expertData = await databaseServices.getExpert(id);
        setExpert(expertData);
      } catch (err) {
        console.error('Error fetching expert:', err);
        setError('Failed to load expert details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExpert();
  }, [id, results]);

  return (
    <MainLayout>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen -mt-16">
          <LoadingSpinner size="large" />
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-2 text-lg font-medium text-gray-900">Error Loading Expert</h2>
          <p className="mt-1 text-gray-500">{error}</p>
        </div>
      ) : (
        <DetailView expert={expert} />
      )}
    </MainLayout>
  );
};

export default ExpertDetailPage;