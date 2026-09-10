import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle } from 'lucide-react';
import { PRICING_PLANS } from '../data';

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section
      id="pricing-plans"
      className="py-12 px-5 bg-white border-t border-[#eae6df]"
      data-purpose="pricing-plans"
    >
      <div className="max-w-md md:max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider block mb-1">
            TRANSPARENT PRICING
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f2439]">
            AI 업무팀을 채용하는 것보다<br />
            합리적인 구독료
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            약정 없이 언제든 해지하거나 업그레이드 가능합니다.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 bg-[#f7f5f0] border border-[#eae6df] rounded-full mt-4 text-xs font-bold">
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
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
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
                  className="rounded-2xl border-2 border-[#0f2439] p-5 bg-[#0a1928] text-white relative shadow-xl flex flex-col justify-between"
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

                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className="block w-full py-3.5 text-center text-xs font-bold rounded-xl bg-[#f05a22] text-white hover:bg-[#d94e1c] shadow-highlight transition active:scale-[0.98] cursor-pointer"
                  >
                    {plan.ctaText}
                  </button>
                </div>
              );
            }

            // Normal Starter & Enterprise
            return (
              <div
                key={plan.id}
                className="rounded-2xl border border-[#eae6df] p-5 bg-[#fbf9f5] relative flex flex-col justify-between hover:border-[#0f2439]/30 transition"
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

                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className="block w-full py-2.5 text-center text-xs font-bold rounded-xl border border-[#0f2439] text-[#0f2439] hover:bg-[#0f2439] hover:text-white transition active:scale-[0.98] cursor-pointer"
                >
                  {plan.ctaText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
