"use client";

import { Menu, Bell, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useUser } from "@/lib/user-context";

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, currentUsername, logout, openAuthModal } = useAuth();
  const { clearUserSession } = useUser();

  const getPageTitle = () => {
    const path = pathname === "/" ? "Home" : pathname.split("/")[1];
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const handleLogout = () => {
    logout();
    clearUserSession();
    router.push("/");
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
        <h1 className="font-bold text-lg md:text-xl text-white tracking-wide">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {isAuthenticated ? (
          <>
            {/* Bell */}
            <button className="flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border/50 hover:bg-aqua/10 text-text-secondary hover:text-aqua transition-colors">
              <Bell size={17} />
            </button>

            {/* User pill */}
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-aqua/10 hover:border-aqua/20 transition-all group"
            >
              <div className="w-6 h-6 rounded-full bg-aqua/20 border border-aqua/30 flex items-center justify-center text-aqua text-xs font-bold shrink-0 group-hover:bg-aqua/30 transition-colors">
                {currentUsername?.[0]?.toUpperCase() ?? "?"}
              </div>
              <span className="text-xs font-semibold text-white/70 max-w-[80px] truncate group-hover:text-white transition-colors">
                {currentUsername}
              </span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              title="Sign out"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border/50 hover:bg-red-500/10 hover:border-red-500/30 text-text-secondary hover:text-red-400 transition-all"
            >
              <LogOut size={17} />
            </button>
          </>
        ) : (
          /* Login button for unauthenticated users */
          <button
            id="navbar-login-btn"
            onClick={openAuthModal}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-aqua/10 border border-aqua/25 hover:bg-aqua/20 hover:border-aqua/40 text-aqua font-semibold text-sm transition-all hover:shadow-[0_0_15px_rgba(0,180,216,0.2)]"
          >
            <LogIn size={15} />
            <span>Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
