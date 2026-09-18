import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react';
import { PORTFOLIO_CASES } from '../data';

export const PortfolioShowcase: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="portfolio-showcase"
      className="py-14 lg:py-20 bg-[#0a1928] text-white"
      data-purpose="portfolio-showcase"
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-bold text-[#f05a22] tracking-widest uppercase block mb-1">
              PORTFOLIO CASE STUDY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              결과로 증명합니다.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              실제 AI비서 팀이 진행한 기업별 실무 납품 및 자동화 성공 사례입니다.
            </p>
          </div>

          {/* Slider navigation arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="이전 사례"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
              aria-label="다음 사례"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Showcase Card Slider (Horizontal Scroll with snap) */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x scroll-smooth"
        >
          {PORTFOLIO_CASES.map((item) => (
            <div
              key={item.id}
              className="w-[300px] sm:w-[340px] lg:w-[390px] shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 snap-center flex flex-col justify-between hover:border-white/25 hover:bg-white/8 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-white font-medium">
                    {item.clientType}
                  </span>
                  <span className="text-[#f05a22] font-bold">{item.duration}</span>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4 font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-gray-400">{item.metricLabel}</span>
                <span className="font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-0.5 rounded">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {item.metricValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
