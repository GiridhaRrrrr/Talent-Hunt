import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleUnsubscribe = () => {
    navigate('/unsubscribe');
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <img 
                className="h-18 w-18" 
                src="/logo.png" 
                alt="Pro-Found" 
              />
              <span className="ml-2 text-xl font-bold">Pro-Found</span>
            </div>
            <p className="mt-4 text-gray-300">
              Identifying domain experts with 10+ years of experience using minimal inputs.
              Our platform helps you find the most experienced professionals in any field.
            </p>
            <button 
              onClick={handleUnsubscribe}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors duration-300"
            >
              Unsubscribe
            </button>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/app/direct-service" className="text-gray-300 hover:text-white transition-colors">
                  Web Service
                </Link>
              </li>
              <li>
                <Link to="/app/extension" className="text-gray-300 hover:text-white transition-colors">
                  Chrome Extension
                </Link>
              </li>
              <li>
                <Link to="/app/api-service" className="text-gray-300 hover:text-white transition-colors">
                  API Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} ProFound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;