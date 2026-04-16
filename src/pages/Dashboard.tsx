import { Sidebar, TopBar, BottomNav } from '../components/SharedLayout';

const dayLabels = ['월', '화', '수', '목', '금', '토', '일'];
const dayHeights = [60, 80, 50, 90, 30, 15, 5];

export default function Dashboard() {
  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar activeTab="dashboard" />
      <div className="flex-1 flex flex-col pb-20 md:pb-0 h-screen overflow-y-auto">
        <TopBar title="대시보드" />
        <main className="flex-1 px-8 py-6 max-w-6xl mx-auto w-full">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-2 font-headline">주간 통계</h2>
              <p className="text-on-surface-variant font-medium">이번 주 루틴 수행 현황</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-bold shadow-sm border border-primary/20">
                <span className="text-lg">🐻</span>
                <span>지우</span>
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low text-on-surface-variant font-bold hover:bg-surface-container transition-colors">
                <span className="text-lg">🐰</span>
                <span>민우</span>
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard title="루틴 달성률" value="74%" badge="+8%" icon="task_alt" color="primary" />
            <StatCard title="누적 포인트" value="210" badge="Extras included" icon="generating_tokens" color="secondary" />
            <StatCard title="연속 성공" value="4일" badge="Record: 7 days" icon="local_fire_department" color="tertiary" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold mb-6 font-headline">주간 활동 요약</h3>
              <div className="h-64 flex items-end gap-2 sm:gap-4 justify-between pt-4 border-b border-surface-container-highest pb-2">
                {dayLabels.map((day, index) => (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full max-w-[2rem] bg-surface-container rounded-t-lg h-48 flex items-end overflow-hidden group-hover:bg-surface-container-high transition-colors">
                      <div className="w-full bg-primary rounded-t-lg transition-all" style={{ height: `${dayHeights[index]}%` }} />
                    </div>
                    <span className="text-xs font-medium text-on-surface-variant">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold mb-6 font-headline">인사이트</h3>
              <div className="space-y-4">
                <InsightCard icon="tips_and_updates" text="이번 주는 아침 양치 루틴을 아주 잘 지켰어요!" color="primary" />
                <InsightCard icon="favorite" text="주말에는 루틴 달성률이 떨어지는 경향이 있습니다." color="tertiary" />
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

function StatCard({ title, value, badge, icon, color }: { title: string; value: string; badge: string; icon: string; color: 'primary' | 'secondary' | 'tertiary' }) {
  const palette = {
    primary: 'text-primary bg-primary-container/50 border-primary/40',
    secondary: 'text-secondary bg-secondary-container/50 border-secondary/40',
    tertiary: 'text-tertiary bg-tertiary-container/50 border-tertiary/40',
  };

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between shadow-sm border-b-4 border-opacity-40" style={{ borderColor: `rgba(0,0,0,0.08)` }}>
      <div className="flex justify-between items-start">
        <span className={`material-symbols-outlined text-3xl p-2 rounded-xl ${palette[color]}`}>{icon}</span>
        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded-full">{badge}</span>
      </div>
      <div className="mt-6">
        <p className="text-on-surface-variant font-medium text-sm">{title}</p>
        <p className="text-4xl font-black text-on-surface mt-1">{value}</p>
      </div>
    </div>
  );
}

function InsightCard({ icon, text, color }: { icon: string; text: string; color: 'primary' | 'tertiary' }) {
  const palette = {
    primary: 'text-primary',
    tertiary: 'text-tertiary',
  };

  return (
    <div className="p-4 rounded-xl flex gap-3 items-start border" style={{ borderColor: color === 'primary' ? '#8deedb' : '#f7a48b', backgroundColor: color === 'primary' ? 'rgba(141,238,219,0.2)' : 'rgba(247,164,139,0.2)' }}>
      <span className={`material-symbols-outlined text-xl ${palette[color]}`}>{icon}</span>
      <p className="text-sm text-on-surface-variant leading-relaxed">{text}</p>
    </div>
  );
}
