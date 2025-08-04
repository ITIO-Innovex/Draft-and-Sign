import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, LayoutDashboard, FileSignature, Scissors, Settings, 
  BookTemplate as Template, ChevronRight, Users, Shield, BarChart3,
  Building, Key, UserCheck, Crown, DollarSign, Bell, AlertTriangle,
  TrendingUp, Eye, Fingerprint, Video, Lock
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { checkPermission, getRoleDisplayName, getRoleColor } from '../../utils/roleSystem';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    permission: 'dashboard_access',
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    permission: 'documents_personal',
    // comingSoon: true,
  },
  {
    name: 'E-Signatures',
    href: '/signatures',
    icon: FileSignature,
    permission: 'signatures_basic',
    // comingSoon: true,
  },
  {
    name: 'PDF Tools',
    href: '/pdf-tools',
    icon: Scissors,
    permission: 'documents_personal',
  },
  {
    name: 'Templates',
    href: '/templates',
    icon: Template,
    permission: 'documents_personal',
    // comingSoon: true,
  },
];

const teamAdminItems = [
  {
    name: 'Team Management',
    href: '/team',
    icon: Users,
    permission: 'team_management',
  },
  {
    name: 'Organization',
    href: '/organization',
    icon: Building,
    permission: 'organization_settings',
  },
  {
    name: 'Team Analytics',
    href: '/analytics',
    icon: BarChart3,
    permission: 'analytics_team',
  },
  {
    name: 'API Keys',
    href: '/api-keys',
    icon: Key,
    permission: 'api_keys',
  },
];

const superAdminItems = [
  {
    name: 'Admin Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    permission: 'platform_management',
  },
  {
    name: 'Executive Dashboard',
    href: '/executive-dashboard',
    icon: Crown,
    permission: 'platform_management',
  },
  {
    name: 'Platform Analytics',
    href: '/platform-analytics',
    icon: BarChart3,
    permission: 'platform_analytics',
  },
  {
    name: 'Billing Management',
    href: '/billing-management',
    icon: DollarSign,
    permission: 'platform_management',
  },
  {
    name: 'Security Monitoring',
    href: '/security-monitoring',
    icon: Shield,
    permission: 'audit_logs',
  },
  {
    name: 'Notification Center',
    href: '/notification-management',
    icon: Bell,
    permission: 'platform_management',
  },
  {
    name: 'Report Builder',
    href: '/report-builder',
    icon: TrendingUp,
    permission: 'platform_analytics',
  },
  {
    name: 'Audit Logs',
    href: '/audit-logs',
    icon: AlertTriangle,
    permission: 'audit_logs',
  },
];

const securityItems = [
  {
    name: 'Advanced Authentication',
    href: '/advanced-auth',
    icon: Fingerprint,
    permission: 'platform_management',
  },
  {
    name: 'Threat Detection',
    href: '/threat-detection',
    icon: Eye,
    permission: 'audit_logs',
  },
  {
    name: 'Session Management',
    href: '/session-management',
    icon: Lock,
    permission: 'team_management',
  },
  {
    name: 'Compliance Center',
    href: '/compliance-center',
    icon: Shield,
    permission: 'audit_logs',
  },
  {
    name: 'Video Verification',
    href: '/video-verification',
    icon: Video,
    permission: 'platform_management',
  },
];

export const RoleBasedSidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  if (!user) return null;

  const hasPermission = (permission: string) => checkPermission(user.role, permission);

  const renderNavItems = (items: typeof navigationItems, title?: string) => (
    <div className="space-y-1">
      {title && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      {items
        .filter(item => hasPermission(item.permission))
        .map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={ item.href}
              className={`
                group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200
                ${isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              // onClick={(e) => item.comingSoon && e.preventDefault()}
            >
              <Icon
                className={`mr-3 flex-shrink-0 h-5 w-5 ${
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
              />
              <span className="flex-1">{item.name}</span>
              {/* {item.comingSoon && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Soon
                </span>
              )} */}
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
    </div>
  );

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
        {/* Logo and Brand */}
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <span className="ml-3 text-xl font-bold text-gray-900">DraftnSign</span>
        </div>

        {/* User Role Badge */}
        <div className="px-4 mt-4">
          <div className={`
            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${getRoleColor(user.role)}
          `}>
            <UserCheck className="h-3 w-3 mr-1" />
            {getRoleDisplayName(user.role)}
          </div>
        </div>
        
        <div className="mt-6 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-6">
            {/* Main Navigation */}
            {renderNavItems(navigationItems)}

            {/* Team Admin Features */}
            {hasPermission('team_management') && renderNavItems(teamAdminItems, 'Team Admin')}

            {/* Super Admin Features */}
            {hasPermission('platform_management') && renderNavItems(superAdminItems, 'Platform Admin')}

            {/* Advanced Security Features */}
            {(hasPermission('audit_logs') || hasPermission('platform_management')) && 
             renderNavItems(securityItems, 'Advanced Security')}

            {/* Settings */}
            <div className="space-y-1">
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Settings
                </h3>
              </div>
              <Link
                to="/profile"
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${location.pathname === '/profile'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Settings
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    location.pathname === '/profile' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                Profile & Settings
                {location.pathname === '/profile' && <ChevronRight className="h-4 w-4 ml-auto" />}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};