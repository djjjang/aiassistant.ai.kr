// 결제 상품표. 결제 승인 서버(api/payments/confirm)도 이 파일을 읽어서
// 손님 화면에서 넘어온 금액이 진짜 가격과 같은지 확인한다 (금액 조작 방지).
// 다른 파일을 import 하지 말 것 — 서버 함수에서 그대로 불러 쓰기 때문.
// 화면에 보이는 요금(src/data.ts PRICING_PLANS·CREDIT_PACKAGES)을 바꾸면 여기도 같이 바꾼다.

export interface CatalogItem {
  id: string; // 영문·숫자·밑줄만 (주문번호 앞부분에 들어감)
  name: string; // 결제창·영수증에 찍히는 상품명
  amount: number; // 원
  kind: 'plan' | 'credit';
  period: string; // 제공 기간 (카드사 심사 필수 표기)
}

export const CATALOG: Record<string, CatalogItem> = {
  starter_monthly: {
    id: 'starter_monthly',
    name: 'AI비서 스타터 1개월',
    amount: 300000,
    kind: 'plan',
    period: '결제일부터 1개월'
  },
  starter_annual: {
    id: 'starter_annual',
    name: 'AI비서 스타터 12개월',
    amount: 3060000,
    kind: 'plan',
    period: '결제일부터 12개월'
  },
  pro_monthly: {
    id: 'pro_monthly',
    name: 'AI비서 비즈니스 프로 1개월',
    amount: 500000,
    kind: 'plan',
    period: '결제일부터 1개월'
  },
  pro_annual: {
    id: 'pro_annual',
    name: 'AI비서 비즈니스 프로 12개월',
    amount: 5100000,
    kind: 'plan',
    period: '결제일부터 12개월'
  },
  credit_10: {
    id: 'credit_10',
    name: 'AI비서 체험팩 10 크레딧',
    amount: 99000,
    kind: 'credit',
    period: '결제일부터 1년'
  },
  credit_30: {
    id: 'credit_30',
    name: 'AI비서 실무팩 30 크레딧 (+3)',
    amount: 249000,
    kind: 'credit',
    period: '결제일부터 1년'
  },
  credit_60: {
    id: 'credit_60',
    name: 'AI비서 비즈니스팩 60 크레딧 (+10)',
    amount: 459000,
    kind: 'credit',
    period: '결제일부터 1년'
  }
};

// 주문번호 = 상품id-시각-난수. 승인할 때 앞부분으로 상품을 다시 찾는다.
export const makeOrderId = (itemId: string) =>
  `${itemId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const itemFromOrderId = (orderId: string): CatalogItem | undefined =>
  CATALOG[orderId.split('-')[0]];

// 요금제 화면의 (요금제 id, 월간/연간) → 상품 id
export const planItemId = (planId: string, cycle: 'monthly' | 'annual') => {
  const base = planId === 'business_pro' ? 'pro' : planId;
  return `${base}_${cycle}`;
};
