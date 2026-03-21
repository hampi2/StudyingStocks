"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import {
  Sun, Moon, Menu, X, BookOpen, TrendingUp, BarChart3,
  Gamepad2, Wallet, FileText, Sparkles, PenLine, User,
  Heart, Layers, Flag, BookMarked, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

// 전체 네비게이션 항목 (모바일 메뉴용)
const allNavItems = [
  { href: "/courses", label: "학습 코스", icon: BookOpen, group: "학습" },
  { href: "/chart", label: "차트 뷰어", icon: BarChart3, group: "분석" },
  { href: "/technical", label: "기술적 분석", icon: TrendingUp, group: "분석" },
  { href: "/pattern-game", label: "패턴 게임", icon: Gamepad2, group: "실습" },
  { href: "/trading", label: "모의투자", icon: Wallet, group: "실습" },
  { href: "/fundamental", label: "기본적 분석", icon: FileText, group: "분석" },
  { href: "/etf", label: "ETF 학습", icon: Layers, group: "학습" },
  { href: "/sentiment", label: "시장 심리", icon: Heart, group: "분석" },
  { href: "/journal", label: "투자 일지", icon: PenLine, group: "도구" },
  { href: "/vocabulary", label: "나의 단어장", icon: BookMarked, group: "도구" },
  { href: "/marathon", label: "학습 마라톤", icon: Flag, group: "도구" },
  { href: "/recommend", label: "학습 추천", icon: Sparkles, group: "도구" },
  { href: "/glossary", label: "용어 사전", icon: BookOpen, group: "학습" },
  { href: "/quiz", label: "퀴즈", icon: TrendingUp, group: "학습" },
  { href: "/profile", label: "프로필", icon: User, group: "도구" },
];

// 데스크톱 헤더용 그룹화된 드롭다운 메뉴
const navGroups = [
  {
    label: "학습",
    items: [
      { href: "/courses", label: "학습 코스", icon: BookOpen },
      { href: "/etf", label: "ETF 학습", icon: Layers },
      { href: "/glossary", label: "용어 사전", icon: BookOpen },
      { href: "/quiz", label: "퀴즈", icon: TrendingUp },
    ],
  },
  {
    label: "분석",
    items: [
      { href: "/chart", label: "차트 뷰어", icon: BarChart3 },
      { href: "/technical", label: "기술적 분석", icon: TrendingUp },
      { href: "/fundamental", label: "기본적 분석", icon: FileText },
      { href: "/sentiment", label: "시장 심리", icon: Heart },
    ],
  },
  {
    label: "실습",
    items: [
      { href: "/trading", label: "모의투자", icon: Wallet },
      { href: "/pattern-game", label: "패턴 게임", icon: Gamepad2 },
    ],
  },
  {
    label: "도구",
    items: [
      { href: "/journal", label: "투자 일지", icon: PenLine },
      { href: "/vocabulary", label: "나의 단어장", icon: BookMarked },
      { href: "/marathon", label: "학습 마라톤", icon: Flag },
      { href: "/recommend", label: "학습 추천", icon: Sparkles },
    ],
  },
];

/** 데스크톱 드롭다운 메뉴 컴포넌트 */
function NavDropdown({ label, items }: { label: string; items: typeof navGroups[0]["items"] }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 마우스 호버 시 열기 (지연 닫기로 깜빡임 방지)
  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 rounded-lg border bg-popover shadow-lg py-1 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.svg" alt="StudyingStocks" width={28} height={28} className="rounded" />
          <span className="text-lg font-bold">StudyingStocks</span>
        </Link>

        {/* 데스크톱 네비게이션 - 드롭다운 그룹 */}
        <nav className="hidden lg:flex items-center gap-5">
          {navGroups.map((group) => (
            <NavDropdown key={group.label} label={group.label} items={group.items} />
          ))}
          <Link
            href="/profile"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary whitespace-nowrap"
          >
            프로필
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
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

          {/* 모바일/태블릿 메뉴 */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] overflow-y-auto">
              <SheetTitle className="text-lg font-bold mb-2">메뉴</SheetTitle>
              <nav className="flex flex-col gap-1 p-2">
                {/* 그룹별로 표시 */}
                {navGroups.map((group) => (
                  <div key={group.label} className="mb-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
                {/* 프로필 */}
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors border-t pt-3 mt-1"
                >
                  <User className="h-4 w-4 shrink-0" />
                  프로필
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
