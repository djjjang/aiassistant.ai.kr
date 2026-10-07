import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle, FileText, ArrowRight, ShieldCheck, MessageCircle, Briefcase, Sparkles, Building2, TrendingUp, Layers, ExternalLink, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { ImageZoomModal } from './ImageZoomModal';
import { VideoStyleSimulator } from './VideoStyleSimulator';

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
  const isVideoService = service?.id === 'video';
  const [activeTab, setActiveTab] = useState<'specs' | 'portfolio' | 'simulator'>(isVideoService ? 'simulator' : 'specs');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [slideIdx, setSlideIdx] = useState<number>(0);

  useEffect(() => {
    if (service?.id === 'video') {
      setActiveTab('simulator');
    } else {
      setActiveTab('specs');
    }
    setSelectedCaseIdx(0);
    setSlideIdx(0);
  }, [service]);

  const [zoomImage, setZoomImage] = useState<{
    url: string;
    alt: string;
    title: string;
    subtitle: string;
    gallery?: { url: string; title: string; pageLabel: string }[];
    initialIndex?: number;
    initialMode?: 'image' | 'text';
    originalText?: string;
    originalDocumentMeta?: {
      recipient?: string;
      sender?: string;
      subject?: string;
      docDate?: string;
      docTypeBadge?: string;
      attachments?: string[];
    };
  } | null>(null);

  if (!service) return null;

  const cases = service.portfolioCases && service.portfolioCases.length > 0 ? service.portfolioCases : [];
  const currentCase = cases[selectedCaseIdx] || service.portfolioCases?.[0] || service.portfolioExample;
  const galleryImages = currentCase?.galleryImages;
  const hasGallery = !!(galleryImages && galleryImages.length > 1);
  const currentSlide = hasGallery ? galleryImages[slideIdx] : null;
  const activeImageUrl = currentSlide ? currentSlide.url : (currentCase?.image || service.previewImage || '');
  const activeImageTitle = currentSlide ? currentSlide.title : (currentCase?.title || service.previewImageAlt || `${service.name} 작업 예시`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`bg-white rounded-2xl w-full ${isVideoService && activeTab === 'simulator' ? 'max-w-4xl' : 'max-w-lg'} overflow-hidden shadow-2xl border border-[#eae6df] flex flex-col max-h-[92vh] transition-all duration-300`}>
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
        <div className="flex border-b border-[#eae6df] bg-[#f7f5f0] p-1.5 gap-1.5 flex-wrap">
          {isVideoService && (
            <button
              type="button"
              onClick={() => setActiveTab('simulator')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>영상 스타일 시뮬레이터</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/20 text-white font-black">
                대화형
              </span>
            </button>
          )}
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
          {activeTab === 'simulator' && isVideoService ? (
            <VideoStyleSimulator
              onApplyStyle={(customSummary) => {
                onApplyService(`${service.name} (${customSummary})`);
                onClose();
              }}
              onViewCase={(caseId) => {
                if (onOpenPortfolioGallery) {
                  onClose();
                  onOpenPortfolioGallery(service);
                }
              }}
            />
          ) : activeTab === 'specs' ? (
            <>
              {/* Service Preview Image / Slide Viewer */}
              {activeImageUrl && (
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setZoomImage({
                        url: activeImageUrl,
                        alt: activeImageTitle,
                        title: activeImageTitle,
                        subtitle: `${service.categoryCode} • ${currentSlide ? currentSlide.pageLabel : `${service.number} 표준 납품 규격`}`,
                        gallery: galleryImages,
                        initialIndex: slideIdx,
                        initialMode: 'image',
                        originalText: currentCase?.originalText,
                        originalDocumentMeta: currentCase?.originalDocumentMeta
                      });
                    }}
                    className={`relative rounded-xl overflow-hidden border border-[#eae6df] shadow-xs bg-slate-900 group cursor-zoom-in flex items-center justify-center ${service.id === 'contract' ? 'h-[360px] sm:h-[430px]' : 'aspect-16/9'}`}
                    title="클릭하여 고해상도 확대 검토하기"
                  >
                    <img
                      src={activeImageUrl}
                      alt={activeImageTitle}
                      className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                    />

                    {/* Prev / Next Chevrons if multi-slide */}
                    {hasGallery && (
                      <>
                        <button
                          type="button"
                          disabled={slideIdx === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlideIdx((prev) => Math.max(0, prev - 1));
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center transition disabled:opacity-20 cursor-pointer"
                          title="이전 슬라이드"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={slideIdx === galleryImages.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlideIdx((prev) => Math.min(galleryImages.length - 1, prev + 1));
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center transition disabled:opacity-20 cursor-pointer"
                          title="다음 슬라이드"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <div className="absolute top-2.5 right-2.5 bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border border-white/20 shadow-xs">
                      <ZoomIn className="w-3 h-3 text-[#f05a22]" />
                      <span>확대 검토</span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 pointer-events-none">
                      {hasGallery ? (
                        <span className="bg-[#f05a22] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                          {slideIdx + 1} / {galleryImages.length} ({currentSlide?.pageLabel})
                        </span>
                      ) : (
                        <span className="bg-black/60 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                          대표 산출물
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Multi-slide quick jump bar */}
                  {hasGallery && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200 text-xs">
                      <span className="text-[11px] font-bold text-gray-800 truncate">
                        {currentSlide?.title}
                      </span>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          type="button"
                          disabled={slideIdx === 0}
                          onClick={() => setSlideIdx((prev) => Math.max(0, prev - 1))}
                          className="px-2 py-0.5 rounded bg-white border border-gray-300 text-gray-700 hover:text-[#f05a22] text-[10px] font-bold disabled:opacity-30 cursor-pointer"
                        >
                          이전
                        </button>
                        <span className="text-[10px] font-mono font-bold text-[#0f2439] px-1">
                          {slideIdx + 1}/{galleryImages.length}
                        </span>
                        <button
                          type="button"
                          disabled={slideIdx === galleryImages.length - 1}
                          onClick={() => setSlideIdx((prev) => Math.min(galleryImages.length - 1, prev + 1))}
                          className="px-2 py-0.5 rounded bg-[#0f2439] text-white hover:bg-[#1a3854] text-[10px] font-bold disabled:opacity-30 cursor-pointer"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
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

              {/* Case Tabs if multiple cases exist */}
              {cases.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {cases.map((c, idx) => {
                    const isSelected = selectedCaseIdx === idx;
                    return (
                      <button
                        key={c.id || idx}
                        type="button"
                        onClick={() => {
                          setSelectedCaseIdx(idx);
                          setSlideIdx(0);
                        }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg font-bold transition shrink-0 flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0f2439] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center ${isSelected ? 'bg-[#f05a22] text-white' : 'bg-white text-gray-600'}`}>
                          {idx + 1}
                        </span>
                        <span className="truncate max-w-[170px]">
                          {c.tabLabel || c.title.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Case Study Image Banner */}
              {activeImageUrl && (
                <div className="space-y-2">
                  <div
                    onClick={() => {
                      setZoomImage({
                        url: activeImageUrl,
                        alt: activeImageTitle,
                        title: currentCase?.title || service.portfolioExample?.title || activeImageTitle,
                        subtitle: `${currentCase?.client || service.portfolioExample?.client || '검증 고객사'} • ${currentSlide ? currentSlide.pageLabel : (currentCase?.result || service.portfolioExample?.result || '성과 지표')}`,
                        gallery: galleryImages,
                        initialIndex: slideIdx,
                        initialMode: 'image',
                        originalText: currentCase?.originalText,
                        originalDocumentMeta: currentCase?.originalDocumentMeta
                      });
                    }}
                    className={`relative rounded-xl overflow-hidden border border-[#eae6df] shadow-xs bg-slate-900 group cursor-zoom-in flex items-center justify-center ${service.id === 'contract' ? 'h-[360px] sm:h-[430px]' : 'aspect-16/9'}`}
                    title="클릭하여 고해상도 확대 검토하기"
                  >
                    <img
                      src={activeImageUrl}
                      alt={activeImageTitle}
                      className="w-full h-full object-contain group-hover:scale-102 transition duration-300"
                    />

                    {/* Prev / Next Chevrons if multi-slide */}
                    {hasGallery && (
                      <>
                        <button
                          type="button"
                          disabled={slideIdx === 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlideIdx((prev) => Math.max(0, prev - 1));
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center transition disabled:opacity-20 cursor-pointer"
                          title="이전 슬라이드"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={slideIdx === galleryImages.length - 1}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlideIdx((prev) => Math.min(galleryImages.length - 1, prev + 1));
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center transition disabled:opacity-20 cursor-pointer"
                          title="다음 슬라이드"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <div className="absolute top-2.5 right-2.5 bg-black/70 hover:bg-black/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1 border border-white/20 shadow-xs">
                      <ZoomIn className="w-3 h-3 text-[#f05a22]" />
                      <span>확대 검토</span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 pointer-events-none">
                      {hasGallery ? (
                        <span className="bg-[#f05a22] text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                          {slideIdx + 1} / {galleryImages.length} ({currentSlide?.pageLabel})
                        </span>
                      ) : (
                        <span className="bg-[#0f2439] text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                          대표 포트폴리오
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Multi-slide quick jump bar */}
                  {hasGallery && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-orange-50 border border-orange-200 text-xs">
                      <span className="text-[11px] font-bold text-gray-800 truncate">
                        {currentSlide?.title}
                      </span>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <button
                          type="button"
                          disabled={slideIdx === 0}
                          onClick={() => setSlideIdx((prev) => Math.max(0, prev - 1))}
                          className="px-2 py-0.5 rounded bg-white border border-gray-300 text-gray-700 hover:text-[#f05a22] text-[10px] font-bold disabled:opacity-30 cursor-pointer"
                        >
                          이전
                        </button>
                        <span className="text-[10px] font-mono font-bold text-[#0f2439] px-1">
                          {slideIdx + 1}/{galleryImages.length}
                        </span>
                        <button
                          type="button"
                          disabled={slideIdx === galleryImages.length - 1}
                          onClick={() => setSlideIdx((prev) => Math.min(galleryImages.length - 1, prev + 1))}
                          className="px-2 py-0.5 rounded bg-[#0f2439] text-white hover:bg-[#1a3854] text-[10px] font-bold disabled:opacity-30 cursor-pointer"
                        >
                          다음
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(currentCase || service.portfolioExample) && (
                <div className="space-y-3">
                  <div className="p-3.5 bg-[#fbf9f5] rounded-xl border border-[#eae6df] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#0f2439]" />
                        고객사 유형
                      </span>
                      <span className="font-bold text-[#0f2439]">
                        {currentCase?.client || service.portfolioExample?.client}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-gray-200/70">
                      <span className="text-gray-500 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#f05a22]" />
                        작업 소요 시간
                      </span>
                      <span className="font-semibold text-gray-700">
                        {currentCase?.duration || service.portfolioExample?.duration}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 text-xs pt-1.5 border-t border-gray-200/70">
                      <span className="text-gray-500 font-medium flex items-center gap-1 shrink-0">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        주요 성과
                      </span>
                      <span className="font-bold text-emerald-700 text-right">
                        {currentCase?.result || service.portfolioExample?.result}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs">
                    <h5 className="font-bold text-gray-900 text-xs mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                      수행 내용 및 산출 요약
                    </h5>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {currentCase?.summary || service.portfolioExample?.summary}
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
