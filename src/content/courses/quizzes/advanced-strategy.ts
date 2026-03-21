import type { Quiz } from "@/types";

// 고급 전략 퀴즈 (신규 3세트)
export const advancedStrategyQuizzes: Quiz[] = [
  {
    id: "quiz-value-investing",
    courseId: "advanced-strategy",
    lessonId: "value-investing",
    title: "가치투자 전략 - 퀴즈",
    questions: [
      {
        id: "q21-1",
        lessonId: "value-investing",
        question: "벤저민 그레이엄이 강조한 '안전마진(Margin of Safety)'이란?",
        type: "객관식",
        options: [
          "포트폴리오에서 현금 비중을 높게 유지하는 것",
          "기업의 내재가치보다 충분히 낮은 가격에 매수하여 손실 위험을 줄이는 것",
          "손절매 라인을 설정하는 것",
          "분산투자를 극대화하는 것",
        ],
        correctIndex: 1,
        explanation:
          "안전마진은 가치투자의 핵심 개념으로, 기업의 내재가치보다 충분히 낮은 가격에 매수함으로써 분석 오류나 예기치 못한 악재에 대한 완충 장치를 확보하는 전략입니다. 워런 버핏도 이 원칙을 투자의 기본으로 삼고 있습니다.",
      },
      {
        id: "q21-2",
        lessonId: "value-investing",
        question: "워런 버핏이 말하는 '경제적 해자(Economic Moat)'란?",
        type: "객관식",
        options: [
          "기업이 보유한 현금성 자산",
          "경쟁사가 쉽게 모방할 수 없는 지속적인 경쟁 우위",
          "정부의 규제로 인한 독점적 지위",
          "기업의 높은 부채비율",
        ],
        correctIndex: 1,
        explanation:
          "경제적 해자는 브랜드 파워, 네트워크 효과, 원가 우위, 높은 전환비용 등 경쟁사가 쉽게 모방할 수 없는 경쟁 우위를 말합니다. 넓은 해자를 가진 기업은 장기간 높은 수익성을 유지할 가능성이 높습니다.",
      },
      {
        id: "q21-3",
        lessonId: "value-investing",
        question: "'가치 함정(Value Trap)'이란 무엇인가요?",
        type: "객관식",
        options: [
          "고평가된 성장주에 투자하는 것",
          "저평가로 보이지만 실제로는 기업 펀더멘털이 악화되고 있는 종목",
          "배당수익률이 높은 종목",
          "PER이 높은 종목",
        ],
        correctIndex: 1,
        explanation:
          "가치 함정은 PER, PBR 등 밸류에이션 지표상 저평가로 보이지만, 실제로는 실적 악화, 산업 구조 변화 등으로 주가가 계속 하락하는 종목입니다. 단순히 숫자가 낮다고 저평가가 아니며, 기업의 미래 전망을 반드시 확인해야 합니다.",
      },
      {
        id: "q21-4",
        lessonId: "value-investing",
        question: "가치투자에서 PER 스크리닝은 저PER 종목만 걸러내면 충분하다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "저PER 스크리닝은 가치투자의 출발점일 뿐입니다. 기업의 재무 건전성, 성장 전망, 경쟁 우위, 경영진의 역량 등을 종합적으로 분석해야 합니다. 저PER에는 가치 함정이 숨어 있을 수 있으므로 정성적 분석이 반드시 필요합니다.",
      },
    ],
  },
  {
    id: "quiz-growth-investing",
    courseId: "advanced-strategy",
    lessonId: "growth-investing",
    title: "성장투자 전략 - 퀴즈",
    questions: [
      {
        id: "q22-1",
        lessonId: "growth-investing",
        question: "PEG(주가수익성장비율)가 1 미만이면 일반적으로 어떤 의미인가요?",
        type: "객관식",
        options: [
          "기업이 적자를 내고 있다",
          "성장률 대비 주가가 저평가되어 있을 가능성이 있다",
          "기업의 부채가 과도하다",
          "배당금이 없다",
        ],
        correctIndex: 1,
        explanation:
          "PEG = PER / 이익성장률로, 1 미만이면 이익 성장률 대비 PER이 낮아 성장성 대비 저평가 가능성을 시사합니다. 피터 린치가 성장주 발굴에 즐겨 사용한 지표이며, 1 이하가 이상적이라고 제시했습니다.",
      },
      {
        id: "q22-2",
        lessonId: "growth-investing",
        question: "PSR(주가매출비율)은 주로 어떤 기업을 평가할 때 유용한가요?",
        type: "객관식",
        options: [
          "높은 배당을 지급하는 성숙 기업",
          "아직 이익이 나지 않는 초기 성장 기업",
          "자산이 많은 제조업 기업",
          "정부 출자 기업",
        ],
        correctIndex: 1,
        explanation:
          "PSR(Price-to-Sales Ratio)은 아직 순이익이 발생하지 않아 PER을 적용할 수 없는 초기 성장 기업이나 스타트업의 가치를 평가할 때 유용합니다. 매출액 대비 시가총액을 비교하여 상대적 가치를 판단합니다.",
      },
      {
        id: "q22-3",
        lessonId: "growth-investing",
        question: "윌리엄 오닐의 CANSLIM 전략에서 'C'는 현재 분기 이익(Current Quarterly Earnings)의 강한 성장을 의미한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "CANSLIM의 'C'는 Current Quarterly Earnings로, 최근 분기 주당순이익(EPS)이 전년 동기 대비 25% 이상 성장한 종목을 선호합니다. 오닐은 강한 이익 성장이 주가 상승의 핵심 동력이라고 강조했습니다.",
      },
    ],
  },
  {
    id: "quiz-portfolio-management",
    courseId: "advanced-strategy",
    lessonId: "portfolio-management",
    title: "포트폴리오 관리 - 퀴즈",
    questions: [
      {
        id: "q23-1",
        lessonId: "portfolio-management",
        question: "현대포트폴리오이론(MPT)의 핵심 주장은?",
        type: "객관식",
        options: [
          "집중투자가 분산투자보다 항상 우월하다",
          "적절한 자산 배분을 통해 동일 위험에서 더 높은 수익을 추구할 수 있다",
          "모든 자산의 수익률은 예측 가능하다",
          "채권은 항상 주식보다 안전하다",
        ],
        correctIndex: 1,
        explanation:
          "해리 마코위츠의 현대포트폴리오이론은 상관관계가 낮은 자산들을 적절히 조합하면 동일한 위험 수준에서 더 높은 기대수익을, 또는 동일한 기대수익에서 더 낮은 위험을 달성할 수 있다는 이론입니다.",
      },
      {
        id: "q23-2",
        lessonId: "portfolio-management",
        question: "'효율적 프론티어(Efficient Frontier)'란 무엇인가요?",
        type: "객관식",
        options: [
          "최고 수익률을 내는 단일 자산",
          "주어진 위험 수준에서 최대 기대수익을 달성하는 포트폴리오 조합의 집합",
          "손실이 발생하지 않는 투자 전략",
          "시장 평균 수익률과 동일한 포트폴리오",
        ],
        correctIndex: 1,
        explanation:
          "효율적 프론티어는 각 위험 수준에서 최대 기대수익을 달성하는 최적 포트폴리오 조합들의 곡선입니다. 이 곡선 위의 포트폴리오가 가장 효율적이며, 곡선 아래는 비효율적인 포트폴리오입니다.",
      },
      {
        id: "q23-3",
        lessonId: "portfolio-management",
        question: "포트폴리오 리밸런싱의 목적은 무엇인가요?",
        type: "객관식",
        options: [
          "수익이 난 종목을 더 많이 사는 것",
          "목표 자산 배분 비율을 원래대로 되돌리는 것",
          "모든 종목을 같은 비중으로 맞추는 것",
          "손실 종목만 매도하는 것",
        ],
        correctIndex: 1,
        explanation:
          "리밸런싱은 시간이 지나면서 자산 가격 변동으로 인해 변한 포트폴리오의 자산 배분 비율을 원래 목표 비율로 되돌리는 과정입니다. 이를 통해 위험 수준을 관리하고, 자연스럽게 고평가 자산을 줄이고 저평가 자산을 늘리는 효과가 있습니다.",
      },
      {
        id: "q23-4",
        lessonId: "portfolio-management",
        question: "자산배분(Asset Allocation)은 포트폴리오 수익률의 대부분을 결정하는 가장 중요한 요소이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "여러 연구에 따르면 장기 투자 성과의 약 90% 이상이 자산배분에 의해 결정됩니다. 개별 종목 선정이나 매매 타이밍보다 주식, 채권, 대안자산 등의 배분 비율이 훨씬 중요한 역할을 합니다.",
      },
    ],
  },
];
