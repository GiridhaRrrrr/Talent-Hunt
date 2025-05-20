// src/pages/ApiServicePage/ApiServicePage.jsx
import React, { useState } from 'react';
import { MainLayout } from '../components/layout';
import { ApiDocs } from '../components/apiServices';
import { CodeExamples } from '../components/apiServices';
import { ApiKeyManagement } from '../components/apiServices';

const ApiServicePage = () => {
  const [activeTab, setActiveTab] = useState('documentation');
  
  const tabs = [
    { id: 'documentation', label: 'Documentation' },
    { id: 'examples', label: 'Code Examples' },
    { id: 'apiKeys', label: 'API Keys' }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            API Service
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Integrate our expert finding capabilities directly into your applications
          </p>
        </div>
        
        <div className="mb-8 border-b border-gray-200">
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
        
        <div>
          {activeTab === 'documentation' && <ApiDocs />}
          {activeTab === 'examples' && <CodeExamples />}
          {activeTab === 'apiKeys' && <ApiKeyManagement />}
        </div>
      </div>
    </MainLayout>
  );
};

export default ApiServicePage;