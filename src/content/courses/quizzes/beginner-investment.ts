import type { Quiz } from "@/types";

// 초급 투자 퀴즈 (신규 4세트)
export const beginnerInvestmentQuizzes: Quiz[] = [
  {
    id: "quiz-etf-basics",
    courseId: "beginner-investment",
    lessonId: "etf-basics",
    title: "ETF 기초 - 퀴즈",
    questions: [
      {
        id: "q8-1",
        lessonId: "etf-basics",
        question: "ETF와 일반 펀드의 가장 큰 차이점은?",
        type: "객관식",
        options: [
          "ETF는 원금이 보장된다",
          "ETF는 주식처럼 실시간 거래가 가능하다",
          "ETF는 수익률이 항상 더 높다",
          "ETF는 배당금을 지급하지 않는다",
        ],
        correctIndex: 1,
        explanation:
          "ETF는 거래소에 상장되어 주식처럼 실시간으로 매매할 수 있습니다. 일반 펀드는 하루에 한 번 기준가로 거래되지만, ETF는 시장 운영 시간 중 언제든 사고팔 수 있습니다.",
      },
      {
        id: "q8-2",
        lessonId: "etf-basics",
        question: "ETF의 장점이 아닌 것은?",
        type: "객관식",
        options: [
          "낮은 운용 보수",
          "분산투자 효과",
          "원금 보장",
          "높은 유동성",
        ],
        correctIndex: 2,
        explanation:
          "ETF는 낮은 보수, 분산투자, 높은 유동성 등의 장점이 있지만, 원금이 보장되지는 않습니다. ETF도 기초자산의 가격 변동에 따라 손실이 발생할 수 있습니다.",
      },
      {
        id: "q8-3",
        lessonId: "etf-basics",
        question: "ETF의 '추적오차'란 무엇인가요?",
        type: "객관식",
        options: [
          "ETF 가격과 주문 가격의 차이",
          "ETF 수익률과 기초지수 수익률의 차이",
          "매수 시점과 매도 시점의 가격 차이",
          "ETF 운용 보수와 실제 비용의 차이",
        ],
        correctIndex: 1,
        explanation:
          "추적오차는 ETF의 실제 수익률과 기초지수 수익률 간의 괴리를 말합니다. 추적오차가 작을수록 해당 ETF가 기초지수를 잘 따라가고 있다는 의미입니다.",
      },
      {
        id: "q8-4",
        lessonId: "etf-basics",
        question: "ETF의 보수율(운용비용)은 일반 액티브 펀드보다 대체로 낮다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "대부분의 ETF는 지수를 수동적으로 추적하는 패시브 운용 방식이므로 펀드매니저의 적극적 운용이 필요 없어 보수율이 낮습니다. 일반 액티브 펀드 보수율이 1~2%인 반면 ETF는 0.1~0.5% 수준입니다.",
      },
    ],
  },
  {
    id: "quiz-diversification",
    courseId: "beginner-investment",
    lessonId: "diversification",
    title: "분산투자의 원칙 - 퀴즈",
    questions: [
      {
        id: "q9-1",
        lessonId: "diversification",
        question: "분산투자의 핵심 효과는 무엇인가요?",
        type: "객관식",
        options: [
          "수익률을 극대화한다",
          "세금을 줄여준다",
          "비체계적 위험을 줄여준다",
          "거래 수수료를 낮춰준다",
        ],
        correctIndex: 2,
        explanation:
          "분산투자의 핵심은 개별 종목의 비체계적 위험을 줄이는 것입니다. 여러 자산에 나눠 투자하면 한 종목의 급락이 전체 포트폴리오에 미치는 영향을 최소화할 수 있습니다.",
      },
      {
        id: "q9-2",
        lessonId: "diversification",
        question: "분산투자에서 '상관관계'가 중요한 이유는?",
        type: "객관식",
        options: [
          "상관관계가 높은 자산끼리 투자해야 수익이 높다",
          "상관관계가 낮은 자산끼리 투자해야 분산 효과가 크다",
          "상관관계는 분산투자와 관계없다",
          "상관관계가 음수인 자산은 투자하면 안 된다",
        ],
        correctIndex: 1,
        explanation:
          "상관관계가 낮거나 음의 상관관계를 가진 자산끼리 조합하면 분산 효과가 극대화됩니다. 같은 방향으로 움직이는 자산만 모아두면 분산의 의미가 줄어듭니다.",
      },
      {
        id: "q9-3",
        lessonId: "diversification",
        question: "포트폴리오에 20~30개 이상의 종목을 담으면 분산투자 효과가 크게 증가한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "연구에 따르면 약 15~20개 종목이면 비체계적 위험의 대부분이 제거됩니다. 그 이상 종목을 추가해도 분산 효과의 증가폭은 미미하며, 오히려 관리가 어려워질 수 있습니다.",
      },
    ],
  },
  {
    id: "quiz-long-vs-short",
    courseId: "beginner-investment",
    lessonId: "long-vs-short",
    title: "장기투자 vs 단기투자 - 퀴즈",
    questions: [
      {
        id: "q10-1",
        lessonId: "long-vs-short",
        question: "장기투자에서 '복리효과'란 무엇인가요?",
        type: "객관식",
        options: [
          "원금에만 이자가 붙는 것",
          "원금과 이자에 다시 이자가 붙는 것",
          "세금이 면제되는 것",
          "손실이 원금을 초과하지 않는 것",
        ],
        correctIndex: 1,
        explanation:
          "복리효과는 투자 수익이 재투자되어 원금뿐 아니라 이전 수익에도 다시 수익이 발생하는 현상입니다. 시간이 길어질수록 복리의 위력은 기하급수적으로 커집니다.",
      },
      {
        id: "q10-2",
        lessonId: "long-vs-short",
        question: "장기투자의 장점이 아닌 것은?",
        type: "객관식",
        options: [
          "복리효과를 누릴 수 있다",
          "거래 비용이 적게 든다",
          "단기 변동성에 일희일비하지 않는다",
          "항상 단기투자보다 수익률이 높다",
        ],
        correctIndex: 3,
        explanation:
          "장기투자가 복리효과, 낮은 거래비용, 심리적 안정 등의 장점이 있지만, 항상 단기투자보다 수익률이 높다고 단정할 수는 없습니다. 종목 선정과 시장 상황에 따라 결과는 달라집니다.",
      },
      {
        id: "q10-3",
        lessonId: "long-vs-short",
        question: "데이트레이딩은 하루 안에 매수와 매도를 완료하는 초단기 매매 방식이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "데이트레이딩(Day Trading)은 같은 날 안에 매수와 매도를 모두 마치는 초단기 매매 전략입니다. 높은 집중력과 빠른 판단력이 필요하며, 거래 비용이 많이 발생할 수 있습니다.",
      },
    ],
  },
  {
    id: "quiz-investment-mindset",
    courseId: "beginner-investment",
    lessonId: "investment-mindset",
    title: "투자 심리와 마인드셋 - 퀴즈",
    questions: [
      {
        id: "q11-1",
        lessonId: "investment-mindset",
        question: "'FOMO(Fear Of Missing Out)'가 투자에서 의미하는 것은?",
        type: "객관식",
        options: [
          "시장 폭락에 대한 공포",
          "남들이 수익을 내는데 나만 놓칠까 봐 느끼는 조급함",
          "투자 원금을 잃을까 봐 느끼는 두려움",
          "경제 불황이 올까 봐 느끼는 불안감",
        ],
        correctIndex: 1,
        explanation:
          "FOMO는 다른 투자자들이 수익을 내고 있는데 자신만 기회를 놓치고 있다는 조급함입니다. 이 심리에 휘둘리면 충분한 분석 없이 고점에서 매수하는 실수를 범할 수 있습니다.",
      },
      {
        id: "q11-2",
        lessonId: "investment-mindset",
        question: "'확증편향'이란 무엇인가요?",
        type: "객관식",
        options: [
          "새로운 정보를 객관적으로 분석하는 것",
          "자신의 기존 믿음을 확인해주는 정보만 선택적으로 받아들이는 것",
          "전문가의 의견을 무조건 따르는 것",
          "과거 실적이 미래에도 반복될 것이라고 믿는 것",
        ],
        correctIndex: 1,
        explanation:
          "확증편향은 자신이 이미 믿고 있는 것을 뒷받침하는 정보만 찾고, 반대되는 정보는 무시하는 인지적 편향입니다. 투자에서 매우 위험한 심리적 함정 중 하나입니다.",
      },
      {
        id: "q11-3",
        lessonId: "investment-mindset",
        question: "손실회피 편향이란 같은 금액의 이익보다 손실을 더 크게 느끼는 심리이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "손실회피 편향은 행동경제학의 핵심 개념으로, 사람들은 동일한 금액이라도 이익의 기쁨보다 손실의 고통을 약 2배 정도 더 크게 느낍니다. 이로 인해 손절을 미루거나 이익을 너무 빨리 확정하는 경향이 있습니다.",
      },
      {
        id: "q11-4",
        lessonId: "investment-mindset",
        question: "시장의 '공포-탐욕 사이클'에서 현명한 투자자가 취해야 할 태도는?",
        type: "객관식",
        options: [
          "군중의 심리에 맞춰 함께 움직인다",
          "공포 구간에서 매도하고 탐욕 구간에서 매수한다",
          "공포 구간에서 기회를 찾고 탐욕 구간에서 경계한다",
          "시장 심리를 완전히 무시한다",
        ],
        correctIndex: 2,
        explanation:
          "워런 버핏의 명언처럼 '남들이 공포에 떨 때 탐욕을 부리고, 남들이 탐욕을 부릴 때 공포를 가져라'가 핵심입니다. 시장이 과도하게 공포에 빠지면 저평가된 자산을 찾을 기회이고, 과도한 탐욕은 거품의 신호일 수 있습니다.",
      },
    ],
  },
];
