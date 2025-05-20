// src/pages/AccountPage/AccountPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { MainLayout } from '../components/layout';

const AccountPage = () => {
  const { userData } = useSelector(state => state.auth);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Account
          </h1>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-indigo-700 font-medium">
                {userData?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-gray-900">{userData?.name || 'User'}</h2>
              <p className="text-gray-600">{userData?.email || 'No email available'}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Account Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium text-gray-900">{userData?.name || 'Not set'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{userData?.email || 'Not set'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">
                  {userData?.$createdAt 
                    ? new Date(userData.$createdAt).toLocaleDateString() 
                    : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">API Usage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">API Calls (This Month)</p>
                <p className="text-2xl font-bold text-gray-900">1,254</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-500">Remaining Quota</p>
                <p className="text-2xl font-bold text-gray-900">8,746</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="btn btn-primary">Edit Profile</button>
            <button className="btn btn-secondary">Change Password</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AccountPage;