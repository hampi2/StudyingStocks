// 시장 심리 학습용 가상 데이터

import type { MockNews, MarketSentiment } from "@/types";

/** 가상 뉴스 데이터 (학습용) */
export const mockNewsList: MockNews[] = [
  // 삼성전자 관련
  { id: "n1", title: "삼성전자, AI 반도체 수주 대폭 확대…HBM4 양산 본격화", summary: "삼성전자가 차세대 고대역폭메모리(HBM4) 양산에 돌입하며 AI 반도체 시장 점유율 확대에 나선다.", sentiment: "긍정", score: 0.85, stockIds: ["samsung"], date: "2025-03-19", source: "한국경제" },
  { id: "n2", title: "삼성전자 1분기 영업이익 시장 예상치 상회 전망", summary: "증권가에서 삼성전자의 1분기 영업이익이 컨센서스를 10% 이상 상회할 것으로 전망하고 있다.", sentiment: "긍정", score: 0.72, stockIds: ["samsung"], date: "2025-03-18", source: "매일경제" },
  { id: "n3", title: "중국 반도체 규제 강화, 삼성전자 수출 영향 우려", summary: "미국의 대중국 반도체 수출 규제가 강화되면서 삼성전자의 중국 매출에 부정적 영향이 우려된다.", sentiment: "부정", score: -0.65, stockIds: ["samsung"], date: "2025-03-17", source: "조선비즈" },
  { id: "n4", title: "삼성전자, 갤럭시 S25 시리즈 판매량 역대 최고 기록", summary: "갤럭시 S25 시리즈 출시 2개월 만에 글로벌 판매량 2,000만 대를 돌파했다.", sentiment: "긍정", score: 0.68, stockIds: ["samsung"], date: "2025-03-16", source: "디지털타임스" },

  // 애플 관련
  { id: "n5", title: "Apple, Vision Pro 2세대 개발 박차…가격 인하 전략", summary: "애플이 차세대 비전 프로의 가격을 대폭 낮추며 대중화 전략을 추진 중이다.", sentiment: "긍정", score: 0.55, stockIds: ["apple"], date: "2025-03-19", source: "Bloomberg" },
  { id: "n6", title: "애플 서비스 매출 사상 최대…구독 경제 성장 지속", summary: "애플의 서비스 부문 매출이 전년 대비 18% 증가하며 사상 최대를 기록했다.", sentiment: "긍정", score: 0.78, stockIds: ["apple"], date: "2025-03-18", source: "CNBC" },
  { id: "n7", title: "EU, 애플에 반독점 과징금 50억 유로 부과 가능성", summary: "유럽연합이 앱스토어 독점 관련 애플에 대규모 과징금을 부과할 수 있다는 보도가 나왔다.", sentiment: "부정", score: -0.72, stockIds: ["apple"], date: "2025-03-17", source: "Reuters" },
  { id: "n8", title: "애플 자사주 매입 규모 확대, 주주환원 강화", summary: "애플이 자사주 매입 프로그램을 1,000억 달러 규모로 확대한다고 발표했다.", sentiment: "긍정", score: 0.62, stockIds: ["apple"], date: "2025-03-15", source: "WSJ" },

  // 시장 전반
  { id: "n9", title: "연준 금리 동결 전망 우세…하반기 인하 기대 유지", summary: "연방준비제도가 3월 FOMC에서 금리를 동결할 것으로 예상되며, 하반기 인하 기대감은 유지되고 있다.", sentiment: "중립", score: 0.15, stockIds: [], date: "2025-03-19", source: "Financial Times" },
  { id: "n10", title: "글로벌 AI 투자 붐, 반도체주 랠리 이어질까", summary: "AI 인프라 투자 확대로 반도체 관련주의 상승세가 지속되고 있으나, 밸류에이션 부담도 커지고 있다.", sentiment: "중립", score: 0.25, stockIds: ["samsung", "nvidia"], date: "2025-03-18", source: "한국경제" },
  { id: "n11", title: "코스피, 외국인 매수세에 2,700 돌파", summary: "외국인 투자자들의 순매수가 이어지면서 코스피 지수가 2,700선을 넘어섰다.", sentiment: "긍정", score: 0.58, stockIds: [], date: "2025-03-17", source: "연합뉴스" },
  { id: "n12", title: "미국 소비자물가 예상치 상회…인플레이션 재점화 우려", summary: "2월 CPI가 시장 예상을 웃돌면서 연준의 금리 인하 시점이 더 늦춰질 수 있다는 우려가 커지고 있다.", sentiment: "부정", score: -0.68, stockIds: [], date: "2025-03-16", source: "Bloomberg" },
  { id: "n13", title: "국내 개인투자자 해외주식 순매수 역대 최고", summary: "2030 세대를 중심으로 미국 주식 직접 투자가 급증하고 있다.", sentiment: "중립", score: 0.1, stockIds: [], date: "2025-03-15", source: "매일경제" },

  // 엔비디아 관련
  { id: "n14", title: "엔비디아 GTC 2025, 차세대 GPU 아키텍처 공개", summary: "엔비디아가 연례 개발자 컨퍼런스에서 차세대 GPU 'Blackwell Ultra'를 공개했다.", sentiment: "긍정", score: 0.88, stockIds: ["nvidia"], date: "2025-03-19", source: "TechCrunch" },
  { id: "n15", title: "엔비디아 주가 고평가 논란…PER 70배 넘어", summary: "AI 열풍으로 급등한 엔비디아의 밸류에이션이 지나치게 높다는 분석이 나오고 있다.", sentiment: "부정", score: -0.45, stockIds: ["nvidia"], date: "2025-03-18", source: "Barron's" },

  // 추가 뉴스
  { id: "n16", title: "한국은행, 기준금리 추가 인하 시사", summary: "한국은행 총재가 경기 둔화에 대응해 추가 금리 인하 가능성을 시사했다.", sentiment: "긍정", score: 0.45, stockIds: [], date: "2025-03-14", source: "연합뉴스" },
  { id: "n17", title: "테슬라 로보택시 상용화 연기 소식에 주가 급락", summary: "테슬라의 완전자율주행 로보택시 상용화 일정이 2026년으로 연기되었다.", sentiment: "부정", score: -0.75, stockIds: [], date: "2025-03-14", source: "Reuters" },
  { id: "n18", title: "원/달러 환율 1,300원대 안착…수출주에 긍정적", summary: "원화 강세가 이어지면서 환율이 1,300원대에 안착하고 있다.", sentiment: "중립", score: 0.2, stockIds: ["samsung"], date: "2025-03-13", source: "한국경제" },
  { id: "n19", title: "반도체 업황 바닥 확인…2분기부터 회복 전망", summary: "글로벌 반도체 시장이 바닥을 다지고 2분기부터 본격적인 회복세에 접어들 것으로 전망된다.", sentiment: "긍정", score: 0.65, stockIds: ["samsung", "skhynix"], date: "2025-03-13", source: "IBK투자증권" },
  { id: "n20", title: "SEC, 암호화폐 규제 강화 방침 발표", summary: "미국 증권거래위원회가 암호화폐 관련 규제를 대폭 강화하겠다고 발표했다.", sentiment: "부정", score: -0.5, stockIds: [], date: "2025-03-12", source: "CoinDesk" },
];

