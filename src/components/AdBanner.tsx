import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: object[];
  }
}

interface Props {
  slot: string;
  className?: string;
}

export default function AdBanner({ slot, className = '' }: Props) {
  const client = import.meta.env.VITE_ADSENSE_CLIENT as string;
  const pushed = useRef(false);
  const isPlaceholder = !client || client === 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    if (isPlaceholder || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [isPlaceholder]);

  if (isPlaceholder) {
    return (
      <div className={`flex items-center justify-between rounded-[20px] bg-gradient-to-r from-slate-50 to-slate-100 border border-dashed border-slate-200 px-5 py-3 ${className}`}>
        <div>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">광고 준비 중</p>
          <p className="text-xs text-slate-400">AdSense 승인 후 광고가 표시됩니다</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-300">AD</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-[20px] ${className}`}>
      {/* 아동 콘텐츠 보호: COPPA + GDPR-K + 비개인화 광고 */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
        data-tag-for-child-directed-treatment="1"
        data-tag-for-under-age-of-consent="1"
        data-restrict-data-processing="1"
      />
    </div>
  );
}
