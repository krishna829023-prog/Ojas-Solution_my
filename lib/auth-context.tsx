'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

const AUTH_USERS_KEY = 'ojas_auth_users'
const AUTH_SESSION_KEY = 'ojas_auth_session'

export const AUTH_SESSION_STORAGE_KEY = AUTH_SESSION_KEY

export interface StoredAuthUser {
  username: string
  passwordHash: string
  createdAt: string
}

interface AuthContextType {
  isAuthenticated: boolean
  currentUsername: string | null
  isAuthLoaded: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  openAuthModal: () => void
  closeAuthModal: () => void
  isAuthModalOpen: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password + '__ojas_circle_secure_v1__')
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function getStoredAuthUsers(): StoredAuthUser[] {
  try {
    const stored = localStorage.getItem(AUTH_USERS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveAuthUsers(users: StoredAuthUser[]) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUsername, setCurrentUsername] = useState<string | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const session = localStorage.getItem(AUTH_SESSION_KEY)
      if (session) {
        const { username } = JSON.parse(session)
        setCurrentUsername(username)
        setIsAuthenticated(true)
      }
    } catch {
      // Session invalid, stay logged out
    }
    setIsAuthLoaded(true)
  }, [])

  const login = useCallback(async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const users = getStoredAuthUsers()
    const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase())

    if (!user) {
      return { success: false, error: 'Username not found. Please sign up first.' }
    }

    const hash = await hashPassword(password)
    if (hash !== user.passwordHash) {
      return { success: false, error: 'Incorrect password. Please try again.' }
    }

    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ username: user.username }))
    setCurrentUsername(user.username)
    setIsAuthenticated(true)
    return { success: true }
  }, [])

  const signup = useCallback(async (
    username: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmed = username.trim()

    if (trimmed.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters.' }
    }
    if (trimmed.length > 20) {
      return { success: false, error: 'Username cannot exceed 20 characters.' }
    }
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      return { success: false, error: 'Only letters, numbers, and underscores allowed.' }
    }

    const users = getStoredAuthUsers()
    if (users.some(u => u.username.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: 'Username already taken. Please choose another.' }
    }

    // Strong password requirements
    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' }
    }
    if (!/[A-Z]/.test(password)) {
      return { success: false, error: 'Password must include at least one uppercase letter (A-Z).' }
    }
    if (!/[a-z]/.test(password)) {
      return { success: false, error: 'Password must include at least one lowercase letter (a-z).' }
    }
    if (!/[0-9]/.test(password)) {
      return { success: false, error: 'Password must include at least one number (0-9).' }
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      return { success: false, error: 'Password must include at least one special character (!@#$...).' }
    }

    const passwordHash = await hashPassword(password)
    const newUser: StoredAuthUser = {
      username: trimmed,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    saveAuthUsers([...users, newUser])
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({ username: trimmed }))
    setCurrentUsername(trimmed)
    setIsAuthenticated(true)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_SESSION_KEY)
    setCurrentUsername(null)
    setIsAuthenticated(false)
  }, [])

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), [])

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      currentUsername,
      isAuthLoaded,
      login,
      signup,
      logout,
      openAuthModal,
      closeAuthModal,
      isAuthModalOpen,
    }}>
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
