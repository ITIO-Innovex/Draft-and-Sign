import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types';

interface FeatureGateProps {
  children: React.ReactNode;
  permission?: string;
  role?: UserRole;
  resource?: string;
  fallback?: React.ReactNode;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  children,
  permission,
  role,
  resource,
  fallback = null,
}) => {
  const { checkPermission, hasRole, canAccess } = useAuthStore();

  let hasAccess = true;

  if (permission) {
    hasAccess = hasAccess && checkPermission(permission);
  }

  if (role) {
    hasAccess = hasAccess && hasRole(role);
  }

  if (resource) {
    hasAccess = hasAccess && canAccess(resource);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};