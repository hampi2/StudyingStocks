// 차트 학습용 샘플 주가 데이터

/** 캔들 데이터 타입 */
export interface CandleData {
  time: string; // 날짜 (YYYY-MM-DD)
  open: number; // 시가
  high: number; // 고가
  low: number; // 저가
  close: number; // 종가
  volume: number; // 거래량
}

/** 삼성전자 3개월 샘플 데이터 (학습용 가상 데이터) */
export const samsungSample: CandleData[] = [
  { time: "2025-01-02", open: 55000, high: 56200, low: 54500, close: 55800, volume: 12500000 },
  { time: "2025-01-03", open: 55800, high: 57000, low: 55600, close: 56500, volume: 15200000 },
  { time: "2025-01-06", open: 56500, high: 56800, low: 55200, close: 55400, volume: 11800000 },
  { time: "2025-01-07", open: 55400, high: 56100, low: 54800, close: 55900, volume: 13400000 },
  { time: "2025-01-08", open: 55900, high: 57500, low: 55700, close: 57200, volume: 18900000 },
  { time: "2025-01-09", open: 57200, high: 58100, low: 56800, close: 57800, volume: 16700000 },
  { time: "2025-01-10", open: 57800, high: 58500, low: 57000, close: 57300, volume: 14200000 },
  { time: "2025-01-13", open: 57300, high: 57600, low: 56000, close: 56200, volume: 12100000 },
  { time: "2025-01-14", open: 56200, high: 56500, low: 55000, close: 55200, volume: 15800000 },
  { time: "2025-01-15", open: 55200, high: 56800, low: 55000, close: 56600, volume: 17300000 },
  { time: "2025-01-16", open: 56600, high: 58000, low: 56400, close: 57800, volume: 19500000 },
  { time: "2025-01-17", open: 57800, high: 59200, low: 57500, close: 58900, volume: 22100000 },
  { time: "2025-01-20", open: 58900, high: 60000, low: 58500, close: 59500, volume: 25000000 },
  { time: "2025-01-21", open: 59500, high: 60500, low: 59000, close: 60200, volume: 23400000 },
  { time: "2025-01-22", open: 60200, high: 61000, low: 59800, close: 60000, volume: 18700000 },
  { time: "2025-01-23", open: 60000, high: 60300, low: 58500, close: 58800, volume: 20100000 },
  { time: "2025-01-24", open: 58800, high: 59500, low: 58000, close: 59200, volume: 16400000 },
  { time: "2025-02-03", open: 59200, high: 60800, low: 59000, close: 60500, volume: 21300000 },
  { time: "2025-02-04", open: 60500, high: 61200, low: 60000, close: 60800, volume: 19800000 },
  { time: "2025-02-05", open: 60800, high: 62000, low: 60500, close: 61800, volume: 24500000 },
  { time: "2025-02-06", open: 61800, high: 63000, low: 61500, close: 62500, volume: 27800000 },
  { time: "2025-02-07", open: 62500, high: 63500, low: 62000, close: 63200, volume: 26200000 },
  { time: "2025-02-10", open: 63200, high: 63800, low: 62500, close: 62800, volume: 22100000 },
  { time: "2025-02-11", open: 62800, high: 63000, low: 61500, close: 61800, volume: 18900000 },
  { time: "2025-02-12", open: 61800, high: 62500, low: 61000, close: 62200, volume: 17600000 },
  { time: "2025-02-13", open: 62200, high: 63800, low: 62000, close: 63500, volume: 23400000 },
  { time: "2025-02-14", open: 63500, high: 64200, low: 63000, close: 63800, volume: 21700000 },
  { time: "2025-02-17", open: 63800, high: 65000, low: 63500, close: 64800, volume: 28900000 },
  { time: "2025-02-18", open: 64800, high: 65500, low: 64000, close: 64200, volume: 24300000 },
  { time: "2025-02-19", open: 64200, high: 64500, low: 62800, close: 63000, volume: 22800000 },
  { time: "2025-02-20", open: 63000, high: 63500, low: 61500, close: 62000, volume: 26100000 },
  { time: "2025-02-21", open: 62000, high: 63200, low: 61800, close: 63000, volume: 20500000 },
  { time: "2025-02-24", open: 63000, high: 63800, low: 62500, close: 63500, volume: 19200000 },
  { time: "2025-02-25", open: 63500, high: 64500, low: 63200, close: 64000, volume: 21800000 },
  { time: "2025-02-26", open: 64000, high: 65200, low: 63800, close: 65000, volume: 25600000 },
  { time: "2025-02-27", open: 65000, high: 66000, low: 64500, close: 65500, volume: 27400000 },
  { time: "2025-02-28", open: 65500, high: 66500, low: 65000, close: 66200, volume: 29800000 },
  { time: "2025-03-03", open: 66200, high: 67000, low: 65500, close: 65800, volume: 24100000 },
  { time: "2025-03-04", open: 65800, high: 66200, low: 64500, close: 64800, volume: 22300000 },
  { time: "2025-03-05", open: 64800, high: 65500, low: 64000, close: 65200, volume: 20800000 },
  { time: "2025-03-06", open: 65200, high: 66800, low: 65000, close: 66500, volume: 26500000 },
  { time: "2025-03-07", open: 66500, high: 67500, low: 66000, close: 67000, volume: 28200000 },
  { time: "2025-03-10", open: 67000, high: 68200, low: 66800, close: 68000, volume: 31500000 },
  { time: "2025-03-11", open: 68000, high: 68500, low: 67000, close: 67500, volume: 27800000 },
  { time: "2025-03-12", open: 67500, high: 67800, low: 66000, close: 66500, volume: 25400000 },
  { time: "2025-03-13", open: 66500, high: 67200, low: 65500, close: 66800, volume: 23100000 },
  { time: "2025-03-14", open: 66800, high: 68000, low: 66500, close: 67800, volume: 26800000 },
  { time: "2025-03-17", open: 67800, high: 69000, low: 67500, close: 68500, volume: 30200000 },
  { time: "2025-03-18", open: 68500, high: 69500, low: 68000, close: 69000, volume: 32100000 },
  { time: "2025-03-19", open: 69000, high: 70000, low: 68500, close: 69800, volume: 35400000 },
];

