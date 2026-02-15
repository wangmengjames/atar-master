import { trainingQuestions, type TrainingQuestion } from '../data/training';

const STORAGE_KEY = 'atar_daily_challenge';

export interface DailyChallengeState {
  date: string; // YYYY-MM-DD Melbourne
  questions: TrainingQuestion[];
  completed: boolean;
  score?: number;
  total?: number;
  timeSpent?: number; // seconds
  streak?: number; // consecutive days participated
}

/** Get today's date string in Melbourne timezone */
function getMelbourneDate(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' });
}

/** Simple seeded PRNG (mulberry32) */
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** Convert date string to numeric seed */
function dateSeed(date: string): number {
  let h = 0;
  for (let i = 0; i < date.length; i++) {
    h = Math.imul(31, h) + date.charCodeAt(i) | 0;
  }
  return h;
}

/** Pick one question per level (1-5) from different nodes */
export function getDailyChallenge(): TrainingQuestion[] {
  const date = getMelbourneDate();
  const rng = seededRandom(dateSeed(date));

  // Group all questions by level
  const byLevel: Record<number, TrainingQuestion[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const qs of Object.values(trainingQuestions)) {
    for (const q of qs) {
      if (q.level >= 1 && q.level <= 5 && q.isMultipleChoice) {
        byLevel[q.level].push(q);
      }
    }
  }

  const usedNodes = new Set<string>();
  const selected: TrainingQuestion[] = [];

  for (let level = 1; level <= 5; level++) {
    const candidates = byLevel[level].filter(q => !usedNodes.has(q.nodeId));
    if (candidates.length === 0) continue;
    // Shuffle with seeded random and pick first
    candidates.sort(() => rng() - 0.5);
    const pick = candidates[0];
    selected.push(pick);
    usedNodes.add(pick.nodeId);
  }

  return selected;
}

/** Read today's challenge state from localStorage */
export function getDailyChallengeState(): DailyChallengeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state: DailyChallengeState = JSON.parse(raw);
    if (state.date !== getMelbourneDate()) return null; // expired
    return state;
  } catch {
    return null;
  }
}

/** Save challenge result */
export function saveDailyChallengeResult(score: number, total: number, timeSpent: number): DailyChallengeState {
  const date = getMelbourneDate();
  const questions = getDailyChallenge();

  // Calculate participation streak
  let streak = 1;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const prev: DailyChallengeState = JSON.parse(raw);
      if (prev.completed) {
        const prevDate = new Date(prev.date + 'T00:00:00');
        const today = new Date(date + 'T00:00:00');
        const diff = Math.round((today.getTime() - prevDate.getTime()) / 86400000);
        if (diff === 1) streak = (prev.streak || 1) + 1;
        else if (diff === 0) streak = prev.streak || 1;
      }
    }
  } catch { /* ignore */ }

  const state: DailyChallengeState = {
    date,
    questions,
    completed: true,
    score,
    total,
    timeSpent,
    streak,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

/** Get seconds until Melbourne midnight */
export function getSecondsUntilRefresh(): number {
  const now = new Date();
  const melb = new Date(now.toLocaleString('en-US', { timeZone: 'Australia/Melbourne' }));
  const midnight = new Date(melb);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - melb.getTime()) / 1000));
}
