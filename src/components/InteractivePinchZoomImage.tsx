import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Hand, Sparkles, Maximize2 } from 'lucide-react';

interface InteractivePinchZoomImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  maxScale?: number;
  minScale?: number;
  showControls?: boolean;
  onDoubleClick?: () => void;
  title?: string;
  subtitle?: string;
}

export const InteractivePinchZoomImage: React.FC<InteractivePinchZoomImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  maxScale = 5,
  minScale = 1,
  showControls = true,
  title,
  subtitle
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  // Gesture tracking refs to prevent re-render thrashing
  const gestureState = useRef({
    scale: 1,
    position: { x: 0, y: 0 },
    initialTouchDistance: 0,
    initialScale: 1,
    initialTouchCenter: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },
    dragStart: { x: 0, y: 0 },
    isDragging: false,
    lastTapTime: 0
  });

  // Keep state and ref in sync
  useEffect(() => {
    gestureState.current.scale = scale;
    gestureState.current.position = position;
  }, [scale, position]);

  // Reset when image src changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    gestureState.current.scale = 1;
    gestureState.current.position = { x: 0, y: 0 };
    setShowHint(true);
  }, [src]);

  // Hide hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const clampScale = useCallback((s: number) => {
    return Math.min(Math.max(s, minScale), maxScale);
  }, [minScale, maxScale]);

  const clampPosition = useCallback((pos: { x: number; y: number }, currentScale: number) => {
    if (!containerRef.current) return pos;
    const container = containerRef.current.getBoundingClientRect();
    // Allow panning proportional to zoom
    const maxX = (container.width * (currentScale - 1)) / 2;
    const maxY = (container.height * (currentScale - 1)) / 2;

    if (currentScale <= 1) {
      return { x: 0, y: 0 };
    }

    return {
      x: Math.min(Math.max(pos.x, -maxX), maxX),
      y: Math.min(Math.max(pos.y, -maxY), maxY)
    };
  }, []);

  // Zoom to specific scale centered on a point
  const zoomTo = useCallback((newScaleTarget: number, clientX?: number, clientY?: number) => {
    const targetScale = clampScale(newScaleTarget);
    if (!containerRef.current) {
      setScale(targetScale);
      return;
    }

    if (targetScale <= 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = clientX !== undefined ? clientX - rect.left - rect.width / 2 : 0;
    const centerY = clientY !== undefined ? clientY - rect.top - rect.height / 2 : 0;

    const scaleFactor = targetScale / gestureState.current.scale;
    const newPos = {
      x: gestureState.current.position.x - centerX * (scaleFactor - 1),
      y: gestureState.current.position.y - centerY * (scaleFactor - 1)
    };

    const clampedPos = clampPosition(newPos, targetScale);
    setScale(targetScale);
    setPosition(clampedPos);
    setShowHint(false);
  }, [clampScale, clampPosition]);

  // Touch Handlers (Multi-touch Pinch & Drag)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      setShowHint(false);
      setIsInteracting(true);

      if (e.touches.length === 2) {
        // Pinch Zoom start
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

        gestureState.current.initialTouchDistance = dist;
        gestureState.current.initialScale = gestureState.current.scale;
        gestureState.current.initialTouchCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        gestureState.current.initialPosition = { ...gestureState.current.position };
      } else if (e.touches.length === 1) {
        // Single touch: Drag or Double tap
        const touch = e.touches[0];
        const now = Date.now();
        const timeDiff = now - gestureState.current.lastTapTime;

        if (timeDiff < 300 && timeDiff > 0) {
          // Double Tap detected!
          e.preventDefault();
          if (gestureState.current.scale > 1.2) {
            zoomTo(1);
          } else {
            zoomTo(2.4, touch.clientX, touch.clientY);
          }
          gestureState.current.lastTapTime = 0;
          return;
        }

        gestureState.current.lastTapTime = now;
        gestureState.current.isDragging = true;
        gestureState.current.dragStart = {
          x: touch.clientX - gestureState.current.position.x,
          y: touch.clientY - gestureState.current.position.y
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinching
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

        if (gestureState.current.initialTouchDistance > 0) {
          const rawScale = gestureState.current.initialScale * (dist / gestureState.current.initialTouchDistance);
          const newScale = clampScale(rawScale);

          // Calculate center movement
          const currentCenter = {
            x: (touch1.clientX + touch2.clientX) / 2,
            y: (touch1.clientY + touch2.clientY) / 2
          };
          const deltaX = currentCenter.x - gestureState.current.initialTouchCenter.x;
          const deltaY = currentCenter.y - gestureState.current.initialTouchCenter.y;

          const newPos = clampPosition({
            x: gestureState.current.initialPosition.x + deltaX,
            y: gestureState.current.initialPosition.y + deltaY
          }, newScale);

          setScale(newScale);
          setPosition(newPos);
        }
      } else if (e.touches.length === 1 && gestureState.current.isDragging && gestureState.current.scale > 1) {
        // Dragging while zoomed in
        e.preventDefault();
        const touch = e.touches[0];
        const rawPos = {
          x: touch.clientX - gestureState.current.dragStart.x,
          y: touch.clientY - gestureState.current.dragStart.y
        };
        const clamped = clampPosition(rawPos, gestureState.current.scale);
        setPosition(clamped);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        gestureState.current.initialTouchDistance = 0;
      }
      if (e.touches.length === 0) {
        gestureState.current.isDragging = false;
        setIsInteracting(false);

        // Snap back if scaled down below 1
        if (gestureState.current.scale < 1.05) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [clampScale, clampPosition, zoomTo]);

  // Desktop Mouse Handlers (Wheel zoom & Mouse drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    gestureState.current.isDragging = true;
    gestureState.current.dragStart = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gestureState.current.isDragging || scale <= 1) return;
    e.preventDefault();
    const rawPos = {
      x: e.clientX - gestureState.current.dragStart.x,
      y: e.clientY - gestureState.current.dragStart.y
    };
    const clamped = clampPosition(rawPos, scale);
    setPosition(clamped);
  };

  const handleMouseUp = () => {
    gestureState.current.isDragging = false;
    setIsInteracting(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.002;
    const newScale = clampScale(scale + zoomDelta);
    zoomTo(newScale, e.clientX, e.clientY);
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoomInBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    zoomTo(scale + 0.5);
  };

  const handleZoomOutBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    zoomTo(scale - 0.5);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none touch-none ${containerClassName}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        cursor: scale > 1 ? (isInteracting ? 'grabbing' : 'grab') : 'zoom-in'
      }}
    >
      {/* Zoomable Image Wrapper */}
      <div
        className="w-full h-full flex items-center justify-center transition-transform"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isInteracting ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)',
          transformOrigin: 'center center'
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          draggable={false}
          className={`max-w-full max-h-full object-contain pointer-events-none ${className}`}
        />
      </div>

      {/* Touch Pinch & Zoom Floating Help Hint */}
      {showHint && scale === 1 && (
        <div className="absolute inset-x-4 bottom-14 sm:bottom-4 z-20 flex justify-center pointer-events-none animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-black/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-2">
            <Hand className="w-3.5 h-3.5 text-[#f05a22] animate-pulse shrink-0" />
            <span>두 손가락으로 사진을 늘리거나 더블 터치하면 확대됩니다</span>
          </div>
        </div>
      )}

      {/* Floating Controls Bar */}
      {showControls && (
        <div
          className="absolute bottom-3 right-3 z-30 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg text-white text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={handleZoomOutBtn}
            disabled={scale <= minScale}
            className="p-1.5 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition disabled:opacity-30 cursor-pointer"
            title="축소 (Zoom Out)"
            aria-label="축소"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="px-2 py-1 text-[11px] font-mono font-bold text-gray-200 hover:bg-white/20 rounded-lg transition cursor-pointer"
            title="배율 초기화 (100%)"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            type="button"
            onClick={handleZoomInBtn}
            disabled={scale >= maxScale}
            className="p-1.5 hover:bg-white/20 rounded-lg text-gray-300 hover:text-white transition disabled:opacity-30 cursor-pointer"
            title="확대 (Zoom In)"
            aria-label="확대"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {scale > 1 && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 hover:bg-white/20 rounded-lg text-orange-400 hover:text-orange-300 transition cursor-pointer ml-0.5 border-l border-white/10"
              title="원래 크기로 초기화"
              aria-label="초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Active Zoom Badge (When zoomed in) */}
      {scale > 1.05 && (
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <span className="bg-[#f05a22]/90 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-md flex items-center gap-1">
            <span>확대 중 ({Math.round(scale * 100)}%)</span>
            <span className="opacity-80">• 드래그하여 이동</span>
          </span>
        </div>
      )}
    </div>
  );
};
