"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTradingStore, EXCHANGE_RATE } from "@/lib/store";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

/** 포트폴리오 요약 카드 - 총 자산, 수익률, 잔고 표시 */
export function PortfolioSummary() {
  const { cashKRW, cashUSD, getTotalValue, getTotalReturnRate, initialKRW, initialUSD } =
    useTradingStore();

  const totalValue = getTotalValue();
  const returnRate = getTotalReturnRate();
  const initialValue = initialKRW + initialUSD * EXCHANGE_RATE;
  const profitLoss = totalValue - initialValue;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* 총 평가액 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Wallet className="h-4 w-4" />
            총 평가액
          </div>
          <p className="text-xl font-bold">₩{Math.round(totalValue).toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* 수익률 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            {returnRate >= 0 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-blue-500" />
            )}
            총 수익률
          </div>
          <p
            className={`text-xl font-bold ${
              returnRate > 0
                ? "text-red-500"
                : returnRate < 0
                ? "text-blue-500"
                : ""
            }`}
          >
            {returnRate > 0 ? "+" : ""}
            {returnRate.toFixed(2)}%
          </p>
          <p
            className={`text-xs mt-0.5 ${
              profitLoss > 0
                ? "text-red-500"
                : profitLoss < 0
                ? "text-blue-500"
                : "text-muted-foreground"
            }`}
          >
            {profitLoss > 0 ? "+" : ""}₩{Math.round(profitLoss).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* 원화 잔고 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <PiggyBank className="h-4 w-4" />
            원화 잔고
          </div>
          <p className="text-xl font-bold">₩{Math.round(cashKRW).toLocaleString()}</p>
        </CardContent>
      </Card>

      {/* 달러 잔고 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <PiggyBank className="h-4 w-4" />
            달러 잔고
          </div>
          <p className="text-xl font-bold">${cashUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </CardContent>
      </Card>
    </div>
  );
}
