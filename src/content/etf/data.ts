// ETF 학습용 샘플 데이터

import type { ETFData, ETFLesson } from "@/types";

/** ETF 학습 섹션 5개 */
export const etfLessons: ETFLesson[] = [
  {
    id: "etf-what",
    title: "ETF란 무엇인가?",
    order: 1,
    content: `**ETF(Exchange Traded Fund, 상장지수펀드)**는 특정 지수, 섹터, 자산을 추종하도록 설계된 투자 상품으로, 일반 주식처럼 거래소에서 실시간으로 매매할 수 있습니다.

**ETF vs 개별 주식**
- **분산 투자**: ETF 1주를 사면 수십~수백 개 종목에 자동으로 분산 투자됩니다
- **낮은 비용**: 펀드매니저가 직접 고르는 액티브 펀드보다 운용 보수가 저렴합니다
- **실시간 거래**: 일반 펀드와 달리 주식처럼 장중 언제든 매매 가능합니다

**ETF vs 일반 펀드**
- ETF: 증권사에서 주식처럼 매매, 실시간 가격, 보수 낮음
- 일반 펀드: 은행/증권사 가입, 하루 1번 기준가, 보수 높음`,
  },
  {
    id: "etf-types",
    title: "ETF의 종류",
    order: 2,
    content: `ETF는 추종하는 대상과 전략에 따라 다양한 종류가 있습니다.

**지수 추종 ETF (가장 기본)**
- KOSPI 200, S&P 500 등 대표 지수를 그대로 따라감
- 예: KODEX 200, SPY, VOO

**섹터/테마 ETF**
- 특정 산업이나 테마에 집중 투자
- 예: TIGER 반도체, SOXX (반도체), ARKK (혁신기업)

**레버리지/인버스 ETF (주의 필요!)**
- 레버리지: 지수 변동의 2배 수익 추구 (KODEX 레버리지)
- 인버스: 지수 하락 시 수익 (KODEX 인버스)
- ⚠️ 장기 보유 시 복리 효과로 원래 지수와 괴리가 커질 수 있음

**배당 ETF**
- 고배당 종목에 집중 투자
- 예: TIGER 배당성장, SCHD

**채권/원자재 ETF**
- 채권(국채, 회사채)이나 원자재(금, 원유)에 투자
- 예: TLT (미국 장기채), GLD (금)`,
  },
  {
    id: "etf-metrics",
    title: "추적오차와 괴리율 이해",
    order: 3,
    content: `같은 지수를 추종하는 ETF가 여러 개 있을 때, 어떤 ETF가 더 좋은지 판단하는 핵심 지표입니다.

**추적오차 (Tracking Error)**
- ETF 수익률과 원래 지수 수익률의 차이
- 추적오차가 작을수록 운용 능력이 우수
- 원인: 운용보수, 배당금 재투자 시차, 샘플링 오차

**괴리율**
- 시장 거래 가격과 실제 순자산가치(NAV)의 차이
- 괴리율이 크면 비정상적인 가격에 매매하게 됨
- 유동성이 낮은 ETF에서 괴리율이 커지는 경향

**실전 팁**
- 추적오차 0.5% 이하면 양호
- 괴리율 ±1% 이내면 정상
- 거래량이 많은 ETF를 선택하면 괴리율 문제를 줄일 수 있음`,
  },
  {
    id: "etf-select",
    title: "ETF 고르는 법",
    order: 4,
    content: `ETF를 선택할 때 반드시 확인해야 할 5가지 체크리스트입니다.

**1. 운용보수 (Total Expense Ratio)**
- 연간 운용 비용으로, 낮을수록 유리
- 국내: 0.05%~0.5%, 미국: 0.03%~0.75%
- 장기 투자 시 보수 차이가 수익률에 큰 영향

**2. 순자산(AUM)**
- 규모가 클수록 유동성이 좋고 안정적
- 최소 1,000억원(국내) 또는 $1B(미국) 이상 권장

**3. 거래량**
- 일 평균 거래량이 많을수록 매매가 원활
- 거래량 적으면 원하는 가격에 체결 어려움

**4. 추적오차 & 괴리율**
- 추적오차: 지수와 ETF 수익률 차이 (낮을수록 좋음)
- 괴리율: 시장가와 NAV 차이 (0에 가까울수록 좋음)

**5. 브랜드 & 운용사**
- 한국: KODEX(삼성), TIGER(미래에셋), KBSTAR(KB), ARIRANG(한화)
- 미국: Vanguard(VOO), iShares(IVV), SPDR(SPY), Invesco(QQQ)`,
  },
  {
    id: "etf-kr-vs-us",
    title: "한국 vs 미국 ETF",
    order: 5,
    content: `한국과 미국 ETF 시장의 주요 차이점입니다.

| 비교 항목 | 한국 ETF | 미국 ETF |
|-----------|----------|----------|
| 시장 규모 | 약 100조원 | 약 $10조 (1경원+) |
| 상품 수 | 약 700개 | 약 3,000개+ |
| 평균 보수 | 0.1%~0.5% | 0.03%~0.2% |
| 세금 | 매매차익 비과세 | 양도소득세 22% |
| 배당 과세 | 15.4% | 15% (원천징수) |
| 거래 시간 | 09:00~15:30 | 23:30~06:00 (한국시간) |

**환헤지(H) 옵션**
- (H) 붙은 ETF: 환율 변동 위험을 제거
- 환헤지 미적용: 환율 변동에 따라 추가 손익 발생
- 장기 투자 시 환헤지 비용 고려 필요

**TR (Total Return)**
- 일반 ETF: 배당금을 현금으로 지급
- TR ETF: 배당금을 자동으로 재투자
- 복리 효과를 원하면 TR 선택`,
  },
];

