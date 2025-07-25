import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { registerStep1Schema, registerStep2Schema, registerStep3Schema, passwordStrength } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { RegisterData } from '../../types';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  // Step 1 form
  const step1Form = useForm({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: formData,
  });

  // Step 2 form
  const step2Form = useForm({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: formData,
  });

  // Step 3 form
  const step3Form = useForm({
    resolver: zodResolver(registerStep3Schema),
    defaultValues: formData,
  });

  const password = step1Form.watch('password') || '';
  const strength = passwordStrength(password);

  const onStep1Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const onStep2Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const onStep3Submit = async (data: any) => {
    const finalData = { ...formData, ...data } as RegisterData;
    try {
      await registerUser(finalData);
      navigate('/dashboard');
    } catch (error) {
      // Error handling is done in the store
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = [
    { number: 1, title: 'Account Details', completed: step > 1 },
    { number: 2, title: 'Personal Info', completed: step > 2 },
    { number: 3, title: 'Welcome', completed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((s, index) => (
          <React.Fragment key={s.number}>
            <div className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${s.completed ? 'bg-green-600 text-white' : 
                  s.number === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
              `}>
                {s.completed ? <Check className="h-4 w-4" /> : s.number}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                s.number === step ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-px mx-4 ${
                s.completed ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Account Details */}
      {step === 1 && (
        <form onSubmit={step1Form.handleSubmit(onStep1Submit)} className="space-y-4">
          <Input
            {...step1Form.register('email')}
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            error={step1Form.formState.errors.email?.message}
          />

          <div className="space-y-2">
            <Input
              {...step1Form.register('password')}
              type="password"
              label="Password"
              placeholder="Create a password"
              showPasswordToggle
              error={step1Form.formState.errors.password?.message}
            />
            {password && (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: `${(strength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{strength.text}</span>
                </div>
              </div>
            )}
          </div>

          <Input
            {...step1Form.register('confirmPassword')}
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            showPasswordToggle
            error={step1Form.formState.errors.confirmPassword?.message}
          />

          <Button type="submit" className="w-full">
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Step 2: Personal Info */}
      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-4">
          <Input
            {...step2Form.register('name')}
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            error={step2Form.formState.errors.name?.message}
          />

          <Input
            {...step2Form.register('company')}
            type="text"
            label="Company (Optional)"
            placeholder="Enter your company name"
            error={step2Form.formState.errors.company?.message}
          />

          <Input
            {...step2Form.register('phone')}
            type="tel"
            label="Phone Number (Optional)"
            placeholder="Enter your phone number"
            error={step2Form.formState.errors.phone?.message}
          />

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={goBack} className="flex-1">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="flex-1">
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Welcome */}
      {step === 3 && (
        <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-6">
          <div className="text-center space-y-4">
            <div className="bg-green-50 p-6 rounded-lg">
              <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                You're almost done!
              </h3>
              <p className="text-gray-600">
                Welcome to DraftnSign! You're about to experience the future of document management and e-signatures.
              </p>
            </div>
          </div>

          <label className="flex items-start space-x-3">
            <input
              {...step3Form.register('acceptTerms')}
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </a>
            </span>
          </label>
          {step3Form.formState.errors.acceptTerms && (
            <p className="text-sm text-red-600">{step3Form.formState.errors.acceptTerms.message}</p>
          )}

          <div className="flex space-x-3">
            <Button type="button" variant="outline" onClick={goBack} className="flex-1">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="flex-1" loading={isLoading} disabled={isLoading}>
              Create Account
            </Button>
          </div>
        </form>
      )}

      {step === 1 && (
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};