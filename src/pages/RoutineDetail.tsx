import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useChildren } from '../hooks/useChildren';
import { useRoutines } from '../hooks/useRoutines';
import { useRoutineLogs } from '../hooks/useRoutineLogs';

type RoutineItem = {
  id: string;
  label?: string;
  name?: string;
  emoji?: string;
  points: number;
  category?: string;
};

const morningMustDo = [
  { id: 'wake', emoji: '🛌', label: '기상하기', points: 10 },
  { id: 'wash', emoji: '🧼', label: '세수하기', points: 10 },
  { id: 'brush', emoji: '🦷', label: '양치하기', points: 10 },
  { id: 'dress', emoji: '👕', label: '옷 입기', points: 10 },
  { id: 'breakfast', emoji: '🥣', label: '아침 먹기', points: 12 },
  { id: 'bed', emoji: '🛏️', label: '침대 정리', points: 12 },
];

const morningExtra = [
  { id: 'plant', emoji: '🌿', label: '식물 물주기', points: 15 },
  { id: 'toy', emoji: '🧸', label: '장난감 정리', points: 15 },
  { id: 'shoe', emoji: '👟', label: '신발 정리', points: 15 },
  { id: 'lunch', emoji: '🍱', label: '도시락 준비', points: 20 },
  { id: 'note', emoji: '📝', label: '오늘 계획 보기', points: 18 },
  { id: 'read', emoji: '📖', label: '책 5분 읽기', points: 20 },
];

const eveningMustDo = [
  { id: 'dinner', emoji: '🍽️', label: '저녁 먹기', points: 10 },
  { id: 'bath', emoji: '🛁', label: '목욕하기', points: 10 },
  { id: 'teeth', emoji: '🦷', label: '양치하기', points: 10 },
  { id: 'pjs', emoji: '🩳', label: '잠옷 입기', points: 10 },
  { id: 'story', emoji: '📚', label: '잠자리 동화', points: 12 },
  { id: 'bedtime', emoji: '🌙', label: '침대 정리', points: 12 },
];

const eveningExtra = [
  { id: 'star', emoji: '✨', label: '별 보기', points: 20 },
  { id: 'tidy', emoji: '🧹', label: '방 정리하기', points: 18 },
  { id: 'hug', emoji: '🤗', label: '가족 안아주기', points: 20 },
  { id: 'todo', emoji: '✅', label: '내일 준비하기', points: 20 },
  { id: 'draw', emoji: '🎨', label: '그림 5분', points: 18 },
  { id: 'music', emoji: '🎵', label: '조용히 듣기', points: 15 },
];

const progressWidthClasses: Record<number, string> = {
  0: 'w-0',
  5: 'w-[5%]',
  10: 'w-[10%]',
  15: 'w-[15%]',
  20: 'w-[20%]',
  25: 'w-[25%]',
  30: 'w-[30%]',
  35: 'w-[35%]',
  40: 'w-[40%]',
  45: 'w-[45%]',
  50: 'w-[50%]',
  55: 'w-[55%]',
  60: 'w-[60%]',
  65: 'w-[65%]',
  70: 'w-[70%]',
  75: 'w-[75%]',
  80: 'w-[80%]',
  85: 'w-[85%]',
  90: 'w-[90%]',
  95: 'w-[95%]',
  100: 'w-full',
};

