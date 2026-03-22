import { generateText } from "@/lib/gemini";
import { FINANCIAL_INTERPRET_PROMPT } from "@/lib/prompts";

// 재무제표 AI 해석 API
export async function POST(request: Request) {
  try {
    const {
      companyName,
      ticker,
      itemLabel,
      itemLabelEn,
      values,
      years,
      description,
      formula,
      currency,
    } = await request.json();

    const unit = currency === "KRW" ? "억원" : "백만달러";
    const yearValues = years
      .map((y: string, i: number) => `${y}: ${values[i].toLocaleString()}${unit}`)
      .join(", ");

    const prompt = `기업: ${companyName} (${ticker})
항목: ${itemLabel} (${itemLabelEn})
연도별 수치: ${yearValues}
기본 설명: ${description}
${formula ? `계산 공식: ${formula}` : ""}

이 재무 수치가 투자자에게 어떤 의미인지 쉽게 해석해주세요. 전년 대비 변화가 의미하는 바도 설명해주세요.`;

    const text = await generateText(prompt, FINANCIAL_INTERPRET_PROMPT);
    return Response.json({ text });
  } catch (error) {
    console.error("재무제표 AI 해석 오류:", error);
    return Response.json(
      { error: "AI 해석을 생성할 수 없습니다." },
      { status: 500 }
    );
  }
}
