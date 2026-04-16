import { useNavigate } from 'react-router-dom';

const Points = () => {
  const navigate = useNavigate();
  const weekPoints = 184;
  const totalPoints = 765;
  const pendingPoints = 24;
  const money = Math.floor(totalPoints / 100) * 1000;

  const rank = getRank(totalPoints);
  const nextThreshold = rank.nextThreshold;
  const progress = nextThreshold ? Math.min(100, Math.round((totalPoints / nextThreshold) * 100)) : 100;

  const weekData = [8, 12, 20, 18, 30, 40, 56];
  const history = [
    { date: '04/16', label: '아침 루틴 완료', points: 20 },
    { date: '04/15', label: '숙제 확인하기', points: 10 },
    { date: '04/14', label: '책가방 챙기기', points: 15 },
    { date: '04/13', label: '저녁 설거지 돕기', points: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 pb-28 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-teal-700">사부작</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">포인트 & 보상</h1>
              <p className="mt-2 text-sm text-slate-500">오늘의 성장과 가상 용돈 현황을 확인해 보세요.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              홈으로
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="오늘 획득" value="38P" accent="from-amber-400 to-yellow-200" />
          <SummaryCard label="이번 주 누계" value={`${weekPoints}P`} accent="from-emerald-400 to-emerald-100" />
          <SummaryCard label="전체 누계" value={`${totalPoints}P`} accent="from-sky-400 to-cyan-100" />
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">포인트 등급</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{rank.label}</h2>
              <p className="mt-2 text-sm text-slate-500">{rank.message}</p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              다음 등급까지 {nextThreshold ? `${nextThreshold - totalPoints}P` : '완료'}
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-slate-100 p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>진행률</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-teal-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">가상 용돈 환산</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">내 가상 용돈</h2>
              <p className="mt-2 text-4xl font-extrabold text-slate-900">{money.toLocaleString('ko-KR')}원</p>
            </div>
            <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              부모 승인 대기 중: <span className="font-semibold text-slate-900">{pendingPoints}P</span>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">이번 주 달성 현황</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">요일별 포인트 기록</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <span className="inline-flex h-3 w-3 rounded-full bg-amber-400" /> 아침
              <span className="inline-flex h-3 w-3 rounded-full bg-sky-500" /> 저녁
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-7">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
              <div key={day} className="space-y-2 text-center text-xs text-slate-500">
                <div className="mx-auto h-28 w-10">
                  <div className="relative h-full w-full rounded-full bg-slate-200">
                    <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-full bg-amber-400" style={{ height: `${Math.max(10, weekData[index] / 1.2)}%` }} />
                  </div>
                </div>
                <div>{day}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-7">
            {weekData.map((value, index) => (
              <div key={index} className="text-center text-sm font-semibold text-slate-900">{value}P</div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">최근 획득 내역</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">최근 활동</h2>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {history.map((item) => (
              <div key={item.date + item.label} className="flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-teal-700">+{item.points}P</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

function SummaryCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className={`rounded-[32px] border border-slate-200 bg-gradient-to-br ${accent} p-6 shadow-sm`}>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function getRank(points: number) {
  if (points >= 1000) {
    return { label: '🏆 챔피언', message: '루틴 마스터!', nextThreshold: null };
  }
  if (points >= 600) {
    return { label: '⭐ 별', message: '정말 잘하고 있어요!', nextThreshold: 1000 };
  }
  if (points >= 300) {
    return { label: '🌳 나무', message: '습관이 자라고 있어요!', nextThreshold: 600 };
  }
  if (points >= 100) {
    return { label: '🌿 새싹이', message: '꾸준히 하고 있어요!', nextThreshold: 300 };
  }
  return { label: '🌱 새싹', message: '루틴을 시작했어요!', nextThreshold: 100 };
}

export default Points;
