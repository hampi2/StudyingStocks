"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { samsungValuation, appleValuation } from "@/content/fundamental/data";
import type { ValuationMetrics } from "@/types";
import { ArrowLeft, Calculator, TrendingUp, Info } from "lucide-react";

/** 밸류에이션 계산기 유형 */
type CalcMode = "per" | "pbr" | "ev-ebitda" | "dcf";

const calcLabels: Record<CalcMode, { title: string; desc: string }> = {
  per: { title: "PER 적정가", desc: "주가수익비율(PER) 기반 적정 주가 산출" },
  pbr: { title: "PBR 적정가", desc: "주가순자산비율(PBR) 기반 적정 주가 산출" },
  "ev-ebitda": { title: "EV/EBITDA", desc: "기업가치 대비 영업이익으로 적정가 산출" },
  dcf: { title: "DCF 모델", desc: "미래 현금흐름 할인 모델로 내재가치 산출" },
};

const companies: { id: string; data: ValuationMetrics }[] = [
  { id: "samsung", data: samsungValuation },
  { id: "apple", data: appleValuation },
];

export default function ValuationPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("samsung");
  const [calcMode, setCalcMode] = useState<CalcMode>("per");

  const valuation = selectedCompany === "samsung" ? samsungValuation : appleValuation;
  const currency = valuation.currency;
  const currencySymbol = currency === "KRW" ? "₩" : "$";

  // PER 계산기 상태
  const [targetPer, setTargetPer] = useState(valuation.per.toString());
  // PBR 계산기 상태
  const [targetPbr, setTargetPbr] = useState(valuation.pbr.toString());
  // EV/EBITDA 상태
  const [targetEvEbitda, setTargetEvEbitda] = useState(valuation.evEbitda.toString());
  // DCF 상태
  const [fcfGrowth, setFcfGrowth] = useState("10"); // FCF 성장률 (%)
  const [discountRate, setDiscountRate] = useState("10"); // 할인율 (%)
  const [terminalGrowth, setTerminalGrowth] = useState("3"); // 영구 성장률 (%)
  const [projectionYears, setProjectionYears] = useState("5"); // 예측 기간

  // PER 적정가 계산
  const perFairValue = valuation.eps * parseFloat(targetPer || "0");
  const perUpside = ((perFairValue - valuation.currentPrice) / valuation.currentPrice) * 100;

  // PBR 적정가 계산
  const pbrFairValue = valuation.bps * parseFloat(targetPbr || "0");
  const pbrUpside = ((pbrFairValue - valuation.currentPrice) / valuation.currentPrice) * 100;

  // EV/EBITDA 적정가 계산 (간이)
  const ebitdaPerShare = valuation.currentPrice / valuation.evEbitda; // 주당 EBITDA 역산
  const evEbitdaFairValue = ebitdaPerShare * parseFloat(targetEvEbitda || "0");
  const evEbitdaUpside = ((evEbitdaFairValue - valuation.currentPrice) / valuation.currentPrice) * 100;

  // DCF 계산
  const calcDcf = () => {
    const growth = parseFloat(fcfGrowth || "0") / 100;
    const discount = parseFloat(discountRate || "0") / 100;
    const terminal = parseFloat(terminalGrowth || "0") / 100;
    const years = parseInt(projectionYears || "5");

    if (discount <= terminal) return { fairValue: 0, upside: 0, projections: [] as number[] };

    // 주당 FCF 역산 (간이: EPS 기반)
    const fcfPerShare = valuation.eps * 0.8; // 순이익의 80%를 FCF로 가정
    const projections: number[] = [];
    let pvSum = 0;

    for (let i = 1; i <= years; i++) {
      const futureFcf = fcfPerShare * Math.pow(1 + growth, i);
      projections.push(Math.round(futureFcf * 100) / 100);
      pvSum += futureFcf / Math.pow(1 + discount, i);
    }

    // 터미널 밸류
    const terminalFcf = fcfPerShare * Math.pow(1 + growth, years) * (1 + terminal);
    const terminalValue = terminalFcf / (discount - terminal);
    const pvTerminal = terminalValue / Math.pow(1 + discount, years);

    const fairValue = Math.round((pvSum + pvTerminal) * 100) / 100;
    const upside = ((fairValue - valuation.currentPrice) / valuation.currentPrice) * 100;

    return { fairValue, upside, projections };
  };

  const dcfResult = calcDcf();

  // 금액 포맷
  const formatPrice = (price: number) => {
    if (currency === "KRW") return `₩${Math.round(price).toLocaleString()}`;
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // 기업 변경 시 기본값 리셋
  const handleCompanyChange = (id: string) => {
    setSelectedCompany(id);
    const v = id === "samsung" ? samsungValuation : appleValuation;
    setTargetPer(v.per.toString());
    setTargetPbr(v.pbr.toString());
    setTargetEvEbitda(v.evEbitda.toString());
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <Link href="/fundamental">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">밸류에이션 계산기</h1>
          <p className="text-muted-foreground text-sm">
            다양한 방법으로 적정 주가를 계산해보세요
          </p>
        </div>
      </div>

      {/* 기업 선택 */}
      <div className="flex gap-2">
        {companies.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCompanyChange(c.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCompany === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted/50 hover:bg-muted"
            }`}
          >
            {c.data.companyName}
          </button>
        ))}
      </div>

      {/* 현재 지표 요약 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: "현재가", value: formatPrice(valuation.currentPrice) },
          { label: "EPS", value: formatPrice(valuation.eps) },
          { label: "BPS", value: formatPrice(valuation.bps) },
          { label: "PER", value: `${valuation.per}x` },
          { label: "PBR", value: `${valuation.pbr}x` },
          { label: "ROE", value: `${valuation.roe}%` },
        ].map((m) => (
          <Card key={m.label}>
            <CardContent className="p-3 text-center">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-sm font-bold mt-0.5">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 계산 모드 탭 */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1 overflow-x-auto">
        {(Object.keys(calcLabels) as CalcMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setCalcMode(mode)}
            className={`flex-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              calcMode === mode
                ? "bg-background shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {calcLabels[mode].title}
          </button>
        ))}
      </div>

      {/* PER 계산기 */}
      {calcMode === "per" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              PER 적정가 계산
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              적정 PER을 입력하면 EPS × 목표 PER로 적정 주가를 산출합니다
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">EPS (주당순이익)</label>
                <Input value={formatPrice(valuation.eps)} disabled />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">목표 PER (배)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={targetPer}
                  onChange={(e) => setTargetPer(e.target.value)}
                />
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="0.5"
                  value={targetPer}
                  onChange={(e) => setTargetPer(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>저평가 (5x)</span>
                  <span>현재 {valuation.per}x</span>
                  <span>고평가 (80x)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">적정 주가</p>
              <p className="text-3xl font-bold">{formatPrice(perFairValue)}</p>
              <Badge
                className={`mt-2 ${perUpside > 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}
              >
                현재가 대비 {perUpside > 0 ? "+" : ""}{perUpside.toFixed(1)}%
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                {formatPrice(valuation.eps)} × {targetPer} = {formatPrice(perFairValue)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PBR 계산기 */}
      {calcMode === "pbr" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              PBR 적정가 계산
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              적정 PBR을 입력하면 BPS × 목표 PBR로 적정 주가를 산출합니다
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">BPS (주당순자산)</label>
                <Input value={formatPrice(valuation.bps)} disabled />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">목표 PBR (배)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={targetPbr}
                  onChange={(e) => setTargetPbr(e.target.value)}
                />
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.1"
                  value={targetPbr}
                  onChange={(e) => setTargetPbr(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>저평가 (0.5x)</span>
                  <span>현재 {valuation.pbr}x</span>
                  <span>고평가 (20x)</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">적정 주가</p>
              <p className="text-3xl font-bold">{formatPrice(pbrFairValue)}</p>
              <Badge
                className={`mt-2 ${pbrUpside > 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}
              >
                현재가 대비 {pbrUpside > 0 ? "+" : ""}{pbrUpside.toFixed(1)}%
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                {formatPrice(valuation.bps)} × {targetPbr} = {formatPrice(pbrFairValue)}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* EV/EBITDA 계산기 */}
      {calcMode === "ev-ebitda" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              EV/EBITDA 적정가
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              기업가치(EV)를 영업이익(EBITDA)으로 나눈 비율로 적정가를 산출합니다
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">현재 EV/EBITDA</label>
                <Input value={`${valuation.evEbitda}x`} disabled />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">목표 EV/EBITDA (배)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={targetEvEbitda}
                  onChange={(e) => setTargetEvEbitda(e.target.value)}
                />
                <input
                  type="range"
                  min="3"
                  max="50"
                  step="0.5"
                  value={targetEvEbitda}
                  onChange={(e) => setTargetEvEbitda(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">적정 주가</p>
              <p className="text-3xl font-bold">{formatPrice(evEbitdaFairValue)}</p>
              <Badge
                className={`mt-2 ${evEbitdaUpside > 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}
              >
                현재가 대비 {evEbitdaUpside > 0 ? "+" : ""}{evEbitdaUpside.toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* DCF 계산기 */}
      {calcMode === "dcf" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              DCF (현금흐름할인) 모델
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              미래 잉여현금흐름(FCF)을 현재 가치로 할인하여 내재가치를 산출합니다
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">FCF 연간 성장률 (%)</label>
                <Input
                  type="number"
                  step="1"
                  value={fcfGrowth}
                  onChange={(e) => setFcfGrowth(e.target.value)}
                />
                <input
                  type="range" min="0" max="30" step="1"
                  value={fcfGrowth}
                  onChange={(e) => setFcfGrowth(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">할인율 / WACC (%)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                />
                <input
                  type="range" min="5" max="20" step="0.5"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">영구 성장률 (%)</label>
                <Input
                  type="number"
                  step="0.5"
                  value={terminalGrowth}
                  onChange={(e) => setTerminalGrowth(e.target.value)}
                />
                <input
                  type="range" min="0" max="5" step="0.5"
                  value={terminalGrowth}
                  onChange={(e) => setTerminalGrowth(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">예측 기간 (년)</label>
                <Input
                  type="number"
                  step="1"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(e.target.value)}
                />
                <input
                  type="range" min="3" max="10" step="1"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(e.target.value)}
                  className="w-full mt-2 accent-primary"
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">DCF 내재가치</p>
              <p className="text-3xl font-bold">{formatPrice(dcfResult.fairValue)}</p>
              <Badge
                className={`mt-2 ${dcfResult.upside > 0 ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"}`}
              >
                현재가 대비 {dcfResult.upside > 0 ? "+" : ""}{dcfResult.upside.toFixed(1)}%
              </Badge>
            </div>

            {/* DCF 가정 설명 */}
            <div className="rounded-lg border p-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 주당 FCF = EPS × 80% (순이익의 80%를 잉여현금흐름으로 가정)</p>
                  <p>• 터미널 밸류 = 마지막 해 FCF × (1 + 영구성장률) / (할인율 - 영구성장률)</p>
                  <p>• 할인율이 영구 성장률보다 커야 유효한 결과가 나옵니다</p>
                  <p>• 이 계산기는 학습용이며, 실제 투자 판단에는 더 정밀한 분석이 필요합니다</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
