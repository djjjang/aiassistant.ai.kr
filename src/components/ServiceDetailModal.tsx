import React, { useState } from 'react';
import { X, Clock, CheckCircle, FileText, ArrowRight, ShieldCheck, MessageCircle, Briefcase, Sparkles, Building2, TrendingUp, Layers, ExternalLink, ZoomIn } from 'lucide-react';
import { ServiceItem } from '../types';
import { ImageZoomModal } from './ImageZoomModal';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onApplyService: (serviceName: string) => void;
  onOpenPortfolioGallery?: (service: ServiceItem) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onApplyService,
  onOpenPortfolioGallery
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'portfolio'>('specs');
  const [zoomImage, setZoomImage] = useState<{ url: string; alt: string; title: string; subtitle: string } | null>(null);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-[#eae6df] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-[#0f2439] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold text-[#f05a22] tracking-widest uppercase">
                {service.categoryCode} • {service.number}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-200 font-medium">
                업무 영역
              </span>
            </div>
            <h3 className="text-xl font-bold">{service.name} 안내</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#eae6df] bg-[#f7f5f0] p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'specs'
                ? 'bg-white text-[#0f2439] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>업무 상세 스펙</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-[#0f2439] text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-[#f05a22]" />
            <span>실제 납품 사례 & 포트폴리오</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#f05a22] text-white font-bold">
              예시
            </span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs flex-1">
          {activeTab === 'specs' ? (
            <>
              {/* Service Preview Image */}
              {service.previewImage && (
                <div
                  onClick={() => {
                    setZoomImage({
                      url: service.previewImage!,
                      alt: service.previewImageAlt || `${service.name} 작업 예시`,
                      title: `${service.name} 전문 산출물 예시`,
                      subtitle: `${service.categoryCode} • ${service.number} 표준 납품 규격`
                    });
                  }}
                  className="relative rounded-xl overflow-hidden border border-[#eae6df] shadow-xs aspect-16/9 bg-gray-100 group cursor-zoom-in"
                  title="클릭하여 고해상도 확대 검토하기"
                >
                  <img
                    src={service.previewImage}
                    alt={service.previewImageAlt || `${service.name} 작업 예시`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border border-white/20 shadow-xs">
                    <ZoomIn className="w-3 h-3 text-[#f05a22]" />
                    <span>확대 검토</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3 pointer-events-none">
                    <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                      {service.name} 전문 산출물 예시
                    </span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-1.5">업무 개요</h4>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>

              <div className="p-3 bg-[#fbf9f5] rounded-xl border border-[#eae6df] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">평균 소요 시간:</span>
                  <span className="font-bold text-[#f05a22] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {service.turnaroundTime}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-2 pt-1 border-t border-gray-200/70">
                  <span className="text-gray-500 font-medium shrink-0">제공 산출물:</span>
                  <span className="font-medium text-gray-800 text-right">
                    {service.deliverableSample}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">상세 수행 가능 업무 목록</h4>
                <ul className="space-y-2">
                  {service.detailedTasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#f05a22] shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200/60 flex items-center gap-2 text-[11px] text-orange-950">
                <ShieldCheck className="w-4 h-4 text-[#f05a22] shrink-0" />
                <span>AI 초안 작성 후 현업 5년차 이상 전담 매니저 100% 휴먼 리뷰 검수</span>
              </div>
            </>
          ) : (
            /* Portfolio Tab */
            <div className="space-y-4">
              {/* Multi-portfolio gallery entry banner */}
              {onOpenPortfolioGallery && service.portfolioCases && service.portfolioCases.length > 0 && (
                <button
                  type="button"
                  onClick={() => onOpenPortfolioGallery(service)}
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-[#0f2439] to-[#1e3a5f] text-white flex items-center justify-between hover:shadow-md transition cursor-pointer group border border-white/10"
                >
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#f05a22] flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>전체 포트폴리오 사례 모아보기</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/20 text-[#f05a22] font-black">
                          {service.portfolioCases.length}건 탑재
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300">
                        클릭 시 3~5가지 실제 납품 사례 갤러리 창이 열립니다
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-white transition transform group-hover:translate-x-0.5 shrink-0" />
                </button>
              )}

              {/* Case Study Image Banner */}
              {service.previewImage && (
                <div
                  onClick={() => {
                    setZoomImage({
                      url: service.previewImage!,
                      alt: service.portfolioExample?.title || `${service.name} 포트폴리오`,
                      title: service.portfolioExample?.title || `${service.name} 대표 포트폴리오`,
                      subtitle: `${service.portfolioExample?.client || '검증 고객사'} • ${service.portfolioExample?.result || '성과 지표'}`
                    });
                  }}
                  className="relative rounded-xl overflow-hidden border border-[#eae6df] shadow-xs aspect-16/9 bg-gray-100 group cursor-zoom-in"
                  title="클릭하여 고해상도 확대 검토하기"
                >
                  <img
                    src={service.previewImage}
                    alt={service.portfolioExample?.title || `${service.name} 포트폴리오`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border border-white/20 shadow-xs">
                    <ZoomIn className="w-3 h-3 text-[#f05a22]" />
                    <span>확대 검토</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2439]/85 via-[#0f2439]/30 to-transparent flex flex-col justify-end p-3.5 text-white pointer-events-none">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#f05a22] mb-0.5">
                      VERIFIED PORTFOLIO CASE
                    </span>
                    <h5 className="font-black text-sm line-clamp-1 leading-snug">
                      {service.portfolioExample?.title}
                    </h5>
                  </div>
                </div>
              )}

              {service.portfolioExample && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-[#fbf9f5] rounded-xl border border-[#eae6df] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#0f2439]" />
                        고객사 유형
                      </span>
                      <span className="font-bold text-[#0f2439]">
                        {service.portfolioExample.client}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-gray-200/70">
                      <span className="text-gray-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#f05a22]" />
                        작업 소요 시간
                      </span>
                      <span className="font-semibold text-gray-700">
                        {service.portfolioExample.duration}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 text-xs pt-1.5 border-t border-gray-200/70">
                      <span className="text-gray-500 font-medium flex items-center gap-1 shrink-0">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        주요 성과
                      </span>
                      <span className="font-bold text-emerald-700 text-right">
                        {service.portfolioExample.result}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs">
                    <h5 className="font-bold text-gray-900 text-xs mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                      수행 내용 및 산출 요약
                    </h5>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {service.portfolioExample.summary}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-[11px] text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-blue-950">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      엄격한 비밀유지계약(NDA) 준수
                    </div>
                    <p className="text-blue-800/90 leading-normal">
                      고객사의 내부 기밀 및 영업 자산 보호를 위해 기업명과 민감 수치는 마스킹 처리되었습니다. 동일한 프로세스로 귀사 맞춤 제작이 가능합니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#eae6df] bg-[#f7f5f0] flex flex-col gap-2">
          <a
            href="http://pf.kakao.com/_xnSxeiT/chat"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black transition shadow-md flex items-center justify-center gap-2 text-xs border border-[#E6CF00] cursor-pointer select-none"
          >
            <MessageCircle className="w-4 h-4 fill-[#191919]" />
            <span>{service.name} 카카오톡 견적 및 포트폴리오 문의</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => {
                onApplyService(service.name);
                onClose();
              }}
              className="text-[11px] text-gray-500 hover:text-gray-800 underline py-1 cursor-pointer"
            >
              온라인 신청서 작성하기
            </button>
            <button
              onClick={onClose}
              className="py-1.5 px-3 rounded-lg border border-gray-300 text-gray-600 font-bold hover:bg-gray-100 transition text-xs cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Modal */}
      {zoomImage && (
        <ImageZoomModal
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
          imageUrl={zoomImage.url}
          imageAlt={zoomImage.alt}
          title={zoomImage.title}
          subtitle={zoomImage.subtitle}
        />
      )}
    </div>
  );
};
