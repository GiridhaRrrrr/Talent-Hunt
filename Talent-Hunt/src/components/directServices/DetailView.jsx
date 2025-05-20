// src/components/directService/DetailView/DetailView.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ConfidenceScore } from '../common';
import  TimelineVisualization  from './TimelineVisualization';

const DetailView = ({ expert }) => {
  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Expert not found</p>
      </div>
    );
  }

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
    <motion.div 
      className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        variants={itemVariants}
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-indigo-700 font-medium">{expert.name?.charAt(0) || 'E'}</span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
                <div className="flex items-center mt-1 text-gray-600">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {expert.location || 'Location not specified'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end">
              <div className="mb-2 text-gray-700">Confidence Score</div>
              <ConfidenceScore score={expert.confidenceScore} />
            </div>
          </div>
          
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={itemVariants}
          >
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Overview</h2>
              
              <div className="prose max-w-none mb-8">
                <p>{expert.bio || 'No bio available'}</p>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience Timeline</h2>
              
              <TimelineVisualization companies={expert.companies || []} />
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Technologies & Skills</h2>
                
                <div className="flex flex-wrap gap-2">
                  {expert.technologies?.map((tech, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-lg font-medium text-gray-900 mt-6 mb-4">Contact Information</h2>
                
                {expert.email && (
                  <div className="flex items-center mb-3">
                    <svg className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${expert.email}`} className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      {expert.email}
                    </a>
                  </div>
                )}
                
                {expert.linkedin && (
                  <div className="flex items-center mb-3">
                    <svg className="h-5 w-5 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailView;