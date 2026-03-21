// 기본적 분석 학습용 샘플 재무 데이터
// 모든 수치는 학습용 가상 데이터입니다

import type { FinancialStatement, ValuationMetrics, SectorInfo } from "@/types";

// ============================================
// 재무제표 데이터
// ============================================

/** 삼성전자 재무제표 (가상 데이터, 단위: 억원) */
export const samsungFinancials: FinancialStatement = {
  companyId: "samsung",
  companyName: "삼성전자",
  ticker: "005930.KS",
  currency: "KRW",
  years: ["2023", "2024", "2025E"],
  incomeStatement: [
    {
      title: "수익",
      items: [
        { label: "매출액", labelEn: "Revenue", values: [2588918, 3006486, 3250000], description: "제품 및 서비스 판매로 얻은 총 수익입니다. 반도체, 디스플레이, 모바일 등 사업부 매출의 합계입니다.", isTotal: true },
        { label: "매출원가", labelEn: "Cost of Revenue", values: [1812453, 2012345, 2145000], description: "제품을 만드는 데 직접 들어간 비용입니다. 원재료비, 인건비, 감가상각비 등이 포함됩니다." },
        { label: "매출총이익", labelEn: "Gross Profit", values: [776465, 994141, 1105000], description: "매출액에서 매출원가를 뺀 이익입니다. 기업의 기본적인 수익 창출 능력을 보여줍니다.", formula: "매출액 - 매출원가", isTotal: true },
      ],
    },
    {
      title: "영업이익",
      items: [
        { label: "판매비와관리비", labelEn: "SG&A", values: [543218, 587654, 615000], description: "영업 활동에 필요한 비용입니다. 임직원 급여, 광고비, 연구개발비 등이 포함됩니다." },
        { label: "연구개발비", labelEn: "R&D Expenses", values: [245678, 268432, 290000], description: "새로운 기술과 제품 개발에 투자한 비용입니다. 반도체 미세공정, AI 등에 대한 투자가 포함됩니다.", indent: 1 },
        { label: "영업이익", labelEn: "Operating Income", values: [233247, 406487, 490000], description: "매출총이익에서 판관비를 뺀 이익으로, 기업의 본업 수익성을 나타냅니다.", formula: "매출총이익 - 판매비와관리비", isTotal: true },
      ],
    },
    {
      title: "순이익",
      items: [
        { label: "영업외수익", labelEn: "Non-operating Income", values: [45678, 52341, 48000], description: "본업 외의 활동에서 발생한 수익입니다. 이자수익, 배당금수익, 외환차익 등이 포함됩니다." },
        { label: "영업외비용", labelEn: "Non-operating Expenses", values: [32456, 28765, 25000], description: "본업 외의 활동에서 발생한 비용입니다. 이자비용, 외환차손 등이 포함됩니다." },
        { label: "법인세", labelEn: "Income Tax", values: [52345, 89012, 108000], description: "기업이 납부하는 소득세입니다. 세전이익에 법인세율을 적용하여 계산합니다." },
        { label: "당기순이익", labelEn: "Net Income", values: [194124, 341051, 405000], description: "모든 수익에서 모든 비용을 뺀 최종 이익입니다. 주주에게 귀속되는 이익을 의미합니다.", formula: "영업이익 + 영업외수익 - 영업외비용 - 법인세", isTotal: true },
      ],
    },
  ],
  balanceSheet: [
    {
      title: "자산",
      items: [
        { label: "유동자산", labelEn: "Current Assets", values: [1961542, 2105678, 2250000], description: "1년 이내에 현금화할 수 있는 자산입니다. 현금, 단기금융상품, 매출채권, 재고자산 등이 포함됩니다.", isTotal: true },
        { label: "현금및현금성자산", labelEn: "Cash & Equivalents", values: [654321, 723456, 780000], description: "즉시 사용 가능한 현금과 3개월 이내 만기 금융상품입니다.", indent: 1 },
        { label: "매출채권", labelEn: "Accounts Receivable", values: [432156, 465432, 490000], description: "제품을 판매하고 아직 받지 못한 대금입니다.", indent: 1 },
        { label: "재고자산", labelEn: "Inventory", values: [521345, 498765, 520000], description: "판매를 위해 보유 중인 완제품, 반제품, 원재료의 가치입니다.", indent: 1 },
        { label: "비유동자산", labelEn: "Non-current Assets", values: [3245678, 3456789, 3680000], description: "1년 이상 보유하는 장기 자산입니다. 토지, 건물, 설비, 특허권 등이 포함됩니다.", isTotal: true },
        { label: "유형자산", labelEn: "PP&E", values: [1987654, 2123456, 2300000], description: "물리적 형태가 있는 자산으로, 토지, 건물, 반도체 생산설비 등입니다.", indent: 1 },
        { label: "자산총계", labelEn: "Total Assets", values: [5207220, 5562467, 5930000], description: "유동자산과 비유동자산을 합한 기업의 총 자산 규모입니다.", formula: "유동자산 + 비유동자산", isTotal: true },
      ],
    },
    {
      title: "부채",
      items: [
        { label: "유동부채", labelEn: "Current Liabilities", values: [876543, 912345, 950000], description: "1년 이내에 갚아야 하는 부채입니다. 매입채무, 단기차입금 등이 포함됩니다.", isTotal: true },
        { label: "비유동부채", labelEn: "Non-current Liabilities", values: [345678, 367890, 380000], description: "1년 이후에 갚아야 하는 장기 부채입니다. 사채, 장기차입금 등이 포함됩니다.", isTotal: true },
        { label: "부채총계", labelEn: "Total Liabilities", values: [1222221, 1280235, 1330000], description: "유동부채와 비유동부채를 합한 총 부채입니다.", formula: "유동부채 + 비유동부채", isTotal: true },
      ],
    },
    {
      title: "자본",
      items: [
        { label: "자본금", labelEn: "Common Stock", values: [8975, 8975, 8975], description: "주주가 출자한 금액의 액면가 합계입니다." },
        { label: "이익잉여금", labelEn: "Retained Earnings", values: [3521345, 3812456, 4120000], description: "기업이 벌어들인 이익 중 배당하지 않고 회사 내부에 축적한 금액입니다." },
        { label: "자본총계", labelEn: "Total Equity", values: [3984999, 4282232, 4600000], description: "자산에서 부채를 뺀 순자산으로, 주주의 몫을 의미합니다.", formula: "자산총계 - 부채총계", isTotal: true },
      ],
    },
  ],
  cashFlow: [
    {
      title: "현금흐름",
      items: [
        { label: "영업활동 현금흐름", labelEn: "Operating Cash Flow", values: [456789, 523456, 580000], description: "본업(제품 생산·판매)을 통해 벌어들인 실제 현금입니다. 당기순이익에 감가상각비 등 비현금 항목을 더하고, 운전자본 변동을 반영합니다.", isTotal: true },
        { label: "투자활동 현금흐름", labelEn: "Investing Cash Flow", values: [-387654, -412345, -450000], description: "설비 투자, 자산 매입 등에 사용한 현금입니다. 음수(-)가 정상이며, 미래 성장을 위한 투자를 의미합니다.", isTotal: true },
        { label: "재무활동 현금흐름", labelEn: "Financing Cash Flow", values: [-123456, -98765, -105000], description: "차입금 상환, 배당금 지급, 자사주 매입 등 재무활동에 사용한 현금입니다.", isTotal: true },
        { label: "잉여현금흐름(FCF)", labelEn: "Free Cash Flow", values: [69135, 111111, 130000], description: "영업활동으로 번 현금에서 설비 투자를 뺀 금액입니다. 주주에게 돌아갈 수 있는 '진짜 여유 자금'입니다.", formula: "영업활동 현금흐름 + 투자활동 현금흐름", isTotal: true },
      ],
    },
  ],
};

