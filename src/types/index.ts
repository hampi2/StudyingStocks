// 학습 코스 관련 타입 정의

/** 난이도 레벨 */
export type Level = "초급" | "중급" | "고급";

/** 학습 코스 */
export interface Course {
  id: string;
  title: string; // 코스 제목
  description: string; // 코스 설명
  level: Level; // 난이도
  lessons: Lesson[]; // 레슨 목록
  icon: string; // 아이콘 이름 (lucide)
}

/** 개별 레슨 */
export interface Lesson {
  id: string;
  courseId: string; // 소속 코스 ID
  title: string; // 레슨 제목
  description: string; // 레슨 설명
  content: string; // 레슨 본문 (HTML/마크다운)
  order: number; // 정렬 순서
  market?: "KR" | "US" | "BOTH"; // 관련 시장
}

/** 용어 사전 항목 */
export interface GlossaryTerm {
  id: string;
  termKo: string; // 한글 용어
  termEn: string; // 영문 용어
  definition: string; // 정의
  example?: string; // 사용 예시
  category: GlossaryCategory; // 카테고리
  related?: string[]; // 관련 용어 ID 목록
}

/** 용어 카테고리 */
export type GlossaryCategory =
  | "기본"
  | "기술적분석"
  | "기본적분석"
  | "파생상품"
  | "시장구조";

/** 퀴즈 문제 */
export interface QuizQuestion {
  id: string;
  lessonId: string; // 관련 레슨 ID
  question: string; // 문제
  type: "객관식" | "OX"; // 문제 유형
  options: string[]; // 선택지 (OX의 경우 ["O", "X"])
  correctIndex: number; // 정답 인덱스
  explanation: string; // 해설
}

/** 퀴즈 세트 */
export interface Quiz {
  id: string;
  courseId: string; // 관련 코스 ID
  lessonId: string; // 관련 레슨 ID
  title: string; // 퀴즈 제목
  questions: QuizQuestion[]; // 문제 목록
}

/** 퀴즈 결과 */
export interface QuizResult {
  quizId: string;
  score: number; // 맞은 개수
  total: number; // 전체 문제 수
  completedAt: string; // 완료 일시 (ISO string)
}

/** 학습 진행 상태 */
export interface LearningProgress {
  completedLessons: string[]; // 완료한 레슨 ID 목록
  quizResults: QuizResult[]; // 퀴즈 결과 목록
}

// ============================================
// Phase 3: 모의투자 관련 타입
// ============================================

/** 주문 유형 */
export type OrderType = "시장가" | "지정가";

/** 주문 방향 */
export type OrderSide = "매수" | "매도";

/** 주문 상태 */
export type OrderStatus = "대기" | "체결" | "취소";

/** 통화 */
export type Currency = "KRW" | "USD";

/** 시장 */
export type Market = "KRX" | "NASDAQ";

/** 종목 정보 */
export interface StockInfo {
  id: string; // 종목 ID
  name: string; // 종목명 (한글)
  ticker: string; // 티커 심볼
  market: Market; // 시장
  currency: Currency; // 통화
  currentPrice: number; // 현재가
  previousClose: number; // 전일 종가
}

/** 주문 */
export interface Order {
  id: string; // 주문 ID
  stockId: string; // 종목 ID
  stockName: string; // 종목명
  side: OrderSide; // 매수/매도
  type: OrderType; // 시장가/지정가
  price: number; // 주문가격 (시장가면 체결가)
  quantity: number; // 주문 수량
  status: OrderStatus; // 주문 상태
  currency: Currency; // 통화
  createdAt: string; // 주문 일시 (ISO string)
  executedAt?: string; // 체결 일시
}

/** 보유 종목 (포지션) */
export interface Position {
  stockId: string; // 종목 ID
  stockName: string; // 종목명
  ticker: string; // 티커 심볼
  market: Market; // 시장
  currency: Currency; // 통화
  quantity: number; // 보유 수량
  averagePrice: number; // 평균 매수가
  currentPrice: number; // 현재가
}

/** 포트폴리오 스냅샷 (수익률 추적용) */
export interface PortfolioSnapshot {
  date: string; // 날짜 (YYYY-MM-DD)
  totalValue: number; // 총 평가액 (원화 기준)
  cashKRW: number; // 원화 잔고
  cashUSD: number; // 달러 잔고
  returnRate: number; // 수익률 (%)
}

