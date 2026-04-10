'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

const LEGACY_STORAGE_KEY = 'ojas_user_data'
const AUTH_SESSION_KEY = 'ojas_auth_session'

const adjectives = ['Silent', 'Brave', 'Calm', 'Bold', 'Wise', 'Swift', 'Noble', 'Pure', 'Strong', 'Gentle']
const nouns = ['Phoenix', 'Tiger', 'Wave', 'Storm', 'Monk', 'Warrior', 'Eagle', 'Lion', 'Lotus', 'Spirit']
export const avatars = ['🪷', '🦁', '🌊', '🔥', '🌿', '🛡️', '⚡', '🧘']

export function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(1000 + Math.random() * 9000)
  return `${adj}${noun}_${num}`
}

function userStorageKey(username: string) {
  return `ojas_user_data_${username}`
}

interface UserData {
  username: string
  avatar: string
  joinedRooms: string[]
  savedPosts: string[]
  likedPosts: string[]
  streak: number
  streakDays: string[]
  resetDays: string[]
  badges: { name: string; earned: boolean }[]
  notifications: boolean
  joinedChallenges: {
    id: string
    currentDay: number
    completedDays: number[]
  }[]
}

interface UserContextType {
  user: UserData | null
  isLoaded: boolean
  updateUser: (data: Partial<UserData>) => void
  regenerateUsername: () => void
  setAvatar: (avatar: string) => void
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
  toggleLikePost: (postId: string) => boolean
  toggleSavePost: (postId: string) => boolean
  markStreakDay: () => void
  joinChallenge: (challengeId: string, totalDays: number) => void
  completeChallengeDay: (challengeId: string, day: number) => void
  clearAllData: () => void
  clearUserSession: () => void
  initializeUser: (username: string, avatar: string) => void
  loadOrCreateUser: (username: string) => void
}

const UserContext = createContext<UserContextType | null>(null)

const defaultBadges = [
  { name: 'Ojas Warrior', earned: false },
  { name: '7-Day Champ', earned: false },
  { name: 'Helpful Soul', earned: false },
  { name: '30-Day Monk', earned: false },
]

