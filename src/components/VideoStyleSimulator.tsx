import React, { useState, useMemo } from 'react';
import {
  Smartphone,
  Monitor,
  Film,
  ShoppingBag,
  Zap,
  Sparkles,
  Volume2,
  Mic,
  Music,
  Check,
  Copy,
  ArrowRight,
  Clock,
  Coins,
  RotateCcw,
  Layers,
  CheckCircle2,
  Play,
  ExternalLink
} from 'lucide-react';
import { parseVideoUrl } from '../utils/video';

export interface VideoSimulatorSelection {
  formatId: string;
  styleId: string;
  audioId: string;
  subtitleId: string;
}

interface VideoStyleSimulatorProps {
  onApplyStyle?: (customSummary: string) => void;
  onOpenConsultation?: () => void;
  onViewCase?: (caseId: string) => void;
}

interface FormatOption {
  id: string;
  title: string;
  subtitle: string;
  ratio: '9:16' | '16:9' | '1:1';
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  description: string;
}

interface StyleOption {
  id: string;
  title: string;
  badge: string;
  accentColor: string;
  bgGradient: string;
  sampleHeadline: string;
  sampleSubtitle: string;
  description: string;
  features: string[];
}

interface AudioOption {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface SubtitleOption {
  id: string;
  title: string;
  styleClass: string;
  previewText: string;
}

const FORMAT_OPTIONS: FormatOption[] = [
  {
    id: 'shorts',
    title: '모바일 숏폼 바이럴',
    subtitle: '릴스 · 쇼츠 · 틱톡 최적화',
    ratio: '9:16',
    duration: '20초 ~ 30초',
    icon: Smartphone,
    badge: '9:16 세로형',
    description: '첫 3초 후킹으로 시선을 사로잡고 알고리즘 바이럴을 유도하는 숏폼 영상'
  },
  {
    id: 'saas_tutorial',
    title: 'B2B 솔루션 튜토리얼',
    subtitle: '웹 서비스 · SaaS 대시보드',
    ratio: '16:9',
    duration: '45초 ~ 60초',
    icon: Monitor,
    badge: '16:9 가로형',
    description: '실제 UI 스크린캐스트 녹화, 화면 줌인, 마우스 하이라이트로 이탈률 감소'
  },
  {
    id: 'cinematic_brand',
    title: '시네마틱 브랜드 필름',
    subtitle: '회사소개 · 인터뷰 · 브랜드 스토리',
    ratio: '16:9',
    duration: '60초 ~ 90초',
    icon: Film,
    badge: '16:9 시네마',
    description: '영화 같은 컬러그레이딩, 서정적 BGM, 창업자 인터뷰로 브랜드 신뢰도 구축'
  },
  {
    id: 'ecommerce_product',
    title: '커머스 상세페이지 영상',
    subtitle: '스마트스토어 · 쿠팡 상세 시연',
    ratio: '9:16',
    duration: '20초 ~ 30초',
    icon: ShoppingBag,
    badge: '9:16 / 1:1',
    description: '실물 언박싱, 텍스처 초근접 컷, 3단계 사용법으로 구매 전환율 극대화'
  }
];

const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'fast_hook',
    title: '다이나믹 패스트컷 & 밈 후킹',
    badge: '최고 조회수 유도',
    accentColor: '#f05a22',
    bgGradient: 'from-orange-950 via-slate-900 to-black',
    sampleHeadline: '🔥 아직도 외주 맡길 때 며칠씩 기다리세요?',
    sampleSubtitle: '3초 만에 끝나는 AI 비서 실시간 견적 접수!',
    description: '화면 전환 템포가 빠르고 화면 분할 및 비트 싱크로 몰입감을 극대화합니다.',
    features: ['첫 3초 후킹 대본', '비트 싱크 컷편집', '볼드 키네틱 자막', '트렌디 효과음(SFX)']
  },
  {
    id: 'tech_motion',
    title: '모던 2D 모션그래픽 & 스포트라이트',
    badge: '테크 & B2B 최적화',
    accentColor: '#0ea5e9',
    bgGradient: 'from-blue-950 via-slate-900 to-black',
    sampleHeadline: '⚡ 클릭 한 번으로 6대 실무 자동화 파이프라인 가동',
    sampleSubtitle: 'UI 스크린캐스트 + 스마트 마우스 트래킹',
    description: '화면 확대(Zoom-in), 커서 스포트라이트, UI 요소 팝업 모션으로 기능을 명쾌하게 안내합니다.',
    features: ['FHD 고화질 화면 캡처', '부드러운 마우스 줌인', '기능 하이라이트 그래픽', 'AI 성우 표준어 더빙']
  },
  {
    id: 'cinematic_mood',
    title: '감성 시네마틱 & 필름 컬러그레이딩',
    badge: '프리미엄 브랜딩',
    accentColor: '#10b981',
    bgGradient: 'from-emerald-950 via-slate-900 to-black',
    sampleHeadline: '🌿 신뢰를 디자인하는 20년의 고집과 철학',
    sampleSubtitle: '창업자 인터뷰 & 현장 실황 다큐멘터리 톤',
    description: '영화 같은 24fps 질감, 깊이 있는 색보정, 자연스러운 슬로모션으로 기업 가치를 높입니다.',
    features: ['시네마틱 컬러그레이딩', '인터뷰 오디오 노이즈 제거', '감성 오케스트라 BGM', '세련된 타이포그래피']
  },
  {
    id: 'clean_explainer',
    title: '미니멀 인포그래픽 & 스텝 가이드',
    badge: '직관적 전달력 1위',
    accentColor: '#8b5cf6',
    bgGradient: 'from-purple-950 via-slate-900 to-black',
    sampleHeadline: '💡 복잡한 프로젝트도 단 3단계로 완벽 해결',
    sampleSubtitle: 'Step 1 선택 → Step 2 산출 → Step 3 완료',
    description: '도식화 인포그래픽과 단계별 넘버링으로 누구나 단번에 이해할 수 있게 구성합니다.',
    features: ['단계별 인포그래픽 도식', '수치 강조 카운트업', '클린 미니멀 레이아웃', '정제된 상업용 음향']
  }
];

