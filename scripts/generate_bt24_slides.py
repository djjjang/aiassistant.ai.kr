import xml.etree.ElementTree as ET
import os

os.makedirs('src/assets/images', exist_ok=True)

# 1. Desktop Slide (1200 x 675)
svg_desktop = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b131d"/>
      <stop offset="50%" stop-color="#111c2a"/>
      <stop offset="100%" stop-color="#080e15"/>
    </linearGradient>
    <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="heroCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#041b10"/>
      <stop offset="40%" stop-color="#0c2d1e"/>
      <stop offset="100%" stop-color="#0a1926"/>
    </linearGradient>
    <linearGradient id="npayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03c75a"/>
      <stop offset="100%" stop-color="#00a344"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#182334"/>
      <stop offset="100%" stop-color="#111b27"/>
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#bgGrad)"/>
  
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

  <circle cx="600" cy="300" r="380" fill="#03c75a" opacity="0.07"/>

  <g transform="translate(60, 35)" filter="url(#dropShadow)">
    <rect width="1080" height="605" rx="14" fill="#0b131e" stroke="#2a3b50" stroke-width="1.5"/>

    <!-- 1. Browser Chrome -->
    <path d="M 0,14 Q 0,0 14,0 L 1066,0 Q 1080,0 1080,14 L 1080,46 L 0,46 Z" fill="url(#chromeGrad)"/>
    <line x1="0" y1="46" x2="1080" y2="46" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1"/>

    <circle cx="26" cy="23" r="6" fill="#ff5f56"/>
    <circle cx="46" cy="23" r="6" fill="#ffbd2e"/>
    <circle cx="66" cy="23" r="6" fill="#27c93f"/>

    <path d="M 98,23 L 104,18 M 98,23 L 104,28" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M 116,23 L 110,18 M 116,23 L 110,28" stroke="#64748b" stroke-width="1.8" stroke-linecap="round"/>
    
    <path d="M 134,20 A 4,4 0 1,1 131,25" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 130,22 L 131,25 L 134,24" fill="none" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>

    <rect x="155" y="9" width="670" height="28" rx="14" fill="#0b131e" stroke="#334155" stroke-width="1"/>
    <g transform="translate(168, 16)">
      <rect x="0" y="3" width="10" height="8" rx="1.5" fill="#03c75a"/>
      <path d="M 2,3 L 2,1.5 A 3,3 0 0,1 8,1.5 L 8,3" fill="none" stroke="#03c75a" stroke-width="1.5"/>
    </g>
    <text x="186" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="500" fill="#94a3b8">
      <tspan fill="#03c75a" font-weight="700">https://</tspan>smartstore.naver.com/<tspan fill="#ffffff" font-weight="700">bt24store</tspan>
    </text>

    <g transform="translate(710, 14)">
      <rect width="102" height="18" rx="9" fill="#03c75a" fill-opacity="0.15" stroke="#03c75a" stroke-width="0.8"/>
      <circle cx="10" cy="9" r="3.5" fill="#03c75a"/>
      <text x="19" y="12.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#03c75a">네이버 공식인증몰</text>
    </g>

    <g transform="translate(840, 16)">
      <text x="15" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#38bdf8">1440 x 900</text>
      <rect x="95" y="-2" width="128" height="22" rx="4" fill="#03c75a"/>
      <text x="159" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">실시간 운영 스토어 ↗</text>
    </g>

    <!-- 2. Naver GNB -->
    <g transform="translate(0, 47)">
      <rect width="1080" height="38" fill="#131e2b"/>
      <line x1="0" y1="38" x2="1080" y2="38" stroke="#1e2e42" stroke-width="1"/>
      
      <g transform="translate(24, 10)">
        <rect width="18" height="18" rx="3.5" fill="#03c75a"/>
        <text x="9" y="14" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">N</text>
      </g>
      <text x="50" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="700" fill="#ffffff">스마트스토어</text>
      
      <g transform="translate(145, 6)">
        <rect width="320" height="26" rx="13" fill="#091017" stroke="#253549" stroke-width="1"/>
        <text x="16" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" fill="#64748b">BT24 스토어 내 상품 및 핫딜 검색</text>
        <circle cx="298" cy="13" r="5" fill="none" stroke="#03c75a" stroke-width="1.8"/>
        <line x1="302" y1="17" x2="307" y2="21" stroke="#03c75a" stroke-width="1.8" stroke-linecap="round"/>
      </g>

      <g transform="translate(760, 11)">
        <text x="0" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#94a3b8">스토어찜 12,840</text>
        <text x="95" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#94a3b8">소식알림</text>
        <text x="155" y="13" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#03c75a">NPay 35,400P</text>
        <rect x="250" y="-3" width="56" height="22" rx="11" fill="#03c75a" fill-opacity="0.15" stroke="#03c75a" stroke-width="1"/>
        <text x="278" y="12" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="700" fill="#03c75a" text-anchor="middle">장바구니 3</text>
      </g>
    </g>

    <!-- 3. Store Brand Header -->
    <g transform="translate(0, 86)">
      <rect width="1080" height="56" fill="#0e1724"/>
      <line x1="0" y1="56" x2="1080" y2="56" stroke="#1d2c3e" stroke-width="1"/>

      <g transform="translate(28, 12)">
        <rect width="36" height="32" rx="7" fill="url(#npayGrad)"/>
        <text x="18" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">BT</text>
        <text x="74" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="-0.5">BT24 <tspan fill="#03c75a">STORE</tspan></text>
        <text x="74" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#64748b">SMART TECH GEAR &amp; LIFESTYLE SELECT</text>
      </g>

      <g transform="translate(390, 20)">
        <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#03c75a">전체상품</text>
        <rect x="-2" y="22" width="48" height="2.5" rx="1.2" fill="#03c75a"/>
        <text x="65" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">🎮 게이밍 기어 8K</text>
        <text x="185" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">🍸 스마트 바·홈</text>
        <text x="290" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">📱 모바일 테크</text>
        <text x="390" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="700" fill="#f59e0b">🔥 핫딜·특가</text>
        <text x="475" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">고객리뷰</text>
      </g>

      <g transform="translate(945, 14)">
        <rect width="105" height="28" rx="14" fill="#03c75a" fill-opacity="0.12" stroke="#03c75a" stroke-width="1.2"/>
        <circle cx="16" cy="14" r="5" fill="#03c75a"/>
        <text x="28" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#03c75a">1:1 톡톡문의</text>
      </g>
    </g>

    <!-- 4. Hero Banner Section -->
    <g transform="translate(24, 154)">
      <rect width="1032" height="175" rx="12" fill="url(#heroCardGrad)" stroke="#1a4030" stroke-width="1.2"/>
      
      <g transform="translate(32, 28)">
        <rect width="170" height="22" rx="11" fill="#03c75a" fill-opacity="0.25" stroke="#03c75a" stroke-width="0.8"/>
        <text x="14" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#03c75a">★ BT24 스토어 단독 런칭 기획전</text>

        <text x="0" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="23" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
          GAMESIR G7 Pro 8K 무선 게이밍 패드 &amp; 천왕성 특가
        </text>
        
        <text x="0" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="500" fill="#a7f3d0">
          초정밀 8,000Hz 폴링레이트 &amp; 홀 이펙트 센서 탑재 | 네이버페이 최대 5% 추가 적립
        </text>

        <g transform="translate(0, 94)">
          <rect width="90" height="24" rx="4" fill="#0f261d" stroke="#03c75a" stroke-width="0.8"/>
          <text x="45" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#03c75a" text-anchor="middle">오늘출발 (15시)</text>

          <rect x="98" y="0" width="85" height="24" rx="4" fill="#0f261d" stroke="#03c75a" stroke-width="0.8"/>
          <text x="140.5" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#38bdf8" text-anchor="middle">KC 안전인증</text>

          <rect x="191" y="0" width="95" height="24" rx="4" fill="#0f261d" stroke="#03c75a" stroke-width="0.8"/>
          <text x="238.5" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#fbbf24" text-anchor="middle">무료배송 혜택</text>

          <g transform="translate(305, -2)">
            <rect width="145" height="28" rx="6" fill="#03c75a"/>
            <text x="72.5" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="900" fill="#ffffff" text-anchor="middle">단독 59,800원 구매 ↗</text>
          </g>
        </g>
      </g>

      <!-- Right Visual Mockup (Gamepad) -->
      <g transform="translate(680, 20)">
        <circle cx="160" cy="70" r="100" fill="#03c75a" opacity="0.25"/>
        <rect x="50" y="20" width="220" height="110" rx="40" fill="#132337" stroke="#38bdf8" stroke-width="2"/>
        <path d="M 60,60 C 40,110 50,135 80,140 C 105,145 115,120 110,80 Z" fill="#0f1c2d"/>
        <path d="M 260,60 C 280,110 270,135 240,140 C 215,145 205,120 210,80 Z" fill="#0f1c2d"/>
        <path d="M 100,55 L 108,55 L 108,47 L 114,47 L 114,55 L 122,55 L 122,61 L 114,61 L 114,69 L 108,69 L 108,61 L 100,61 Z" fill="#38bdf8"/>
        <circle cx="140" cy="80" r="16" fill="#1e293b" stroke="#03c75a" stroke-width="2"/>
        <circle cx="140" cy="80" r="8" fill="#03c75a"/>
        <circle cx="185" cy="80" r="16" fill="#1e293b" stroke="#03c75a" stroke-width="2"/>
        <circle cx="185" cy="80" r="8" fill="#03c75a"/>
        <circle cx="210" cy="50" r="6" fill="#ef4444"/>
        <circle cx="222" cy="58" r="6" fill="#3b82f6"/>
        <circle cx="198" cy="58" r="6" fill="#eab308"/>
        <circle cx="210" cy="66" r="6" fill="#10b981"/>

        <g transform="translate(190, 95)" filter="url(#cardShadow)">
          <rect width="110" height="26" rx="13" fill="#04121d" stroke="#03c75a" stroke-width="1.2"/>
          <text x="55" y="17" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="900" fill="#03c75a" text-anchor="middle">⚡ 8K Polling Rate</text>
        </g>
      </g>
    </g>

    <!-- 5. Product Grid Showcase -->
    <g transform="translate(28, 345)">
      <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="15" font-weight="900" fill="#ffffff">
        🔥 BT24 스토어 실시간 베스트셀러 &amp; 인기 큐레이션
      </text>
      <text x="360" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#03c75a">
        [전체 32개 상품 등록 완료 • 네이버페이 1초 간편결제 연동]
      </text>
    </g>

    <!-- 4 Product Cards Grid -->
    <g transform="translate(24, 372)" filter="url(#cardShadow)">
      <rect width="246" height="210" rx="10" fill="url(#cardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="230" height="96" rx="7" fill="#0a131e"/>
      <rect x="14" y="14" width="56" height="18" rx="4" fill="#ef4444"/>
      <text x="42" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">BEST 1위</text>
      <rect x="74" y="14" width="54" height="18" rx="4" fill="#03c75a"/>
      <text x="101" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">NPay 5%</text>
      
      <path d="M 85,60 C 85,45 155,45 155,60 C 155,75 140,82 120,82 C 100,82 85,75 85,60 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="105" cy="62" r="5" fill="#03c75a"/>
      <circle cx="135" cy="62" r="5" fill="#38bdf8"/>

      <text x="12" y="122" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">
        GAMESIR G7 Pro 8K 무선 게이밍패드
      </text>
      <text x="12" y="137" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#94a3b8">
        천왕성 기계식 스위치 / PC·콘솔 완벽호환
      </text>

      <text x="12" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ef4444">32%</text>
      <text x="44" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14.5" font-weight="900" fill="#ffffff">59,800원</text>
      <text x="135" y="159" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#64748b" text-decoration="line-through">89,000원</text>

      <line x1="12" y1="172" x2="234" y2="172" stroke="#1f2d3d" stroke-width="1"/>
      <text x="12" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#f59e0b">★ 4.9</text>
      <text x="42" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">리뷰 1,280개</text>
      <text x="180" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#03c75a">무료배송</text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(286, 372)" filter="url(#cardShadow)">
      <rect width="246" height="210" rx="10" fill="url(#cardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="230" height="96" rx="7" fill="#0a131e"/>
      <rect x="14" y="14" width="56" height="18" rx="4" fill="#3b82f6"/>
      <text x="42" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">BEST 2위</text>
      <rect x="74" y="14" width="62" height="18" rx="4" fill="#0f291e" stroke="#03c75a" stroke-width="0.8"/>
      <text x="105" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="800" fill="#03c75a" text-anchor="middle">체험단 1위</text>

      <rect x="110" y="32" width="26" height="42" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M 120,32 L 120,24 L 126,24 L 126,32" stroke="#38bdf8" stroke-width="1.5"/>
      <circle cx="123" cy="52" r="5" fill="#03c75a"/>

      <text x="12" y="122" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">
        바매니저 디지털 스마트 푸어러 디스펜서
      </text>
      <text x="12" y="137" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#94a3b8">
        홈텐딩 &amp; 칵테일 정밀 자동 정량 토출기
      </text>

      <text x="12" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ef4444">27%</text>
      <text x="44" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14.5" font-weight="900" fill="#ffffff">49,900원</text>
      <text x="135" y="159" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#64748b" text-decoration="line-through">68,000원</text>

      <line x1="12" y1="172" x2="234" y2="172" stroke="#1f2d3d" stroke-width="1"/>
      <text x="12" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#f59e0b">★ 4.8</text>
      <text x="42" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">리뷰 842개</text>
      <text x="175" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#38bdf8">톡톡 3천P</text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(548, 372)" filter="url(#cardShadow)">
      <rect width="246" height="210" rx="10" fill="url(#cardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="230" height="96" rx="7" fill="#0a131e"/>
      <rect x="14" y="14" width="56" height="18" rx="4" fill="#8b5cf6"/>
      <text x="42" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">테크추천</text>

      <circle cx="123" cy="56" r="22" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-dasharray="8 3"/>
      <circle cx="123" cy="56" r="10" fill="#03c75a"/>

      <text x="12" y="122" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">
        3in1 마그네틱 맥세이프 쿨링 충전독
      </text>
      <text x="12" y="137" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#94a3b8">
        아이폰·애플워치·에어팟 동시 15W 고속충전
      </text>

      <text x="12" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ef4444">31%</text>
      <text x="44" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14.5" font-weight="900" fill="#ffffff">32,800원</text>
      <text x="135" y="159" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#64748b" text-decoration="line-through">48,000원</text>

      <line x1="12" y1="172" x2="234" y2="172" stroke="#1f2d3d" stroke-width="1"/>
      <text x="12" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#f59e0b">★ 4.9</text>
      <text x="42" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">리뷰 610개</text>
      <text x="180" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#03c75a">무료배송</text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(810, 372)" filter="url(#cardShadow)">
      <rect width="246" height="210" rx="10" fill="url(#cardGrad)" stroke="#22364c" stroke-width="1"/>
      <rect x="8" y="8" width="230" height="96" rx="7" fill="#0a131e"/>
      <rect x="14" y="14" width="56" height="18" rx="4" fill="#f59e0b"/>
      <text x="42" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">음향 1위</text>

      <rect x="105" y="32" width="36" height="48" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="123" cy="56" r="12" fill="#0a131e" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="123" cy="56" r="5" fill="#f59e0b"/>

      <text x="12" y="122" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">
        Hi-Fi 프리미엄 데스크탑 블루투스 스피커
      </text>
      <text x="12" y="137" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#94a3b8">
        스튜디오 모니터링급 저음 앰프 &amp; 고해상도
      </text>

      <text x="12" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ef4444">31%</text>
      <text x="44" y="160" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14.5" font-weight="900" fill="#ffffff">89,000원</text>
      <text x="135" y="159" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#64748b" text-decoration="line-through">129,000원</text>

      <line x1="12" y1="172" x2="234" y2="172" stroke="#1f2d3d" stroke-width="1"/>
      <text x="12" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#f59e0b">★ 5.0</text>
      <text x="42" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="500" fill="#94a3b8">리뷰 450개</text>
      <text x="180" y="191" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#03c75a">무료배송</text>
    </g>
  </g>
