"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CandlestickChart } from "@/components/chart/CandlestickChart";
import { CheckCircle2, XCircle, RotateCcw, Trophy } from "lucide-react";
import type { CandleData } from "@/content/chart/sampleData";

// 차트 패턴 문제 정의
interface PatternQuestion {
  id: string;
  title: string; // 문제 제목
  description: string; // 상황 설명
  chartData: CandleData[]; // 차트 데이터
  question: string; // 질문
  options: string[]; // 선택지
  correctIndex: number; // 정답 인덱스
  explanation: string; // 해설
  patternName: string; // 패턴 이름
}

// 패턴 문제 데이터 생성 함수
function generatePatternQuestions(): PatternQuestion[] {
  return [
    {
      id: "p1",
      title: "상승 추세 판단",
      description: "아래 차트를 보고 현재 추세를 판단해보세요.",
      chartData: generateUptrend(),
      question: "이 차트의 현재 추세는 무엇인가요?",
      options: ["강한 상승 추세", "하락 추세", "횡보 (박스권)", "추세 전환 중"],
      correctIndex: 0,
      explanation:
        "차트에서 고점과 저점이 계속 높아지고 있으므로 상승 추세입니다. 저점을 연결한 추세선이 우상향하고 있습니다.",
      patternName: "상승 추세 (Uptrend)",
    },
    {
      id: "p2",
      title: "더블 바텀 패턴",
      description: "아래 차트에서 나타나는 패턴을 찾아보세요.",
      chartData: generateDoubleBottom(),
      question: "이 차트에서 나타나는 패턴은?",
      options: [
        "더블 탑 (이중 천장)",
        "더블 바텀 (이중 바닥)",
        "헤드앤숄더",
        "삼각 수렴",
      ],
      correctIndex: 1,
      explanation:
        "비슷한 가격대에서 두 번 바닥을 찍고 반등하는 패턴입니다. 더블 바텀은 하락 추세가 끝나고 상승 전환을 알리는 신호입니다. W자 형태가 특징입니다.",
      patternName: "더블 바텀 (Double Bottom)",
    },
    {
      id: "p3",
      title: "거래량 급증 해석",
      description: "차트에서 거래량이 급증한 구간을 주목하세요.",
      chartData: generateVolumeSpike(),
      question: "거래량이 급증하면서 양봉이 나타났습니다. 어떻게 해석할까요?",
      options: [
        "매도 신호 - 고점에서 빠져나와야 한다",
        "매수세 유입 - 상승 가능성이 높다",
        "특별한 의미가 없다",
        "하락 반전 신호이다",
      ],
      correctIndex: 1,
      explanation:
        "거래량이 급증하면서 양봉(상승)이 나타나면 강한 매수세가 유입된 것입니다. 이는 추가 상승의 가능성을 시사합니다. 반대로 음봉과 함께 거래량이 급증하면 강한 매도세를 의미합니다.",
      patternName: "거래량 급증 + 양봉",
    },
    {
      id: "p4",
      title: "지지선 이탈",
      description: "주가가 지지선 부근에 있습니다. 다음 움직임을 예측해보세요.",
      chartData: generateSupportBreak(),
      question: "주가가 지지선을 하향 돌파했습니다. 가장 적절한 대응은?",
      options: [
        "저가 매수 기회이므로 즉시 매수",
        "손절매를 고려하고 추가 하락에 대비",
        "거래량과 무관하게 보유 지속",
        "양봉이 나올 때까지 기다려 매수",
      ],
      correctIndex: 1,
      explanation:
        "지지선이 뚫리면 하락이 가속화될 수 있습니다. 이전 지지선은 이제 저항선으로 바뀝니다. 손절매를 통해 추가 손실을 방지하는 것이 일반적인 대응 전략입니다.",
      patternName: "지지선 이탈 (Support Break)",
    },
    {
      id: "p5",
      title: "장대 양봉 판단",
      description: "아래 차트의 마지막 봉을 분석해보세요.",
      chartData: generateLongBullish(),
      question: "차트 끝에 거래량을 동반한 장대 양봉이 나타났습니다. 의미는?",
      options: [
        "약세 신호 - 상승 후 하락 전환",
        "강세 신호 - 강한 매수세 진입",
        "중립 - 추가 확인 필요",
        "오류 데이터일 가능성이 높다",
      ],
      correctIndex: 1,
      explanation:
        "장대 양봉은 해당 기간에 매수세가 압도적으로 우세했음을 나타냅니다. 특히 거래량이 동반되면 더 강한 신호입니다. 하락 추세 끝에 나타나면 추세 전환의 가능성을 시사합니다.",
      patternName: "장대 양봉 (Long Bullish Candle)",
    },
  ];
}

