import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { syncFromCloud, scheduleSyncToCloud } from '../lib/cloudSync'
import { ADMIN_EMAILS } from '../lib/constants'
import type { User, AuthError } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  isPro: boolean
  isAdmin: boolean
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)

  const isAdmin = useMemo(() => {
    return !!user?.email && ADMIN_EMAILS.includes(user.email)
  }, [user])

  const checkPro = useCallback(async (u: User | null) => {
    if (!u) { setIsPro(false); return }
    // Admin emails always get Pro
    if (u.email && ADMIN_EMAILS.includes(u.email)) { setIsPro(true); return }
    // Check user metadata first
    if (u.user_metadata?.is_pro) { setIsPro(true); return }
    // Then check subscriptions table
    try {
      const { data } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', u.id)
        .eq('status', 'active')
        .maybeSingle()
      setIsPro(!!data)
    } catch (error) {
      console.error('Failed to check user subscription status:', error);
      setIsPro(false)
    }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      checkPro(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null
      setUser(u)
      checkPro(u)
      setLoading(false)

      // Sync from cloud on sign-in
      if (u && (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED')) {
        try { await syncFromCloud(u.id) } catch (e) { console.error('[auth] cloud sync failed:', e) }
      }

      // Redirect to skill-tree after sign-in if on landing or pricing page
      if (_event === 'SIGNED_IN' && u) {
        const path = window.location.pathname
        if (path === '/' || path === '/pricing') {
          window.location.href = '/skill-tree'
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [checkPro])

  // Listen for progress changes and debounced-sync to cloud
  const userRef = useRef(user)
  userRef.current = user

  useEffect(() => {
    const handler = () => {
      if (userRef.current) scheduleSyncToCloud(userRef.current.id)
    }
    window.addEventListener('progress-change', handler)
    return () => window.removeEventListener('progress-change', handler)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password })
    return { error }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://atarmaster.com/skill-tree' },
    })
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsPro(false)
    window.location.href = '/'
  }, [])

  return useMemo(() => ({
    user, loading, isPro, isAdmin, signUp, signIn, signInWithGoogle, signOut,
  }), [user, loading, isPro, isAdmin, signUp, signIn, signInWithGoogle, signOut])
}
