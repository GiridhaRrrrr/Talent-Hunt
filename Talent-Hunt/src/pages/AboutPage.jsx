import React from 'react';
import { MainLayout } from '../components/layout';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
    <MainLayout>
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">About Us</h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-200">
              Discover how we're changing the way people find true domain experts.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          variants={itemVariants}
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              At ProFound, we believe that true expertise comes from experience. 
              Our mission is to connect people with genuine domain experts who have proven 
              track records of at least 10 years in their fields.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              In a world where anyone can claim expertise, we provide a platform that 
              verifies and validates professionals across all domains, making it easy 
              to find the right expert with minimal input.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://t3.ftcdn.net/jpg/05/06/32/62/360_F_506326245_2GtSGEjKLDtpHS0FSkEBs4gV34DmTtS5.jpg" 
              alt="Team collaborating" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              ProFound was founded in 2024 by a Giridhar and team 
              who were frustrated with the challenge of identifying real experts. Too often, hiring managers 
              and teams waste valuable time interviewing candidates who claimed expertise but couldn't 
              demonstrate the deep experience needed.
            </p>
            <p>
              Our founders realized that by combining AI, data analysis, and cross-source verification, 
              they could create a platform that could accurately identify professionals with genuine 
              long-term expertise in their domains.
            </p>
            <p>
              What started as an internal tool for our own hiring processes has grown into a comprehensive 
              platform that helps companies, researchers, journalists, and individuals quickly find the 
              experts they need—all from just a simple domain search.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI algorithms analyze multiple data sources to validate experience claims and 
                calculate accurate confidence scores for each expert.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cross-Source Verification</h3>
              <p className="text-gray-600">
                We cross-reference data from LinkedIn, GitHub, academic publications, patents, and other sources 
                to ensure claims are verified by multiple independent sources.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="h-12 w-12 bg-indigo-100 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy-First Approach</h3>
              <p className="text-gray-600">
                We only use publicly available data and follow strict privacy and compliance protocols 
                to ensure ethical data usage at all times.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default AboutPage;