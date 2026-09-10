import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Star, FileCheck, CheckCircle2, ChevronRight, BarChart2, BookOpen, MessageCircle } from 'lucide-react';

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
    id: 'contract',
    icon: FileCheck,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: '계약서 리스크 자동 검토',
    speed: '완료 (1.8초)',
    progressPercent: 94,
    highlightText: '독소조항 3건 감지 & 수정안 제시',
    reviewerText: '전담 법무 매니저 검수 완료'
  },
  {
    id: 'research',
    icon: BarChart2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: '경쟁사 15개사 요금제 분석',
    speed: '완료 (2.4초)',
    progressPercent: 98,
    highlightText: '국내외 요금 체계 및 스펙 매트릭스 도출',
    reviewerText: '전담 비즈니스 기획자 검수 완료'
  },
  {
    id: 'content',
    icon: BookOpen,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'SEO 최적화 블로그 원고 작성',
    speed: '완료 (1.5초)',
    progressPercent: 100,
    highlightText: '2,400자 전문성 확보 및 네이버 랭킹 반영',
    reviewerText: '시니어 콘텐츠 에디터 윤문 완료'
  }
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
      className="pt-8 pb-12 px-5 max-w-md md:max-w-4xl mx-auto relative overflow-hidden"
      data-purpose="hero-section"
    >
      {/* Subtitle Category Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#eae6df]/90 text-[#f05a22] text-xs font-semibold mb-4 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f05a22] animate-pulse"></span>
        기업을 위한 실전 AI Business Service
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.25] tracking-tight text-[#0f2439] mb-4">
        AI를 배우지 마세요,<br />
        <span className="text-[#f05a22] underline underline-offset-4 decoration-[#f05a22]/30">
          업무를 맡기세요.
        </span>
      </h1>

      {/* Sub Headline */}
      <p className="text-[15px] sm:text-base leading-relaxed text-gray-600 mb-6 font-normal max-w-2xl">
        복잡하고 번거로운 문서 검토부터 콘텐츠 제작, 웹 데이터 리서치, 마케팅 자동화까지.
        AI와 검증된 <strong className="text-[#0f2439] font-semibold">각 분야 전문가 팀이 책임지고 수행</strong>해 드립니다.
      </p>

      {/* Main Call to Action Area */}
      <div className="space-y-3 mb-8 max-w-md">
        <a
          id="hero-primary-cta"
          href="http://pf.kakao.com/_xnSxeiT/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-[#f05a22] text-white font-bold text-base shadow-highlight hover:bg-[#d94e1c] active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>카카오톡 상담신청 및 견적받기</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
          <span>
            도입 첫 달 체험 특가: <strong className="text-gray-800">월 300,000원</strong>부터
          </span>
        </div>
      </div>

      {/* Key Metrics Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] hover:border-[#0f2439]/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">320+</div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">실제 누적 기업 고객사</div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] hover:border-[#0f2439]/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-black text-[#f05a22] tracking-tight">48h</div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">평균 첫 결과물 전달</div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] hover:border-[#0f2439]/30 transition-colors">
          <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">
            <span>4.9</span>
            <div className="flex text-[#f05a22] text-sm">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">고객 업무 만족도 지수</div>
        </div>

        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-[#eae6df] hover:border-[#0f2439]/30 transition-colors">
          <div className="text-2xl sm:text-3xl font-black text-[#0f2439] tracking-tight">830만+</div>
          <div className="text-xs text-gray-500 font-medium mt-0.5">실제 절감 시간(분) 누적</div>
        </div>
      </div>

      {/* AI Agent Interface Simulator Card */}
      <div
        id="ai-preview-card"
        className="relative rounded-2xl overflow-hidden shadow-card border border-[#eae6df] bg-white transition-all duration-300"
        data-purpose="ai-preview-card"
      >
        <div className="h-52 sm:h-56 bg-gradient-to-tr from-stone-200 via-stone-100 to-amber-50/60 p-4 relative flex flex-col justify-between">
          {/* Floating Live Status Badge & Switchers */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0f2439] text-white text-[11px] font-medium shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span>
              AI 비서 엔진 : 실시간 가동 중
            </div>
            <span className="text-[11px] font-semibold text-gray-500 bg-white/80 px-2.5 py-0.5 rounded-md shadow-2xs">
              v3.4 PRO
            </span>
          </div>

          {/* Interactive Simulation Switcher Tabs */}
          <div className="flex items-center gap-1.5 self-start overflow-x-auto no-scrollbar py-1">
            {SIMULATION_TASKS.map((task, idx) => (
              <button
                key={task.id}
                onClick={() => setActiveTaskIndex(idx)}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                  idx === activeTaskIndex
                    ? 'bg-[#0f2439] text-white'
                    : 'bg-white/70 text-gray-600 hover:bg-white'
                }`}
              >
                예시 {idx + 1}: {task.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Simulated Interactive Dashboard Overlay */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-lg border border-gray-100 space-y-2.5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-md ${currentTask.iconBg} ${currentTask.iconColor} flex items-center justify-center text-xs font-bold`}
                >
                  <TaskIcon className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs font-bold text-gray-800">{currentTask.title}</div>
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                {currentTask.speed}
              </span>
            </div>

            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#f05a22] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${currentTask.progressPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 pt-0.5">
              <span className="font-medium text-gray-700 truncate mr-2">
                {currentTask.highlightText}
              </span>
              <span className="font-bold text-[#0f2439] shrink-0 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                {currentTask.reviewerText}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Under Card */}
        <div className="p-3.5 bg-[#0a1928] flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f05a22]"></span>
            <span className="font-medium text-gray-200">현재 대기 없이 1:1 전담 배정 가능</span>
          </div>
          <a
            href="http://pf.kakao.com/_xnSxeiT/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#f05a22] font-bold hover:underline flex items-center cursor-pointer"
          >
            카카오톡 배정 상담받기 <ChevronRight className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Client Trust Logotypes */}
      <div className="mt-8 pt-6 border-t border-[#eae6df]/60 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
          이미 유수 스타트업 및 중견기업이 함께합니다
        </p>
        <div className="flex items-center justify-around opacity-60 grayscale hover:grayscale-0 transition duration-300 space-x-4">
          <span className="font-black tracking-tighter text-sm md:text-base text-gray-700">GREENGATE</span>
          <span className="font-black tracking-tight text-sm md:text-base text-gray-700">MOVENT</span>
          <span className="font-extrabold tracking-wide text-sm md:text-base text-gray-700">NEXUS LAB</span>
          <span className="font-bold tracking-tight text-sm md:text-base text-gray-700">QUADCORE</span>
        </div>
      </div>
    </section>
  );
};
