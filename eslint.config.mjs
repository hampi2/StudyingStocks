import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// ESLint 설정 (Next.js 권장 규칙 + TypeScript)
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 기본 무시 경로 설정
  globalIgnores([
    ".next/**", // Next.js 빌드 출력
    "out/**", // 정적 내보내기 출력
    "build/**", // 빌드 결과물
    "next-env.d.ts", // Next.js 자동 생성 타입
  ]),
]);

export default eslintConfig;
