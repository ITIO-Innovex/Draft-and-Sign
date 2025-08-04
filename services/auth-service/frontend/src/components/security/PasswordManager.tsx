import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface PasswordManagerProps {
  onClose: () => void;
}

export const PasswordManager: React.FC<PasswordManagerProps> = ({ onClose }) => {
  const { changePassword, isLoading, securitySettings } = useProfileStore();
  const [showPasswords, setShowPasswords] = React.useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const newPassword = watch('newPassword') || '';

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'One special character', test: (pwd: string) => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const onSubmit = async (data: any) => {
    try {
      await changePassword(data.currentPassword, data.newPassword);
      onClose();
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const daysSinceLastChange = securitySettings.passwordLastChanged
    ? Math.floor((Date.now() - new Date(securitySettings.passwordLastChanged).getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-6">
      {/* Current Password Info */}
      {daysSinceLastChange !== null && (
        <div className={`p-4 rounded-lg border ${
          daysSinceLastChange > 90 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
        }`}>
          <div className="flex items-center space-x-2">
            {daysSinceLastChange > 90 ? (
              <XCircle className="h-5 w-5 text-yellow-600" />
            ) : (
              <CheckCircle className="h-5 w-5 text-green-600" />
            )}
            <div>
              <p className={`font-medium ${
                daysSinceLastChange > 90 ? 'text-yellow-800' : 'text-green-800'
              }`}>
                Password last changed {daysSinceLastChange} days ago
              </p>
              {daysSinceLastChange > 90 && (
                <p className="text-sm text-yellow-700">
                  Consider updating your password for better security
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div className="relative">
          <Input
            {...register('currentPassword')}
            type={showPasswords.current ? 'text' : 'password'}
            label="Current Password"
            placeholder="Enter your current password"
            error={errors.currentPassword?.message}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => togglePasswordVisibility('current')}
          >
            {showPasswords.current ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <Input
            {...register('newPassword')}
            type={showPasswords.new ? 'text' : 'password'}
            label="New Password"
            placeholder="Enter your new password"
            error={errors.newPassword?.message}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => togglePasswordVisibility('new')}
          >
            {showPasswords.new ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Password Requirements */}
        {newPassword && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Password Requirements</h4>
            <div className="space-y-2">
              {passwordRequirements.map((req, index) => {
                const isValid = req.test(newPassword);
                return (
                  <div key={index} className="flex items-center space-x-2">
                    {isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      isValid ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <Input
            {...register('confirmPassword')}
            type={showPasswords.confirm ? 'text' : 'password'}
            label="Confirm New Password"
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            onClick={() => togglePasswordVisibility('confirm')}
          >
            {showPasswords.confirm ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Security Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Security Tips</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use a unique password that you don't use elsewhere</li>
            <li>• Consider using a password manager</li>
            <li>• Change your password regularly (every 90 days)</li>
            <li>• Don't share your password with anyone</li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};