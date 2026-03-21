"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CandlestickChart } from "@/components/chart/CandlestickChart";
import { IndicatorChart } from "@/components/chart/IndicatorChart";
import { useIsMobile } from "@/lib/hooks";
import {
  getSampleData,
  calculateMA,
  calculateRSI,
  calculateMACD,
  calculateBollingerBands,
} from "@/content/chart/sampleData";

// 학습할 보조지표 목록
const indicators = [
  {
    id: "ma",
    name: "이동평균선 (MA)",
    description: "일정 기간의 평균 가격을 이은 선. 추세 판단의 기본 도구입니다.",
    details: [
      "단기선(5일)이 장기선(20일)을 위로 돌파 → 골든크로스 (매수 신호)",
      "단기선이 장기선을 아래로 돌파 → 데드크로스 (매도 신호)",
      "주가가 이동평균선 위에 있으면 상승 추세, 아래에 있으면 하락 추세",
    ],
  },
  {
    id: "rsi",
    name: "RSI (상대강도지수)",
    description: "주가의 과매수/과매도 상태를 0~100으로 나타내는 지표.",
    details: [
      "RSI > 70: 과매수 → 하락 전환 가능성",
      "RSI < 30: 과매도 → 상승 전환 가능성",
      "다이버전스: 가격과 RSI 방향이 다르면 추세 전환 신호",
    ],
  },
  {
    id: "macd",
    name: "MACD",
    description: "두 이동평균선의 수렴과 발산을 이용한 추세 추종 지표.",
    details: [
      "MACD가 시그널선 위로 교차 → 매수 신호",
      "MACD가 시그널선 아래로 교차 → 매도 신호",
      "히스토그램이 0선 위: 상승 모멘텀, 아래: 하락 모멘텀",
    ],
  },
  {
    id: "bb",
    name: "볼린저밴드",
    description: "이동평균선을 중심으로 표준편차 밴드를 표시한 변동성 지표.",
    details: [
      "주가가 상한선 터치/돌파 → 과매수 (되돌림 가능)",
      "주가가 하한선 터치/돌파 → 과매도 (반등 가능)",
      "밴드 폭이 좁아지면(스퀴즈) → 큰 변동이 임박한 신호",
    ],
  },
];

// 기술적 분석 도구 학습 페이지
export default function TechnicalPage() {
  const [selectedIndicator, setSelectedIndicator] = useState("ma");
  const isMobile = useIsMobile(); // 모바일 여부
  const data = getSampleData("samsung");

  // 각 지표별 데이터 계산
  const ma5 = calculateMA(data, 5);
  const ma20 = calculateMA(data, 20);
  const ma60 = calculateMA(data, 60);
  const rsiData = calculateRSI(data);
  const macdData = calculateMACD(data);
  const bbData = calculateBollingerBands(data);

  // RSI 차트용 데이터
  const rsiChartData = rsiData.map((d) => ({
    time: d.time,
    rsi: d.value,
  }));

  // MACD 차트용 데이터
  const macdChartData = macdData.macd.map((d, i) => ({
    time: d.time,
    macd: d.value,
    signal: macdData.signal[i]?.value ?? 0,
    histogram: macdData.histogram[i]?.value ?? 0,
  }));

  const currentIndicator = indicators.find((i) => i.id === selectedIndicator)!;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-4 md:mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">기술적 분석 도구</h1>
        <p className="text-muted-foreground">
          주요 보조지표를 실제 차트에서 확인하며 사용법을 배워보세요.
        </p>
      </div>

      {/* 지표 선택 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {indicators.map((ind) => (
          <Button
            key={ind.id}
            variant={selectedIndicator === ind.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedIndicator(ind.id)}
          >
            {ind.name}
          </Button>
        ))}
      </div>

      {/* 선택된 지표 설명 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{currentIndicator.name}</CardTitle>
          <CardDescription>{currentIndicator.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="text-sm font-semibold mb-2">핵심 포인트</h4>
          <ul className="space-y-1">
            {currentIndicator.details.map((detail, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <Badge variant="outline" className="shrink-0 h-5 w-5 flex items-center justify-center text-xs p-0">
                  {i + 1}
                </Badge>
                {detail}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 차트 영역 */}
      <div className="space-y-4">
        {/* 이동평균선 */}
        {selectedIndicator === "ma" && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
              <h3 className="text-base md:text-lg font-semibold">삼성전자 - 이동평균선</h3>
              <div className="flex gap-2 text-xs">
                <span style={{ color: "#f59e0b" }}>■ 5일선</span>
                <span style={{ color: "#3b82f6" }}>■ 20일선</span>
                <span style={{ color: "#ef4444" }}>■ 60일선</span>
              </div>
            </div>
            <CandlestickChart
              data={data}
              maLines={[
                { period: 5, data: ma5, color: "#f59e0b" },
                { period: 20, data: ma20, color: "#3b82f6" },
                { period: 60, data: ma60, color: "#ef4444" },
              ]}
              height={isMobile ? 280 : 450}
            />
          </>
        )}

        {/* RSI */}
        {selectedIndicator === "rsi" && (
          <>
            <h3 className="text-base md:text-lg font-semibold mb-2">
              삼성전자 - RSI (14일)
            </h3>
            <CandlestickChart data={data} height={isMobile ? 220 : 350} />
            <IndicatorChart type="RSI" data={rsiChartData} height={isMobile ? 150 : 200} />
          </>
        )}

        {/* MACD */}
        {selectedIndicator === "macd" && (
          <>
            <h3 className="text-base md:text-lg font-semibold mb-2">삼성전자 - MACD</h3>
            <CandlestickChart data={data} height={isMobile ? 220 : 350} />
            <IndicatorChart type="MACD" data={macdChartData} height={isMobile ? 150 : 200} />
          </>
        )}

        {/* 볼린저밴드 */}
        {selectedIndicator === "bb" && (
          <>
            <h3 className="text-base md:text-lg font-semibold mb-2">
              삼성전자 - 볼린저밴드 (20일, 2σ)
            </h3>
            <CandlestickChart
              data={data}
              bollingerBands={bbData}
              height={isMobile ? 280 : 450}
            />
          </>
        )}
      </div>

      <Separator className="my-4 md:my-8" />

      {/* 학습 팁 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">학습 팁</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            하나의 지표만으로 매매 결정을 내리지 마세요.
            여러 지표를 종합적으로 분석하는 것이 중요합니다.
          </p>
          <p>
            예를 들어, 이동평균선에서 골든크로스가 나타나면서 RSI가 과매도
            구간에서 반등하고, MACD도 시그널을 상향 돌파하면 더 강한 매수
            신호로 해석할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
