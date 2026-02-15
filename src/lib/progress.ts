/**
 * Progress storage and utilities for the Civ-style skill tree.
 */

export interface NodeProgress {
  status: 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered';
  levelsCompleted: number[];
  score: number;
  lastPracticed?: string;
}

export interface UserProgress {
  nodes: Record<string, NodeProgress>;
  totalXP: number;
  level: number;
  streak: number;
}

const STORAGE_KEY = 'atar-master-progress';

const DEFAULT_PROGRESS: UserProgress = {
  nodes: {},
  totalXP: 0,
  level: 1,
  streak: 0,
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_PROGRESS };
}

export function saveProgress(p: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function getNodeProgress(p: UserProgress, nodeId: string): NodeProgress {
  return p.nodes[nodeId] ?? { status: 'locked', levelsCompleted: [], score: 0 };
}

export function xpForLevel(level: number): number {
  return level * 100;
}

export function computeNodeStatus(
  nodeId: string,
  prerequisites: string[],
  progress: UserProgress,
): 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered' {
  const np = progress.nodes[nodeId];
  if (np) return np.status;
  // If no prerequisites, it's unlocked
  if (prerequisites.length === 0) return 'unlocked';
  // Check if all prereqs are completed/mastered
  const allDone = prerequisites.every(pid => {
    const pp = progress.nodes[pid];
    return pp && (pp.status === 'completed' || pp.status === 'mastered');
  });
  return allDone ? 'unlocked' : 'locked';
}
