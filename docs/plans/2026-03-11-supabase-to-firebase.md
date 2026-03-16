# Supabase → Firebase Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all Supabase usage (auth, database, cloud functions) with Firebase, sharing the existing `euler-selective-league` Firebase project.

**Architecture:** Firebase Auth for authentication, Firestore for subscriptions + user progress data, Firebase Cloud Functions for Stripe checkout/webhook. All Firestore collections prefixed with `atar_` to isolate from Selective app data.

**Tech Stack:** Firebase SDK ^10.14.1, Firebase Admin SDK ^12.0.0, Firebase Functions ^6.3.0, Stripe ^14.0.0

---

### Task 1: Install Firebase, remove Supabase dependency

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`

**Step 1: Install Firebase and remove Supabase**

Run: `npm uninstall @supabase/supabase-js && npm install firebase@^10.14.1`
Expected: package.json updated, node_modules updated

**Step 2: Update vite.config.ts manual chunks**

Replace `vendor-supabase` chunk with `vendor-firebase`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/functions'],
          'vendor-katex': ['katex'],
          'exam-data': [
            './src/data/exams/index.ts',
          ],
        },
      },
    },
  },
})
```

**Step 3: Commit**

```bash
git add package.json package-lock.json vite.config.ts
git commit -m "chore: replace supabase with firebase dependency"
```

---

### Task 2: Create Firebase client

**Files:**
- Create: `src/services/firebaseClient.ts`
- Delete: `src/lib/supabase.ts`

**Step 1: Create `src/services/firebaseClient.ts`**

Copy the exact pattern from Selective project, using the same Firebase project config:

```typescript
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeFirestore, Firestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  setPersistence(auth, browserLocalPersistence);
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
  googleProvider = new GoogleAuthProvider();
}

export { app, auth, db, googleProvider };

export const isFirebaseConfigured = (): boolean => {
  return !!app;
};
```

**Step 2: Create `.env.local` with Firebase config**

```
# Firebase Configuration (shared with euler-selective-league)
VITE_FIREBASE_API_KEY=AIzaSyBXZabBYg3_LXti0J2Y2d--ghgKGMRkQzI
VITE_FIREBASE_AUTH_DOMAIN=euler-selective-league.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=euler-selective-league
VITE_FIREBASE_STORAGE_BUCKET=euler-selective-league.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=726789544040
VITE_FIREBASE_APP_ID=1:726789544040:web:77f22a0fb7cf60319083dd

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51T0u3ZH3RCPIiRpCF91dRNJierm31fgL1rIbHpLjo4ek10BLSMSBjt9vyJFUqK6GSa28eUIbPahHB4NJ4d21cr4H00vtHll6Si
```

**Step 3: Update `.env.example`**

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_STRIPE_PUBLISHABLE_KEY=
```

**Step 4: Delete `src/lib/supabase.ts`**

Run: `rm src/lib/supabase.ts`

**Step 5: Commit**

```bash
git add src/services/firebaseClient.ts .env.example src/lib/supabase.ts
git commit -m "feat: add Firebase client, remove Supabase client"
```

Note: Do NOT commit `.env.local` (it contains secrets). Add it to `.gitignore` if not already there.

---

### Task 3: Rewrite `useAuth` hook for Firebase

**Files:**
- Modify: `src/hooks/useAuth.ts`
- Modify: `src/lib/constants.ts` (remove Supabase User type)

**Step 1: Update `src/lib/constants.ts`**

Replace the Supabase `User` type import with Firebase `User`:

```typescript
/**
 * Application constants
 */

import type { User } from 'firebase/auth';

/** Years available on the free tier (older, less exam-relevant papers). */
export const FREE_YEARS = new Set([2018, 2019, 2020]);

/** Check whether an exam paper ID (e.g. "mm-2019-exam1") belongs to the free tier. */
export function isFreePaper(paperId: string): boolean {
  const match = paperId.match(/^mm-(\d{4})/);
  if (!match) return false;
  return FREE_YEARS.has(Number(match[1]));
}

