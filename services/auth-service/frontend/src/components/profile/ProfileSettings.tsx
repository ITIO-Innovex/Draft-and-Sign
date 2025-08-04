import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../utils/validation';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { User } from '../../types';

export const ProfileSettings: React.FC = () => {
  const { user, updateProfile, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<User>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data: Partial<User>) => {
    try {
      await updateProfile(data);
    } catch (error) {
      // Error handling is done in the store
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 text-sm text-gray-600">
            Update your personal information and contact details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('name')}
              label="Full Name"
              placeholder="Enter your full name"
              error={errors.name?.message}
            />

            <Input
              {...register('email')}
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              {...register('company')}
              label="Company"
              placeholder="Enter your company name"
              error={errors.company?.message}
            />

            <Input
              {...register('phone')}
              type="tel"
              label="Phone Number"
              placeholder="Enter your phone number"
              error={errors.phone?.message}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};