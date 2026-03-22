import { createStreamingResponse } from "@/lib/gemini";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";

// AI 튜터 채팅 API (스트리밍)
export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    // 대화 기록을 프롬프트로 변환
    const conversationHistory = messages
      .map(
        (m: { role: string; content: string }) =>
          `${m.role === "user" ? "사용자" : "AI 튜터"}: ${m.content}`
      )
      .join("\n");

    const prompt = `대화 기록:\n${conversationHistory}\n\nAI 튜터:`;

    const stream = await createStreamingResponse(prompt, TUTOR_SYSTEM_PROMPT);
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("AI 튜터 오류:", error);
    return Response.json(
      { error: "AI 응답을 생성할 수 없습니다." },
      { status: 500 }
    );
  }
}
