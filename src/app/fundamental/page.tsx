"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { samsungFinancials, appleFinancials } from "@/content/fundamental/data";
import type { FinancialStatement, FinancialItem } from "@/types";
import { FileText, Calculator, BarChart3, ChevronRight, X } from "lucide-react";

/** 재무제표 항목 표시 유형 */
type StatementType = "incomeStatement" | "balanceSheet" | "cashFlow";

const statementLabels: Record<StatementType, string> = {
  incomeStatement: "손익계산서",
  balanceSheet: "재무상태표",
  cashFlow: "현금흐름표",
};

const companies = [
  { id: "samsung", data: samsungFinancials },
  { id: "apple", data: appleFinancials },
];

/** 숫자 포맷 (단위 표시 포함) */
function formatNumber(value: number, currency: string): string {
  if (currency === "KRW") {
    // 억원 단위
    if (Math.abs(value) >= 10000) {
      return `${(value / 10000).toFixed(1)}조`;
    }
    return `${value.toLocaleString()}억`;
  }
  // 백만달러 단위
  if (Math.abs(value) >= 1000) {
    return `$${(value / 1000).toFixed(1)}B`;
  }
  return `$${value.toLocaleString()}M`;
}

/** 전년 대비 증감률 계산 */
function calcYoY(current: number, previous: number): string {
  if (previous === 0) return "-";
  const rate = ((current - previous) / Math.abs(previous)) * 100;
  const sign = rate > 0 ? "+" : "";
  return `${sign}${rate.toFixed(1)}%`;
}

/** 항목 설명 팝업 컴포넌트 */
function ItemPopup({ item, currency, onClose }: { item: FinancialItem; currency: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="pb-3 flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-lg">{item.label}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{item.labelEn}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 설명 */}
          <p className="text-sm leading-relaxed">{item.description}</p>

          {/* 공식 */}
          {item.formula && (
            <div className="rounded-lg bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">계산 공식</p>
              <p className="text-sm font-mono font-medium">{item.formula}</p>
            </div>
          )}

          {/* 연도별 수치 */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">연도별 추이</p>
            <div className="space-y-2">
              {item.values.map((val, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {idx === 0 ? "2023" : idx === 1 ? "2024" : "2025E"}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{formatNumber(val, currency)}</span>
                    {idx > 0 && (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          val > item.values[idx - 1]
                            ? "text-red-500"
                            : val < item.values[idx - 1]
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {calcYoY(val, item.values[idx - 1])}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FundamentalPage() {
  const [selectedCompany, setSelectedCompany] = useState<string>("samsung");
  const [activeTab, setActiveTab] = useState<StatementType>("incomeStatement");
  const [selectedItem, setSelectedItem] = useState<FinancialItem | null>(null);

  const data: FinancialStatement = selectedCompany === "samsung" ? samsungFinancials : appleFinancials;
  const sections = data[activeTab];
  const unit = data.currency === "KRW" ? "단위: 억원" : "단위: 백만달러(M)";

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">기본적 분석</h1>
        <p className="text-muted-foreground text-sm mt-1">
          재무제표를 읽고 기업의 가치를 분석하는 방법을 학습합니다
        </p>
      </div>

      {/* 빠른 링크 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link href="/fundamental/valuation">
          <Card className="hover:border-primary transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <Calculator className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="font-bold text-sm">밸류에이션 계산기</p>
                <p className="text-xs text-muted-foreground">PER, PBR, DCF 모델</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/fundamental/sector">
          <Card className="hover:border-primary transition-colors cursor-pointer h-full">
            <CardContent className="p-4 flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="font-bold text-sm">섹터 분석</p>
                <p className="text-xs text-muted-foreground">산업별 지표 비교</p>
              </div>
              <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Card className="border-dashed h-full">
          <CardContent className="p-4 flex items-center gap-3">
            <FileText className="h-8 w-8 text-muted-foreground shrink-0" />
            <div>
              <p className="font-bold text-sm">재무제표 뷰어</p>
              <p className="text-xs text-muted-foreground">아래에서 바로 확인 ↓</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 기업 선택 */}
      <div className="flex gap-2">
        {companies.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCompany(c.id)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              selectedCompany === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted/50 hover:bg-muted"
            }`}
          >
            {c.data.companyName}
            <Badge variant="secondary" className="ml-2 text-xs">
              {c.data.ticker}
            </Badge>
          </button>
        ))}
      </div>

      {/* 재무제표 탭 */}
      <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
        {(Object.keys(statementLabels) as StatementType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === type
                ? "bg-background shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {statementLabels[type]}
          </button>
        ))}
      </div>

      {/* 재무제표 테이블 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {data.companyName} {statementLabels[activeTab]}
            </CardTitle>
            <span className="text-xs text-muted-foreground">{unit}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground min-w-[200px]">
                    항목
                  </th>
                  {data.years.map((year) => (
                    <th
                      key={year}
                      className="text-right px-4 py-3 font-medium text-muted-foreground min-w-[120px]"
                    >
                      {year}
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground min-w-[80px]">
                    YoY
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <React.Fragment key={section.title}>
                    {/* 섹션 구분 헤더 */}
                    <tr key={`section-${section.title}`} className="border-b bg-muted/10">
                      <td
                        colSpan={data.years.length + 2}
                        className="px-4 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.items.map((item) => (
                      <tr
                        key={item.labelEn}
                        onClick={() => setSelectedItem(item)}
                        className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                      >
                        <td
                          className={`px-4 py-2.5 ${item.isTotal ? "font-bold" : ""}`}
                          style={{ paddingLeft: `${(item.indent ?? 0) * 16 + 16}px` }}
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                            {item.labelEn}
                          </span>
                        </td>
                        {item.values.map((val, idx) => (
                          <td
                            key={idx}
                            className={`text-right px-4 py-2.5 tabular-nums ${
                              item.isTotal ? "font-bold" : ""
                            } ${val < 0 ? "text-blue-500" : ""}`}
                          >
                            {formatNumber(val, data.currency)}
                          </td>
                        ))}
                        <td className="text-right px-4 py-2.5">
                          {item.values.length >= 2 && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                item.values[2] > item.values[1]
                                  ? "text-red-500"
                                  : item.values[2] < item.values[1]
                                  ? "text-blue-500"
                                  : ""
                              }`}
                            >
                              {calcYoY(item.values[2], item.values[1])}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 학습 팁 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">💡 재무제표 읽는 팁</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>각 항목을 <strong>클릭</strong>하면 상세 설명과 계산 공식을 볼 수 있습니다</li>
            <li><strong>손익계산서</strong>는 "얼마 벌었나" (매출 → 영업이익 → 순이익)</li>
            <li><strong>재무상태표</strong>는 "뭘 갖고 있나" (자산 = 부채 + 자본)</li>
            <li><strong>현금흐름표</strong>는 "현금이 어떻게 흘러갔나" (영업 / 투자 / 재무)</li>
            <li>YoY(Year over Year)는 전년 대비 증감률입니다</li>
          </ul>
        </CardContent>
      </Card>

      {/* 항목 클릭 팝업 */}
      {selectedItem && (
        <ItemPopup
          item={selectedItem}
          currency={data.currency}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
