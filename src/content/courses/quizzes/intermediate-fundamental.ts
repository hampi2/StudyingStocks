import type { Quiz } from "@/types";

// 중급 기본적분석 퀴즈 (신규 4세트)
export const intermediateFundamentalQuizzes: Quiz[] = [
  {
    id: "quiz-financial-statements",
    courseId: "intermediate-fundamental",
    lessonId: "financial-statements",
    title: "재무제표 읽기 - 퀴즈",
    questions: [
      {
        id: "q17-1",
        lessonId: "financial-statements",
        question: "손익계산서에서 가장 핵심적으로 봐야 할 항목은?",
        type: "객관식",
        options: [
          "총자산",
          "매출액과 영업이익",
          "발행주식수",
          "현금 보유량",
        ],
        correctIndex: 1,
        explanation:
          "손익계산서에서 매출액은 기업의 사업 규모를, 영업이익은 본업에서의 수익성을 보여줍니다. 매출 성장률과 영업이익률의 추이를 확인하면 기업의 경쟁력과 수익 구조를 파악할 수 있습니다.",
      },
      {
        id: "q17-2",
        lessonId: "financial-statements",
        question: "재무상태표(대차대조표)의 기본 등식은?",
        type: "객관식",
        options: [
          "매출 = 비용 + 이익",
          "자산 = 부채 + 자본",
          "현금 = 수입 - 지출",
          "이익 = 매출 - 원가",
        ],
        correctIndex: 1,
        explanation:
          "재무상태표의 기본 등식은 '자산 = 부채 + 자본'입니다. 기업이 보유한 자산은 타인 자본(부채)과 자기 자본의 합으로 구성됩니다. 이 등식은 항상 성립해야 합니다.",
      },
      {
        id: "q17-3",
        lessonId: "financial-statements",
        question: "현금흐름표가 중요한 이유는 무엇인가요?",
        type: "객관식",
        options: [
          "주가를 직접 예측할 수 있다",
          "회계적 이익과 실제 현금 흐름의 차이를 파악할 수 있다",
          "미래 매출을 정확히 예측할 수 있다",
          "경쟁사와 직접 비교할 수 있다",
        ],
        correctIndex: 1,
        explanation:
          "손익계산서의 이익은 회계 처리 방식에 따라 조정될 수 있지만, 현금흐름표는 실제 현금의 유입과 유출을 보여줍니다. 이익은 나지만 현금이 부족한 기업은 위험할 수 있으므로, 현금흐름표 확인이 중요합니다.",
      },
      {
        id: "q17-4",
        lessonId: "financial-statements",
        question: "FCF(잉여현금흐름)는 영업현금흐름에서 자본적 지출을 뺀 금액이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "FCF(Free Cash Flow)는 영업활동으로 벌어들인 현금에서 사업 유지에 필요한 자본적 지출(설비투자 등)을 차감한 금액입니다. 기업이 자유롭게 사용할 수 있는 현금으로, 배당, 자사주 매입, 부채 상환 등에 활용됩니다.",
      },
    ],
  },
  {
    id: "quiz-valuation-ratios",
    courseId: "intermediate-fundamental",
    lessonId: "valuation-ratios",
    title: "밸류에이션 지표 - 퀴즈",
    questions: [
      {
        id: "q18-1",
        lessonId: "valuation-ratios",
        question: "PER(주가수익비율)이 높다는 것은 일반적으로 무엇을 의미하나요?",
        type: "객관식",
        options: [
          "기업의 수익성이 나쁘다",
          "주가가 이익 대비 비싸다(고평가 가능성)",
          "기업의 부채가 많다",
          "배당금이 높다",
        ],
        correctIndex: 1,
        explanation:
          "PER이 높으면 주가가 이익 대비 비싸게 거래되고 있다는 뜻입니다. 다만 높은 PER이 반드시 고평가를 의미하지는 않으며, 높은 성장이 기대되는 기업은 PER이 높을 수 있습니다.",
      },
      {
        id: "q18-2",
        lessonId: "valuation-ratios",
        question: "PBR(주가순자산비율)이 1 미만이면 어떤 의미인가요?",
        type: "객관식",
        options: [
          "기업이 적자를 내고 있다",
          "주가가 기업의 순자산가치보다 낮게 거래되고 있다",
          "기업의 부채가 자산보다 많다",
          "배당수익률이 높다",
        ],
        correctIndex: 1,
        explanation:
          "PBR 1 미만은 시장에서 기업의 주가가 장부상 순자산가치보다 낮게 평가되고 있다는 뜻입니다. 저평가 기회일 수 있지만, 기업의 수익성 악화나 자산 가치 하락이 반영된 것일 수도 있으므로 다른 지표와 함께 판단해야 합니다.",
      },
      {
        id: "q18-3",
        lessonId: "valuation-ratios",
        question: "ROE 듀퐁분석은 ROE를 어떤 요소로 분해하나요?",
        type: "객관식",
        options: [
          "매출성장률 x PER x PBR",
          "순이익률 x 자산회전율 x 재무레버리지",
          "영업이익률 x 부채비율 x 배당성향",
          "EPS x BPS x DPS",
        ],
        correctIndex: 1,
        explanation:
          "듀퐁분석은 ROE를 '순이익률(수익성) x 자산회전율(효율성) x 재무레버리지(부채 활용도)'로 분해합니다. 이를 통해 ROE가 높은 이유가 수익성 때문인지, 효율성 때문인지, 부채 활용 때문인지 파악할 수 있습니다.",
      },
      {
        id: "q18-4",
        lessonId: "valuation-ratios",
        question: "EV/EBITDA는 기업가치를 세전영업이익으로 나눈 지표로, 낮을수록 저평가를 의미한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "EV/EBITDA는 기업가치(EV = 시가총액 + 순부채)를 세전·감가상각전 영업이익(EBITDA)으로 나눈 지표입니다. 낮을수록 기업이 벌어들이는 이익 대비 시장 평가가 낮다는 뜻으로, 저평가 가능성을 시사합니다.",
      },
    ],
  },
  {
    id: "quiz-industry-comparison",
    courseId: "intermediate-fundamental",
    lessonId: "industry-comparison",
    title: "동종업계 비교 분석 - 퀴즈",
    questions: [
      {
        id: "q19-1",
        lessonId: "industry-comparison",
        question: "동종업계 비교 분석이 중요한 이유는?",
        type: "객관식",
        options: [
          "모든 업종의 PER은 동일해야 하므로",
          "같은 산업 내에서 상대적 가치를 판단할 수 있으므로",
          "다른 산업과 비교하면 정확한 가치를 알 수 없으므로",
          "정부 규제가 업종별로 같으므로",
        ],
        correctIndex: 1,
        explanation:
          "산업마다 성장률, 자본구조, 수익성이 다르므로 동종업계 내에서 비교해야 의미 있는 평가가 가능합니다. IT 기업의 PER을 은행의 PER과 직접 비교하는 것은 적절하지 않습니다.",
      },
      {
        id: "q19-2",
        lessonId: "industry-comparison",
        question: "'상대적 밸류에이션'이란 무엇인가요?",
        type: "객관식",
        options: [
          "기업의 절대적 내재가치를 계산하는 방법",
          "동종업계나 시장 평균 대비 상대적으로 저평가/고평가를 판단하는 방법",
          "기업의 과거 실적만으로 가치를 평가하는 방법",
          "주가의 절대 금액으로 비교하는 방법",
        ],
        correctIndex: 1,
        explanation:
          "상대적 밸류에이션은 PER, PBR 등의 지표를 동종업계 또는 시장 평균과 비교하여 상대적으로 저평가인지 고평가인지 판단하는 방법입니다. DCF 같은 절대적 밸류에이션과 보완적으로 사용됩니다.",
      },
      {
        id: "q19-3",
        lessonId: "industry-comparison",
        question: "섹터 평균 PER이 15배인데 A기업의 PER이 10배라면, 무조건 A기업이 저평가된 것이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "PER이 섹터 평균보다 낮다고 무조건 저평가는 아닙니다. 성장성이 낮거나, 수익성 악화가 예상되거나, 기업 고유의 리스크가 있을 수 있습니다. 낮은 PER의 원인을 파악하는 것이 중요합니다.",
      },
    ],
  },
  {
    id: "quiz-earnings-analysis",
    courseId: "intermediate-fundamental",
    lessonId: "earnings-analysis",
    title: "실적 분석과 어닝 시즌 - 퀴즈",
    questions: [
      {
        id: "q20-1",
        lessonId: "earnings-analysis",
        question: "미국의 어닝 시즌은 보통 언제인가요?",
        type: "객관식",
        options: [
          "매월 초",
          "매 분기 종료 후 약 2~6주",
          "매년 12월",
          "매년 1월과 7월",
        ],
        correctIndex: 1,
        explanation:
          "미국 어닝 시즌은 각 분기 종료 후 약 2~6주 동안 집중적으로 실적이 발표됩니다. 1월 중순~2월(4분기), 4월 중순~5월(1분기), 7월 중순~8월(2분기), 10월 중순~11월(3분기)에 진행됩니다.",
      },
      {
        id: "q20-2",
        lessonId: "earnings-analysis",
        question: "실적이 컨센서스를 상회하는 것을 무엇이라 하나요?",
        type: "객관식",
        options: [
          "어닝 쇼크",
          "어닝 서프라이즈",
          "어닝 시즌",
          "어닝 콜",
        ],
        correctIndex: 1,
        explanation:
          "어닝 서프라이즈(Earnings Surprise)는 실제 실적이 시장 컨센서스(애널리스트 예측 평균)를 상회하는 것을 말합니다. 긍정적 서프라이즈는 주가 상승 요인이 되며, 반대로 실적이 컨센서스를 하회하면 어닝 쇼크라 합니다.",
      },
      {
        id: "q20-3",
        lessonId: "earnings-analysis",
        question: "'Sell the news(뉴스에 팔아라)'란 좋은 실적이 발표되어도 주가가 하락할 수 있다는 뜻이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "'Buy the rumor, Sell the news'는 시장에서 흔히 일어나는 현상입니다. 좋은 실적에 대한 기대가 이미 주가에 선반영되어 있으면, 실제 발표 후에는 차익 실현 매물이 나오며 주가가 하락할 수 있습니다.",
      },
    ],
  },
];
