"use client";

import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { UIMessage } from "ai";

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
          <span className="text-silver mt-1"><Sparkles size={14} /></span>
          <span className="text-white/80 leading-relaxed font-light">{formatBold(content)}</span>
        </div>
      );
    } else if (listType) {
      return (
        <div key={i} className="flex gap-3 mt-2 mb-2">
          <span className="text-pure-white font-bold">{listType}.</span>
          <span className="text-white/80 leading-relaxed font-light">{formatBold(content)}</span>
        </div>
      );
    }
    return <p key={i} className="mb-2 text-white/80 leading-relaxed font-light whitespace-pre-wrap">{formatBold(line)}</p>;
  });
};

interface ChatMessageProps {
  msg: UIMessage;
}

export function ChatMessage({ msg }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-4 sm:gap-6 w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
    >
      {msg.role === "assistant" && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-pure-white/20 flex items-center justify-center mt-1 border border-pure-white/30 shadow-[0_0_15px_rgba(108,122,224,0.2)]">
          <Bot size={16} className="text-pure-white" />
        </div>
      )}

      <div className={`max-w-[85%] md:max-w-[75%] ${
        msg.role === "user"
          ? "px-6 py-4 rounded-3xl rounded-tr-md bg-linear-to-br from-aqua/20 to-aqua/10 text-white border border-aqua/30 shadow-[0_8px_32px_rgba(244,160,36,0.1)] backdrop-blur-md"
          : "text-white/90"
      }`}>
        {msg.role === "assistant" ? (
           <div className="prose prose-invert prose-p:leading-relaxed prose-p:font-light prose-strong:text-white max-w-none">
             {msg.parts.map((part, i) => {
                if (part.type === 'text') {
                   return <div key={i}>{renderFormattedText(part.text)}</div>;
                }
                return null;
             })}
           </div>
        ) : (
          <p className="text-[16px] font-medium leading-relaxed">
             {msg.parts.map((part, i) => {
                if (part.type === 'text') {
                   return <span key={i}>{part.text}</span>;
                }
                return null;
             })}
          </p>
        )}
      </div>
    </motion.div>
  );
}
