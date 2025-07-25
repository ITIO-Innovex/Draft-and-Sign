import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { User, Settings, FileSignature as Signature, Shield, Bell, CreditCard, BarChart3 } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';
import { RoleSwitcher } from '../testing/RoleSwitcher';

const navigationItems = [
  {
    name: 'Profile Overview',
    href: '/profile',
    icon: User,
  },
  {
    name: 'Signatures',
    href: '/signatures',
    icon: Signature,
  },
  {
    name: 'Security',
    href: '/security',
    icon: Shield,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    name: 'Account & Billing',
    href: '/account',
    icon: CreditCard,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    adminOnly: true,
  },
];

export const TestLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useProfileStore();

  const filteredNavigation = navigationItems.filter(item => 
    !item.adminOnly || (user?.role === 'teamAdmin' || user?.role === 'superAdmin')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                DraftSign Profile & Signatures
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <RoleSwitcher />
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};