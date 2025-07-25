import React from 'react';
import { Bell, Search, User, Menu, Shield, AlertTriangle } from 'lucide-react';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const adminAlerts = [
    { type: 'critical', message: 'SOX compliance remediation due', count: 1 },
    { type: 'warning', message: 'Audit trail review required', count: 2 },
    { type: 'info', message: 'System maintenance scheduled', count: 1 }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 lg:hidden"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search admin functions..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Admin Alerts */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-1 bg-error-100 text-error-700 rounded-full text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>{adminAlerts.filter(a => a.type === 'critical').reduce((sum, a) => sum + a.count, 0)}</span>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-warning-100 text-warning-700 rounded-full text-sm">
              <Bell className="h-4 w-4" />
              <span>{adminAlerts.filter(a => a.type === 'warning').reduce((sum, a) => sum + a.count, 0)}</span>
            </div>
          </div>

          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-error-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Compliance Administrator</p>
            </div>
            <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};