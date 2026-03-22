"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getQuizById } from "@/content/courses/quizzes";
import { useProgressStore } from "@/lib/store";
import { useAI } from "@/lib/hooks";
import { markdownToHtml } from "@/lib/markdown";

// 퀴즈 풀기 페이지
export default function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quiz = getQuizById(id);

  if (!quiz) return notFound();

  return <QuizPlayer quiz={quiz} />;
}

// 퀴즈 플레이어 컴포넌트
function QuizPlayer({
  quiz,
}: {
  quiz: NonNullable<ReturnType<typeof getQuizById>>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const saveQuizResult = useProgressStore((s) => s.saveQuizResult);
  const { result: aiExplanation, isLoading: aiLoading, error: aiError, generate: aiGenerate, reset: aiReset } = useAI();
  const currentQuestion = quiz.questions[currentIndex];
  const progress =
    ((currentIndex + (isAnswered ? 1 : 0)) / quiz.questions.length) * 100;

  // 답 선택
  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === currentQuestion.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  // 다음 문제
  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      aiReset();
    } else {
      // 퀴즈 완료 - 결과 저장
      saveQuizResult({
        quizId: quiz.id,
        score: correctCount,
        total: quiz.questions.length,
        completedAt: new Date().toISOString(),
      });
      setIsFinished(true);
    }
  };

  // 다시 풀기
  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
    aiReset();
  };

  // 결과 화면
  if (isFinished) {
    const percentage = Math.round(
      (correctCount / quiz.questions.length) * 100
    );
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">퀴즈 완료!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">
                {correctCount}/{quiz.questions.length}
              </p>
              <p className="text-muted-foreground">정답률: {percentage}%</p>
            </div>

            <div className="text-lg">
              {percentage === 100 && (
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  완벽합니다! 모든 문제를 맞혔어요!
                </p>
              )}
              {percentage >= 70 && percentage < 100 && (
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  잘했어요! 조금만 더 복습하면 완벽해질 거예요.
                </p>
              )}
              {percentage < 70 && (
                <p className="text-orange-600 dark:text-orange-400 font-semibold">
                  레슨을 다시 읽어보고 도전해보세요!
                </p>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRetry} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                다시 풀기
              </Button>
              <Link href="/quiz" className={buttonVariants()}>
                퀴즈 목록으로
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* 뒤로가기 */}
      <Link
        href="/quiz"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4"
        )}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        퀴즈 목록
      </Link>

      {/* 퀴즈 제목 */}
      <h1 className="text-xl font-bold mb-4">{quiz.title}</h1>

      {/* 진행 바 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>
            {currentIndex + 1} / {quiz.questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* 문제 카드 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{currentQuestion.type}</Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 선택지 */}
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = index === selectedAnswer;

            let buttonStyle =
              "border-border hover:border-primary hover:bg-primary/5";
            if (isAnswered) {
              if (isCorrect) {
                buttonStyle =
                  "border-green-500 bg-green-50 dark:bg-green-950";
              } else if (isSelected && !isCorrect) {
                buttonStyle = "border-red-500 bg-red-50 dark:bg-red-950";
              } else {
                buttonStyle = "border-border opacity-50";
              }
            } else if (isSelected) {
              buttonStyle = "border-primary bg-primary/10";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
                  {!isAnswered && (
                    <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs font-medium shrink-0">
                      {index + 1}
                    </span>
                  )}
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            );
          })}

          {/* 해설 */}
          {isAnswered && (
            <div className="mt-4 p-4 rounded-lg bg-muted/50 border">
              <p className="text-sm font-medium mb-1">해설</p>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* AI 상세 해설 (오답일 때만) */}
          {isAnswered && selectedAnswer !== currentQuestion.correctIndex && (
            <div className="mt-2">
              {!aiExplanation && !aiLoading && !aiError && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    aiGenerate("/api/ai/quiz", {
                      question: currentQuestion.question,
                      options: currentQuestion.options,
                      correctIndex: currentQuestion.correctIndex,
                      selectedIndex: selectedAnswer,
                      explanation: currentQuestion.explanation,
                    })
                  }
                  className="gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  AI 상세 해설 보기
                </Button>
              )}
              {aiLoading && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI가 해설을 생성하고 있습니다...
                  </span>
                </div>
              )}
              {aiExplanation && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI 상세 해설
                  </p>
                  <div
                    className="text-sm text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(aiExplanation) }}
                  />
                </div>
              )}
              {aiError && (
                <p className="text-sm text-destructive">{aiError}</p>
              )}
            </div>
          )}

          {/* 다음 버튼 */}
          {isAnswered && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleNext}>
                {currentIndex < quiz.questions.length - 1 ? (
                  <>
                    다음 문제
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  "결과 보기"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
