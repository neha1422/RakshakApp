// src/components/chatbot/ChatWidget.tsx
import React, { useEffect, useState } from "react";
import ChatWindow from "./ChatWindow";
import { MessageCircle } from "lucide-react"; // ✅ Correct icon

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [themeDark, setThemeDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", themeDark ? "dark" : "light");
    } catch {}
  }, [themeDark]);

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window (only when open + expanded) */}
      {open && expanded && (
        <div className="mb-2">
          <ChatWindow onClose={() => setOpen(false)} />
        </div>
      )}

      {/* Floating Buttons */}
      <div className="flex items-center space-x-2">
        {/* Expand/Collapse toggle (visible only when chat open) */}
        {open && (
          <button
            onClick={() => setExpanded((s) => !s)}
            className="px-3 py-2 rounded-lg bg-white/90 dark:bg-slate-800 border shadow hover:scale-[1.02] transition duration-200"
            aria-label="Expand or collapse chat"
          >
            {expanded ? "—" : "☰"}
          </button>
        )}

        {/* Main Chat Toggle */}
        <button
          onClick={() => {
            setOpen((s) => !s);
            setExpanded(true);
          }}
          className="w-14 h-14 rounded-full bg-blue-600 shadow-xl flex items-center justify-center text-white border hover:bg-blue-700 transition duration-300"
          title="Open Rakshak Guide Bot"
        >
          <MessageCircle className="h-6 w-6" /> {/* ✅ Chat Icon */}
        </button>
      </div>
    </div>
  );
}
