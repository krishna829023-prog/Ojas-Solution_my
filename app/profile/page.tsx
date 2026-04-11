"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {session?.user?.image && (
        <Image 
          src={session.user.image} 
          alt="Profile" 
          width={100} 
          height={100} 
          className="rounded-full mb-6 border-4 border-amber-500/30"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">Welcome{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
      <p className="text-white/60 mb-8">{session?.user?.email}</p>
      
      <button 
        onClick={() => signOut({ callbackUrl: '/' })}
        className="px-6 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/30 font-semibold rounded-lg transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
