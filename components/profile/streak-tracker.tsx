"use client";

import { useState } from "react";
import { Flame, Check, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export function StreakTracker() {
  const [streak, setStreak] = useState(45);
  const [checkedToday, setCheckedToday] = useState(false);

  // Generate mock calendar data (e.g., June 2026)
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i < 24 ? "clean" : i === 24 ? "reset" : i === 25 ? (checkedToday ? "clean" : "pending") : "future"
  }));

  const handleCheckIn = () => {
    if (!checkedToday) {
      setCheckedToday(true);
      setStreak(prev => prev + 1);
    }
  };

  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Background glow based on streak size */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-aqua/10 rounded-full blur-[80px] pointer-events-none"
        style={{ transform: `scale(${1 + streak * 0.01})` }}
      />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-white">
            📊 MY STREAK
          </h3>
          <p className="text-text-secondary text-sm">Every day is a victory.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-3xl font-black text-aqua flex items-center gap-1 justify-center">
              {streak} <Flame size={24} fill="currentColor" stroke="none" className="animate-pulse" />
            </div>
            <div className="text-xs text-text-muted uppercase font-bold tracking-wider pt-1">Current</div>
          </div>
          
          <div className="w-px h-12 bg-border/50" />
          
          <div className="text-center">
            <div className="text-3xl font-black text-white flex items-center gap-1 justify-center">
              45 <Trophy size={20} className="text-aqua" />
            </div>
            <div className="text-xs text-text-muted uppercase font-bold tracking-wider pt-1">Best</div>
          </div>
        </div>
      </div>

      <div className="mb-6 relative z-10">
        <div className="flex justify-between text-xs text-text-muted font-bold mb-2 px-2">
          <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((d, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`aspect-square rounded-md flex items-center justify-center text-xs font-bold ${
                d.status === "clean" ? "bg-silver/20 text-silver border border-silver/30 shadow-[0_0_10px_rgba(46,204,113,0.2)]" :
                d.status === "reset" ? "bg-alert-white/20 text-alert-white border border-alert-white/30 shadow-[0_0_10px_rgba(255,23,68,0.2)]" :
                d.status === "pending" ? "bg-white/10 text-white animate-pulse" :
                "bg-white/5 text-text-muted"
              }`}
            >
              {d.day}
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-text-secondary">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-silver/50 border border-silver"></span> Clean Day</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-alert-white/50 border border-alert-white"></span> Reset</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-white/5"></span> Future</div>
        </div>
      </div>

      <button
        onClick={handleCheckIn}
        disabled={checkedToday}
        className={`relative z-10 w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
          checkedToday 
            ? "bg-silver/20 text-silver border border-silver/50 cursor-not-allowed" 
            : "bg-aqua text-ink-black hover:bg-aqua-light hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(244,160,36,0.3)] cursor-pointer"
        }`}
      >
        {checkedToday ? (
          <>
            <Check size={20} /> STREAK UPDATED
          </>
        ) : (
          <>
            ✅ MARK TODAY CLEAN
          </>
        )}
      </button>

      {checkedToday && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-silver mt-4 relative z-10 font-medium"
        >
          Community cheers! You're doing great. 💚
        </motion.p>
      )}
    </div>
  );
}