// === 패턴별 차트 데이터 생성 함수 ===

// 상승 추세 데이터
function generateUptrend(): CandleData[] {
  const data: CandleData[] = [];
  let price = 50000;
  for (let i = 0; i < 30; i++) {
    const date = new Date(2025, 0, 2 + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const trend = 200 + Math.random() * 300; // 상승 바이어스
    const volatility = 500 + Math.random() * 800;
    const open = price;
    const close = price + trend + (Math.random() - 0.3) * volatility;
    const high = Math.max(open, close) + Math.random() * 400;
    const low = Math.min(open, close) - Math.random() * 400;
    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(10000000 + Math.random() * 15000000),
    });
    price = close;
  }
  return data;
}

// 더블 바텀 데이터
function generateDoubleBottom(): CandleData[] {
  const data: CandleData[] = [];
  let price = 60000;
  const phases = [
    { length: 8, trend: -400 },   // 1차 하락
    { length: 5, trend: 300 },    // 반등
    { length: 8, trend: -350 },   // 2차 하락 (비슷한 저점)
    { length: 9, trend: 500 },    // 상승 돌파
  ];
  let dayCount = 0;
  for (const phase of phases) {
    for (let i = 0; i < phase.length; i++) {
      const date = new Date(2025, 0, 2 + dayCount);
      dayCount++;
      if (date.getDay() === 0 || date.getDay() === 6) { i--; continue; }
      const open = price;
      const close = price + phase.trend + (Math.random() - 0.5) * 600;
      const high = Math.max(open, close) + Math.random() * 300;
      const low = Math.min(open, close) - Math.random() * 300;
      data.push({
        time: date.toISOString().split("T")[0],
        open: Math.round(open),
        high: Math.round(high),
        low: Math.round(low),
        close: Math.round(close),
        volume: Math.round(12000000 + Math.random() * 10000000),
      });
      price = close;
    }
  }
  return data;
}

// 거래량 급증 데이터
function generateVolumeSpike(): CandleData[] {
  const data: CandleData[] = [];
  let price = 55000;
  for (let i = 0; i < 25; i++) {
    const date = new Date(2025, 0, 2 + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const isSpike = i >= 20; // 마지막 5일에 거래량 급증
    const trend = isSpike ? 800 : (Math.random() - 0.5) * 400;
    const open = price;
    const close = price + trend;
    const high = Math.max(open, close) + Math.random() * 500;
    const low = Math.min(open, close) - Math.random() * 500;
    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(isSpike ? 30000000 + Math.random() * 20000000 : 10000000 + Math.random() * 8000000),
    });
    price = close;
  }
  return data;
}

// 지지선 이탈 데이터
function generateSupportBreak(): CandleData[] {
  const data: CandleData[] = [];
  let price = 55000;
  const supportLevel = 52000;
  for (let i = 0; i < 30; i++) {
    const date = new Date(2025, 0, 2 + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    let trend: number;
    if (i < 10) trend = -200 + (Math.random() - 0.5) * 500; // 하락
    else if (i < 20) {
      // 지지선 부근에서 횡보
      trend = (supportLevel - price) * 0.3 + (Math.random() - 0.5) * 400;
    } else {
      trend = -500 + (Math.random() - 0.5) * 300; // 지지선 이탈 하락
    }
    const open = price;
    const close = price + trend;
    const high = Math.max(open, close) + Math.random() * 400;
    const low = Math.min(open, close) - Math.random() * 400;
    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(10000000 + Math.random() * 12000000),
    });
    price = close;
  }
  return data;
}

