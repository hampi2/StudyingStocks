"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sectors } from "@/content/fundamental/data";
import type { ValuationMetrics } from "@/types";
import { ArrowLeft, BarChart3, ArrowUpDown } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

/** 정렬 기준 */
type SortKey = "per" | "pbr" | "roe" | "evEbitda" | "dividendYield";

const sortLabels: Record<SortKey, string> = {
  per: "PER",
  pbr: "PBR",
  roe: "ROE",
  evEbitda: "EV/EBITDA",
  dividendYield: "배당수익률",
};

export default function SectorPage() {
  const [selectedSector, setSelectedSector] = useState(sectors[0].id);
  const [sortKey, setSortKey] = useState<SortKey>("per");
  const [sortAsc, setSortAsc] = useState(true);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const sector = sectors.find((s) => s.id === selectedSector)!;

  // 정렬된 기업 목록
  const sortedCompanies = [...sector.companies].sort((a, b) => {
    const aVal = a[sortKey] as number;
    const bVal = b[sortKey] as number;
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  // 비교 토글
  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 비교용 레이더 차트 데이터
  const comparedCompanies = sector.companies.filter((c) => compareIds.includes(c.companyId));

  // 정규화 함수 (0~100 스케일)
  const normalize = (value: number, max: number) => Math.min((value / max) * 100, 100);

  const radarData = comparedCompanies.length >= 2
    ? [
        { metric: "PER (역수)", ...Object.fromEntries(comparedCompanies.map((c) => [c.companyName, normalize(100 / c.per, 20)])) },
        { metric: "PBR (역수)", ...Object.fromEntries(comparedCompanies.map((c) => [c.companyName, normalize(10 / c.pbr, 20)])) },
        { metric: "ROE", ...Object.fromEntries(comparedCompanies.map((c) => [c.companyName, normalize(c.roe, 80)])) },
        { metric: "배당수익률", ...Object.fromEntries(comparedCompanies.map((c) => [c.companyName, normalize(c.dividendYield, 5)])) },
        { metric: "수익성", ...Object.fromEntries(comparedCompanies.map((c) => [c.companyName, normalize(100 / c.evEbitda, 20)])) },
      ]
    : [];

  // 색상 팔레트
  const colors = ["hsl(var(--primary))", "#f97316", "#22c55e", "#8b5cf6"];

  // PER 비교 바차트 데이터
  const perChartData = sortedCompanies.map((c) => ({
    name: c.companyName,
    PER: c.per,
    평균: sector.averagePer,
  }));

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
          <h1 className="text-2xl font-bold">섹터 분석 & 동종업계 비교</h1>
          <p className="text-muted-foreground text-sm">
            같은 산업 내 기업들의 밸류에이션을 비교합니다
          </p>
        </div>
      </div>

      {/* 섹터 선택 */}
      <div className="flex gap-2">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSelectedSector(s.id);
              setCompareIds([]);
            }}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
              selectedSector === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted/50 hover:bg-muted"
            }`}
          >
            {s.name}
            <span className="text-xs ml-1 opacity-70">({s.companies.length})</span>
          </button>
        ))}
      </div>

      {/* 섹터 평균 지표 */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">평균 PER</p>
            <p className="text-xl font-bold">{sector.averagePer}x</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">평균 PBR</p>
            <p className="text-xl font-bold">{sector.averagePbr}x</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">평균 ROE</p>
            <p className="text-xl font-bold">{sector.averageRoe}%</p>
          </CardContent>
        </Card>
      </div>

      {/* PER 비교 차트 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            PER 비교 (섹터 평균: {sector.averagePer}x)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    backgroundColor: "hsl(var(--card))",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${Number(value).toFixed(1)}x`, ""]}
                />
                <Bar dataKey="PER" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="평균" fill="hsl(var(--muted-foreground))" radius={[4, 4, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 기업 비교 테이블 */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">기업별 상세 비교</CardTitle>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3 w-3" />
              정렬:
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (sortKey === key) setSortAsc(!sortAsc);
                    else { setSortKey(key); setSortAsc(true); }
                  }}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    sortKey === key ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  {sortLabels[key]} {sortKey === key && (sortAsc ? "↑" : "↓")}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">비교</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">기업명</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">PER</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">PBR</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">ROE</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">EV/EBITDA</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">배당률</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">부채비율</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompanies.map((c) => (
                  <tr key={c.companyId} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5">
                      <input
                        type="checkbox"
                        checked={compareIds.includes(c.companyId)}
                        onChange={() => toggleCompare(c.companyId)}
                        className="accent-primary"
                      />
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-medium">{c.companyName}</span>
                      <span className="text-xs text-muted-foreground ml-2">{c.ticker}</span>
                    </td>
                    <td className={`text-right px-4 py-2.5 tabular-nums ${c.per < sector.averagePer ? "text-red-500 font-medium" : ""}`}>
                      {c.per}x
                    </td>
                    <td className={`text-right px-4 py-2.5 tabular-nums ${c.pbr < sector.averagePbr ? "text-red-500 font-medium" : ""}`}>
                      {c.pbr}x
                    </td>
                    <td className={`text-right px-4 py-2.5 tabular-nums ${c.roe > sector.averageRoe ? "text-red-500 font-medium" : ""}`}>
                      {c.roe}%
                    </td>
                    <td className="text-right px-4 py-2.5 tabular-nums">{c.evEbitda}x</td>
                    <td className="text-right px-4 py-2.5 tabular-nums">{c.dividendYield}%</td>
                    <td className="text-right px-4 py-2.5 tabular-nums">{c.debtRatio}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 레이더 차트 (2개 이상 선택 시) */}
      {comparedCompanies.length >= 2 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">종합 비교 (레이더 차트)</CardTitle>
            <p className="text-xs text-muted-foreground">
              선택한 기업들의 주요 지표를 정규화하여 비교합니다 (높을수록 유리)
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  {comparedCompanies.map((c, idx) => (
                    <Radar
                      key={c.companyId}
                      name={c.companyName}
                      dataKey={c.companyName}
                      stroke={colors[idx % colors.length]}
                      fill={colors[idx % colors.length]}
                      fillOpacity={0.15}
                      strokeWidth={2}
                    />
                  ))}
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                      fontSize: "12px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {compareIds.length < 2 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              기업 2개 이상을 체크하면 <strong>레이더 차트</strong>로 종합 비교할 수 있습니다
            </p>
          </CardContent>
        </Card>
      )}

      {/* 학습 팁 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">💡 섹터 분석 팁</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>PER이 낮으면</strong> 이익 대비 주가가 저렴 → 저평가 가능성 (빨간색 강조)</li>
            <li><strong>ROE가 높으면</strong> 자기자본 대비 수익성이 우수 → 효율적인 경영</li>
            <li>같은 섹터 내에서 <strong>평균 대비 비교</strong>하는 것이 핵심입니다</li>
            <li>단일 지표만 보지 말고 <strong>종합적으로 판단</strong>하세요</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
