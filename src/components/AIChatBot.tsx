"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Maximize2, Minimize2, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Hi — I’m an AI assistant that can answer questions about Albin, his projects, skills, and experience.

Try asking:
- What technologies does Albin use?
- What projects has he worked on?
- How can I contact him?`,
};

export default function AIChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, isFullscreen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Client ChatBot Error:", err);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry — something went wrong while generating a response. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-3 text-sm font-medium text-[var(--background)] shadow-lg transition-all hover:-translate-y-0.5 hover:opacity-95 ${
          !isOpen ? "animate-bounce-twice-wait" : ""
        }`}
        title="Ask the AI about Albin"
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Ask AlbinBot</span>
      </button>

      {isOpen && (
        <div
          className={`fixed z-[60] ${
            isFullscreen
              ? "inset-0 bg-black/40 p-4"
              : "bottom-20 right-6"
          }`}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AI chat about Albin"
            className={`flex flex-col overflow-hidden border border-black/10 bg-[var(--background)] shadow-2xl dark:border-white/10 ${
              isFullscreen
                ? "mx-auto h-[90vh] w-full max-w-2xl rounded-2xl"
                : "h-[580px] w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl"
            }`}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 dark:border-white/10">
              <div>
                <h2 className="text-sm font-semibold text-[var(--foreground)] sm:text-base">
                  Ask about Albin
                </h2>
                <p className="text-xs text-[var(--foreground)]/55">
                  Projects, skills, background, and contact info
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsFullscreen((prev) => !prev)}
                  title={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Go fullscreen"}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--foreground)]/70 transition hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10"
                >
                  {isFullscreen ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--foreground)]/70 transition hover:bg-black/5 hover:text-[var(--foreground)] dark:hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "ml-auto bg-[var(--foreground)] text-[var(--background)]"
                      : "border border-black/10 bg-black/[0.02] text-[var(--foreground)] dark:border-white/10 dark:bg-white/[0.03]"
                  }`}
                >
                  <div className="markdown">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="max-w-[88%] rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-3 text-sm text-[var(--foreground)]/60 dark:border-white/10 dark:bg-white/[0.03]">
                  Thinking...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-black/10 px-4 py-3 dark:border-white/10"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Albin..."
                  rows={1}
                  disabled={loading}
                  className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--foreground)]/40 focus:border-[var(--foreground)]/25 dark:border-white/10"
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <p className="mt-2 text-xs text-[var(--foreground)]/45">
                Press Enter to send, Shift+Enter for a new line.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}