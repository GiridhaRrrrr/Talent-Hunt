// src/components/landing/ServiceOptions/ServiceOptions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceOptions = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'direct',
      title: 'Web Service',
      description: 'Search for experts directly through our web interface. No installation required.',
      icon: '🔎',
      primaryFeature: 'Instant Results',
      features: [
        'Simple two-field search',
        'Detailed expert profiles',
        'No installation needed',
        'Results in < 10 seconds'
      ],
      path: '/app/direct-service'
    },
    {
      id: 'extension',
      title: 'Chrome Extension',
      description: 'Install our Chrome extension to find experts while browsing LinkedIn or other platforms.',
      icon: '🧩',
      primaryFeature: 'Search as You Browse',
      features: [
        'Context-aware searches',
        'One-click installation',
        'Works offline',
        'Automatic domain detection'
      ],
      path: '/app/extension'
    },
    {
      id: 'api',
      title: 'API Service',
      description: 'Integrate our expert finding capabilities directly into your applications.',
      icon: '⚙️',
      primaryFeature: 'Full Integration',
      features: [
        'RESTful API',
        'Comprehensive documentation',
        'Custom result formatting',
        '10,000 searches/month'
      ],
      path: '/app/api-service'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose How You Want to Use Our Service
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We offer multiple ways to access our veteran talent finding capabilities
          </p>
        </div>
        
        <motion.div 
          className="mt-12 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(service.path)}
              variants={itemVariants}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mt-2 text-gray-600">{service.description}</p>
                
                <div className="mt-6">
                  <h4 className="font-medium text-indigo-600">{service.primaryFeature}</h4>
                  <ul className="mt-2 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 flex justify-center">
                <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                  Select {service.title}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceOptions;