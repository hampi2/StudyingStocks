"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTradingStore } from "@/lib/store";
import { PortfolioSummary } from "@/components/trading/PortfolioSummary";
import { OrderForm } from "@/components/trading/OrderForm";
import { PositionList } from "@/components/trading/PositionList";
import { TradeHistory } from "@/components/trading/TradeHistory";
import { PortfolioChart } from "@/components/trading/PortfolioChart";
import { Wallet, RotateCcw, History, AlertTriangle } from "lucide-react";

/** 모의투자 메인 페이지 */
export default function TradingPage() {
  const { isPortfolioCreated, resetPortfolio, takeSnapshot } = useTradingStore();
  const [showReset, setShowReset] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 하이드레이션 불일치 방지
  useEffect(() => setMounted(true), []);

  // 매 거래 후 스냅샷 기록 (페이지 진입 시)
  useEffect(() => {
    if (mounted && isPortfolioCreated()) {
      takeSnapshot();
    }
  }, [mounted]);

  if (!mounted) return null;

  // 포트폴리오 미생성 시 시작 화면
  if (!isPortfolioCreated()) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Wallet className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">모의투자 시작하기</h1>
          <p className="text-muted-foreground">
            가상 자금으로 주식 매매를 연습해보세요.
            <br />
            실제 돈 없이 투자 감각을 키울 수 있습니다!
          </p>
          <Card>
            <CardContent className="p-6 space-y-3">
              <h3 className="font-bold text-lg">초기 자금</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">한국 시장 (KRX)</span>
                <span className="font-bold">₩100,000,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">미국 시장 (NASDAQ)</span>
                <span className="font-bold">$100,000.00</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * 삼성전자(KRX)와 애플(NASDAQ) 종목을 거래할 수 있습니다.
              </p>
            </CardContent>
          </Card>
          <Button
            onClick={resetPortfolio}
            size="lg"
            className="w-full text-base font-bold py-6"
          >
            <Wallet className="h-5 w-5 mr-2" />
            모의투자 시작
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">모의투자</h1>
        <div className="flex gap-2">
          <Link href="/trading/history">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-1" />
              전체 내역
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowReset(!showReset)}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            초기화
          </Button>
        </div>
      </div>

      {/* 초기화 확인 */}
      {showReset && (
        <Card className="border-destructive">
          <CardContent className="p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
              <span>포트폴리오를 초기화하면 모든 거래 내역이 삭제됩니다.</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReset(false)}
              >
                취소
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  resetPortfolio();
                  setShowReset(false);
                }}
              >
                확인
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 포트폴리오 요약 */}
      <PortfolioSummary />

      {/* 메인 콘텐츠 - 반응형 레이아웃 */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 주문 폼 */}
        <div className="md:col-span-1">
          <OrderForm />
        </div>

        {/* 보유종목 + 차트 + 최근거래 */}
        <div className="md:col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
          <PositionList />
          <PortfolioChart />
          <TradeHistory limit={5} />
        </div>
      </div>
    </div>
  );
}
