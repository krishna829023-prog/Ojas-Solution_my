"use client";

import { Menu, Bell, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Simple title mapper
  const getPageTitle = () => {
    const path = pathname === "/" ? "Home" : pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="absolute top-0 w-full z-40 glass border-b border-border/50 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} className="text-white" />
        </button>
        <h1 className="font-bold text-lg md:text-xl text-white tracking-wide">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {session ? (
          <>
            <button className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border/50 hover:bg-aqua/10 text-text-secondary hover:text-aqua transition-colors">
              <Bell size={18} />
            </button>
            <Link href="/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-card border border-border/50 hover:bg-aqua/10 text-text-secondary hover:text-aqua transition-colors overflow-hidden">
              {session.user?.image ? (
                <Image src={session.user.image} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
              ) : (
                <UserCircle2 size={20} />
              )}
            </Link>
          </>
        ) : (
          <button 
            onClick={() => signIn('google')}
            className="text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-full transition-colors"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
