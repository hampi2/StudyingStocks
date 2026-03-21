"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useVocabularyStore, useGamificationStore } from "@/lib/store";
import { glossaryTerms } from "@/content/glossary";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Layers,
  Trash2,
  CheckCircle2,
  Circle,
  RotateCcw,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { GlossaryTerm } from "@/types";

/** 모드 탭 */
type VocabMode = "list" | "flashcard";

/** 나만의 단어장 페이지 */
export default function VocabularyPage() {
  // 하이드레이션 패턴
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 현재 모드
  const [mode, setMode] = useState<VocabMode>("list");

  // 플래시카드 상태
  const [cardIndex, setCardIndex] = useState(0); // 현재 카드 인덱스
  const [isFlipped, setIsFlipped] = useState(false); // 뒤집힘 여부
  const [reviewedCount, setReviewedCount] = useState(0); // 복습 완료 수
  const [shuffledIds, setShuffledIds] = useState<string[]>([]); // 셔플된 termId 목록

  // 스토어
  const vocabStore = useVocabularyStore();
  const gamificationStore = useGamificationStore();

  /** 저장된 용어 데이터를 GlossaryTerm과 매핑 */
  const savedTermsWithData = useMemo(() => {
    return vocabStore.savedTerms
      .map((item) => {
        const termData = glossaryTerms.find((t) => t.id === item.termId);
        return termData ? { ...item, term: termData } : null;
      })
      .filter(Boolean) as (typeof vocabStore.savedTerms[number] & {
      term: GlossaryTerm;
    })[];
  }, [vocabStore.savedTerms]);

  /** 미암기 단어 목록 */
  const unmasteredTerms = useMemo(
    () => savedTermsWithData.filter((t) => !t.mastered),
    [savedTermsWithData]
  );

  /** 플래시카드 모드 시작 시 셔플 */
  const startFlashcards = useCallback(() => {
    const ids = unmasteredTerms.map((t) => t.termId);
    // Fisher-Yates 셔플
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffledIds(ids);
    setCardIndex(0);
    setIsFlipped(false);
    setReviewedCount(0);
  }, [unmasteredTerms]);

  /** 모드 전환 시 플래시카드 초기화 */
  useEffect(() => {
    if (mode === "flashcard") {
      startFlashcards();
    }
  }, [mode, startFlashcards]);

  /** 현재 플래시카드 데이터 */
  const currentFlashcard = useMemo(() => {
    if (shuffledIds.length === 0 || cardIndex >= shuffledIds.length) return null;
    const termId = shuffledIds[cardIndex];
    return savedTermsWithData.find((t) => t.termId === termId) ?? null;
  }, [shuffledIds, cardIndex, savedTermsWithData]);

  /** "알겠어요" 클릭 - 암기 완료 토글 + 다음 카드 */
  const handleMastered = useCallback(() => {
    if (!currentFlashcard) return;
    vocabStore.toggleMastered(currentFlashcard.termId);
    vocabStore.markReviewed(currentFlashcard.termId);
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);

    if (cardIndex < shuffledIds.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else {
      // 복습 완료 - XP 획득
      gamificationStore.addXp(5);
      setCardIndex(shuffledIds.length); // 완료 상태
    }
  }, [currentFlashcard, vocabStore, gamificationStore, cardIndex, shuffledIds.length]);

  /** "다시 보기" 클릭 - 다음 카드로만 이동 */
  const handleRetry = useCallback(() => {
    if (!currentFlashcard) return;
    vocabStore.markReviewed(currentFlashcard.termId);
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);

    if (cardIndex < shuffledIds.length - 1) {
      setCardIndex((prev) => prev + 1);
    } else {
      // 복습 완료 - XP 획득
      gamificationStore.addXp(5);
      setCardIndex(shuffledIds.length); // 완료 상태
    }
  }, [currentFlashcard, vocabStore, gamificationStore, cardIndex, shuffledIds.length]);

  if (!mounted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // 빈 상태
  if (savedTermsWithData.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">나만의 단어장</h1>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              아직 저장된 단어가 없습니다
            </p>
            <p className="text-sm text-muted-foreground">
              용어 사전에서 단어를 저장해보세요
            </p>
            <Link
              href="/glossary"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              용어 사전으로 이동
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* 헤더 */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">나만의 단어장</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          저장한 용어 {savedTermsWithData.length}개 · 암기 완료{" "}
          {savedTermsWithData.filter((t) => t.mastered).length}개
        </p>
      </div>

      {/* 모드 탭 */}
      <div className="mb-6 flex justify-center gap-2">
        <button
          onClick={() => setMode("list")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "list"
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-accent"
          }`}
        >
          <Layers className="h-4 w-4" />
          단어 목록
        </button>
        <button
          onClick={() => setMode("flashcard")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            mode === "flashcard"
              ? "bg-primary text-primary-foreground"
              : "border border-border hover:bg-accent"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          플래시카드
        </button>
      </div>

      {/* ===== 단어 목록 모드 ===== */}
      {mode === "list" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {savedTermsWithData.map(({ termId, mastered, term }) => (
            <Card key={termId} className={mastered ? "opacity-60" : ""}>
              <CardHeader className="flex-row items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base">
                    {term.termKo}
                  </CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {term.termEn}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {/* 암기 완료 토글 */}
                  <button
                    onClick={() => vocabStore.toggleMastered(termId)}
                    className={`rounded-md p-1.5 transition-colors ${
                      mastered
                        ? "text-primary hover:text-primary/80"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title={mastered ? "암기 취소" : "암기 완료"}
                  >
                    {mastered ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </button>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => vocabStore.removeTerm(termId)}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive"
                    title="삭제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {term.definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ===== 플래시카드 모드 ===== */}
      {mode === "flashcard" && (
        <div className="mx-auto max-w-lg">
          {/* 미암기 단어가 없는 경우 */}
          {unmasteredTerms.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-4 py-12">
                <Sparkles className="h-12 w-12 text-primary" />
                <p className="text-lg font-semibold">모든 단어를 암기했습니다!</p>
                <p className="text-sm text-muted-foreground">
                  단어 목록에서 암기 상태를 초기화할 수 있습니다
                </p>
              </CardContent>
            </Card>
          ) : cardIndex >= shuffledIds.length ? (
            /* 복습 완료 */
            <Card>
              <CardContent className="flex flex-col items-center gap-4 py-12">
                <Sparkles className="h-12 w-12 text-primary" />
                <p className="text-lg font-semibold">복습 완료! +5 XP</p>
                <p className="text-sm text-muted-foreground">
                  {reviewedCount}개의 단어를 복습했습니다
                </p>
                <button
                  onClick={startFlashcards}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <RotateCcw className="h-4 w-4" />
                  다시 복습하기
                </button>
              </CardContent>
            </Card>
          ) : currentFlashcard ? (
            /* 플래시카드 */
            <div className="space-y-4">
              {/* 진행률 */}
              <div className="space-y-1">
                <Progress
                  value={Math.round(
                    (cardIndex / shuffledIds.length) * 100
                  )}
                >
                  <span className="text-sm text-muted-foreground">
                    {cardIndex + 1} / {shuffledIds.length}
                  </span>
                </Progress>
              </div>

              {/* 카드 */}
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full text-left"
              >
                <Card className="min-h-[240px] cursor-pointer transition-all hover:ring-2 hover:ring-primary/50">
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    {!isFlipped ? (
                      /* 앞면: 용어 */
                      <div className="text-center">
                        <Badge variant="secondary" className="mb-4">
                          {currentFlashcard.term.category}
                        </Badge>
                        <h2 className="text-2xl font-bold">
                          {currentFlashcard.term.termKo}
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                          {currentFlashcard.term.termEn}
                        </p>
                        <p className="mt-6 text-xs text-muted-foreground">
                          탭하여 뜻 확인
                        </p>
                      </div>
                    ) : (
                      /* 뒷면: 뜻 + 예시 */
                      <div className="text-center">
                        <p className="text-base leading-relaxed">
                          {currentFlashcard.term.definition}
                        </p>
                        {currentFlashcard.term.example && (
                          <p className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                            💡 {currentFlashcard.term.example}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </button>

              {/* 액션 버튼 (뒤집힌 상태에서만) */}
              {isFlipped && (
                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
                  >
                    <RotateCcw className="h-4 w-4" />
                    다시 보기
                  </button>
                  <button
                    onClick={handleMastered}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    알겠어요
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
