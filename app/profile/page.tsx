"use client";

import { StreakTracker } from "@/components/profile/streak-tracker";
import { RefreshCw, Bell, Moon, Sun, Info, Trash2, LogOut, FileText, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const ANONYMOUS_NAMES = ["BraveMonk", "SilentTiger", "CalmWave", "ZenMaster", "HealingTree", "MindfulPanda"];
const AVATARS = ["🛡️", "🦁", "🌊", "🧘", "🌳", "🐼"];

export default function ProfilePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const [username, setUsername] = useState("BraveMonk_4421");
  const [avatar, setAvatar] = useState("🛡️");
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedName = localStorage.getItem("ojas_username");
    const savedAvatar = localStorage.getItem("ojas_avatar");
    if (savedName) setUsername(savedName);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleChangeName = () => {
    const randomName = ANONYMOUS_NAMES[Math.floor(Math.random() * ANONYMOUS_NAMES.length)] + "_" + Math.floor(Math.random() * 9999);
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    setUsername(randomName);
    setAvatar(randomAvatar);
    localStorage.setItem("ojas_username", randomName);
    localStorage.setItem("ojas_avatar", randomAvatar);
  };

  const handleDeleteData = () => {
    if (confirm("Are you sure you want to delete all your anonymous data locally?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleExit = () => {
    localStorage.removeItem("ojas_session");
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 sm:px-6 py-8 pb-32">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 relative mb-4 rounded-full p-1 bg-gradient-to-tr from-saffron via-transparent to-calm-blue animate-pulse-glow shadow-[0_0_30px_rgba(244,160,36,0.2)]">
          <div className="w-full h-full bg-dark-surface rounded-full flex items-center justify-center text-5xl">
            {avatar}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          {username}
        </h2>
        <p className="text-text-secondary italic mt-1 font-medium">
          "Healing one day at a time"
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 w-full mt-6 bg-dark-surface border border-border/50 rounded-2xl p-4 divide-x divide-border/50">
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-text-muted">Posts</span>
            <span className="text-xl font-bold text-white">23</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-text-muted">Upvotes</span>
            <span className="text-xl font-bold text-white">1.2K</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-sm text-text-muted">Streak</span>
            <span className="text-xl font-bold text-saffron flex items-center gap-1">
              45 <span className="text-sm">🔥</span>
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="w-full mt-6">
          <h3 className="text-sm text-text-muted font-bold tracking-wider uppercase mb-3 px-2">🏅 Badges Earned</h3>
          <div className="flex flex-wrap gap-2">
            {['Ojas Warrior', '7-Day Champ', 'Helpful Soul', '30-Day Monk'].map(badge => (
              <span key={badge} className="px-3 py-1.5 bg-white/5 border border-border/50 rounded-lg text-sm font-medium text-saffron-light flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <StreakTracker />

        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border/30 bg-white/[0.02]">
            <h3 className="text-sm text-text-muted font-bold tracking-wider uppercase">── My Activity</h3>
          </div>
          <div className="p-2">
            {[
              { icon: FileText, label: "My Posts (23)", color: "text-calm-blue" },
              { icon: RefreshCw, label: "My Comments (89)", color: "text-healing-green" },
              { icon: FileText, label: "Saved Posts (12)", color: "text-saffron" },
              { icon: Trophy, label: "My Challenges (4)", color: "text-saffron" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={item.color} />
                  <span className="font-medium text-white">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border/30 bg-white/[0.02]">
            <h3 className="text-sm text-text-muted font-bold tracking-wider uppercase">── Settings</h3>
          </div>
          <div className="p-2">
             {[
              { icon: RefreshCw, label: "Change Anonymous Name", onClick: handleChangeName },
              { icon: Bell, label: `Notifications: ${notifications ? 'ON' : 'OFF'}`, onClick: () => setNotifications(!notifications) },
              { icon: Info, label: "About Ojas Circle", onClick: () => router.push('/about') },
            ].map((item, i) => (
              <button key={i} onClick={item.onClick} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <item.icon size={18} className="text-text-secondary" />
                  <span className="font-medium text-white">{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
            ))}

            <div className="h-px bg-border/50 my-2 mx-3" />

            <button onClick={handleDeleteData} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-critical-red/10 transition-colors group">
              <div className="flex items-center gap-3">
                <Trash2 size={18} className="text-critical-red transition-colors" />
                <span className="font-medium text-critical-red">Delete All My Data</span>
              </div>
              <ChevronRight size={16} className="text-critical-red/50 group-hover:text-critical-red" />
            </button>
            
            <button onClick={handleExit} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <LogOut size={18} className="text-text-secondary group-hover:text-white transition-colors" />
                <span className="font-medium text-text-secondary group-hover:text-white transition-colors">Exit (auto-deletes session)</span>
              </div>
              <ChevronRight size={16} className="text-text-muted group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary inline trophy icon since it was referenced but not imported in previous examples
function Trophy(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
