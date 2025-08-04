import React from 'react';
import { Outlet } from 'react-router-dom';
import { RoleBasedSidebar } from '../dashboard/RoleBasedSidebar';
import { Header } from '../dashboard/Header';

export const MainShell: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <RoleBasedSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 