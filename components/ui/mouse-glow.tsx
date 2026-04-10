"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    if (window.innerWidth >= 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-60 mix-blend-screen"
        animate={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(244,160,36,0.08), transparent 40%)`
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-3 h-3 bg-aqua rounded-full z-[100] mix-blend-screen shadow-[0_0_10px_rgba(244,160,36,0.8)]"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.05 }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-10 h-10 border border-aqua/40 rounded-full z-[99] mix-blend-screen"
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
        transition={{ type: "spring", bounce: 0.15, mass: 0.2, damping: 15 }}
      />
    </>
  );
}
