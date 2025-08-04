import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { forgotPasswordSchema } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ForgotPasswordData {
  email: string;
}

export const ForgotPasswordForm: React.FC = () => {
  const { resetPassword, isLoading } = useAuthStore();
  const [emailSent, setEmailSent] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await resetPassword(data.email);
      setEmailSent(true);
    } catch (error) {
      // Error handling is done in the store
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-6">
        <div className="bg-green-50 p-6 rounded-lg">
          <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Check Your Email
          </h3>
          <p className="text-gray-600">
            We've sent a password reset link to{' '}
            <span className="font-medium">{getValues('email')}</span>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <Button
            variant="outline"
            onClick={() => setEmailSent(false)}
            className="w-full"
          >
            Try Again
          </Button>
        </div>

        <Link
          to="/login"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">Reset Your Password</h3>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <Input
        {...register('email')}
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        Send Reset Link
      </Button>

      <Link
        to="/login"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sign In
      </Link>
    </form>
  );
};