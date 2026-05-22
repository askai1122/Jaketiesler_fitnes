'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const MOCK_CREDENTIALS = {
  email: 'admin@jaketiesler.com',
  password: 'jake2025',
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('jt_admin_session')
    if (session === 'authenticated') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== '/admin') {
      router.push('/admin')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = (email: string, password: string): boolean => {
    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      setIsAuthenticated(true)
      localStorage.setItem('jt_admin_session', 'authenticated')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('jt_admin_session')
    router.push('/admin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
