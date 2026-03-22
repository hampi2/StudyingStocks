import { generateText } from "@/lib/gemini";
import { RECOMMEND_PROMPT } from "@/lib/prompts";

// 맞춤 학습 추천 AI API
export async function POST(request: Request) {
  try {
    const {
      completedLessons,
      quizResults,
      investorType,
      level,
      streak,
      tradeCount,
      journalCount,
    } = await request.json();

    // 퀴즈 평균 점수 계산
    const avgScore =
      quizResults.length > 0
        ? Math.round(
            quizResults.reduce(
              (s: number, r: { score: number; total: number }) =>
                s + (r.score / r.total) * 100,
              0
            ) / quizResults.length
          )
        : 0;

    // 약점 퀴즈 목록
    const weakQuizzes = quizResults
      .filter((r: { score: number; total: number }) => r.score / r.total < 0.8)
      .map((r: { quizId: string }) => r.quizId);

    const prompt = `사용자 학습 프로필:
- 투자 성향: ${investorType || "미설정"}
- 학습 레벨: ${level}
- 연속 학습 일수: ${streak}일
- 완료 레슨: ${completedLessons.length}개
- 퀴즈 응시: ${quizResults.length}회
- 퀴즈 평균 점수: ${avgScore}%
- 약점 퀴즈: ${weakQuizzes.length > 0 ? weakQuizzes.join(", ") : "없음"}
- 모의투자 거래 수: ${tradeCount}회
- 투자 일지 수: ${journalCount}개

이 사용자에게 맞춤형 학습 가이드를 작성해주세요. 강점, 약점, 다음 추천 행동을 포함해주세요.`;

    const text = await generateText(prompt, RECOMMEND_PROMPT);
    return Response.json({ text });
  } catch (error) {
    console.error("학습 추천 AI 오류:", error);
    return Response.json(
      { error: "AI 분석을 생성할 수 없습니다." },
      { status: 500 }
    );
  }
}
