"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background Ambience styling */}
      <div className="absolute top-[-10%] sm:top-0 right-[-10%] sm:right-[10%] w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-aqua/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] sm:bottom-0 left-[-10%] sm:left-[10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-12 mx-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center text-center">
        {/* Logo / Lotus Icon Representation */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-aqua/20 rounded-2xl flex items-center justify-center mb-6 border border-aqua/30 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
          <span className="text-4xl">🪷</span>
        </div>

        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aqua to-aqua-light mb-2">
          Welcome to Ojas
        </h1>
        <p className="text-white/60 mb-8 max-w-[280px]">
          Sign in to access your safe, anonymous space for healing and community.
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="tracking-wide">Continue with Google</span>
          
          {/* Subtle hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-aqua/20 to-silver/20 opacity-0 group-hover:opacity-100 transition-opacity blur" />
        </button>

        <div className="mt-8 text-xs text-white/40">
          We ensure your identity remains 100% anonymous.
        </div>
      </div>
    </div>
  );
}
