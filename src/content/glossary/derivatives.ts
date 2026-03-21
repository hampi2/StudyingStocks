import type { GlossaryTerm } from "@/types";

// 파생상품 용어
export const derivativesTerms: GlossaryTerm[] = [
  {
    id: "option",
    termKo: "옵션",
    termEn: "Option",
    definition: "특정 자산을 미래에 정해진 가격으로 사거나 팔 수 있는 권리를 매매하는 계약.",
    category: "파생상품",
  },
  {
    id: "call-option",
    termKo: "콜옵션",
    termEn: "Call Option",
    definition: "특정 자산을 미래에 정해진 가격으로 살 수 있는 권리. 가격 상승 시 이익.",
    category: "파생상품",
  },
  {
    id: "put-option",
    termKo: "풋옵션",
    termEn: "Put Option",
    definition: "특정 자산을 미래에 정해진 가격으로 팔 수 있는 권리. 가격 하락 시 이익.",
    category: "파생상품",
  },
  {
    id: "futures",
    termKo: "선물",
    termEn: "Futures",
    definition: "미래의 특정 시점에 정해진 가격으로 자산을 사고팔기로 약속하는 계약.",
    category: "파생상품",
  },
  {
    id: "leverage",
    termKo: "레버리지",
    termEn: "Leverage",
    definition: "차입금이나 파생상품을 이용하여 투자 수익률을 증폭시키는 것. 손실도 동일하게 증폭됨.",
    category: "파생상품",
  },
  // ===== 신규 용어 =====
  {
    id: "swap",
    termKo: "스왑",
    termEn: "Swap",
    definition: "두 당사자가 미래의 현금흐름을 교환하기로 약속하는 계약. 금리스왑, 통화스왑 등이 있습니다.",
    example: "기업 A는 변동금리 대출을 보유하고 기업 B는 고정금리 대출을 보유할 때, 서로의 이자 지급을 교환하는 금리스왑을 체결합니다.",
    category: "파생상품",
  },
  {
    id: "hedge",
    termKo: "헤지",
    termEn: "Hedge",
    definition: "투자 위험을 줄이기 위해 반대 포지션을 취하는 전략. 보험과 유사한 개념으로, 손실을 제한하는 데 목적이 있습니다.",
    example: "수출 기업이 환율 하락 위험에 대비해 달러 선물을 매도하거나, 주식 보유자가 풋옵션을 매수하여 하락을 방어합니다.",
    category: "파생상품",
  },
  {
    id: "intrinsic-time-value",
    termKo: "내재가치/시간가치",
    termEn: "Intrinsic/Time Value",
    definition: "옵션의 가격은 내재가치(즉시 행사 시 이익)와 시간가치(만기까지 남은 시간의 가치)로 구성됩니다. 시간이 지날수록 시간가치는 감소합니다.",
    example: "행사가 50,000원인 콜옵션, 현재가 55,000원이면 내재가치 5,000원. 옵션 가격이 7,000원이면 시간가치는 2,000원입니다.",
    category: "파생상품",
  },
  {
    id: "strike-price",
    termKo: "행사가격",
    termEn: "Strike Price",
    definition: "옵션 계약에서 기초자산을 사거나 팔 수 있는 미리 정해진 가격. 행사가격과 현재가의 관계에 따라 내가격(ITM), 등가격(ATM), 외가격(OTM)으로 구분합니다.",
    example: "삼성전자 콜옵션 행사가 70,000원 → 현재가 75,000원이면 내가격(ITM), 65,000원이면 외가격(OTM)입니다.",
    category: "파생상품",
  },
];
