// src/components/auth/Signup/Signup.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../../store/AuthSlice';
import { authServices } from '../../services/appwrite';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import AuthLayout from '../../components/layout/AuthLayout';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Track field focus states for animation
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      const session = await authServices.createAccount({
        email: formData.email,
        password: formData.password,
        userName: formData.userName
      });

      const userData = await authServices.getCurrentUser();
      
      if (userData) {
        dispatch(logIn({ userData }));
        navigate('/app/direct-service');
      } else {
        setError('Failed to get user data');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Join us to access all features and services
        </p>
  
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div className="relative">
                <label 
                  htmlFor="userName" 
                  className={`block text-sm font-medium transition-all duration-200 ${
                    focusedField === 'userName' ? 'text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === 'userName' ? 'text-indigo-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('userName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="johndoe"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                      sm:text-sm bg-white hover:bg-gray-50 focus:bg-white"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Choose a unique username for your account
                </p>
              </div>

              {/* Email Field */}
              <div className="relative">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium transition-all duration-200 ${
                    focusedField === 'email' ? 'text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className={`h-5 w-5 transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-indigo-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                      sm:text-sm bg-white hover:bg-gray-50 focus:bg-white"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  We'll never share your email with anyone else
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password Field */}
                <div className="relative">
                  <label 
                    htmlFor="password" 
                    className={`block text-sm font-medium transition-all duration-200 ${
                      focusedField === 'password' ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === 'password' ? 'text-indigo-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                        sm:text-sm bg-white hover:bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    At least 8 characters
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <label 
                    htmlFor="confirmPassword" 
                    className={`block text-sm font-medium transition-all duration-200 ${
                      focusedField === 'confirmPassword' ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className={`h-5 w-5 transition-colors duration-200 ${
                        focusedField === 'confirmPassword' ? 'text-indigo-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200
                        sm:text-sm bg-white hover:bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Re-enter password
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                    text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                    transition-all duration-200 transform hover:scale-[1.01] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : 'Create Account'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 lg:border-l lg:border-gray-200 lg:pl-8">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Why create an account?</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Access to exclusive features and services</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Save your preferences and settings</span>
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Receive important updates and notifications</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Sign up with</h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.0003 2C6.47631 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65731 21.127 10.4383 21.879V14.89H7.89831V12H10.4383V9.797C10.4383 7.291 11.9313 5.907 14.2153 5.907C15.3083 5.907 16.4543 6.102 16.4543 6.102V8.562H15.1913C13.9503 8.562 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3433 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5233 2 12.0003 2Z" />
                  </svg>
                  <span>Continue with Facebook</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.9999 2C6.47791 2 1.99991 6.478 1.99991 12C1.99991 17.522 6.47791 22 11.9999 22C17.5219 22 21.9999 17.522 21.9999 12C21.9999 6.478 17.5219 2 11.9999 2ZM16.2399 9.223L16.2489 9.454C16.2489 12.429 14.0139 15.835 9.99891 15.835C8.69091 15.835 7.46791 15.452 6.42691 14.799C6.61491 14.82 6.80991 14.831 6.99891 14.831C8.07491 14.831 9.07791 14.46 9.86191 13.82C8.85991 13.8 8.00891 13.139 7.72991 12.222C7.87991 12.247 8.03491 12.261 8.19391 12.261C8.41591 12.261 8.63191 12.231 8.83891 12.179C7.78491 11.966 7.00891 11.031 7.00891 9.906V9.878C7.30491 10.044 7.64691 10.147 8.00891 10.16C7.40091 9.752 7.00891 9.067 7.00891 8.2893C7.00891 7.869 7.12091 7.478 7.31991 7.138C8.45691 8.535 10.1389 9.446 12.0419 9.544C12.0029 9.379 11.9809 9.205 11.9809 9.031C11.9809 7.759 13.0099 6.727 14.2849 6.727C14.9489 6.727 15.5449 7.013 15.9649 7.472C16.4929 7.37 16.9829 7.184 17.4269 6.928C17.2609 7.452 16.9119 7.892 16.4449 8.172C16.9019 8.114 17.3359 7.989 17.7359 7.815C17.4279 8.263 17.0449 8.664 16.6039 8.992C16.6099 9.069 16.6129 9.146 16.6129 9.223L16.2399 9.223Z" />
                  </svg>
                  <span>Continue with Twitter</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="h-5 w-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.75 16.75H11.25V11.25H12.75V16.75ZM12 9.75C11.59 9.75 11.25 9.41 11.25 9C11.25 8.59 11.59 8.25 12 8.25C12.41 8.25 12.75 8.59 12.75 9C12.75 9.41 12.41 9.75 12 9.75Z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                Already have an account? <span className="underline">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;