"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";

interface IndicatorChartProps {
  type: "RSI" | "MACD";
  data: Record<string, string | number>[];
  height?: number;
}

// RSI / MACD 보조지표 차트 컴포넌트
export function IndicatorChart({ type, data, height = 200 }: IndicatorChartProps) {
  if (type === "RSI") {
    return (
      <div className="w-full rounded-lg border p-4 bg-card">
        <h3 className="text-sm font-semibold mb-2">RSI (상대강도지수)</h3>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              tickFormatter={(v: string) => v.slice(5)} // MM-DD 형식
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Tooltip
              labelFormatter={(label) => `날짜: ${label}`}
              formatter={(value) => [`${Number(value).toFixed(1)}`, "RSI"]}
            />
            {/* 과매수/과매도 기준선 */}
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" label="과매수 (70)" />
            <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="5 5" label="과매도 (30)" />
            <ReferenceLine y={50} stroke="#9ca3af" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="rsi"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={false}
              name="RSI"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // MACD 차트
  return (
    <div className="w-full rounded-lg border p-4 bg-card">
      <h3 className="text-sm font-semibold mb-2">MACD</h3>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10 }}
            tickFormatter={(v: string) => v.slice(5)}
          />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip
            labelFormatter={(label) => `날짜: ${label}`}
          />
          <Legend />
          <ReferenceLine y={0} stroke="#9ca3af" />
          <Line
            type="monotone"
            dataKey="macd"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="MACD"
          />
          <Line
            type="monotone"
            dataKey="signal"
            stroke="#ef4444"
            strokeWidth={1}
            dot={false}
            name="시그널"
          />
          <Bar
            dataKey="histogram"
            name="히스토그램"
            fill="#22c55e"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
