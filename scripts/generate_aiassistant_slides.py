import xml.etree.ElementTree as ET
import os

os.makedirs('src/assets/images', exist_ok=True)

# 1. Desktop Slide (1200 x 675)
svg_desktop = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="aBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="50%" stop-color="#0f1a26"/>
      <stop offset="100%" stop-color="#050a0f"/>
    </linearGradient>
    <linearGradient id="aChromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="aHeroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#182333"/>
      <stop offset="45%" stop-color="#0f1a27"/>
      <stop offset="100%" stop-color="#1b120c"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f05a22"/>
      <stop offset="100%" stop-color="#d94814"/>
    </linearGradient>
    <linearGradient id="serviceCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#162232"/>
      <stop offset="100%" stop-color="#0d1622"/>
    </linearGradient>
    <filter id="aDropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="aCardShadow" x="-5%" y="-5%" width="110%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#aBgGrad)"/>

  <!-- Subtle Blueprint Grid -->
  <g stroke="#ffffff" stroke-opacity="0.03" stroke-width="1">
    <line x1="0" y1="135" x2="1200" y2="135"/>
    <line x1="0" y1="270" x2="1200" y2="270"/>
    <line x1="0" y1="405" x2="1200" y2="405"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
    <line x1="240" y1="0" x2="240" y2="675"/>
    <line x1="480" y1="0" x2="480" y2="675"/>
    <line x1="720" y1="0" x2="720" y2="675"/>
    <line x1="960" y1="0" x2="960" y2="675"/>
  </g>

  <!-- Ambient Glow Behind Browser -->
  <circle cx="600" cy="280" r="380" fill="#f05a22" opacity="0.08"/>

  <!-- Browser Window Wrapper (1080 x 605) -->
  <g transform="translate(60, 35)" filter="url(#aDropShadow)">
    <rect width="1080" height="605" rx="14" fill="#09121a" stroke="#253549" stroke-width="1.5"/>

    <!-- 1. Browser Chrome / Title Bar (Height: 46) -->
    <path d="M 0,14 Q 0,0 14,0 L 1066,0 Q 1080,0 1080,14 L 1080,46 L 0,46 Z" fill="url(#aChromeGrad)"/>
    <line x1="0" y1="46" x2="1080" y2="46" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>

    <!-- Mac Traffic Lights -->
    <circle cx="26" cy="23" r="6" fill="#ff5f56"/>
    <circle cx="46" cy="23" r="6" fill="#ffbd2e"/>
    <circle cx="66" cy="23" r="6" fill="#27c93f"/>

    <path d="M 98,23 L 104,18 M 98,23 L 104,28" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M 116,23 L 110,18 M 116,23 L 110,28" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    
    <path d="M 134,20 A 4,4 0 1,1 131,25" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 130,22 L 131,25 L 134,24" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- URL Bar -->
    <rect x="155" y="9" width="670" height="28" rx="14" fill="#0b131e" stroke="#334155" stroke-width="1"/>
    <g transform="translate(168, 16)">
      <rect x="0" y="3" width="10" height="8" rx="1.5" fill="#f05a22"/>
      <path d="M 2,3 L 2,1.5 A 3,3 0 0,1 8,1.5 L 8,3" fill="none" stroke="#f05a22" stroke-width="1.5"/>
    </g>
    <text x="186" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="500" fill="#94a3b8">
      <tspan fill="#f05a22" font-weight="700">https://</tspan><tspan fill="#ffffff" font-weight="800">aiassistant.ai.kr</tspan><tspan fill="#64748b">/</tspan>
    </text>

    <!-- URL Bar Right Badges -->
    <g transform="translate(680, 14)">
      <rect width="132" height="18" rx="9" fill="#f05a22" fill-opacity="0.15" stroke="#f05a22" stroke-width="0.8"/>
      <circle cx="10" cy="9" r="3.5" fill="#f05a22"/>
      <text x="19" y="12.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#f05a22">원페이지 기업 공식 홈</text>
    </g>

    <!-- Chrome Right Tools -->
    <g transform="translate(840, 16)">
      <text x="15" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#38bdf8">1440 x 900</text>
      <rect x="95" y="-2" width="128" height="22" rx="4" fill="#f05a22"/>
      <text x="159" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">실시간 운영 사이트 ↗</text>
    </g>

    <!-- 2. AI Assistant Sticky Navigation Bar (Height: 52) -->
    <g transform="translate(0, 47)">
      <rect width="1080" height="52" fill="#0d1722"/>
      <line x1="0" y1="52" x2="1080" y2="52" stroke="#1d2b3c" stroke-width="1"/>
      
      <!-- Brand Logo -->
      <g transform="translate(28, 12)">
        <rect width="32" height="28" rx="7" fill="url(#orangeGrad)"/>
        <text x="16" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">AI</text>
        <text x="70" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="17" font-weight="900" fill="#ffffff" letter-spacing="-0.5">AI비서 <tspan fill="#f05a22">.</tspan></text>
        <text x="122" y="19" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8">기업 실전 업무 대행</text>
      </g>

      <!-- Section Navigation Links -->
      <g transform="translate(370, 18)">
        <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#f05a22">서비스 소개</text>
        <rect x="-2" y="22" width="56" height="2.5" rx="1.2" fill="#f05a22"/>
        <text x="75" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">납품 포트폴리오</text>
        <text x="180" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">업무 프로세스</text>
        <text x="275" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">전문가 팀</text>
        <text x="350" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">고객 후기</text>
      </g>

      <!-- Right Action CTA -->
      <g transform="translate(895, 12)">
        <rect width="155" height="28" rx="14" fill="url(#orangeGrad)"/>
        <text x="77.5" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">⚡ 실시간 맞춤 견적 계산</text>
      </g>
    </g>

    <!-- 3. One-Page Hero Section (Height: 185) -->
    <g transform="translate(24, 115)">
      <rect width="1032" height="180" rx="12" fill="url(#aHeroGrad)" stroke="#2b3b4f" stroke-width="1.2"/>
      
      <!-- Hero Left Headline & Copy -->
      <g transform="translate(32, 24)">
        <rect width="215" height="22" rx="11" fill="#f05a22" fill-opacity="0.2" stroke="#f05a22" stroke-width="0.8"/>
        <text x="14" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#f05a22">
          ★ 대한민국 No.1 기업 실전 업무 대행
        </text>

        <text x="0" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="25" font-weight="900" fill="#ffffff" letter-spacing="-0.8">
          AI를 배우지 마세요, 업무를 맡기세요.
        </text>
        
        <text x="0" y="82" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="500" fill="#cbd5e1">
          복잡한 사업계획서(PPT), 계약서 검토, 디자인, 마케팅, 웹사이트까지 AI와 전문가 팀이 24시간 내 책임 완성합니다.
        </text>

        <!-- CTA & Metrics -->
        <g transform="translate(0, 102)">
          <rect width="165" height="32" rx="7" fill="url(#orangeGrad)"/>
          <text x="82.5" y="20.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">
            실시간 맞춤 견적 확인 ↗
          </text>

          <g transform="translate(178, 0)">
            <rect width="145" height="32" rx="7" fill="#131e2a" stroke="#2a3c50" stroke-width="1"/>
            <text x="72.5" y="20.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="700" fill="#cbd5e1" text-anchor="middle">
              포트폴리오 갤러리 6종
            </text>
          </g>

          <g transform="translate(340, 6)">
            <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="700" fill="#38bdf8">
              누적 의뢰 1,420+ 건 | 납품 만족도 98.7% | 24~48시간 특급 완제
            </text>
          </g>
        </g>
      </g>

      <!-- Right Visual Dashboard Simulation Card -->
      <g transform="translate(710, 18)">
        <rect width="290" height="144" rx="10" fill="#0d1620" stroke="#25384d" stroke-width="1"/>
        <rect width="290" height="30" rx="10" fill="#142130"/>
        <text x="16" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#ffffff">
          ⚡ AI비서 실시간 의뢰 진행 현황
        </text>
        <circle cx="270" cy="15" r="4" fill="#10b981"/>

        <!-- Mini Pipeline Steps -->
        <g transform="translate(14, 40)">
          <rect width="80" height="42" rx="6" fill="#152435"/>
          <text x="40" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">의뢰 접수</text>
          <text x="40" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">1,428건</text>

          <rect x="90" y="0" width="80" height="42" rx="6" fill="#152435"/>
          <text x="130" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">AI + 전문가 검수</text>
          <text x="130" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#38bdf8" text-anchor="middle">진행중 12건</text>

          <rect x="180" y="0" width="80" height="42" rx="6" fill="#1f1a14" stroke="#f05a22" stroke-width="0.8"/>
          <text x="220" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#f05a22" text-anchor="middle">최종 납품</text>
          <text x="220" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#f05a22" text-anchor="middle">98.7% 만족</text>
        </g>

        <!-- Status ticker -->
        <g transform="translate(14, 94)">
          <rect width="260" height="34" rx="6" fill="#091017"/>
          <text x="10" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="600" fill="#10b981">● 실시간 납품:</text>
          <text x="80" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#cbd5e1">바이오 스타트업 IR 피치덱 최종 납품 완료 (방금 전)</text>
        </g>
      </g>
    </g>

    <!-- 4. 6 Core Business Services Cards Grid (Height: 280) -->
    <g transform="translate(28, 310)">
      <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14.5" font-weight="900" fill="#ffffff">
        💼 6대 핵심 비즈니스 업무 영역 &amp; 실전 산출물 포트폴리오
      </text>
      <text x="385" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#f05a22">
        [단 한 페이지에서 6개 업무를 즉시 열람 및 시뮬레이션 가능]
      </text>
    </g>

    <!-- 6 Services Mini Cards (2 rows x 3 cols or 6 in 1 row) -->
    <!-- Card 1: PPT 제작 -->
    <g transform="translate(24, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="url(#serviceCardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#0b131e"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#f05a22"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">01</text>
      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">PPT 제작</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">사업계획서·투자 IR 피치덱</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 정부지원사업 발표자료</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 고밀도 인포그래픽 3종</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 24~48시간 이내 완제</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#f05a22" fill-opacity="0.15" stroke="#f05a22" stroke-width="0.8"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#f05a22" text-anchor="middle">슬라이드 15p 보기 ↗</text>
    </g>

    <!-- Card 2: 계약서 업무 -->
    <g transform="translate(196, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="url(#serviceCardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#0b131e"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#3b82f6"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">02</text>
      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">계약서 업무</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">용역·투자·제휴 법률 검토</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 11대 독소조항 핀셋 제거</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 변호사 감수급 수정안</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 8장 계약서 24시간 완제</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="0.8"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">계약서 8장 보기 ↗</text>
    </g>

    <!-- Card 3: 디자인 업무 -->
    <g transform="translate(368, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="url(#serviceCardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#0b131e"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#a855f7"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">03</text>
      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">디자인 업무</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">포스터·카드뉴스·배너</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 브랜드 키비주얼 디자인</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 인스타 카드뉴스 6장 셋</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 원본 PSD/Figma 제공</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#a855f7" fill-opacity="0.15" stroke="#a855f7" stroke-width="0.8"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#c084fc" text-anchor="middle">디자인 3종 보기 ↗</text>
    </g>

    <!-- Card 4: 마케팅 업무 -->
    <g transform="translate(540, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="url(#serviceCardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#0b131e"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#eab308"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">04</text>
      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">마케팅 업무</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">블로그·인스타·보도자료</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 네이버 블로그 SEO 상위</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 언론 홍보 보도자료 초안</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 자동화 파이프라인 세팅</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#eab308" fill-opacity="0.15" stroke="#eab308" stroke-width="0.8"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#facc15" text-anchor="middle">마케팅 산출물 보기 ↗</text>
    </g>

    <!-- Card 5: 사이트 제작 (현재 선택 강조) -->
    <g transform="translate(712, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="#142436" stroke="#f05a22" stroke-width="1.8"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#09121c"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#10b981"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">05</text>
      
      <!-- Current Active Badge -->
      <rect x="90" y="12" width="60" height="18" rx="4" fill="#f05a22"/>
      <text x="120" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">현재 사이트</text>

      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">사이트 제작</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#38bdf8">원페이지·공식홈·쇼핑몰</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#ffffff">· aiassistant.ai.kr 본원</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#a7f3d0">· 실시간 견적 산출기 탑재</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 모바일 100% 반응형 완제</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#f05a22"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">원페이지 4p 보기 ↗</text>
    </g>

    <!-- Card 6: 영상 제작 -->
    <g transform="translate(884, 336)" filter="url(#aCardShadow)">
      <rect width="164" height="240" rx="9" fill="url(#serviceCardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="148" height="85" rx="6" fill="#0b131e"/>
      <rect x="12" y="12" width="22" height="20" rx="4" fill="#f43f5e"/>
      <text x="23" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">06</text>
      <text x="12" y="55" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">영상 제작</text>
      <text x="12" y="70" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">숏폼·릴스·모션그래픽</text>

      <text x="12" y="112" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 9:16 세로형 바이럴 영상</text>
      <text x="12" y="130" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 자막·SFX 모션 컷편집</text>
      <text x="12" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#cbd5e1">· 조회수 120만회 달성</text>

      <rect x="10" y="200" width="144" height="26" rx="5" fill="#f43f5e" fill-opacity="0.15" stroke="#f43f5e" stroke-width="0.8"/>
      <text x="82" y="217" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#fb7185" text-anchor="middle">영상 포트폴리오 보기 ↗</text>
    </g>
  </g>
</svg>'''

# 2. Mobile Mockup Slide (1200 x 675)
svg_mobile = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="amBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071018"/>
      <stop offset="60%" stop-color="#0f1a26"/>
      <stop offset="100%" stop-color="#050a0f"/>
    </linearGradient>
    <linearGradient id="amPhoneFrame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="amOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f05a22"/>
      <stop offset="100%" stop-color="#d94814"/>
    </linearGradient>
    <filter id="amDropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#amBgGrad)"/>

  <!-- Left Side: Mobile Responsive Highlights -->
  <g transform="translate(60, 50)">
    <rect width="190" height="26" rx="13" fill="#f05a22" fill-opacity="0.15" stroke="#f05a22" stroke-width="1"/>
    <text x="16" y="17.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#f05a22">
      📱 원페이지 모바일 최적화
    </text>

    <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      AI비서 원페이지 모바일 뷰
    </text>
    <text x="0" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="28" font-weight="900" fill="#f05a22" letter-spacing="-0.5">
      1초 스크롤 &amp; 견적 시뮬레이터
    </text>

    <text x="0" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
      모바일 유입 기업 의뢰인(CEO·실무자)을 위한 한 손 조작 원스톱 견적 신청 UX
    </text>

    <!-- 4 Key Points Cards -->
    <g transform="translate(0, 160)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#2d160c" stroke="#f05a22" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#f05a22" text-anchor="middle">⚡</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        초고속 SPA 0.8초 로딩 최적화
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        새로고침 없는 즉각적인 부드러운 스크롤 이동과 컴포넌트 지연 로딩 완비
      </text>
    </g>

    <g transform="translate(0, 252)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#0a2538" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#38bdf8" text-anchor="middle">📊</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        모바일 터치 견적 시뮬레이터
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        손가락 탭 몇 번으로 업무 유형별 예상 단가와 납품 일정이 즉시 계산되는 UI
      </text>
    </g>

    <g transform="translate(0, 344)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#1f112e" stroke="#a855f7" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#a855f7" text-anchor="middle">🖼️</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        포트폴리오 슬라이드 &amp; 원문 열람 모달
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        모바일 제스처 스와이프로 1p~8p 고해상도 그래픽과 실제 텍스트 원문 전문 열람
      </text>
    </g>

    <g transform="translate(0, 436)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#042817" stroke="#10b981" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#10b981" text-anchor="middle">💬</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        모바일 문의 전환율(CVR) 6.4% 달성
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        전화상담/온라인 견적 문의 듀얼 플로팅 CTA로 유입 대비 상담 접수율 3.2배 향상
      </text>
    </g>

    <g transform="translate(0, 532)">
      <rect width="420" height="42" rx="8" fill="#1b120a" stroke="#f05a22" stroke-width="1.2"/>
      <text x="210" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#f05a22" text-anchor="middle">
        실시간 도메인 https://aiassistant.ai.kr/ 모바일 완벽 호환
      </text>
    </g>
  </g>

  <!-- Right Side: iPhone Mockup (310 x 590) -->
  <g transform="translate(560, 40)" filter="url(#amDropShadow)">
    <rect width="310" height="590" rx="42" fill="url(#amPhoneFrame)" stroke="#475569" stroke-width="3"/>
    <rect x="9" y="9" width="292" height="572" rx="34" fill="#09121a"/>

    <!-- Dynamic Island -->
    <rect x="110" y="16" width="90" height="20" rx="10" fill="#000000"/>
    <circle cx="178" cy="26" r="4.5" fill="#1e293b"/>

    <!-- Status Bar -->
    <text x="32" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">9:41</text>
    <g transform="translate(250, 20)">
      <rect width="18" height="9.5" rx="2.5" fill="none" stroke="#ffffff" stroke-width="1.2"/>
      <rect x="2" y="2" width="11" height="5.5" rx="1" fill="#f05a22"/>
      <path d="M 19,3.5 L 19,6" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
    </g>

    <!-- Mobile Header -->
    <g transform="translate(9, 44)">
      <rect width="292" height="44" fill="#0d1722"/>
      <line x1="0" y1="44" x2="292" y2="44" stroke="#1d2b3c" stroke-width="0.8"/>
      
      <g transform="translate(14, 10)">
        <rect width="24" height="22" rx="5" fill="url(#amOrangeGrad)"/>
        <text x="12" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">AI</text>
        <text x="36" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#ffffff">AI비서</text>
      </g>

      <!-- Hamburger Menu & Quote CTA -->
      <g transform="translate(210, 10)">
        <rect width="68" height="24" rx="12" fill="url(#amOrangeGrad)"/>
        <text x="34" y="15.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">견적신청</text>
      </g>
    </g>

    <!-- Mobile Hero Body -->
    <g transform="translate(19, 100)">
      <rect width="272" height="135" rx="8" fill="#131e2b" stroke="#25384d" stroke-width="1"/>
      <rect x="10" y="10" width="120" height="18" rx="9" fill="#f05a22" fill-opacity="0.2"/>
      <text x="70" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8.5" font-weight="900" fill="#f05a22" text-anchor="middle">기업 실전 업무 대행</text>

      <text x="10" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
        AI를 배우지 마세요,
      </text>
      <text x="10" y="68" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="15" font-weight="900" fill="#f05a22">
        업무를 맡기세요.
      </text>
      <text x="10" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">
        사업계획서·계약서·디자인 24시간 완제
      </text>

      <g transform="translate(10, 98)">
        <rect width="120" height="26" rx="6" fill="url(#amOrangeGrad)"/>
        <text x="60" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="900" fill="#ffffff" text-anchor="middle">
          맞춤 견적 산출 ↗
        </text>

        <rect x="126" y="0" width="120" height="26" rx="6" fill="#1e2c3c"/>
        <text x="186" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#cbd5e1" text-anchor="middle">
          포트폴리오 보기
        </text>
      </g>
    </g>

    <!-- Mobile 6 Services Quick Selector Strip -->
    <g transform="translate(19, 245)">
      <text x="2" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ffffff">
        6대 핵심 업무 바로가기
      </text>
      <g transform="translate(0, 24)">
        <rect width="86" height="42" rx="6" fill="#132130" stroke="#f05a22" stroke-width="1"/>
        <text x="43" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#f05a22" text-anchor="middle">PPT 제작</text>
        <text x="43" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="600" fill="#94a3b8" text-anchor="middle">15장 슬라이드</text>

        <rect x="93" y="0" width="86" height="42" rx="6" fill="#132130"/>
        <text x="136" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">계약서 검토</text>
        <text x="136" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="500" fill="#94a3b8" text-anchor="middle">독소조항 제거</text>

        <rect x="186" y="0" width="86" height="42" rx="6" fill="#132130"/>
        <text x="229" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">디자인 업무</text>
        <text x="229" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="500" fill="#94a3b8" text-anchor="middle">카드뉴스·배너</text>
      </g>
    </g>

    <!-- Mobile Mini Quotation Card Simulation -->
    <g transform="translate(19, 325)">
      <rect width="272" height="175" rx="8" fill="#111c28" stroke="#1f3246" stroke-width="0.8"/>
      <rect x="10" y="10" width="252" height="26" rx="5" fill="#182738"/>
      <text x="20" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#ffffff">
        ⚡ 실시간 맞춤 견적 시뮬레이터
      </text>

      <g transform="translate(14, 46)">
        <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8">선택 업무:</text>
        <text x="60" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#f05a22">사이트 제작 (원페이지 기업 홈)</text>

        <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8">납품 일정:</text>
        <text x="60" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#38bdf8">의뢰 후 3일 이내 완제</text>

        <text x="0" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8">포함 항목:</text>
        <text x="60" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#cbd5e1">PC/모바일 반응형 + 견적기 + SEO</text>

        <line x1="0" y1="68" x2="244" y2="68" stroke="#1f3044" stroke-width="1"/>
        <text x="0" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#94a3b8">예상 견적가:</text>
        <text x="140" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#ffffff">맞춤 산출 완료</text>
      </g>

      <rect x="14" y="142" width="244" height="24" rx="4" fill="url(#amOrangeGrad)"/>
      <text x="136" y="157" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="900" fill="#ffffff" text-anchor="middle">
        이 조건으로 원클릭 상담 신청 ↗
      </text>
    </g>

    <!-- Sticky Bottom Dual Bar -->
    <g transform="translate(9, 516)">
      <rect width="292" height="60" fill="#0c1520"/>
      <line x1="0" y1="0" x2="292" y2="0" stroke="#1b2a3c" stroke-width="1"/>

      <!-- Phone CTA -->
      <g transform="translate(14, 12)">
        <rect width="105" height="36" rx="8" fill="#162332" stroke="#253a50" stroke-width="0.8"/>
        <text x="52.5" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#cbd5e1" text-anchor="middle">📞 전화상담</text>
      </g>

      <!-- Instant Quote CTA -->
      <g transform="translate(126, 12)">
        <rect width="152" height="36" rx="8" fill="url(#amOrangeGrad)"/>
        <text x="76" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="900" fill="#ffffff" text-anchor="middle">
          ⚡ 1초 견적 신청 ↗
        </text>
      </g>
    </g>

    <rect x="105" y="568" width="100" height="4" rx="2" fill="#ffffff" fill-opacity="0.3"/>
  </g>

  <!-- Right Tablet Preview Window -->
  <g transform="translate(900, 110)" filter="url(#amDropShadow)">
    <rect width="250" height="440" rx="24" fill="#0b1622" stroke="#25384c" stroke-width="2"/>
    <rect x="8" y="8" width="234" height="424" rx="18" fill="#081018"/>
    <rect x="8" y="8" width="234" height="34" fill="#0f1b29"/>
    <text x="24" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#f05a22">AI비서 (Tablet View)</text>
    
    <g transform="translate(20, 56)">
      <rect width="100" height="140" rx="8" fill="#132130"/>
      <rect width="100" height="140" rx="8" x="110" fill="#132130"/>
      <rect width="100" height="140" rx="8" y="152" fill="#132130"/>
      <rect width="100" height="140" rx="8" x="110" y="152" fill="#132130"/>
    </g>

    <g transform="translate(30, 370)">
      <rect width="190" height="32" rx="16" fill="#f05a22" fill-opacity="0.2" stroke="#f05a22" stroke-width="1"/>
      <text x="95" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#f05a22" text-anchor="middle">
        모바일 &amp; 태블릿 완벽 반응형
      </text>
    </g>
  </g>
</svg>'''

# 3. Interactive Quote System & Conversion Pipeline Slide (1200 x 675)
svg_quote = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="qBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#081119"/>
      <stop offset="60%" stop-color="#111d2c"/>
      <stop offset="100%" stop-color="#070c12"/>
    </linearGradient>
    <linearGradient id="qCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#142131"/>
      <stop offset="100%" stop-color="#0d1622"/>
    </linearGradient>
    <linearGradient id="qOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f05a22"/>
      <stop offset="100%" stop-color="#d94814"/>
    </linearGradient>
    <filter id="qDropShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#qBgGrad)"/>

  <!-- Top Title Banner -->
  <g transform="translate(60, 36)">
    <rect width="190" height="24" rx="12" fill="#f05a22" fill-opacity="0.15" stroke="#f05a22" stroke-width="1"/>
    <text x="14" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#f05a22">
      ⚡ 원페이지 핵심 인터랙티브 기능
    </text>

    <text x="0" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      실시간 맞춤 견적 시뮬레이터 &amp; 원클릭 리드 접수 파이프라인
    </text>
    <text x="670" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#38bdf8">
      방문 고객이 직접 업무 조건을 조작하며 즉시 예상 견적을 확인하는 고전환 시스템
    </text>
  </g>

  <!-- Left Column: Interactive Quotation Simulator Anatomy (Width: 520) -->
  <g transform="translate(60, 105)" filter="url(#qDropShadow)">
    <rect width="520" height="525" rx="14" fill="url(#qCardGrad)" stroke="#22364c" stroke-width="1.2"/>
    
    <path d="M 0,14 Q 0,0 14,0 L 506,0 Q 520,0 520,14 L 520,44 L 0,44 Z" fill="#172738"/>
    <text x="24" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#ffffff">
      🧮 AI비서 실시간 맞춤 견적 계산기 UI 구조
    </text>
    <rect x="420" y="11" width="84" height="22" rx="11" fill="url(#qOrangeGrad)"/>
    <text x="462" y="25.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">즉시 산출 1초</text>

    <!-- Step 1: Service Selection -->
    <g transform="translate(24, 60)">
      <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#f05a22">
        STEP 1. 업무 카테고리 선택
      </text>
      <g transform="translate(0, 22)">
        <rect width="72" height="32" rx="6" fill="#f05a22"/>
        <text x="36" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="900" fill="#ffffff" text-anchor="middle">PPT제작</text>

        <rect x="78" y="0" width="72" height="32" rx="6" fill="#0e1724" stroke="#25384d" stroke-width="1"/>
        <text x="114" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#94a3b8" text-anchor="middle">계약서</text>

        <rect x="156" y="0" width="72" height="32" rx="6" fill="#0e1724" stroke="#25384d" stroke-width="1"/>
        <text x="192" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#94a3b8" text-anchor="middle">디자인</text>

        <rect x="234" y="0" width="72" height="32" rx="6" fill="#0e1724" stroke="#25384d" stroke-width="1"/>
        <text x="270" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#94a3b8" text-anchor="middle">마케팅</text>

        <rect x="312" y="0" width="80" height="32" rx="6" fill="#132a1e" stroke="#10b981" stroke-width="1"/>
        <text x="352" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#10b981" text-anchor="middle">사이트제작</text>

        <rect x="398" y="0" width="72" height="32" rx="6" fill="#0e1724" stroke="#25384d" stroke-width="1"/>
        <text x="434" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#94a3b8" text-anchor="middle">영상제작</text>
      </g>
    </g>

    <!-- Step 2: Scale & Urgency Slider -->
    <g transform="translate(24, 136)">
      <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#f05a22">
        STEP 2. 분량 및 작업 긴급도 설정
      </text>
      <g transform="translate(0, 24)">
        <rect width="472" height="58" rx="8" fill="#0b141f" stroke="#1d3046" stroke-width="1"/>
        
        <text x="16" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#cbd5e1">작업 분량 (페이지/슬라이드):</text>
        <text x="210" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff">15 ~ 20 페이지 내외</text>

        <!-- Slider Bar Visual -->
        <rect x="16" y="38" width="440" height="6" rx="3" fill="#1a293b"/>
        <rect x="16" y="38" width="260" height="6" rx="3" fill="#f05a22"/>
        <circle cx="276" cy="41" r="8" fill="#ffffff" stroke="#f05a22" stroke-width="3"/>
      </g>
    </g>

    <!-- Step 3: Fast Delivery Toggle -->
    <g transform="translate(24, 238)">
      <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#f05a22">
        STEP 3. 납품 희망 일정 &amp; 패키지 옵션
      </text>
      <g transform="translate(0, 22)">
        <rect width="228" height="52" rx="8" fill="#0f2619" stroke="#10b981" stroke-width="1"/>
        <text x="14" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#ffffff">일반 납품 (3~4일 이내)</text>
        <text x="14" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#a7f3d0">표준 감수 및 검토 2회 포함</text>
        <circle cx="206" cy="26" r="6" fill="#10b981"/>

        <rect x="244" y="0" width="228" height="52" rx="8" fill="#26160c" stroke="#f05a22" stroke-width="1"/>
        <text x="258" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#ffffff">⚡ 24시간 특급 납품</text>
        <text x="258" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#fbcfe8">전담 전문가 우선 배정 처리</text>
        <circle cx="450" cy="26" r="6" fill="#f05a22"/>
      </g>
    </g>

    <!-- Realtime Estimated Output Box -->
    <g transform="translate(24, 334)">
      <rect width="472" height="105" rx="8" fill="#041421" stroke="#38bdf8" stroke-width="1.2"/>
      <g transform="translate(18, 18)">
        <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#38bdf8">
          📊 실시간 견적 산출 결과 (원스톱 패키지)
        </text>

        <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#ffffff">
          AI비서 공식 원페이지 구축 + 실시간 견적기 탑재
        </text>

        <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
          반응형 웹 퍼블리싱 소스 + SSL 보안 호스팅 + 네이버/구글 검색 포털 SEO 등록 포함
        </text>

        <g transform="translate(320, 10)">
          <text x="60" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#94a3b8" text-anchor="middle">예상 작업일</text>
          <text x="60" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="18" font-weight="900" fill="#38bdf8" text-anchor="middle">3일 완제</text>
        </g>
      </g>
    </g>

    <!-- Bottom Action Button -->
    <g transform="translate(24, 455)">
      <rect width="472" height="44" rx="8" fill="url(#qOrangeGrad)"/>
      <text x="236" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="900" fill="#ffffff" text-anchor="middle">
        이 견적으로 1초 상담 신청 및 파일 첨부하기 ↗
      </text>
    </g>
  </g>

  <!-- Right Column: Conversion & Lead Pipeline (Width: 535) -->
  <g transform="translate(605, 105)" filter="url(#qDropShadow)">
    <rect width="535" height="525" rx="14" fill="url(#qCardGrad)" stroke="#22364c" stroke-width="1.2"/>

    <path d="M 0,14 Q 0,0 14,0 L 521,0 Q 535,0 535,14 L 535,44 L 0,44 Z" fill="#172738"/>
    <text x="24" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#ffffff">
      🚀 원페이지 사이트 전환율(CRO) 극대화 설계
    </text>
    <rect x="425" y="11" width="94" height="22" rx="11" fill="#f05a22" fill-opacity="0.2" stroke="#f05a22" stroke-width="0.8"/>
    <text x="472" y="25.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#f05a22" text-anchor="middle">CVR 6.4%</text>

    <!-- Pipeline 1: 4-Step Working Process -->
    <g transform="translate(24, 60)">
      <rect width="487" height="98" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#38bdf8">
        1. 4단계 투명한 업무 대행 프로세스 안내
      </text>
      
      <g transform="translate(18, 36)">
        <rect width="105" height="48" rx="6" fill="#102030"/>
        <text x="52.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">1단계</text>
        <text x="52.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">실시간 의뢰접수</text>

        <rect x="115" y="0" width="115" height="48" rx="6" fill="#102030"/>
        <text x="172.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">2단계</text>
        <text x="172.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#38bdf8" text-anchor="middle">AI 고속 초안작성</text>

        <rect x="240" y="0" width="115" height="48" rx="6" fill="#102030"/>
        <text x="297.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">3단계</text>
        <text x="297.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#f05a22" text-anchor="middle">전문가 1:1 감수</text>

        <rect x="365" y="0" width="105" height="48" rx="6" fill="#042013" stroke="#10b981" stroke-width="0.8"/>
        <text x="417.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#a7f3d0" text-anchor="middle">4단계</text>
        <text x="417.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#10b981" text-anchor="middle">최종 납품</text>
      </g>
    </g>

    <!-- Pipeline 2: Instant Lead Capture Form -->
    <g transform="translate(24, 172)">
      <rect width="487" height="98" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#f05a22">
        2. 원스톱 상담 신청 &amp; 카카오 알림톡 자동 발송
      </text>
      <text x="18" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · 신청 접수 즉시 담당 수석 PM 배정 및 카카오톡 알림 발송 (평균 응답 10분)
      </text>
      <text x="18" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · 대용량 파일 첨부(PPT, 계약서, 레퍼런스 이미지) 지원 &amp; 암호화 저장
      </text>
      <text x="18" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · NDA(비밀유지계약서) 기본 체결로 기업 정보 유출 100% 원천 방지
      </text>
    </g>

    <!-- Pipeline 3: SEO & Global Web Standards -->
    <g transform="translate(24, 284)">
      <rect width="487" height="98" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#fbbf24">
        3. 검색엔진 최적화(SEO) 및 웹 표준 완벽 준수
      </text>
      <g transform="translate(18, 36)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">표준 타이틀 태그:</text>
        <text x="100" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#ffffff">AI비서 - 기업 실전 업무 대행 솔루션</text>

        <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">검색 메타 설명문:</text>
        <text x="100" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#a7f3d0">"AI를 배우지 마세요, 업무를 맡기세요" 사업계획서, 계약서 검토, 디자인 외</text>

        <text x="0" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">SNS 소셜 공유:</text>
        <text x="100" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#38bdf8">OpenGraph &amp; Twitter 카드 규격 100% 매칭</text>
      </g>
    </g>

    <!-- Bottom Results Metric -->
    <g transform="translate(24, 396)">
      <rect width="487" height="110" rx="8" fill="#1b120c" stroke="#f05a22" stroke-width="1.2"/>
      <text x="24" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#f05a22">
        🏆 AI비서 원페이지 구축 후 성과 검증 요약
      </text>

      <g transform="translate(24, 42)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 온라인 견적 문의 전환율: <tspan fill="#f05a22" font-weight="900">6.4% 달성 (업계 평균 1.8% 대비 3.5배)</tspan>
        </text>
        <text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 평균 사이트 체류 시간: <tspan fill="#38bdf8" font-weight="900">3분 42초 (견적 계산기 조작 및 포트폴리오 열람)</tspan>
        </text>
        <text x="0" y="56" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 실시간 운영 공식 도메인: <tspan fill="#10b981" font-weight="900">https://aiassistant.ai.kr/ 정상 배포 완료</tspan>
        </text>
      </g>
    </g>
  </g>
</svg>'''

# 4. Project Deliverable Specification Slide (1200 x 675)
svg_specs = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="asBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a121c"/>
      <stop offset="50%" stop-color="#101d2c"/>
      <stop offset="100%" stop-color="#070d14"/>
    </linearGradient>
    <linearGradient id="asDocGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <linearGradient id="asOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f05a22"/>
      <stop offset="100%" stop-color="#d94814"/>
    </linearGradient>
    <filter id="asDropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#asBgGrad)"/>

  <!-- Document Sheet (980 x 575) -->
  <g transform="translate(110, 50)" filter="url(#asDropShadow)">
    <rect width="980" height="575" rx="12" fill="url(#asDocGrad)" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Document Header -->
    <g transform="translate(48, 38)">
      <rect width="210" height="24" rx="4" fill="url(#asOrangeGrad)"/>
      <text x="105" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="900" fill="#ffffff" text-anchor="middle">
        AI ASSISTANT OFFICIAL REPORT
      </text>

      <text x="0" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="22" font-weight="900" fill="#0f172a" letter-spacing="-0.5">
        원페이지 기업 공식 홈페이지 &amp; 실시간 견적 시스템 구축 납품 명세서
      </text>

      <!-- Client & Project Metadata Box -->
      <g transform="translate(0, 75)">
        <rect width="884" height="64" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
        
        <g transform="translate(20, 16)">
          <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">발주 고객사:</text>
          <text x="75" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#0f172a">AI비서 (AI Assistant Corp)</text>
          
          <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">공식 도메인:</text>
          <text x="75" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#f05a22">https://aiassistant.ai.kr/</text>
        </g>

        <g transform="translate(520, 16)">
          <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">수행 팀:</text>
          <text x="65" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#0f172a">웹 &amp; 플랫폼 솔루션 개발본부</text>

          <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">배포 상태:</text>
          <text x="65" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#10b981">● 실시간 가동 중 (SSL 인증 완료)</text>
        </g>
      </g>
    </g>

    <!-- 4 Deliverable Pillars Table -->
    <g transform="translate(48, 205)">
      <!-- Pillar 1 -->
      <g transform="translate(0, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          1. 원페이지 레이아웃
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 스티키 네비게이션 헤더</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 히어로 비주얼 &amp; 후킹 카피</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 6대 비즈니스 서비스 카드</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 팀 소개 &amp; 고객 검증 후기</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#f05a22">✓ 모바일 100% 반응형</text>
      </g>

      <!-- Pillar 2 -->
      <g transform="translate(226, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          2. 실시간 견적 산출기
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 인터랙티브 옵션 셀렉터</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 분량/긴급도 동적 계산 엔진</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 예상 납품일 실시간 출력</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 원클릭 상담 신청 폼 연계</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#f05a22">✓ CVR 6.4% 달성</text>
      </g>

      <!-- Pillar 3 -->
      <g transform="translate(452, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          3. 포트폴리오 갤러리 모달
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 6개 분야 포트폴리오 뷰어</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 슬라이드 한 장씩 넘겨보기</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 실제 납품 원문 텍스트 열람</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 고해상도 확대 줌 모달</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#f05a22">✓ 6개 영역 완비</text>
      </g>

      <!-- Pillar 4 -->
      <g transform="translate(678, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          4. 인프라 &amp; SEO 최적화
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· aiassistant.ai.kr 도메인 연결</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· SSL Let's Encrypt 256-bit</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· OpenGraph 소셜 공유 카드</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 네이버/구글 검색엔진 등록</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#f05a22">✓ SEO 100점 달성</text>
      </g>
    </g>

    <!-- Bottom KPI & Official Seal Box -->
    <g transform="translate(48, 405)">
      <rect width="884" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      
      <g transform="translate(24, 18)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#0f172a">
          📊 주요 정량 납품 성과 지표
        </text>
        
        <g transform="translate(0, 32)">
          <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 페이지 로딩 속도: <tspan font-weight="900" fill="#10b981">0.8초 (초고속 SPA)</tspan>
          </text>
          <text x="210" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 문의 접수율: <tspan font-weight="900" fill="#f05a22">340% 증가 (견적기 연동)</tspan>
          </text>
          <text x="440" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 이탈률(Bounce Rate): <tspan font-weight="900" fill="#10b981">28% 감소</tspan>
          </text>

          <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 프로젝트 완제: <tspan font-weight="800" fill="#0f172a">기획·퍼블리싱 3일 이내 완료</tspan>
          </text>
          <text x="210" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 보안 환경: <tspan font-weight="800" fill="#0f172a">SSL 암호화 &amp; HTTPS 100% 가동</tspan>
          </text>
        </g>
      </g>

      <!-- Right Official Seal (인증 도장) -->
      <g transform="translate(740, 22)">
        <circle cx="50" cy="38" r="34" fill="#fff7ed" stroke="#f05a22" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="50" cy="38" r="30" fill="none" stroke="#f05a22" stroke-width="1.2"/>
        <text x="50" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#f05a22" text-anchor="middle">검수완료</text>
        <text x="50" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#f05a22" text-anchor="middle">납품승인</text>
        <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="700" fill="#f05a22" text-anchor="middle">AI ASSISTANT</text>
      </g>
    </g>
  </g>
</svg>'''

slides = [
    ('aiassistant_desktop_slide.svg', svg_desktop),
    ('aiassistant_mobile_slide.svg', svg_mobile),
    ('aiassistant_quote_system_slide.svg', svg_quote),
    ('aiassistant_specs_slide.svg', svg_specs)
]

for filename, content in slides:
    filepath = os.path.join('src/assets/images', filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    try:
        ET.parse(filepath)
        print(f"Validated {filename} successfully!")
    except Exception as e:
        print(f"Error in {filename}: {e}")
