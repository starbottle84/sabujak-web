import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChildren } from '../hooks/useChildren';

const ChildHome = () => {
  const navigate = useNavigate();
  const { children, loading } = useChildren();

  const today = useMemo(() => {
    return new Date().toLocaleDateString('ko-KR', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 px-5 py-6 pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex items-start justify-between rounded-[28px] bg-white border border-slate-200 p-5 shadow-sm">
          <div>
            <p className="text-sm text-teal-700 font-bold">사부작</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">아이 홈</h1>
            <p className="mt-2 text-sm text-slate-500">{today}</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/child-settings')}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-lg text-slate-700 transition hover:bg-gray-300"
          >
            ⚙️
          </button>
        </header>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            {loading ? '자녀 정보를 불러오는 중이에요...' : `안녕, ${children[0]?.name ?? '지우'}야!`}
          </h2>
          <p className="mt-3 text-sm text-slate-500">오늘의 루틴을 체크하고 재미있게 시작해요.</p>
        </section>

        <div className="flex items-center justify-between rounded-[20px] bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 px-5 py-3">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">AD</p>
            <p className="text-sm text-slate-500">광고 영역입니다</p>
          </div>
          <span className="rounded-full border border-yellow-200 bg-white px-2 py-1 text-[10px] text-slate-400">광고</span>
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <button
            type="button"
            onClick={() => navigate('/routine/morning')}
            className="flex-1 rounded-[32px] border border-yellow-200 bg-yellow-50 p-6 shadow-sm transition hover:bg-yellow-100 h-48"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-400 text-4xl">☀️</span>
                <div>
                  <p className="text-sm font-semibold text-yellow-900">아침 루틴</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">3 / 20 완료</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                <span>최대 50P</span>
                <span className="text-yellow-700">파란 새싹</span>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => navigate('/routine/evening')}
            className="flex-1 rounded-[32px] border border-slate-200 bg-blue-50 p-6 shadow-sm transition hover:bg-blue-100 h-48"
          >
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-400 text-4xl">🌙</span>
                <div>
                  <p className="text-sm font-semibold text-blue-900">저녁 루틴</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">2 / 20 완료</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                <span>최대 80P</span>
                <span className="text-blue-700">밤하늘</span>
              </div>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-between rounded-[20px] bg-gradient-to-r from-teal-50 to-sky-50 border border-teal-100 px-5 py-3">
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">AD</p>
            <p className="text-sm text-slate-500">광고 영역입니다</p>
          </div>
          <span className="rounded-full border border-teal-200 bg-white px-2 py-1 text-[10px] text-slate-400">광고</span>
        </div>
      </div>
    </div>
  );
};

export default ChildHome;