export const ADMIN_EMAILS = ['wangmengjames@gmail.com', 'drjarvisw@gmail.com'] as const;

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email as (typeof ADMIN_EMAILS)[number]);
}

/**
 * Check admin status by email.
 */
export function isAdminUser(user?: User | null): boolean {
  if (!user) return false;
  return isAdminEmail(user.email);
}
```

**Step 2: Rewrite `src/hooks/useAuth.ts`**

```typescript
import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db, googleProvider } from '../services/firebaseClient'
import { syncFromCloud, scheduleSyncToCloud } from '../lib/cloudSync'
import { isAdminEmail, isAdminUser } from '../lib/constants'
import type { User } from 'firebase/auth'

interface AuthError {
  message: string
}

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

  const isAdmin = useMemo(() => isAdminUser(user), [user])

  const checkPro = useCallback(async (u: User | null) => {
    if (!u) { setIsPro(false); return }
    if (isAdminEmail(u.email) || isAdminUser(u)) { setIsPro(true); return }
    // Check atar_subscriptions collection in Firestore
    if (!db) { setIsPro(false); return }
    try {
      const subDoc = await getDoc(doc(db, 'atar_subscriptions', u.uid))
      if (subDoc.exists()) {
        const data = subDoc.data()
        setIsPro(data.plan === 'pro' && data.status === 'active')
      } else {
        setIsPro(false)
      }
    } catch (error) {
      console.error('Failed to check user subscription status:', error)
      setIsPro(false)
    }
  }, [])

  useEffect(() => {
    if (!auth) { setLoading(false); return }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const prev = user
      setUser(firebaseUser)
      checkPro(firebaseUser)
      setLoading(false)

      // Sync from cloud on sign-in
      if (firebaseUser && !prev) {
        try { await syncFromCloud(firebaseUser.uid) } catch (e) { console.error('[auth] cloud sync failed:', e) }
        // Redirect to skill-tree if on landing page
        const path = window.location.pathname
        if (path === '/') {
          window.location.href = '/skill-tree'
        }
      }

      if (!firebaseUser && prev) {
        window.location.replace('/auth')
      }
    })

    return () => unsubscribe()
  }, [checkPro]) // eslint-disable-line react-hooks/exhaustive-deps

  // Listen for progress changes and debounced-sync to cloud
  const userRef = useRef(user)
  userRef.current = user

  useEffect(() => {
    const handler = () => {
      if (userRef.current) scheduleSyncToCloud(userRef.current.uid)
    }
    window.addEventListener('progress-change', handler)
    return () => window.removeEventListener('progress-change', handler)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    if (!auth) return { error: { message: 'Firebase not configured' } }
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign up failed'
      return { error: { message } }
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!auth) return { error: { message: 'Firebase not configured' } }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      return { error: { message } }
    }
  }, [])

  const handleSignInWithGoogle = useCallback(async () => {
    if (!auth || !googleProvider) return { error: { message: 'Firebase not configured' } }
    try {
      await signInWithPopup(auth, googleProvider)
      return { error: null }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google sign in failed'
      return { error: { message } }
    }
  }, [])

  const handleSignOut = useCallback(async () => {
    if (!auth) return
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      console.error('[auth] signOut failed:', error)
    }
    setUser(null)
    setIsPro(false)
    window.location.replace('/auth')
  }, [])

  return useMemo(() => ({
    user, loading, isPro, isAdmin,
    signUp, signIn,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
  }), [user, loading, isPro, isAdmin, signUp, signIn, handleSignInWithGoogle, handleSignOut])
}
```

**Step 3: Verify build compiles**

Run: `npx tsc --noEmit`
Expected: No errors (may have errors from other files that still import supabase — those will be fixed in subsequent tasks)

**Step 4: Commit**

```bash
git add src/hooks/useAuth.ts src/lib/constants.ts
git commit -m "feat: rewrite useAuth hook for Firebase Auth + Firestore"
```

---

### Task 4: Rewrite `cloudSync.ts` for Firestore

**Files:**
- Modify: `src/lib/cloudSync.ts`

**Step 1: Replace the entire file**

The merge logic stays identical. Only the Supabase API calls change to Firestore:

```typescript
/**
 * Cloud sync: localStorage progress ↔ Firestore atar_user_progress collection.
 *
 * Data synced:
 *  - progress_data: completed questions, weak questions, practice minutes, recent sessions
 *  - streak_data: streak count, last practice date, active dates (from streak.ts)
 *  - achievements_data: skill-tree node progress (from progress.ts)
 */

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseClient';

