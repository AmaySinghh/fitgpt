"use client";

import { useState, useRef, useEffect } from "react";
import { sendMessage, clearChat } from "@/actions/coach";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Trash2, Zap } from "lucide-react";

interface Message {
  id: string;
  role: string;
  content: string;
  createdAt: Date;
}

interface Props {
  initialHistory: Message[];
  usage: { allowed: boolean; used: number; limit: number };
}

export default function CoachChat({ initialHistory, usage }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "USER",
        content: userMessage,
        createdAt: new Date(),
      },
    ]);

    const result = await sendMessage(userMessage);

    if (result?.error) {
      setError(result.error);
    } else if (result?.response) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "ASSISTANT",
          content: result.response,
          createdAt: new Date(),
        },
      ]);
    }

    setLoading(false);
  }

  async function handleClear() {
    await clearChat();
    setMessages([]);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const suggestedQuestions = [
    "What should I eat before a workout?",
    "How much protein do I need daily?",
    "What are the best foods for weight loss?",
    "How do I break a weight loss plateau?",
  ];

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Chat header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" fill="black" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">FitGPT Coach</p>
            <p className="text-zinc-500 text-xs">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-white/20 text-zinc-400 text-xs"
          >
            {usage.used}/{usage.limit === Infinity ? "∞" : usage.limit} messages
          </Badge>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="text-zinc-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <MessageCircle className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold mb-2">
              Your AI nutrition coach
            </h3>
            <p className="text-zinc-400 text-sm max-w-sm mb-6">
              Ask me anything about nutrition, fitness, meal timing, or your
              personal goals.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-left text-sm text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "ASSISTANT" && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 mr-3 mt-1">
                  <Zap className="w-3.5 h-3.5 text-black" fill="black" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "USER"
                    ? "bg-emerald-600 text-white rounded-br-sm"
                    : "bg-zinc-900 border border-white/10 text-zinc-200 rounded-bl-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 mr-3 mt-1">
              <Zap className="w-3.5 h-3.5 text-black" fill="black" />
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-3">
          {error}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your nutrition coach anything..."
          disabled={loading || !usage.allowed}
          rows={1}
          className="flex-1 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500 resize-none min-h-[44px] max-h-32"
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim() || !usage.allowed}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold h-11 px-4 shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-zinc-600 text-xs mt-2 text-center">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
