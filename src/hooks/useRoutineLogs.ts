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

// localStorage로 오늘 체크한 루틴 ID 관리 — 날짜가 바뀌면 자동 리셋
function todayKey(childId: string) {
  return `sabujakk-checked-${childId}-${new Date().toISOString().slice(0, 10)}`;
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

  useEffect(() => {
    if (childId) setTodayCheckedIds(loadTodayIds(childId));
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

    const { data, error } = await supabase
      .from('routine_logs')
      .insert({ routine_id: actualRoutineId, child_id, approved: false })
      .select('*')
      .single();

    if (error) throw error;

    // 오늘 체크 목록에 추가 (날짜 기반 리셋용)
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

  const approveRoutine = async (log_id: string) => {
    const log = logs.find((item) => item.id === log_id);
    if (!log) throw new Error('승인할 로그를 찾을 수 없습니다.');

    const { error: updateError } = await supabase
      .from('routine_logs')
      .update({ approved: true, approved_at: new Date().toISOString() })
      .eq('id', log_id);

    if (updateError) throw updateError;

    const { data: childData, error: childError } = await supabase
      .from('children')
      .select('total_points')
      .eq('id', log.child_id)
      .single();

    if (childError) throw childError;

    const updatedTotal = (childData?.total_points ?? 0) + (log.points ?? 0);
    const { error: pointError } = await supabase
      .from('children')
      .update({ total_points: updatedTotal })
      .eq('id', log.child_id);

    if (pointError) throw pointError;

    setLogs((current) =>
      current.map((item) =>
        item.id === log_id
          ? { ...item, approved: true, approved_at: new Date().toISOString() }
          : item
      )
    );
    return true;
  };

  return { logs, checkRoutine, approveRoutine, loading, todayCheckedIds };
}
