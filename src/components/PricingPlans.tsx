import React, { useState } from 'react';
import {
  Check,
  Sparkles,
  HelpCircle,
  Coins,
  CreditCard,
  Building2,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { PRICING_PLANS, CREDIT_PACKAGES } from '../data';
import { PaymentItemSelection } from '../types';

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
  onOpenPayment?: (selection: PaymentItemSelection) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({
  onSelectPlan,
  onOpenPayment
}) => {
  const [pricingTab, setPricingTab] = useState<'subscription' | 'credit'>('subscription');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handlePlanCheckout = (planId: string, planName: string, price: number) => {
    if (onOpenPayment) {
      onOpenPayment({
        type: 'plan',
        id: planId,
        name: planName,
        price,
        billingCycle
      });
    } else {
      onSelectPlan(planId);
    }
  };

  const handleCreditCheckout = (pkgId: string, pkgName: string, price: number, credits: number) => {
    if (onOpenPayment) {
      onOpenPayment({
        type: 'credit',
        id: pkgId,
        name: pkgName,
        price,
        credits
      });
    }
  };

  return (
    <section
      id="pricing-plans"
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#eae6df]"
      data-purpose="pricing-plans"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider block mb-1">
            TRANSPARENT PRICING & CREDITS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2439]">
            AI 업무팀을 채용하는 것보다<br />
            합리적인 구독료 & 크레딧
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            정기 구독 또는 필요한 만큼만 쓰는 종량제 크레딧 중 자유롭게 선택하세요.
          </p>

          {/* Payment Methods Supported Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-4 py-2 bg-[#f7f5f0] border border-[#eae6df] rounded-full text-[11px] font-bold text-slate-700">
            <span className="text-slate-500 font-medium">지원 결제 수단:</span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-slate-600" /> 신용/체크카드
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-bold text-blue-900">
              <span className="w-2 h-2 rounded-full bg-[#0046FF]"></span> 신한은행 계좌이체
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-extrabold text-[#3A1D1D]">
              <span className="w-2 h-2 rounded-full bg-[#FEE500]"></span> 카카오페이
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 font-extrabold text-[#03C75A]">
              <span className="w-2 h-2 rounded-full bg-[#03C75A]"></span> 네이버페이
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[#0064FF] font-extrabold">토스페이</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              세금계산서 100%
            </span>
          </div>

          {/* Main Pricing Mode Switcher */}
          <div className="flex items-center justify-center mt-6">
            <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold">
              <button
                onClick={() => setPricingTab('subscription')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  pricingTab === 'subscription'
                    ? 'bg-[#0f2439] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>정기 구독 플랜</span>
              </button>
              <button
                onClick={() => setPricingTab('credit')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  pricingTab === 'credit'
                    ? 'bg-[#0f2439] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Coins className="w-4 h-4 text-[#f05a22]" />
                <span>크레딧 충전 (종량제 건별)</span>
                <span className="text-[9px] bg-[#f05a22] text-white px-1.5 py-0.2 rounded-full font-black">
                  NEW
                </span>
              </button>
            </div>
          </div>

          {/* Billing Cycle Toggle (Only for Subscription) */}
          {pricingTab === 'subscription' && (
            <div className="inline-flex items-center p-1 bg-[#f7f5f0] border border-[#eae6df] rounded-full mt-4 text-xs font-bold animate-fade-in">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#0f2439] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                월간 결제
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-[#0f2439] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>연간 결제</span>
                <span className="bg-[#f05a22] text-white text-[9px] px-1.5 py-0.2 rounded-full font-black">
                  15% OFF
                </span>
              </button>
            </div>
          )}
        </div>

        {/* 1. Subscription Plans View */}
        {pricingTab === 'subscription' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch animate-fade-in">
            {PRICING_PLANS.map((plan) => {
              const isPro = plan.isPopular;
              const price =
                billingCycle === 'annual' && plan.annualPricePerMonth
                  ? plan.annualPricePerMonth
                  : plan.monthlyPrice;

              if (isPro) {
                return (
                  <div
                    key={plan.id}
                    className="rounded-2xl border-2 border-[#0f2439] p-6 lg:p-7 bg-[#0a1928] text-white relative shadow-xl flex flex-col justify-between"
                  >
                    <span className="absolute -top-3 right-5 bg-[#f05a22] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                      가장 인기 (BEST)
                    </span>

                    <div>
                      <div className="text-xs font-bold text-[#f05a22] uppercase mb-1">
                        {plan.name}
                      </div>
                      <div className="text-xs text-gray-300 mb-3">{plan.subtitle}</div>

                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-3xl font-black text-white">
                          ₩{price?.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400">/ 월</span>
                      </div>

                      <ul className="space-y-2.5 text-xs text-gray-200 mb-6">
                        {plan.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#f05a22] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handlePlanCheckout(plan.id, plan.name, price || 590000)}
                        className="w-full py-3.5 text-center text-xs font-black rounded-xl bg-[#f05a22] text-white hover:bg-[#d94e1c] shadow-highlight transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>카드 / 간편결제로 시작하기</span>
                      </button>
                      <p className="text-[10px] text-center text-gray-400">
                        카카오페이 / 네이버페이 / 카드 즉시 결제 가능
                      </p>
                    </div>
                  </div>
                );
              }

              // Normal Starter & Enterprise
              return (
                <div
                  key={plan.id}
                  className="rounded-2xl border border-[#eae6df] p-6 lg:p-7 bg-[#fbf9f5] relative flex flex-col justify-between hover:border-[#0f2439]/30 transition"
                >
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase mb-1">{plan.name}</div>
                    <div className="text-xs text-gray-400 mb-3">{plan.subtitle}</div>

                    <div className="flex items-baseline gap-1 mb-4">
                      {price ? (
                        <>
                          <span className="text-2xl font-black text-[#0f2439]">
                            ₩{price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-400">/ 월</span>
                        </>
                      ) : (
                        <span className="text-xl font-black text-[#0f2439]">{plan.priceDisplay}</span>
                      )}
                    </div>

                    <ul className="space-y-2 text-xs text-gray-600 mb-6">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#f05a22] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {price ? (
                      <button
                        onClick={() => handlePlanCheckout(plan.id, plan.name, price)}
                        className="w-full py-3 text-center text-xs font-bold rounded-xl bg-white border border-[#0f2439] text-[#0f2439] hover:bg-[#0f2439] hover:text-white transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{plan.ctaText}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectPlan(plan.id)}
                        className="w-full py-3 text-center text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-900 transition active:scale-[0.98] cursor-pointer"
                      >
                        {plan.ctaText}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. Credit Packages View */
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {CREDIT_PACKAGES.map((pkg) => {
                const totalCredits = pkg.credits + pkg.bonusCredits;
                const unitPrice = Math.round(pkg.price / totalCredits);

                return (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl p-6 lg:p-7 relative flex flex-col justify-between transition ${
                      pkg.isPopular
                        ? 'border-2 border-[#0f2439] bg-[#0a1928] text-white shadow-xl'
                        : 'border border-[#eae6df] bg-[#fbf9f5] text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-3 right-5 bg-[#f05a22] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                        가장 많이 충전 (BEST)
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-bold uppercase ${
                            pkg.isPopular ? 'text-[#f05a22]' : 'text-slate-600'
                          }`}
                        >
                          {pkg.name}
                        </span>
                        {pkg.discountRate && (
                          <span className="text-[10px] bg-red-500/10 text-red-600 font-extrabold px-1.5 py-0.5 rounded">
                            {pkg.discountRate}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 mb-3">{pkg.description}</div>

                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span
                          className={`text-3xl font-black ${
                            pkg.isPopular ? 'text-white' : 'text-[#0f2439]'
                          }`}
                        >
                          ₩{pkg.price.toLocaleString()}
                        </span>
                        {pkg.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            ₩{pkg.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 mb-4 flex items-center gap-1">
                        <span>크레딧당 약 ₩{unitPrice.toLocaleString()}원</span>
                        <span className="font-bold text-[#f05a22]">
                          (총 {totalCredits} C)
                        </span>
                      </div>

                      <ul
                        className={`space-y-2 text-xs mb-6 ${
                          pkg.isPopular ? 'text-gray-200' : 'text-gray-600'
                        }`}
                      >
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#f05a22] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() =>
                        handleCreditCheckout(pkg.id, pkg.name, pkg.price, totalCredits)
                      }
                      className={`w-full py-3.5 text-center text-xs font-black rounded-xl transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 ${
                        pkg.isPopular
                          ? 'bg-[#f05a22] text-white hover:bg-[#d94e1c] shadow-highlight'
                          : 'bg-[#0f2439] text-white hover:bg-[#0a1928]'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>{totalCredits} 크레딧 충전하기</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Credit Usage Guide Banner */}
            <div className="p-4 bg-[#f7f5f0] border border-[#eae6df] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f05a22] flex items-center justify-center font-black shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    크레딧 차감 기준: 1 크레딧 = 표준 실무 1건
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    계약서 독소조항 검토(1건), 보도자료 초안 작성(1건), 회의록 정리(1건), 시장 리서치(1건) 등
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-600 shrink-0">
                유효기간: 결제일로부터 1년 (미사용 전액 환불 보장)
              </span>
            </div>
          </div>
        )}

        {/* Security & Refund Assurance */}
        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs text-gray-500">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>국내 모든 카드사 무이자 할부</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#f05a22]" />
            <span>카카오·네이버페이 1초 간편결제</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>불만족 시 100% 무조건 전액 환불</span>
          </div>
        </div>
      </div>
    </section>
  );
};
