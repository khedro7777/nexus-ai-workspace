import { useState, useEffect } from 'react';
import { supabase, SupabaseService } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export const useSupabase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    return { data, error };
  };

  const updateProfile = async (updates: any) => {
    if (!user) return { error: new Error('No user logged in') };
    
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    return { data, error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
    supabase,
    SupabaseService
  };
};

export const useSupabaseTable = (tableName: string, filters?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [tableName, JSON.stringify(filters)]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase.from(tableName).select('*');
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setData(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const insert = async (newData: any) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData)
        .select();
      
      if (error) throw error;
      
      setData(prev => [...prev, ...(data || [])]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  const update = async (id: string, updates: any) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  const remove = async (id: string) => {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setData(prev => prev.filter(item => item.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err.message };
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    insert,
    update,
    remove
  };
};

export const useSupabaseRealtime = (tableName: string, callback: (payload: any) => void) => {
  useEffect(() => {
    const subscription = SupabaseService.subscribeToTable(tableName, callback);
    
    return () => {
      subscription.unsubscribe();
    };
  }, [tableName, callback]);
};

