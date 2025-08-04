import React from 'react';
import { Outlet } from 'react-router-dom';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <Outlet />
    </div>
  );
};