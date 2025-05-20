// src/components/common/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../store/AuthSlice';
import { authServices } from '../../services/appwrite';

const Navbar = () => {
  const { status: isLoggedIn, userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authServices.logOut();
      dispatch(logOut());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-auto" 
                src="/logo.svg" 
                alt="Veteran Talent Finder" 
              />
              <span className="ml-2 text-xl font-bold text-indigo-800">Veteran Talent Finder</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/about" className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
            <Link to="/contact" className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors">Contact</Link>
            
            {isLoggedIn ? (
              <div className="ml-4 flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {userData?.name || 'User'}
                </span>
                <Link 
                  to="/app/account" 
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* X icon */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link 
            to="/" 
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="block px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isLoggedIn ? (
            <div className="px-4 space-y-3">
              <div className="text-base font-medium text-gray-800">
                {userData?.name || 'User'}
              </div>
              <Link 
                to="/app/account" 
                className="block px-3 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-red-600 hover:text-red-800 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4 space-y-3">
              <Link 
                to="/login" 
                className="block px-3 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;