import { useMemo, useEffect, useState } from 'react';
import {
  X, Play,
  Hash, Sigma, BarChart2, Dice5, TrendingUp,
  PieChart, Calculator, Triangle, Waves, Mountain,
  Bell, Binary, PenTool, Monitor, Link2,
  FunctionSquare, Braces, LineChart, GitBranch, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import { getTrainingForNode } from '../data/training';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress, computeNodeStatus } from '../lib/progress';
import { formatEstimatedTime } from '../lib/utils';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onClose: () => void;
  onEnter: (nodeId: string) => void;
}

const NODE_ICON_MAP: Record<string, LucideIcon> = {
  'y8-number': Hash, 'y8-algebra': Braces, 'y8-statistics': BarChart2, 'y8-probability': Dice5,
  'y9-number': Sigma, 'y9-algebra': TrendingUp, 'y9-statistics': LineChart, 'y9-probability': PieChart,
  'y10-number': Calculator, 'y10-algebra': FunctionSquare, 'y10-statistics': BarChart2, 'y10-probability': GitBranch,
  'y10a-algebra': Link2, 'y10a-probability': Dice5,
  'y11-a1-linear': TrendingUp, 'y11-a2-quadratics': Waves, 'y11-a3-domain-range': Braces,
  'y11-a4-transformations': GitBranch, 'y11-a5-trigonometry': Triangle, 'y11-a6-logs-indices': Sigma,
  'y11-a7-differentiation': LineChart, 'y11-a8-integration': Waves, 'y11-a9-combinatorics': PieChart,
  'y12-a1-algebra-functions': Sparkles, 'y12-a2-differentiation': Mountain, 'y12-a3-integration': Waves,
  'y12-a4-discrete-prob': Dice5, 'y12-a5-continuous-prob': Bell, 'y12-a6-pseudocode': Binary,
  'vce-exam1': PenTool, 'vce-exam2': Monitor,
};

const TIER_GRADIENTS: [string, string][] = [
  ['#6366F1', '#8B5CF6'],
  ['#A855F7', '#D946EF'],
  ['#F43F5E', '#EC4899'],
  ['#3B82F6', '#06B6D4'],
  ['#14B8A6', '#10B981'],
  ['#F59E0B', '#EAB308'],
];