/** 애플(AAPL) 3개월 샘플 데이터 (학습용 가상 데이터) */
export const appleSample: CandleData[] = [
  { time: "2025-01-02", open: 185.0, high: 188.5, low: 184.2, close: 187.8, volume: 45000000 },
  { time: "2025-01-03", open: 187.8, high: 190.0, low: 187.0, close: 189.5, volume: 52000000 },
  { time: "2025-01-06", open: 189.5, high: 191.2, low: 188.0, close: 188.5, volume: 48000000 },
  { time: "2025-01-07", open: 188.5, high: 189.8, low: 186.5, close: 187.2, volume: 41000000 },
  { time: "2025-01-08", open: 187.2, high: 190.5, low: 186.8, close: 190.0, volume: 55000000 },
  { time: "2025-01-09", open: 190.0, high: 192.8, low: 189.5, close: 192.0, volume: 58000000 },
  { time: "2025-01-10", open: 192.0, high: 193.5, low: 191.0, close: 191.5, volume: 47000000 },
  { time: "2025-01-13", open: 191.5, high: 192.0, low: 189.0, close: 189.5, volume: 43000000 },
  { time: "2025-01-14", open: 189.5, high: 191.0, low: 188.0, close: 190.5, volume: 46000000 },
  { time: "2025-01-15", open: 190.5, high: 193.0, low: 190.0, close: 192.5, volume: 54000000 },
  { time: "2025-01-16", open: 192.5, high: 195.0, low: 192.0, close: 194.8, volume: 61000000 },
  { time: "2025-01-17", open: 194.8, high: 197.5, low: 194.0, close: 196.5, volume: 67000000 },
  { time: "2025-01-20", open: 196.5, high: 198.0, low: 195.5, close: 197.2, volume: 59000000 },
  { time: "2025-01-21", open: 197.2, high: 199.0, low: 196.5, close: 198.5, volume: 63000000 },
  { time: "2025-01-22", open: 198.5, high: 200.0, low: 197.0, close: 197.5, volume: 72000000 },
  { time: "2025-01-23", open: 197.5, high: 198.0, low: 194.5, close: 195.0, volume: 68000000 },
  { time: "2025-01-24", open: 195.0, high: 196.5, low: 193.5, close: 196.0, volume: 53000000 },
  { time: "2025-02-03", open: 196.0, high: 199.0, low: 195.5, close: 198.5, volume: 57000000 },
  { time: "2025-02-04", open: 198.5, high: 200.5, low: 198.0, close: 200.0, volume: 64000000 },
  { time: "2025-02-05", open: 200.0, high: 203.0, low: 199.5, close: 202.5, volume: 71000000 },
  { time: "2025-02-06", open: 202.5, high: 205.0, low: 202.0, close: 204.0, volume: 75000000 },
  { time: "2025-02-07", open: 204.0, high: 206.0, low: 203.0, close: 205.5, volume: 69000000 },
  { time: "2025-02-10", open: 205.5, high: 206.5, low: 203.5, close: 204.0, volume: 58000000 },
  { time: "2025-02-11", open: 204.0, high: 205.0, low: 201.5, close: 202.0, volume: 55000000 },
  { time: "2025-02-12", open: 202.0, high: 204.5, low: 201.0, close: 204.0, volume: 52000000 },
  { time: "2025-02-13", open: 204.0, high: 207.0, low: 203.5, close: 206.5, volume: 66000000 },
  { time: "2025-02-14", open: 206.5, high: 208.0, low: 205.5, close: 207.0, volume: 62000000 },
  { time: "2025-02-17", open: 207.0, high: 210.0, low: 206.5, close: 209.5, volume: 74000000 },
  { time: "2025-02-18", open: 209.5, high: 211.0, low: 208.0, close: 208.5, volume: 68000000 },
  { time: "2025-02-19", open: 208.5, high: 209.0, low: 205.5, close: 206.0, volume: 63000000 },
  { time: "2025-02-20", open: 206.0, high: 207.0, low: 203.0, close: 204.5, volume: 71000000 },
  { time: "2025-02-21", open: 204.5, high: 206.5, low: 204.0, close: 206.0, volume: 57000000 },
  { time: "2025-02-24", open: 206.0, high: 208.0, low: 205.5, close: 207.5, volume: 54000000 },
  { time: "2025-02-25", open: 207.5, high: 209.5, low: 207.0, close: 209.0, volume: 61000000 },
  { time: "2025-02-26", open: 209.0, high: 211.5, low: 208.5, close: 211.0, volume: 69000000 },
  { time: "2025-02-27", open: 211.0, high: 213.0, low: 210.0, close: 212.0, volume: 73000000 },
  { time: "2025-02-28", open: 212.0, high: 214.0, low: 211.5, close: 213.5, volume: 77000000 },
  { time: "2025-03-03", open: 213.5, high: 215.0, low: 212.0, close: 212.5, volume: 65000000 },
  { time: "2025-03-04", open: 212.5, high: 213.5, low: 210.0, close: 210.5, volume: 62000000 },
  { time: "2025-03-05", open: 210.5, high: 212.0, low: 209.5, close: 211.5, volume: 58000000 },
  { time: "2025-03-06", open: 211.5, high: 214.0, low: 211.0, close: 213.5, volume: 67000000 },
  { time: "2025-03-07", open: 213.5, high: 215.5, low: 213.0, close: 215.0, volume: 72000000 },
  { time: "2025-03-10", open: 215.0, high: 217.5, low: 214.5, close: 217.0, volume: 79000000 },
  { time: "2025-03-11", open: 217.0, high: 218.0, low: 215.0, close: 215.5, volume: 71000000 },
  { time: "2025-03-12", open: 215.5, high: 216.0, low: 213.0, close: 214.0, volume: 68000000 },
  { time: "2025-03-13", open: 214.0, high: 215.5, low: 212.5, close: 215.0, volume: 64000000 },
  { time: "2025-03-14", open: 215.0, high: 217.0, low: 214.5, close: 216.5, volume: 70000000 },
  { time: "2025-03-17", open: 216.5, high: 219.0, low: 216.0, close: 218.5, volume: 76000000 },
  { time: "2025-03-18", open: 218.5, high: 220.5, low: 218.0, close: 220.0, volume: 82000000 },
  { time: "2025-03-19", open: 220.0, high: 222.0, low: 219.0, close: 221.5, volume: 88000000 },
];

