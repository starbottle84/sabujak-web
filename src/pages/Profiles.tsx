import { Sidebar, TopBar, BottomNav } from '../components/SharedLayout';

const children = [
  { name: '지우', age: '7세', label: '초등학생 준비중', emoji: '🐻', rate: '6/10' },
  { name: '민우', age: '4세', label: '호기심 많은 탐험가', emoji: '🐰', rate: '4/8' },
];

export default function Profiles() {
  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar activeTab="profiles" />
      <div className="flex-1 flex flex-col pb-20 md:pb-0 h-screen overflow-y-auto">
        <TopBar title="자녀 프로필" />
        <main className="flex-1 px-8 py-6 max-w-6xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold font-headline text-on-surface mb-2 tracking-tight">자녀 관리</h1>
            <p className="text-on-surface-variant text-lg">자녀의 프로필을 추가하고 관리하세요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children.map((child) => (
              <div key={child.name} className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center shadow-sm border border-transparent hover:border-primary-container transition-all">
                <div className="w-28 h-28 bg-[#E0F2F1] rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner">{child.emoji}</div>
                <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">{child.name}</h3>
                <p className="text-on-surface-variant text-sm mb-6">{child.age} · {child.label}</p>
                <div className="w-full space-y-3 mb-6">
                  <div className="bg-surface-container-low rounded-lg p-3">
                    <div className="flex justify-between text-xs font-bold text-on-surface-variant mb-1">
                      <span>오늘 루틴</span>
                      <span className="text-primary">{child.rate}</span>
                    </div>
                    <div className="h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: child.rate }} />
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors text-sm">
                  프로필 수정
                </button>
              </div>
            ))}
            <button className="border-4 border-dashed border-surface-container-highest rounded-2xl p-8 flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-lowest transition-all hover:border-primary/30 group min-h-[300px]">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <span className="font-bold text-lg">자녀 추가하기</span>
            </button>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
