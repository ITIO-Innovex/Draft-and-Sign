import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const mockUser: User = {
      id: 'user_123',
      name: 'John Smith',
      email: 'john@acme.com',
      company: 'Acme Corp',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'developer',
      createdAt: '2024-06-01T10:00:00Z',
      lastActive: new Date().toISOString()
    }
    
    setTimeout(() => {
      setUser(mockUser)
      setIsLoading(false)
    }, 1000)
  }, [])

  const login = async (email: string, _password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: 'user_123',
      name: 'John Smith',
      email,
      company: 'Acme Corp',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
      role: 'developer',
      createdAt: '2024-06-01T10:00:00Z',
      lastActive: new Date().toISOString()
    }
    
    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}