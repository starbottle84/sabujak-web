import { Sidebar, TopBar, BottomNav } from '../components/SharedLayout';

const mustDoItems = ['기상하기', '세수하기', '양치하기', '옷 입기'];
const extraItems = ['그릇 정리', '식탁 닦기'];

export default function Routines() {
  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar activeTab="routines" />
      <div className="flex-1 flex flex-col pb-24 md:pb-0 h-screen overflow-y-auto">
        <TopBar title="루틴 편집" />
        <main className="flex-1 px-4 md:px-8 py-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold font-headline text-on-surface tracking-tight mb-2">루틴 편집</h1>
              <div className="flex gap-2 bg-surface-container rounded-full p-1 w-fit">
                <button className="px-6 py-1.5 rounded-full text-sm font-bold bg-white text-parent-accent shadow-sm">지우</button>
                <button className="px-6 py-1.5 rounded-full text-sm font-bold text-on-surface-variant">민우</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>light_mode</span>
                </div>
                <h2 className="text-lg font-bold font-headline">☀️ 아침 필수 루틴</h2>
              </div>
              <div className="space-y-3">
                {mustDoItems.map((item, idx) => (
                  <div key={item} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
                      <span className="font-bold">{item}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2 py-1 rounded-md hidden sm:block">5 PT</span>
                      <ToggleSwitch id={`must-${idx}`} defaultChecked />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <h2 className="text-lg font-bold font-headline">⭐️ 엑스트라 보너스</h2>
              </div>
              <div className="space-y-3">
                {extraItems.map((item, idx) => (
                  <div key={item} className="flex items-center justify-between p-4 rounded-xl border border-dashed border-outline-variant/30 opacity-80">
                    <div className="flex items-center gap-3 opacity-80">
                      <span className="material-symbols-outlined">radio_button_unchecked</span>
                      <span className="font-bold">{item}</span>
                    </div>
                    <ToggleSwitch id={`extra-${idx}`} defaultChecked={false} />
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-outline-variant/40 text-on-surface-variant font-bold hover:bg-surface-container text-sm flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">add</span>항목 추가
              </button>
            </section>
          </div>
        </main>

        <div className="fixed bottom-16 md:bottom-0 left-0 md:left-72 right-0 p-4 bg-surface/90 backdrop-blur-sm border-t border-surface-container-highest z-20">
          <div className="max-w-4xl mx-auto flex justify-end">
            <button className="bg-parent-accent text-white px-8 py-3 rounded-xl font-bold shadow-md hover:opacity-90 active:scale-95 transition-all w-full md:w-auto">
              변경사항 저장
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function ToggleSwitch({ id, defaultChecked }: { id: string; defaultChecked?: boolean }) {
  return (
    <div className="relative inline-block w-12 h-6">
      <input type="checkbox" id={id} className="hidden toggle-checkbox" defaultChecked={defaultChecked} />
      <label htmlFor={id} className="toggle-label block bg-slate-300 w-full h-full rounded-full cursor-pointer transition-colors relative">
        <span className="toggle-dot absolute left-1 top-[2px] bg-white w-5 h-5 rounded-full transition-transform shadow-sm"></span>
      </label>
    </div>
  );
}
