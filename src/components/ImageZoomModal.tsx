import React, { useState, useEffect } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Sparkles,
  AlertCircle,
  RefreshCw,
  FileText,
  Copy,
  Check,
  FileDown,
  Paperclip,
  Mail,
  User,
  Clock,
  ExternalLink,
  Eye,
  Type
} from 'lucide-react';

export interface ZoomGalleryItem {
  url: string;
  title: string;
  pageLabel: string;
}

export interface OriginalDocumentMeta {
  recipient?: string;
  sender?: string;
  subject?: string;
  docDate?: string;
  docTypeBadge?: string;
  attachments?: string[];
}

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  gallery?: ZoomGalleryItem[];
  initialIndex?: number;
  initialMode?: 'image' | 'text';
  originalText?: string;
  originalDocumentMeta?: OriginalDocumentMeta;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  title,
  subtitle,
  gallery,
  initialIndex = 0,
  initialMode = 'image',
  originalText,
  originalDocumentMeta
}) => {
  const [activeMode, setActiveMode] = useState<'image' | 'text'>(initialMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'base' | 'lg'>('base');

  // Sync index and mode if initialIndex, initialMode or isOpen changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setActiveMode(initialMode);
    setZoomLevel(1);
    setIsLoading(true);
    setHasError(false);
    setCopied(false);
  }, [initialIndex, initialMode, isOpen]);

  const currentItem = gallery && gallery.length > 0 && currentIndex >= 0 && currentIndex < gallery.length
    ? gallery[currentIndex]
    : null;
  const activeUrl = currentItem ? currentItem.url : imageUrl;
  const activeTitle = currentItem ? currentItem.title : (title || '산출물 고해상도 원본 보기');
  const activeSubtitle = currentItem
    ? `${currentItem.pageLabel} (전체 ${gallery?.length}개 페이지 중 ${currentIndex + 1}번째) • ${subtitle || ''}`
    : subtitle;

  // Fallback text if originalText not provided
  const textContent = originalText || (
    `[산출물 개요] ${activeTitle}\n\n` +
    `■ 상세 정보: ${activeSubtitle || '트렌드24 실무 대행 납품 산출물'}\n\n` +
    `본 산출물은 고객사의 실제 업무 의뢰를 기반으로 전담 매니저가 기획 및 제작하여 납품한 정식 산출물입니다.\n` +
    `상세 문안 및 가이드라인은 고해상도 이미지 또는 실무 양식을 통해 열람하실 수 있습니다.`
  );

  // Reset loading state when activeUrl changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [activeUrl]);

  // Keyboard navigation (Escape, Arrow keys)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (activeMode === 'image' && e.key === 'ArrowLeft' && gallery && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setZoomLevel(1);
      } else if (activeMode === 'image' && e.key === 'ArrowRight' && gallery && currentIndex < gallery.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gallery, currentIndex, onClose, activeMode]);

  if (!isOpen) return null;

  const handleCopyText = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadTxt = (e: React.MouseEvent) => {
    e.stopPropagation();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTitle.replace(/[/\\?%*:|"<>]/g, '_')}_원문.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.8));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  };

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(1);
  };

  const handlePrevPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gallery && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setZoomLevel(1);
    }
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gallery && currentIndex < gallery.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setZoomLevel(1);
    }
  };

  const fontSizeClass =
    fontSizeLevel === 'sm'
      ? 'text-[13px] leading-relaxed'
      : fontSizeLevel === 'lg'
        ? 'text-[16px] sm:text-[17px] leading-loose'
        : 'text-[14.5px] sm:text-[15.5px] leading-relaxed';

  return (
    <div
      className="fixed inset-0 z-60 flex flex-col bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div
        className="p-3 sm:p-4 bg-gray-950/95 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-white shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Area */}
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-lg bg-[#f05a22] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                {activeTitle}
              </h4>
              {originalText && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Check className="w-3 h-3" /> 원문 수록
                </span>
              )}
            </div>
            {activeSubtitle && (
              <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                {activeSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Center / Right Mode Switcher Tabs */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle (Image vs Full Text) */}
          <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10 shadow-xs">
            <button
              onClick={() => setActiveMode('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeMode === 'image'
                  ? 'bg-[#f05a22] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="산출물 이미지 및 그래픽 원본 보기"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>디자인 뷰</span>
            </button>
            <button
              onClick={() => setActiveMode('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer relative ${
                activeMode === 'text'
                  ? 'bg-[#f05a22] text-white shadow-xs'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="산출물 원문 텍스트 전문 및 상세 내용 검토"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>원문 전문 검토</span>
              {originalText && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
          </div>

          {/* Context Controls: Image Controls vs Text Controls */}
          {activeMode === 'image' ? (
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.7}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition disabled:opacity-30 cursor-pointer"
                  title="축소 (Zoom Out)"
                  aria-label="축소"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-1 hover:bg-white/20 rounded-lg text-xs font-mono text-gray-200 transition cursor-pointer"
                  title="배율 초기화 (100%)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.8}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition disabled:opacity-30 cursor-pointer"
                  title="확대 (Zoom In)"
                  aria-label="확대"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition cursor-pointer ml-0.5"
                  title="100% 원본 비율로 맞추기"
                  aria-label="초기화"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <a
                href={activeUrl}
                download="deliverable_file.png"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 hover:text-white transition cursor-pointer border border-white/10"
                title="새 탭에서 원본 이미지 열기"
                aria-label="새 탭에서 열기"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Copy Full Text Button */}
              <button
                onClick={handleCopyText}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  copied
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border-white/10'
                }`}
                title="원문 텍스트 전체 클립보드 복사"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사 완료!' : '원문 복사'}</span>
              </button>

              {/* Download TXT */}
              <button
                onClick={handleDownloadTxt}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 hover:text-white transition cursor-pointer border border-white/10"
                title="원문 TXT 파일로 다운로드"
                aria-label="다운로드"
              >
                <FileDown className="w-4 h-4" />
              </button>

              {/* Font Size Toggle */}
              <button
                onClick={() => {
                  setFontSizeLevel((prev) => (prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'sm'));
                }}
                className="px-2 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[11px] font-mono text-gray-200 transition cursor-pointer border border-white/10 flex items-center gap-1"
                title="본문 글자 크기 변경"
              >
                <Type className="w-3.5 h-3.5" />
                <span className="uppercase">{fontSizeLevel}</span>
              </button>
            </div>
          )}

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-red-600/80 rounded-xl text-gray-200 hover:text-white transition cursor-pointer border border-white/10 ml-1"
            title="닫기 (ESC)"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Optional Multi-page Tabs (Only in Image Mode if multi-page) */}
      {activeMode === 'image' && gallery && gallery.length > 1 && (
        <div
          className="px-4 py-2 bg-gray-900/95 border-b border-white/10 flex items-center justify-center gap-2 overflow-x-auto shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[11px] text-gray-400 mr-1 hidden sm:inline font-medium">페이지 바로가기:</span>
          {gallery.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setZoomLevel(1);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                currentIndex === idx
                  ? 'bg-[#f05a22] text-white shadow-xs scale-102'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <span>{item.pageLabel}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area: Image Mode vs Text Mode */}
      {activeMode === 'image' ? (
        /* Image Mode Viewport */
        <div
          className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-zoom-out relative min-h-[300px]"
          onClick={onClose}
        >
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none z-10">
              <div className="w-8 h-8 border-3 border-[#f05a22] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-gray-300 font-medium">고해상도 산출물 불러오는 중...</span>
            </div>
          )}

          {/* Prev Page Button */}
          {gallery && gallery.length > 1 && currentIndex > 0 && (
            <button
              onClick={handlePrevPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center border border-white/20 shadow-2xl transition cursor-pointer"
              title="이전 페이지 (←)"
            >
              ←
            </button>
          )}

          {/* Next Page Button */}
          {gallery && gallery.length > 1 && currentIndex < gallery.length - 1 && (
            <button
              onClick={handleNextPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/75 hover:bg-[#f05a22] text-white flex items-center justify-center border border-white/20 shadow-2xl transition cursor-pointer"
              title="다음 페이지 (→)"
            >
              →
            </button>
          )}

          {/* Error Fallback */}
          {hasError ? (
            <div
              className="p-6 bg-gray-900/90 rounded-2xl border border-white/20 text-center max-w-md space-y-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertCircle className="w-10 h-10 text-[#f05a22] mx-auto" />
              <h5 className="text-sm font-bold text-white">이미지를 불러오는 중 문제가 발생했습니다</h5>
              <p className="text-xs text-gray-400">
                네트워크 환경 또는 브라우저 보안 설정으로 인해 원본 이미지 로드가 지연되었을 수 있습니다.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setHasError(false);
                  }}
                  className="px-4 py-2 bg-[#f05a22] hover:bg-[#d94e1c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> 다시 시도
                </button>
                <button
                  onClick={() => setActiveMode('text')}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> 원문 텍스트 보기
                </button>
              </div>
            </div>
          ) : (
            <div
              className="relative flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeUrl}
                alt={imageAlt || activeTitle}
                referrerPolicy="no-referrer"
                onLoad={() => {
                  setIsLoading(false);
                  setHasError(false);
                }}
                onError={() => {
                  setIsLoading(false);
                  setHasError(true);
                }}
                className={`rounded-xl shadow-2xl object-contain border border-white/20 max-w-[92vw] max-h-[75vh] w-auto h-auto transition-opacity duration-300 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
              />
            </div>
          )}

          {/* Quick Floating Switch to Text View */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMode('text')}
              className="px-4 py-2 rounded-full bg-black/80 hover:bg-[#f05a22] text-white text-xs font-bold border border-white/20 shadow-2xl backdrop-blur-md transition flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <FileText className="w-4 h-4 text-orange-400 group-hover:text-white" />
              <span>원문 텍스트 전문(작성 내용) 읽기</span>
            </button>
          </div>
        </div>
      ) : (
        /* Text Mode (원문 전문 뷰) */
        <div
          className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center cursor-default select-text"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 flex flex-col my-auto max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Document Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white shrink-0 border-b border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black bg-[#f05a22] text-white">
                    {originalDocumentMeta?.docTypeBadge || '실무 납품 산출물 원문'}
                  </span>
                  <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    {originalDocumentMeta?.docDate || '검토 완료'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyText}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '복사됨' : '원문 전체 복사'}</span>
                  </button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {originalDocumentMeta?.subject || activeTitle}
              </h3>
            </div>

            {/* Document Metadata Table (Recipient, Sender, Attachments) */}
            {originalDocumentMeta && (
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 text-xs space-y-2 shrink-0">
                {originalDocumentMeta.recipient && (
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" /> 받는사람
                    </span>
                    <span className="font-semibold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 inline-block">
                      {originalDocumentMeta.recipient}
                    </span>
                  </div>
                )}
                {originalDocumentMeta.sender && (
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> 보낸사람
                    </span>
                    <span className="text-slate-800">
                      {originalDocumentMeta.sender}
                    </span>
                  </div>
                )}
                {originalDocumentMeta.attachments && originalDocumentMeta.attachments.length > 0 && (
                  <div className="flex items-start gap-3 pt-1">
                    <span className="font-bold text-slate-500 w-16 shrink-0 flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-slate-400" /> 첨부파일
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {originalDocumentMeta.attachments.map((file, fIdx) => (
                        <span
                          key={fIdx}
                          className="bg-white border border-slate-300 px-2 py-0.5 rounded text-[11px] font-medium text-slate-700 flex items-center gap-1"
                        >
                          <Paperclip className="w-3 h-3 text-slate-400" /> {file}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Full Body Text Display */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white">
              <div
                className={`font-sans whitespace-pre-wrap select-text text-slate-800 font-normal ${fontSizeClass}`}
              >
                {textContent}
              </div>
            </div>

            {/* Document Bottom Footer Bar */}
            <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <span className="text-[11px] text-slate-500">
                💡 텍스트를 드래그하여 복사하거나 상단의 <strong>[원문 복사]</strong> 버튼을 이용하세요.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMode('image')}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#f05a22]" />
                  <span>디자인 이미지 뷰로 전환</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Information Tip */}
      <div
        className="p-2.5 bg-gray-950/95 border-t border-white/10 text-center text-[11px] text-gray-400 shrink-0 flex flex-wrap items-center justify-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {activeMode === 'image' ? (
          gallery && gallery.length > 1 ? (
            <span>
              📄 총 {gallery.length}개 페이지 중 <strong>{currentIndex + 1}번째 페이지</strong>를 검토 중입니다. 키보드 방향키(←, →) 또는 상단 탭으로 이동할 수 있습니다.
            </span>
          ) : (
            <span>💡 화면 바깥을 클릭하거나 ESC 키를 누르면 닫힙니다. 상단 <strong>[원문 전문 검토]</strong> 탭을 클릭하여 텍스트를 읽을 수 있습니다.</span>
          )
        ) : (
          <span>📄 산출물의 실제 텍스트 원문 전문을 확인 중입니다. 텍스트를 자유롭게 복사하거나 TXT 파일로 저장할 수 있습니다.</span>
        )}
      </div>
    </div>
  );
};

