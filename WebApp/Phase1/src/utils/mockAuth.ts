import { User, LoginCredentials, RegisterData, Organization, UserRole } from '../types';

const mockOrganizations: Record<string, Organization> = {
  'org_acme': {
    id: 'org_acme',
    name: 'Acme Corporation',
    domain: 'acme.com',
    logo: undefined,
    settings: {
      branding: {
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
      },
      security: {
        passwordPolicy: 'strong',
        mfaRequired: false,
        ssoEnabled: false,
        domainRestriction: true,
        sessionTimeout: 30,
      },
      features: {
        apiAccess: true,
        advancedAuth: true,
        bulkOperations: true,
        customBranding: true,
      },
    },
    subscription: {
      plan: 'professional',
      seats: 50,
      usedSeats: 23,
      billingCycle: 'monthly',
      features: ['unlimited_signatures', 'team_management', 'advanced_analytics'],
    },
    createdAt: '2024-01-01T00:00:00Z',
    ownerId: 'user_jane',
  },
  'org_draftsign': {
    id: 'org_draftsign',
    name: 'DraftSign Inc',
    domain: 'draftsign.com',
    settings: {
      branding: {
        primaryColor: '#dc2626',
        secondaryColor: '#64748b',
      },
      security: {
        passwordPolicy: 'enterprise',
        mfaRequired: true,
        ssoEnabled: true,
        domainRestriction: true,
        sessionTimeout: 15,
      },
      features: {
        apiAccess: true,
        advancedAuth: true,
        bulkOperations: true,
        customBranding: true,
      },
    },
    subscription: {
      plan: 'enterprise',
      seats: -1,
      usedSeats: 156,
      billingCycle: 'yearly',
      features: ['everything'],
    },
    createdAt: '2023-01-01T00:00:00Z',
    ownerId: 'user_alex',
  },
};

const mockUsers: Record<string, User> = {
  'user_john': {
    id: 'user_john',
    name: "John Doe",
    email: "test@example.com",
    phone: "+1 (555) 123-4567",
    company: "Freelancer",
    position: "Software Engineer",
    role: "regularUser",
    organizationId: undefined,
    profilePhoto: undefined,
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-07-01T09:15:00Z",
    isEmailVerified: true,
    isMFAEnabled: false,
    preferences: {
      notifications: true,
      language: "en",
      timezone: "America/New_York",
    },
    stats: {
      documents: 5,
      signatures: 2,
      templates: 1,
      storageUsed: 45,
    },
  },
  'user_jane': {
    id: 'user_jane',
    name: "Jane Smith",
    email: "jane@acme.com",
    phone: "+1 (555) 987-6543",
    company: "Acme Corporation",
    position: "VP of Operations",
    department: "Operations",
    role: "teamAdmin",
    organizationId: "org_acme",
    profilePhoto: undefined,
    createdAt: "2024-01-10T08:00:00Z",
    lastLogin: "2024-07-01T08:30:00Z",
    isEmailVerified: true,
    isMFAEnabled: true,
    preferences: {
      notifications: true,
      language: "en",
      timezone: "America/New_York",
    },
    stats: {
      documents: 156,
      signatures: 8,
      templates: 12,
      storageUsed: 2340,
    },
  },
  'user_alex': {
    id: 'user_alex',
    name: "Alex Johnson",
    email: "alex@draftsign.com",
    phone: "+1 (555) 111-2222",
    company: "DraftSign Inc",
    position: "Chief Technology Officer",
    department: "Technology",
    role: "superAdmin",
    organizationId: "org_draftsign",
    profilePhoto: undefined,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-07-01T07:00:00Z",
    isEmailVerified: true,
    isMFAEnabled: true,
    preferences: {
      notifications: true,
      language: "en",
      timezone: "America/Los_Angeles",
    },
    stats: {
      documents: 2340,
      signatures: 45,
      templates: 67,
      storageUsed: 15600,
    },
  },
};

export const mockLogin = async (credentials: LoginCredentials): Promise<{ user: User; organization: Organization | null }> => {
  console.log('Mock login called with:', credentials);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simple email-based user lookup for demo
  let user: User;
  if (credentials.email === 'test@example.com') {
    user = mockUsers['user_john'];
  } else if (credentials.email === 'jane@acme.com') {
    user = mockUsers['user_jane'];
  } else if (credentials.email === 'alex@draftsign.com') {
    user = mockUsers['user_alex'];
  } else {
    // Default to regular user for any other email
    user = {
      ...mockUsers['user_john'],
      email: credentials.email,
      name: credentials.email.split('@')[0],
    };
  }

  const organization = user.organizationId ? mockOrganizations[user.organizationId] : null;

  return { user, organization };
};

export const mockRegister = async (data: RegisterData): Promise<{ user: User; organization: Organization | null }> => {
  console.log('Mock register called with:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Determine role based on account type
  let role: UserRole = 'regularUser';
  if (data.accountType === 'business' || data.accountType === 'enterprise') {
    role = data.inviteCode ? 'regularUser' : 'teamAdmin'; // If joining existing org, regular user; if creating new org, team admin
  }

  // Create organization if needed
  let organization: Organization | null = null;
  let organizationId: string | undefined = undefined;

  if (data.accountType === 'business' && data.organizationName && !data.inviteCode) {
    organizationId = `org_${Date.now()}`;
    organization = {
      id: organizationId,
      name: data.organizationName,
      domain: data.email.split('@')[1],
      settings: {
        branding: {
          primaryColor: '#2563eb',
          secondaryColor: '#64748b',
        },
        security: {
          passwordPolicy: 'strong',
          mfaRequired: false,
          ssoEnabled: false,
          domainRestriction: false,
          sessionTimeout: 30,
        },
        features: {
          apiAccess: true,
          advancedAuth: false,
          bulkOperations: false,
          customBranding: false,
        },
      },
      subscription: {
        plan: 'starter',
        seats: 10,
        usedSeats: 1,
        billingCycle: 'monthly',
        features: ['basic_features'],
      },
      createdAt: new Date().toISOString(),
      ownerId: `user_${Date.now()}`,
    };
  }

  const user: User = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    position: data.position,
    department: data.department,
    role,
    organizationId,
    profilePhoto: undefined,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    isEmailVerified: false,
    isMFAEnabled: false,
    preferences: {
      notifications: true,
      language: "en",
      timezone: "America/New_York",
    },
    stats: {
      documents: 0,
      signatures: 0,
      templates: 0,
      storageUsed: 0,
    },
  };

  return { user, organization };
};

export const mockResetPassword = async (email: string): Promise<void> => {
  console.log('Mock reset password called with:', email);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Always succeed
  return;
};

export const mockUpdateProfile = async (data: Partial<User>): Promise<User> => {
  console.log('Mock update profile called with:', data);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return data as User;
};