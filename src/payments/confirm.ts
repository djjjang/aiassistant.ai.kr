// 결제 승인 (서버에서만 실행). 손님이 결제창에서 인증을 마치면 토스가 successUrl로
// paymentKey·orderId·amount를 넘겨주고, 여기서 비밀 키로 최종 승인을 요청해야 돈이 빠져나간다.
import { itemFromOrderId } from './catalog.js';

export interface ConfirmInput {
  paymentKey?: string;
  orderId?: string;
  amount?: number | string;
}

export interface ConfirmResult {
  status: number;
  body: Record<string, unknown>;
}

export async function confirmPayment(input: ConfirmInput, secretKey: string | undefined): Promise<ConfirmResult> {
  const { paymentKey, orderId } = input;
  const amount = Number(input.amount);

  if (!secretKey) {
    return { status: 500, body: { code: 'NO_SECRET_KEY', message: '결제 설정이 아직 끝나지 않았습니다. 고객센터로 문의해 주세요.' } };
  }
  if (!paymentKey || !orderId || !Number.isFinite(amount)) {
    return { status: 400, body: { code: 'INVALID_REQUEST', message: '결제 정보가 올바르지 않습니다.' } };
  }

  // 화면에서 금액을 바꿔치기했는지 확인: 주문번호의 상품 가격과 같아야만 승인
  const item = itemFromOrderId(orderId);
  if (!item || item.amount !== amount) {
    return { status: 400, body: { code: 'AMOUNT_MISMATCH', message: '결제 금액이 상품 가격과 다릅니다. 결제가 진행되지 않았습니다.' } };
  }

  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `confirm-${orderId}` // 새로고침으로 두 번 눌려도 한 번만 승인
    },
    body: JSON.stringify({ paymentKey, orderId, amount })
  });
  const data = (await res.json()) as Record<string, any>;

  if (!res.ok) {
    return { status: res.status, body: { code: data.code, message: data.message || '결제 승인에 실패했습니다.' } };
  }

  // 손님 화면에 필요한 것만 돌려준다
  return {
    status: 200,
    body: {
      orderId: data.orderId,
      orderName: data.orderName,
      totalAmount: data.totalAmount,
      method: data.method,
      approvedAt: data.approvedAt,
      receiptUrl: data.receipt?.url,
      period: item.period
    }
  };
}
