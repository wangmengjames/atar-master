import { useRef, useState, useEffect, useMemo } from 'react';
import {
  Hash, Sigma, BarChart2, Dice5, TrendingUp,
  PieChart, Calculator, Triangle, Waves, Mountain,
  Bell, Binary, PenTool, Monitor,
  Lock, Play, CheckCircle2, Sparkles, Link2,
  FunctionSquare, Braces, LineChart, GitBranch,
  type LucideIcon,
} from 'lucide-react';
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

const TIER_LABELS = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'VCE Exam'];
const TIER_GRADIENTS = [
  ['#6366F1', '#8B5CF6'], // Indigo → Violet
  ['#A855F7', '#D946EF'], // Purple → Fuchsia
  ['#F43F5E', '#EC4899'], // Rose → Pink
  ['#3B82F6', '#06B6D4'], // Blue → Cyan
  ['#14B8A6', '#10B981'], // Teal → Emerald
  ['#F59E0B', '#EAB308'], // Amber → Gold
];

// Lucide icon map — premium SVG icons instead of emoji
const NODE_ICON_MAP: Record<string, LucideIcon> = {
  'y8-number': Hash,
  'y8-algebra': Braces,
  'y8-statistics': BarChart2,
  'y8-probability': Dice5,
  'y9-number': Sigma,
  'y9-algebra': TrendingUp,
  'y9-statistics': LineChart,
  'y9-probability': PieChart,
  'y10-number': Calculator,
  'y10-algebra': FunctionSquare,
  'y10-statistics': BarChart2,
  'y10-probability': GitBranch,
  'y10a-algebra': Link2,
  'y10a-probability': Dice5,
  'y11-a1-linear': TrendingUp,
  'y11-a2-quadratics': Waves,
  'y11-a3-domain-range': Braces,
  'y11-a4-transformations': GitBranch,
  'y11-a5-trigonometry': Triangle,
  'y11-a6-logs-indices': Sigma,
  'y11-a7-differentiation': LineChart,
  'y11-a8-integration': Waves,
  'y11-a9-combinatorics': PieChart,
  'y12-a1-algebra-functions': Sparkles,
  'y12-a2-differentiation': Mountain,
  'y12-a3-integration': Waves,
  'y12-a4-discrete-prob': Dice5,
  'y12-a5-continuous-prob': Bell,
  'y12-a6-pseudocode': Binary,
  'vce-exam1': PenTool,
  'vce-exam2': Monitor,
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
  // Prefer in-progress nodes (user already started)
  for (const node of ALL_NODES) {
    const status = computeNodeStatus(node.id, node.prerequisites, progress);
    if (status === 'in-progress') return node.id;
  }
  // If no in-progress, find the first unlocked node that hasn't been completed
  // but SKIP tier 0 if there are higher-tier unlocked nodes
  const unlocked = ALL_NODES.filter(n => {
    const s = computeNodeStatus(n.id, n.prerequisites, progress);
    return s === 'unlocked';
  });
  // Prefer highest tier unlocked node (most advanced frontier)
  if (unlocked.length > 0) {
    const maxTier = Math.max(...unlocked.map(n => n.tier));
    return unlocked.find(n => n.tier === maxTier)?.id ?? unlocked[0].id;
  }
  return null;
}

/* ─── Node Card ─── */

