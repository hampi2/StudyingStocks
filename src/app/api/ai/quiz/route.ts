import { generateText } from "@/lib/gemini";
import { QUIZ_EXPLANATION_PROMPT } from "@/lib/prompts";

// 퀴즈 오답 AI 심화 해설 API
export async function POST(request: Request) {
  try {
    const { question, options, correctIndex, selectedIndex, explanation } =
      await request.json();

    const prompt = `문제: ${question}
선택지: ${options.map((o: string, i: number) => `${i + 1}. ${o}`).join(", ")}
정답: ${options[correctIndex]} (${correctIndex + 1}번)
사용자가 선택한 답: ${options[selectedIndex]} (${selectedIndex + 1}번)
기본 해설: ${explanation}

사용자가 ${selectedIndex + 1}번을 선택했습니다. 왜 이것이 틀렸는지, 그리고 정답이 왜 맞는지 심화 해설을 작성해주세요.`;

    const text = await generateText(prompt, QUIZ_EXPLANATION_PROMPT);
    return Response.json({ text });
  } catch (error) {
    console.error("퀴즈 AI 해설 오류:", error);
    return Response.json(
      { error: "AI 해설을 생성할 수 없습니다." },
      { status: 500 }
    );
  }
}
