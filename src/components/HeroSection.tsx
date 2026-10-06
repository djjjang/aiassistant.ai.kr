import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, FileCheck, CheckCircle2, ChevronRight, Presentation, Palette, Video, MessageCircle, ShieldCheck } from 'lucide-react';
import heroWorkspaceBg from '../assets/images/hero_workspace_bg_1790658790289.jpg';

interface HeroSectionProps {
  onSelectService?: (serviceId: string) => void;
}

interface SimulationTask {
  id: string;
  icon: typeof FileCheck;
  iconBg: string;
  iconColor: string;
  title: string;
  speed: string;
  progressPercent: number;
  highlightText: string;
  reviewerText: string;
}

const SIMULATION_TASKS: SimulationTask[] = [
  {
    id: 'ppt',
    icon: Presentation,
    iconBg: 'bg-orange-100',
    iconColor: 'text-[#f05a22]',
    title: 'TIPS 사업계획서 & IR 피치덱',
    speed: '완료 (2.1초)',
    progressPercent: 96,
    highlightText: '7개 챕터 도식화 & 심사역 맞춤형 슬라이드',
    reviewerText: 'VC 출신 기획 전문가 검수 완료'
  },
  {
    id: 'contract',
    icon: FileCheck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '계약서 독소조항 실무 검토',
    speed: '완료 (1.8초)',
    progressPercent: 94,
    highlightText: '지체상금율·하자보수 독소조항 5건 감지 & 수정안',
    reviewerText: '전담 법무 매니저 검수 완료'
  },
  {
    id: 'design',
    icon: Palette,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    title: '고전환 상품 상세페이지 기획',
    speed: '완료 (2.5초)',
    progressPercent: 100,
    highlightText: '모바일 7단계 롱스크롤 & 임상 비주얼 도식화',
    reviewerText: '시니어 브랜드 디렉터 감수 완료'
  },
  {
    id: 'video',
    icon: Video,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    title: '릴스·쇼츠 30초 바이럴 숏폼',
    speed: '완료 (1.9초)',
    progressPercent: 98,
    highlightText: '첫 3초 후킹 인트로 & 키네틱 자막·사운드 싱크',
    reviewerText: '영상 모션그래픽 디렉터 마스터링'
  }
];

