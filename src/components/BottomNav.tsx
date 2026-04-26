import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isParentMode = pathname.startsWith('/stats') || pathname.startsWith('/settings');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = isParentMode
    ? [
        { label: '홈', icon: '🏠', to: '/home' },
        { label: '통계', icon: '📊', to: '/stats' },
        { label: '설정', icon: '⚙️', to: '/settings' },
      ]
    : [
        { label: '홈', icon: '🏠', to: '/home' },
        { label: '포인트', icon: '💰', to: '/points' },
        { label: '설정', icon: '⚙️', to: '/child-settings' },
      ];

  return (
    // 모바일: 하단 고정 / 데스크톱: 상단 고정
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm
      lg:top-0 lg:bottom-auto lg:border-t-0 lg:border-b">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-3 lg:px-8">

        {/* 브랜드 — 데스크톱만 표시 */}
        <div className="hidden lg:flex items-center gap-2 mr-auto">
          <img src="/favicon.svg" alt="사부작" className="h-6 w-6" />
          <span className="text-base font-bold text-teal-700">사부작</span>
        </div>

        {/* 메뉴 아이템 */}
        <div className="flex w-full justify-around lg:w-auto lg:justify-end lg:gap-1">
          {menuItems.map((item) => {
            const active = pathname === item.to;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                className={`inline-flex flex-col items-center gap-0.5 rounded-2xl px-4 py-2 text-xs font-semibold transition
                  lg:flex-row lg:gap-1.5 lg:rounded-full lg:px-4 lg:py-2 lg:text-sm
                  ${active
                    ? 'text-teal-700 lg:bg-teal-50'
                    : 'text-slate-500 hover:text-slate-800 lg:hover:bg-slate-100'
                  }`}
              >
                <span className="text-lg lg:text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 로그아웃 — 부모 모드 */}
        {isParentMode && (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex flex-col items-center gap-0.5 rounded-2xl px-4 py-2 text-xs font-semibold text-rose-400 transition hover:text-rose-600
              lg:flex-row lg:gap-1.5 lg:rounded-full lg:px-4 lg:py-2 lg:text-sm lg:ml-2 lg:hover:bg-rose-50"
          >
            <span className="text-lg lg:text-base">🚪</span>
            <span>로그아웃</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
