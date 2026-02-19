import { useRef, useState, useEffect, useMemo } from 'react';
import {
  Hash, Sigma, BarChart2, Dice5, TrendingUp,
  PieChart, Calculator, Triangle, Waves, Mountain,
  Bell, Binary, PenTool, Monitor,
  Lock, CheckCircle2, Sparkles, Link2,
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
const TIER_COLORS: [string, string][] = [
  ['#6366F1', '#8B5CF6'],
  ['#A855F7', '#D946EF'],
  ['#F43F5E', '#EC4899'],
  ['#3B82F6', '#06B6D4'],
  ['#14B8A6', '#10B981'],
  ['#F59E0B', '#EAB308'],
];

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

/* ─── Node Card ─── */

function NodeCard({
  node,
  status,
  progress,
  tierColor,
  onSelect,
  delay,
}: {
  node: typeof ALL_NODES[0];
  status: string;
  progress: UserProgress;
  tierColor: [string, string];
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
  const [g1, g2] = tierColor;

  return (
    <button
      onClick={onSelect}
      disabled={false}
      data-node={node.id}
      className={`
        group relative w-[130px] sm:w-[150px] rounded-xl transition-all duration-300
        ${isLocked
          ? 'opacity-40 cursor-pointer hover:-translate-y-0.5 active:scale-[0.98]'
          : 'cursor-pointer hover:-translate-y-1 hover:shadow-md active:scale-[0.98]'
        }
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Card body */}
      <div
        className={`
          relative rounded-xl overflow-hidden border
          ${isCompleted
            ? 'border-green-200 bg-green-50'
            : isLocked
              ? 'border-black/6 bg-white'
              : 'border-black/10 bg-white shadow-sm hover:border-black/15'
          }
        `}
      >
        {/* Top accent bar */}
        <div
          className="h-[3px] w-full"
          style={{
            background: isLocked
              ? 'rgba(0,0,0,0.06)'
              : isCompleted
                ? 'linear-gradient(90deg, #22C55E, #10B981)'
                : `linear-gradient(90deg, ${g1}, ${g2})`,
          }}
        />

        <div className="p-3 sm:p-3.5">
          {/* Icon + status */}
          <div className="flex items-start justify-between mb-2">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
              style={{
                background: isLocked
                  ? 'rgba(0,0,0,0.03)'
                  : isCompleted
                    ? 'rgba(34,197,94,0.1)'
                    : `${g1}18`,
                border: `1px solid ${isLocked ? 'rgba(0,0,0,0.06)' : isCompleted ? 'rgba(34,197,94,0.2)' : `${g1}22`}`,
              }}
            >
              {isLocked ? (
                <Lock size={16} className="text-black/20" />
              ) : (
                <Icon
                  size={18}
                  style={{ color: isCompleted ? '#16a34a' : g1 }}
                  strokeWidth={1.8}
                />
              )}
            </div>

            {isCompleted && (
              <CheckCircle2 size={14} className={isMastered ? 'text-amber-500' : 'text-green-500'} />
            )}
          </div>

          {/* Title */}
          <h4 className={`text-[11px] sm:text-xs font-semibold leading-tight mb-1.5 line-clamp-2 text-left ${
            isLocked ? 'text-black/20' : isCompleted ? 'text-green-700' : 'text-black/80'
          }`}>
            {node.title}
          </h4>

          {/* Progress + stats */}
          {!isLocked && (
            <div className="space-y-1.5">
              <div className="h-1 rounded-full bg-black/8 overflow-hidden">
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
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-black/30 font-mono">{levelsCompleted}/4</span>
                {totalQ > 0 && (
                  <span className="text-[9px] text-black/30">{totalQ}Q</span>
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

function ColumnHeader({ tier, nodes, progress, color }: {
  tier: number;
  nodes: typeof ALL_NODES;
  progress: UserProgress;
  color: [string, string];
}) {
  const completedCount = nodes.filter(n => {
    const s = computeNodeStatus(n.id, n.prerequisites, progress);
    return s === 'completed' || s === 'mastered';
  }).length;
  const pct = Math.round((completedCount / nodes.length) * 100);
  const [g1, g2] = color;

  return (
    <div className="w-full px-2 pb-3 pt-2">
      <div className="rounded-lg px-3 py-2.5 sm:py-3 text-center bg-white border border-black/8">
        <h3 className="text-xs sm:text-sm font-semibold" style={{ color: g1 }}>
          {TIER_LABELS[tier]}
        </h3>
        <div className="flex items-center justify-center gap-1 mt-2">
          {nodes.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full flex-1 max-w-[16px] transition-all duration-500"
              style={{
                background: i < completedCount
                  ? `linear-gradient(90deg, ${g1}, ${g2})`
                  : 'rgba(0,0,0,0.08)',
              }}
            />
          ))}
        </div>
        <span className="text-[9px] text-black/30 mt-1.5 block font-mono">{pct}%</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */

export default function CivTreeView({ progress, onSelectNode }: Props & { selectedNodeId?: string | null }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tiers = useMemo(() => getNodesByTier(), []);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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
    const t = setTimeout(measure, 500);
    return () => clearTimeout(t);
  }, [progress, isMobile]);

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
      <div
        className="min-w-full min-h-full relative bg-[#FAFAFA]"
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.07) 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div ref={containerRef} className="relative inline-flex min-w-full p-4 sm:p-6 gap-2 sm:gap-3">
          {/* SVG connections */}
          {Object.keys(nodeRects).length > 0 && (
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                {TIER_COLORS.map(([c1, c2], i) => (
                  <linearGradient key={i} id={`conn-grad-${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={c1} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={c2} stopOpacity={0.5} />
                  </linearGradient>
                ))}
              </defs>
              {connections.map(({ from, to, fromTier }) => {
                const fR = nodeRects[from];
                const tR = nodeRects[to];
                if (!fR || !tR) return null;

                const fromStatus = computeNodeStatus(from, ALL_NODES.find(n => n.id === from)?.prerequisites ?? [], progress);
                const isActive = fromStatus === 'completed' || fromStatus === 'mastered';

                const fCx = fR.x + fR.width / 2;
                const fCy = fR.y + fR.height / 2;
                const tCx = tR.x + tR.width / 2;
                const tCy = tR.y + tR.height / 2;
                const dx = tCx - fCx;

                let x1: number, y1: number, x2: number, y2: number, pathD: string;

                if (Math.abs(dx) > fR.width * 0.6) {
                  x1 = fR.x + fR.width - 4;
                  y1 = fCy;
                  x2 = tR.x + 4;
                  y2 = tCy;
                  const mx = (x1 + x2) / 2;
                  pathD = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
                } else {
                  const dy = tCy - fCy;
                  x1 = fCx;
                  y1 = dy > 0 ? fR.y + fR.height : fR.y;
                  x2 = tCx;
                  y2 = dy > 0 ? tR.y : tR.y + tR.height;
                  const my = (y1 + y2) / 2;
                  pathD = `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
                }

                return (
                  <path
                    key={`${from}-${to}`}
                    d={pathD}
                    fill="none"
                    stroke={isActive ? `url(#conn-grad-${fromTier})` : 'rgba(0,0,0,0.08)'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? 'none' : '3 5'}
                  />
                );
              })}
            </svg>
          )}

          {/* Columns */}
          {Object.entries(tiers)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([tierStr, nodes]) => {
              const tier = Number(tierStr);
              const color = TIER_COLORS[tier] as [string, string];
              const useDualCol = !isMobile && tier >= 2 && tier <= 4 && nodes.length > 4;

              if (useDualCol) {
                const mid = Math.ceil(nodes.length / 2);
                const colA = nodes.slice(0, mid);
                const colB = nodes.slice(mid);

                return (
                  <div
                    key={tier}
                    className="flex flex-col items-center shrink-0"
                    style={{ minWidth: '308px' }}
                  >
                    <ColumnHeader tier={tier} nodes={nodes} progress={progress} color={color} />
                    <div className="flex gap-2 sm:gap-3 px-1.5">
                      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                        {colA.map((node, i) => {
                          const status = computeNodeStatus(node.id, node.prerequisites, progress);
                          return (
                            <NodeCard
                              key={node.id}
                              node={node}
                              status={status}
                              progress={progress}
                              tierColor={color}
                              onSelect={() => onSelectNode(node.id)}
                              delay={i * 50}
                            />
                          );
                        })}
                      </div>
                      <div className="flex flex-col items-center gap-2.5 sm:gap-3">
                        {colB.map((node, i) => {
                          const status = computeNodeStatus(node.id, node.prerequisites, progress);
                          return (
                            <NodeCard
                              key={node.id}
                              node={node}
                              status={status}
                              progress={progress}
                              tierColor={color}
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
                  className="flex flex-col items-center shrink-0"
                  style={{ minWidth: '146px' }}
                >
                  <ColumnHeader tier={tier} nodes={nodes} progress={progress} color={color} />
                  <div className="flex flex-col items-center gap-2.5 sm:gap-3 px-1.5">
                    {nodes.map((node, i) => {
                      const status = computeNodeStatus(node.id, node.prerequisites, progress);
                      return (
                        <NodeCard
                          key={node.id}
                          node={node}
                          status={status}
                          progress={progress}
                          tierColor={color}
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