// ── localStorage keys (mirrors useProgress.ts + streak.ts + progress.ts) ──

const KEYS = {
  completed: 'atar-completed',
  weak: 'atar-weak',
  streak: 'atar-streak',
  lastPracticeDate: 'atar-last-practice-date',
  practiceMinutes: 'atar-practice-minutes',
  recentSessions: 'atar-recent-sessions',
  streakV2: 'atar_streak',
  skillTree: 'atar-master-progress',
} as const;

// ── Types ─────────────────────────────────────────────────────

interface ProgressData {
  completed: string[];
  weak: string[];
  practiceMinutes: number;
  recentSessions: unknown[];
  updatedAt: string;
}

interface StreakCloudData {
  streak: number;
  lastPracticeDate: string | null;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  activeDates: string[];
  updatedAt: string;
}

interface AchievementsData {
  skillTree: Record<string, unknown>;
  updatedAt: string;
}

// ── Helpers ───────────────────────────────────────────────────

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event('progress-change'));
}

function now(): string {
  return new Date().toISOString();
}

// ── Gather local data ─────────────────────────────────────────

function gatherProgressData(): ProgressData {
  return {
    completed: readLS<string[]>(KEYS.completed, []),
    weak: readLS<string[]>(KEYS.weak, []),
    practiceMinutes: readLS<number>(KEYS.practiceMinutes, 0),
    recentSessions: readLS<unknown[]>(KEYS.recentSessions, []),
    updatedAt: now(),
  };
}

function gatherStreakData(): StreakCloudData {
  const v2 = readLS<{
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;
    activeDates: string[];
  }>(KEYS.streakV2, { currentStreak: 0, longestStreak: 0, lastActiveDate: '', activeDates: [] });

  return {
    streak: readLS<number>(KEYS.streak, 0),
    lastPracticeDate: readLS<string | null>(KEYS.lastPracticeDate, null),
    currentStreak: v2.currentStreak,
    longestStreak: v2.longestStreak,
    lastActiveDate: v2.lastActiveDate,
    activeDates: v2.activeDates,
    updatedAt: now(),
  };
}

function gatherAchievementsData(): AchievementsData {
  return {
    skillTree: readLS<Record<string, unknown>>(KEYS.skillTree, {}),
    updatedAt: now(),
  };
}

// ── Merge logic ───────────────────────────────────────────────

function mergeProgress(local: ProgressData, cloud: ProgressData): ProgressData {
  const completed = Array.from(new Set([...local.completed, ...cloud.completed]));
  const weak = Array.from(new Set([...local.weak, ...cloud.weak]))
    .filter((id) => !completed.includes(id));
  const practiceMinutes = Math.max(local.practiceMinutes, cloud.practiceMinutes);

  const sessionKey = (s: Record<string, unknown>) => `${s.date}|${s.mode}`;
  const sessionMap = new Map<string, unknown>();
  for (const s of [...(cloud.recentSessions as Record<string, unknown>[]),
                    ...(local.recentSessions as Record<string, unknown>[])]) {
    const rec = s as Record<string, unknown>;
    sessionMap.set(sessionKey(rec), rec);
  }
  const recentSessions = Array.from(sessionMap.values()).slice(0, 20);

  return { completed, weak, practiceMinutes, recentSessions, updatedAt: now() };
}

