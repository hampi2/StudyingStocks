# StudyingStocks 아키텍처 문서

## 프로젝트 비전
세계 최고의 주식투자 공부 사이트.
이론 → 퀴즈 → 차트 실습 → 모의투자로 이어지는 체험형 학습 플랫폼.

## 기술 스택

| 영역 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| 프레임워크 | Next.js (App Router) | 16.2.1 | SSR/SSG, SEO, 빠른 페이지 로딩 |
| 언어 | TypeScript | 5.x | 타입 안정성, 유지보수성 |
| 스타일링 | Tailwind CSS | 4.x | 빠른 UI 개발, 일관된 디자인 |
| UI 컴포넌트 | shadcn/ui (base-ui) | 4.1 | 접근성 내장, 커스터마이징 용이 |
| 상태관리 | Zustand + persist | 5.x | 가볍고 직관적, 로컬스토리지 연동 |
| 캔들차트 | lightweight-charts | 5.1 | TradingView 공식, 고성능 |
| 보조지표 차트 | Recharts | 3.8 | React 네이티브, 커스터마이징 쉬움 |
| 아이콘 | Lucide React | 0.577 | 일관된 아이콘 세트 |
| 테마 | next-themes | 0.4 | 다크모드/라이트모드 간편 전환 |

### 향후 추가 예정
| 영역 | 기술 | 용도 |
|------|------|------|
| DB/인증 | Supabase | 사용자 데이터, 인증 (Phase 3~) |
| 배포 | Vercel | Next.js 최적 배포 환경 |
| AI | Claude API | 학습 추천, 질문 답변 (Phase 5) |

## 프로젝트 구조

```
StudyingStocks/
├── docs/                          # 프로젝트 문서
│   ├── ARCHITECTURE.md            # 이 파일 (아키텍처)
│   └── ROADMAP.md                 # 로드맵
├── src/
│   ├── app/                       # Next.js App Router 페이지
│   │   ├── layout.tsx             # 루트 레이아웃 (ThemeProvider, Header, Footer)
│   │   ├── page.tsx               # 랜딩 페이지
│   │   ├── courses/               # 학습 코스
│   │   │   ├── page.tsx           # 코스 목록 (난이도 필터)
│   │   │   └── [courseId]/
│   │   │       ├── page.tsx       # 코스 상세 (레슨 목록)
│   │   │       └── [lessonId]/
│   │   │           └── page.tsx   # 레슨 상세 (콘텐츠 + 완료 + 퀴즈)
│   │   ├── glossary/
│   │   │   └── page.tsx           # 용어 사전 (검색 + 카테고리)
│   │   ├── quiz/
│   │   │   ├── page.tsx           # 퀴즈 목록
│   │   │   └── [id]/
│   │   │       └── page.tsx       # 퀴즈 플레이어
│   │   ├── chart/
│   │   │   └── page.tsx           # 차트 뷰어 (캔들차트 + 지표)
│   │   ├── technical/
│   │   │   └── page.tsx           # 기술적 분석 학습 (MA/RSI/MACD/BB)
│   │   └── pattern-game/
│   │       └── page.tsx           # 차트 패턴 인식 게임
│   ├── components/
│   │   ├── layout/                # 레이아웃 컴포넌트
│   │   │   ├── Header.tsx         # 상단 네비게이션
│   │   │   ├── Footer.tsx         # 하단 푸터
│   │   │   ├── Sidebar.tsx        # 좌측 사이드바
│   │   │   └── ThemeProvider.tsx   # 다크모드 제공자
│   │   ├── chart/                 # 차트 컴포넌트
│   │   │   ├── CandlestickChart.tsx  # TradingView 캔들차트
│   │   │   └── IndicatorChart.tsx    # RSI/MACD 보조지표 차트
│   │   ├── courses/
│   │   │   └── CourseCard.tsx     # 코스 카드 (진행률 포함)
│   │   └── ui/                    # shadcn/ui 기본 컴포넌트
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── progress.tsx
│   │       ├── separator.tsx
│   │       └── sheet.tsx
│   ├── content/                   # 학습 콘텐츠 데이터
│   │   ├── courses/
│   │   │   ├── data.ts            # 코스 & 레슨 데이터 (7개 레슨)
│   │   │   └── quizzes.ts         # 퀴즈 데이터 (4세트 12문제)
│   │   ├── glossary/
│   │   │   └── data.ts            # 용어 사전 (45개+)
│   │   └── chart/
│   │       └── sampleData.ts      # 샘플 주가 데이터 + 지표 계산 함수
│   ├── lib/
│   │   ├── utils.ts               # cn() 유틸리티 (tailwind-merge)
│   │   └── store.ts               # Zustand 상태 관리 스토어
│   ├── hooks/                     # 커스텀 훅 (아직 비어있음)
│   └── types/
│       └── index.ts               # TypeScript 타입 정의
├── .claude/
│   └── commands/
│       └── deploy.md              # /deploy 커스텀 명령어 (미동작)
├── CLAUDE.md                      # Claude Code 프로젝트 가이드
├── AGENTS.md                      # Next.js 에이전트 규칙
├── README.md                      # 프로젝트 소개
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

## 데이터 흐름

```
[콘텐츠 데이터 (content/)] → [페이지 컴포넌트 (app/)] → [UI 렌더링]
                                      ↕
                            [Zustand 스토어 (lib/store.ts)]
                                      ↕
                            [로컬스토리지 (persist)]
```

- 학습 콘텐츠는 정적 TypeScript 파일로 관리 (Phase 1~2)
- 사용자 진행 상태는 Zustand + 로컬스토리지로 저장
- Phase 3 이후 Supabase 도입 시 서버 측 데이터 저장으로 전환 예정

## 페이지별 라우팅

| 경로 | 페이지 | 렌더링 | 상태 |
|------|--------|--------|------|
| `/` | 랜딩 페이지 | CSR | 완료 |
| `/courses` | 코스 목록 | CSR | 완료 |
| `/courses/[courseId]` | 코스 상세 | CSR | 완료 |
| `/courses/[courseId]/[lessonId]` | 레슨 상세 | CSR | 완료 |
| `/glossary` | 용어 사전 | CSR | 완료 |
| `/quiz` | 퀴즈 목록 | CSR | 완료 |
| `/quiz/[id]` | 퀴즈 풀기 | CSR | 완료 |
| `/chart` | 차트 뷰어 | CSR | 완료 |
| `/technical` | 기술적 분석 | CSR | 완료 |
| `/pattern-game` | 패턴 게임 | CSR | 완료 |
| `/paper-trading` | 모의투자 | - | Phase 3 |
| `/valuation` | 밸류에이션 | - | Phase 4 |
| `/community` | 커뮤니티 | - | Phase 5 |

## 컴포넌트 설계 원칙

1. **"use client"**: 상호작용이 필요한 컴포넌트만 클라이언트 컴포넌트로 지정
2. **buttonVariants 패턴**: Link + buttonVariants() 조합으로 버튼형 링크 구현 (asChild 사용 불가)
3. **shadcn/ui v4**: base-ui 기반, `render` prop으로 커스텀 렌더링
4. **다크모드**: next-themes + Tailwind `dark:` 접두사로 모든 컴포넌트 대응
5. **한글 우선**: UI 텍스트, 주석, 문서 모두 한글. 영문 필수 시 한글 주석 추가
