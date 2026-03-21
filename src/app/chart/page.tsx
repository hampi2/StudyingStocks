"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CandlestickChart } from "@/components/chart/CandlestickChart";
import { useIsMobile } from "@/lib/hooks";
import {
  stockList,
  getSampleData,
  calculateMA,
  calculateBollingerBands,
} from "@/content/chart/sampleData";

// 이동평균선 옵션
const maOptions = [
  { period: 5, label: "5일", color: "#f59e0b" },
  { period: 20, label: "20일", color: "#3b82f6" },
  { period: 60, label: "60일", color: "#ef4444" },
];

// 차트 뷰어 페이지
export default function ChartPage() {
  const [selectedStock, setSelectedStock] = useState("samsung");
  const [showMA, setShowMA] = useState<number[]>([5, 20]); // 활성화된 이동평균
  const [showBB, setShowBB] = useState(false); // 볼린저밴드 표시 여부
  const isMobile = useIsMobile(); // 모바일 여부

  const data = getSampleData(selectedStock);
  const stock = stockList.find((s) => s.id === selectedStock)!;

  // 이동평균선 데이터 계산
  const maLines = showMA.map((period) => {
    const option = maOptions.find((o) => o.period === period)!;
    return {
      period,
      data: calculateMA(data, period),
      color: option.color,
    };
  });

  // 볼린저밴드 데이터 계산
  const bollingerBands = showBB ? calculateBollingerBands(data) : undefined;

  // 현재가 정보
  const latest = data[data.length - 1];
  const prev = data[data.length - 2];
  const change = latest.close - prev.close;
  const changePercent = ((change / prev.close) * 100).toFixed(2);

  // 이동평균 토글
  const toggleMA = (period: number) => {
    setShowMA((prev) =>
      prev.includes(period)
        ? prev.filter((p) => p !== period)
        : [...prev, period]
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">주식 차트 뷰어</h1>
        <p className="text-muted-foreground">
          캔들차트, 이동평균선, 볼린저밴드를 직접 조작하며 배워보세요.
        </p>
      </div>

      {/* 종목 선택 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {stockList.map((s) => (
          <Button
            key={s.id}
            variant={selectedStock === s.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStock(s.id)}
          >
            {s.name} ({s.ticker})
          </Button>
        ))}
      </div>

      {/* 현재가 정보 */}
      <Card className="mb-4">
        <CardContent className="py-3 md:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-lg md:text-xl font-bold">{stock.name}</h2>
                <p className="text-xs text-muted-foreground">{stock.ticker}</p>
              </div>
              <div className="text-xl md:text-2xl font-bold">
                {stock.currency === "KRW"
                  ? `${latest.close.toLocaleString()}원`
                  : `$${latest.close.toFixed(2)}`}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={
                  change >= 0
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }
              >
                {change >= 0 ? "+" : ""}
                {stock.currency === "KRW"
                  ? change.toLocaleString()
                  : change.toFixed(2)}{" "}
                ({change >= 0 ? "+" : ""}
                {changePercent}%)
              </Badge>
              <span className="text-xs md:text-sm text-muted-foreground">
                거래량: {latest.volume.toLocaleString()}주
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 지표 토글 */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs md:text-sm font-medium mr-1">
            이동평균선:
          </span>
          {maOptions.map((option) => (
            <Button
              key={option.period}
              variant={showMA.includes(option.period) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleMA(option.period)}
              style={
                showMA.includes(option.period)
                  ? { backgroundColor: option.color, borderColor: option.color }
                  : {}
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-medium mr-1">
            보조지표:
          </span>
          <Button
            variant={showBB ? "default" : "outline"}
            size="sm"
            onClick={() => setShowBB(!showBB)}
          >
            볼린저밴드
          </Button>
        </div>
      </div>

      {/* 캔들차트 */}
      <CandlestickChart
        data={data}
        maLines={maLines}
        bollingerBands={bollingerBands}
        height={isMobile ? 300 : 500}
      />

      {/* 차트 설명 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">캔들차트 읽기</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <p>
              <strong className="text-red-500">양봉(빨강)</strong>: 종가 &gt;
              시가 (상승)
            </p>
            <p>
              <strong className="text-blue-500">음봉(파랑)</strong>: 종가 &lt;
              시가 (하락)
            </p>
            <p className="mt-1">
              위/아래 꼬리는 고가/저가를 나타냅니다.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">이동평균선</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <p>
              <strong style={{ color: "#f59e0b" }}>5일선</strong>: 단기 추세
            </p>
            <p>
              <strong style={{ color: "#3b82f6" }}>20일선</strong>: 중기 추세
              (약 1달)
            </p>
            <p>
              <strong style={{ color: "#ef4444" }}>60일선</strong>: 중장기 추세
              (약 3달)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">볼린저밴드</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            <p>상한선 터치 → 과매수 가능성</p>
            <p>하한선 터치 → 과매도 가능성</p>
            <p className="mt-1">
              밴드가 좁아지면 큰 움직임이 올 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
