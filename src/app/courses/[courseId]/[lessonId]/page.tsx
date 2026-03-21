"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getLessonById } from "@/content/courses/data";
import { getQuizByLessonId } from "@/content/courses/quizzes";
import { useProgressStore } from "@/lib/store";

// 레슨 상세 페이지
export default function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = use(params);
  const result = getLessonById(lessonId);

  if (!result || result.course.id !== courseId) return notFound();

  const { lesson, course } = result;
  const quiz = getQuizByLessonId(lessonId);

  // 이전/다음 레슨 구하기
  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* 뒤로가기 */}
      <Link
        href={`/courses/${courseId}`}
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-4")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        {course.title}
      </Link>

      {/* 레슨 헤더 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">
            {currentIndex + 1} / {course.lessons.length}
          </Badge>
          {lesson.market && (
            <Badge variant="secondary">
              {lesson.market === "BOTH"
                ? "한국 & 미국"
                : lesson.market === "KR"
                  ? "한국"
                  : "미국"}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <p className="text-muted-foreground mt-1">{lesson.description}</p>
      </div>

      <Separator className="mb-8" />

      {/* 레슨 본문 */}
      <article className="mb-8">
        <LessonContent content={lesson.content} />
      </article>

      <Separator className="my-8" />

      {/* 완료 버튼 & 퀴즈 링크 */}
      <LessonActions lessonId={lessonId} quizId={quiz?.id} />

      {/* 이전/다음 네비게이션 */}
      <div className="flex justify-between mt-8">
        {prevLesson ? (
          <Link
            href={`/courses/${courseId}/${prevLesson.id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href={`/courses/${courseId}/${nextLesson.id}`}
            className={buttonVariants()}
          >
            {nextLesson.title}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <Link
            href={`/courses/${courseId}`}
            className={buttonVariants({ variant: "outline" })}
          >
            코스 목록으로
          </Link>
        )}
      </div>
    </div>
  );
}

// 마크다운 테이블을 HTML 테이블로 변환
function parseMarkdownTable(tableText: string): string {
  const rows = tableText.trim().split("\n");
  if (rows.length < 2) return tableText;

  let html = '<table class="w-full border-collapse my-6 text-sm"><thead>';

  // 헤더 행 (첫 번째 줄)
  const headerCells = rows[0]
    .split("|")
    .filter(Boolean)
    .map((c) => c.trim());
  html += "<tr>";
  for (const cell of headerCells) {
    html += `<th class="border border-border bg-muted/50 px-4 py-2 text-left font-semibold">${cell}</th>`;
  }
  html += "</tr></thead><tbody>";

  // 데이터 행 (구분선 건너뛰고)
  for (let i = 2; i < rows.length; i++) {
    const cells = rows[i]
      .split("|")
      .filter(Boolean)
      .map((c) => c.trim());
    if (cells.length === 0) continue;
    html += "<tr>";
    for (const cell of cells) {
      html += `<td class="border border-border px-4 py-2">${cell}</td>`;
    }
    html += "</tr>";
  }

  html += "</tbody></table>";
  return html;
}

// 마크다운 콘텐츠를 HTML로 변환하여 렌더링
function LessonContent({ content }: { content: string }) {
  // 1단계: 테이블 블록을 먼저 추출하여 변환
  // 테이블 패턴: 연속된 | 로 시작하는 줄들
  let processed = content.replace(
    /((?:^\|.+\|$\n?){2,})/gm,
    (match) => parseMarkdownTable(match)
  );

  // 2단계: 나머지 마크다운 변환
  processed = processed
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, '<li class="mb-1 ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="mb-1 ml-4 list-decimal">$2</li>')
    .replace(
      /^> (.+)$/gm,
      '<blockquote class="border-l-4 border-primary/50 pl-4 py-2 my-4 bg-muted/50 rounded-r text-sm">$1</blockquote>'
    )
    .replace(/\n\n/g, '<div class="mb-4"></div>')
    .replace(/\n/g, "<br/>");

  return (
    <div
      className="leading-relaxed text-foreground"
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}

// 레슨 완료 및 퀴즈 액션 컴포넌트
function LessonActions({
  lessonId,
  quizId,
}: {
  lessonId: string;
  quizId?: string;
}) {
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const isCompleted = useProgressStore((s) => s.isLessonCompleted(lessonId));

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <Button
        onClick={() => completeLesson(lessonId)}
        variant={isCompleted ? "outline" : "default"}
        size="lg"
        disabled={isCompleted}
      >
        {isCompleted ? (
          <>
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
            학습 완료됨
          </>
        ) : (
          <>
            <CheckCircle2 className="h-5 w-5 mr-2" />
            학습 완료하기
          </>
        )}
      </Button>

      {quizId && (
        <Link
          href={`/quiz/${quizId}`}
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
        >
          <BookOpen className="h-5 w-5 mr-2" />
          퀴즈 풀기
        </Link>
      )}
    </div>
  );
}
