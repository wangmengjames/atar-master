import { useState, useCallback, useEffect, useMemo } from 'react';
import { ArrowRight, RotateCcw, Sparkles, Trophy, Zap } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import TopicPathRow from '../components/TopicPathRow';
import TrainingSession from '../components/TrainingSession';
import YearLevelSelector from '../components/YearLevelSelector';
import OnboardingTutorial, {
  isOnboardingComplete,
  OnboardingHelpButton,
  resetOnboarding,
} from '../components/OnboardingTutorial';
import {
  loadProgress,
  saveProgress,
  computeNodeStatus,
  getLevelFromXP,
  getXPProgress,
  type UserProgress,
} from '../lib/progress';
import { getMaxLevelsForNode, getRecommendedLevel } from '../lib/skillTree';
import { getStoredYearLevel } from '../lib/yearLevel';
import { useAuth } from '../hooks/useAuth';

type View = 'tree' | 'session';

const STAGE_LABELS = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'VCE Exam'];

function normalizeProgress(progress: UserProgress): UserProgress {
  return {
    ...progress,
    level: getLevelFromXP(progress.totalXP),
  };
}

function unlockAllNodes(progress: UserProgress): UserProgress {
  const next = normalizeProgress(progress);
  const updated = { ...next.nodes };

  for (const node of ALL_NODES) {
    if (!updated[node.id] || updated[node.id].status === 'locked') {
      updated[node.id] = updated[node.id]
        ? { ...updated[node.id], status: 'unlocked' }
        : { status: 'unlocked', levelsCompleted: [], score: 0 };
    }
  }

  return { ...next, nodes: updated };
}

function getFirstAvailableNode(progress: UserProgress): string | null {
  return ALL_NODES.find((node) => computeNodeStatus(node.id, node.prerequisites, progress) !== 'locked')?.id
    ?? ALL_NODES[0]?.id
    ?? null;
}

function getInitialProgress(isPro: boolean): UserProgress {
  const baseProgress = normalizeProgress(loadProgress());
  return isPro ? unlockAllNodes(baseProgress) : baseProgress;
}

