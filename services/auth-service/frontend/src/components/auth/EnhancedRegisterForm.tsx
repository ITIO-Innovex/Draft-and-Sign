import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Building, User, Users, Crown } from 'lucide-react';
import { enhancedRegisterSchema, passwordStrength } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { RegisterData, UserRole } from '../../types';

export const EnhancedRegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegisterData>>({});

  // Step 1 form - Basic Information
  const step1Form = useForm({
    resolver: zodResolver(enhancedRegisterSchema.step1),
    defaultValues: formData,
  });

  // Step 2 form - Account Type & Organization
  const step2Form = useForm({
    resolver: zodResolver(enhancedRegisterSchema.step2),
    defaultValues: formData,
  });

  // Step 3 form - Profile Details
  const step3Form = useForm({
    resolver: zodResolver(enhancedRegisterSchema.step3),
    defaultValues: formData,
  });

  // Step 4 form - Welcome
  const step4Form = useForm({
    resolver: zodResolver(enhancedRegisterSchema.step4),
    defaultValues: formData,
  });

  const password = step1Form.watch('password') || '';
  const strength = passwordStrength(password);
  const accountType = step2Form.watch('accountType');

  const onStep1Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(2);
  };

  const onStep2Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(3);
  };

  const onStep3Submit = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(4);
  };

  const onStep4Submit = async (data: any) => {
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
    { number: 2, title: 'Account Type', completed: step > 2 },
    { number: 3, title: 'Profile Info', completed: step > 3 },
    { number: 4, title: 'Welcome', completed: false },
  ];

  const accountTypes = [
    {
      id: 'personal',
      title: 'Personal Account',
      description: 'For individual use and personal documents',
      icon: User,
      features: ['3 signatures', '1GB storage', '10 envelopes/month'],
      role: 'regularUser' as UserRole,
    },
    {
      id: 'business',
      title: 'Business Account',
      description: 'For teams and organizations',
      icon: Building,
      features: ['Unlimited signatures', '50GB storage', '100 envelopes/month', 'Team management'],
      role: 'teamAdmin' as UserRole,
    },
    {
      id: 'enterprise',
      title: 'Enterprise Account',
      description: 'For large organizations with advanced needs',
      icon: Crown,
      features: ['Everything in Business', 'Advanced security', 'Custom integrations', 'Priority support'],
      role: 'teamAdmin' as UserRole,
    },
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

      {/* Step 1: Basic Information */}
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

      {/* Step 2: Account Type & Organization */}
      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(onStep2Submit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Your Account Type</h3>
            <div className="grid grid-cols-1 gap-4">
              {accountTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <label
                    key={type.id}
                    className={`
                      relative flex cursor-pointer rounded-lg border p-4 focus:outline-none
                      ${step2Form.watch('accountType') === type.id
                        ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }
                    `}
                  >
                    <input
                      {...step2Form.register('accountType')}
                      type="radio"
                      value={type.id}
                      className="sr-only"
                    />
                    <div className="flex items-start space-x-3 w-full">
                      <div className={`p-2 rounded-lg ${
                        step2Form.watch('accountType') === type.id ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          step2Form.watch('accountType') === type.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{type.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <ul className="mt-2 space-y-1">
                          {type.features.map((feature, index) => (
                            <li key={index} className="text-sm text-gray-500 flex items-center">
                              <Check className="h-3 w-3 text-green-500 mr-1" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {accountType === 'business' && (
            <div className="space-y-4">
              <Input
                {...step2Form.register('organizationName')}
                label="Organization Name"
                placeholder="Enter your company name"
                error={step2Form.formState.errors.organizationName?.message}
              />
              
              <Input
                {...step2Form.register('inviteCode')}
                label="Invite Code (Optional)"
                placeholder="Enter invite code to join existing organization"
                error={step2Form.formState.errors.inviteCode?.message}
              />
              
              <p className="text-sm text-gray-600">
                Leave invite code empty to create a new organization, or enter a code to join an existing one.
              </p>
            </div>
          )}

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

      {/* Step 3: Profile Details */}
      {step === 3 && (
        <form onSubmit={step3Form.handleSubmit(onStep3Submit)} className="space-y-4">
          <Input
            {...step3Form.register('name')}
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            error={step3Form.formState.errors.name?.message}
          />

          <Input
            {...step3Form.register('company')}
            type="text"
            label="Company"
            placeholder="Enter your company name"
            error={step3Form.formState.errors.company?.message}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              {...step3Form.register('position')}
              type="text"
              label="Job Title"
              placeholder="Enter your job title"
              error={step3Form.formState.errors.position?.message}
            />

            <Input
              {...step3Form.register('department')}
              type="text"
              label="Department"
              placeholder="Enter your department"
              error={step3Form.formState.errors.department?.message}
            />
          </div>

          <Input
            {...step3Form.register('phone')}
            type="tel"
            label="Phone Number"
            placeholder="Enter your phone number"
            error={step3Form.formState.errors.phone?.message}
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

      {/* Step 4: Welcome */}
      {step === 4 && (
        <form onSubmit={step4Form.handleSubmit(onStep4Submit)} className="space-y-6">
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

            {accountType && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Your Account Summary</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Account Type: {accountTypes.find(t => t.id === accountType)?.title}</p>
                  <p>Role: {accountTypes.find(t => t.id === accountType)?.role === 'regularUser' ? 'Regular User' : 'Team Admin'}</p>
                  {formData.organizationName && <p>Organization: {formData.organizationName}</p>}
                </div>
              </div>
            )}
          </div>

          <label className="flex items-start space-x-3">
            <input
              {...step4Form.register('acceptTerms')}
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
          {step4Form.formState.errors.acceptTerms && (
            <p className="text-sm text-red-600">{step4Form.formState.errors.acceptTerms.message}</p>
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