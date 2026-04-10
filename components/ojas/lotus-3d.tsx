'use client'

import { useEffect, useRef } from 'react'

export function Lotus3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let rotation = 0

    const animate = () => {
      rotation += 0.3
      container.style.transform = `rotateY(${rotation}deg)`
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 perspective-1000">
      {/* Glow effect behind lotus */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
      
      {/* 3D Lotus container */}
      <div
        ref={containerRef}
        className="relative w-full h-full preserve-3d transition-transform duration-100"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Lotus petals - CSS 3D */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `rotateY(${i * 45}deg) translateZ(20px)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24 md:w-32 md:h-32"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(244, 160, 36, 0.5))',
              }}
            >
              <defs>
                <linearGradient id={`petal-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F4A024" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFD180" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F4A024" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path
                d="M50 10 C30 30, 20 60, 50 90 C80 60, 70 30, 50 10"
                fill={`url(#petal-gradient-${i})`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.5"
              />
            </svg>
          </div>
        ))}
        
        {/* Center of lotus */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-aqua-light"
          style={{
            transform: 'translateX(-50%) translateY(-50%) translateZ(30px)',
            boxShadow: '0 0 30px rgba(244, 160, 36, 0.6)',
          }}
        />
      </div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary/60 animate-orb"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}
    </div>
  )
}
