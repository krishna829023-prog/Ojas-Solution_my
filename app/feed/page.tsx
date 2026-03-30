"use client";

import { useState } from "react";
import { PostComposer } from "@/components/feed/post-composer";
import { PostItem, Post } from "@/components/feed/post-item";
import { Flame, Sparkles, Clock, Hash, TrendingUp, ShieldAlert, Award, ArrowRight, Search, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

const feedTabs = [
  { id: "trending", label: "Trending", icon: Flame },
  { id: "new", label: "New Space", icon: Clock },
  { id: "ai-picks", label: "Ojas AI Picks", icon: Sparkles },
];

const mockPosts: Post[] = [
  {
    id: "1",
    author: { name: "CalmTiger_88", avatar: "🦁" },
    content: "Porn se depression ho raha hai. 3 saal se try kar raha hu chhodni. Koi genuine help?",
    timeAgo: "2h ago",
    tag: "Addiction",
    upvotes: 42,
    comments: 4,
    aiSummary: {
      level: "warning",
      insight: "Porn addiction linked to dopamine desensitization → depression is common.",
      ayurvedic: [
        "Ashwagandha (300mg twice daily)",
        "Pranayama: Anulom Vilom 15 min/morning",
        "Brahmacharya practice: Cold water therapy"
      ],
      medical: "If depression persists 2+ weeks, consult a professional.",
      sources: "Charaka Samhita, NIMHANS study"
    },
    replies: [
      { id: "c1", author: "BraveMonk_41", avatar: "🛡️", content: "Stay strong brother. The first 14 days are the hardest. Try replacing that habit with a 10-minute walk outside or 20 pushups.", timeAgo: "1h ago" },
      { id: "c2", author: "HealingTree_99", avatar: "🌳", content: "Ashwagandha definitely helped me sleep better during my early recovery days. Make sure you don't take it on an empty stomach.", timeAgo: "45m ago" },
      { id: "c3", author: "ZenMaster_01", avatar: "🧘", content: "It's all about triggers. What time do you usually relapse? Change your routine at that exact hour. Delete those apps temporarily.", timeAgo: "20m ago" },
      { id: "c4", author: "CalmTiger_88", avatar: "🦁", content: "Usually late at night when I'm alone in my room. Going to try keeping my phone charging outside the room tonight.", timeAgo: "5m ago" }
    ]
  },
  {
    id: "3",
    author: { name: "BraveMonk_41", avatar: "🛡️" },
    content: "Day 30 of my NoFap challenge completed! 🎉 First 2 weeks were brutal but now my mind is so clear. Cold showers and early morning jogs saved me.",
    timeAgo: "12h ago",
    tag: "Self-Improvement",
    upvotes: 312,
    comments: 3,
    replies: [
      { id: "c5", author: "SilentTiger_29", avatar: "🐯", content: "Huge motivation! I relapsed on day 12 but I am starting again today. Need this kind of clarity.", timeAgo: "10h ago" },
      { id: "c6", author: "Seeker_77", avatar: "🚶", content: "Did you experience a flatline? I'm on day 18 and feeling zero energy and no motivation. Is this normal?", timeAgo: "8h ago" },
      { id: "c7", author: "BraveMonk_41", avatar: "🛡️", content: "Yes! Flatlines hit hard around week 2-3. It's just your brain re-wiring its dopamine receptors. Push through, the energy returns 10x stronger by week 4.", timeAgo: "2h ago" }
    ]
  },
  {
    id: "4",
    author: { name: "Moonlight_99", avatar: "🌙" },
    content: "My period cramps are unbearable this month and PCOD makes everything so irregular. Pls suggest some natural pain relief that actually works?",
    timeAgo: "3h ago",
    tag: "Women's Health",
    upvotes: 89,
    comments: 4,
    aiSummary: {
      level: "info",
      ayurvedic: [
        "Shatavari (balances hormones)",
        "Warm ginger and carom seeds (Ajwain) tea for cramps",
        "Gentle Baddha Konasana (Butterfly pose)"
      ],
      medical: "If pain is extremely severe, consult a gynecologist for endometriosis/PCOS evaluation.",
      sources: "Ayurvedic Pharmacopoeia"
    },
    replies: [
      { id: "c8", author: "LotusHealer_22", avatar: "🪷", content: "Ajwain tea with a bit of ginger and jaggery always helps my cramps instantly! Hot water bag is an absolute must.", timeAgo: "2h ago" },
      { id: "c9", author: "DocAnon_33", avatar: "🩺", content: "If you have diagnosed PCOD, managing periods requires serious lifestyle changes alongside diet. Try to reduce dairy and refined sugar entirely during your cycle.", timeAgo: "1h ago" },
      { id: "c10", author: "Moonlight_99", avatar: "🌙", content: "Thank you guys 😭 Will try the Ajwain tea right now. The pain is just so exhausting today.", timeAgo: "30m ago" },
      { id: "c11", author: "SafeSpace_1", avatar: "🤍", content: "Sending hugs. PCOD is a constant hidden battle. Remember to be gentle with your body today and just rest.", timeAgo: "15m ago" }
    ]
  }
];

const trendingTags = [
  { tag: "NoFap Journey", count: "89" },
  { tag: "Ayurvedic Remedies", count: "45" },
  { tag: "PCOD & Women's Health", count: "34" },
  { tag: "Anxiety Help", count: "28" },
  { tag: "Meditation", count: "12" }
];

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("trending");
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleAddPost = (content: string, tag: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: { name: "BraveMonk_4421", avatar: "🛡️" }, 
      content,
      tag,
      timeAgo: "Just now",
      upvotes: 0,
      comments: 0,
      replies: []
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        
        {/* LEFT COLUMN: Main Feed */}
        <div className="flex-1 w-full lg:max-w-3xl xl:max-w-4xl">
          
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <h1 className="text-3xl font-black tracking-tight text-white hidden xl:block">Sanctuary</h1>
             <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide flex-1 sm:justify-end w-full">
               
               {/* Search Bar for Tags */}
               <div className="relative shrink-0 hidden sm:block">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Search size={14} className="text-text-muted" />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search topics or #tags..." 
                   className="w-48 lg:w-64 bg-dark-surface/80 border border-border/50 text-sm text-white rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-calm-blue/50 transition-colors placeholder:text-text-muted/50"
                 />
               </div>

               {/* Dynamic Tabs */}
               <div className="flex items-center gap-1 bg-dark-surface/50 p-1 rounded-full border border-border/50 shrink-0">
                 {feedTabs.map((tab) => {
                   const Icon = tab.icon;
                   const isActive = activeTab === tab.id;
                   return (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={`shrink-0 flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                         isActive
                           ? "bg-saffron text-deep-navy shadow-[0_0_15px_rgba(244,160,36,0.3)]"
                           : "text-text-secondary hover:text-white hover:bg-white/5"
                       }`}
                     >
                       <Icon size={16} />
                       {tab.label}
                     </button>
                   );
                 })}
               </div>
             </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <PostComposer onPost={handleAddPost} />
          </motion.div>

          <div className="space-y-6">
            {posts.map((post, i) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <PostItem post={post} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Widgets */}
        <div className="hidden lg:flex flex-col w-80 shrink-0 space-y-6 sticky top-24">
          
          {/* Daily Streak Mini-Widget */}
          <div className="glass-card p-6 border-saffron/30 bg-gradient-to-b from-saffron/5 to-transparent">
             <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                 <Award className="text-saffron" size={20} />
               </div>
               <div>
                  <h3 className="text-sm text-text-muted font-bold tracking-wider uppercase">My Streak</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">45</span>
                    <span className="text-saffron font-bold">Days 🔥</span>
                  </div>
               </div>
             </div>
             <p className="text-xs text-text-secondary mt-2">You are in the top 5% of active healers this month! Keep going.</p>
          </div>

          {/* Trending Topics */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="text-calm-blue" size={20} /> Today's Discussions
            </h3>
            <div className="space-y-4">
              {trendingTags.map((t, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <span className="text-sm font-bold text-text-secondary group-hover:text-calm-blue transition-colors block">#{t.tag}</span>
                    <span className="text-xs text-text-muted">{t.count} posts</span>
                  </div>
                  <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-calm-blue transition-all" />
                </div>
              ))}
            </div>
          </div>

          {/* Safe Space Rules */}
          <div className="glass-card p-5 border-healing-green/20 bg-healing-green/5">
            <h3 className="text-sm font-bold text-healing-green mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ShieldAlert size={16} /> Community Rules
            </h3>
            <ul className="text-xs text-text-secondary space-y-2">
              <li className="flex gap-2"><span>1.</span> <span className="flex-1">Zero judgment. We are all healing.</span></li>
              <li className="flex gap-2"><span>2.</span> <span className="flex-1">Never share personally identifiable info.</span></li>
              <li className="flex gap-2"><span>3.</span> <span className="flex-1">Trust Ojas AI, but verify with real doctors.</span></li>
            </ul>
          </div>
          
          <div className="text-center text-xs text-text-muted pt-4 pb-8">
            <p>Ojas Circle © 2026</p>
            <p className="mt-1 flex justify-center gap-3">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </p>
          </div>

        </div>

      </div>

      {/* Sticky Medical Disclaimer Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface/95 backdrop-blur-xl border-t border-white/5 py-2.5 px-4 sm:px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 w-full animate-fade-in-up">
        <Stethoscope className="text-calm-blue shrink-0 hidden sm:block" size={16} />
        <p className="text-[10px] sm:text-[11px] text-text-secondary text-center max-w-4xl leading-snug">
           <strong className="text-white uppercase tracking-wider">Disclaimer:</strong> Ojas AI provides educational insights based on traditional Ayurvedic texts and broad psychological frameworks. <strong className="text-saffron">It is not a replacement for professional medical diagnosis or immediate crisis intervention.</strong>
        </p>
      </div>

    </div>
  );
}