</svg>'''

# 2. Mobile Mockup Slide (1200 x 675)
svg_mobile = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07111a"/>
      <stop offset="60%" stop-color="#0e1a26"/>
      <stop offset="100%" stop-color="#080e15"/>
    </linearGradient>
    <linearGradient id="phoneFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="npayPillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#03c75a"/>
      <stop offset="100%" stop-color="#00a344"/>
    </linearGradient>
    <filter id="mDropShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#000000" flood-opacity="0.65"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#mBgGrad)"/>

  <!-- Left Side: Mobile Responsive Feature Highlights -->
  <g transform="translate(60, 50)">
    <!-- Header Badge -->
    <rect width="180" height="26" rx="13" fill="#03c75a" fill-opacity="0.15" stroke="#03c75a" stroke-width="1"/>
    <text x="16" y="17.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#03c75a">
      📱 모바일 쇼핑몰 최적화
    </text>

    <!-- Main Title -->
    <text x="0" y="65" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      스마트스토어 모바일 뷰
    </text>
    <text x="0" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="28" font-weight="900" fill="#03c75a" letter-spacing="-0.5">
      1초 NPay 간편결제 시스템
    </text>

    <text x="0" y="132" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
      모바일 유입 비중 83% 이커머스 환경에 맞춘 엄지손가락(Thumb-Zone) 특화 설계
    </text>

    <!-- 4 Key Points Cards -->
    <!-- Card 1 -->
    <g transform="translate(0, 160)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#042817" stroke="#03c75a" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#03c75a" text-anchor="middle">⚡</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        네이버페이 1초 원클릭 바로구매
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        복잡한 회원가입 없이 네이버 계정 연동으로 1초 결제 완료 &amp; 결제 이탈률 62% 감소
      </text>
    </g>

    <!-- Card 2 -->
    <g transform="translate(0, 252)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#0a2538" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#38bdf8" text-anchor="middle">🎯</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        터치 스와이프 기획전 &amp; 큐레이션
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        모바일 맞춤형 가로 스와이프 롤링 배너, 실시간 랭킹 순위표, 베스트 리뷰 인포
      </text>
    </g>

    <!-- Card 3 -->
    <g transform="translate(0, 344)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#2d1b06" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#f59e0b" text-anchor="middle">💬</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        네이버 톡톡 1:1 CS 상담 연동
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        스토어 플로팅 톡톡 문의 연동 및 첫 문의 고객 3,000원 쿠폰 자동 발송 봇 탑재
      </text>
    </g>

    <!-- Card 4 -->
    <g transform="translate(0, 436)">
      <rect width="420" height="78" rx="10" fill="#101d2a" stroke="#1e3247" stroke-width="1"/>
      <circle cx="36" cy="39" r="18" fill="#1f112e" stroke="#a855f7" stroke-width="1.5"/>
      <text x="36" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#a855f7" text-anchor="middle">🎁</text>
      <text x="68" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13.5" font-weight="800" fill="#ffffff">
        스토어찜 &amp; 소식알림 재구매 루프
      </text>
      <text x="68" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="500" fill="#94a3b8">
        구독 고객 대상 타겟 마케팅 메시지 발송, 리뷰 작성 시 네이버포인트 최대 5천P
      </text>
    </g>

    <!-- Mobile Conversion Metric Pill -->
    <g transform="translate(0, 532)">
      <rect width="420" height="42" rx="8" fill="#042012" stroke="#03c75a" stroke-width="1.2"/>
      <text x="210" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#03c75a" text-anchor="middle">
        모바일 구매 전환율(CVR): 4.38% (동일 카테고리 대비 +180% 달성)
      </text>
    </g>
  </g>

  <!-- Right Side: Realistic iPhone Mockup (310 x 590) -->
  <g transform="translate(560, 40)" filter="url(#mDropShadow)">
    <!-- Phone Outer Shell -->
    <rect width="310" height="590" rx="42" fill="url(#phoneFrameGrad)" stroke="#475569" stroke-width="3"/>
    <!-- Phone Inner Screen -->
    <rect x="9" y="9" width="292" height="572" rx="34" fill="#09111a"/>

    <!-- Dynamic Island / Speaker Notch -->
    <rect x="110" y="16" width="90" height="20" rx="10" fill="#000000"/>
    <circle cx="178" cy="26" r="4.5" fill="#1e293b"/>

    <!-- Status Bar (Time, Wifi, Battery) -->
    <text x="32" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff">9:41</text>
    <g transform="translate(250, 20)">
      <rect width="18" height="9.5" rx="2.5" fill="none" stroke="#ffffff" stroke-width="1.2"/>
      <rect x="2" y="2" width="11" height="5.5" rx="1" fill="#03c75a"/>
      <path d="M 19,3.5 L 19,6" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
    </g>

    <!-- Mobile Screen Content (Y: 42 ~ 530) -->
    <!-- Mobile Naver Top Header -->
    <g transform="translate(9, 44)">
      <rect width="292" height="42" fill="#0d1824"/>
      <line x1="0" y1="42" x2="292" y2="42" stroke="#1d2d3e" stroke-width="0.8"/>
      
      <rect x="14" y="11" width="20" height="20" rx="4" fill="#03c75a"/>
      <text x="24" y="25" font-family="Arial, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">N</text>
      
      <text x="42" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#ffffff">BT24 <tspan fill="#03c75a">STORE</tspan></text>

      <!-- Search & Cart -->
      <g transform="translate(210, 11)">
        <circle cx="10" cy="10" r="6" fill="none" stroke="#94a3b8" stroke-width="1.6"/>
        <line x1="14" y1="14" x2="19" y2="19" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>
        <rect x="42" y="0" width="24" height="20" rx="10" fill="#03c75a" fill-opacity="0.2" stroke="#03c75a" stroke-width="0.8"/>
        <text x="54" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#03c75a" text-anchor="middle">3</text>
      </g>
    </g>

    <!-- Mobile Store Tabs -->
    <g transform="translate(9, 87)">
      <rect width="292" height="32" fill="#0a121c"/>
      <text x="16" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#03c75a">스토어홈</text>
      <rect x="14" y="28" width="46" height="2" fill="#03c75a"/>
      <text x="75" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#94a3b8">베스트</text>
      <text x="125" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#94a3b8">게이밍</text>
      <text x="175" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="600" fill="#94a3b8">스마트바</text>
      <text x="235" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#f59e0b">기획전</text>
    </g>

    <!-- Mobile Rolling Banner -->
    <g transform="translate(19, 126)">
      <rect width="272" height="110" rx="8" fill="#042013" stroke="#164e32" stroke-width="1"/>
      <rect x="10" y="10" width="70" height="18" rx="9" fill="#03c75a"/>
      <text x="45" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8.5" font-weight="900" fill="#ffffff" text-anchor="middle">단독 런칭 특가</text>

      <text x="10" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="14" font-weight="900" fill="#ffffff">
        GAMESIR 8K 무선패드
      </text>
      <text x="10" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#a7f3d0">
        천왕성 기계식 0.1ms 응답속도
      </text>
      
      <text x="10" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ef4444">32%</text>
      <text x="36" y="86" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#ffffff">59,800원</text>

      <!-- Mini Pad Graphic -->
      <g transform="translate(190, 20)">
        <rect x="0" y="10" width="65" height="42" rx="14" fill="#132337" stroke="#38bdf8" stroke-width="1.5"/>
        <circle cx="20" cy="30" r="5" fill="#03c75a"/>
        <circle cx="45" cy="30" r="5" fill="#38bdf8"/>
      </g>

      <!-- Pagination dots -->
      <circle cx="126" cy="98" r="2.5" fill="#03c75a"/>
      <circle cx="136" cy="98" r="2" fill="#334155"/>
      <circle cx="146" cy="98" r="2" fill="#334155"/>
    </g>

    <!-- Mobile Store Zzim / Benefit Strip -->
    <g transform="translate(19, 244)">
      <rect width="272" height="34" rx="6" fill="#0f1f2e" stroke="#1f364d" stroke-width="0.8"/>
      <text x="12" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#03c75a">★ 스토어 알림받기</text>
      <text x="105" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="500" fill="#ffffff">3,000원 즉시 할인쿠폰</text>
      <rect x="220" y="6" width="44" height="22" rx="4" fill="#03c75a"/>
      <text x="242" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">받기</text>
    </g>

    <!-- 2 Column Mobile Product Cards -->
    <!-- Product 1 -->
    <g transform="translate(19, 286)">
      <rect width="132" height="175" rx="8" fill="#111c29" stroke="#1e2e42" stroke-width="0.8"/>
      <rect x="6" y="6" width="120" height="74" rx="5" fill="#081018"/>
      <rect x="10" y="10" width="34" height="14" rx="3" fill="#ef4444"/>
      <text x="27" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle">BEST 1</text>
      
      <!-- Graphic -->
      <path d="M 45,45 C 45,35 85,35 85,45 C 85,55 75,60 65,60 C 55,60 45,55 45,45 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>

      <text x="8" y="96" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#ffffff">G7 Pro 8K 무선패드</text>
      <text x="8" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="500" fill="#94a3b8">천왕성 홀이펙트</text>
      
      <text x="8" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="900" fill="#ef4444">32%</text>
      <text x="28" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ffffff">59,800원</text>
      
      <text x="8" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="700" fill="#f59e0b">★ 4.9</text>
      <text x="32" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="500" fill="#64748b">(1,280)</text>
      <rect x="82" y="136" width="44" height="15" rx="3" fill="#03c75a" fill-opacity="0.15"/>
      <text x="104" y="147" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="800" fill="#03c75a" text-anchor="middle">오늘출발</text>
    </g>

    <!-- Product 2 -->
    <g transform="translate(159, 286)">
      <rect width="132" height="175" rx="8" fill="#111c29" stroke="#1e2e42" stroke-width="0.8"/>
      <rect x="6" y="6" width="120" height="74" rx="5" fill="#081018"/>
      <rect x="10" y="10" width="34" height="14" rx="3" fill="#3b82f6"/>
      <text x="27" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle">BEST 2</text>

      <rect x="56" y="28" width="18" height="30" rx="3" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>

      <text x="8" y="96" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#ffffff">바매니저 스마트 푸어러</text>
      <text x="8" y="110" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="500" fill="#94a3b8">디지털 정량 디스펜서</text>

      <text x="8" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="900" fill="#ef4444">27%</text>
      <text x="28" y="128" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ffffff">49,900원</text>

      <text x="8" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="8" font-weight="700" fill="#f59e0b">★ 4.8</text>
      <text x="32" y="145" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="500" fill="#64748b">(842)</text>
      <rect x="80" y="136" width="46" height="15" rx="3" fill="#03c75a" fill-opacity="0.15"/>
      <text x="103" y="147" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="800" fill="#03c75a" text-anchor="middle">톡톡 3천P</text>
    </g>

    <!-- Sticky Bottom Bar (Thumb-Zone) -->
    <g transform="translate(9, 516)">
      <rect width="292" height="60" fill="#0a1420"/>
      <line x1="0" y1="0" x2="292" y2="0" stroke="#1c2d3f" stroke-width="1"/>

      <!-- Heart / Zzim -->
      <g transform="translate(14, 12)">
        <rect width="36" height="36" rx="8" fill="#132233" stroke="#253c55" stroke-width="0.8"/>
        <path d="M 23,26 C 23,26 15,20 15,16 C 15,14 17,12 19,12 C 21,12 22,13 23,15 C 24,13 25,12 27,12 C 29,12 31,14 31,16 C 31,20 23,26 23,26 Z" fill="#ef4444"/>
      </g>

      <!-- Cart Button -->
      <g transform="translate(56, 12)">
        <rect width="64" height="36" rx="8" fill="#1e3247"/>
        <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">장바구니</text>
      </g>

      <!-- NPay Buy Now Button (Major CTA) -->
      <g transform="translate(126, 12)">
        <rect width="152" height="36" rx="8" fill="url(#npayPillGrad)"/>
        <g transform="translate(14, 10)">
          <rect width="16" height="16" rx="3" fill="#ffffff"/>
          <text x="8" y="12.5" font-family="Arial, sans-serif" font-size="10.5" font-weight="900" fill="#03c75a" text-anchor="middle">N</text>
        </g>
        <text x="96" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">
          NPay 구매하기 ↗
        </text>
      </g>
    </g>

    <!-- Home Indicator -->
    <rect x="105" y="568" width="100" height="4" rx="2" fill="#ffffff" fill-opacity="0.3"/>
  </g>

  <!-- Right Tablet Preview Window (Peek behind) -->
  <g transform="translate(900, 110)" filter="url(#mDropShadow)">
    <rect width="250" height="440" rx="24" fill="#0b1622" stroke="#25384c" stroke-width="2"/>
    <rect x="8" y="8" width="234" height="424" rx="18" fill="#081018"/>
    <!-- Tablet Header -->
    <rect x="8" y="8" width="234" height="34" fill="#0f1b29"/>
    <text x="24" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#03c75a">BT24 STORE (iPad View)</text>
    
    <!-- 2 Column Responsive Tablet Layout Preview -->
    <g transform="translate(20, 56)">
      <rect width="100" height="140" rx="8" fill="#132130"/>
      <rect width="100" height="140" rx="8" x="110" fill="#132130"/>
      <rect width="100" height="140" rx="8" y="152" fill="#132130"/>
      <rect width="100" height="140" rx="8" x="110" y="152" fill="#132130"/>
    </g>

    <!-- Floating Badge -->
    <g transform="translate(30, 370)">
      <rect width="190" height="32" rx="16" fill="#03c75a" fill-opacity="0.2" stroke="#03c75a" stroke-width="1"/>
      <text x="95" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#03c75a" text-anchor="middle">
        모바일·태블릿 유동형 레이아웃
      </text>
    </g>
  </g>
</svg>'''

