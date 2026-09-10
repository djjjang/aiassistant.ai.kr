import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQ_DATA } from '../data';

export const FAQSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq-section"
      className="py-12 px-5 max-w-md md:max-w-4xl mx-auto"
      data-purpose="faq-section"
    >
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider block mb-1">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0f2439]">
          궁금한 점을 미리 확인하세요
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          보안, 계약 방식, 커뮤니케이션 툴 연동에 대한 주요 답변입니다.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((faq) => {
          const isOpen = openFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#eae6df] overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-bold text-[#0f2439] flex items-center gap-2">
                  <span className="text-[#f05a22] font-mono">Q.</span>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#f05a22]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-[#fbf9f5]/50 animate-in fade-in duration-150">
                  <div className="flex gap-2">
                    <span className="text-[#0f2439] font-bold font-mono">A.</span>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
