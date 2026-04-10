'use client'

import { Button } from '@/components/ui/button'
import { Users, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RoomCardProps {
  id: string
  name: string
  icon: string
  members: number
  online: number
  description?: string
  isJoined?: boolean
  onJoin?: (id: string) => void
  className?: string
}

export function RoomCard({ id, name, icon, members, online, description, isJoined = false, onJoin, className }: RoomCardProps) {
  return (
    <div className={cn(
      'glass-card p-5 space-y-4 group transition-all duration-300',
      isJoined && 'ring-2 ring-secondary/50',
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-500">{online} live</span>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{members.toLocaleString()}</span>
        </div>
        {isJoined ? (
          <Button 
            size="sm" 
            variant="secondary"
            className="gap-1.5 bg-secondary/20 text-secondary hover:bg-secondary/30"
          >
            <Check className="h-3 w-3" />
            Joined
          </Button>
        ) : (
          <Button 
            size="sm" 
            onClick={() => onJoin?.(id)}
            className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Join
          </Button>
        )}
      </div>
    </div>
  )
}
