"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UserCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !username.trim()) {
      setError("Please fill out both fields.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), username: username.trim() }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Tell NextAuth to trigger the 'update' JWT flow
      await update({ customName: name.trim(), customUsername: username.trim() });
      
      // Redirect home
      router.push("/");
      router.refresh();
      
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-aqua/10 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-silver/10 rounded-full blur-[90px] opacity-70 pointer-events-none" />
      
      <div className="glass-card max-w-lg w-full p-8 md:p-10 relative z-10 border border-aqua/20 shadow-[0_0_30px_rgba(0,255,255,0.05)]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-aqua/20 border border-aqua/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.2)] mb-4">
             <UserCircle2 size={32} className="text-aqua" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aqua to-silver tracking-tight">Complete Profile</h1>
          <p className="text-sm text-text-secondary mt-2 text-center">To keep the community safe and anonymous, pick a unique username.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80 ml-1">Display Name</label>
            <input 
              type="text" 
              placeholder="E.g. Siddharth"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white/80 ml-1">Unique Username</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">@</span>
              <input 
                type="text" 
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/10 focus:border-aqua/50 focus:ring-1 focus:ring-aqua/50 rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-white/30 outline-none transition-all shadow-inner"
              />
            </div>
            <p className="text-xs text-white/40 ml-1 mt-1">This will be your visible handle across Ojas.</p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full bg-aqua hover:bg-aqua-light text-ink-black font-bold py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.2)] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? "Saving..." : "Start Journey"}
          </button>
        </form>
      </div>
    </div>
  );
}
