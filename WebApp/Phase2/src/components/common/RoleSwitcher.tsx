import React from 'react';
import { User, Shield, Crown } from 'lucide-react';

import { UserRole } from '../../types';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const roleConfig = {
  regularUser: {
    label: 'Regular User',
    icon: User,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  },
  team_admin: {
    label: 'Team Admin',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  super_admin: {
    label: 'Super Admin',
    icon: Crown,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  }
};

// Fallback user data when auth store is not available
const fallbackUser = {
  id: 'default-user',
  name: 'User',
  email: 'user@example.com',
  role: 'regularUser' as UserRole,
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop'
};

export function RoleSwitcher() {
  // Use fallback user data to avoid store issues
  const currentUser = fallbackUser;
  const setCurrentUser: ((role: UserRole) => void) | null = null;
  
  const currentRole = roleConfig[currentUser.role];
  const CurrentIcon = currentRole.icon;

  return (
    <div className="flex items-center space-x-4">
      {/* Current User Info */}
      <div className="flex items-center space-x-3">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
          <div className="flex items-center space-x-1">
            <CurrentIcon className={cn("w-3 h-3", currentRole.color)} />
            <p className={cn("text-xs font-medium", currentRole.color)}>
              {currentRole.label}
            </p>
          </div>
        </div>
      </div>

      {/* Role Switcher - Disabled for now */}
      <div className="text-xs text-gray-500">
        Role switching disabled
      </div>
    </div>
  );
}