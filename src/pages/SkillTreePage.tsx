import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { RotateCcw, Zap, Flame, Trophy } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import CivTreeView from '../components/CivTreeView';
import MiniMap from '../components/MiniMap';
import SkillNodePanel from '../components/SkillNodePanel';
import TopicSubTree from '../components/TopicSubTree';
import { loadProgress, saveProgress, xpForLevel, computeNodeStatus, type UserProgress } from '../lib/progress';

type View = 'tree' | 'subtree';

export default function SkillTreePage() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);
  const [view, setView] = useState<View>('tree');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSubTreeId, setActiveSubTreeId] = useState<string | null>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, w: 1000, h: 600, scale: 1 });
  const treeContainerRef = useRef<HTMLDivElement>(null);

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

  const handleStartLevel = useCallback((nodeId: string, _level: number) => {
    // For now, mark level as started (in-progress)
    setProgress(prev => {
      const np = prev.nodes[nodeId] ?? { status: 'unlocked', levelsCompleted: [], score: 0 };
      return {
        ...prev,
        nodes: {
          ...prev.nodes,
          [nodeId]: { ...np, status: 'in-progress' },
        },
      };
    });
    // TODO: Navigate to practice session
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      const fresh: UserProgress = { nodes: {}, totalXP: 0, level: 1, streak: 0 };
      setProgress(fresh);
      saveProgress(fresh);
    }
  }, []);

  const handleMiniMapNavigate = useCallback((x: number, y: number) => {
    // Find the CivTreeView container and call navigateTo
    const container = document.querySelector('[data-civ-tree]');
    if (container && (container as any).__navigateTo) {
      (container as any).__navigateTo(x, y);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* XP Header Bar */}
      <div className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm px-4 sm:px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Level badge */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center border-2 border-blue-500">
                <span className="text-white font-bold text-sm">{progress.level}</span>
              </div>
              <div>
                <div className="text-xs text-gray-400 font-mono">LEVEL {progress.level}</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Zap size={12} className="text-yellow-400" />
                  <div className="w-24 h-1.5 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 transition-all duration-700"
                      style={{ width: `${xpPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{progress.totalXP}/{xpNeeded} XP</span>
                </div>
              </div>
            </div>

            {/* Streak */}
            {progress.streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-orange-900/30 rounded-lg border border-orange-800/30">
                <Flame size={14} className="text-orange-400" />
                <span className="text-xs text-orange-300 font-bold">{progress.streak}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Overall progress */}
            <div className="hidden sm:flex items-center gap-2">
              <Trophy size={14} className="text-green-400" />
              <span className="text-xs text-gray-400 font-mono">{completedCount}/{ALL_NODES.length} skills</span>
              <span className="text-xs text-gray-500">({overallPct}%)</span>
            </div>

            <div className="h-4 w-px bg-gray-700" />

            <span className="text-xs text-gray-500 font-mono">{totalQuestions} questions</span>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-red-400 font-mono rounded border border-gray-800 hover:border-red-800/50 transition-colors"
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
            <div ref={treeContainerRef} className="w-full h-full" data-civ-tree>
              <CivTreeView
                progress={progress}
                onSelectNode={handleSelectNode}
                onViewportChange={setViewport}
              />
            </div>

            <MiniMap
              progress={progress}
              viewport={viewport}
              onNavigate={handleMiniMapNavigate}
            />

            {selectedNodeId && (
              <SkillNodePanel
                nodeId={selectedNodeId}
                progress={progress}
                onClose={() => setSelectedNodeId(null)}
                onEnter={handleEnterSubTree}
              />
            )}
          </>
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
