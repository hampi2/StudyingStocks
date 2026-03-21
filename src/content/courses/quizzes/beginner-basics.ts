import type { Quiz } from "@/types";

// 초급 기초 퀴즈 (기존 4세트 + 신규 3세트 = 7세트)
export const beginnerBasicsQuizzes: Quiz[] = [
  // ============================================
  // 기존 퀴즈 (q1 ~ q4)
  // ============================================
  {
    id: "quiz-what-is-stock",
    courseId: "beginner-basics",
    lessonId: "what-is-stock",
    title: "주식이란 무엇인가? - 퀴즈",
    questions: [
      {
        id: "q1-1",
        lessonId: "what-is-stock",
        question: "주식을 보유하면 어떤 의미가 있나요?",
        type: "객관식",
        options: [
          "기업에 돈을 빌려준 것이다",
          "기업의 소유권 일부를 갖는 것이다",
          "기업의 직원이 되는 것이다",
          "기업의 채권을 산 것이다",
        ],
        correctIndex: 1,
        explanation:
          "주식은 기업의 소유권을 나눈 것입니다. 주식을 보유하면 그 기업의 일부를 소유하게 됩니다.",
      },
      {
        id: "q1-2",
        lessonId: "what-is-stock",
        question: "주주의 권리가 아닌 것은?",
        type: "객관식",
        options: [
          "의결권",
          "배당금 수령 권리",
          "경영 직접 참여 권리",
          "잔여재산 청구권",
        ],
        correctIndex: 2,
        explanation:
          "주주는 의결권, 배당금 수령 권리, 잔여재산 청구권을 갖지만, 경영에 직접 참여할 수는 없습니다. 경영은 이사회와 경영진이 담당합니다.",
      },
      {
        id: "q1-3",
        lessonId: "what-is-stock",
        question: "한국 주식시장에는 일일 가격 제한(상한/하한)이 있다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "한국 주식시장은 전일 종가 대비 ±30%의 가격 제한이 있습니다. 미국은 이런 제한이 없고 서킷브레이커 제도를 운영합니다.",
      },
      {
        id: "q1-4",
        lessonId: "what-is-stock",
        question: "기업이 주식을 발행하는 주된 이유는?",
        type: "객관식",
        options: [
          "직원에게 월급을 주기 위해",
          "세금을 줄이기 위해",
          "사업 자금을 조달하기 위해",
          "주주에게 선물을 주기 위해",
        ],
        correctIndex: 2,
        explanation:
          "기업은 사업 성장에 필요한 자금을 조달하기 위해 주식을 발행합니다. 이는 은행 대출과 달리 이자를 갚을 필요가 없는 자금 조달 방법입니다.",
      },
    ],
  },
  {
    id: "quiz-stock-market-structure",
    courseId: "beginner-basics",
    lessonId: "stock-market-structure",
    title: "주식시장의 구조 - 퀴즈",
    questions: [
      {
        id: "q2-1",
        lessonId: "stock-market-structure",
        question: "IPO가 이루어지는 시장은?",
        type: "객관식",
        options: ["1차 시장", "2차 시장", "3차 시장", "파생상품 시장"],
        correctIndex: 0,
        explanation:
          "IPO(기업공개)는 1차 시장에서 이루어집니다. 이후 투자자들 간의 거래는 2차 시장에서 이루어집니다.",
      },
      {
        id: "q2-2",
        lessonId: "stock-market-structure",
        question: "코스닥(KOSDAQ)은 어떤 기업 중심의 시장인가요?",
        type: "객관식",
        options: [
          "대기업 중심",
          "중소·벤처기업 중심",
          "외국기업 중심",
          "국영기업 중심",
        ],
        correctIndex: 1,
        explanation:
          "코스닥은 중소·벤처기업 중심의 시장입니다. 대기업 중심은 코스피입니다.",
      },
      {
        id: "q2-3",
        lessonId: "stock-market-structure",
        question: "S&P 500은 미국 대형주 500개로 구성된 주가지수이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "S&P 500은 미국의 대표적인 주가지수로, 미국 대형주 500개로 구성되어 있습니다.",
      },
    ],
  },
  {
    id: "quiz-how-to-trade",
    courseId: "beginner-basics",
    lessonId: "how-to-trade",
    title: "주문 유형과 매매 방법 - 퀴즈",
    questions: [
      {
        id: "q3-1",
        lessonId: "how-to-trade",
        question: "지정가 주문의 특징은?",
        type: "객관식",
        options: [
          "현재 시장 가격으로 즉시 체결된다",
          "원하는 가격을 지정하여 거래한다",
          "항상 시장가보다 비싸게 산다",
          "자동으로 손절매가 설정된다",
        ],
        correctIndex: 1,
        explanation:
          "지정가 주문은 원하는 가격을 지정하여 거래하는 방식입니다. 원하는 가격에 거래할 수 있지만, 체결되지 않을 수도 있습니다.",
      },
      {
        id: "q3-2",
        lessonId: "how-to-trade",
        question:
          "시장가 주문은 빠르게 체결되지만, 원하는 가격과 다를 수 있다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "시장가 주문은 현재 시장 가격으로 즉시 체결되므로 빠르지만, 슬리피지(slippage)로 인해 원하는 가격과 차이가 날 수 있습니다.",
      },
    ],
  },
  {
    id: "quiz-reading-stock-chart",
    courseId: "beginner-basics",
    lessonId: "reading-stock-chart",
    title: "주식 차트 읽는 법 - 퀴즈",
    questions: [
      {
        id: "q4-1",
        lessonId: "reading-stock-chart",
        question: "캔들차트의 양봉은 무엇을 의미하나요?",
        type: "객관식",
        options: [
          "종가가 시가보다 낮다",
          "종가가 시가보다 높다",
          "거래량이 많다",
          "주가가 하락했다",
        ],
        correctIndex: 1,
        explanation:
          "양봉은 종가가 시가보다 높은 경우입니다. 즉, 해당 기간에 가격이 올랐음을 의미합니다.",
      },
      {
        id: "q4-2",
        lessonId: "reading-stock-chart",
        question: "골든크로스란 무엇인가요?",
        type: "객관식",
        options: [
          "단기선이 장기선을 아래로 돌파",
          "단기선이 장기선을 위로 돌파",
          "거래량이 급증하는 것",
          "주가가 사상 최고가를 경신하는 것",
        ],
        correctIndex: 1,
        explanation:
          "골든크로스는 단기 이동평균선이 장기 이동평균선을 아래에서 위로 돌파하는 것으로, 매수 신호로 해석됩니다.",
      },
      {
        id: "q4-3",
        lessonId: "reading-stock-chart",
        question:
          "거래량이 증가하면서 주가가 하락하는 것은 강한 매도세를 나타낸다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "거래량 증가 + 가격 하락은 강한 매도세(많은 사람이 팔고 있음)를 나타내며, 부정적인 신호로 해석됩니다.",
      },
    ],
  },

  // ============================================
  // 신규 퀴즈 (q5 ~ q7)
  // ============================================
  {
    id: "quiz-investment-risks",
    courseId: "beginner-basics",
    lessonId: "investment-risks",
    title: "투자 위험의 이해 - 퀴즈",
    questions: [
      {
        id: "q5-1",
        lessonId: "investment-risks",
        question:
          "경기침체, 금리변동 등 시장 전체에 영향을 미치는 위험을 무엇이라 하나요?",
        type: "객관식",
        options: [
          "비체계적 위험",
          "체계적 위험(시장위험)",
          "신용 위험",
          "유동성 위험",
        ],
        correctIndex: 1,
        explanation:
          "체계적 위험(시장위험)은 경기침체, 금리변동, 전쟁 등 시장 전체에 영향을 미치는 위험입니다. 분산투자로 제거할 수 없으며, 비체계적 위험과 구분됩니다.",
      },
      {
        id: "q5-2",
        lessonId: "investment-risks",
        question: "분산투자를 하면 체계적 위험과 비체계적 위험을 모두 제거할 수 있다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "분산투자는 개별 종목의 비체계적 위험만 줄일 수 있습니다. 시장 전체에 영향을 미치는 체계적 위험은 분산투자로 제거할 수 없습니다.",
      },
      {
        id: "q5-3",
        lessonId: "investment-risks",
        question: "손절매의 주된 목적은 무엇인가요?",
        type: "객관식",
        options: [
          "수익을 극대화하기 위해",
          "세금을 줄이기 위해",
          "추가 손실을 방지하기 위해",
          "거래 수수료를 절약하기 위해",
        ],
        correctIndex: 2,
        explanation:
          "손절매는 투자 손실이 일정 수준 이상 커지는 것을 막기 위한 리스크 관리 기법입니다. 정해진 가격에 도달하면 자동으로 매도하여 추가 손실을 방지합니다.",
      },
    ],
  },
  {
    id: "quiz-investment-accounts",
    courseId: "beginner-basics",
    lessonId: "investment-accounts",
    title: "증권 계좌와 세금 - 퀴즈",
    questions: [
      {
        id: "q6-1",
        lessonId: "investment-accounts",
        question: "한국에서 주식 매도 시 부과되는 증권거래세율(코스피 기준)은 약 얼마인가요?",
        type: "객관식",
        options: ["0.05%", "0.18%", "0.5%", "1%"],
        correctIndex: 1,
        explanation:
          "코스피 기준 증권거래세율은 약 0.18%입니다. 이는 매도 금액에 대해 부과되며, 매수 시에는 부과되지 않습니다. 코스닥은 0.18%로 동일합니다.",
      },
      {
        id: "q6-2",
        lessonId: "investment-accounts",
        question: "ISA(개인종합자산관리계좌)의 가장 큰 장점은?",
        type: "객관식",
        options: [
          "무제한 투자 가능",
          "일정 금액까지 비과세 또는 분리과세 혜택",
          "주식 매수 수수료 면제",
          "원금 보장",
        ],
        correctIndex: 1,
        explanation:
          "ISA 계좌는 일정 금액까지 투자 수익에 대해 비과세 또는 분리과세 혜택을 제공합니다. 다양한 금융상품을 하나의 계좌에서 운용할 수 있는 절세 계좌입니다.",
      },
      {
        id: "q6-3",
        lessonId: "investment-accounts",
        question: "한국 주식시장에서 T+2 결제란 무엇을 의미하나요?",
        type: "객관식",
        options: [
          "매수 후 2시간 뒤 결제",
          "매수 후 2영업일 뒤 실제 결제 완료",
          "2번에 나눠서 결제",
          "2% 수수료 결제",
        ],
        correctIndex: 1,
        explanation:
          "T+2는 거래일(Trade day) 이후 2영업일에 실제 결제가 이루어진다는 뜻입니다. 즉, 월요일에 매수하면 수요일에 실제 대금 결제와 주식 이전이 완료됩니다.",
      },
    ],
  },
  {
    id: "quiz-reading-financial-news",
    courseId: "beginner-basics",
    lessonId: "reading-financial-news",
    title: "경제 뉴스 읽는 법 - 퀴즈",
    questions: [
      {
        id: "q7-1",
        lessonId: "reading-financial-news",
        question: "GDP(국내총생산)가 의미하는 것은?",
        type: "객관식",
        options: [
          "한 나라의 외채 총액",
          "한 나라에서 일정 기간 생산된 재화와 서비스의 총 가치",
          "한 나라의 수출액에서 수입액을 뺀 값",
          "한 나라의 총 인구수 대비 소득",
        ],
        correctIndex: 1,
        explanation:
          "GDP(국내총생산)는 한 나라에서 일정 기간 동안 생산된 모든 재화와 서비스의 시장 가치 합계입니다. 경제 규모와 성장률을 판단하는 가장 대표적인 지표입니다.",
      },
      {
        id: "q7-2",
        lessonId: "reading-financial-news",
        question: "증권가에서 '컨센서스'란 무엇을 의미하나요?",
        type: "객관식",
        options: [
          "기업의 공식 실적 발표",
          "증권사 애널리스트들의 평균 예측치",
          "정부의 경제 정책 발표",
          "기관투자자들의 매수 합의",
        ],
        correctIndex: 1,
        explanation:
          "컨센서스는 여러 증권사 애널리스트들이 예측한 실적(매출, 영업이익 등)의 평균치입니다. 실적 발표 시 컨센서스 대비 상회/하회 여부가 주가에 큰 영향을 미칩니다.",
      },
      {
        id: "q7-3",
        lessonId: "reading-financial-news",
        question: "주식시장에서 '선반영'이란 호재나 악재가 이미 주가에 반영되었다는 뜻이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "선반영은 예상되는 호재나 악재가 이미 주가에 반영되었다는 의미입니다. 이 때문에 좋은 뉴스가 나와도 주가가 오르지 않거나, 나쁜 뉴스에도 주가가 빠지지 않는 현상이 나타날 수 있습니다.",
      },
    ],
  },
];