/** 샘플 ETF 데이터 12개 */
export const etfList: ETFData[] = [
  // 한국 ETF
  {
    id: "kodex200", name: "KODEX 200", ticker: "069500", market: "KRX",
    provider: "삼성자산운용", category: "국내 대형주", trackingIndex: "KOSPI 200",
    expenseRatio: 0.15, aum: 58000, trackingError: 0.12, description: "한국 대표 200개 대형주를 추종하는 가장 인기 있는 국내 ETF입니다.",
    ytdReturn: 5.2, oneYearReturn: 12.8, threeYearReturn: 8.5,
    monthlyReturns: [
      { date: "2024-04", value: 2.1 }, { date: "2024-05", value: -0.8 }, { date: "2024-06", value: 1.5 },
      { date: "2024-07", value: -1.2 }, { date: "2024-08", value: 3.4 }, { date: "2024-09", value: 0.7 },
      { date: "2024-10", value: -2.1 }, { date: "2024-11", value: 1.8 }, { date: "2024-12", value: 2.5 },
      { date: "2025-01", value: 1.2 }, { date: "2025-02", value: 2.8 }, { date: "2025-03", value: 1.1 },
    ],
  },
  {
    id: "tiger-sp500", name: "TIGER 미국S&P500", ticker: "360750", market: "KRX",
    provider: "미래에셋자산운용", category: "미국 대형주", trackingIndex: "S&P 500",
    expenseRatio: 0.07, aum: 45000, trackingError: 0.25, description: "미국 S&P 500 지수를 추종하며, 원화로 미국 대형주에 투자할 수 있는 ETF입니다.",
    ytdReturn: 8.5, oneYearReturn: 22.3, threeYearReturn: 15.2,
    monthlyReturns: [
      { date: "2024-04", value: 3.2 }, { date: "2024-05", value: 1.5 }, { date: "2024-06", value: 2.8 },
      { date: "2024-07", value: -0.5 }, { date: "2024-08", value: 4.1 }, { date: "2024-09", value: 1.2 },
      { date: "2024-10", value: -1.8 }, { date: "2024-11", value: 3.5 }, { date: "2024-12", value: 2.0 },
      { date: "2025-01", value: 2.5 }, { date: "2025-02", value: 3.8 }, { date: "2025-03", value: 2.1 },
    ],
  },
  {
    id: "kodex-lev", name: "KODEX 레버리지", ticker: "122630", market: "KRX",
    provider: "삼성자산운용", category: "레버리지", trackingIndex: "KOSPI 200 x2",
    expenseRatio: 0.64, aum: 32000, trackingError: 0.45, description: "KOSPI 200 일일 수익률의 2배를 추종합니다. 단기 매매용으로 장기 보유에 부적합합니다.",
    ytdReturn: 9.8, oneYearReturn: 18.5, threeYearReturn: 5.2,
    monthlyReturns: [
      { date: "2024-04", value: 4.2 }, { date: "2024-05", value: -1.6 }, { date: "2024-06", value: 3.0 },
      { date: "2024-07", value: -2.4 }, { date: "2024-08", value: 6.8 }, { date: "2024-09", value: 1.4 },
      { date: "2024-10", value: -4.2 }, { date: "2024-11", value: 3.6 }, { date: "2024-12", value: 5.0 },
      { date: "2025-01", value: 2.4 }, { date: "2025-02", value: 5.6 }, { date: "2025-03", value: 2.2 },
    ],
  },
  {
    id: "tiger-dividend", name: "TIGER 배당성장", ticker: "211560", market: "KRX",
    provider: "미래에셋자산운용", category: "배당", trackingIndex: "코스피 배당성장50",
    expenseRatio: 0.24, aum: 8500, trackingError: 0.18, description: "배당 성장이 기대되는 50개 종목에 투자하며, 안정적인 배당 수익을 추구합니다.",
    ytdReturn: 3.8, oneYearReturn: 8.5, threeYearReturn: 7.2,
    monthlyReturns: [
      { date: "2024-04", value: 1.5 }, { date: "2024-05", value: 0.2 }, { date: "2024-06", value: 0.8 },
      { date: "2024-07", value: -0.3 }, { date: "2024-08", value: 1.2 }, { date: "2024-09", value: 0.5 },
      { date: "2024-10", value: -0.8 }, { date: "2024-11", value: 1.0 }, { date: "2024-12", value: 1.5 },
      { date: "2025-01", value: 0.8 }, { date: "2025-02", value: 1.8 }, { date: "2025-03", value: 1.2 },
    ],
  },
  // 미국 ETF
  {
    id: "spy", name: "SPDR S&P 500", ticker: "SPY", market: "US",
    provider: "State Street", category: "미국 대형주", trackingIndex: "S&P 500",
    expenseRatio: 0.09, aum: 5200000, trackingError: 0.02, description: "세계 최대 규모의 ETF로, 미국 대형주 500개에 분산 투자합니다.",
    ytdReturn: 9.2, oneYearReturn: 24.5, threeYearReturn: 16.8,
    monthlyReturns: [
      { date: "2024-04", value: 3.5 }, { date: "2024-05", value: 1.8 }, { date: "2024-06", value: 3.0 },
      { date: "2024-07", value: -0.2 }, { date: "2024-08", value: 4.5 }, { date: "2024-09", value: 1.5 },
      { date: "2024-10", value: -1.5 }, { date: "2024-11", value: 3.8 }, { date: "2024-12", value: 2.2 },
      { date: "2025-01", value: 2.8 }, { date: "2025-02", value: 4.0 }, { date: "2025-03", value: 2.3 },
    ],
  },
  {
    id: "qqq", name: "Invesco QQQ", ticker: "QQQ", market: "US",
    provider: "Invesco", category: "미국 기술주", trackingIndex: "NASDAQ 100",
    expenseRatio: 0.2, aum: 2800000, trackingError: 0.03, description: "나스닥 100 지수를 추종하며, 대형 기술주 중심으로 구성되어 있습니다.",
    ytdReturn: 12.5, oneYearReturn: 32.1, threeYearReturn: 18.5,
    monthlyReturns: [
      { date: "2024-04", value: 4.5 }, { date: "2024-05", value: 2.2 }, { date: "2024-06", value: 4.0 },
      { date: "2024-07", value: -1.0 }, { date: "2024-08", value: 5.5 }, { date: "2024-09", value: 1.8 },
      { date: "2024-10", value: -2.0 }, { date: "2024-11", value: 4.5 }, { date: "2024-12", value: 2.8 },
      { date: "2025-01", value: 3.5 }, { date: "2025-02", value: 5.2 }, { date: "2025-03", value: 3.5 },
    ],
  },
  {
    id: "voo", name: "Vanguard S&P 500", ticker: "VOO", market: "US",
    provider: "Vanguard", category: "미국 대형주", trackingIndex: "S&P 500",
    expenseRatio: 0.03, aum: 4500000, trackingError: 0.01, description: "업계 최저 보수율(0.03%)의 S&P 500 추종 ETF입니다.",
    ytdReturn: 9.3, oneYearReturn: 24.6, threeYearReturn: 16.9,
    monthlyReturns: [
      { date: "2024-04", value: 3.5 }, { date: "2024-05", value: 1.8 }, { date: "2024-06", value: 3.1 },
      { date: "2024-07", value: -0.2 }, { date: "2024-08", value: 4.5 }, { date: "2024-09", value: 1.5 },
      { date: "2024-10", value: -1.5 }, { date: "2024-11", value: 3.9 }, { date: "2024-12", value: 2.2 },
      { date: "2025-01", value: 2.8 }, { date: "2025-02", value: 4.1 }, { date: "2025-03", value: 2.3 },
    ],
  },
  {
    id: "schd", name: "Schwab US Dividend", ticker: "SCHD", market: "US",
    provider: "Charles Schwab", category: "배당", trackingIndex: "Dow Jones US Dividend 100",
    expenseRatio: 0.06, aum: 580000, trackingError: 0.05, description: "미국 고배당 우량주 100개에 투자하는 대표적인 배당 ETF입니다.",
    ytdReturn: 4.5, oneYearReturn: 12.8, threeYearReturn: 9.5,
    monthlyReturns: [
      { date: "2024-04", value: 1.8 }, { date: "2024-05", value: 0.5 }, { date: "2024-06", value: 1.2 },
      { date: "2024-07", value: 0.3 }, { date: "2024-08", value: 2.0 }, { date: "2024-09", value: 0.8 },
      { date: "2024-10", value: -0.5 }, { date: "2024-11", value: 1.5 }, { date: "2024-12", value: 1.8 },
      { date: "2025-01", value: 1.0 }, { date: "2025-02", value: 2.0 }, { date: "2025-03", value: 1.5 },
    ],
  },
  {
    id: "soxx", name: "iShares Semiconductor", ticker: "SOXX", market: "US",
    provider: "iShares", category: "반도체", trackingIndex: "ICE Semiconductor",
    expenseRatio: 0.35, aum: 150000, trackingError: 0.08, description: "글로벌 반도체 기업에 집중 투자하는 섹터 ETF입니다.",
    ytdReturn: 15.2, oneYearReturn: 38.5, threeYearReturn: 22.1,
    monthlyReturns: [
      { date: "2024-04", value: 5.5 }, { date: "2024-05", value: 3.0 }, { date: "2024-06", value: 5.2 },
      { date: "2024-07", value: -2.5 }, { date: "2024-08", value: 7.0 }, { date: "2024-09", value: 2.0 },
      { date: "2024-10", value: -3.0 }, { date: "2024-11", value: 5.5 }, { date: "2024-12", value: 3.5 },
      { date: "2025-01", value: 4.0 }, { date: "2025-02", value: 6.5 }, { date: "2025-03", value: 4.5 },
    ],
  },
  {
    id: "tlt", name: "iShares 20+ Year Treasury", ticker: "TLT", market: "US",
    provider: "iShares", category: "채권", trackingIndex: "ICE US Treasury 20+ Year",
    expenseRatio: 0.15, aum: 420000, trackingError: 0.03, description: "미국 장기 국채(20년 이상)에 투자하는 채권 ETF입니다. 주식과 반대로 움직이는 경향이 있어 분산 효과가 좋습니다.",
    ytdReturn: -2.5, oneYearReturn: -5.2, threeYearReturn: -8.5,
    monthlyReturns: [
      { date: "2024-04", value: -1.5 }, { date: "2024-05", value: 0.8 }, { date: "2024-06", value: -0.5 },
      { date: "2024-07", value: 1.2 }, { date: "2024-08", value: -2.0 }, { date: "2024-09", value: 0.5 },
      { date: "2024-10", value: 1.8 }, { date: "2024-11", value: -1.2 }, { date: "2024-12", value: -0.8 },
      { date: "2025-01", value: -0.5 }, { date: "2025-02", value: -1.2 }, { date: "2025-03", value: -0.8 },
    ],
  },
];
