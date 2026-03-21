"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LearningProgress,
  QuizResult,
  Portfolio,
  Position,
  Order,
  OrderSide,
  OrderType,
  Currency,
  Market,
  PortfolioSnapshot,
  GamificationState,
  BadgeInfo,
  JournalEntry,
  EmotionTag,
  InvestorType,
  VocabularyItem,
  MissionTemplate,
} from "@/types";

// 학습 진행 상태 관리 스토어
interface ProgressStore extends LearningProgress {
  // 레슨 완료 처리
  completeLesson: (lessonId: string) => void;
  // 퀴즈 결과 저장
  saveQuizResult: (result: QuizResult) => void;
  // 레슨 완료 여부 확인
  isLessonCompleted: (lessonId: string) => boolean;
  // 코스별 진행률 계산 (퍼센트)
  getCourseProgress: (lessonIds: string[]) => number;
  // 특정 퀴즈의 최고 점수 조회
  getBestQuizScore: (quizId: string) => QuizResult | undefined;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizResults: [],

      completeLesson: (lessonId: string) => {
        set((state) => {
          if (state.completedLessons.includes(lessonId)) return state;
          return {
            completedLessons: [...state.completedLessons, lessonId],
          };
        });
      },

      saveQuizResult: (result: QuizResult) => {
        set((state) => ({
          quizResults: [...state.quizResults, result],
        }));
      },

      isLessonCompleted: (lessonId: string) => {
        return get().completedLessons.includes(lessonId);
      },

      getCourseProgress: (lessonIds: string[]) => {
        if (lessonIds.length === 0) return 0;
        const completed = lessonIds.filter((id) =>
          get().completedLessons.includes(id)
        );
        return Math.round((completed.length / lessonIds.length) * 100);
      },

      getBestQuizScore: (quizId: string) => {
        const results = get().quizResults.filter((r) => r.quizId === quizId);
        if (results.length === 0) return undefined;
        return results.reduce((best, curr) =>
          curr.score / curr.total > best.score / best.total ? curr : best
        );
      },
    }),
    {
      name: "studying-stocks-progress", // 로컬스토리지 키
    }
  )
);

// ============================================
// 모의투자 스토어
// ============================================

/** 초기 자금 설정 */
const DEFAULT_INITIAL_KRW = 100_000_000; // 1억원
const DEFAULT_INITIAL_USD = 100_000; // 10만 달러

/** 환율 (시뮬레이션용 고정 환율) */
export const EXCHANGE_RATE = 1_350; // 1 USD = 1,350 KRW

interface TradingStore extends Portfolio {
  // 포트폴리오 초기화 (리셋)
  resetPortfolio: () => void;
  // 주문 실행 (매수/매도)
  executeOrder: (params: {
    stockId: string;
    stockName: string;
    ticker: string;
    market: Market;
    side: OrderSide;
    type: OrderType;
    price: number; // 체결 가격
    quantity: number;
    currency: Currency;
  }) => { success: boolean; message: string };
  // 보유 종목 현재가 업데이트
  updatePrice: (stockId: string, newPrice: number) => void;
  // 전체 평가액 계산 (원화 기준)
  getTotalValue: () => number;
  // 총 수익률 계산
  getTotalReturnRate: () => number;
  // 스냅샷 기록
  takeSnapshot: () => void;
  // 특정 종목 보유 수량 조회
  getPosition: (stockId: string) => Position | undefined;
  // 포트폴리오 존재 여부
  isPortfolioCreated: () => boolean;
}