function mergeStreak(local: StreakCloudData, cloud: StreakCloudData): StreakCloudData {
  const activeDates = Array.from(new Set([...local.activeDates, ...cloud.activeDates])).sort();
  return {
    streak: Math.max(local.streak, cloud.streak),
    lastPracticeDate:
      (local.lastPracticeDate ?? '') >= (cloud.lastPracticeDate ?? '')
        ? local.lastPracticeDate
        : cloud.lastPracticeDate,
    currentStreak: Math.max(local.currentStreak, cloud.currentStreak),
    longestStreak: Math.max(local.longestStreak, cloud.longestStreak),
    lastActiveDate:
      local.lastActiveDate >= cloud.lastActiveDate ? local.lastActiveDate : cloud.lastActiveDate,
    activeDates,
    updatedAt: now(),
  };
}

function mergeAchievements(local: AchievementsData, cloud: AchievementsData): AchievementsData {
  const STATUS_RANK: Record<string, number> = {
    locked: 0, unlocked: 1, 'in-progress': 2, completed: 3, mastered: 4,
  };
  const localTree = (local.skillTree?.nodes ?? local.skillTree ?? {}) as Record<string, Record<string, unknown>>;
  const cloudTree = (cloud.skillTree?.nodes ?? cloud.skillTree ?? {}) as Record<string, Record<string, unknown>>;
  const allKeys = new Set([...Object.keys(localTree), ...Object.keys(cloudTree)]);
  const merged: Record<string, unknown> = { ...(local.skillTree as Record<string, unknown>) };

  const nodes: Record<string, unknown> = {};
  for (const key of allKeys) {
    const l = localTree[key] as Record<string, unknown> | undefined;
    const c = cloudTree[key] as Record<string, unknown> | undefined;
    if (!l) { nodes[key] = c; continue; }
    if (!c) { nodes[key] = l; continue; }
    const lRank = STATUS_RANK[l.status as string] ?? 0;
    const cRank = STATUS_RANK[c.status as string] ?? 0;
    const best = lRank >= cRank ? { ...l } : { ...c };
    best.score = Math.max((l.score as number) ?? 0, (c.score as number) ?? 0);
    best.levelsCompleted = Array.from(
      new Set([...((l.levelsCompleted as number[]) ?? []), ...((c.levelsCompleted as number[]) ?? [])]),
    ).sort((a, b) => a - b);
    nodes[key] = best;
  }
  merged.nodes = nodes;

  return { skillTree: merged, updatedAt: now() };
}

// ── Apply cloud data to localStorage ──────────────────────────

function applyProgressToLocal(data: ProgressData) {
  writeLS(KEYS.completed, data.completed);
  writeLS(KEYS.weak, data.weak);
  writeLS(KEYS.practiceMinutes, data.practiceMinutes);
  writeLS(KEYS.recentSessions, data.recentSessions);
}

function applyStreakToLocal(data: StreakCloudData) {
  writeLS(KEYS.streak, data.streak);
  writeLS(KEYS.lastPracticeDate, data.lastPracticeDate);
  writeLS(KEYS.streakV2, {
    currentStreak: data.currentStreak,
    longestStreak: data.longestStreak,
    lastActiveDate: data.lastActiveDate,
    activeDates: data.activeDates,
  });
}

function applyAchievementsToLocal(data: AchievementsData) {
  writeLS(KEYS.skillTree, data.skillTree);
}

// ── Public API ────────────────────────────────────────────────

export async function syncToCloud(userId: string): Promise<void> {
  if (!db) return;

  const localProgress = gatherProgressData();
  const localStreak = gatherStreakData();
  const localAchievements = gatherAchievementsData();

  // Read latest cloud snapshot first to avoid overwrite on multi-device sessions
  const docRef = doc(db, 'atar_user_progress', userId);
  const snapshot = await getDoc(docRef);
  const existing = snapshot.exists() ? snapshot.data() : null;

  const progress_data = existing
    ? mergeProgress(localProgress, existing.progress_data as ProgressData)
    : localProgress;
  const streak_data = existing
    ? mergeStreak(localStreak, existing.streak_data as StreakCloudData)
    : localStreak;
  const achievements_data = existing
    ? mergeAchievements(localAchievements, existing.achievements_data as AchievementsData)
    : localAchievements;

  await setDoc(docRef, {
    progress_data,
    streak_data,
    achievements_data,
    updated_at: now(),
  }, { merge: true });
}

