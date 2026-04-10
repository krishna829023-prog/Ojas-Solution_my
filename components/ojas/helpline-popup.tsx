'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Heart, X } from 'lucide-react'

const helplines = [
  { name: 'Tele-MANAS', number: '14416', description: '24/7, Free, Government Helpline' },
  { name: 'iCALL', number: '9152987821', description: 'Mon-Sat, 8am-10pm' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', description: '24/7, Multi-language' },
]

interface HelplinePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HelplinePopup({ open, onOpenChange }: HelplinePopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-secondary/30 max-w-md mx-auto p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-secondary/20 to-primary/20 p-6 text-center relative">
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
          <div className="text-4xl mb-3">🤗</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">You&apos;re Not Alone</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We noticed you might be going through a tough time. 
            It&apos;s okay to ask for help.
          </p>
        </div>

        {/* Helplines */}
        <div className="p-6 space-y-3">
          {helplines.map((line) => (
            <a
              key={line.name}
              href={`tel:${line.number}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{line.name}</div>
                <div className="text-xs text-muted-foreground">{line.description}</div>
              </div>
              <div className="font-mono text-primary font-semibold">{line.number}</div>
            </a>
          ))}

          {/* Chat Option */}
          <Button 
            variant="outline" 
            className="w-full h-14 gap-3 border-secondary/30 hover:bg-secondary/10"
          >
            <MessageCircle className="h-5 w-5 text-secondary" />
            <span>Chat with a Trained Listener</span>
          </Button>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <Heart className="h-4 w-4 text-green-500" />
            <span>Thousands have recovered. You will too.</span>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            Continue to Feed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
