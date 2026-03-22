import { generateText } from "@/lib/gemini";
import { JOURNAL_FEEDBACK_PROMPT } from "@/lib/prompts";

// 투자 일지 AI 피드백 API
export async function POST(request: Request) {
  try {
    const { mode, entry, entries } = await request.json();

    let prompt: string;

    if (mode === "single") {
      // 개별 일지 분석
      prompt = `투자 일지 분석 요청:
제목: ${entry.title}
날짜: ${entry.date}
감정: ${entry.emotion}
매매 행동: ${entry.action || "기록 없음"}
관련 종목: ${entry.stockName || "기록 없음"}
복기 내용: ${entry.content}
배운 점: ${entry.lesson}

이 투자 일지를 분석하여 심리적 편향과 개선점을 피드백해주세요.`;
    } else {
      // 전체 일지 종합 분석
      const summary = entries
        .map(
          (e: { date: string; emotion: string; action?: string; title: string }) =>
            `[${e.date}] ${e.emotion} | ${e.action || "관망"} | ${e.title}`
        )
        .join("\n");

      prompt = `최근 투자 일지 ${entries.length}개 요약:
${summary}

감정 분포, 매매 패턴, 반복되는 편향을 종합 분석하고 개선 방향을 제시해주세요.`;
    }

    const text = await generateText(prompt, JOURNAL_FEEDBACK_PROMPT);
    return Response.json({ text });
  } catch (error) {
    console.error("일지 AI 피드백 오류:", error);
    return Response.json(
      { error: "AI 피드백을 생성할 수 없습니다." },
      { status: 500 }
    );
  }
}
