import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back! Please sign in to your account."
    >
      <LoginForm />
    </AuthLayout>
  );
};