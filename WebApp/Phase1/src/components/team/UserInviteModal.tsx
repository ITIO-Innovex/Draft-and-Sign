import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Mail, Plus, Trash2 } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { RoleIndicator } from '../ui/RoleIndicator';
import { UserRole } from '../../types';

const inviteSchema = z.object({
  emails: z.array(z.string().email('Invalid email address')).min(1, 'At least one email is required'),
  role: z.enum(['regularUser', 'teamAdmin']),
  department: z.string().optional(),
  customMessage: z.string().optional(),
});

interface UserInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserInviteModal: React.FC<UserInviteModalProps> = ({ isOpen, onClose }) => {
  const [emails, setEmails] = useState<string[]>(['']);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      role: 'regularUser' as UserRole,
      department: '',
      customMessage: '',
    },
  });

  const selectedRole = watch('role');

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Filter out empty emails
      const validEmails = emails.filter(email => email.trim() !== '');
      
      const inviteData = {
        ...data,
        emails: validEmails,
      };
      
      console.log('Sending invitations:', inviteData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form and close modal
      reset();
      setEmails(['']);
      onClose();
      
      // Show success message (you could use a toast here)
      alert(`Invitations sent to ${validEmails.length} email(s)`);
    } catch (error) {
      console.error('Error sending invitations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const departments = [
    'Engineering',
    'Sales',
    'Marketing',
    'Operations',
    'HR',
    'Finance',
    'Legal',
    'Customer Success',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Invite Team Members" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Addresses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Email Addresses
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEmailField}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Email
            </Button>
          </div>
          
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="colleague@company.com"
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                  />
                </div>
                {emails.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEmailField(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Role Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Role Assignment
          </label>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                {...register('role')}
                type="radio"
                value="regularUser"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <RoleIndicator role="regularUser" size="sm" />
                  <span className="font-medium text-gray-900">Regular User</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Can create and manage personal documents and signatures
                </p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                {...register('role')}
                type="radio"
                value="teamAdmin"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <RoleIndicator role="teamAdmin" size="sm" />
                  <span className="font-medium text-gray-900">Team Admin</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Can manage team members, organization settings, and advanced features
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department (Optional)
          </label>
          <select
            {...register('department')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select department...</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Message (Optional)
          </label>
          <textarea
            {...register('customMessage')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a personal message to the invitation..."
          />
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Invitation Preview</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Recipients will be invited as: <RoleIndicator role={selectedRole} size="sm" /></p>
            <p>They will receive an email with instructions to join your organization.</p>
            <p>Invitations expire in 7 days.</p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            <Mail className="mr-2 h-4 w-4" />
            Send Invitations
          </Button>
        </div>
      </form>
    </Modal>
  );
};