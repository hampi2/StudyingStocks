"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTradingStore } from "@/lib/store";
import { History } from "lucide-react";

/** 거래 내역 컴포넌트 */
export function TradeHistory({ limit }: { limit?: number }) {
  const { orders } = useTradingStore();

  // 최신순 정렬
  const sortedOrders = [...orders].reverse();
  const displayOrders = limit ? sortedOrders.slice(0, limit) : sortedOrders;

  // 금액 포맷
  const formatPrice = (price: number, currency: string) => {
    if (currency === "KRW") return `₩${Math.round(price).toLocaleString()}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  // 날짜 포맷
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <History className="h-5 w-5" />
          거래 내역
          {orders.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {orders.length}건
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">거래 내역이 없습니다.</p>
            <p className="text-xs mt-1">첫 번째 주문을 실행해보세요!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  {/* 매수/매도 뱃지 */}
                  <Badge
                    className={`text-xs font-bold ${
                      order.side === "매수"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                    }`}
                  >
                    {order.side}
                  </Badge>
                  <div>
                    <p className="text-sm font-medium">{order.stockName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatPrice(order.price, order.currency)} × {order.quantity}주
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(order.price * order.quantity, order.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
