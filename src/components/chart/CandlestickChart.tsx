"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  type IChartApi,
  ColorType,
  CrosshairMode,
  CandlestickSeries,
  LineSeries,
  HistogramSeries,
} from "lightweight-charts";
import { useTheme } from "next-themes";
import type { CandleData } from "@/content/chart/sampleData";

interface CandlestickChartProps {
  data: CandleData[];
  // 이동평균선 데이터 (선택)
  maLines?: {
    period: number;
    data: { time: string; value: number }[];
    color: string;
  }[];
  // 높이 (기본 400px)
  height?: number;
  // 볼린저밴드 데이터 (선택)
  bollingerBands?: {
    upper: { time: string; value: number }[];
    middle: { time: string; value: number }[];
    lower: { time: string; value: number }[];
  };
}

// TradingView 스타일 캔들차트 컴포넌트
export function CandlestickChart({
  data,
  maLines,
  height = 400,
  bollingerBands,
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const isDark = theme === "dark";

    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: isDark ? "#1a1a2e" : "#ffffff" },
        textColor: isDark ? "#d1d5db" : "#374151",
      },
      grid: {
        vertLines: { color: isDark ? "#2d2d44" : "#e5e7eb" },
        horzLines: { color: isDark ? "#2d2d44" : "#e5e7eb" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: isDark ? "#2d2d44" : "#d1d5db",
      },
      timeScale: {
        borderColor: isDark ? "#2d2d44" : "#d1d5db",
        timeVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height,
    });

    chartRef.current = chart;

    // 캔들스틱 시리즈 추가 (v5 API)
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: isDark ? "#22c55e" : "#ef4444", // 양봉 색상
      downColor: isDark ? "#ef4444" : "#3b82f6", // 음봉 색상
      borderUpColor: isDark ? "#22c55e" : "#ef4444",
      borderDownColor: isDark ? "#ef4444" : "#3b82f6",
      wickUpColor: isDark ? "#22c55e" : "#ef4444",
      wickDownColor: isDark ? "#ef4444" : "#3b82f6",
    });

    candleSeries.setData(
      data.map((d) => ({
        time: d.time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
    );

    // 이동평균선 추가
    if (maLines) {
      for (const ma of maLines) {
        const lineSeries = chart.addSeries(LineSeries, {
          color: ma.color,
          lineWidth: 1,
          title: `MA${ma.period}`,
        });
        lineSeries.setData(ma.data);
      }
    }

    // 볼린저밴드 추가
    if (bollingerBands) {
      const upperSeries = chart.addSeries(LineSeries, {
        color: isDark ? "#60a5fa" : "#3b82f6",
        lineWidth: 1,
        lineStyle: 2, // 점선
        title: "BB 상한",
      });
      upperSeries.setData(bollingerBands.upper);

      const middleSeries = chart.addSeries(LineSeries, {
        color: isDark ? "#a78bfa" : "#8b5cf6",
        lineWidth: 1,
        title: "BB 중심",
      });
      middleSeries.setData(bollingerBands.middle);

      const lowerSeries = chart.addSeries(LineSeries, {
        color: isDark ? "#60a5fa" : "#3b82f6",
        lineWidth: 1,
        lineStyle: 2,
        title: "BB 하한",
      });
      lowerSeries.setData(bollingerBands.lower);
    }

    // 거래량 시리즈 추가
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: isDark ? "#4b5563" : "#9ca3af",
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });

    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    volumeSeries.setData(
      data.map((d) => ({
        time: d.time,
        value: d.volume,
        color:
          d.close >= d.open
            ? isDark
              ? "rgba(34, 197, 94, 0.3)"
              : "rgba(239, 68, 68, 0.3)"
            : isDark
              ? "rgba(239, 68, 68, 0.3)"
              : "rgba(59, 130, 246, 0.3)",
      }))
    );

    // 차트 영역에 맞추기
    chart.timeScale().fitContent();

    // 리사이즈 대응
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, maLines, bollingerBands, height, theme]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-lg border overflow-hidden"
    />
  );
}
