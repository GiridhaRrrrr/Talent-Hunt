import React from 'react';
import { AuthLayout } from '../components/layout';
import { Signup } from '../components/auth';

const SignupPage = () => {
  return (
    <AuthLayout title="Create your account">
      <Signup />
    </AuthLayout>
  );
};

export default SignupPage;