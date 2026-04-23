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
        { label: '포인트', icon: '🪙', to: '/points' },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl justify-around px-4 py-3">
        {menuItems.map((item) => {
          const active = pathname === item.to;
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => navigate(item.to)}
              className={`inline-flex flex-col items-center gap-1 rounded-3xl px-3 py-2 text-xs font-semibold transition ${
                active ? 'text-teal-700' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
        {isParentMode && (
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex flex-col items-center gap-1 rounded-3xl px-3 py-2 text-xs font-semibold text-rose-400 transition hover:text-rose-600"
          >
            <span>🚪</span>
            <span>로그아웃</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