export const useTradingStore = create<TradingStore>()(
  persist(
    (set, get) => ({
      cashKRW: DEFAULT_INITIAL_KRW,
      cashUSD: DEFAULT_INITIAL_USD,
      positions: [],
      orders: [],
      snapshots: [],
      initialKRW: DEFAULT_INITIAL_KRW,
      initialUSD: DEFAULT_INITIAL_USD,
      createdAt: "",

      resetPortfolio: () => {
        set({
          cashKRW: DEFAULT_INITIAL_KRW,
          cashUSD: DEFAULT_INITIAL_USD,
          positions: [],
          orders: [],
          snapshots: [],
          initialKRW: DEFAULT_INITIAL_KRW,
          initialUSD: DEFAULT_INITIAL_USD,
          createdAt: new Date().toISOString(),
        });
      },

      executeOrder: (params) => {
        const state = get();
        const totalCost = params.price * params.quantity;

        if (params.side === "매수") {
          // 잔고 확인
          if (params.currency === "KRW" && state.cashKRW < totalCost) {
            return { success: false, message: "원화 잔고가 부족합니다." };
          }
          if (params.currency === "USD" && state.cashUSD < totalCost) {
            return { success: false, message: "달러 잔고가 부족합니다." };
          }

          // 주문 생성
          const order: Order = {
            id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            stockId: params.stockId,
            stockName: params.stockName,
            side: "매수",
            type: params.type,
            price: params.price,
            quantity: params.quantity,
            status: "체결",
            currency: params.currency,
            createdAt: new Date().toISOString(),
            executedAt: new Date().toISOString(),
          };

          // 기존 포지션 확인
          const existingPosition = state.positions.find(
            (p) => p.stockId === params.stockId
          );

          let newPositions: Position[];
          if (existingPosition) {
            // 평균 매수가 재계산
            const totalQty = existingPosition.quantity + params.quantity;
            const avgPrice =
              (existingPosition.averagePrice * existingPosition.quantity +
                params.price * params.quantity) /
              totalQty;
            newPositions = state.positions.map((p) =>
              p.stockId === params.stockId
                ? { ...p, quantity: totalQty, averagePrice: Math.round(avgPrice * 100) / 100 }
                : p
            );
          } else {
            // 새 포지션 추가
            newPositions = [
              ...state.positions,
              {
                stockId: params.stockId,
                stockName: params.stockName,
                ticker: params.ticker,
                market: params.market,
                currency: params.currency,
                quantity: params.quantity,
                averagePrice: params.price,
                currentPrice: params.price,
              },
            ];
          }

          set({
            cashKRW:
              params.currency === "KRW"
                ? state.cashKRW - totalCost
                : state.cashKRW,
            cashUSD:
              params.currency === "USD"
                ? state.cashUSD - totalCost
                : state.cashUSD,
            positions: newPositions,
            orders: [...state.orders, order],
          });

          return { success: true, message: `${params.stockName} ${params.quantity}주 매수 체결` };
        } else {
          // 매도: 보유 수량 확인
          const position = state.positions.find(
            (p) => p.stockId === params.stockId
          );
          if (!position || position.quantity < params.quantity) {
            return { success: false, message: "보유 수량이 부족합니다." };
          }

          const order: Order = {
            id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            stockId: params.stockId,
            stockName: params.stockName,
            side: "매도",
            type: params.type,
            price: params.price,
            quantity: params.quantity,
            status: "체결",
            currency: params.currency,
            createdAt: new Date().toISOString(),
            executedAt: new Date().toISOString(),
          };

          const remainQty = position.quantity - params.quantity;
          const newPositions =
            remainQty === 0
              ? state.positions.filter((p) => p.stockId !== params.stockId)
              : state.positions.map((p) =>
                  p.stockId === params.stockId
                    ? { ...p, quantity: remainQty }
                    : p
                );

          set({
            cashKRW:
              params.currency === "KRW"
                ? state.cashKRW + totalCost
                : state.cashKRW,
            cashUSD:
              params.currency === "USD"
                ? state.cashUSD + totalCost
                : state.cashUSD,
            positions: newPositions,
            orders: [...state.orders, order],
          });

          return { success: true, message: `${params.stockName} ${params.quantity}주 매도 체결` };
        }
      },

      updatePrice: (stockId: string, newPrice: number) => {
        set((state) => ({
          positions: state.positions.map((p) =>
            p.stockId === stockId ? { ...p, currentPrice: newPrice } : p
          ),
        }));
      },

      getTotalValue: () => {
        const state = get();
        // 원화 보유 종목 평가액
        const krwPositionValue = state.positions
          .filter((p) => p.currency === "KRW")
          .reduce((sum, p) => sum + p.currentPrice * p.quantity, 0);
        // 달러 보유 종목 평가액 → 원화 환산
        const usdPositionValue = state.positions
          .filter((p) => p.currency === "USD")
          .reduce((sum, p) => sum + p.currentPrice * p.quantity, 0);

        return (
          state.cashKRW +
          krwPositionValue +
          (state.cashUSD + usdPositionValue) * EXCHANGE_RATE
        );
      },

      getTotalReturnRate: () => {
        const state = get();
        const totalValue = get().getTotalValue();
        const initialValue =
          state.initialKRW + state.initialUSD * EXCHANGE_RATE;
        if (initialValue === 0) return 0;
        return Math.round(((totalValue - initialValue) / initialValue) * 10000) / 100;
      },

      takeSnapshot: () => {
        const state = get();
        const snapshot: PortfolioSnapshot = {
          date: new Date().toISOString().split("T")[0],
          totalValue: get().getTotalValue(),
          cashKRW: state.cashKRW,
          cashUSD: state.cashUSD,
          returnRate: get().getTotalReturnRate(),
        };
        set({ snapshots: [...state.snapshots, snapshot] });
      },

      getPosition: (stockId: string) => {
        return get().positions.find((p) => p.stockId === stockId);
      },

      isPortfolioCreated: () => {
        return get().createdAt !== "";
      },
    }),
    {
      name: "studying-stocks-trading", // 로컬스토리지 키
    }
  )
);

