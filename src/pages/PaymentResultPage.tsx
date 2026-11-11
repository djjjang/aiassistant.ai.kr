import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { KAKAO_CHAT_URL } from '../components/LeadCaptureForm';
import { BUSINESS } from '../config/business';

const won = (n: number) => `${Number(n).toLocaleString('ko-KR')}원`;

interface Approved {
  orderId: string;
  orderName: string;
  totalAmount: number;
  method: string;
  approvedAt: string;
  receiptUrl?: string;
  period?: string;
}

// /payment/success : 토스가 돌려보낸 값으로 서버에 최종 승인 요청 → 결과 표시
export const PaymentSuccessPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amount = params.get('amount');

  const [approved, setApproved] = useState<Approved | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `결제 결과 | ${BUSINESS.brandName}`;
    if (!paymentKey || !orderId || !amount) {
      setError('결제 정보가 없습니다.');
      return;
    }
    // 새로고침해도 승인을 다시 요청하지 않도록 결과를 기억
    const cacheKey = `aib_paid_${orderId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      setApproved(JSON.parse(cached));
      return;
    }
    fetch('/api/payments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount: Number(amount) })
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || '결제 승인에 실패했습니다.');
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        setApproved(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <PaymentFailView message={error} orderId={orderId} />;

  if (!approved) {
    return (
      <section className="max-w-xl mx-auto px-5 py-24 text-center">
        <Loader2 className="w-10 h-10 text-[#f05a22] animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-600">결제를 확인하고 있습니다. 창을 닫지 말아 주세요.</p>
      </section>
    );
  }

  let buyerName = '';
  try {
    buyerName = JSON.parse(sessionStorage.getItem('aib_buyer') || '{}').name || '';
  } catch {
    // 무시
  }

  return (
    <section className="max-w-xl mx-auto px-5 py-14">
      <div className="text-center mb-8">
        <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
        <h1 className="text-2xl sm:text-3xl font-black text-[#0f2439]">결제가 완료되었습니다</h1>
        <p className="text-sm text-gray-600 mt-2">
          {buyerName ? `${buyerName}님, ` : ''}감사합니다. 아래 버튼으로 카카오톡에 첫 작업을 남겨 주시면 평일 당일 안에 답변드립니다.
        </p>
      </div>

      <dl className="bg-white rounded-2xl border border-[#eae6df] p-5 text-sm space-y-2.5">
        <Row label="상품" value={approved.orderName} />
        <Row label="결제 금액" value={won(approved.totalAmount)} strong />
        <Row label="결제 수단" value={approved.method} />
        {approved.period && <Row label="제공 기간" value={approved.period} />}
        <Row label="결제 일시" value={new Date(approved.approvedAt).toLocaleString('ko-KR')} />
        <Row label="주문번호" value={approved.orderId} small />
      </dl>

      <div className="mt-6 space-y-2">
        {approved.receiptUrl && (
          <a
            href={approved.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 rounded-xl bg-white border border-[#0f2439] text-[#0f2439] text-center font-bold text-sm hover:bg-gray-50"
          >
            영수증 보기
          </a>
        )}
        <a
          href={KAKAO_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-xl bg-[#FEE500] text-[#191919] text-center font-bold text-sm hover:bg-[#FADA0A]"
        >
          카카오톡으로 첫 작업 요청하기
        </a>
        <a href="/" className="block text-center text-xs text-gray-500 pt-2 hover:text-[#f05a22]">
          홈으로
        </a>
      </div>
    </section>
  );
};

// /payment/fail : 손님이 취소했거나 카드사가 거절한 경우
export const PaymentFailPage: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    document.title = `결제 실패 | ${BUSINESS.brandName}`;
  }, []);
  return <PaymentFailView message={params.get('message') || '결제가 완료되지 않았습니다.'} orderId={params.get('orderId')} />;
};

const PaymentFailView: React.FC<{ message: string; orderId: string | null }> = ({ message, orderId }) => (
  <section className="max-w-xl mx-auto px-5 py-20 text-center">
    <XCircle className="w-14 h-14 text-red-500 mx-auto mb-3" />
    <h1 className="text-2xl font-black text-[#0f2439] mb-2">결제가 완료되지 않았습니다</h1>
    <p className="text-sm text-gray-600 mb-1">{message}</p>
    <p className="text-xs text-gray-400 mb-6">돈은 빠져나가지 않았습니다.{orderId ? ` (주문번호 ${orderId})` : ''}</p>
    <div className="flex flex-col sm:flex-row gap-2 justify-center">
      <a href="/#pricing-plans" className="px-5 py-3 rounded-xl bg-[#f05a22] text-white font-bold text-sm">
        다시 결제하기
      </a>
      <a href={KAKAO_CHAT_URL} target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-[#FEE500] text-[#191919] font-bold text-sm">
        카카오톡으로 문의하기
      </a>
    </div>
  </section>
);

const Row: React.FC<{ label: string; value: string; strong?: boolean; small?: boolean }> = ({ label, value, strong, small }) => (
  <div className="flex justify-between gap-4">
    <dt className="text-gray-500 shrink-0">{label}</dt>
    <dd className={`text-right ${strong ? 'font-black text-[#f05a22]' : 'font-semibold text-[#0f2439]'} ${small ? 'text-xs break-all' : ''}`}>
      {value}
    </dd>
  </div>
);
