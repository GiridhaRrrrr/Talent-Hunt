    // src/pages/LoginPage/LoginPage.jsx
import React from 'react';
import { AuthLayout } from '../components/layout';
import { Login } from '../components/auth';

const LoginPage = () => {
  return (
    <AuthLayout title="Sign in to your account">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;