'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, X, User, Lock, CheckCircle2,
  XCircle, Loader2, LogIn, UserPlus, Shield,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useUser } from '@/lib/user-context'
import { useRouter } from 'next/navigation'

type Tab = 'login' | 'signup'

interface PasswordRequirement {
  label: string
  met: boolean
}

function getRequirements(password: string): PasswordRequirement[] {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter (A–Z)', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter (a–z)', met: /[a-z]/.test(password) },
    { label: 'One number (0–9)', met: /[0-9]/.test(password) },
    { label: 'One special character (!@#$…)', met: /[^a-zA-Z0-9]/.test(password) },
  ]
}

function getStrength(reqs: PasswordRequirement[]) {
  const met = reqs.filter(r => r.met).length
  if (met === 0) return { level: 0, label: '', color: '' }
  if (met === 1) return { level: 1, label: 'Very Weak', color: '#ef4444' }
  if (met === 2) return { level: 2, label: 'Weak', color: '#f97316' }
  if (met === 3) return { level: 3, label: 'Fair', color: '#eab308' }
  if (met === 4) return { level: 4, label: 'Good', color: '#84cc16' }
  return { level: 5, label: 'Strong', color: '#22c55e' }
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: Tab
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const { login, signup } = useAuth()
  const { loadOrCreateUser } = useUser()
  const router = useRouter()

  const requirements = getRequirements(password)
  const strength = getStrength(requirements)

  // Reset form on tab change or modal close
  useEffect(() => {
    setUsername('')
    setPassword('')
    setError('')
    setSuccess('')
    setShowPassword(false)
    setIsLoading(false)
  }, [activeTab, isOpen])

  useEffect(() => {
    setActiveTab(defaultTab)
  }, [defaultTab])

  const handleLogin = async () => {
    setError('')
    if (!username.trim()) return setError('Please enter your username.')
    if (!password) return setError('Please enter your password.')

    setIsLoading(true)
    try {
      const result = await login(username, password)
      if (result.success) {
        loadOrCreateUser(username.trim())
        setSuccess('Welcome back! 🪷')
        setTimeout(() => { onClose(); router.push('/feed') }, 900)
      } else {
        setError(result.error || 'Login failed.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async () => {
    setError('')
    if (!username.trim()) return setError('Please choose a username.')
    if (!password) return setError('Please create a password.')

    setIsLoading(true)
    try {
      const result = await signup(username, password)
      if (result.success) {
        loadOrCreateUser(username.trim())
        setSuccess('Account created! Welcome to Ojas Circle 🪷')
        setTimeout(() => { onClose(); router.push('/feed') }, 1000)
      } else {
        setError(result.error || 'Signup failed.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = () => {
    if (activeTab === 'login') handleLogin()
    else handleSignup()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="relative w-full max-w-md z-10"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative bg-[#0d1117]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden">

              {/* Ambient orbs */}
              <div className="absolute -top-12 -left-12 w-52 h-52 bg-aqua/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-white/5 rounded-full blur-[70px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-aqua/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Top border glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-aqua/50 to-transparent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all"
              >
                <X size={15} />
              </button>

              <div className="relative z-10 p-8">

                {/* Header */}
                <div className="text-center mb-7">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-aqua/10 border border-aqua/20 mb-4 shadow-[0_0_30px_rgba(0,180,216,0.15)]"
                  >
                    <span className="text-2xl select-none">🪷</span>
                  </motion.div>
                  <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight">
                    {activeTab === 'login' ? 'Welcome Back' : 'Join Ojas Circle'}
                  </h2>
                  <p className="text-sm text-white/40 mt-1">
                    {activeTab === 'login'
                      ? 'Sign in to your private sanctuary'
                      : 'Create your anonymous identity'}
                  </p>
                </div>

                {/* Tab switcher */}
                <div className="relative flex bg-white/[0.04] rounded-xl p-1 mb-7 border border-white/[0.06]">
                  {/* Sliding highlight */}
                  <div
                    className="absolute top-1 bottom-1 rounded-lg bg-aqua/15 border border-aqua/25 transition-all duration-300 ease-in-out"
                    style={{
                      width: 'calc(50% - 4px)',
                      left: activeTab === 'login' ? '4px' : '50%',
                    }}
                  />
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors z-10 ${
                      activeTab === 'login' ? 'text-aqua' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    <LogIn size={14} />
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-colors z-10 ${
                      activeTab === 'signup' ? 'text-aqua' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    <UserPlus size={14} />
                    Sign Up
                  </button>
                </div>

                {/* Success message */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-3.5 mb-5 bg-emerald-500/10 border border-emerald-500/25 rounded-xl text-emerald-400 text-sm"
                    >
                      <CheckCircle2 size={17} className="shrink-0" />
                      <span>{success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error message */}
                <AnimatePresence>
                  {error && !success && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-3 p-3.5 mb-5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm"
                    >
                      <XCircle size={17} className="shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form fields */}
                <div className="space-y-4">

                  {/* Username */}
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.12em] mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        id="auth-username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={activeTab === 'signup' ? 'Choose a username' : 'Enter your username'}
                        className="w-full pl-10 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-aqua/40 focus:bg-white/[0.06] transition-all"
                        maxLength={20}
                        autoComplete="username"
                        spellCheck={false}
                        autoFocus
                      />
                    </div>
                    {activeTab === 'signup' && username.trim().length > 0 && (
                      <p className="text-[10px] text-white/25 mt-1.5 pl-1">
                        3–20 chars · letters, numbers, and underscores only
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-[0.12em] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25">
                        <Lock size={16} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="auth-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={activeTab === 'signup' ? 'Create a strong password' : 'Enter your password'}
                        className="w-full pl-10 pr-12 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/20 text-sm focus:outline-none focus:border-aqua/40 focus:bg-white/[0.06] transition-all"
                        autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Password strength — signup only */}
                  <AnimatePresence>
                    {activeTab === 'signup' && password.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {/* Strength bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-white/35 uppercase tracking-wider font-semibold">
                              Strength
                            </span>
                            {strength.level > 0 && (
                              <span
                                className="text-[10px] font-bold uppercase tracking-wider transition-colors"
                                style={{ color: strength.color }}
                              >
                                {strength.label}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(level => (
                              <div
                                key={level}
                                className="h-1 flex-1 rounded-full transition-all duration-400"
                                style={{
                                  backgroundColor:
                                    level <= strength.level
                                      ? strength.color
                                      : 'rgba(255,255,255,0.08)',
                                }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Requirements checklist */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                          {requirements.map((req, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              {req.met ? (
                                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                              ) : (
                                <div className="w-[13px] h-[13px] rounded-full border border-white/15 shrink-0" />
                              )}
                              <span
                                className={`text-xs transition-colors ${
                                  req.met ? 'text-emerald-400' : 'text-white/35'
                                }`}
                              >
                                {req.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Submit button */}
                <button
                  id="auth-submit-btn"
                  onClick={handleSubmit}
                  disabled={isLoading || !!success}
                  className="mt-6 w-full relative flex items-center justify-center gap-2.5 py-3.5 bg-aqua hover:bg-aqua-light text-ink-black font-bold rounded-xl transition-all duration-200 hover:scale-[1.015] hover:shadow-[0_0_30px_rgba(0,180,216,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none text-[15px] tracking-wide"
                >
                  {isLoading ? (
                    <><Loader2 size={18} className="animate-spin" />
                      {activeTab === 'login' ? 'Signing in…' : 'Creating account…'}
                    </>
                  ) : success ? (
                    <><CheckCircle2 size={18} /> Redirecting…</>
                  ) : activeTab === 'login' ? (
                    <><LogIn size={18} /> Sign In</>
                  ) : (
                    <><UserPlus size={18} /> Create Account</>
                  )}
                </button>

                {/* Privacy note */}
                <div className="mt-5 flex items-start gap-2.5 p-3 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                  <Shield size={13} className="text-aqua/50 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-white/30 leading-relaxed">
                    No email required. Credentials are stored{' '}
                    <span className="text-white/45">only on this device</span> using
                    SHA-256 hashing. Zero server-side tracking.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
