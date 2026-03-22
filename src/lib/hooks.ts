"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * 모바일 여부를 판별하는 훅 (768px 미만)
 * 차트 높이, 그리드 레이아웃 등 반응형 처리에 사용
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 초기값 설정
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();

    // 리사이즈 대응
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

/**
 * AI 스트리밍 응답 처리 훅
 * AI 튜터 등 긴 응답에 사용 (타이핑 효과)
 */
export function useAIStream() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (url: string, body: object) => {
    setText("");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("AI 응답 생성 실패");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error("스트림을 읽을 수 없습니다");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setText((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setText("");
    setError(null);
  }, []);

  return { text, isLoading, error, generate, reset };
}

/**
 * AI 비스트리밍 응답 처리 훅
 * 퀴즈 해설, 일지 피드백 등 짧은 응답에 사용
 */
export function useAI() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (url: string, body: object) => {
    setResult("");
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("AI 응답 생성 실패");
      const data = await res.json();
      setResult(data.text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult("");
    setError(null);
  }, []);

  return { result, isLoading, error, generate, reset };
}
