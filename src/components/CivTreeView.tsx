import { useRef, useState, useCallback, useEffect, type MouseEvent, type WheelEvent, type TouchEvent } from 'react';
import { ALL_NODES } from '../data/skillTreeData';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus } from '../lib/progress';

interface Props {
  progress: UserProgress;
  onSelectNode: (nodeId: string) => void;
  onViewportChange?: (vp: { x: number; y: number; w: number; h: number; scale: number }) => void;
}

// Layout constants
const NODE_RADIUS = 32;
const TIER_WIDTH = 260;
const NODE_SPACING_Y = 100;
const PADDING_X = 120;
const PADDING_Y = 80;

const TIER_LABELS = ['Prerequisites', 'Foundation', 'Intermediate', 'Advanced', 'Prob & Stats'];

const STATUS_COLORS: Record<string, string> = {
  locked: '#374151',
  unlocked: '#4B5563',
  'in-progress': '#3B82F6',
  completed: '#22C55E',
  mastered: '#F59E0B',
};

const STATUS_BORDER: Record<string, string> = {
  locked: '#1F2937',
  unlocked: '#6B7280',
  'in-progress': '#60A5FA',
  completed: '#4ADE80',
  mastered: '#FBBF24',
};

// Compute fixed positions for all nodes
function computeLayout() {
  const tiers: Record<number, typeof ALL_NODES> = {};
  ALL_NODES.forEach(n => {
    if (!tiers[n.tier]) tiers[n.tier] = [];
    tiers[n.tier].push(n);
  });

  const positions: Record<string, { x: number; y: number }> = {};
  let maxY = 0;

  Object.entries(tiers).forEach(([tierStr, nodes]) => {
    const tier = Number(tierStr);
    const cx = PADDING_X + tier * TIER_WIDTH;
    const totalH = (nodes.length - 1) * NODE_SPACING_Y;
    const startY = PADDING_Y + (tier === 0 ? 0 : 20); // slight offset per tier
    nodes.forEach((n, i) => {
      const y = startY + i * NODE_SPACING_Y - totalH / 2 + 200;
      positions[n.id] = { x: cx, y };
      if (y > maxY) maxY = y;
    });
  });

  const totalWidth = PADDING_X * 2 + 4 * TIER_WIDTH + 100;
  const totalHeight = maxY + PADDING_Y + 100;

  return { positions, totalWidth, totalHeight };
}

const { positions, totalWidth, totalHeight } = computeLayout();

