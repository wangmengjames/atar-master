import { useState, useCallback, useMemo } from 'react';
import type { SkillTreeNode, SkillNodeStatus, Topic } from '../types';
import { SkillNodeStatus as SNS, SKILL_TOPIC_COLORS } from '../types';
import { UNIFIED_SKILL_TREE } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
// SkillNodePanel removed — now used separately in CivTree flow

interface SkillTreeViewProps {
  progress: Record<string, { status: SkillNodeStatus; attempts: number }>;
  onCompleteNode: (nodeId: string) => void;
}

const TIER_LABELS = ['PREREQUISITES', 'FOUNDATION', 'INTERMEDIATE', 'ADVANCED', 'PROB & STATS'];
const NODE_RADIUS = 26;
const TIER_HEIGHT = 180;
const COL_WIDTH = 120;

export default function SkillTreeView({ progress, onCompleteNode: _onCompleteNode }: SkillTreeViewProps) {
  const tree = UNIFIED_SKILL_TREE;
  const [_selectedNode, setSelectedNode] = useState<SkillTreeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const questionCounts = useMemo(() => getNodeQuestionCounts(), []);

  const getStatus = useCallback((nodeId: string): SkillNodeStatus => {
    if (progress[nodeId]) return progress[nodeId].status;
    const node = tree.nodes.find(n => n.id === nodeId);
    if (!node) return SNS.LOCKED;
    if (node.prerequisites.length === 0) return SNS.UNLOCKED;
    const allDone = node.prerequisites.every(pId => {
      const ps = progress[pId]?.status;
      return ps === SNS.COMPLETED || ps === SNS.MASTERED;
    });
    return allDone ? SNS.UNLOCKED : SNS.LOCKED;
  }, [progress, tree.nodes]);

  // Group nodes by tier for layout
  const tiers = useMemo(() => {
    const grouped = new Map<number, SkillTreeNode[]>();
    tree.nodes.forEach(n => {
      const arr = grouped.get(n.tier) || [];
      arr.push(n);
      grouped.set(n.tier, arr);
    });
    return grouped;
  }, [tree.nodes]);

  const maxTier = Math.max(...tree.nodes.map(n => n.tier));
  const maxNodesInTier = Math.max(...[...tiers.values()].map(arr => arr.length));
  const svgWidth = Math.max(maxNodesInTier * COL_WIDTH + 120, 900);
  const svgHeight = (maxTier + 1) * TIER_HEIGHT + 100;

  // Calculate positions centered per tier
  const nodePositions = useMemo(() => {
    const pos = new Map<string, { x: number; y: number }>();
    tiers.forEach((nodes, tier) => {
      const tierWidth = nodes.length * COL_WIDTH;
      const startX = (svgWidth - tierWidth) / 2 + COL_WIDTH / 2;
      nodes.forEach((node, i) => {
        pos.set(node.id, {
          x: startX + i * COL_WIDTH,
          y: tier * TIER_HEIGHT + 80,
        });
      });
    });
    return pos;
  }, [tiers, svgWidth]);

  const getPos = (node: SkillTreeNode) => nodePositions.get(node.id) ?? { x: 0, y: 0 };

  const completedCount = useMemo(() =>
    tree.nodes.filter(n => {
      const s = getStatus(n.id);
      return s === SNS.COMPLETED || s === SNS.MASTERED;
    }).length,
    [tree.nodes, getStatus]
  );

  // Topic stats
  const topicStats = useMemo(() => {
    const stats: Record<string, { total: number; completed: number }> = {};
    tree.nodes.forEach(n => {
      if (!stats[n.topic]) stats[n.topic] = { total: 0, completed: 0 };
      stats[n.topic].total++;
      const s = getStatus(n.id);
      if (s === SNS.COMPLETED || s === SNS.MASTERED) stats[n.topic].completed++;
    });
    return stats;
  }, [tree.nodes, getStatus]);

  const totalQuestions = useMemo(() =>
    Object.values(questionCounts).reduce((s, c) => s + c, 0),
    [questionCounts]
  );

  // Unique topics
  const uniqueTopics = useMemo(() => {
    const seen = new Set<string>();
    return tree.nodes
      .map(n => n.topic)
      .filter(t => { if (seen.has(t)) return false; seen.add(t); return true; });
  }, [tree.nodes]);

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gh-text-muted font-mono">Skills</span>
            <div className="w-32 h-2 rounded-full bg-gh-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gh-accent-blue transition-all duration-500"
                style={{ width: `${tree.nodes.length ? (completedCount / tree.nodes.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-xs text-gh-text-secondary font-mono">{completedCount}/{tree.nodes.length}</span>
          </div>
          {/* Per-topic mini bars */}
          {uniqueTopics.map(topic => {
            const color = SKILL_TOPIC_COLORS[topic as Topic];
            const stat = topicStats[topic];
            if (!color || !stat) return null;
            return (
              <div key={topic} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color.primary }} />
                <div className="w-16 h-1.5 rounded-full bg-gh-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${stat.total ? (stat.completed / stat.total) * 100 : 0}%`, backgroundColor: color.primary }}
                  />
                </div>
                <span className="text-[10px] text-gh-text-muted font-mono">{stat.completed}/{stat.total}</span>
              </div>
            );
          })}
        </div>
        <div className="text-xs text-gh-text-muted font-mono">{totalQuestions} questions</div>
      </div>

      {/* SVG Tree */}
      <div className="flex-1 overflow-auto rounded-md border border-gh-border bg-gh-canvas">
        <div className="p-4" style={{ minWidth: svgWidth }}>
          <svg width={svgWidth} height={svgHeight} className="select-none">
            <defs>
              {/* Glow filters for each topic */}
              {uniqueTopics.map(topic => {
                const color = SKILL_TOPIC_COLORS[topic as Topic];
                if (!color) return null;
                return (
                  <filter key={topic} id={`glow-${topic.replace(/[^a-zA-Z]/g, '')}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor={color.glow} floodOpacity="0.3" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                );
              })}
            </defs>

            {/* Tier backgrounds & labels */}
            {Array.from({ length: maxTier + 1 }, (_, i) => (
              <g key={`tier-bg-${i}`}>
                <rect
                  x={0}
                  y={i * TIER_HEIGHT + 40}
                  width={svgWidth}
                  height={TIER_HEIGHT}
                  fill={i % 2 === 0 ? 'rgba(22,27,34,0.3)' : 'transparent'}
                  rx={4}
                />
                <text
                  x={16}
                  y={i * TIER_HEIGHT + 62}
                  fontSize="10"
                  fill="#484f58"
                  fontWeight="700"
                  fontFamily="monospace"
                  letterSpacing="0.5"
                >
                  {TIER_LABELS[i] || `TIER ${i}`}
                </text>
              </g>
            ))}

            {/* Connection lines (curved paths) */}
            {tree.nodes.map(node =>
              node.prerequisites.map(prereqId => {
                const prereqNode = tree.nodes.find(n => n.id === prereqId);
                if (!prereqNode) return null;
                const from = getPos(prereqNode);
                const to = getPos(node);
                const prereqStatus = getStatus(prereqId);
                const isActive = prereqStatus === SNS.COMPLETED || prereqStatus === SNS.MASTERED;
                const midY = (from.y + to.y) / 2;

                return (
                  <path
                    key={`${prereqId}-${node.id}`}
                    d={`M ${from.x} ${from.y + NODE_RADIUS + 2} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y - NODE_RADIUS - 2}`}
                    fill="none"
                    stroke={isActive ? '#58a6ff' : '#21262d'}
                    strokeWidth={isActive ? 2 : 1}
                    opacity={isActive ? 0.7 : 0.35}
                  />
                );
              })
            )}

            {/* Nodes */}
            {tree.nodes.map(node => {
              const pos = getPos(node);
              const status = getStatus(node.id);
              const isHovered = hoveredNode === node.id;
              const topicColor = SKILL_TOPIC_COLORS[node.topic as Topic] || SKILL_TOPIC_COLORS['Functions & Graphs'];
              const isCompleted = status === SNS.COMPLETED || status === SNS.MASTERED;
              const isLocked = status === SNS.LOCKED;
              const qCount = questionCounts[node.id] || 0;

              let fillColor: string;
              let strokeColor: string;
              let nodeOpacity: number;

              if (isLocked) {
                fillColor = '#161b22';
                strokeColor = '#21262d';
                nodeOpacity = 0.45;
              } else if (isCompleted) {
                fillColor = topicColor.primary + '25';
                strokeColor = topicColor.primary;
                nodeOpacity = 1;
              } else {
                fillColor = '#0d1117';
                strokeColor = topicColor.primary;
                nodeOpacity = 1;
              }

              const r = isHovered && !isLocked ? NODE_RADIUS + 3 : NODE_RADIUS;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => !isLocked && setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: isLocked ? 'not-allowed' : 'pointer', opacity: nodeOpacity }}
                >
                  {/* Glow for completed */}
                  {isCompleted && (
                    <circle
                      r={r + 8}
                      fill="transparent"
                      stroke={topicColor.glow}
                      strokeWidth={1.5}
                      opacity={0.25}
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    r={r}
                    fill={fillColor}
                    stroke={isHovered && !isLocked ? topicColor.glow : strokeColor}
                    strokeWidth={2}
                  />

                  {/* Icon */}
                  <text
                    textAnchor="middle"
                    dy="5"
                    fontSize={isLocked ? '12' : '14'}
                    fill={isLocked ? '#484f58' : strokeColor}
                  >
                    {isLocked ? '🔒' : isCompleted ? '✓' : '◆'}
                  </text>

                  {/* Difficulty stars */}
                  <text
                    textAnchor="middle"
                    dy={-NODE_RADIUS - 10}
                    fontSize="8"
                    fill={topicColor.primary}
                    opacity={0.6}
                  >
                    {'★'.repeat(node.difficulty)}{'☆'.repeat(5 - node.difficulty)}
                  </text>

                  {/* Label */}
                  <text
                    textAnchor="middle"
                    dy={NODE_RADIUS + 16}
                    fontSize="10"
                    fill={isLocked ? '#484f58' : '#8b949e'}
                    fontWeight="500"
                    fontFamily="monospace"
                  >
                    {node.title.length > 22 ? node.title.slice(0, 22) + '…' : node.title}
                  </text>

                  {/* Question count badge */}
                  {qCount > 0 && !isLocked && (
                    <g transform={`translate(${r - 4}, ${-r + 4})`}>
                      <circle r={9} fill="#0d1117" stroke={strokeColor} strokeWidth={1} />
                      <text
                        textAnchor="middle"
                        dy="3.5"
                        fontSize="8"
                        fill={strokeColor}
                        fontWeight="700"
                        fontFamily="monospace"
                      >
                        {qCount}
                      </text>
                    </g>
                  )}

                  {/* Hover tooltip */}
                  {isHovered && !isLocked && (
                    <g transform={`translate(0, ${-NODE_RADIUS - 28})`}>
                      <rect
                        x={-70}
                        y={-14}
                        width={140}
                        height={20}
                        rx={4}
                        fill="#161b22"
                        stroke="#30363d"
                        strokeWidth={1}
                      />
                      <text
                        textAnchor="middle"
                        dy={0}
                        fontSize="9"
                        fill="#e6edf3"
                        fontFamily="monospace"
                      >
                        {qCount} questions • {'★'.repeat(node.difficulty)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Topic Legend */}
        <div className="sticky bottom-0 left-0 p-3 bg-gh-canvas/90 border-t border-gh-border">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[10px] text-gh-text-muted font-mono uppercase tracking-wider">Topics</span>
            {uniqueTopics.map(topic => {
              const color = SKILL_TOPIC_COLORS[topic as Topic];
              if (!color) return null;
              return (
                <div key={topic} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.primary }} />
                  <span className="text-[10px] text-gh-text-muted">{topic}</span>
                </div>
              );
            })}
            <span className="text-[10px] text-gh-text-muted font-mono ml-auto">
              🔒 locked &nbsp; ◆ unlocked &nbsp; ✓ completed
            </span>
          </div>
        </div>
      </div>

      {/* Node Detail Panel (removed — handled by CivTree flow) */}
    </div>
  );
}
