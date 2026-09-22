import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
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
  LogOut,
  Lock,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Edit3,
  Check,
  MessageSquare
} from 'lucide-react';
import { ClientTaskItem, TaskStatusType } from '../types';

export const INITIAL_TASKS: ClientTaskItem[] = [
  {
    id: 'TASK-20250918-01',
    createdAt: '2025. 09. 18 14:15',
    company: '(주)알파바이오',
    requesterName: '최현우 이사',
    phone: '010-3849-1102',
    email: 'hwchoi@alphabio.co.kr',
    taskType: 'document',
    taskTypeName: '문서·기획 검토',
    title: '바이오 신약 파이프라인 투자유치 IR 덱 및 기술소개서 검토',
    memo: '시리즈 A 투자 유치용 IR 피치덱 국문본의 기술 용어 대중화 및 핵심 시장 규모(TAM-SAM-SOM) 산정 데이터 팩트체크를 요청드립니다.',
    status: 'received',
    priority: 'high',
    assignedManager: '김민서 수석 매니저 (IR·기획)',
    progressPercent: 20,
    estimatedCompletion: '2025. 09. 20 18:00 (48시간 이내)',
    reviewNotes: '접수 완료. 전담 IR 매니저 배정되어 AI 1차 서술 구조 분석 준비 중입니다.',
    contactMethod: 'phone',
    selectedPlan: 'business_pro'
  },
  {
    id: 'TASK-20250918-02',
    createdAt: '2025. 09. 18 11:30',
    company: '모던리빙 스튜디오',
    requesterName: '이지은 팀장',
    phone: '010-9284-5512',
    email: 'jieun@modernliving.kr',
    taskType: 'content',
    taskTypeName: '콘텐츠·마케팅',
    title: '2025 FW 친환경 가구 라인업 텀블벅 크라우드펀딩 스토리 기획',
    memo: '브랜드 철학을 살린 펀딩 상세페이지 도입부 후킹 문구 및 리워드 옵션별 소구점 정리 작업이 급합니다.',
    status: 'reviewing',
    priority: 'urgent',
    assignedManager: '박진우 크리에이티브 디렉터',
    progressPercent: 65,
    estimatedCompletion: '2025. 09. 19 15:00 (긴급 24h)',
    reviewNotes: 'AI 초안 생성 완료. 타겟 소비자 감성 키워드 반영하여 2차 전문 윤문 및 레이아웃 수정 진행 중입니다.',
    contactMethod: 'kakao',
    selectedPlan: 'business_pro'
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
    estimatedCompletion: '2025. 09. 19 18:00',
    reviewNotes: '싱가포르 MAS 규정 및 베트남 중앙은행 가이드라인 국문 요약 보고서 작성 중. 최종 검수 단계.',
    contactMethod: 'email',
    selectedPlan: 'starter'
  },
  {
    id: 'TASK-20250916-04',
    createdAt: '2025. 09. 16 10:20',
    company: '(주)그린게이트',
    requesterName: '안승호 대표',
    phone: '010-7712-3401',
    email: 'sh.ahn@greengate.com',
    taskType: 'document',
    taskTypeName: '문서·기획 검토',
    title: '영문 OEM 원자재 공급계약서 및 비밀유지협약서(NDA) 조항 검토',
    memo: '해외 벤더사에서 전달받은 영문 표준 계약서에서 배상 한도, 지체상금, 관할 법원 독소조항 여부 검토 요청.',
    status: 'completed',
    priority: 'urgent',
    assignedManager: '김민서 수석 매니저 (IR·기획)',
    progressPercent: 100,
    estimatedCompletion: '납품 완료 (소요: 26시간)',
    reviewNotes: '조항별 수정 권고안 및 실무 가이드라인 납품 완료. 고객사 승인 완료.',
    deliverableName: '그린게이트_영문OEM계약서_조항별검토보고서_최종본.pdf',
    contactMethod: 'kakao',
    selectedPlan: 'business_pro'
  },
  {
    id: 'TASK-20250915-05',
    createdAt: '2025. 09. 15 13:10',
    company: '에코패션몰',
    requesterName: '윤서아 마케팅 총괄',
    phone: '010-6102-9938',
    email: 'seoah@ecofashion.co.kr',
    taskType: 'research',
    taskTypeName: '시장·기업 리서치',
    title: '국내 상위 5대 패션 플랫폼 카테고리별 베스트셀러 및 프로모션 동향 조사',
    memo: '주요 패션 플랫폼별 입점 브랜드 및 시즌 프로모션 트렌드 비교 분석 보고서 납품 요청.',
    status: 'completed',
    priority: 'normal',
    assignedManager: '최영준 수석 연구원 (글로벌·리서치)',
    progressPercent: 100,
    estimatedCompletion: '납품 완료 (소요: 34시간)',
    reviewNotes: '플랫폼별 트렌드 분석 보고서 및 비교 정리 시트 납품 완료.',
    deliverableName: '에코패션_패션플랫폼_프로모션_동향보고서_최종.pdf',
    contactMethod: 'email',
    selectedPlan: 'starter'
  }
];

