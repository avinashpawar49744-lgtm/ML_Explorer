import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) setProfile(null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!supabase || !user) return undefined;
    let active = true;
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (active) setProfile(data ?? null);
    });
    return () => { active = false; };
  }, [user]);

  const value = useMemo(() => ({
    user,
    profile,
    loading,
    isConfigured: isSupabaseConfigured,
    async login(email, password) {
      if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
      return supabase.auth.signInWithPassword({ email, password });
    },
    async register(email, password, fullName) {
      if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
      return supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
    },
    async logout() {
      if (!supabase) return { error: null };
      return supabase.auth.signOut();
    },
    async resetPassword(email, redirectTo = `${window.location.origin}/reset-password`) {
      if (!supabase) return { data: null, error: new Error('Supabase is not configured.') };
      return supabase.auth.resetPasswordForEmail(email, { redirectTo });
    },
    async refreshProfile() {
      if (!supabase || !user) return null;
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
      setProfile(data ?? null);
      return data;
    },
  }), [loading, profile, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
