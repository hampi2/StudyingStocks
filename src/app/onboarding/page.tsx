"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  onboardingQuestions,
  investorTypes,
  determineInvestorType,
} from "@/content/onboarding/data";
import { useOnboardingStore, useGamificationStore } from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/** 온보딩 투자성향 테스트 페이지 */
export default function OnboardingPage() {
  // 하이드레이션 패턴
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 현재 스텝 (0~5: 질문, 6: 결과)
  const [currentStep, setCurrentStep] = useState(0);
  // 각 질문별 선택한 옵션 인덱스
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // 스토어
  const onboardingStore = useOnboardingStore();
  const gamificationStore = useGamificationStore();

  // 이미 완료된 경우 결과 화면으로
  const isAlreadyCompleted = onboardingStore.isCompleted();

  /** 선택지 클릭 핸들러 */
  const handleSelect = useCallback(
    (questionId: string, optionIndex: number) => {
      const newAnswers = { ...answers, [questionId]: optionIndex };
      setAnswers(newAnswers);

      // 마지막 질문이면 결과 계산
      if (currentStep < onboardingQuestions.length - 1) {
        // 다음 질문으로 이동
        setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
      } else {
        // 결과 화면으로
        const investorType = determineInvestorType(newAnswers);
        onboardingStore.setResult(investorType, newAnswers);
        gamificationStore.addXp(30);
        gamificationStore.earnBadge("investor-explorer");
        setTimeout(() => setCurrentStep(onboardingQuestions.length), 300);
      }
    },
    [answers, currentStep, onboardingStore, gamificationStore]
  );

  /** 다시 테스트 핸들러 */
  const handleReset = useCallback(() => {
    onboardingStore.resetOnboarding();
    setAnswers({});
    setCurrentStep(0);
  }, [onboardingStore]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // 총 질문 수
  const totalQuestions = onboardingQuestions.length;
  // 진행률 (0~100)
  const progressValue = isAlreadyCompleted
    ? 100
    : Math.round((currentStep / totalQuestions) * 100);

  // 결과 화면 표시 여부
  const showResult = isAlreadyCompleted || currentStep >= totalQuestions;

  // 결과 데이터
  const resultType = onboardingStore.investorType;
  const resultData = resultType
    ? investorTypes.find((t) => t.type === resultType)
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">투자성향 테스트</h1>
        <p className="mt-2 text-muted-foreground">
          6개의 질문으로 나의 투자 성향을 알아보세요
        </p>
      </div>

      {/* 진행률 바 */}
      <div className="mb-8">
        <Progress value={progressValue}>
          <span className="text-sm text-muted-foreground">
            {showResult
              ? "완료!"
              : `${currentStep + 1} / ${totalQuestions}`}
          </span>
        </Progress>
      </div>

      {/* 질문 또는 결과 표시 */}
      {showResult && resultData ? (
        /* ===== 결과 화면 ===== */
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              {/* 성향 이모지 + 타이틀 */}
              <div className="mx-auto mb-2 text-6xl">{resultData.emoji}</div>
              <CardTitle className="text-2xl">{resultData.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 설명 */}
              <p className="text-center text-muted-foreground">
                {resultData.description}
              </p>

              {/* 위험 수용도 바 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>위험 수용도</span>
                  <Badge variant="secondary">
                    {resultData.riskLevel} / 5
                  </Badge>
                </div>
                <Progress value={resultData.riskLevel * 20} />
              </div>

              {/* 특징 목록 */}
              <div>
                <h3 className="mb-3 font-semibold">
                  <Sparkles className="mr-1.5 inline-block h-4 w-4" />
                  주요 특징
                </h3>
                <ul className="space-y-2">
                  {resultData.characteristics.map((char, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 추천 학습 경로 */}
              <div>
                <h3 className="mb-3 font-semibold">
                  <ArrowRight className="mr-1.5 inline-block h-4 w-4" />
                  추천 학습 경로
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resultData.recommendedPath.map((path) => (
                    <Link key={path.href} href={path.href}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                        {path.label}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 다시 테스트 버튼 */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              <RotateCcw className="h-4 w-4" />
              다시 테스트
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              학습 시작하기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* ===== 질문 화면 ===== */
        <div className="space-y-4">
          {onboardingQuestions.map((q, qIndex) => {
            if (qIndex !== currentStep) return null;
            return (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{q.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {q.options.map((option, oIndex) => {
                      const isSelected = answers[q.id] === oIndex;
                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleSelect(q.id, oIndex)}
                          className={`w-full rounded-lg border p-4 text-left text-sm transition-all hover:border-primary hover:bg-accent ${
                            isSelected
                              ? "border-primary bg-primary/10 font-medium"
                              : "border-border"
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
