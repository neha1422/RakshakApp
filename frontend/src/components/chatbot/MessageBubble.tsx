// src/components/chatbot/MessageBubble.tsx
import React from "react";

export type From = "bot" | "user";

interface Props {
  from: From;
  text: string;
}

export default function MessageBubble({ from, text }: Props) {
  const isBot = from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[78%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-snug shadow-sm
          ${isBot ? "bg-slate-100 text-slate-900" : "bg-primary text-white"} 
          `}
        // attempt to match your theme token names (shadcn)
      >
        {text}
      </div>
    </div>
  );
}
