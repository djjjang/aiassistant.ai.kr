import React, { useState, useEffect } from 'react';
import {
  X,
  CreditCard,
  Building2,
  Coins,
  CheckCircle2,
  Clock,
  Printer,
  ArrowRight,
  Sparkles,
  Receipt,
  Copy,
  Check,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Lock,
  ListTodo,
  User,
  LogOut,
  MessageSquare,
  Bell,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { PaymentReceipt, PaymentItemSelection, AuthUser } from '../types';
import { PRICING_PLANS } from '../data';
import { DERMAPINK_BANK_INFO } from './PaymentModal';
import { CustomerTaskHistory } from './CustomerTaskHistory';
import { SAMPLE_USERS, loginWithKakao, loginWithEmailOrPhone } from '../utils/auth';

interface MyDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCredits: number;
  selectedPlanId: string;
  onOpenPayment: (selection?: PaymentItemSelection) => void;
  onOpenConsultation: () => void;
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onLogout: () => void;
  onOpenAdminDashboard?: () => void;
  initialTab?: 'tasks' | 'payments' | 'notifications';
}

export const MyDashboardModal: React.FC<MyDashboardModalProps> = ({
  isOpen,
  onClose,
  userCredits,
  selectedPlanId,
  onOpenPayment,
  onOpenConsultation,
  currentUser,
  onLogin,
  onLogout,
  onOpenAdminDashboard,
  initialTab = 'tasks'
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'payments' | 'notifications'>(initialTab);
  const [history, setHistory] = useState<PaymentReceipt[]>([]);
  const [filterMethod, setFilterMethod] = useState<'all' | 'card' | 'transfer' | 'easy'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Login form state
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCompany, setLoginCompany] = useState('');
  const [loginError, setLoginError] = useState('');

  // Notification test popup state
  const [kakaoTestSent, setKakaoTestSent] = useState(false);

  // Notification toggles
  const [notiReceipt, setNotiReceipt] = useState(true);
  const [notiPmAssigned, setNotiPmAssigned] = useState(true);
  const [notiProgress, setNotiProgress] = useState(true);
  const [notiDeliverable, setNotiDeliverable] = useState(true);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load payment history
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('payment_history');
      if (stored) {
        setHistory(JSON.parse(stored));
      } else {
        const initialSample: PaymentReceipt[] = [
          {
            orderId: 'ORD-20250918-01',
            paidAt: new Date().toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            }),
            itemTitle: '비즈니스 프로 플랜 (월간 결제)',
            amount: 649000,
            paymentMethod: 'card',
            buyerName: currentUser ? currentUser.name : '고객 회원',
            buyerEmail: currentUser ? currentUser.email : 'client@business.com',
            buyerPhone: currentUser ? currentUser.phone : '010-0000-0000',
            buyerCompany: currentUser ? currentUser.company : '주식회사 파트너스',
            taxInvoiceRequested: true,
            taxBusinessNumber: '123-86-00000',
            activatedPlanId: 'business_pro'
          }
        ];
        setHistory(initialSample);
        localStorage.setItem('payment_history', JSON.stringify(initialSample));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadHistory();
      setKakaoTestSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const handleCopyBank = () => {
    navigator.clipboard.writeText(DERMAPINK_BANK_INFO.accountNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleKakaoLoginClick = () => {
    const user = loginWithKakao('카카오 대표 회원');
    onLogin(user);
  };

  const handleEmailPhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim()) {
      setLoginError('이름 또는 대표자명을 입력해 주세요.');
      return;
    }
    if (!loginPhone.trim() && !loginEmail.trim()) {
      setLoginError('휴대전화 번호 또는 이메일을 입력해 주세요.');
      return;
    }
    setLoginError('');
    const user = loginWithEmailOrPhone({
      name: loginName.trim(),
      phone: loginPhone.trim() || '010-0000-0000',
      email: loginEmail.trim() || 'client@business.co.kr',
      company: loginCompany.trim() || '주식회사 파트너스'
    });
    onLogin(user);
  };

  const handleSampleUserLogin = (sample: AuthUser) => {
    onLogin(sample);
  };

  const handleTriggerKakaoTest = () => {
    setKakaoTestSent(true);
  };

  // Filtered transactions
  const filteredHistory = history.filter((item) => {
    if (filterMethod === 'all') return true;
    if (filterMethod === 'card') return item.paymentMethod === 'card';
    if (filterMethod === 'transfer') return item.paymentMethod === 'transfer';
    if (filterMethod === 'easy') {
      return ['kakaopay', 'naverpay', 'tosspay'].includes(item.paymentMethod);
    }
    return true;
  });

  const totalSpent = history.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="bg-white w-full max-w-4xl lg:max-w-5xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#0f2439] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f05a22] flex items-center justify-center text-white font-black text-sm shadow-sm">
              AI
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>AI비서 마이페이지</span>
                {currentUser && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    회원 인증됨
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-300">
                실시간 상담 의뢰 진행 현황 · 전담 PM 배정 · 보유 크레딧 및 결제 관리
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NON-LOGGED-IN VIEW: Sleek Login Form */}
        {!currentUser ? (
          <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-slate-50/50">
            <div className="max-w-md mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-orange-100/80 text-[#f05a22] flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f2439]">
                  마이페이지 로그인
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
                  고객님의 실시간 상담 신청 진행 현황, 맞춤 견적서 및 결제 내역을 확인하시려면 간편 로그인해 주세요.
                </p>
              </div>

              {/* 1-Click Kakao Login */}
              <button
                type="button"
                onClick={handleKakaoLoginClick}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-sm transition shadow-sm flex items-center justify-center gap-2.5 border border-[#E6CF00] cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 fill-[#191919]" />
                <span>카카오로 1초 간편 로그인</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full"></div>
                <span className="bg-slate-50 px-3 text-[11px] text-slate-400 font-semibold shrink-0">
                  또는 이름 · 연락처로 내 의뢰 조회
                </span>
              </div>

              {/* Email / Phone Form */}
              <form onSubmit={handleEmailPhoneSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 text-left space-y-3.5 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    신청자 성함 / 담당자명 <span className="text-[#f05a22]">*</span>
                  </label>
                  <input
                    type="text"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    placeholder="예: 홍길동 대표"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f05a22] focus:border-[#f05a22]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      휴대전화 번호
                    </label>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f05a22] focus:border-[#f05a22]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      회사명 / 소속
                    </label>
                    <input
                      type="text"
                      value={loginCompany}
                      onChange={(e) => setLoginCompany(e.target.value)}
                      placeholder="예: (주)알파바이오"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f05a22] focus:border-[#f05a22]"
                    />
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0f2439] hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>로그인 및 내 의뢰 현황 확인</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Quick Demo Test Logins */}
              <div className="pt-2 text-left space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block text-center uppercase tracking-wider">
                  ⚡ 빠른 체험 계정으로 바로 확인
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_USERS.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSampleUserLogin(u)}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-[#f05a22] hover:bg-orange-50/50 text-left transition cursor-pointer text-xs group"
                    >
                      <div className="font-bold text-slate-800 group-hover:text-[#f05a22] flex items-center justify-between">
                        <span>{u.name}</span>
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <span className="text-[10px] text-slate-500 block truncate">{u.company}</span>
                      <span className="text-[9px] text-emerald-600 font-semibold block mt-1">
                        의뢰 건 보유중
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Access Link */}
              {onOpenAdminDashboard && (
                <div className="pt-4 border-t border-slate-200/80 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAdminDashboard();
                    }}
                    className="text-[11px] text-slate-400 hover:text-slate-700 transition flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>관리자 전용 대시보드 바로가기 (관리자 인증 필요)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* LOGGED-IN VIEW: Customer Portal */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* User Profile Bar */}
            <div className="bg-slate-100/90 border-b border-slate-200 px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f05a22] text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                  {currentUser.name.slice(0, 1)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {currentUser.name} 님
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                      {currentUser.company}
                    </span>
                    <span className="text-[10px] bg-[#f05a22]/10 text-[#f05a22] font-black px-2 py-0.5 rounded-full">
                      {currentUser.loginProvider === 'kakao' ? '카카오 간편연동' : '일반 회원'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-3 mt-0.5">
                    {currentUser.phone && <span>연락처: {currentUser.phone}</span>}
                    {currentUser.email && <span>이메일: {currentUser.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-semibold border border-slate-200 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>로그아웃</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white px-4 sm:px-6 pt-2.5 gap-2 shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('tasks')}
                className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'tasks'
                    ? 'border-[#f05a22] text-[#f05a22] bg-slate-50/50 rounded-t-xl border-t border-x border-slate-200 -mb-px shadow-2xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-4 h-4 text-[#f05a22]" />
                <span>내 상담 신청 &amp; 의뢰 현황</span>
                <span className="text-[10px] bg-[#f05a22] text-white font-bold px-1.5 py-0.2 rounded-full">
                  실시간
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('payments')}
                className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'payments'
                    ? 'border-[#f05a22] text-[#f05a22] bg-slate-50/50 rounded-t-xl border-t border-x border-slate-200 -mb-px shadow-2xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>결제 내역 &amp; 크레딧 관리</span>
                {userCredits > 0 && (
                  <span className="text-[10px] bg-[#0f2439] text-white font-black px-1.5 py-0.2 rounded-full">
                    {userCredits}C
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('notifications')}
                className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'notifications'
                    ? 'border-[#f05a22] text-[#f05a22] bg-slate-50/50 rounded-t-xl border-t border-x border-slate-200 -mb-px shadow-2xs'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bell className="w-4 h-4 text-amber-500" />
                <span>카카오톡 알림톡 설정</span>
                <span className="text-[10px] bg-[#FEE500] text-[#3C1E1E] font-black px-1.5 py-0.2 rounded-full">
                  ON
                </span>
              </button>
            </div>

            {/* TAB 1: Customer Consultation & Task History */}
            {activeTab === 'tasks' && (
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/40">
                <CustomerTaskHistory
                  currentUser={currentUser}
                  onOpenConsultation={() => {
                    onClose();
                    onOpenConsultation();
                  }}
                />
              </div>
            )}

            {/* TAB 2: Payment & Credits */}
            {activeTab === 'payments' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* 3 Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Credit Balance */}
                  <div className="bg-gradient-to-br from-orange-50 to-[#fff8f3] border border-orange-200/80 rounded-2xl p-4.5 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-900 flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-[#f05a22]" />
                        보유 크레딧 현황
                      </span>
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                        종량제 차감형
                      </span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black text-[#0f2439] tracking-tight">
                          {userCredits > 0 ? userCredits : (currentUser.credits || 30)}
                        </span>
                        <span className="text-sm font-bold text-orange-700">Credits (C)</span>
                      </div>
                      <p className="text-[11px] text-orange-800/80 mt-1">
                        1 크레딧 = 10,000원 상당의 실무 작업 전환
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenPayment({
                          type: 'credit',
                          id: 'credit_starter',
                          name: '스타터 크레딧 패키지 (10C)',
                          price: 100000,
                          credits: 10
                        });
                      }}
                      className="w-full py-2 bg-[#f05a22] hover:bg-[#d94e1c] text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span>크레딧 추가 충전</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Card 2: Active Plan */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        이용 중인 플랜
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        구독 이용중
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#0f2439]">
                        {currentPlan.name}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        월 8건 실무 전담 배정 (48시간 내 완성 보장)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenPayment();
                      }}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      플랜 변경 및 업그레이드
                    </button>
                  </div>

                  {/* Card 3: Bank Transfer Info */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-4.5 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        세금계산서 전용 입금 계좌
                      </span>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        신한은행
                      </span>
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-mono font-bold text-slate-900 text-sm">
                        {DERMAPINK_BANK_INFO.accountNumber}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        예금주: {DERMAPINK_BANK_INFO.accountHolder}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyBank}
                      className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">복사 완료!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>계좌번호 복사하기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Transaction Receipts History */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        결제 및 크레딧 충전 내역
                      </h4>
                      <p className="text-xs text-slate-500">
                        전자 영수증 및 세금계산서 발행 내역을 확인하실 수 있습니다.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-700">
                      총 결제액: <strong className="text-[#f05a22] font-black">{totalSpent.toLocaleString()}원</strong>
                    </span>
                  </div>

                  <div className="space-y-2">
                    {filteredHistory.map((receipt) => (
                      <div
                        key={receipt.orderId}
                        className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between text-xs transition"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800">{receipt.itemTitle}</span>
                            <span className="text-[10px] text-slate-400 font-mono">[{receipt.orderId}]</span>
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            {receipt.paidAt} • {receipt.paymentMethod === 'card' ? '신용카드' : receipt.paymentMethod === 'transfer' ? '무통장입금' : '간편결제'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900 font-mono">
                            {receipt.amount.toLocaleString()}원
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold">
                            결제 완료
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Kakao Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* Kakao Info Banner */}
                <div className="bg-[#FFFCE6] border border-[#F7E68E] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FEE500] flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 fill-[#191919]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#3C1E1E]">
                          카카오톡 알림톡(Alimtalk) 실시간 수신 설정
                        </h4>
                        <p className="text-xs text-slate-600">
                          상담 신청 접수 및 48시간 내 실무 산출물 알림을 고객님의 카카오톡({currentUser.phone})으로 받습니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerKakaoTest}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-xs transition border border-[#E6CF00] shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Bell className="w-3.5 h-3.5 fill-[#191919]" />
                    <span>내 카카오톡으로 테스트 알림 받기</span>
                  </button>
                </div>

                {/* Test notification preview card */}
                {kakaoTestSent && (
                  <div className="bg-white border-2 border-[#FEE500] rounded-2xl p-5 shadow-md animate-in fade-in space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#3C1E1E] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        카카오톡 알림톡 수신 테스트 성공!
                      </span>
                      <span className="text-[10px] text-slate-400">방금 전</span>
                    </div>

                    <div className="bg-[#FFFCE6] p-4 rounded-xl border border-[#F7E68E] text-xs space-y-2 text-slate-800">
                      <div className="font-bold text-sm text-[#191919]">
                        [AI비서] 고객님의 상담 신청이 접수되었습니다
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        안녕하세요, <strong>{currentUser.name}</strong> 대표님!<br />
                        의뢰해주신 실무 과제가 정상 접수되어 전담 시니어 PM이 배정되었습니다.<br />
                        30분 이내로 맞춤 견적서 및 48시간 완성 일정을 카카오톡으로 회신해 드리겠습니다.
                      </p>
                      <div className="pt-2 border-t border-[#f2e185] flex flex-wrap gap-2 text-[10px] text-slate-500">
                        <span>• 수신자: {currentUser.phone}</span>
                        <span>• 전담 PM: 김민서 수석 매니저</span>
                        <span>• 상태: 요구사항 정밀 분석 중</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <a
                        href="http://pf.kakao.com/_xnSxeiT/chat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs flex items-center gap-1.5 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-[#191919]" />
                        <span>카카오톡 1:1 상담 채널 바로가기</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Event Notification Toggles */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                  <h4 className="font-bold text-slate-900 text-sm">
                    알림톡 수신 항목 설정
                  </h4>

                  <div className="space-y-3 text-xs">
                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
                      <div>
                        <span className="font-bold text-slate-800 block">1. 상담 신청 즉시 접수 확인 알림</span>
                        <span className="text-slate-500 text-[11px]">의뢰서 제출 시 접수 번호 및 담당 매니저 배정 알림톡</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notiReceipt}
                        onChange={(e) => setNotiReceipt(e.target.checked)}
                        className="w-4 h-4 accent-[#f05a22] rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
                      <div>
                        <span className="font-bold text-slate-800 block">2. 전담 PM 배정 및 견적서 도착 알림</span>
                        <span className="text-slate-500 text-[11px]">10년 차 이상 시니어 매니저의 맞춤 견적 및 일정 안내</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notiPmAssigned}
                        onChange={(e) => setNotiPmAssigned(e.target.checked)}
                        className="w-4 h-4 accent-[#f05a22] rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
                      <div>
                        <span className="font-bold text-slate-800 block">3. AI 초안 생성 및 전문가 2차 감수 시작 알림</span>
                        <span className="text-slate-500 text-[11px]">실시간 단계 진행 상황을 카카오톡으로 추적</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notiProgress}
                        onChange={(e) => setNotiProgress(e.target.checked)}
                        className="w-4 h-4 accent-[#f05a22] rounded cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition">
                      <div>
                        <span className="font-bold text-slate-800 block">4. 48시간 내 최종 산출물 완성 및 납품 알림</span>
                        <span className="text-slate-500 text-[11px]">완성본 다운로드 링크 및 무제한 피드백 반영 채널 연결</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notiDeliverable}
                        onChange={(e) => setNotiDeliverable(e.target.checked)}
                        className="w-4 h-4 accent-[#f05a22] rounded cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
