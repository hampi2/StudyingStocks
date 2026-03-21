"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { ArrowLeft, BarChart3, Check } from "lucide-react";
import { etfList } from "@/content/etf/data";
import type { ETFData } from "@/types";

/** 비교 차트용 색상 팔레트 */
const lineColors = ["#ef4444", "#3b82f6", "#22c55e"];

/** 수익률 색상 (상승=빨강, 하락=파랑) */
function getReturnColor(value: number): string {
  if (value > 0) return "text-red-500";
  if (value < 0) return "text-blue-500";
  return "text-muted-foreground";
}

/** AUM 포맷 */
function formatAum(aum: number, market: string): string {
  if (market === "KRX") {
    if (aum >= 10000) return `${(aum / 10000).toFixed(1)}조원`;
    return `${aum.toLocaleString()}억원`;
  }
  if (aum >= 1000000) return `$${(aum / 1000000).toFixed(1)}T`;
  if (aum >= 1000) return `$${(aum / 1000).toFixed(0)}B`;
  return `$${aum}M`;
}

/** ETF 비교 도구 페이지 */
export default function EtfComparePage() {
  const [mounted, setMounted] = useState(false); // 하이드레이션 방지
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 ETF ID 목록
  const isMobile = useIsMobile(); // 모바일 여부

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  // 선택된 ETF 데이터
  const selectedEtfs = etfList.filter((etf) => selectedIds.includes(etf.id));

  // 누적 수익률 차트 데이터 계산
  const cumulativeData = useMemo(() => {
    if (selectedEtfs.length < 2) return [];

    // 모든 날짜 수집 (첫 번째 ETF 기준)
    const dates = selectedEtfs[0].monthlyReturns.map((r) => r.date);

    return dates.map((date, i) => {
      const point: Record<string, string | number> = { date };
      selectedEtfs.forEach((etf) => {
        // 누적 수익률 계산 (월별 value를 누적 합산)
        let cumulative = 0; // 누적값
        for (let j = 0; j <= i; j++) {
          cumulative += etf.monthlyReturns[j]?.value ?? 0;
        }
        point[etf.name] = Math.round(cumulative * 100) / 100;
      });
      return point;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIds]);

  // 체크박스 토글 (최대 3개)
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id); // 해제
      }
      if (prev.length >= 3) return prev; // 최대 3개 제한
      return [...prev, id]; // 추가
    });
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 space-y-8">
      {/* 헤더 */}
      <div className="flex items-center gap-3 md:gap-4">
        <Link href="/etf">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="size-6 md:size-8 text-primary" />
            ETF 비교 도구
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            2~3개의 ETF를 선택하여 주요 지표를 비교합니다.
          </p>
        </div>
      </div>

      {/* 선택된 ETF 표시 */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">선택된 ETF:</span>
          {selectedEtfs.map((etf, i) => (
            <Badge
              key={etf.id}
              className="gap-1 cursor-pointer"
              style={{ backgroundColor: lineColors[i], color: "white" }}
              onClick={() => toggleSelect(etf.id)}
            >
              {etf.name} &times;
            </Badge>
          ))}
        </div>
      )}

      {/* ETF 선택 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>ETF 선택 (최대 3개)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {etfList.map((etf) => {
              const isSelected = selectedIds.includes(etf.id); // 선택 여부
              const isDisabled = !isSelected && selectedIds.length >= 3; // 3개 초과 시 비활성
              return (
                <button
                  key={etf.id}
                  onClick={() => toggleSelect(etf.id)}
                  disabled={isDisabled}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : isDisabled
                      ? "border-muted opacity-50 cursor-not-allowed"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {isSelected && <Check className="size-3" />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">{etf.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {etf.ticker} | {etf.market}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 비교 시작 안내 또는 비교 결과 */}
      {selectedEtfs.length < 2 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <BarChart3 className="size-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">2개 이상 선택하면 비교가 시작됩니다</p>
            <p className="text-sm mt-1">
              현재 {selectedIds.length}개 선택됨 (최소 2개, 최대 3개)
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* 비교 테이블 */}
          <Card>
            <CardHeader>
              <CardTitle>지표 비교</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium text-muted-foreground">
                      항목
                    </th>
                    {selectedEtfs.map((etf, i) => (
                      <th
                        key={etf.id}
                        className="text-right py-2 px-2 font-medium"
                        style={{ color: lineColors[i] }}
                      >
                        {etf.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <CompareRow label="시장" values={selectedEtfs.map((e) => e.market)} />
                  <CompareRow
                    label="보수율"
                    values={selectedEtfs.map((e) => `${e.expenseRatio}%`)}
                  />
                  <CompareRow
                    label="추적오차"
                    values={selectedEtfs.map((e) => `${e.trackingError}%`)}
                  />
                  <CompareRow
                    label="AUM"
                    values={selectedEtfs.map((e) => formatAum(e.aum, e.market))}
                  />
                  <CompareRow
                    label="YTD 수익률"
                    values={selectedEtfs.map((e) => e.ytdReturn)}
                    isReturn
                  />
                  <CompareRow
                    label="1년 수익률"
                    values={selectedEtfs.map((e) => e.oneYearReturn)}
                    isReturn
                  />
                  <CompareRow
                    label="3년 수익률"
                    values={selectedEtfs.map((e) => e.threeYearReturn)}
                    isReturn
                  />
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* 수익률 비교 차트 */}
          <Card>
            <CardHeader>
              <CardTitle>누적 수익률 비교</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
                <LineChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => v.slice(5)} // MM 형식
                    className="text-xs"
                  />
                  <YAxis
                    tickFormatter={(v) => `${Number(v)}%`}
                    className="text-xs"
                  />
                  <Tooltip
                    labelFormatter={(label) => `날짜: ${label}`}
                    formatter={(value) => [`${Number(value)}%`, ""]}
                  />
                  <Legend />
                  {selectedEtfs.map((etf, i) => (
                    <Line
                      key={etf.id}
                      type="monotone"
                      dataKey={etf.name}
                      stroke={lineColors[i]}
                      strokeWidth={2}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

/** 비교 테이블 행 컴포넌트 */
function CompareRow({
  label,
  values,
  isReturn = false,
}: {
  label: string;
  values: (string | number)[];
  isReturn?: boolean;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-2 pr-4 text-muted-foreground">{label}</td>
      {values.map((val, i) => (
        <td
          key={i}
          className={`py-2 px-2 text-right font-medium ${
            isReturn && typeof val === "number" ? getReturnColor(val) : ""
          }`}
        >
          {isReturn && typeof val === "number"
            ? `${val > 0 ? "+" : ""}${val}%`
            : val}
        </td>
      ))}
    </tr>
  );
}
