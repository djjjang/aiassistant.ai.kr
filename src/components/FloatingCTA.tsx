import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="floating-menu-container"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5"
    >
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="맨 위로 가기"
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-xs text-[#0f2439] shadow-lg border border-[#eae6df] flex items-center justify-center hover:bg-white active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* KakaoTalk Consultation Floating Button */}
      <a
        id="floating-kakao-cta"
        href="http://pf.kakao.com/_xnSxeiT/chat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 1:1 상담 바로가기"
        className="group flex items-center gap-2 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] px-4 py-3 rounded-full shadow-2xl active:scale-95 transition-all duration-200 cursor-pointer border border-[#E6CF00]/70 select-none"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 fill-[#191919] text-[#191919]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#FEE500] animate-pulse" />
        </span>
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-semibold text-[#665a00] -mb-0.5">실시간 1:1</span>
          <span className="text-xs font-black tracking-tight text-[#191919]">카카오톡 상담</span>
        </div>
      </a>
    </div>
  );
};

