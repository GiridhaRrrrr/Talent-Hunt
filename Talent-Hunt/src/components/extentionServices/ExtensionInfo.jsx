import React from 'react';
import { motion } from 'framer-motion';

const ExtensionInfo = () => {
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
    <motion.section 
      className="py-12 bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Chrome Extension for Expert Finding
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Search for domain experts while browsing the web
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2"
          variants={itemVariants}
        >
          <div className="bg-indigo-50 rounded-lg overflow-hidden">
            <img 
              src="https://miro.medium.com/v2/resize:fit:1400/1*J7CqaSkb9X1l-TmGH5fdBQ.png" 
              alt="Extension Preview" 
              className="w-full h-auto shadow-lg rounded-lg"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
            
            <ul className="space-y-4">
              <li className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">Context-Aware Searches</h4>
                  <p className="mt-1 text-gray-600">Our extension automatically detects domains from webpage content, enabling instant expert lookup.</p>
                </div>
              </li>
              
              <li className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">One-Click Installation</h4>
                  <p className="mt-1 text-gray-600">Install directly from the Chrome Web Store with a single click - no complex setup required.</p>
                </div>
              </li>
              
              <li className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">Offline Capability</h4>
                  <p className="mt-1 text-gray-600">Our extension can work offline for previously searched domains, perfect for travel or spotty connections.</p>
                </div>
              </li>
              
              <li className="flex">
                <svg className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">LinkedIn Integration</h4>
                  <p className="mt-1 text-gray-600">Our extension enhances LinkedIn browsing by identifying true domain experts among your connections.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ExtensionInfo;