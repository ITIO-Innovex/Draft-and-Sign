import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function SharedAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get user from localStorage (shared with Phase1)
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const authData = JSON.parse(authStorage);
        if (authData.state?.user) {
          setUser(authData.state.user);
        }
      }
    } catch (error) {
      console.warn('Failed to load auth data from localStorage:', error);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: any) => {
    // This would integrate with Phase1's auth system
    console.log('Login attempt:', credentials);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-storage');
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSharedAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSharedAuth must be used within a SharedAuthProvider');
  }
  return context;
} 