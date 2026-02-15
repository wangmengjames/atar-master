import { useCallback } from 'react';
import { ALL_NODES } from '../data/skillTreeData';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import { positions, totalWidth, totalHeight } from './CivTreeView';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus } from '../lib/progress';

interface Viewport {
  x: number;
  y: number;
  w: number;
  h: number;
  scale: number;
}

interface Props {
  progress: UserProgress;
  viewport: Viewport;
  onNavigate: (x: number, y: number) => void;
}

const MAP_W = 200;
const MAP_H = 120;

export default function MiniMap({ progress, viewport, onNavigate }: Props) {
  const scaleX = MAP_W / totalWidth;
  const scaleY = MAP_H / totalHeight;
  const mapScale = Math.min(scaleX, scaleY);

  const completedCount = ALL_NODES.filter(n => {
    const s = computeNodeStatus(n.id, n.prerequisites, progress);
    return s === 'completed' || s === 'mastered';
  }).length;
  const pct = Math.round((completedCount / ALL_NODES.length) * 100);

  const handleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / mapScale;
    const my = (e.clientY - rect.top) / mapScale;
    onNavigate(mx, my);
  }, [mapScale, onNavigate]);

  // Viewport rect in minimap coords
  const vpX = viewport.x * mapScale;
  const vpY = viewport.y * mapScale;
  const vpW = viewport.w * mapScale;
  const vpH = viewport.h * mapScale;

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-gray-900/90 border border-gray-700 rounded-lg p-2 backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="text-[10px] text-gray-400 font-mono">MAP</span>
        <span className="text-[10px] text-gray-400 font-mono">{pct}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-gray-800 mb-1.5 mx-0.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <svg
        width={MAP_W}
        height={MAP_H}
        className="cursor-pointer rounded"
        onClick={handleClick}
        style={{ background: '#0D1117' }}
      >
        {/* Connection lines */}
        {ALL_NODES.map(node =>
          node.prerequisites.map(preId => {
            const from = positions[preId];
            const to = positions[node.id];
            if (!from || !to) return null;
            return (
              <line
                key={`m-${preId}-${node.id}`}
                x1={from.x * mapScale}
                y1={from.y * mapScale}
                x2={to.x * mapScale}
                y2={to.y * mapScale}
                stroke="#1F2937"
                strokeWidth={0.5}
              />
            );
          })
        )}

        {/* Nodes */}
        {ALL_NODES.map(node => {
          const pos = positions[node.id];
          if (!pos) return null;
          const status = computeNodeStatus(node.id, node.prerequisites, progress);
          const topicColor = SKILL_TOPIC_COLORS[node.topic as Topic];
          let fill = '#374151';
          if (status === 'completed' || status === 'mastered') fill = '#22C55E';
          else if (status === 'in-progress') fill = '#3B82F6';
          else if (status === 'unlocked') fill = topicColor?.primary ?? '#6B7280';

          return (
            <circle
              key={`m-${node.id}`}
              cx={pos.x * mapScale}
              cy={pos.y * mapScale}
              r={3}
              fill={fill}
              opacity={status === 'locked' ? 0.3 : 0.9}
            />
          );
        })}

        {/* Viewport indicator */}
        <rect
          x={Math.max(0, vpX)}
          y={Math.max(0, vpY)}
          width={Math.min(vpW, MAP_W)}
          height={Math.min(vpH, MAP_H)}
          fill="none"
          stroke="#60A5FA"
          strokeWidth={1.5}
          rx={2}
          opacity={0.7}
        />
      </svg>
    </div>
  );
}
