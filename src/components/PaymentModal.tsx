import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Zap,
  Sparkles,
  ArrowRight,
  Printer,
  Receipt,
  AlertCircle,
  Clock,
  Coins,
  Copy,
  Check
} from 'lucide-react';
import { PRICING_PLANS, CREDIT_PACKAGES } from '../data';
import {
  PaymentItemSelection,
  PaymentMethodType,
  PaymentReceipt,
  PricingPlan,
  CreditPackage
} from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelection?: PaymentItemSelection | null;
  onPaymentSuccess?: (receipt: PaymentReceipt) => void;
  onOpenDashboard?: () => void;
}

export const DERMAPINK_BANK_INFO = {
  bankName: '신한은행',
  accountNumber: '140-015-969664',
  accountHolder: '주식회사 더마핑크'
};

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  initialSelection,
  onPaymentSuccess,
  onOpenDashboard
}) => {
  // Mode selection: Plan vs Credit
  const [selectedType, setSelectedType] = useState<'plan' | 'credit'>(
    initialSelection?.type || 'plan'
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    initialSelection?.type === 'plan' ? initialSelection.id : 'business_pro'
  );
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    initialSelection?.billingCycle || 'monthly'
  );
  const [selectedCreditId, setSelectedCreditId] = useState<string>(
    initialSelection?.type === 'credit' ? initialSelection.id : 'credit_30'
  );

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [selectedCardCompany, setSelectedCardCompany] = useState<string>('현대카드');
  const [depositorName, setDepositorName] = useState('');
  const [isAccountCopied, setIsAccountCopied] = useState(false);

  const handleCopyAccount = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(DERMAPINK_BANK_INFO.accountNumber);
    setIsAccountCopied(true);
    setTimeout(() => setIsAccountCopied(false), 2000);
  };

  // Buyer info
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');

  // Tax invoice
  const [requestTaxInvoice, setRequestTaxInvoice] = useState(false);
  const [taxBizNumber, setTaxBizNumber] = useState('');
  const [taxBizName, setTaxBizName] = useState('');
  const [taxEmail, setTaxEmail] = useState('');

  // Agreement
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Flow states
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<PaymentReceipt | null>(null);

  if (!isOpen) return null;

  // Calculate prices
  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];
  const currentCredit = CREDIT_PACKAGES.find((c) => c.id === selectedCreditId) || CREDIT_PACKAGES[1];

  let itemTitle = '';
  let supplyPrice = 0;
  let creditsToAdd = 0;

  if (selectedType === 'plan') {
    itemTitle = `${currentPlan.name} 플랜 (${billingCycle === 'annual' ? '연간 결제' : '월간 결제'})`;
    const monthlyRate =
      billingCycle === 'annual' && currentPlan.annualPricePerMonth
        ? currentPlan.annualPricePerMonth
        : currentPlan.monthlyPrice || 590000;
    // If annual, multiply by 12 with 15% discount
    supplyPrice = billingCycle === 'annual' ? monthlyRate * 12 : monthlyRate;
  } else {
    itemTitle = `${currentCredit.name} (+${currentCredit.bonusCredits} 보너스)`;
    supplyPrice = currentCredit.price;
    creditsToAdd = currentCredit.credits + currentCredit.bonusCredits;
  }

  const vat = Math.round(supplyPrice * 0.1);
  const totalAmount = supplyPrice + vat;

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!buyerName.trim()) {
      alert('주문자 성함을 입력해주세요.');
      return;
    }
    if (!buyerPhone.trim()) {
      alert('휴대전화번호를 입력해주세요.');
      return;
    }
    if (!buyerEmail.trim() || !buyerEmail.includes('@')) {
      alert('올바른 이메일 주소를 입력해주세요.');
      return;
    }
    if (!agreedTerms) {
      alert('구매 조건 및 결제 진행에 동의해주세요.');
      return;
    }

    setIsProcessing(true);

    // Simulate PG processing
    setTimeout(() => {
      const receipt: PaymentReceipt = {
        orderId: `ORD-${Date.now().toString().slice(-8)}`,
        paidAt: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        itemTitle,
        amount: totalAmount,
        paymentMethod,
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerCompany: buyerCompany || '개인',
        depositorName: paymentMethod === 'transfer' ? (depositorName.trim() || buyerName.trim()) : undefined,
        bankAccountInfo: paymentMethod === 'transfer' ? DERMAPINK_BANK_INFO : undefined,
        taxInvoiceRequested: requestTaxInvoice,
        taxBusinessNumber: requestTaxInvoice ? taxBizNumber : undefined,
        creditsAdded: selectedType === 'credit' ? creditsToAdd : undefined,
        activatedPlanId: selectedType === 'plan' ? selectedPlanId : undefined
      };

      // Save to localStorage
      try {
        const storedCredits = parseInt(localStorage.getItem('user_credits') || '0', 10);
        if (selectedType === 'credit') {
          const newCredits = storedCredits + creditsToAdd;
          localStorage.setItem('user_credits', newCredits.toString());
        }
        if (selectedType === 'plan') {
          localStorage.setItem('user_plan', selectedPlanId);
          localStorage.setItem('user_plan_expires', new Date(Date.now() + 30 * 86400000).toISOString());
        }
        // Save order history
        const history = JSON.parse(localStorage.getItem('payment_history') || '[]');
        history.unshift(receipt);
        localStorage.setItem('payment_history', JSON.stringify(history));
      } catch (err) {
        console.error('Storage error', err);
      }

      setIsProcessing(false);
      setCompletedReceipt(receipt);
      if (onPaymentSuccess) {
        onPaymentSuccess(receipt);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#0f2439] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f05a22] flex items-center justify-center text-white font-black text-sm">
              AI
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-1.5">
                <span>안전 결제 체크아웃</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  SSL 256-bit 보안
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                신용카드, 신한은행 계좌이체, 카카오페이, 네이버페이, 토스페이
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {completedReceipt ? (
            /* Payment Success Screen */
            <div className="py-4 space-y-6 animate-scale-in">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider">
                  {completedReceipt.paymentMethod === 'transfer' ? 'ORDER REGISTERED' : 'PAYMENT SUCCESSFUL'}
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {completedReceipt.paymentMethod === 'transfer'
                    ? '입금 신청 및 주문이 접수되었습니다'
                    : '결제가 완료되었습니다'}
                </h3>
                <p className="text-xs text-slate-500">
                  {completedReceipt.paymentMethod === 'transfer'
                    ? '아래 신한은행 법인 계좌로 입금해 주시면 확인 즉시 서비스가 활성화됩니다.'
                    : '주문하신 내역이 정상적으로 승인되었으며 즉시 사용 가능합니다.'}
                </p>
              </div>

              {/* Dedicated Bank Transfer Box if Transfer */}
              {completedReceipt.paymentMethod === 'transfer' && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-200/80">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0046FF] text-white flex items-center justify-center font-black text-xs">
                        신한
                      </span>
                      <span className="font-bold text-blue-950 text-sm">입금 전용 법인 계좌 (신한은행)</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-3 py-1.5 bg-white border border-blue-300 hover:border-blue-400 text-blue-700 font-bold rounded-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer text-xs shadow-2xs"
                    >
                      {isAccountCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">복사완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>계좌번호 복사</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3.5 rounded-xl border border-blue-100">
                    <div>
                      <span className="text-slate-500 block text-[11px] mb-0.5">입금 은행 및 계좌번호</span>
                      <span className="font-mono font-black text-sm text-slate-900 select-all">
                        신한은행 140-015-969664
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] mb-0.5">예금주</span>
                      <span className="font-bold text-slate-900 text-sm">주식회사 더마핑크</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[11px] mb-0.5">입금하실 금액</span>
                      <span className="font-black text-base text-[#f05a22]">
                        ₩{completedReceipt.amount.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-blue-900 gap-1 pt-1">
                    <span>
                      지정 입금자명: <strong>{completedReceipt.depositorName || completedReceipt.buyerName}</strong>
                    </span>
                    <span className="text-blue-700 font-medium">
                      * 입금 확인 알림이 등록하신 휴대전화/이메일로 발송됩니다.
                    </span>
                  </div>
                </div>
              )}

              {/* Receipt Box */}
              <div className="bg-[#f7f5f0] border border-[#eae6df] rounded-xl p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500">주문 번호</span>
                  <span className="font-mono font-bold text-slate-800">
                    {completedReceipt.orderId}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500">결제 상품</span>
                  <span className="font-bold text-slate-900">{completedReceipt.itemTitle}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500">주문 일시</span>
                  <span className="text-slate-700">{completedReceipt.paidAt}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500">결제 수단</span>
                  <span className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
                    {completedReceipt.paymentMethod === 'card' && '💳 신용/체크카드'}
                    {completedReceipt.paymentMethod === 'transfer' && '🏛️ 신한은행 계좌이체 (무통장입금)'}
                    {completedReceipt.paymentMethod === 'kakaopay' && '🟡 카카오페이'}
                    {completedReceipt.paymentMethod === 'naverpay' && '🟢 네이버페이'}
                    {completedReceipt.paymentMethod === 'tosspay' && '🔵 토스페이'}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="font-bold text-slate-500">구매자</span>
                  <span className="text-slate-800">
                    {completedReceipt.buyerName} ({completedReceipt.buyerCompany || '개인'})
                  </span>
                </div>
                {completedReceipt.taxInvoiceRequested && (
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-500">세금계산서 신청</span>
                    <span className="text-emerald-700 font-bold">
                      신청 완료 (사업자번호: {completedReceipt.taxBusinessNumber || '확인중'})
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 text-sm font-black">
                  <span className="text-slate-900">최종 결제 금액</span>
                  <span className="text-xl text-[#f05a22]">
                    ₩{completedReceipt.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Status Notice */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900 space-y-1">
                  <p className="font-bold">
                    {selectedType === 'credit'
                      ? `총 ${completedReceipt.creditsAdded} 크레딧이 계정에 충전되었습니다!`
                      : `${currentPlan.name} 플랜 구독이 활성화되었습니다!`}
                  </p>
                  <p className="text-blue-700 leading-relaxed">
                    전담 실무 매니저가 배정되었으며, 언제든 하단의 업무 의뢰 폼 또는 전담 채널을 통해 즉시 업무를 의뢰하실 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>전표 인쇄</span>
                </button>
                {onOpenDashboard && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDashboard();
                    }}
                    className="flex-1 py-3 px-3 rounded-xl border border-[#0f2439] bg-white text-[#0f2439] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>마이페이지 내역 확인</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('lead-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 px-3 rounded-xl bg-[#f05a22] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#d94e1c] shadow-md transition cursor-pointer"
                >
                  <span>업무 의뢰하기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              {/* Product Category Switcher */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  1. 결제 상품 선택
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setSelectedType('plan')}
                    className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedType === 'plan'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>정기 구독 플랜 (월간/연간)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedType('credit')}
                    className={`py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      selectedType === 'credit'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5 text-[#f05a22]" />
                    <span>크레딧 충전 (종량제 건별)</span>
                  </button>
                </div>
              </div>

              {/* Detail Selection */}
              {selectedType === 'plan' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>구독 플랜 선택</span>
                    {/* Billing Toggle */}
                    <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('monthly')}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          billingCycle === 'monthly' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-500'
                        }`}
                      >
                        월간
                      </button>
                      <button
                        type="button"
                        onClick={() => setBillingCycle('annual')}
                        className={`px-2 py-1 rounded cursor-pointer flex items-center gap-1 ${
                          billingCycle === 'annual' ? 'bg-white font-bold text-slate-900 shadow-2xs' : 'text-slate-500'
                        }`}
                      >
                        <span>연간</span>
                        <span className="text-[9px] bg-[#f05a22] text-white px-1 rounded font-black">
                          15%할인
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PRICING_PLANS.filter((p) => p.monthlyPrice !== null).map((plan) => {
                      const isSelected = selectedPlanId === plan.id;
                      const price =
                        billingCycle === 'annual' && plan.annualPricePerMonth
                          ? plan.annualPricePerMonth
                          : plan.monthlyPrice || 0;

                      return (
                        <div
                          key={plan.id}
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`p-3.5 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#f05a22] bg-orange-50/40 text-slate-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                              {plan.name}
                              {plan.isPopular && (
                                <span className="text-[9px] bg-[#f05a22] text-white px-1.5 py-0.2 rounded font-black">
                                  BEST
                                </span>
                              )}
                            </span>
                            <span className="font-black text-sm text-[#0f2439]">
                              ₩{price.toLocaleString()}
                              <span className="text-[10px] font-normal text-slate-500">/월</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">{plan.subtitle}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Credit Package Selection */
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>크레딧 패키지 선택</span>
                    <span className="text-[11px] text-[#f05a22] font-bold">1크레딧 = 표준 실무 1건 차감</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {CREDIT_PACKAGES.map((pkg) => {
                      const isSelected = selectedCreditId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedCreditId(pkg.id)}
                          className={`p-3 rounded-xl border-2 transition cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#f05a22] bg-orange-50/40 text-slate-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs text-slate-900">{pkg.name}</span>
                              {pkg.isPopular && (
                                <span className="text-[8px] bg-[#f05a22] text-white px-1 py-0.2 rounded font-black">
                                  추천
                                </span>
                              )}
                            </div>
                            <div className="flex items-baseline gap-1 my-1">
                              <span className="font-black text-sm text-[#0f2439]">
                                ₩{pkg.price.toLocaleString()}
                              </span>
                              {pkg.discountRate && (
                                <span className="text-[10px] text-red-500 font-bold">
                                  {pkg.discountRate}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                              {pkg.description}
                            </p>
                          </div>
                          <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600 font-medium">
                            <span>총 크레딧</span>
                            <span className="font-bold text-[#f05a22]">
                              {pkg.credits + pkg.bonusCredits} C
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  2. 결제 수단 선택
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {/* Credit Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#0f2439] bg-slate-900 text-white shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs font-bold">신용/체크카드</span>
                    <span className="text-[9px] opacity-75">무이자 할부</span>
                  </button>

                  {/* Bank Transfer */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                      paymentMethod === 'transfer'
                        ? 'border-[#0046FF] bg-[#0046FF] text-white shadow-sm font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white text-[#0046FF] flex items-center justify-center text-[9px] font-black">
                      신한
                    </div>
                    <span className="text-xs font-bold">실시간 계좌이체</span>
                    <span className="text-[9px] opacity-90">법인계좌/세금계산서</span>
                  </button>

                  {/* Kakao Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakaopay')}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                      paymentMethod === 'kakaopay'
                        ? 'border-[#FEE500] bg-[#FEE500] text-[#191919] shadow-sm font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#191919] text-[#FEE500] flex items-center justify-center text-[9px] font-black">
                      pay
                    </div>
                    <span className="text-xs font-bold">카카오페이</span>
                    <span className="text-[9px] opacity-75">1초 간편결제</span>
                  </button>

                  {/* Naver Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('naverpay')}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                      paymentMethod === 'naverpay'
                        ? 'border-[#03C75A] bg-[#03C75A] text-white shadow-sm font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-sm bg-white text-[#03C75A] flex items-center justify-center text-[10px] font-black">
                      N
                    </div>
                    <span className="text-xs font-bold">네이버페이</span>
                    <span className="text-[9px] opacity-90">포인트 적립</span>
                  </button>

                  {/* Toss Pay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tosspay')}
                    className={`p-2.5 rounded-xl border-2 transition flex flex-col items-center justify-center gap-1 text-center cursor-pointer ${
                      paymentMethod === 'tosspay'
                        ? 'border-[#0064FF] bg-[#0064FF] text-white shadow-sm font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white text-[#0064FF] flex items-center justify-center text-[9px] font-black">
                      toss
                    </div>
                    <span className="text-xs font-bold">토스페이</span>
                    <span className="text-[9px] opacity-90">빠른 승인</span>
                  </button>
                </div>

                {/* Sub-option for Bank Transfer */}
                {paymentMethod === 'transfer' && (
                  <div className="mt-3 p-4 bg-blue-50/80 border border-blue-200 rounded-xl space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#0046FF] text-white flex items-center justify-center font-black text-xs">
                          신한
                        </span>
                        <span className="font-bold text-slate-900 text-sm">더마핑크 공식 법인 계좌</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className="px-3 py-1.5 bg-white border border-blue-300 hover:border-blue-400 text-blue-700 font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer text-xs"
                      >
                        {isAccountCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">복사완료!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-blue-600" />
                            <span>계좌번호 복사</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-slate-500">입금 계좌번호 (신한은행)</div>
                        <div className="text-base sm:text-lg font-black font-mono text-slate-900 tracking-wide select-all">
                          {DERMAPINK_BANK_INFO.accountNumber}
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <div className="text-[11px] text-slate-500">예금주</div>
                        <div className="font-bold text-slate-900 text-sm">{DERMAPINK_BANK_INFO.accountHolder}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      <div>
                        <label className="text-[11px] text-slate-600 font-medium block mb-1">
                          실제 입금자명 <span className="text-slate-400 font-normal">(주문자와 동일시 비워두셔도 됩니다)</span>
                        </label>
                        <input
                          type="text"
                          value={depositorName}
                          onChange={(e) => setDepositorName(e.target.value)}
                          placeholder={buyerName || '입금자명 입력'}
                          className="w-full border border-blue-200 rounded-lg px-2.5 py-1.5 text-xs bg-white focus:outline-blue-500"
                        />
                      </div>
                      <div className="flex items-center text-[11px] text-blue-800 leading-tight bg-blue-100/60 p-2.5 rounded-lg">
                        입금 확인 즉시 전담 실무 매니저가 배정되며, 100% 전자세금계산서 또는 지출증빙 영수증이 발급됩니다.
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-option for Card Company */}
                {paymentMethod === 'card' && (
                  <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">카드사 선택:</span>
                    <select
                      value={selectedCardCompany}
                      onChange={(e) => setSelectedCardCompany(e.target.value)}
                      className="border border-slate-300 rounded-lg px-2.5 py-1 text-xs bg-white text-slate-800 font-medium"
                    >
                      <option value="현대카드">현대카드 (무이자 최대 12개월)</option>
                      <option value="국민카드">KB국민카드 (무이자 최대 10개월)</option>
                      <option value="신한카드">신한카드 (무이자 최대 12개월)</option>
                      <option value="삼성카드">삼성카드 (무이자 최대 10개월)</option>
                      <option value="롯데카드">롯데카드 (무이자 최대 7개월)</option>
                      <option value="비씨카드">BC카드</option>
                      <option value="하나카드">하나카드</option>
                      <option value="NH농협카드">NH농협카드</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Orderer Information */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  3. 주문자 정보 및 세금계산서
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 mb-1 block">주문자 성함 *</span>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="홍길동"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#f05a22]/30 focus:border-[#f05a22] outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 mb-1 block">휴대전화번호 *</span>
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#f05a22]/30 focus:border-[#f05a22] outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 mb-1 block">수신 이메일 (영수증 발송) *</span>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#f05a22]/30 focus:border-[#f05a22] outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-slate-500 mb-1 block">회사명 / 소속 (선택)</span>
                    <input
                      type="text"
                      value={buyerCompany}
                      onChange={(e) => setBuyerCompany(e.target.value)}
                      placeholder="(주)스타트업"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#f05a22]/30 focus:border-[#f05a22] outline-none"
                    />
                  </div>
                </div>

                {/* Tax invoice toggle */}
                <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2.5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={requestTaxInvoice}
                      onChange={(e) => setRequestTaxInvoice(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f05a22] focus:ring-[#f05a22]"
                    />
                    <span>사업자 세금계산서 또는 지출증빙 영수증 신청</span>
                  </label>

                  {requestTaxInvoice && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 animate-fade-in">
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-0.5">사업자등록번호</span>
                        <input
                          type="text"
                          value={taxBizNumber}
                          onChange={(e) => setTaxBizNumber(e.target.value)}
                          placeholder="000-00-00000"
                          className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-0.5">상호(법인명)</span>
                        <input
                          type="text"
                          value={taxBizName}
                          onChange={(e) => setTaxBizName(e.target.value)}
                          placeholder="(주)더마핑크"
                          className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 block mb-0.5">계산서 수신 이메일</span>
                        <input
                          type="email"
                          value={taxEmail}
                          onChange={(e) => setTaxEmail(e.target.value)}
                          placeholder="tax@company.com"
                          className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-[#f7f5f0] border border-[#eae6df] rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span>선택 품목: <strong>{itemTitle}</strong></span>
                  <span>₩{supplyPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>부가가치세 (VAT 10%)</span>
                  <span>₩{vat.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>최종 결제 금액</span>
                  <span className="text-xl text-[#f05a22]">₩{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Terms agreement */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-[#f05a22] focus:ring-[#f05a22]"
                  />
                  <span>구매 조건 및 개인정보 제3자 제공, 전자금융거래 기본약관에 동의합니다. (필수)</span>
                </label>
              </div>

              {/* Submit Payment Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-black text-sm text-white transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  paymentMethod === 'kakaopay'
                    ? 'bg-[#FEE500] hover:bg-[#ebd300] text-[#191919]'
                    : paymentMethod === 'naverpay'
                    ? 'bg-[#03C75A] hover:bg-[#02b350] text-white'
                    : paymentMethod === 'tosspay'
                    ? 'bg-[#0064FF] hover:bg-[#0052d4] text-white'
                    : paymentMethod === 'transfer'
                    ? 'bg-[#0046FF] hover:bg-[#0038cc] text-white'
                    : 'bg-[#f05a22] hover:bg-[#d94e1c] text-white'
                } ${isProcessing ? 'opacity-75 cursor-wait' : 'active:scale-[0.99]'}`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {paymentMethod === 'transfer' ? '입금 계좌 신청 접수 중...' : '안전한 결제 승인 중...'}
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>
                      ₩{totalAmount.toLocaleString()}원{' '}
                      {paymentMethod === 'card' && '신용카드로 결제하기'}
                      {paymentMethod === 'transfer' && '신한은행 계좌로 입금 신청하기'}
                      {paymentMethod === 'kakaopay' && '카카오페이로 1초 결제하기'}
                      {paymentMethod === 'naverpay' && '네이버페이로 결제하기'}
                      {paymentMethod === 'tosspay' && '토스페이로 결제하기'}
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
