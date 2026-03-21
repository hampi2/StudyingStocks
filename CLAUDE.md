# StudyingStocks 프로젝트 가이드

## 프로젝트 개요
세계 최고의 주식투자 공부 사이트. 한국(KRX)+미국(NYSE/NASDAQ) 시장 지원, 한국어 UI.
현재 Phase 1(MVP) + Phase 2(차트&기술적분석) 완료. Phase 3(모의투자)부터 이어서 작업.

## 코딩 규칙
- 모든 UI 텍스트와 주석은 **한글**로 작성
- 변수명/함수명 등 영문이 필수인 경우 **한글 주석**을 함께 작성
- 작업 완료 시 **Memory 저장 + 작업 로그 기록** 필수

## 기술 스택
- Next.js 16.2.1 (App Router) + TypeScript 5
- Tailwind CSS 4 + shadcn/ui v4 (base-ui 기반)
- Zustand 5 (상태 관리) + 로컬스토리지 persist
- lightweight-charts 5.1 (캔들차트) + Recharts 3.8 (보조지표)
- Lucide React (아이콘) + next-themes (다크모드)

## 주의사항 (빌드 에러 방지)
1. shadcn/ui v4: `asChild` prop 없음 → `render` prop 또는 직접 className 적용
2. `buttonVariants()`: 반드시 `"use client"` 컴포넌트에서만 사용
3. lightweight-charts v5: `addSeries(CandlestickSeries, opts)` 패턴 사용
4. SheetTrigger 안에 Button 중첩 금지 → SheetTrigger에 직접 스타일 적용
5. Recharts Tooltip: labelFormatter/formatter 파라미터에 명시적 타입 지정 금지

## 문서 위치
- `docs/ARCHITECTURE.md` - 전체 아키텍처, 폴더 구조, 데이터 흐름
- `docs/ROADMAP.md` - 5단계 로드맵 (Phase 1~5)
- `README.md` - 프로젝트 소개, 시작하기

## 명령어
- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run lint` - ESLint 검사

@AGENTS.md
