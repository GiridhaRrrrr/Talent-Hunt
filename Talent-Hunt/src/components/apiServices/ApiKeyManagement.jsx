// src/components/apiService/ApiKeyManagement/ApiKeyManagement.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const ApiKeyManagement = () => {
  const { userData } = useSelector(state => state.auth);
  const [copied, setCopied] = useState(false);
  
  // Mock API key - in a real app, this would come from your userData or a separate API call
  const mockApiKey = 'vtf_' + userData?.$id?.substring(0, 8) + '_' + Math.random().toString(36).substring(2, 10);

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
    <motion.div 
      className="max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="mb-10"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Key Management</h2>
        <p className="text-gray-600">
          Manage your API keys to integrate our expert finding capabilities with your applications.
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your API Key</h3>
        
        <div className="flex items-center">
          <div className="flex-grow relative">
            <input
              type="text"
              value={mockApiKey}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none"
            />
          </div>
          <button
            onClick={handleCopyApiKey}
            className={`px-4 py-2 rounded-r-md ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors"
          onClick={handleCopyApiKey}>
            Regenerate API Key
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100 transition-colors"
          onClick={handleCopyApiKey}>
            Revoke API Key
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md mb-8"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Statistics</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">API Calls (This Month)</p>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Remaining Quota</p>
            <p className="text-2xl font-bold text-gray-900">7,153</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">99.7%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Plan Limit</p>
            <p className="text-2xl font-bold text-gray-900">10,000 calls/month</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-md"
        variants={itemVariants}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">IP Restrictions</h4>
              <p className="text-sm text-gray-500">Limit API access to specific IP addresses</p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Domain Restrictions</h4>
              <p className="text-sm text-gray-500">Limit API access to specific domains</p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Rate Limiting</h4>
              <p className="text-sm text-gray-500">Customize rate limits for your API usage</p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApiKeyManagement;