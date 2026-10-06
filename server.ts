import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize shared Gemini client with required User-Agent
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `당신은 대한민국 1위 기업 실전 업무 대행 솔루션 'AI비서'의 전문 비즈니스 상담 어시스턴트입니다.
방문하는 고객들의 업무 고민을 경청하고, 친절하고 신뢰감 있는 비즈니스 어조(한국어 존댓말)로 답변하며, 맞춤형 서비스 안내 및 상담 신청(무료 컨설팅)을 자연스럽게 유도해야 합니다.

[핵심 서비스 개요]
- 슬로건: "AI를 배우지 마세요, 업무를 맡기세요."
- 핵심 가치: 복잡한 프롬프트 엔지니어링이나 AI 툴 학습 없이, 원하는 실무를 맡기면 최첨단 AI 에이전트와 도메인별 10년 차 이상 시니어 전문가가 하이브리드로 협업하여 48시간 내 고품질 완성본을 납품합니다.

[8대 핵심 업무 영역]
1. IR 피치덱 & 사업계획서: 투자유치(Series A/B), 정부지원사업, 공공입찰 제안서 등 16:9 와이드 인포그래픽 슬라이드 제작 (전체 화폐단위 대한민국 원화 정밀 표기)
2. 계약서 & 법률문서 AI 검토: 용역/납품/비밀유지(NDA)/투자계약서 독소조항 사전 진단 및 표준 양식 작성 (전문가 2차 감수)
3. 디자인 & 상세페이지: 와디즈/텀블벅/스마트스토어 상세페이지, 광고 배너, 브랜드 키비주얼
4. 마케팅 & SNS 콘텐츠: 신제품 런칭 보도자료, 네이버 블로그 SEO 최적화 아티클, 인스타그램 카드뉴스, 뉴스레터
5. 웹사이트 & 랜딩페이지: 전환율 높은 원페이지 랜딩페이지, 기업 소개 반응형 홈페이지
6. 숏폼 & 홍보영상: 틱톡/릴스/유튜브 쇼츠용 세로형 바이럴 영상, 기업 프로모션 영상, AI 나레이션/자막 합성
7. 글로벌 비즈니스 번역: 영/일/중 비즈니스 문서, 해외 바이어 제안서, 제품 매뉴얼 번역 및 원어민 감수
8. 데이터 리서치 & 시장조사: 경쟁사 벤치마킹, 타겟 시장 규모(TAM/SAM/SOM), 소비자 트렌드 데이터 리포트

[주요 요금제 안내]
- 베이직 스타터: 월 290,000원 (월 3개 태스크, 기본 문서/디자인/콘텐츠, 72시간 내 납품)
- 비즈니스 프로 (가장 인기 추천): 월 590,000원 (월 8개 태스크, IR덱/상세페이지/웹/마케팅 전 분야, 48시간 내 초안, 무제한 피드백, 전담 PM 배정)
- 엔터프라이즈 맞춤: 월 1,490,000원 (태스크 무제한 협의, 24시간 긴급 패스트트랙, 전담 시니어 TF팀, 철저한 NDA 체결)
- 1회권 크레딧 충전: 10만 원(10만 C), 30만 원(32만 C), 50만 원(55만 C), 100만 원(115만 C)

[진행 절차 및 소요 시간]
- 기본 소요 시간: 접수 후 24~48시간 이내 초안 납품 (엔터프라이즈/긴급 건은 24시간 이내 패스트트랙 가능)
- 4단계 프로세스: 1) 업무 의뢰서 작성 -> 2) AI 에이전트 초안 고속 생성 -> 3) 도메인 시니어 전문가 정밀 감수/리터칭 -> 4) 48시간 내 납품 및 무제한 피드백 반영

[보안 및 비밀유지(NDA)]
- 고객의 모든 비즈니스 데이터와 업로드 문서는 철저한 암호화 프로토콜로 보호되며, 기업 전용 NDA 체결이 가능합니다.
- 고객 데이터는 AI 모델 재학습에 절대 사용되지 않는 제로 리텐션(Zero-Retention) 원칙을 준수합니다.

[상담 및 신청 유도 가이드]
- 답변 시 핵심 요점을 명확하고 읽기 쉽게 정리(글머리 기호 또는 번호 활용).
- 답변 말미에는 항상 고객의 고민을 덜어줄 수 있도록 '무료 상담 신청' 또는 '채팅 내 간편 접수'를 적극 권유하세요.
  (예: "현재 준비 중이신 프로젝트의 세부 사항이나 희망 일정을 남겨주시면, 전문 PM이 30분 내로 최적의 제안과 견적을 안내해 드리겠습니다. 아래 [무료 상담 신청] 버튼을 눌러보세요!")
`;

