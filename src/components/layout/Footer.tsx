import Link from "next/link";
import { TrendingUp } from "lucide-react";

// 푸터 컴포넌트
export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-bold">StudyingStocks</span>
            </div>
            <p className="text-sm text-muted-foreground">
              주식투자를 체계적으로 배우는 가장 좋은 방법.
              <br />
              초보부터 고수까지, 단계별 학습을 제공합니다.
            </p>
          </div>

          {/* 학습 메뉴 */}
          <div>
            <h3 className="font-semibold mb-3">학습</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  학습 코스
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-primary transition-colors">
                  용어 사전
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-primary transition-colors">
                  퀴즈
                </Link>
              </li>
            </ul>
          </div>

          {/* 시장 정보 */}
          <div>
            <h3 className="font-semibold mb-3">지원 시장</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>한국 (코스피/코스닥)</li>
              <li>미국 (NYSE/NASDAQ)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} StudyingStocks. 투자의 책임은 본인에게 있습니다.
        </div>
      </div>
    </footer>
  );
}
