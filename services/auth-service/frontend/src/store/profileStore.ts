import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProfileState, User, Signature, CorporateSeal, UserRole } from '../types';
import { mockUserProfiles, mockNotifications, mockSignatures, mockCorporateSeals } from '../utils/mockData';
import { useToastStore } from './toastStore';

interface ProfileActions {
  setUserRole: (role: UserRole) => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  uploadProfilePhoto: (file: File) => Promise<void>;
  addSignature: (signature: Omit<Signature, 'id' | 'createdAt'>) => Promise<void>;
  updateSignature: (id: number, data: Partial<Signature>) => Promise<void>;
  deleteSignature: (id: number) => Promise<void>;
  setDefaultSignature: (id: number) => Promise<void>;
  addCorporateSeal: (seal: Omit<CorporateSeal, 'id' | 'createdAt'>) => Promise<void>;
  updateCorporateSeal: (id: number, data: Partial<CorporateSeal>) => Promise<void>;
  deleteCorporateSeal: (id: number) => Promise<void>;
  updateNotificationPreferences: (preferences: any) => Promise<void>;
  updateSecuritySettings: (settings: any) => Promise<void>;
  updateBrandingSettings: (branding: any) => Promise<void>;
  markNotificationAsRead: (id: number) => void;
  clearAllNotifications: () => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  enableMFA: (method: string, identifier: string) => Promise<void>;
  disableMFA: (methodId: number) => Promise<void>;
  addTrustedDevice: (device: any) => Promise<void>;
  removeTrustedDevice: (deviceId: number) => Promise<void>;
  generateAPIKey: (name: string, permissions: string[]) => Promise<void>;
  revokeAPIKey: (keyId: number) => Promise<void>;
}

