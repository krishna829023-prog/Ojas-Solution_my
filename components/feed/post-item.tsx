"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, AlertTriangle, Leaf, Stethoscope, BookOpen, Bot, MoreVertical, Flag, BellOff, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type AISummary = {
  insight?: string;
  warning?: string;
  ayurvedic?: string[];
  medical?: string;
  sources?: string;
  level: "info" | "warning" | "critical";
};

export type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  tag: string;
  upvotes: number;
  comments: number;
  aiSummary?: AISummary;
  replies?: { id: string; author: string; avatar: string; content: string; timeAgo: string; }[];
};

export function PostItem({ post }: { post: Post }) {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(post.upvotes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replies, setReplies] = useState(post.replies || []);
  const [showMenu, setShowMenu] = useState(false);

  const handleUpvote = () => {
    setUpvoted(!upvoted);
    setUpvotesCount(prev => upvoted ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setReplies(prev => [...prev, {
      id: Date.now().toString(),
      author: "SilentTiger_2910", // Mock current user
      avatar: "🐯",
      content: newComment,
      timeAgo: "Just now"
    }]);
    setNewComment("");
  };

  return (
    <div className="glass-card p-5 sm:p-7 relative overflow-hidden group hover:border-aqua/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] bg-obsidian/40">
      <div className="absolute top-0 right-0 w-64 h-64 bg-aqua/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-aqua/10 border border-aqua/20 flex items-center justify-center text-2xl shadow-inner shrink-0">
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-white leading-tight">{post.author.name}</h4>
              {post.upvotes >= 300 && (
                <span className="inline-flex items-center gap-1 bg-aqua/20 text-aqua text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-aqua/30">
                  <Award size={12} /> Compassionate Listener
                </span>
              )}
            </div>
            <span className="text-xs text-text-muted">{post.timeAgo}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 relative">
          <span className="hidden sm:inline-flex px-3 py-1 bg-white/5 border border-border/50 rounded-full text-xs font-medium text-text-secondary">
            🏷️ {post.tag}
          </span>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 -mr-2 rounded-full hover:bg-white/10 text-text-muted transition-colors focus:outline-none">
            <MoreVertical size={18} />
          </button>
          
          <AnimatePresence>
            {showMenu && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-full right-0 mt-2 w-48 bg-obsidian/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50 py-1"
              >
                <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-3 text-sm text-text-secondary hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors">
                  <BellOff size={16} /> Mute Topic
                </button>
                <button onClick={() => setShowMenu(false)} className="w-full text-left px-4 py-3 text-sm text-alert-white hover:bg-alert-white/10 flex items-center gap-3 transition-colors">
                  <Flag size={16} /> Report Content
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-white/95 text-[16px] leading-relaxed mb-5 whitespace-pre-wrap relative z-10 font-light">
        {post.content}
      </p>

      {/* AI Summary Block - "Community Notes" style */}
      {post.aiSummary && (
        <div className={`mt-5 mb-6 rounded-2xl border p-5 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md ${
          post.aiSummary.level === 'critical' ? 'bg-[#2A0F15]/60 border-alert-white/40' :
          post.aiSummary.level === 'warning' ? 'bg-[#2A1F0D]/60 border-warning-white/40' :
          'bg-[#0D1B2A]/60 border-aqua/40' 
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-3 relative z-10">
            <Bot size={16} className={
              post.aiSummary.level === 'critical' ? 'text-alert-white' :
              post.aiSummary.level === 'warning' ? 'text-warning-white' :
              'text-pure-white'
            } />
            <span className="text-xs font-bold tracking-wider uppercase text-text-secondary">
              AI Health Insight
            </span>
          </div>

          <div className="space-y-3 text-sm">
            {post.aiSummary.warning && (
              <div className="flex gap-2">
                <AlertTriangle size={16} className="text-warning-white shrink-0 mt-0.5" />
                <p className="text-text-primary"><span className="font-bold text-warning-white">Warning: </span>{post.aiSummary.warning}</p>
              </div>
            )}
            
            {post.aiSummary.insight && (
              <div className="flex gap-2">
                <span className="shrink-0 mt-0.5">⚡</span>
                <p className="text-text-primary">{post.aiSummary.insight}</p>
              </div>
            )}

            {post.aiSummary.ayurvedic && post.aiSummary.ayurvedic.length > 0 && (
              <div className="flex gap-2">
                <Leaf size={16} className="text-silver shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-silver">Ayurvedic Alternative:</span>
                  <ul className="list-disc list-inside mt-1 text-text-secondary">
                    {post.aiSummary.ayurvedic.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {post.aiSummary.medical && (
              <div className="flex gap-2">
                <Stethoscope size={16} className="text-pure-white shrink-0 mt-0.5" />
                <p className="text-text-secondary"><span className="font-bold text-pure-white">Medical Note: </span>{post.aiSummary.medical}</p>
              </div>
            )}

            {post.aiSummary.sources && (
              <div className="flex gap-2 pt-2 border-t border-border/50 text-xs mt-2">
                <BookOpen size={14} className="text-text-muted shrink-0" />
                <p className="text-text-muted">Sources: {post.aiSummary.sources}</p>
              </div>
            )}
            
            {/* Optional Helpline CTA if Critical */}
            {post.aiSummary.level === 'critical' && (
              <div className="mt-3 p-3 bg-white/5 rounded-lg border border-alert-white/20 text-center">
                <p className="text-white font-bold mb-1">🆘 Talk to someone now</p>
                <div className="flex justify-center gap-4 text-sm text-text-secondary">
                  <span>Tele-MANAS: <a href="tel:14416" className="text-aqua hover:underline">14416</a></span>
                  <span>iCALL: <a href="tel:9152987821" className="text-aqua hover:underline">9152987821</a></span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30 relative z-10">
        <div className="flex items-center gap-2 sm:gap-4 -ml-2">
          <button 
            onClick={handleUpvote}
            className={`flex items-center gap-2 transition-colors p-2 sm:p-3 rounded-full hover:bg-white/5 ${upvoted ? 'text-silver' : 'text-text-secondary hover:text-white'}`}
          >
            <motion.div
              animate={upvoted ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart size={20} fill={upvoted ? "currentColor" : "none"} />
            </motion.div>
            <span className="text-sm font-medium">{upvotesCount}</span>
          </button>
          
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors p-2 sm:p-3 rounded-full hover:bg-white/5"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">{replies.length}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 -mr-2">
          <button className="text-text-secondary hover:text-white transition-colors p-2 sm:p-3 rounded-full hover:bg-white/5">
            <Share2 size={20} />
          </button>
          <button className="text-text-secondary hover:text-white transition-colors p-2 sm:p-3 rounded-full hover:bg-white/5">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      {/* Expandable Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border/30 overflow-hidden"
          >
            <div className="space-y-4 mb-4 max-h-[440px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {replies.length > 0 ? replies.map((reply) => (
                <div key={reply.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-sm">
                    {reply.avatar}
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-sm p-3 flex-1 border border-border/30">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-white">{reply.author}</span>
                      <span className="text-xs text-text-muted">{reply.timeAgo}</span>
                    </div>
                    <p className="text-sm text-white/90">{reply.content}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center text-sm text-text-muted py-4">No comments yet. Be the first!</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                placeholder="Post an anonymous reply..." 
                className="flex-1 bg-white/5 border border-border/50 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-aqua/50 transition-colors"
                maxLength={280}
              />
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-aqua text-ink-black font-bold rounded-full text-sm disabled:opacity-50 transition-colors"
              >
                Reply
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