/** 7일간 공포/탐욕 지수 추이 (가상 데이터) */
export const fearGreedHistory: MarketSentiment[] = [
  {
    date: "2025-03-13",
    fearGreedIndex: 35,
    label: "공포",
    factors: [
      { name: "시장 변동성", value: 65 },
      { name: "거래량", value: 45 },
      { name: "풋/콜 비율", value: 60 },
      { name: "안전자산 수요", value: 55 },
      { name: "투자심리", value: 30 },
    ],
  },
  {
    date: "2025-03-14",
    fearGreedIndex: 42,
    label: "공포",
    factors: [
      { name: "시장 변동성", value: 58 },
      { name: "거래량", value: 50 },
      { name: "풋/콜 비율", value: 55 },
      { name: "안전자산 수요", value: 48 },
      { name: "투자심리", value: 38 },
    ],
  },
  {
    date: "2025-03-15",
    fearGreedIndex: 48,
    label: "중립",
    factors: [
      { name: "시장 변동성", value: 52 },
      { name: "거래량", value: 55 },
      { name: "풋/콜 비율", value: 50 },
      { name: "안전자산 수요", value: 45 },
      { name: "투자심리", value: 45 },
    ],
  },
  {
    date: "2025-03-16",
    fearGreedIndex: 38,
    label: "공포",
    factors: [
      { name: "시장 변동성", value: 68 },
      { name: "거래량", value: 42 },
      { name: "풋/콜 비율", value: 62 },
      { name: "안전자산 수요", value: 58 },
      { name: "투자심리", value: 32 },
    ],
  },
  {
    date: "2025-03-17",
    fearGreedIndex: 52,
    label: "중립",
    factors: [
      { name: "시장 변동성", value: 48 },
      { name: "거래량", value: 58 },
      { name: "풋/콜 비율", value: 47 },
      { name: "안전자산 수요", value: 42 },
      { name: "투자심리", value: 52 },
    ],
  },
  {
    date: "2025-03-18",
    fearGreedIndex: 58,
    label: "중립",
    factors: [
      { name: "시장 변동성", value: 42 },
      { name: "거래량", value: 62 },
      { name: "풋/콜 비율", value: 44 },
      { name: "안전자산 수요", value: 38 },
      { name: "투자심리", value: 58 },
    ],
  },
  {
    date: "2025-03-19",
    fearGreedIndex: 62,
    label: "탐욕",
    factors: [
      { name: "시장 변동성", value: 38 },
      { name: "거래량", value: 68 },
      { name: "풋/콜 비율", value: 40 },
      { name: "안전자산 수요", value: 35 },
      { name: "투자심리", value: 65 },
    ],
  },
];

/** 종목별 감성 점수 (가상 데이터) */
export const stockSentiments = [
  { stockId: "samsung", name: "삼성전자", positive: 65, neutral: 20, negative: 15 },
  { stockId: "apple", name: "애플", positive: 58, neutral: 25, negative: 17 },
  { stockId: "nvidia", name: "엔비디아", positive: 55, neutral: 15, negative: 30 },
  { stockId: "tsmc", name: "TSMC", positive: 60, neutral: 28, negative: 12 },
  { stockId: "microsoft", name: "마이크로소프트", positive: 62, neutral: 25, negative: 13 },
];

/** 공포/탐욕 지수로 레벨 판별 */
export function getSentimentLevel(index: number): import("@/types").SentimentLevel {
  if (index <= 20) return "극도 공포";
  if (index <= 40) return "공포";
  if (index <= 60) return "중립";
  if (index <= 80) return "탐욕";
  return "극도 탐욕";
}

/** 감성 지수별 색상 */
export function getSentimentColor(index: number): string {
  if (index <= 20) return "#3b82f6"; // 파란색 (극도 공포)
  if (index <= 40) return "#22c55e"; // 녹색 (공포)
  if (index <= 60) return "#eab308"; // 노란색 (중립)
  if (index <= 80) return "#f97316"; // 주황색 (탐욕)
  return "#ef4444"; // 빨간색 (극도 탐욕)
}
