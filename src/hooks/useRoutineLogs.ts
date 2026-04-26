import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

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
        const filtered = (data ?? []).filter((log) => {
          if (!log.created_at) return true;
          return new Date(log.created_at) >= startOfDay;
        });
        setLogs(filtered);
      }
      setLoading(false);
    };

    fetchLogs();
  }, [childId]);

  const checkRoutine = async (routine_id: string, child_id: string, points: number) => {
    // DB 스키마에 존재하는 컬럼만 INSERT (points, created_at은 없을 수 있음)
    const { data, error } = await supabase
      .from('routine_logs')
      .insert({ routine_id, child_id, approved: false })
      .select('*')
      .single();

    if (error) throw error;

    // DB에 없는 필드는 메모리 상태에서 보완
    const logWithPoints: RoutineLog = {
      ...data,
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
