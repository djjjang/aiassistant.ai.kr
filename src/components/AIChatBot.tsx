import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  Bot,
  User,
  PhoneCall,
  Calendar,
  Briefcase,
  HelpCircle,
  Minimize2
} from 'lucide-react';
import { ClientTaskItem, LeadFormData } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionType?: 'consultation' | 'pricing' | 'portfolio' | 'kakao' | 'form';
  suggestedActions?: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
    primary?: boolean;
  }>;
}

interface AIChatBotProps {
  onOpenConsultation?: (taskType?: string) => void;
  onOpenDashboard?: (tab?: 'tasks' | 'payments') => void;
  onOpenPayment?: () => void;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({
  onOpenConsultation,
  onOpenDashboard,
  onOpenPayment
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState<boolean>(true);
  const [showInChatForm, setShowInChatForm] = useState<boolean>(false);

  // Quick in-chat lead form state
  const [leadForm, setLeadForm] = useState({
    company: '',
    name: '',
    phone: '',
    taskType: 'ppt',
    memo: ''
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  const initialMessages: Message[] = [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `안녕하세요! 대한민국 1위 기업 실전 업무 대행 **AI비서**의 실시간 상담 어시스턴트입니다 🤖✨\n\n"AI를 배우지 마세요, 업무를 맡기세요!"\n\n사업계획서·IR피치덱, 계약서 검토, 디자인·상세페이지, 마케팅, 웹사이트 등 필요하신 업무나 요금제, 제작 기간에 대해 무엇이든 편하게 물어보세요.`,
      time: '방금 전'
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Quick Preset Questions
  const presetQuestions = [
    { label: '💡 어떤 업무들을 대행해 주나요?', query: 'AI비서에서 대행해주는 8대 핵심 업무와 서비스 종류를 알려주세요.' },
    { label: '⏱️ 작업 의뢰 후 납품까지 얼마나 걸리나요?', query: '의뢰하면 납품까지 얼마나 걸리나요? 긴급 요청도 가능한가요?' },
    { label: '💰 추천 요금제와 가격은 얼마인가요?', query: '추천 요금제와 각 플랜별 가격 및 혜택을 비교해 주세요.' },
    { label: '📊 IR 피치덱·사업계획서 제작은 어떻게 되나요?', query: 'IR 피치덱 및 사업계획서 제작 사례와 특징(원화 표기 등)을 알려주세요.' },
    { label: '🔒 기업 기밀(NDA) 및 보안은 안전한가요?', query: '의뢰하는 기밀 문서와 비즈니스 데이터의 보안 및 NDA 체결은 어떻게 되나요?' },
    { label: '📋 지금 무료 상담 신청하고 싶어요', query: '전문가 무료 1:1 상담을 신청하고 싶습니다. 어떻게 진행하나요?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowNotificationBadge(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, showInChatForm]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessageTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: userMessageTime
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call backend Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      let botReplyText = '';
      if (response.ok) {
        const data = await response.json();
        botReplyText = data.reply;
      } else {
        botReplyText = getLocalFallbackReply(text);
      }

      const botTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        time: botTime,
        suggestedActions: [
          {
            label: '📋 무료 상담 신청 폼으로 이동',
            action: () => handleScrollToLeadForm(),
            primary: true
          },
          {
            label: '✍️ 채팅에서 바로 간편 신청',
            action: () => setShowInChatForm(true)
          },
          {
            label: '💰 요금제 플랜 비교',
            action: () => handleScrollToPricing()
          }
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn('Chat fetch failed, using smart local fallback:', err);
      const fallbackReply = getLocalFallbackReply(text);
      const botTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: fallbackReply,
          time: botTime,
          suggestedActions: [
            {
              label: '📋 무료 상담 신청하기',
              action: () => handleScrollToLeadForm(),
              primary: true
            },
            {
              label: '✍️ 채팅에서 바로 간편 접수',
              action: () => setShowInChatForm(true)
            }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getLocalFallbackReply = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('요금') || q.includes('가격') || q.includes('비용') || q.includes('플랜') || q.includes('얼마')) {
      return `AI비서의 합리적인 요금제 안내드립니다 💼\n\n1. **베이직 스타터 (월 290,000원)**\n- 월 3건의 실무 태스크 (기본 문서/디자인/마케팅)\n- 72시간 이내 납품\n\n2. **비즈니스 프로 (월 590,000원) ★가장 인기**\n- 월 8건의 실무 태스크 (IR피치덱, 상세페이지, 웹, 마케팅 전 분야)\n- 48시간 이내 초안 납품 & 무제한 피드백\n- 전담 시니어 PM 배정\n\n3. **엔터프라이즈 맞춤 (월 1,490,000원)**\n- 무제한 업무 협의 & 24시간 긴급 패스트트랙\n- 전담 시니어 TF팀 & 법적 NDA 필수 체결\n\n4. **1회 단건 크레딧 충전**도 10만 원부터 가능합니다.\n\n고객님의 업무 규모에 딱 맞는 플랜을 무료로 추천받아 보시겠어요? 아래 **[무료 상담 신청 폼으로 이동]**을 클릭해 보세요!`;
    }

    if (q.includes('시간') || q.includes('기간') || q.includes('납품') || q.includes('얼마나 걸') || q.includes('일정') || q.includes('급')) {
      return `AI비서의 기본 제작 및 납품 시간은 **접수 후 24시간~48시간 이내**입니다 ⏱️\n\n- **일반 실무**: 48시간 이내 1차 완성본 납품\n- **긴급 패스트트랙**: 당일 24시간 이내 즉시 대응 가능 (엔터프라이즈 또는 긴급 크레딧)\n- **품질 보장**: 단순 AI 출력이 아닌, 10년 차 이상 시니어 전문가가 2차 검수 및 리터칭하여 바로 실전에서 사용하실 수 있습니다.\n\n급하신 프로젝트가 있으신가요? 지금 상담 신청해 주시면 오늘 즉시 작업 배정이 시작됩니다!`;
    }

    if (q.includes('ppt') || q.includes('피치덱') || q.includes('사업계획서') || q.includes('투자') || q.includes('ir') || q.includes('발표')) {
      return `AI비서의 시그니처 서비스는 **'IR 피치덱 & 사업계획서 16:9 와이드 제작'**입니다 📊\n\n- **실전 투자유치 사례 보유**: 글로벌 트렌드 리서치 (주)트렌드24의 Series A 투자유치 제안서 7슬라이드(원화 ₩ 정밀 변환, TAM 24.5조 원, 목표 매출 650억 원, 30억 투자유치 계획) 등 포트폴리오를 웹사이트에서 직접 확인하실 수 있습니다.\n- **전문 인포그래픽 & 재무 모델링**: 목차 구성, 스토리라인, 시장 분석 그래프까지 전문가가 직접 리터칭합니다.\n\n구상 중이신 사업계획서나 피치덱이 있으시다면 지금 바로 **[무료 상담 신청]**을 통해 검토를 요청해 보세요!`;
    }

    if (q.includes('보안') || q.includes('기밀') || q.includes('nda') || q.includes('안전') || q.includes('유출')) {
      return `AI비서는 고객사의 핵심 비즈니스 정보와 기밀을 철저히 보호합니다 🔒\n\n1. **100% 상호 비밀유지계약(NDA) 체결**: 전자서명을 통한 공식 NDA 체결\n2. **AI 데이터 재학습 불가(Zero-Retention)**: 고객사의 업로드 자료는 AI 모델의 학습 데이터로 일절 사용되지 않습니다.\n3. **전송 및 보관 암호화**: 엔터프라이즈급 암호화 서버 관리\n\n안심하시고 내부 문서나 기획안을 전달해 주셔도 좋습니다.`;
    }

    if (q.includes('서비스') || q.includes('업무') || q.includes('어떤') || q.includes('대행') || q.includes('종류')) {
      return `AI비서는 기업 실무에 필요한 **8대 핵심 영역**을 전문 대행합니다 ✨\n\n1. **IR 피치덱 & 사업계획서**: 투자유치, 정부지원사업, 공공입찰 제안서\n2. **계약서 & 법률문서 AI 검토**: 용역/제휴/NDA 계약서 독소조항 진단\n3. **디자인 & 상세페이지**: 와디즈/스토어 상세페이지, 광고 배너\n4. **마케팅 기획 & SNS 콘텐츠**: 보도자료 배포, 블로그 SEO, 카드뉴스\n5. **웹사이트 & 랜딩페이지**: 반응형 웹사이트, 소개 페이지 신속 제작\n6. **숏폼 & 홍보영상**: 릴스/쇼츠/틱톡 세로형 바이럴 영상, AI 음성 합성\n7. **글로벌 비즈니스 번역**: 영/일/중 바이어 제안서, 제품 매뉴얼 번역\n8. **데이터 리서치 & 시장조사**: 경쟁사 분석, 시장 규모(TAM) 리포트\n\n원하시는 분야를 말씀해주시면 샘플과 상세 견적을 안내해 드리겠습니다!`;
    }

    return `문의해 주셔서 감사합니다! 🤖\n\nAI비서는 **사업계획서/IR피치덱, 계약서 법무 검토, 상세페이지 디자인, 마케팅/보도자료, 웹사이트/영상 제작** 등 기업 실무를 48시간 내에 전문가가 완성해 드리는 솔루션입니다.\n\n현재 준비 중이신 프로젝트의 성격이나 희망 납기 일정을 알려주시면, 전문 PM이 30분 내로 최적의 제안과 맞춤 견적을 무료로 상담해 드립니다.\n\n아래 **[무료 상담 신청하기]** 버튼을 눌러보세요!`;
  };

  const handleResetChat = () => {
    setMessages(initialMessages);
    setShowInChatForm(false);
  };

  const handleScrollToLeadForm = (taskType?: string) => {
    setIsOpen(false);
    if (onOpenConsultation) {
      onOpenConsultation(taskType || 'ppt');
    } else {
      const el = document.getElementById('lead-form');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPricing = () => {
    setIsOpen(false);
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPortfolio = () => {
    setIsOpen(false);
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Submit in-chat consultation form
  const handleInChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) {
      alert('성함(담당자)과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmittingLead(true);

    setTimeout(() => {
      const taskId = `TASK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

      const newTaskItem: ClientTaskItem = {
        id: taskId,
        createdAt: new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        company: leadForm.company || '(회사명 미입력)',
        requesterName: leadForm.name,
        phone: leadForm.phone,
        email: '',
        taskType: leadForm.taskType,
        taskTypeName:
          leadForm.taskType === 'ppt'
            ? 'PPT 제작 (사업계획서·투자제안서)'
            : leadForm.taskType === 'contract'
            ? '계약서 업무 (용역·납품·제휴 검토)'
            : leadForm.taskType === 'design'
            ? '디자인 업무 (상세페이지·배너)'
            : leadForm.taskType === 'marketing'
            ? '마케팅 업무 (SNS자동화·보도자료)'
            : leadForm.taskType === 'website'
            ? '사이트 제작 (홈페이지·쇼핑몰)'
            : leadForm.taskType === 'video'
            ? '영상 제작 (숏폼 바이럴·영상편집)'
            : '맞춤 실무 의뢰',
        title: leadForm.memo ? leadForm.memo.slice(0, 30) : `${leadForm.company || leadForm.name} 실무 상담 접수`,
        memo: leadForm.memo || 'AI 챗봇을 통한 실시간 간편 상담 접수 건',
        status: 'received',
        priority: 'normal',
        assignedManager: '이수민 시니어 PM (신속 배정)',
        progressPercent: 20,
        estimatedCompletion: '48시간 이내 납품 예정',
        reviewNotes: 'AI 챗봇 간편 접수 완료. 30분 이내 유선/카카오톡으로 사전 진단 상담이 진행됩니다.',
        contactMethod: 'phone',
        selectedPlan: 'business_pro'
      };

      try {
        const poolStr = localStorage.getItem('client_tasks_pool');
        const pool = poolStr ? JSON.parse(poolStr) : [];
        localStorage.setItem('client_tasks_pool', JSON.stringify([newTaskItem, ...pool]));

        const inqStr = localStorage.getItem('ai_assistant_inquiries');
        const inqList = inqStr ? JSON.parse(inqStr) : [];
        const inqData: LeadFormData = {
          company: leadForm.company,
          name: leadForm.name,
          phone: leadForm.phone,
          email: '',
          taskType: leadForm.taskType,
          selectedPlan: 'business_pro',
          memo: leadForm.memo,
          contactMethod: 'phone'
        };
        localStorage.setItem('ai_assistant_inquiries', JSON.stringify([inqData, ...inqList]));
      } catch (err) {
        console.error(err);
      }

      setIsSubmittingLead(false);
      setShowInChatForm(false);
      setLeadForm({ company: '', name: '', phone: '', taskType: 'ppt', memo: '' });

      const botTime = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-confirm-${Date.now()}`,
          sender: 'bot',
          text: `🎉 **${leadForm.name}** 고객님의 실시간 상담 신청이 정상 접수되었습니다!\n\n- **접수 번호**: \`${taskId}\`\n- **의뢰 분야**: ${newTaskItem.taskTypeName}\n- **진행 상태**: 전담 시니어 PM 배정 중 (30분 이내 유선 또는 메시지로 맞춤 견적 및 계획을 안내해 드립니다.)\n\n[내 신청 현황] 버튼을 누르시면 마이페이지 대시보드에서 실시간 진행 현황을 확인하실 수 있습니다.`,
          time: botTime,
          suggestedActions: [
            {
              label: '📊 대시보드에서 신청 현황 보기',
              action: () => {
                setIsOpen(false);
                if (onOpenDashboard) onOpenDashboard('tasks');
              },
              primary: true
            },
            {
              label: '📁 포트폴리오 사례 구경하기',
              action: () => handleScrollToPortfolio()
            }
          ]
        }
      ]);
    }, 700);
  };

  return (
    <>
      {/* Floating Launcher Button inside container */}
      <div className="relative flex items-center shrink-0">
        {/* Floating Tooltip Bubble when closed */}
        {!isOpen && showNotificationBadge && (
          <div className="hidden lg:flex absolute bottom-full right-0 mb-3 items-center gap-2 bg-[#0f2439] text-white text-xs px-3.5 py-2 rounded-full shadow-2xl border border-amber-400/40 whitespace-nowrap animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-medium">궁금한 점이 있으신가요? AI에게 물어보세요!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBadge(false);
              }}
              className="text-slate-400 hover:text-white ml-1 text-sm leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        <button
          id="open-ai-chatbot-btn"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="AI 실시간 업무 상담 비서 열기"
          className="group relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#0f2439] via-[#1a365d] to-[#1e40af] text-white px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full shadow-2xl active:scale-95 hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer border border-blue-400/30 select-none"
        >
          <span className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500/20 text-blue-300">
            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0f2439] animate-pulse" />
          </span>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[9px] sm:text-[10px] font-semibold text-blue-200/90 -mb-0.5">실시간 AI</span>
            <span className="text-[11px] sm:text-xs font-black tracking-tight text-white flex items-center gap-1">
              상담 비서
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300 inline" />
            </span>
          </div>
        </button>
      </div>

      {/* Interactive Chat Window Modal / Drawer */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[640px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
          style={{ boxShadow: '0 25px 60px -15px rgba(15, 36, 57, 0.35)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0f2439] via-[#162e4a] to-[#1e3a8a] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-blue-200" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0f2439]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold tracking-tight text-white">AI 실시간 업무 상담 비서</h3>
                  <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded font-mono font-medium">Gemini 3.8</span>
                </div>
                <p className="text-[11px] text-blue-200/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  실시간 응답 가능 · 48시간 내 완성 보장
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={handleResetChat}
                title="대화 초기화"
                aria-label="대화 초기화"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="닫기"
                aria-label="상담창 닫기"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Top Bar */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-3 py-2 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-500 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-500" />
              어떤 업무든 질문하시면 바로 견적과 일정을 제안해 드립니다.
            </span>
            <button
              onClick={() => handleScrollToLeadForm()}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 cursor-pointer shrink-0 ml-1"
            >
              상담신청 폼 <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8fafc]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#0f2439] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4 text-blue-300" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs font-normal'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/90 whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.time}
                  </span>

                  {/* Bot Suggested Actions Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 w-full">
                      {msg.suggestedActions.map((act, i) => (
                        <button
                          key={i}
                          onClick={act.action}
                          className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all duration-150 flex items-center gap-1 cursor-pointer active:scale-95 ${
                            act.primary
                              ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-xs'
                              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs'
                          }`}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* In-Chat Consultation Form Drawer */}
            {showInChatForm && (
              <div className="bg-white rounded-xl border-2 border-blue-500/40 p-4 shadow-lg animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-slate-900">채팅으로 즉시 1:1 상담 접수</h4>
                  </div>
                  <button
                    onClick={() => setShowInChatForm(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <form onSubmit={handleInChatSubmit} className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">회사명 / 소속</label>
                      <input
                        type="text"
                        placeholder="(주)트렌드24"
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">담당자명 *</label>
                      <input
                        type="text"
                        required
                        placeholder="홍길동 대표"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">연락처 (휴대전화) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="010-1234-5678"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">의뢰 분야</label>
                    <select
                      value={leadForm.taskType}
                      onChange={(e) => setLeadForm({ ...leadForm, taskType: e.target.value })}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    >
                      <option value="ppt">IR 피치덱 & 사업계획서 (PPT)</option>
                      <option value="contract">계약서 & 법률문서 AI 검토</option>
                      <option value="design">디자인 & 상세페이지/배너</option>
                      <option value="marketing">마케팅 & 보도자료/SNS 콘텐츠</option>
                      <option value="website">웹사이트 & 랜딩페이지 구축</option>
                      <option value="video">숏폼 & 바이럴 영상 제작</option>
                      <option value="other">기타 맞춤 실무 업무</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">간략한 요청 내용 (선택)</label>
                    <textarea
                      rows={2}
                      placeholder="예: Series A 투자유치용 15장 내외 피치덱 제작이 급합니다."
                      value={leadForm.memo}
                      onChange={(e) => setLeadForm({ ...leadForm, memo: e.target.value })}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 resize-none"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowInChatForm(false)}
                      className="text-xs px-3 py-1.5 text-slate-500 hover:text-slate-700 cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingLead}
                      className="text-xs px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1 active:scale-95 transition cursor-pointer disabled:opacity-50"
                    >
                      {isSubmittingLead ? (
                        <>접수 중...</>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          무료 상담 접수
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-[#0f2439] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-blue-300" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-xs text-slate-500">AI 비서가 최적의 답변을 작성 중입니다...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Questions Chips Carousel */}
          <div className="bg-slate-100/90 border-t border-slate-200 px-3 py-2 shrink-0 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 min-w-max">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mr-1">
                <HelpCircle className="w-3 h-3 text-blue-500" />
                추천 질문:
              </span>
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.query)}
                  disabled={isLoading}
                  className="text-[11px] bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs transition active:scale-95 cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Consultation Callout Bar */}
          <div className="bg-amber-50/90 border-t border-amber-200/70 px-3 py-1.5 flex items-center justify-between text-xs shrink-0">
            <span className="text-[11px] text-amber-900 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-600" />
              지금 상담 신청하시면 30분 내로 전담 PM이 연락드립니다!
            </span>
            <button
              onClick={() => setShowInChatForm((prev) => !prev)}
              className="text-[11px] font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 px-2 py-0.5 rounded shadow-2xs cursor-pointer active:scale-95"
            >
              간편 신청 열기
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="궁금하신 업무, 소요 시간, 비용 등을 입력해 보세요..."
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 placeholder:text-slate-400 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                aria-label="메시지 전송"
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                상담 내용은 100% 암호화 및 비공개 처리됩니다.
              </span>
              <span>Enter 키로 전송</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
