// src/components/chatbot/ChatWindow.tsx
import React, { useEffect, useRef, useState } from "react";
import MessageBubble, { From } from "./MessageBubble";
import guidelines from "@/data/ndma-guidelines.json";
import directory from "@/data/emergency-directory.json";
import { Sun, Moon, X } from "lucide-react";

type Lang = "en" | "hi" | "pa";

interface Props {
  onClose: () => void;
  initialLang?: Lang;
}

type Message = { from: From; text: string; ts?: number };

const DISASTERS = [
  "earthquake",
  "fire",
  "flood",
  "industrial",
  "heatwave",
  "coldwave",
  "landslide",
  "pandemic"
];

export default function ChatWindow({ onClose, initialLang = "en" }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<Lang>(initialLang);
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem("theme") === "dark";
    } catch {
      return false;
    }
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const greeting = `👋 Hi buddy! I’m Rakshak Guide Bot.\n\nI can guide you for these disasters:\n• ${DISASTERS.join(
      "\n• "
    )}\n\nChoose a language and theme above, or click a disaster below to get quick help.`;
    setMessages([{ from: "bot", text: greeting, ts: Date.now() }]);
  }, []);

  useEffect(() => {
    try {
      if (dark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch {}
  }, [dark]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } catch {}
    }, 80);
  }, [messages]);

  const pushBot = (text: string) =>
    setMessages((m) => [...m, { from: "bot", text, ts: Date.now() }]);

  const pushUser = (text: string) =>
    setMessages((m) => [...m, { from: "user", text, ts: Date.now() }]);

  const getGuidelines = (disaster: string, langKey: Lang) => {
    try {
      const byDisaster = (guidelines as any)[disaster];
      if (!byDisaster) return [`No guideline found for ${disaster}.`];
      return byDisaster[langKey] || byDisaster["en"] || [`No guideline available in ${langKey}.`];
    } catch {
      return [`No guideline available.`];
    }
  };

  const getContacts = (dis: string) => {
    try {
      const entry = (directory as any)[dis];
      return entry?.contacts?.map((c: any) => `${c.name}: ${c.phone}`) || [];
    } catch {
      return [];
    }
  };

  const handleQuery = (raw: string) => {
    const q = raw.trim().toLowerCase();
    if (!q) return;
    pushUser(raw);

    if (q.includes("hindi") || q.includes(" hi ")) setLang("hi");
    if (q.includes("punjabi") || q.includes(" pa ") || q.includes("punj")) setLang("pa");
    if (q.includes("english") || q.includes(" en ")) setLang("en");

    const found = DISASTERS.find((d) => q.includes(d));
    if (found) {
      const guidelinesArr = getGuidelines(found, lang);
      const includeContacts = q.includes("help") || q.includes("emergency") || q.includes("contacts");
      const lines = [...guidelinesArr];
      if (includeContacts) {
        const contacts = getContacts(found);
        if (contacts.length) {
          lines.push("", "🚨 Emergency Contacts:");
          lines.push(...contacts);
        } else {
          lines.push("", "🚨 No emergency contacts found for this disaster in the directory.");
        }
      }
      pushBot(lines.join("\n\n"));
    } else {
      pushBot(
        `🤔 I didn't understand. Try one of the disaster buttons above, or type "help" + disaster name.`
      );
    }
  };

  const onSend = () => {
    if (!input.trim()) return;
    handleQuery(input);
    setInput("");
  };

  const onQuick = (d: string) => {
    handleQuery(`${d} help`);
  };

  const quickSuggested = [
    "help for fire",
    "flood safety in English",
    "earthquake steps",
    "industrial safety help"
  ];

  const containerStyle: React.CSSProperties = {
    maxHeight: "calc(100vh - 120px)"
  };

  return (
    <div
      className={`w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden border flex flex-col`}
      style={containerStyle}
      aria-label="Rakshak Guide Bot"
    >
      {/* header */}
      <div className={`px-3 py-2 flex items-center justify-between ${dark ? "bg-slate-800 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dark ? "bg-slate-700" : "bg-blue-200"}`}>
            🤖
          </div>
          <div>
            <div className="text-sm font-semibold">Rakshak Guide Bot</div>
            <div className="text-xs opacity-70">Offline NDMA guidelines • Multilingual</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            className="text-sm px-2 py-1 rounded-md border bg-transparent"
            title="Language"
          >
            <option value="en">EN</option>
            <option value="hi">हिंदी</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
          </select>

          <button
            onClick={() => setDark((s) => !s)}
            className="p-1 rounded-md hover:bg-muted/50"
            title="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button onClick={onClose} title="Close" className="p-1 rounded-md hover:bg-muted/50">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
{/* quick buttons & suggested WITH UNDERLAY */}
<div className="relative">
  {/* fully opaque layer: black in dark mode, white in light mode */}
  <div
    className={`absolute inset-0 pointer-events-none rounded-sm ${
      dark ? "bg-black" : "bg-white"
    }`}
  />

  <div
    className="relative px-3 py-2 space-y-2 border-b"
    style={{ borderColor: dark ? "rgba(255,255,255,0.03)" : undefined }}
  >
    <div className="flex gap-2 flex-wrap">
      {DISASTERS.map((d) => (
        <button
          key={d}
          onClick={() => onQuick(d)}
          className={`text-xs px-2 py-1 rounded-full border ${
            dark
              ? "bg-slate-800 border-slate-700"
              : "bg-slate-100 border-slate-200"
          } hover:opacity-90`}
        >
          {d}
        </button>
      ))}
    </div>

    <div className="flex gap-2 mt-1 overflow-x-auto">
      {quickSuggested.map((s) => (
        <button
          key={s}
          onClick={() => handleQuery(s)}
          className={`text-xs px-2 py-1 rounded-md ${
            dark ? "bg-slate-800" : "bg-slate-100"
          } border`}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
</div>


      {/* messages area */}
      <div
        ref={scrollRef}
        className={`flex-1 overflow-auto p-3 space-y-2 ${dark ? "bg-slate-900" : "bg-white"}`}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {messages.map((m, idx) => (
          <MessageBubble key={idx} from={m.from} text={m.text} />
        ))}
      </div>

      {/* input area */}
      <div className={`px-3 py-2 ${dark ? "bg-slate-800" : "bg-slate-50"} border-t`} style={{ borderColor: dark ? "rgba(255,255,255,0.03)" : undefined }}>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            className="flex-1 rounded-full px-3 py-2 border bg-transparent text-sm"
            aria-label="Type your question"
          />
          <button onClick={onSend} className="px-3 py-2 rounded-full bg-primary text-white">
            Send
          </button>
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Example: <em>"flood in Hindi"</em> or <em>"help" + disaster name</em>
        </div>
      </div>
    </div>
  );
}
