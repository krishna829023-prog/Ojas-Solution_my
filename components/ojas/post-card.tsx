'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Bot, AlertTriangle, Leaf, BookOpen, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/user-context'

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  likes: number
  time: string
}

interface AIInsight {
  warning?: string
  ayurvedic?: string[]
  medical?: string
  sources?: string[]
  isCritical?: boolean
}

interface PostCardProps {
  id: string
  author: string
  avatar: string
  content: string
  tag: string
  time: string
  likes: number
  comments: Comment[]
  aiInsight?: AIInsight
  onAddComment?: (postId: string, comment: Comment) => void
}

export function PostCard({ 
  id,
  author, 
  avatar, 
  content, 
  tag, 
  time, 
  likes: initialLikes, 
  comments: initialComments,
  aiInsight,
  onAddComment,
}: PostCardProps) {
  const { user, toggleLikePost, toggleSavePost } = useUser()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showFullAI, setShowFullAI] = useState(false)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')

  // Sync with user context
  useEffect(() => {
    if (user) {
      setIsLiked(user.likedPosts.includes(id))
      setIsSaved(user.savedPosts.includes(id))
    }
  }, [user, id])

  const handleLike = () => {
    if (!user) return
    
    const nowLiked = toggleLikePost(id)
    if (isLiked) {
      setLikes(prev => prev - 1)
    } else {
      setLikes(prev => prev + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    if (!user) return
    toggleSavePost(id)
    setIsSaved(!isSaved)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: user.username,
      avatar: user.avatar,
      content: newComment,
      likes: 0,
      time: 'Just now',
    }
    
    setComments(prev => [...prev, comment])
    onAddComment?.(id, comment)
    setNewComment('')
  }

  const tagColors: Record<string, string> = {
    'Addiction': 'bg-orange-500/20 text-orange-400',
    'Mental Health': 'bg-blue-500/20 text-blue-400',
    'Ayurveda': 'bg-green-500/20 text-green-400',
    'Relationships': 'bg-pink-500/20 text-pink-400',
    'Health': 'bg-red-500/20 text-red-400',
    'Self-Improvement': 'bg-purple-500/20 text-purple-400',
  }

  return (
    <article className="glass-card p-4 md:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
            {avatar}
          </div>
          <div>
            <div className="font-semibold text-foreground">{author}</div>
            <div className="text-xs text-muted-foreground">{time}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('px-2 py-1 rounded-full text-xs font-medium', tagColors[tag] || 'bg-muted text-muted-foreground')}>
            {tag}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <p className="text-foreground leading-relaxed">{content}</p>

      {/* AI Insight */}
      {aiInsight && (
        <div className={cn(
          'rounded-xl p-4 space-y-3 border',
          aiInsight.isCritical 
            ? 'bg-destructive/10 border-destructive/30' 
            : 'bg-muted/50 border-border/50'
        )}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-foreground">AI Insight</span>
          </div>

          {aiInsight.warning && (
            <div className={cn(
              'flex items-start gap-2 text-sm',
              aiInsight.isCritical ? 'text-destructive' : 'text-yellow-500'
            )}>
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{aiInsight.warning}</span>
            </div>
          )}

          {showFullAI && aiInsight.ayurvedic && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-secondary">
                <Leaf className="h-4 w-4" />
                Ayurvedic Alternative:
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                {aiInsight.ayurvedic.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secondary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showFullAI && aiInsight.medical && (
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary">🏥</span>
              <span>{aiInsight.medical}</span>
            </div>
          )}

          {showFullAI && aiInsight.sources && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <BookOpen className="h-3 w-3 shrink-0 mt-0.5" />
              <span>Sources: {aiInsight.sources.join(', ')}</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFullAI(!showFullAI)}
            className="w-full text-xs text-muted-foreground hover:text-foreground"
          >
            {showFullAI ? (
              <>Show Less <ChevronUp className="h-3 w-3 ml-1" /></>
            ) : (
              <>Read Full AI Analysis <ChevronDown className="h-3 w-3 ml-1" /></>
            )}
          </Button>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={cn('gap-1.5', isLiked && 'text-green-500')}
          >
            <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
            <span>{likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowComments(!showComments)}
            className="gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{comments.length}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSave}
          className={cn(isSaved && 'text-primary')}
        >
          <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
        </Button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="space-y-3 pt-3 border-t border-border/50">
          {comments.length > 0 && comments.slice(0, 5).map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
                <div className="flex items-center gap-3 mt-1">
                  <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Heart className="h-3 w-3" /> {comment.likes}
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                </div>
              </div>
            </div>
          ))}
          
          {comments.length > 5 && (
            <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
              View all {comments.length} comments
            </Button>
          )}

          {/* Add Comment */}
          {user && (
            <div className="flex gap-2 pt-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1 flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 h-8 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button 
                  size="sm" 
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="h-8 px-3"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
