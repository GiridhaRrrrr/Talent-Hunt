// src/pages/NotFoundPage/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/layout';

const NotFoundPage = () => {
  return (
    <MainLayout>
      <div className="min-h-screen flex flex-col bg-white pt-16 pb-12">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link to="/" className="inline-flex">
              <span className="sr-only">Veteran Talent Finder</span>
              <img className="h-12 w-auto" src="/logo.svg" alt="Veteran Talent Finder" />
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">404 error</p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found.</h1>
              <p className="mt-2 text-base text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
              <div className="mt-6">
                <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Go back home<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;