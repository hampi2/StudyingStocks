"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgressStore, useTradingStore, useGamificationStore, useOnboardingStore, useJournalStore } from "@/lib/store";
import { useAI } from "@/lib/hooks";
import { markdownToHtml } from "@/lib/markdown";
import type { InvestorType } from "@/types";
import { courses } from "@/content/courses";
import { quizzes } from "@/content/courses/quizzes";
import type { LearningRecommendation } from "@/types";
import {
  Sparkles,
  BookOpen,
  Target,
  BarChart3,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  CheckCircle,
  Loader2,
} from "lucide-react";

/** 학습 추천 생성 로직 (로컬 + 투자성향 반영) */
function generateRecommendations(
  completedLessons: string[],
  quizResults: { quizId: string; score: number; total: number }[],
  tradeCount: number,
  investorType: InvestorType | null
): LearningRecommendation[] {
  const recs: LearningRecommendation[] = [];

  // 1. 완료하지 않은 레슨 추천
  for (const course of courses) {
    const incompleteLessons = course.lessons.filter(
      (l) => !completedLessons.includes(l.id)
    );
    if (incompleteLessons.length > 0) {
      const nextLesson = incompleteLessons[0];
      const total = course.lessons.length;
      const done = total - incompleteLessons.length;
      recs.push({
        type: "course",
        id: `/courses/${course.id}/${nextLesson.id}`,
        title: `${course.title} - ${nextLesson.title}`,
        reason: `${course.title} 코스 진행률 ${Math.round((done / total) * 100)}%. 다음 레슨을 이어서 학습하세요.`,
        priority: done === 0 ? "high" : "medium",
      });
    }
  }

  // 2. 퀴즈 약점 분석
  const quizScores: Record<string, { best: number; total: number }> = {};
  for (const r of quizResults) {
    const existing = quizScores[r.quizId];
    if (!existing || r.score / r.total > existing.best / existing.total) {
      quizScores[r.quizId] = { best: r.score, total: r.total };
    }
  }

  for (const quiz of quizzes) {
    const score = quizScores[quiz.id];
    if (!score) {
      // 아직 풀지 않은 퀴즈
      recs.push({
        type: "quiz",
        id: `/quiz/${quiz.id}`,
        title: `${quiz.title} 퀴즈 도전`,
        reason: "아직 풀어보지 않은 퀴즈입니다. 학습 내용을 점검해보세요!",
        priority: "medium",
      });
    } else if (score.best / score.total < 0.8) {
      // 80% 미만 → 재도전 추천
      recs.push({
        type: "quiz",
        id: `/quiz/${quiz.id}`,
        title: `${quiz.title} 재도전`,
        reason: `최고 점수 ${score.best}/${score.total} (${Math.round((score.best / score.total) * 100)}%). 80% 이상을 목표로 다시 도전해보세요!`,
        priority: "high",
      });
    }
  }

  // 3. 실습 추천
  if (tradeCount === 0) {
    recs.push({
      type: "practice",
      id: "/trading",
      title: "모의투자 시작하기",
      reason: "이론을 배웠으면 실전 연습이 중요합니다! 가상 자금으로 매매를 체험해보세요.",
      priority: "high",
    });
  }

  if (completedLessons.length >= 2 && !completedLessons.includes("chart-basics")) {
    recs.push({
      type: "practice",
      id: "/chart",
      title: "차트 뷰어로 실습",
      reason: "캔들차트와 기술적 지표를 직접 확인하며 학습 내용을 복습하세요.",
      priority: "medium",
    });
  }

  // 4. 투자 성향별 맞춤 추천
  if (investorType === "안정형") {
    recs.push({
      type: "practice",
      id: "/etf",
      title: "ETF 학습 (안정형 추천)",
      reason: "안정형 투자자에게 적합한 ETF 투자법을 배워보세요. 분산 투자의 기초를 다질 수 있습니다.",
      priority: "high",
    });
    recs.push({
      type: "practice",
      id: "/fundamental",
      title: "재무제표 분석 (안정형 추천)",
      reason: "기업의 안정성을 판단하는 핵심 능력! 재무제표 읽는 법을 익혀보세요.",
      priority: "medium",
    });
  } else if (investorType === "공격형") {
    recs.push({
      type: "practice",
      id: "/technical",
      title: "기술적 분석 (공격형 추천)",
      reason: "공격형 투자자에게 필수! 차트 분석과 기술적 지표 활용법을 마스터하세요.",
      priority: "high",
    });
    recs.push({
      type: "practice",
      id: "/pattern-game",
      title: "패턴 인식 게임 (공격형 추천)",
      reason: "트레이딩에 필요한 차트 패턴 인식 속도를 높여보세요.",
      priority: "medium",
    });
    recs.push({
      type: "practice",
      id: "/sentiment",
      title: "시장 심리 분석 (공격형 추천)",
      reason: "공포와 탐욕 지수를 활용한 매매 타이밍 판단법을 학습하세요.",
      priority: "medium",
    });
  } else {
    // 중립형 또는 미설정
    recs.push({
      type: "practice",
      id: "/fundamental",
      title: "재무제표 분석 실습",
      reason: "삼성전자와 애플의 재무제표를 비교 분석해보세요.",
      priority: "low",
    });
    recs.push({
      type: "practice",
      id: "/pattern-game",
      title: "패턴 인식 게임",
      reason: "차트 패턴을 빠르게 인식하는 연습을 해보세요.",
      priority: "low",
    });
  }

  // 5. 온보딩 미완료 시 추천
  if (!investorType) {
    recs.unshift({
      type: "practice",
      id: "/onboarding",
      title: "투자성향 테스트",
      reason: "나의 투자 성향을 알아보고 맞춤 학습 경로를 추천받으세요!",
      priority: "high",
    });
  }

  // 우선순위 정렬
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recs;
}