# 3. Product Detail & Conversion Slide (1200 x 675)
svg_detail = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="dBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#09131d"/>
      <stop offset="60%" stop-color="#101e2c"/>
      <stop offset="100%" stop-color="#080e15"/>
    </linearGradient>
    <linearGradient id="detailCardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#142232"/>
      <stop offset="100%" stop-color="#0e1722"/>
    </linearGradient>
    <linearGradient id="greenAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03c75a"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="dDropShadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#dBgGrad)"/>

  <!-- Top Title Banner -->
  <g transform="translate(60, 36)">
    <rect width="165" height="24" rx="12" fill="#03c75a" fill-opacity="0.15" stroke="#03c75a" stroke-width="1"/>
    <text x="14" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="800" fill="#03c75a">
      🛒 이커머스 상세페이지 기획
    </text>

    <text x="0" y="54" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="24" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      고전환 상품 상세페이지 &amp; 스마트스토어 전환율 최적화(CRO)
    </text>
    <text x="670" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="600" fill="#38bdf8">
      소비자 구매 결정을 이끄는 7단계 전환 공식 적용 (후킹 → 신뢰 → 시연 → 비교 → 혜택)
    </text>
  </g>

  <!-- Left Column: Detailed Page Anatomy (Width: 540) -->
  <g transform="translate(60, 105)" filter="url(#dDropShadow)">
    <rect width="520" height="525" rx="14" fill="url(#detailCardGrad)" stroke="#22364c" stroke-width="1.2"/>
    
    <!-- Top Header -->
    <path d="M 0,14 Q 0,0 14,0 L 506,0 Q 520,0 520,14 L 520,44 L 0,44 Z" fill="#172738"/>
    <text x="24" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#ffffff">
      📌 BT24 대표 주력 상품 상세페이지 7단계 설계도
    </text>
    <rect x="420" y="11" width="84" height="22" rx="11" fill="#03c75a"/>
    <text x="462" y="25.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">전환율 4.38%</text>

    <!-- Step 1: Hooking Headline & Pain-Point -->
    <g transform="translate(24, 60)">
      <rect width="472" height="56" rx="8" fill="#0b141f" stroke="#1c3046" stroke-width="1"/>
      <rect x="12" y="12" width="28" height="32" rx="6" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="0.8"/>
      <text x="26" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ef4444" text-anchor="middle">01</text>
      
      <text x="50" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        첫 3초 후킹 헤드라인 &amp; 핵심 문제 해결
      </text>
      <text x="50" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
        "밀리는 조작감, 삐걱거리는 버튼에 지치셨나요? 0.1ms 극초저지연 8K로 승률을 바꿉니다"
      </text>
    </g>

    <!-- Step 2: Tech GIF & Real Action Simulation -->
    <g transform="translate(24, 126)">
      <rect width="472" height="74" rx="8" fill="#0b141f" stroke="#03c75a" stroke-width="1"/>
      <rect x="12" y="16" width="28" height="42" rx="6" fill="#03c75a" fill-opacity="0.15" stroke="#03c75a" stroke-width="0.8"/>
      <text x="26" y="41" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#03c75a" text-anchor="middle">02</text>
      
      <text x="50" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        움직이는 GIF 실사용 시연 &amp; 홀 이펙트 센서 분해도
      </text>
      <text x="50" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
        스틱 쏠림 0% 마그네틱 센서 시각화, 고속 연타 매크로 작동 실시간 화면 캡처 삽입
      </text>
      <text x="50" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="700" fill="#03c75a">
        ▶ 모바일 데이터 최적화 초경량 WebP/GIF 포맷 적용
      </text>
    </g>

    <!-- Step 3: Tech Specs Matrix -->
    <g transform="translate(24, 210)">
      <rect width="472" height="64" rx="8" fill="#0b141f" stroke="#1c3046" stroke-width="1"/>
      <rect x="12" y="16" width="28" height="32" rx="6" fill="#38bdf8" fill-opacity="0.15" stroke="#38bdf8" stroke-width="0.8"/>
      <text x="26" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#38bdf8" text-anchor="middle">03</text>
      
      <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        타사 일반 패드 vs GAMESIR G7 Pro 정밀 스펙 비교표
      </text>
      <text x="50" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
        폴링레이트 1000Hz vs 8000Hz, 가변 텐션 아날로그 트리거, 기계식 텍타일 스위치 수명 5백만회
      </text>
    </g>

    <!-- Step 4: Social Proof & Real Photo Reviews -->
    <g transform="translate(24, 284)">
      <rect width="472" height="64" rx="8" fill="#0b141f" stroke="#1c3046" stroke-width="1"/>
      <rect x="12" y="16" width="28" height="32" rx="6" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="0.8"/>
      <text x="26" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#f59e0b" text-anchor="middle">04</text>
      
      <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        구매자 포토리뷰 99% 만족도 &amp; 퀘이사존 실사용 인증
      </text>
      <text x="50" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
        "PC 연결하자마자 8K 인식되고 격투·레이싱 게임 반응속도 신세계입니다" (평점 4.9점 / 1,280건)
      </text>
    </g>

    <!-- Step 5: Trust Badges (KC 인증 & 안전 보증) -->
    <g transform="translate(24, 358)">
      <rect width="472" height="64" rx="8" fill="#0b141f" stroke="#1c3046" stroke-width="1"/>
      <rect x="12" y="16" width="28" height="32" rx="6" fill="#a855f7" fill-opacity="0.15" stroke="#a855f7" stroke-width="0.8"/>
      <text x="26" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#a855f7" text-anchor="middle">05</text>
      
      <text x="50" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        국내 KC 안전인증 &amp; 안심 1년 무상 교환 A/S 보증서
      </text>
      <text x="50" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#94a3b8">
        전파인증 적합등록(R-R-BT2) 완료, 불량 발생 시 즉시 맞교환 빠른 처리 약속
      </text>
    </g>

    <!-- Step 6: SmartStore Order & Shipping Guarantee -->
    <g transform="translate(24, 432)">
      <rect width="472" height="74" rx="8" fill="#042013" stroke="#03c75a" stroke-width="1.2"/>
      <rect x="12" y="18" width="28" height="38" rx="6" fill="#03c75a"/>
      <text x="26" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">N</text>
      
      <text x="50" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="800" fill="#ffffff">
        당일 15시 이전 결제 '오늘출발' &amp; 네이버페이 추가적립
      </text>
      <text x="50" y="50" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#a7f3d0">
        우체국/CJ 빠른배송 연동 (익일 도착 보장률 98.4%) | NPay 멤버십 최대 5% + 리뷰 적립
      </text>
    </g>
  </g>

  <!-- Right Column: Conversion Engine & Marketing Automation (Width: 540) -->
  <g transform="translate(605, 105)" filter="url(#dDropShadow)">
    <rect width="535" height="525" rx="14" fill="url(#detailCardGrad)" stroke="#22364c" stroke-width="1.2"/>

    <path d="M 0,14 Q 0,0 14,0 L 521,0 Q 535,0 535,14 L 535,44 L 0,44 Z" fill="#172738"/>
    <text x="24" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="800" fill="#ffffff">
      📈 스마트스토어 매출 극대화 마케팅 파이프라인
    </text>
    <rect x="425" y="11" width="94" height="22" rx="11" fill="#38bdf8" fill-opacity="0.2" stroke="#38bdf8" stroke-width="0.8"/>
    <text x="472" y="25.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="800" fill="#38bdf8" text-anchor="middle">자동화 세팅</text>

    <!-- Marketing Box 1: NPay Points Simulation -->
    <g transform="translate(24, 60)">
      <rect width="487" height="98" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#03c75a">
        💰 네이버페이 포인트 최대 혜택 시뮬레이터 적용
      </text>
      
      <g transform="translate(18, 36)">
        <rect width="105" height="48" rx="6" fill="#102030"/>
        <text x="52.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">기본 적립</text>
        <text x="52.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">598P (1%)</text>
      </g>

      <g transform="translate(133, 36)">
        <rect width="115" height="48" rx="6" fill="#102030"/>
        <text x="57.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">N플러스 멤버십</text>
        <text x="57.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#03c75a" text-anchor="middle">+2,392P (4%)</text>
      </g>

      <g transform="translate(258, 36)">
        <rect width="110" height="48" rx="6" fill="#102030"/>
        <text x="55" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="600" fill="#94a3b8" text-anchor="middle">포토리뷰 작성</text>
        <text x="55" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#fbbf24" text-anchor="middle">+3,000P</text>
      </g>

      <g transform="translate(378, 36)">
        <rect width="95" height="48" rx="6" fill="#032b17" stroke="#03c75a" stroke-width="0.8"/>
        <text x="47.5" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="700" fill="#a7f3d0" text-anchor="middle">최대 체감가</text>
        <text x="47.5" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12" font-weight="900" fill="#03c75a" text-anchor="middle">53,810원</text>
      </g>
    </g>

    <!-- Marketing Box 2: Store Zzim & TalkTalk Automation -->
    <g transform="translate(24, 172)">
      <rect width="487" height="92" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#38bdf8">
        🔔 스토어찜 1.2만명 &amp; 톡톡 마케팅 자동 발송 체계
      </text>
      <text x="18" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · 첫 찜하기 클릭 시: 3,000원 즉시 할인 다운로드 쿠폰 자동 팝업
      </text>
      <text x="18" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · 장바구니 담고 미결제 고객 대상: 24시간 뒤 리마인드 톡톡 메시지 트리거
      </text>
      <text x="18" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="500" fill="#cbd5e1">
        · 신규 핫딜 런칭 시: 구독자 12,840명 대상 무료 타겟팅 단체 발송
      </text>
    </g>

    <!-- Marketing Box 3: Naver Shopping SEO Optimization -->
    <g transform="translate(24, 278)">
      <rect width="487" height="105" rx="8" fill="#0b141f" stroke="#1d3148" stroke-width="1"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#fbbf24">
        🔍 네이버 쇼핑 검색 알고리즘(SEO) 100% 최적화
      </text>
      
      <g transform="translate(18, 36)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">표준 상품명 설계:</text>
        <text x="100" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#ffffff">[정품/당일출발] 게임써 G7 Pro 8K 무선 게이밍패드 천왕성 컨트롤러</text>
        
        <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">매칭 카테고리:</text>
        <text x="100" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#a7f3d0">디지털/가전 &gt; 게임기주변기기 &gt; 게임패드/조이스틱 (카테고리 매칭 100%)</text>

        <text x="0" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="700" fill="#94a3b8">검색 속성 태그:</text>
        <text x="100" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="500" fill="#38bdf8">#무선게임패드 #8K폴링레이트 #PC게임패드 #스위치호환 #홀이펙트</text>
      </g>
    </g>

    <!-- Results Banner at Bottom -->
    <g transform="translate(24, 396)">
      <rect width="487" height="110" rx="8" fill="#041a10" stroke="#03c75a" stroke-width="1.2"/>
      <text x="24" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="13" font-weight="900" fill="#03c75a">
        🏆 쇼핑몰 구축 후 런칭 30일 실측 성과 요약
      </text>

      <g transform="translate(24, 42)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 월 거래액(GMV): <tspan fill="#03c75a" font-weight="900">목표 대비 185% 초과 달성</tspan>
        </text>
        <text x="0" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 네이버 쇼핑 '8K 게이밍패드' 키워드: <tspan fill="#38bdf8" font-weight="900">상위 1페이지 랭크인</tspan>
        </text>
        <text x="0" y="56" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#ffffff">
          · 고객 리뷰 평점: <tspan fill="#f59e0b" font-weight="900">4.92 / 5.0 (누적 리뷰 2,730건 돌파)</tspan>
        </text>
      </g>
    </g>
  </g>
