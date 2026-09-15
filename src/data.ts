import { ServiceItem, TeamMember, PortfolioItem, ReviewItem, PricingPlan, FAQItem } from './types';
import contractReviewImg from './assets/images/contract_review_sample_1789468628301.jpg';
import meetingNotesImg from './assets/images/meeting_notes_minutes_1789468642460.jpg';
import tipsBusinessPlanImg from './assets/images/tips_business_plan_1789468656077.jpg';
import financialBriefingReportImg from './assets/images/financial_briefing_report_1789468696567.jpg';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'document',
    number: '01',
    categoryCode: 'DOCUMENTS',
    name: '문서 업무',
    description: '계약서 실시간 리스크 검토, 회의록 요약, 사업계획서 보완, 주간/월간 실적 보고서 자동화 작성',
    tags: ['계약서 검토', '회의록 정리', 'PPT 기획', 'IR/보고서'],
    icon: 'FileText',
    colorClass: 'brand-navy',
    previewImage: contractReviewImg,
    previewImageAlt: '계약서 리스크 검토 및 회의록 비즈니스 문서 실무 산출물',
    portfolioExample: {
      id: 'doc-1',
      client: '제조/물류 중견기업 D사',
      title: '영문 거래 계약서 20종 독소조항 일괄 분석 & 한국어 요약본',
      duration: '48시간 납품',
      result: '법무 검토 소요 시간 85% 단축, 면책 조항 4건 수정 권고 반영',
      summary: '국제 공급 계약서 20종의 준거법, 위약벌 조항, 비밀유지 의무를 AI로 교차 분석 후 전문 매니저가 리스크 등급(상/중/하)별 코멘트를 첨부해 최종 납품했습니다.',
      deliverable: '주석 첨부된 계약서 PDF 및 수정안 Word 문서, 위험도 대시보드',
      image: contractReviewImg,
      imageAlt: '영문 계약서 독소조항 분석 및 검토 문서 산출물'
    },
    portfolioCases: [
      {
        id: 'doc-1',
        client: '제조/물류 중견기업 D사',
        title: '영문 거래 계약서 20종 독소조항 일괄 분석 & 한국어 요약본',
        duration: '48시간 납품',
        result: '법무 검토 소요 시간 85% 단축, 면책 조항 4건 수정 권고 반영',
        summary: '국제 공급 계약서 20종의 준거법, 위약벌 조항, 비밀유지 의무를 AI로 교차 분석 후 전문 매니저가 리스크 등급(상/중/하)별 코멘트를 첨부해 최종 납품했습니다.',
        tags: ['영문계약', '법무스크리닝', '위험도진단'],
        deliverable: '주석 첨부된 계약서 PDF 및 수정안 Word 문서, 위험도 대시보드',
        image: contractReviewImg,
        imageAlt: '영문 계약서 독소조항 분석 및 주석 검토서'
      },
      {
        id: 'doc-2',
        client: '시리즈A 바이오 테크 기업 G사',
        title: '정부 TIPS 과제 선정용 60페이지 사업계획서 재구성 및 증빙 첨부',
        duration: '72시간 납품',
        result: 'TIPS 추천 심사 통과 & R&D 5억원 연구개발비 최종 유치 성공',
        summary: '복잡한 연구개발 기술 용어를 심사위원 눈높이에 맞춘 논리적 구조로 재편집하고 시장성·수익성 재무 지표를 일목요연하게 도식화했습니다.',
        tags: ['TIPS선정', '사업계획서', '정부과제'],
        deliverable: 'TIPS 표준 사업계획서 최종 HWP/PDF, 심사용 요약본 5p',
        image: tipsBusinessPlanImg,
        imageAlt: 'TIPS 사업계획서 및 IR 바인더 산출물'
      },
      {
        id: 'doc-3',
        client: '온디맨드 커머스 스타트업 F사',
        title: '음성 녹음 파일 15건 기반 핵심 액션 아이템 추출 Notion 회의록 연동',
        duration: '24시간 납품',
        result: '주간 전략 회의 정리 시간 주당 6시간 절감, 업무 누락 0건',
        summary: '격주 2시간씩 진행되는 임원 전략 회의 녹음본에서 결정 사항, 담당자별 R&R, 데드라인을 자동 태깅하여 노션 데이터베이스로 자동 전송되도록 구축했습니다.',
        tags: ['Notion연동', '회의록요약', '액션아이템'],
        deliverable: '노션 회의록 템플릿 DB, 임원 브리핑용 1장 불렛 요약',
        image: meetingNotesImg,
        imageAlt: '실제 주간 회의록 및 액션아이템 요약 보고서'
      },
      {
        id: 'doc-4',
        client: '자산운용·투자 자문 P사',
        title: '주간 글로벌 금융 시장 동향 경영진 브리핑 레포트 자동 템플릿',
        duration: '정기 발행 (매주 월 08:00)',
        result: '매주 반복되던 작성 시간 8시간 → 30분으로 93% 축소',
        summary: '외신 주요 지표(미 국채, 환율, 원자재)를 크롤링하여 임원진 보고용 정형 차트와 핵심 이슈 5가지를 매주 월요일 아침 완벽 검수 납품합니다.',
        tags: ['금융브리핑', '정기보고서', '임원보고'],
        deliverable: '매주 월요일 정시 발행 경영진 보고용 완성형 PDF 4페이지',
        image: financialBriefingReportImg,
        imageAlt: '경영진 브리핑 금융 보고서 문서 산출물'
      }
    ],
    detailedTasks: [
      '표준 근로·용역·투자 계약서 내 독소 조항 및 법적 위험 사전 스크리닝',
      '녹음 파일 또는 슬랙 대화록 기반 핵심 액션 아이템 자동 추출 회의록',
      '정부지원사업(예비/초기창업패키지, TIPS) 사업계획서 양식 맞춤 초안 구성',
      '사내 스프레드시트 연동 정기 주간/월간 경영 실적 브리핑 레포트'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: '주석 첨부된 계약서 PDF 및 수정안 Word 문서, Notion 회의록 페이지'
  },
  {
    id: 'content',
    number: '02',
    categoryCode: 'CONTENT CREATION',
    name: '콘텐츠 업무',
    description: '블로그 전문 아티클, SNS 카드뉴스 카피라이팅, 보도자료 초안, 브랜드 뉴스레터 정기 발행',
    tags: ['SEO 블로그', 'SNS 카피', '보도자료', '뉴스레터'],
    icon: 'Edit3',
    colorClass: 'blue-600',
    previewImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: 'SEO 테크 아티클 및 브랜드 콘텐츠 포트폴리오',
    portfolioExample: {
      id: 'cnt-1',
      client: 'B2B 클라우드 솔루션 스타트업 A사',
      title: '월 12회 전문 테크 블로그 아티클 & 인스타그램 카드뉴스 시리즈',
      duration: '주간 정기 발행 (의뢰 후 24시간 내)',
      result: '자연 검색 유입 트래픽 320% 증가, 리드 문의 월 45건 확보',
      summary: '개발자 및 엔터프라이즈 구매 결정권자를 타겟팅하여 전문 기술 용어 검증 및 가독성 높은 헤드라인 카피를 기획·발행했습니다.',
      deliverable: 'SEO 메타 태그 포함 마크다운/워드 원고, 카드뉴스 텍스트 기획안',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'SEO 테크 블로그 및 콘텐츠 발행 사례'
    },
    portfolioCases: [
      {
        id: 'cnt-1',
        client: 'B2B 클라우드 솔루션 스타트업 A사',
        title: '월 12회 전문 테크 블로그 아티클 & 인스타그램 카드뉴스 시리즈',
        duration: '주간 정기 발행 (의뢰 후 24시간 내)',
        result: '자연 검색 유입 트래픽 320% 증가, 리드 문의 월 45건 확보',
        summary: '개발자 및 엔터프라이즈 구매 결정권자를 타겟팅하여 전문 기술 용어 검증 및 가독성 높은 헤드라인 카피를 기획·발행했습니다.',
        tags: ['SEO테크블로그', '인바운드리드', '검색최적화'],
        deliverable: 'SEO 메타 태그 포함 마크다운/워드 원고, 카드뉴스 텍스트 기획안',
        image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'SEO 테크 블로그 및 콘텐츠 발행 사례'
      },
      {
        id: 'cnt-2',
        client: '스마트 물류 로봇 스타트업 R사',
        title: '시리즈B 80억 투자 유치 언론 배포 보도자료 작성 & 15개 매체 게재',
        duration: '12시간 납품',
        result: '주요 경제지 12곳 및 테크 전문지 3곳 당일 게재, 브랜드 인지도 급상승',
        summary: '복잡한 로보틱스 기술 지표를 일반 대중과 투자자가 이해하기 쉬운 핵심 수치 3가지로 압축해 표준 신문 기사 형식의 보도자료를 신속 작성했습니다.',
        tags: ['보도자료', 'PR기사', '언론홍보'],
        deliverable: '표준 프레스 릴리즈 원고 및 헤드라인 3개안, 기자 배포용 팩트시트',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '투자 유치 프레스 릴리즈 보도자료'
      },
      {
        id: 'cnt-3',
        client: '프리미엄 리빙 브랜드 L사',
        title: '구독자 3만 대상 주간 트렌드 큐레이션 이메일 뉴스레터 기획·원고',
        duration: '주 1회 정기 납품',
        result: '이메일 오픈율(OR) 41.8% 기록 (업계 평균 18% 대비 2.3배)',
        summary: '계절별 인테리어 트렌드와 지속가능한 가구 소재를 스토리텔링 형태로 엮어내어 구독자의 구매 전환 클릭률을 획기적으로 개선했습니다.',
        tags: ['뉴스레터', '이메일마케팅', '고객인게이지먼트'],
        deliverable: 'HTML 이메일 호환 마크업 원고 및 고화질 에셋 배치 가이드',
        image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '주간 이메일 뉴스레터 원고 기획 사례'
      }
    ],
    detailedTasks: [
      '구글 및 네이버 상위 랭킹 타겟팅 2,000자+ 전문 SEO 기술/산업 블로그',
      '인스타그램/링크드인 카드뉴스 슬라이드별 맞춤 헤드라인 및 본문 카피',
      '신규 런칭, 투자 유치, 업무 협약 등 표준 언론 배포용 프레스 릴리즈',
      '고객 충성도 제고를 위한 주간 큐레이션 이메일 뉴스레터 템플릿'
    ],
    turnaroundTime: '24~36시간 이내',
    deliverableSample: 'SEO 메타 태그 포함 마크다운/워드 원고, 카드뉴스 텍스트 기획안'
  },
  {
    id: 'research',
    number: '03',
    categoryCode: 'RESEARCH & ANALYSIS',
    name: '리서치 및 자료 조사',
    description: '해외 시장 신규 동향, 경쟁사 가격/서비스 벤치마킹 분석, 규제/인증 법률 기초 조사 보고서',
    tags: ['경쟁사 조사', '산업 리포트', '글로벌 번역', '규제 동향'],
    icon: 'Search',
    colorClass: 'emerald-600',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '시장 조사 및 글로벌 벤치마킹 데이터 리포트 포트폴리오',
    portfolioExample: {
      id: 'res-1',
      client: '국내 e-커머스 플랫폼 B사',
      title: '글로벌 15개사 구독 모델 요금제 및 배송 정책 심층 벤치마킹 리포트',
      duration: '36시간 납품',
      result: '시장 조사 소요 시간 2주에서 36시간으로 단축, 경영진 보고서 채택',
      summary: '미국/일본의 탑티어 커머스 15개사 가격 정책과 멤버십 혜택 매트릭스를 작성하고 핵심 차별화 전략 제언 슬라이드를 도출했습니다.',
      deliverable: '요약 브리프 10p PDF 및 스프레드시트 벤치마킹 Raw Data',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '글로벌 커머스 벤치마킹 리포트'
    },
    portfolioCases: [
      {
        id: 'res-1',
        client: '국내 e-커머스 플랫폼 B사',
        title: '글로벌 15개사 구독 모델 요금제 및 배송 정책 심층 벤치마킹 리포트',
        duration: '36시간 납품',
        result: '시장 조사 소요 시간 2주에서 36시간으로 단축, 경영진 보고서 채택',
        summary: '미국/일본의 탑티어 커머스 15개사 가격 정책과 멤버십 혜택 매트릭스를 작성하고 핵심 차별화 전략 제언 슬라이드를 도출했습니다.',
        tags: ['글로벌벤치마킹', '가격전략', '경쟁사비교'],
        deliverable: '요약 브리프 10p PDF 및 스프레드시트 벤치마킹 Raw Data',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '글로벌 커머스 벤치마킹 리포트'
      },
      {
        id: 'res-2',
        client: '핀테크 결제 솔루션 T사',
        title: '동남아 4개국(베트남·인니·태국·말레이) 전자금융 라이선스 규제 리포트',
        duration: '48시간 납품',
        result: '현지 로펌 자문 비용 약 2,500만원 절감 및 진출 타당성 검토 완료',
        summary: '각국 중앙은행 규정, 외환 관리법, 합작 법인 의무 지분율을 공신력 있는 영문 원문 문서 기반으로 교차 검증하여 체크리스트화했습니다.',
        tags: ['해외규제', '동남아진출', '핀테크법률'],
        deliverable: '동남아 4개국 금융 규제 비교 매트릭스 및 실무 지침 보고서',
        image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '해외 금융 라이선스 규제 분석'
      },
      {
        id: 'res-3',
        client: '전기차 충전 인프라 S사',
        title: '글로벌 특허 및 고속 충전 표준 기술 백서 국문 요약 브리프 (5건)',
        duration: '24시간 납품',
        result: 'R&D 연구원 특허 선행 기술 분석 기간 80% 단축',
        summary: '미국·유럽 100페이지 분량의 영문 전기차 충전 프로토콜 규격 문서를 핵심 회로 구조 및 호환성 관점으로 압축 번역 요약했습니다.',
        tags: ['기술백서', '특허선행조사', '기술번역'],
        deliverable: '핵심 다이어그램 포함 국문 기술 브리핑 슬라이드 15p',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '전기차 기술 백서 및 특허 분석'
      }
    ],
    detailedTasks: [
      '국내외 상위 10~20개 경쟁사 핵심 기능, 가격 정책, 고객 반응 매트릭스 비교',
      'Gartner, Statista 등 글로벌 신뢰 기관 자료 종합 산업 동향 분석 보고서',
      '해외 논문, 기술 백서, 영문 특허의 핵심 요약 및 한국어 번역 리포트',
      '신규 사업 진출을 위한 라이선스, 개인정보보호법 등 기초 규제 체크리스트'
    ],
    turnaroundTime: '48시간 이내',
    deliverableSample: '요약 브리프 10p PDF 및 스프레드시트 벤치마킹 Raw Data'
  },
  {
    id: 'data',
    number: '04',
    categoryCode: 'DATA & AUTOMATION',
    name: '데이터 가공 & 분석',
    description: '웹 크롤링 및 잠재고객 리스트업, 엑셀/노션 데이터 전처리 정제, 대시보드 시각화',
    tags: ['DB 수집정제', '스프레드시트 자동화', '시각화 차트', '웹 크롤링'],
    icon: 'BarChart3',
    colorClass: 'purple-600',
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '데이터 분석 대시보드 및 스프레드시트 자동화 포트폴리오',
    portfolioExample: {
      id: 'dat-1',
      client: 'B2B 산업재 유통 전문기업 M사',
      title: '전국 5,000개 도매 유통처 웹 크롤링 정제 및 타겟 영업 리스트 구축',
      duration: '48시간 납품',
      result: '영업팀 타겟 아웃바운드 성공률 +42% 향상, 수작업 120시간 절감',
      summary: '웹상의 공개 정보로부터 상호, 대표 전화, 취급 품목 데이터를 크롤링한 뒤 결측치 및 중복을 제거하여 즉시 콜드콜이 가능한 정제 DB를 납품했습니다.',
      deliverable: '정제된 Excel/CSV 데이터셋, 구글 시트 템플릿, 시각화 대시보드 링크',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '유통 데이터 크롤링 및 정제 사례'
    },
    portfolioCases: [
      {
        id: 'dat-1',
        client: 'B2B 산업재 유통 전문기업 M사',
        title: '전국 5,000개 도매 유통처 웹 크롤링 정제 및 타겟 영업 리스트 구축',
        duration: '48시간 납품',
        result: '영업팀 타겟 아웃바운드 성공률 +42% 향상, 수작업 120시간 절감',
        summary: '웹상의 공개 정보로부터 상호, 대표 전화, 취급 품목 데이터를 크롤링한 뒤 결측치 및 중복을 제거하여 즉시 콜드콜이 가능한 정제 DB를 납품했습니다.',
        tags: ['웹크롤링', '영업DB', '결측치정제'],
        deliverable: '정제된 Excel/CSV 데이터셋, 구글 시트 템플릿',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '유통 데이터 크롤링 및 정제 사례'
      },
      {
        id: 'dat-2',
        client: '소비재 D2C 브랜드 패션 N사',
        title: '네이버 스마트스토어/쿠팡/자사몰 일일 매출 자동 집계 Looker 대시보드',
        duration: '36시간 납품',
        result: '매일 1시간 수동 엑셀 다운로드 업무 완전 0분화, 채널별 수익률 실시간 파악',
        summary: '복수 판매 채널의 서로 다른 주문 엑셀 양식을 단일 규격 데이터로 표준화하고, 반품률과 광고비 대비 순마진을 보여주는 인터랙티브 차트를 구축했습니다.',
        tags: ['Looker대시보드', '매출자동집계', '이커머스정산'],
        deliverable: '실시간 연동 Looker Studio 대시보드 및 자동 백업 구글 시트',
        image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'Looker Studio 매출 집계 대시보드'
      },
      {
        id: 'dat-3',
        client: '병원 경영 컨설팅 메디컬그룹 W사',
        title: '지역별 환자 유입 채널 10만 건 데이터 비식별화 전처리 및 상관관계 분석',
        duration: '48시간 납품',
        result: '고단가 비급여 진료 전환에 기여하는 핵심 마케팅 채널 명확화',
        summary: '개인정보 보호법에 따른 완벽한 비식별화 마스킹 후 연령대별 방문 요일, 재방문 주기, 예약 경로 상관분석 통계 리포트를 시각화했습니다.',
        tags: ['빅데이터분석', '비식별화', '의료통계'],
        deliverable: '통계 분석 결과서 PDF 20p 및 전처리 완료 익명화 데이터셋',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '의료 빅데이터 분석 및 통계 리포트'
      }
    ],
    detailedTasks: [
      '합법적 공개 웹사이트 기반 타겟 B2B 리드(담당자, 이메일, 웹사이트) 수집',
      '중복/결측치/형식 불일치 대용량 엑셀 데이터 파이썬 기반 정제 및 통일',
      '구글 스프레드시트 AppScript 연동 실시간 자동 계산 및 알림 시스템',
      'Looker Studio / Tableau 기반 경영진 실시간 KPI 인터랙티브 대시보드'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: '정제된 Excel/CSV 데이터셋, 구글 시트 템플릿, 시각화 대시보드 링크'
  },
  {
    id: 'marketing',
    number: '05',
    categoryCode: 'MARKETING EXECUTION',
    name: '마케팅 실행 보조',
    description: '퍼포먼스 광고 문구 대량 생성, 인플루언서 리스트 추출 및 섭외 메일링, 리뷰 데이터 모니터링',
    tags: ['광고 카피 A/B', '바이럴 모니터링', '인플루언서 섭외', 'VOC 분석'],
    icon: 'Megaphone',
    colorClass: 'amber-600',
    previewImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '마케팅 캠페인 광고 카피 및 성과 모니터링 포트폴리오',
    portfolioExample: {
      id: 'mkt-1',
      client: '뷰티 헬스케어 코스메틱 C브랜드',
      title: '메타·구글 DA 광고용 후킹 카피 40종 A/B 테스트 세트 & 인플루언서 80인 DB',
      duration: '24시간 납품',
      result: '광고 클릭률(CTR) 1.8% → 3.6% 두 배 상승, ROAS 380% 달성',
      summary: '타겟 연령대별 감성 트리거를 반영한 짧은 후킹 문구와 섭외 이메일 템플릿을 신속히 세팅하여 신제품 런칭 캠페인을 성공시켰습니다.',
      deliverable: 'A/B 테스트 광고 카피 스프레드시트, 인플루언서 DB 목록',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '퍼포먼스 광고 카피라이팅 사례'
    },
    portfolioCases: [
      {
        id: 'mkt-1',
        client: '뷰티 헬스케어 코스메틱 C브랜드',
        title: '메타·구글 DA 광고용 후킹 카피 40종 A/B 테스트 세트 & 인플루언서 80인 DB',
        duration: '24시간 납품',
        result: '광고 클릭률(CTR) 1.8% → 3.6% 두 배 상승, ROAS 380% 달성',
        summary: '타겟 연령대별 감성 트리거를 반영한 짧은 후킹 문구와 섭외 이메일 템플릿을 신속히 세팅하여 신제품 런칭 캠페인을 성공시켰습니다.',
        tags: ['광고카피', 'A/B테스트', 'ROAS개선'],
        deliverable: 'A/B 테스트 광고 카피 스프레드시트, 인플루언서 DB 목록',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '퍼포먼스 광고 카피라이팅 사례'
      },
      {
        id: 'mkt-2',
        client: 'F&B 밀키트 정기구독 푸드 스타트업 J사',
        title: '인스타그램·유튜브 숏폼 크리에이터 150인 타겟 섭외 제안서 및 콜드메일',
        duration: '36시간 납품',
        result: '인플루언서 회신 수락률 34% 기록 (업계 통상 10% 미만 대비 3.4배)',
        summary: '크리에이터 채널의 최근 콘텐츠 톤앤매너를 분석해 개인화된 맞춤 협찬 제안 문구를 작성하여 협업 성사율을 극대화했습니다.',
        tags: ['인플루언서섭외', '콜드메일', '숏폼마케팅'],
        deliverable: '크리에이터 프로필 DB 및 1:1 맞춤 제안 메일 발송용 텍스트',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '인플루언서 마케팅 섭외 사례'
      },
      {
        id: 'mkt-3',
        client: '생활 가전 렌탈 브랜드 E사',
        title: '네이버 쇼핑 및 쿠팡 실구매자 12,000건 리뷰 감성 키워드 VOC 분석',
        duration: '24시간 납품',
        result: '고객 불만 주요 원인(설치 안내 부족) 발견 후 반품률 28% 감소',
        summary: '방대한 비정형 리뷰 텍스트를 자연어 처리로 긍/부정 키워드와 감성 스코어를 분류하여 마케팅 소구점 및 제품 개선 포인트를 도출했습니다.',
        tags: ['리뷰분석', 'VOC도출', '이커머스'],
        deliverable: 'VOC 감성 분석 인포그래픽 보고서 15p 및 키워드 워드클라우드',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 리뷰 감성 분석 보고서'
      }
    ],
    detailedTasks: [
      '메타(페이스북/인스타)·구글 검색 광고용 후킹 헤드라인 30종 A/B 테스트 세트',
      '브랜드 타겟 카테고리에 최적화된 마이크로 인플루언서 계정 100인 리스트업',
      'e커머스 몰 및 포털 상품 리뷰 감성 분석(긍정/부정 키워드 빈도 추출)',
      '파트너십 및 제휴 제안서 맞춤형 콜드 메일 템플릿 작성'
    ],
    turnaroundTime: '24~48시간 이내',
    deliverableSample: 'A/B 테스트 광고 카피 스프레드시트, 인플루언서 DB 목록'
  },
  {
    id: 'cs',
    number: '06',
    categoryCode: 'CS & OPERATIONS',
    name: '기업 운영 및 CS 지원',
    description: '자주 묻는 질문 FAQ 챗봇 세팅, 고객 불만 유형 자동 분류, 표준 안내 메일 템플릿 맞춤 발송',
    tags: ['FAQ 설계', '고객응대 가이드', 'CS 매뉴얼', '템플릿 구축'],
    icon: 'Headphones',
    colorClass: 'cyan-600',
    previewImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '고객 응대 시나리오 및 챗봇 자동화 포트폴리오',
    portfolioExample: {
      id: 'cs-1',
      client: '프롭테크 공유오피스 플랫폼 O사',
      title: '상담톡 50개 시나리오 트리 구축 & 입주사 VOC 불만 유형 표준 해결 매뉴얼',
      duration: '48시간 납품',
      result: '단순 반복 문의 처리율 68% 챗봇 자동화, 상담원 업무 피로도 대폭 개선',
      summary: '자주 접수되는 입주 계약, 주차, 시설 예약 관련 문의를 체계적인 챗봇 트리로 구성하고 난이도 높은 분쟁 대응용 문구를 정형화했습니다.',
      deliverable: 'CS 마스터 매뉴얼 문서, 챗봇 시나리오 기획서',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '챗봇 시나리오 트리 구축 사례'
    },
    portfolioCases: [
      {
        id: 'cs-1',
        client: '프롭테크 공유오피스 플랫폼 O사',
        title: '상담톡 50개 시나리오 트리 구축 & 입주사 VOC 불만 유형 표준 해결 매뉴얼',
        duration: '48시간 납품',
        result: '단순 반복 문의 처리율 68% 챗봇 자동화, 상담원 업무 피로도 대폭 개선',
        summary: '자주 접수되는 입주 계약, 주차, 시설 예약 관련 문의를 체계적인 챗봇 트리로 구성하고 난이도 높은 분쟁 대응용 문구를 정형화했습니다.',
        tags: ['챗봇시나리오', 'CS자동화', 'VOC해결'],
        deliverable: 'CS 마스터 매뉴얼 문서, 챗봇 시나리오 기획서',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '챗봇 시나리오 트리 구축 사례'
      },
      {
        id: 'cs-2',
        client: '글로벌 역직구 플랫폼 K-뷰티 E사',
        title: '해외 배송 지연 및 통관 분실 고객 응대 영문/일문 이메일 템플릿 30종',
        duration: '24시간 납품',
        result: '해외 고객 응대 리드타임 12시간 → 즉시 3분 이내로 단축, 리뷰 평점 4.8 유지',
        summary: '미국, 일본 특유의 비즈니스 이메일 매너와 공감 표현을 반영하여 분실/파손/오배송 클레임 시 즉시 사용 가능한 표준 메일 템플릿을 완성했습니다.',
        tags: ['글로벌CS', '영일문템플릿', '클레임방어'],
        deliverable: '다국어 매뉴얼 노션 페이지 및 Zendesk 매크로 연동 파일',
        image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '다국어 CS 템플릿 제작'
      },
      {
        id: 'cs-3',
        client: '교육 에듀테크 구독 서비스 C사',
        title: '신규 가입 유저 14일 적응 온보딩 카카오 알림톡 시퀀스 및 FAQ 가이드',
        duration: '36시간 납품',
        result: '온보딩 기간 내 무료 체험 유저의 유료 결제 전환율 21% 상승',
        summary: '가입 1일차, 3일차, 7일차 유저의 핵심 기능 사용 행동에 맞춘 맞춤형 튜토리얼 안내문과 잦은 이탈 구간 극복 팁을 작성했습니다.',
        tags: ['온보딩시퀀스', '카카오알림톡', '유료전환'],
        deliverable: '카카오 알림톡 검수 통과 문안 7종 및 노션 유저 사용 가이드',
        image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '고객 온보딩 알림톡 가이드'
      }
    ],
    detailedTasks: [
      '기존 문의 내역 분석을 통한 30문 30답 핵심 고객 FAQ 응대 시나리오 설계',
      '반복 접수되는 클레임 유형별 사과문, 보상 가이드, 표준 해결 가이드라인',
      '채널톡, 카카오 상담톡 챗봇 초기 트리 구조 및 답변 스크립트 세팅',
      '신규 고객 온보딩 자동 이메일 시퀀스(웰컴 메일, 사용 가이드) 작성'
    ],
    turnaroundTime: '48시간 이내',
    deliverableSample: 'CS 마스터 매뉴얼 문서, 챗봇 시나리오 기획서'
  },
  {
    id: 'custom',
    number: '07',
    categoryCode: 'WORKFLOW CUSTOM',
    name: '맞춤형 사내 AI 구축',
    description: '사내 노션/슬랙 연동 AI 비서 구축, 반복 보고서 정기 발송 봇 구성, 전용 프롬프트 라이브러리 공급',
    tags: ['사내 챗봇', '업무 자동화', '전용 프롬프트', '슬랙 봇'],
    icon: 'Cpu',
    colorClass: 'rose-600',
    previewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '사내 챗봇 및 업무 자동화 워크플로우 시스템 포트폴리오',
    portfolioExample: {
      id: 'cst-1',
      client: '임직원 120인 IT 솔루션 기업 K사',
      title: '사내 복지·휴가·보안규정 즉답 슬랙봇 & 주간 실적 자동 집계 봇 연동',
      duration: '4일 납품',
      result: '경영지원팀 단순 질문 답변 소요 시간 하루 평균 2.5시간 절감',
      summary: '사내 노션 워크스페이스와 연동하여 신규 입사자도 즉시 궁금한 사규를 확인할 수 있는 슬랙 봇을 구축하고 보안 필터링을 세팅했습니다.',
      deliverable: '동작하는 Slack App Webhook 설정, Zapier 워크플로우 명세서',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      imageAlt: '사내 슬랙 봇 연동 사례'
    },
    portfolioCases: [
      {
        id: 'cst-1',
        client: '임직원 120인 IT 솔루션 기업 K사',
        title: '사내 복지·휴가·보안규정 즉답 슬랙봇 & 주간 실적 자동 집계 봇 연동',
        duration: '4일 납품',
        result: '경영지원팀 단순 질문 답변 소요 시간 하루 평균 2.5시간 절감',
        summary: '사내 노션 워크스페이스와 연동하여 신규 입사자도 즉시 궁금한 사규를 확인할 수 있는 슬랙 봇을 구축하고 보안 필터링을 세팅했습니다.',
        tags: ['슬랙봇', '노션연동', '사내업무자동화'],
        deliverable: '동작하는 Slack App Webhook 설정, Zapier 워크플로우 명세서',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '사내 슬랙 봇 연동 사례'
      },
      {
        id: 'cst-2',
        client: '부동산 자산관리 컨설팅 R사',
        title: '등기부등본 및 건축물대장 PDF 업로드 시 핵심 권리관계 자동 요약 파이프라인',
        duration: '5일 납품',
        result: '물건 분석 소요 시간 건당 40분 → 3분으로 단축, 오탈자 제로',
        summary: '부동산 공적 장부 PDF를 드롭박스에 넣으면 근저당권, 압류, 용적률 정보를 자동으로 파싱해 사내 노션 DB에 정형화하는 AI 자동화를 구축했습니다.',
        tags: ['문서자동파싱', '부동산RAG', '드롭박스연동'],
        deliverable: 'Make.com 시나리오 블루프린트 및 파싱 검증 엔진',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '문서 자동 파싱 워크플로우'
      },
      {
        id: 'cst-3',
        client: '광고 마케팅 에이전시 V사',
        title: '부서별(기획·카피·디자인·개발) 맞춤형 고효율 사내 프롬프트 60선 라이브러리',
        duration: '3일 납품',
        result: '전사 AI 툴 활용률 28% → 89%로 급증, 산출물 퀄리티 상향 평준화',
        summary: '실제 업무 맥락에 최적화된 Few-Shot 프롬프트와 템플릿 변수를 구성하여 사내 위키에 배포하고 실무자 대상 1회 라이브 코칭을 진행했습니다.',
        tags: ['프롬프트엔지니어링', '사내교육', '생산성혁신'],
        deliverable: '사내 노션 프롬프트 라이브러리 템플릿 및 활용 매뉴얼',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '프롬프트 라이브러리 구축 사례'
      }
    ],
    detailedTasks: [
      '사내 규정, 사규, 제품 위키 데이터를 참조해 사내 질문에 즉답하는 슬랙 봇 연동',
      '매일 오전 9시 전일 실적 및 핵심 일정을 슬랙/잔디로 자동 발송하는 워크플로우',
      '마케팅/영업/개발 실무진을 위한 부서별 고효율 프롬프트 50선 맞춤 제작',
      'Zapier / Make 연동 이메일 수신 시 노션 DB 자동 생성 파이프라인'
    ],
    turnaroundTime: '협의 (평균 3~5일)',
    deliverableSample: '동작하는 Slack App Webhook 설정, Zapier 워크플로우 명세서'
  },
  {
    id: 'web',
    number: '08',
    categoryCode: 'WEB & DESIGN SUPPORT',
    name: '랜딩페이지 및 디자인',
    description: '이벤트 상세페이지 기획/제작, 노코드 웹페이지 신속 구축, 배너 및 인포그래픽 그래픽 작업',
    tags: ['반응형 웹', '상세페이지', '노코드 제작', '이벤트 배너'],
    icon: 'Code2',
    colorClass: 'indigo-600',
    previewImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    previewImageAlt: '웹 랜딩페이지 기획 및 상세페이지 디자인 포트폴리오',
    portfolioExample: {
      id: 'web-1',
      client: 'HR 테크 기업 H사',
      title: 'B2B 신규 채용 솔루션 고전환율 프로모션 랜딩페이지 기획 및 제작',
      duration: '3일 납품',
      result: '데모 상담 신청 전환율(CVR) 14.2% 기록, 모바일 완벽 최적화',
      summary: '설득력 있는 카피라이팅과 제품 UI 목업을 조합하여 모바일/데스크톱 완벽 반응형 랜딩페이지를 제작하고 문의 폼을 연동했습니다.',
      deliverable: 'Figma 디자인 소스 파일, 퍼블리싱 완료된 웹 URL 링크',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'B2B 프로모션 랜딩페이지 제작'
    },
    portfolioCases: [
      {
        id: 'web-1',
        client: 'HR 테크 기업 H사',
        title: 'B2B 신규 채용 솔루션 고전환율 프로모션 랜딩페이지 기획 및 제작',
        duration: '3일 납품',
        result: '데모 상담 신청 전환율(CVR) 14.2% 기록, 모바일 완벽 최적화',
        summary: '설득력 있는 카피라이팅과 제품 UI 목업을 조합하여 모바일/데스크톱 완벽 반응형 랜딩페이지를 제작하고 문의 폼을 연동했습니다.',
        tags: ['반응형웹', '고전환율', 'B2B랜딩'],
        deliverable: 'Figma 디자인 소스 파일, 퍼블리싱 완료된 웹 URL 링크',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        imageAlt: 'B2B 프로모션 랜딩페이지 제작'
      },
      {
        id: 'web-2',
        client: '프리미엄 주방가전 브랜드 K사',
        title: '와디즈 크라우드 펀딩 억대 펀딩 달성 상세페이지 기획/카피/디자인',
        duration: '4일 납품',
        result: '펀딩 오픈 2시간 만에 목표금액 1,500% 달성, 누적 1.8억원 모금',
        summary: '소비자의 페인포인트를 자극하는 초반 기획 구조와 고화질 3D 렌더링 목업 연출, 스펙 비교표를 완벽한 모바일 맞춤 세로형으로 완성했습니다.',
        tags: ['와디즈펀딩', '상세페이지', '매출극대화'],
        deliverable: '모바일 최적화 통이미지 JPG 슬라이스 및 원본 PSD/Figma 파일',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '크라우드 펀딩 상세페이지 제작'
      },
      {
        id: 'web-3',
        client: '글로벌 유학 및 어학원 스타트업 G사',
        title: '시즌 맞춤형 인스타그램/구글 배너 20종 세트 & 이벤트 팝업 그래픽',
        duration: '24시간 납품',
        result: '여름방학 특강 사전 예약률 전년 대비 45% 증가',
        summary: '1:1 정방형, 9:16 스토리형, 16:9 GDN 가로형 등 다양한 규격에 맞추어 브랜드 컬러 가이드를 엄격히 준수한 모던한 그래픽을 납품했습니다.',
        tags: ['배너디자인', '이벤트그래픽', '멀티규격'],
        deliverable: '규격별 WebP/PNG 이미지 20종 및 카피라이팅 바리에이션',
        image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80',
        imageAlt: '시즌 프로모션 배너 디자인 세트'
      }
    ],
    detailedTasks: [
      'Framer, Webflow 등을 활용한 반응형 고전환율 프로모션 랜딩페이지 제작',
      '와디즈/텀블벅/스마트스토어 펀딩용 설득 논리 기반 상세페이지 기획/제작',
      'SNS 마케팅용 규격별(1:1, 9:16, 16:9) 카드 배너 디자인 템플릿',
      '복잡한 사업 모델 및 비즈니스 프로세스 설명용 인포그래픽 다이어그램'
    ],
    turnaroundTime: '48~72시간 이내',
    deliverableSample: 'Figma 디자인 소스 파일, 퍼블리싱 완료된 웹 URL 링크'
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
    clientType: 'B2B SaaS 기업',
    duration: '소요: 24시간',
    title: '경쟁사 15개사 기능 및 가격 비교 리포트',
    description: '글로벌 주요 경쟁사의 요금제 체계와 핵심 API 스펙을 수집하여 30페이지 분량의 상세 비교표 및 시사점 도출 완료.',
    metricLabel: '인력 투입 대비',
    metricValue: '비용 74% 절감',
    category: '리서치'
  },
  {
    id: 'ecommerce',
    clientType: '이커머스 브랜드',
    duration: '소요: 36시간',
    title: '신규 제품군 SEO 최적화 상세페이지 카피',
    description: '타겟 페르소나별 소구점 12종 개발, 네이버 스마트스토어/쿠팡 상위 노출 키워드를 완벽 적용한 상세페이지 작성.',
    metricLabel: '전환율(CVR)',
    metricValue: '+38% 상승',
    category: '콘텐츠'
  },
  {
    id: 'manufacturing',
    clientType: '제조/물류 중견기업',
    duration: '소요: 48시간',
    title: '사내 영문 계약서 20종 일괄 리스크 검토',
    description: '해외 바이어 표준 계약서 내 준거법 및 면책 조항 자동 분석 후 한국어 요약표 및 리스크 등급 분류 제공.',
    metricLabel: '검토 소요 시간',
    metricValue: '85% 단축',
    category: '문서검토'
  },
  {
    id: 'healthcare',
    clientType: '바이오 헬스케어',
    duration: '소요: 48시간',
    title: 'FDA 인허가 가이드라인 분석 및 국문 브리프',
    description: '미국 FDA 최신 디지털 치료기기 규제 문서 150페이지의 핵심 쟁점 및 임상 요건 요약 보고서 납품.',
    metricLabel: '리서치 리드타임',
    metricValue: '2주 → 2일 단축',
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
