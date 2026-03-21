"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTradingStore } from "@/lib/store";
import { Briefcase } from "lucide-react";

/** 보유 종목 목록 컴포넌트 */
export function PositionList() {
  const { positions } = useTradingStore();

  // 금액 포맷
  const formatPrice = (price: number, currency: string) => {
    if (currency === "KRW") return `₩${Math.round(price).toLocaleString()}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          보유 종목
        </CardTitle>
      </CardHeader>
      <CardContent>
        {positions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">보유 종목이 없습니다.</p>
            <p className="text-xs mt-1">주문하기에서 종목을 매수해보세요!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {positions.map((pos) => {
              // 평가 손익 계산
              const evalAmount = pos.currentPrice * pos.quantity;
              const costAmount = pos.averagePrice * pos.quantity;
              const profitLoss = evalAmount - costAmount;
              const profitRate =
                costAmount > 0
                  ? ((evalAmount - costAmount) / costAmount) * 100
                  : 0;

              return (
                <div
                  key={pos.stockId}
                  className="rounded-lg border p-3 flex flex-col gap-2"
                >
                  {/* 종목명 & 시장 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{pos.stockName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {pos.market}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {pos.ticker}
                    </span>
                  </div>

                  {/* 수량 & 가격 정보 */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">보유 수량</span>
                      <span className="font-medium">{pos.quantity.toLocaleString()}주</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">현재가</span>
                      <span className="font-medium">
                        {formatPrice(pos.currentPrice, pos.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">평균 매수가</span>
                      <span className="font-medium">
                        {formatPrice(pos.averagePrice, pos.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">평가 금액</span>
                      <span className="font-medium">
                        {formatPrice(evalAmount, pos.currency)}
                      </span>
                    </div>
                  </div>

                  {/* 평가 손익 */}
                  <div
                    className={`rounded-md px-3 py-1.5 text-center text-sm font-bold ${
                      profitLoss > 0
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : profitLoss < 0
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {profitLoss > 0 ? "+" : ""}
                    {formatPrice(profitLoss, pos.currency)} (
                    {profitRate > 0 ? "+" : ""}
                    {profitRate.toFixed(2)}%)
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
