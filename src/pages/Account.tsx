export default function Account() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f7f7] flex justify-between items-center w-full px-6 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-slate-800 font-headline">사부작 — 부모 설정</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:bg-slate-200/50 rounded-full transition-all p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">help</span>
          </button>
          <button className="hover:bg-slate-200/50 rounded-full transition-all p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">settings</span>
          </button>
          <div className="bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
            부모 전용
          </div>
          <img
            alt="Parent avatar"
            className="w-10 h-10 rounded-full bg-surface-container-high object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkZBVU1kk0Ov9OyPukHOV9HMBY_GvEdOgghi_y6o2ym9FZ_o-KYSDpnYhNOjefKQES5lmBAw2ZowL1EBab-yOTzjrst8vbcMBtrMBoXyScUQb6U_tgpmSl25tvS0j1K3PkUkjF1ZFqOKZaR1_veNEZYvx05HdVYh2AAMkRyEvZR0ODEeKglMhTmTv8a-fSKUu5pYdTnGLQo9U4UU513eho9eCmEa1MQCVTn0zSriebz-xNm6fTR8klg_HsKCxho1Mj_jEqcHv0ug"
          />
        </div>
      </header>

      <div className="flex pt-20">
        <nav className="w-[240px] flex flex-col fixed left-0 h-full bg-white p-6 shadow-sm">
          <div className="mb-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4 px-4">자녀 관리</p>
            <div className="space-y-1">
              <a className="flex items-center gap-3 bg-purple-50 text-purple-700 rounded-[48px] px-4 py-3 active-nav-border bounce-effect transition-all" href="#">
                <span className="material-symbols-outlined">child_care</span>
                <span className="font-bold text-sm">자녀 프로필</span>
              </a>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4 px-4">루틴 설정</p>
            <div className="space-y-1">
              <a className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-100 rounded-[48px] transition-colors bounce-effect" href="#">
                <span className="material-symbols-outlined">auto_fix_high</span>
                <span className="font-medium text-sm">루틴 편집</span>
              </a>
              <a className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-100 rounded-[48px] transition-colors bounce-effect" href="#">
                <span className="material-symbols-outlined">stars</span>
                <span className="font-medium text-sm">포인트 설정</span>
              </a>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4 px-4">알림</p>
            <div className="space-y-1">
              <a className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-100 rounded-[48px] transition-colors bounce-effect" href="#">
                <span className="material-symbols-outlined">notifications_active</span>
                <span className="font-medium text-sm">알림 설정</span>
              </a>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-4 px-4">계정</p>
            <div className="space-y-1">
              <a className="flex items-center gap-3 text-slate-600 px-4 py-3 hover:bg-slate-100 rounded-[48px] transition-colors bounce-effect" href="#">
                <span className="material-symbols-outlined">manage_accounts</span>
                <span className="font-medium text-sm">계정 정보</span>
              </a>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-surface-container-low">
            <button className="flex items-center gap-3 text-error px-4 py-3 hover:bg-error/5 rounded-[48px] transition-colors w-full bounce-effect">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-medium text-sm">로그아웃</span>
            </button>
          </div>
        </nav>

        <main className="ml-[240px] flex-1 p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold font-headline text-on-surface mb-2 tracking-tight">자녀 프로필 관리</h1>
              <p className="text-on-surface-variant text-lg">자녀의 정보를 수정하거나 새로운 프로필을 추가할 수 있습니다.</p>
            </div>

            <div className="bg-surface-container-low rounded-xl p-8 min-h-[600px] relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-tertiary-container/20 rounded-full blur-3xl" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-on-surface/5 border border-transparent hover:border-purple-200">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container border-4 border-white shadow-sm">
                      <img
                        alt="Ji-woo"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1LWnbCvcSg7_kL9Xk0F_RwBzVGUlTFM-z-n-HTPeOGKeUf3aiTRSxu7cpxerAWfgsJfuRxKf0Ws8Tsfk3Da_sc28oxtHeTnvsn91IDThHe4FMCw-gdbx3AqUe3nFccgYP1_DsPy9CdtBKcr0ZrAOlEWdclhFbipfbluArGaImHMBm529dBFGF20k1q_BFJ7bmLwfNwEOVTfqRL04dYPGuZhozIDFhX15JflanyFNv8evauD3Fe0qs1BNhmeVJFZGDv5lCnun_nw"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-primary w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">지우</h3>
                  <p className="text-on-surface-variant text-sm mb-6">7세 · 초등학생 준비중</p>
                  <button className="w-full py-4 bg-surface-container-high text-on-surface font-bold rounded-xl bounce-effect hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    수정
                  </button>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col items-center transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-on-surface/5 border border-transparent hover:border-purple-200">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container border-4 border-white shadow-sm">
                      <img
                        alt="Min-woo"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8YCnAPw4SzsTYvs3HVy8bJ25--2gBIl3LylG3_wflpa-2cDljBJdaCa_IWb65iv7TwOhq8MoEyF6A__3fANVXua6qeUB_JsUZS-_WXz3tYVXR43Fbbd2REuZ-o6BzKtJfQkHag-A3uQaJhvs1yjFVz49UFVhu5W4U-JuGhlTMLS-injfLxXkVPJgjR9TiwS6KX9ls0A7WYlt0fP7lgMOXVFclAt9uqezBsig5IQep37ARV3lRZd98Lty1uHrhWm8aNFk5H4J7Fg"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-secondary w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold font-headline mb-1 text-on-surface">민우</h3>
                  <p className="text-on-surface-variant text-sm mb-6">4세 · 호기심 많은 탐험가</p>
                  <button className="w-full py-4 bg-surface-container-high text-on-surface font-bold rounded-xl bounce-effect hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">edit</span>
                    수정
                  </button>
                </div>

                <button className="group bg-white/40 rounded-xl border-4 border-dashed border-outline-variant/30 flex flex-col items-center justify-center p-8 transition-all hover:border-primary hover:bg-white/80 bounce-effect">
                  <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                    <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary">add</span>
                  </div>
                  <span className="text-lg font-bold text-on-surface-variant group-hover:text-primary">새 자녀 추가</span>
                </button>
              </div>

              <div className="mt-16 flex items-center justify-center p-8 bg-white/50 rounded-xl border border-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-6">
                  <img
                    alt="Guide Bear"
                    className="w-20 h-20 object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIg7Kji9XfA-rAJvFYQaD-8gPcAw0wqEcbsgnK8uuvmNu2P0DOuWNZzjkx4TZMn-HKqwZP3uhpVek6XIzA5YJ4DpmJl-hY6oXD6foUi4WjUa2NDI4dy9ASpIE4ewFm_JlI_IF3JD0Z51XEIjC7Z9xaKTje77kYP3hsgyIp8d5T3eDGF9OX1pynfJgnG5eITtuxsrKpsuu9uoI1PJC4DsZZGVXGRf9K0RIo8_s4i6TtLwqcviWr85H2nx0KXNxaGXiqecWx8OFF-g"
                  />
                  <div>
                    <h4 className="font-headline font-bold text-xl text-primary">자녀의 성장을 사부작이 함께해요!</h4>
                    <p className="text-on-surface-variant text-sm">프로필을 설정하면 자녀 맞춤형 루틴 추천을 받을 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="fixed -bottom-40 -right-40 w-[600px] h-[600px] bg-primary-container/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-tertiary-container/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
}
