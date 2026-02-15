import { useRef, useState, useEffect, useMemo } from 'react';
import { Play, Lock, Crown, CheckCircle2 } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import { getTrainingForNode } from '../data/training';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus } from '../lib/progress';

interface Props {
  progress: UserProgress;
  onSelectNode: (nodeId: string) => void;
  onViewportChange?: (vp: { x: number; y: number; w: number; h: number; scale: number }) => void;
}

export interface CivTreeViewRef {
  navigateTo: (x: number, y: number) => void;
}

const TIER_LABELS = ['Year 8', 'Year 9', 'Year 10 / 10A', 'Year 11 (U1&2)', 'Year 12 (U3&4)', 'VCE Exam'];
const TIER_SUBTITLES = [
  'Foundation Skills',
  'Core Development',
  'Advanced Foundations',
  'Methods Units 1 & 2',
  'Methods Units 3 & 4',
  'Final Exam Prep',
];

// Bright, vivid tier colors (Duolingo-style)
const TIER_ACCENT = ['#818CF8', '#A78BFA', '#C084FC', '#60A5FA', '#22D3EE', '#FBBF24'];
const TIER_BG_FROM = ['#312E81', '#3B0764', '#4A044E', '#172554', '#083344', '#422006'];
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

function getNodesByTier() {
  const tiers: Record<number, typeof ALL_NODES> = {};
  ALL_NODES.forEach(n => {
    if (!tiers[n.tier]) tiers[n.tier] = [];
    tiers[n.tier].push(n);
  });
  return tiers;
}

function findCurrentNode(progress: UserProgress): string | null {
  for (const node of ALL_NODES) {
    const status = computeNodeStatus(node.id, node.prerequisites, progress);
    if (status === 'unlocked' || status === 'in-progress') return node.id;
  }
  return null;
}

/* ─── Path Node ─── */

