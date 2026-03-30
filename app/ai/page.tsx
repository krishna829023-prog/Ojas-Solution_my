"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import { Send, Bot, Loader2, Sparkles, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "model";
  content: string;
};

const renderFormattedText = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-2" />;
    
    const isBullet = line.trim().match(/^[-*•]\s+(.*)/);
    const isNumber = line.trim().match(/^(\d+)\.\s+(.*)/);
    
    let content = line;
    let listType = null;
    
    if (isBullet) { content = isBullet[1]; listType = "bullet"; } 
    else if (isNumber) { content = isNumber[2]; listType = isNumber[1]; }
    
    const formatBold = (str: string) => {
      const parts = str.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, j) => 
        (part.startsWith('**') && part.endsWith('**')) ? 
        <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong> : part
      );
    };

    if (listType === "bullet") {
      return (
        <div key={i} className="flex gap-3 mt-2 mb-2">
          <span className="text-healing-green mt-1"><Sparkles size={14} /></span>
          <span className="text-white/80 leading-relaxed font-light">{formatBold(content)}</span>
        </div>
      );
    } else if (listType) {
      return (
        <div key={i} className="flex gap-3 mt-2 mb-2">
          <span className="text-calm-blue font-bold">{listType}.</span>
          <span className="text-white/80 leading-relaxed font-light">{formatBold(content)}</span>
        </div>
      );
    }
    return <p key={i} className="mb-2 text-white/80 leading-relaxed font-light whitespace-pre-wrap">{formatBold(line)}</p>;
  });
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Namaste. I am Ojas AI. Kya chal raha hai dimaag mein? Your secrets are completely safe with me." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const chatRef = useRef<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { initChat("AIzaSyAovFOdFQgcYflFcD4fjJL2CzOE2zDVSPA"); }, []);

  useEffect(() => {
    if (!isInitialState) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const initChat = (key: string) => {
    try {
      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      chatRef.current = model.startChat({
        history: [
          { role: "user", parts: [{ text: "System Context: You are OjasCircle AI, a friendly wellness chatbot for Indian youth.\n\nBEHAVIOR RULES:\n- For general chat ('hi', 'how are you', 'tell me a joke'): Respond normally, warmly, and concisely in friendly Hinglish. DO NOT use medical disclaimers or heavy warnings.\n- For ANY medical, mental, sexual, or women's health issue ('Gupta Rog', addiction, PCOD, period cramps, physical problems): You MUST immediately switch to a blunt, no-nonsense health educator and follow this STRICT PROTOCOL:\n  1. START WITH EMPATHY: Provide a highly UNIQUE, varied empathetic opening in Hinglish. NEVER use the exact repetitive phrase 'Bilkul normal baat hai, tu akela nahi hai'. Be creative and comforting.\n  2. DOCTOR DISCLAIMER (MANDATORY): Include 'Main doctor nahi hoon. Yeh sirf educational information hai. Koi bhi dawai ya treatment lene se pehle apne doctor se zaroor consult karo.'\n  3. BLUNT WARNINGS: If user mentions Viagra, iPill, or heavy addiction, use strong language ('This is dangerous/heart risks').\n  4. AYURVEDIC GUIDANCE: Suggest safe options (Ashwagandha, Shatavari, Pranayama, Ajwain tea) AFTER the warning.\n  5. SAFETY TRIGGER: If self-harm/depression is mentioned, STOP advice and say: 'Yeh serious hai. Call Tele-MANAS: 14416. Main yahan hoon but professional help zaroori hai.'\n  6. FORMAT: Max 150 words. Use 4-5 bullet points. Mix Hindi + English.\n\nUser: Hello" }] },
          { role: "model", parts: [{ text: "Namaste. I am Ojas AI. Kya chal raha hai dimaag mein? Your secrets are completely safe with me." }] },
        ],
      });
    } catch {
      setError("Failed to initialize Gemini AI.");
    }
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || !chatRef.current || isLoading) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: textToSend.trim() }]);
    setIsLoading(true);
    setError("");

    try {
      const result = await chatRef.current.sendMessageStream(textToSend.trim());
      setMessages(prev => [...prev, { role: "model", content: "" }]);
      setIsLoading(false);
      
      let fullResponse = "";
      for await (const chunk of result.stream) {
        fullResponse += chunk.text();
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fullResponse;
          return newMsgs;
        });
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || "An error occurred safely connecting to the AI.");
    }
  };

  const isInitialState = messages.length === 1;
  const suggestedQueries = [
    "What are natural Ayurvedic remedies for severe period cramps?",
    "How do I manage performance anxiety safely?",
    "How to maintain hormonal balance during PCOD?",
    "How to handle strong urges during NoFap recovery?"
  ];

  return (
    <div className="flex flex-col h-full min-h-[85vh] w-full relative bg-deep-navy overflow-hidden">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-calm-blue/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-saffron/5 rounded-full blur-[150px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col relative z-10 px-4 md:px-8 mt-4 pb-32">
        
        {/* Header Alert */}
        <div className="mb-6 mx-auto inline-flex items-center gap-2 px-4 py-2 bg-warning-red/10 border border-warning-red/20 rounded-full text-xs font-medium text-warning-red shadow-sm backdrop-blur-md">
           <AlertTriangle size={14} />
           Ojas AI is educational. For clinical distress, call 14416.
        </div>

        {/* Scrollable Thread */}
        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col gap-8 pb-10 scroll-smooth pt-4">
          
          {isInitialState && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center text-center mt-auto mb-16 h-[60vh] md:h-[50vh]"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-calm-blue/30 to-calm-blue/5 border border-calm-blue/40 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(108,122,224,0.15)] relative group">
                 <div className="absolute inset-0 bg-calm-blue/20 blur-xl rounded-3xl group-hover:bg-calm-blue/40 transition-colors" />
                 <Bot size={40} className="text-calm-blue relative z-10 drop-shadow-[0_0_8px_rgba(108,122,224,0.8)]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">How can I help you <span className="text-calm-blue">heal</span> today?</h1>
              <p className="text-text-secondary text-lg font-light max-w-lg mb-12">I am Ojas AI, your secure sanctuary for mental and physical wellness. Everything you say is private.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4">
                 {suggestedQueries.map((q, i) => (
                   <motion.button 
                     key={i}
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }}
                     onClick={() => { setInput(q); handleSend(q); }}
                     className="text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-calm-blue/40 hover:bg-white/10 transition-all text-sm font-medium text-text-secondary hover:text-white"
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
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex gap-4 sm:gap-6 w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "model" && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-calm-blue/20 flex items-center justify-center mt-1 border border-calm-blue/30 shadow-[0_0_15px_rgba(108,122,224,0.2)]">
                      <Bot size={16} className="text-calm-blue" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] md:max-w-[75%] ${
                    msg.role === "user"
                      ? "px-6 py-4 rounded-3xl rounded-tr-md bg-gradient-to-br from-saffron/20 to-saffron/10 text-white border border-saffron/30 shadow-[0_8px_32px_rgba(244,160,36,0.1)] backdrop-blur-md"
                      : "text-white/90"
                  }`}>
                    {msg.role === "model" ? (
                       <div className="prose prose-invert prose-p:leading-relaxed prose-p:font-light prose-strong:text-white max-w-none">
                         {renderFormattedText(msg.content)}
                       </div>
                    ) : (
                      <p className="text-[16px] font-medium leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {isLoading && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-4 w-full">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-calm-blue/20 flex items-center justify-center mt-1 border border-calm-blue/30 shadow-[0_0_10px_rgba(108,122,224,0.2)]">
                    <Bot size={16} className="text-calm-blue animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1.5 h-10 px-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-calm-blue/60 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-calm-blue/60 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-calm-blue/60 animate-bounce [animation-delay:0.4s]" />
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 pt-24 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-transparent z-20 flex justify-center pointer-events-none">
        <div className="w-full max-w-3xl relative pointer-events-auto">
          {error && <p className="absolute -top-10 left-4 text-warning-red text-xs font-bold bg-warning-red/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-warning-red/20 flex items-center gap-2"><AlertTriangle size={14} /> {error}</p>}
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-calm-blue/20 to-saffron/20 rounded-[32px] blur-xl opacity-30 group-focus-within:opacity-80 transition duration-500" />
            <div className="relative flex items-end gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 shadow-2xl transition-all group-focus-within:border-white/20">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                }}
                rows={1}
                placeholder="Message Ojas AI..."
                className="flex-1 bg-transparent border-none text-white px-4 py-3 min-h-[50px] max-h-[180px] resize-none focus:outline-none placeholder:text-text-muted text-[16px] leading-relaxed scrollbar-hide mb-1 overflow-y-auto"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="shrink-0 w-12 h-12 mb-1 mr-1 rounded-2xl bg-white hover:bg-neutral-200 text-deep-navy flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-white shadow-sm"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-text-muted mt-4 tracking-wide">Responses are AI-generated. Consult a real doctor for medical emergencies.</p>
        </div>
      </div>
    </div>
  );
}
