"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTradingStore, EXCHANGE_RATE } from "@/lib/store";
import { stockList, getSampleData } from "@/content/chart/sampleData";
import type { OrderSide, Currency, Market } from "@/types";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

/** 주문 폼 컴포넌트 - 매수/매도 주문 입력 */
export function OrderForm() {
  const [selectedStock, setSelectedStock] = useState<string>(stockList[0].id);
  const [side, setSide] = useState<OrderSide>("매수");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const { executeOrder, cashKRW, cashUSD, getPosition } = useTradingStore();

  // 선택된 종목 정보
  const stock = stockList.find((s) => s.id === selectedStock)!;
  const sampleData = getSampleData(selectedStock);
  const currentPrice = sampleData[sampleData.length - 1].close; // 최신 종가를 현재가로 사용
  const currency = stock.currency as Currency;
  const market = stock.market as Market;

  // 보유 수량
  const position = getPosition(selectedStock);
  const holdingQty = position?.quantity ?? 0;

  // 주문 가능 금액/수량 계산
  const availableCash = currency === "KRW" ? cashKRW : cashUSD;
  const maxBuyQty = Math.floor(availableCash / currentPrice);

  // 주문 실행 핸들러
  const handleOrder = () => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) {
      setMessage({ text: "수량을 입력해주세요.", type: "error" });
      return;
    }

    const result = executeOrder({
      stockId: selectedStock,
      stockName: stock.name,
      ticker: stock.ticker,
      market,
      side,
      type: "시장가",
      price: currentPrice,
      quantity: qty,
      currency,
    });

    setMessage({ text: result.message, type: result.success ? "success" : "error" });
    if (result.success) setQuantity("");
  };

  // 금액 포맷
  const formatPrice = (price: number, cur: Currency) => {
    if (cur === "KRW") return `₩${price.toLocaleString()}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">주문하기</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 종목 선택 */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">종목 선택</label>
          <div className="flex gap-2">
            {stockList.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStock(s.id);
                  setQuantity("");
                  setMessage(null);
                }}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  selectedStock === s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted/50 hover:bg-muted"
                }`}
              >
                {s.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {s.market}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* 현재가 정보 */}
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">현재가</span>
            <span className="text-lg font-bold">{formatPrice(currentPrice, currency)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-muted-foreground">보유 수량</span>
            <span className="text-sm font-medium">{holdingQty}주</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-muted-foreground">주문 가능</span>
            <span className="text-sm font-medium">
              {side === "매수"
                ? `최대 ${maxBuyQty.toLocaleString()}주`
                : `최대 ${holdingQty.toLocaleString()}주`}
            </span>
          </div>
        </div>

        {/* 매수/매도 탭 */}
        <div className="flex gap-2">
          <button
            onClick={() => { setSide("매수"); setMessage(null); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-colors ${
              side === "매수"
                ? "bg-red-500 text-white"
                : "bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-foreground hover:shadow-sm"
            }`}
          >
            <ArrowUpCircle className="h-4 w-4" />
            매수
          </button>
          <button
            onClick={() => { setSide("매도"); setMessage(null); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-colors ${
              side === "매도"
                ? "bg-blue-500 text-white"
                : "bg-muted text-muted-foreground cursor-pointer hover:bg-accent hover:text-foreground hover:shadow-sm"
            }`}
          >
            <ArrowDownCircle className="h-4 w-4" />
            매도
          </button>
        </div>

        {/* 수량 입력 */}
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">수량 (주)</label>
          <Input
            type="number"
            min={1}
            max={side === "매수" ? maxBuyQty : holdingQty}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="주문 수량 입력"
          />
          {/* 빠른 수량 버튼 */}
          <div className="flex gap-2 mt-2">
            {[10, 50, 100].map((q) => (
              <button
                key={q}
                onClick={() => setQuantity(String(q))}
                className="flex-1 rounded border px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors"
              >
                {q}주
              </button>
            ))}
            <button
              onClick={() => {
                const max = side === "매수" ? maxBuyQty : holdingQty;
                setQuantity(String(max));
              }}
              className="flex-1 rounded border px-2 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors"
            >
              최대
            </button>
          </div>
        </div>

        {/* 예상 금액 */}
        {quantity && parseInt(quantity) > 0 && (
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">예상 {side === "매수" ? "매수" : "매도"} 금액</span>
              <span className="text-base font-bold">
                {formatPrice(currentPrice * parseInt(quantity), currency)}
              </span>
            </div>
          </div>
        )}

        {/* 주문 버튼 */}
        <Button
          onClick={handleOrder}
          className={`w-full text-base font-bold py-5 ${
            side === "매수"
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {side === "매수" ? "매수하기" : "매도하기"}
        </Button>

        {/* 메시지 */}
        {message && (
          <div
            className={`rounded-lg p-3 text-sm font-medium text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {message.text}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