// ============================================
// 게이미피케이션 스토어
// ============================================

/** 배지 정의 */
export const BADGES: BadgeInfo[] = [
  { id: "first-lesson", name: "첫 걸음", description: "첫 번째 레슨 완료", icon: "🎯", condition: "first-lesson" },
  { id: "course-complete", name: "코스 마스터", description: "코스 1개 완료", icon: "🎓", condition: "course-complete" },
  { id: "quiz-perfect", name: "만점왕", description: "퀴즈에서 만점 획득", icon: "💯", condition: "quiz-perfect" },
  { id: "quiz-5", name: "퀴즈 매니아", description: "퀴즈 5회 완료", icon: "🧠", condition: "quiz-5" },
  { id: "first-trade", name: "첫 거래", description: "첫 번째 모의투자 매매", icon: "💰", condition: "first-trade" },
  { id: "trader-10", name: "활발한 트레이더", description: "모의투자 10회 거래", icon: "📈", condition: "trader-10" },
  { id: "journal-first", name: "복기의 시작", description: "첫 투자 일지 작성", icon: "📝", condition: "journal-first" },
  { id: "journal-5", name: "꾸준한 기록가", description: "투자 일지 5개 작성", icon: "📚", condition: "journal-5" },
  { id: "streak-3", name: "3일 연속", description: "3일 연속 학습", icon: "🔥", condition: "streak-3" },
  { id: "streak-7", name: "일주일 연속", description: "7일 연속 학습", icon: "⚡", condition: "streak-7" },
  { id: "streak-30", name: "한 달 연속", description: "30일 연속 학습", icon: "🏆", condition: "streak-30" },
  { id: "explorer", name: "탐험가", description: "모든 메뉴 방문", icon: "🗺️", condition: "explorer" },
  { id: "investor-explorer", name: "투자 탐색가", description: "투자성향 테스트 완료", icon: "🔍", condition: "investor-explorer" },
  { id: "vocab-10", name: "단어 수집가", description: "단어장에 10개 저장", icon: "📖", condition: "vocab-10" },
  { id: "marathon-half", name: "하프 마라톤", description: "학습 마라톤 50% 달성", icon: "🏃", condition: "marathon-half" },
  { id: "marathon-full", name: "풀 마라톤", description: "학습 마라톤 완주", icon: "🥇", condition: "marathon-full" },
];

/** 레벨별 필요 경험치 */
export function getXpForLevel(level: number): number {
  return level * 100; // 레벨 1: 100xp, 레벨 2: 200xp, ...
}

/** 레벨 이름 */
export function getLevelTitle(level: number): string {
  if (level >= 20) return "투자 마스터";
  if (level >= 15) return "선임 투자자";
  if (level >= 10) return "숙련 투자자";
  if (level >= 7) return "중급 투자자";
  if (level >= 4) return "초보 투자자";
  return "입문자";
}

interface GamificationStore extends GamificationState {
  // 경험치 획득
  addXp: (amount: number) => void;
  // 배지 획득
  earnBadge: (badgeId: string) => void;
  // 스트릭 업데이트 (오늘 활동 기록)
  recordActivity: () => void;
  // 배지 획득 여부 확인
  hasBadge: (badgeId: string) => boolean;
  // 다음 레벨까지 남은 XP
  getXpToNextLevel: () => number;
  // 현재 레벨 진행률 (%)
  getLevelProgress: () => number;
}

export const useGamificationStore = create<GamificationStore>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      earnedBadges: [],
      streak: 0,
      lastActiveDate: "",
      totalStudyDays: 0,

      addXp: (amount: number) => {
        const state = get();
        let newXp = state.xp + amount;
        let newLevel = state.level;

        // 레벨업 체크
        while (newXp >= getXpForLevel(newLevel)) {
          newXp -= getXpForLevel(newLevel);
          newLevel++;
        }

        set({ xp: newXp, level: newLevel });
      },

      earnBadge: (badgeId: string) => {
        const state = get();
        if (state.earnedBadges.includes(badgeId)) return;
        set({ earnedBadges: [...state.earnedBadges, badgeId] });
      },

      recordActivity: () => {
        const today = new Date().toISOString().split("T")[0];
        const state = get();

        if (state.lastActiveDate === today) return; // 이미 오늘 기록됨

        // 어제 날짜 계산
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        const newStreak = state.lastActiveDate === yesterdayStr ? state.streak + 1 : 1;

        set({
          lastActiveDate: today,
          streak: newStreak,
          totalStudyDays: state.totalStudyDays + 1,
        });

        // 스트릭 배지 체크
        if (newStreak >= 3) get().earnBadge("streak-3");
        if (newStreak >= 7) get().earnBadge("streak-7");
        if (newStreak >= 30) get().earnBadge("streak-30");
      },

      hasBadge: (badgeId: string) => {
        return get().earnedBadges.includes(badgeId);
      },

      getXpToNextLevel: () => {
        return getXpForLevel(get().level) - get().xp;
      },

      getLevelProgress: () => {
        const state = get();
        const needed = getXpForLevel(state.level);
        return needed > 0 ? Math.round((state.xp / needed) * 100) : 0;
      },
    }),
    {
      name: "studying-stocks-gamification", // 로컬스토리지 키
    }
  )
);

