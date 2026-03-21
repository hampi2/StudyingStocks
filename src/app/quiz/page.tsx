"use client";

import Link from "next/link";
import { Trophy, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { quizzes } from "@/content/courses/quizzes";
import { courses } from "@/content/courses";
import { useProgressStore } from "@/lib/store";

// 퀴즈 목록 페이지
export default function QuizListPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">퀴즈</h1>
        <p className="text-muted-foreground">
          학습한 내용을 퀴즈로 확인해보세요. 각 레슨에 해당하는 퀴즈를 풀 수
          있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quizId={quiz.id} />
        ))}
      </div>
    </div>
  );
}

// 퀴즈 카드 컴포넌트
function QuizCard({ quizId }: { quizId: string }) {
  const quiz = quizzes.find((q) => q.id === quizId)!;
  const course = courses.find((c) => c.id === quiz.courseId);
  const getBestScore = useProgressStore((s) => s.getBestQuizScore);
  const bestResult = getBestScore(quizId);

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {course?.title || ""}
            </Badge>
            {bestResult && (
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                {bestResult.score}/{bestResult.total}
              </div>
            )}
          </div>
          <CardTitle className="text-base mt-2">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            {quiz.questions.length}개 문제
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
