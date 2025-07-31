import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard, FileSignature, Scissors, Settings, BookTemplate as Template, ChevronRight } from 'lucide-react';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    current: true,
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    current: false,
    // comingSoon: true,
  },
  {
    name: 'E-Signatures',
    href: '/signatures',
    icon: FileSignature,
    current: false,
    // comingSoon: true,
  },
  {
    name: 'PDF Tools',
    href: '/pdf-tools',
    icon: Scissors,
    current: false,
    // comingSoon: true,
  },
  {
    name: 'Templates',
    href: '/templates',
    icon: Template,
    current: false,
    // comingSoon: true,
  },
  {
    name: 'Settings',
    href: '/profile',
    icon: Settings,
    current: false,
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900">DraftnSign</span>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200
                   ${isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                   `}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {isActive && <ChevronRight className="h-4 w-4" />}
                </Link>

              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};