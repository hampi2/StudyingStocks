"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTradingStore } from "@/lib/store";
import { LineChart } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/** 수익률 차트 컴포넌트 */
export function PortfolioChart() {
  const { snapshots } = useTradingStore();

  if (snapshots.length < 2) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            수익률 차트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">아직 데이터가 부족합니다.</p>
            <p className="text-xs mt-1">
              거래를 하면 수익률 변화가 기록됩니다.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 차트 데이터 포맷
  const chartData = snapshots.map((s) => ({
    date: s.date,
    수익률: s.returnRate,
    평가액: Math.round(s.totalValue),
  }));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          수익률 차트
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] md:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="returnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  backgroundColor: "hsl(var(--card))",
                  fontSize: "12px",
                }}
                formatter={(value, name) => {
                  if (name === "수익률") return [`${Number(value).toFixed(2)}%`, name];
                  return [`₩${Number(value).toLocaleString()}`, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="수익률"
                stroke="hsl(var(--primary))"
                fill="url(#returnGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
