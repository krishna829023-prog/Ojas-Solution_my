'use client'

import { useRef } from 'react'

const steps = [
  { number: 1, title: 'Join Anonymously', description: 'Get a random identity instantly. No signup required.', icon: '🎭' },
  { number: 2, title: 'Share Your Question', description: 'Post anything without fear of judgment.', icon: '✏️' },
  { number: 3, title: 'Get AI + Community Help', description: 'Receive instant AI guidance and peer support.', icon: '🤖' },
  { number: 4, title: 'Join Challenges', description: 'Participate in healing challenges with others.', icon: '🏆' },
  { number: 5, title: 'Heal & Grow', description: 'Track your progress and celebrate milestones.', icon: '🌱' },
]

export function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
        <p className="text-muted-foreground">Five simple steps to start your healing journey</p>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible scrollbar-hide"
      >
        {steps.map((step, index) => (
          <div
            key={step.number}
            className="flex-shrink-0 w-64 md:w-auto"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="glass-card p-6 h-full relative overflow-hidden group">
              {/* Step number background */}
              <div className="absolute -top-4 -right-4 text-8xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                {step.number}
              </div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-semibold">
                    {step.number}
                  </span>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