export async function syncFromCloud(userId: string): Promise<void> {
  if (!db) return;

  const docRef = doc(db, 'atar_user_progress', userId);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    // No cloud data yet — push local to cloud
    await syncToCloud(userId);
    return;
  }

  const data = snapshot.data();

  // Merge and apply
  const localProgress = gatherProgressData();
  const localStreak = gatherStreakData();
  const localAchievements = gatherAchievementsData();

  const mergedProgress = mergeProgress(localProgress, data.progress_data as ProgressData);
  const mergedStreak = mergeStreak(localStreak, data.streak_data as StreakCloudData);
  const mergedAchievements = mergeAchievements(localAchievements, data.achievements_data as AchievementsData);

  applyProgressToLocal(mergedProgress);
  applyStreakToLocal(mergedStreak);
  applyAchievementsToLocal(mergedAchievements);

  // Push merged data back to cloud
  await syncToCloud(userId);
}

// ── Debounced push ────────────────────────────────────────────

let lastPushTime = 0;
let pendingPush: ReturnType<typeof setTimeout> | null = null;

const DEBOUNCE_MS = 30_000; // 30 seconds

export function scheduleSyncToCloud(userId: string): void {
  const elapsed = Date.now() - lastPushTime;

  if (pendingPush) clearTimeout(pendingPush);

  if (elapsed >= DEBOUNCE_MS) {
    lastPushTime = Date.now();
    syncToCloud(userId).catch(console.error);
  } else {
    pendingPush = setTimeout(() => {
      lastPushTime = Date.now();
      pendingPush = null;
      syncToCloud(userId).catch(console.error);
    }, DEBOUNCE_MS - elapsed);
  }
}
```

**Step 2: Commit**

```bash
git add src/lib/cloudSync.ts
git commit -m "feat: rewrite cloudSync for Firestore"
```

---

### Task 5: Rewrite `stripe.ts` for Firebase Cloud Functions

**Files:**
- Modify: `src/lib/stripe.ts`

**Step 1: Replace the file**

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../services/firebaseClient';

// Stripe publishable key from environment variables
export const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

// Live mode price IDs
export const PRICE_PRO_MONTHLY = 'price_1T12VEH3RCPIiRpCcMASHDhz' as const
export const PRICE_PRO_YEARLY = 'price_1T12VEH3RCPIiRpCggPyLE0w' as const

export const PLANS = {
  free: 'free',
  pro: 'pro',
} as const

export type Plan = (typeof PLANS)[keyof typeof PLANS]

export async function createCheckoutSession(
  priceId: string,
): Promise<{ url: string }> {
  if (!app) {
    throw new Error('Firebase not configured')
  }

  const functions = getFunctions(app);
  const createSession = httpsCallable<{ priceId: string }, { url: string }>(
    functions,
    'atarCreateCheckoutSession'
  );

  const result = await createSession({ priceId });
  return result.data;
}
```

**Step 2: Commit**

```bash
git add src/lib/stripe.ts
git commit -m "feat: rewrite stripe.ts to use Firebase callable function"
```

---

### Task 6: Update AuthModal and AuthGuard for Firebase User type

**Files:**
- Modify: `src/components/AuthModal.tsx`
- Modify: `src/components/AuthGuard.tsx`

**Step 1: Check and update AuthModal**

`AuthModal.tsx` uses `useAuth()` which returns the same interface shape. The component should work without changes since it only calls `signIn`, `signUp`, `signInWithGoogle` and reads `error.message`. **No changes needed** — verify this by checking imports.

The only difference: Firebase `createUserWithEmailAndPassword` does NOT send a confirmation email by default like Supabase did. The `confirmSent` state in AuthModal sets to `true` after signUp, showing "Check your email". With Firebase, the user is immediately signed in after registration, so the `onAuthStateChanged` listener will fire and redirect.

Update AuthModal to skip the confirmation screen on sign-up (Firebase signs in immediately):

In `src/components/AuthModal.tsx`, change the sign-up handler — after `signUp` succeeds, call `onSuccess?.()` instead of showing confirmation:

