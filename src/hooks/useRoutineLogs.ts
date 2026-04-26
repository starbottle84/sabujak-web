import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const KNOWN_ROUTINE_IDS = [
  'wake', 'wash', 'brush', 'dress', 'breakfast', 'bed',
  'plant', 'toy', 'shoe', 'lunch', 'note', 'read',
  'dinner', 'bath', 'teeth', 'pjs', 'story', 'bedtime',
  'star', 'tidy', 'hug', 'todo', 'draw', 'music',
];

function stringToUUID(str: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) return str;
  const hex = Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('')
    .padEnd(32, '0')
    .slice(0, 32);
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20,32)}`;
}

const UUID_TO_ROUTINE_ID: Record<string, string> = Object.fromEntries(
  KNOWN_ROUTINE_IDS.map(id => [stringToUUID(id), id])
);

function resolveRoutineId(value: string): string {
  return UUID_TO_ROUTINE_ID[value] ?? value;
}

type RoutineLog = {
  id: string;
  routine_id: string;
  child_id: string;
  points?: number | null;
  approved: boolean;
  approved_at: string | null;
  created_at?: string | null;
};

export function useRoutineLogs(childId: string | null) {
  const [logs, setLogs] = useState<RoutineLog[]>([]);
  const [loading, setLoading] = useState(true);

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

      setLoading(true);
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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
        const filtered = (data ?? [])
          .filter((log) => {
            if (!log.created_at) return true;
            return new Date(log.created_at) >= startOfDay;
          })
          .map((log) => ({
            ...log,
            routine_id: resolveRoutineId(log.routine_id),
          }));
        setLogs(filtered);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [childId]);

  const checkRoutine = async (routine_id: string, child_id: string, points: number) => {
    const { data, error } = await supabase
      .from('routine_logs')
      .insert({ routine_id: stringToUUID(routine_id), child_id, approved: false })
      .select('*')
      .single();

    if (error) throw error;

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

  return { logs, checkRoutine, approveRoutine, loading };
}
