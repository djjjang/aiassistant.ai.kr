import React from 'react';
import { ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      numBg: 'bg-[#0f2439]',
      title: '업무 요청서 간편 접수',
      description:
        '원하는 결과물 형태와 참고 자료를 슬랙, 카카오톡 또는 전용 포털로 편하게 공유합니다.',
      tag: '소요 5분'
    },
    {
      num: '02',
      numBg: 'bg-[#f05a22]',
      title: 'AI 엔진 가동 & 최적 툴 매칭',
      description:
        '업무 성격에 맞춰 자체 최적화된 산업별 특화 LLM 모델과 자동화 스크립트를 즉시 가동합니다.',
      tag: '즉시 착수'
    },
    {
      num: '03',
      numBg: 'bg-[#0f2439]',
      title: '전담 전문가의 검수 (Human Review)',
      description:
        'AI가 작성한 결과물의 팩트체크, 표현 윤문, 논리적 오류를 전담 매니저가 직접 다듬습니다.',
      tag: '5년차 전문 검수'
    },
    {
      num: '04',
      numBg: 'bg-green-600',
      title: '완성본 전달 & 무제한 수정 보완',
      description:
        '영업일 기준 48시간 이내 결과물을 전달하며, 피드백에 맞춰 신속하게 추가 보완해 드립니다.',
      tag: '48시간 완료'
    }
  ];

  return (
    <section
      id="process-timeline"
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#eae6df]"
      data-purpose="process-timeline"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#f05a22] uppercase tracking-wider block mb-1">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2439]">
            요청부터 전달까지,<br />
            평균 48시간
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            간소화된 4단계 프로세스로 사내 실무 병목을 즉각 해소합니다
          </p>
        </div>

        {/* Step Items Grid (4 Columns on PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 rounded-2xl bg-[#fbf9f5] border border-[#eae6df] hover:border-[#0f2439]/40 hover:shadow-md transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${step.numBg} text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    {step.num}
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0f2439] mb-2">{step.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee callout */}
        <div className="mt-6 p-4 rounded-xl bg-orange-50/70 border border-[#f05a22]/20 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#f05a22] shrink-0" />
          <p className="text-xs text-gray-700 leading-snug">
            <strong className="text-[#0f2439]">100% 만족 보장제:</strong> 첫 결과물에 만족하지
            못하실 경우 전액 환불 또는 무상 재작업을 약속드립니다.
          </p>
        </div>
      </div>
    </section>
  );
};