```typescript
      } else {
        const { error: err } = await signUp(email, password)
        if (err) { setError(err.message); return }
        onSuccess?.()
      }
```

**Step 2: Verify AuthGuard**

`AuthGuard.tsx` uses `useAuth()` → `{ user, loading }`. The `user` type changed from Supabase `User` to Firebase `User`, but `AuthGuard` only checks truthiness. **No changes needed.**

**Step 3: Commit**

```bash
git add src/components/AuthModal.tsx
git commit -m "fix: skip email confirmation screen (Firebase signs in immediately)"
```

---

### Task 7: Fix all remaining Supabase imports across codebase

**Files:**
- Search all `.ts` and `.tsx` files for `supabase` imports

**Step 1: Search for remaining Supabase references**

Run: `grep -r "supabase\|@supabase" src/ --include="*.ts" --include="*.tsx" -l`

Fix every file found. Common patterns:
- `import type { User } from '@supabase/supabase-js'` → `import type { User } from 'firebase/auth'`
- `user.id` → `user.uid` (Supabase uses `.id`, Firebase uses `.uid`)
- `user.user_metadata` → not available in Firebase (remove or use custom claims)

**Step 2: Search for `user.id` references that need to become `user.uid`**

Run: `grep -rn "user\.id\b" src/ --include="*.ts" --include="*.tsx"`

Replace all `user.id` with `user.uid` in auth-related contexts.

**Step 3: Verify build**

Run: `npx tsc --noEmit`
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add -u src/
git commit -m "fix: update all Supabase imports and user.id → user.uid"
```

---

### Task 8: Add Cloud Functions for Stripe (in Selective project)

**Files:**
- Modify: `/Users/ultron/Library/CloudStorage/GoogleDrive-wangmengjames@gmail.com/My Drive/Claude/Projects/Claude/Euler's Selective League/functions/src/index.ts`

**Step 1: Add atar-specific functions to the existing Cloud Functions file**

Append to the existing `functions/src/index.ts` in the Selective project:

```typescript
// ═══════════════════════════════════════════════════════════════
// ATAR Master functions (separate from Selective League)
// ═══════════════════════════════════════════════════════════════

const ATAR_VALID_PRICE_IDS = new Set([
  'price_1T12VEH3RCPIiRpCcMASHDhz', // Pro Monthly
  'price_1T12VEH3RCPIiRpCggPyLE0w', // Pro Yearly
]);

const atarStripeSecretKey = defineString("ATAR_STRIPE_SECRET_KEY");
const atarStripeWebhookSecret = defineString("ATAR_STRIPE_WEBHOOK_SECRET");

function getAtarStripe(): Stripe {
  return new Stripe(atarStripeSecretKey.value());
}

export const atarCreateCheckoutSession = onCall(
  { cors: true },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }

    const stripe = getAtarStripe();
    const firestore = admin.firestore();
    const subDoc = await firestore.doc(`atar_subscriptions/${uid}`).get();
    const subData = subDoc.data();

    // Already pro — no need to pay again
    if (subData?.plan === 'pro' && subData?.status === 'active') {
      throw new HttpsError("already-exists", "You already have Pro.");
    }

    const { priceId } = request.data;
    if (!priceId || !ATAR_VALID_PRICE_IDS.has(priceId)) {
      throw new HttpsError("invalid-argument", "Invalid priceId.");
    }

    // Reuse or create Stripe customer
    let customerId = subData?.stripe_customer_id as string | undefined;

    if (!customerId) {
      const authUser = await admin.auth().getUser(uid);
      const customer = await stripe.customers.create({
        email: authUser.email,
        metadata: { firebase_uid: uid },
      });
      customerId = customer.id;

      await firestore.doc(`atar_subscriptions/${uid}`).set({
        stripe_customer_id: customerId,
        plan: 'free',
        status: 'active',
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    const origin = request.rawRequest?.headers?.origin || "https://atar-master.vercel.app";

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      metadata: { firebase_uid: uid },
    });

    return { url: session.url };
  }
);

export const atarStripeWebhook = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const stripe = getAtarStripe();
  const signature = req.headers["stripe-signature"];
  if (!signature) {
    res.status(400).send("Missing stripe-signature header");
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      signature,
      atarStripeWebhookSecret.value()
    );
  } catch (err) {
    console.error("ATAR webhook signature verification failed:", err);
    res.status(400).send("Invalid signature");
    return;
  }

  const firestore = admin.firestore();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const uid = session.metadata?.firebase_uid;
      if (!uid || !session.subscription) break;

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

      await firestore.doc(`atar_subscriptions/${uid}`).set({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: subscription.id,
        plan: 'pro',
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      console.log(`ATAR Pro activated for user ${uid}`);
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      // Find the doc by stripe_subscription_id
      const query = await firestore.collection('atar_subscriptions')
        .where('stripe_subscription_id', '==', subscription.id)
        .limit(1)
        .get();
      if (!query.empty) {
        await query.docs[0].ref.update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const query = await firestore.collection('atar_subscriptions')
        .where('stripe_subscription_id', '==', subscription.id)
        .limit(1)
        .get();
      if (!query.empty) {
        await query.docs[0].ref.update({
          plan: 'free',
          status: 'canceled',
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
      break;
    }
  }

  res.json({ received: true });
});
```