// 종목 목록
export const stockList = [
  { id: "samsung", name: "삼성전자", ticker: "005930.KS", market: "KRX" as const, currency: "KRW" },
  { id: "apple", name: "애플", ticker: "AAPL", market: "NASDAQ" as const, currency: "USD" },
] as const;

// ID로 샘플 데이터 가져오기
export function getSampleData(stockId: string): CandleData[] {
  switch (stockId) {
    case "samsung":
      return samsungSample;
    case "apple":
      return appleSample;
    default:
      return samsungSample;
  }
}

// 이동평균 계산 (period일 이동평균)
export function calculateMA(data: CandleData[], period: number): { time: string; value: number }[] {
  const result: { time: string; value: number }[] = [];
  for (let i = period - 1; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += data[i - j].close;
    }
    result.push({ time: data[i].time, value: Math.round(sum / period) });
  }
  return result;
}

// RSI 계산 (기본 14일)
export function calculateRSI(data: CandleData[], period: number = 14): { time: string; value: number }[] {
  const result: { time: string; value: number }[] = [];
  const changes: number[] = [];

  for (let i = 1; i < data.length; i++) {
    changes.push(data[i].close - data[i - 1].close);
  }

  for (let i = period; i <= changes.length; i++) {
    const slice = changes.slice(i - period, i);
    const gains = slice.filter((c) => c > 0);
    const losses = slice.filter((c) => c < 0).map((c) => Math.abs(c));

    const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / period : 0;
    const avgLoss = losses.length > 0 ? losses.reduce((a, b) => a + b, 0) / period : 0;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + rs);

    result.push({ time: data[i].time, value: Math.round(rsi * 100) / 100 });
  }

  return result;
}

