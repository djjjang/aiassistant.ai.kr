import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Layers,
  ZoomIn,
  FileText,
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
  Play,
  Sliders,
  Copy,
  Check,
  HelpCircle,
  Volume2,
  Video
} from 'lucide-react';
import { ServiceItem, ServicePortfolioCase } from '../types';
import { ImageZoomModal } from './ImageZoomModal';
import { VideoStyleSimulator } from './VideoStyleSimulator';
import { parseVideoUrl } from '../utils/video';

interface ServicePortfolioModalProps {
  service: ServiceItem | null;
  initialCaseId?: string;
  onClose: () => void;
  onApplyService: (serviceName: string) => void;
}

export const ServicePortfolioModal: React.FC<ServicePortfolioModalProps> = ({
  service,
  initialCaseId,
  onClose,
  onApplyService
}) => {
  if (!service) return null;

  const cases: ServicePortfolioCase[] = service.portfolioCases && service.portfolioCases.length > 0
    ? service.portfolioCases
    : service.portfolioExample
      ? [{ ...service.portfolioExample, id: 'main', tags: ['대표 산출물'], deliverable: service.deliverableSample, image: service.previewImage || '', imageAlt: service.previewImageAlt || '' }]
      : [];

  const isVideoService = service.id === 'video';
  const [videoModalTab, setVideoModalTab] = useState<'portfolio' | 'simulator'>(
    isVideoService && initialCaseId === 'simulator' ? 'simulator' : 'portfolio'
  );

  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    initialCaseId && initialCaseId !== 'simulator' && cases.some((c) => c.id === initialCaseId)
      ? initialCaseId
      : (cases[0]?.id || '')
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'gallery' | 'live' | 'video'>('gallery');
  const [liveDevice, setLiveDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Video playback and testing state
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>('');
  const [activeVideoRatio, setActiveVideoRatio] = useState<'9:16' | '16:9'>('9:16');
  const [customInputUrl, setCustomInputUrl] = useState<string>('');
  const [isVideoTesterOpen, setIsVideoTesterOpen] = useState<boolean>(false);
  const [isCopiedSnippet, setIsCopiedSnippet] = useState<boolean>(false);
  const [videoPlayTrigger, setVideoPlayTrigger] = useState<number>(0);

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

  // Sync case when initialCaseId or service changes
  useEffect(() => {
    if (initialCaseId === 'simulator' && service.id === 'video') {
      setVideoModalTab('simulator');
    } else {
      setVideoModalTab('portfolio');
    }
    if (initialCaseId && initialCaseId !== 'simulator' && cases.some((c) => c.id === initialCaseId)) {
      setSelectedCaseId(initialCaseId);
    } else if (cases[0]?.id) {
      setSelectedCaseId(cases[0].id);
    }
    setActiveSlideIndex(0);
  }, [service, initialCaseId]);

  const activeCase = cases.find((c) => c.id === selectedCaseId) || cases[0];

  const hasGallery = !!(activeCase?.galleryImages && activeCase.galleryImages.length > 0);
  const currentSlide = hasGallery ? activeCase.galleryImages![activeSlideIndex] || activeCase.galleryImages![0] : null;
  const currentImageUrl = currentSlide ? currentSlide.url : (activeCase?.image || service.previewImage);
  const currentImageTitle = currentSlide ? currentSlide.title : (activeCase?.title || '');
  const currentImageAlt = currentSlide ? currentSlide.title : (activeCase?.imageAlt || activeCase?.title || '');
  const isVerticalLong = service.id === 'contract' || !!activeCase?.tags?.includes('상세페이지');

  // Reset slide index and viewMode when case changes
  useEffect(() => {
    setActiveSlideIndex(0);
    if (activeCase?.videoUrl) {
      setViewMode('video');
      setActiveVideoUrl(activeCase.videoUrl);
      setActiveVideoRatio(activeCase.videoRatio || '9:16');
      setCustomInputUrl(activeCase.videoUrl);
    } else {
      setViewMode('gallery');
    }
  }, [selectedCaseId, activeCase]);

  const parsedVideo = useMemo(() => {
    return parseVideoUrl(activeVideoUrl || activeCase?.videoUrl);
  }, [activeVideoUrl, activeCase?.videoUrl]);

  // Keyboard navigation for slide flip (ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If zoom modal is open, let ImageZoomModal handle its own keys
      if (zoomImage) return;
      if (e.key === 'ArrowLeft' && hasGallery && activeSlideIndex > 0) {
        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight' && hasGallery && activeSlideIndex < (activeCase?.galleryImages?.length || 1) - 1) {
        setActiveSlideIndex((prev) => Math.min((activeCase?.galleryImages?.length || 1) - 1, prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasGallery, activeSlideIndex, activeCase, zoomImage]);

  const liveUrlHost = (() => {
    if (!activeCase?.liveUrl) return '';
    try {
      const u = new URL(activeCase.liveUrl);
      if (u.hostname.includes('smartstore.naver.com')) {
        return 'smartstore.naver.com/bt24store';
      }
      return u.hostname;
    } catch {
      return activeCase.liveUrl;
    }
  })();

  const isNaverSmartstore = activeCase?.liveUrl?.includes('smartstore.naver.com') ?? false;
  const isAIAssistantSite = activeCase?.liveUrl?.includes('aiassistant.ai.kr') ?? false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white rounded-2xl w-full ${isVideoService && videoModalTab === 'simulator' ? 'max-w-4xl' : 'max-w-3xl'} overflow-hidden shadow-2xl border border-[#eae6df] flex flex-col max-h-[92vh] transition-all duration-200`}>
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
                  {isVideoService && videoModalTab === 'simulator' ? '대화형 영상 스타일 시뮬레이터' : '실제 포트폴리오 갤러리'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                {service.name} {isVideoService && videoModalTab === 'simulator' ? '맞춤 영상 스타일 시뮬레이터' : `납품 포트폴리오 & 작업 사례 (${cases.length}종)`}
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

        {/* Subheader / Tabs for 3~5 cases & Simulator */}
        <div className="bg-[#fbf9f5] border-b border-[#eae6df] px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2">
          {isVideoService && (
            <button
              type="button"
              onClick={() => setVideoModalTab('simulator')}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                videoModalTab === 'simulator'
                  ? 'bg-rose-600 text-white ring-2 ring-rose-400/50'
                  : 'bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-300" />
              <span>✨ 영상 스타일 시뮬레이터</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                videoModalTab === 'simulator' ? 'bg-white/20 text-white' : 'bg-rose-200 text-rose-900'
              }`}>
                대화형
              </span>
            </button>
          )}

          <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider mr-1 hidden sm:inline-block">
            {isVideoService ? '납품 사례:' : '사례 선택:'}
          </span>
          {cases.map((c, idx) => {
            const isSelected = videoModalTab === 'portfolio' && c.id === activeCase?.id;
            return (
              <button
                key={c.id || idx}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  setVideoModalTab('portfolio');
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f2439] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${isSelected ? 'bg-[#f05a22] text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {idx + 1}
                </span>
                <span className="max-w-[150px] sm:max-w-[220px] truncate text-left">
                  {c.tabLabel || `${c.client.split(' ')[0]} • ${c.title.split(' ')[0]} ${c.title.split(' ')[1] || ''}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1 bg-white">
          {isVideoService && videoModalTab === 'simulator' ? (
            <VideoStyleSimulator
              onApplyStyle={(customSummary) => {
                onApplyService(customSummary);
                onClose();
              }}
              onViewCase={(caseId) => {
                setSelectedCaseId(caseId);
                setVideoModalTab('portfolio');
              }}
            />
          ) : activeCase && (
            <div className="space-y-4">
              {/* Slide Header Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-[#f05a22] text-white px-2 py-0.5 rounded uppercase">
                    CASE #{cases.findIndex((c) => c.id === activeCase.id) + 1}
                  </span>
                  <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#f05a22]" />
                    {activeCase.client}
                  </span>
                  {currentSlide && (
                    <span className="text-[11px] font-bold text-[#f05a22] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                      {currentSlide.pageLabel}
                    </span>
                  )}
                  {activeCase.liveUrl && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      실제 사이트 운영 중
                    </span>
                  )}
                  {activeCase.videoUrl && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                      실제 영상 시청 가능 ({activeVideoRatio})
                    </span>
                  )}
                </div>
                {hasGallery && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <span>{service.id === 'contract' ? '페이지' : '슬라이드'}</span>
                    <span className="font-mono font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                      {activeSlideIndex + 1} / {activeCase.galleryImages!.length}
                    </span>
                    <span className="text-[10px] text-gray-400 hidden sm:inline">(키보드 ← / → 지원)</span>
                  </div>
                )}
              </div>

              {/* If liveUrl exists: View Mode Selector */}
              {activeCase.liveUrl && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200/80 rounded-xl shadow-2xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-emerald-950 flex items-center gap-1 mr-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      보기 모드:
                    </span>
                    <button
                      type="button"
                      onClick={() => setViewMode('gallery')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'gallery'
                          ? 'bg-[#0f2439] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-emerald-100/60 border border-gray-200'
                      }`}
                    >
                      <span>🖼️ 고화질 디자인 갤러리 ({activeCase.galleryImages?.length || 1}종)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode('live')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'live'
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400/50'
                          : 'bg-white text-emerald-800 hover:bg-emerald-100/60 border border-emerald-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>🌐 실시간 사이트 라이브 뷰어 (인터랙티브)</span>
                    </button>
                  </div>

                  <a
                    href={activeCase.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer ml-auto group"
                    title="새 창에서 실제 공식 웹사이트 / 스토어 열기"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>실제 사이트 방문 ({liveUrlHost} ↗)</span>
                  </a>
                </div>
              )}

              {/* If videoUrl exists: Video View Mode & Interactive Tester Bar */}
              {activeCase.videoUrl && (
                <div className="flex flex-col gap-2 p-2.5 bg-gradient-to-r from-rose-50 via-pink-50 to-orange-50 border border-rose-200/80 rounded-xl shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold text-rose-950 flex items-center gap-1 mr-1">
                        <Video className="w-3.5 h-3.5 text-rose-600" />
                        영상 모드:
                      </span>
                      <button
                        type="button"
                        onClick={() => setViewMode('video')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          viewMode === 'video'
                            ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/50'
                            : 'bg-white text-rose-900 hover:bg-rose-100/60 border border-rose-200'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>실제 영상 재생 (인터랙티브)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewMode('gallery')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          viewMode === 'gallery'
                            ? 'bg-[#0f2439] text-white shadow-xs'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <span>🖼️ 기획 콘티 & 편집 타임라인 ({activeCase.galleryImages?.length || 1}종)</span>
                      </button>

                      {/* Ratio toggle if in video mode */}
                      {viewMode === 'video' && (
                        <div className="flex items-center bg-white rounded-lg p-0.5 border border-rose-200 ml-1">
                          <button
                            type="button"
                            onClick={() => setActiveVideoRatio('9:16')}
                            className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                              activeVideoRatio === '9:16'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-gray-600 hover:text-rose-600'
                            }`}
                            title="모바일 9:16 세로 숏폼 프레임"
                          >
                            <Smartphone className="w-3 h-3" />
                            <span>9:16 숏폼</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveVideoRatio('16:9')}
                            className={`px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                              activeVideoRatio === '16:9'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'text-gray-600 hover:text-rose-600'
                            }`}
                            title="데스크톱 16:9 가로 와이드 프레임"
                          >
                            <Monitor className="w-3 h-3" />
                            <span>16:9 와이드</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-auto flex-wrap">
                      <button
                        type="button"
                        onClick={() => setVideoModalTab('simulator')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white shadow-xs"
                        title="대화형 영상 스타일 시뮬레이터로 이동하여 맞춤 스타일 조합해보기"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                        <span>✨ 스타일 시뮬레이터</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsVideoTesterOpen(!isVideoTesterOpen)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isVideoTesterOpen
                            ? 'bg-[#0f2439] text-white shadow-xs'
                            : 'bg-white text-rose-700 hover:bg-rose-100/60 border border-rose-300'
                        }`}
                        title="내 유튜브/MP4 링크로 실시간 테스트하기"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>{isVideoTesterOpen ? '테스터 접기' : '💡 영상 링크 직접 넣기'}</span>
                      </button>

                      {activeVideoUrl && (
                        <a
                          href={activeVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold transition flex items-center gap-1 border border-gray-300 shrink-0 cursor-pointer"
                          title="새 창에서 원본 열기"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span className="hidden sm:inline">새 탭</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Collapsible Video Tester & Guide Drawer */}
                  {isVideoTesterOpen && (
                    <div className="mt-1 pt-2.5 border-t border-rose-200/80 space-y-2.5 animate-in fade-in duration-150">
                      <div className="bg-white p-3 rounded-lg border border-rose-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0f2439] flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-rose-600" />
                            실제 영상 URL 실시간 테스트기 (내 영상 바로 재생해보기)
                          </span>
                          <span className="text-[10px] text-gray-500">
                            유튜브 쇼츠 / 일반 유튜브 / MP4 직링크 지원
                          </span>
                        </div>

                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={customInputUrl}
                            onChange={(e) => setCustomInputUrl(e.target.value)}
                            placeholder="예: https://www.youtube.com/shorts/... 또는 .mp4 직링크 입력"
                            className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 text-xs focus:outline-rose-500 font-mono text-gray-800"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (customInputUrl.trim()) {
                                setActiveVideoUrl(customInputUrl.trim());
                                const parsed = parseVideoUrl(customInputUrl.trim());
                                if (parsed?.isShorts) {
                                  setActiveVideoRatio('9:16');
                                }
                                setVideoPlayTrigger((prev) => prev + 1);
                              }
                            }}
                            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-bold shrink-0 transition cursor-pointer"
                          >
                            미리보기 적용
                          </button>
                        </div>

                        {/* Quick Presets */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px]">
                          <span className="text-gray-500 font-medium">샘플 영상:</span>
                          <button
                            type="button"
                            onClick={() => {
                              const u = 'https://youtube.com/shorts/mroWPCfADa8?si=hF0IAtEgLDl-tSgc';
                              setCustomInputUrl(u);
                              setActiveVideoUrl(u);
                              setActiveVideoRatio('9:16');
                              setVideoPlayTrigger((prev) => prev + 1);
                            }}
                            className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-medium cursor-pointer"
                          >
                            📱 뷰티 BJ 시상식 쇼츠 (실제 연동)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const u = 'https://www.youtube.com/watch?v=oTahLEX3NXo';
                              setCustomInputUrl(u);
                              setActiveVideoUrl(u);
                              setActiveVideoRatio('16:9');
                              setVideoPlayTrigger((prev) => prev + 1);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 font-medium cursor-pointer"
                          >
                            💻 AI비서 60초 튜토리얼 (유형 3)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const u = 'https://www.youtube.com/watch?v=aqz-KE-bpKQ';
                              setCustomInputUrl(u);
                              setActiveVideoUrl(u);
                              setActiveVideoRatio('16:9');
                              setVideoPlayTrigger((prev) => prev + 1);
                            }}
                            className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 font-medium cursor-pointer"
                          >
                            🎬 16:9 시네마틱 샘플
                          </button>
                        </div>
                      </div>

                      {/* 3 Methods Guide */}
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg text-[11px] space-y-2">
                        <div className="font-bold text-white flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                            실제 영상 넣는 3가지 방법 가이드
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const code = `// src/data.ts 의 videoUrl 에 링크 입력
videoUrl: '${activeVideoUrl || 'https://www.youtube.com/shorts/5qap5aO4i9A'}',
videoRatio: '${activeVideoRatio}',
videoPlatform: 'youtube',`;
                              navigator.clipboard.writeText(code);
                              setIsCopiedSnippet(true);
                              setTimeout(() => setIsCopiedSnippet(false), 2000);
                            }}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-rose-300 flex items-center gap-1 cursor-pointer transition"
                          >
                            {isCopiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{isCopiedSnippet ? '복사됨!' : '설정 코드 복사'}</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10.5px] text-slate-300">
                          <div className="bg-black/40 p-2 rounded border border-white/10 space-y-1">
                            <div className="font-bold text-rose-300">1. 유튜브(쇼츠) 임베드 (가장 추천)</div>
                            <p className="text-slate-400 leading-tight">
                              유튜브에 영상을 <strong>'일부공개'</strong>로 올리고 URL만 복사하여 넣으면, 무제한 대역폭과 고화질 자동 스트리밍이 지원됩니다.
                            </p>
                          </div>
                          <div className="bg-black/40 p-2 rounded border border-white/10 space-y-1">
                            <div className="font-bold text-emerald-300">2. MP4 직링크 직접 호스팅</div>
                            <p className="text-slate-400 leading-tight">
                              AWS S3, Cloudflare R2, Supabase 등에 <code>.mp4</code>를 올리고 직링크를 넣으면 외부 워터마크 없이 무음 자동 재생됩니다.
                            </p>
                          </div>
                          <div className="bg-black/40 p-2 rounded border border-white/10 space-y-1">
                            <div className="font-bold text-sky-300">3. 코드 영구 반영 위치</div>
                            <p className="text-slate-400 leading-tight">
                              프로젝트의 <code>src/data.ts</code> 파일에서 해당 서비스의 <code>videoUrl</code> 값만 변경하시면 영구 적용됩니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Main Showcase: Either Live Web Simulator OR High-Res Design Gallery */}
              {viewMode === 'live' && activeCase.liveUrl ? (
                <div className="rounded-2xl overflow-hidden border border-emerald-400 shadow-xl bg-[#0a1827] flex flex-col">
                  {/* Browser Chrome Header */}
                  <div className="bg-[#0f2439] px-3.5 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                      </div>
                      
                      {/* Device Switcher */}
                      <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
                        <button
                          type="button"
                          onClick={() => setLiveDevice('desktop')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            liveDevice === 'desktop' ? 'bg-[#f05a22] text-white shadow-xs' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <Monitor className="w-3.5 h-3.5" />
                          <span>데스크톱 뷰 (PC)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setLiveDevice('mobile')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            liveDevice === 'mobile' ? 'bg-[#f05a22] text-white shadow-xs' : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>모바일 뷰 (375px)</span>
                        </button>
                      </div>
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 max-w-sm mx-auto hidden sm:flex items-center bg-[#07131f] border border-white/15 px-3 py-1 rounded-full text-xs text-gray-300">
                      <span className="text-emerald-400 font-bold mr-1.5">🔒</span>
                      <span className="font-mono text-white text-[11px] truncate">{activeCase.liveUrl}</span>
                      <span className="ml-auto text-[9px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-700/50">
                        LIVE
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIframeKey((k) => k + 1)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition cursor-pointer"
                        title="페이지 새로고침"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <a
                        href={activeCase.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>새 탭에서 열기</span>
                      </a>
                    </div>
                  </div>

                  {/* Live Notice Bar */}
                  <div className="bg-emerald-950/90 border-b border-emerald-800/40 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-200">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                      <span className="font-semibold truncate">
                        실제 배포 운영 중인 웹사이트({liveUrlHost})를 프레임 내에서 직접 스크롤·확인해보세요.
                      </span>
                    </div>
                    <span className="hidden md:inline text-[10px] text-emerald-300 font-bold shrink-0 ml-2">
                      실시간 라이브 시뮬레이터
                    </span>
                  </div>

                  {/* Viewport Frame */}
                  <div className="bg-[#121c29] p-2 sm:p-4 flex items-center justify-center min-h-[480px] sm:min-h-[540px] overflow-auto">
                    {isNaverSmartstore ? (
                      liveDevice === 'desktop' ? (
                        <div className="w-full h-[520px] rounded-xl overflow-hidden shadow-2xl bg-[#09111a] border border-emerald-500/40 flex flex-col relative">
                          <div className="bg-emerald-950/80 border-b border-emerald-700/40 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-200">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              <span className="font-bold text-white">네이버 스마트스토어 라이브 시뮬레이터</span>
                              <span className="text-[11px] text-emerald-300 hidden md:inline">
                                (네이버 보안 정책 X-Frame-Options 적용 스토어)
                              </span>
                            </div>
                            <a
                              href={activeCase.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-md bg-[#03c75a] hover:bg-[#00a344] text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>실제 스마트스토어 새 창으로 열기 ↗</span>
                            </a>
                          </div>
                          <div className="flex-1 relative overflow-auto flex items-center justify-center bg-[#070e17] p-2">
                            <img
                              src={activeCase.image}
                              alt={activeCase.imageAlt}
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-xl">
                              <span className="text-xs text-white font-medium">
                                실시간 운영 중인 BT24 스마트스토어:
                              </span>
                              <a
                                href={activeCase.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-full bg-[#03c75a] hover:bg-[#00a344] text-white text-xs font-black flex items-center gap-1 shadow-xs"
                              >
                                <span>스마트스토어 바로가기 ↗</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-[375px] h-[550px] rounded-[38px] overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-700 p-2 flex flex-col relative shrink-0">
                          <div className="w-28 h-4 bg-black rounded-b-xl mx-auto mb-1 z-10 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                          </div>
                          <div className="flex-1 rounded-[24px] overflow-hidden bg-[#09111a] flex flex-col relative">
                            <div className="bg-emerald-950/80 px-2.5 py-1 text-[10px] text-emerald-300 font-bold flex items-center justify-between border-b border-emerald-700/40">
                              <span>모바일 스마트스토어 뷰</span>
                              <a
                                href={activeCase.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#03c75a] underline flex items-center gap-0.5"
                              >
                                <span>새 창 열기 ↗</span>
                              </a>
                            </div>
                            <div className="flex-1 relative overflow-auto p-1 flex items-center justify-center bg-[#070e17]">
                              <img
                                src={activeCase.galleryImages?.[1]?.url || activeCase.image}
                                alt={`${activeCase.client} 모바일 뷰`}
                                className="w-full h-full object-contain rounded-xl"
                              />
                            </div>
                          </div>
                          <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-1.5"></div>
                        </div>
                      )
                    ) : isAIAssistantSite ? (
                      liveDevice === 'desktop' ? (
                        <div className="w-full h-[520px] rounded-xl overflow-hidden shadow-2xl bg-[#09121a] border border-[#f05a22]/50 flex flex-col relative">
                          <div className="bg-orange-950/80 border-b border-orange-700/40 px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-orange-200">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#f05a22] animate-pulse"></span>
                              <span className="font-bold text-white">AI비서 원페이지 라이브 시뮬레이터</span>
                              <span className="text-[11px] text-orange-300 hidden md:inline">
                                (공식 도메인: aiassistant.ai.kr)
                              </span>
                            </div>
                            <a
                              href={activeCase.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-md bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-black flex items-center gap-1.5 shadow-xs transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>실제 도메인 새 창으로 열기 ↗</span>
                            </a>
                          </div>
                          <div className="flex-1 relative overflow-auto flex items-center justify-center bg-[#070e17] p-2">
                            <img
                              src={activeCase.image}
                              alt={activeCase.imageAlt}
                              className="w-full h-full object-contain rounded-lg"
                            />
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/85 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-xl">
                              <span className="text-xs text-white font-medium">
                                실시간 운영 중인 AI비서 공식 원페이지:
                              </span>
                              <a
                                href={activeCase.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 rounded-full bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-black flex items-center gap-1 shadow-xs"
                              >
                                <span>aiassistant.ai.kr 바로가기 ↗</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-[375px] h-[550px] rounded-[38px] overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-700 p-2 flex flex-col relative shrink-0">
                          <div className="w-28 h-4 bg-black rounded-b-xl mx-auto mb-1 z-10 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                          </div>
                          <div className="flex-1 rounded-[24px] overflow-hidden bg-[#09121a] flex flex-col relative">
                            <div className="bg-orange-950/80 px-2.5 py-1 text-[10px] text-orange-300 font-bold flex items-center justify-between border-b border-orange-700/40">
                              <span>모바일 원페이지 뷰</span>
                              <a
                                href={activeCase.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#f05a22] underline flex items-center gap-0.5"
                              >
                                <span>새 창 열기 ↗</span>
                              </a>
                            </div>
                            <div className="flex-1 relative overflow-auto p-1 flex items-center justify-center bg-[#070e17]">
                              <img
                                src={activeCase.galleryImages?.[1]?.url || activeCase.image}
                                alt={`${activeCase.client} 모바일 뷰`}
                                className="w-full h-full object-contain rounded-xl"
                              />
                            </div>
                          </div>
                          <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-1.5"></div>
                        </div>
                      )
                    ) : (
                      liveDevice === 'desktop' ? (
                        <div className="w-full h-[520px] rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-200">
                          <iframe
                            key={`desktop-${iframeKey}`}
                            src={activeCase.liveUrl}
                            title={`${activeCase.client} 데스크톱 라이브 프리뷰`}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                      ) : (
                        <div className="w-[375px] h-[550px] rounded-[38px] overflow-hidden shadow-2xl bg-slate-900 border-4 border-slate-700 p-2 flex flex-col relative shrink-0">
                          {/* Mobile Notch */}
                          <div className="w-28 h-4 bg-black rounded-b-xl mx-auto mb-1 z-10 flex items-center justify-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                          </div>
                          <div className="flex-1 rounded-[24px] overflow-hidden bg-white">
                            <iframe
                              key={`mobile-${iframeKey}`}
                              src={activeCase.liveUrl}
                              title={`${activeCase.client} 모바일 라이브 프리뷰`}
                              className="w-full h-full border-0"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            />
                          </div>
                          {/* Mobile Home Bar */}
                          <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-1.5"></div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : viewMode === 'video' && activeCase.videoUrl ? (
                <div className="rounded-2xl overflow-hidden border border-rose-500/50 shadow-2xl bg-[#090d14] flex flex-col items-center justify-center p-3 sm:p-5 relative min-h-[460px]">
                  {/* Subtle Background Ambient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-black pointer-events-none"></div>

                  {activeVideoRatio === '9:16' ? (
                    /* 9:16 Smartphone Mockup Frame */
                    <div className="w-[300px] sm:w-[325px] h-[540px] sm:h-[570px] rounded-[42px] bg-slate-950 border-[5px] border-slate-700 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] p-2.5 flex flex-col relative z-10 shrink-0">
                      {/* Dynamic Island / Notch */}
                      <div className="w-24 h-4 bg-black rounded-full mx-auto mb-1.5 z-20 flex items-center justify-center border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-slate-900 mr-1.5"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-950"></span>
                      </div>

                      {/* Screen Container */}
                      <div className="flex-1 rounded-[28px] overflow-hidden bg-black relative flex flex-col border border-white/10">
                        {parsedVideo?.type === 'youtube' && parsedVideo.embedUrl ? (
                          <iframe
                            key={`yt-shorts-${activeVideoUrl}-${videoPlayTrigger}`}
                            src={parsedVideo.embedUrl}
                            title={activeCase.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : parsedVideo?.type === 'mp4' && parsedVideo.directUrl ? (
                          <video
                            key={`mp4-${activeVideoUrl}-${videoPlayTrigger}`}
                            src={parsedVideo.directUrl}
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover bg-black"
                          />
                        ) : parsedVideo?.type === 'vimeo' && parsedVideo.embedUrl ? (
                          <iframe
                            src={parsedVideo.embedUrl}
                            title={activeCase.title}
                            className="w-full h-full border-0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-gray-300 space-y-3 bg-slate-900">
                            <Video className="w-10 h-10 text-rose-500 animate-pulse" />
                            <div className="text-xs font-bold text-white">동영상 링크를 불러오는 중입니다</div>
                            <p className="text-[11px] text-gray-400 max-w-[200px] break-all">{activeVideoUrl}</p>
                            <a
                              href={activeVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                            >
                              <span>외부 플레이어로 열기 ↗</span>
                            </a>
                          </div>
                        )}

                        {/* Floating Sound Hint Overlay on Bottom */}
                        <div className="absolute bottom-2.5 left-2 right-2 z-10 pointer-events-none flex items-center justify-between px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-white/90">
                          <span className="flex items-center gap-1 truncate">
                            <Volume2 className="w-3 h-3 text-rose-400 shrink-0" />
                            <span>소리 켜기: 영상 볼륨 버튼</span>
                          </span>
                          <span className="text-[9px] text-rose-300 font-mono font-bold shrink-0">9:16 FHD</span>
                        </div>
                      </div>

                      {/* Home Indicator Bar */}
                      <div className="w-24 h-1 bg-white/40 rounded-full mx-auto mt-2"></div>
                    </div>
                  ) : (
                    /* 16:9 Cinematic Theater Player */
                    <div className="w-full max-w-2xl aspect-16/9 rounded-xl overflow-hidden bg-black border border-white/20 shadow-2xl relative z-10 flex flex-col">
                      {parsedVideo?.type === 'youtube' && parsedVideo.embedUrl ? (
                        <iframe
                          key={`yt-wide-${activeVideoUrl}-${videoPlayTrigger}`}
                          src={parsedVideo.embedUrl}
                          title={activeCase.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : parsedVideo?.type === 'mp4' && parsedVideo.directUrl ? (
                        <video
                          key={`mp4-wide-${activeVideoUrl}-${videoPlayTrigger}`}
                          src={parsedVideo.directUrl}
                          controls
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : parsedVideo?.type === 'vimeo' && parsedVideo.embedUrl ? (
                        <iframe
                          src={parsedVideo.embedUrl}
                          title={activeCase.title}
                          className="w-full h-full border-0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-gray-300 space-y-3 bg-slate-900">
                          <Video className="w-10 h-10 text-rose-500 animate-pulse" />
                          <div className="text-xs font-bold text-white">영상 플레이어</div>
                          <p className="text-[11px] text-gray-400">{activeVideoUrl}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Under-player Info Badge */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                    <span className="font-bold text-white">{activeCase.title}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-rose-400 font-bold">{activeVideoRatio === '9:16' ? '세로 숏폼 30초 규격' : '가로 와이드 16:9 마스터 규격'}</span>
                  </div>
                </div>
              ) : (
                /* Hero Showcase with Slide Navigation (한 장씩 넘겨보기) */
                <div className={`relative rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-[#18181b] group flex items-center justify-center ${isVerticalLong ? 'h-[460px] sm:h-[530px]' : 'aspect-16/9'}`}>
                <div
                  onClick={() => {
                    if (currentImageUrl) {
                      setZoomImage({
                        url: currentImageUrl,
                        alt: currentImageAlt || activeCase.title,
                        title: currentImageTitle,
                        subtitle: `${activeCase.client} • ${currentSlide ? currentSlide.pageLabel : (activeCase.deliverable || '실제 납품 산출물')}`,
                        gallery: activeCase.galleryImages,
                        initialIndex: activeSlideIndex,
                        initialMode: 'image',
                        originalText: activeCase.originalText,
                        originalDocumentMeta: activeCase.originalDocumentMeta
                      });
                    }
                  }}
                  className="w-full h-full cursor-zoom-in flex items-center justify-center p-1 sm:p-2"
                  title="클릭하여 고해상도 확대 검토하기"
                >
                  <img
                    src={currentImageUrl || 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80'}
                    alt={currentImageAlt || activeCase.title}
                    className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>

                {/* Left / Right Chevron Arrows for Slide Flip */}
                {hasGallery && activeCase.galleryImages!.length > 1 && (
                  <>
                    <button
                      type="button"
                      disabled={activeSlideIndex === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/80 hover:bg-[#f05a22] text-white flex items-center justify-center border border-white/20 shadow-xl transition disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer group-hover:scale-105"
                      title="이전 슬라이드 (← 키)"
                      aria-label="이전 슬라이드"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                      type="button"
                      disabled={activeSlideIndex === activeCase.galleryImages!.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlideIndex((prev) => Math.min(activeCase.galleryImages!.length - 1, prev + 1));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/80 hover:bg-[#f05a22] text-white flex items-center justify-center border border-white/20 shadow-xl transition disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer group-hover:scale-105"
                      title="다음 슬라이드 (→ 키)"
                      aria-label="다음 슬라이드"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Floating Top Indicators */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
                  {hasGallery && (
                    <span className="bg-black/85 backdrop-blur-xs text-white px-3 py-1 rounded-full text-[11px] font-bold border border-white/20 shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f05a22] animate-pulse"></span>
                      <span>{service.id === 'contract' ? '페이지' : '슬라이드'} {activeSlideIndex + 1} / {activeCase.galleryImages!.length}</span>
                    </span>
                  )}
                </div>

                {/* Floating Action Buttons */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                  {activeCase.originalText && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage({
                          url: currentImageUrl || '',
                          alt: currentImageAlt || activeCase.title,
                          title: currentImageTitle,
                          subtitle: `${activeCase.client} • ${activeCase.deliverable || '실제 납품 산출물'}`,
                          gallery: activeCase.galleryImages,
                          initialIndex: activeSlideIndex,
                          initialMode: 'text',
                          originalText: activeCase.originalText,
                          originalDocumentMeta: activeCase.originalDocumentMeta
                        });
                      }}
                      className="bg-[#f05a22] hover:bg-[#d94e1c] text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transition hover:scale-105"
                      title="원문 텍스트 전문 바로 읽기"
                    >
                      <FileText className="w-3.5 h-3.5 text-white" />
                      <span>원문 전문</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomImage({
                        url: currentImageUrl || '',
                        alt: currentImageAlt || activeCase.title,
                        title: currentImageTitle,
                        subtitle: `${activeCase.client} • ${currentSlide ? currentSlide.pageLabel : (activeCase.deliverable || '실제 납품 산출물')}`,
                        gallery: activeCase.galleryImages,
                        initialIndex: activeSlideIndex,
                        initialMode: 'image',
                        originalText: activeCase.originalText,
                        originalDocumentMeta: activeCase.originalDocumentMeta
                      });
                    }}
                    className="bg-black/75 hover:bg-black/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 border border-white/20 shadow-md group-hover:scale-105 transition cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#f05a22]" />
                    <span>확대</span>
                  </button>
                </div>

                {/* Bottom title pill badge - does NOT obscure slide content */}
                <div className="absolute bottom-2.5 left-3 z-10 pointer-events-none">
                  <div className="bg-black/70 backdrop-blur-xs text-white/95 px-2.5 py-1 rounded-md text-[10px] font-semibold border border-white/10 shadow-xs max-w-[280px] sm:max-w-md truncate">
                    {currentSlide?.title || activeCase.title}
                  </div>
                </div>
              </div>
            )}

            {/* Slide Quick Navigation Bar (한 장씩 넘겨보기 컨트롤러) */}
            {viewMode === 'gallery' && hasGallery && activeCase.galleryImages!.length > 1 && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 shadow-2xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#f05a22] text-white shadow-2xs shrink-0">
                        {currentSlide?.pageLabel}
                      </span>
                      <span className="text-xs font-bold text-gray-900 truncate">
                        {currentSlide?.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        disabled={activeSlideIndex === 0}
                        onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-gray-300 text-gray-700 hover:text-[#f05a22] text-xs font-bold transition flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer hover:border-[#f05a22]"
                        title="이전 슬라이드 (←)"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>이전 장</span>
                      </button>

                      <div className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-mono font-black text-[#0f2439]">
                        {activeSlideIndex + 1} / {activeCase.galleryImages!.length}
                      </div>

                      <button
                        type="button"
                        disabled={activeSlideIndex === activeCase.galleryImages!.length - 1}
                        onClick={() => setActiveSlideIndex((prev) => Math.min(activeCase.galleryImages!.length - 1, prev + 1))}
                        className="px-2.5 py-1.5 rounded-lg bg-[#0f2439] hover:bg-[#1a3854] text-white text-xs font-bold transition flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs cursor-pointer"
                        title="다음 슬라이드 (→)"
                      >
                        <span>다음 장</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 1p ~ 8p Direct Jump Pill Buttons */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 border-t border-orange-200/60">
                    <span className="text-[10px] text-gray-500 font-bold shrink-0 mr-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#f05a22]" />
                      한 장씩 바로보기:
                    </span>
                    {activeCase.galleryImages!.map((page, pIdx) => {
                      const isActive = pIdx === activeSlideIndex;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setActiveSlideIndex(pIdx)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition shrink-0 cursor-pointer flex items-center gap-1 ${
                            isActive
                              ? 'bg-[#f05a22] text-white shadow-2xs scale-105 ring-1 ring-orange-400'
                              : 'bg-white/80 text-gray-700 hover:bg-white hover:text-[#f05a22] border border-orange-200/80 hover:shadow-2xs'
                          }`}
                          title={`${page.title} (클릭 시 표시)`}
                        >
                          <span>{page.pageLabel.split(' ')[0] || `${pIdx + 1}p`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 산출물 검토 및 원문 열람 듀얼 액션 바 */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                  <div className="text-[11px] text-slate-600 truncate">
                    <strong className="text-slate-800 font-bold">산출물 검토:</strong> 이미지 그래픽 디자인과 실제 작성 원문 텍스트를 함께 제공합니다.
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {activeCase.liveUrl && (
                    <a
                      href={activeCase.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer group"
                      title="실제 도메인으로 웹사이트 / 스토어 새 탭 열기"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>실제 사이트 방문 ({liveUrlHost} ↗)</span>
                    </a>
                  )}

                  {activeCase.videoUrl && (
                    <a
                      href={activeVideoUrl || activeCase.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer group"
                      title="새 창에서 원본 영상 열기"
                    >
                      <Play className="w-3.5 h-3.5 text-white fill-white" />
                      <span>원본 영상 새 창 열기 ↗</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setZoomImage({
                        url: currentImageUrl || '',
                        alt: currentImageAlt || activeCase.title,
                        title: currentImageTitle,
                        subtitle: `${activeCase.client} • ${currentSlide ? currentSlide.pageLabel : (activeCase.deliverable || '실제 납품 산출물')}`,
                        gallery: activeCase.galleryImages,
                        initialIndex: activeSlideIndex,
                        initialMode: 'image',
                        originalText: activeCase.originalText,
                        originalDocumentMeta: activeCase.originalDocumentMeta
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-[#f05a22] text-slate-700 hover:text-[#f05a22] text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#f05a22]" />
                    <span>현재 슬라이드 확대 보기</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setZoomImage({
                        url: currentImageUrl || '',
                        alt: currentImageAlt || activeCase.title,
                        title: currentImageTitle,
                        subtitle: `${activeCase.client} • ${activeCase.deliverable || '실제 납품 산출물'}`,
                        gallery: activeCase.galleryImages,
                        initialIndex: activeSlideIndex,
                        initialMode: 'text',
                        originalText: activeCase.originalText,
                        originalDocumentMeta: activeCase.originalDocumentMeta
                      });
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-white" />
                    <span>원문 텍스트 전문 보기</span>
                  </button>
                </div>
              </div>

              {/* Multi-Page Detail Gallery Grid (한 장씩 클릭하여 교체 및 확대) */}
              {hasGallery && (
                <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f05a22]"></span>
                      <h5 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                        <span>
                          {activeCase.title.includes('카드뉴스') ? '실제 배포용 카드뉴스 슬라이드' : '전체 슬라이드 목록'} ({activeCase.galleryImages!.length}개 슬라이드 수록)
                        </span>
                      </h5>
                    </div>
                    <span className="text-[11px] text-slate-500 hidden sm:inline font-medium">
                      슬라이드를 클릭하면 상단 뷰어가 해당 페이지로 즉시 전환됩니다
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {activeCase.galleryImages!.map((page, pIdx) => {
                      const isActive = pIdx === activeSlideIndex;
                      return (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => {
                            setActiveSlideIndex(pIdx);
                          }}
                          className={`group relative rounded-xl overflow-hidden border transition-all text-left p-1.5 cursor-pointer flex flex-col ${
                            isActive
                              ? 'border-[#f05a22] ring-2 ring-[#f05a22]/50 bg-[#fff8f5] shadow-sm'
                              : 'border-slate-200 bg-white hover:border-[#f05a22]/70 hover:shadow-xs'
                          }`}
                          title={`${page.pageLabel}: 클릭하여 상단 뷰어에 표시`}
                        >
                          <div className="aspect-16/10 rounded-lg overflow-hidden bg-slate-900 mb-1.5 border border-slate-100 relative">
                            <img
                              src={page.url}
                              alt={page.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
                            />
                            <div className={`absolute inset-0 transition flex items-center justify-center ${
                              isActive ? 'bg-black/10' : 'bg-black/0 group-hover:bg-black/25'
                            }`}>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition ${
                                isActive
                                  ? 'bg-[#f05a22] text-white shadow-xs'
                                  : 'opacity-0 group-hover:opacity-100 bg-black/80 text-white'
                              }`}>
                                {isActive ? '현재 보는 중' : '선택하기'}
                              </span>
                            </div>
                          </div>
                          <div className="px-1 pb-0.5">
                            <span className={`text-[10px] font-black block ${
                              isActive ? 'text-[#f05a22]' : 'text-gray-500'
                            }`}>
                              {page.pageLabel}
                            </span>
                            <span className="text-[11px] font-bold text-slate-800 line-clamp-1 block mt-0.5">
                              {page.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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

              {/* Service Detailed Tasks (실무 지원 범위) */}
              {service.detailedTasks && service.detailedTasks.length > 0 && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                  <h5 className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#0f2439]" />
                    <span>{service.name} 주요 실무 대행 범위</span>
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {service.detailedTasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-[11px] text-gray-700 bg-white p-2.5 rounded-lg border border-gray-200/60 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#f05a22] shrink-0 mt-0.5" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

      {/* High-Resolution Image Zoom Modal for In-Depth Review */}
      {zoomImage && (
        <ImageZoomModal
          isOpen={!!zoomImage}
          onClose={() => setZoomImage(null)}
          imageUrl={zoomImage.url}
          imageAlt={zoomImage.alt}
          title={zoomImage.title}
          subtitle={zoomImage.subtitle}
          gallery={zoomImage.gallery}
          initialIndex={zoomImage.initialIndex}
          initialMode={zoomImage.initialMode || 'image'}
          originalText={zoomImage.originalText}
          originalDocumentMeta={zoomImage.originalDocumentMeta}
        />
      )}
    </div>
  );
};
