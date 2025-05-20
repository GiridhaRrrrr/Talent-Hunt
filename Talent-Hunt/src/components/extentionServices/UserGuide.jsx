// src/components/extensionService/UsageGuide/UsageGuide.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const UsageGuide = () => {
  const [activeTab, setActiveTab] = useState('installation');
  
  const tabs = [
    { id: 'installation', label: 'Installation' },
    { id: 'browsing', label: 'While Browsing' },
    { id: 'linkedin', label: 'LinkedIn Integration' },
    { id: 'offline', label: 'Offline Mode' }
  ];
  
  const tabContent = {
    installation: {
      title: 'Easy Installation Process',
      description: 'Get up and running in less than a minute',
      steps: [
        {
          title: 'Download from Chrome Web Store',
          description: 'Click the download button above to be redirected to the Chrome Web Store.'
        },
        {
          title: 'Click "Add to Chrome"',
          description: 'On the Chrome Web Store page, click the "Add to Chrome" button.'
        },
        {
          title: 'Confirm Installation',
          description: 'In the pop-up window, click "Add extension" to complete the installation.'
        },
        {
          title: 'Sign in to Your Account',
          description: 'Click the extension icon and sign in with your Veteran Talent Finder account.'
        }
      ]
    },
    browsing: {
      title: 'Finding Experts While Browsing',
      description: 'Discover domain experts while reading articles or research',
      steps: [
        {
          title: 'Highlight Domain Text',
          description: 'Select text on a webpage that contains a domain name or field of expertise.'
        },
        {
          title: 'Right-Click for Context Menu',
          description: 'Right-click on the selected text and choose "Find Domain Experts" from the menu.'
        },
        {
          title: 'View Results Popup',
          description: 'A popup will appear with a list of experts in the selected domain.'
        },
        {
          title: 'Click for Full Profile',
          description: 'Click on any expert card to open their full profile in a new tab.'
        }
      ]
    },
    linkedin: {
      title: 'LinkedIn Integration',
      description: 'Enhance your LinkedIn experience with verified expertise data',
      steps: [
        {
          title: 'Enable LinkedIn Integration',
          description: 'In the extension settings, toggle on the LinkedIn integration feature.'
        },
        {
          title: 'Browse LinkedIn Profiles',
          description: 'When viewing a LinkedIn profile, our extension will automatically analyze the profile.'
        },
        {
          title: 'View Expertise Validation',
          description: 'Look for our verification badge next to experience claims that have been validated.'
        },
        {
          title: 'Check Confidence Score',
          description: 'Click our icon on any profile to see a detailed confidence score breakdown.'
        }
      ]
    },
    offline: {
      title: 'Using Offline Mode',
      description: 'Access expert data even without an internet connection',
      steps: [
        {
          title: 'Enable Offline Access',
          description: 'In extension settings, toggle on "Cache for Offline Use" to store data locally.'
        },
        {
          title: 'Sync Domains of Interest',
          description: 'Select which domains you want available offline from the settings page.'
        },
        {
          title: 'Work Offline',
          description: 'When offline, the extension will use cached data for your selected domains.'
        },
        {
          title: 'Sync When Back Online',
          description: 'The extension will automatically update its cache when internet connectivity returns.'
        }
      ]
    }
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Use the Extension
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get the most out of our Chrome extension with this guide
          </p>
        </motion.div>
        
        <div className="mt-12">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">Select a tab</label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          <motion.div 
            className="mt-8"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900">
                {tabContent[activeTab].title}
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                {tabContent[activeTab].description}
              </p>
              
              <div className="mt-8">
                <ol className="space-y-10">
                  {tabContent[activeTab].steps.map((step, index) => (
                    <li key={index} className="relative">
                      <div className="flex items-start">
                        <div className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-800 font-medium text-lg ring-8 ring-white">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-gray-900">{step.title}</h4>
                          <p className="mt-1 text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      
                      {index < tabContent[activeTab].steps.length - 1 && (
                        <div className="absolute top-14 left-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-100" aria-hidden="true"></div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UsageGuide;