export default function RecommendPage() {
  const progress = useProgressStore();
  const trading = useTradingStore();
  const gamification = useGamificationStore();
  const onboarding = useOnboardingStore();
  const journal = useJournalStore();
  const { result: aiAnalysis, isLoading: aiLoading, error: aiError, generate: aiGenerate } = useAI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const recommendations = generateRecommendations(
    progress.completedLessons,
    progress.quizResults,
    trading.orders.length,
    onboarding.investorType
  );

  // 전체 학습 진행률
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // 퀴즈 평균 점수
  const quizAvg =
    progress.quizResults.length > 0
      ? Math.round(
          (progress.quizResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) /
            progress.quizResults.length)
        )
      : 0;

  // 아이콘 매핑
  const typeIcon = {
    course: <BookOpen className="h-5 w-5 text-blue-500" />,
    quiz: <Target className="h-5 w-5 text-green-500" />,
    practice: <BarChart3 className="h-5 w-5 text-purple-500" />,
  };

  const typeLabel = {
    course: "코스",
    quiz: "퀴즈",
    practice: "실습",
  };

  const priorityColor = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const priorityLabel = {
    high: "추천",
    medium: "보통",
    low: "참고",
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          맞춤 학습 추천
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          학습 현황을 분석하여 다음에 할 일을 추천합니다
        </p>
      </div>

      {/* 투자 성향 배너 */}
      {onboarding.investorType && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {onboarding.investorType === "안정형" ? "🛡️" : onboarding.investorType === "공격형" ? "🚀" : "⚖️"}
              </span>
              <div>
                <p className="text-sm font-bold">{onboarding.investorType} 투자자 맞춤 추천</p>
                <p className="text-xs text-muted-foreground">투자 성향에 맞는 학습 경로를 우선 추천합니다</p>
              </div>
            </div>
            <Link href="/onboarding">
              <Badge variant="secondary" className="text-xs cursor-pointer hover:bg-muted">
                재측정
              </Badge>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* 학습 현황 요약 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">전체 학습 진행률</span>
              <span className="text-sm font-bold">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} / {totalLessons} 레슨
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">퀴즈 평균 점수</span>
              <span className="text-sm font-bold">{quizAvg}%</span>
            </div>
            <Progress
              value={quizAvg}
              className={`h-2 ${quizAvg >= 80 ? "[&>div]:bg-green-500" : quizAvg >= 50 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500"}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {progress.quizResults.length}회 응시
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">학습 레벨</span>
              <span className="text-sm font-bold">Lv.{gamification.level}</span>
            </div>
            <Progress value={gamification.getLevelProgress()} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {gamification.streak}일 연속 학습 중
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI 맞춤 분석 */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI 맞춤 학습 분석
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!aiAnalysis && !aiLoading && !aiError && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">
                AI가 학습 데이터를 분석하여 맞춤형 가이드를 제공합니다
              </p>
              <Button
                onClick={() =>
                  aiGenerate("/api/ai/recommend", {
                    completedLessons: progress.completedLessons,
                    quizResults: progress.quizResults,
                    investorType: onboarding.investorType,
                    level: gamification.level,
                    streak: gamification.streak,
                    tradeCount: trading.orders.length,
                    journalCount: journal.entries.length,
                  })
                }
                className="gap-1.5"
              >
                <Sparkles className="h-4 w-4" />
                AI 분석 받기
              </Button>
            </div>
          )}
          {aiLoading && (
            <div className="flex items-center justify-center gap-2 py-6">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">AI가 분석 중입니다...</span>
            </div>
          )}
          {aiAnalysis && (
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(aiAnalysis) }}
            />
          )}
          {aiError && (
            <p className="text-sm text-destructive text-center py-4">{aiError}</p>
          )}
        </CardContent>
      </Card>

      {/* 추천 목록 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            추천 학습 목록
            <Badge variant="secondary" className="text-xs">{recommendations.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recommendations.map((rec, idx) => (
              <Link key={`${rec.type}-${rec.id}-${idx}`} href={rec.id}>
                <div className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors">
                  {/* 아이콘 */}
                  <div className="shrink-0">{typeIcon[rec.type]}</div>

                  {/* 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{rec.title}</p>
                      <Badge variant="secondary" className="text-xs">{typeLabel[rec.type]}</Badge>
                      <Badge className={`text-xs ${priorityColor[rec.priority]}`}>
                        {priorityLabel[rec.priority]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {rec.reason}
                    </p>
                  </div>

                  {/* 화살표 */}
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 완료 상태 */}
      {overallProgress === 100 && quizAvg >= 80 && (
        <Card className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-10 w-10 mx-auto mb-3 text-green-500" />
            <h3 className="text-lg font-bold">훌륭합니다!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              모든 코스를 완료하고 퀴즈 평균 80% 이상을 달성했습니다.
              <br />
              모의투자와 패턴 게임으로 실전 감각을 키워보세요!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