// 장대 양봉 데이터
function generateLongBullish(): CandleData[] {
  const data: CandleData[] = [];
  let price = 58000;
  for (let i = 0; i < 25; i++) {
    const date = new Date(2025, 0, 2 + i);
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    const isLast = data.length >= 18;
    const trend = isLast
      ? 2000 + Math.random() * 1000 // 장대 양봉
      : -100 + (Math.random() - 0.5) * 600; // 약한 하락/횡보
    const open = price;
    const close = price + trend;
    const high = Math.max(open, close) + Math.random() * (isLast ? 200 : 400);
    const low = Math.min(open, close) - Math.random() * (isLast ? 200 : 400);
    data.push({
      time: date.toISOString().split("T")[0],
      open: Math.round(open),
      high: Math.round(high),
      low: Math.round(low),
      close: Math.round(close),
      volume: Math.round(isLast ? 40000000 + Math.random() * 20000000 : 10000000 + Math.random() * 8000000),
    });
    price = close;
  }
  return data;
}

// 차트 패턴 인식 게임 페이지
export default function PatternGamePage() {
  const [questions] = useState(() => generatePatternQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = useCallback(
    (index: number) => {
      if (isAnswered) return;
      setSelectedAnswer(index);
      setIsAnswered(true);
      if (index === currentQuestion.correctIndex) {
        setCorrectCount((prev) => prev + 1);
      }
    },
    [isAnswered, currentQuestion.correctIndex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, questions.length]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  }, []);

  // 결과 화면
  if (isFinished) {
    const percentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <Trophy className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
            <CardTitle className="text-2xl">패턴 인식 게임 완료!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">
                {correctCount}/{questions.length}
              </p>
              <p className="text-muted-foreground">정답률: {percentage}%</p>
            </div>
            <div className="text-lg">
              {percentage >= 80 && (
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  훌륭합니다! 차트 분석 실력이 뛰어나요!
                </p>
              )}
              {percentage >= 50 && percentage < 80 && (
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  잘했어요! 기술적 분석 코스를 복습하면 더 좋아질 거예요.
                </p>
              )}
              {percentage < 50 && (
                <p className="text-orange-600 dark:text-orange-400 font-semibold">
                  기술적 분석 기초 코스를 먼저 학습해보세요!
                </p>
              )}
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRetry} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                다시 도전
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">차트 패턴 인식 게임</h1>
        <p className="text-muted-foreground">
          차트를 보고 패턴을 찾아보세요. 실전 감각을 키울 수 있습니다.
        </p>
      </div>

      {/* 진행 바 */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>
            {currentIndex + 1} / {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* 차트 */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">패턴 #{currentIndex + 1}</Badge>
            <CardTitle className="text-lg">{currentQuestion.title}</CardTitle>
          </div>
          <CardDescription>{currentQuestion.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CandlestickChart data={currentQuestion.chartData} height={350} />
        </CardContent>
      </Card>

      {/* 질문 & 선택지 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctIndex;
            const isSelected = index === selectedAnswer;

            let style = "border-border hover:border-primary hover:bg-primary/5";
            if (isAnswered) {
              if (isCorrect) {
                style = "border-green-500 bg-green-50 dark:bg-green-950";
              } else if (isSelected && !isCorrect) {
                style = "border-red-500 bg-red-50 dark:bg-red-950";
              } else {
                style = "border-border opacity-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${style}`}
              >
                <div className="flex items-center gap-3">
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                  )}
                  {!isAnswered && (
                    <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center text-xs font-medium shrink-0">
                      {index + 1}
                    </span>
                  )}
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            );
          })}

          {/* 해설 */}
          {isAnswered && (
            <div className="mt-4 p-4 rounded-lg bg-muted/50 border space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{currentQuestion.patternName}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* 다음 버튼 */}
          {isAnswered && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleNext}>
                {currentIndex < questions.length - 1
                  ? "다음 문제"
                  : "결과 보기"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