// Helper for contextual fallback replies when API key is missing or offline
function generateFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('요금') || q.includes('가격') || q.includes('비용') || q.includes('얼마') || q.includes('플랜')) {
    return `AI비서는 고객사의 규모와 업무 빈도에 맞춰 합리적인 플랜을 제공하고 있습니다 💼

1. **베이직 스타터 (월 29만 원)**: 스타트업/1인 기업 추천 (월 3건 실무, 72시간 내 납품)
2. **비즈니스 프로 (월 59만 원, 인기★)**: 성장기 중소기업 추천 (월 8건 실무, 48시간 내 납품, 전담 PM 배정)
3. **엔터프라이즈 (월 149만 원)**: 중견/대기업 맞춤 (무제한 협의, 24시간 패스트트랙, 전담 TF)
4. **1회성 크레딧 충전**: 정기 구독 없이 필요한 건만 (10만 원부터 충전 가능)

현재 어떤 업무를 주로 맡기실 계획이신가요? 말씀해주시면 가장 가성비 좋은 플랜을 제안해 드립니다. 아래 **[무료 상담 신청하기]**를 누르시면 전담 매니저의 맞춤 견적을 받아보실 수 있습니다!`;
  }

  if (q.includes('시간') || q.includes('기간') || q.includes('납품') || q.includes('얼마나 걸') || q.includes('급한') || q.includes('일정')) {
    return `AI비서의 기본 제작 및 납품 기간은 **접수 후 24시간~48시간 이내**입니다 ⏱️

- **일반 업무**: 48시간 이내 1차 완성본 납품
- **긴급 패스트트랙**: 엔터프라이즈 플랜 또는 긴급 크레딧 적용 시 **24시간 이내 당일 대응** 가능
- **수정 및 피드백**: 초안 검토 후 무제한 피드백이 지원되어 완벽히 만족하실 때까지 보완해 드립니다.

급한 일정이 있으신가요? 지금 상담을 신청해주시면 오늘 즉시 전담팀이 배정되어 작업에 착수합니다!`;
  }

  if (q.includes('ppt') || q.includes('피치덱') || q.includes('사업계획서') || q.includes('투자') || q.includes('ir') || q.includes('발표')) {
    return `AI비서의 가장 대표적인 인기 서비스는 **'IR 피치덱 & 사업계획서 16:9 와이드 제작'**입니다 📊

- **완벽한 원화(₩) 및 재무 모델링 표기**: 최근 글로벌 트렌드 리서치 (주)트렌드24의 Series A 투자유치 제안서 7슬라이드(TAM 24.5조 원, 목표 매출 650억 원, 30억 투자유치 계획) 등 실전 검증 완료
- **스토리라인 & 맞춤 인포그래픽**: 텍스트만 주셔도 전문 기획자가 논리적인 목차 구성과 고해상도 디자인을 완성합니다.
- **제작 소요**: 2~4일 내 초안 납품

구상 중이신 사업계획서나 피치덱 주제가 있으신가요? **[무료 상담 신청하기]**를 통해 초안이나 아이디어를 남겨주시면 즉시 검토해 드립니다!`;
  }

  if (q.includes('보안') || q.includes('비밀') || q.includes('nda') || q.includes('유출') || q.includes('안전')) {
    return `AI비서는 기업 고객의 핵심 자산인 정보 보안을 최우선으로 보호합니다 🔒

- **100% 상호 비밀유지계약(NDA) 체결**: 의뢰 전 전자 서명을 통한 법적 효력의 NDA 체결
- **데이터 비학습 원칙(Zero-Retention)**: 고객사의 문서와 자료는 AI 모델의 재학습 데이터로 절대 사용되지 않습니다.
- **엔드투엔드 암호화**: 업로드 파일 및 산출물은 안전한 분산 암호화 서버에서 엄격히 관리됩니다.

안심하시고 기밀 문서나 내부 기획안을 전달해 주셔도 좋습니다.`;
  }

  if (q.includes('서비스') || q.includes('어떤') || q.includes('업무') || q.includes('종류') || q.includes('대행')) {
    return `AI비서는 기업의 실무를 책임지는 **8대 핵심 업무 대행 솔루션**을 제공합니다 ✨

1. **IR 피치덱 & 사업계획서**: 투자유치, 정부지원사업, 입찰 제안서
2. **계약서 & 법률문서 AI 검토**: 용역/제휴/NDA 계약서 독소조항 진단
3. **디자인 & 상세페이지**: 와디즈/스토어 상세페이지, 광고 배너, 포스터
4. **마케팅 기획 & SNS 콘텐츠**: 보도자료 배포, 블로그 SEO 글, 카드뉴스
5. **웹사이트 & 랜딩페이지**: 고전환율 랜딩페이지, 기업 소개 사이트
6. **숏폼 & 홍보영상**: 릴스/쇼츠/틱톡 세로형 영상, AI 음성 합성
7. **글로벌 비즈니스 번역**: 영/일/중 바이어 제안서, 제품 매뉴얼 번역
8. **데이터 리서치 & 시장조사**: 경쟁사 벤치마킹, 시장 규모(TAM) 분석

현재 가장 도움이 필요하신 분야가 있으신가요? 질문해 주시면 상세 프로세스와 샘플을 안내해 드릴게요!`;
  }

  if (q.includes('상담') || q.includes('신청') || q.includes('문의') || q.includes('연락') || q.includes('전화')) {
    return `무료 1:1 상담을 원하시는군요! 📋

아래 **[무료 상담 신청하기]** 버튼을 클릭하시면 하단 간편 신청 폼으로 즉시 이동합니다. 또는 채팅창에서 회사명과 연락처, 필요하신 업무를 간단히 말씀해주시면 전담 매니저가 30분 이내로 연락드려 맞춤 견적과 샘플을 무료로 안내해 드립니다.

카카오톡 실시간 상담(우측 하단 노란 버튼)으로도 즉시 문의가 가능합니다!`;
  }

  return `안녕하세요! AI비서 실시간 상담 어시스턴트입니다 🤖

저희 AI비서는 **사업계획서/IR덱, 계약서 검토, 디자인/상세페이지, 마케팅/보도자료, 웹사이트, 영상 제작** 등 기업 실무를 48시간 내에 전문가가 완성해 드리는 솔루션입니다.

- "PPT 제작 비용과 기간이 궁금해요"
- "계약서 검토는 어떻게 진행되나요?"
- "추천 요금제는 무엇인가요?"
- "무료 상담 신청하고 싶어요"

궁금하신 점을 편하게 남겨주시면 바로 명쾌하게 답변해 드리겠습니다!`;
}

// Chat API Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: '메시지를 입력해 주세요.' });
    }

    if (ai) {
      try {
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const reply = response.text || generateFallbackReply(message);
        return res.json({ reply });
      } catch (genErr) {
        console.warn('Gemini generateContent error, falling back:', genErr);
        const reply = generateFallbackReply(message);
        return res.json({ reply });
      }
    } else {
      const reply = generateFallbackReply(message);
      return res.json({ reply });
    }
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    const reply = generateFallbackReply(req.body?.message || '');
    return res.json({ reply });
  }
});

async function start() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: Number(PORT) },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

start();