function createDefaultUserData(username: string): UserData {
  return {
    username,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    joinedRooms: [],
    savedPosts: [],
    likedPosts: [],
    streak: 0,
    streakDays: [],
    resetDays: [],
    badges: defaultBadges,
    notifications: true,
    joinedChallenges: [],
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user data on mount — keyed by authenticated username when available
  useEffect(() => {
    try {
      const session = localStorage.getItem(AUTH_SESSION_KEY)
      if (session) {
        const { username } = JSON.parse(session)
        const key = userStorageKey(username)
        const stored = localStorage.getItem(key)
        if (stored) {
          setUser(JSON.parse(stored))
        }
        // If no stored data for this user, stay null until loadOrCreateUser is called
      } else {
        // Not authenticated — try legacy key for backward compat
        const stored = localStorage.getItem(LEGACY_STORAGE_KEY)
        if (stored) {
          setUser(JSON.parse(stored))
        }
      }
    } catch {
      // Keep user as null
    }
    setIsLoaded(true)
  }, [])

  // Auto-save user data to per-user key whenever it changes
  useEffect(() => {
    if (user && isLoaded) {
      localStorage.setItem(userStorageKey(user.username), JSON.stringify(user))
    }
  }, [user, isLoaded])

  // Load existing data for a user, or create a fresh profile
  const loadOrCreateUser = useCallback((username: string) => {
    const key = userStorageKey(username)
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        setUser(JSON.parse(stored))
      } else {
        setUser(createDefaultUserData(username))
      }
    } catch {
      setUser(createDefaultUserData(username))
    }
  }, [])

  const initializeUser = useCallback((username: string, avatar: string) => {
    const newUser: UserData = {
      username,
      avatar,
      joinedRooms: [],
      savedPosts: [],
      likedPosts: [],
      streak: 0,
      streakDays: [],
      resetDays: [],
      badges: defaultBadges,
      notifications: true,
      joinedChallenges: [],
    }
    setUser(newUser)
  }, [])

  const updateUser = useCallback((data: Partial<UserData>) => {
    setUser(prev => prev ? { ...prev, ...data } : null)
  }, [])

  const regenerateUsername = useCallback(() => {
    const newUsername = generateUsername()
    setUser(prev => prev ? { ...prev, username: newUsername } : null)
  }, [])

  const setAvatar = useCallback((avatar: string) => {
    setUser(prev => prev ? { ...prev, avatar } : null)
  }, [])

  const joinRoom = useCallback((roomId: string) => {
    setUser(prev => {
      if (!prev) return null
      if (prev.joinedRooms.includes(roomId)) return prev
      return { ...prev, joinedRooms: [...prev.joinedRooms, roomId] }
    })
  }, [])

  const leaveRoom = useCallback((roomId: string) => {
    setUser(prev => {
      if (!prev) return null
      return { ...prev, joinedRooms: prev.joinedRooms.filter(id => id !== roomId) }
    })
  }, [])

  const toggleLikePost = useCallback((postId: string): boolean => {
    let isLiked = false
    setUser(prev => {
      if (!prev) return null
      if (prev.likedPosts.includes(postId)) {
        return { ...prev, likedPosts: prev.likedPosts.filter(id => id !== postId) }
      } else {
        isLiked = true
        return { ...prev, likedPosts: [...prev.likedPosts, postId] }
      }
    })
    return isLiked
  }, [])

  const toggleSavePost = useCallback((postId: string): boolean => {
    let isSaved = false
    setUser(prev => {
      if (!prev) return null
      if (prev.savedPosts.includes(postId)) {
        return { ...prev, savedPosts: prev.savedPosts.filter(id => id !== postId) }
      } else {
        isSaved = true
        return { ...prev, savedPosts: [...prev.savedPosts, postId] }
      }
    })
    return isSaved
  }, [])

  const markStreakDay = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    setUser(prev => {
      if (!prev) return null
      if (prev.streakDays.includes(today)) return prev

      const newStreakDays = [...prev.streakDays, today]
      const newStreak = prev.streak + 1

      const newBadges = prev.badges.map(badge => {
        if (badge.name === '7-Day Champ' && newStreak >= 7) return { ...badge, earned: true }
        if (badge.name === '30-Day Monk' && newStreak >= 30) return { ...badge, earned: true }
        if (badge.name === 'Ojas Warrior' && newStreak >= 1) return { ...badge, earned: true }
        return badge
      })

      return { ...prev, streakDays: newStreakDays, streak: newStreak, badges: newBadges }
    })
  }, [])

  const joinChallenge = useCallback((challengeId: string, totalDays: number) => {
    setUser(prev => {
      if (!prev) return null
      if (prev.joinedChallenges.some(c => c.id === challengeId)) return prev
      return {
        ...prev,
        joinedChallenges: [
          ...prev.joinedChallenges,
          { id: challengeId, currentDay: 1, completedDays: [] },
        ],
      }
    })
  }, [])

  const completeChallengeDay = useCallback((challengeId: string, day: number) => {
    setUser(prev => {
      if (!prev) return null
      return {
        ...prev,
        joinedChallenges: prev.joinedChallenges.map(c => {
          if (c.id !== challengeId) return c
          if (c.completedDays.includes(day)) return c
          return { ...c, completedDays: [...c.completedDays, day], currentDay: day + 1 }
        }),
      }
    })
  }, [])

  // Clears user profile data from localStorage (account deletion)
  const clearAllData = useCallback(() => {
    if (user) localStorage.removeItem(userStorageKey(user.username))
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    setUser(null)
  }, [user])

  // Clears user from memory only (keeps localStorage intact for next login)
  const clearUserSession = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      isLoaded,
      updateUser,
      regenerateUsername,
      setAvatar,
      joinRoom,
      leaveRoom,
      toggleLikePost,
      toggleSavePost,
      markStreakDay,
      joinChallenge,
      completeChallengeDay,
      clearAllData,
      clearUserSession,
      initializeUser,
      loadOrCreateUser,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
