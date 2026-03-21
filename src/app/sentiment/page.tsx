"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Heart, TrendingUp, Newspaper, Filter } from "lucide-react";
import {
  mockNewsList,
  fearGreedHistory,
  stockSentiments,
  getSentimentLevel,
  getSentimentColor,
} from "@/content/sentiment/data";

/** 종목 필터 옵션 */
const filterOptions = [
  { id: "all", label: "전체" },
  { id: "samsung", label: "삼성전자" },
  { id: "apple", label: "애플" },
  { id: "nvidia", label: "엔비디아" },
] as const;

/** 뉴스 감성별 Badge 색상 */
function getSentimentBadgeClass(sentiment: string): string {
  if (sentiment === "긍정") return "bg-green-500/15 text-green-700 dark:text-green-400";
  if (sentiment === "부정") return "bg-red-500/15 text-red-700 dark:text-red-400";
  return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"; // 중립
}

/** 시장 심리 분석 페이지 */
export default function SentimentPage() {
  const [mounted, setMounted] = useState(false); // 하이드레이션 방지
  const [selectedFilter, setSelectedFilter] = useState("all"); // 종목 필터

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // 최신 날짜 데이터
  const latestData = fearGreedHistory[fearGreedHistory.length - 1];
  const fearGreedIndex = latestData.fearGreedIndex; // 공포/탐욕 지수
  const sentimentLevel = getSentimentLevel(fearGreedIndex); // 레벨 텍스트
  const sentimentColor = getSentimentColor(fearGreedIndex); // 게이지 색상

  // SVG 반원 게이지 계산 (0~100 → 0~180도)
  const gaugeAngle = (fearGreedIndex / 100) * 180; // 각도 계산
  const gaugeRadius = 80; // 반원 반지름
  const gaugeCx = 100; // 중심 x
  const gaugeCy = 95; // 중심 y

  // arc 경로 계산 (시작: 왼쪽 180도, 끝: gaugeAngle만큼)
  const startAngle = Math.PI; // 180도 (왼쪽)
  const endAngle = Math.PI - (gaugeAngle * Math.PI) / 180; // 시계 반대방향
  const startX = gaugeCx + gaugeRadius * Math.cos(startAngle);
  const startY = gaugeCy - gaugeRadius * Math.sin(startAngle);
  const endX = gaugeCx + gaugeRadius * Math.cos(endAngle);
  const endY = gaugeCy - gaugeRadius * Math.sin(endAngle);
  const largeArc = gaugeAngle > 180 ? 1 : 0; // 큰 호 플래그

  // 뉴스 필터링
  const filteredNews =
    selectedFilter === "all"
      ? mockNewsList
      : mockNewsList.filter((news) => news.stockIds.includes(selectedFilter));

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="size-8 text-red-500" />
          시장 심리 분석
        </h1>
        <p className="text-muted-foreground">
          가상 뉴스 데이터 기반의 공포/탐욕 지수와 종목별 감성 분석을 통해 시장 심리를 학습합니다.
        </p>
      </div>

      {/* 상단 영역: 게이지 + 추이 차트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 공포/탐욕 게이지 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="size-5" />
              공포/탐욕 지수
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <svg viewBox="0 0 200 120" className="w-48 md:w-64 h-auto">
              {/* 배경 반원 */}
              <path
                d={`M ${gaugeCx - gaugeRadius} ${gaugeCy} A ${gaugeRadius} ${gaugeRadius} 0 0 1 ${gaugeCx + gaugeRadius} ${gaugeCy}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted"
              />
              {/* 값 반원 (arc) */}
              {gaugeAngle > 0 && (
                <path
                  d={`M ${startX} ${startY} A ${gaugeRadius} ${gaugeRadius} 0 ${largeArc} 1 ${endX} ${endY}`}
                  fill="none"
                  stroke={sentimentColor}
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              )}
              {/* 중앙 숫자 */}
              <text
                x={gaugeCx}
                y={gaugeCy - 15}
                textAnchor="middle"
                className="text-3xl font-bold fill-foreground"
                fontSize="32"
              >
                {fearGreedIndex}
              </text>
              {/* 레벨 텍스트 */}
              <text
                x={gaugeCx}
                y={gaugeCy + 8}
                textAnchor="middle"
                fill={sentimentColor}
                fontSize="14"
                fontWeight="600"
              >
                {sentimentLevel}
              </text>
              {/* 좌우 레이블 */}
              <text x={gaugeCx - gaugeRadius - 5} y={gaugeCy + 20} textAnchor="middle" className="fill-muted-foreground" fontSize="10">공포</text>
              <text x={gaugeCx + gaugeRadius + 5} y={gaugeCy + 20} textAnchor="middle" className="fill-muted-foreground" fontSize="10">탐욕</text>
            </svg>
            <p className="text-sm text-muted-foreground mt-2">
              {latestData.date} 기준
            </p>
          </CardContent>
        </Card>

        {/* 7일 추이 차트 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              7일 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={fearGreedHistory}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(v) => v.slice(5)} // MM-DD 형식
                  className="text-xs"
                />
                <YAxis domain={[0, 100]} className="text-xs" />
                <Tooltip
                  labelFormatter={(label) => `날짜: ${label}`}
                  formatter={(value) => [Number(value), "공포/탐욕 지수"]}
                />
                <Area
                  type="monotone"
                  dataKey="fearGreedIndex"
                  stroke="#f97316"
                  fill="#f97316"
                  fillOpacity={0.2}
                  name="지수"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 구성 요소 (최신 날짜의 factors) */}
      <Card>
        <CardHeader>
          <CardTitle>구성 요소</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestData.factors.map((factor) => (
            <div key={factor.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{factor.name}</span>
                <span className="text-muted-foreground">{factor.value}/100</span>
              </div>
              <Progress value={factor.value} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 종목별 감성 분석 */}
      <Card>
        <CardHeader>
          <CardTitle>종목별 감성 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={stockSentiments}
              layout="vertical"
              margin={{ left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 100]} className="text-xs" />
              <YAxis
                type="category"
                dataKey="name"
                className="text-xs"
                width={70}
              />
              <Tooltip formatter={(value) => [`${Number(value)}%`, ""]} />
              <Bar dataKey="positive" stackId="a" fill="#22c55e" name="긍정" />
              <Bar dataKey="neutral" stackId="a" fill="#eab308" name="중립" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" name="부정" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-2 text-sm">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> 긍정</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500 inline-block" /> 중립</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> 부정</span>
          </div>
        </CardContent>
      </Card>

      {/* 뉴스 피드 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <Newspaper className="size-5" />
            뉴스 피드
          </h2>
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <Filter className="size-4 text-muted-foreground shrink-0" />
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm transition-colors cursor-pointer ${
                  selectedFilter === opt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-foreground hover:shadow-sm"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map((news) => (
            <Card key={news.id}>
              <CardContent className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium leading-snug">{news.title}</h3>
                  <Badge className={getSentimentBadgeClass(news.sentiment)}>
                    {news.sentiment}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{news.summary}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{news.date}</span>
                  <span>|</span>
                  <span>{news.source}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            해당 종목의 뉴스가 없습니다.
          </p>
        )}
      </div>

      {/* 학습 설명 카드 */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">시장 심리와 투자</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">공포/탐욕 지수</strong>는 시장 참여자들의 심리 상태를 0(극도 공포)부터 100(극도 탐욕)까지 수치화한 지표입니다.
          </p>
          <p>
            워렌 버핏은 &ldquo;다른 사람이 탐욕스러울 때 두려워하고, 다른 사람이 두려워할 때 탐욕스러워라&rdquo;라고 했습니다.
            시장 심리가 극단에 치우칠 때가 오히려 투자 기회가 될 수 있습니다.
          </p>
          <p>
            다만, 감성 분석은 보조 지표일 뿐이며 투자 결정의 유일한 근거가 되어서는 안 됩니다.
            기본적 분석, 기술적 분석과 함께 종합적으로 판단하세요.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
