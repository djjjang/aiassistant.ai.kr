import { ServiceItem, TeamMember, PortfolioItem, ReviewItem, PricingPlan, FAQItem, CreditPackage } from './types';
import contractReviewImg from './assets/images/contract_review_sample_1789468628301.jpg';
import aiContractReviewImg from './assets/images/ai_contract_review_report_1789530423310.jpg';
import meetingNotesImg from './assets/images/meeting_notes_minutes_1789468642460.jpg';
import weeklyWorkReportImg from './assets/images/weekly_work_report_1789548769236.jpg';
import startupBusinessPlanImg from './assets/images/startup_business_plan_1789548410702.jpg';
import planDetailPageImg from './assets/images/plan_detail_page_1789548433211.jpg';
import tipsBusinessPlanImg from './assets/images/tips_business_plan_1789468656077.jpg';
import cardNewsCoverImg from './assets/images/card_news_cover_1789549999237.jpg';
import cardNewsBodyImg from './assets/images/card_news_body_1789550011323.jpg';
import cardNewsEndingImg from './assets/images/card_news_ending_1789550026842.jpg';
import pressReleaseSampleImg from './assets/images/press_release_sample_1789550701635.jpg';
import newsletterNoticeUpdateImg from './assets/images/newsletter_notice_update_1789551161711.jpg';
import regulationChecklistReportImg from './assets/images/regulation_checklist_report_1789625777409.jpg';
import globalTechReportSummaryImg from './assets/images/global_tech_report_summary_1789625937449.jpg';
import influencerOutreachEmailImg from './assets/images/influencer_outreach_email_1790045623676.jpg';
import csChatbotFaqScenarioImg from './assets/images/cs_chatbot_faq_scenario.svg';
import csResponseTemplateLibraryImg from './assets/images/cs_response_template_library.svg';
import csAlimtalkWelcomeGuideImg from './assets/images/cs_alimtalk_welcome_guide.svg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'document',
    number: '01',
    categoryCode: 'DOCUMENTS',
    name: '문서 업무',
    description: '계약서 검토, 회의록 정리, 사업계획서 작성 및 수정, 주간 실적 보고서 작성',
    tags: ['계약서 검토', '회의록 정리', '사업계획서', '보고서 작성'],
    icon: 'FileText',
    colorClass: 'brand-navy',
    previewImage: aiContractReviewImg,
    previewImageAlt: 'AI 계약서 검토 및 비즈니스 문서 실무 산출물',
    portfolioExample: {
      id: 'doc-1',
      client: '플랫폼 개발사 O사',
      title: '용역계약서 조항 검토 및 독소조항 분석',
      duration: '의뢰 후 24시간 이내',
      result: '위험 조항 5건 발견 및 실무 수정 권고 의견 정리',
      summary: '용역 계약서의 주요 조항을 검토하여 자동 연장 통보기한, 대금 지급 기한, 손해배상 한도 등 실무적으로 분쟁 소지가 있는 조항을 짚어내고 수정 문구를 제안했습니다.',
      deliverable: '조항별 검토 의견서 및 계약서 수정안',
      image: aiContractReviewImg,
      imageAlt: '계약서 검토 의견서 산출물'
    },
    portfolioCases: [
      {
        id: 'doc-1',
        client: '플랫폼 개발사 O사',
        title: '용역계약서 조항 검토 및 독소조항 분석',
        duration: '의뢰 후 24시간 이내',
        result: '위험 조항 5건 발견 및 실무 수정 권고 의견 정리',
        summary: '용역 계약서의 주요 조항을 검토하여 자동 연장 통보기한, 대금 지급 기한, 손해배상 한도 등 실무적으로 분쟁 소지가 있는 조항을 짚어내고 수정 문구를 제안했습니다.',
        tags: ['계약서검토', '독소조항분석', '용역계약서', '의견서작성'],
        deliverable: '조항별 검토 의견서 및 계약서 수정안',
        image: aiContractReviewImg,
        imageAlt: '계약서 검토 의견서 산출물',
        originalDocumentMeta: {
          recipient: '플랫폼 개발사 O사 법무/경영지원팀',
          sender: '트렌드24 AI 계약서 실무 분석팀',
          subject: '[법무 실무 검토] 소프트웨어 개발 용역계약서 조항별 위험도 분석 및 수정 권고안',
          docDate: '2026.09.15 (검토 완료)',
          docTypeBadge: '계약서 독소조항 분석 의견서',
          attachments: ['용역계약서_수정대조표.docx', '조항별리스크진단서.pdf']
        },
        originalText: `[계약서 검토 의견서] 소프트웨어 개발 용역계약서 실무 검토 보고

1. 검토 대상 및 범위
- 대상: 플랫폼 신규 기능 개발 및 유지보수 용역계약서 (총 18개 조항)
- 의뢰인: O사 (수급인)

2. 주요 독소조항 진단 및 수정 권고안
■ 제7조 (지체상금율 과다 조항)
- 원문: "을이 납기를 지연할 경우 지체 1일당 총 계약금액의 5/1000를 배상한다."
- 리스크: 표준 하도급 기준(1.5/1000) 대비 3배 이상 과도하여 분쟁 시 큰 손실 위험.
- 수정안 권고: "지체 1일당 총 계약금액의 1.5/1000로 조정하며, 총 배상액은 계약금의 10%를 초과할 수 없다."

■ 제12조 (무제한 하자담보 책임)
- 원문: "검수 완료 후에도 을은 본 건 프로그램의 모든 하자에 대해 영구히 무상 보수한다."
- 수정안 권고: "검수 완료일로부터 1년간에 한하여 중대한 결함에 대해 무상 보수한다."

■ 제15조 (지식재산권 귀속)
- 권고: 개발 이전부터 O사가 보유한 공통 라이브러리 및 오픈소스 코드는 O사의 고유 권리로 유보 조항 삽입 필수.`
      },
      {
        id: 'doc-2',
        client: '친환경 스타트업 (주)오일루프',
        title: '사업계획서 작성 및 수정',
        duration: '의뢰 후 48시간 이내',
        result: 'TIPS 지원사업 사업계획서 7개 챕터 기획 및 도식화 완성',
        summary: '복잡한 폐식용유 수거 플랫폼 프로세스를 간결하게 다듬고, 문제인식(회수율 40%), AI 매칭 솔루션, 3개년 성장전략 로드맵을 시각화하여 심사위원 맞춤형 사업계획서로 작성했습니다.',
        tags: ['사업계획서', 'TIPS지원사업', '도식화기획', '초안작성'],
        deliverable: '사업계획서 완성본 및 고해상도 인포그래픽 도식 4종',
        image: startupBusinessPlanImg,
        imageAlt: 'TIPS 지원사업 사업계획서 기획 및 작성 산출물',
        galleryImages: [
          { url: startupBusinessPlanImg, title: 'TIPS 사업계획서 총괄 기획 및 종합 산출물 (오일루프)', pageLabel: '종합 오버뷰' },
          { url: planDetailPageImg, title: '핵심 기술 실현가능성 및 상세 시장 분석 페이지', pageLabel: '1p 핵심기술 및 시장' },
          { url: tipsBusinessPlanImg, title: '성장전략 및 연도별 재무 로드맵 브리핑 보고서', pageLabel: '2p 성장전략 및 재무' }
        ],
        originalDocumentMeta: {
          recipient: '중소벤처기업부 TIPS 운영기관 평가위원회',
          sender: '(주)오일루프 대표이사 박진우 / 기획 트렌드24',
          subject: '[TIPS 과제] AI 기반 폐식용유 스마트 수거 및 바이오디젤 자원 순환 플랫폼',
          docDate: '2026.09.10 (제출 완료)',
          docTypeBadge: 'TIPS 사업계획서 요약본',
          attachments: ['TIPS_사업계획서_최종본.pdf', '3개년_재무추정모델.xlsx']
        },
        originalText: `[TIPS 사업계획서 요약] AI 폐식용유 자원 순환 수거 플랫폼 (주)오일루프

1. 창업아이템 개요 및 문제인식
- 문제점: 국내 요식업소 폐식용유 배출량 연간 32만 톤 중 비공식 수거 및 무단 폐기가 40%에 달함. 수거 경로의 불투명성과 정산 지연으로 소상공인 불만 가중.
- 해결 방안: IoT 스마트 수거통 + AI 실시간 동선 최적화 + 블록체인 정산 시스템 구축.

2. 기술의 차별성 및 실현 가능성
- 스마트 레벨 센서로 오일 잔여량 실시간 감지 (오차범위 2% 이내)
- 수거 기사용 AI 최적 경로 알고리즘으로 물류 비용 35% 절감
- 바이오디젤 정유사 직납 B2B 파이프라인 확보

3. 3개년 성장 전략 및 마일스톤
- 1차년도: 수도권 5개 구 시범 운영 (가맹 요식업소 1,200개소)
- 2차년도: 전국 광역시 거점 센터 확장 및 월 800톤 수거 달성
- 3차년도: 연 매출 120억 원 및 아시아 시장 폐자원 플랫폼 라이선싱 수출`
      },
      {
        id: 'doc-3',
        client: '스타트업 F사',
        title: '회의록 정리 및 핵심 할 일 추출',
        duration: '의뢰 후 24시간 이내',
        result: '회의 내용 요약 및 담당자별 할 일(R&R) 정리',
        summary: '주간 회의 녹음본에서 결정된 사항과 담당자별 할 일(R&R)을 일목요연하게 노션 페이지로 정리했습니다.',
        tags: ['회의록정리', '할일추출', '노션정리'],
        deliverable: '정리된 회의록 문서 및 노션 템플릿',
        image: meetingNotesImg,
        imageAlt: '회의록 정리 및 할 일 추출 산출물',
        originalDocumentMeta: {
          recipient: '스타트업 F사 전사 슬랙 / 노션 워크스페이스',
          sender: '트렌드24 회의록 정리 전담 매니저',
          subject: '[주간 회의록] Q4 프로덕트 릴리즈 스프린트 및 마케팅 마일스톤 정리',
          docDate: '2026.09.19',
          docTypeBadge: '회의록 및 Action Items 요약',
          attachments: ['회의녹취요약_타임라인.pdf', '노션템플릿_링크.url']
        },
        originalText: `[주간 전체 스프린트 회의록] 스타트업 F사 9월 3주차 회의

■ 일시: 2026년 9월 19일 14:00~15:30 (총 90분)
■ 참석자: 김대표, 이CTO, 박디자이너, 최마케터, 트렌드24 매니저

1. 주요 논의 및 결정 사항
- 10월 5일 결제 모듈 v2.0 정기 점검 배포 확정 (무중단 배포 진행)
- 온보딩 튜토리얼 단계를 기존 5단계에서 3단계로 간소화 (이탈률 개선 목적)
- 인스타그램 신규 릴스 캠페인 예산 500만원 승인

2. 담당자별 Action Items (R&R)
- [이CTO] 결제 게이트웨이 테스트베드 연동 완료 (~9/23까지)
- [박디자이너] 온보딩 3단계 신규 와이어프레임 Figma 전달 (~9/21까지)
- [최마케터] 인플루언서 20인 섭외 메일 초안 작성 및 발송 (~9/22까지)
- [김대표] PG사 수수료 재협의 미팅 조율 (~9/24까지)`
      },
      {
        id: 'doc-4',
        client: '중소기업 P사',
        title: '주간 업무 보고서 및 실적 요약',
        duration: '주 1회 정기 작성',
        result: '반복 보고서 작성 간소화 및 주요 지표 정리',
        summary: '매주 취합해야 하는 사업 실적과 외부 주요 지표를 경영진이 한눈에 파악할 수 있는 주간 보고서로 정리했습니다.',
        tags: ['주간보고서', '실적요약', '정기보고'],
        deliverable: '주간 업무 보고서 템플릿 및 완성본',
        image: weeklyWorkReportImg,
        imageAlt: '한글 주간 업무 보고서 및 실적 요약 산출물'
      }
    ],
    detailedTasks: [
      '근로·용역·거래 계약서 조항 검토 및 수정 의견 정리',
      '회의 녹음본 또는 메모 바탕 회의록 작성 및 할 일 정리',
      '사업계획서 및 회사소개서 초안 작성 및 내용 보완',
      '주간·월간 업무 실적 보고서 및 요약본 작성'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: '검토 의견서, 수정된 사업계획서 문서, 회의록 정리본'
  },
  {
    id: 'content',
    number: '02',
    categoryCode: 'CONTENT CREATION',
    name: '콘텐츠 업무',
    description: '블로그 글 작성, SNS 카드뉴스 문구, 보도자료 초안, 고객 안내 뉴스레터',
    tags: ['블로그 글', '카드뉴스', '보도자료', '뉴스레터'],
    icon: 'Edit3',
    colorClass: 'blue-600',
    previewImage: cardNewsCoverImg,
    previewImageAlt: 'SNS 실무 카드뉴스 3장 및 홍보 콘텐츠 산출물',
    portfolioExample: {
      id: 'cnt-1',
      client: 'IT 솔루션 A사',
      title: 'SNS 홍보 카드뉴스 3장 제작 및 블로그 원고',
      duration: '정기 발행 (의뢰 후 24시간 내)',
      result: '인스타그램 도달률 280% 상승 및 핵심 서비스 3장 요약',
      summary: '바쁜 스타트업 대표와 실무자를 타겟으로, 복잡한 업무 프로세스를 3장의 한글 카드뉴스(1p 표지, 2p 본문, 3p 엔딩)로 기획·디자인하여 SNS 배포용으로 납품했습니다.',
      deliverable: '배포용 고해상도 카드뉴스 3종 (표지/본문/엔딩) 및 카피 기획안',
      image: cardNewsCoverImg,
      imageAlt: '한글 기반 SNS 카드뉴스 3장 실무 산출물'
    },
    portfolioCases: [
      {
        id: 'cnt-1',
        client: 'IT 솔루션 A사',
        title: 'SNS 홍보 카드뉴스 3장 제작 및 블로그 원고',
        duration: '정기 발행 (의뢰 후 24시간 내)',
        result: '인스타그램 도달률 280% 상승 및 핵심 서비스 3장 요약',
        summary: '바쁜 스타트업 대표와 실무자를 타겟으로, 복잡한 업무 프로세스를 3장의 한글 카드뉴스(1p 표지, 2p 본문, 3p 엔딩)로 기획·디자인하여 SNS 배포용으로 납품했습니다.',
        tags: ['카드뉴스제작', 'SNS콘텐츠', '인스타그램', '카드뉴스기획'],
        deliverable: '배포용 고해상도 카드뉴스 3종 (표지/본문/엔딩) 및 카피 기획안',
        image: cardNewsCoverImg,
        imageAlt: '한글 기반 SNS 카드뉴스 3장 실무 산출물',
        galleryImages: [
          { url: cardNewsCoverImg, title: '1p 표지: 바쁜 스타트업 대표를 위한 업무 자동화 3원칙', pageLabel: '1p 표지' },
          { url: cardNewsBodyImg, title: '2p 본문: 01. 반복되는 문서 업무 분리 및 전담 매니저 솔루션', pageLabel: '2p 본문' },
          { url: cardNewsEndingImg, title: '3p 엔딩: 핵심 사업 집중 및 무료 업무 진단 신청 (CTA)', pageLabel: '3p 엔딩' }
        ],
        originalDocumentMeta: {
          recipient: 'IT 솔루션 A사 공식 인스타그램 & 링크드인 채널',
          sender: '트렌드24 콘텐츠 기획 에디터',
          subject: '[카드뉴스 원고 기획안] 스타트업 대표를 위한 업무 자동화 3원칙 (총 3슬라이드)',
          docDate: '2026.09.17 (배포 완료)',
          docTypeBadge: 'SNS 카드뉴스 기획 원고',
          attachments: ['카드뉴스_배포규격_1080x1080.zip', '캡션_해시태그_가이드.txt']
        },
        originalText: `[SNS 카드뉴스 3장 원고 기획안] 바쁜 스타트업 대표를 위한 업무 자동화 3원칙

■ [1P 표지 슬라이드]
- 메인 헤드카피: "매일 야근하는 대표님, 언제까지 계약서 붙잡고 계실 건가요?"
- 서브카피: 바쁜 스타트업 대표와 1인 사업자를 위한 '업무 자동화 3원칙'
- 비주얼 연출: 서류 더미에서 해방되어 핵심 비즈니스에 집중하는 깔끔한 그래픽

■ [2P 본문 슬라이드]
- 소제목: "01. 반복되는 일상 행정·문서 업무는 즉시 분리하세요"
- 핵심 본문:
  · 계약서 조항 검토, 주간 회의록 정리, 경쟁사 시장조사...
  · 대표의 시간 1시간은 수십만 원의 가치입니다.
  · 정형화된 실무는 '트렌드24 전담 매니저'에게 맡기고, 대표님은 제품 개발과 투자 유치에만 몰입하세요.
- 체크포인트: "월평균 행정 소요 시간 42시간 절감"

■ [3P 엔딩 슬라이드 (CTA)]
- 메인 카피: "지금 우리 회사에 꼭 필요한 외주 업무는 무엇일까요?"
- 행동 유도:
  · 프로필 링크 클릭 시 [무료 업무 진단 테스트] 즉시 제공
  · 트렌드24 카카오 채널 추가 시 1회 무료 체험권 증정
- 캡션 태그: #스타트업 #업무자동화 #트렌드24 #시간관리 #사업성공`
      },
      {
        id: 'cnt-2',
        client: '기술 기업 R사',
        title: '신제품 출시 및 소식 보도자료 작성',
        duration: '의뢰 후 24시간 이내',
        result: '언론사 배포용 표준 보도자료 양식 완성',
        summary: '신제품 출시와 기업 소식을 주요 언론사 송고 규격에 맞춰 제목과 본문으로 읽기 쉽게 작성했습니다.',
        tags: ['보도자료', '홍보문구', '언론배포'],
        deliverable: '표준 보도자료 원고 및 핵심 요약 팩트시트',
        image: pressReleaseSampleImg,
        imageAlt: '한글 표준 언론 배포용 보도자료 및 팩트시트 산출물',
        originalDocumentMeta: {
          recipient: '주요 경제지·IT 전문지 IT/스타트업 출입기자단',
          sender: '기술 기업 R사 홍보실 / 작성 트렌드24',
          subject: '[보도자료] 기술 기업 R사, 차세대 AI 온디바이스 음성인식 엔진 ‘보이스플로우 v2.0’ 공식 출시',
          docDate: '2026.09.12 (즉시 배포)',
          docTypeBadge: '언론사 송고용 표준 보도자료',
          attachments: ['보도자료_고해상도_대표이미지.jpg', 'R사_팩트시트_2026.pdf']
        },
        originalText: `[보도자료] 배포일시: 2026년 9월 12일 (즉시 배포 가능)
담당: 기술 기업 R사 홍보실 (pr@r-tech.io / 02-9876-5432)

기술 기업 R사, 차세대 AI 온디바이스 음성인식 엔진 ‘보이스플로우 v2.0’ 전격 출시
- 클라우드 연결 없이 기기 자체에서 실시간 한국어 인식 정확도 98.2% 구현
- 금융·의료 등 보안이 중요한 산업군 맞춤형 경량화 모델 탑재
- "서버 비용 부담 없이 프라이버시 보호와 초고속 응답 속도 동시 만족"

[본문]
AI 솔루션 전문 기업 R사(대표 이민혁)가 인터넷 연결 없이 기기 내부에서 초고속으로 음성을 텍스트로 변환하는 온디바이스 AI 음성인식 솔루션 '보이스플로우 v2.0'을 12일 공식 출시했다고 밝혔다.

이번 신제품은 파라미터를 70% 경량화하면서도 한국어 특유의 방언과 전문 용어 인식률을 98.2%까지 끌어올린 것이 특징이다. 특히 금융 상담, 전자기록물 작성 등 외부 데이터 유출이 엄격히 금지된 환경에서 완벽한 프라이버시 보안을 보장한다.

R사 이민혁 대표는 "기존 클라우드 기반 음성 API의 비싼 서버 호출 비용과 지연 시간을 획기적으로 개선했다"며 "중소형 스마트 기기 제조사들도 손쉽게 최고 수준의 음성 AI 인터페이스를 도입할 수 있을 것"이라고 밝혔다.

[문의 및 취재 지원]
- 홍보팀 pr@r-tech.io / 010-1234-5678
- 웹사이트: https://r-tech.io`
      },
      {
        id: 'cnt-3',
        client: 'SaaS / 리빙 브랜드 L사',
        title: '고객 안내 뉴스레터 및 공지사항 자동 업데이트',
        duration: '정기 발행 및 상시 업데이트',
        result: '고객 오픈율 34% 달성 및 주요 공지사항 자동화',
        summary: '신규 기능 출시, 정기 점검, 프로모션 등 고객에게 전달할 공지사항과 뉴스레터 문안을 작성하고 반응형 이메일 및 웹 공지 템플릿으로 제작했습니다.',
        tags: ['뉴스레터', '공지사항업데이트', '고객안내', '이메일템플릿'],
        deliverable: '반응형 이메일 뉴스레터 원고 및 공지사항 업데이트 카드 템플릿',
        image: newsletterNoticeUpdateImg,
        imageAlt: '고객 안내 뉴스레터 및 공지사항 자동 업데이트 실무 산출물'
      }
    ],
    detailedTasks: [
      '회사 블로그 및 포털 검색용 정보성 글 작성',
      '인스타그램 등 SNS 카드뉴스용 핵심 문구 기획',
      '신제품 출시, 제휴 등 표준 언론 보도자료 초안 작성',
      '고객 안내 및 정기 소식 전달용 뉴스레터 작성'
    ],
    turnaroundTime: '24~36시간 이내',
    deliverableSample: '블로그 원고, 카드뉴스 문구 기획안, 보도자료 문서'
  },
  {
    id: 'research',
    number: '03',
    categoryCode: 'RESEARCH & ANALYSIS',
    name: '리서치 및 자료 조사',
    description: '경쟁사 가격/기능 비교, 업계 시장 동향 조사, 해외 자료 국문 요약',
    tags: ['경쟁사 비교', '시장 조사', '자료 요약', '규제 확인'],
    icon: 'Search',
    colorClass: 'emerald-600',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '시장 조사 및 경쟁사 비교 리포트 산출물',
    portfolioExample: {
      id: 'res-1',
      client: '쇼핑몰 플랫폼 B사',
      title: '경쟁사 서비스 및 요금제 비교 조사',
      duration: '의뢰 후 24~36시간',
      result: '주요 경쟁사 가격과 혜택 한눈에 비교 정리',
      summary: '동종 업계 주요 경쟁사들의 요금제와 제공 기능을 항목별로 조사하여 비교표와 핵심 요약으로 정리했습니다.',
      deliverable: '경쟁사 비교표 및 핵심 요약 보고서',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '경쟁사 비교 조사 리포트'
    },
    portfolioCases: [
      {
        id: 'res-1',
        client: '쇼핑몰 플랫폼 B사',
        title: '경쟁사 서비스 및 요금제 비교 조사',
        duration: '의뢰 후 24~36시간',
        result: '주요 경쟁사 가격과 혜택 한눈에 비교 정리',
        summary: '동종 업계 주요 경쟁사들의 요금제와 제공 기능을 항목별로 조사하여 비교표와 핵심 요약으로 정리했습니다.',
        tags: ['경쟁사비교', '가격비교', '서비스분석'],
        deliverable: '경쟁사 비교표 및 핵심 요약 보고서',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '경쟁사 비교 조사 리포트'
      },
      {
        id: 'res-2',
        client: '핀테크 & 신규사업 T사',
        title: '신규 사업 기본 규제 및 필수 인허가 체크리스트',
        duration: '의뢰 후 48시간 이내',
        result: '사업 시작 전 필수 확인 규제 및 인허가 점검표 완비',
        summary: '신규 서비스를 런칭할 때 사전에 반드시 확인해야 하는 필수 법령, 소관 부처 인허가 조건, 개인정보보호 및 결제 규정 준수 사항을 체크리스트로 체계화하여 정리했습니다.',
        tags: ['규제체크리스트', '인허가확인', '신규사업점검', '법령정리'],
        deliverable: '신규 사업 인허가 규제 점검표 및 실무 조치 가이드라인',
        image: regulationChecklistReportImg,
        imageAlt: '신규 사업 기본 규제 및 필수 인허가 체크리스트 실무 산출물'
      },
      {
        id: 'res-3',
        client: '글로벌 테크 스타트업 S사',
        title: '해외 기술 자료 및 시장 동향 국문 번역 요약',
        duration: '의뢰 후 24시간 이내',
        result: '방대한 영문 글로벌 기술 동향의 핵심 국문 발췌 요약 완성',
        summary: '해외 주요 테크 컨퍼런스 자료, 글로벌 시장 조사 리포트의 방대한 영문 원문에서 비즈니스에 필요한 핵심 인사이트만 추출하여 국문 브리프로 번역·요약했습니다.',
        tags: ['해외기술자료', '시장동향조사', '국문번역요약', '글로벌트렌드'],
        deliverable: '해외 기술 자료 국문 요약 보고서 및 영문 원문 핵심 발췌록',
        image: globalTechReportSummaryImg,
        imageAlt: '해외 기술 자료 및 시장 동향 국문 번역 요약 산출물'
      }
    ],
    detailedTasks: [
      '동종 업계 주요 경쟁사 기능, 가격, 서비스 항목별 비교',
      '신규 사업 관련 기초 시장 현황 및 업계 자료 조사',
      '해외 자료 및 영문 문서 핵심 내용 국문 요약',
      '사업 추진 시 확인해야 할 기본 인허가 및 규제 체크리스트'
    ],
    turnaroundTime: '48시간 이내',
    deliverableSample: '비교 분석표, 국문 요약 보고서, 조사 결과 정리 시트'
  },
  {
    id: 'marketing',
    number: '04',
    categoryCode: 'MARKETING EXECUTION',
    name: '마케팅 실행 보조',
    description: '광고 문구 카피라이팅, 인플루언서 리스트업 및 섭외 메일, 고객 리뷰 요약',
    tags: ['광고 문구', '인플루언서', '제안 메일', '리뷰 분석'],
    icon: 'Megaphone',
    colorClass: 'amber-600',
    previewImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '광고 문구 및 마케팅 보조 실무 산출물',
    portfolioExample: {
      id: 'mkt-1',
      client: '뷰티 브랜드 C사',
      title: '온라인 광고 문구 작성 및 A/B 테스트 세트',
      duration: '의뢰 후 24시간 이내',
      result: '클릭을 유도하는 맞춤 광고 문구 다수 제작',
      summary: 'SNS 및 검색 광고에 사용할 다양한 소구점의 광고 카피를 작성하고 테스트용으로 정리했습니다.',
      deliverable: '광고 문구 세트 스프레드시트',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '온라인 광고 문구 작성 산출물'
    },
    portfolioCases: [
      {
        id: 'mkt-1',
        client: '뷰티 브랜드 C사',
        title: '온라인 광고 문구 작성 및 A/B 테스트 세트',
        tabLabel: '광고 카피 A/B 테스트',
        duration: '의뢰 후 24시간 이내',
        result: '클릭을 유도하는 맞춤 광고 문구 다수 제작',
        summary: 'SNS 및 검색 광고에 사용할 다양한 소구점의 광고 카피를 작성하고 테스트용으로 정리했습니다.',
        tags: ['광고문구', '소구점개발', '카피라이팅'],
        deliverable: '광고 문구 세트 스프레드시트',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '온라인 광고 문구 작성 산출물',
        originalDocumentMeta: {
          recipient: '뷰티 브랜드 C사 마케팅 총괄팀',
          sender: '트렌드24 AI 마케팅 실행 전담 매니저',
          subject: '[카피 세트] 비건 수분 진정 세럼 SNS/검색 광고 A/B 테스트 문구안',
          docDate: '2026.09.20 (검토 승인 완료)',
          docTypeBadge: '광고 카피라이팅 A/B 테스트 세트',
          attachments: ['광고문구_소구점분류표.xlsx', '메타광고_이미지매칭안.pdf']
        },
        originalText: `[프로젝트] 뷰티 브랜드 C사 비건 수분 진정 세럼 광고 카피 세트

■ 소구점 1: 즉각적인 수분 진정 & 민감 피부 해결
[메인 헤드카피]
- A안: "바르자마자 붉은 기 진정, 피부 온도 -4.5℃ 즉각 쿨링"
- B안: "민감성 피부 98%가 만족한 순한 진정력, 세럼 하나로 끝내세요"
[서브 바디카피]
- 끈적임 없이 피부 속 깊숙이 흡수되는 8중 히알루론산 포뮬러. 자극받은 피부 장벽을 10분 만에 탄탄하게 케어합니다.
[CTA 버튼]
- "지금 15% 런칭 특가로 만나보기" / "민감 피부 무료 샘플 신청"

■ 소구점 2: 착한 성분 & 비건 인증
[메인 헤드카피]
- A안: "화해 20가지 유해 성분 0개, 피부가 편안한 100% 비건 포뮬러"
- B안: "피부에 닿는 첫 번째 수분, 성분표를 당당하게 공개합니다"
[서브 바디카피]
- 프랑스 이브 비건 정식 인증 완료. 동물 실험 없이 자연 유래 진정 성분만 가득 채웠습니다.

■ 소구점 3: 고객 후기 & 재구매율 증명
[메인 헤드카피]
- A안: "출시 2주 만에 3차 완판, '인생 세럼' 후기가 증명합니다"
- B안: "재구매율 87%의 이유? 다음 날 아침 거울 속 피부 결이 다릅니다"
[서브 바디카피]
- "건조함 때문에 화장이 들떴었는데, 이 세럼 바른 뒤 속당김이 완전히 사라졌어요." (실제 구매 고객 리뷰 요약)`
      },
      {
        id: 'mkt-2',
        client: '홈케어 뷰티 디바이스 G사 (글로우빔)',
        title: 'AI 협찬 제안 메일 작성 및 인플루언서 섭외 문안',
        tabLabel: '인플루언서 섭외 문안',
        duration: '의뢰 후 24시간 이내',
        result: '인스타그램 인플루언서 섭외 회신율 극대화 맞춤 제안 메일 완성',
        summary: '8.2만 팔로워 뷰티 크리에이터 타깃 LED 마스크 제품 협찬 조건, 포스팅 가이드라인, 전용 할인코드 혜택을 명시한 정중하고 설득력 있는 공식 섭외 메일을 작성했습니다.',
        tags: ['협찬제안메일', '인플루언서섭외', '아웃리치스튜디오', '뷰티디바이스'],
        deliverable: 'AI 협찬 제안 메일 전문 및 첨부 협찬 가이드라인',
        image: influencerOutreachEmailImg,
        imageAlt: 'AI 협찬 제안 메일 작성 실무 산출물 (인플루언서 섭외 문안)',
        galleryImages: [
          {
            url: influencerOutreachEmailImg,
            title: 'AI 협찬 제안 메일 및 인플루언서 섭외 산출물',
            pageLabel: '고해상도 실무 산출물'
          },
          {
            url: '/assets/marketing-influencer-outreach-email.svg',
            title: '인플루언서 제안 메일 디지털 규격 및 첨부 구성',
            pageLabel: '디지털 레이아웃'
          }
        ],
        originalDocumentMeta: {
          recipient: '하은글로우 (인스타그램 팔로워 8.2만)',
          sender: '이서연 드림 | 글로우빔코리아 마케팅팀 (marketing@glowbeam.co.kr · 02-1234-5678)',
          subject: '[공동 프로젝트 제안] 글로우빔(GlowBeam) LED 스킨케어 디바이스 브랜드 협업 제안드립니다',
          docDate: '2026.09.22 (발송 완료)',
          docTypeBadge: 'AI 협찬 제안 메일 원문',
          attachments: ['글로우빔_브랜드소개서.pdf', '협찬가이드라인.pdf']
        },
        originalText: `받는사람: 하은글로우 (인스타그램 팔로워 8.2만)
보낸사람: 글로우빔코리아 마케팅팀 이서연 드림 (marketing@glowbeam.co.kr · 02-1234-5678)
제목: [공동 프로젝트 제안] 글로우빔(GlowBeam) LED 스킨케어 디바이스 브랜드 협업 제안드립니다
발송일시: 2026.09.22 (발송 완료)

안녕하세요, 하은님!
평소 정제된 뷰티 콘텐츠와 솔직한 리뷰로 많은 분들께 신뢰받고 계신 모습을 인상 깊게 보고 이렇게 연락드립니다.

저희는 홈케어 LED 스킨케어 디바이스 브랜드 글로우빔(GlowBeam)을 운영하는 글로우빔코리아입니다. 하은님의 피드 톤과 팔로워분들의 스킨케어 관심도가 저희 브랜드와 잘 맞는다고 생각되어 협업을 제안드리게 되었습니다.

● 제안 내용
- 제품: 글로우빔 프로 LED 마스크 (정가 189,000원)
- 협업 형태: 제품 협찬 (원고료 별도 협의 가능)
- 콘텐츠: 인스타그램 피드 1건 + 릴스 1건, 스토리 2회 이상
- 업로드 일정: 제품 수령 후 2주 이내
- 필수 표기: @glowbeam_official 태그, #글로우빔 #GlowBeam #유료광고포함

● 제공 혜택
✓ 제품 무상 제공 (정가 189,000원 상당)
✓ 전용 할인코드 발급 (팔로워 대상 15% 할인)
✓ 판매 연동 시 별도 리워드 지급 (선택)

관심 있으시면 회신 주세요. 상세 가이드라인과 협찬 계약서를 바로 보내드리겠습니다. 궁금하신 점은 편하게 문의 주시고요.

감사합니다 :)

이서연 드림
글로우빔코리아 마케팅팀
marketing@glowbeam.co.kr · 02-1234-5678

[첨부파일]
1. 글로우빔_브랜드소개서.pdf
2. 협찬가이드라인.pdf`
      },
      {
        id: 'mkt-3',
        client: '가전 브랜드 E사',
        title: '구매자 리뷰 분석 및 고객 의견 요약',
        tabLabel: '고객 리뷰 분석 요약',
        duration: '의뢰 후 24시간 이내',
        result: '고객 칭찬 포인트와 주요 불만 사항을 알기 쉽게 정리',
        summary: '쇼핑몰 구매 고객 후기를 정밀 검토하여 자주 칭찬하는 점과 개선을 요구하는 불만 사항을 요약 정리했습니다.',
        tags: ['리뷰분석', '고객의견', '개선점도출'],
        deliverable: '고객 리뷰 요약 보고서 및 개선점 체크리스트',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 리뷰 분석 요약 보고서',
        originalDocumentMeta: {
          recipient: '가전 브랜드 E사 상품기획/CS팀',
          sender: '트렌드24 AI 마케팅 리서치팀',
          subject: '[분석 보고서] 무선 미니 청소기 구매평 1,240건 정밀 분석 및 핵심 개선 제안',
          docDate: '2026.09.18 (완료 보고)',
          docTypeBadge: '고객 리뷰 분석 보고서 전문',
          attachments: ['리뷰감성분석_키워드맵.xlsx', 'CS대응_표준가이드.docx']
        },
        originalText: `[고객 리뷰 분석 보고서] 가전 브랜드 E사 무선 미니 청소기 (총 1,240건 분석)

1. 종합 만족도 및 평점 개요
- 평균 평점: 4.62 / 5.0 (긍정 평가 89.4%, 중립 6.2%, 개선 요구 4.4%)
- 주요 구매 연령: 20대 후반~30대 1인 가구 및 차량 소유 직장인

2. 핵심 긍정 포인트 (Top 3)
- ① 가벼운 무게 & 그립감: "500g대로 손목에 무리 없이 원룸 청소 끝" (언급 비율 42%)
- ② 콤팩트한 디자인: "인테리어 오브제 같아서 거실 테이블에 둬도 예쁨" (언급 비율 38%)
- ③ 틈새 노즐 활용성: "차량 컵홀더, 키보드 사이 먼지 흡입에 최고" (언급 비율 29%)

3. 주요 불만 및 개선 요구 사항 (CS 즉시 조치 필요)
- ① 배터리 완충 표시 직관성: 충전 완료 시 LED 색상 변화가 명확하지 않다는 의견 (28건)
  → 조치 권고: 상세페이지 충전 가이드 이미지 보완 및 알림 스티커 부착
- ② 필터 분리 세척 설명: 물세척 후 건조 방법 문의 다수
  → 조치 권고: 동봉 퀵 가이드에 '필터 완전 건조 24시간 필수' 볼드 표기

4. 마케팅 소구점 제안
- "차량용 + 원룸용 멀티 유즈"를 강조한 숏폼 영상 제작 추천 (도달률 기대치 250%↑)`
      }
    ],
    detailedTasks: [
      'SNS 피드 및 검색 광고용 카피라이팅 작성',
      '제품에 맞는 마이크로 인플루언서 계정 리스트업',
      '체험단 및 인플루언서 섭외용 제안 메일 문구 작성',
      '쇼핑몰 상품 리뷰 모니터링 및 주요 고객 반응 요약'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: '광고 카피 스프레드시트, 인플루언서 목록 파일'
  },
  {
    id: 'cs',
    number: '05',
    categoryCode: 'CS & OPERATIONS',
    name: '기업 운영 및 CS 지원',
    description: '자주 묻는 질문(FAQ) 정리, 상황별 고객 응대 템플릿, 챗봇 답변 시나리오',
    tags: ['FAQ 작성', '응대 템플릿', '고객 안내', '챗봇 시나리오'],
    icon: 'Headphones',
    colorClass: 'cyan-600',
    previewImage: csChatbotFaqScenarioImg,
    previewImageAlt: 'AI 고객응대 챗봇 및 FAQ 관리 실무 산출물 (세렌헤드스파 상담봇)',
    portfolioExample: {
      id: 'cs-1',
      client: '헤드스파 뷰티케어 S사 (세렌헤드스파)',
      title: '고객 응대 FAQ 및 챗봇 답변 시나리오 작성',
      tabLabel: 'FAQ & 챗봇 답변 시나리오',
      duration: '의뢰 후 24시간 이내',
      result: '8대 핵심 FAQ 구조화 및 주말 예약 자동화 챗봇 시나리오 완성',
      summary: '자주 묻는 질문 8종을 체계화하고 카카오톡·채널톡 기반의 토요일 예약 및 코스 안내 챗봇 대화 시나리오를 설계하여 즉시 세팅 가능한 실무 산출물로 납품했습니다.',
      tags: ['FAQ작성', '챗봇답변', '고객응대', '예약시나리오'],
      deliverable: 'AI 고객응대 챗봇 시나리오 기획서 및 FAQ 8종 표준 답변 매뉴얼',
      image: csChatbotFaqScenarioImg,
      imageAlt: 'AI 고객응대 챗봇 및 FAQ 관리 실무 산출물 (세렌헤드스파 상담봇)'
    },
    portfolioCases: [
      {
        id: 'cs-1',
        client: '헤드스파 뷰티케어 S사 (세렌헤드스파)',
        title: '고객 응대 FAQ 및 챗봇 답변 시나리오 작성',
        tabLabel: 'FAQ & 챗봇 답변 시나리오',
        duration: '의뢰 후 24시간 이내',
        result: '8대 핵심 FAQ 구조화 및 주말 예약 자동화 챗봇 시나리오 완성',
        summary: '자주 묻는 질문 8종(예약, 변경·취소, 소요시간, 남성 이용, 두피별 맞춤 케어, 환불, 주차, 임산부 케어)을 체계화하고 카카오톡·채널톡 기반의 토요일 예약 및 코스 안내 챗봇 대화 시나리오를 설계하여 즉시 세팅 가능한 실무 산출물로 납품했습니다.',
        tags: ['FAQ작성', '챗봇답변', '고객응대', '예약시나리오'],
        deliverable: 'AI 고객응대 챗봇 시나리오 기획서 및 FAQ 8종 표준 답변 매뉴얼',
        image: csChatbotFaqScenarioImg,
        imageAlt: 'AI 고객응대 챗봇 및 FAQ 관리 실무 산출물 (세렌헤드스파 상담봇)',
        galleryImages: [
          {
            url: csChatbotFaqScenarioImg,
            title: 'AI 고객응대 챗봇 및 FAQ 관리 실무 산출물 화면',
            pageLabel: '고해상도 챗봇 콘솔'
          }
        ],
        originalDocumentMeta: {
          recipient: '세렌헤드스파 고객지원팀',
          sender: '트렌드24 AI 업무대행 챗봇 구축팀 (cs@trend24.co.kr · 02-1234-5678)',
          docTypeBadge: '챗봇 응대 시나리오 기획안',
          docDate: '2026.09.22 최종 승인',
          securityLevel: '실무 배포 완료본'
        },
        originalText: `[세렌헤드스파 AI 고객응대 챗봇 시나리오 및 FAQ 8종 표준 답변서]

■ 시스템 개요
· 브랜드명: 세렌헤드스파 (Serene Head Spa)
· 솔루션: Customer Care Bot Studio (트렌드24 업무대행)
· 챗봇명: 세렌헤드스파 상담봇 (온라인 24시간 자동 응대)
· 구축 상태: 운영중 (2026.09.22 승인 완료)
· 주요 기능: FAQ 자동 응답, 시술 코스 안내, 실시간 토요일/평일 예약 접수, 담당 상담원 연결

──────────────────────────────────────────────────────
[1] FAQ 관리 (자주 묻는 질문 8종 표준 가이드)
──────────────────────────────────────────────────────

1. Q. 예약은 어떻게 하나요?
   A. 네이버 예약, 카카오 채널톡 및 본 챗봇의 [예약 문의] 버튼을 통해 희망하시는 날짜와 시간을 선택하시면 실시간 잔여 타임을 확인하여 1분 이내에 예약을 확정해 드립니다.

2. Q. 예약 변경·취소는 언제까지 가능한가요?
   A. 원활한 룸 및 테라피스트 배정을 위해 예약일 기준 1일 전 18시까지 위약금 없이 100% 무료 변경 및 취소가 가능합니다. 당일 취소 시에는 예약금의 50%가 위약금으로 차감됩니다.

3. Q. 시술 시간은 얼마나 걸리나요?
   A. 베이직 릴랙싱 코스는 50분, 프리미엄 딥클렌징 & 스칼프 케어 코스는 80분 소요됩니다. 첫 방문 고객님께서는 정밀 두피 진단을 위해 10분 전 방문을 권장드립니다.

4. Q. 남성도 이용 가능한가요?
   A. 네, 남성 고객님도 동일하게 전 코스 이용 가능합니다. 전 좌석 프라이빗 1인 VIP 룸으로 운영되어 타인의 시선 없이 편안하게 케어를 받으실 수 있습니다.

5. Q. 두피 상태에 따라 시술이 달라지나요?
   A. 네, 시술 전 AI 두피 진단 스캐너를 통해 지루성, 건성, 열감, 탈모 초기 등 두피 타입을 정밀 측정하여 맞춤형 천연 앰플과 스파 레시피를 처방해 드립니다.

6. Q. 정기권 환불이 가능한가요?
   A. 정기권(5회권/10회권)은 소비자 분쟁해결 기준에 따라 잔여 횟수에 대한 정산 후 즉시 환불이 가능합니다. (단, 사용 회차는 정가 기준으로 차감 정산됩니다.)

7. Q. 주차는 가능한가요?
   A. 건물 지하 주차장에 무료 주차 2시간을 지원해 드립니다. SUV 및 대형 세단도 여유롭게 주차 가능하며 출차 시 데스크에 차량 번호를 등록해 주세요.

8. Q. 임산부도 받을 수 있나요?
   A. 안정기(임신 16주 이상) 고객님부터 안전하게 시술 가능합니다. 강한 지압 대신 림프 순환 위주의 부드러운 임산부 전용 오가닉 케어로 진행해 드립니다.

──────────────────────────────────────────────────────
[2] 챗봇 시나리오 (실제 고객 대화 시뮬레이션: 예약 문의)
──────────────────────────────────────────────────────

[고객 - 14:02] 이번 주 토요일 오후에 예약 가능한가요?

[세렌헤드스파 상담봇 - 14:02]
안녕하세요! 세렌헤드스파입니다 🌿 
토요일 오후 예약 가능 시간을 확인해드릴게요. 
베이직 / 프리미엄 중 어떤 시술로 도와드릴까요?

[고객 - 14:03] 프리미엄이요

[세렌헤드스파 상담봇 - 14:03]
프리미엄 코스는 80분이며 14:00 · 16:30 두 타임이 비어있어요. 
어느 시간이 편하실까요?

[고객 - 14:04] 16시 반이요

[세렌헤드스파 상담봇 - 14:04]
토요일 16:30 프리미엄 코스로 예약 도와드렸습니다 ✅ 
확인 문자 보내드렸어요. 두피 고민 있으시면 미리 알려주셔도 좋아요!
`
      },
      {
        id: 'cs-2',
        client: '쇼핑몰 L사 (루미마켓)',
        title: '상황별 고객 응대 이메일 및 문자 템플릿 작성',
        tabLabel: '상황별 고객 응대 템플릿',
        duration: '의뢰 후 24시간 이내',
        result: '주문·배송·컴플레인·프로모션 4대 상황별 이메일·SMS 8종 라이브러리 구축',
        summary: '주문/결제 확정, 배송 변경·취소·지연, 불만/컴플레인, 리뷰/프로모션 등 쇼핑몰 빈출 상황 4개 카테고리별로 고객 신뢰도를 높이는 표준 이메일 및 LMS/SMS 템플릿 8종 세트를 기획 및 납품했습니다.',
        tags: ['응대템플릿', '고객안내문', '클레임대응', 'SMS템플릿'],
        deliverable: 'AI 고객응대 템플릿 라이브러리 기획서 (이메일 & SMS 8종)',
        image: csResponseTemplateLibraryImg,
        imageAlt: 'AI 고객응대 템플릿 라이브러리 실무 산출물 (루미마켓 주문·결제 확정 안내)',
        galleryImages: [
          {
            url: csResponseTemplateLibraryImg,
            title: 'AI 고객응대 템플릿 라이브러리 콘솔',
            pageLabel: '고해상도 실무 산출물'
          }
        ],
        originalDocumentMeta: {
          recipient: '루미마켓 CS운영팀',
          sender: '트렌드24 AI 업무대행 템플릿 제작팀 (cs@trend24.co.kr · 02-1234-5678)',
          docTypeBadge: '고객응대 템플릿 라이브러리',
          docDate: '2026.09.22 최종 승인',
          securityLevel: '실무 배포 완료본'
        },
        originalText: `[루미마켓 AI 고객응대 템플릿 라이브러리 (8종 세트)]

■ 시스템 개요
· 브랜드명: 루미마켓 (Lumi Market)
· 솔루션: Response Template Studio (트렌드24 업무대행)
· 구축 내역: 상황별 이메일 & SMS/LMS 표준 템플릿 8종
· 구축 상태: 8종 등록완료 (2026.09.22 승인)
· 활용 채널: 자동 발송 메일러, 카카오 알림톡, SMS/LMS 문자

──────────────────────────────────────────────────────
[1] 상황별 템플릿 분류 체계 (총 4대 카테고리 8종)
──────────────────────────────────────────────────────
1. 주문 · 결제 확정 안내 (이메일 1종 + 문자 1종)
2. 배송 변경 · 취소 · 지연 안내 (이메일 1종 + 문자 1종)
3. 불만 · 컴플레인 응대 (이메일 1종 + 문자 1종)
4. 리뷰 요청 · 프로모션 안내 (이메일 1종 + 문자 1종)

──────────────────────────────────────────────────────
[2] 대표 템플릿 상세: 주문 · 결제 확정 안내
──────────────────────────────────────────────────────

[A. 이메일 템플릿]
· 받는사람: 김혜진 고객님
· 제목: [루미마켓] 주문이 확정되었습니다 (LM20260922-0142)

(본문)
안녕하세요, 혜진님. 루미마켓을 이용해주셔서 감사합니다.
주문하신 상품이 정상적으로 확정되었습니다.

[주문 정보]
· 주문번호: LM20260922-0142
· 상품명: 오가닉 코튼 니트 외 1건
· 결제금액: 68,000원
· 배송 예정일: 9월 24일 (목)

배송이 시작되면 별도로 안내드리겠습니다. 감사합니다.


[B. 문자(SMS) 템플릿]
· 발신자: 루미마켓 (대표번호: 1544-0000)
· 발송 시점: 주문 확정 시점 자동 발송

(문자 내용)
[루미마켓] 혜진님 주문이 확정됐어요!
(LM20260922-0142) 9/24 배송 예정입니다.
문의 1544-0000

──────────────────────────────────────────────────────
[3] 기타 핵심 상황별 응대 가이드 요약
──────────────────────────────────────────────────────
· 배송 지연 안내: 공급처 입고 지연 원인 명시 + 변경 도착 예정일 안내 + 사과 적립금(2,000P) 자동 지급 안내
· 품절 취소 안내: 결제 수단별 환불 일정(카드 2~3 영업일) 명시 + 대체 추천 상품 링크 제공
· 단순 변심 교환/반품: 왕복 택배비(6,000원) 안내 + 자동 회수 기사 방문 예약 링크 제공
· 상품 불량/오배송 클레임: 정중한 사과 문구 우선 배치 + 사진 접수 간편 링크 + 무료 맞교환 즉시 출고 안내
`
      },
      {
        id: 'cs-3',
        client: '쇼핑몰 L사 (루미마켓)',
        title: '신규 고객 환영 및 이용 안내 알림톡 문구 작성',
        tabLabel: '신규 고객 알림톡 문안',
        duration: '의뢰 후 24시간 이내',
        result: '카카오 공식 심사 통과형 신규 가입 환영 & 이용안내 알림톡 2종 납품',
        summary: '신규 회원의 첫 구매 전환을 유도하는 가입 환영 알림톡과 핵심 이용 혜택(주문·배송 조회, 찜 할인, 적립금, 채널 소식)을 명확하게 안내하는 카카오 알림톡 문안 2종을 카카오 공식 템플릿 심사 가이드라인에 맞추어 작성했습니다.',
        tags: ['알림톡문구', '이용안내', '고객가이드', '카카오톡채널'],
        deliverable: '카카오 알림톡 템플릿 심사용 기획서 (환영 & 이용안내 2종)',
        image: csAlimtalkWelcomeGuideImg,
        imageAlt: 'AI 알림톡 문구 작성 실무 산출물 (루미마켓 신규가입 환영 & 이용안내 2종)',
        galleryImages: [
          {
            url: csAlimtalkWelcomeGuideImg,
            title: 'AI 알림톡 문구 작성 콘솔',
            pageLabel: '고해상도 실무 산출물'
          }
        ],
        originalDocumentMeta: {
          recipient: '루미마켓 CRM·마케팅팀',
          sender: '트렌드24 AI 업무대행 알림톡 제작팀 (talk@trend24.co.kr · 02-1234-5678)',
          docTypeBadge: '카카오 알림톡 기획서',
          docDate: '2026.09.22 승인 완료',
          securityLevel: '카카오 심사 통과본'
        },
        originalText: `[루미마켓 AI 알림톡 문구 작성 (2종 세트)]

■ 프로젝트 개요
· 발신 채널: 카카오톡 알림톡 (루미마켓 공식 채널)
· 솔루션: Notification Message Studio (트렌드24 업무대행)
· 심사 결과: 카카오 공식 템플릿 심사 통과 완료 (2026.09.22)
· 발송 대상: 신규 회원가입 완료 고객 (가입 직후 및 1일 차 자동 트리거)

──────────────────────────────────────────────────────
[1] 신규가입 환영 알림톡
──────────────────────────────────────────────────────
· 템플릿명: 루미마켓_신규가입_환영혜택_V1
· 발신 프로필: 루미마켓 (알림톡 인증 마크)
· 발송 시점: 회원가입 완료 즉시 자동 발송

[알림톡 본문]
루미마켓 가입을 환영합니다! 🎉

#{고객명}님, 루미마켓의 첫 가족이 되어주셔서 감사합니다.
지금 가입을 완료하시면 아래 혜택을 바로 받으실 수 있어요.

■ 신규회원 전용 웰컴 혜택
· 첫 구매 10% 할인 쿠폰
· 무료배송 쿠폰 1장
· 적립금 2,000원 즉시 지급

[버튼 구성]
· 버튼 1: [쇼핑 시작하기 ›] (웹링크: https://m.lumimarket.kr/welcome)

──────────────────────────────────────────────────────
[2] 이용안내 알림톡
──────────────────────────────────────────────────────
· 템플릿명: 루미마켓_서비스_이용가이드_V1
· 발신 프로필: 루미마켓 (알림톡 인증 마크)
· 발송 시점: 가입 익일(D+1) 오전 11:00 자동 발송

[알림톡 본문]
루미마켓 이용 방법 안내드려요

#{고객명}님, 루미마켓을 더 편하게 이용하는 방법을 알려드릴게요.

1. 마이페이지에서 주문·배송 조회
2. 찜한 상품 할인 알림 받기
3. 리뷰 작성 시 적립금 지급
4. 채널 추가 시 매주 할인 소식 받기

궁금한 점은 채널 상담으로 편하게 문의해주세요 :)

[버튼 구성 (2열 분할)]
· 버튼 1: [채널 추가하기] (카카오톡 채널 추가 기능 연동)
· 버튼 2: [자주 묻는 질문] (웹링크: https://m.lumimarket.kr/faq)

──────────────────────────────────────────────────────
[3] 카카오 알림톡 검수 체크리스트 충족 사항
──────────────────────────────────────────────────────
✔ 정보통신망법 제50조에 따른 비광고성/정보성 메시지 요건 준수
✔ 치환 변수(#{고객명}) 정상 설정 및 불필요한 홍보성 미승인 단어 배제
✔ 고정 URL 및 채널 추가 버튼 규격 준수
`
      }
    ],
    detailedTasks: [
      '자주 묻는 질문(FAQ) 정리 및 표준 답변 스크립트 작성',
      '배송/환불/클레임 등 상황별 정중한 고객 안내 템플릿',
      '카카오 상담톡 및 채널톡 챗봇 기본 시나리오 세팅 지원',
      '신규 고객 가입 환영 및 이용 안내 알림톡/메일 문구 작성'
    ],
    turnaroundTime: '48시간 이내',
    deliverableSample: 'FAQ 매뉴얼 문서, 챗봇 시나리오 기획서'
  },
  {
    id: 'custom',
    number: '06',
    categoryCode: 'WORKFLOW CUSTOM',
    name: '맞춤형 사내 AI 구축',
    description: '사내 매뉴얼 답변 챗봇 세팅, 업무용 프롬프트 모음, 반복 작업 자동화 연결',
    tags: ['사내 챗봇', '프롬프트 모음', '업무 자동화', '노션/슬랙'],
    icon: 'Cpu',
    colorClass: 'rose-600',
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '사내 챗봇 및 업무 도구 연결 산출물',
    portfolioExample: {
      id: 'cst-1',
      client: 'IT 기업 K사',
      title: '사내 규정 및 매뉴얼 답변용 사내 챗봇 세팅',
      duration: '의뢰 후 3~4일',
      result: '인사·총무 관련 반복 질문 자동 응답으로 업무 편의 향상',
      summary: '사내 취업규칙, 복지 혜택, 자주 묻는 사규 문서를 바탕으로 직원들이 슬랙이나 노션에서 바로 물어보고 확인할 수 있는 챗봇을 연결했습니다.',
      deliverable: '사내 슬랙봇 설정 및 기본 워크플로우 명세서',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '사내 슬랙 봇 연동 산출물'
    },
    portfolioCases: [
      {
        id: 'cst-1',
        client: 'IT 기업 K사',
        title: '사내 규정 및 매뉴얼 답변용 사내 챗봇 세팅',
        duration: '의뢰 후 3~4일',
        result: '인사·총무 관련 반복 질문 자동 응답으로 업무 편의 향상',
        summary: '사내 취업규칙, 복지 혜택, 자주 묻는 사규 문서를 바탕으로 직원들이 슬랙이나 노션에서 바로 물어보고 확인할 수 있는 챗봇을 연결했습니다.',
        tags: ['사내챗봇', '업무편의', '사규안내'],
        deliverable: '사내 슬랙봇 설정 및 기본 워크플로우 명세서',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '사내 슬랙 봇 연동 산출물'
      },
      {
        id: 'cst-2',
        client: '부동산 컨설팅 R사',
        title: '업무용 문서 자동 정리 및 요약 연결',
        duration: '의뢰 후 3~4일',
        result: '자료 업로드 시 주요 내용 자동 발췌 및 문서 정리',
        summary: '자주 들어오는 정형 문서를 폴더에 넣으면 필요한 항목만 뽑아 정리 시트에 자동으로 기록되는 업무 흐름을 만들었습니다.',
        tags: ['문서요약', '업무자동화', '자료정리'],
        deliverable: '자동화 워크플로우 설정 및 검증 결과서',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '문서 자동 정리 워크플로우'
      },
      {
        id: 'cst-3',
        client: '마케팅 대행사 V사',
        title: '업무에 바로 쓰는 AI 프롬프트 모음 제작',
        duration: '의뢰 후 2~3일',
        result: '보고서·메일·아이디어 작성 시 직원들의 AI 활용도 향상',
        summary: '실제 부서별 업무에서 매일 쓰이는 이메일 작성, 보고서 초안, 문장 다듬기에 최적화된 질문 양식을 정리해 사내에 공유했습니다.',
        tags: ['프롬프트정리', 'AI활용법', '업무가이드'],
        deliverable: '사내 업무용 프롬프트 템플릿 및 활용 안내서',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '업무용 프롬프트 모음 산출물'
      }
    ],
    detailedTasks: [
      '사내 규정 및 업무 매뉴얼 기반 사내 챗봇 기본 세팅',
      '자주 쓰는 업무용 AI 프롬프트(보고서, 이메일, 요약) 모음 제작',
      '구글 시트 및 노션 업무 자동화(새 글 등록 시 알림 등) 연동',
      '사내 AI 활용을 위한 실무 활용 가이드 및 템플릿 제공'
    ],
    turnaroundTime: '협의 (평균 2~4일)',
    deliverableSample: '사내 챗봇 세팅 가이드, 업무용 프롬프트 모음집'
  },
  {
    id: 'web',
    number: '07',
    categoryCode: 'WEB & DESIGN SUPPORT',
    name: '랜딩페이지 및 디자인',
    description: '서비스 소개 랜딩페이지, 상품 상세페이지 기획/디자인, 이벤트 배너 제작',
    tags: ['랜딩페이지', '상세페이지', '배너 디자인', '웹페이지'],
    icon: 'Code2',
    colorClass: 'indigo-600',
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '웹 랜딩페이지 및 상세페이지 디자인 산출물',
    portfolioExample: {
      id: 'web-1',
      client: 'HR 기업 H사',
      title: '서비스 소개 및 프로모션 랜딩페이지 제작',
      duration: '의뢰 후 3일 이내',
      result: '모바일과 PC 모두 보기 편한 반응형 소개 페이지 완성',
      summary: '서비스 핵심 장점과 문의 폼을 보기 쉽게 구성하여 모바일과 PC에서 모두 동작하는 웹 랜딩페이지를 제작했습니다.',
      deliverable: '디자인 파일 및 오픈 가능한 웹페이지 URL 링크',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '서비스 소개 랜딩페이지 제작 산출물'
    },
    portfolioCases: [
      {
        id: 'web-1',
        client: 'HR 기업 H사',
        title: '서비스 소개 및 프로모션 랜딩페이지 제작',
        duration: '의뢰 후 3일 이내',
        result: '모바일과 PC 모두 보기 편한 반응형 소개 페이지 완성',
        summary: '서비스 핵심 장점과 문의 폼을 보기 쉽게 구성하여 모바일과 PC에서 모두 동작하는 웹 랜딩페이지를 제작했습니다.',
        tags: ['랜딩페이지', '웹페이지제작', '모바일반응형'],
        deliverable: '디자인 파일 및 오픈 가능한 웹페이지 URL 링크',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '서비스 소개 랜딩페이지 제작 산출물'
      },
      {
        id: 'web-2',
        client: '생활가전 브랜드 K사',
        title: '상품 상세페이지 기획 및 디자인',
        duration: '의뢰 후 3~4일',
        result: '제품 특장점과 사용법을 알기 쉽게 보여주는 상세페이지 완성',
        summary: '제품의 특장점, 실제 사용 방법, 구매 전 확인 사항을 깔끔한 그래픽과 사진으로 보기 편하게 세로형 상세페이지로 제작했습니다.',
        tags: ['상세페이지', '제품소개', '디자인'],
        deliverable: '모바일 최적화 이미지 파일 및 원본 디자인 파일',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '상품 상세페이지 제작 산출물'
      },
      {
        id: 'web-3',
        client: '교육 스타트업 G사',
        title: '이벤트 홍보용 SNS 배너 및 팝업 제작',
        duration: '의뢰 후 24시간 이내',
        result: '인스타그램 및 웹사이트용 홍보 배너 규격별 납품',
        summary: '행사 및 프로모션 안내에 필요한 SNS 피드용 정방형 이미지와 웹사이트 팝업 배너를 깔끔하게 제작했습니다.',
        tags: ['배너제작', 'SNS이미지', '이벤트홍보'],
        deliverable: '규격별 배너 이미지 파일 및 원본 파일',
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '이벤트 홍보 배너 디자인 산출물'
      }
    ],
    detailedTasks: [
      '서비스 소개 및 이벤트 안내를 위한 반응형 랜딩페이지 제작',
      '네이버 쇼핑, 스마트스토어 상품 상세페이지 기획 및 디자인',
      '인스타그램 피드 및 블로그 포스팅용 홍보 배너 제작',
      '회사 소개서 및 제안서용 도식화 및 그래픽 정리'
    ],
    turnaroundTime: '48~72시간 이내',
    deliverableSample: '디자인 소스 파일, 퍼블리싱 완료된 웹 URL 링크'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'daeun',
    name: '김다은 팀장',
    role: 'LEAD SPECIALIST',
    experience: 'AI 오퍼레이션 & 비즈니스 기획 7년차',
    tag: '검수율 99.8%',
    badge: '인증 전문가',
    badgeBg: 'bg-brand-orange text-white',
    scope: '담당: 대외 보고서, 정부지원사업, IR 문서, 사업 기획',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ1Cjp_YMtIsrccJxKWynjcBpL8Us3EnTNCa6FW8CUepBmHL_FFKsRxa7VPJmzd3IwbYr-Gg4Va4Kg88s7LIXV5S-qlQA7-PqPXvWWBFs2SFTla-JolqCUJfIxdUGvAW2i-lh3loJDIrqMT-vMTCPoafHAYrdPDPTlaf3BAd83UqEgbXdbZwoYZyHTgGScZEjHXVX4DO2KxvXZUnwNtTqanUHhaVht0-PxI4nKlB5c4Q1eOh2rS2g',
    bio: '국내 유수 벤처캐피탈 및 액셀러레이터 출신. 200건 이상의 IR 피치덱과 40건 이상의 공공 R&D 사업계획서를 성공적으로 조율했습니다.'
  },
  {
    id: 'mijeong',
    name: '이미정 디렉터',
    role: 'CONTENT DIRECTOR',
    experience: '광고대행사 출신 콘텐츠/카피라이팅 총괄',
    tag: '언론 홍보',
    badge: '인증 전문가',
    badgeBg: 'bg-brand-navy text-white',
    scope: '담당: 언론 보도자료, 브랜드 스토리, 광고 카피, SEO 아티클',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_trsxmthYuJQH9cEpLVQ1njBTlkoznZPOvUlsDKqsIis8CTQJ3RafT1odRqKNKbUbE6fufbXQJc51dXM4CY_tooVqt68RlRKxVBCkf_8xWf2I43glcr_ZEzXdEaph47IVH_nJ7Ewo1b8WdiXXubOKHsF7Si-bKGlwFG0SzGWOei-OPTJJUmqItldwrVR8OZJc4yxmGN6DG_p7x0VimeIbGA-vdOHnW8X_UCdPFK0ylSu-2vDqKu4',
    bio: '제일기획 협력 에이전시 8년 경력. 대기업 브랜딩 캠페인부터 스타트업 퍼포먼스 광고 카피까지 매출을 일으키는 문장을 감수합니다.'
  },
  {
    id: 'doyoon',
    name: '박도윤 연구원',
    role: 'AI WORKFLOW ARCHITECT',
    experience: '사내 AI 솔루션 및 업무 자동화 전담',
    tag: 'Python / Prompt',
    badge: '인증 전문가',
    badgeBg: 'bg-emerald-600 text-white',
    scope: '담당: 사내 챗봇 시스템 구축, 업무 자동화 워크플로우, 템플릿 연동',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWYolfIb3iAbKhZgWpvV0JBPqPoOgFsqhFFLSZLlclhsb_iaIpymgHU3aaIb-b02edsGM39nbMd1nQLFkuqcwCgFuG7UOlYOgJbVZBAQG2c1Bx5_SjwEwgtum8kC6oM5gZeoV8tcK1XVEfCIqHIZNUs1WMM5awJ0mgUg8whXnPO1ZcIXGIejeTpbvJLc7otJ2-1LWT13tzq8hbiQQquUZFkflb0F8ce6Hz_GUlbuGQbd8prtu_eo',
    bio: '카이스트 석사 졸업. 복잡한 업무 프로세스를 자동화하는 AI 워크플로우 구축을 전문으로 하며, 일상 업무 80%를 단축시키는 솔루션을 담당합니다.'
  }
];

