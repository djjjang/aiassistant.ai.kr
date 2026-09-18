import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onOpenDashboard?: (tab?: 'tasks' | 'payments') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDashboard }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
                  데이터 분석
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
              {onOpenDashboard && (
                <li>
                  <button
                    onClick={() => onOpenDashboard('payments')}
                    className="hover:text-[#f05a22] text-[#0f2439] font-semibold transition text-left cursor-pointer flex items-center gap-1"
                  >
                    <span>마이페이지 (결제 &amp; 크레딧)</span>
                  </button>
                </li>
              )}
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
                  보안 및 비밀유지(NDA) 보장
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
              <li>데이터 엔지니어링</li>
              <li>사내 AI 워크플로우</li>
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

        {/* Legal Disclaimer & Admin Console Access */}
        <div className="pt-5 border-t border-gray-300/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-gray-500">
          <div className="space-y-1 leading-relaxed">
            <p>
              <strong>주식회사 더마핑크</strong> | 대표자: 안진홍 | 상담문의: 070-8144-3848 | 입금계좌: 신한은행 140-015-969664 (예금주: 주식회사 더마핑크)
            </p>
            <p>
              사업장 소재지: 경기도 용인시 기흥구 동백중앙로16번길 16-4, 1914호(중동, 에이스 동백 타워)
            </p>
            <p className="pt-0.5 text-gray-400">© 2025 주식회사 더마핑크 (Dermapink Co., Ltd.) All rights reserved.</p>
          </div>

          {onOpenDashboard && (
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => onOpenDashboard('tasks')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 text-xs font-bold shadow-2xs transition cursor-pointer"
                title="관리자 인증 후 의뢰 업무 실시간 진행 현황 확인"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>업무 진행 현황 (관리자 🔒)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
