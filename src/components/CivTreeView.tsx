import { useEffect, useMemo, useRef, useState } from 'react';
import { Calculator, CheckCircle2, Lock } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus } from '../lib/progress';
import { getMaxLevelsForNode, getNodeStudyTotals } from '../lib/skillTree';
import { NODE_ICON_MAP, TIER_COLORS } from '../data/skillTreeVisuals';

interface Props {
  progress: UserProgress;
  onSelectNode: (nodeId: string) => void;
  onViewportChange?: (vp: { x: number; y: number; w: number; h: number; scale: number }) => void;
  selectedNodeId?: string | null;
}

const TIER_META = [
  { label: 'Year 8', copy: 'Core number sense, algebra and data habits.' },
  { label: 'Year 9', copy: 'Bridge into more abstract patterns and structure.' },
  { label: 'Year 10', copy: 'Sharpen algebraic fluency and probability thinking.' },
  { label: 'Year 11', copy: 'Transition into Methods units with guided depth.' },
  { label: 'Year 12', copy: 'Move from fluency to exam-speed execution.' },
  { label: 'VCE Exam', copy: 'Finish with full exam conditions and synthesis.' },
] as const;

function getNodesByTier() {
  const tiers: Record<number, typeof ALL_NODES> = {};

  ALL_NODES.forEach((node) => {
    if (!tiers[node.tier]) tiers[node.tier] = [];
    tiers[node.tier].push(node);
  });

  return tiers;
}

function NodeCard({
  node,
  status,
  progress,
  selected,
  tierColor,
  onSelect,
}: {
  node: typeof ALL_NODES[0];
  status: string;
  progress: UserProgress;
  selected: boolean;
  tierColor: [string, string];
  onSelect: () => void;
}) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed' || status === 'mastered';
  const nodeProgress = progress.nodes[node.id];
  const Icon = NODE_ICON_MAP[node.id] ?? Calculator;
  const [accent] = tierColor;
  const totalLevels = getMaxLevelsForNode(node.id);
  const completedLevels = nodeProgress?.levelsCompleted.filter((level) => level <= totalLevels).length ?? 0;
  const studyTotals = getNodeStudyTotals(node.id);
  const progressWidth = totalLevels ? (completedLevels / totalLevels) * 100 : 0;

  return (
    <button
      onClick={onSelect}
      data-node={node.id}
      className={`
        group relative w-[152px] rounded-[26px] border p-4 text-left transition-all duration-200 lg:w-[168px]
        ${isLocked
          ? 'border-black/6 bg-white/62 hover:border-black/8'
          : isCompleted
            ? 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-300'
            : 'border-black/10 bg-white/90 hover:-translate-y-0.5 hover:border-black/16 hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)]'
        }
        ${selected ? 'ring-2 ring-[rgba(16,163,127,0.22)] ring-offset-2 ring-offset-transparent' : ''}
      `}
    >
      <div
        className="absolute inset-x-4 top-0 h-px"
        style={{ background: isLocked ? 'rgba(15,23,42,0.08)' : `linear-gradient(90deg, ${accent}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl border"
          style={{
            background: isLocked ? 'rgba(15,23,42,0.03)' : `${accent}10`,
            borderColor: isLocked ? 'rgba(15,23,42,0.08)' : `${accent}20`,
          }}
        >
          {isLocked ? (
            <Lock size={16} className="text-black/25" />
          ) : (
            <Icon size={18} style={{ color: accent }} strokeWidth={1.8} />
          )}
        </div>

        {isCompleted && <CheckCircle2 size={16} className="text-emerald-600" />}
      </div>

      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-soft)]">{node.topic}</div>
        <h3 className={`mt-2 text-sm font-semibold leading-5 tracking-tight ${isLocked ? 'text-black/30' : 'text-[var(--ink)]'}`}>
          {node.title}
        </h3>
        <p className={`mt-2 text-xs leading-5 ${isLocked ? 'text-black/22' : 'text-[var(--muted)]'}`}>
          {studyTotals.totalCount > 0 ? `${studyTotals.totalCount} linked questions` : 'Questions coming soon'}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-black/6">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressWidth}%`,
              background: isCompleted ? '#10b981' : accent,
            }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
          <span>{completedLevels}/{totalLevels} levels</span>
          <span>{status === 'locked' ? 'Locked' : isCompleted ? 'Done' : 'Ready'}</span>
        </div>
      </div>
    </button>
  );
}

function ColumnHeader({
  tier,
  nodes,
  progress,
  color,
}: {
  tier: number;
  nodes: typeof ALL_NODES;
  progress: UserProgress;
  color: [string, string];
}) {
  const completedCount = nodes.filter((node) => {
    const status = computeNodeStatus(node.id, node.prerequisites, progress);
    return status === 'completed' || status === 'mastered';
  }).length;
  const pct = nodes.length ? Math.round((completedCount / nodes.length) * 100) : 0;
  const [accent] = color;

  return (
    <div className="w-full px-2 pb-4 pt-2">
      <div className="rounded-[24px] border border-black/8 bg-white/82 p-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-soft)]">Stage {tier + 1}</div>
        <h3 className="mt-2 text-base font-semibold tracking-tight" style={{ color: accent }}>
          {TIER_META[tier].label}
        </h3>
        <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{TIER_META[tier].copy}</p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/6">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${pct}%`, background: accent }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--muted)]">
          <span>{completedCount}/{nodes.length} complete</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  );
}