export const PORTFOLIO_CASES: PortfolioItem[] = [
  {
    id: 'saas',
    clientType: 'B2B 기업',
    duration: '소요: 24시간',
    title: '경쟁사 기능 및 가격 비교 조사',
    description: '동종 업계 주요 경쟁사의 요금제 체계와 핵심 기능을 수집하여 한눈에 비교할 수 있는 정리표 및 요약 보고서 납품.',
    metricLabel: '조사 소요 시간',
    metricValue: '24시간 내 납품',
    category: '리서치'
  },
  {
    id: 'ecommerce',
    clientType: '이커머스 브랜드',
    duration: '소요: 36시간',
    title: '신규 제품 상세페이지 문구 및 기획',
    description: '제품 특장점과 고객 주요 관심사를 반영하여 읽기 편한 상세페이지 구성 및 상품 소개 문구 작성.',
    metricLabel: '제작 소요 시간',
    metricValue: '36시간 내 완료',
    category: '콘텐츠'
  },
  {
    id: 'manufacturing',
    clientType: '중소/중견기업',
    duration: '소요: 24시간',
    title: '용역 및 거래 계약서 검토 및 수정 의견',
    description: '계약서 내 자동 연장, 대금 지급 기한, 배상 한도 등 주요 조항을 검토하고 실무 수정 의견서 납품.',
    metricLabel: '검토 소요 시간',
    metricValue: '24시간 내 납품',
    category: '문서검토'
  },
  {
    id: 'healthcare',
    clientType: '신규 사업팀',
    duration: '소요: 48시간',
    title: '신규 사업 관련 정부 규제 및 지침 조사',
    description: '새로 추진하는 사업에 필요한 필수 정부 인허가 절차 및 관련 법률 가이드라인 핵심 요약 보고서 납품.',
    metricLabel: '조사 소요 시간',
    metricValue: '48시간 내 납품',
    category: '리서치'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'review-1',
    author: '정태영 대표',
    title: '스타트업 플래닛 대표이사',
    rating: 5,
    content: '"문서, 경쟁사, 시장자료 등 손이 많이 가는 업무를 맡기니 사업 본질에만 집중할 수 있게 되었습니다. 퀄리티가 현업 팀장급 이상입니다."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJahO4wCBZSX6__hAwx0kIovnFG3qdjScFqH7SWP-43VJnSF1ZPlpSrp-Y3u92h6YnPgKP1RwoQMrP9mGyivgZoK26vi5ygCVO4U7UkeplQ5UOGTt7L205Hzf15fxwsaO4LpZHE4nB0WB-9IZgkkBwv_7_u9ilqBiZ8QN47VWMy9jz92JwIpBENpmJZqf5XDtF8N-3RAcMtluqBk-lNkhhE2i3wLgRhVZgwlApBeYXWq3o2CYy-LE',
    tags: ['구독 6개월차', '스타트업', '보고서/IR']
  },
  {
    id: 'review-2',
    author: '박서윤 총괄 팀장',
    title: '패션 D2C 브랜드 마케팅 리드',
    rating: 5,
    content: '"단순한 AI 답변이 아니라 실제 담당자가 검수한 뒤 전달해주니까 수정할 부분이 거의 없어요. 인턴 2명 몫을 거뜬히 합니다."',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe4jXM1xVmg47vuLzY7wWGYUc1OfVjGrAsyLf54fjPRCZ5QaVJ8XQfDORCt5RqxQI4sqcyseVdaSLGpG0KmzKwBjp9di8KpXPwwUrz1E4Rdip5mlXTtxaU8uTAChsTcHh7xXtwHmVGvoo5NsVWVw7xe4BwhyHi-UDEom2pumNo5ZVswoxnGF4-mJicBI1kQZH3qRQGRaLiXWAdfz06msPm0vE3Dw8lKayq6T6N_QCatFea4bwA20k',
    tags: ['구독 11개월차', 'D2C 커머스', '마케팅 대행']
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    subtitle: '1인 창업가 및 초기 스타트업',
    monthlyPrice: 300000,
    annualPricePerMonth: 255000,
    features: [
      '월 15건 업무 요청 완료 보장',
      '기본 비즈니스 문서/콘텐츠 업무 지원',
      '영업일 기준 48시간 이내 피드백',
      '전문 매니저 1차 검수 포함',
      '기본 수정 2회 무료 제공'
    ],
    ctaText: '스타터 플랜 상담하기',
    ctaAction: 'starter'
  },
  {
    id: 'business_pro',
    name: 'BUSINESS PRO',
    subtitle: '업무 효율 극대화가 필요한 중소기업',
    monthlyPrice: 500000,
    annualPricePerMonth: 425000,
    isPopular: true,
    features: [
      '무제한 요청 (동시 2개 작업 동시 진행)',
      '전담 전문 매니저 1:1 슬랙/카카오 연동',
      '긴급 건 24시간 우선 처리 혜택',
      '사내 맞춤형 프롬프트 셋업 무상 제공',
      '무제한 수정 및 피드백 반영 보장',
      '고난이도 리서치 & 심층 보고서 포함'
    ],
    ctaText: '비즈니스 프로 시작하기',
    ctaAction: 'pro'
  },
  {
    id: 'enterprise',
    name: 'ENTERPRISE',
    subtitle: '대규모 사내 자동화 & 보안 커스텀',
    monthlyPrice: null,
    annualPricePerMonth: null,
    priceDisplay: '맞춤 견적 문의',
    features: [
      '보안 전용망 사내 LLM 인프라 구축',
      '기업 전용 인하우스 AI 트레이닝',
      '전담 PM 배정 및 SLA 보장 계약',
      '사내 사규/문서 RAG 시스템 완비',
      '월간 성과 보고회 및 맞춤 컨설팅'
    ],
    ctaText: '도입 컨설팅 신청',
    ctaAction: 'enterprise'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: '사내 보안 문서나 민감한 정보가 AI 학습에 쓰이나요?',
    answer: '절대 사용되지 않습니다. AI비서는 엔터프라이즈 전용 보안 API(Zero Data Retention 정책)를 적용하며, 계약 전 상호 비밀유지협약서(NDA)를 체결하여 고객사의 데이터 보안과 기밀을 100% 보장합니다.'
  },
  {
    id: 'faq-2',
    question: 'AI 결과물이 마음에 들지 않으면 어떻게 되나요?',
    answer: 'AI비서는 단순 프롬프트 결과물을 던져드리지 않습니다. 현업 5년 차 이상의 전문 검수 인력이 팩트체크와 윤문을 완료해 전달드리며, 불만족 시 무제한 재작업 또는 100% 환불 정책을 운영하고 있습니다.'
  },
  {
    id: 'faq-3',
    question: '우리 회사 사내 슬랙(Slack)이나 카카오톡으로도 소통 가능한가요?',
    answer: '네, 비즈니스 프로 이상의 플랜부터는 고객사의 사내 슬랙 채널 초대 또는 전담 카카오톡 비즈니스 채널을 통해 마치 사내 팀원처럼 실시간으로 업무를 주고받으실 수 있습니다.'
  },
  {
    id: 'faq-4',
    question: '한 달만 써보고 연장 여부를 결정할 수 있나요?',
    answer: '물론입니다. 장기 의무 약정 없이 1개월 단위로 구독할 수 있으며 언제든지 해지나 플랜 변경이 가능합니다. 첫 달 이용 후 92%의 고객사가 지속 구독을 이어가고 있습니다.'
  }
];

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'credit_10',
    name: '체험팩 10 크레딧',
    credits: 10,
    bonusCredits: 0,
    price: 99000,
    originalPrice: 120000,
    discountRate: '17% OFF',
    description: '단기 문서 검토 및 긴급한 실무 태스크 해결에 적합한 스타터 패키지',
    features: [
      '표준 실무 10건 차감 가능',
      '계약서 검토, 보도자료, 리서치 요약 등',
      '전담 매니저 24시간 내 납품',
      '유효기간: 결제일로부터 1년'
    ]
  },
  {
    id: 'credit_30',
    name: '실무팩 30 크레딧',
    credits: 30,
    bonusCredits: 3,
    price: 249000,
    originalPrice: 360000,
    discountRate: '30% OFF',
    isPopular: true,
    description: '스타트업 및 소규모 비즈니스에서 가장 선호하는 가성비 최고의 실무 크레딧',
    features: [
      '총 33 크레딧 제공 (+3 보너스 크레딧 증정)',
      '사업계획서 세부 섹션, 심층 리서치 포함',
      '우선 순위 빠른 피드백 채널 배정',
      '수정 요청 100% 무상 반영',
      '유효기간: 결제일로부터 1년'
    ]
  },
  {
    id: 'credit_60',
    name: '비즈니스팩 60 크레딧',
    credits: 60,
    bonusCredits: 10,
    price: 459000,
    originalPrice: 720000,
    discountRate: '36% OFF',
    description: '정기적인 보고서 작성 및 마케팅 콘텐츠 대량 의뢰에 특화된 패키지',
    features: [
      '총 70 크레딧 제공 (+10 보너스 크레딧 증정)',
      '전담 전담자 지정 및 사내 슬랙/카톡 채널 개설',
      '심층 리서치, 다국어 번역 등 고난이도 업무 지원',
      '세금계산서 100% 즉시 발행',
      '유효기간: 결제일로부터 1년'
    ]
  }
];

