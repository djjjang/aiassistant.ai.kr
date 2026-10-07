import { NotificationLogItem } from '../types';

export interface SendNotificationPayload {
  company: string;
  name: string;
  phone: string;
  taskType?: string;
  taskTypeName?: string;
  memo?: string;
  selectedPlan?: string;
  isTest?: boolean;
}

export interface SendNotificationResult {
  success: boolean;
  statusCode: number;
  log: NotificationLogItem;
  message: string;
  errorDetails?: string;
  adminPhone: string;
}

export interface NotificationSettingsData {
  adminPhone: string;
  kakaoChannelUrl: string;
  hasWebhook: boolean;
  webhookUrl: string;
  hasAlimtalkKey: boolean;
}

export async function sendAdminNotification(
  payload: SendNotificationPayload
): Promise<SendNotificationResult> {
  try {
    const res = await fetch('/api/notify-admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    return {
      success: data.success,
      statusCode: data.statusCode || res.status,
      log: data.log,
      message: data.message,
      errorDetails: data.errorDetails,
      adminPhone: data.adminPhone || '010-8200-0152'
    };
  } catch (err: any) {
    const fallbackLog: NotificationLogItem = {
      id: `LOG-NET-ERR-${Date.now()}`,
      timestamp: new Date().toLocaleString('ko-KR'),
      recipient: '010-8200-0152',
      requesterName: payload.name,
      company: payload.company,
      taskType: payload.taskType || 'general',
      title: '네트워크 알림 전송 오류',
      status: 'failed',
      statusCode: 503,
      responseMessage: 'API 서버 통신 중 네트워크 오류 발생',
      errorDetails: err?.message || 'Network request failed',
      attemptCount: 3,
      maxAttempts: 3,
      retryHistory: [
        {
          attempt: 1,
          timestamp: new Date().toLocaleTimeString('ko-KR'),
          statusCode: 503,
          errorMessage: err?.message || 'Network error'
        }
      ],
      channel: 'alimtalk'
    };

    return {
      success: false,
      statusCode: 503,
      log: fallbackLog,
      message: '알림 API 서버와의 통신에 실패했습니다.',
      errorDetails: err?.message,
      adminPhone: '010-8200-0152'
    };
  }
}

export async function getNotificationLogs(): Promise<NotificationLogItem[]> {
  try {
    const res = await fetch('/api/notifications/logs');
    if (!res.ok) return [];
    const data = await res.json();
    return data.logs || [];
  } catch {
    return [];
  }
}

export async function getNotificationSettings(): Promise<NotificationSettingsData | null> {
  try {
    const res = await fetch('/api/notifications/settings');
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateNotificationSettings(settings: {
  webhookUrl?: string;
  adminPhone?: string;
}): Promise<boolean> {
  try {
    const res = await fetch('/api/notifications/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return res.ok;
  } catch {
    return false;
  }
}