function PathNode({
  node,
  status,
  progress,
  isCurrent,
  icon,
  tierColor,
  offsetX,
  onSelect,
  nodeSize,
}: {
  node: typeof ALL_NODES[0];
  status: string;
  progress: UserProgress;
  isCurrent: boolean;
  icon: string;
  tierColor: string;
  offsetX: number;
  onSelect: () => void;
  nodeSize: number;
}) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed' || status === 'mastered';
  const isMastered = status === 'mastered';
  const isInProgress = status === 'in-progress';
  const np = progress.nodes[node.id];
  const levelsCompleted = np?.levelsCompleted?.length ?? 0;

  const examCount = useMemo(() => getNodeQuestionCounts()[node.id] ?? 0, [node.id]);
  const trainingCount = useMemo(() => getTrainingForNode(node.id).length, [node.id]);
  const totalQ = examCount + trainingCount;

  // Ring colors
  const ringColor = isLocked ? '#374151' : isCompleted ? '#22C55E' : isCurrent ? tierColor : '#4B5563';
  const ringWidth = isCurrent ? 5 : isCompleted ? 4 : 3;
  const bgColor = isLocked ? '#1F2937' : isCompleted ? '#14532D' : isCurrent ? `${tierColor}20` : '#1F2937';

  return (
    <div
      className="flex flex-col items-center relative"
      style={{ transform: `translateX(${offsetX}px)` }}
    >
      {/* Crown for completed */}
      {isCompleted && (
        <div className="absolute -top-5 z-10">
          <Crown
            size={isMastered ? 24 : 20}
            className={isMastered ? 'text-amber-400' : 'text-green-400'}
            fill="currentColor"
            strokeWidth={0}
          />
        </div>
      )}

      {/* Pulsing ring for current */}
      {isCurrent && (
        <div
          className="absolute rounded-full animate-ping-slow"
          style={{
            width: nodeSize + 20,
            height: nodeSize + 20,
            border: `2px solid ${tierColor}`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Main node button */}
      <button
        onClick={() => !isLocked && onSelect()}
        disabled={isLocked}
        className={`
          relative rounded-full flex items-center justify-center
          transition-all duration-200 group
          ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer active:scale-95'}
          ${isCurrent ? 'hover:scale-105' : !isLocked ? 'hover:scale-105 hover:brightness-110' : ''}
        `}
        style={{
          width: nodeSize,
          height: nodeSize,
          border: `${ringWidth}px solid ${ringColor}`,
          background: bgColor,
          boxShadow: isCurrent
            ? `0 0 30px ${tierColor}40, 0 0 60px ${tierColor}15`
            : isCompleted
              ? '0 0 20px rgba(34,197,94,0.15)'
              : 'none',
          opacity: isLocked ? 0.4 : 1,
        }}
      >
        {/* Progress ring overlay */}
        {isInProgress && levelsCompleted > 0 && (
          <svg
            className="absolute inset-0"
            width={nodeSize}
            height={nodeSize}
            viewBox={`0 0 ${nodeSize} ${nodeSize}`}
          >
            <circle
              cx={nodeSize / 2}
              cy={nodeSize / 2}
              r={nodeSize / 2 - ringWidth - 1}
              fill="none"
              stroke={tierColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={`${(levelsCompleted / 4) * Math.PI * (nodeSize - 2 * ringWidth - 2)} ${Math.PI * (nodeSize - 2 * ringWidth - 2)}`}
              transform={`rotate(-90 ${nodeSize / 2} ${nodeSize / 2})`}
              opacity={0.5}
            />
          </svg>
        )}

        {/* Completed checkmark overlay */}
        {isCompleted && (
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-green-900">
            <CheckCircle2 size={14} className="text-white" strokeWidth={3} />
          </div>
        )}

        {/* Icon */}
        <span
          className={isCurrent ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}
          style={{
            filter: isLocked ? 'grayscale(1) brightness(0.3)' : 'none',
          }}
        >
          {isLocked ? <Lock size={nodeSize * 0.3} className="text-gray-600" /> : icon}
        </span>
      </button>

      {/* Label */}
      <div className="mt-2 text-center" style={{ maxWidth: nodeSize + 40 }}>
        <p className={`text-xs sm:text-sm font-semibold leading-tight ${
          isLocked ? 'text-gray-600' : isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-300'
        }`}>
          {node.title}
        </p>
        {!isLocked && (
          <p className="text-[10px] text-gray-500 mt-0.5">
            {totalQ} questions · {levelsCompleted}/4
          </p>
        )}
      </div>

      {/* START button for current node */}
      {isCurrent && (
        <button
          onClick={onSelect}
          className="mt-3 px-6 py-2.5 rounded-2xl font-bold text-sm uppercase tracking-wider
                     flex items-center gap-2 transition-all active:scale-95
                     hover:shadow-lg hover:brightness-110"
          style={{
            background: tierColor,
            color: '#000',
            boxShadow: `0 4px 20px ${tierColor}50`,
          }}
        >
          <Play size={14} fill="currentColor" />
          {isInProgress ? 'Continue' : 'Start'}
        </button>
      )}
    </div>
  );
}

/* ─── Tier Banner ─── */

function TierBanner({ tier, nodes, progress }: {
  tier: number;
  nodes: typeof ALL_NODES;
  progress: UserProgress;
}) {
  const completedCount = nodes.filter(n => {
    const s = computeNodeStatus(n.id, n.prerequisites, progress);
    return s === 'completed' || s === 'mastered';
  }).length;
  const pct = Math.round((completedCount / nodes.length) * 100);
  const color = TIER_ACCENT[tier] ?? '#9CA3AF';

  return (
    <div className="flex items-center gap-4 py-6 px-4">
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${color}30, transparent)` }} />
      <div className="text-center shrink-0">
        <h3 className="text-sm sm:text-base font-bold tracking-wide" style={{ color }}>
          {TIER_LABELS[tier]}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
          {TIER_SUBTITLES[tier]} · {completedCount}/{nodes.length}
        </p>
        {pct > 0 && (
          <div className="mt-2 mx-auto w-24 h-1.5 rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        )}
      </div>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${color}30, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════ */

export default function CivTreeView({ progress, onSelectNode }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiers = useMemo(() => getNodesByTier(), []);
  const currentNodeId = useMemo(() => findCurrentNode(progress), [progress]);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const nodeSize = isMobile ? 72 : 90;
  const swing = isMobile ? 50 : 80; // how far nodes offset left/right

  // Auto-scroll to current node
  useEffect(() => {
    if (!currentNodeId || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-node="${currentNodeId}"]`);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [currentNodeId]);

  // Build global node index for wave positioning
  const nodeIndexMap = useMemo(() => {
    const map: Record<string, number> = {};
    let idx = 0;
    Object.entries(tiers)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([, nodes]) => {
        nodes.forEach(n => { map[n.id] = idx++; });
      });
    return map;
  }, [tiers]);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }
        @keyframes path-dash {
          to { stroke-dashoffset: -16; }
        }
      `}</style>

      <div className="min-h-full pb-32 pt-4" style={{
        background: 'linear-gradient(180deg, #0F0A1A 0%, #0D1117 30%, #0B1222 60%, #0F0A1A 100%)',
      }}>
        {Object.entries(tiers)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([tierStr, nodes]) => {
            const tier = Number(tierStr);
            const color = TIER_ACCENT[tier] ?? '#9CA3AF';

            return (
              <div key={tier} className="relative">
                {/* Tier background glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${TIER_BG_FROM[tier]}60 0%, transparent 70%)`,
                  }}
                />

                {/* Tier banner */}
                <TierBanner tier={tier} nodes={nodes} progress={progress} />

                {/* Nodes in this tier */}
                <div className="relative flex flex-col items-center gap-8 sm:gap-10 pb-6">
                  {nodes.map((node, i) => {
                    const globalIdx = nodeIndexMap[node.id] ?? 0;
                    const status = computeNodeStatus(node.id, node.prerequisites, progress);
                    const icon = NODE_ICONS[node.id] ?? '📐';
                    const isCurrent = node.id === currentNodeId;

                    // Gentle S-curve offset
                    const offsetX = Math.sin(globalIdx * 0.7) * swing;

                    return (
                      <div key={node.id} data-node={node.id} className="relative">
                        {/* Connection line to next node */}
                        {i < nodes.length - 1 && (
                          <svg
                            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                            style={{
                              top: nodeSize + (isCurrent ? 55 : 30),
                              width: 200,
                              height: isMobile ? 55 : 60,
                              marginLeft: -100 + offsetX,
                            }}
                            viewBox="0 0 200 60"
                          >
                            {(() => {
                              const nextGlobalIdx = nodeIndexMap[nodes[i + 1]?.id] ?? globalIdx + 1;
                              const nextOffsetX = Math.sin(nextGlobalIdx * 0.7) * swing;
                              const dx = nextOffsetX - offsetX;
                              const isActive = status === 'completed' || status === 'mastered';

                              return (
                                <path
                                  d={`M 100 0 C 100 25, ${100 + dx} 35, ${100 + dx} 60`}
                                  fill="none"
                                  stroke={isActive ? color : '#374151'}
                                  strokeWidth={isActive ? 4 : 3}
                                  strokeDasharray={isActive ? 'none' : '8 8'}
                                  strokeLinecap="round"
                                  opacity={isActive ? 0.6 : 0.3}
                                  style={!isActive ? { animation: 'path-dash 1s linear infinite' } : undefined}
                                />
                              );
                            })()}
                          </svg>
                        )}

                        <PathNode
                          node={node}
                          status={status}
                          progress={progress}
                          isCurrent={isCurrent}
                          icon={icon}
                          tierColor={color}
                          offsetX={offsetX}
                          onSelect={() => onSelectNode(node.id)}
                          nodeSize={isCurrent ? nodeSize + 10 : nodeSize}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* End: trophy */}
        <div className="flex flex-col items-center py-10 opacity-30">
          <div className="w-16 h-16 rounded-full border-2 border-amber-500/30 flex items-center justify-center">
            <span className="text-3xl">🏆</span>
          </div>
          <p className="text-xs text-gray-600 mt-2 font-mono">VCE Ready</p>
        </div>
      </div>
    </div>
  );
}
