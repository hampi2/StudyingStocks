import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 사이트 메타데이터
export const metadata: Metadata = {
  title: "StudyingStocks - 주식투자 학습 플랫폼",
  description:
    "주식투자를 체계적으로 배우는 최고의 플랫폼. 초보부터 고수까지, 한국과 미국 주식시장을 단계별로 학습하세요.",
};

// 루트 레이아웃
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning // next-themes 필수
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <div className="flex flex-1">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
