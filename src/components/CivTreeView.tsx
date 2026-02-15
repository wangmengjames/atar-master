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

const TIER_LABELS = ['Year 8', 'Year 9', 'Year 10 / 10A', 'Year 11', 'Year 12', 'VCE Exam'];
const TIER_COLORS = ['#818CF8', '#A78BFA', '#C084FC', '#60A5FA', '#22D3EE', '#FBBF24'];

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

/* ─── Column Node ─── */

function ColumnNode({
  node,
  status,
  progress,
  isCurrent,
  icon,
  tierColor,
  onSelect,
}: {
  node: typeof ALL_NODES[0];
  status: string;
  progress: UserProgress;
  isCurrent: boolean;
  icon: string;
  tierColor: string;
  onSelect: () => void;
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

  return (
    <button
      onClick={() => !isLocked && onSelect()}
      disabled={isLocked}
      data-node={node.id}
      className={`
        group relative flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200
        w-[100px] sm:w-[120px]
        ${isLocked
          ? 'opacity-35 cursor-not-allowed'
          : isCurrent
            ? 'cursor-pointer'
            : 'cursor-pointer hover:scale-105'
        }
      `}
    >
      {/* Current badge */}
      {isCurrent && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider z-10"
          style={{ background: tierColor, color: '#000' }}
        >
          Next
        </div>
      )}

      {/* Node circle */}
      <div className="relative">
        {/* Pulse ring for current */}
        {isCurrent && (
          <div
            className="absolute inset-0 rounded-full animate-ping-slow"
            style={{ border: `2px solid ${tierColor}`, margin: -4 }}
          />
        )}

        {/* Crown */}
        {isCompleted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <Crown
              size={isMastered ? 18 : 14}
              className={isMastered ? 'text-amber-400' : 'text-green-400'}
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
        )}

        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative transition-all"
          style={{
            border: `3px solid ${isLocked ? '#374151' : isCompleted ? '#22C55E' : isCurrent ? tierColor : '#4B5563'}`,
            background: isLocked ? '#111827' : isCompleted ? '#14532D' : isCurrent ? `${tierColor}18` : '#1F2937',
            boxShadow: isCurrent
              ? `0 0 20px ${tierColor}30`
              : isCompleted
                ? '0 0 12px rgba(34,197,94,0.15)'
                : 'none',
          }}
        >
          {/* Progress arc */}
          {isInProgress && levelsCompleted > 0 && (
            <svg className="absolute inset-0" viewBox="0 0 64 64">
              <circle
                cx="32" cy="32" r="28"
                fill="none"
                stroke={tierColor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(levelsCompleted / 4) * 175.9} 175.9`}
                transform="rotate(-90 32 32)"
                opacity={0.5}
              />
            </svg>
          )}

          {/* Completed badge */}
          {isCompleted && (
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center border-2 border-[#0B0F1A] z-10">
              <CheckCircle2 size={11} className="text-white" strokeWidth={3} />
            </div>
          )}

          <span className="text-xl sm:text-2xl" style={{ filter: isLocked ? 'grayscale(1) brightness(0.3)' : 'none' }}>
            {isLocked ? <Lock size={20} className="text-gray-600" /> : icon}
          </span>
        </div>
      </div>

      {/* Title */}
      <span className={`text-[10px] sm:text-xs font-semibold leading-tight text-center line-clamp-2 ${
        isLocked ? 'text-gray-700' : isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-300'
      }`}>
        {node.title}
      </span>

      {/* Stats */}
      {!isLocked && (
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3].map(lvl => (
              <div
                key={lvl}
                className="w-2 h-1 rounded-full"
                style={{
                  background: (np?.levelsCompleted ?? []).includes(lvl + 1)
                    ? isCompleted ? '#22C55E' : tierColor
                    : 'rgba(255,255,255,0.08)',
                }}
              />
            ))}
          </div>
          {totalQ > 0 && (
            <span className="text-[8px] text-gray-500 ml-0.5">{totalQ}Q</span>
          )}
        </div>
      )}

      {/* START pill for current */}
      {isCurrent && (
        <div
          className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide mt-0.5"
          style={{ background: tierColor, color: '#000' }}
        >
          <Play size={10} fill="currentColor" />
          {isInProgress ? 'Continue' : 'Start'}
        </div>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════ */

export default function CivTreeView({ progress, onSelectNode }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiers = useMemo(() => getNodesByTier(), []);
  const currentNodeId = useMemo(() => findCurrentNode(progress), [progress]);

  // Node position map for SVG connections (populated after render)
  const [nodeRects, setNodeRects] = useState<Record<string, DOMRect>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure node positions for connection lines
  useEffect(() => {
    if (!containerRef.current) return;
    const rects: Record<string, DOMRect> = {};
    const containerRect = containerRef.current.getBoundingClientRect();
    containerRef.current.querySelectorAll('[data-node]').forEach(el => {
      const nodeId = el.getAttribute('data-node');
      if (nodeId) {
        const r = el.getBoundingClientRect();
        // Store relative to container
        rects[nodeId] = new DOMRect(
          r.x - containerRect.x,
          r.y - containerRect.y,
          r.width,
          r.height,
        );
      }
    });
    setNodeRects(rects);
  }, [progress]);

  // Auto-scroll to current node column
  useEffect(() => {
    if (!currentNodeId || !scrollRef.current) return;
    const el = scrollRef.current.querySelector(`[data-node="${currentNodeId}"]`);
    if (el) {
      setTimeout(() => {
        const container = scrollRef.current!;
        const nodeEl = el as HTMLElement;
        const scrollTarget = nodeEl.offsetLeft - container.clientWidth / 2 + nodeEl.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' });
      }, 200);
    }
  }, [currentNodeId]);

  // Compute all connections
  const connections = useMemo(() => {
    const conns: { from: string; to: string; fromTier: number }[] = [];
    for (const node of ALL_NODES) {
      for (const preId of node.prerequisites) {
        const preNode = ALL_NODES.find(n => n.id === preId);
        if (preNode) {
          conns.push({ from: preId, to: node.id, fromTier: preNode.tier });
        }
      }
    }
    return conns;
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full overflow-x-auto overflow-y-auto"
      style={{ background: '#0B0F1A' }}
    >
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .animate-ping-slow { animation: ping-slow 2s ease-in-out infinite; }
      `}</style>

      <div ref={containerRef} className="relative inline-flex min-w-full min-h-full p-4 sm:p-6 gap-1 sm:gap-2">
        {/* SVG overlay for connection lines */}
        {Object.keys(nodeRects).length > 0 && (
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            {connections.map(({ from, to, fromTier }) => {
              const fromRect = nodeRects[from];
              const toRect = nodeRects[to];
              if (!fromRect || !toRect) return null;

              const fromStatus = computeNodeStatus(from, ALL_NODES.find(n => n.id === from)?.prerequisites ?? [], progress);
              const isActive = fromStatus === 'completed' || fromStatus === 'mastered';
              const color = isActive ? TIER_COLORS[fromTier] ?? '#4B5563' : '#1E293B';

              // Connect from right-center of source to left-center of target
              const x1 = fromRect.x + fromRect.width / 2 + 30;
              const y1 = fromRect.y + 42;
              const x2 = toRect.x + toRect.width / 2 - 30;
              const y2 = toRect.y + 42;
              const mx = (x1 + x2) / 2;

              return (
                <g key={`${from}-${to}`}>
                  <path
                    d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={color}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    strokeDasharray={isActive ? 'none' : '4 4'}
                    opacity={isActive ? 0.5 : 0.2}
                  />
                </g>
              );
            })}
          </svg>
        )}

        {/* Columns */}
        {Object.entries(tiers)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([tierStr, nodes]) => {
            const tier = Number(tierStr);
            const color = TIER_COLORS[tier] ?? '#9CA3AF';
            const hasCurrentNode = nodes.some(n => n.id === currentNodeId);

            const completedCount = nodes.filter(n => {
              const s = computeNodeStatus(n.id, n.prerequisites, progress);
              return s === 'completed' || s === 'mastered';
            }).length;
            const pct = Math.round((completedCount / nodes.length) * 100);

            return (
              <div
                key={tier}
                className={`
                  flex flex-col items-center shrink-0 relative
                  rounded-2xl border transition-all duration-300
                  ${hasCurrentNode
                    ? 'border-white/10 bg-white/[0.03]'
                    : 'border-transparent bg-transparent'
                  }
                `}
                style={{
                  minWidth: nodes.length > 6 ? '140px' : '120px',
                  width: 'fit-content',
                }}
              >
                {/* Column header */}
                <div className="sticky top-0 z-10 w-full pt-3 pb-2 px-2 text-center backdrop-blur-sm" style={{
                  background: hasCurrentNode ? `linear-gradient(180deg, ${color}08, transparent)` : undefined,
                }}>
                  <h3 className="text-xs sm:text-sm font-bold" style={{ color }}>{TIER_LABELS[tier]}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <div className="w-10 h-1 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <span className="text-[9px] text-gray-500 font-mono">{completedCount}/{nodes.length}</span>
                  </div>
                </div>

                {/* Nodes */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 px-2 pb-4">
                  {nodes.map(node => {
                    const status = computeNodeStatus(node.id, node.prerequisites, progress);
                    const icon = NODE_ICONS[node.id] ?? '📐';
                    const isCurrent = node.id === currentNodeId;

                    return (
                      <ColumnNode
                        key={node.id}
                        node={node}
                        status={status}
                        progress={progress}
                        isCurrent={isCurrent}
                        icon={icon}
                        tierColor={color}
                        onSelect={() => onSelectNode(node.id)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
