"use client";

import { useState, useEffect } from "react";
import { Search, Bookmark, BookmarkCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { glossaryTerms, searchTerms } from "@/content/glossary/data";
import { useVocabularyStore, useGamificationStore } from "@/lib/store";
import type { GlossaryCategory } from "@/types";

// 카테고리 목록
const categories: (GlossaryCategory | "전체")[] = [
  "전체",
  "기본",
  "기술적분석",
  "기본적분석",
  "파생상품",
  "시장구조",
];

// 카테고리 한글 표시
const categoryLabels: Record<string, string> = {
  전체: "전체",
  기본: "기본",
  기술적분석: "기술적 분석",
  기본적분석: "기본적 분석",
  파생상품: "파생상품",
  시장구조: "시장 구조",
};

// 카테고리별 색상
const categoryColors: Record<string, string> = {
  기본: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  기술적분석: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  기본적분석: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  파생상품: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  시장구조: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
};

// 용어 사전 페이지
export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    GlossaryCategory | "전체"
  >("전체");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { saveTerm, removeTerm, isSaved, getSavedCount } = useVocabularyStore();
  const { addXp, earnBadge } = useGamificationStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 단어장 저장/삭제 토글
  const handleToggleSave = (e: React.MouseEvent, termId: string) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    if (isSaved(termId)) {
      removeTerm(termId);
    } else {
      saveTerm(termId);
      addXp(2);
      // 10개 저장 시 배지
      if (getSavedCount() + 1 >= 10) earnBadge("vocab-10");
    }
  };

  // 검색 + 카테고리 필터링
  const searchResults = searchTerms(searchQuery);
  const filteredTerms =
    selectedCategory === "전체"
      ? searchResults
      : searchResults.filter((t) => t.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">용어 사전</h1>
        <p className="text-muted-foreground">
          주식투자에 필요한 핵심 용어를 한글·영문으로 검색하고 배워보세요.
        </p>
      </div>

      {/* 검색바 */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="용어 검색 (한글 또는 영문)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {categoryLabels[cat]}
          </Button>
        ))}
      </div>

      {/* 결과 수 */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredTerms.length}개의 용어
      </p>

      {/* 용어 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((term) => (
          <Card
            key={term.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
            onClick={() =>
              setExpandedId(expandedId === term.id ? null : term.id)
            }
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{term.termKo}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {term.termEn}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {/* 단어장 저장 버튼 */}
                  {mounted && (
                    <button
                      onClick={(e) => handleToggleSave(e, term.id)}
                      className={`p-1 rounded transition-colors ${
                        isSaved(term.id)
                          ? "text-primary hover:text-primary/80"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      title={isSaved(term.id) ? "단어장에서 제거" : "단어장에 저장"}
                    >
                      {isSaved(term.id) ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  )}
                  <Badge
                    variant="secondary"
                    className={`text-xs ${categoryColors[term.category] || ""}`}
                  >
                    {categoryLabels[term.category]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {term.definition}
              </CardDescription>

              {/* 펼쳐진 상태: 예시 표시 */}
              {expandedId === term.id && term.example && (
                <div className="mt-3 p-3 rounded-md bg-muted/50 text-sm">
                  <span className="font-medium">예시: </span>
                  {term.example}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg mb-2">검색 결과가 없습니다.</p>
          <p className="text-sm">다른 키워드로 검색해보세요.</p>
        </div>
      )}
    </div>
  );
}
