"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  useGamificationStore,
  useProgressStore,
  useTradingStore,
  useJournalStore,
  BADGES,
  getLevelTitle,
  getXpForLevel,
} from "@/lib/store";
import { Trophy, Flame, Star, Target, BookOpen, BarChart3, FileText } from "lucide-react";

export default function ProfilePage() {
  const gamification = useGamificationStore();
  const progress = useProgressStore();
  const trading = useTradingStore();
  const journal = useJournalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 방문 시 활동 기록
    gamification.recordActivity();
  }, []);

  if (!mounted) return null;

  const levelTitle = getLevelTitle(gamification.level);
  const xpNeeded = getXpForLevel(gamification.level);
  const levelProgress = gamification.getLevelProgress();

  // 통계
  const lessonsCompleted = progress.completedLessons.length;
  const quizzesCompleted = progress.quizResults.length;
  const tradesCompleted = trading.orders.length;
  const journalCount = journal.entries.length;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 프로필 헤더 */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-4xl">
          {gamification.level >= 10 ? "🏆" : gamification.level >= 5 ? "⭐" : "🌱"}
        </div>
        <div>
          <h1 className="text-2xl font-bold">레벨 {gamification.level}</h1>
          <p className="text-muted-foreground">{levelTitle}</p>
        </div>

        {/* XP 바 */}
        <div className="max-w-sm mx-auto space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>XP {gamification.xp} / {xpNeeded}</span>
            <span>{levelProgress}%</span>
          </div>
          <Progress value={levelProgress} className="h-3" />
        </div>
      </div>

      {/* 스트릭 & 요약 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-6 w-6 mx-auto mb-1 text-orange-500" />
            <p className="text-2xl font-bold">{gamification.streak}일</p>
            <p className="text-xs text-muted-foreground">연속 학습</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 mx-auto mb-1 text-blue-500" />
            <p className="text-2xl font-bold">{lessonsCompleted}</p>
            <p className="text-xs text-muted-foreground">완료 레슨</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto mb-1 text-green-500" />
            <p className="text-2xl font-bold">{quizzesCompleted}</p>
            <p className="text-xs text-muted-foreground">퀴즈 완료</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 mx-auto mb-1 text-purple-500" />
            <p className="text-2xl font-bold">{tradesCompleted}</p>
            <p className="text-xs text-muted-foreground">모의투자 거래</p>
          </CardContent>
        </Card>
      </div>

      {/* 상세 통계 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5" />
            학습 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">총 학습 일수</span>
              <span className="font-medium">{gamification.totalStudyDays}일</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">최장 연속 학습</span>
              <span className="font-medium">{gamification.streak}일</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">완료 레슨</span>
              <span className="font-medium">{lessonsCompleted}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">퀴즈 완료</span>
              <span className="font-medium">{quizzesCompleted}회</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">모의투자 거래</span>
              <span className="font-medium">{tradesCompleted}건</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">투자 일지</span>
              <span className="font-medium">{journalCount}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">획득 배지</span>
              <span className="font-medium">{gamification.earnedBadges.length} / {BADGES.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">총 경험치</span>
              <span className="font-medium">{gamification.xp + (gamification.level - 1) * 100} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 배지 컬렉션 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            배지 컬렉션
            <Badge variant="secondary" className="text-xs">
              {gamification.earnedBadges.length} / {BADGES.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {BADGES.map((badge) => {
              const earned = gamification.hasBadge(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-lg border p-3 text-center transition-colors ${
                    earned
                      ? "border-primary/50 bg-primary/5"
                      : "border-border opacity-40 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-1">{badge.icon}</div>
                  <p className="text-sm font-bold">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {badge.description}
                  </p>
                  {earned && (
                    <Badge className="mt-2 text-xs bg-primary/10 text-primary">
                      획득 완료
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* XP 획득 안내 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">💡 경험치 획득 방법</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>레슨 완료: +20 XP</li>
            <li>퀴즈 완료: +30 XP (만점 시 +50 XP)</li>
            <li>모의투자 거래: +10 XP</li>
            <li>투자 일지 작성: +15 XP</li>
            <li>매일 접속 (스트릭 유지): +5 XP</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
