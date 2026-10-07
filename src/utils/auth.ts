import { AuthUser } from '../types';

const STORAGE_KEY = 'ai_current_user';

export const SAMPLE_USERS: AuthUser[] = [
  {
    id: 'user-sample-01',
    name: '최현우 이사',
    email: 'hwchoi@alphabio.co.kr',
    phone: '010-3849-1102',
    company: '(주)알파바이오',
    loginProvider: 'kakao',
    credits: 45,
    planId: 'business_pro',
    planName: '비즈니스 프로 (월 59만원)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    loggedInAt: new Date().toISOString()
  },
  {
    id: 'user-sample-02',
    name: '이지은 팀장',
    email: 'jieun@modernliving.kr',
    phone: '010-9284-5512',
    company: '모던리빙 스튜디오',
    loginProvider: 'email',
    credits: 20,
    planId: 'starter',
    planName: '베이직 스타터 (월 29만원)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    loggedInAt: new Date().toISOString()
  },
  {
    id: 'user-sample-03',
    name: '강태석 본부장',
    email: 'tskang@fintechsol.io',
    phone: '010-4491-8823',
    company: '핀테크 솔루션즈',
    loginProvider: 'kakao',
    credits: 60,
    planId: 'enterprise',
    planName: '엔터프라이즈 맞춤 (월 149만원)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    loggedInAt: new Date().toISOString()
  }
];

export function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to save current user:', err);
  }
}

export function loginWithKakao(name: string = '카카오 고객 회원'): AuthUser {
  const newUser: AuthUser = {
    id: `kakao-${Date.now()}`,
    name,
    email: 'kakao_user@daum.net',
    phone: '010-1234-5678',
    company: '개인 고객 / 파트너스',
    loginProvider: 'kakao',
    credits: 30,
    planId: 'business_pro',
    planName: '비즈니스 프로 (무료 시범 혜택)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    loggedInAt: new Date().toISOString()
  };
  setCurrentUser(newUser);
  return newUser;
}

export function loginWithEmailOrPhone(info: {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
}): AuthUser {
  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    name: info.name || '고객 회원',
    email: info.email || 'client@business.co.kr',
    phone: info.phone || '010-0000-0000',
    company: info.company || '주식회사 고객사',
    loginProvider: 'email',
    credits: 30,
    planId: 'business_pro',
    planName: '비즈니스 프로 플랜',
    loggedInAt: new Date().toISOString()
  };
  setCurrentUser(newUser);
  return newUser;
}

export function logoutUser(): void {
  setCurrentUser(null);
}
