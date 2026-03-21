"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTradingStore } from "@/lib/store";
import { ArrowLeft, History, Filter } from "lucide-react";

/** 전체 거래 내역 페이지 */
export default function TradeHistoryPage() {
  const { orders } = useTradingStore();
  const [filter, setFilter] = useState<"전체" | "매수" | "매도">("전체");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // 필터 적용 & 최신순 정렬
  const filteredOrders = [...orders]
    .reverse()
    .filter((o) => filter === "전체" || o.side === filter);

  // 금액 포맷
  const formatPrice = (price: number, currency: string) => {
    if (currency === "KRW") return `₩${Math.round(price).toLocaleString()}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  // 날짜 포맷
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // 통계 계산
  const buyCount = orders.filter((o) => o.side === "매수").length;
  const sellCount = orders.filter((o) => o.side === "매도").length;
  const totalBuyKRW = orders
    .filter((o) => o.side === "매수" && o.currency === "KRW")
    .reduce((sum, o) => sum + o.price * o.quantity, 0);
  const totalSellKRW = orders
    .filter((o) => o.side === "매도" && o.currency === "KRW")
    .reduce((sum, o) => sum + o.price * o.quantity, 0);
  const totalBuyUSD = orders
    .filter((o) => o.side === "매수" && o.currency === "USD")
    .reduce((sum, o) => sum + o.price * o.quantity, 0);
  const totalSellUSD = orders
    .filter((o) => o.side === "매도" && o.currency === "USD")
    .reduce((sum, o) => sum + o.price * o.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <Link href="/trading">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">거래 내역</h1>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">총 거래</p>
            <p className="text-xl font-bold">{orders.length}건</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">매수 / 매도</p>
            <p className="text-xl font-bold">
              <span className="text-red-500">{buyCount}</span>
              {" / "}
              <span className="text-blue-500">{sellCount}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">총 매수액 (KRW)</p>
            <p className="text-lg font-bold">₩{Math.round(totalBuyKRW).toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">총 매수액 (USD)</p>
            <p className="text-lg font-bold">${totalBuyUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 */}
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {(["전체", "매수", "매도"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-foreground hover:shadow-sm"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 거래 목록 */}
      <Card>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">거래 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`text-xs font-bold min-w-[40px] justify-center ${
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
                      {formatPrice(order.price, order.currency)} × {order.quantity.toLocaleString()}주
                    </p>
                    <p className="text-xs text-muted-foreground">
                      합계 {formatPrice(order.price * order.quantity, order.currency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