function NodeCard({
  node,
  status,
  progress,
  isCurrent,
  tierGrad,
  onSelect,
  delay,
}: {
  node: typeof ALL_NODES[0];
  status: string;
  progress: UserProgress;
  isCurrent: boolean;
  tierGrad: [string, string];
  onSelect: () => void;
  delay: number;
}) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed' || status === 'mastered';
  const isMastered = status === 'mastered';
  const np = progress.nodes[node.id];
  const levelsCompleted = np?.levelsCompleted?.length ?? 0;

  const examCount = useMemo(() => getNodeQuestionCounts()[node.id] ?? 0, [node.id]);
  const trainingCount = useMemo(() => getTrainingForNode(node.id).length, [node.id]);
  const totalQ = examCount + trainingCount;

  const Icon = NODE_ICON_MAP[node.id] ?? Calculator;
  const [g1, g2] = tierGrad;

  return (
    <button
      onClick={onSelect}
      disabled={false}
      data-node={node.id}
      className={`
        group relative w-[130px] sm:w-[150px] rounded-xl transition-all duration-300
        ${isLocked
          ? 'opacity-50 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]'
          : 'cursor-pointer hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]'
        }
      `}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {/* Card body */}
      <div
        className={`
          relative rounded-xl overflow-hidden
          border backdrop-blur-md
          ${isCompleted
            ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
            : isLocked
              ? 'border-white/[0.04] bg-white/[0.02]'
              : 'border-white/[0.08] bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.06]'
          }
        `}
      >
        {/* Top gradient accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: isLocked
              ? '#1F2937'
              : isCompleted
                ? 'linear-gradient(90deg, #22C55E, #10B981)'
                : `linear-gradient(90deg, ${g1}, ${g2})`,
            opacity: isLocked ? 0.3 : 1,
          }}
        />

        <div className="p-3 sm:p-3.5">
          {/* Icon + status */}
          <div className="flex items-start justify-between mb-2">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{
                background: isLocked
                  ? 'rgba(255,255,255,0.03)'
                  : isCompleted
                    ? 'rgba(34,197,94,0.12)'
                    : `linear-gradient(135deg, ${g1}18, ${g2}12)`,
                border: `1px solid ${isLocked ? 'rgba(255,255,255,0.04)' : isCompleted ? 'rgba(34,197,94,0.2)' : `${g1}25`}`,
              }}
            >
              {isLocked ? (
                <Lock size={16} className="text-gray-600" />
              ) : (
                <Icon
                  size={18}
                  style={{ color: isCompleted ? '#22C55E' : g1 }}
                  strokeWidth={1.8}
                />
              )}
            </div>

            {/* Status indicator */}
            {isCompleted && (
              <div className="flex items-center gap-0.5">
                <CheckCircle2 size={14} className={isMastered ? 'text-amber-400' : 'text-emerald-400'} />
              </div>
            )}
            {/* Play indicator removed — no single "current" node */}
          </div>

          {/* Title */}
          <h4 className={`text-[11px] sm:text-xs font-semibold leading-tight mb-1.5 line-clamp-2 ${
            isLocked ? 'text-gray-600' : isCompleted ? 'text-emerald-200' : 'text-gray-100'
          }`}>
            {node.title}
          </h4>

          {/* Progress + stats */}
          {!isLocked && (
            <div className="space-y-1.5">
              {/* Level progress bar */}
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(levelsCompleted / 4) * 100}%`,
                    background: isCompleted
                      ? 'linear-gradient(90deg, #22C55E, #10B981)'
                      : `linear-gradient(90deg, ${g1}, ${g2})`,
                  }}
                />
              </div>

              {/* Stats row */}
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-500 font-mono">{levelsCompleted}/4</span>
                {totalQ > 0 && (
                  <span className="text-[9px] text-gray-500">{totalQ}Q</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

/* ─── Column Header ─── */

function ColumnHeader({ tier, nodes, progress, gradient }: {
  tier: number;
  nodes: typeof ALL_NODES;
  progress: UserProgress;
  gradient: [string, string];
}) {
  const completedCount = nodes.filter(n => {
    const s = computeNodeStatus(n.id, n.prerequisites, progress);
    return s === 'completed' || s === 'mastered';
  }).length;
  const pct = Math.round((completedCount / nodes.length) * 100);
  const [g1, g2] = gradient;

  return (
    <div className="w-full px-2 pb-3 pt-2">
      {/* Gradient banner */}
      <div
        className="rounded-lg px-3 py-2.5 sm:py-3 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${g1}20, ${g2}10)`,
          border: `1px solid ${g1}20`,
        }}
      >
        {/* Subtle shine */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `radial-gradient(ellipse at 30% 0%, white, transparent 70%)`,
          }}
        />

        <h3 className="text-xs sm:text-sm font-bold relative" style={{ color: g1 }}>
          {TIER_LABELS[tier]}
        </h3>

        {/* Segmented progress bar */}
        <div className="flex items-center justify-center gap-1 mt-2">
          {nodes.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full flex-1 max-w-[16px] transition-all duration-500"
              style={{
                background: i < completedCount
                  ? `linear-gradient(90deg, ${g1}, ${g2})`
                  : 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
        <span className="text-[9px] text-gray-500 mt-1.5 block font-mono">{pct}%</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */

export default function CivTreeView({ progress, onSelectNode, selectedNodeId: externalSelectedId }: Props & { selectedNodeId?: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiers = useMemo(() => getNodesByTier(), []);
  const progressCurrentId = useMemo(() => findCurrentNode(progress), [progress]);
  // If user clicked a node, highlight that one; otherwise fall back to progress-based current
  const currentNodeId = externalSelectedId ?? progressCurrentId;

  // Mobile detection for responsive dual-col
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // SVG connections
  const [nodeRects, setNodeRects] = useState<Record<string, DOMRect>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const rects: Record<string, DOMRect> = {};
      const cRect = containerRef.current.getBoundingClientRect();
      containerRef.current.querySelectorAll('[data-node]').forEach(el => {
        const nodeId = el.getAttribute('data-node');
        if (nodeId) {
          const r = el.getBoundingClientRect();
          rects[nodeId] = new DOMRect(r.x - cRect.x, r.y - cRect.y, r.width, r.height);
        }
      });
      setNodeRects(rects);
    };
    measure();
    // Re-measure after animations settle
    const t = setTimeout(measure, 500);
    return () => clearTimeout(t);
  }, [progress, isMobile]);

  // No auto-scroll — let user browse freely

  const connections = useMemo(() => {
    return ALL_NODES.flatMap(node =>
      node.prerequisites.map(preId => ({
        from: preId,
        to: node.id,
        fromTier: ALL_NODES.find(n => n.id === preId)?.tier ?? 0,
      }))
    );
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full h-full overflow-x-auto overflow-y-auto"
    >
      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes flow {
          to { stroke-dashoffset: -20; }
        }
      `}</style>

      {/* Rich background */}
      <div
        className="min-w-full min-h-full relative"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99,102,241,0.06), transparent),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(14,165,233,0.04), transparent),
            linear-gradient(180deg, #08090F 0%, #0C0E18 50%, #08090F 100%)
          `,
        }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div ref={containerRef} className="relative inline-flex min-w-full p-4 sm:p-6 gap-2 sm:gap-3">
          {/* SVG connections */}
          {Object.keys(nodeRects).length > 0 && (
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                {TIER_GRADIENTS.map(([c1, c2], i) => (
                  <linearGradient key={i} id={`conn-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={c1} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={c2} stopOpacity={0.4} />
                  </linearGradient>
                ))}
              </defs>
              {connections.map(({ from, to, fromTier }) => {
                const fR = nodeRects[from];
                const tR = nodeRects[to];
                if (!fR || !tR) return null;

                const fromStatus = computeNodeStatus(from, ALL_NODES.find(n => n.id === from)?.prerequisites ?? [], progress);
                const isActive = fromStatus === 'completed' || fromStatus === 'mastered';

                // Smart anchor selection: if target is to the right, use right→left;
                // if target is below (dual-col same tier area), use bottom→top
                const fCx = fR.x + fR.width / 2;
                const fCy = fR.y + fR.height / 2;
                const tCx = tR.x + tR.width / 2;
                const tCy = tR.y + tR.height / 2;
                const dx = tCx - fCx;
                const dy = tCy - fCy;

                let x1: number, y1: number, x2: number, y2: number, pathD: string;

                if (Math.abs(dx) > fR.width * 0.6) {
                  // Horizontal flow: exit right, enter left
                  x1 = fR.x + fR.width - 4;
                  y1 = fCy;
                  x2 = tR.x + 4;
                  y2 = tCy;
                  const mx = (x1 + x2) / 2;
                  pathD = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
                } else {
                  // Vertical flow (dual-col, nodes stacked): exit bottom, enter top
                  x1 = fCx;
                  y1 = dy > 0 ? fR.y + fR.height : fR.y;
                  x2 = tCx;
                  y2 = dy > 0 ? tR.y : tR.y + tR.height;
                  const my = (y1 + y2) / 2;
                  pathD = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
                }

                return (
                  <g key={`${from}-${to}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isActive ? `url(#conn-grad-${fromTier})` : 'rgba(255,255,255,0.04)'}
                      strokeWidth={isActive ? 2 : 1}
                      strokeDasharray={isActive ? 'none' : '3 5'}
                      style={!isActive ? { animation: 'flow 2s linear infinite' } : undefined}
                    />
                    {/* Glow for active lines */}
                    {isActive && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke={TIER_GRADIENTS[fromTier]?.[0] ?? '#6366F1'}
                        strokeWidth={4}
                        opacity={0.08}
                        filter="blur(4px)"
                      />
                    )}
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
              const gradient = TIER_GRADIENTS[tier] as [string, string];
              const hasCurrentNode = nodes.some(n => n.id === currentNodeId);
              // Tiers with many nodes → two-column layout for widescreen
              const useDualCol = !isMobile && tier >= 2 && tier <= 4 && nodes.length > 4;

              if (useDualCol) {
                const mid = Math.ceil(nodes.length / 2);
                const colA = nodes.slice(0, mid);
                const colB = nodes.slice(mid);

                return (
                  <div
                    key={tier}
                    className="flex flex-col items-center shrink-0 relative"
                    style={{ minWidth: '308px' }}
                  >
                    {false && (
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse 100% 50% at 50% 30%, ${gradient[0]}08, transparent)`,
                        }}
                      />
                    )}

                    <ColumnHeader
                      tier={tier}
                      nodes={nodes}
                      progress={progress}
                      gradient={gradient}
                    />

                    {/* Dual-column node grid */}
                    <div className="flex gap-2 sm:gap-3 px-1.5">
                      {/* Left column */}
                      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                        {colA.map((node, i) => {
                          const status = computeNodeStatus(node.id, node.prerequisites, progress);
                          const isCurrent = node.id === currentNodeId;
                          return (
                            <NodeCard
                              key={node.id}
                              node={node}
                              status={status}
                              progress={progress}
                              isCurrent={isCurrent}
                              tierGrad={gradient}
                              onSelect={() => onSelectNode(node.id)}
                              delay={i * 50}
                            />
                          );
                        })}
                      </div>
                      {/* Right column */}
                      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                        {colB.map((node, i) => {
                          const status = computeNodeStatus(node.id, node.prerequisites, progress);
                          const isCurrent = node.id === currentNodeId;
                          return (
                            <NodeCard
                              key={node.id}
                              node={node}
                              status={status}
                              progress={progress}
                              isCurrent={isCurrent}
                              tierGrad={gradient}
                              onSelect={() => onSelectNode(node.id)}
                              delay={(i + colA.length) * 50}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={tier}
                  className="flex flex-col items-center shrink-0 relative"
                  style={{ minWidth: '146px' }}
                >
                  {/* Active column spotlight */}
                  {false && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse 100% 50% at 50% 30%, ${gradient[0]}08, transparent)`,
                      }}
                    />
                  )}

                  <ColumnHeader
                    tier={tier}
                    nodes={nodes}
                    progress={progress}
                    gradient={gradient}
                  />

                  {/* Node cards */}
                  <div className="flex flex-col items-center gap-2.5 sm:gap-3 px-1.5">
                    {nodes.map((node, i) => {
                      const status = computeNodeStatus(node.id, node.prerequisites, progress);
                      const isCurrent = node.id === currentNodeId;

                      return (
                        <NodeCard
                          key={node.id}
                          node={node}
                          status={status}
                          progress={progress}
                          isCurrent={isCurrent}
                          tierGrad={gradient}
                          onSelect={() => onSelectNode(node.id)}
                          delay={i * 50}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
