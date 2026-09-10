import React from 'react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#edeae3] text-gray-600 py-10 px-5 border-t border-[#eae6df] text-xs"
      data-purpose="site-footer"
    >
      <div className="max-w-md md:max-w-4xl mx-auto space-y-6">
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
            <span className="text-[#0f2439] font-bold block mb-2">고객지원</span>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => scrollToSection('faq-section')}
                  className="hover:text-[#f05a22] transition text-left cursor-pointer"
                >
                  자주 묻는 질문(FAQ)
                </button>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-[#f05a22] transition">
                  제휴 및 파트너십
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-[#f05a22] transition">
                  보안 &amp; 개인정보처리
                </a>
              </li>
              <li>
                <a href="tel:15880000" className="hover:text-[#f05a22] font-semibold text-gray-800">
                  상담문의 1588-0000
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

        {/* Legal Disclaimer */}
        <div className="pt-4 border-t border-gray-300/60 text-[11px] text-gray-500 space-y-1 leading-relaxed">
          <p>(주)에이아이비서 | 대표이사: 홍길동 | 사업자등록번호: 123-86-00000</p>
          <p>서울특별시 강남구 테헤란로 152 강남파이낸스센터 18층</p>
          <p className="pt-1 text-gray-400">© 2025 AI비서 Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
