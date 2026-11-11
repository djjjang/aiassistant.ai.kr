import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle } from 'lucide-react';
import { CATALOG, makeOrderId } from '../payments/catalog';
import { BUSINESS } from '../config/business';

// 토스페이먼츠 결제위젯 v2 (공식 스크립트를 그대로 불러옴 — 패키지 설치 없이)
declare global {
  interface Window {
    TossPayments?: any;
  }
}

const TOSS_SCRIPT = 'https://js.tosspayments.com/v2/standard';

const loadTossScript = () =>
  new Promise<void>((resolve, reject) => {
    if (window.TossPayments) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TOSS_SCRIPT}"]`);
    const script = existing || document.createElement('script');
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('결제 모듈을 불러오지 못했습니다.')));
    if (!existing) {
      script.src = TOSS_SCRIPT;
      document.head.appendChild(script);
    }
  });

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

export const CheckoutPage: React.FC<{ itemId: string | null }> = ({ itemId }) => {
  const item = itemId ? CATALOG[itemId] : undefined;
  const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY as string | undefined;
  const isTestKey = !!clientKey?.startsWith('test_');

  const widgetsRef = useRef<any>(null);
  const initRef = useRef<Promise<any> | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);
  const [buyer, setBuyer] = useState({ company: '', name: '', email: '', phone: '' });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    document.title = `결제하기 | ${BUSINESS.brandName}`;
    if (!item || !clientKey) return;
    // 결제위젯은 한 화면에 한 번만 그릴 수 있음 (개발 모드에서 effect가 두 번 돌아도 한 번만)
    initRef.current ??= (async () => {
      await loadTossScript();
      const toss = window.TossPayments(clientKey);
      const widgets = toss.widgets({ customerKey: window.TossPayments.ANONYMOUS });
      await widgets.setAmount({ currency: 'KRW', value: item.amount });
      await Promise.all([
        widgets.renderPaymentMethods({ selector: '#payment-method', variantKey: 'DEFAULT' }),
        widgets.renderAgreement({ selector: '#payment-agreement', variantKey: 'AGREEMENT' })
      ]);
      return widgets;
    })();
    initRef.current
      .then((widgets) => {
        widgetsRef.current = widgets;
        setReady(true);
      })
      .catch((err: any) => setError(err?.message || '결제창을 불러오지 못했습니다.'));
  }, [item, clientKey]);

  if (!item) {
    return (
      <section className="max-w-xl mx-auto px-5 py-20 text-center">
        <h1 className="text-2xl font-black text-[#0f2439] mb-3">상품을 찾을 수 없습니다</h1>
        <p className="text-sm text-gray-600 mb-6">요금제 화면에서 다시 선택해 주세요.</p>
        <a href="/#pricing-plans" className="inline-block px-5 py-3 rounded-xl bg-[#f05a22] text-white font-bold text-sm">
          요금제 보러 가기
        </a>
      </section>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBuyer((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetsRef.current) return;
    if (!agreed) {
      setError('환불 정책과 이용약관에 동의해 주세요.');
      return;
    }
    setError('');
    setPaying(true);
    try {
      // 결제 후 연락용으로 손님 정보를 잠깐 보관 (결제 완료 화면에서 보여 줌)
      sessionStorage.setItem('aib_buyer', JSON.stringify(buyer));
      await widgetsRef.current.requestPayment({
        orderId: makeOrderId(item.id),
        orderName: item.name,
        customerName: buyer.company ? `${buyer.name} (${buyer.company})` : buyer.name,
        customerEmail: buyer.email,
        customerMobilePhone: buyer.phone.replace(/\D/g, ''),
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`
      });
    } catch (err: any) {
      // 손님이 결제창을 닫은 경우 등
      if (err?.code !== 'USER_CANCEL') setError(err?.message || '결제를 시작하지 못했습니다.');
      setPaying(false);
    }
  };

  const inputClass =
    'w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] outline-none bg-white';

  return (
    <section className="max-w-2xl mx-auto px-5 py-10 sm:py-14">
      <a href="/#pricing-plans" className="text-xs font-bold text-gray-500 hover:text-[#f05a22]">
        ← 요금제로 돌아가기
      </a>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0f2439] mt-3 mb-6">결제하기</h1>

      {isTestKey && (
        <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>지금은 <strong>테스트 결제</strong> 화면입니다. 실제로 돈이 빠져나가지 않습니다.</span>
        </div>
      )}

      {/* 주문 내용 */}
      <div className="bg-white rounded-2xl border border-[#eae6df] p-5 mb-5">
        <div className="text-xs font-bold text-gray-500 mb-1">주문 상품</div>
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-lg font-black text-[#0f2439]">{item.name}</div>
          <div className="text-xl font-black text-[#f05a22] shrink-0">{won(item.amount)}</div>
        </div>
        <ul className="mt-3 text-xs text-gray-600 space-y-1">
          <li>· 제공 기간: {item.period}</li>
          <li>· 작업 시작 전 전액 환불, 시작 뒤에는 진행된 작업분을 빼고 환불</li>
          <li>· 세금계산서 발행 가능 (결제 후 요청)</li>
        </ul>
      </div>

      <form onSubmit={handlePay} className="space-y-5">
        {/* 손님 정보 */}
        <div className="bg-white rounded-2xl border border-[#eae6df] p-5 space-y-3">
          <div className="text-sm font-bold text-[#0f2439]">결제하시는 분</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="company" value={buyer.company} onChange={handleChange} className={inputClass} placeholder="회사명 / 브랜드" />
            <input name="name" value={buyer.name} onChange={handleChange} className={inputClass} placeholder="담당자 성함 *" required />
            <input name="email" type="email" value={buyer.email} onChange={handleChange} className={inputClass} placeholder="이메일 (영수증 받을 곳) *" required />
            <input name="phone" type="tel" value={buyer.phone} onChange={handleChange} className={inputClass} placeholder="연락처 *" required />
          </div>
        </div>

        {/* 토스 결제위젯 */}
        <div className="bg-white rounded-2xl border border-[#eae6df] overflow-hidden">
          {!clientKey && (
            <p className="p-5 text-sm text-red-600">결제 설정(클라이언트 키)이 아직 없습니다.</p>
          )}
          <div id="payment-method" />
          <div id="payment-agreement" />
          {clientKey && !ready && !error && <p className="p-5 text-sm text-gray-500">결제창을 불러오는 중...</p>}
        </div>

        <label className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-[#f05a22]" />
          <span>
            <a href="/refund" target="_blank" className="underline font-bold">환불 정책</a>,{' '}
            <a href="/terms" target="_blank" className="underline font-bold">이용약관</a>,{' '}
            <a href="/privacy" target="_blank" className="underline font-bold">개인정보처리방침</a>을 확인했고 동의합니다. (필수)
          </span>
        </label>

        {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

        <button
          type="submit"
          disabled={!ready || paying}
          className="w-full py-4 rounded-xl bg-[#f05a22] text-white font-black text-base hover:bg-[#d94e1c] transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
        >
          <Lock className="w-4 h-4" />
          {paying ? '결제창 여는 중...' : `${won(item.amount)} 결제하기`}
        </button>

        <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          카드 정보는 토스페이먼츠가 처리하며 {BUSINESS.brandName}에 저장되지 않습니다.
        </p>
      </form>
    </section>
  );
};
