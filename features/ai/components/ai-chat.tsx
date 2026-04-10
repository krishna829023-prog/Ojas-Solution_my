"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { UIMessage } from "ai";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

const INITIAL_MESSAGE: UIMessage = {
  id: "initial-greeting",
  role: "assistant",
  parts: [{ type: "text", text: "Namaste. I am Ojas AI. Kya chal raha hai dimaag mein? Your secrets are completely safe with me." }],
};

export function AiChat() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("advisor");
  const { messages, status, error, sendMessage } = useChat({
    messages: [INITIAL_MESSAGE],
    body: { mode }
  });
  
  const isLoading = status === "streaming" || status === "submitted";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormSubmit = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const isInitialState = messages.length === 1;
  const suggestedQueries = [
    "What are natural Ayurvedic remedies for severe period cramps?",
    "How do I manage performance anxiety safely?",
    "How to maintain hormonal balance during PCOD?",
    "How to handle strong urges during NoFap recovery?"
  ];

  const getGlowColors = () => {
    if (mode === "doctor") return "bg-blue-600/20";
    if (mode === "specialist") return "bg-purple-600/20";
    return "bg-emerald-600/20";
  };

  const getSecondaryGlow = () => {
    if (mode === "doctor") return "bg-cyan-500/10";
    if (mode === "specialist") return "bg-fuchsia-500/10";
    return "bg-teal-500/10";
  };

  const getPageBackground = () => {
    if (mode === "doctor") return "bg-blue-950/30";
    if (mode === "specialist") return "bg-purple-950/30";
    return "bg-emerald-950/30";
  };

  return (
    <div className="flex flex-col h-full min-h-[85vh] w-full relative bg-ink-black overflow-hidden transition-colors duration-1000">

      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0 transition-colors duration-1000">
        <div className={`absolute inset-0 transition-colors duration-1000 mix-blend-overlay ${getPageBackground()}`} />
        <div className={`absolute top-[10%] left-[20%] w-125 h-125 rounded-full blur-[140px] animate-pulse-glow transition-colors duration-700 ${getGlowColors()}`} />
        <div className={`absolute bottom-[20%] right-[10%] w-150 h-150 rounded-full blur-[150px] animate-float transition-colors duration-700 ${getSecondaryGlow()}`} style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 w-full relative z-10 overflow-y-auto scroll-smooth">
        <div className="w-full max-w-4xl mx-auto flex flex-col px-4 md:px-8 mt-4 pb-32">

          {/* Header Alert */}
          <div className="mb-4 mx-auto inline-flex items-center gap-2 px-4 py-2 bg-warning-white/10 border border-warning-white/20 rounded-full text-xs font-medium text-warning-white shadow-sm backdrop-blur-md">
             <AlertTriangle size={14} />
             Ojas AI is educational. For clinical distress, call 14416.
          </div>

          {/* Scrollable Thread */}
          <div className="flex flex-col gap-8 pb-10 pt-4">

          {isInitialState && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center text-center mt-auto mb-16 h-[60vh] md:h-[50vh]"
            >
              <div className="w-20 h-20 bg-linear-to-br from-pure-white/30 to-pure-white/5 border border-pure-white/40 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(108,122,224,0.15)] relative group">
                 <div className="absolute inset-0 bg-pure-white/20 blur-xl rounded-3xl group-hover:bg-pure-white/40 transition-colors" />
                 <Bot size={40} className="text-pure-white relative z-10 drop-shadow-[0_0_8px_rgba(108,122,224,0.8)]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight relative z-10">How can I help you <span className={mode === "doctor" ? "text-blue-400" : mode === "specialist" ? "text-purple-400" : "text-emerald-400"}>heal</span> today?</h1>
              <p className="text-text-secondary text-lg font-light max-w-lg mb-8 relative z-10">I am Ojas AI, your secure sanctuary for mental and physical wellness. Everything you say is private.</p>

              {/* Mode Selection */}
              <div className="flex justify-center flex-wrap gap-4 mb-12 relative z-20">
                <button 
                  onClick={() => setMode("advisor")} 
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 backdrop-blur-md ${mode === "advisor" ? "bg-gradient-to-r from-emerald-600/40 to-teal-600/40 border-emerald-400/50 text-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"}`}
                >
                  Advisor (Default)
                </button>
                <button 
                  onClick={() => setMode("doctor")} 
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 backdrop-blur-md ${mode === "doctor" ? "bg-gradient-to-r from-blue-600/40 to-cyan-600/40 border-blue-400/50 text-blue-50 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"}`}
                >
                  Doctor
                </button>
                <button 
                  onClick={() => setMode("specialist")} 
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 backdrop-blur-md ${mode === "specialist" ? "bg-gradient-to-r from-purple-600/40 to-fuchsia-600/40 border-purple-400/50 text-purple-50 shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105" : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"}`}
                >
                  Specialist
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4 relative z-10">
                 {suggestedQueries.map((q, i) => (
                   <motion.button
                     key={i}
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                     onClick={() => sendMessage({ text: q })}
                     className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pure-white/40 hover:bg-white/10 transition-all text-sm font-medium text-text-secondary hover:text-white"
                   >
                     {q}
                   </motion.button>
                 ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {!isInitialState && messages.map((msg, i) => {
              if (i === 0) return null; // Skip initial hidden greeting
              return <ChatMessage key={msg.id} msg={msg} />;
            })}

            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 w-full">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-pure-white/20 flex items-center justify-center mt-1 border border-pure-white/30 shadow-[0_0_10px_rgba(108,122,224,0.2)]">
                    <Bot size={16} className="text-pure-white animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 h-10 px-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-pure-white/60 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pure-white/60 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pure-white/60 animate-bounce [animation-delay:0.4s]" />
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        error={error}
        handleSubmit={handleFormSubmit}
      />
    </div>
  );
}
