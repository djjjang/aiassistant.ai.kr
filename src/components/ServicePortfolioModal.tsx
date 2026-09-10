import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ArrowRight,
  Clock,
  Building2,
  TrendingUp,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ChevronRight,
  Layers
} from 'lucide-react';
import { ServiceItem, ServicePortfolioCase } from '../types';

interface ServicePortfolioModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onApplyService: (serviceName: string) => void;
}

export const ServicePortfolioModal: React.FC<ServicePortfolioModalProps> = ({
  service,
  onClose,
  onApplyService
}) => {
  if (!service) return null;

  const cases: ServicePortfolioCase[] = service.portfolioCases && service.portfolioCases.length > 0
    ? service.portfolioCases
    : service.portfolioExample
      ? [{ ...service.portfolioExample, id: 'main', tags: ['대표 산출물'], deliverable: service.deliverableSample, image: service.previewImage || '', imageAlt: service.previewImageAlt || '' }]
      : [];

  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-[#eae6df] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#0f2439] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#f05a22] text-white flex items-center justify-center font-black text-xs shadow-xs">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#f05a22] tracking-wider uppercase">
                  {service.categoryCode} • {service.number}
                </span>
                <span className="text-[9px] px-2 py-0.2 rounded-full bg-white/15 text-gray-200 font-semibold">
                  실제 포트폴리오 갤러리
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {service.name} 납품 포트폴리오 & 작업 사례 ({cases.length}종)
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="포트폴리오 창 닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subheader / Tabs for 3~5 cases */}
        <div className="bg-[#fbf9f5] border-b border-[#eae6df] px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider mr-1 hidden sm:inline-block">
            사례 선택:
          </span>
          {cases.map((c, idx) => {
            const isSelected = c.id === activeCase?.id;
            return (
              <button
                key={c.id || idx}
                onClick={() => setSelectedCaseId(c.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f2439] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${isSelected ? 'bg-[#f05a22] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {idx + 1}
                </span>
                <span className="max-w-[140px] sm:max-w-[190px] truncate text-left">
                  {c.client.split(' ')[0]} • {c.title.split(' ')[0]} {c.title.split(' ')[1] || ''}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1 bg-white">
          {activeCase && (
            <div className="space-y-4">
              {/* Hero Showcase with Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#eae6df] shadow-xs bg-gray-950 aspect-16/9 sm:aspect-21/9 group">
                <img
                  src={activeCase.image || service.previewImage || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80'}
                  alt={activeCase.imageAlt || activeCase.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-black bg-[#f05a22] text-white px-2 py-0.5 rounded uppercase">
                      CASE #{cases.findIndex((c) => c.id === activeCase.id) + 1}
                    </span>
                    <span className="text-[11px] text-gray-300 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-orange-400" />
                      {activeCase.client}
                    </span>
                    <span className="text-[11px] text-gray-300 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-400" />
                      {activeCase.duration}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-xl font-black text-white leading-snug">
                    {activeCase.title}
                  </h4>
                </div>
              </div>

              {/* Highlight Metric Callout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">
                      검증된 성과 지표
                    </span>
                    <span className="text-xs sm:text-sm font-black text-emerald-950">
                      {activeCase.result}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fbf9f5] border border-[#eae6df] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0f2439] text-white flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5 text-[#f05a22]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-500 font-bold uppercase block">
                      최종 제공 산출물
                    </span>
                    <span className="text-xs font-bold text-gray-800 truncate block">
                      {activeCase.deliverable || service.deliverableSample}
                    </span>
                  </div>
                </div>
              </div>

              {/* Case Summary Detail */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs space-y-2">
                <h5 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                  프로젝트 수행 내용 및 산출 상세
                </h5>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {activeCase.summary}
                </p>
                {activeCase.tags && activeCase.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {activeCase.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3~5 Cases Quick Comparison Strip */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#0f2439]" />
                    {service.name} 다른 포트폴리오 사례 둘러보기 ({cases.length}종)
                  </span>
                  <span className="text-[10px] text-gray-400">카드를 누르면 즉시 변경됩니다</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {cases.map((c, idx) => (
                    <button
                      key={c.id || idx}
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        c.id === activeCase.id
                          ? 'border-[#f05a22] bg-[#fff6f2] shadow-xs'
                          : 'border-gray-200 bg-[#fbf9f5] hover:border-gray-400 hover:bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
                          <span className="font-bold text-[#0f2439]">{c.client}</span>
                          <span className="text-orange-600 font-semibold">{c.duration}</span>
                        </div>
                        <h6 className="font-bold text-gray-800 text-[11px] line-clamp-2 leading-snug">
                          {c.title}
                        </h6>
                      </div>
                      <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 shrink-0" />
                        <span className="truncate">{c.result}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Security & Confidentiality */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 flex items-center gap-2 text-[11px] text-blue-950">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  고객사 보안 및 NDA 준수를 위해 상호 및 내부 기밀 데이터는 마스킹 처리되었습니다. 동일한 품질 수준으로 귀사 전담 작업이 즉시 가능합니다.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#eae6df] bg-[#f7f5f0] flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="text-[11px] text-gray-500 hidden sm:flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span>검수율 99.8% 전문가 100% 휴먼 리뷰 보장</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition text-xs cursor-pointer"
            >
              닫기
            </button>
            <a
              href="http://pf.kakao.com/_xnSxeiT/chat"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black transition shadow-md flex items-center justify-center gap-2 text-xs border border-[#E6CF00] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-[#191919]" />
              <span>{service.name} 포트폴리오 견적 상담</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
