import { useMemo, useEffect, useState } from 'react';
import { X, Play } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import { getTrainingForNode } from '../data/training';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress } from '../lib/progress';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onClose: () => void;
  onEnter: (nodeId: string) => void;
}

const NODE_ICONS: Record<string, string> = {
  'y8-number': '🔢', 'y8-algebra': '✖️', 'y8-statistics': '📊', 'y8-probability': '🎲',
  'y9-number': '🔬', 'y9-algebra': '📈', 'y9-statistics': '📉', 'y9-probability': '🎯',
  'y10-number': '💰', 'y10-algebra': '📐', 'y10-statistics': '🔍', 'y10-probability': '🧩',
  'y10a-algebra': '🔗', 'y10a-probability': '🎰',
  'y11-a1-linear': '📏', 'y11-a2-quadratics': '〰️', 'y11-a3-domain-range': '🗺️',
  'y11-a4-transformations': '🔄', 'y11-a5-trigonometry': '📐', 'y11-a6-logs-indices': '📊',
  'y11-a7-differentiation': '📉', 'y11-a8-integration': '∫', 'y11-a9-combinatorics': '🎲',
  'y12-a1-algebra-functions': '⚡', 'y12-a2-differentiation': '🏔️', 'y12-a3-integration': '🌊',
  'y12-a4-discrete-prob': '🎰', 'y12-a5-continuous-prob': '🔔', 'y12-a6-pseudocode': '💻',
  'vce-exam1': '✏️', 'vce-exam2': '🖥️',
};

// Match tier accent colors from CivTreeView
const TIER_ACCENT = ['#818CF8', '#A78BFA', '#C084FC', '#60A5FA', '#22D3EE', '#FBBF24'];

export default function SkillNodePanel({ nodeId, progress, onClose, onEnter }: Props) {
  const node = useMemo(() => ALL_NODES.find(n => n.id === nodeId), [nodeId]);
  const np = getNodeProgress(progress, nodeId);
  const examCount = useMemo(() => getNodeQuestionCounts()[nodeId] ?? 0, [nodeId]);
  const trainingCount = useMemo(() => getTrainingForNode(nodeId).length, [nodeId]);
  const qCount = trainingCount + examCount;
  const icon = NODE_ICONS[nodeId] ?? '📐';
  const tierColor = node ? TIER_ACCENT[node.tier] ?? '#60A5FA' : '#60A5FA';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    return () => setVisible(false);
  }, [nodeId]);

  if (!node) return null;

  const pct = Math.round((np.levelsCompleted.length / 4) * 100);
  const isStarted = np.levelsCompleted.length > 0;

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
        className="fixed z-50 inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:w-[380px]"
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
          className="rounded-3xl overflow-hidden border border-gray-700/50"
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
              className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-4xl mb-3"
              style={{
                border: `3px solid ${tierColor}`,
                background: `${tierColor}15`,
                boxShadow: `0 0 30px ${tierColor}20`,
              }}
            >
              {icon}
            </div>

            <h3 className="text-xl font-bold text-white">{node.title}</h3>
            <p className="text-xs text-gray-400 mt-1 capitalize">{node.topic.toLowerCase()}</p>
          </div>

          {/* Body */}
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-400 leading-relaxed mb-5 text-center">
              {node.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mb-5">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{np.levelsCompleted.length}<span className="text-base text-gray-500">/4</span></div>
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
                {['Easy', 'Medium', 'Hard', 'Exam'].map((label, i) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
