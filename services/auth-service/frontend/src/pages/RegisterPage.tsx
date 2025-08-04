import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join thousands of users who trust DraftnSign for their document needs."
    >
      <RegisterForm />
    </AuthLayout>
  );
};