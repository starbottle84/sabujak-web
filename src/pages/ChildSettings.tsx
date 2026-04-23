import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useChildren } from '../hooks/useChildren';

type RoutineLog = {
  id: string;
  routine_id: string;
  child_id: string;
  points: number;
  approved: boolean;
  approved_at: string | null;
  created_at: string;
};

const ROUTINE_LABELS: Record<string, { label: string; icon: string }> = {
  wake: { label: '기상하기', icon: '⏰' },
  brush: { label: '양치하기', icon: '🪥' },
  toy: { label: '장난감 정리', icon: '📦' },
  tidy: { label: '장난감 정리', icon: '📦' },
  dress: { label: '옷 입기', icon: '👕' },
  wash: { label: '세수하기', icon: '🧼' },
  dinner: { label: '저녁 설거지', icon: '🍽️' },
  homework: { label: '숙제 확인하기', icon: '✏️' },
  read: { label: '책 읽기', icon: '📖' },
  bed: { label: '잠자리 정리', icon: '🛏️' },
};

const tabs = [
  { id: 'today', label: '오늘' },
  { id: 'week', label: '이번 주' },
  { id: 'all', label: '전체' },
] as const;

type TabKey = (typeof tabs)[number]['id'];

function formatRelativeDate(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date >= today) {
    return `오늘 ${date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
  }
  if (date >= yesterday) {
    return '어제';
  }
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function getRoutineMeta(routineId: string) {
  return ROUTINE_LABELS[routineId] ?? { label: routineId.replace(/[-_]/g, ' '), icon: '✏️' };
}

function getStartOfWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function getStartOfPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0, 0);
}

export default function ChildSettings() {
  const navigate = useNavigate();
  const { children, loading: childrenLoading } = useChildren();
  const [logs, setLogs] = useState<RoutineLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('today');

  const child = children[0] ?? null;
  const childId = child?.id ?? null;

  useEffect(() => {
    let mounted = true;

    const fetchLogs = async () => {
      if (!childId) {
        if (mounted) {
          setLogs([]);
          setLoading(false);
        }
        return;
      }

      setErrorMessage(null);
      setLoading(true);

      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('child_id', childId)
        .order('created_at', { ascending: false });

      if (!mounted) return;
      if (error) {
        setErrorMessage(error.message);
        setLogs([]);
      } else {
        setLogs(data ?? []);
      }
      setLoading(false);
    };

    fetchLogs();
    return () => {
      mounted = false;
    };
  }, [childId]);

  const now = useMemo(() => new Date(), []);
  const startOfToday = useMemo(() => new Date(now.getFullYear(), now.getMonth(), now.getDate()), [now]);
  const startOfWeek = useMemo(() => getStartOfWeek(now), [now]);
  const startOfMonth = useMemo(() => getStartOfMonth(now), [now]);
  const startOfPrevMonth = useMemo(() => getStartOfPreviousMonth(now), [now]);

  const totalPoints = child?.total_points ?? logs.reduce((sum, item) => sum + item.points, 0);
  const virtualMoney = totalPoints * 10;

  const todayLogs = logs.filter((item) => new Date(item.created_at) >= startOfToday);
  const weekLogs = logs.filter((item) => new Date(item.created_at) >= startOfWeek);
  const currentMonthLogs = logs.filter((item) => new Date(item.created_at) >= startOfMonth);
  const previousMonthLogs = logs.filter(
    (item) => new Date(item.created_at) >= startOfPrevMonth && new Date(item.created_at) < startOfMonth
  );

  const weekPoints = weekLogs.reduce((sum, item) => sum + item.points, 0);
  const monthDiffMoney =
    (currentMonthLogs.reduce((sum, item) => sum + item.points, 0) - previousMonthLogs.reduce((sum, item) => sum + item.points, 0)) * 10;

  const monthDiffText = monthDiffMoney >= 0
    ? `지난달보다 ${monthDiffMoney.toLocaleString('ko-KR')}원 더 모았어요!`
    : `지난달보다 ${Math.abs(monthDiffMoney).toLocaleString('ko-KR')}원 적게 모았어요.`;

  const activeLogs = useMemo(() => {
    if (activeTab === 'today') return todayLogs;
    if (activeTab === 'week') return weekLogs;
    return logs;
  }, [activeTab, logs, todayLogs, weekLogs]);

  const progressValue = Math.min(100, Math.round((totalPoints / 1500) * 100));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                ←
              </button>
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-slate-900">포인트 내역</h1>
                <p className="text-sm text-slate-500">열심히 모은 포인트와 용돈을 확인해요!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="rounded-3xl bg-slate-100 px-4 py-3 text-lg transition hover:bg-slate-200">🔔</button>
              <button type="button" className="rounded-3xl bg-slate-100 px-4 py-3 text-lg transition hover:bg-slate-200">⚙️</button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[32px] border border-slate-200 bg-emerald-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-3xl bg-white p-3 text-xl text-emerald-700">🪙</div>
              <span className="text-sm font-semibold text-emerald-700">전체 누계</span>
            </div>
            <p className="mt-6 text-4xl font-bold text-slate-900">{totalPoints.toLocaleString('ko-KR')}P</p>
            <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-emerald-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progressValue}%` }} />
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-yellow-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-3xl bg-white p-3 text-xl text-amber-700">💰</div>
              <span className="text-sm font-semibold text-amber-700">가상 용돈</span>
            </div>
            <p className="mt-6 text-4xl font-bold text-slate-900">{virtualMoney.toLocaleString('ko-KR')}원</p>
            <p className="mt-4 text-sm font-semibold text-emerald-700">{monthDiffText}</p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-rose-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="rounded-3xl bg-white p-3 text-xl text-rose-700">📅</div>
              <span className="text-sm font-semibold text-rose-700">이번 주</span>
            </div>
            <p className="mt-6 text-4xl font-bold text-slate-900">{weekPoints.toLocaleString('ko-KR')}P</p>
            <p className="mt-4 text-sm text-slate-500">오늘의 목표까지 {Math.max(0, 210 - weekPoints)}P 남았어요</p>
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3 px-4 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          {childrenLoading || loading ? (
            <div className="py-20 text-center text-sm text-slate-500">데이터를 불러오는 중이에요...</div>
          ) : errorMessage ? (
            <div className="rounded-3xl bg-rose-50 px-4 py-4 text-sm text-rose-700">{errorMessage}</div>
          ) : !child ? (
            <div className="py-20 text-center text-sm text-slate-500">등록된 자녀가 없습니다.</div>
          ) : activeLogs.length === 0 ? (
            <div className="py-20 text-center text-sm text-slate-500">선택한 기간에 기록된 루틴이 없어요.</div>
          ) : (
            <div className="space-y-4">
              {activeLogs.map((log) => {
                const meta = getRoutineMeta(log.routine_id);
                return (
                  <div key={log.id} className="flex items-center justify-between rounded-[28px] border border-slate-200 bg-slate-50 px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-xl shadow-sm">
                        {meta.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{meta.label}</p>
                        <p className="text-xs text-slate-500">{formatRelativeDate(log.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white px-3 py-2 text-sm font-semibold text-teal-700">+{log.points}P</span>
                      <span className={`rounded-full px-3 py-2 text-xs font-semibold ${
                        log.approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {log.approved ? '✓ 승인' : '⏳ 대기'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              <span className="text-lg">✨</span>
              더 많은 루틴을 완료하고 포인트를 모아보세요!
            </div>
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="rounded-full bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              오늘의 루틴 보러가기
            </button>
          </div>
          <div className="absolute bottom-5 right-5 hidden h-28 w-28 items-center justify-center rounded-full bg-slate-100 text-4xl shadow-xl sm:flex">
            🐰
          </div>
        </section>
      </div>
    </div>
  );
}
