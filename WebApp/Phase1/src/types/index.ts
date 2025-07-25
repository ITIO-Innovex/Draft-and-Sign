export type UserRole = 'regularUser' | 'teamAdmin' | 'superAdmin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  department?: string;
  managerId?: string;
  employeeId?: string;
  bio?: string;
  website?: string;
  linkedIn?: string;
  twitter?: string;
  role: UserRole;
  organizationId?: string;
  profilePhoto?: string;
  createdAt: string;
  lastLogin: string;
  isEmailVerified: boolean;
  isMFAEnabled: boolean;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  notifications: boolean;
  language: string;
  timezone: string;
  theme?: 'light' | 'dark' | 'system';
}

export interface UserStats {
  documents: number;
  signatures: number;
  templates: number;
  storageUsed: number;
}

export interface Organization {
  id: string;
  name: string;
  domain?: string;
  logo?: string;
  settings: OrganizationSettings;
  subscription: SubscriptionInfo;
  createdAt: string;
  ownerId: string;
}

export interface OrganizationSettings {
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    customDomain?: string;
  };
  security: {
    passwordPolicy: 'basic' | 'strong' | 'enterprise';
    mfaRequired: boolean;
    ssoEnabled: boolean;
    domainRestriction: boolean;
    sessionTimeout: number;
  };
  features: {
    apiAccess: boolean;
    advancedAuth: boolean;
    bulkOperations: boolean;
    customBranding: boolean;
  };
}

export interface SubscriptionInfo {
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  seats: number;
  usedSeats: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate?: string;
  features: string[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface RoleDefinition {
  role: UserRole;
  level: number;
  permissions: string[];
  limits: {
    signatures: number; // -1 for unlimited
    storage: string;
    monthlyEnvelopes: number;
    apiCalls: number;
  };
  features: string[];
}

export interface TeamMember {
  id: string;
  user: User;
  role: UserRole;
  department?: string;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'pending';
  invitedBy?: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  customMessage?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  headId?: string;
  memberCount: number;
  organizationId: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  organizationId?: string;
}

export interface AuthMethod {
  id: string;
  type: 'password' | 'kba' | 'biometric' | 'certificate' | 'government_id' | 'video' | 'smart_card';
  name: string;
  description: string;
  isEnabled: boolean;
  setupRequired: boolean;
  securityLevel: 'basic' | 'standard' | 'high' | 'maximum';
}

export interface SecurityQuestion {
  id: string;
  question: string;
  category: string;
  answer?: string; // Hashed
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
  authMethod?: string;
  additionalData?: Record<string, any>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  company?: string;
  phone?: string;
  position?: string;
  department?: string;
  accountType: 'personal' | 'business' | 'enterprise';
  organizationName?: string;
  inviteCode?: string;
  acceptTerms: boolean;
}

export interface AuthState {
  user: User | null;
  organization: Organization | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  permissions: string[];
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkPermission: (permission: string) => boolean;
  hasRole: (role: UserRole) => boolean;
  canAccess: (resource: string) => boolean;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
}