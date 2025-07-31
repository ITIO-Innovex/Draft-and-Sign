import { create } from 'zustand';
import { ToastMessage } from '../types';

interface ToastState {
  toasts: ToastMessage[];
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastMessage = {
      id,
      message,
      type,
      visible: true,
    };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto hide after 5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  },

  hideToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));