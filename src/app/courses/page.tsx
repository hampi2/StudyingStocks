"use client";

import { useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { courses } from "@/content/courses";
import { Button } from "@/components/ui/button";
import type { Level } from "@/types";

// 필터 옵션
const levels: (Level | "전체")[] = ["전체", "초급", "중급", "고급"];

// 코스 목록 페이지
export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level | "전체">("전체");

  // 필터링된 코스 목록
  const filteredCourses =
    selectedLevel === "전체"
      ? courses
      : courses.filter((c) => c.level === selectedLevel);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">학습 코스</h1>
        <p className="text-muted-foreground">
          단계별로 정리된 코스를 선택하고 주식투자를 배워보세요.
        </p>
      </div>

      {/* 난이도 필터 */}
      <div className="flex gap-2 mb-8">
        {levels.map((level) => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </Button>
        ))}
      </div>

      {/* 코스 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          해당 난이도의 코스가 없습니다.
        </p>
      )}
    </div>
  );
}