const CLIENT_BRANDS = [
  { name: 'TREND24', style: 'font-black tracking-tighter' },
  { name: '더마핑크', style: 'font-extrabold tracking-tight' },
  { name: 'BT24', style: 'font-black tracking-tight' },
  { name: 'FOREST VICTORIA ACADEMY', style: 'font-bold tracking-wider text-sm sm:text-base' },
  { name: '다온클럽', style: 'font-black tracking-tight' },
  { name: 'LJ MOTORS', style: 'font-black tracking-tight' },
  { name: 'MOVE STUDIO', style: 'font-black tracking-widest text-base sm:text-lg' },
  { name: 'STEMBLISS', style: 'font-extrabold tracking-widest text-base sm:text-lg' },
  { name: '글로우빔', style: 'font-extrabold tracking-tight' },
  { name: 'L-DESIGN', style: 'font-black tracking-wider text-base sm:text-lg' },
  { name: '루미마켓', style: 'font-black tracking-tight' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectService }) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState(0);

  // Rotate simulation task every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTaskIndex((prev) => (prev + 1) % SIMULATION_TASKS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentTask = SIMULATION_TASKS[activeTaskIndex];
  const TaskIcon = currentTask.icon;

  const scrollToLeadForm = () => {
    const el = document.getElementById('lead-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero-section"
      className="relative w-full overflow-hidden border-b border-[#eae6df]/80 bg-[#fbf9f5]"
      data-purpose="hero-section"
    >
      {/* Background Image Container with Balanced Transparency */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={heroWorkspaceBg}
          alt="실무 전문가 워크스페이스 배경"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter saturate-[1.1] contrast-[1.05]"
        />
        {/* Soft Left Scrim for Text Readability while Keeping Background Studio Vividly Visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbf9f5]/85 via-[#fbf9f5]/55 to-[#fbf9f5]/25"></div>
        {/* Subtle Top & Bottom Edge Blends */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf9f5]/40 via-transparent to-[#fbf9f5]/90"></div>
      </div>

      <div className="pt-8 sm:pt-12 lg:pt-16 pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Value Proposition & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Subtitle Category Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#eae6df] text-[#f05a22] text-xs font-bold mb-4 shadow-2xs self-start">
              <span className="w-2 h-2 rounded-full bg-[#f05a22] animate-pulse"></span>
              <span>실무 전문가 팀 × AI 비서 하이브리드 대행</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2] tracking-tight text-[#0f2439] mb-4">
              AI를 배우지 마세요,<br />
              <span className="text-[#f05a22] underline underline-offset-8 decoration-[#f05a22]/30">
                업무를 맡기세요.
              </span>
            </h1>

            {/* Sub Headline */}
            <p className="text-base sm:text-lg leading-relaxed text-gray-700 mb-6 font-normal max-w-2xl">
              복잡하고 번거로운 문서 검토부터 콘텐츠 제작, 시장 리서치, 마케팅 자동화까지.
              AI 엔진과 검증된 <strong className="text-[#0f2439] font-bold">각 분야 5년 차 이상 실무 전문가 팀</strong>이 책임지고 납품합니다.
            </p>

            {/* Main Call to Action Area */}
            <div className="space-y-3 mb-6 max-w-lg">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  id="hero-primary-cta"
                  href="http://pf.kakao.com/_xnSxeiT/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#f05a22] text-white font-bold text-sm sm:text-base shadow-highlight hover:bg-[#d94e1c] active:scale-[0.98] transition-all cursor-pointer select-none"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>카카오톡 1:1 상담신청</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#lead-form"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-white/95 backdrop-blur-xs border border-slate-300 text-[#0f2439] font-bold text-sm sm:text-base hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span>무료 시범업무 신청</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium pt-1">
                <ShieldCheck className="w-4 h-4 text-[#f05a22] shrink-0" />
                <span>
                  첫 달 시범 도입 특가: <strong className="text-gray-900 font-bold">월 300,000원</strong>부터 (불만족 시 100% 환불 보장)
                </span>
              </div>
            </div>

            {/* Key Metrics Stats Grid (4-box clean layout on PC) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] shadow-2xs hover:border-[#0f2439]/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">320+</div>
                <div className="text-xs text-gray-500 font-medium mt-1">실제 누적 기업 고객사</div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] shadow-2xs hover:border-[#0f2439]/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-[#f05a22] tracking-tight">48h</div>
                <div className="text-xs text-gray-500 font-medium mt-1">평균 첫 결과물 전달</div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] shadow-2xs hover:border-[#0f2439]/30 transition-colors">
                <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">
                  <span>4.9</span>
                  <div className="flex text-[#f05a22] text-sm">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">고객 업무 만족도 지수</div>
              </div>

              <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] shadow-2xs hover:border-[#0f2439]/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">92%</div>
                <div className="text-xs text-gray-500 font-medium mt-1">구독 연장 및 재의뢰율</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AI Agent Simulator Dashboard (Eye Level on PC) */}
          <div className="lg:col-span-5">
            <div
              id="ai-preview-card"
              className="rounded-2xl overflow-hidden shadow-xl border border-[#eae6df] bg-white/95 backdrop-blur-md transition-all duration-300"
              data-purpose="ai-preview-card"
            >
              {/* Card Header & Preview Stage */}
              <div className="bg-gradient-to-tr from-stone-200/90 via-stone-100/90 to-amber-50/70 p-5 flex flex-col justify-between min-h-[290px]">
                {/* Floating Live Status Badge & Switchers */}
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f2439] text-white text-[11px] font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>AI 비서 엔진 : 실시간 가동 중</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white/90 px-2.5 py-0.5 rounded-md shadow-2xs border border-slate-200">
                    v3.4 PRO
                  </span>
                </div>

                {/* Interactive Simulation Switcher Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-3">
                  {SIMULATION_TASKS.map((task, idx) => (
                    <button
                      key={task.id}
                      onClick={() => setActiveTaskIndex(idx)}
                      className={`text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                        idx === activeTaskIndex
                          ? 'bg-[#0f2439] text-white shadow-sm'
                          : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                    >
                      예시 {idx + 1}: {task.title.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Simulated Interactive Dashboard Overlay */}
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-md border border-gray-100 space-y-3 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-lg ${currentTask.iconBg} ${currentTask.iconColor} flex items-center justify-center text-sm font-bold`}
                      >
                        <TaskIcon className="w-4 h-4" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-gray-800">{currentTask.title}</div>
                    </div>
                    <span className="text-[11px] bg-green-100 text-green-800 font-bold px-2.5 py-0.5 rounded-full">
                      {currentTask.speed}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#f05a22] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${currentTask.progressPercent}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500 pt-0.5">
                    <span className="font-semibold text-gray-700 truncate mr-2">
                      {currentTask.highlightText}
                    </span>
                    <span className="font-bold text-[#0f2439] shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {currentTask.reviewerText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Action Under Card */}
              <div className="p-4 bg-[#0a1928] flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f05a22] animate-pulse"></span>
                  <span className="font-medium text-gray-200">현재 대기 없이 1:1 전담 매니저 배정 가능</span>
                </div>
                <a
                  href="http://pf.kakao.com/_xnSxeiT/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#f05a22] font-bold hover:underline flex items-center cursor-pointer"
                >
                  <span>배정 상담받기</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Client Trust Logotypes with Continuous Right-to-Left Ticker */}
        <div className="mt-12 pt-8 border-t border-[#eae6df]/80 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-5">
            이미 우수 스타트업 및 중견기업 320개 사가 AI비서와 함께 일합니다
          </p>

          {/* Marquee Ticker Container with Left & Right Gradient Masks */}
          <div className="relative w-full overflow-hidden py-2 select-none">
            {/* Left fade mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#fbf9f5] via-[#fbf9f5]/85 to-transparent z-10 pointer-events-none"></div>
            {/* Right fade mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#fbf9f5] via-[#fbf9f5]/85 to-transparent z-10 pointer-events-none"></div>

            {/* Seamless Looping Track */}
            <div className="animate-marquee flex items-center">
              {[...CLIENT_BRANDS, ...CLIENT_BRANDS, ...CLIENT_BRANDS].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="flex items-center shrink-0 pr-10 sm:pr-14"
                >
                  <span
                    className={`${brand.style} text-lg sm:text-xl text-gray-800/85 hover:text-gray-950 transition-colors whitespace-nowrap`}
                  >
                    {brand.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-10 sm:ml-14 shrink-0"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
