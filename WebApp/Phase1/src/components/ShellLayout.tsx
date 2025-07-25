import React from 'react';
import { RoleBasedSidebar } from './dashboard/RoleBasedSidebar';

export const ShellLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex h-screen bg-gray-50">
    <RoleBasedSidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      {children}
    </div>
  </div>
); 