interface TaskProgressDashboardProps {
  onClose?: () => void;
  onOpenConsultation?: () => void;
}

export const TaskProgressDashboard: React.FC<TaskProgressDashboardProps> = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [tasks, setTasks] = useState<ClientTaskItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatusType>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<ClientTaskItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  // New task form state
  const [newTaskForm, setNewTaskForm] = useState({
    company: '',
    requesterName: '',
    phone: '',
    email: '',
    taskType: 'document',
    taskTypeName: '문서·기획 검토',
    title: '',
    memo: '',
    priority: 'normal' as 'normal' | 'urgent' | 'high'
  });

  // Check admin session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('dermapink_admin_auth');
      if (savedAuth === 'true') {
        setIsAdmin(true);
      }
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadTasks = () => {
    try {
      const stored = localStorage.getItem('client_tasks_pool');
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        setTasks(INITIAL_TASKS);
        localStorage.setItem('client_tasks_pool', JSON.stringify(INITIAL_TASKS));
      }
    } catch {
      setTasks(INITIAL_TASKS);
    }
  };

  const handleAdminLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');

    // Default master password or admin email
    const trimmed = passwordInput.trim();
    if (trimmed === 'admin1234' || trimmed === 'dermapink2025' || trimmed === 'djjjang@gmail.com') {
      setIsAdmin(true);
      localStorage.setItem('dermapink_admin_auth', 'true');
      setPasswordInput('');
    } else {
      setAuthError('비밀번호가 일치하지 않습니다. (테스트 관리자 비밀번호: admin1234)');
    }
  };

  const handleQuickAdminAuth = () => {
    setIsAdmin(true);
    localStorage.setItem('dermapink_admin_auth', 'true');
    setAuthError('');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('dermapink_admin_auth');
  };

  // Status Change Handler
  const handleUpdateStatus = (taskId: string, newStatus: TaskStatusType) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        let newProgress = t.progressPercent;
        let newNotes = t.reviewNotes;
        let newEst = t.estimatedCompletion;

        if (newStatus === 'received') {
          newProgress = 20;
          newNotes = '의뢰 접수 완료. 전담 매니저 배정 대기 중입니다.';
        } else if (newStatus === 'reviewing') {
          newProgress = 65;
          newNotes = 'AI 초안 생성 후 각 분야 5년 차 실무진이 2차 팩트체크 및 정밀 윤문을 진행 중입니다.';
        } else if (newStatus === 'completed') {
          newProgress = 100;
          newNotes = '전문가 정밀 검수 통과 및 최종 산출물 납품이 완료되었습니다.';
          newEst = '납품 완료 (검수 통과)';
        }

        return {
          ...t,
          status: newStatus,
          progressPercent: newProgress,
          reviewNotes: newNotes,
          estimatedCompletion: newEst
        };
      }
      return t;
    });

    setTasks(updated);
    localStorage.setItem('client_tasks_pool', JSON.stringify(updated));

    if (selectedTask && selectedTask.id === taskId) {
      const current = updated.find((item) => item.id === taskId);
      if (current) setSelectedTask(current);
    }
  };

  // Create new task
  const handleCreateNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: ClientTaskItem = {
      id: `TASK-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 90)}`,
      createdAt: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      company: newTaskForm.company || '(주)고객사',
      requesterName: newTaskForm.requesterName || '담당자',
      phone: newTaskForm.phone || '010-0000-0000',
      email: newTaskForm.email,
      taskType: newTaskForm.taskType,
      taskTypeName:
        newTaskForm.taskType === 'document'
          ? '문서·기획 검토'
          : newTaskForm.taskType === 'content'
          ? '콘텐츠·마케팅'
          : newTaskForm.taskType === 'research'
          ? '시장·기업 리서치'
          : '운영·사내AI·웹',
      title: newTaskForm.title,
      memo: newTaskForm.memo,
      status: 'received',
      priority: newTaskForm.priority,
      assignedManager: '김민서 수석 매니저 (IR·기획)',
      progressPercent: 20,
      estimatedCompletion: newTaskForm.priority === 'urgent' ? '24시간 이내 긴급 납품' : '48시간 이내 납품',
      reviewNotes: '신규 접수 완료. 전담 인력이 배정되어 즉시 분석을 시작합니다.',
      contactMethod: 'phone'
    };

    const updated = [newTask, ...tasks];
    setTasks(updated);
    localStorage.setItem('client_tasks_pool', JSON.stringify(updated));
    setIsCreateModalOpen(false);
    setNewTaskForm({
      company: '',
      requesterName: '',
      phone: '',
      email: '',
      taskType: 'document',
      taskTypeName: '문서·기획 검토',
      title: '',
      memo: '',
      priority: 'normal'
    });
  };

  // Filtered Tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch =
      searchKeyword === '' ||
      t.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      t.requesterName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      t.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      t.id.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const countReceived = tasks.filter((t) => t.status === 'received').length;
  const countReviewing = tasks.filter((t) => t.status === 'reviewing').length;
  const countCompleted = tasks.filter((t) => t.status === 'completed').length;

  // Render Admin Authentication Screen if not authenticated
  if (!isAdmin) {
    return (
      <div className="py-10 px-4 sm:px-6 max-w-xl mx-auto animate-fade-in text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-[#0f2439] shadow-sm">
          <Lock className="w-8 h-8 text-[#f05a22]" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-3 border border-slate-200">
          <ShieldAlert className="w-3.5 h-3.5 text-[#f05a22]" />
          관리자 전용 보안 접근 영역
        </span>

        <h3 className="text-xl sm:text-2xl font-black text-[#0f2439] mb-2">
          업무 진행 현황 대시보드 (관리자 인증)
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
          고객사의 기업 기밀 자료 및 업무 의뢰 내용이 포함되어 있어,{' '}
          <strong className="text-slate-800 font-bold">승인된 관리자만 열람할 수 있습니다.</strong>
        </p>

        <form onSubmit={handleAdminLogin} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              관리자 비밀번호 입력
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#f05a22] focus:border-[#f05a22] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {authError && (
              <p className="text-xs text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {authError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#0f2439] hover:bg-slate-800 text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>관리자 권한 확인 및 대시보드 진입</span>
          </button>

          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span className="text-[11px] text-slate-400">
              테스트 계정 비밀번호: <strong className="text-slate-700">admin1234</strong>
            </span>
            <button
              type="button"
              onClick={handleQuickAdminAuth}
              className="text-[#f05a22] hover:text-[#d94e1c] font-bold cursor-pointer hover:underline text-xs"
            >
              관리자 원클릭 바로 인증
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-400 mt-4">
          주식회사 더마핑크 내부 보안 시스템 (Security Verified by Dermapink)
        </p>
      </div>
    );
  }

  // Render Authenticated Admin Dashboard
  return (
    <div className="space-y-6">
      {/* Admin Top Status Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm sm:text-base text-white">
                실시간 고객사 업무 의뢰 진행 현황
              </h4>
              <span className="text-[10px] bg-emerald-500 text-white font-black px-2 py-0.5 rounded-full">
                관리자 모드 활성
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              관리자: <strong className="text-white">주식회사 더마핑크 (djjjang@gmail.com)</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#f05a22] hover:bg-[#d94e1c] text-white text-xs font-bold flex items-center gap-1 transition shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>신규 업무 수동 등록</span>
          </button>
          <button
            onClick={loadTasks}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            title="새로고침"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleAdminLogout}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-300 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            title="관리자 로그아웃"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards with Real-time Count */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'all'
              ? 'bg-[#0f2439] text-white border-[#0f2439] shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 block mb-1">전체 누적 의뢰</span>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">{tasks.length}건</div>
          <span className="text-[10px] opacity-75 mt-1 block">모든 업무 풀</span>
        </button>

        <button
          onClick={() => setStatusFilter('received')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'received'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-bold ${statusFilter === 'received' ? 'text-blue-100' : 'text-blue-600'}`}>
              접수 대기
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">{countReceived}건</div>
          <span className="text-[10px] opacity-75 mt-1 block">초안 생성 및 매니저 배정</span>
        </button>

        <button
          onClick={() => setStatusFilter('reviewing')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'reviewing'
              ? 'bg-[#f05a22] text-white border-[#f05a22] shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-orange-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-bold ${statusFilter === 'reviewing' ? 'text-orange-100' : 'text-[#f05a22]'}`}>
              검토 진행중
            </span>
            <span className="w-2 h-2 rounded-full bg-[#f05a22] animate-ping"></span>
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">{countReviewing}건</div>
          <span className="text-[10px] opacity-75 mt-1 block">전문가 실무진 정밀 검수</span>
        </button>

        <button
          onClick={() => setStatusFilter('completed')}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            statusFilter === 'completed'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
              : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-bold ${statusFilter === 'completed' ? 'text-emerald-100' : 'text-emerald-600'}`}>
              납품 완료
            </span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-black tracking-tight">{countCompleted}건</div>
          <span className="text-[10px] opacity-75 mt-1 block">최종 결과물 전달 완료</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 mr-1 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            상태:
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0f2439] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            전체 ({tasks.length})
          </button>
          <button
            onClick={() => setStatusFilter('received')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'received'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            접수 ({countReceived})
          </button>
          <button
            onClick={() => setStatusFilter('reviewing')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'reviewing'
                ? 'bg-[#f05a22] text-white shadow-2xs'
                : 'bg-orange-50 text-[#f05a22] hover:bg-orange-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f05a22]"></span>
            검토중 ({countReviewing})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'completed'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            완료 ({countCompleted})
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="회사명, 의뢰인, 업무 검색..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#f05a22] focus:border-[#f05a22]"
          />
        </div>
      </div>

      {/* Task List Cards */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">해당 조건의 의뢰 업무가 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">상태 필터를 '전체'로 변경하거나 검색어를 확인해 주세요.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isReceived = task.status === 'received';
            const isReviewing = task.status === 'reviewing';
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-4"
              >
                {/* Card Top: ID, Company, Status, Priority */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {task.id}
                    </span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      {task.company}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ({task.requesterName})
                    </span>
                    <span className="text-[11px] text-slate-400">• {task.createdAt}</span>
                  </div>

                  {/* Status & Priority Badge */}
                  <div className="flex items-center gap-2">
                    {task.priority === 'urgent' && (
                      <span className="text-[10px] bg-red-100 text-red-700 font-black px-2 py-0.5 rounded-full">
                        긴급 24h
                      </span>
                    )}

                    {isReceived && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        접수 완료
                      </span>
                    )}
                    {isReviewing && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-[#f05a22] border border-orange-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f05a22] animate-ping"></span>
                        전문가 검토중
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        납품 완료
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Middle: Title & Memo */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {task.taskTypeName}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {task.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    {task.memo}
                  </p>
                </div>

                {/* Card Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      예상 완료: <strong className="text-slate-800 font-semibold">{task.estimatedCompletion}</strong>
                    </span>
                    <span className="font-bold text-slate-800 font-mono">
                      {task.progressPercent}% 진행
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isReviewing
                          ? 'bg-[#f05a22]'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${task.progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Reviewer Notes */}
                {task.reviewNotes && (
                  <div className="text-xs bg-[#fffaf5] border border-orange-200/70 p-3 rounded-xl flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#f05a22] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-800 text-[11px]">
                          검수 책임자: {task.assignedManager}
                        </span>
                        {task.deliverableName && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            산출물 첨부됨
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        {task.reviewNotes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Card Footer: Admin Actions (Real-time Status Change Buttons) */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <a
                      href={`tel:${task.phone}`}
                      className="hover:text-blue-600 font-medium flex items-center gap-1 hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {task.phone}
                    </a>
                    {task.email && (
                      <>
                        <span>•</span>
                        <a
                          href={`mailto:${task.email}`}
                          className="hover:text-blue-600 font-medium flex items-center gap-1 hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          {task.email}
                        </a>
                      </>
                    )}
                  </div>

                  {/* State Change Buttons for Admin */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">상태 변경:</span>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(task.id, 'received')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                        task.status === 'received'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
                      }`}
                    >
                      접수
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(task.id, 'reviewing')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                        task.status === 'reviewing'
                          ? 'bg-[#f05a22] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-[#f05a22]'
                      }`}
                    >
                      검토중
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(task.id, 'completed')}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                        task.status === 'completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700'
                      }`}
                    >
                      완료
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTask(task)}
                      className="text-xs px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold transition flex items-center gap-1 cursor-pointer ml-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>상세보기</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400">{selectedTask.id}</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedTask.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-medium block">의뢰 고객사</span>
                <span className="font-bold text-slate-800 text-sm">{selectedTask.company}</span>
                <p className="text-slate-600 mt-0.5">{selectedTask.requesterName} (연락처: {selectedTask.phone})</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 font-medium block">업무 분야 & 플랜</span>
                <span className="font-bold text-slate-800 text-sm">{selectedTask.taskTypeName}</span>
                <p className="text-slate-600 mt-0.5">배정 매니저: {selectedTask.assignedManager}</p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">상세 의뢰 내용</span>
              <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl leading-relaxed whitespace-pre-wrap">
                {selectedTask.memo}
              </p>
            </div>

            <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-orange-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f05a22]" />
                실시간 진행 현황 및 검수 코멘트
              </span>
              <p className="text-slate-700 leading-relaxed">{selectedTask.reviewNotes}</p>
              {selectedTask.deliverableName && (
                <div className="pt-2 border-t border-orange-200/60 flex items-center justify-between">
                  <span className="font-semibold text-emerald-800">
                    최종 산출물: {selectedTask.deliverableName}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`[산출물 전달 완료] '${selectedTask.deliverableName}' 고객사 카카오톡 및 이메일 전송이 완료되었습니다.`)}
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[11px] hover:bg-emerald-700"
                  >
                    산출물 다운로드
                  </button>
                </div>
              )}
            </div>

            {/* Quick Status Toggles in Modal */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">진행 상태:</span>
                <button
                  onClick={() => handleUpdateStatus(selectedTask.id, 'received')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedTask.status === 'received'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  접수
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedTask.id, 'reviewing')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedTask.status === 'reviewing'
                      ? 'bg-[#f05a22] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  검토중
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedTask.id, 'completed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    selectedTask.status === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  완료
                </button>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Task Registration Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#f05a22]" />
                <span>신규 업무 수동 등록 (유선/카톡 접수건)</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNewTask} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">고객사명</label>
                  <input
                    type="text"
                    required
                    placeholder="예: (주)넥스트솔루션"
                    value={newTaskForm.company}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">의뢰자 성함</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 팀장"
                    value={newTaskForm.requesterName}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, requesterName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">연락처</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-0000-0000"
                    value={newTaskForm.phone}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">업무 유형</label>
                  <select
                    value={newTaskForm.taskType}
                    onChange={(e) => setNewTaskForm({ ...newTaskForm, taskType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                  >
                    <option value="document">문서·기획 검토</option>
                    <option value="content">콘텐츠·마케팅</option>
                    <option value="research">시장·기업 리서치</option>
                    <option value="tech">운영·사내AI·웹</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">업무 제목</label>
                <input
                  type="text"
                  required
                  placeholder="예: 영문 공급계약서 독소조항 검토 및 수정 의견서"
                  value={newTaskForm.title}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">상세 의뢰 내용 및 요구사항</label>
                <textarea
                  rows={3}
                  required
                  placeholder="고객 요청사항, 납기 기한, 특이사항 입력"
                  value={newTaskForm.memo}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, memo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:ring-1 focus:ring-[#f05a22]"
                ></textarea>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="font-bold text-slate-700">우선순위:</label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    checked={newTaskForm.priority === 'normal'}
                    onChange={() => setNewTaskForm({ ...newTaskForm, priority: 'normal' })}
                  />
                  <span>일반 (48h)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    checked={newTaskForm.priority === 'urgent'}
                    onChange={() => setNewTaskForm({ ...newTaskForm, priority: 'urgent' })}
                  />
                  <span className="text-red-600 font-bold">긴급 (24h)</span>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#f05a22] hover:bg-[#d94e1c] text-white font-bold"
                >
                  등록 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
