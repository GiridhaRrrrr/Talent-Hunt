import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UnsubscribePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    linkedinUsername: '',
    githubProfile: ''
  });
  const [showAnimation, setShowAnimation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAnimation(true);
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Unsubscribe from our services
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We're sorry to see you go. Please fill out the form below to unsubscribe.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {showAnimation ? (
            <div className="text-center py-10">
              <div className="mb-4">
                <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-gray-900">Successfully Unsubscribed</h3>
              <p className="mt-2 text-gray-600">You have been unsubscribed from our services.</p>
              <p className="mt-1 text-gray-600">Redirecting you to the home page...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedinUsername" className="block text-sm font-medium text-gray-700">
                  LinkedIn Username
                </label>
                <div className="mt-1">
                  <input
                    id="linkedinUsername"
                    name="linkedinUsername"
                    type="text"
                    value={formData.linkedinUsername}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="githubProfile" className="block text-sm font-medium text-gray-700">
                  GitHub Profile
                </label>
                <div className="mt-1">
                  <input
                    id="githubProfile"
                    name="githubProfile"
                    type="text"
                    value={formData.githubProfile}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Unsubscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;