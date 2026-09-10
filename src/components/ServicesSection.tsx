import React, { useState } from 'react';
import {
  FileText,
  Edit3,
  Search,
  BarChart3,
  Megaphone,
  Headphones,
  Cpu,
  Code2,
  ArrowRight,
  Info,
  MessageCircle,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { SERVICES_DATA } from '../data';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenPortfolioCase?: (service: ServiceItem) => void;
  onOpenConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenPortfolioCase,
  onOpenConsultation
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'doc' | 'content' | 'data' | 'tech'>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText':
        return <FileText className="w-4 h-4" />;
      case 'Edit3':
        return <Edit3 className="w-4 h-4" />;
      case 'Search':
        return <Search className="w-4 h-4" />;
      case 'BarChart3':
        return <BarChart3 className="w-4 h-4" />;
      case 'Megaphone':
        return <Megaphone className="w-4 h-4" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Code2':
        return <Code2 className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'doc') return s.id === 'document';
    if (selectedFilter === 'content') return s.id === 'content' || s.id === 'marketing';
    if (selectedFilter === 'data') return s.id === 'research' || s.id === 'data';
    if (selectedFilter === 'tech') return s.id === 'cs' || s.id === 'custom' || s.id === 'web';
    return true;
  });

  return (
    <section
      id="services-section"
      className="py-12 px-5 bg-white border-y border-[#eae6df]"
      data-purpose="services-section"
    >
      <div className="max-w-md md:max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="mb-6">
          <span className="text-xs font-bold text-[#f05a22] tracking-wider uppercase mb-1 block">
            AI BUSINESS WORK POOL
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0f2439] leading-snug">
            기업의 모든 반복 업무,<br />
            8개 업무영역으로 완벽 대행합니다
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed max-w-xl">
            원하시는 업무를 클릭하시면 <strong>실제 납품 사례(포트폴리오)와 산출물 예시</strong>, 상세 작업 스펙을 바로 확인하실 수 있습니다.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-4">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#0f2439] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체 8개 업무
          </button>
          <button
            onClick={() => setSelectedFilter('doc')}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'doc'
                ? 'bg-[#0f2439] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            문서·기획
          </button>
          <button
            onClick={() => setSelectedFilter('content')}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'content'
                ? 'bg-[#0f2439] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            콘텐츠·마케팅
          </button>
          <button
            onClick={() => setSelectedFilter('data')}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'data'
                ? 'bg-[#0f2439] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            리서치·데이터
          </button>
          <button
            onClick={() => setSelectedFilter('tech')}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'tech'
                ? 'bg-[#0f2439] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            자동화·웹
          </button>
        </div>

        {/* Service Cards List / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5" id="service-list">
          {filteredServices.map((service, index) => {
            const isHighlight = service.id === 'document' && selectedFilter === 'all';

            if (isHighlight) {
              return (
                <div
                  key={service.id}
                  onClick={() => onSelectService(service)}
                  className="rounded-2xl bg-[#0f2439] text-white p-5 shadow-lg border border-[#0f2439] relative overflow-hidden cursor-pointer group hover:scale-[1.01] transition-transform md:col-span-2"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#f05a22] text-white flex items-center justify-center font-bold shadow-xs">
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">{service.number}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenPortfolioCase) onOpenPortfolioCase(service);
                          else onSelectService(service);
                        }}
                        className="text-[10px] bg-[#f05a22] hover:bg-[#d94e1c] text-white font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs transition cursor-pointer"
                      >
                        <Briefcase className="w-3 h-3" /> 포트폴리오 사례 보기
                      </button>
                    </div>
                  </div>

                  <span className="text-[10px] tracking-widest text-[#f05a22] font-bold uppercase block mb-1">
                    {service.categoryCode}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                    <span>{service.name}</span>
                    <span className="text-xs font-normal text-orange-200">
                      (소요시간: {service.turnaroundTime})
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded bg-white/10 text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-[10px] px-2.5 py-1 rounded bg-white/20 text-white font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#f05a22]" />
                      클릭시 예시 및 스펙 팝업
                    </span>
                    <a
                      href="http://pf.kakao.com/_xnSxeiT/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] px-2.5 py-1 rounded bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold transition flex items-center gap-1 shadow-xs border border-[#E6CF00]"
                    >
                      <MessageCircle className="w-3 h-3 fill-[#191919]" />
                      카카오톡 견적 문의
                    </a>
                  </div>
                </div>
              );
            }

            // Normal Cards
            let iconBgClass = 'bg-gray-100 text-gray-700';
            if (service.id === 'content') iconBgClass = 'bg-blue-50 text-blue-600';
            else if (service.id === 'research') iconBgClass = 'bg-emerald-50 text-emerald-600';
            else if (service.id === 'data') iconBgClass = 'bg-purple-50 text-purple-600';
            else if (service.id === 'marketing') iconBgClass = 'bg-amber-50 text-amber-600';
            else if (service.id === 'cs') iconBgClass = 'bg-cyan-50 text-cyan-600';
            else if (service.id === 'custom') iconBgClass = 'bg-rose-50 text-rose-600';
            else if (service.id === 'web') iconBgClass = 'bg-indigo-50 text-indigo-600';

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="rounded-2xl bg-[#fbf9f5] p-5 border border-[#eae6df] hover:border-[#0f2439]/30 transition-all cursor-pointer group hover:bg-white hover:shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`w-9 h-9 rounded-xl ${iconBgClass} flex items-center justify-center`}>
                      {getIcon(service.icon)}
                    </div>
                    <span className="text-xs font-mono text-gray-400">{service.number}</span>
                  </div>

                  <span className="text-[10px] tracking-wider text-gray-400 font-bold uppercase block">
                    {service.categoryCode}
                  </span>
                  <h3 className="text-base font-bold text-[#0f2439] mb-1 group-hover:text-[#f05a22] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-200/60 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenPortfolioCase) onOpenPortfolioCase(service);
                        else onSelectService(service);
                      }}
                      className="text-[11px] text-[#f05a22] hover:text-[#d94e1c] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Briefcase className="w-3 h-3" />
                      예시·포트폴리오 보기
                    </button>
                    <a
                      href="http://pf.kakao.com/_xnSxeiT/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] text-gray-500 hover:text-black font-semibold flex items-center gap-1 py-0.5"
                    >
                      <MessageCircle className="w-3 h-3 text-[#f05a22]" />
                      견적 문의
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA Button Under Service Grid */}
        <div className="mt-8 pt-4 text-center max-w-md mx-auto">
          <a
            id="services-kakao-cta"
            href="http://pf.kakao.com/_xnSxeiT/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-3.5 px-4 rounded-xl bg-[#f05a22] text-white font-bold text-sm shadow-md hover:bg-[#d94e1c] active:scale-[0.98] transition cursor-pointer gap-2 select-none"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>우리 기업에 필요한 업무 카카오톡 상담받기</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-[11px] text-gray-400 mt-2">
            1회성 업무 의뢰부터 정기 월간 구독까지 모두 지원합니다
          </p>
        </div>
      </div>
    </section>
  );
};
