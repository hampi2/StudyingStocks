"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, GraduationCap, Trophy, BarChart3, TrendingUp, Gamepad2, Wallet, FileText, PenLine, Sparkles, User, Heart, Layers, Flag, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";

// 사이드바 메뉴 항목
const sidebarItems = [
  {
    title: "학습 코스",
    href: "/courses",
    icon: BookOpen,
    children: [
      { title: "초급 코스", href: "/courses?level=초급" },
      { title: "중급 코스", href: "/courses?level=중급" },
      { title: "고급 코스", href: "/courses?level=고급" },
    ],
  },
  {
    title: "차트 뷰어",
    href: "/chart",
    icon: BarChart3,
  },
  {
    title: "기술적 분석",
    href: "/technical",
    icon: TrendingUp,
  },
  {
    title: "패턴 게임",
    href: "/pattern-game",
    icon: Gamepad2,
  },
  {
    title: "모의투자",
    href: "/trading",
    icon: Wallet,
    children: [
      { title: "거래하기", href: "/trading" },
      { title: "거래 내역", href: "/trading/history" },
    ],
  },
  {
    title: "기본적 분석",
    href: "/fundamental",
    icon: FileText,
    children: [
      { title: "재무제표 뷰어", href: "/fundamental" },
      { title: "밸류에이션 계산기", href: "/fundamental/valuation" },
      { title: "섹터 분석", href: "/fundamental/sector" },
    ],
  },
  {
    title: "ETF 학습",
    href: "/etf",
    icon: Layers,
    children: [
      { title: "ETF 기초", href: "/etf" },
      { title: "ETF 비교", href: "/etf/compare" },
    ],
  },
  {
    title: "시장 심리",
    href: "/sentiment",
    icon: Heart,
  },
  {
    title: "투자 일지",
    href: "/journal",
    icon: PenLine,
  },
  {
    title: "나의 단어장",
    href: "/vocabulary",
    icon: BookMarked,
  },
  {
    title: "학습 마라톤",
    href: "/marathon",
    icon: Flag,
  },
  {
    title: "학습 추천",
    href: "/recommend",
    icon: Sparkles,
  },
  {
    title: "용어 사전",
    href: "/glossary",
    icon: GraduationCap,
  },
  {
    title: "퀴즈",
    href: "/quiz",
    icon: Trophy,
  },
  {
    title: "프로필",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 border-r bg-muted/30 p-4">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
            {/* 하위 메뉴 */}
            {item.children && pathname.startsWith(item.href) && (
              <div className="ml-7 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
