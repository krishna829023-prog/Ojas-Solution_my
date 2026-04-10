'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, Trophy, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChallengeTask {
  day: number
  task: string
  completed: boolean
}

interface ChallengeCardProps {
  id: string
  name: string
  icon: string
  duration: string
  participants: number
  badge: string
  description?: string
  tasks?: ChallengeTask[]
  currentDay?: number
  isJoined?: boolean
  onJoin?: (id: string) => void
  onComplete?: (day: number) => void
}

export function ChallengeCard({ 
  id, 
  name, 
  icon, 
  duration, 
  participants, 
  badge,
  description,
  tasks = [],
  currentDay = 0,
  isJoined = false,
  onJoin,
  onComplete,
}: ChallengeCardProps) {
  const [expanded, setExpanded] = useState(false)
  const progress = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0

  return (
    <div className={cn(
      'glass-card overflow-hidden transition-all duration-300',
      isJoined && 'ring-2 ring-primary/30'
    )}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="text-4xl">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
          {isJoined && (
            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              Active
            </div>
          )}
        </div>

        {/* Progress */}
        {isJoined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Day {currentDay}/{tasks.length}</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{participants.toLocaleString()} participating</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Trophy className="h-4 w-4" />
            <span>{badge}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isJoined ? (
            <>
              <Button 
                size="sm"
                onClick={() => onComplete?.(currentDay)}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
              >
                <Check className="h-4 w-4" />
                Mark Day {currentDay} Complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </>
          ) : (
            <Button 
              size="sm"
              onClick={() => onJoin?.(id)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Join Challenge
            </Button>
          )}
        </div>
      </div>

      {/* Tasks List */}
      {expanded && isJoined && tasks.length > 0 && (
        <div className="border-t border-border/50 p-4 bg-muted/30 space-y-2">
          <div className="text-sm font-medium text-foreground mb-3">Daily Tasks</div>
          {tasks.map((task) => (
            <div 
              key={task.day}
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg transition-colors',
                task.completed && 'bg-secondary/10',
                task.day === currentDay && !task.completed && 'bg-primary/10'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0',
                task.completed ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
              )}>
                {task.completed ? <Check className="h-3 w-3" /> : task.day}
              </div>
              <span className={cn(
                'text-sm flex-1',
                task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
              )}>
                {task.task}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
