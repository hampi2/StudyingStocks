"use client";

import { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAIStream } from "@/lib/hooks";
import { markdownToHtml } from "@/lib/markdown";
import { useChatStore } from "@/lib/store";

// 추천 질문 목록
const suggestedQuestions = [
  "PER이 뭔가요?",
  "이동평균선은 어떻게 활용하나요?",
  "ETF와 개별주식의 차이점은?",
  "RSI 지표를 읽는 방법을 알려주세요",
  "손절매는 언제 해야 하나요?",
  "재무제표에서 가장 중요한 항목은?",
];

export default function AITutorPage() {
  const { messages, addMessage, clearMessages } = useChatStore();
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");
  const { text: streamText, isLoading, error, generate, reset } = useAIStream();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 하이드레이션 불일치 방지 (로컬스토리지 → 클라이언트)
  useEffect(() => setMounted(true), []);

  // 스크롤 자동 하단 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamText]);

  // 메시지 전송 처리
  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    addMessage({ role: "user", content: messageText });
    const updatedMessages = [...messages, { role: "user" as const, content: messageText }];
    setInput("");
    reset();

    // API 호출 (스트리밍)
    await generate("/api/ai/chat", { messages: updatedMessages });
  };

  // 스트리밍 완료 시 assistant 메시지 확정
  useEffect(() => {
    if (!isLoading && streamText && messages.length > 0 && messages[messages.length - 1].role === "user") {
      addMessage({ role: "assistant", content: streamText });
      reset();
    }
  }, [isLoading, streamText, messages, addMessage, reset]);

  // Enter 키로 전송
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 대화 초기화
  const handleReset = () => {
    clearMessages();
    setInput("");
    reset();
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 flex flex-col h-[calc(100vh-8rem)]">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">AI 투자 튜터</h1>
            <p className="text-sm text-muted-foreground">
              주식투자에 대해 무엇이든 물어보세요
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            새 대화
          </Button>
        )}
      </div>

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto rounded-lg border bg-muted/20 p-4 space-y-4">
        {/* 빈 상태 - 추천 질문 */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-1">무엇이 궁금하신가요?</h2>
              <p className="text-sm text-muted-foreground">
                주식투자 관련 질문을 자유롭게 해주세요
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-md">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 text-sm rounded-full border bg-background hover:bg-accent hover:text-foreground transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 대화 메시지 */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "user" ? (
              <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap bg-primary text-primary-foreground">
                {msg.content}
              </div>
            ) : (
              <div
                className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-card border shadow-sm prose-sm"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.content) }}
              />
            )}
          </div>
        ))}

        {/* 스트리밍 중인 응답 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed bg-card border shadow-sm">
              {streamText ? (
                <div
                  className="prose-sm"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(streamText) }}
                />
              ) : (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  생각하는 중...
                </span>
              )}
            </div>
          </div>
        )}

        {/* 에러 메시지 */}
        {error && (
          <div className="flex justify-center">
            <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">
              {error}
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="mt-3 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="질문을 입력하세요..."
          disabled={isLoading}
          className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
        />
        <Button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          size="icon"
          className="shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* 면책 조항 */}
      <p className="text-xs text-muted-foreground text-center mt-2">
        AI 튜터는 교육 목적으로만 제공됩니다. 투자 판단의 책임은 본인에게 있습니다.
      </p>
    </div>
  );
}
