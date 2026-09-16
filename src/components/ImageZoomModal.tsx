import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export interface ZoomGalleryItem {
  url: string;
  title: string;
  pageLabel: string;
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
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  title,
  subtitle,
  gallery,
  initialIndex = 0
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // Sync index if initialIndex or isOpen changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoomLevel(1);
    setIsLoading(true);
    setHasError(false);
  }, [initialIndex, isOpen]);

  const currentItem = gallery && gallery.length > 0 && currentIndex >= 0 && currentIndex < gallery.length
    ? gallery[currentIndex]
    : null;
  const activeUrl = currentItem ? currentItem.url : imageUrl;
  const activeTitle = currentItem ? currentItem.title : (title || '산출물 고해상도 원본 보기');
  const activeSubtitle = currentItem
    ? `${currentItem.pageLabel} (전체 ${gallery?.length}개 페이지 중 ${currentIndex + 1}번째) • ${subtitle || ''}`
    : subtitle;

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
      } else if (e.key === 'ArrowLeft' && gallery && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
        setZoomLevel(1);
      } else if (e.key === 'ArrowRight' && gallery && currentIndex < gallery.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, gallery, currentIndex, onClose]);

  if (!isOpen) return null;

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

  return (
    <div
      className="fixed inset-0 z-60 flex flex-col bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      {/* Top Bar Controls */}
      <div
        className="p-3 sm:p-4 bg-gray-950/90 border-b border-white/10 flex items-center justify-between text-white shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-lg bg-[#f05a22] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {activeTitle}
            </h4>
            {activeSubtitle && (
              <p className="text-[10px] sm:text-xs text-gray-400 truncate">
                {activeSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Toolbar & Close Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
            download="business_plan_deliverable.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-gray-300 hover:text-white transition cursor-pointer border border-white/10"
            title="새 탭에서 원본 이미지 열기"
            aria-label="새 탭에서 열기"
          >
            <Download className="w-4 h-4" />
          </a>

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

      {/* Optional Multi-page Tabs */}
      {gallery && gallery.length > 1 && (
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

      {/* Main Image Viewport with Scroll & Zoom */}
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
            <button
              onClick={() => {
                setIsLoading(true);
                setHasError(false);
              }}
              className="px-4 py-2 bg-[#f05a22] hover:bg-[#d94e1c] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 mx-auto cursor-pointer shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 다시 시도
            </button>
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
      </div>

      {/* Bottom Information Tip */}
      <div
        className="p-2.5 bg-gray-950/90 border-t border-white/10 text-center text-[11px] text-gray-400 shrink-0 flex flex-wrap items-center justify-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {gallery && gallery.length > 1 ? (
          <span>
            📄 총 {gallery.length}개 페이지 중 <strong>{currentIndex + 1}번째 페이지</strong>를 검토 중입니다. 키보드 방향키(←, →) 또는 상단 탭으로 이동할 수 있습니다.
          </span>
        ) : (
          <span>💡 화면 바깥을 클릭하거나 ESC 키를 누르면 이전 화면으로 돌아갑니다. 마우스 휠 또는 상단 버튼으로 확대/축소할 수 있습니다.</span>
        )}
      </div>
    </div>
  );
};
