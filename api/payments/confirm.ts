// Vercel 서버 함수: POST /api/payments/confirm
// 비밀 키(TOSS_SECRET_KEY)는 코드가 아니라 Vercel 환경변수에만 둔다 (공개 저장소).
import { confirmPayment } from '../../src/payments/confirm.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ code: 'METHOD_NOT_ALLOWED', message: 'POST만 가능합니다.' });
    return;
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const result = await confirmPayment(body, process.env.TOSS_SECRET_KEY);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error('confirm error', err);
    res.status(500).json({ code: 'SERVER_ERROR', message: '결제 승인 중 오류가 났습니다. 고객센터로 문의해 주세요.' });
  }
}
