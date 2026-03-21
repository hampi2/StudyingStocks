"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getCourseById } from "@/content/courses";
import { getQuizzesByCourseId } from "@/content/courses/quizzes";
import { useProgressStore } from "@/lib/store";

// 난이도별 색상
const levelColors: Record<string, string> = {
  초급: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  중급: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  고급: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// 코스 상세 페이지
export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const course = getCourseById(courseId);

  if (!course) return notFound();

  const quizzes = getQuizzesByCourseId(course.id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* 뒤로가기 */}
      <Link
        href="/courses"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        코스 목록
      </Link>

      {/* 코스 헤더 */}
      <div className="mb-8">
        <Badge variant="secondary" className={levelColors[course.level]}>
          {course.level}
        </Badge>
        <h1 className="text-3xl font-bold mt-2 mb-2">{course.title}</h1>
        <p className="text-muted-foreground">{course.description}</p>
      </div>

      {/* 진행률 */}
      <CourseProgressSection lessonIds={course.lessons.map((l) => l.id)} />

      <Separator className="my-8" />

      {/* 레슨 목록 */}
      <h2 className="text-xl font-semibold mb-4">
        레슨 목록 ({course.lessons.length}개)
      </h2>
      <div className="space-y-3">
        {course.lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            lessonId={lesson.id}
            courseId={course.id}
            title={lesson.title}
            description={lesson.description}
            order={index + 1}
            hasQuiz={quizzes.some((q) => q.lessonId === lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}

// 코스 진행률 섹션
function CourseProgressSection({ lessonIds }: { lessonIds: string[] }) {
  const getCourseProgress = useProgressStore((s) => s.getCourseProgress);
  const progress = getCourseProgress(lessonIds);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">학습 진행률</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Progress value={progress} className="flex-1 h-3" />
          <span className="text-sm font-semibold">{progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
}

// 레슨 항목 컴포넌트
function LessonItem({
  lessonId,
  courseId,
  title,
  description,
  order,
  hasQuiz,
}: {
  lessonId: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  hasQuiz: boolean;
}) {
  const isCompleted = useProgressStore((s) => s.isLessonCompleted(lessonId));

  return (
    <Link href={`/courses/${courseId}/${lessonId}`}>
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardContent className="flex items-center gap-4 py-4">
          {/* 완료 상태 아이콘 */}
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground shrink-0" />
          )}

          {/* 레슨 번호 */}
          <span className="text-lg font-bold text-muted-foreground w-8">
            {order}
          </span>

          {/* 레슨 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {description}
            </p>
          </div>

          {/* 퀴즈 배지 */}
          {hasQuiz && (
            <Badge variant="outline" className="shrink-0">
              퀴즈
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
