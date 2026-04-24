import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Child = {
  id: string;
  parent_id: string;
  name: string;
  age: number;
  avatar?: string | null;
  total_points?: number;
  birthday?: string | null;
};

export function useChildren() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchChildren = async () => {
      setLoading(true);
      const session = await supabase.auth.getSession();
      const user = session?.data?.session?.user;

      if (!user) {
        if (mounted) {
          setChildren([]);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('children')
        .select('*')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: true });

      if (!mounted) return;
      if (error) {
        console.error('Failed to load children:', error.message);
        setChildren([]);
      } else {
        setChildren(data ?? []);
      }
      setLoading(false);
    };

    fetchChildren();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchChildren();
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setChildren([]);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const addChild = async (name: string, age: number, avatar?: string | null, birthday?: string | null) => {
    const session = await supabase.auth.getSession();
    const user = session?.data?.session?.user;
    if (!user) {
      throw new Error('로그인 후 시도해주세요.');
    }

    const { data, error } = await supabase
      .from('children')
      .insert({
        parent_id: user.id,
        name,
        age,
        avatar,
        birthday: birthday ?? null,
        total_points: 0,
      })
      .select('*')
      .single();

    if (error) {
      throw error;
    }

    setChildren((current) => [...current, data]);
    return data;
  };

  return {
    children,
    addChild,
    loading,
  };
}
