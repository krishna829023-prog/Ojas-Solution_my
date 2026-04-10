"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X } from "lucide-react";
import { useRouter } from "next/navigation";

const adjectives = ["Silent", "Calm", "Brave", "Quiet", "Healing", "Zen", "Ojas"];
const nouns = ["Phoenix", "Tiger", "Wave", "Monk", "Soul", "Warrior", "Path"];
const avatars = ["🪷", "🦁", "🌊", "🔥", "🌿", "🛡️", "⚡", "🧘"];

function generateName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${adj}${noun}_${num}`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AnonymousOnboarding({ isOpen, onClose }: Props) {
  const [username, setUsername] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && !username) {
      setUsername(generateName());
    }
  }, [isOpen, username]);

  const handleEnter = () => {
    // In a real app, save to context/localStorage
    router.push("/feed");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-background/80 backdrop-blur-sm"
             onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
             initial={{ scale: 0.95, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.95, opacity: 0, y: 20 }}
             className="relative w-full max-w-md glass-card p-6 shadow-2xl overflow-hidden z-10"
          >
            {/* subtle portal effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-aqua/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-silver/20 blur-3xl rounded-full" />
            
            <button onClick={onClose} className="absolute right-4 top-4 text-text-muted hover:text-white transition-colors z-20">
              <X size={20} />
            </button>

            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <span className="text-3xl">🪷</span> Welcome to Ojas Circle
              </h2>
            </div>

            <div className="bg-obsidian border border-border/50 rounded-xl p-4 mb-6 relative z-10">
              <p className="text-sm text-text-secondary mb-2">Your Anonymous Identity:</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedAvatar}</span>
                  <span className="text-lg font-bold text-aqua">{username}</span>
                </div>
                <button 
                  onClick={() => setUsername(generateName())}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-text-muted hover:text-white"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            <div className="mb-8 relative z-10">
              <p className="text-sm text-text-secondary mb-3">Choose your avatar:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {avatars.map((a) => (
                  <button
                    key={a}
                    onClick={() => setSelectedAvatar(a)}
                    className={`text-2xl w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      selectedAvatar === a ? 'bg-white/20 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'hover:bg-white/10'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-warning-white/10 border border-warning-white/20 rounded-lg p-3 mb-6 relative z-10">
              <p className="text-xs text-text-secondary flex items-start gap-2">
                <span className="text-warning-white">⚠️</span>
                <span>We collect ZERO personal data. Your session and device info are completely anonymous and auto-purge after 30 days.</span>
              </p>
            </div>

            <button
              onClick={handleEnter}
              className="w-full relative z-10 py-3.5 bg-aqua hover:bg-aqua-light text-ink-black font-bold rounded-xl transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(244,160,36,0.3)] flex items-center justify-center gap-2"
            >
              ✅ ENTER OJAS CIRCLE
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
