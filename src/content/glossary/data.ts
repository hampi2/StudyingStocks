import type { GlossaryTerm } from "@/types";

// 주식 용어 사전 데이터
export const glossaryTerms: GlossaryTerm[] = [
  // ===== 기본 용어 =====
  {
    id: "stock",
    termKo: "주식",
    termEn: "Stock / Share",
    definition: "기업의 소유권을 나타내는 증서. 주식을 보유하면 해당 기업의 일부를 소유하게 됩니다.",
    example: "삼성전자 주식 100주를 보유하면, 삼성전자의 아주 작은 일부를 소유하는 것입니다.",
    category: "기본",
  },
  {
    id: "ipo",
    termKo: "기업공개 (IPO)",
    termEn: "Initial Public Offering",
    definition: "비상장 기업이 처음으로 주식시장에 상장하여 일반 투자자에게 주식을 판매하는 것.",
    example: "쿠팡이 2021년 뉴욕증권거래소에 IPO하여 상장했습니다.",
    category: "기본",
  },
  {
    id: "dividend",
    termKo: "배당금",
    termEn: "Dividend",
    definition: "기업이 이익의 일부를 주주에게 분배하는 것. 현금배당과 주식배당이 있습니다.",
    example: "삼성전자가 주당 1,444원의 배당금을 지급하면, 100주 보유 시 144,400원을 받습니다.",
    category: "기본",
  },
  {
    id: "market-cap",
    termKo: "시가총액",
    termEn: "Market Capitalization",
    definition: "주가 × 발행주식수. 기업의 시장 가치를 나타내는 지표입니다.",
    example: "주가 70,000원 × 발행주식수 60억주 = 시가총액 약 420조원",
    category: "기본",
  },
  {
    id: "bull-market",
    termKo: "강세장 (불마켓)",
    termEn: "Bull Market",
    definition: "주가가 지속적으로 상승하는 시장 상태. 일반적으로 20% 이상 상승 시 강세장으로 봅니다.",
    category: "기본",
  },
  {
    id: "bear-market",
    termKo: "약세장 (베어마켓)",
    termEn: "Bear Market",
    definition: "주가가 지속적으로 하락하는 시장 상태. 일반적으로 고점 대비 20% 이상 하락 시 약세장으로 봅니다.",
    category: "기본",
  },
  {
    id: "blue-chip",
    termKo: "우량주 (블루칩)",
    termEn: "Blue Chip",
    definition: "재무상태가 건전하고 안정적인 수익을 내는 대형 기업의 주식.",
    example: "삼성전자, 애플, 마이크로소프트 등이 대표적인 블루칩 종목입니다.",
    category: "기본",
  },
  {
    id: "volume",
    termKo: "거래량",
    termEn: "Volume",
    definition: "일정 기간 동안 거래된 주식의 수. 시장의 관심도와 유동성을 나타냅니다.",
    example: "삼성전자 하루 거래량이 1000만주라면, 그날 1000만주가 사고팔린 것입니다.",
    category: "기본",
  },
  {
    id: "portfolio",
    termKo: "포트폴리오",
    termEn: "Portfolio",
    definition: "투자자가 보유한 다양한 투자자산(주식, 채권, 부동산 등)의 조합.",
    category: "기본",
  },
  {
    id: "liquidity",
    termKo: "유동성",
    termEn: "Liquidity",
    definition: "자산을 가격 변동 없이 빠르게 현금으로 전환할 수 있는 정도.",
    category: "기본",
  },

  // ===== 기술적 분석 용어 =====
  {
    id: "candlestick",
    termKo: "캔들차트 (봉차트)",
    termEn: "Candlestick Chart",
    definition: "시가, 종가, 고가, 저가를 하나의 봉 모양으로 표현한 차트. 가장 널리 사용되는 주가 차트 유형.",
    category: "기술적분석",
  },
  {
    id: "moving-average",
    termKo: "이동평균선",
    termEn: "Moving Average (MA)",
    definition: "일정 기간의 주가 평균을 연결한 선. 추세의 방향과 지지/저항을 판단하는 데 사용.",
    example: "20일 이동평균선은 최근 20일간 종가의 평균을 연결한 선입니다.",
    category: "기술적분석",
  },
  {
    id: "golden-cross",
    termKo: "골든크로스",
    termEn: "Golden Cross",
    definition: "단기 이동평균선이 장기 이동평균선을 아래에서 위로 돌파하는 것. 매수 신호로 해석.",
    category: "기술적분석",
  },
  {
    id: "dead-cross",
    termKo: "데드크로스",
    termEn: "Dead Cross",
    definition: "단기 이동평균선이 장기 이동평균선을 위에서 아래로 돌파하는 것. 매도 신호로 해석.",
    category: "기술적분석",
  },
  {
    id: "rsi",
    termKo: "RSI (상대강도지수)",
    termEn: "Relative Strength Index",
    definition: "주가의 과매수/과매도 상태를 0~100으로 나타내는 지표. 70 이상은 과매수, 30 이하는 과매도.",
    category: "기술적분석",
  },
  {
    id: "macd",
    termKo: "MACD",
    termEn: "Moving Average Convergence Divergence",
    definition: "두 이동평균선의 수렴과 발산을 이용한 추세 추종 지표.",
    category: "기술적분석",
  },
  {
    id: "bollinger-bands",
    termKo: "볼린저밴드",
    termEn: "Bollinger Bands",
    definition: "이동평균선을 중심으로 상·하한 밴드를 표시한 지표. 변동성과 과매수/과매도를 판단.",
    category: "기술적분석",
  },
  {
    id: "support",
    termKo: "지지선",
    termEn: "Support Level",
    definition: "주가가 하락하다가 매수세로 인해 반등하는 가격대.",
    category: "기술적분석",
  },
  {
    id: "resistance",
    termKo: "저항선",
    termEn: "Resistance Level",
    definition: "주가가 상승하다가 매도세로 인해 하락하는 가격대.",
    category: "기술적분석",
  },
  {
    id: "trend",
    termKo: "추세",
    termEn: "Trend",
    definition: "주가가 일정 방향으로 움직이는 경향. 상승추세, 하락추세, 횡보(박스권)로 구분.",
    category: "기술적분석",
  },

  // ===== 기본적 분석 용어 =====
  {
    id: "per",
    termKo: "PER (주가수익비율)",
    termEn: "Price to Earnings Ratio",
    definition: "주가 ÷ 주당순이익(EPS). 주가가 이익의 몇 배인지 나타내는 지표. 낮을수록 저평가 가능성.",
    example: "주가 50,000원, EPS 5,000원이면 PER = 10배. '이익의 10년치 가격'이라고 해석 가능.",
    category: "기본적분석",
  },
  {
    id: "pbr",
    termKo: "PBR (주가순자산비율)",
    termEn: "Price to Book Ratio",
    definition: "주가 ÷ 주당순자산(BPS). 주가가 순자산의 몇 배인지 나타내는 지표.",
    example: "PBR이 1 미만이면, 시장에서 기업의 순자산보다 낮게 평가하는 것입니다.",
    category: "기본적분석",
  },
  {
    id: "roe",
    termKo: "ROE (자기자본이익률)",
    termEn: "Return on Equity",
    definition: "순이익 ÷ 자기자본 × 100. 주주가 투자한 돈으로 얼마나 이익을 냈는지 나타내는 지표.",
    example: "ROE 15%는 주주의 100원으로 15원의 이익을 낸다는 뜻.",
    category: "기본적분석",
  },
  {
    id: "eps",
    termKo: "EPS (주당순이익)",
    termEn: "Earnings Per Share",
    definition: "순이익 ÷ 발행주식수. 주식 1주당 얼마의 이익을 냈는지 나타내는 지표.",
    category: "기본적분석",
  },
  {
    id: "revenue",
    termKo: "매출액",
    termEn: "Revenue / Sales",
    definition: "기업이 제품이나 서비스를 판매하여 얻은 총 수입. 손익계산서의 최상단 항목.",
    category: "기본적분석",
  },
  {
    id: "operating-income",
    termKo: "영업이익",
    termEn: "Operating Income",
    definition: "매출에서 영업비용(원가, 판관비)을 뺀 이익. 기업의 본업 수익성을 나타냄.",
    category: "기본적분석",
  },
  {
    id: "net-income",
    termKo: "순이익",
    termEn: "Net Income",
    definition: "모든 수익에서 모든 비용(세금, 이자 포함)을 차감한 최종 이익.",
    category: "기본적분석",
  },
  {
    id: "debt-ratio",
    termKo: "부채비율",
    termEn: "Debt to Equity Ratio",
    definition: "총부채 ÷ 자기자본 × 100. 기업의 재무 건전성을 나타내는 지표. 일반적으로 200% 이하가 안전.",
    category: "기본적분석",
  },
  {
    id: "free-cash-flow",
    termKo: "잉여현금흐름 (FCF)",
    termEn: "Free Cash Flow",
    definition: "영업활동현금흐름에서 자본적 지출(CAPEX)을 뺀 금액. 기업이 자유롭게 사용할 수 있는 현금.",
    category: "기본적분석",
  },
  {
    id: "dcf",
    termKo: "DCF (할인현금흐름)",
    termEn: "Discounted Cash Flow",
    definition: "미래 현금흐름을 현재 가치로 환산하여 기업의 내재가치를 구하는 밸류에이션 방법.",
    category: "기본적분석",
  },

  // ===== 파생상품 용어 =====
  {
    id: "option",
    termKo: "옵션",
    termEn: "Option",
    definition: "특정 자산을 미래에 정해진 가격으로 사거나 팔 수 있는 권리를 매매하는 계약.",
    category: "파생상품",
  },
  {
    id: "call-option",
    termKo: "콜옵션",
    termEn: "Call Option",
    definition: "특정 자산을 미래에 정해진 가격으로 살 수 있는 권리. 가격 상승 시 이익.",
    category: "파생상품",
  },
  {
    id: "put-option",
    termKo: "풋옵션",
    termEn: "Put Option",
    definition: "특정 자산을 미래에 정해진 가격으로 팔 수 있는 권리. 가격 하락 시 이익.",
    category: "파생상품",
  },
  {
    id: "futures",
    termKo: "선물",
    termEn: "Futures",
    definition: "미래의 특정 시점에 정해진 가격으로 자산을 사고팔기로 약속하는 계약.",
    category: "파생상품",
  },
  {
    id: "leverage",
    termKo: "레버리지",
    termEn: "Leverage",
    definition: "차입금이나 파생상품을 이용하여 투자 수익률을 증폭시키는 것. 손실도 동일하게 증폭됨.",
    category: "파생상품",
  },

  // ===== 시장구조 용어 =====
  {
    id: "kospi",
    termKo: "코스피",
    termEn: "KOSPI",
    definition: "한국거래소의 유가증권시장. 대형 우량주 중심의 한국 대표 주식시장.",
    category: "시장구조",
  },
  {
    id: "kosdaq",
    termKo: "코스닥",
    termEn: "KOSDAQ",
    definition: "한국의 중소·벤처기업 중심 주식시장. 미국 나스닥을 모델로 만들어짐.",
    category: "시장구조",
  },
  {
    id: "nyse",
    termKo: "뉴욕증권거래소",
    termEn: "NYSE (New York Stock Exchange)",
    definition: "세계 최대 규모의 증권거래소. 미국 대형주 중심.",
    category: "시장구조",
  },
  {
    id: "nasdaq",
    termKo: "나스닥",
    termEn: "NASDAQ",
    definition: "미국의 전자 증권거래소. 기술주 중심으로 애플, 구글, 테슬라 등이 상장.",
    category: "시장구조",
  },
  {
    id: "sp500",
    termKo: "S&P 500",
    termEn: "S&P 500 Index",
    definition: "미국 대형주 500개로 구성된 주가지수. 미국 주식시장의 대표 벤치마크.",
    category: "시장구조",
  },
  {
    id: "etf",
    termKo: "ETF (상장지수펀드)",
    termEn: "Exchange Traded Fund",
    definition: "특정 지수나 자산을 추종하도록 설계된 펀드로, 주식처럼 거래소에서 거래 가능.",
    example: "KODEX 200 ETF는 코스피 200 지수를 추종합니다.",
    category: "시장구조",
  },
  {
    id: "short-selling",
    termKo: "공매도",
    termEn: "Short Selling",
    definition: "주식을 빌려서 먼저 팔고, 나중에 더 낮은 가격에 사서 갚는 투자 전략. 하락장에서 수익 가능.",
    category: "시장구조",
  },
  {
    id: "circuit-breaker",
    termKo: "서킷브레이커",
    termEn: "Circuit Breaker",
    definition: "주가가 급락할 때 시장 거래를 일시 중단하는 제도. 투자자 보호와 시장 안정을 위함.",
    category: "시장구조",
  },
  {
    id: "margin-trading",
    termKo: "신용거래 (마진거래)",
    termEn: "Margin Trading",
    definition: "증권사에서 돈을 빌려 주식을 매수하는 것. 레버리지 효과가 있지만 위험도 높음.",
    category: "시장구조",
  },
  {
    id: "after-hours",
    termKo: "시간외 거래",
    termEn: "After-Hours Trading",
    definition: "정규 거래 시간 이후에 이루어지는 주식 거래. 유동성이 낮아 가격 변동이 클 수 있음.",
    category: "시장구조",
  },
];

// 카테고리별 그룹화
export function getTermsByCategory() {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of glossaryTerms) {
    if (!grouped[term.category]) {
      grouped[term.category] = [];
    }
    grouped[term.category].push(term);
  }
  return grouped;
}

// 검색 기능
export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return glossaryTerms;
  return glossaryTerms.filter(
    (term) =>
      term.termKo.toLowerCase().includes(q) ||
      term.termEn.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q)
  );
}