/** 애플 재무제표 (가상 데이터, 단위: 백만달러) */
export const appleFinancials: FinancialStatement = {
  companyId: "apple",
  companyName: "애플",
  ticker: "AAPL",
  currency: "USD",
  years: ["2023", "2024", "2025E"],
  incomeStatement: [
    {
      title: "수익",
      items: [
        { label: "매출액", labelEn: "Revenue", values: [383285, 410000, 435000], description: "iPhone, Mac, iPad, 서비스 등 모든 사업부의 총 매출액입니다.", isTotal: true },
        { label: "매출원가", labelEn: "Cost of Revenue", values: [214137, 225000, 236000], description: "제품 제조 및 서비스 제공에 직접 들어간 비용입니다." },
        { label: "매출총이익", labelEn: "Gross Profit", values: [169148, 185000, 199000], description: "매출액에서 매출원가를 뺀 이익으로, 애플의 높은 마진율을 보여줍니다.", formula: "매출액 - 매출원가", isTotal: true },
      ],
    },
    {
      title: "영업이익",
      items: [
        { label: "판매비와관리비", labelEn: "SG&A", values: [54847, 58000, 61000], description: "마케팅, 관리, 일반 경비 등 영업 관련 비용입니다." },
        { label: "연구개발비", labelEn: "R&D Expenses", values: [29915, 32500, 35000], description: "새 제품 및 기술 개발에 투자한 비용입니다. Apple Silicon, Vision Pro 등에 대한 투자가 포함됩니다.", indent: 1 },
        { label: "영업이익", labelEn: "Operating Income", values: [114301, 127000, 138000], description: "본업에서 발생한 이익으로, 기업의 핵심 수익성 지표입니다.", formula: "매출총이익 - 판매비와관리비", isTotal: true },
      ],
    },
    {
      title: "순이익",
      items: [
        { label: "영업외수익", labelEn: "Non-operating Income", values: [1234, 1500, 1200], description: "이자수익, 투자수익 등 본업 외 수익입니다." },
        { label: "영업외비용", labelEn: "Non-operating Expenses", values: [2345, 2100, 1800], description: "이자비용 등 본업 외 비용입니다." },
        { label: "법인세", labelEn: "Income Tax", values: [16741, 19200, 21000], description: "미국 및 글로벌 소득에 대한 법인세입니다." },
        { label: "당기순이익", labelEn: "Net Income", values: [96449, 107200, 116400], description: "모든 비용을 제외한 최종 순이익입니다.", formula: "영업이익 + 영업외수익 - 영업외비용 - 법인세", isTotal: true },
      ],
    },
  ],
  balanceSheet: [
    {
      title: "자산",
      items: [
        { label: "유동자산", labelEn: "Current Assets", values: [143566, 155000, 165000], description: "1년 이내 현금화 가능한 자산입니다.", isTotal: true },
        { label: "현금및현금성자산", labelEn: "Cash & Equivalents", values: [29965, 35000, 38000], description: "즉시 사용 가능한 현금입니다.", indent: 1 },
        { label: "단기투자자산", labelEn: "Short-term Investments", values: [31590, 33000, 35000], description: "만기 1년 이내 채권 등 단기 투자자산입니다.", indent: 1 },
        { label: "비유동자산", labelEn: "Non-current Assets", values: [209017, 220000, 235000], description: "장기 보유 자산으로, 설비, 무형자산, 장기투자 등입니다.", isTotal: true },
        { label: "자산총계", labelEn: "Total Assets", values: [352583, 375000, 400000], description: "기업이 보유한 모든 자산의 합계입니다.", isTotal: true },
      ],
    },
    {
      title: "부채",
      items: [
        { label: "유동부채", labelEn: "Current Liabilities", values: [145308, 150000, 155000], description: "1년 이내 갚아야 할 부채입니다.", isTotal: true },
        { label: "비유동부채", labelEn: "Non-current Liabilities", values: [145129, 140000, 135000], description: "장기 부채로, 사채 등이 포함됩니다.", isTotal: true },
        { label: "부채총계", labelEn: "Total Liabilities", values: [290437, 290000, 290000], description: "총 부채 규모입니다.", isTotal: true },
      ],
    },
    {
      title: "자본",
      items: [
        { label: "이익잉여금", labelEn: "Retained Earnings", values: [14435, 30000, 50000], description: "누적 순이익에서 배당 및 자사주 매입을 차감한 금액입니다." },
        { label: "자본총계", labelEn: "Total Equity", values: [62146, 85000, 110000], description: "주주의 몫으로, 자산에서 부채를 뺀 값입니다.", isTotal: true },
      ],
    },
  ],
  cashFlow: [
    {
      title: "현금흐름",
      items: [
        { label: "영업활동 현금흐름", labelEn: "Operating Cash Flow", values: [110543, 120000, 130000], description: "본업에서 벌어들인 실제 현금입니다.", isTotal: true },
        { label: "투자활동 현금흐름", labelEn: "Investing Cash Flow", values: [-7077, -15000, -18000], description: "설비 및 투자자산 매입/매각에 사용된 현금입니다.", isTotal: true },
        { label: "재무활동 현금흐름", labelEn: "Financing Cash Flow", values: [-108488, -100000, -105000], description: "자사주 매입, 배당금 지급, 차입금 상환 등입니다.", isTotal: true },
        { label: "잉여현금흐름(FCF)", labelEn: "Free Cash Flow", values: [103466, 105000, 112000], description: "영업 현금흐름에서 설비투자를 뺀 자유로운 현금입니다.", formula: "영업활동 현금흐름 + 투자활동 현금흐름", isTotal: true },
      ],
    },
  ],
};

