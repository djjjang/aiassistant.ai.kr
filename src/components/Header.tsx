import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, MessageSquare, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#f7f5f0]/95 backdrop-blur-md shadow-md border-b border-[#eae6df]'
            : 'bg-[#f7f5f0]/90 backdrop-blur-sm border-b border-[#eae6df]/80'
        }`}
      >
        <div className="px-5 py-3.5 flex items-center justify-between max-w-md md:max-w-4xl mx-auto">
          {/* Logo */}
          <a
            id="header-logo"
            href="#"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-[#0f2439] flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
              AI
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#0f2439] leading-none">
                AI비서
              </span>
              <span className="text-[9px] font-semibold text-[#f05a22] tracking-wider uppercase">
                Work Done by AI + Human
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-700">
            <button
              onClick={() => scrollToSection('services-section')}
              className="hover:text-[#f05a22] transition-colors"
            >
              업무영역
            </button>
            <button
              onClick={() => scrollToSection('expert-team')}
              className="hover:text-[#f05a22] transition-colors"
            >
              전문가 팀
            </button>
            <button
              onClick={() => scrollToSection('process-timeline')}
              className="hover:text-[#f05a22] transition-colors"
            >
              진행 방식
            </button>
            <button
              onClick={() => scrollToSection('portfolio-showcase')}
              className="hover:text-[#f05a22] transition-colors"
            >
              성공 사례
            </button>
            <button
              onClick={() => scrollToSection('pricing-plans')}
              className="hover:text-[#f05a22] transition-colors"
            >
              이용 요금
            </button>
            <button
              onClick={() => scrollToSection('faq-section')}
              className="hover:text-[#f05a22] transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <a
              id="header-cta-btn"
              href="http://pf.kakao.com/_xnSxeiT/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] shadow-xs active:scale-95 transition-all flex items-center gap-1.5 border border-[#E6CF00]"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-[#191919]" />
              <span>카톡 상담</span>
            </a>
            <button
              id="header-menu-toggle"
              aria-label="메뉴 열기"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#0f2439] rounded-lg hover:bg-black/5 active:scale-95 transition cursor-pointer"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile / Tablet Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer container */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-[#eae6df] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#0f2439] flex items-center justify-center text-white font-black text-xs">
                  AI
                </div>
                <span className="font-black text-[#0f2439]">AI비서 전체 메뉴</span>
              </div>
              <button
                id="close-mobile-menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100"
                aria-label="메뉴 닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="px-5 py-4 space-y-1 overflow-y-auto flex-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                서비스 바로가기
              </div>
              <button
                onClick={() => scrollToSection('services-section')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition flex items-center justify-between"
              >
                <span>업무영역 (8개 분야)</span>
                <span className="text-[10px] bg-orange-100 text-orange-700 font-bold px-1.5 py-0.5 rounded">NEW</span>
              </button>
              <button
                onClick={() => scrollToSection('expert-team')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition flex items-center justify-between"
              >
                <span>검증된 전문가 팀</span>
                <span className="text-[10px] text-gray-400">Human in the Loop</span>
              </button>
              <button
                onClick={() => scrollToSection('process-timeline')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition"
              >
                진행 프로세스 (48h 완료)
              </button>
              <button
                onClick={() => scrollToSection('portfolio-showcase')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition"
              >
                실제 납품 사례 & 성과
              </button>
              <button
                onClick={() => scrollToSection('customer-reviews')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition"
              >
                고객사 대표 후기 (평점 4.9)
              </button>
              <button
                onClick={() => scrollToSection('pricing-plans')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition"
              >
                요금 안내 (월 30만원~)
              </button>
              <button
                onClick={() => scrollToSection('faq-section')}
                className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-[#fff4ee] hover:text-[#f05a22] transition"
              >
                자주 묻는 질문 (보안/NDA)
              </button>

              <div className="pt-4 border-t border-gray-100 mt-4">
                <div className="p-3 bg-[#fbf9f5] rounded-xl border border-[#eae6df]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f2439] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                    <span>첫 달 도입 특가 프로모션</span>
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    상담 신청 시 무료 시범 업무 1건 및 100% 만족 보장제를 함께 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#eae6df] bg-[#f7f5f0] space-y-2">
              <a
                href="http://pf.kakao.com/_xnSxeiT/chat"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 border border-[#E6CF00]"
              >
                <MessageCircle className="w-4 h-4 fill-[#191919]" />
                <span>카카오톡 무료 상담 & 견적받기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-500 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  비밀유지 NDA 보장
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  1시간 내 회신
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
