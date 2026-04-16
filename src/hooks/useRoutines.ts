import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Routine = {
  id: string;
  child_id: string;
  name: string;
  points: number;
  type: 'morning' | 'evening' | string;
  category: 'must' | 'extra' | string;
  is_active: boolean;
  created_at?: string;
};

export function useRoutines(childId: string | null, includeInactive = false) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchRoutines = async () => {
      if (!childId) {
        if (mounted) {
          setRoutines([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const query = supabase.from('routines').select('*').eq('child_id', childId).order('created_at', { ascending: true });
      const { data, error } = includeInactive
        ? await query
        : await query.eq('is_active', true);

      if (!mounted) return;
      if (error) {
        console.error('Failed to load routines:', error.message);
        setRoutines([]);
      } else {
        setRoutines(data ?? []);
      }
      setLoading(false);
    };

    fetchRoutines();
  }, [childId, includeInactive]);

  const toggleRoutine = (id: string) => {
    setRoutines((current) =>
      current.map((routine) =>
        routine.id === id ? { ...routine, is_active: !routine.is_active } : routine
      )
    );
  };

  const addRoutine = async (name: string, points: number, type: string, category: string) => {
    if (!childId) {
      throw new Error('자녀를 선택해주세요.');
    }

    const { data, error } = await supabase
      .from('routines')
      .insert({
        child_id: childId,
        name,
        points,
        type,
        category,
        is_active: true,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    setRoutines((current) => [...current, data]);
    return data;
  };

  const saveRoutineState = async () => {
    if (!childId) {
      throw new Error('자녀를 선택해주세요.');
    }

    const updates = routines.map((routine) => ({ id: routine.id, is_active: routine.is_active }));
    const { error } = await supabase.from('routines').upsert(updates);
    if (error) {
      throw error;
    }
    return true;
  };

  return {
    routines,
    toggleRoutine,
    addRoutine,
    saveRoutineState,
    loading,
  };
}
