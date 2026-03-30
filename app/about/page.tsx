"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-white w-full pb-24 md:pb-0">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-saffron/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-calm-blue/20 rounded-full blur-[120px] animate-float" />
      
      {/* Decorative Dot Matrix layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10 flex flex-col items-center">
        {/* Antigravity-Style Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-saffron/30 bg-saffron/10 text-saffron mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-saffron animate-ping" />
            Made with Purpose
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Designing <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-saffron via-saffron-light to-healing-green italic pr-2">
              Safe Spaces.
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            India's youth faces a silent crisis. We built Ojas Circle to provide complete anonymity, powerful AI guidance, and Ayurvedic wisdom. 
            <strong className="text-white font-medium block mt-2">Zero stigma. Zero data mining.</strong>
          </p>
        </motion.div>

        {/* Feature/Mission Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-card p-8 md:p-12 relative overflow-hidden group hover:border-saffron/30 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-[60px] group-hover:bg-saffron/20 transition-all duration-700 pointer-events-none" />
            <h3 className="text-3xl font-bold mb-4">The Problem.</h3>
            <p className="text-text-secondary text-lg leading-relaxed max-w-lg mb-8">
              Millions are trapped by porn addiction and pill misuse, yet the stigma around "Gupta Rog" prevents them from seeking help. The modern internet offers no true safe harbors.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border/50 rounded-lg p-4 bg-white/5">
                <span className="block text-2xl font-black text-saffron mb-1">70%+</span>
                <span className="text-sm text-text-muted font-medium">Youth (13-25) face addiction</span>
              </div>
              <div className="border border-border/50 rounded-lg p-4 bg-white/5">
                <span className="block text-2xl font-black text-critical-red mb-1">Top 3</span>
                <span className="text-sm text-text-muted font-medium">Global consumption rank</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 relative overflow-hidden group hover:border-healing-green/30 transition-colors duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-healing-green/20 rounded-xl flex items-center justify-center mb-6">
                <ShieldAlert className="text-healing-green" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3">DPDP Compliant</h3>
              <p className="text-text-secondary">
                We collect ZERO personal Information. No IP logging, no device fingerprinting. Sessions auto-delete.
              </p>
            </div>
            <Link href="/" className="mt-8 flex items-center gap-2 text-healing-green font-bold group-hover:gap-3 transition-all">
              Learn more <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full mb-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet Team Dark Horses</h2>
            <p className="text-text-secondary flex items-center justify-center gap-2 text-lg">
              <MapPin size={18} className="text-saffron" /> BSA College of Engineering, Mathura
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Rudransha Gupta", role: "Ideation & Strategy" },
              { name: "Achal Kumar Sharma", role: "Ideation & Research" },
              { name: "Aman Sharma", role: "Design & Dev" },
              { name: "Nikhil Kumar", role: "Design & Dev" }
            ].map((member, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="glass-card p-6 text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-dark-surface border border-border/50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-saffron/50 transition-all duration-300">
                  {member.name.charAt(0)}
                </div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Helplines CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full glass-card border-saffron/30 bg-gradient-to-r from-saffron/10 to-transparent p-8 md:p-12 mb-32 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Heart className="text-saffron" fill="currentColor" /> Need immediate help?
            </h2>
            <p className="text-text-secondary max-w-md">Our crisis detection AI works 24/7, but you can always reach out directly.</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="tel:14416" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold flex items-center justify-center gap-3 transition-colors">
              📞 Tele-MANAS (14416)
            </a>
            <a href="tel:9152987821" className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold flex items-center justify-center gap-3 transition-colors">
              💬 iCALL (9152987821)
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// Inline fallback for ShieldAlert
function ShieldAlert(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-3 4-3 1.25.98 3.5 3 6.5 3a1 1 0 0 1 1 1z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}
