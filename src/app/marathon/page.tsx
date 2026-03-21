"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { marathonCheckpoints } from "@/content/marathon/checkpoints";
import {
  useProgressStore,
  useTradingStore,
  useJournalStore,
  useGamificationStore,
  useOnboardingStore,
  useVocabularyStore,
} from "@/lib/store";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  MapPin,
  Trophy,
  Flag,
} from "lucide-react";

/** 학습 마라톤 페이지 */
export default function MarathonPage() {
  // 하이드레이션 패턴
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 스토어
  const onboardingStore = useOnboardingStore();
  const progressStore = useProgressStore();
  const tradingStore = useTradingStore();
  const journalStore = useJournalStore();
  const vocabStore = useVocabularyStore();

  /** 개별 체크포인트 완료 여부 판별 */
  const checkpointStatuses = useMemo(() => {
    // 결과 맵: checkpointId -> boolean
    const statuses: Record<string, boolean> = {};

    // 먼저 "always"와 "all-complete" 이외의 것들을 계산
    for (const cp of marathonCheckpoints) {
      const check = cp.completionCheck;

      if (check === "onboarding-complete") {
        statuses[cp.id] = onboardingStore.isCompleted();
      } else if (check.startsWith("lesson-")) {
        // "lesson-what-is-stock" -> lessonId = "what-is-stock"
        const lessonId = check.replace("lesson-", "");
        statuses[cp.id] = progressStore.isLessonCompleted(lessonId);
      } else if (check === "quiz-first") {
        statuses[cp.id] = progressStore.quizResults.length > 0;
      } else if (check === "first-trade") {
        statuses[cp.id] = tradingStore.orders.length > 0;
      } else if (check === "journal-5") {
        statuses[cp.id] = journalStore.entries.length >= 5;
      } else if (check === "vocabulary-10") {
        statuses[cp.id] = vocabStore.getSavedCount() >= 10;
      } else if (check.endsWith("-visited")) {
        // 방문 추적은 미구현 - 항상 false
        statuses[cp.id] = false;
      } else if (check === "always" || check === "all-complete") {
        // 나중에 계산
        statuses[cp.id] = false;
      } else {
        // 알 수 없는 체크 - false
        statuses[cp.id] = false;
      }
    }

    // "always": 이전 체크포인트가 모두 완료되었으면 true
    for (let i = 0; i < marathonCheckpoints.length; i++) {
      const cp = marathonCheckpoints[i];
      if (cp.completionCheck === "always") {
        const allPrevious = marathonCheckpoints
          .slice(0, i)
          .every((prev) => statuses[prev.id]);
        statuses[cp.id] = allPrevious;
      }
    }

    // "all-complete": 모든 다른 체크포인트가 완료
    for (const cp of marathonCheckpoints) {
      if (cp.completionCheck === "all-complete") {
        const allOthers = marathonCheckpoints
          .filter((other) => other.id !== cp.id)
          .every((other) => statuses[other.id]);
        statuses[cp.id] = allOthers;
      }
    }

    return statuses;
  }, [onboardingStore, progressStore, tradingStore, journalStore, vocabStore]);

  /** 완료된 체크포인트 수 */
  const completedCount = useMemo(
    () => Object.values(checkpointStatuses).filter(Boolean).length,
    [checkpointStatuses]
  );

  /** 현재 진행 거리 계산 (마지막 완료된 체크포인트의 km) */
  const currentKm = useMemo(() => {
    let maxKm = 0;
    for (const cp of marathonCheckpoints) {
      if (checkpointStatuses[cp.id]) {
        maxKm = Math.max(maxKm, cp.km);
      }
    }
    return maxKm;
  }, [checkpointStatuses]);

  /** 완주율 (%) */
  const completionRate = Math.round(
    (completedCount / marathonCheckpoints.length) * 100
  );

  /** 현재 위치 체크포인트 (첫 번째 미완료 체크포인트) */
  const currentCheckpointId = useMemo(() => {
    for (const cp of marathonCheckpoints) {
      if (!checkpointStatuses[cp.id]) {
        return cp.id;
      }
    }
    return null; // 모두 완료
  }, [checkpointStatuses]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* 헤더 */}
      <div className="mb-6 text-center">
        <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Trophy className="h-6 w-6 text-primary" />
          학습 마라톤
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          투자 학습의 42.195km를 달려보세요
        </p>
      </div>

      {/* 진행률 + 거리 */}
      <div className="mb-8 rounded-xl border bg-card p-4">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">완주율</span>
          <span className="tabular-nums text-muted-foreground">
            {currentKm.toFixed(1)}km / 42.195km
          </span>
        </div>
        <Progress value={completionRate}>
          <span className="text-sm font-medium text-muted-foreground">
            {completionRate}%
          </span>
        </Progress>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>
            {completedCount} / {marathonCheckpoints.length} 체크포인트
          </span>
          {completionRate === 100 && (
            <Badge variant="default">완주!</Badge>
          )}
        </div>
      </div>

      {/* 마라톤 트랙 (세로 타임라인) */}
      <div className="relative">
        {/* 세로선 */}
        <div className="absolute left-5 top-0 h-full w-0.5 bg-border" />

        <div className="space-y-0">
          {marathonCheckpoints.map((cp, index) => {
            const isCompleted = checkpointStatuses[cp.id]; // 완료 여부
            const isCurrent = cp.id === currentCheckpointId; // 현재 위치
            const isMilestone = cp.type === "milestone"; // 마일스톤 여부

            // 원형 마커 크기
            const markerSize = isMilestone ? "h-10 w-10" : "h-8 w-8";

            // 원형 마커 스타일
            let markerClass: string;
            if (isCompleted) {
              markerClass = "bg-primary text-primary-foreground";
            } else if (isCurrent) {
              markerClass =
                "bg-background text-primary ring-2 ring-primary animate-pulse";
            } else {
              markerClass = "bg-muted text-muted-foreground";
            }

            // 아이콘
            const MarkerIcon = () => {
              if (isCompleted) {
                return <Check className={isMilestone ? "h-5 w-5" : "h-4 w-4"} />;
              }
              if (isMilestone) {
                return <Star className={isMilestone ? "h-5 w-5" : "h-4 w-4"} />;
              }
              if (isCurrent) {
                return <MapPin className="h-4 w-4" />;
              }
              return <Flag className="h-3.5 w-3.5" />;
            };

            return (
              <div key={cp.id} className="relative flex gap-4 pb-6">
                {/* 원형 마커 */}
                <div className="relative z-10 flex shrink-0 items-start justify-center">
                  <div
                    className={`flex items-center justify-center rounded-full ${markerSize} ${markerClass} ${
                      isMilestone ? "ring-1 ring-foreground/10" : ""
                    }`}
                  >
                    <MarkerIcon />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <Link
                  href={cp.linkedRoute}
                  className={`group flex-1 rounded-lg border p-3 transition-all hover:border-primary/50 hover:bg-accent/50 ${
                    isCurrent ? "border-primary/30 bg-accent/30" : ""
                  } ${isCompleted ? "opacity-80" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      {/* km 표시 + 라벨 */}
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={isCompleted ? "default" : "secondary"}
                          className="shrink-0 text-xs"
                        >
                          {cp.km}km
                        </Badge>
                        <span
                          className={`text-sm font-medium ${
                            isCompleted ? "line-through opacity-60" : ""
                          }`}
                        >
                          {cp.label}
                        </span>
                      </div>
                      {/* 설명 */}
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {cp.description}
                      </p>
                    </div>
                    {/* 유형 배지 */}
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {cp.type === "milestone"
                        ? "마일스톤"
                        : cp.type === "lesson"
                          ? "레슨"
                          : cp.type === "quiz"
                            ? "퀴즈"
                            : "실습"}
                    </Badge>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
