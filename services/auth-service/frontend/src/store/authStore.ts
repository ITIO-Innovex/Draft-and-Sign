import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User, Organization } from '../types';
import { mockLogin, mockRegister, mockResetPassword, mockUpdateProfile } from '../utils/mockAuth';
import { useToastStore } from './toastStore';
import { checkPermission, hasRole, canAccess, ROLE_DEFINITIONS } from '../utils/roleSystem';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      organization: null,
      isLoggedIn: false,
      isLoading: false,
      permissions: [],

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const { user, organization } = await mockLogin(credentials);
          const permissions = user ? get().getPermissions(user.role) : [];
          set({ 
            user, 
            organization, 
            isLoggedIn: true, 
            isLoading: false,
            permissions 
          });
          useToastStore.getState().showToast(`Welcome back, ${user.name}!`, 'success');
        } catch (error) {
          set({ isLoading: false });
          useToastStore.getState().showToast('Login failed. Please try again.', 'error');
          throw error;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        try {
          const { user, organization } = await mockRegister(data);
          const permissions = user ? get().getPermissions(user.role) : [];
          set({ 
            user, 
            organization, 
            isLoggedIn: true, 
            isLoading: false,
            permissions 
          });
          useToastStore.getState().showToast('Account created successfully!', 'success');
        } catch (error) {
          set({ isLoading: false });
          useToastStore.getState().showToast('Registration failed. Please try again.', 'error');
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          organization: null, 
          isLoggedIn: false, 
          permissions: [] 
        });
        useToastStore.getState().showToast('You have been logged out.', 'info');
      },

      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true });
        try {
          const user = await mockUpdateProfile({ ...get().user, ...data });
          set({ user, isLoading: false });
          useToastStore.getState().showToast('Profile updated successfully!', 'success');
        } catch (error) {
          set({ isLoading: false });
          useToastStore.getState().showToast('Failed to update profile.', 'error');
          throw error;
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true });
        try {
          await mockResetPassword(email);
          set({ isLoading: false });
          useToastStore.getState().showToast('Password reset email sent!', 'success');
        } catch (error) {
          set({ isLoading: false });
          useToastStore.getState().showToast('Failed to send reset email.', 'error');
          throw error;
        }
      },

      checkPermission: (permission: string) => {
        const { user } = get();
        return user ? checkPermission(user.role, permission) : false;
      },

      hasRole: (role) => {
        const { user } = get();
        return user ? hasRole(user.role, role) : false;
      },

      canAccess: (resource: string) => {
        const { user } = get();
        return user ? canAccess(user.role, resource) : false;
      },

      getPermissions: (role) => {
        return ROLE_DEFINITIONS[role]?.permissions || [];
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        organization: state.organization,
        isLoggedIn: state.isLoggedIn,
        permissions: state.permissions,
      }),
    }
  )
);