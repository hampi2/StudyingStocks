"use client";

import { useState, useEffect } from "react";

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