const AUDIO_OPTIONS: AudioOption[] = [
  {
    id: 'ai_voice_bgm',
    title: 'AI 성우 더빙 + 트렌디 BGM',
    icon: Mic,
    description: '자연스러운 한국어 표준어 음성 나레이션과 경쾌한 배경음악이 결합'
  },
  {
    id: 'bgm_sfx',
    title: '상업용 라이선스 BGM + 풍부한 SFX',
    icon: Music,
    description: '목소리 없이 비트 싱크 음악과 Whoosh, Ding, Pop 효과음으로 리듬감 형성'
  },
  {
    id: 'original_voice',
    title: '실제 현장음/인터뷰 + 오디오 정제',
    icon: Volume2,
    description: '녹음된 인터뷰나 현장 소리에서 잡음을 제거하고 마스터링'
  }
];

const SUBTITLE_OPTIONS: SubtitleOption[] = [
  {
    id: 'neon_bold',
    title: '볼드 네온/옐로우 팝업 자막',
    styleClass: 'bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded shadow-md border-2 border-slate-950',
    previewText: '🔥 3초 만에 견적 확인!'
  },
  {
    id: 'minimal_bar',
    title: '모던 미니멀 블랙바 자막',
    styleClass: 'bg-black/85 text-white font-bold px-2.5 py-1 rounded-md backdrop-blur-xs border border-white/20',
    previewText: '스마트 실시간 접수 시스템'
  },
  {
    id: 'cinematic_clean',
    title: '시네마틱 센서티브 타이포',
    styleClass: 'text-white tracking-widest uppercase font-serif drop-shadow-md text-xs',
    previewText: 'TRUST & INNOVATION'
  }
];

const FORMAT_REFERENCE_MAP: Record<
  string,
  { caseId: string; title: string; client: string; videoUrl: string; tag: string }