// MACD 계산 (12, 26, 9)
export function calculateMACD(data: CandleData[]): {
  macd: { time: string; value: number }[];
  signal: { time: string; value: number }[];
  histogram: { time: string; value: number }[];
} {
  // EMA 계산 함수
  function calcEMA(prices: number[], period: number): number[] {
    const k = 2 / (period + 1);
    const ema: number[] = [prices[0]];
    for (let i = 1; i < prices.length; i++) {
      ema.push(prices[i] * k + ema[i - 1] * (1 - k));
    }
    return ema;
  }

  const closes = data.map((d) => d.close);
  const ema12 = calcEMA(closes, 12);
  const ema26 = calcEMA(closes, 26);

  // MACD = EMA12 - EMA26
  const macdValues: number[] = [];
  for (let i = 0; i < closes.length; i++) {
    macdValues.push(ema12[i] - ema26[i]);
  }

  // 시그널 = MACD의 9일 EMA
  const signalValues = calcEMA(macdValues, 9);

  const macd: { time: string; value: number }[] = [];
  const signal: { time: string; value: number }[] = [];
  const histogram: { time: string; value: number }[] = [];

  // 26일 이후부터 유효
  for (let i = 25; i < data.length; i++) {
    macd.push({ time: data[i].time, value: Math.round(macdValues[i]) });
    signal.push({ time: data[i].time, value: Math.round(signalValues[i]) });
    histogram.push({ time: data[i].time, value: Math.round(macdValues[i] - signalValues[i]) });
  }

  return { macd, signal, histogram };
}

// 볼린저밴드 계산 (20일, 2표준편차)
export function calculateBollingerBands(
  data: CandleData[],
  period: number = 20,
  multiplier: number = 2
): {
  upper: { time: string; value: number }[];
  middle: { time: string; value: number }[];
  lower: { time: string; value: number }[];
} {
  const upper: { time: string; value: number }[] = [];
  const middle: { time: string; value: number }[] = [];
  const lower: { time: string; value: number }[] = [];

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1).map((d) => d.close);
    const avg = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / period;
    const std = Math.sqrt(variance);

    middle.push({ time: data[i].time, value: Math.round(avg) });
    upper.push({ time: data[i].time, value: Math.round(avg + multiplier * std) });
    lower.push({ time: data[i].time, value: Math.round(avg - multiplier * std) });
  }

  return { upper, middle, lower };
}
