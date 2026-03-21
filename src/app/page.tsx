"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BookOpen,
  BarChart3,
  Trophy,
  GraduationCap,
  TrendingUp,
  Globe,
  Compass,
} from "lucide-react";
import { useOnboardingStore } from "@/lib/store";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { courses } from "@/content/courses/data";

// 주요 기능 카드 데이터
const features = [
  {
    icon: BookOpen,
    title: "단계별 학습 코스",
    description:
      "초급부터 고급까지, 체계적인 커리큘럼으로 주식투자의 기초부터 심화까지 배울 수 있습니다.",
  },
  {
    icon: GraduationCap,
    title: "인터랙티브 용어 사전",
    description:
      "한글·영문 주식 용어를 카테고리별로 정리. 검색으로 빠르게 찾고, 예시와 함께 이해할 수 있습니다.",
  },
  {
    icon: Trophy,
    title: "퀴즈로 실력 확인",
    description:
      "각 레슨마다 퀴즈로 학습 내용을 점검. 즉시 피드백과 해설로 부족한 부분을 보완하세요.",
  },
  {
    icon: Globe,
    title: "한국 & 미국 시장",
    description:
      "코스피/코스닥과 NYSE/NASDAQ를 비교하며 배웁니다. 글로벌 투자의 기초를 다질 수 있습니다.",
  },
];

// 난이도별 색상
const levelColors: Record<string, string> = {
  초급: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  중급: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  고급: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

// 랜딩 페이지
export default function Home() {
  const { isCompleted } = useOnboardingStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const onboardingDone = mounted && isCompleted();

  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <TrendingUp className="h-10 w-10 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              StudyingStocks
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
            주식투자를 체계적으로 배우는 가장 좋은 방법.
            <br />
            초보부터 고수까지, <strong>한국과 미국 주식시장</strong>을 단계별로
            학습하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!onboardingDone ? (
              <>
                <Link
                  href="/onboarding"
                  className={cn(buttonVariants({ size: "lg" }), "text-base")}
                >
                  <Compass className="h-5 w-5 mr-2" />
                  투자성향 알아보기
                </Link>
                <Link
                  href="/courses"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-base"
                  )}
                >
                  바로 학습 시작
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/courses"
                  className={cn(buttonVariants({ size: "lg" }), "text-base")}
                >
                  학습 시작하기
                </Link>
                <Link
                  href="/marathon"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "text-base"
                  )}
                >
                  학습 마라톤 보기
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            왜 StudyingStocks인가?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 학습 코스 미리보기 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            학습 코스
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            난이도별로 정리된 코스를 선택하고 학습을 시작하세요.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <Card className="h-full transition-shadow hover:shadow-lg cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className={levelColors[course.level]}
                      >
                        {course.level}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {course.lessons.length}개 레슨
                      </span>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{course.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/courses"
              className={buttonVariants({ variant: "outline" })}
            >
              모든 코스 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            무료로 제공되는 학습 코스와 퀴즈로 주식투자의 기초를 다져보세요.
          </p>
          <Link
            href="/courses"
            className={buttonVariants({ size: "lg" })}
          >
            무료 학습 시작
          </Link>
        </div>
      </section>
    </div>
  );
}
