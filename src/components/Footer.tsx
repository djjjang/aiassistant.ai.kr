import React from 'react';
import { BUSINESS } from '../config/business';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = `/#${id}`;
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#edeae3] text-gray-600 py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-t border-[#eae6df] text-xs"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Brand & Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#0f2439] flex items-center justify-center text-white font-black text-xs">
              AI
            </div>
            <span className="text-base font-black text-[#0f2439]">AI비서</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            국내 최고의 AI 비즈니스 대행 솔루션. 검증된 엔지니어와 실무진이 사람의 정교함과 AI의
            속도로 회사의 시간을 벌어드립니다.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-gray-600 pt-3 border-t border-gray-300/60">
          <div>
            <span className="text-[#0f2439] font-bold block mb-2">서비스 안내</span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  문서 자동화
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  콘텐츠 대행
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  시장 리서치
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing-plans')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  도입 가격 안내
                </button>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#0f2439] font-bold block mb-2">고객지원 &amp; 안내</span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    const btn = document.getElementById('open-ai-chatbot-btn');
                    if (btn) btn.click();
                  }}
                  className="hover:text-[#f05a22] text-blue-900 font-bold transition text-left cursor-pointer flex items-center gap-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>실시간 AI 상담 비서 (24h)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  자주 묻는 질문 (FAQ)
                </button>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-[#f05a22] transition">
                  요청 시 비밀유지계약(NDA)
                </a>
              </li>
              <li>
                <a href="tel:07081443848" className="hover:text-[#f05a22] font-semibold text-gray-800">
                  전화 상담: 070-8144-3848
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[#0f2439] font-bold block mb-2">전문가 네트워크</span>
            <ul className="space-y-1.5 text-gray-500">
              <li>IR &amp; 비즈니스 기획</li>
              <li>SEO &amp; 브랜드 스토리</li>
              <li>AI 워크플로우 엔지니어링</li>
              <li>고객 응대 &amp; 사내 CS</li>
            </ul>
          </div>

          <div>
            <span className="text-[#0f2439] font-bold block mb-2">업무 시간</span>
            <ul className="space-y-1 text-gray-500">
              <li>평일: 09:00 - 19:00</li>
              <li>비즈니스 프로: 긴급 24h 대응</li>
              <li className="pt-1 text-[#f05a22] font-bold">1:1 실시간 상담 상시 접수</li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-5 border-t border-gray-300/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="space-y-1 leading-relaxed">
            {/* 카드사 심사: 사업자등록증과 글자까지 같아야 함 → src/config/business.ts 에서만 고칠 것 */}
            <p>
              <strong>{BUSINESS.companyName}</strong> | 대표자: {BUSINESS.ceoName}
              {BUSINESS.bizRegNo && <> | 사업자등록번호: {BUSINESS.bizRegNo}</>}
              {BUSINESS.mailOrderNo && <> | 통신판매업 신고번호: {BUSINESS.mailOrderNo}</>}
            </p>
            <p>사업장 소재지: {BUSINESS.address}</p>
            <p>
              고객센터: {BUSINESS.phone}
              {BUSINESS.email && <> | 이메일: {BUSINESS.email}</>} | {BUSINESS.hours} | 입금계좌: {BUSINESS.bank.name} {BUSINESS.bank.account} (예금주: {BUSINESS.bank.holder})
            </p>
            <p className="flex flex-wrap gap-x-3 pt-1 font-bold text-gray-600">
              <a href="/terms" className="hover:text-[#f05a22]">이용약관</a>
              <a href="/privacy" className="hover:text-[#f05a22]">개인정보처리방침</a>
              <a href="/refund" className="hover:text-[#f05a22]">환불 정책</a>
            </p>
            <p className="pt-0.5 text-gray-400">© 2026 {BUSINESS.companyName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