**Step 2: Set Firebase secrets for atar Stripe keys**

Run (from Selective project directory):
```bash
firebase functions:secrets:set ATAR_STRIPE_SECRET_KEY
firebase functions:secrets:set ATAR_STRIPE_WEBHOOK_SECRET
```

**Step 3: Deploy Cloud Functions**

Run: `cd functions && npm run build && cd .. && firebase deploy --only functions`

**Step 4: Commit (in Selective project)**

```bash
git add functions/src/index.ts
git commit -m "feat: add ATAR Master Stripe cloud functions"
```

---

### Task 9: Update Firestore security rules

**Files:**
- Modify: `/Users/ultron/Library/CloudStorage/GoogleDrive-wangmengjames@gmail.com/My Drive/Claude/Projects/Claude/Euler's Selective League/firestore.rules`

**Step 1: Add atar collection rules**

Add before the "Deny everything else" block:

```
    // ─── ATAR Master collections ───────────────────────────────

    // ATAR subscriptions — owner can read, only Cloud Functions write
    match /atar_subscriptions/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false;  // Only Cloud Functions (admin SDK) write
    }

    // ATAR user progress — owner can read/write
    match /atar_user_progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
```

**Step 2: Deploy rules**

Run: `firebase deploy --only firestore:rules`

**Step 3: Commit (in Selective project)**

```bash
git add firestore.rules
git commit -m "feat: add ATAR Master Firestore security rules"
```

---

### Task 10: Clean up Supabase artifacts

**Files:**
- Delete: `supabase/` directory (config, migrations, edge functions)
- Delete: `src/lib/supabase.ts` (if not already deleted)
- Modify: `.gitignore` (add `.env.local` if needed)

**Step 1: Remove supabase directory**

Run: `rm -rf supabase/`

**Step 2: Verify `.gitignore` includes `.env.local`**

Check and add if missing:
```
.env.local
```

**Step 3: Remove any remaining `@supabase` type references**

Run: `grep -r "@supabase" src/ --include="*.ts" --include="*.tsx" -l`
Fix any remaining files.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove all Supabase artifacts"
```

---

### Task 11: Build and smoke test

**Step 1: Full build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Local dev test**

Run: `npm run dev`

Test in browser:
- Landing page loads
- Auth modal opens (sign in / sign up)
- Google sign-in works
- Sign out works
- Progress syncs (check Firestore console)
- Pricing page loads
- Checkout redirect works (will need Cloud Functions deployed)

**Step 3: Commit any fixes**

```bash
git add -u
git commit -m "fix: address build/runtime issues from migration"
```

---

### Task 12: Update Vercel environment variables

**Step 1: Update Vercel env vars**

In Vercel dashboard for atar-master project:
- Remove: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Add: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
- Keep: `VITE_STRIPE_PUBLISHABLE_KEY` (same value)

**Step 2: Redeploy**

Push to main to trigger Vercel rebuild.
