import React from 'react';
import { DocumentSidebar } from './DocumentSidebar';
import { DocumentHeader } from './DocumentHeader';
import { RoleSwitcher } from '../common/RoleSwitcher';

interface DocumentLayoutProps {
  children: React.ReactNode;
}

export function DocumentLayout({ children }: DocumentLayoutProps) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Top Bar with DraftSign branding and role switcher */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DraftSign</h1>
              <p className="text-xs text-gray-500">Document Management</p>
            </div>
          </div>
        </div>
        
        <RoleSwitcher />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <DocumentSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <DocumentHeader />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}