// ============================================
// 밸류에이션 지표
// ============================================

/** 삼성전자 밸류에이션 */
export const samsungValuation: ValuationMetrics = {
  companyId: "samsung",
  companyName: "삼성전자",
  ticker: "005930.KS",
  currency: "KRW",
  currentPrice: 69800,
  sharesOutstanding: 5969783, // 만주 단위
  eps: 5720, // 원
  bps: 43200, // 원
  dps: 1444, // 원
  per: 12.2,
  pbr: 1.62,
  roe: 13.3,
  debtRatio: 30.7,
  evEbitda: 6.8,
  dividendYield: 2.07,
};

/** 애플 밸류에이션 */
export const appleValuation: ValuationMetrics = {
  companyId: "apple",
  companyName: "애플",
  ticker: "AAPL",
  currency: "USD",
  currentPrice: 221.5,
  sharesOutstanding: 15460, // 백만주
  eps: 6.93,
  bps: 4.02,
  dps: 1.0,
  per: 31.97,
  pbr: 55.1,
  roe: 172.3,
  debtRatio: 467.3,
  evEbitda: 26.5,
  dividendYield: 0.45,
};

// ============================================
// 섹터(산업) 비교 데이터
// ============================================

/** 반도체 섹터 기업 데이터 (가상) */
const semiconductorCompanies: ValuationMetrics[] = [
  samsungValuation,
  {
    companyId: "skhynix", companyName: "SK하이닉스", ticker: "000660.KS", currency: "KRW",
    currentPrice: 178000, sharesOutstanding: 728002, eps: 12450, bps: 98700, dps: 1200,
    per: 14.3, pbr: 1.8, roe: 12.6, debtRatio: 45.2, evEbitda: 7.2, dividendYield: 0.67,
  },
  {
    companyId: "tsmc", companyName: "TSMC", ticker: "TSM", currency: "USD",
    currentPrice: 185.0, sharesOutstanding: 25930, eps: 6.25, bps: 22.5, dps: 2.44,
    per: 29.6, pbr: 8.2, roe: 27.8, debtRatio: 28.5, evEbitda: 18.5, dividendYield: 1.32,
  },
  {
    companyId: "nvidia", companyName: "엔비디아", ticker: "NVDA", currency: "USD",
    currentPrice: 950.0, sharesOutstanding: 24600, eps: 12.96, bps: 18.8, dps: 0.16,
    per: 73.3, pbr: 50.5, roe: 68.9, debtRatio: 41.2, evEbitda: 62.1, dividendYield: 0.02,
  },
];

