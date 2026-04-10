"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, Users, Award, Bot, User, Info, Phone, X, Lock } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/lib/auth-context";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const PROTECTED_ROUTES = ["/feed", "/community", "/ai", "/profile"];

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  protected: boolean;
}

const primaryItems: NavItem[] = [
  { name: "Home",      path: "/",          icon: Home,          protected: false },
  { name: "Feed",      path: "/feed",       icon: MessageSquare, protected: true  },
  { name: "Rooms",     path: "/community",  icon: Users,         protected: true  },
  { name: "AI",        path: "/ai",         icon: Bot,           protected: true  },
  { name: "Me",        path: "/profile",    icon: User,          protected: true  },
  { name: "About",     path: "/about",      icon: Info,          protected: false },
];

export function Sidebar({
  isOpen,
  setIsOpen,
  isMobile,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isMobile: boolean;
}) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuth();

  const isExpanded = isOpen || (!isMobile && isHovered);

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed md:relative top-0 left-0 h-full bg-background/95 md:bg-transparent md:glass border-r border-border/50 flex flex-col transition-all duration-300 z-50 shrink-0",
          isExpanded ? "w-64 translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
        )}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center border-b border-border/50 shrink-0 px-4 justify-between md:justify-center">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden"
            onClick={() => isMobile && setIsOpen(false)}
          >
            <span className="text-2xl shrink-0 block">🪷</span>
            <span
              className={cn(
                "font-bold text-xl tracking-tight text-white whitespace-nowrap transition-all duration-300",
                !isExpanded && !isMobile ? "opacity-0 w-0 hidden" : "opacity-100 w-auto"
              )}
            >
              Ojas Circle
            </span>
          </Link>

          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-white p-1 rounded-md"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-2 mt-4 flex-1 px-3 md:px-2 w-full overflow-y-auto overflow-x-hidden scrollbar-hide py-2">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.path ||
              (item.path !== "/" && pathname?.startsWith(item.path));
            const isLocked = item.protected && !isAuthenticated;

            const sharedClass = cn(
              "flex items-center py-3 rounded-xl transition-all relative group w-full",
              isExpanded ? "gap-4 px-4" : "justify-center px-0",
              isActive
                ? "bg-obsidian border border-aqua/20 text-aqua shadow-[0_0_15px_rgba(244,160,36,0.1)]"
                : isLocked
                ? "border border-transparent text-white/30 hover:text-white/50 hover:bg-white/5 cursor-pointer"
                : "border border-transparent text-text-secondary hover:text-white hover:bg-white/5"
            );

            if (isLocked) {
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    openAuthModal();
                    if (isMobile) setIsOpen(false);
                  }}
                  className={sharedClass}
                  title={!isExpanded ? item.name : undefined}
                >
                  {/* Icon with lock badge */}
                  <div className="relative shrink-0">
                    <Icon size={22} className="opacity-40" />
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-aqua/20 border border-aqua/40 flex items-center justify-center">
                      <Lock size={7} className="text-aqua/80" />
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-medium whitespace-nowrap transition-all duration-300",
                      !isExpanded && !isMobile ? "opacity-0 w-0 hidden" : "opacity-100"
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Tooltip — collapsed desktop mode */}
                  {!isExpanded && !isMobile && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-obsidian border border-aqua/30 text-aqua text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity flex items-center gap-1.5">
                      <Lock size={9} />
                      {item.name}
                    </div>
                  )}
                </button>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => isMobile && setIsOpen(false)}
                className={sharedClass}
                title={!isExpanded ? item.name : undefined}
              >
                <Icon
                  size={22}
                  className={cn("shrink-0", isActive ? "text-aqua" : "")}
                />
                <span
                  className={cn(
                    "font-medium whitespace-nowrap transition-all duration-300",
                    !isExpanded && !isMobile ? "opacity-0 w-0 hidden" : "opacity-100"
                  )}
                >
                  {item.name}
                </span>

                {/* Tooltip — collapsed desktop mode */}
                {!isExpanded && !isMobile && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-obsidian border border-border/50 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Help (bottom) */}
        <div className="mt-auto pt-4 pb-6 md:pb-4 border-t border-border/50 w-full px-3 md:px-2 shrink-0">
          <Link
            href="/help"
            onClick={() => isMobile && setIsOpen(false)}
            className={cn(
              "flex items-center py-3 rounded-xl transition-colors text-warning-white hover:bg-warning-white/10 group relative",
              isExpanded ? "px-4 gap-4" : "justify-center px-0"
            )}
            title={!isExpanded ? "Help" : undefined}
          >
            <Phone size={22} className="shrink-0" />
            <span
              className={cn(
                "font-medium whitespace-nowrap",
                !isExpanded && !isMobile ? "hidden" : "block"
              )}
            >
              Help
            </span>

            {!isExpanded && !isMobile && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-obsidian border border-warning-white/50 text-warning-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                Help
              </div>
            )}
          </Link>
        </div>
      </aside>
    </>
  );
}
