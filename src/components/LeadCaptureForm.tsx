import React, { useState, useEffect } from 'react';
import { Send, Lock, CheckCircle2, Sparkles, Check, Clock, Phone, Mail, MessageSquare, CreditCard, Coins, Bell, ExternalLink } from 'lucide-react';
import { LeadFormData, ClientTaskItem } from '../types';

interface LeadCaptureFormProps {
  selectedPlanId?: string;
  prefilledTaskType?: string;
  onOpenPayment?: () => void;
  onOpenMyPage?: () => void;
  userCredits?: number;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  selectedPlanId,
  prefilledTaskType,
  onOpenPayment,
  onOpenMyPage,
  userCredits = 0
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    company: '',
    name: '',
    phone: '',
    email: '',
    taskType: prefilledTaskType || 'document',
    selectedPlan: selectedPlanId || 'business_pro',
    memo: '',
    contactMethod: 'kakao'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [submittedHistory, setSubmittedHistory] = useState<LeadFormData[]>([]);
  const [submittedTaskId, setSubmittedTaskId] = useState<string>('');

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

    const generatedTaskId = `TASK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`;
    setSubmittedTaskId(generatedTaskId);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedModalOpen(true);

      const updatedHistory = [formData, ...submittedHistory];
      setSubmittedHistory(updatedHistory);
      try {
        localStorage.setItem('ai_assistant_inquiries', JSON.stringify(updatedHistory));

        // Sync to real-time client task pool for Admin Dashboard & MyPage
        const newTaskItem: ClientTaskItem = {
          id: generatedTaskId,
          createdAt: new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }),
          company: formData.company,
          requesterName: formData.name,
          phone: formData.phone,
          email: formData.email,
          taskType: formData.taskType,
          taskTypeName:
            formData.taskType === 'ppt'
              ? 'PPT 제작 (사업계획서·투자제안서)'
              : formData.taskType === 'contract'
              ? '계약서 업무 (용역·납품·제휴 검토)'
              : formData.taskType === 'design'
              ? '디자인 업무 (상세페이지·배너)'
              : formData.taskType === 'marketing'
              ? '마케팅 업무 (SNS자동화·보도자료)'
              : formData.taskType === 'website'
              ? '사이트 제작 (홈페이지·쇼핑몰)'
              : formData.taskType === 'video'
              ? '영상 제작 (숏폼 바이럴·영상편집)'
              : formData.taskType === 'document'
              ? '문서·기획 검토'
              : formData.taskType === 'content'
              ? '콘텐츠·마케팅'
              : '맞춤 실무 의뢰',
          title: formData.memo
            ? (formData.memo.length > 35 ? formData.memo.slice(0, 35) + '...' : formData.memo)
            : `${formData.company} 실무 의뢰 건`,
          memo: formData.memo || `${formData.taskType} 분야 관련 실무 지원 의뢰`,
          status: 'received',
          priority: 'normal',
          assignedManager: '김민서 수석 매니저 (IR·기획)',
          progressPercent: 20,
          estimatedCompletion: '48시간 이내 납품 예정',
          reviewNotes: '신규 접수 완료. 전담 매니저 배정 및 사전 요구사항 분석 준비 중입니다.',
          contactMethod: formData.contactMethod || 'kakao',
          selectedPlan: formData.selectedPlan,
          kakaoNotificationSent: true,
          kakaoNotificationTime: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };

        const existingPoolStr = localStorage.getItem('client_tasks_pool');
        const pool = existingPoolStr ? JSON.parse(existingPoolStr) : [];
        localStorage.setItem('client_tasks_pool', JSON.stringify([newTaskItem, ...pool]));
      } catch {
        // ignore
      }
    }, 600);
  };

  const getTaskSavingsEstimate = () => {
    switch (formData.taskType) {
      case 'ppt':
        return '월 평균 약 35시간 절감 예상 (사업계획서·IR)';
      case 'contract':
        return '월 평균 약 28시간 절감 예상 (법무 검토·조항대조)';
      case 'design':
        return '월 평균 약 40시간 절감 예상 (상세페이지·배너)';
      case 'marketing':
        return '월 평균 약 32시간 절감 예상 (SNS자동화·보도자료)';
      case 'website':
        return '월 평균 약 50시간 절감 예상 (홈페이지·쇼핑몰구축)';
      case 'video':
        return '월 평균 약 45시간 절감 예상 (숏폼·영상편집)';
      case 'document':
        return '월 평균 약 32시간 절감 예상';
      case 'content':
        return '월 평균 약 28시간 절감 예상';
      default:
        return '월 평균 약 35시간+ 실무 시간 절감';
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

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#f05a22] tracking-widest uppercase block mb-1">
            GET STARTED
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
            AI를 배우지 말고,<br />
            업무를 바로 맡기세요.
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
            담당하고 계신 업무 유형을 간단히 남겨주시면 실무 가능 여부와 예상 절감 시간 견적서를
            빠르게 회신해 드립니다.
          </p>
        </div>

        {/* Credit & Instant Payment Banner */}
        {onOpenPayment && (
          <div className="mb-4 bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-white">
              <Coins className="w-4 h-4 text-[#f05a22] shrink-0" />
              <span>
                {userCredits > 0 ? (
                  <>현재 보유 크레딧: <strong className="text-[#f05a22] font-black">{userCredits} C</strong> (즉시 차감 가능)</>
                ) : (
                  <>구독 플랜 또는 크레딧 충전 후 즉시 실무를 시작하시겠어요?</>
                )}
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenPayment}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#f05a22] hover:bg-[#d94e1c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm cursor-pointer shrink-0"
            >
              <CreditCard className="w-4 h-4" />
              <span>{userCredits > 0 ? '크레딧 추가 충전' : '카드 / 간편결제 바로가기'}</span>
            </button>
          </div>
        )}

        {/* KakaoTalk Notification Reassurance Banner */}
        <div className="mb-4 bg-[#FEE500]/15 backdrop-blur-xs border border-[#FEE500]/40 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-white">
          <div className="flex items-center gap-2 text-amber-200">
            <Bell className="w-4 h-4 text-[#FEE500] shrink-0 animate-bounce" />
            <span>
              상담 신청 완료 시 <strong className="text-white">카카오톡 알림톡</strong>으로 접수 확인 및 견적이 자동 전송됩니다.
            </span>
          </div>
          <a
            href="http://pf.kakao.com/_xnSxeiT/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-[11px] flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer shrink-0"
            title="카카오톡 1:1 공식 상담 채널"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-[#191919]" />
            <span>카톡 실시간 상담 채널</span>
          </a>
        </div>

        {/* Dynamic Estimated Impact Pill */}
        <div className="mb-5 bg-white/10 backdrop-blur-xs border border-white/15 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <Sparkles className="w-4 h-4 text-[#f05a22]" />
            <span>예상 도입 효과:</span>
          </div>
          <span className="font-bold text-white">{getTaskSavingsEstimate()}</span>
        </div>

        {/* Conversion Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-4"
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
              <option value="ppt">1. PPT 제작 (사업계획서, 투자제안서, 피치덱)</option>
              <option value="contract">2. 계약서 업무 (용역, 납품, 투자, 제휴 등 작성 및 검토)</option>
              <option value="design">3. 디자인 업무 (포스터, 카드뉴스, 배너, 상세페이지 등)</option>
              <option value="marketing">4. 마케팅 업무 (SNS 블로그/인스타 자동화, 보도자료 초안)</option>
              <option value="website">5. 사이트 제작 (홈페이지, 쇼핑몰 제작)</option>
              <option value="video">6. 영상 제작 (숏폼 바이럴, 릴스/쇼츠, 영상 편집)</option>
              <option value="other">기타 맞춤 실무 의뢰 (상담 시 협의)</option>
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

      {/* Confirmation Modal with KakaoTalk Notification */}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-[#eae6df] text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE500]/30 text-[#3C1E1E] text-xs font-bold border border-[#FEE500] mb-2">
                <Bell className="w-3.5 h-3.5 text-[#3C1E1E]" />
                <span>카카오톡 알림톡 발송 완료</span>
              </div>
              <h3 className="text-xl font-black text-[#0f2439]">상담 신청이 접수되었습니다</h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                <strong className="text-[#0f2439]">{formData.company}</strong> ({formData.name} 님)의
                의뢰가 안전하게 접수되었습니다.
              </p>
            </div>

            {/* Kakao Alimtalk Preview Box */}
            <div className="bg-[#FFFCE6] p-3.5 rounded-xl text-left text-xs space-y-1.5 border border-[#F7E68E]">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#E8D676]/60">
                <span className="font-bold text-[#3C1E1E] flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 fill-[#3C1E1E]" />
                  카카오 알림톡 실시간 전송 내역
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                  전송 성공
                </span>
              </div>
              <div className="flex justify-between text-gray-700 pt-1">
                <span className="text-gray-500">접수 번호:</span>
                <span className="font-mono font-bold text-[#0f2439]">{submittedTaskId}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-gray-500">수신 연락처:</span>
                <span className="font-medium text-gray-900">{formData.phone}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="text-gray-500">담당 매니저:</span>
                <span className="font-bold text-[#f05a22]">김민서 수석 매니저 (30분 내 응대)</span>
              </div>
              <p className="text-[11px] text-[#5c4a1e] pt-1 leading-relaxed bg-white/70 p-2 rounded-lg border border-[#f0de7e]">
                💡 고객님의 카카오톡으로 안내 메시지가 발송되었습니다. 채팅창에서 추가 자료나 세부 요구사항을 편하게 보내주세요.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="http://pf.kakao.com/_xnSxeiT/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs transition flex items-center justify-center gap-2 border border-[#E6CF00] shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-[#191919]" />
                <span>카카오톡 1:1 채팅으로 바로 상담 이어하기</span>
              </a>

              {onOpenMyPage && (
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedModalOpen(false);
                    onOpenMyPage();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0f2439] hover:bg-slate-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>마이페이지에서 내 실시간 진행 현황 보기</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSubmittedModalOpen(false)}
                className="w-full py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
