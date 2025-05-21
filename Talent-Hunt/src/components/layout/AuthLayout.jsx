// src/components/layout/AuthLayout/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title }) => {
  return (
      <div className="min-h-screen w-full max-w-7xl mx-auto">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-8 md:px-12 lg:px-16">
          {children}
        </div>
      </div>
  );
};

export default AuthLayout;