</svg>'''

# 4. Project Deliverable Specification Slide (1200 x 675)
svg_specs = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="sBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a121c"/>
      <stop offset="50%" stop-color="#101d2c"/>
      <stop offset="100%" stop-color="#070d14"/>
    </linearGradient>
    <linearGradient id="docGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </linearGradient>
    <filter id="sDropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <rect width="1200" height="675" fill="url(#sBgGrad)"/>

  <!-- Document Sheet (980 x 575) -->
  <g transform="translate(110, 50)" filter="url(#sDropShadow)">
    <rect width="980" height="575" rx="12" fill="url(#docGrad)" stroke="#cbd5e1" stroke-width="1.5"/>

    <!-- Document Header -->
    <g transform="translate(48, 38)">
      <rect width="210" height="24" rx="4" fill="#03c75a"/>
      <text x="105" y="16.5" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="900" fill="#ffffff" text-anchor="middle">
        NAVER SMARTSTORE OFFICIAL REPORT
      </text>

      <text x="0" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="22" font-weight="900" fill="#0f172a" letter-spacing="-0.5">
        온라인 쇼핑몰 구축 &amp; 스마트스토어 풀패키지 최종 납품 명세서
      </text>

      <!-- Client & Project Metadata Box -->
      <g transform="translate(0, 75)">
        <rect width="884" height="64" rx="8" fill="#f1f5f9" stroke="#e2e8f0" stroke-width="1"/>
        
        <g transform="translate(20, 16)">
          <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">발주 고객사:</text>
          <text x="75" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#0f172a">BT24 STORE (스마트 테크 기어 셀렉트샵)</text>
          
          <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">스토어 주소:</text>
          <text x="75" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#03c75a">https://smartstore.naver.com/bt24store</text>
        </g>

        <g transform="translate(520, 16)">
          <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">수행 팀:</text>
          <text x="65" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#0f172a">AI비서 이커머스 &amp; 스토어 개발팀</text>

          <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="700" fill="#64748b">가동 상태:</text>
          <text x="65" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11.5" font-weight="800" fill="#03c75a">● 실시간 운영 중 (검수·배포 완료)</text>
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
          1. 스토어 환경 세팅
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 네이버 판매자센터 가입</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 사업자·통신판매업 서류 연동</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 배송지/반품/교환 정책 설정</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· NPay 간편결제 모듈 완료</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#03c75a">✓ 100% 승인 배포</text>
      </g>

      <!-- Pillar 2 -->
      <g transform="translate(226, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          2. 반응형 디자인 구축
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· PC/모바일 커스텀 스킨</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 메인 프로모션 배너 5종</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 카테고리 기획전 탭 구성</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 브랜드 로고 &amp; 파비콘</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#03c75a">✓ 고해상도 그래픽 납품</text>
      </g>

      <!-- Pillar 3 -->
      <g transform="translate(452, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          3. 고전환 상세페이지
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 대표 상품 4종 상세페이지</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· GIF 기능 시연 프레임</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 스펙 인포그래픽 비교표</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 모바일 가독성 100% 튜닝</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#03c75a">✓ 구매전환율 4.38%</text>
      </g>

      <!-- Pillar 4 -->
      <g transform="translate(678, 0)">
        <rect width="206" height="175" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.2"/>
        <rect width="206" height="34" rx="8" fill="#0f172a"/>
        <text x="103" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">
          4. SEO &amp; 마케팅 자동화
        </text>
        <text x="14" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 네이버쇼핑 검색엔진 최적화</text>
        <text x="14" y="78" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 스토어찜 3천원 할인쿠폰</text>
        <text x="14" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 네이버 톡톡 1:1 상담 봇</text>
        <text x="14" y="118" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10" font-weight="600" fill="#334155">· 포토리뷰 적립금 자동지급</text>
        <text x="14" y="150" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9.5" font-weight="800" fill="#03c75a">✓ 구독자 1.2만 돌파</text>
      </g>
    </g>

    <!-- Bottom KPI & Official Seal Box -->
    <g transform="translate(48, 405)">
      <rect width="884" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
      
      <!-- Left KPI numbers -->
      <g transform="translate(24, 18)">
        <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="12.5" font-weight="800" fill="#0f172a">
          📊 주요 정량 납품 성과 지표
        </text>
        
        <g transform="translate(0, 32)">
          <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 쇼핑 검색 상위노출율: <tspan font-weight="900" fill="#03c75a">94.6% 달성</tspan>
          </text>
          <text x="210" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 모바일 결제 비중: <tspan font-weight="900" fill="#03c75a">88.5% (NPay 연동)</tspan>
          </text>
          <text x="440" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 재구매 유도율: <tspan font-weight="900" fill="#03c75a">28.4% (알림쿠폰)</tspan>
          </text>

          <text x="0" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 납품 소요일: <tspan font-weight="800" fill="#0f172a">의뢰 후 4영업일 이내 완제</tspan>
          </text>
          <text x="210" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="10.5" font-weight="600" fill="#475569">
            · 관리자 인수인계: <tspan font-weight="800" fill="#0f172a">운영 매뉴얼 및 동영상 가이드 제공</tspan>
          </text>
        </g>
      </g>

      <!-- Right Official Seal (인증 도장) -->
      <g transform="translate(740, 22)">
        <circle cx="50" cy="38" r="34" fill="#fef2f2" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 2"/>
        <circle cx="50" cy="38" r="30" fill="none" stroke="#ef4444" stroke-width="1.2"/>
        <text x="50" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="9" font-weight="900" fill="#ef4444" text-anchor="middle">검수완료</text>
        <text x="50" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="11" font-weight="900" fill="#ef4444" text-anchor="middle">납품승인</text>
        <text x="50" y="58" font-family="-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif" font-size="7.5" font-weight="700" fill="#ef4444" text-anchor="middle">AI STUDIO</text>
      </g>
    </g>
  </g>
</svg>'''

slides = [
    ('bt24_desktop_slide.svg', svg_desktop),
    ('bt24_mobile_slide.svg', svg_mobile),
    ('bt24_detail_conversion_slide.svg', svg_detail),
    ('bt24_specs_slide.svg', svg_specs)
]

for filename, content in slides:
    filepath = os.path.join('src/assets/images', filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    # Validate with ET.parse
    try:
        ET.parse(filepath)
        print(f"Validated {filename} successfully!")
    except Exception as e:
        print(f"Error in {filename}: {e}")
