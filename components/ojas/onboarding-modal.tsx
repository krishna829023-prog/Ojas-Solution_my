'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RefreshCw, Check, Shield } from 'lucide-react'
import { avatars, generateUsername } from '@/lib/user-context'

interface OnboardingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete: (username: string, avatar: string) => void
}

export function OnboardingModal({ open, onOpenChange, onComplete }: OnboardingModalProps) {
  const [username, setUsername] = useState(() => generateUsername())
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0])
  const [isGenerating, setIsGenerating] = useState(false)

  const regenerateUsername = useCallback(() => {
    setIsGenerating(true)
    setTimeout(() => {
      setUsername(generateUsername())
      setIsGenerating(false)
    }, 300)
  }, [])

  const handleEnter = () => {
    onComplete(username, selectedAvatar)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <span className="text-3xl">🪷</span>
            <span>Welcome to Ojas Circle</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Anonymous Identity */}
          <div className="glass p-4 rounded-xl space-y-3">
            <div className="text-sm text-muted-foreground text-center">Your Anonymous Identity</div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-2xl">{selectedAvatar}</div>
              <div className="flex-1 text-lg font-semibold text-foreground truncate">{username}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={regenerateUsername}
                disabled={isGenerating}
                className="shrink-0"
              >
                <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground text-center">Choose your avatar</div>
            <div className="flex flex-wrap justify-center gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all duration-200
                    ${selectedAvatar === avatar 
                      ? 'bg-primary/20 ring-2 ring-primary scale-110' 
                      : 'bg-muted/50 hover:bg-muted hover:scale-105'
                    }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
            <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <div className="text-xs text-muted-foreground leading-relaxed">
              We collect <strong className="text-foreground">ZERO personal data</strong>. 
              No email, no phone, no real names. Session auto-deletes after 30 days. 
              DPDP Act compliant.
            </div>
          </div>

          {/* Enter Button */}
          <Button 
            onClick={handleEnter}
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Check className="mr-2 h-5 w-5" />
            Enter Ojas Circle
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
