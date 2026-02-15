import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { RotateCcw, Zap, Flame, Trophy } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import CivTreeView from '../components/CivTreeView';
import SkillNodePanel from '../components/SkillNodePanel';
import TopicSubTree from '../components/TopicSubTree';
import TrainingSession from '../components/TrainingSession';
import YearLevelSelector, { getStoredYearLevel } from '../components/YearLevelSelector';
import OnboardingTutorial, { isOnboardingComplete, OnboardingHelpButton, resetOnboarding } from '../components/OnboardingTutorial';
import { loadProgress, saveProgress, xpForLevel, computeNodeStatus, type UserProgress } from '../lib/progress';

type View = 'tree' | 'subtree' | 'session';

export default function SkillTreePage() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [view, setView] = useState<View>('tree');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSubTreeId, setActiveSubTreeId] = useState<string | null>(null);
  const [sessionLevel, setSessionLevel] = useState<number>(0);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Onboarding flow state
  const [showYearSelector, setShowYearSelector] = useState(() => getStoredYearLevel() === null);
  const [showOnboarding, setShowOnboarding] = useState(() => getStoredYearLevel() !== null && !isOnboardingComplete());

  // Persist
  useEffect(() => { saveProgress(progress); }, [progress]);

  // Stats
  const totalQuestions = useMemo(() => {
    const counts = getNodeQuestionCounts();
    return Object.values(counts).reduce((s, c) => s + c, 0);
  }, []);

  const completedCount = useMemo(() =>
    ALL_NODES.filter(n => {
      const s = computeNodeStatus(n.id, n.prerequisites, progress);
      return s === 'completed' || s === 'mastered';
    }).length,
    [progress]
  );

  const overallPct = ALL_NODES.length ? Math.round((completedCount / ALL_NODES.length) * 100) : 0;
  const xpNeeded = xpForLevel(progress.level);
  const xpPct = Math.min(100, Math.round((progress.totalXP / xpNeeded) * 100));

  const handleSelectNode = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
  }, []);

  const handleEnterSubTree = useCallback((nodeId: string) => {
    setActiveSubTreeId(nodeId);
    setSelectedNodeId(null);
    setView('subtree');
  }, []);

  const handleBackToTree = useCallback(() => {
    setView('tree');
    setActiveSubTreeId(null);
  }, []);

  const handleStartLevel = useCallback((_nodeId: string, level: number) => {
    setSessionLevel(level);
    setView('session');
  }, []);

  const handleSessionComplete = useCallback((nodeId: string, level: number, score: number, total: number) => {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const passed = pct >= 70;

    setProgress(prev => {
      const np = prev.nodes[nodeId] ?? { status: 'unlocked', levelsCompleted: [], score: 0 };
      const levelsCompleted = passed && !np.levelsCompleted.includes(level)
        ? [...np.levelsCompleted, level].sort()
        : np.levelsCompleted;
      const avgScore = levelsCompleted.length > 0
        ? Math.round((levelsCompleted.length / 4) * 100)
        : np.score;
      const allDone = levelsCompleted.length === 4;
      const xpGain = passed ? (level * 10 + Math.round(pct / 10)) : 0;

      return {
        ...prev,
        totalXP: prev.totalXP + xpGain,
        nodes: {
          ...prev.nodes,
          [nodeId]: {
            status: allDone ? 'completed' : levelsCompleted.length > 0 ? 'in-progress' : 'unlocked',
            levelsCompleted,
            score: avgScore,
          },
        },
      };
    });

    // Go back to subtree view
    setView('subtree');
    setSessionLevel(0);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      const fresh: UserProgress = { nodes: {}, totalXP: 0, level: 1, streak: 0 };
      setProgress(fresh);
      saveProgress(fresh);
    }
  }, []);

  // Year level selection: unlock all nodes up to that tier
  const handleYearLevelComplete = useCallback((_yearLevel: number, unlockedNodeIds: string[]) => {
    setProgress(prev => {
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
    setShowYearSelector(false);
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const handleReplayTutorial = useCallback(() => {
    resetOnboarding();
    setShowOnboarding(true);
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Year Level Selector overlay */}
      {showYearSelector && (
        <YearLevelSelector onComplete={handleYearLevelComplete} />
      )}

      {/* Onboarding Tutorial overlay */}
      {showOnboarding && !showYearSelector && (
        <OnboardingTutorial onComplete={handleOnboardingComplete} />
      )}

      {/* XP Header Bar */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm px-3 sm:px-6 py-2.5 sm:py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Level badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border-2 border-blue-500">
                <span className="text-white font-bold text-xs sm:text-sm">{progress.level}</span>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-400 font-mono">LVL {progress.level}</div>
                <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                  <Zap size={10} className="text-yellow-400 sm:hidden" />
                  <Zap size={12} className="text-yellow-400 hidden sm:block" />
                  <div className="w-16 sm:w-24 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-700"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono">{progress.totalXP}/{xpNeeded}</span>
                </div>
              </div>
            </div>

            {/* Streak */}
            {progress.streak > 0 && (
              <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-orange-900/30 rounded-lg border border-orange-800/30">
                <Flame size={12} className="text-orange-400 sm:hidden" />
                <Flame size={14} className="text-orange-400 hidden sm:block" />
                <span className="text-[10px] sm:text-xs text-orange-300 font-bold">{progress.streak}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Overall progress */}
            <div className="hidden sm:flex items-center gap-2">
              <Trophy size={14} className="text-green-400" />
              <span className="text-xs text-gray-400 font-mono">{completedCount}/{ALL_NODES.length} skills</span>
              <span className="text-xs text-gray-500">({overallPct}%)</span>
            </div>

            {/* Mobile compact progress */}
            <div className="sm:hidden flex items-center gap-1">
              <Trophy size={12} className="text-green-400" />
              <span className="text-[10px] text-gray-400 font-mono">{overallPct}%</span>
            </div>

            <div className="h-4 w-px bg-gray-700 hidden sm:block" />

            <span className="text-[10px] sm:text-xs text-gray-500 font-mono hidden sm:inline">{totalQuestions} Q</span>

            <OnboardingHelpButton onClick={handleReplayTutorial} />

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-1.5 sm:px-2 py-1 text-xs text-gray-500 hover:text-red-400 font-mono rounded border border-gray-800 hover:border-red-800/50 transition-colors"
              title="Reset progress"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-2 h-1 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden relative">
        {view === 'tree' ? (
          <>
            <div ref={treeContainerRef} className="w-full h-full">
              <CivTreeView
                progress={progress}
                onSelectNode={handleSelectNode}
                selectedNodeId={selectedNodeId}
              />
            </div>

            {selectedNodeId && (
              <SkillNodePanel
                nodeId={selectedNodeId}
                progress={progress}
                onClose={() => setSelectedNodeId(null)}
                onEnter={handleEnterSubTree}
              />
            )}
          </>
        ) : view === 'session' && activeSubTreeId ? (
          <TrainingSession
            nodeId={activeSubTreeId}
            level={sessionLevel}
            onComplete={handleSessionComplete}
            onBack={() => { setView('subtree'); setSessionLevel(0); }}
          />
        ) : activeSubTreeId ? (
          <TopicSubTree
            nodeId={activeSubTreeId}
            progress={progress}
            onBack={handleBackToTree}
            onStartLevel={handleStartLevel}
          />
        ) : null}
      </div>
    </div>
  );
}
