// 사이트 하단·약관·결제 화면에 쓰는 사업자 정보는 여기 한 곳에서만 고친다.
// PG(카드사) 심사: 상호·대표자·주소·사업자번호가 사업자등록증과 글자까지 같아야 함.
// 빈 값('')은 아직 확인 안 된 항목 → 화면에서 숨기거나 [확인 필요]로 표시.
export const BUSINESS = {
  brandName: 'AI비서',
  companyName: '주식회사 더마핑크',
  ceoName: '안진홍',
  bizRegNo: '', // 사업자등록번호 (예: 123-45-67890)
  mailOrderNo: '', // 통신판매업 신고번호 (없으면 국민카드 심사 제외)
  address: '경기도 용인시 기흥구 동백중앙로16번길 16-4, 1914호(중동, 에이스 동백 타워)',
  phone: '070-8144-3848',
  email: '', // 고객센터 이메일
  privacyOfficer: '', // 개인정보 보호책임자 이름
  bank: { name: '신한은행', account: '140-015-969664', holder: '주식회사 더마핑크' },
  hours: '평일 09:00 - 19:00'
};

export const orMissing = (value: string) => value || '[확인 필요]';