export default function CivTreeView({ progress, onSelectNode, selectedNodeId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodeRects, setNodeRects] = useState<Record<string, DOMRect>>({});
  const tiers = useMemo(() => getNodesByTier(), []);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;

      const rects: Record<string, DOMRect> = {};
      const containerRect = containerRef.current.getBoundingClientRect();

      containerRef.current.querySelectorAll<HTMLElement>('[data-node]').forEach((element) => {
        const nodeId = element.getAttribute('data-node');
        if (!nodeId) return;

        const rect = element.getBoundingClientRect();
        rects[nodeId] = new DOMRect(
          rect.x - containerRect.x,
          rect.y - containerRect.y,
          rect.width,
          rect.height,
        );
      });

      setNodeRects(rects);
    };

    const frame = requestAnimationFrame(measure);
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;

    if (containerRef.current && observer) {
      observer.observe(containerRef.current);
      containerRef.current.querySelectorAll<HTMLElement>('[data-node]').forEach((element) => observer.observe(element));
    }

    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [progress, isMobile, selectedNodeId]);

  const connections = useMemo(() => (
    ALL_NODES.flatMap((node) => node.prerequisites.map((prereqId) => ({
      from: prereqId,
      to: node.id,
      fromTier: ALL_NODES.find((item) => item.id === prereqId)?.tier ?? 0,
    })))
  ), []);

  return (
    <div ref={scrollRef} className="h-full w-full overflow-auto">
      <div className="relative min-h-full min-w-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(244,241,233,0.92))]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.06) 0.5px, transparent 0.5px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div ref={containerRef} className="relative inline-flex min-h-full min-w-full gap-4 px-4 py-5 sm:px-6 sm:py-6">
          {Object.keys(nodeRects).length > 0 && (
            <svg className="pointer-events-none absolute inset-0" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                {TIER_COLORS.map(([from, to], index) => (
                  <linearGradient key={index} id={`skill-connection-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={from} stopOpacity={0.32} />
                    <stop offset="100%" stopColor={to} stopOpacity={0.22} />
                  </linearGradient>
                ))}
              </defs>

              {connections.map(({ from, to, fromTier }) => {
                const startRect = nodeRects[from];
                const endRect = nodeRects[to];
                if (!startRect || !endRect) return null;

                const status = computeNodeStatus(from, ALL_NODES.find((node) => node.id === from)?.prerequisites ?? [], progress);
                const isActive = status === 'completed' || status === 'mastered';

                const startX = startRect.x + startRect.width - 6;
                const startY = startRect.y + (startRect.height / 2);
                const endX = endRect.x + 6;
                const endY = endRect.y + (endRect.height / 2);
                const midX = (startX + endX) / 2;
                const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

                return (
                  <path
                    key={`${from}-${to}`}
                    d={path}
                    fill="none"
                    stroke={isActive ? `url(#skill-connection-${fromTier})` : 'rgba(15,23,42,0.08)'}
                    strokeWidth={isActive ? 2 : 1.25}
                    strokeDasharray={isActive ? 'none' : '4 6'}
                  />
                );
              })}
            </svg>
          )}

          {Object.entries(tiers)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([tierKey, nodes]) => {
              const tier = Number(tierKey);
              const color = TIER_COLORS[tier] as [string, string];
              const useDualColumn = !isMobile && tier >= 2 && tier <= 4 && nodes.length > 4;

              if (useDualColumn) {
                const midpoint = Math.ceil(nodes.length / 2);
                const firstColumn = nodes.slice(0, midpoint);
                const secondColumn = nodes.slice(midpoint);

                return (
                  <div key={tier} className="flex shrink-0 flex-col items-center" style={{ minWidth: '352px' }}>
                    <ColumnHeader tier={tier} nodes={nodes} progress={progress} color={color} />
                    <div className="flex gap-4 px-2">
                      {[firstColumn, secondColumn].map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col items-center gap-3">
                          {column.map((node) => {
                            const status = computeNodeStatus(node.id, node.prerequisites, progress);

                            return (
                              <NodeCard
                                key={node.id}
                                node={node}
                                status={status}
                                progress={progress}
                                selected={selectedNodeId === node.id}
                                tierColor={color}
                                onSelect={() => onSelectNode(node.id)}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={tier} className="flex shrink-0 flex-col items-center" style={{ minWidth: '182px' }}>
                  <ColumnHeader tier={tier} nodes={nodes} progress={progress} color={color} />
                  <div className="flex flex-col items-center gap-3 px-2">
                    {nodes.map((node) => {
                      const status = computeNodeStatus(node.id, node.prerequisites, progress);

                      return (
                        <NodeCard
                          key={node.id}
                          node={node}
                          status={status}
                          progress={progress}
                          selected={selectedNodeId === node.id}
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
    </div>
  );
}
