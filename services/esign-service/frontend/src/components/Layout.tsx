import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  BarChart3, 
  Settings, 
  User, 
  Bell,
  Search,
  Menu,
  X,
  Shield,
  Zap,
  UserCog
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useApp();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: FileText },
    { name: 'Create Envelope', href: '/create', icon: Plus },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Enterprise', href: '/enterprise', icon: Shield },
    { name: 'Admin', href: '/admin', icon: UserCog },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
       

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
                {item.name === 'Enterprise' && (
                  <span className="ml-auto px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    New
                  </span>
                )}
                {item.name === 'Admin' && (
                  <span className="ml-auto px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Admin
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

    
       
      </div>
      <div>     

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;