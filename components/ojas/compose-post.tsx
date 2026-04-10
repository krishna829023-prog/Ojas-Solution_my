'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/user-context'

const tags = [
  'Addiction',
  'Mental Health',
  'Ayurveda',
  'Relationships',
  'Self-Improvement',
  'Health',
]

interface ComposePostProps {
  onPost?: (content: string, tag: string) => void
}

export function ComposePost({ onPost }: ComposePostProps) {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const handlePost = () => {
    if (content.trim() && selectedTag) {
      onPost?.(content, selectedTag)
      setContent('')
      setSelectedTag(null)
      setIsFocused(false)
    }
  }

  const charCount = content.length
  const maxChars = 500

  if (!user) {
    return (
      <div className="glass-card p-4 text-center text-muted-foreground">
        Please complete onboarding to post.
      </div>
    )
  }

  return (
    <div className={cn(
      'glass-card p-4 transition-all duration-300',
      isFocused && 'ring-2 ring-primary/50'
    )}>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl shrink-0">
          {user.avatar}
        </div>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What&apos;s on your mind? Share anonymously..."
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            onFocus={() => setIsFocused(true)}
            className="min-h-[80px] resize-none border-0 bg-transparent p-0 focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
          />

          {/* Tags */}
          {isFocused && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Select a tag:</div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium transition-all',
                      selectedTag === tag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-muted-foreground">
              {charCount}/{maxChars}
            </div>
            <div className="flex items-center gap-2">
              {isFocused && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setContent('')
                    setSelectedTag(null)
                    setIsFocused(false)
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={handlePost}
                disabled={!content.trim() || !selectedTag}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-1" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