/** 빅테크 섹터 기업 데이터 (가상) */
const bigTechCompanies: ValuationMetrics[] = [
  appleValuation,
  {
    companyId: "microsoft", companyName: "마이크로소프트", ticker: "MSFT", currency: "USD",
    currentPrice: 420.0, sharesOutstanding: 7430, eps: 11.86, bps: 36.12, dps: 3.0,
    per: 35.4, pbr: 11.6, roe: 32.8, debtRatio: 48.3, evEbitda: 25.2, dividendYield: 0.71,
  },
  {
    companyId: "google", companyName: "알파벳(구글)", ticker: "GOOGL", currency: "USD",
    currentPrice: 175.0, sharesOutstanding: 12350, eps: 6.52, bps: 24.8, dps: 0.8,
    per: 26.8, pbr: 7.1, roe: 26.3, debtRatio: 22.5, evEbitda: 18.9, dividendYield: 0.46,
  },
  {
    companyId: "amazon", companyName: "아마존", ticker: "AMZN", currency: "USD",
    currentPrice: 195.0, sharesOutstanding: 10320, eps: 3.56, bps: 22.4, dps: 0,
    per: 54.8, pbr: 8.7, roe: 15.9, debtRatio: 62.8, evEbitda: 22.4, dividendYield: 0,
  },
];

// 섹터 평균 계산 유틸
function calcAvg(companies: ValuationMetrics[], key: keyof ValuationMetrics): number {
  const values = companies.map((c) => c[key] as number);
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 100) / 100;
}

/** 전체 섹터 목록 */
export const sectors: SectorInfo[] = [
  {
    id: "semiconductor",
    name: "반도체",
    nameEn: "Semiconductor",
    companies: semiconductorCompanies,
    averagePer: calcAvg(semiconductorCompanies, "per"),
    averagePbr: calcAvg(semiconductorCompanies, "pbr"),
    averageRoe: calcAvg(semiconductorCompanies, "roe"),
  },
  {
    id: "bigtech",
    name: "빅테크",
    nameEn: "Big Tech",
    companies: bigTechCompanies,
    averagePer: calcAvg(bigTechCompanies, "per"),
    averagePbr: calcAvg(bigTechCompanies, "pbr"),
    averageRoe: calcAvg(bigTechCompanies, "roe"),
  },
];

/** ID로 재무제표 가져오기 */
export function getFinancialStatement(companyId: string): FinancialStatement | undefined {
  if (companyId === "samsung") return samsungFinancials;
  if (companyId === "apple") return appleFinancials;
  return undefined;
}

/** ID로 밸류에이션 가져오기 */
export function getValuation(companyId: string): ValuationMetrics | undefined {
  if (companyId === "samsung") return samsungValuation;
  if (companyId === "apple") return appleValuation;
  // 섹터 내 기업 검색
  for (const sector of sectors) {
    const found = sector.companies.find((c) => c.companyId === companyId);
    if (found) return found;
  }
  return undefined;
}