const RoutineDetail = () => {
  const navigate = useNavigate();
  const params = useParams<{ type?: string }>();
  const routineType = params.type === 'evening' ? 'evening' : 'morning';
  const isMorning = routineType === 'morning';
  const title = isMorning ? '☀️ 아침 할일' : '🌙 저녁 할일';
  const { children } = useChildren();
  const child = children[0] ?? null;
  const { routines } = useRoutines(child?.id ?? null);
  const { logs, checkRoutine } = useRoutineLogs(child?.id ?? null);

  const mustDoItems: RoutineItem[] = routines.length
    ? routines.filter((routine) => routine.type === routineType && routine.category === 'must')
    : isMorning
    ? morningMustDo
    : eveningMustDo;

  const extraItems: RoutineItem[] = routines.length
    ? routines.filter((routine) => routine.type === routineType && routine.category === 'extra')
    : isMorning
    ? morningExtra
    : eveningExtra;

  const [checkingId, setCheckingId] = useState<string | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  const checkedIds = logs.map((log) => log.routine_id);
  const totalTasks = mustDoItems.length + extraItems.length;
  const completedCount = checkedIds.filter((id) => [...mustDoItems, ...extraItems].some((item) => item.id === id)).length;
  const progressValue = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progressValue / 5) * 5));
  const progressClass = progressWidthClasses[roundedProgress];

  const handleCheck = async (routine: any, category: 'must' | 'extra') => {
    if (!child || checkingId) return;
    if (checkedIds.includes(routine.id)) return;
    setCheckingId(routine.id);
    setCheckError(null);
    try {
      await checkRoutine(routine.id, child.id, routine.points, {
        name: routine.label ?? routine.name ?? routine.id,
        type: routineType,
        category,
      });
    } catch (err: any) {
      setCheckError(err?.message ?? '루틴 체크 중 오류가 발생했어요. 다시 시도해 주세요.');
    } finally {
      setCheckingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 px-4 py-5 pb-28">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center gap-3 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            ←
          </button>
          <div className="flex-1">
            <p className="text-sm text-slate-500">사부작</p>
            <h1 className="mt-0.5 text-xl font-semibold text-slate-900">루틴 상세</h1>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <span className="rounded-full bg-emerald-100 px-3 py-2">⭐</span>
            <div className="text-right">
              <div className="text-xs text-slate-500">오늘 획득</div>
              <div className="text-base font-bold text-slate-900">128포인트</div>
            </div>
          </div>
        </header>

        <main className="mt-6 space-y-6 overflow-y-auto pb-6">

          {checkError && (
            <div className="rounded-[20px] bg-rose-50 px-4 py-3 text-sm text-rose-700 border border-rose-200">
              ⚠️ {checkError}
            </div>
          )}

          <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm text-slate-500">오늘 완료 상태를 살펴보고 루틴을 체크해 보세요.</p>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {completedCount} / {totalTasks} 완료
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-emerald-200">
                <div className={`h-2 rounded-full bg-emerald-500 ${progressClass}`} />
              </div>
              <p className="text-sm text-slate-500">진행률 {progressValue}%</p>
            </div>
          </section>

          <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-3 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
              <span className="rounded-full bg-orange-100 px-2 py-1">해야할 사부작거리</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {mustDoItems.map((item) => {
                const completed = checkedIds.includes(item.id);
                const isChecking = checkingId === item.id;
                const emoji = item.emoji ?? '✅';
                const label = item.label ?? item.name ?? '루틴';
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCheck(item, 'must')}
                    disabled={completed || !!checkingId}
                    className="flex flex-col items-center gap-1 disabled:cursor-default"
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white text-2xl transition-all ${
                        completed
                          ? 'border-green-500 bg-green-100'
                          : isChecking
                          ? 'border-teal-400 bg-teal-50 animate-pulse'
                          : 'border-orange-300 active:scale-95'
                      }`}
                    >
                      {isChecking ? <span className="text-lg">⏳</span> : <span>{completed ? '✅' : emoji}</span>}
                    </div>
                    <p className="text-xs text-center text-slate-900">{label}</p>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {completed ? '완료!' : `+${item.points}P`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <span className="rounded-full bg-emerald-100 px-2 py-1">용돈 사부작거리</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {extraItems.map((item) => {
                const completed = checkedIds.includes(item.id);
                const isChecking = checkingId === item.id;
                const emoji = item.emoji ?? '✅';
                const label = item.label ?? item.name ?? '루틴';
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleCheck(item, 'extra')}
                    disabled={completed || !!checkingId}
                    className="flex flex-col items-center gap-1 disabled:cursor-default"
                  >
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white text-2xl transition-all ${
                        completed
                          ? 'border-green-500 bg-green-100'
                          : isChecking
                          ? 'border-teal-400 bg-teal-50 animate-pulse'
                          : 'border-green-300 active:scale-95'
                      }`}
                    >
                      {isChecking ? <span className="text-lg">⏳</span> : <span>{completed ? '✅' : emoji}</span>}
                    </div>
                    <p className="text-xs text-center text-slate-900">{label}</p>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${completed ? 'bg-green-100 text-green-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {completed ? '완료!' : `+${item.points}P`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RoutineDetail;
