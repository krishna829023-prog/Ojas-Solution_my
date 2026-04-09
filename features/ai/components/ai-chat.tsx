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
  const { messages, status, error, sendMessage } = useChat({
    messages: [INITIAL_MESSAGE],
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

  return (
    <div className="flex flex-col h-full min-h-[85vh] w-full relative bg-ink-black overflow-hidden">

      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-125 h-125 bg-pure-white/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-150 h-150 bg-aqua/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 w-full relative z-10 overflow-y-auto scroll-smooth">
        <div className="w-full max-w-4xl mx-auto flex flex-col px-4 md:px-8 mt-4 pb-32">

          {/* Header Alert */}
          <div className="mb-6 mx-auto inline-flex items-center gap-2 px-4 py-2 bg-warning-white/10 border border-warning-white/20 rounded-full text-xs font-medium text-warning-white shadow-sm backdrop-blur-md">
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
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">How can I help you <span className="text-pure-white">heal</span> today?</h1>
              <p className="text-text-secondary text-lg font-light max-w-lg mb-12">I am Ojas AI, your secure sanctuary for mental and physical wellness. Everything you say is private.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4">
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
