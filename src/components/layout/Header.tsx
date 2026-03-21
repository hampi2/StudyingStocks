"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, BookOpen, TrendingUp, BarChart3, Gamepad2, Wallet, FileText, Sparkles, PenLine, User, Heart, Layers, Flag, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

// 네비게이션 메뉴 항목
const navItems = [
  { href: "/courses", label: "학습 코스", icon: BookOpen },
  { href: "/chart", label: "차트 뷰어", icon: BarChart3 },
  { href: "/technical", label: "기술적 분석", icon: TrendingUp },
  { href: "/pattern-game", label: "패턴 게임", icon: Gamepad2 },
  { href: "/trading", label: "모의투자", icon: Wallet },
  { href: "/fundamental", label: "기본적 분석", icon: FileText },
  { href: "/etf", label: "ETF 학습", icon: Layers },
  { href: "/sentiment", label: "시장 심리", icon: Heart },
  { href: "/journal", label: "투자 일지", icon: PenLine },
  { href: "/vocabulary", label: "나의 단어장", icon: BookMarked },
  { href: "/marathon", label: "학습 마라톤", icon: Flag },
  { href: "/recommend", label: "학습 추천", icon: Sparkles },
  { href: "/glossary", label: "용어 사전", icon: BookOpen },
  { href: "/quiz", label: "퀴즈", icon: TrendingUp },
  { href: "/profile", label: "프로필", icon: User },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">StudyingStocks</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* 다크모드 토글 */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="테마 변경"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* 모바일 메뉴 */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="text-lg font-bold mb-4">메뉴</SheetTitle>
              <nav className="flex flex-col gap-4 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
