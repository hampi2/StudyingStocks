# StudyingStocks - 주식투자 학습 플랫폼

주식투자를 체계적으로 배우는 최고의 웹 플랫폼입니다.
초보부터 고수까지, 한국(코스피/코스닥)과 미국(NYSE/NASDAQ) 주식시장을 단계별로 학습할 수 있습니다.

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | Next.js (App Router) | 16.2.1 |
| 언어 | TypeScript | 5.x |
| 스타일링 | Tailwind CSS + shadcn/ui | 4.x |
| 상태 관리 | Zustand + persist | 5.x |
| 캔들 차트 | lightweight-charts (TradingView) | 5.1 |
| 보조지표 차트 | Recharts | 3.8 |
| 아이콘 | Lucide React | 0.577 |
| 테마 | next-themes | 0.4 |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열어 확인합니다.

## 주요 기능

### Phase 1 - 기초 학습 (완료)
- **학습 코스**: 초급/중급/고급 단계별 주식투자 학습 (7개 레슨)
- **용어 사전**: 한글·영문 45개+ 주식 용어, 5개 카테고리, 검색/필터
- **퀴즈**: 4세트 12문제, 객관식/OX, 즉시 피드백 및 해설
- **진행률 추적**: 로컬스토리지 기반 학습 상태 저장

### Phase 2 - 차트 & 기술적 분석 (완료)
- **차트 뷰어**: TradingView 스타일 캔들차트, 종목 선택, 이동평균선/볼린저밴드
- **기술적 분석 학습**: MA, RSI, MACD, 볼린저밴드 시각화 및 설명
- **패턴 인식 게임**: 5개 차트 패턴 인식 퀴즈

### Phase 3~5 (예정)
- 모의투자 (Paper Trading)
- 재무제표 분석 & 밸류에이션 계산기
- 커뮤니티 & AI 학습 추천

## 프로젝트 구조

```
src/
├── app/              # 페이지 (App Router)
│   ├── courses/      # 학습 코스 (목록, 상세, 레슨)
│   ├── glossary/     # 용어 사전
│   ├── quiz/         # 퀴즈
│   ├── chart/        # 차트 뷰어
│   ├── technical/    # 기술적 분석 학습
│   └── pattern-game/ # 패턴 인식 게임
├── components/       # 재사용 컴포넌트
│   ├── layout/       # 헤더, 푸터, 사이드바
│   ├── chart/        # 캔들차트, 보조지표 차트
│   ├── courses/      # 코스 카드
│   └── ui/           # shadcn/ui 기본 컴포넌트
├── content/          # 학습 콘텐츠 데이터
│   ├── courses/      # 코스, 레슨, 퀴즈 데이터
│   ├── glossary/     # 용어 사전 데이터
│   └── chart/        # 샘플 주가 데이터 + 지표 계산
├── lib/              # 유틸리티, 상태 관리
├── hooks/            # 커스텀 훅
└── types/            # TypeScript 타입 정의
```

## 문서

- [아키텍처](docs/ARCHITECTURE.md) - 기술 스택, 폴더 구조, 설계 원칙
- [로드맵](docs/ROADMAP.md) - 5단계 개발 계획

## 배포

Vercel 플랫폼을 통해 배포할 수 있습니다.

```bash
npm run build  # 빌드 확인 후
# Vercel CLI 또는 GitHub 연동으로 배포
```
