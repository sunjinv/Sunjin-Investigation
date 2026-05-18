import { ReservationData } from './reservations';

const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbwvP8n57Bk6OVyR8kLlHRXB2mz-SdwmpjRZ5a5Hd0SudAIgIhWhAX1hzc__CFsiShG8/exec';

export const sendEmailNotification = async (data: Omit<ReservationData, 'createdAt'>) => {
  try {
    // GAS 웹앱은 보통 CORS 이슈를 피하기 위해 no-cors 모드를 사용하거나, 
    // 단순 POST 요청을 보냅니다. fetch를 사용하여 데이터를 전송합니다.
    const response = await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain', // no-cors에서 허용되는 헤더로 변경
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString()
      }),
    });
    
    return true;
  } catch (error) {
    console.error('Email notification failed:', error);
    return false;
  }
};
