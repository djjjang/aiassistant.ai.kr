import React, { useState } from 'react';
import { ShieldCheck, Award, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { TEAM_MEMBERS } from '../data';
import { TeamMember } from '../types';

export const ExpertTeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      id="expert-team"
      className="py-14 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      data-purpose="expert-team"
    >
      <div className="mb-8 text-left">
        <span className="text-xs font-bold text-[#f05a22] tracking-wider uppercase mb-1 block">
          HUMAN IN THE LOOP
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0f2439] leading-snug">
          AI와 함께 일하는<br />
          검증된 전문가 팀
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed max-w-3xl">
          AI가 초안을 완성하고, 분야별 현업 5년 차 이상의 전문 인력이{' '}
          <strong className="text-[#0f2439]">정밀 검수(Human Review)</strong>를 거쳐
          무결점의 고품질 결과물만을 납품합니다.
        </p>
      </div>

      {/* Team Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {TEAM_MEMBERS.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-white rounded-2xl overflow-hidden border border-[#eae6df] shadow-2xs flex flex-col hover:shadow-xl hover:border-[#0f2439]/40 transition-all cursor-pointer group"
          >
            {/* Image Container with Gradient Overlay */}
            <div className="h-64 sm:h-72 lg:h-80 relative bg-stone-200 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                  {member.role}
                </span>
                <h4 className="text-lg font-bold text-white flex items-center justify-between">
                  <span>{member.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </h4>
                <p className="text-xs text-gray-200 mt-0.5">{member.experience}</p>
              </div>

              {/* Tag pill top right */}
              <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${member.badgeBg}`}>
                {member.tag}
              </span>
            </div>

            {/* Bottom Info Bar */}
            <div className="p-3.5 bg-white flex items-center justify-between text-xs border-t border-gray-100">
              <span className="text-gray-600 font-medium truncate mr-2">{member.scope}</span>
              <span className="text-[#0f2439] font-bold shrink-0 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {member.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-[#eae6df]">
            <div className="relative h-48 bg-stone-200">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-3 text-white">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                  {selectedMember.role}
                </span>
                <h3 className="text-base font-bold">{selectedMember.name}</h3>
              </div>
            </div>

            <div className="p-4 space-y-3 text-xs">
              <div>
                <span className="font-bold text-gray-900 block mb-1">경력 및 주요 이력</span>
                <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
              </div>

              <div className="p-3 bg-[#fbf9f5] rounded-xl border border-[#eae6df] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-gray-800">
                  <Award className="w-3.5 h-3.5 text-[#f05a22]" />
                  <span>검수 및 수행 범위</span>
                </div>
                <p className="text-gray-600">{selectedMember.scope}</p>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>AI가 놓치기 쉬운 문맥, 법률 용어, 사실관계를 1:1 교차 검증합니다.</span>
              </div>

              <button
                onClick={() => {
                  setSelectedMember(null);
                  const el = document.getElementById('lead-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-[#f05a22] text-white font-bold hover:bg-[#d94e1c] transition"
              >
                {selectedMember.name} 전담 매칭 문의하기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
