import React, { useEffect } from 'react';
import { BUSINESS, orMissing } from '../config/business';
import { CATALOG } from '../payments/catalog';

// 환불 정책 · 이용약관 · 개인정보처리방침
// ⚠️ 초안: 서정연·안진홍 대표님 확인 + PG 심사 전 법 기준 검토 후 POLICY_DRAFT를 false로
const POLICY_DRAFT = true;
const EFFECTIVE_DATE = '2026년 11월 11일';

type PolicyKind = 'refund' | 'terms' | 'privacy';

const TITLES: Record<PolicyKind, string> = {
  refund: '환불 정책',
  terms: '이용약관',
  privacy: '개인정보처리방침'
};

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-base font-black text-[#0f2439] mt-8 mb-2">{children}</h2>
);

const RefundPolicy = () => (
  <>
    <H2>1. 상품과 제공 기간</H2>
    <table className="w-full text-xs border border-[#eae6df]">
      <thead className="bg-[#f7f5f0]">
        <tr>
          <th className="p-2 text-left">상품</th>
          <th className="p-2 text-right">금액</th>
          <th className="p-2 text-left">제공 기간</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(CATALOG).map((item) => (
          <tr key={item.id} className="border-t border-[#eae6df]">
            <td className="p-2">{item.name}</td>
            <td className="p-2 text-right">{won(item.amount)}</td>
            <td className="p-2">{item.period}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-2">맞춤 견적 작업은 견적서에 적힌 범위와 일정에 따릅니다.</p>

    <H2>2. 작업 시작 전 — 전액 환불</H2>
    <p>결제 후 첫 작업을 시작하기 전에 취소하시면 결제 금액 전액을 환불해 드립니다. 결제일로부터 7일 안에는 이유를 묻지 않고 취소할 수 있습니다.</p>

    <H2>3. 작업 시작 후 — 진행분을 빼고 환불</H2>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>월간 이용권:</strong> 이미 완료했거나 진행 중인 작업분을 뺀 나머지를 환불합니다. 작업분 계산 기준은 상담 때 안내한 1건 기준을 따릅니다.</li>
      <li><strong>연간 이용권:</strong> 중도 해지하시면 이용한 달 수만큼 <strong>월간 요금(할인 전)</strong>으로 다시 계산해 빼고 나머지를 환불합니다.</li>
      <li><strong>크레딧:</strong> 사용하지 않은 크레딧은 유효기간(결제일부터 1년) 안에 환불을 요청할 수 있습니다. 사용한 크레딧은 1크레딧당 12,000원(정가)으로 계산해 뺍니다. 보너스 크레딧은 환불 대상이 아닙니다.</li>
      <li>이미 전달한 결과물(파일, 문서, 영상 등)은 디지털 콘텐츠 특성상 환불 대상에서 제외됩니다.</li>
    </ul>

    <H2>4. 수정</H2>
    <p>건마다 수정 2회는 무료입니다(처음 요청한 범위 안에서). 그 이상의 수정이나 범위 변경은 상담 후 진행합니다.</p>

    <H2>5. 환불 방법과 기간</H2>
    <p>
      카카오톡 채널 또는 고객센터({BUSINESS.phone}{BUSINESS.email ? `, ${BUSINESS.email}` : ''})로 요청해 주세요. 환불 금액이 확정되면 영업일 3일 안에 결제하신 수단으로 취소해 드립니다. 카드사 사정에 따라 실제 환급까지 며칠 더 걸릴 수 있습니다.
    </p>

    <H2>6. 정기 이용의 해지</H2>
    <p>정기 이용은 언제든 카카오톡 채널 또는 고객센터로 해지를 요청할 수 있으며, 요청한 날부터 다음 결제가 진행되지 않습니다.</p>
  </>
);

const TermsPolicy = () => (
  <>
    <H2>제1조 (목적)</H2>
    <p>이 약관은 {orMissing(BUSINESS.companyName)}(이하 「회사」)가 운영하는 {BUSINESS.brandName} 서비스(문서·디자인·마케팅·웹·영상 업무 대행, 이하 「서비스」)의 이용 조건과 절차, 회사와 이용자의 권리·의무를 정합니다.</p>

    <H2>제2조 (서비스 내용)</H2>
    <p>회사는 이용자가 요청한 업무를 AI 도구와 담당자의 확인을 거쳐 결과물로 전달합니다. 작업 범위, 1건의 기준, 일정은 상담 또는 견적서로 정하며, 간단한 작업은 평균 영업일 2일 안에 전달합니다. 일정은 작업 난이도와 자료 전달 시점에 따라 달라질 수 있습니다.</p>

    <H2>제3조 (이용 신청과 결제)</H2>
    <p>이용자는 사이트에서 상품을 선택해 결제하거나, 상담 후 회사가 안내한 방법으로 결제합니다. 결제는 토스페이먼츠를 통해 처리되며, 회사는 카드 정보를 저장하지 않습니다.</p>

    <H2>제4조 (청약철회와 환불)</H2>
    <p>청약철회와 환불은 <a href="/refund" className="underline">환불 정책</a>에 따릅니다.</p>

    <H2>제5조 (이용자의 의무)</H2>
    <ul className="list-disc pl-5 space-y-1">
      <li>작업에 필요한 자료를 정확히 제공하고, 제3자의 권리를 침해하는 자료를 제공하지 않습니다.</li>
      <li>불법이거나 공공질서에 어긋나는 작업은 요청할 수 없으며, 회사는 이러한 요청을 거절할 수 있습니다.</li>
    </ul>

    <H2>제6조 (결과물의 권리)</H2>
    <p>결제가 완료된 결과물의 사용 권리는 이용자에게 있습니다. 회사는 이용자의 동의 없이 결과물을 포트폴리오 등에 공개하지 않습니다. 다만 결과물에 쓰인 글꼴·이미지 등 제3자 소재는 각 소재의 이용 조건을 따릅니다.</p>

    <H2>제7조 (비밀유지)</H2>
    <p>회사는 작업 중 알게 된 이용자의 정보를 작업 목적 외에 사용하지 않으며, 요청 시 비밀유지계약(NDA)을 체결합니다.</p>

    <H2>제8조 (책임의 한계)</H2>
    <p>계약서 검토 등 결과물은 업무 참고용 초안이며 법률 자문이 아닙니다. 최종 판단과 사용은 이용자가 결정합니다. 회사의 배상 책임은 해당 작업의 결제 금액을 넘지 않습니다(회사의 고의 또는 중대한 과실은 제외).</p>

    <H2>제9조 (분쟁 해결)</H2>
    <p>분쟁이 생기면 회사와 이용자가 성실히 협의하며, 협의가 되지 않을 경우 관할 법원은 민사소송법에 따릅니다.</p>
  </>
);

const PrivacyPolicy = () => (
  <>
    <p>{orMissing(BUSINESS.companyName)}(이하 「회사」)는 개인정보 보호법에 따라 이용자의 개인정보를 다음과 같이 처리합니다.</p>

    <H2>1. 수집하는 항목과 목적</H2>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong>상담 신청:</strong> 회사명, 담당자 성함, 연락처, 요청 내용 — 상담과 견적 안내</li>
      <li><strong>결제:</strong> 담당자 성함, 이메일, 연락처, 결제 기록 — 결제 처리, 영수증·세금계산서 발행, 작업 연락</li>
      <li>카드번호 등 결제 수단 정보는 토스페이먼츠가 직접 처리하며 회사는 보관하지 않습니다.</li>
    </ul>

    <H2>2. 보관 기간</H2>
    <p>목적을 이루면 바로 파기합니다. 다만 전자상거래법에 따라 계약·청약철회 및 대금 결제 기록은 5년, 소비자 불만·분쟁 처리 기록은 3년 보관합니다.</p>

    <H2>3. 처리를 맡기는 곳 (위탁)</H2>
    <ul className="list-disc pl-5 space-y-1">
      <li>(주)토스페이먼츠 — 결제 처리</li>
      <li>(주)카카오 — 카카오톡 채널 상담</li>
    </ul>

    <H2>4. 이용자의 권리</H2>
    <p>이용자는 언제든 자신의 개인정보 열람·정정·삭제·처리 정지를 요청할 수 있으며, 회사는 지체 없이 처리합니다.</p>

    <H2>5. 개인정보 보호책임자</H2>
    <p>
      책임자: {orMissing(BUSINESS.privacyOfficer)} · 연락처: {BUSINESS.phone} · 이메일: {orMissing(BUSINESS.email)}
    </p>
  </>
);

export const PolicyPage: React.FC<{ kind: PolicyKind }> = ({ kind }) => {
  useEffect(() => {
    document.title = `${TITLES[kind]} | ${BUSINESS.brandName}`;
    window.scrollTo(0, 0);
  }, [kind]);

  return (
    <section className="max-w-3xl mx-auto px-5 py-10 sm:py-14 text-sm text-gray-700 leading-relaxed">
      {POLICY_DRAFT && (
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          검토 중인 초안입니다. 확정 전까지 내용이 바뀔 수 있습니다.
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-black text-[#0f2439]">{TITLES[kind]}</h1>
      <p className="text-xs text-gray-500 mt-1">
        {BUSINESS.brandName} · {orMissing(BUSINESS.companyName)} · 시행일 {EFFECTIVE_DATE}
      </p>
      <nav className="flex gap-3 mt-4 text-xs font-bold">
        {(Object.keys(TITLES) as PolicyKind[]).map((k) => (
          <a key={k} href={`/${k}`} className={k === kind ? 'text-[#f05a22]' : 'text-gray-500 hover:text-[#0f2439]'}>
            {TITLES[k]}
          </a>
        ))}
      </nav>
      {kind === 'refund' && <RefundPolicy />}
      {kind === 'terms' && <TermsPolicy />}
      {kind === 'privacy' && <PrivacyPolicy />}
    </section>
  );
};

export type { PolicyKind };
