import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Compass } from 'lucide-react';

const InAppBrowserHandler = () => {
  const [showiOSBanner, setShowiOSBanner] = useState(false);

  useEffect(() => {
    // 1. SSR 안전장치
    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent.toLowerCase();
    const targetUrl = window.location.href;

    // 2. 카카오톡: 전용 외부 브라우저 호출 기능 사용
    if (userAgent.includes('kakaotalk')) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(targetUrl)}`;
      return;
    }

    // 3. 라인: 외부 브라우저 호출 파라미터 추가
    if (userAgent.includes('line')) {
      const separator = targetUrl.includes('?') ? '&' : '?';
      window.location.href = `${targetUrl}${separator}openExternalBrowser=1`;
      return;
    }

    // 4. 안드로이드 (네이버, 인스타, 페북 등): 인텐트 스키마로 크롬 강제 실행
    if (userAgent.includes('android') && /naver|instagram|facebook|fbav/.test(userAgent)) {
      const intentUrl = `intent://${targetUrl.replace(/^https?:\/\//i, '')}#Intent;scheme=https;package=com.android.chrome;end`;
      window.location.href = intentUrl;
      return;
    }

    // 5. iOS (아이폰/아이패드): 강제 호출이 불가능하므로 안내 배너 노출
    if ((userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) && 
        /naver|instagram|facebook|fbav/.test(userAgent)) {
      setShowiOSBanner(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {showiOSBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 w-full z-[9999] bg-brand-gold text-black px-5 py-4 shadow-2xl flex items-center gap-4"
        >
          <div className="flex-1 flex items-center gap-3">
            <div className="bg-black/10 p-2 rounded-full">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-tight">구글 로그인이 차단된 브라우저입니다.</span>
              <span className="text-[10px] opacity-70">우측 하단 아이콘 ➡️ 'Safari로 열기'를 눌러주세요.</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowiOSBanner(false)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InAppBrowserHandler;