/** 포트폴리오 상태 */
export interface Portfolio {
  cashKRW: number; // 원화 잔고
  cashUSD: number; // 달러 잔고
  positions: Position[]; // 보유 종목 목록
  orders: Order[]; // 주문 내역
  snapshots: PortfolioSnapshot[]; // 수익률 추적 스냅샷
  initialKRW: number; // 초기 원화 자금
  initialUSD: number; // 초기 달러 자금
  createdAt: string; // 포트폴리오 생성일
}

// ============================================
// Phase 4: 심화 학습 관련 타입
// ============================================

/** 재무제표 항목 */
export interface FinancialItem {
  label: string; // 항목명 (한글)
  labelEn: string; // 항목명 (영문)
  values: number[]; // 연도별 값 (최근 3년)
  description: string; // 항목 설명
  formula?: string; // 계산 공식 (있는 경우)
  isTotal?: boolean; // 소계/합계 여부 (볼드 처리)
  indent?: number; // 들여쓰기 수준
}

/** 재무제표 섹션 (예: 매출, 영업이익 등의 그룹) */
export interface FinancialSection {
  title: string; // 섹션 제목
  items: FinancialItem[]; // 항목 목록
}

/** 재무제표 전체 (손익계산서, 재무상태표, 현금흐름표) */
export interface FinancialStatement {
  companyId: string; // 기업 ID
  companyName: string; // 기업명
  ticker: string; // 티커
  currency: Currency; // 통화
  years: string[]; // 연도 목록 (예: ["2023", "2024", "2025E"])
  incomeStatement: FinancialSection[]; // 손익계산서
  balanceSheet: FinancialSection[]; // 재무상태표
  cashFlow: FinancialSection[]; // 현금흐름표
}

/** 밸류에이션 지표 */
export interface ValuationMetrics {
  companyId: string;
  companyName: string;
  ticker: string;
  currency: Currency;
  currentPrice: number; // 현재 주가
  sharesOutstanding: number; // 발행 주식수
  eps: number; // 주당순이익
  bps: number; // 주당순자산
  dps: number; // 주당배당금
  per: number; // PER (주가수익비율)
  pbr: number; // PBR (주가순자산비율)
  roe: number; // ROE (자기자본이익률, %)
  debtRatio: number; // 부채비율 (%)
  evEbitda: number; // EV/EBITDA
  dividendYield: number; // 배당수익률 (%)
}

/** 섹터(산업) 정보 */
export interface SectorInfo {
  id: string;
  name: string; // 섹터명 (한글)
  nameEn: string; // 섹터명 (영문)
  companies: ValuationMetrics[]; // 소속 기업 목록
  averagePer: number; // 섹터 평균 PER
  averagePbr: number; // 섹터 평균 PBR
  averageRoe: number; // 섹터 평균 ROE
}

// ============================================
// Phase 5: 게이미피케이션 & 일지 관련 타입
// ============================================

/** 배지 정보 */
export interface BadgeInfo {
  id: string;
  name: string; // 배지명
  description: string; // 획득 조건 설명
  icon: string; // 아이콘 이모지
  condition: string; // 조건 키 (내부 체크용)
}

/** 게이미피케이션 상태 */
export interface GamificationState {
  xp: number; // 경험치
  level: number; // 레벨
  earnedBadges: string[]; // 획득한 배지 ID 목록
  streak: number; // 연속 학습 일수
  lastActiveDate: string; // 마지막 활동 날짜 (YYYY-MM-DD)
  totalStudyDays: number; // 총 학습 일수
}

/** 감정 태그 */
export type EmotionTag = "확신" | "불안" | "탐욕" | "공포" | "냉정" | "후회" | "만족";

/** 투자 일지 항목 */
export interface JournalEntry {
  id: string;
  date: string; // 작성 날짜 (YYYY-MM-DD)
  title: string; // 제목
  content: string; // 본문 (복기 내용)
  emotion: EmotionTag; // 감정 태그
  stockName?: string; // 관련 종목 (선택)
  action?: "매수" | "매도" | "관망"; // 매매 행동 (선택)
  lesson: string; // 배운 점 / 교훈
  createdAt: string; // 생성 일시 (ISO string)
}

