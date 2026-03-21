"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, ChevronUp, ArrowRight, Lightbulb, Filter } from "lucide-react";
import { etfLessons, etfList } from "@/content/etf/data";

/** 시장 필터 옵션 */
const marketFilters = [
  { id: "all", label: "전체" },
  { id: "KRX", label: "KRX" },
  { id: "US", label: "US" },
] as const;

/** 수익률 색상 (한국식: 상승=빨강, 하락=파랑) */
function getReturnColor(value: number): string {
  if (value > 0) return "text-red-500"; // 상승 = 빨강
  if (value < 0) return "text-blue-500"; // 하락 = 파랑
  return "text-muted-foreground";
}

/** AUM 포맷 (억원 또는 백만달러) */
function formatAum(aum: number, market: string): string {
  if (market === "KRX") {
    if (aum >= 10000) return `${(aum / 10000).toFixed(1)}조원`;
    return `${aum.toLocaleString()}억원`;
  }
  if (aum >= 1000000) return `$${(aum / 1000000).toFixed(1)}T`;
  if (aum >= 1000) return `$${(aum / 1000).toFixed(0)}B`;
  return `$${aum}M`;
}

/** content에서 **bold** 부분을 span으로 변환 */
function renderContent(text: string) {
  // 단락별로 분리
  const paragraphs = text.split("\n\n");
  return paragraphs.map((para, i) => {
    // 줄바꿈 유지하면서 **bold** 처리
    const lines = para.split("\n");
    return (
      <div key={i} className="mb-3 last:mb-0">
        {lines.map((line, j) => {
          // **bold** 패턴 처리
          const parts = line.split(/(\*\*[^*]+\*\*)/g);
          return (
            <p key={j} className={`${line.startsWith("- ") ? "pl-4" : ""} ${line.startsWith("|") ? "font-mono text-xs" : ""}`}>
              {parts.map((part, k) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <span key={k} className="font-bold text-foreground">
                      {part.slice(2, -2)}
                    </span>
                  );
                }
                return <span key={k}>{part}</span>;
              })}
            </p>
          );
        })}
      </div>
    );
  });
}

/** ETF 학습 메인 페이지 */
export default function EtfPage() {
  const [mounted, setMounted] = useState(false); // 하이드레이션 방지
  const [openLessonId, setOpenLessonId] = useState<string | null>(null); // 아코디언 열린 섹션
  const [marketFilter, setMarketFilter] = useState("all"); // 시장 필터

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // 필터링된 ETF 목록
  const filteredEtfs =
    marketFilter === "all"
      ? etfList
      : etfList.filter((etf) => etf.market === marketFilter);

  // 아코디언 토글
  const toggleLesson = (id: string) => {
    setOpenLessonId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="size-8 text-primary" />
            ETF 학습
          </h1>
          <p className="text-muted-foreground">
            ETF(상장지수펀드)의 기초부터 선택 방법까지 체계적으로 학습합니다.
          </p>
        </div>
        <Link href="/etf/compare">
          <Button variant="outline" className="gap-2">
            ETF 비교 도구
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {/* 학습 섹션 (아코디언) */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">ETF 기초 학습</h2>
        {etfLessons
          .sort((a, b) => a.order - b.order)
          .map((lesson) => (
            <Card key={lesson.id}>
              <button
                onClick={() => toggleLesson(lesson.id)}
                className="w-full text-left"
              >
                <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardTitle className="text-base">
                    {lesson.order}. {lesson.title}
                  </CardTitle>
                  {openLessonId === lesson.id ? (
                    <ChevronUp className="size-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="size-5 text-muted-foreground shrink-0" />
                  )}
                </CardHeader>
              </button>
              {openLessonId === lesson.id && (
                <CardContent className="text-sm text-muted-foreground border-t pt-4">
                  {renderContent(lesson.content)}
                </CardContent>
              )}
            </Card>
          ))}
      </div>

      {/* ETF 목록 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">ETF 목록</h2>
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-muted-foreground" />
            {marketFilters.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMarketFilter(opt.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  marketFilter === opt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEtfs.map((etf) => (
            <Card key={etf.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{etf.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{etf.ticker}</p>
                  </div>
                  <Badge variant="secondary">{etf.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  {etf.provider}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">보수율</span>
                    <p className="font-medium">{etf.expenseRatio}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">AUM</span>
                    <p className="font-medium">{formatAum(etf.aum, etf.market)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">1년 수익률</span>
                    <p className={`font-medium ${getReturnColor(etf.oneYearReturn)}`}>
                      {etf.oneYearReturn > 0 ? "+" : ""}
                      {etf.oneYearReturn}%
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">시장</span>
                    <p className="font-medium">{etf.market}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEtfs.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            해당 시장의 ETF가 없습니다.
          </p>
        )}
      </div>

      {/* 학습 팁 */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500" />
            ETF 투자 시 주의사항
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">1. 레버리지/인버스 ETF는 장기 보유에 부적합합니다.</strong>{" "}
            일일 수익률을 추종하므로 복리 효과로 장기 보유 시 원래 지수와 큰 괴리가 발생합니다.
          </p>
          <p>
            <strong className="text-foreground">2. 보수율은 낮을수록 유리합니다.</strong>{" "}
            0.1%의 보수율 차이도 20년간 투자하면 누적 비용이 크게 달라집니다.
          </p>
          <p>
            <strong className="text-foreground">3. 거래량과 AUM을 확인하세요.</strong>{" "}
            유동성이 낮은 ETF는 원하는 가격에 매매하기 어렵고, 상장폐지 위험도 있습니다.
          </p>
          <p>
            <strong className="text-foreground">4. 해외 ETF 투자 시 세금과 환율을 고려하세요.</strong>{" "}
            미국 ETF는 양도소득세 22%가 부과되며, 환율 변동에 따른 추가 손익이 발생합니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