> = {
  shorts: {
    caseId: 'vid-1',
    title: '국제 베트남 뷰티 BJ 선발대회 시상 쇼츠',
    client: '글로벌 엔터 & 뷰티 프로덕션 (주)트렌드24',
    videoUrl: 'https://youtube.com/shorts/mroWPCfADa8?si=hF0IAtEgLDl-tSgc',
    tag: '9:16 유튜브 쇼츠'
  },
  saas_tutorial: {
    caseId: 'vid-2',
    title: 'AI비서 60초 원클릭 실시간 견적 접수 튜토리얼',
    client: '(주)트렌드24 / AI비서',
    videoUrl: 'https://www.youtube.com/watch?v=oTahLEX3NXo',
    tag: '16:9 SaaS 튜토리얼'
  },
  cinematic_brand: {
    caseId: 'vid-3',
    title: '브랜드 스토리 인터뷰 및 시네마틱 컷편집',
    client: '스타트업 브랜드 M사',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    tag: '16:9 시네마틱 브랜드'
  },
  ecommerce_product: {
    caseId: 'vid-1',
    title: '뷰티 & 제품 시연 바이럴 숏폼',
    client: '(주)트렌드24 엔터팀',
    videoUrl: 'https://youtube.com/shorts/mroWPCfADa8?si=hF0IAtEgLDl-tSgc',
    tag: '9:16 커머스/뷰티'
  }
};

