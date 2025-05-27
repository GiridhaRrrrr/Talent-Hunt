import React from 'react';
import { Link } from 'react-router-dom';
import { ConfidenceScore } from '../common';

const ExpertCard = ({ expert }) => {
  // Parse keywords to display as technologies
  const keywordsList = expert.keywords ? expert.keywords.split(',').map(item => item.trim()) : [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-xl text-indigo-700 font-medium">{expert.name?.charAt(0) || 'E'}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{expert.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {expert.location || 'Location not specified'}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-700">{expert.experienceYears || '0'}+ years of experience</span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {expert.domain || 'No domain information available'}
          </p>
          
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              Keywords & Skills
            </h4>
            <div className="flex flex-wrap gap-1">
              {keywordsList.map((keyword, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            Confidence Score
          </h4>
          <ConfidenceScore score={expert.confidence} />
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 flex justify-center">
        <Link 
          to={`/app/expert/${expert.$id}`} 
          className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
};

export default ExpertCard;