export default function SkillTreePage() {
  const { isPro } = useAuth();
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgress(isPro));
  const [view, setView] = useState<View>('tree');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(() => getFirstAvailableNode(getInitialProgress(isPro)));
  const [sessionLevel, setSessionLevel] = useState<number>(0);

  const [showYearSelector, setShowYearSelector] = useState(() => !isPro && getStoredYearLevel() === null);
  const [showOnboarding, setShowOnboarding] = useState(() => !isPro && getStoredYearLevel() !== null && !isOnboardingComplete());
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!isPro) return;

    const syncId = window.setTimeout(() => {
      setProgress((prev) => unlockAllNodes(prev));
      setShowYearSelector(false);
      setShowOnboarding(false);
    }, 0);

    return () => window.clearTimeout(syncId);
  }, [isPro]);

  const totalQuestions = useMemo(() => {
    const counts = getNodeQuestionCounts();
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  }, []);

  const completedCount = useMemo(() => ALL_NODES.filter((node) => {
    const status = computeNodeStatus(node.id, node.prerequisites, progress);
    return status === 'completed' || status === 'mastered';
  }).length, [progress]);

  const unlockedCount = useMemo(() => ALL_NODES.filter((node) =>
    computeNodeStatus(node.id, node.prerequisites, progress) !== 'locked'
  ).length, [progress]);

  const overallPct = ALL_NODES.length ? Math.round((completedCount / ALL_NODES.length) * 100) : 0;
  const xpState = useMemo(() => getXPProgress(progress.totalXP), [progress.totalXP]);

  const recommendedNode = useMemo(() => (
    ALL_NODES.find((node) => {
      const status = computeNodeStatus(node.id, node.prerequisites, progress);
      return status !== 'locked' && status !== 'completed' && status !== 'mastered';
    }) ?? ALL_NODES.find((node) => computeNodeStatus(node.id, node.prerequisites, progress) !== 'locked') ?? null
  ), [progress]);

  const recommendedLevel = useMemo(() => (
    recommendedNode ? getRecommendedLevel(recommendedNode.id, progress) : null
  ), [recommendedNode, progress]);

  const topicGroups = useMemo(() => {
    const groups: Record<string, typeof ALL_NODES> = {};
    for (const node of ALL_NODES) {
      if (!groups[node.topic]) groups[node.topic] = [];
      groups[node.topic].push(node);
    }
    return Object.entries(groups).map(([topic, nodes]) => ({ topic, nodes }));
  }, []);

  const handleSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleStartLevel = useCallback((nodeId: string, level: number) => {
    setSelectedNodeId(nodeId);
    setSessionLevel(level);
    setView('session');
  }, []);

  const handleSessionComplete = useCallback((nodeId: string, level: number, score: number, total: number, advance?: boolean) => {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = pct >= 70;
    const maxLevels = getMaxLevelsForNode(nodeId);

    setProgress((prev) => {
      const currentNode = prev.nodes[nodeId] ?? { status: 'unlocked', levelsCompleted: [], score: 0 };
      let completedLevels = currentNode.levelsCompleted;

      if (passed && !completedLevels.includes(level)) {
        completedLevels = [...completedLevels, level].sort((a, b) => a - b);
      }

      if (passed && advance && level === 3 && maxLevels === 4 && !completedLevels.includes(4)) {
        completedLevels = [...completedLevels, 4].sort((a, b) => a - b);
      }

      const finishedLevels = completedLevels.filter((item) => item <= maxLevels).length;
      const isCompleted = finishedLevels >= maxLevels;
      const nextTotalXP = prev.totalXP + (passed ? (level * 10 + Math.round(pct / 10)) : 0);

      return {
        ...prev,
        totalXP: nextTotalXP,
        level: getLevelFromXP(nextTotalXP),
        nodes: {
          ...prev.nodes,
          [nodeId]: {
            status: isCompleted ? 'completed' : completedLevels.length > 0 ? 'in-progress' : 'unlocked',
            levelsCompleted: completedLevels,
            score: Math.max(currentNode.score, pct),
          },
        },
      };
    });

    if (advance && level < 3) {
      setSessionLevel(level + 1);
      return;
    }

    setView('tree');
    setSessionLevel(0);
  }, []);

  const handleReset = useCallback(() => {
    if (!confirm('Reset all progress? This cannot be undone.')) return;

    const fresh: UserProgress = isPro
      ? unlockAllNodes({ nodes: {}, totalXP: 0, level: 1, streak: 0 })
      : { nodes: {}, totalXP: 0, level: 1, streak: 0 };

    setProgress(fresh);
    setSelectedNodeId(getFirstAvailableNode(fresh));
    saveProgress(fresh);
  }, [isPro]);

  const handleYearLevelComplete = useCallback((_yearLevel: number, unlockedNodeIds: string[]) => {
    setProgress((prev) => {
      const updated = { ...prev.nodes };

      for (const id of unlockedNodeIds) {
        if (!updated[id]) {
          updated[id] = { status: 'unlocked', levelsCompleted: [], score: 0 };
        } else if (updated[id].status === 'locked') {
          updated[id] = { ...updated[id], status: 'unlocked' };
        }
      }

      return { ...prev, nodes: updated };
    });

    setSelectedNodeId(unlockedNodeIds[0] ?? selectedNodeId);
    setShowYearSelector(false);
    setShowOnboarding(true);
  }, [selectedNodeId]);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const handleReplayTutorial = useCallback(() => {
    resetOnboarding();
    setShowOnboarding(true);
  }, []);

  const content = view === 'session' && selectedNodeId ? (
    <TrainingSession
      nodeId={selectedNodeId}
      level={sessionLevel}
      onComplete={handleSessionComplete}
      onBack={() => { setView('tree'); setSessionLevel(0); }}
    />
  ) : (
    <div className="min-h-screen bg-[var(--app-bg)]">
      <header className="border-b border-black/8 bg-white/72 backdrop-blur-xl">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <p className="section-kicker">Skill Tree</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl">
                A cleaner path from fundamentals to exam-ready work.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                The map stays visual, but the next action is always clear. Pick a node, review the practice ladder,
                and move straight into questions without extra modal hopping.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <OnboardingHelpButton onClick={handleReplayTutorial} />
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-black/15 hover:text-[var(--ink)]"
                title="Reset progress"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Current level', value: `L${xpState.level}`, detail: `${xpState.currentXP}/${xpState.neededXP} XP to next level`, icon: <Zap size={16} className="text-[var(--accent)]" /> },
              { label: 'Completed nodes', value: `${completedCount}/${ALL_NODES.length}`, detail: `${overallPct}% coverage across the map`, icon: <Trophy size={16} className="text-[var(--accent)]" /> },
              { label: 'Unlocked nodes', value: `${unlockedCount}`, detail: `${ALL_NODES.length - unlockedCount} still gated by prerequisites`, icon: <Sparkles size={16} className="text-[var(--accent)]" /> },
              { label: 'Question bank', value: `${totalQuestions}`, detail: 'Exam prompts connected to skill nodes', icon: <ArrowRight size={16} className="text-[var(--accent)]" /> },
            ].map((stat) => (
              <div key={stat.label} className="soft-panel rounded-[24px] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-[var(--muted-soft)]">{stat.label}</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">{stat.value}</div>
                    <div className="mt-2 text-xs leading-5 text-[var(--muted)]">{stat.detail}</div>
                  </div>
                  <div className="rounded-full bg-[var(--surface-2)] p-2">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
            <div className="soft-panel rounded-[28px] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="section-kicker">Recommended Next</div>
                  <div className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">
                    {recommendedNode ? recommendedNode.title : 'Select a node to begin'}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    {recommendedNode && recommendedLevel
                      ? `${STAGE_LABELS[recommendedNode.tier]} · ${recommendedLevel.name} · ${recommendedLevel.questionCount} questions`
                      : 'Unlock your first node, then the panel on the right will show the next best practice set.'}
                  </p>
                </div>

                {recommendedNode && recommendedLevel && (
                  <button
                    onClick={() => handleStartLevel(recommendedNode.id, recommendedLevel.level)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/85"
                  >
                    Start {recommendedLevel.name}
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="soft-panel rounded-[28px] p-6">
              <div className="section-kicker">Overall Progress</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-[var(--ink)]">{overallPct}%</div>
              <div className="mt-4 h-2 rounded-full bg-black/7 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{completedCount} nodes completed</span>
                <span>{ALL_NODES.length - completedCount} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] space-y-3 px-4 py-6 sm:px-6">
        {topicGroups.map(({ topic, nodes: topicNodes }) => (
          <TopicPathRow
            key={topic}
            topicLabel={topic}
            nodes={topicNodes}
            progress={progress}
            isExpanded={expandedTopic === topic}
            onToggle={() => setExpandedTopic((prev) => (prev === topic ? null : topic))}
            onSelectNode={handleSelectNode}
            selectedNodeId={selectedNodeId}
            onStartLevel={handleStartLevel}
            recommendedNodeId={recommendedNode?.id ?? null}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--app-bg)]">
      {showYearSelector && <YearLevelSelector onComplete={handleYearLevelComplete} />}
      {showOnboarding && !showYearSelector && <OnboardingTutorial onComplete={handleOnboardingComplete} />}
      {content}
    </div>
  );
}
