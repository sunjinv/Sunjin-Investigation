import { ReservationData } from './reservations';

const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyW2lwB9oLAS-u_qEuIVOLsAfzmJWAqdmPgu7XXGqhcy-tG3G-7Tlbmb5LpF2ao3Q1j/exec';

export const sendEmailNotification = async (data: Omit<ReservationData, 'createdAt'>) => {
  try {
    // GAS 웹앱은 보통 CORS 이슈를 피하기 위해 no-cors 모드를 사용하거나, 
    // 단순 POST 요청을 보냅니다. fetch를 사용하여 데이터를 전송합니다.
    const response = await fetch(GAS_WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors', // GAS 웹앱 특성상 응답을 직접 받기보다는 실행에 목적을 둡니다.
      headers: {
        'Content-Type': 'application/json',
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
