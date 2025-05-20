// src/components/directService/TimelineVisualization/TimelineVisualization.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TimelineVisualization = ({ companies = [] }) => {
  // Sort companies by start date (most recent first)
  const sortedCompanies = [...companies].sort((a, b) => {
    const dateA = new Date(a.startDate || '2000-01-01');
    const dateB = new Date(b.startDate || '2000-01-01');
    return dateB - dateA;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  // Calculate duration in years and months
  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return 'Unknown duration';
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    
    let duration = '';
    
    if (displayYears > 0) {
      duration += `${displayYears} ${displayYears === 1 ? 'year' : 'years'}`;
    }
    
    if (displayMonths > 0 || displayYears === 0) {
      if (duration) duration += ', ';
      duration += `${displayMonths} ${displayMonths === 1 ? 'month' : 'months'}`;
    }
    
    return duration;
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  if (sortedCompanies.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
        No work experience information available
      </div>
    );
  }

  return (
    <div className="mt-2 mb-8">
      <div className="flow-root">
        <ul className="-mb-8">
          {sortedCompanies.map((company, index) => (
            <motion.li 
              key={index}
              variants={itemVariants}
            >
              <div className="relative pb-8">
                {index !== sortedCompanies.length - 1 && (
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                )}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center ring-8 ring-white">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">{company.name || 'Unknown Company'}</span>
                      </div>
                      <div className="mt-0.5 text-sm text-gray-500">
                        <span>{company.title || 'Position not specified'}</span>
                      </div>
                      <div className="mt-0.5 text-sm text-gray-500 flex items-center">
                        <span className="mr-1.5">{formatDate(company.startDate)} - {formatDate(company.endDate)}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {calculateDuration(company.startDate, company.endDate)}
                        </span>
                      </div>
                    </div>
                    {company.description && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{company.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimelineVisualization;