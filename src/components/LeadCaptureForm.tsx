import React, { useState, useEffect } from 'react';
import { Send, Check, MessageSquare, Copy } from 'lucide-react';
import { LeadFormData } from '../types';

// 상담 신청은 카카오톡 채널(공동 관리)로 받는다.
// 채널은 폼 내용을 자동으로 받을 수 없으므로, 신청 내용을 복사해 두고 채팅창을 열어 붙여넣게 한다.
import { KAKAO_CHAT_URL } from '../config/contact';
export { KAKAO_CHAT_URL };

export const TASK_TYPE_NAMES: Record<string, string> = {
  ppt: 'PPT 제작 (사업계획서·제안서)',
  contract: '계약서 초안·쟁점 정리',
  design: '디자인 (포스터·카드뉴스·배너·상세페이지)',
  marketing: '마케팅 (SNS·블로그·보도자료 초안)',
  website: '사이트 제작 (홈페이지·쇼핑몰)',
  video: '영상 제작 (숏폼·영상 편집)',
  other: '기타 (상담 시 협의)'
};

interface LeadCaptureFormProps {
  selectedPlanId?: string;
  prefilledTaskType?: string;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ prefilledTaskType }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    company: '',
    name: '',
    phone: '',
    taskType: prefilledTaskType && TASK_TYPE_NAMES[prefilledTaskType] ? prefilledTaskType : 'ppt',
    memo: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (prefilledTaskType && TASK_TYPE_NAMES[prefilledTaskType]) {
      setFormData((prev) => ({ ...prev, taskType: prefilledTaskType }));
    }
  }, [prefilledTaskType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const message = [
    '[AI비서 상담 신청]',
    `회사/브랜드: ${formData.company}`,
    `담당자: ${formData.name}`,
    `연락처: ${formData.phone}`,
    `맡기고 싶은 일: ${TASK_TYPE_NAMES[formData.taskType] || formData.taskType}`,
    formData.memo ? `요청 내용: ${formData.memo}` : ''
  ]
    .filter(Boolean)
    .join('\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCopied(false);
    setModalOpen(true);
  };

  // 복사와 창 열기를 한 번의 클릭 안에서 처리해야 팝업 차단에 걸리지 않음
  const copyAndOpenKakao = () => {
    navigator.clipboard
      ?.writeText(message)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
    window.open(KAKAO_CHAT_URL, '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full px-3.5 py-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] transition outline-none';

  return (
    <section
      id="lead-form"
      className="py-14 px-5 bg-[#0f2439] text-white relative overflow-hidden"
      data-purpose="lead-capture-form"
    >
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#f05a22]/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#f05a22] tracking-widest uppercase block mb-1">
            상담 신청
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3">
            AI를 배우지 말고,<br />
            업무를 바로 맡기세요.
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
            맡기고 싶은 일을 남겨 주시면 카카오톡으로 상담해 드립니다.
            <br />
            상담과 견적은 무료입니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white text-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/20 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              회사명 / 브랜드 <span className="text-[#f05a22]">*</span>
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="예: OO상사"
              required
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                담당자 성함 <span className="text-[#f05a22]">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="예: 홍길동"
                required
                type="text"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                연락처 <span className="text-[#f05a22]">*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="예: 010-1234-5678"
                required
                type="tel"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              맡기고 싶은 일 <span className="text-[#f05a22]">*</span>
            </label>
            <select
              name="taskType"
              value={formData.taskType}
              onChange={handleChange}
              className={`${inputClass} bg-white font-medium`}
            >
              {Object.entries(TASK_TYPE_NAMES).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">
              요청 내용 (선택)
            </label>
            <textarea
              name="memo"
              rows={3}
              value={formData.memo}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              placeholder="예: 다음 주까지 회사 소개서 10장 정도가 필요합니다."
            />
          </div>

          <button
            id="submit-lead-form"
            className="w-full py-4 rounded-xl bg-[#f05a22] text-white font-bold text-base hover:bg-[#d94e1c] active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
            type="submit"
          >
            <span>카카오톡으로 상담 신청하기</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-300">
          작성이 번거로우시면{' '}
          <a
            href={KAKAO_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#FEE500] underline underline-offset-4"
          >
            카카오톡 채팅으로 바로 물어보세요
          </a>
        </p>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white text-gray-900 rounded-2xl w-full max-w-md p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FEE500] flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 fill-[#191919] text-[#191919]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0f2439]">마지막 한 단계만 남았어요</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                아래 버튼을 누르면 신청 내용이 복사되고 카카오톡 상담창이 열립니다.
                <br />
                <strong className="text-[#0f2439]">채팅창에 붙여넣고 보내 주시면</strong> 접수됩니다.
              </p>
            </div>

            <pre className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-left text-xs text-gray-700 whitespace-pre-wrap select-all">
              {message}
            </pre>

            <div className="space-y-2">
              <button
                type="button"
                onClick={copyAndOpenKakao}
                className="w-full py-3.5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '복사됨 — 카카오톡에 붙여넣어 주세요' : '내용 복사하고 카카오톡 열기'}</span>
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition cursor-pointer"
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
