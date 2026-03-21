// 온보딩 투자성향 테스트 데이터

import type { OnboardingQuestion, InvestorTypeResult } from "@/types";

/** 투자성향 질문 6개 */
export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: "experience",
    question: "주식 투자 경험이 어느 정도인가요?",
    options: [
      { label: "전혀 없음 (처음 접해요)", scores: { "안정형": 3, "중립형": 1, "공격형": 0 } },
      { label: "1년 미만 (아직 초보예요)", scores: { "안정형": 2, "중립형": 2, "공격형": 1 } },
      { label: "1~3년 (어느 정도 알아요)", scores: { "안정형": 1, "중립형": 2, "공격형": 2 } },
      { label: "3년 이상 (경험이 많아요)", scores: { "안정형": 0, "중립형": 1, "공격형": 3 } },
    ],
  },
  {
    id: "loss-reaction",
    question: "투자한 종목이 10% 하락했습니다. 어떻게 하시겠어요?",
    options: [
      { label: "즉시 손절매 (더 떨어지기 전에 팔아요)", scores: { "안정형": 3, "중립형": 1, "공격형": 0 } },
      { label: "일단 지켜보기 (이유를 분석해요)", scores: { "안정형": 1, "중립형": 3, "공격형": 1 } },
      { label: "추가 매수 (싸게 더 살 기회!)", scores: { "안정형": 0, "중립형": 1, "공격형": 3 } },
    ],
  },
  {
    id: "purpose",
    question: "투자의 주된 목적은 무엇인가요?",
    options: [
      { label: "안정적인 배당 수입", scores: { "안정형": 3, "중립형": 1, "공격형": 0 } },
      { label: "꾸준한 자산 증식", scores: { "안정형": 1, "중립형": 3, "공격형": 1 } },
      { label: "높은 단기 수익", scores: { "안정형": 0, "중립형": 1, "공격형": 3 } },
    ],
  },
  {
    id: "risk",
    question: "어느 정도의 위험을 감수할 수 있나요?",
    options: [
      { label: "원금 보장이 최우선이에요", scores: { "안정형": 3, "중립형": 1, "공격형": 0 } },
      { label: "적정한 위험은 감수해요 (±15%)", scores: { "안정형": 1, "중립형": 3, "공격형": 1 } },
      { label: "높은 수익을 위해 큰 변동도 괜찮아요", scores: { "안정형": 0, "중립형": 1, "공격형": 3 } },
    ],
  },
  {
    id: "period",
    question: "투자 기간은 어느 정도를 생각하고 있나요?",
    options: [
      { label: "1년 미만 (단기)", scores: { "안정형": 1, "중립형": 1, "공격형": 3 } },
      { label: "1~5년 (중기)", scores: { "안정형": 1, "중립형": 3, "공격형": 1 } },
      { label: "5년 이상 (장기)", scores: { "안정형": 3, "중립형": 1, "공격형": 1 } },
    ],
  },
  {
    id: "interest",
    question: "가장 관심 있는 투자 분야는?",
    options: [
      { label: "배당주 / ETF (안정적 수익)", scores: { "안정형": 3, "중립형": 1, "공격형": 0 } },
      { label: "가치투자 / 기본적 분석", scores: { "안정형": 1, "중립형": 3, "공격형": 1 } },
      { label: "성장주 / 기술적 분석", scores: { "안정형": 0, "중립형": 1, "공격형": 3 } },
    ],
  },
];

/** 투자 성향 결과 3가지 */
export const investorTypes: InvestorTypeResult[] = [
  {
    type: "안정형",
    title: "안정형 투자자",
    emoji: "🛡️",
    description: "원금 보존을 최우선으로 하며, 꾸준하고 안정적인 수익을 추구합니다. 배당주나 ETF 같은 저위험 상품에 관심이 많습니다.",
    characteristics: [
      "원금 손실에 민감하고 안정성을 중시",
      "장기 투자와 분산 투자를 선호",
      "배당 수익과 복리 효과에 관심",
      "시장 변동에 크게 흔들리지 않는 전략 추구",
    ],
    recommendedPath: [
      { label: "주식투자 기초 코스", href: "/courses" },
      { label: "ETF 학습", href: "/etf" },
      { label: "재무제표 분석", href: "/fundamental" },
      { label: "용어 사전", href: "/glossary" },
      { label: "모의투자 연습", href: "/trading" },
    ],
    riskLevel: 2,
  },
  {
    type: "중립형",
    title: "중립형 투자자",
    emoji: "⚖️",
    description: "안정성과 수익성의 균형을 추구합니다. 기본적 분석을 바탕으로 합리적인 투자 결정을 내리려 합니다.",
    characteristics: [
      "적정 수준의 위험을 감수할 수 있음",
      "기본적 분석과 밸류에이션에 관심",
      "중장기 관점으로 분산 투자",
      "감정보다 데이터에 기반한 판단 선호",
    ],
    recommendedPath: [
      { label: "주식투자 기초 코스", href: "/courses" },
      { label: "재무제표 & 밸류에이션", href: "/fundamental" },
      { label: "차트 뷰어", href: "/chart" },
      { label: "섹터 분석", href: "/fundamental/sector" },
      { label: "모의투자 연습", href: "/trading" },
    ],
    riskLevel: 3,
  },
  {
    type: "공격형",
    title: "공격형 투자자",
    emoji: "🚀",
    description: "높은 수익을 위해 적극적으로 위험을 감수합니다. 기술적 분석과 차트 패턴을 활용한 트레이딩에 관심이 많습니다.",
    characteristics: [
      "높은 변동성에도 동요하지 않음",
      "기술적 분석과 차트 패턴을 적극 활용",
      "단기~중기 매매를 선호",
      "시장 트렌드와 모멘텀에 민감하게 반응",
    ],
    recommendedPath: [
      { label: "기술적 분석 학습", href: "/technical" },
      { label: "차트 패턴 게임", href: "/pattern-game" },
      { label: "차트 뷰어 실습", href: "/chart" },
      { label: "모의투자 실전", href: "/trading" },
      { label: "시장 심리 분석", href: "/sentiment" },
    ],
    riskLevel: 5,
  },
];

/** 점수 합산으로 투자 성향 판별 */
export function determineInvestorType(answers: Record<string, number>): import("@/types").InvestorType {
  const totals = { "안정형": 0, "중립형": 0, "공격형": 0 };

  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = onboardingQuestions.find((q) => q.id === questionId);
    if (!question) continue;
    const option = question.options[optionIndex];
    if (!option) continue;
    totals["안정형"] += option.scores["안정형"];
    totals["중립형"] += option.scores["중립형"];
    totals["공격형"] += option.scores["공격형"];
  }

  // 최고 점수 성향 반환
  if (totals["공격형"] > totals["중립형"] && totals["공격형"] > totals["안정형"]) return "공격형";
  if (totals["안정형"] > totals["중립형"]) return "안정형";
  return "중립형";
}
