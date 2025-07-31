import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  FileSearch, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Settings,
  ChevronLeft,
  Building2,
  Lock,
  Globe,
  CheckSquare,
  Archive,
  Network,
  Database
} from 'lucide-react';

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: any) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeView, 
  setActiveView, 
  isOpen, 
  setIsOpen 
}) => {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'regulation-manager', label: 'Regulation Manager', icon: Shield },
    { id: 'audit-administrator', label: 'Audit Administrator', icon: FileSearch },
    { id: 'risk-administrator', label: 'Risk Administrator', icon: AlertTriangle },
    { id: 'bi-manager', label: 'BI Manager', icon: BarChart3 },
    { id: 'privacy-administrator', label: 'Privacy Administrator', icon: Lock },
    { id: 'security-administrator', label: 'Security Administrator', icon: Database },
    { id: 'reporting-administrator', label: 'Reporting Administrator', icon: Archive },
    { id: 'user-management', label: 'User Management', icon: Users },
    { id: 'system-settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <div className={`bg-gray-900 text-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-primary-400" />
              <div>
                <h1 className="text-lg font-bold text-white">Admin Portal</h1>
                <p className="text-xs text-gray-400">Compliance & Analytics</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            <ChevronLeft className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-white' : 'text-gray-400'}`} />
              {isOpen && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="p-4 border-t border-gray-700">
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-sm font-medium text-white">Admin Mode</p>
              <p className="text-xs text-gray-400">Enterprise Compliance</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};