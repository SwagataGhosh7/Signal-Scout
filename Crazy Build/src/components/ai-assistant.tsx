import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Zap,
  Radar,
  ArrowRight,
  TrendingUp,
  Brain
} from "lucide-react";
import { toast } from "sonner";
import { TiltCard } from "@/components/depth-system";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Hello! I am your Signal Scout Co-Pilot. I watch over targets, score lead intent levels, and draft outreach scripts. What can I check for you today?" },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Append user query
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setInput("");

    // Simulate agent response
    setTimeout(() => {
      let response = "I'm checking the signal databases for that now. Let me know if you want me to queue a HubSpot sync.";
      const q = query.toLowerCase();

      if (q.includes("buying") || q.includes("intent")) {
        response = "I have detected 3 companies with HIGH Buying Intent: Vercel ($40M Series C funding), Supabase (hiring sales engineers), and Stripe (integrating OpenAI models). I suggest drafting an Executive Outreach script for Vercel immediately.";
      } else if (q.includes("hiring")) {
        response = "Supabase has posted 4 new positions for 'Sales Engineer' and 'Enterprise Solutions Architect' on LinkedIn. This indicates strong hiring intent and structural scaling. Would you like me to draft an outreach note targeting their Head of Sales?";
      } else if (q.includes("outreach") || q.includes("email") || q.includes("script")) {
        response = "Sure, I have already prepared email templates in the 'Outreach' page. I recommend using the 'Friendly' tone when pitching startups or 'Executive' tone for Series C entities.";
      } else if (q.includes("summary") || q.includes("scans") || q.includes("today")) {
        response = "Signal Scout agents completed 14 target scans today. They harvested 8 new signals (4 hiring, 2 buying, 2 product updates). Average opportunity score calculated: 78%.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }, 1000);
  };

  const suggestions = [
    "Identify companies with buying intent",
    "List today's hiring signals",
    "What is the best time to email Vercel?",
  ];

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Trigger Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="depth-float flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition duration-200 glow"
          title="Open AI Co-Pilot"
        >
          <Sparkles className="h-5 w-5 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <TiltCard intensity="showcase" className="w-80 sm:w-96 h-[450px] rounded-2xl overflow-hidden flex flex-col justify-between">
          {/* Header */}
          <div className="bg-primary/10 border-b border-border/40 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary font-semibold text-xs">
              <Sparkles className="h-4 w-4 animate-bounce" />
              <span>Signal Scout Co-Pilot</span>
              <span className="h-1.5 w-1.5 rounded-full bg-success pulse-dot" />
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 text-xs leading-normal max-w-[80%] text-left ${
                    m.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && (
            <div className="px-4 py-1 flex flex-col gap-1.5 items-start">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s)}
                  className="rounded-full border border-border bg-background hover:bg-accent px-3 py-1 text-[10px] text-muted-foreground text-left max-w-full truncate"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-border/50 px-3 py-2 flex items-center gap-2 bg-background/50"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about target signals, intent, CRM..."
              className="flex-1 bg-transparent text-xs text-foreground outline-none py-1 placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded bg-primary p-1.5 text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
            </button>
          </form>
        </TiltCard>
      )}
    </div>
  );
}
