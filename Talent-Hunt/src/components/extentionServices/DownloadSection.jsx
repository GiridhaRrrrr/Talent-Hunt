// src/components/extensionService/DownloadSection/DownloadSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DownloadSection = () => {
  return (
    <section className="py-12 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Download Our Chrome Extension
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get instant access to domain experts while browsing
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="#"
            className="inline-flex items-center px-6 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.214 8.69l-6.522 3.573c-.554.303-1.18.303-1.734 0L1.436 8.69C.902 8.416.902 7.585 1.436 7.312l6.522-3.573c.554-.303 1.18-.303 1.734 0l6.522 3.573c.534.274.534 1.104 0 1.377zm0 8l-6.522 3.573c-.554.303-1.18.303-1.734 0L1.436 16.69c-.534-.274-.534-1.104 0-1.377l1.92-.776 2.77 1.519c.928.508 2.035.508 2.963 0l2.77-1.519 1.92.776c.534.274.534 1.104 0 1.377zm0-4l-6.522 3.573c-.554.303-1.18.303-1.734 0L1.436 12.69c-.534-.274-.534-1.104 0-1.377l1.92-.776 2.77 1.519c.928.508 2.035.508 2.963 0l2.77-1.519 1.92.776c.534.274.534 1.104 0 1.377z" />
            </svg>
            Download Chrome Extension
          </a>
        </motion.div>
        
        <motion.div 
          className="mt-12 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Requirements</h3>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Browser Compatibility</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Chrome 88 or later
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Edge 88 or later
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Opera 75 or later
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Account Requirements</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Veteran Talent Finder account
                </li>
                // src/components/extensionService/DownloadSection/DownloadSection.jsx (continued)
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Internet connection for updates
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Less than 5MB storage space
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Privacy Guarantee</h4>
            <p className="text-gray-600">
              Our extension only collects data necessary for its functionality. Your browsing history remains private, and we never track sites you visit unless you specifically use our expert search feature.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;