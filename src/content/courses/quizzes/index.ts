import type { Quiz } from "@/types";
import { beginnerBasicsQuizzes } from "./beginner-basics";
import { beginnerInvestmentQuizzes } from "./beginner-investment";
import { intermediateTechnicalQuizzes } from "./intermediate-technical";
import { intermediateFundamentalQuizzes } from "./intermediate-fundamental";
import { advancedStrategyQuizzes } from "./advanced-strategy";

// 전체 퀴즈 배열 조합
export const quizzes: Quiz[] = [
  ...beginnerBasicsQuizzes,
  ...beginnerInvestmentQuizzes,
  ...intermediateTechnicalQuizzes,
  ...intermediateFundamentalQuizzes,
  ...advancedStrategyQuizzes,
];

// ID로 퀴즈 찾기
export function getQuizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}

// 레슨 ID로 퀴즈 찾기
export function getQuizByLessonId(lessonId: string) {
  return quizzes.find((quiz) => quiz.lessonId === lessonId);
}

// 코스 ID로 퀴즈 목록 가져오기
export function getQuizzesByCourseId(courseId: string) {
  return quizzes.filter((quiz) => quiz.courseId === courseId);
}
