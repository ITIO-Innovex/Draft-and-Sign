import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { UserRole } from '../../types';

export const RoleSwitcher: React.FC = () => {
  const { user, setUserRole } = useProfileStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const roles: { value: UserRole; label: string; description: string }[] = [
    {
      value: 'regularUser',
      label: 'Regular User',
      description: 'Basic profile and signature features',
    },
    {
      value: 'teamAdmin',
      label: 'Team Admin',
      description: 'Corporate seals and team management',
    },
    {
      value: 'superAdmin',
      label: 'Super Admin',
      description: 'Full system access and analytics',
    },
  ];

  const currentRole = roles.find(role => role.value === user?.role);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>Role: {currentRole?.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Switch User Role
              </p>
            </div>
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => {
                  setUserRole(role.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200
                  ${user?.role === role.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                `}
              >
                <div className="font-medium">{role.label}</div>
                <div className="text-xs text-gray-500 mt-1">{role.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};