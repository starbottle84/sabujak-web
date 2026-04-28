import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export type CheckRoutineMeta = {
  name: string;
  type: string;
  category: string;
};

type RoutineLog = {
  id: string;
  routine_id: string;
  child_id: string;
  points?: number | null;
  approved: boolean;
  approved_at: string | null;
  created_at?: string | null;
};

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// 오늘 날짜 문자열 (YYYY-MM-DD, 로컬 기준)
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function todayKey(childId: string) {
  return `sabujakk-checked-${childId}-${todayStr()}`;
}
function loadTodayIds(childId: string): string[] {
  try { return JSON.parse(localStorage.getItem(todayKey(childId)) || '[]'); } catch { return []; }
}
function persistTodayId(childId: string, routineId: string) {
  const key = todayKey(childId);
  const ids = loadTodayIds(childId);
  if (!ids.includes(routineId)) localStorage.setItem(key, JSON.stringify([...ids, routineId]));
}

async function resolveRoutineUUID(
  routine_id: string,
  child_id: string,
  points: number,
  meta: CheckRoutineMeta
): Promise<string> {
  if (uuidRegex.test(routine_id)) return routine_id;

  const { data: existing } = await supabase
    .from('routines')
    .select('id')
    .eq('child_id', child_id)
    .eq('name', meta.name)
    .eq('type', meta.type)
    .limit(1)
    .maybeSingle();

  if (existing?.id) return existing.id;

  const { data: created, error } = await supabase
    .from('routines')
    .insert({ child_id, name: meta.name, points, type: meta.type, category: meta.category, is_active: true })
    .select('id')
    .single();

  if (error) throw error;
  return created.id;
}

export function useRoutineLogs(childId: string | null) {
  const [logs, setLogs] = useState<RoutineLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCheckedIds, setTodayCheckedIds] = useState<string[]>(() =>
    childId ? loadTodayIds(childId) : []
  );

  // childId 바뀔 때 오늘 체크 목록 재로드
  useEffect(() => {
    if (childId) setTodayCheckedIds(loadTodayIds(childId));
  }, [childId]);

  // 앱이 백그라운드에서 돌아올 때 날짜 변경 감지 → 자정 리셋
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && childId) {
        setTodayCheckedIds(loadTodayIds(childId));
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [childId]);

  useEffect(() => {
    let mounted = true;

    const fetchLogs = async () => {
      if (!childId) {
        if (mounted) { setLogs([]); setLoading(false); }
        return;
      }
      setLoading(true);
      const { data, error } = await supabase
        .from('routine_logs')
        .select('*')
        .eq('child_id', childId)
        .order('id', { ascending: false });

      if (!mounted) return;
      if (error) {
        console.error('Failed to load routine logs:', error.message);
        setLogs([]);
      } else {
        setLogs(data ?? []);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [childId]);

  const checkRoutine = async (
    routine_id: string,
    child_id: string,
    points: number,
    meta: CheckRoutineMeta
  ) => {
    const actualRoutineId = await resolveRoutineUUID(routine_id, child_id, points, meta);

    // 루틴 로그 삽입
    const { data, error } = await supabase
      .from('routine_logs')
      .insert({ routine_id: actualRoutineId, child_id, approved: false })
      .select('*')
      .single();

    if (error) throw error;

    // 포인트 즉시 적립 (부모 승인 없이 바로 누적)
    const { data: childData } = await supabase
      .from('children')
      .select('total_points')
      .eq('id', child_id)
      .single();

    const newTotal = (childData?.total_points ?? 0) + points;
    await supabase.from('children').update({ total_points: newTotal }).eq('id', child_id);

    // 오늘 체크 목록에 추가 (localStorage — 자정 자동 리셋)
    persistTodayId(child_id, routine_id);
    setTodayCheckedIds((prev) =>
      prev.includes(routine_id) ? prev : [...prev, routine_id]
    );

    const logWithPoints: RoutineLog = {
      ...data,
      routine_id,
      points,
      created_at: data.created_at ?? new Date().toISOString(),
    };
    setLogs((current) => [...current, logWithPoints]);
    return logWithPoints;
  };

  const uncheckRoutine = async (
    routine_id: string,
    child_id: string,
    points: number,
    meta: CheckRoutineMeta
  ) => {
    // 실제 UUID 조회
    let actualRoutineId: string | null = uuidRegex.test(routine_id) ? routine_id : null;
    if (!actualRoutineId) {
      const { data } = await supabase
        .from('routines')
        .select('id')
        .eq('child_id', child_id)
        .eq('name', meta.name)
        .eq('type', meta.type)
        .limit(1)
        .maybeSingle();
      actualRoutineId = data?.id ?? null;
    }

    // 해당 루틴의 가장 최근 로그 삭제
    let deletedId: string | null = null;
    if (actualRoutineId) {
      const { data: logRow } = await supabase
        .from('routine_logs')
        .select('id')
        .eq('child_id', child_id)
        .eq('routine_id', actualRoutineId)
        .order('id', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (logRow) {
        deletedId = logRow.id;
        await supabase.from('routine_logs').delete().eq('id', logRow.id);
      }
    }

    // 포인트 차감
    const { data: childData } = await supabase
      .from('children')
      .select('total_points')
      .eq('id', child_id)
      .single();
    const newTotal = Math.max(0, (childData?.total_points ?? 0) - points);
    await supabase.from('children').update({ total_points: newTotal }).eq('id', child_id);

    // localStorage + state 업데이트
    const key = todayKey(child_id);
    const ids = loadTodayIds(child_id);
    localStorage.setItem(key, JSON.stringify(ids.filter((id) => id !== routine_id)));
    setTodayCheckedIds((prev) => prev.filter((id) => id !== routine_id));
    if (deletedId) setLogs((prev) => prev.filter((l) => l.id !== deletedId));
  };

  // approveRoutine: 포인트는 체크 시 이미 적립되므로 승인 표시만
  const approveRoutine = async (log_id: string) => {
    const log = logs.find((item) => item.id === log_id);
    if (!log) throw new Error('승인할 로그를 찾을 수 없습니다.');

    const { error } = await supabase
      .from('routine_logs')
      .update({ approved: true, approved_at: new Date().toISOString() })
      .eq('id', log_id);

    if (error) throw error;

    setLogs((current) =>
      current.map((item) =>
        item.id === log_id
          ? { ...item, approved: true, approved_at: new Date().toISOString() }
          : item
      )
    );
    return true;
  };

  return { logs, checkRoutine, uncheckRoutine, approveRoutine, loading, todayCheckedIds };
}