export const VideoStyleSimulator: React.FC<VideoStyleSimulatorProps> = ({
  onApplyStyle,
  onOpenConsultation,
  onViewCase
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>('shorts');
  const [selectedStyle, setSelectedStyle] = useState<string>('fast_hook');
  const [selectedAudio, setSelectedAudio] = useState<string>('ai_voice_bgm');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('neon_bold');
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [previewType, setPreviewType] = useState<'mock' | 'real'>('mock');

  const activeFormat = useMemo(() => FORMAT_OPTIONS.find((f) => f.id === selectedFormat) || FORMAT_OPTIONS[0], [selectedFormat]);
  const activeStyle = useMemo(() => STYLE_OPTIONS.find((s) => s.id === selectedStyle) || STYLE_OPTIONS[0], [selectedStyle]);
  const activeAudio = useMemo(() => AUDIO_OPTIONS.find((a) => a.id === selectedAudio) || AUDIO_OPTIONS[0], [selectedAudio]);
  const activeSubtitle = useMemo(() => SUBTITLE_OPTIONS.find((sub) => sub.id === selectedSubtitle) || SUBTITLE_OPTIONS[0], [selectedSubtitle]);
  const currentRef = useMemo(() => FORMAT_REFERENCE_MAP[selectedFormat] || FORMAT_REFERENCE_MAP.shorts, [selectedFormat]);
  const parsedRefVideo = useMemo(() => parseVideoUrl(currentRef.videoUrl), [currentRef.videoUrl]);

  // Generate clean formatted specification summary
  const formattedSummary = useMemo(() => {
    return `[맞춤 영상 제작 스타일 견적 시뮬레이터 결과]
• 영상 포맷: ${activeFormat.title} (${activeFormat.badge}, 권장 길이: ${activeFormat.duration})
• 비주얼 연출: ${activeStyle.title} (${activeStyle.badge})
• 사운드 구성: ${activeAudio.title}
• 자막 스타일: ${activeSubtitle.title}
• 핵심 특징: ${activeStyle.features.join(', ')}
• 권장 납기: 영업일 24~48시간 이내
• 예상 제작 견적: ₩180,000 ~ ₩350,000 상당 (비즈니스 프로 플랜 시 전액 무료 포함)`;
  }, [activeFormat, activeStyle, activeAudio, activeSubtitle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSummary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleApply = () => {
    if (onApplyStyle) {
      onApplyStyle(formattedSummary);
    } else if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  const handleReset = () => {
    setSelectedFormat('shorts');
    setSelectedStyle('fast_hook');
    setSelectedAudio('ai_voice_bgm');
    setSelectedSubtitle('neon_bold');
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-900 via-[#0f2439] to-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border border-rose-500/30 shadow-sm">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-400" />
              INTERACTIVE VIDEO CONFIGURATOR
            </span>
            <span className="text-[10px] bg-rose-600/80 text-white px-2 py-0.2 rounded-full font-bold">
              대화형 시뮬레이터
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">
            내 브랜드에 딱 맞는 영상 제작 스타일을 선택해 보세요
          </h4>
          <p className="text-[11px] text-gray-300">
            포맷, 연출 기법, 사운드, 자막 스타일을 조합하면 실시간 예상 결과와 제작 스펙이 즉시 산출됩니다.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition cursor-pointer shrink-0"
          title="처음 상태로 되돌리기"
        >
          <RotateCcw className="w-3 h-3" />
          <span>초기화</span>
        </button>
      </div>

      {/* Main Grid: Left Configurator / Right Live Dynamic Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: 4 Step Interactive Selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* STEP 1: Format & Ratio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f2439] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#f05a22] text-white text-[10px] font-black flex items-center justify-center">
                  1
                </span>
                영상 포맷 및 목적 선택
              </span>
              <span className="text-[11px] text-gray-500">
                현재 선택: <strong className="text-rose-600 font-bold">{activeFormat.badge}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FORMAT_OPTIONS.map((f) => {
                const IconComponent = f.icon;
                const isSelected = selectedFormat === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFormat(f.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-400'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isSelected ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-rose-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {f.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-900 leading-tight">
                        {f.title}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5 truncate">
                        {f.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Visual Style */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f2439] flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#f05a22] text-white text-[10px] font-black flex items-center justify-center">
                  2
                </span>
                비주얼 연출 & 컷 편집 스타일
              </span>
              <span className="text-[11px] text-gray-500">
                현재: <strong className="text-rose-600 font-bold">{activeStyle.title.split(' ')[0]}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {STYLE_OPTIONS.map((s) => {
                const isSelected = selectedStyle === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStyle(s.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-400'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-gray-900 leading-snug">
                        {s.title}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    </div>
                    <p className="text-[10.5px] text-gray-600 leading-tight line-clamp-2 mb-1.5">
                      {s.description}
                    </p>
                    <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-gray-100">
                      {s.features.slice(0, 2).map((feat, fIdx) => (
                        <span key={fIdx} className="text-[9.5px] text-gray-500 bg-gray-100 px-1.5 py-0.2 rounded font-medium">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Audio & Voice */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0f2439] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#f05a22] text-white text-[10px] font-black flex items-center justify-center">
                3
              </span>
              사운드 & 음성 나레이션 구성
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {AUDIO_OPTIONS.map((a) => {
                const IconComponent = a.icon;
                const isSelected = selectedAudio === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedAudio(a.id)}
                    className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-400'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-gray-500'}`} />
                      <span className="text-[11px] font-bold text-gray-900 leading-tight">
                        {a.title}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-tight line-clamp-2">
                      {a.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Subtitle Style */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#0f2439] flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#f05a22] text-white text-[10px] font-black flex items-center justify-center">
                4
              </span>
              자막 디자인 폰트 & 하이라이트
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SUBTITLE_OPTIONS.map((sub) => {
                const isSelected = selectedSubtitle === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubtitle(sub.id)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/60 shadow-xs ring-1 ring-rose-400'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/70'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-gray-800 mb-1.5">
                      {sub.title}
                    </span>
                    <span className={sub.styleClass}>
                      {sub.previewText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Live Interactive Visual Mockup + Spec Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5 flex flex-col">
          {/* Dynamic Interactive Frame Simulator */}
          <div className="rounded-2xl bg-[#090d14] border border-rose-500/40 p-3 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-xl min-h-[290px]">
            {/* Ambient Background Gradient based on Style */}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeStyle.bgGradient} opacity-90 transition-all duration-500`}></div>

            {/* Top Frame Status Bar */}
            <div className="relative z-10 w-full flex items-center justify-between text-[10px] text-gray-400 pb-2 mb-2 border-b border-white/10 gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-black/60 p-0.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewType('mock')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                    previewType === 'mock'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🎨 그래픽 모의 연출
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewType('real')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    previewType === 'real'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>실제 완성본 영상 재생</span>
                </button>
              </div>

              <span className="font-mono text-rose-400 font-bold ml-auto">
                {activeFormat.ratio} • 4K 60fps
              </span>
            </div>

            {/* Central Mock Screen Canvas */}
            <div className={`relative z-10 transition-all duration-300 flex flex-col items-center justify-center ${
              activeFormat.ratio === '9:16'
                ? 'w-[200px] h-[300px] rounded-[28px] bg-black border-2 border-slate-700 p-2 shadow-2xl relative'
                : 'w-full h-[200px] rounded-xl bg-black border border-slate-700 p-2 shadow-2xl relative'
            }`}>
              {/* Notch for Mobile if 9:16 */}
              {activeFormat.ratio === '9:16' && (
                <div className="w-16 h-2.5 bg-slate-900 rounded-full mx-auto mb-1 border border-white/10"></div>
              )}

              {previewType === 'real' && parsedRefVideo?.embedUrl ? (
                /* Real Embedded Reference Video */
                <div className="flex-1 w-full h-full rounded-xl overflow-hidden bg-black flex flex-col relative">
                  <iframe
                    key={`ref-player-${currentRef.caseId}-${selectedFormat}`}
                    src={parsedRefVideo.embedUrl}
                    title={currentRef.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                /* Simulated Video Content Motion Canvas */
                <div className="flex-1 w-full flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
                  {/* Floating Wave / Beat Graphic */}
                  <div className="flex items-center gap-1 mb-2 opacity-80">
                    <span className="w-1 h-3 bg-rose-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-5 bg-orange-400 rounded-full animate-pulse"></span>
                    <span className="w-1 h-4 bg-yellow-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1 h-6 bg-rose-400 rounded-full animate-pulse delay-100"></span>
                    <span className="w-1 h-3 bg-red-500 rounded-full animate-bounce"></span>
                  </div>

                  <div className="text-[11px] font-black text-white leading-tight mb-1 drop-shadow-md">
                    {activeStyle.sampleHeadline}
                  </div>
                  <div className="text-[9.5px] text-gray-300 leading-tight mb-2 opacity-90">
                    {activeStyle.sampleSubtitle}
                  </div>

                  {/* Subtitle Box according to selected style */}
                  <div className="mt-auto">
                    <span className={activeSubtitle.styleClass}>
                      {activeSubtitle.previewText}
                    </span>
                  </div>
                </div>
              )}

              {/* Audio badge in preview */}
              <div className="w-full pt-1.5 flex items-center justify-between text-[9px] text-gray-400 border-t border-white/10 mt-1">
                <span className="flex items-center gap-1 truncate max-w-[130px]">
                  <Volume2 className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                  <span className="truncate">{activeAudio.title.split('+')[0]}</span>
                </span>
                <span className="text-gray-300 font-mono">{activeFormat.duration}</span>
              </div>
            </div>

            {/* Play hint or Case Navigation link */}
            <div className="relative z-10 mt-2 w-full flex items-center justify-between text-[10px] text-gray-400">
              <span className="flex items-center gap-1">
                <Play className="w-2.5 h-2.5 text-rose-400 fill-rose-400" />
                <span>{previewType === 'real' ? '실제 납품본 재생 중' : '실시간 연출 효과 적용 중'}</span>
              </span>

              {onViewCase && (
                <button
                  type="button"
                  onClick={() => onViewCase(currentRef.caseId)}
                  className="text-rose-400 hover:text-white font-bold flex items-center gap-1 underline underline-offset-2 cursor-pointer transition"
                  title="이 스타일에 해당하는 포트폴리오 사례 전체 콘티 및 타임라인 보기"
                >
                  <span>실제 사례 콘티 보기</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>

          {/* Estimation & Specification Breakdown Card */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs space-y-2.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
              <span className="font-bold text-gray-900 flex items-center gap-1.5 text-[11px]">
                <Coins className="w-3.5 h-3.5 text-[#f05a22]" />
                맞춤 제작 견적 & 일정 요약
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                정찰제 보장
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">예상 영상 길이:</span>
                <span className="font-bold text-gray-900">{activeFormat.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">평균 제작 납기:</span>
                <span className="font-bold text-[#f05a22] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  영업일 24~48시간 이내
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">기본 제공 산출물:</span>
                <span className="font-medium text-gray-800 text-right">
                  {activeFormat.ratio} 마스터본 + SRT 자막 + 썸네일
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-slate-800">
                <span className="text-gray-600 font-medium">단건 예상 견적:</span>
                <span className="font-black text-rose-600 text-xs">
                  ₩180,000 ~ ₩350,000
                </span>
              </div>
              <div className="text-[10px] text-gray-500 bg-white p-2 rounded-lg border border-slate-200 leading-tight">
                💡 <strong>비즈니스 프로 정기구독(월 42.5만~)</strong> 이용 시 본 영상 제작을 포함하여 전 업무가 <strong>무제한 무료</strong>로 진행됩니다.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col gap-1.5">
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-2.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition hover:scale-[1.01] cursor-pointer"
              >
                <span>이 스타일로 즉시 상담 / 견적 신청</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-medium text-[11px] border border-gray-300 flex items-center justify-center gap-1 transition cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? '사양이 클립보드에 복사되었습니다!' : '선택한 스타일 사양 복사하기'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
