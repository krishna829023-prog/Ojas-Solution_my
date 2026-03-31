"use client";

import { motion } from "framer-motion";
import { Github, Twitter, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden text-white w-full pb-24 md:pb-0">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-aqua/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pure-white/20 rounded-full blur-[120px] animate-float" />
      
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-aqua/30 bg-aqua/10 text-aqua mb-8 font-medium">
            <span className="w-2 h-2 rounded-full bg-aqua animate-ping" />
            Made with Purpose
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.2] md:leading-[1.1] mb-6 pt-4 sm:pt-0 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Designing <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aqua via-aqua-light to-silver italic pr-2">
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
            className="md:col-span-2 glass-card p-8 md:p-12 relative overflow-hidden group hover:border-aqua/30 transition-colors duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-aqua/10 rounded-full blur-[60px] group-hover:bg-aqua/20 transition-all duration-700 pointer-events-none" />
            <h3 className="text-3xl font-bold mb-4">The Problem.</h3>
            <p className="text-text-secondary text-lg leading-relaxed max-w-lg mb-8">
              Millions are trapped by porn addiction and pill misuse, yet the stigma around "Gupta Rog" prevents them from seeking help. The modern internet offers no true safe harbors.
            </p>
            <div className="flex flex-col gap-5">
              <div className="border border-border/50 rounded-lg p-5 bg-white/5">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-text-secondary font-medium uppercase tracking-widest">Addiction Rate (13-25)</span>
                  <span className="text-3xl font-black text-aqua">70%+</span>
                </div>
                <div className="w-full h-3 bg-obsidian rounded-full overflow-hidden border border-white/5">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-aqua rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              <div className="border border-border/50 rounded-lg p-5 bg-white/5">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-text-secondary font-medium uppercase tracking-widest">Global Rank</span>
                  <span className="text-3xl font-black text-alert-white">Top 3</span>
                </div>
                <div className="flex gap-2 h-3">
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex-1 bg-alert-white rounded-full overflow-hidden relative"><div className="absolute inset-0 bg-white/20 animate-pulse"/></motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex-1 bg-alert-white/80 rounded-full"></motion.div>
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex-1 bg-alert-white/60 rounded-full"></motion.div>
                  <div className="flex-1 bg-obsidian rounded-full border border-white/5"></div>
                  <div className="flex-1 bg-obsidian rounded-full border border-white/5"></div>
                </div>
              </div>
              <a href="https://timesofindia.indiatimes.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-text-muted hover:text-pure-white transition-colors flex items-center gap-1 mt-1 justify-end">
                *Verified Study Report <ArrowRight size={10} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 relative overflow-hidden group hover:border-silver/30 transition-colors duration-500 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-silver/20 rounded-xl flex items-center justify-center">
                  <ShieldAlert className="text-silver" size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-silver/10 border border-silver/30 rounded-full text-silver text-xs font-bold uppercase tracking-wider">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  Verified Privacy
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">DPDP Compliant</h3>
              <p className="text-text-secondary">
                We collect ZERO personal Information. No IP logging, no device fingerprinting. Sessions auto-delete.
              </p>
            </div>
            <Link href="/privacy" className="mt-8 flex items-center gap-2 text-silver font-bold group-hover:gap-3 transition-all">
              Read our Privacy Manifesto <ArrowRight size={16} />
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
              <MapPin size={18} className="text-aqua" /> BSA College of Engineering, Mathura
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Rudransha Gupta", bio: "\"Built to destigmatize the unsaid.\"" },
              { name: "Achal Kumar Sharma", bio: "\"Uncovering the crisis via pure data.\"" },
              { name: "Aman Sharma", bio: "\"Designing spaces where youth feel safe.\"" },
              { name: "Nikhil Kumar", bio: "\"Engineering complete conversational privacy.\"" }
            ].map((member, i) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={i} 
                className="glass-card p-6 text-center group flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-obsidian border border-border/50 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:border-aqua/50 transition-all duration-300">
                  {member.name.charAt(0)}
                </div>
                <h4 className="font-bold text-lg mb-2">{member.name}</h4>
                <p className="text-sm text-aqua/90 italic border-l-2 border-aqua/30 pl-2 text-left w-full">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Helplines CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full glass-card border-aqua/30 bg-gradient-to-r from-aqua/10 to-transparent p-8 md:p-12 mb-32 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Heart className="text-aqua" fill="currentColor" /> Need immediate help?
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
        
        {/* Enter Sanctuary CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full text-center pb-32"
        >
          <Link 
            href="/" 
            className="inline-flex flex-col sm:flex-row items-center justify-center px-8 sm:px-10 py-4 sm:py-5 font-black text-ink-black bg-aqua rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(244,160,36,0.3)] hover:shadow-[0_0_60px_rgba(244,160,36,0.5)] group text-lg sm:text-xl md:text-2xl uppercase tracking-wider"
          >
            Ready to Heal? Enter Sanctuary <ArrowRight size={28} className="sm:ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
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
