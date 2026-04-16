import { Link } from 'react-router-dom';

type SidebarItem = {
  id: string;
  icon: string;
  label: string;
  to: string;
};

const sidebarItems: SidebarItem[] = [
  { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', to: '/dashboard' },
  { id: 'profiles', icon: 'face', label: 'Child Profiles', to: '/profiles' },
  { id: 'routines', icon: 'event_repeat', label: 'Routine Editor', to: '/routines' },
  { id: 'points', icon: 'stars', label: 'Point Settings', to: '/points' },
  { id: 'notifications', icon: 'notifications_active', label: 'Notifications', to: '/notifications' },
  { id: 'account', icon: 'manage_accounts', label: 'Account', to: '/account' },
];

export function Sidebar({ activeTab }: { activeTab: string }) {
  return (
    <aside className="hidden md:flex flex-col h-screen w-72 bg-[#e5e9e9] rounded-r-[3rem] py-8 sticky top-0 border-r-0 z-40">
      <div className="px-8 mb-10 overflow-hidden whitespace-nowrap">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img
            alt="Logo"
            className="w-10 h-10 bg-primary-container rounded-full p-2 shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQh2ZKa1Zid9vfDiH-rBXJR-N8pmCtGCep4URWOkrRRmjchD561X0Ml3wXTCOpaoh53MAhzFIMkfOeINtMPaMbSL7deYtuK9VoaSlzXrUM8hy8nqK0bVpcJmQEyN93Zjf_J6ZrtY3ofdejv8sqThcVno6Lb36XvNWXzYHuGGQrZlIxsoQSrdus4vzeTzed8wK3spXhmqHFDkAazSw4nP2bc_XxpGdli7LrBoyZwQswYMyKLg1UFbGFuTHJiPT1iXCPBwtUkgCKJg"
          />
          <span className="text-xl font-bold text-[#00685a] font-headline tracking-tight">사부작</span>
        </Link>
        <p className="text-slate-500 font-medium text-xs mt-1 px-1">Parent Dashboard</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const active = item.id === activeTab;
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? 'bg-white text-[#00685a] font-bold shadow-sm translate-x-2'
                  : 'text-slate-600 hover:text-[#00685a] hover:bg-white/50 hover:translate-x-1'
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="font-headline truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 mt-auto">
        <button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:scale-95 transition-all squish-effect">
          <span className="material-symbols-outlined">add_circle</span>
          Add New
        </button>
      </div>
    </aside>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <header className="flex justify-between items-center w-full px-8 py-4 bg-[#f5f7f7]/90 sticky top-0 z-30 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="md:hidden p-2 rounded-full hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#00685a] hidden sm:block">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-surface-container transition-colors squish-effect">
          <span className="material-symbols-outlined text-slate-600">notifications</span>
        </button>
        <button className="p-2 rounded-full hover:bg-surface-container transition-colors squish-effect">
          <span className="material-symbols-outlined text-slate-600">settings</span>
        </button>
        <div className="h-10 w-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-container shadow-sm">
          <img
            alt="Parent Profile"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUE8xPsAnjwVfQYg0yzREw4NwkpXQnPnM_ms83WZ7r0PXIW-gBNkxpZH040P-3IPl4_bZkjvB5egQjKCI3u-h3Q0TG6ofN2IJxGcjV7c3qKpdkH4QSIkgvzO-Hq4HBLsj-aifkyxEspkVZGKV06lo98GCebxiR1kYWYG-_7wyaqV9b0dSnVmJPhcszD3nJO0KTKozNyP8VZ13SifK6GKkpKr_2jtZsisa7CL2OK2_vO8YY0TJRZM29ECErrEhjVPvP9tsBkgWP3g"
          />
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center py-3 px-2 z-50 rounded-t-[2.5rem]">
      <Link className="flex flex-col items-center gap-1 text-[#00685a] font-bold" to="/dashboard">
        <span className="material-symbols-outlined">dashboard</span>
        <span className="text-[10px]">홈</span>
      </Link>
      <Link className="flex flex-col items-center gap-1 text-slate-400" to="/routines">
        <span className="material-symbols-outlined">edit_calendar</span>
        <span className="text-[10px]">루틴</span>
      </Link>
      <button className="h-14 w-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>
      <Link className="flex flex-col items-center gap-1 text-slate-400" to="/points">
        <span className="material-symbols-outlined">settings</span>
        <span className="text-[10px]">설정</span>
      </Link>
      <Link className="flex flex-col items-center gap-1 text-slate-400" to="/profiles">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px]">마이</span>
      </Link>
    </nav>
  );
}