export const useProfileStore = create<ProfileState & ProfileActions>()(
  persist(
    (set, get) => ({
      user: mockUserProfiles.regularUser,
      signatures: mockSignatures.regularUser,
      corporateSeals: [],
      notifications: mockNotifications,
      notificationPreferences: {
        email: {
          documentRequests: true,
          documentCompleted: true,
          systemUpdates: true,
          securityAlerts: true,
          teamActivity: false,
          marketing: false,
          frequency: 'instant',
        },
        push: {
          enabled: false,
          documentRequests: true,
          urgentOnly: false,
          quietHours: {
            enabled: false,
            start: '22:00',
            end: '08:00',
          },
        },
        sms: {
          enabled: false,
          securityAlerts: true,
          urgentDocuments: true,
        },
      },
      securitySettings: {
        mfaEnabled: false,
        mfaMethods: [],
        passwordLastChanged: '2024-06-01T10:00:00Z',
        sessionTimeout: 30,
        trustedDevices: [
          {
            id: 1,
            name: 'MacBook Pro',
            type: 'desktop',
            browser: 'Chrome 126',
            location: 'New York, NY',
            lastUsed: '2024-07-01T09:15:00Z',
            isActive: true,
          },
          {
            id: 2,
            name: 'iPhone 15',
            type: 'mobile',
            browser: 'Safari',
            location: 'New York, NY',
            lastUsed: '2024-06-30T18:30:00Z',
            isActive: true,
          },
        ],
        loginHistory: [
          {
            id: 1,
            timestamp: '2024-07-01T09:15:00Z',
            ipAddress: '192.168.1.100',
            location: 'New York, NY',
            device: 'MacBook Pro - Chrome',
            success: true,
            method: 'password',
          },
          {
            id: 2,
            timestamp: '2024-06-30T18:30:00Z',
            ipAddress: '192.168.1.101',
            location: 'New York, NY',
            device: 'iPhone 15 - Safari',
            success: true,
            method: 'password',
          },
        ],
        apiKeys: [],
      },
      brandingSettings: {
        primaryColor: '#2563eb',
        secondaryColor: '#64748b',
        companyName: 'Acme Corp',
        emailSignature: 'Best regards,\n{{name}}\n{{title}}\n{{company}}',
      },
      accountUsage: {
        documentsCreated: 0,
        documentsSigned: 0,
        templatesCreated: 0,
        storageUsed: 0,
        storageLimit: 1000,
        apiCallsUsed: 0,
        apiCallsLimit: 100,
        planType: 'free',
        billingCycle: 'monthly',
      },
      isLoading: false,
      error: null,

      setUserRole: (role: UserRole) => {
        const userData = mockUserProfiles[role];
        const signatureData = mockSignatures[role];
        const sealData = role === 'regularUser' ? [] : mockCorporateSeals[role];
        
        set({
          user: userData,
          signatures: signatureData,
          corporateSeals: sealData,
        });
        
        useToastStore.getState().showToast(`Switched to ${role} role`, 'info');
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null,
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Profile updated successfully', 'success');
      },

      uploadProfilePhoto: async (file: File) => {
        set({ isLoading: true });
        
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const photoUrl = URL.createObjectURL(file);
        
        set(state => ({
          user: state.user ? { ...state.user, profilePhoto: photoUrl } : null,
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Profile photo updated', 'success');
      },

      addSignature: async (signature: Omit<Signature, 'id' | 'createdAt'>) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newSignature: Signature = {
          ...signature,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          signatures: [...state.signatures, newSignature],
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Signature created successfully', 'success');
      },

      updateSignature: async (id: number, data: Partial<Signature>) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          signatures: state.signatures.map(sig => 
            sig.id === id ? { ...sig, ...data } : sig
          ),
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Signature updated', 'success');
      },

      deleteSignature: async (id: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          signatures: state.signatures.filter(sig => sig.id !== id),
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Signature deleted', 'success');
      },

      setDefaultSignature: async (id: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        set(state => ({
          signatures: state.signatures.map(sig => ({
            ...sig,
            isDefault: sig.id === id,
          })),
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Default signature updated', 'success');
      },

      addCorporateSeal: async (seal: Omit<CorporateSeal, 'id' | 'createdAt'>) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newSeal: CorporateSeal = {
          ...seal,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          corporateSeals: [...state.corporateSeals, newSeal],
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Corporate seal added', 'success');
      },

      updateCorporateSeal: async (id: number, data: Partial<CorporateSeal>) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          corporateSeals: state.corporateSeals.map(seal => 
            seal.id === id ? { ...seal, ...data } : seal
          ),
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Corporate seal updated', 'success');
      },

      deleteCorporateSeal: async (id: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          corporateSeals: state.corporateSeals.filter(seal => seal.id !== id),
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Corporate seal deleted', 'success');
      },

      updateNotificationPreferences: async (preferences: any) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          notificationPreferences: { ...state.notificationPreferences, ...preferences },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Notification preferences updated', 'success');
      },

      updateSecuritySettings: async (settings: any) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        set(state => ({
          securitySettings: { ...state.securitySettings, ...settings },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Security settings updated', 'success');
      },

      updateBrandingSettings: async (branding: any) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          brandingSettings: { ...state.brandingSettings, ...branding },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Branding settings updated', 'success');
      },

      markNotificationAsRead: (id: number) => {
        set(state => ({
          notifications: state.notifications.map(notif => 
            notif.id === id ? { ...notif, read: true } : notif
          ),
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
        useToastStore.getState().showToast('All notifications cleared', 'info');
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            passwordLastChanged: new Date().toISOString(),
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Password changed successfully', 'success');
      },

      enableMFA: async (method: string, identifier: string) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newMethod = {
          id: Date.now(),
          type: method as any,
          identifier,
          isEnabled: true,
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            mfaEnabled: true,
            mfaMethods: [...state.securitySettings.mfaMethods, newMethod],
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('MFA enabled successfully', 'success');
      },

      disableMFA: async (methodId: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => {
          const updatedMethods = state.securitySettings.mfaMethods.filter(m => m.id !== methodId);
          return {
            securitySettings: {
              ...state.securitySettings,
              mfaEnabled: updatedMethods.length > 0,
              mfaMethods: updatedMethods,
            },
            isLoading: false,
          };
        });
        
        useToastStore.getState().showToast('MFA method disabled', 'success');
      },

      addTrustedDevice: async (device: any) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newDevice = {
          ...device,
          id: Date.now(),
          lastUsed: new Date().toISOString(),
          isActive: true,
        };
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            trustedDevices: [...state.securitySettings.trustedDevices, newDevice],
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Device added to trusted list', 'success');
      },

      removeTrustedDevice: async (deviceId: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            trustedDevices: state.securitySettings.trustedDevices.filter(d => d.id !== deviceId),
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('Device removed from trusted list', 'success');
      },

      generateAPIKey: async (name: string, permissions: string[]) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newAPIKey = {
          id: Date.now(),
          name,
          key: `ds_${Math.random().toString(36).substr(2, 32)}`,
          permissions,
          isActive: true,
        };
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            apiKeys: [...state.securitySettings.apiKeys, newAPIKey],
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('API key generated successfully', 'success');
      },

      revokeAPIKey: async (keyId: number) => {
        set({ isLoading: true });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        set(state => ({
          securitySettings: {
            ...state.securitySettings,
            apiKeys: state.securitySettings.apiKeys.map(key => 
              key.id === keyId ? { ...key, isActive: false } : key
            ),
          },
          isLoading: false,
        }));
        
        useToastStore.getState().showToast('API key revoked', 'success');
      },
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({
        user: state.user,
        signatures: state.signatures,
        corporateSeals: state.corporateSeals,
        notificationPreferences: state.notificationPreferences,
        securitySettings: state.securitySettings,
        brandingSettings: state.brandingSettings,
      }),
    }
  )
);