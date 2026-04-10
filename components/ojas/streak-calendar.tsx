'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StreakCalendarProps {
  currentStreak: number
  bestStreak: number
  streakDays: Date[]
  resetDays?: Date[]
  onMarkToday?: () => void
}

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
}

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function StreakCalendar({ currentStreak, bestStreak, streakDays, resetDays = [], onMarkToday }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const today = useMemo(() => startOfDay(new Date()), [])
  
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7 // Adjust for Monday start
  
  const daysInMonth = lastDayOfMonth.getDate()
  const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7
  
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isStreakDay = (date: Date) => streakDays.some(d => isSameDay(d, date))
  const isResetDay = (date: Date) => resetDays.some(d => isSameDay(d, date))
  const isTodayMarked = streakDays.some(d => isSameDay(d, today))
  const isFuture = (date: Date) => startOfDay(date) > today

  return (
    <div className="glass-card p-5 space-y-4">
      {/* Stats */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-foreground flex items-center gap-2">
            <span className="text-primary">🔥</span>
            {currentStreak}
            <span className="text-lg font-normal text-muted-foreground">days</span>
          </div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-foreground">{bestStreak}</div>
          <div className="text-sm text-muted-foreground">Best Streak</div>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-foreground">
          {MONTHS[month]} {year}
        </span>
        <Button variant="ghost" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {[...Array(totalCells)].map((_, index) => {
          const dayNumber = index - startingDayOfWeek + 1
          const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth
          const currentDay = isValidDay ? new Date(year, month, dayNumber) : null
          
          if (!isValidDay) {
            return <div key={index} className="aspect-square" />
          }
          
          const isStreak = currentDay && isStreakDay(currentDay)
          const isReset = currentDay && isResetDay(currentDay)
          const isToday = currentDay && isSameDay(currentDay, today)
          const isFutureDay = currentDay && isFuture(currentDay)
          
          return (
            <div
              key={index}
              className={cn(
                'aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all',
                isFutureDay && 'text-muted-foreground/30',
                isStreak && 'bg-secondary text-secondary-foreground',
                isReset && 'bg-destructive/20 text-destructive',
                isToday && !isStreak && 'ring-2 ring-primary',
                !isStreak && !isReset && !isFutureDay && 'text-muted-foreground'
              )}
            >
              {dayNumber}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-secondary" />
          Clean Day
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-destructive/50" />
          Reset
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-primary" />
          Today
        </div>
      </div>

      {/* Mark Today Button */}
      {!isTodayMarked && (
        <Button 
          onClick={onMarkToday}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
        >
          <Check className="h-4 w-4" />
          Mark Today Clean
        </Button>
      )}

      {isTodayMarked && (
        <div className="text-center text-sm text-secondary font-medium flex items-center justify-center gap-2">
          <Check className="h-4 w-4" />
          Today is marked clean!
        </div>
      )}
    </div>
  )
}
