import type { Quiz } from "@/types";

// 중급 기술적분석 퀴즈 (신규 5세트)
export const intermediateTechnicalQuizzes: Quiz[] = [
  {
    id: "quiz-support-resistance",
    courseId: "intermediate-technical",
    lessonId: "support-resistance",
    title: "지지선과 저항선 - 퀴즈",
    questions: [
      {
        id: "q12-1",
        lessonId: "support-resistance",
        question: "지지선(Support)이란 무엇인가요?",
        type: "객관식",
        options: [
          "주가가 더 이상 오르지 못하는 가격대",
          "주가가 하락을 멈추고 반등하는 경향이 있는 가격대",
          "거래량이 가장 많은 가격대",
          "이동평균선이 교차하는 가격대",
        ],
        correctIndex: 1,
        explanation:
          "지지선은 주가가 하락하다가 매수세가 유입되어 더 이상 하락하지 않고 반등하는 경향이 있는 가격대입니다. 과거에 여러 번 하락을 멈춘 지점이 지지선으로 형성됩니다.",
      },
      {
        id: "q12-2",
        lessonId: "support-resistance",
        question: "지지선이 뚫리면 해당 가격대는 이후 저항선 역할을 할 수 있다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "지지선과 저항선은 '역할 전환(Role Reversal)' 현상이 자주 나타납니다. 지지선이 하향 돌파되면 이후 저항선으로 전환되고, 반대로 저항선이 상향 돌파되면 지지선으로 전환되는 경우가 많습니다.",
      },
      {
        id: "q12-3",
        lessonId: "support-resistance",
        question: "저항선을 거래량 증가와 함께 돌파했을 때의 의미는?",
        type: "객관식",
        options: [
          "매도 신호이므로 즉시 매도해야 한다",
          "일시적 반등이므로 관망해야 한다",
          "강한 매수세를 동반한 상승 돌파로, 추세 전환 가능성이 높다",
          "거래량은 돌파와 무관하다",
        ],
        correctIndex: 2,
        explanation:
          "거래량 증가를 동반한 저항선 돌파는 강한 매수세가 뒷받침되고 있음을 의미합니다. 이는 신뢰도 높은 돌파 신호로, 새로운 상승 추세의 시작일 가능성이 높습니다.",
      },
    ],
  },
  {
    id: "quiz-rsi-macd",
    courseId: "intermediate-technical",
    lessonId: "rsi-macd",
    title: "RSI와 MACD 분석 - 퀴즈",
    questions: [
      {
        id: "q13-1",
        lessonId: "rsi-macd",
        question: "RSI(상대강도지수)에서 일반적으로 '과매수' 구간으로 보는 기준은?",
        type: "객관식",
        options: [
          "RSI 30 이하",
          "RSI 50 이상",
          "RSI 70 이상",
          "RSI 100",
        ],
        correctIndex: 2,
        explanation:
          "RSI가 70 이상이면 과매수 구간으로, 주가가 단기간에 과도하게 올라 조정이 올 수 있다는 신호입니다. 반대로 RSI 30 이하는 과매도 구간으로 반등 가능성을 시사합니다.",
      },
      {
        id: "q13-2",
        lessonId: "rsi-macd",
        question: "주가는 신고가를 기록했는데 RSI는 이전 고점보다 낮은 현상을 무엇이라 하나요?",
        type: "객관식",
        options: [
          "골든크로스",
          "데드크로스",
          "하락 다이버전스",
          "볼린저 밴드워크",
        ],
        correctIndex: 2,
        explanation:
          "하락 다이버전스(Bearish Divergence)는 주가가 새로운 고점을 만들었지만 RSI 등 보조지표가 이전 고점보다 낮은 현상입니다. 상승 모멘텀이 약화되고 있음을 나타내며, 하락 전환의 신호로 해석됩니다.",
      },
      {
        id: "q13-3",
        lessonId: "rsi-macd",
        question: "MACD에서 'MACD선이 신호선을 위로 돌파'하면 어떤 신호인가요?",
        type: "객관식",
        options: [
          "매도 신호",
          "매수 신호",
          "횡보 신호",
          "추세 없음 신호",
        ],
        correctIndex: 1,
        explanation:
          "MACD선이 신호선(Signal Line)을 아래에서 위로 돌파하면 매수 신호로 해석됩니다. 이는 단기 이동평균이 장기 이동평균보다 빠르게 상승하고 있음을 의미하며, 상승 모멘텀이 강해지고 있다는 뜻입니다.",
      },
      {
        id: "q13-4",
        lessonId: "rsi-macd",
        question: "MACD 히스토그램이 양수에서 음수로 전환되면 상승 모멘텀이 강화되고 있다는 뜻이다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "MACD 히스토그램이 양수에서 음수로 전환되면 오히려 상승 모멘텀이 약화되고 하락 모멘텀이 시작되고 있다는 의미입니다. 히스토그램은 MACD선과 신호선의 차이를 나타냅니다.",
      },
    ],
  },
  {
    id: "quiz-advanced-chart-patterns",
    courseId: "intermediate-technical",
    lessonId: "advanced-chart-patterns",
    title: "주요 차트 패턴 - 퀴즈",
    questions: [
      {
        id: "q14-1",
        lessonId: "advanced-chart-patterns",
        question: "'머리어깨(Head and Shoulders)' 패턴은 어떤 신호인가요?",
        type: "객관식",
        options: [
          "강력한 상승 지속 신호",
          "상승 추세에서 하락 추세로의 전환 신호",
          "횡보 구간 신호",
          "급등 직전 신호",
        ],
        correctIndex: 1,
        explanation:
          "머리어깨 패턴은 대표적인 추세 전환 패턴으로, 상승 추세의 끝에서 나타나 하락 전환을 예고합니다. 왼쪽 어깨-머리-오른쪽 어깨로 구성되며, 넥라인(목선)을 하향 돌파하면 패턴이 확인됩니다.",
      },
      {
        id: "q14-2",
        lessonId: "advanced-chart-patterns",
        question: "이중바닥(Double Bottom, W형) 패턴이 완성되면 일반적으로 어떤 의미인가요?",
        type: "객관식",
        options: [
          "하락 추세가 계속된다",
          "하락 추세에서 상승 추세로 전환된다",
          "거래량이 감소한다",
          "횡보 추세가 시작된다",
        ],
        correctIndex: 1,
        explanation:
          "이중바닥(W형)은 하락 추세 말미에 비슷한 저점을 두 번 형성한 뒤 상승 전환하는 패턴입니다. 두 번째 저점에서 매수세가 유입되어 추세가 전환되며, 넥라인 돌파 시 패턴이 확정됩니다.",
      },
      {
        id: "q14-3",
        lessonId: "advanced-chart-patterns",
        question: "삼각형 수렴 패턴(Triangle Pattern)에서 기대할 수 있는 것은?",
        type: "객관식",
        options: [
          "반드시 상승 돌파한다",
          "반드시 하락 돌파한다",
          "수렴 이후 한 방향으로 큰 움직임이 나타날 수 있다",
          "거래량이 계속 증가한다",
        ],
        correctIndex: 2,
        explanation:
          "삼각형 수렴 패턴은 고점은 낮아지고 저점은 높아지면서 가격 범위가 좁아지는 형태입니다. 수렴이 끝나면 어느 한 방향으로 강한 돌파가 나타나는 경향이 있으며, 돌파 방향은 기존 추세와 거래량 등을 종합적으로 판단해야 합니다.",
      },
      {
        id: "q14-4",
        lessonId: "advanced-chart-patterns",
        question: "차트 패턴에서 '목표가'는 패턴의 높이만큼을 돌파 지점에서 측정하여 설정한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "차트 패턴의 목표가 산출법은 패턴의 높이(최고점-최저점 또는 머리-넥라인 거리)를 돌파 지점에서 더하거나 빼는 방식입니다. 이는 기술적분석의 일반적인 목표가 설정 방법이며, 보장된 가격은 아닙니다.",
      },
    ],
  },
  {
    id: "quiz-volume-analysis",
    courseId: "intermediate-technical",
    lessonId: "volume-analysis",
    title: "거래량 분석 - 퀴즈",
    questions: [
      {
        id: "q15-1",
        lessonId: "volume-analysis",
        question: "주가가 상승하면서 거래량도 함께 증가하면 어떤 의미인가요?",
        type: "객관식",
        options: [
          "추세가 약해지고 있다",
          "조만간 하락할 신호이다",
          "상승 추세가 건전하고 강하다",
          "거래량과 주가는 관계가 없다",
        ],
        correctIndex: 2,
        explanation:
          "주가 상승 + 거래량 증가는 많은 시장 참여자가 상승에 동참하고 있다는 의미로, 건전하고 강한 상승 추세를 나타냅니다. 반면 주가는 오르는데 거래량이 줄면 상승의 지속력에 의문을 제기할 수 있습니다.",
      },
      {
        id: "q15-2",
        lessonId: "volume-analysis",
        question: "OBV(On Balance Volume) 지표의 핵심 원리는?",
        type: "객관식",
        options: [
          "이동평균선의 교차를 분석한다",
          "상승일의 거래량을 더하고 하락일의 거래량을 빼서 누적한다",
          "일정 기간의 평균 거래량을 계산한다",
          "거래량 대비 가격 변동폭을 측정한다",
        ],
        correctIndex: 1,
        explanation:
          "OBV는 주가가 상승한 날의 거래량은 더하고, 하락한 날의 거래량은 빼서 누적하는 지표입니다. OBV가 상승하면 매수세가 강하고, OBV가 하락하면 매도세가 강하다는 의미입니다.",
      },
      {
        id: "q15-3",
        lessonId: "volume-analysis",
        question: "특별한 뉴스 없이 거래량이 평소의 3배 이상 급증한 것을 '이상 거래량'이라 한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 0,
        explanation:
          "이상 거래량은 뚜렷한 이유 없이 평소 대비 크게 늘어난 거래량을 말합니다. 내부자 거래, 기관의 대량 매매, 숨겨진 호재/악재 등의 신호일 수 있어 주의 깊게 관찰해야 합니다.",
      },
    ],
  },
  {
    id: "quiz-bollinger-stochastic",
    courseId: "intermediate-technical",
    lessonId: "bollinger-stochastic",
    title: "볼린저밴드와 스토캐스틱 - 퀴즈",
    questions: [
      {
        id: "q16-1",
        lessonId: "bollinger-stochastic",
        question: "볼린저밴드 '스퀴즈(Squeeze)'란 무엇인가요?",
        type: "객관식",
        options: [
          "밴드 폭이 넓어지는 현상",
          "밴드 폭이 좁아지는 현상으로, 큰 변동성의 전조",
          "주가가 상단 밴드를 돌파하는 것",
          "주가가 하단 밴드 아래로 떨어지는 것",
        ],
        correctIndex: 1,
        explanation:
          "볼린저밴드 스퀴즈는 밴드 폭이 극단적으로 좁아지는 현상입니다. 이는 변동성이 축소된 상태를 의미하며, 곧 큰 가격 변동(상승 또는 하락)이 나타날 가능성이 높다는 신호입니다.",
      },
      {
        id: "q16-2",
        lessonId: "bollinger-stochastic",
        question: "볼린저밴드에서 '밴드워크(Bandwalk)'란 무엇인가요?",
        type: "객관식",
        options: [
          "주가가 중심선 근처에서 횡보하는 것",
          "주가가 상단 또는 하단 밴드를 따라 지속적으로 이동하는 것",
          "밴드 폭이 일정하게 유지되는 것",
          "이동평균선이 밴드 밖으로 나가는 것",
        ],
        correctIndex: 1,
        explanation:
          "밴드워크는 강한 추세에서 주가가 상단(상승 추세) 또는 하단(하락 추세) 밴드를 따라 지속적으로 움직이는 현상입니다. 추세가 매우 강하다는 의미이며, 단순히 밴드 터치를 매도/매수 신호로 보면 안 됩니다.",
      },
      {
        id: "q16-3",
        lessonId: "bollinger-stochastic",
        question: "스토캐스틱에서 %K가 80 이상이면 과매수 구간으로, 반드시 주가가 하락한다.",
        type: "OX",
        options: ["O", "X"],
        correctIndex: 1,
        explanation:
          "스토캐스틱 %K가 80 이상이면 과매수 구간이지만, 강한 상승 추세에서는 과매수 상태가 오래 지속될 수 있습니다. 과매수는 '주의 신호'일 뿐 반드시 하락을 의미하지는 않으며, 다른 지표와 함께 종합적으로 판단해야 합니다.",
      },
    ],
  },
];
