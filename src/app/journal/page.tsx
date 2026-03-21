"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJournalStore, useGamificationStore } from "@/lib/store";
import type { EmotionTag } from "@/types";
import { BookOpen, Plus, Trash2, Filter, X } from "lucide-react";

/** 감정 태그 정보 */
const emotionOptions: { value: EmotionTag; label: string; color: string }[] = [
  { value: "확신", label: "확신", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
  { value: "냉정", label: "냉정", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { value: "만족", label: "만족", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { value: "불안", label: "불안", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
  { value: "탐욕", label: "탐욕", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  { value: "공포", label: "공포", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  { value: "후회", label: "후회", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
];

const actionOptions = ["매수", "매도", "관망"] as const;

export default function JournalPage() {
  const { entries, addEntry, deleteEntry, getEmotionStats } = useJournalStore();
  const { addXp, earnBadge } = useGamificationStore();
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filterEmotion, setFilterEmotion] = useState<EmotionTag | "전체">("전체");

  // 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState<EmotionTag>("냉정");
  const [stockName, setStockName] = useState("");
  const [action, setAction] = useState<"매수" | "매도" | "관망">("관망");
  const [lesson, setLesson] = useState("");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // 일지 저장
  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !lesson.trim()) return;

    addEntry({
      date: new Date().toISOString().split("T")[0],
      title: title.trim(),
      content: content.trim(),
      emotion,
      stockName: stockName.trim() || undefined,
      action,
      lesson: lesson.trim(),
    });

    // 게이미피케이션 보상
    addXp(15);
    earnBadge("journal-first");
    if (entries.length + 1 >= 5) earnBadge("journal-5");

    // 폼 리셋
    setTitle("");
    setContent("");
    setEmotion("냉정");
    setStockName("");
    setAction("관망");
    setLesson("");
    setShowForm(false);
  };

  // 필터 적용
  const filtered = filterEmotion === "전체"
    ? entries
    : entries.filter((e) => e.emotion === filterEmotion);

  // 감정 통계
  const stats = getEmotionStats();

  // 날짜 포맷
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 감정 색상 가져오기
  const getEmotionColor = (em: EmotionTag) =>
    emotionOptions.find((o) => o.value === em)?.color ?? "";

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">투자 일지</h1>
          <p className="text-muted-foreground text-sm">
            매매를 복기하고 교훈을 기록하세요
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? <X className="h-4 w-4 mr-1" /> : <Plus className="h-4 w-4 mr-1" />}
          {showForm ? "닫기" : "새 일지"}
        </Button>
      </div>

      {/* 감정 통계 */}
      {entries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {emotionOptions.map((opt) => (
            <Badge
              key={opt.value}
              className={`${opt.color} cursor-pointer`}
              onClick={() => setFilterEmotion(filterEmotion === opt.value ? "전체" : opt.value)}
            >
              {opt.label} {stats[opt.value] || 0}
              {filterEmotion === opt.value && " ✓"}
            </Badge>
          ))}
          {filterEmotion !== "전체" && (
            <button
              onClick={() => setFilterEmotion("전체")}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              필터 해제
            </button>
          )}
        </div>
      )}

      {/* 작성 폼 */}
      {showForm && (
        <Card className="border-primary/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">새 투자 일지 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 제목 */}
            <div>
              <label className="text-sm font-medium mb-1 block">제목 *</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: 삼성전자 매수 복기"
              />
            </div>

            {/* 감정 태그 */}
            <div>
              <label className="text-sm font-medium mb-1 block">매매 당시 감정 *</label>
              <div className="flex flex-wrap gap-2">
                {emotionOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setEmotion(opt.value)}
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                      emotion === opt.value
                        ? `${opt.color} ring-2 ring-offset-1 ring-primary/50`
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 종목 & 행동 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">관련 종목</label>
                <Input
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  placeholder="예: 삼성전자"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">매매 행동</label>
                <div className="flex gap-2">
                  {actionOptions.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAction(a)}
                      className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
                        action === a
                          ? a === "매수"
                            ? "bg-red-500 text-white"
                            : a === "매도"
                            ? "bg-blue-500 text-white"
                            : "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div>
              <label className="text-sm font-medium mb-1 block">복기 내용 *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="왜 이 결정을 했는지, 어떤 분석을 했는지 적어보세요..."
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* 교훈 */}
            <div>
              <label className="text-sm font-medium mb-1 block">배운 점 / 교훈 *</label>
              <textarea
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                placeholder="이 경험에서 얻은 교훈이나 다음에 적용할 원칙을 적어보세요..."
                className="w-full rounded-lg border bg-background px-3 py-2 text-sm min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* 저장 버튼 */}
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || !content.trim() || !lesson.trim()}
              className="w-full"
            >
              일지 저장 (+15 XP)
            </Button>
          </CardContent>
        </Card>
      )}

      {/* 일지 목록 */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-sm">
              {entries.length === 0
                ? "아직 작성된 일지가 없습니다. 첫 투자 일지를 작성해보세요!"
                : "해당 감정 태그의 일지가 없습니다."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4 space-y-3">
                {/* 헤더 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold">{entry.title}</h3>
                    <Badge className={getEmotionColor(entry.emotion)}>
                      {entry.emotion}
                    </Badge>
                    {entry.action && (
                      <Badge variant="secondary" className="text-xs">
                        {entry.action}
                      </Badge>
                    )}
                    {entry.stockName && (
                      <Badge variant="secondary" className="text-xs">
                        {entry.stockName}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.createdAt)}
                    </span>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* 본문 */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>

                {/* 교훈 */}
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs font-bold text-primary mb-1">💡 배운 점</p>
                  <p className="text-sm">{entry.lesson}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 학습 팁 */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <p className="text-sm font-bold mb-2">💡 투자 일지 작성 팁</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li><strong>감정을 솔직하게</strong> 기록하세요. 감정이 매매에 미치는 영향을 인식하는 것이 첫 걸음입니다</li>
            <li><strong>왜 그 결정을 했는지</strong> 구체적으로 적으세요 (뉴스? 차트 신호? 직감?)</li>
            <li><strong>결과와 무관하게</strong> 과정을 평가하세요. 좋은 결정이 나쁜 결과를 낼 수도 있습니다</li>
            <li>일주일에 최소 1회 일지를 정리하면 투자 실력이 빠르게 향상됩니다</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
