import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint, Shield, CreditCard, Video, Smartphone, Key } from 'lucide-react';
import { loginSchema } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { LoginCredentials } from '../../types';

export const AdvancedLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [selectedAuthMethod, setSelectedAuthMethod] = useState('password');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const authMethods = [
    {
      id: 'password',
      name: 'Password',
      description: 'Standard email and password',
      icon: Key,
      securityLevel: 'Basic',
      available: true,
    },
    {
      id: 'biometric',
      name: 'Biometric',
      description: 'Fingerprint or face recognition',
      icon: Fingerprint,
      securityLevel: 'High',
      available: true,
    },
    {
      id: 'government_id',
      name: 'Government ID',
      description: 'Verify with government-issued ID',
      icon: Shield,
      securityLevel: 'Maximum',
      available: true,
    },
    {
      id: 'smart_card',
      name: 'Smart Card',
      description: 'Hardware security key or smart card',
      icon: CreditCard,
      securityLevel: 'Maximum',
      available: false,
    },
    {
      id: 'video',
      name: 'Video Verification',
      description: 'Live video identity verification',
      icon: Video,
      securityLevel: 'Maximum',
      available: false,
    },
    {
      id: 'sms',
      name: 'SMS Code',
      description: 'Verification code via SMS',
      icon: Smartphone,
      securityLevel: 'Standard',
      available: true,
    },
  ];

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login({ ...data, authMethod: selectedAuthMethod });
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the store
    }
  };

  const getSecurityLevelColor = (level: string) => {
    switch (level) {
      case 'Basic': return 'text-gray-600 bg-gray-100';
      case 'Standard': return 'text-blue-600 bg-blue-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Maximum': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Authentication Method Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Authentication Method
          </label>
          <button
            type="button"
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {authMethods
            .filter(method => showAdvancedOptions || method.id === 'password' || method.id === 'biometric')
            .map((method) => {
              const Icon = method.icon;
              return (
                <label
                  key={method.id}
                  className={`
                    relative flex cursor-pointer rounded-lg border p-3 focus:outline-none
                    ${selectedAuthMethod === method.id
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                      : method.available 
                        ? 'border-gray-300 hover:border-gray-400'
                        : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={method.id}
                    checked={selectedAuthMethod === method.id}
                    onChange={(e) => setSelectedAuthMethod(e.target.value)}
                    disabled={!method.available}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`p-2 rounded ${
                      selectedAuthMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        selectedAuthMethod === method.id ? 'text-blue-600' : 
                        method.available ? 'text-gray-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${
                          method.available ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {method.name}
                          {!method.available && (
                            <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>
                          )}
                        </h4>
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${getSecurityLevelColor(method.securityLevel)}
                        `}>
                          {method.securityLevel}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        method.available ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {method.description}
                      </p>
                    </div>
                  </div>
                </label>
              );
            })}
        </div>
      </div>

      {/* Standard Login Fields */}
      {(selectedAuthMethod === 'password' || selectedAuthMethod === 'sms') && (
        <>
          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            error={errors.email?.message}
          />

          {selectedAuthMethod === 'password' && (
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Enter your password"
              showPasswordToggle
              error={errors.password?.message}
            />
          )}

          {selectedAuthMethod === 'sms' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                A verification code will be sent to your registered phone number after you click "Sign In".
              </p>
            </div>
          )}
        </>
      )}

      {/* Biometric Authentication */}
      {selectedAuthMethod === 'biometric' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <Fingerprint className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-green-900 mb-2">Biometric Authentication</h3>
          <p className="text-sm text-green-800 mb-4">
            Use your fingerprint or face recognition to sign in securely.
          </p>
          <Button type="button" variant="outline" className="bg-white">
            Start Biometric Scan
          </Button>
        </div>
      )}

      {/* Government ID Verification */}
      {selectedAuthMethod === 'government_id' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 mb-2">Government ID Verification</h3>
          <p className="text-sm text-red-800 mb-4">
            Verify your identity using a government-issued ID document.
          </p>
          <Button type="button" variant="outline" className="bg-white">
            Upload ID Document
          </Button>
        </div>
      )}

      {/* Remember Me and Forgot Password */}
      {selectedAuthMethod === 'password' && (
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              {...register('remember')}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        disabled={isLoading}
      >
        {selectedAuthMethod === 'password' ? 'Sign In' :
         selectedAuthMethod === 'sms' ? 'Send Verification Code' :
         selectedAuthMethod === 'biometric' ? 'Authenticate with Biometrics' :
         'Verify Identity'}
      </Button>

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-gray-900">Security Notice</h4>
            <p className="text-xs text-gray-600 mt-1">
              Your authentication method determines the security level of your session. 
              Higher security methods provide access to more sensitive features.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};