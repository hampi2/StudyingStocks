import type { Quiz } from "@/types";

// 퀴즈 데이터
export const quizzes: Quiz[] = [
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
        question: "시장가 주문은 빠르게 체결되지만, 원하는 가격과 다를 수 있다.",
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
        question: "거래량이 증가하면서 주가가 하락하는 것은 강한 매도세를 나타낸다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "거래량 증가 + 가격 하락은 강한 매도세(많은 사람이 팔고 있음)를 나타내며, 부정적인 신호로 해석됩니다.",
      },
    ],
  },
];

// ID로 퀴즈 찾기
export function getQuizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}

// 레슨 ID로 퀴즈 찾기
export function getQuizByLessonId(lessonId: string) {
  return quizzes.find((quiz) => quiz.lessonId === lessonId);
}

// 코스 ID로 퀴즈 목록 가져오기
export function getQuizzesByCourseId(courseId: string) {
  return quizzes.filter((quiz) => quiz.courseId === courseId);
}