export default function CivTreeView({ progress, onSelectNode, onViewportChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Report viewport
  useEffect(() => {
    if (!onViewportChange || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    onViewportChange({
      x: -pan.x / scale,
      y: -pan.y / scale,
      w: rect.width / scale,
      h: rect.height / scale,
      scale,
    });
  }, [pan, scale, onViewportChange]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(s => Math.min(2, Math.max(0.3, s * delta)));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [dragging, dragStart]);

  const handleMouseUp = useCallback(() => setDragging(false), []);

  // Touch support
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchRef.current = { x: t.clientX - pan.x, y: t.clientY - pan.y };
    }
  }, [pan]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1 && touchRef.current) {
      const t = e.touches[0];
      setPan({ x: t.clientX - touchRef.current.x, y: t.clientY - touchRef.current.y });
    }
  }, []);

  // Navigate to position (called from minimap)
  const navigateTo = useCallback((x: number, y: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPan({
      x: -x * scale + rect.width / 2,
      y: -y * scale + rect.height / 2,
    });
  }, [scale]);

  // Expose navigateTo
  useEffect(() => {
    if (containerRef.current) {
      (containerRef.current as any).__navigateTo = navigateTo;
    }
  }, [navigateTo]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing relative select-none"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { touchRef.current = null; }}
      style={{ touchAction: 'none' }}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Tier labels */}
        {TIER_LABELS.map((label, i) => (
          <text
            key={i}
            x={PADDING_X + i * TIER_WIDTH}
            y={30}
            textAnchor="middle"
            fill="#6B7280"
            fontSize={12}
            fontFamily="monospace"
            fontWeight="bold"
          >
            {label}
          </text>
        ))}

        {/* Dependency lines */}
        {ALL_NODES.map(node =>
          node.prerequisites.map(preId => {
            const from = positions[preId];
            const to = positions[node.id];
            if (!from || !to) return null;
            const mx = (from.x + to.x) / 2;
            const fromStatus = computeNodeStatus(preId, ALL_NODES.find(n => n.id === preId)?.prerequisites ?? [], progress);
            const isActive = fromStatus === 'completed' || fromStatus === 'mastered';
            return (
              <path
                key={`${preId}-${node.id}`}
                d={`M ${from.x + NODE_RADIUS} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x - NODE_RADIUS} ${to.y}`}
                fill="none"
                stroke={isActive ? '#4B5563' : '#1F2937'}
                strokeWidth={2}
                strokeDasharray={isActive ? 'none' : '6 4'}
                opacity={0.6}
              />
            );
          })
        )}

        {/* Nodes */}
        {ALL_NODES.map(node => {
          const pos = positions[node.id];
          if (!pos) return null;
          const status = computeNodeStatus(node.id, node.prerequisites, progress);
          const np = progress.nodes[node.id];
          const score = np?.score ?? 0;
          const topicColor = SKILL_TOPIC_COLORS[node.topic as Topic];
          const isHovered = hoveredNode === node.id;
          const isLocked = status === 'locked';

          return (
            <g
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              onClick={() => !isLocked && onSelectNode(node.id)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
            >
              {/* Glow effect for active/hovered */}
              {(status === 'in-progress' || isHovered) && !isLocked && (
                <circle
                  r={NODE_RADIUS + 6}
                  fill="none"
                  stroke={topicColor?.glow ?? '#60A5FA'}
                  strokeWidth={2}
                  opacity={0.4}
                >
                  <animate attributeName="r" values={`${NODE_RADIUS + 4};${NODE_RADIUS + 8};${NODE_RADIUS + 4}`} dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Progress ring */}
              {(status === 'completed' || status === 'mastered' || status === 'in-progress') && (
                <circle
                  r={NODE_RADIUS + 2}
                  fill="none"
                  stroke={STATUS_BORDER[status]}
                  strokeWidth={3}
                  strokeDasharray={`${(2 * Math.PI * (NODE_RADIUS + 2) * score) / 100} ${2 * Math.PI * (NODE_RADIUS + 2)}`}
                  strokeLinecap="round"
                  transform="rotate(-90)"
                  opacity={0.8}
                />
              )}

              {/* Main circle */}
              <circle
                r={NODE_RADIUS}
                fill={isLocked ? '#111827' : (topicColor?.bg ?? STATUS_COLORS[status])}
                stroke={isLocked ? '#374151' : (topicColor?.primary ?? STATUS_BORDER[status])}
                strokeWidth={isHovered ? 3 : 2}
                opacity={isLocked ? 0.5 : 1}
              />

              {/* Icon/emoji based on status */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={isLocked ? 16 : 13}
                fill={isLocked ? '#4B5563' : '#E5E7EB'}
                fontFamily="monospace"
                fontWeight="bold"
              >
                {isLocked ? '🔒' : ''}
              </text>

              {/* Title (when not locked) */}
              {!isLocked && (
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={9}
                  fill="#E5E7EB"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="600"
                >
                  {node.title.length > 12 ? node.title.slice(0, 11) + '…' : node.title}
                </text>
              )}

              {/* Title below node */}
              <text
                y={NODE_RADIUS + 16}
                textAnchor="middle"
                fontSize={10}
                fill={isLocked ? '#4B5563' : '#9CA3AF'}
                fontFamily="system-ui, sans-serif"
              >
                {node.title.length > 18 ? node.title.slice(0, 17) + '…' : node.title}
              </text>

              {/* Stars for completed */}
              {(status === 'completed' || status === 'mastered') && (
                <text
                  y={NODE_RADIUS + 28}
                  textAnchor="middle"
                  fontSize={10}
                >
                  {score >= 90 ? '⭐⭐⭐' : score >= 70 ? '⭐⭐' : '⭐'}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { positions, totalWidth, totalHeight };
