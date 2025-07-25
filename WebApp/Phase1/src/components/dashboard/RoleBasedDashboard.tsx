import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { RegularUserDashboard } from './RegularUserDashboard';
import { TeamAdminDashboard } from './TeamAdminDashboard';
import { SuperAdminDashboard } from './SuperAdminDashboard';

export const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case 'regularUser':
      return <RegularUserDashboard />;
    case 'teamAdmin':
      return <TeamAdminDashboard />;
    case 'superAdmin':
      return <SuperAdminDashboard />;
    default:
      return <RegularUserDashboard />;
  }
};