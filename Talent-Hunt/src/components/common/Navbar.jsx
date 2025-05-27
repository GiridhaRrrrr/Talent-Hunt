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
                src="data:image/jpeg;base64,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" 
                alt="Pro-Found Logo" 
              />
              <span className="ml-2 text-2xl font-black relative inline-flex group">
              {/* Pro- section */}
              <span className="relative overflow-hidden mr-1">
                <span className="font-serif tracking-wider font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 animate-gradient-x inline-block transform-gpu">
                  <span className="inline-block animate-float-slow hover:animate-pulse text-3xl">P</span>
                  <span className="inline-block animate-float-medium hover:animate-pulse text-3xl">r</span>
                  <span className="inline-block animate-float-fast hover:animate-pulse text-3xl">o</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </span>
              
              {/* Hyphen with special effect */}
              <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mx-1 animate-pulse inline-block transform-gpu hover:rotate-45 transition-transform duration-300 text-3xl">-</span>
              
              {/* Found section */}
              <span className="relative overflow-hidden">
                <span className="font-serif tracking-wider font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 animate-gradient-x inline-block transform-gpu">
                  <span className="inline-block animate-float-fast hover:animate-pulse text-3xl">F</span>
                  <span className="inline-block animate-float-medium hover:animate-pulse text-3xl">o</span>
                  <span className="inline-block animate-float-slow hover:animate-pulse text-3xl">u</span>
                  <span className="inline-block animate-float-medium hover:animate-pulse text-3xl">n</span>
                  <span className="inline-block animate-float-fast hover:animate-pulse text-3xl">d</span>
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </span>
              
              {/* Background glow effect */}
              <span className="absolute -inset-1 bg-gradient-to-r from-violet-400/10 to-rose-400/10 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
              </span>
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