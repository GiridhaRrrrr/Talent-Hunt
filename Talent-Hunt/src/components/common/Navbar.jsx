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
                className="h-18 w-18" 
                src="/logo.png" 
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
</span>    </Link>
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