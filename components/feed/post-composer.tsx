"use client";

import { useState } from "react";
import { Send, Hash, Sparkles, UserCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const availableTags = [
  "NoFap Journey",
  "Anxiety Tips",
  "Ayurveda",
  "Women's Health",
  "PCOD & Cramps",
  "Relationships",
  "Sleep Health",
  "Addiction"
];

export function PostComposer({ onPost }: { onPost?: (content: string, tag: string) => void }) {
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState(availableTags[0]);
  const [isFocused, setIsFocused] = useState(false);

  const handlePost = () => {
    if (!content.trim()) return;
    onPost?.(content, selectedTag);
    setContent("");
    setIsFocused(false);
  };

  const charCount = content.length;
  const maxChars = 500;
  const isNearLimit = charCount > maxChars - 50;

  return (
    <motion.div 
      animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-5 transition-all duration-300 relative overflow-hidden ${
        isFocused 
          ? 'border-aqua/40 shadow-[0_0_30px_rgba(244,160,36,0.1)] bg-obsidian/80' 
          : 'border-border/50 bg-obsidian/40 hover:bg-obsidian/60'
      }`}
    >
      {isFocused && (
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[120%] bg-aqua/5 blur-[80px] pointer-events-none" />
      )}

      <div className="flex gap-4 relative z-10">
        <div className="hidden sm:flex shrink-0 w-12 h-12 rounded-full bg-aqua/10 border border-aqua/20 items-center justify-center text-aqua">
          <UserCircle2 size={24} />
        </div>
        
        <div className="flex-1 flex flex-col min-w-0">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Share what's on your mind. You are completely anonymous..."
            className="w-full bg-transparent border-none resize-none outline-none min-h-[100px] text-white placeholder:text-text-muted text-lg leading-relaxed pt-2"
          />
          
          <AnimatePresence>
            {isFocused && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between mb-4 overflow-hidden"
              >
                <span className={`text-xs font-medium ${isNearLimit ? 'text-warning-white' : 'text-text-muted'}`}>
                  {charCount} / {maxChars}
                </span>
                <span className="text-xs text-pure-white flex items-center gap-1 font-medium bg-pure-white/10 px-2 py-1 rounded-md">
                  <Sparkles size={12} /> Ojas AI will automatically summarize this
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide flex-1">
              <Hash size={16} className="text-text-muted shrink-0" />
              <div className="flex items-center gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                       selectedTag === tag 
                        ? 'bg-aqua text-ink-black shadow-[0_0_10px_rgba(244,160,36,0.3)]' 
                        : 'bg-white/5 text-text-secondary border border-transparent hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="shrink-0 flex items-center justify-center gap-2 px-8 py-2.5 bg-aqua hover:bg-aqua-light text-ink-black font-black rounded-full transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-[0_4px_14px_0_rgba(244,160,36,0.39)] hover:shadow-[0_6px_20px_rgba(244,160,36,0.23)]"
            >
              Post <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
