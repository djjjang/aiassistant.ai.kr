import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Building,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Plus,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Bell,
  Check
} from 'lucide-react';
import { ClientTaskItem, AuthUser } from '../types';

interface CustomerTaskHistoryProps {
  currentUser: AuthUser;
  onOpenConsultation: () => void;
}

export const CustomerTaskHistory: React.FC<CustomerTaskHistoryProps> = ({
  currentUser,
  onOpenConsultation
}) => {
  const [tasks, setTasks] = useState<ClientTaskItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadTasks = () => {
    try {
      const raw = localStorage.getItem('client_tasks_pool');
      let allTasks: ClientTaskItem[] = [];
      if (raw) {
        allTasks = JSON.parse(raw);
      } else {
        // Fallback default tasks if none in storage
        allTasks = [
          {
            id: 'TASK-20250918-01',
            createdAt: '2025. 09. 18 14:15',
            company: '(주)알파바이오',
            requesterName: '최현우 이사',
            phone: '010-3849-1102',
            email: 'hwchoi@alphabio.co.kr',
            taskType: 'document',
            taskTypeName: '문서·기획 검토 (IR 피치덱)',
            title: '바이오 신약 파이프라인 투자유치 IR 덱 및 기술소개서 검토',
            memo: '시리즈 A 투자 유치용 IR 피치덱 국문본의 기술 용어 대중화 및 핵심 시장 규모(TAM-SAM-SOM) 산정 데이터 팩트체크를 요청드립니다.',
            status: 'received',
            priority: 'high',
            assignedManager: '김민서 수석 매니저 (IR·기획)',
            progressPercent: 20,
            estimatedCompletion: '48시간 이내 납품 예정',
            reviewNotes: '신규 접수 완료. 전담 IR 매니저 배정되어 AI 1차 서술 구조 분석 및 재무 모델 점검 준비 중입니다.',
            contactMethod: 'kakao',
            selectedPlan: 'business_pro',
            kakaoNotificationSent: true,
            kakaoNotificationTime: '14:16'
          },
          {
            id: 'TASK-20250918-02',
            createdAt: '2025. 09. 18 11:30',
            company: '모던리빙 스튜디오',
            requesterName: '이지은 팀장',
            phone: '010-9284-5512',
            email: 'jieun@modernliving.kr',
            taskType: 'content',
            taskTypeName: '콘텐츠·마케팅 (펀딩 상세페이지)',
            title: '2025 FW 친환경 가구 라인업 텀블벅 크라우드펀딩 스토리 기획',
            memo: '브랜드 철학을 살린 펀딩 상세페이지 도입부 후킹 문구 및 리워드 옵션별 소구점 정리 작업이 급합니다.',
            status: 'reviewing',
            priority: 'urgent',
            assignedManager: '박진우 크리에이티브 디렉터',
            progressPercent: 65,
            estimatedCompletion: '24시간 내 납품 예정 (긴급)',
            reviewNotes: 'AI 초안 생성 완료. 타겟 소비자 감성 키워드 반영하여 2차 전문 윤문 및 레이아웃 수정 진행 중입니다.',
            contactMethod: 'kakao',
            selectedPlan: 'business_pro',
            kakaoNotificationSent: true,
            kakaoNotificationTime: '11:31'
          },
          {
            id: 'TASK-20250917-03',
            createdAt: '2025. 09. 17 16:40',
            company: '핀테크 솔루션즈',
            requesterName: '강태석 본부장',
            phone: '010-4491-8823',
            email: 'tskang@fintechsol.io',
            taskType: 'research',
            taskTypeName: '시장·기업 리서치',
            title: '동남아 3개국(싱가포르, 베트남, 인니) 전자지급결제 라이선스 규제 리서치',
            memo: '현지 금융당국 최신 규정 가이드라인 원문 검토 및 국내 핀테크 진출 필수 요건 비교표 요약을 요청합니다.',
            status: 'reviewing',
            priority: 'normal',
            assignedManager: '최영준 수석 연구원 (글로벌·리서치)',
            progressPercent: 75,
            estimatedCompletion: '48시간 이내 납품 예정',
            reviewNotes: '싱가포르 MAS 규정 및 베트남 중앙은행 가이드라인 국문 요약 보고서 작성 중. 최종 검수 단계.',
            contactMethod: 'email',
            selectedPlan: 'starter',
            kakaoNotificationSent: true,
            kakaoNotificationTime: '16:41'
          }
        ];
        localStorage.setItem('client_tasks_pool', JSON.stringify(allTasks));
      }

      // Filter tasks belonging to current user:
      // Match by phone digits, email, company, or requester name
      const userPhoneClean = (currentUser.phone || '').replace(/\D/g, '');
      const userEmailClean = (currentUser.email || '').trim().toLowerCase();
      const userNameClean = (currentUser.name || '').trim();
      const userCompClean = (currentUser.company || '').trim();

      const userTasks = allTasks.filter((t) => {
        const taskPhoneClean = (t.phone || '').replace(/\D/g, '');
        const taskEmailClean = (t.email || '').trim().toLowerCase();
        const taskNameClean = (t.requesterName || '').trim();
        const taskCompClean = (t.company || '').trim();

        if (userPhoneClean && taskPhoneClean && (userPhoneClean === taskPhoneClean || userPhoneClean.slice(-8) === taskPhoneClean.slice(-8))) {
          return true;
        }
        if (userEmailClean && taskEmailClean && userEmailClean === taskEmailClean) {
          return true;
        }
        if (userNameClean && taskNameClean && (userNameClean.includes(taskNameClean) || taskNameClean.includes(userNameClean))) {
          return true;
        }
        if (userCompClean && taskCompClean && (userCompClean.includes(taskCompClean) || taskCompClean.includes(userCompClean))) {
          return true;
        }
        return false;
      });

      // If user has no specific matched tasks yet, show the latest tasks if this is a demo user,
      // or empty if it's a completely new brand-new signup.
      if (userTasks.length > 0) {
        setTasks(userTasks);
      } else {
        // If current user is one of sample users, fallback to first task
        if (currentUser.id.includes('sample') || currentUser.loginProvider === 'kakao') {
          setTasks([allTasks[0]]);
        } else {
          setTasks([]);
        }
      }
    } catch (err) {
      console.error(err);
      setTasks([]);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [currentUser]);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0f2439] to-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <h4 className="font-bold text-sm sm:text-base text-white">
              {currentUser.name} 님의 실시간 상담 및 의뢰 현황
            </h4>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            접수된 모든 업무는 AI 1차 고속 분석 후 10년 차 이상 시니어 전문가가 48시간 내 완성합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadTasks}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer text-xs flex items-center gap-1.5"
            title="새로고침"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">새로고침</span>
          </button>
          <button
            onClick={onOpenConsultation}
            className="px-3.5 py-2 rounded-xl bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>새 실무 상담 신청</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#f05a22] flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-800">
            접수된 실무 상담 내역이 없습니다
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            사업계획서(IR덱), 계약서 법률 검토, 상세페이지 디자인, 마케팅 자동화 등 원하시는 실무를 지금 바로 맡겨보세요.
          </p>
          <button
            type="button"
            onClick={onOpenConsultation}
            className="mt-2 px-5 py-2.5 rounded-xl bg-[#0f2439] hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer inline-flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#f05a22]" />
            <span>무료 1:1 상담 신청하기</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => {
            const isReceived = task.status === 'received';
            const isReviewing = task.status === 'reviewing';
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-4"
              >
                {/* Header: ID, Task Type, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleCopy(task.id)}
                      className="font-mono text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded flex items-center gap-1 transition"
                      title="접수 번호 복사"
                    >
                      <span>{task.id}</span>
                      {copiedId === task.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : null}
                    </button>
                    <span className="text-xs font-bold text-slate-800 bg-orange-50 text-[#f05a22] px-2 py-0.5 rounded border border-orange-200/60">
                      {task.taskTypeName}
                    </span>
                    <span className="text-[11px] text-slate-400">• 접수일시: {task.createdAt}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {task.priority === 'urgent' && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-black px-2 py-0.5 rounded-full">
                        긴급 24h
                      </span>
                    )}

                    {isReceived && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        1단계: 접수 완료
                      </span>
                    )}
                    {isReviewing && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-[#f05a22] border border-orange-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f05a22] animate-ping"></span>
                        2단계: 전문가 정밀 감수중
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        3단계: 최종 납품 완료
                      </span>
                    )}
                  </div>
                </div>

                {/* 5-Step Process Timeline Tracker */}
                <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-2">
                    <span className="flex items-center gap-1 text-[#f05a22]">
                      <Clock className="w-3.5 h-3.5" />
                      실시간 작업 진행률
                    </span>
                    <span className="font-mono text-slate-800">{task.progressPercent}% 진행중</span>
                  </div>

                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isReviewing
                          ? 'bg-gradient-to-r from-orange-400 to-[#f05a22]'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${task.progressPercent}%` }}
                    ></div>
                  </div>

                  {/* 5 Milestone Steps */}
                  <div className="grid grid-cols-5 text-center text-[10px] gap-1 text-slate-500 font-medium">
                    <div className={task.progressPercent >= 20 ? 'text-[#0f2439] font-bold' : ''}>
                      <span className="block text-xs">①</span> 접수확인
                    </div>
                    <div className={task.progressPercent >= 40 ? 'text-[#0f2439] font-bold' : ''}>
                      <span className="block text-xs">②</span> 요구분석
                    </div>
                    <div className={task.progressPercent >= 60 ? 'text-[#0f2439] font-bold' : ''}>
                      <span className="block text-xs">③</span> AI초안
                    </div>
                    <div className={task.progressPercent >= 80 ? 'text-[#0f2439] font-bold' : ''}>
                      <span className="block text-xs">④</span> 전문가감수
                    </div>
                    <div className={task.progressPercent >= 100 ? 'text-emerald-600 font-bold' : ''}>
                      <span className="block text-xs">⑤</span> 최종납품
                    </div>
                  </div>
                </div>

                {/* Title & Request Memo */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    {task.memo}
                  </p>
                </div>

                {/* Manager & KakaoTalk Notice Banner */}
                <div className="bg-[#FFFCE6] border border-[#F7E68E] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#3C1E1E] flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-[#f05a22]" />
                        전담 PM: <strong className="text-slate-900">{task.assignedManager}</strong>
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                        배정 완료
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                      <Bell className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>
                        카카오톡 알림톡 자동 발송됨 ({task.phone || currentUser.phone})
                      </span>
                    </div>
                  </div>

                  <a
                    href="http://pf.kakao.com/_xnSxeiT/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#E6CF00] transition shadow-2xs shrink-0 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-[#191919]" />
                    <span>카톡으로 PM과 1:1 상담</span>
                  </a>
                </div>

                {/* Review Notes from Senior Expert */}
                {task.reviewNotes && (
                  <div className="text-xs bg-[#fffaf5] border border-orange-200/80 p-3 rounded-xl flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#f05a22] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5 text-[11px]">
                        실무진 코멘트 &amp; 진행 상황
                      </span>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {task.reviewNotes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
