// src/routes/ProtectedRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import DirectServicePage from '../pages/DirectServicePage';
import ExtensionPage from '../pages/ExtensionPage';
import ApiServicePage from '../pages/ApiServicePage';
import ExpertDetailPage from '../pages/ExpertDetailPage';
// import AccountPage from '../pages/AccountPage';
import NotFoundPage from '../pages/PageNotFound';

// Auth Guard
import AuthGuard from '../components/auth/AuthGuard';

const ProtectedRoutes = () => {
  const { status: isLoggedIn } = useSelector(state => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <AuthGuard>
      <Routes>
        <Route path="direct-service" element={<DirectServicePage />} />
        <Route path="extension" element={<ExtensionPage />} />
        <Route path="api-service" element={<ApiServicePage />} />
        <Route path="expert/:id" element={<ExpertDetailPage />} />
        {/* <Route path="account" element={<AccountPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthGuard>
  );
};

export default ProtectedRoutes;