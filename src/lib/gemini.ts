import { GoogleGenerativeAI } from "@google/generative-ai";

// Gemini 클라이언트 싱글톤 (서버 사이드 전용)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

/**
 * 스트리밍 응답 생성 → ReadableStream 반환
 * AI 튜터 등 긴 응답에 사용 (타이핑 효과)
 */
export async function createStreamingResponse(
  prompt: string,
  systemInstruction: string
): Promise<ReadableStream> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction,
  });

  const result = await model.generateContentStream(prompt);

  return new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            controller.enqueue(new TextEncoder().encode(text));
          }
        }
      } catch (error) {
        console.error("Gemini 스트리밍 오류:", error);
      } finally {
        controller.close();
      }
    },
  });
}

/**
 * 비스트리밍 응답 생성 → 텍스트 반환
 * 퀴즈 해설, 일지 피드백 등 짧은 응답에 사용
 */
export async function generateText(
  prompt: string,
  systemInstruction: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction,
  });

  const result = await model.generateContent(prompt);
  return result.response.text();
}
