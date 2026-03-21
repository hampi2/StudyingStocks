"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/lib/store";
import type { Course } from "@/types";

// 난이도별 색상
const levelColors: Record<string, string> = {
  초급: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  중급: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  고급: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// 코스 카드 컴포넌트
export function CourseCard({ course }: { course: Course }) {
  const getCourseProgress = useProgressStore((s) => s.getCourseProgress);
  const lessonIds = course.lessons.map((l) => l.id);
  const progress = getCourseProgress(lessonIds);

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className={levelColors[course.level]}>
              {course.level}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {course.lessons.length}개 레슨
            </span>
          </div>
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {course.description}
          </CardDescription>
          {/* 진행률 표시 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>진행률</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
