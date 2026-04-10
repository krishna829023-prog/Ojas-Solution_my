"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { AuthModal } from "@/components/auth/auth-modal";
import { useAuth } from "@/lib/auth-context";

const PROTECTED_ROUTES = ["/feed", "/community", "/ai", "/profile"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    route => pathname === route || pathname.startsWith(route + "/")
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isAuthenticated, isAuthLoaded, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Route guard: redirect to home + open auth modal if accessing protected route without auth
  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated && isProtectedRoute(pathname)) {
      router.replace("/");
      openAuthModal();
    }
  }, [isAuthLoaded, isAuthenticated, pathname, router, openAuthModal]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden relative">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />

        <main className="flex-1 overflow-y-auto w-full relative scrollbar-hide">
          <div className="w-full h-full pb-4">
            {children}
          </div>
        </main>
      </div>

      {/* Global Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
}
