import React, { useState, useEffect } from 'react';
import { Send, Lock, CheckCircle2, Sparkles, Check, Clock, Phone, Mail, MessageSquare } from 'lucide-react';
import { LeadFormData } from '../types';

interface LeadCaptureFormProps {
  selectedPlanId?: string;
  prefilledTaskType?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  selectedPlanId,
  prefilledTaskType
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    company: '',
    name: '',
    phone: '',
    email: '',
    taskType: prefilledTaskType || 'document',
    selectedPlan: selectedPlanId || 'business_pro',
    memo: '',
    contactMethod: 'phone'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [submittedHistory, setSubmittedHistory] = useState<LeadFormData[]>([]);

  useEffect(() => {
    if (selectedPlanId) {
      setFormData((prev) => ({ ...prev, selectedPlan: selectedPlanId }));
    }
  }, [selectedPlanId]);

  useEffect(() => {
    if (prefilledTaskType) {
      setFormData((prev) => ({ ...prev, taskType: prefilledTaskType }));
    }
  }, [prefilledTaskType]);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ai_assistant_inquiries');
      if (saved) {
        setSubmittedHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedModalOpen(true);

      const updatedHistory = [formData, ...submittedHistory];
      setSubmittedHistory(updatedHistory);
      try {
        localStorage.setItem('ai_assistant_inquiries', JSON.stringify(updatedHistory));
      } catch {
        // ignore
      }
    }, 600);
  };

  const getTaskSavingsEstimate = () => {
    switch (formData.taskType) {
      case 'document':
        return '월 평균 약 32시간 절감 예상';
      case 'content':
        return '월 평균 약 28시간 절감 예상';
      case 'research':
        return '월 평균 약 45시간 절감 예상';
      case 'data':
        return '월 평균 약 50시간 절감 예상';
      case 'custom':
        return '기업 전사 업무 효율 약 40% 증대';
      default:
        return '월 평균 약 30시간+ 절감 예상';
    }
  };

  return (
    <section
      id="lead-form"
      className="py-14 px-5 bg-[#0f2439] text-white relative overflow-hidden"
      data-purpose="lead-capture-form"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f05a22]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-md md:max-w-xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#f05a22] tracking-widest uppercase block mb-1">
            GET STARTED
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-2">
            AI를 배우지 말고,<br />
            업무를 바로 맡기세요.
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs sm:max-w-sm mx-auto">
            담당하고 계신 업무 유형을 간단히 남겨주시면 실무 가능 여부와 예상 절감 시간 견적서를
            보내드립니다.
          </p>
        </div>

        {/* Dynamic Estimated Impact Pill */}
        <div className="mb-4 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4 text-[#f05a22]" />
            <span>예상 도입 효과:</span>
          </div>
          <span className="font-bold text-white">{getTaskSavingsEstimate()}</span>
        </div>

        {/* Conversion Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 rounded-2xl p-5 sm:p-6 shadow-2xl border border-white/20 space-y-3.5"
        >
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              회사명 / 소속 브랜드 <span className="text-[#f05a22]">*</span>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none"
              placeholder="예: (주)에이아이랩"
              required
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                담당자 성함 &amp; 직함 <span className="text-[#f05a22]">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none"
                placeholder="예: 홍길동 팀장"
                required
                type="text"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                연락처 (휴대폰 번호) <span className="text-[#f05a22]">*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none"
                placeholder="예: 010-1234-5678"
                required
                type="tel"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              이메일 (견적서 수신용)
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none"
              placeholder="예: contact@company.com"
              type="email"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              맡기고 싶은 핵심 업무 분야 <span className="text-[#f05a22]">*</span>
            </label>
            <select
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none bg-white font-medium"
            >
              <option value="document">문서 검토 / 회의록 / 기획서 작성</option>
              <option value="content">마케팅 콘텐츠 / 블로그 / 보도자료</option>
              <option value="research">시장 조사 / 해외 데이터 리서치</option>
              <option value="data">데이터 수집 크롤링 / 엑셀 자동화</option>
              <option value="custom">사내 맞춤 AI 시스템 구축 상담</option>
              <option value="other">기타 실무 대행 (상담 시 협의)</option>
            </select>
          </div>

          {/* Preferred Communication Method */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              선호하는 소통 채널
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'phone', label: '전화 상담', icon: Phone },
                { id: 'kakao', label: '카카오톡', icon: MessageSquare },
                { id: 'email', label: '이메일', icon: Mail }
              ].map((channel) => (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      contactMethod: channel.id as 'phone' | 'email' | 'kakao' | 'slack'
                    }))
                  }
                  className={`py-2 px-2.5 rounded-xl border text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    formData.contactMethod === channel.id
                      ? 'border-[#f05a22] bg-[#fff4ee] text-[#f05a22]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <channel.icon className="w-3.5 h-3.5" />
                  <span>{channel.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              업무 요청 사항 및 참고 링크 (선택)
            </label>
            <textarea
              name="memo"
              rows={2}
              value={formData.memo}
              onChange={handleChange}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none resize-none"
              placeholder="예: 영문 계약서 3건의 독소조항을 이번 주 내로 검토받고 싶습니다."
            />
          </div>

          <div className="pt-2">
            <button
              id="submit-lead-form"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-[#f05a22] text-white font-bold text-sm shadow-highlight hover:bg-[#d94e1c] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>상담 신청 접수 중...</span>
                </>
              ) : (
                <>
                  <span>무료 견적 &amp; 1:1 상담 신청하기</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-[10px] text-center text-gray-400">
            신청 시 영업일 1시간 내 전담 매니저가 유선 또는 이메일로 회신합니다.
          </p>
        </form>

        {/* Trust Badges below form */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-[11px] text-gray-300 font-medium">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#f05a22]" />
            NDA 비밀유지 서약 보장
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#f05a22]" />
            무상 수정 제공
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#f05a22]" />
            영업일 1시간 내 신속 회신
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-gray-900 rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-[#eae6df] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#0f2439]">상담 신청 완료</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                <strong className="text-[#0f2439]">{formData.company}</strong> ({formData.name} 님)의
                상담 신청이 성공적으로 접수되었습니다.
              </p>
            </div>

            <div className="bg-[#f7f5f0] p-3.5 rounded-xl text-left text-xs space-y-1.5 border border-[#eae6df]">
              <div className="flex justify-between">
                <span className="text-gray-500">신청 업무:</span>
                <span className="font-bold text-[#0f2439]">
                  {formData.taskType === 'document' && '문서 검토 / 회의록 / 기획서'}
                  {formData.taskType === 'content' && '마케팅 콘텐츠 / 블로그 / 보도자료'}
                  {formData.taskType === 'research' && '시장 조사 / 해외 데이터 리서치'}
                  {formData.taskType === 'data' && '데이터 수집 / 엑셀 자동화'}
                  {formData.taskType === 'custom' && '사내 맞춤 AI 시스템 구축'}
                  {formData.taskType === 'other' && '기타 실무 대행'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">연락처:</span>
                <span className="font-medium text-gray-800">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">담당 매니저:</span>
                <span className="font-bold text-[#f05a22]">1시간 내 배정 및 연락 예정</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="http://pf.kakao.com/_xnSxeiT/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs transition flex items-center justify-center gap-2 border border-[#E6CF00]"
              >
                <span>지금 카카오톡으로 실시간 문의하기</span>
              </a>
              <button
                onClick={() => setSubmittedModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#0f2439] text-white font-semibold text-xs hover:bg-[#0a1928] transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
