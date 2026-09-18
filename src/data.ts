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
        imageAlt: '계약서 검토 의견서 산출물'
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
        ]
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
        imageAlt: '회의록 정리 및 할 일 추출 산출물'
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
        ]
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
        imageAlt: '한글 표준 언론 배포용 보도자료 및 팩트시트 산출물'
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
    id: 'data',
    number: '04',
    categoryCode: 'DATA & AUTOMATION',
    name: '데이터 가공 & 분석',
    description: '영업용 리스트 수집, 엑셀 데이터 정리 및 통합, 일일 매출 현황 시트 취합',
    tags: ['데이터 수집', '엑셀 정리', '매출 취합', '시각화 차트'],
    icon: 'BarChart3',
    colorClass: 'purple-600',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '데이터 정리 및 엑셀 취합 실무 산출물',
    portfolioExample: {
      id: 'dat-1',
      client: '유통 기업 M사',
      title: '잠재 고객 및 거래처 리스트 수집·정제',
      duration: '의뢰 후 24~48시간',
      result: '중복 없는 깔끔한 영업용 연락처 DB 정리',
      summary: '공개된 웹상의 업체 정보(상호, 연락처, 품목)를 모아 중복과 빈칸을 정리하고 바로 쓸 수 있는 엑셀 리스트로 납품했습니다.',
      deliverable: '정제된 엑셀/스프레드시트 데이터 목록',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '거래처 리스트 수집 및 엑셀 정제'
    },
    portfolioCases: [
      {
        id: 'dat-1',
        client: '유통 기업 M사',
        title: '잠재 고객 및 거래처 리스트 수집·정제',
        duration: '의뢰 후 24~48시간',
        result: '중복 없는 깔끔한 영업용 연락처 DB 정리',
        summary: '공개된 웹상의 업체 정보(상호, 연락처, 품목)를 모아 중복과 빈칸을 정리하고 바로 쓸 수 있는 엑셀 리스트로 납품했습니다.',
        tags: ['리스트수집', '엑셀정리', '연락처DB'],
        deliverable: '정제된 엑셀/스프레드시트 데이터 목록',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '거래처 리스트 수집 및 엑셀 정제'
      },
      {
        id: 'dat-2',
        client: '패션 브랜드 N사',
        title: '쇼핑몰 판매 데이터 및 매출 엑셀 취합',
        duration: '의뢰 후 24~36시간',
        result: '채널별 주문 엑셀 자동 취합 및 일일 매출 파악',
        summary: '스마트스토어, 오픈마켓 등 서로 다른 양식의 판매 엑셀을 하나로 묶고 일별/월별 매출을 보기 쉽게 정리했습니다.',
        tags: ['매출취합', '쇼핑몰정산', '엑셀통합'],
        deliverable: '통합 매출 관리 구글 시트 템플릿',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '쇼핑몰 매출 집계 엑셀 시트'
      },
      {
        id: 'dat-3',
        client: '서비스 기업 W사',
        title: '고객 문의 및 유입 경로 데이터 정리',
        duration: '의뢰 후 48시간 이내',
        result: '고객 유입 경로와 주요 문의 유형 차트 정리',
        summary: '누적된 고객 문의 내역과 방문 경로를 분류하여 어떤 경로와 문의가 많은지 한눈에 보는 차트로 정리했습니다.',
        tags: ['문의내역정리', '유입경로', '차트시각화'],
        deliverable: '데이터 정리 시트 및 통계 요약표',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 문의 데이터 정리 현황'
      }
    ],
    detailedTasks: [
      '공개 정보 기반 영업용 잠재 고객 및 거래처 리스트 수집',
      '서로 다른 양식의 대량 엑셀 데이터 통합, 중복 제거 및 서식 정리',
      '스마트스토어, 오픈마켓 등 판매 데이터 일일/월별 자동 취합',
      '핵심 업무 지표를 한눈에 보는 구글 시트 대시보드 제작'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: '정제된 엑셀/CSV 데이터셋, 구글 시트 템플릿'
  },
  {
    id: 'marketing',
    number: '05',
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
        duration: '의뢰 후 24시간 이내',
        result: '클릭을 유도하는 맞춤 광고 문구 다수 제작',
        summary: 'SNS 및 검색 광고에 사용할 다양한 소구점의 광고 카피를 작성하고 테스트용으로 정리했습니다.',
        tags: ['광고문구', '소구점개발', '카피라이팅'],
        deliverable: '광고 문구 세트 스프레드시트',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '온라인 광고 문구 작성 산출물'
      },
      {
        id: 'mkt-2',
        client: '식품 스타트업 J사',
        title: '인플루언서 리스트업 및 협찬 제안 메일 작성',
        duration: '의뢰 후 24~36시간',
        result: '브랜드에 맞는 계정 발굴 및 섭외 문구 작성',
        summary: '브랜드 분위기에 맞는 SNS 계정들을 찾아 정리하고, 협찬 제안용 안내 문구와 메일 템플릿을 작성했습니다.',
        tags: ['인플루언서리스트', '협찬제안', '제안문구'],
        deliverable: '크리에이터 목록 DB 및 맞춤 제안 메일 문안',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '인플루언서 리스트 및 제안 메일'
      },
      {
        id: 'mkt-3',
        client: '가전 브랜드 E사',
        title: '구매자 리뷰 분석 및 고객 의견 요약',
        duration: '의뢰 후 24시간 이내',
        result: '고객 칭찬 포인트와 주요 불만 사항을 알기 쉽게 정리',
        summary: '쇼핑몰 후기 데이터를 분석하여 고객들이 자주 칭찬하는 점과 개선을 요구하는 불만 사항을 요약 정리했습니다.',
        tags: ['리뷰분석', '고객의견', '개선점도출'],
        deliverable: '고객 리뷰 요약 보고서 및 개선점 체크리스트',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 리뷰 분석 요약 보고서'
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
    number: '06',
    categoryCode: 'CS & OPERATIONS',
    name: '기업 운영 및 CS 지원',
    description: '자주 묻는 질문(FAQ) 정리, 상황별 고객 응대 템플릿, 챗봇 답변 시나리오',
    tags: ['FAQ 작성', '응대 템플릿', '고객 안내', '챗봇 시나리오'],
    icon: 'Headphones',
    colorClass: 'cyan-600',
    previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '고객 응대 시나리오 및 챗봇 답변 실무 산출물',
    portfolioExample: {
      id: 'cs-1',
      client: '공유오피스 O사',
      title: '고객 응대 FAQ 및 챗봇 답변 시나리오 작성',
      duration: '의뢰 후 48시간 이내',
      result: '자주 묻는 질문 챗봇 세팅으로 단순 문의 응대 시간 절감',
      summary: '고객들이 자주 묻는 질문과 답변을 체계적으로 정리하여 카카오톡/채널톡 챗봇에 바로 등록할 수 있는 시나리오를 만들었습니다.',
      deliverable: 'FAQ 매뉴얼 문서 및 챗봇 시나리오 기획서',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '챗봇 응대 시나리오 작성 산출물'
    },
    portfolioCases: [
      {
        id: 'cs-1',
        client: '공유오피스 O사',
        title: '고객 응대 FAQ 및 챗봇 답변 시나리오 작성',
        duration: '의뢰 후 48시간 이내',
        result: '자주 묻는 질문 챗봇 세팅으로 단순 문의 응대 시간 절감',
        summary: '고객들이 자주 묻는 질문과 답변을 체계적으로 정리하여 카카오톡/채널톡 챗봇에 바로 등록할 수 있는 시나리오를 만들었습니다.',
        tags: ['FAQ작성', '챗봇답변', '고객응대'],
        deliverable: 'FAQ 매뉴얼 문서 및 챗봇 시나리오 기획서',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '챗봇 응대 시나리오 작성 산출물'
      },
      {
        id: 'cs-2',
        client: '쇼핑몰 E사',
        title: '상황별 고객 응대 이메일 및 문자 템플릿 작성',
        duration: '의뢰 후 24시간 이내',
        result: '배송 지연, 교환, 환불 등 반복 문의에 빠른 답변 가능',
        summary: '배송 지연, 단순 변심, 불량 접수 등 자주 발생하는 상황별로 정중하고 명확한 표준 답변 문구를 작성했습니다.',
        tags: ['응대템플릿', '고객안내문', '클레임대응'],
        deliverable: '상황별 고객 응대 매뉴얼 및 템플릿 모음',
        image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 응대 템플릿 제작'
      },
      {
        id: 'cs-3',
        client: '교육 서비스 C사',
        title: '신규 고객 환영 및 이용 안내 알림톡 문구 작성',
        duration: '의뢰 후 24~36시간',
        result: '서비스 가입 후 이용 방법 안내 간소화',
        summary: '신규 회원이 서비스를 쉽게 이용할 수 있도록 가입 후 단계별 안내 문구와 자주 묻는 질문 안내서를 작성했습니다.',
        tags: ['알림톡문구', '이용안내', '고객가이드'],
        deliverable: '카카오 알림톡 문안 및 이용 가이드 문서',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 안내 알림톡 문안'
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
    number: '07',
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
    number: '08',
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
    role: 'DATA ARCHITECT',
    experience: '데이터 엔지니어링 및 파이프라인 자동화 전담',
    tag: 'Python / SQL',
    badge: '인증 전문가',
    badgeBg: 'bg-emerald-600 text-white',
    scope: '담당: 웹 데이터 스크래핑, 엑셀 매크로 정제, 업무 자동화 봇',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWYolfIb3iAbKhZgWpvV0JBPqPoOgFsqhFFLSZLlclhsb_iaIpymgHU3aaIb-b02edsGM39nbMd1nQLFkuqcwCgFuG7UOlYOgJbVZBAQG2c1Bx5_SjwEwgtum8kC6oM5gZeoV8tcK1XVEfCIqHIZNUs1WMM5awJ0mgUg8whXnPO1ZcIXGIejeTpbvJLc7otJ2-1LWT13tzq8hbiQQquUZFkflb0F8ce6Hz_GUlbuGQbd8prtu_eo',
    bio: '카이스트 석사 졸업. 복잡한 웹 크롤링과 데이터 파이프라인 구축을 전문으로 하며, 엑셀 업무 80%를 단축시키는 자동화 솔루션을 담당합니다.'
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
      '기본 텍스트/데이터 업무 지원',
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
      '고난이도 리서치 & 데이터 크롤링 포함'
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
      '크롤링, 데이터 분석 등 고난이도 업무 지원',
      '세금계산서 100% 즉시 발행',
      '유효기간: 결제일로부터 1년'
    ]
  }
];

