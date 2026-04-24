import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChildren } from '../hooks/useChildren';
import AdBanner from '../components/AdBanner';

type GrowthStage = {
  emoji: string;
  name: string;
  desc: string;
  bgColor: string;
  textColor: string;
};

function getGrowthStage(points: number): GrowthStage {
  if (points >= 1500) return { emoji: '🦁', name: '용사', desc: '최고 단계 달성!', bgColor: 'bg-purple-100', textColor: 'text-purple-700' };
  if (points >= 1000) return { emoji: '🦊', name: '여우', desc: `${1500 - points}P 남았어요`, bgColor: 'bg-orange-100', textColor: 'text-orange-700' };
  if (points >= 600)  return { emoji: '🐰', name: '토끼', desc: `${1000 - points}P 남았어요`, bgColor: 'bg-pink-100', textColor: 'text-pink-700' };
  if (points >= 300)  return { emoji: '🐥', name: '꼬마새', desc: `${600 - points}P 남았어요`, bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
  if (points >= 100)  return { emoji: '🐣', name: '병아리', desc: `${300 - points}P 남았어요`, bgColor: 'bg-amber-100', textColor: 'text-amber-700' };
  return { emoji: '🥚', name: '알', desc: `${100 - points}P 모으면 부화!`, bgColor: 'bg-slate-100', textColor: 'text-slate-600' };
}

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

  const child = children[0] ?? null;

  const daysSinceBirth = useMemo(() => {
    if (!child?.birthday) return null;
    return Math.floor((Date.now() - new Date(child.birthday).getTime()) / 86400000);
  }, [child]);

  const growthStage = useMemo(() => getGrowthStage(child?.total_points ?? 0), [child]);

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 px-5 py-6 pb-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex items-center justify-between rounded-[28px] bg-white border border-slate-200 p-5 shadow-sm gap-3">
          <div className="min-w-0">
            <p className="text-sm text-teal-700 font-bold">사부작</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">아이 홈</h1>
            <p className="mt-2 text-sm text-slate-500">{today}</p>
          </div>

          {/* 성장형 동물 캐릭터 */}
          <div className={`flex flex-col items-center gap-1 rounded-[20px] px-4 py-3 flex-shrink-0 ${growthStage.bgColor}`}>
            <span className="text-4xl leading-none">{growthStage.emoji}</span>
            <span className={`text-xs font-bold ${growthStage.textColor}`}>{growthStage.name}</span>
            <span className="text-[10px] text-slate-400 text-center whitespace-nowrap">{growthStage.desc}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/child-settings')}
            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 text-lg text-slate-700 transition hover:bg-gray-300"
          >
            ⚙️
          </button>
        </header>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-900">
            {loading ? '자녀 정보를 불러오는 중이에요...' : `안녕, ${child?.name ?? '지우'}야!`}
          </h2>
          <p className="mt-3 text-sm text-slate-500">오늘의 루틴을 체크하고 재미있게 시작해요.</p>
          {daysSinceBirth !== null && (
            <p className="mt-2 text-sm font-semibold text-teal-600">
              🎂 태어난 지 {daysSinceBirth.toLocaleString('ko-KR')}일이 됐어요!
            </p>
          )}
        </section>

        <AdBanner slot={import.meta.env.VITE_ADSENSE_SLOT_TOP} />

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

        <AdBanner slot={import.meta.env.VITE_ADSENSE_SLOT_BOTTOM} />
      </div>
    </div>
  );
};

export default ChildHome;
