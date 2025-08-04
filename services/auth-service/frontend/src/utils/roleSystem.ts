import { UserRole, RoleDefinition, Permission } from '../types';

export const PERMISSIONS: Permission[] = [
  // Basic permissions
  { id: 'dashboard_access', name: 'Dashboard Access', description: 'Access to main dashboard', category: 'Basic' },
  { id: 'profile_edit', name: 'Edit Profile', description: 'Edit personal profile', category: 'Basic' },
  { id: 'documents_personal', name: 'Personal Documents', description: 'Access personal documents', category: 'Documents' },
  { id: 'signatures_basic', name: 'Basic Signatures', description: 'Create basic signatures', category: 'Signatures' },
  { id: 'notifications_personal', name: 'Personal Notifications', description: 'Manage personal notifications', category: 'Basic' },
  
  // Team Admin permissions
  { id: 'team_management', name: 'Team Management', description: 'Manage team members', category: 'Team' },
  { id: 'user_invite', name: 'Invite Users', description: 'Invite new team members', category: 'Team' },
  { id: 'organization_settings', name: 'Organization Settings', description: 'Manage organization settings', category: 'Organization' },
  { id: 'signatures_unlimited', name: 'Unlimited Signatures', description: 'Create unlimited signatures', category: 'Signatures' },
  { id: 'documents_team', name: 'Team Documents', description: 'Access team documents', category: 'Documents' },
  { id: 'analytics_team', name: 'Team Analytics', description: 'View team analytics', category: 'Analytics' },
  { id: 'billing_management', name: 'Billing Management', description: 'Manage billing and subscriptions', category: 'Billing' },
  { id: 'api_keys', name: 'API Keys', description: 'Manage API keys', category: 'API' },
  
  // Super Admin permissions
  { id: 'platform_management', name: 'Platform Management', description: 'Manage entire platform', category: 'Platform' },
  { id: 'all_organizations', name: 'All Organizations', description: 'Access all organizations', category: 'Platform' },
  { id: 'system_settings', name: 'System Settings', description: 'Manage system settings', category: 'Platform' },
  { id: 'user_impersonation', name: 'User Impersonation', description: 'Impersonate other users', category: 'Platform' },
  { id: 'audit_logs', name: 'Audit Logs', description: 'Access audit logs', category: 'Security' },
  { id: 'platform_analytics', name: 'Platform Analytics', description: 'View platform analytics', category: 'Analytics' },
];

export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  regularUser: {
    role: 'regularUser',
    level: 1,
    permissions: [
      'dashboard_access',
      'profile_edit',
      'documents_personal',
      'signatures_basic',
      'notifications_personal'
    ],
    limits: {
      signatures: 3,
      storage: '1GB',
      monthlyEnvelopes: 10,
      apiCalls: 10
    },
    features: ['basic_signatures', 'personal_documents', 'basic_notifications']
  },
  teamAdmin: {
    role: 'teamAdmin',
    level: 2,
    permissions: [
      'dashboard_access',
      'profile_edit',
      'documents_personal',
      'signatures_basic',
      'notifications_personal',
      'team_management',
      'user_invite',
      'organization_settings',
      'signatures_unlimited',
      'documents_team',
      'analytics_team',
      'billing_management',
      'api_keys'
    ],
    limits: {
      signatures: -1,
      storage: '50GB',
      monthlyEnvelopes: 100,
      apiCalls: 1000
    },
    features: [
      'unlimited_signatures',
      'team_documents',
      'team_management',
      'organization_settings',
      'team_analytics',
      'api_access'
    ]
  },
  superAdmin: {
    role: 'superAdmin',
    level: 3,
    permissions: [
      'dashboard_access',
      'profile_edit',
      'documents_personal',
      'signatures_basic',
      'notifications_personal',
      'team_management',
      'user_invite',
      'organization_settings',
      'signatures_unlimited',
      'documents_team',
      'analytics_team',
      'billing_management',
      'api_keys',
      'platform_management',
      'all_organizations',
      'system_settings',
      'user_impersonation',
      'audit_logs',
      'platform_analytics'
    ],
    limits: {
      signatures: -1,
      storage: 'Unlimited',
      monthlyEnvelopes: -1,
      apiCalls: -1
    },
    features: [
      'unlimited_signatures',
      'team_documents',
      'team_management',
      'organization_settings',
      'team_analytics',
      'api_access',
      'platform_management',
      'system_administration',
      'audit_access'
    ]
  }
};

export const checkPermission = (userRole: UserRole, permission: string): boolean => {
  if (!userRole || !permission) {
    return false;
  }
  
  const roleDefinition = ROLE_DEFINITIONS[userRole];
  if (!roleDefinition || !roleDefinition.permissions) {
    return false;
  }
  
  return roleDefinition.permissions.includes(permission);
};

export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  if (!userRole || !requiredRole) {
    return false;
  }
  
  const userRoleDefinition = ROLE_DEFINITIONS[userRole];
  const requiredRoleDefinition = ROLE_DEFINITIONS[requiredRole];
  
  if (!userRoleDefinition || !requiredRoleDefinition) {
    return false;
  }
  
  const userLevel = userRoleDefinition.level;
  const requiredLevel = requiredRoleDefinition.level;
  return userLevel >= requiredLevel;
};

export const canAccess = (userRole: UserRole, resource: string): boolean => {
  if (!userRole || !resource) {
    return false;
  }
  
  const roleDefinition = ROLE_DEFINITIONS[userRole];
  if (!roleDefinition || !roleDefinition.permissions) {
    return false;
  }
  
  // Define resource access rules
  const resourceRules: Record<string, string[]> = {
    'team-management': ['team_management'],
    'organization-settings': ['organization_settings'],
    'billing': ['billing_management'],
    'analytics': ['analytics_team', 'platform_analytics'],
    'api-keys': ['api_keys'],
    'audit-logs': ['audit_logs'],
    'platform-admin': ['platform_management'],
    'user-impersonation': ['user_impersonation'],
  };
  
  const requiredPermissions = resourceRules[resource] || [];
  return requiredPermissions.some(permission => roleDefinition.permissions.includes(permission));
};

export const getRoleDisplayName = (role: UserRole): string => {
  if (!role) {
    return 'Unknown Role';
  }
  
  const names: Record<UserRole, string> = {
    regularUser: 'Regular User',
    teamAdmin: 'Team Admin',
    superAdmin: 'Super Admin'
  };
  return names[role] || 'Unknown Role';
};

export const getRoleColor = (role: UserRole): string => {
  if (!role) {
    return 'bg-gray-100 text-gray-800';
  }
  
  const colors: Record<UserRole, string> = {
    regularUser: 'bg-blue-100 text-blue-800',
    teamAdmin: 'bg-purple-100 text-purple-800',
    superAdmin: 'bg-red-100 text-red-800'
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
};

export const getFeatureLimit = (userRole: UserRole, feature: keyof RoleDefinition['limits']): number | string => {
  if (!userRole || !feature) {
    return 0;
  }
  
  const roleDefinition = ROLE_DEFINITIONS[userRole];
  if (!roleDefinition || !roleDefinition.limits) {
    return 0;
  }
  
  return roleDefinition.limits[feature];
};

export const hasFeature = (userRole: UserRole, feature: string): boolean => {
  if (!userRole || !feature) {
    return false;
  }
  
  const roleDefinition = ROLE_DEFINITIONS[userRole];
  if (!roleDefinition || !roleDefinition.features) {
    return false;
  }
  
  return roleDefinition.features.includes(feature);
};