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
  ListTodo
} from 'lucide-react';
import { PaymentReceipt, PaymentItemSelection } from '../types';
import { PRICING_PLANS } from '../data';
import { DERMAPINK_BANK_INFO } from './PaymentModal';
import { TaskProgressDashboard } from './TaskProgressDashboard';

interface MyDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCredits: number;
  selectedPlanId: string;
  onOpenPayment: (selection?: PaymentItemSelection) => void;
  onOpenConsultation: () => void;
  initialTab?: 'tasks' | 'payments';
}

export const MyDashboardModal: React.FC<MyDashboardModalProps> = ({
  isOpen,
  onClose,
  userCredits,
  selectedPlanId,
  onOpenPayment,
  onOpenConsultation,
  initialTab = 'tasks'
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'payments'>(initialTab);
  const [history, setHistory] = useState<PaymentReceipt[]>([]);
  const [filterMethod, setFilterMethod] = useState<'all' | 'card' | 'transfer' | 'easy'>('all');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentReceipt | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load history from localStorage
  const loadHistory = () => {
    try {
      const stored = localStorage.getItem('payment_history');
      if (stored) {
        const parsed: PaymentReceipt[] = JSON.parse(stored);
        setHistory(parsed);
      } else {
        // If empty, supply a welcoming initial mock transaction record so users see full UI
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
            buyerName: '더마핑크 파트너 고객',
            buyerEmail: 'client@dermapink.com',
            buyerPhone: '010-0000-0000',
            buyerCompany: '주식회사 더마핑크 파트너스',
            taxInvoiceRequested: true,
            taxBusinessNumber: '123-86-00000',
            activatedPlanId: 'business_pro'
          },
          {
            orderId: 'ORD-20250915-08',
            paidAt: '2025. 09. 15 14:30',
            itemTitle: '프리미엄 팩 (+12 보너스)',
            amount: 550000,
            paymentMethod: 'transfer',
            buyerName: '더마핑크 파트너 고객',
            buyerEmail: 'client@dermapink.com',
            buyerPhone: '010-0000-0000',
            buyerCompany: '주식회사 더마핑크 파트너스',
            depositorName: '주식회사 더마핑크',
            taxInvoiceRequested: true,
            taxBusinessNumber: '123-86-00000',
            creditsAdded: 42
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
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const handleCopyBank = () => {
    navigator.clipboard.writeText(DERMAPINK_BANK_INFO.accountNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
        {/* Header */}
        <div className="px-6 py-4 bg-[#0f2439] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f05a22] flex items-center justify-center text-white font-black text-sm shadow-sm">
              AI
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <span>나의 대시보드 (My Dashboard)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  실시간 연동
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                의뢰 업무 진행 현황 및 보유 크레딧·결제 내역 통합 관리
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

        {/* Top Tab Bar: 업무 진행 현황 (관리자 🔒) vs 결제/크레딧 내역 */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 px-4 sm:px-6 pt-2.5 gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'tasks'
                ? 'border-[#f05a22] text-[#f05a22] bg-white rounded-t-xl border-t border-x border-slate-200 -mb-px shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-[#f05a22]" />
            <span>업무 진행 현황 (실시간 추적)</span>
            <span className="text-[10px] bg-[#0f2439] text-white font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
              <Lock className="w-2.5 h-2.5 text-amber-300" />
              관리자 전용
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payments')}
            className={`pb-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition cursor-pointer whitespace-nowrap ${
              activeTab === 'payments'
                ? 'border-[#f05a22] text-[#f05a22] bg-white rounded-t-xl border-t border-x border-slate-200 -mb-px shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>결제 내역 &amp; 크레딧 관리</span>
            {userCredits > 0 && (
              <span className="text-[10px] bg-[#f05a22] text-white font-black px-1.5 py-0.2 rounded-full">
                {userCredits}C
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Task Progress Dashboard (Admin Protected) */}
        {activeTab === 'tasks' && (
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
            <TaskProgressDashboard onClose={onClose} onOpenConsultation={onOpenConsultation} />
          </div>
        )}

        {/* Tab 2: Payment & Credits Dashboard */}
        {activeTab === 'payments' && (
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Top 3 Summary Cards */}
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
                    {userCredits > 0 ? userCredits : 30}
                  </span>
                  <span className="text-sm font-bold text-slate-600">Credits (C)</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  1크레딧 = 표준 문서 1건 또는 AI 리서치 작업 가능
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPayment({
                    type: 'credit',
                    id: 'credit_30',
                    name: '비즈니스 팩 (+6 보너스)',
                    price: 330000,
                    credits: 30
                  });
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>크레딧 추가 충전하기</span>
              </button>
            </div>

            {/* Card 2: Subscription Plan Status */}
            <div className="bg-gradient-to-br from-slate-50 to-[#f3f6f9] border border-slate-200 rounded-2xl p-4.5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0f2439]" />
                  구독 플랜 현황
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  이용 중
                </span>
              </div>
              <div>
                <div className="text-xl font-black text-[#0f2439]">
                  {currentPlan.name}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  월간 결제 | 다음 결제일: 2025. 10. 18 (자동 갱신)
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPayment({
                    type: 'plan',
                    id: selectedPlanId,
                    name: currentPlan.name,
                    price: currentPlan.monthlyPrice || 590000,
                    billingCycle: 'monthly'
                  });
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0f2439] hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>플랜 변경 / 업그레이드</span>
              </button>
            </div>

            {/* Card 3: Quick Action & Total Spent */}
            <div className="bg-gradient-to-br from-blue-50 to-[#edf4ff] border border-blue-200 rounded-2xl p-4.5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    실시간 업무 의뢰
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                    24h 접수
                  </span>
                </div>
                <div className="mt-2 text-xs text-blue-900 leading-relaxed">
                  보유 크레딧과 구독 플랜으로 전담 실무진에게 즉시 업무를 접수하세요.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenConsultation();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#0046FF] hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
              >
                <span>새 업무 의뢰하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Official Bank Account Information Banner */}
          <div className="bg-blue-50/90 border border-blue-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start sm:items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#0046FF] text-white font-black text-xs flex items-center justify-center shrink-0">
                신한
              </span>
              <div>
                <span className="font-bold text-slate-900 block text-xs">
                  주식회사 더마핑크 법인 계좌 안내
                </span>
                <span className="text-slate-600 text-[11px]">
                  신한은행 <strong className="font-mono text-slate-900">140-015-969664</strong> (예금주: 주식회사 더마핑크)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyBank}
                className="px-3 py-1.5 bg-white border border-blue-300 hover:border-blue-400 text-blue-700 font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer text-xs shrink-0"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">복사완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>계좌번호 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Recent Payment History Section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span>최근 결제 내역</span>
                  <span className="text-xs font-normal text-slate-500">
                    (총 {filteredHistory.length}건 / 누적 결제금액: ₩{totalSpent.toLocaleString()}원)
                  </span>
                </h4>
              </div>

              {/* Filter Tabs */}
              <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setFilterMethod('all')}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                    filterMethod === 'all'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  전체
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMethod('card')}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                    filterMethod === 'card'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  신용카드
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMethod('transfer')}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                    filterMethod === 'transfer'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  신한은행 계좌
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMethod('easy')}
                  className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                    filterMethod === 'easy'
                      ? 'bg-white text-slate-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  간편결제
                </button>
              </div>
            </div>

            {/* Table / List */}
            {filteredHistory.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <Receipt className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500 font-medium">해당 조건의 결제 내역이 없습니다.</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                      <tr>
                        <th className="py-2.5 px-3">주문번호 / 일시</th>
                        <th className="py-2.5 px-3">상품명</th>
                        <th className="py-2.5 px-3">결제수단</th>
                        <th className="py-2.5 px-3 text-right">결제금액</th>
                        <th className="py-2.5 px-3 text-center">상태</th>
                        <th className="py-2.5 px-3 text-center">영수증 / 전표</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredHistory.map((item) => {
                        const isTransfer = item.paymentMethod === 'transfer';
                        return (
                          <tr key={item.orderId} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-3">
                              <span className="font-mono font-bold text-slate-800 block">
                                {item.orderId}
                              </span>
                              <span className="text-[11px] text-slate-400">{item.paidAt}</span>
                            </td>
                            <td className="py-3 px-3">
                              <span className="font-bold text-slate-900 block">{item.itemTitle}</span>
                              {item.taxInvoiceRequested && (
                                <span className="inline-block text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mt-0.5">
                                  세금계산서 신청됨
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              {item.paymentMethod === 'card' && (
                                <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                                  <CreditCard className="w-3.5 h-3.5 text-slate-500" /> 카드결제
                                </span>
                              )}
                              {item.paymentMethod === 'transfer' && (
                                <span className="inline-flex items-center gap-1 font-bold text-blue-900">
                                  <span className="w-2 h-2 rounded-full bg-[#0046FF]"></span> 신한은행 이체
                                </span>
                              )}
                              {item.paymentMethod === 'kakaopay' && (
                                <span className="inline-flex items-center gap-1 font-bold text-[#3A1D1D]">
                                  <span className="w-2 h-2 rounded-full bg-[#FEE500]"></span> 카카오페이
                                </span>
                              )}
                              {item.paymentMethod === 'naverpay' && (
                                <span className="inline-flex items-center gap-1 font-bold text-[#03C75A]">
                                  <span className="w-2 h-2 rounded-full bg-[#03C75A]"></span> 네이버페이
                                </span>
                              )}
                              {item.paymentMethod === 'tosspay' && (
                                <span className="inline-flex items-center gap-1 font-bold text-[#0064FF]">
                                  <span className="w-2 h-2 rounded-full bg-[#0064FF]"></span> 토스페이
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <span className="font-black text-slate-900 text-sm">
                                ₩{item.amount.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-400 block">(VAT 포함)</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              {isTransfer ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                  <Clock className="w-3 h-3" />
                                  입금 확인 대기
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <CheckCircle2 className="w-3 h-3" />
                                  결제 완료
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => setSelectedReceipt(item)}
                                className="px-2.5 py-1 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-bold rounded-lg text-[11px] shadow-2xs hover:bg-slate-50 transition cursor-pointer inline-flex items-center gap-1"
                              >
                                <Receipt className="w-3 h-3 text-slate-500" />
                                <span>전표 보기</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer info & Close */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>주식회사 더마핑크 고객지원 센터:</span>
            <strong className="text-slate-800">070-8144-3848</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>

      {/* Individual Printable Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#f05a22]" />
                <h4 className="font-black text-slate-900 text-base">결제 매출전표 / 거래명세서</h4>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                aria-label="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#f7f5f0] p-4 rounded-xl space-y-2 text-xs border border-[#eae6df]">
              <div className="flex justify-between">
                <span className="text-slate-500">주문 번호</span>
                <span className="font-mono font-bold text-slate-800">{selectedReceipt.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">거래 일시</span>
                <span className="text-slate-800">{selectedReceipt.paidAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">공급자</span>
                <span className="text-slate-800 font-bold">주식회사 더마핑크 (대표: 안진홍)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">구매자</span>
                <span className="text-slate-800">
                  {selectedReceipt.buyerName} ({selectedReceipt.buyerCompany || '개인'})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">품목</span>
                <span className="font-bold text-slate-900">{selectedReceipt.itemTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">결제 수단</span>
                <span className="font-bold text-slate-800 uppercase">
                  {selectedReceipt.paymentMethod === 'card' && '신용/체크카드'}
                  {selectedReceipt.paymentMethod === 'transfer' && '신한은행 법인계좌 이체'}
                  {selectedReceipt.paymentMethod === 'kakaopay' && '카카오페이'}
                  {selectedReceipt.paymentMethod === 'naverpay' && '네이버페이'}
                  {selectedReceipt.paymentMethod === 'tosspay' && '토스페이'}
                </span>
              </div>
              {selectedReceipt.taxInvoiceRequested && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>세금계산서</span>
                  <span>발행 신청 완료 ({selectedReceipt.taxBusinessNumber || '등록번호 확인'})</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-300 flex justify-between items-center text-sm font-black">
                <span className="text-slate-900">총 결제 금액</span>
                <span className="text-xl text-[#f05a22]">₩{selectedReceipt.amount.toLocaleString()}원</span>
              </div>
            </div>

            {selectedReceipt.paymentMethod === 'transfer' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-900">
                <div className="font-bold">입금 계좌: 신한은행 140-015-969664</div>
                <div className="text-blue-700">예금주: 주식회사 더마핑크 | 입금자명: {selectedReceipt.depositorName || selectedReceipt.buyerName}</div>
              </div>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>영수증 인쇄</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#0f2439] text-white font-bold text-xs transition hover:bg-slate-800 cursor-pointer"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
