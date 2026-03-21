import type { Course } from "@/types";
import { beginnerBasics } from "./beginner-basics";
import { beginnerInvestment } from "./beginner-investment";
import { intermediateTechnical } from "./intermediate-technical";
import { intermediateFundamental } from "./intermediate-fundamental";
import { advancedStrategy } from "./advanced-strategy";

// 전체 코스 배열
export const courses: Course[] = [
  beginnerBasics,
  beginnerInvestment,
  intermediateTechnical,
  intermediateFundamental,
  advancedStrategy,
];

// 모든 레슨을 평탄화하여 반환
export function getAllLessons() {
  return courses.flatMap((course) => course.lessons);
}

// ID로 코스 찾기
export function getCourseById(id: string) {
  return courses.find((course) => course.id === id);
}

// ID로 레슨 찾기
export function getLessonById(lessonId: string) {
  for (const course of courses) {
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course };
  }
  return undefined;
}
