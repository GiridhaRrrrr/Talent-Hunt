// src/components/directServices/ResultsTable.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ConfidenceScore } from '../common';

export const ResultsTable = ({ results }) => {
  const [sortBy, setSortBy] = useState('confidence');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortBy === 'confidence' || sortBy === 'experienceYears') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

  const tableSortIcon = (column) => {
    if (sortBy !== column) {
      return (
        <svg className="w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  // Helper to parse keywords from comma-separated string
  const parseKeywords = (keywordsString) => {
    if (!keywordsString) return [];
    return keywordsString.split(',').map(k => k.trim()).filter(k => k);
  };

  // Helper to check if emailOrSocial is a LinkedIn URL
  const isLinkedInUrl = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes('linkedin.com');
  };

  // Helper to check if emailOrSocial is a GitHub URL
  const isGitHubUrl = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes('github.com');
  };

  // Helper to check if emailOrSocial is a Google Scholar URL
  const isGoogleScholarUrl = (url) => {
    if (!url) return false;
    return url.toLowerCase().includes('scholar.google.com');
  };

  // Helper to format LinkedIn URL
  const formatLinkedInUrl = (emailOrSocial) => {
    if (!emailOrSocial) return '#';
    
    if (emailOrSocial.startsWith('http')) {
      return emailOrSocial;
    }
    
    if (emailOrSocial.includes('linkedin.com')) {
      return `https://${emailOrSocial}`;
    }
    
    if (emailOrSocial.startsWith('/in/') || emailOrSocial.startsWith('in/')) {
      return `https://www.linkedin.com/${emailOrSocial.startsWith('/') ? emailOrSocial.slice(1) : emailOrSocial}`;
    }
    
    if (!emailOrSocial.includes('@') && !emailOrSocial.includes('.com')) {
      return `https://www.linkedin.com/in/${emailOrSocial}`;
    }
    
    if (emailOrSocial.includes('@')) {
      return `mailto:${emailOrSocial}`;
    }
    
    return '#';
  };

  // Static GitHub link as requested
  const getGitHubUrl = () => {
    return 'https://github.com/GiridhaRrrrr';
  };

  // Static Google Scholar link
  const getGoogleScholarUrl = () => {
    return 'https://github.com/GiridhaRrrrr';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconHoverVariants = {
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="mt-8 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Results</h2>
      
      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Name
                  {tableSortIcon('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center gap-1">
                  Location
                  {tableSortIcon('location')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('domain')}
              >
                <div className="flex items-center gap-1">
                  Domain
                  {tableSortIcon('domain')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Keywords
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('confidence')}
              >
                <div className="flex items-center gap-1">
                  Confidence
                  {tableSortIcon('confidence')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('experienceYears')}
              >
                <div className="flex items-center gap-1">
                  Experience
                  {tableSortIcon('experienceYears')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedResults.map((expert) => {
              const keywordsList = parseKeywords(expert.keywords);
              const linkedinUrl = formatLinkedInUrl(expert.emailOrSocial);
              
              return (
                <motion.tr key={expert.$id || expert.emailOrSocial || Math.random()} variants={rowVariants}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-700 font-medium">{expert.name?.charAt(0) || 'E'}</span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-medium text-gray-900">{expert.name}</div>
                          <div className="flex items-center gap-2">
                            {/* LinkedIn Icon */}
                            {expert.emailOrSocial && (
                              <motion.a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                                title="View LinkedIn Profile"
                                variants={iconHoverVariants}
                                whileHover="hover"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                              </motion.a>
                            )}
                            
                            {/* GitHub Icon */}
                            <motion.a
                              href={getGitHubUrl()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
                              title="View GitHub Profile"
                              variants={iconHoverVariants}
                              whileHover="hover"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </motion.a>
                            
                            {/* Google Scholar Icon */}
                            <motion.a
                              href={getGoogleScholarUrl()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 transition-colors cursor-pointer"
                              title="View Google Scholar Profile"
                              variants={iconHoverVariants}
                              whileHover="hover"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5 12 0z"/>
                              </svg>
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expert.location || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expert.domain || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {keywordsList.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {keyword}
                        </span>
                      ))}
                      {keywordsList.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{keywordsList.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ConfidenceScore score={expert.confidence} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{expert.experienceYears || '0'} years</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      to={`/app/expert/${expert.$id}`} 
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md hover:bg-indigo-100 transition-colors"
                    >
                      View Profile
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ResultsTable;