// ============================================
// 투자 일지 스토어
// ============================================

interface JournalStore {
  entries: JournalEntry[];
  // 일지 추가
  addEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  // 일지 삭제
  deleteEntry: (id: string) => void;
  // 감정별 통계
  getEmotionStats: () => Record<EmotionTag, number>;
}

export const useJournalStore = create<JournalStore>()(
  persist(
    (set, get) => ({
      entries: [],

      addEntry: (entry) => {
        const newEntry: JournalEntry = {
          ...entry,
          id: `journal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ entries: [newEntry, ...state.entries] }));
      },

      deleteEntry: (id: string) => {
        set((state) => ({
          entries: state.entries.filter((e) => e.id !== id),
        }));
      },

      getEmotionStats: () => {
        const entries = get().entries;
        const stats: Record<string, number> = {};
        for (const e of entries) {
          stats[e.emotion] = (stats[e.emotion] || 0) + 1;
        }
        return stats as Record<EmotionTag, number>;
      },
    }),
    {
      name: "studying-stocks-journal", // 로컬스토리지 키
    }
  )
);

// ============================================
// 온보딩 (투자성향 테스트) 스토어
// ============================================

interface OnboardingStore {
  investorType: InvestorType | null; // 투자 성향 결과
  completedAt: string; // 완료 일시
  answers: Record<string, number>; // 질문별 선택 인덱스
  // 결과 저장
  setResult: (type: InvestorType, answers: Record<string, number>) => void;
  // 초기화
  resetOnboarding: () => void;
  // 완료 여부
  isCompleted: () => boolean;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      investorType: null,
      completedAt: "",
      answers: {},

      setResult: (type, answers) => {
        set({
          investorType: type,
          completedAt: new Date().toISOString(),
          answers,
        });
      },

      resetOnboarding: () => {
        set({ investorType: null, completedAt: "", answers: {} });
      },

      isCompleted: () => {
        return get().investorType !== null;
      },
    }),
    {
      name: "studying-stocks-onboarding", // 로컬스토리지 키
    }
  )
);

// ============================================
// 나만의 단어장 스토어
// ============================================

interface VocabularyStore {
  savedTerms: VocabularyItem[];
  // 단어 저장
  saveTerm: (termId: string) => void;
  // 단어 삭제
  removeTerm: (termId: string) => void;
  // 복습 기록
  markReviewed: (termId: string) => void;
  // 암기 완료 토글
  toggleMastered: (termId: string) => void;
  // 저장 여부 확인
  isSaved: (termId: string) => boolean;
  // 저장 개수
  getSavedCount: () => number;
}

export const useVocabularyStore = create<VocabularyStore>()(
  persist(
    (set, get) => ({
      savedTerms: [],

      saveTerm: (termId: string) => {
        if (get().isSaved(termId)) return;
        const item: VocabularyItem = {
          termId,
          savedAt: new Date().toISOString(),
          reviewCount: 0,
          lastReviewedAt: "",
          mastered: false,
        };
        set((state) => ({ savedTerms: [...state.savedTerms, item] }));
      },

      removeTerm: (termId: string) => {
        set((state) => ({
          savedTerms: state.savedTerms.filter((t) => t.termId !== termId),
        }));
      },

      markReviewed: (termId: string) => {
        set((state) => ({
          savedTerms: state.savedTerms.map((t) =>
            t.termId === termId
              ? { ...t, reviewCount: t.reviewCount + 1, lastReviewedAt: new Date().toISOString() }
              : t
          ),
        }));
      },

      toggleMastered: (termId: string) => {
        set((state) => ({
          savedTerms: state.savedTerms.map((t) =>
            t.termId === termId ? { ...t, mastered: !t.mastered } : t
          ),
        }));
      },

      isSaved: (termId: string) => {
        return get().savedTerms.some((t) => t.termId === termId);
      },

      getSavedCount: () => {
        return get().savedTerms.length;
      },
    }),
    {
      name: "studying-stocks-vocabulary", // 로컬스토리지 키
    }
  )
);