export default function SkillNodePanel({ nodeId, progress, onClose, onEnter }: Props) {
  const node = useMemo(() => ALL_NODES.find(n => n.id === nodeId), [nodeId]);
  const np = getNodeProgress(progress, nodeId);
  const examCount = useMemo(() => getNodeQuestionCounts()[nodeId] ?? 0, [nodeId]);
  const trainingCount = useMemo(() => getTrainingForNode(nodeId).length, [nodeId]);
  const qCount = trainingCount + examCount;
  const Icon = NODE_ICON_MAP[nodeId] ?? Calculator;
  const tierGrad = node ? TIER_GRADIENTS[node.tier] ?? ['#60A5FA', '#3B82F6'] : ['#60A5FA', '#3B82F6'];
  const tierColor = tierGrad[0];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    return () => setVisible(false);
  }, [nodeId]);

  if (!node) return null;

  const maxLevels = node.tier >= 3 ? 4 : 3;
  const pct = Math.round((np.levelsCompleted.filter(l => l <= maxLevels).length / maxLevels) * 100);
  const isStarted = np.levelsCompleted.length > 0;

  // Check if prerequisites are met
  const nodeStatus = computeNodeStatus(nodeId, node.prerequisites, progress);
  const isLocked = nodeStatus === 'locked';
  const unmetPrereqs = isLocked
    ? node.prerequisites.filter(pid => {
        const pp = progress.nodes[pid];
        return !pp || (pp.status !== 'completed' && pp.status !== 'mastered');
      }).map(pid => ALL_NODES.find(n => n.id === pid)?.title ?? pid)
    : [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s ease' }}
      />

      {/* Panel — centered modal on all sizes */}
      <div
        className="fixed z-50 inset-x-2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-2 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[380px] max-h-[90vh] sm:max-h-[85vh]"
        style={{
          transform: visible
            ? window.innerWidth >= 640
              ? 'translate(-50%, -50%) scale(1)'
              : 'translateY(0) scale(1)'
            : window.innerWidth >= 640
              ? 'translate(-50%, -45%) scale(0.95)'
              : 'translateY(20px) scale(0.95)',
          opacity: visible ? 1 : 0,
          transition: 'all 0.25s ease-out',
        }}
      >
        <div
          className="rounded-3xl overflow-hidden border border-gray-700/50 max-h-[85vh] sm:max-h-[85vh] flex flex-col"
          style={{ background: '#111827' }}
        >
          {/* Header with icon */}
          <div
            className="relative px-6 pt-8 pb-5 text-center"
            style={{
              background: `linear-gradient(180deg, ${tierColor}15, transparent)`,
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/80 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            <div
              className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-3"
              style={{
                background: `linear-gradient(135deg, ${tierGrad[0]}20, ${tierGrad[1]}10)`,
                border: `1px solid ${tierGrad[0]}30`,
                boxShadow: `0 0 30px ${tierColor}15`,
              }}
            >
              <Icon size={36} style={{ color: tierColor }} strokeWidth={1.5} />
            </div>

            <h3 className="text-xl font-bold text-white">{node.title}</h3>
            <p className="text-xs text-gray-400 mt-1 capitalize">{node.topic.toLowerCase()}</p>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 overflow-y-auto">
            <p className="text-sm text-gray-400 leading-relaxed mb-5 text-center">
              {node.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-5">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{np.levelsCompleted.filter(l => l <= maxLevels).length}<span className="text-base text-gray-500">/{maxLevels}</span></div>
                <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">Levels</div>
              </div>
              <div className="w-px h-8 bg-gray-700/50" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{qCount}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">Questions</div>
              </div>
              <div className="w-px h-8 bg-gray-700/50" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{np.score}<span className="text-base text-gray-500">%</span></div>
                <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">Best</div>
              </div>
              <div className="w-px h-8 bg-gray-700/50" />
              <div className="text-center">
                <div className="text-lg font-bold text-white">⏱</div>
                <div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wider">{formatEstimatedTime(qCount * 1.5)}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex justify-between text-[10px] text-gray-500 mb-1.5 font-mono">
                <span>Progress</span>
                <span>{pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: pct === 100
                      ? 'linear-gradient(90deg, #22C55E, #10B981)'
                      : `linear-gradient(90deg, ${tierColor}, ${tierColor}BB)`,
                  }}
                />
              </div>
              {/* Level dots */}
              <div className="flex justify-between mt-2 px-1">
                {(['Easy', 'Medium', 'Hard', 'Exam'].slice(0, maxLevels)).map((label, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
                      style={{
                        background: np.levelsCompleted.includes(i + 1) ? tierColor : '#1F2937',
                        border: `1.5px solid ${np.levelsCompleted.includes(i + 1) ? tierColor : '#374151'}`,
                      }}
                    >
                      {np.levelsCompleted.includes(i + 1) ? '✓' : ''}
                    </div>
                    <span className="text-[8px] text-gray-600">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            {isLocked ? (
              <div className="w-full py-3.5 rounded-2xl text-center text-sm text-gray-400 bg-gray-800/60 border border-gray-700/50">
                <p className="font-medium mb-1">Complete first:</p>
                <p className="text-xs text-gray-500">{unmetPrereqs.join(', ')}</p>
              </div>
            ) : (
              <button
                onClick={() => onEnter(nodeId)}
                className="w-full py-3.5 rounded-2xl font-bold text-base uppercase tracking-wide
                           flex items-center justify-center gap-2 transition-all active:scale-[0.98]
                           hover:brightness-110"
                style={{
                  background: tierColor,
                  color: '#000',
                  boxShadow: `0 4px 20px ${tierColor}40`,
                }}
              >
                <Play size={18} fill="currentColor" />
                {isStarted ? 'Continue Practice' : 'Start Practice'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
