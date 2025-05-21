// src/components/directService/TimelineVisualization/TimelineVisualization.jsx
import React from 'react';
import { motion } from 'framer-motion';

const TimelineVisualization = ({ experienceYears = 0, domain = '' }) => {
  // Generate simple timeline based on experienceYears
  const generateTimelineItems = () => {
    const currentYear = new Date().getFullYear();
    const items = [];
    
    // Create a single entry for the domain
    items.push({
      title: domain,
      startYear: currentYear - experienceYears,
      endYear: currentYear,
      description: `${experienceYears} years of experience in ${domain}`
    });
    
    return items;
  };

  const timelineItems = generateTimelineItems();

  const formatYear = (year) => {
    return year.toString();
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

  if (experienceYears <= 0) {
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
          {timelineItems.map((item, index) => (
            <motion.li 
              key={index}
              variants={itemVariants}
            >
              <div className="relative pb-8">
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
                        <span className="font-medium text-gray-900">{item.title || 'Unknown Domain'}</span>
                      </div>
                      <div className="mt-0.5 text-sm text-gray-500 flex items-center">
                        <span className="mr-1.5">{formatYear(item.startYear)} - {formatYear(item.endYear)}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {experienceYears} {experienceYears === 1 ? 'year' : 'years'}
                        </span>
                      </div>
                    </div>
                    {item.description && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{item.description}</p>
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