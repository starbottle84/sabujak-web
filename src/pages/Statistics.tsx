const Statistics = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 px-4 py-8 pb-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[32px] bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-teal-700">사부작</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">통계</h2>
            <p className="mt-2 text-sm text-slate-500">이번 주 루틴 수행 현황을 확인해 보세요.</p>
          </div>

          <div className="space-y-3">
            <button className="flex w-full items-center gap-3 rounded-3xl bg-teal-50 px-4 py-3 text-left text-sm font-semibold text-teal-700 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-teal-100 text-lg">📊</span>
              Weekly Stats
            </button>
            <button className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">👧</span>
              Child Profiles
            </button>
            <button className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-100 text-lg">⚙️</span>
              Settings
            </button>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-teal-700">주간 통계</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">이번 주 루틴 수행 현황</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Weekly</button>
                <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Monthly</button>
                <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Yearly</button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 xl:grid-cols-3">
              <div className="rounded-[28px] bg-slate-50 p-6">
                <p className="text-sm text-slate-500">루틴 달성률</p>
                <p className="mt-3 text-4xl font-bold text-slate-900">74%</p>
                <p className="mt-2 text-sm text-slate-500">지난주 대비 +8%</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-6">
                <p className="text-sm text-slate-500">누적 포인트</p>
                <p className="mt-3 text-4xl font-bold text-slate-900">210</p>
                <p className="mt-2 text-sm text-slate-500">Extras 포함</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-6">
                <p className="text-sm text-slate-500">연속 성공 일수</p>
                <p className="mt-3 text-4xl font-bold text-slate-900">4일</p>
                <p className="mt-2 text-sm text-slate-500">최고 기록 7일</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            <div className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-700">요일별 수행건수</p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">오늘의 루틴 활약</h2>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">Morning / Evening</div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="grid grid-cols-7 gap-2 items-end">
                  <div className="h-20 rounded-full bg-teal-300"></div>
                  <div className="h-28 rounded-full bg-teal-500"></div>
                  <div className="h-24 rounded-full bg-teal-400"></div>
                  <div className="h-32 rounded-full bg-teal-500"></div>
                  <div className="h-20 rounded-full bg-teal-300"></div>
                  <div className="h-16 rounded-full bg-teal-200"></div>
                  <div className="h-10 rounded-full bg-teal-100"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-teal-700">카테고리별 달성률</p>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Morning Essential</span>
                      <span>82%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-4/5 rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Evening Essential</span>
                      <span>68%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-2/3 rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Morning Extra</span>
                      <span>54%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-1/2 rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <span>Evening Extra</span>
                      <span>49%</span>
                    </div>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-1/3 rounded-full bg-teal-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-teal-700">알림</p>
                <div className="mt-4 space-y-4 rounded-[28px] bg-slate-50 p-4 text-sm text-slate-600">
                  <p>지우가 이번 주 열심히 했어요! 새로운 보상을 준비해보세요.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
