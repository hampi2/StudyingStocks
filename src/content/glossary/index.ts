import type { GlossaryTerm } from "@/types";
import { basicTerms } from "./basic";
import { technicalTerms } from "./technical";
import { fundamentalTerms } from "./fundamental";
import { derivativesTerms } from "./derivatives";
import { marketStructureTerms } from "./market-structure";
import { investmentTerms } from "./investment";
import { etfFundTerms } from "./etf-fund";

// 전체 용어 목록 (모든 카테고리 합산)
export const glossaryTerms: GlossaryTerm[] = [
  ...basicTerms,
  ...technicalTerms,
  ...fundamentalTerms,
  ...derivativesTerms,
  ...marketStructureTerms,
  ...investmentTerms,
  ...etfFundTerms,
];

// 카테고리별 그룹화
export function getTermsByCategory() {
  const grouped: Record<string, GlossaryTerm[]> = {};
  for (const term of glossaryTerms) {
    if (!grouped[term.category]) {
      grouped[term.category] = [];
    }
    grouped[term.category].push(term);
  }
  return grouped;
}

// 검색 기능
export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase().trim();
  if (!q) return glossaryTerms;
  return glossaryTerms.filter(
    (term) =>
      term.termKo.toLowerCase().includes(q) ||
      term.termEn.toLowerCase().includes(q) ||
      term.definition.toLowerCase().includes(q)
  );
}

// 개별 카테고리 배열 re-export
export {
  basicTerms,
  technicalTerms,
  fundamentalTerms,
  derivativesTerms,
  marketStructureTerms,
  investmentTerms,
  etfFundTerms,
};
