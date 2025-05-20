// src/components/apiService/ApiDocs/ApiDocs.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ApiDocs = () => {
  const endpoints = [
    {
      name: "Search Experts",
      method: "GET",
      path: "/api/experts/search",
      description: "Search for domain experts based on domain and optional keywords",
      parameters: [
        {
          name: "domain",
          type: "string",
          required: true,
          description: "The domain/field to search for experts in (e.g., 'Cybersecurity')"
        },
        {
          name: "keywords",
          type: "string",
          required: false,
          description: "Comma-separated list of keywords to further filter results"
        },
        {
          name: "limit",
          type: "number",
          required: false,
          description: "Maximum number of results to return (default: 10)"
        }
      ],
      response: {
        code: `{
  "success": true,
  "data": [
    {
      "id": "expert-123",
      "name": "Jane Smith",
      "location": "San Francisco, CA",
      "technologies": ["Python", "Cloud Security", "DevSecOps"],
      "confidenceScore": 92,
      "experience": {
        "years": 12,
        "companies": [
          {
            "name": "Security Innovations Inc.",
            "title": "Senior Security Engineer",
            "startDate": "2018-03-15",
            "endDate": null
          },
          ...
        ]
      }
    },
    ...
  ]
}`
      }
    },
    {
      name: "Get Expert Detail",
      method: "GET",
      path: "/api/experts/:id",
      description: "Get detailed information about a specific expert",
      parameters: [
        {
          name: "id",
          type: "string",
          required: true,
          description: "The unique ID of the expert"
        }
      ],
      response: {
        code: `{
  "success": true,
  "data": {
    "id": "expert-123",
    "name": "Jane Smith",
    "location": "San Francisco, CA",
    "bio": "Cybersecurity professional with over 12 years of experience...",
    "technologies": ["Python", "Cloud Security", "DevSecOps", "Ethical Hacking", "Incident Response"],
    "confidenceScore": 92,
    "experience": {
      "years": 12,
      "companies": [
        {
          "name": "Security Innovations Inc.",
          "title": "Senior Security Engineer",
          "startDate": "2018-03-15",
          "endDate": null,
          "description": "Leading cloud security initiatives..."
        },
        ...
      ]
    },
    "contact": {
      "email": "jane.smith@example.com",
      "linkedin": "https://linkedin.com/in/janesmith"
    }
  }
}`
      }
    },
    {
      name: "Verify Experience",
      method: "POST",
      path: "/api/verify/experience",
      description: "Verify a specific experience claim",
      parameters: [
        {
          name: "name",
          type: "string",
          required: true,
          description: "Full name of the person to verify"
        },
        {
          name: "company",
          type: "string",
          required: true,
          description: "Company name where experience was gained"
        },
        {
          name: "title",
          type: "string",
          required: true,
          description: "Job title at the company"
        },
        {
          name: "startDate",
          type: "string",
          required: true,
          description: "Start date in ISO format (YYYY-MM-DD)"
        },
        {
          name: "endDate",
          type: "string",
          required: false,
          description: "End date in ISO format (YYYY-MM-DD) or null for current positions"
        }
      ],
      response: {
        code: `{
  "success": true,
  "data": {
    "verified": true,
    "confidenceScore": 88,
    "sources": [
      "LinkedIn",
      "GitHub",
      "Company Website"
    ],
    "verifiedInfo": {
      "company": "Security Innovations Inc.",
      "title": "Senior Security Engineer",
      "startDate": "2018-03",
      "endDate": null
    }
  }
}`
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">API Documentation</h2>
        <p className="text-gray-600">
          Integrate our expert finding capabilities directly into your applications using our RESTful API.
          All API requests require authentication with your API key.
        </p>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication</h3>
          <p className="text-gray-600 mb-4">
            Include your API key in the headers of all requests:
          </p>
          <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
          </div>
        </div>
      </motion.div>
      
      <div className="space-y-12">
        {endpoints.map((endpoint, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            variants={itemVariants}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`inline-block px-2 py-1 text-sm font-bold rounded-md ${
                endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 
                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : 
                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {endpoint.method}
              </span>
              <code className="font-mono text-gray-900">{endpoint.path}</code>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{endpoint.name}</h3>
            <p className="text-gray-600 mb-4">{endpoint.description}</p>
            
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Parameters</h4>
            <div className="bg-gray-50 rounded-md overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {endpoint.parameters.map((param, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{param.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{param.type}</td>
                      <td className="px-4 py-3 text-sm">
                        {param.required ? (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Required
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            Optional
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
              Response
            </h4>
            <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
              <pre><code>{endpoint.response.code}</code></pre>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ApiDocs;