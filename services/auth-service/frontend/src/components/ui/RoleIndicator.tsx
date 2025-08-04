import React from 'react';
import { Crown, Shield, User } from 'lucide-react';
import { UserRole } from '../../types';
import { getRoleDisplayName, getRoleColor } from '../../utils/roleSystem';

interface RoleIndicatorProps {
  role: UserRole;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const RoleIndicator: React.FC<RoleIndicatorProps> = ({
  role,
  size = 'md',
  showIcon = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const getIcon = (role: UserRole) => {
    switch (role) {
      case 'superAdmin':
        return Crown;
      case 'teamAdmin':
        return Shield;
      default:
        return User;
    }
  };

  const Icon = getIcon(role);

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${getRoleColor(role)}
      ${sizeClasses[size]}
      ${className}
    `}>
      {showIcon && <Icon className={`mr-1 ${iconSizes[size]}`} />}
      {getRoleDisplayName(role)}
    </span>
  );
};