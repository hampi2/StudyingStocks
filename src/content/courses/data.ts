import type { Course } from "@/types";

// 학습 코스 데이터
export const courses: Course[] = [
  // ===== 초급 코스 =====
  {
    id: "beginner-basics",
    title: "주식투자 기초",
    description: "주식이란 무엇인지, 주식시장의 구조와 기본 개념을 배웁니다.",
    level: "초급",
    icon: "BookOpen",
    lessons: [
      {
        id: "what-is-stock",
        courseId: "beginner-basics",
        title: "주식이란 무엇인가?",
        description: "주식의 기본 개념과 왜 기업이 주식을 발행하는지 알아봅니다.",
        order: 1,
        market: "BOTH",
        content: `
## 주식이란?

**주식(Stock/Share)**은 기업의 소유권을 나누어 놓은 것입니다. 주식을 사면 그 기업의 일부를 소유하게 됩니다.

### 왜 기업은 주식을 발행할까?

기업이 성장하려면 자금이 필요합니다. 자금을 모으는 방법은 크게 두 가지입니다:

1. **부채(Debt)**: 은행에서 돈을 빌리거나 채권을 발행
2. **자기자본(Equity)**: 주식을 발행하여 투자자로부터 자금 조달

주식 발행은 이자를 갚을 필요가 없지만, 대신 기업의 소유권을 나눠주는 것입니다.

### 주주의 권리

주식을 보유한 사람(주주)은 다음과 같은 권리를 갖습니다:

- **의결권**: 주주총회에서 중요한 사안에 투표할 권리
- **배당금**: 기업이 이익을 낼 때 배분받을 권리
- **잔여재산 청구권**: 기업이 해산할 때 남은 재산을 분배받을 권리

### 한국 vs 미국 주식

| 구분 | 한국 (KRX) | 미국 (NYSE/NASDAQ) |
|------|-----------|-------------------|
| 거래 단위 | 1주 | 1주 (소수점 거래 가능) |
| 거래 시간 | 09:00~15:30 | 09:30~16:00 (ET) |
| 통화 | 원(KRW) | 달러(USD) |
| 상한/하한 | ±30% | 없음 (서킷브레이커 존재) |
        `,
      },
      {
        id: "stock-market-structure",
        courseId: "beginner-basics",
        title: "주식시장의 구조",
        description: "한국과 미국의 주식시장이 어떻게 운영되는지 배웁니다.",
        order: 2,
        market: "BOTH",
        content: `
## 주식시장의 구조

### 1차 시장과 2차 시장

- **1차 시장 (Primary Market)**: 기업이 처음 주식을 발행하는 시장. IPO(기업공개)가 여기서 이루어집니다.
- **2차 시장 (Secondary Market)**: 이미 발행된 주식을 투자자들끼리 사고파는 시장. 우리가 보통 "주식 거래"라고 하는 것이 여기입니다.

### 한국의 주식시장

- **코스피 (KOSPI)**: 한국의 대표 주식시장. 대기업 중심 (삼성전자, SK하이닉스 등)
- **코스닥 (KOSDAQ)**: 중소·벤처기업 중심의 시장
- **코넥스 (KONEX)**: 초기 중소기업을 위한 시장

### 미국의 주식시장

- **NYSE (뉴욕증권거래소)**: 세계 최대 증권거래소. 전통적인 대기업 중심
- **NASDAQ (나스닥)**: 기술주 중심. 애플, 구글, 테슬라 등이 상장

### 주가 지수

주가 지수는 시장 전체의 흐름을 한눈에 보여주는 지표입니다.

- **한국**: 코스피 지수, 코스닥 지수
- **미국**: S&P 500, 다우존스 산업평균, 나스닥 종합지수

> 💡 **Tip**: 주가 지수가 오른다고 모든 종목이 오르는 것은 아닙니다. 지수는 전체적인 방향성을 보여줄 뿐입니다.
        `,
      },
      {
        id: "how-to-trade",
        courseId: "beginner-basics",
        title: "주문 유형과 매매 방법",
        description: "지정가, 시장가 등 다양한 주문 방법을 알아봅니다.",
        order: 3,
        market: "BOTH",
        content: `
## 주문 유형

### 시장가 주문 (Market Order)

현재 시장 가격으로 즉시 거래하는 주문입니다.

- **장점**: 빠르게 체결됨
- **단점**: 원하는 가격과 다를 수 있음 (슬리피지)

### 지정가 주문 (Limit Order)

원하는 가격을 지정하여 거래하는 주문입니다.

- **매수 지정가**: "이 가격 이하로 사겠다"
- **매도 지정가**: "이 가격 이상으로 팔겠다"
- **장점**: 원하는 가격에 거래 가능
- **단점**: 체결되지 않을 수 있음

### 기타 주문 유형

- **손절매 (Stop Loss)**: 손실을 제한하기 위해 미리 설정하는 주문
- **OCO (One Cancels Other)**: 두 개의 주문 중 하나가 체결되면 나머지가 자동 취소

### 매매 수수료

| 구분 | 한국 | 미국 |
|------|------|------|
| 매매 수수료 | 증권사별 상이 (0.01~0.5%) | 대부분 무료 (로빈후드 등) |
| 세금 | 매도 시 0.23% (증권거래세) | 양도소득세 (세율 다양) |

> ⚠️ **주의**: 수수료와 세금은 수익에 직접적인 영향을 줍니다. 반드시 확인하세요!
        `,
      },
      {
        id: "reading-stock-chart",
        courseId: "beginner-basics",
        title: "주식 차트 읽는 법",
        description: "캔들차트, 거래량 등 기본적인 차트 읽는 방법을 배웁니다.",
        order: 4,
        market: "BOTH",
        content: `
## 주식 차트 기초

### 캔들차트 (Candlestick Chart)

캔들차트는 주식 가격의 움직임을 가장 직관적으로 보여주는 차트입니다.

하나의 캔들은 다음 4가지 가격 정보를 담고 있습니다:

- **시가 (Open)**: 해당 기간 시작 가격
- **종가 (Close)**: 해당 기간 마감 가격
- **고가 (High)**: 해당 기간 최고 가격
- **저가 (Low)**: 해당 기간 최저 가격

### 양봉과 음봉

- **양봉 (빨간/초록)**: 종가 > 시가 → 가격이 올랐음
- **음봉 (파란/빨간)**: 종가 < 시가 → 가격이 내렸음

> 💡 한국에서는 양봉이 빨간색, 미국에서는 초록색입니다!

### 거래량 (Volume)

거래량은 해당 기간 동안 거래된 주식 수입니다.

- **거래량 증가 + 가격 상승**: 강한 매수세 (긍정적 신호)
- **거래량 증가 + 가격 하락**: 강한 매도세 (부정적 신호)
- **거래량 감소**: 관심 감소, 추세 약화

### 이동평균선 (Moving Average)

일정 기간의 평균 가격을 이은 선입니다.

- **5일선**: 단기 추세
- **20일선**: 중기 추세 (약 1달)
- **60일선**: 중장기 추세 (약 3달)
- **120일선**: 장기 추세 (약 6달)

**골든크로스**: 단기선이 장기선을 위로 돌파 → 매수 신호
**데드크로스**: 단기선이 장기선을 아래로 돌파 → 매도 신호
        `,
      },
    ],
  },

  // ===== 중급 코스 =====
  {
    id: "intermediate-technical",
    title: "기술적 분석",
    description: "차트 패턴, 보조지표 등 기술적 분석의 핵심을 배웁니다.",
    level: "중급",
    icon: "BarChart3",
    lessons: [
      {
        id: "support-resistance",
        courseId: "intermediate-technical",
        title: "지지선과 저항선",
        description: "가격이 반복적으로 멈추는 지점인 지지선과 저항선을 이해합니다.",
        order: 1,
        market: "BOTH",
        content: `
## 지지선과 저항선

### 지지선 (Support)

가격이 하락하다가 반등하는 가격대입니다. 매수세가 강해지는 지점이죠.

- 여러 번 테스트될수록 강한 지지선
- 지지선이 뚫리면 하락 가속화 가능

### 저항선 (Resistance)

가격이 상승하다가 다시 하락하는 가격대입니다. 매도세가 강해지는 지점입니다.

- 여러 번 테스트될수록 강한 저항선
- 저항선을 돌파하면 상승 가속화 가능

### 역할 전환

**핵심 개념**: 지지선이 뚫리면 저항선으로, 저항선이 뚫리면 지지선으로 전환됩니다!

### 실전 활용

1. 지지선 근처에서 매수 고려
2. 저항선 근처에서 매도 고려
3. 돌파 시 추세 방향으로 진입 고려
        `,
      },
      {
        id: "rsi-macd",
        courseId: "intermediate-technical",
        title: "RSI와 MACD",
        description: "대표적인 기술적 보조지표인 RSI와 MACD 사용법을 배웁니다.",
        order: 2,
        market: "BOTH",
        content: `
## RSI (Relative Strength Index, 상대강도지수)

RSI는 주가의 과매수/과매도 상태를 나타내는 지표입니다. 0~100 사이의 값을 가집니다.

- **RSI > 70**: 과매수 구간 → 하락 가능성
- **RSI < 30**: 과매도 구간 → 상승 가능성
- **RSI = 50**: 중립

### 다이버전스 (Divergence)

- **상승 다이버전스**: 가격은 저점 갱신, RSI는 저점 높아짐 → 반등 신호
- **하락 다이버전스**: 가격은 고점 갱신, RSI는 고점 낮아짐 → 하락 신호

## MACD (Moving Average Convergence Divergence)

두 이동평균선의 차이를 이용한 추세 지표입니다.

- **MACD 선**: 12일 EMA - 26일 EMA
- **시그널 선**: MACD의 9일 EMA
- **히스토그램**: MACD - 시그널

### MACD 매매 신호

- **MACD가 시그널 위로 교차**: 매수 신호
- **MACD가 시그널 아래로 교차**: 매도 신호
- **제로라인 돌파**: 추세 전환 신호

> 💡 RSI와 MACD를 함께 사용하면 더 정확한 매매 타이밍을 잡을 수 있습니다.
        `,
      },
    ],
  },

  // ===== 고급 코스 =====
  {
    id: "advanced-fundamental",
    title: "기본적 분석과 밸류에이션",
    description: "재무제표 분석과 기업 가치 평가 방법을 배웁니다.",
    level: "고급",
    icon: "Calculator",
    lessons: [
      {
        id: "financial-statements",
        courseId: "advanced-fundamental",
        title: "재무제표 읽는 법",
        description: "손익계산서, 재무상태표, 현금흐름표를 읽고 해석하는 방법을 배웁니다.",
        order: 1,
        market: "BOTH",
        content: `
## 3대 재무제표

### 1. 손익계산서 (Income Statement)

일정 기간 동안 기업이 얼마를 벌고 얼마를 썼는지 보여줍니다.

**핵심 항목:**
- **매출액 (Revenue)**: 물건/서비스를 팔아 번 돈
- **영업이익 (Operating Income)**: 본업으로 번 이익
- **순이익 (Net Income)**: 최종 이익 (세금, 이자 등 모두 차감)

### 2. 재무상태표 (Balance Sheet)

특정 시점에 기업이 무엇을 가지고 있고 얼마를 빚지고 있는지 보여줍니다.

**핵심 공식**: 자산 = 부채 + 자본

- **자산 (Assets)**: 기업이 보유한 것 (현금, 건물, 재고 등)
- **부채 (Liabilities)**: 갚아야 할 돈 (대출, 미지급금 등)
- **자본 (Equity)**: 주주의 몫

### 3. 현금흐름표 (Cash Flow Statement)

실제 현금이 어떻게 들어오고 나갔는지 보여줍니다.

- **영업활동**: 본업에서 발생한 현금 흐름
- **투자활동**: 설비 투자, 인수합병 등
- **재무활동**: 차입, 배당, 자사주 매입 등

> ⚠️ 이익이 있어도 현금이 없으면 기업은 망할 수 있습니다. 현금흐름표는 반드시 확인하세요!
        `,
      },
    ],
  },
];

// 모든 레슨을 평탄화하여 반환
export function getAllLessons() {
  return courses.flatMap((course) => course.lessons);
}

// ID로 코스 찾기
export function getCourseById(id: string) {
  return courses.find((course) => course.id === id);
}

// ID로 레슨 찾기
export function getLessonById(lessonId: string) {
  for (const course of courses) {
    const lesson = course.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, course };
  }
  return undefined;
}