/** 학습 추천 항목 */
export interface LearningRecommendation {
  type: "course" | "quiz" | "practice"; // 추천 유형
  id: string; // 관련 ID (코스/퀴즈/기능)
  title: string; // 추천 제목
  reason: string; // 추천 이유
  priority: "high" | "medium" | "low"; // 우선순위
}

// ============================================
// Phase 6: 참고문서 기반 신규 기능 타입
// ============================================

/** 투자 성향 유형 */
export type InvestorType = "안정형" | "중립형" | "공격형";

/** 온보딩 질문 선택지 */
export interface OnboardingOption {
  label: string; // 선택지 텍스트
  scores: Record<InvestorType, number>; // 성향별 점수
}

/** 온보딩 질문 */
export interface OnboardingQuestion {
  id: string;
  question: string; // 질문 텍스트
  options: OnboardingOption[];
}

/** 투자 성향 결과 */
export interface InvestorTypeResult {
  type: InvestorType;
  title: string; // "안정형 투자자"
  description: string; // 상세 설명
  emoji: string; // 이모지
  characteristics: string[]; // 특징 3~4개
  recommendedPath: { label: string; href: string }[]; // 추천 학습 경로
  riskLevel: number; // 위험 수용도 1~5
}

/** 나만의 단어장 항목 */
export interface VocabularyItem {
  termId: string; // GlossaryTerm.id 참조
  savedAt: string; // 저장 일시
  reviewCount: number; // 복습 횟수
  lastReviewedAt: string; // 마지막 복습 일시
  mastered: boolean; // 암기 완료 여부
}

/** 가상 뉴스 데이터 */
export interface MockNews {
  id: string;
  title: string; // 뉴스 제목
  summary: string; // 요약
  sentiment: "긍정" | "부정" | "중립"; // 감성
  score: number; // -1 ~ +1 감성 점수
  stockIds: string[]; // 관련 종목 ID
  date: string; // 날짜
  source: string; // 출처
}

/** 감성 지수 레벨 */
export type SentimentLevel = "극도 공포" | "공포" | "중립" | "탐욕" | "극도 탐욕";

/** 시장 심리 지수 데이터 */
export interface MarketSentiment {
  date: string;
  fearGreedIndex: number; // 0(극도 공포) ~ 100(극도 탐욕)
  label: SentimentLevel;
  factors: { name: string; value: number }[]; // 구성 요소
}

/** ETF 데이터 */
export interface ETFData {
  id: string;
  name: string; // "KODEX 200"
  ticker: string; // "069500"
  market: "KRX" | "US"; // 시장
  provider: string; // 운용사
  category: string; // "국내 대형주"
  trackingIndex: string; // "KOSPI 200"
  expenseRatio: number; // 보수율 (%)
  aum: number; // 순자산 (억원 또는 백만달러)
  trackingError: number; // 추적오차 (%)
  ytdReturn: number; // 올해 수익률 (%)
  oneYearReturn: number; // 1년 수익률 (%)
  threeYearReturn: number; // 3년 수익률 (%)
  monthlyReturns: { date: string; value: number }[]; // 월별 수익률
  description: string; // ETF 설명
}

/** ETF 학습 섹션 */
export interface ETFLesson {
  id: string;
  title: string; // 섹션 제목
  content: string; // 학습 내용 (마크다운)
  order: number; // 정렬 순서
}

/** 마라톤 체크포인트 */
export interface MarathonCheckpoint {
  id: string;
  km: number; // 마라톤 거리 (0~42.195)
  label: string; // 체크포인트 이름
  type: "lesson" | "quiz" | "practice" | "milestone"; // 유형
  linkedRoute: string; // 연결 라우트
  description: string; // 설명
  completionCheck: string; // 완료 조건 키
}

/** 일일 미션 템플릿 */
export interface MissionTemplate {
  id: string;
  type: "lesson" | "quiz" | "chart" | "trade" | "journal" | "vocabulary"; // 유형
  title: string; // 미션 제목
  description: string; // 설명
  xpReward: number; // XP 보상
}
