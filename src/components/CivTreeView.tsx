import { useRef, useState, useCallback, useEffect } from 'react';
import { ALL_NODES } from '../data/skillTreeData';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
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
const TIER_COLORS = ['#6366F1', '#8B5CF6', '#A855F7', '#3B82F6', '#0EA5E9', '#F59E0B'];

// Per-node unique icons for visual variety
const NODE_ICONS: Record<string, string> = {
  // Year 8
  'y8-number': '🔢',
  'y8-algebra': '✖️',
  'y8-statistics': '📊',
  'y8-probability': '🎲',
  // Year 9
  'y9-number': '🔬',
  'y9-algebra': '📈',
  'y9-statistics': '📉',
  'y9-probability': '🎯',
  // Year 10
  'y10-number': '💰',
  'y10-algebra': '📐',
  'y10-statistics': '🔍',
  'y10-probability': '🧩',
  // Year 10A
  'y10a-algebra': '🔗',
  'y10a-probability': '🎰',
  // Year 11
  'y11-a1-linear': '📏',
  'y11-a2-quadratics': '〰️',
  'y11-a3-domain-range': '🎯',
  'y11-a4-transformations': '🔄',
  'y11-a5-trigonometry': '📐',
  'y11-a6-logs-indices': '📊',
  'y11-a7-differentiation': '📉',
  'y11-a8-integration': '∫',
  'y11-a9-combinatorics': '🎲',
  // Year 12
  'y12-a1-algebra-functions': '⚡',
  'y12-a2-differentiation': '🏔️',
  'y12-a3-integration': '🌊',
  'y12-a4-discrete-prob': '🎰',
  'y12-a5-continuous-prob': '🔔',
  'y12-a6-pseudocode': '💻',
  // VCE
  'vce-exam1': '✏️',
  'vce-exam2': '🖥️',
};

const TOPIC_ICONS: Record<string, string> = {
  FUNCTIONS: '📐',
  CALCULUS: '∫',
  PROBABILITY: '🎲',
};

// Organize nodes by tier for vertical layout
function getNodesByTier() {
  const tiers: Record<number, typeof ALL_NODES> = {};
  ALL_NODES.forEach(n => {
    if (!tiers[n.tier]) tiers[n.tier] = [];
    tiers[n.tier].push(n);
  });
  return tiers;
}

// Duolingo-style winding path layout
function computePathLayout() {
  const tiers = getNodesByTier();
  const positions: Record<string, { x: number; y: number; tier: number }> = {};
  
  const V_SPACING = 110;
  const TIER_GAP = 70;
  const CENTER_X = 400;
  const SWING = 120; // How far nodes swing left/right from center
  
  let currentY = 80;
  let globalNodeIdx = 0;
  
  Object.entries(tiers).forEach(([tierStr, nodes]) => {
    const tier = Number(tierStr);
    
    // Add tier label space
    currentY += TIER_GAP;
    
    // Winding path: each node snakes along a sine-wave-like path
    nodes.forEach((node) => {
      // Create a winding S-curve effect
      const phase = globalNodeIdx * 0.8;
      const xOffset = Math.sin(phase) * SWING;
      
      positions[node.id] = {
        x: CENTER_X + xOffset,
        y: currentY,
        tier,
      };
      
      currentY += V_SPACING;
      globalNodeIdx++;
    });
    
    currentY += 30; // Extra gap between tiers
  });
  
  return { positions, totalHeight: currentY + 100, totalWidth: 800 };
}

const { positions: nodePositions, totalHeight, totalWidth } = computePathLayout();

// Tier label Y positions
function getTierLabelPositions() {
  const tiers = getNodesByTier();
  const labels: { label: string; y: number; color: string }[] = [];
  
  Object.entries(tiers).forEach(([tierStr]) => {
    const tier = Number(tierStr);
    const tierNodes = ALL_NODES.filter(n => n.tier === tier);
    if (tierNodes.length === 0) return;
    
    const minY = Math.min(...tierNodes.map(n => nodePositions[n.id]?.y ?? 0));
    labels.push({
      label: TIER_LABELS[tier] ?? `Tier ${tier}`,
      y: minY - 45,
      color: TIER_COLORS[tier] ?? '#6B7280',
    });
  });
  
  return labels;
}

const tierLabels = getTierLabelPositions();

// Find first available node for auto-scroll
function findCurrentNode(progress: UserProgress): string | null {
  for (const node of ALL_NODES) {
    const status = computeNodeStatus(node.id, node.prerequisites, progress);
    if (status === 'unlocked' || status === 'in-progress') return node.id;
  }
  return null;
}

export default function CivTreeView({ progress, onSelectNode }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  // Auto-scroll to current node on mount
  useEffect(() => {
    const currentId = findCurrentNode(progress);
    if (currentId && nodePositions[currentId] && scrollRef.current) {
      const pos = nodePositions[currentId];
      const containerHeight = scrollRef.current.clientHeight;
      scrollRef.current.scrollTo({
        top: Math.max(0, pos.y - containerHeight / 3),
        behavior: 'smooth',
      });
    }
  }, []);

  const getStatus = useCallback((node: typeof ALL_NODES[0]) => {
    return computeNodeStatus(node.id, node.prerequisites, progress);
  }, [progress]);

  const getScore = useCallback((nodeId: string) => {
    return progress.nodes[nodeId]?.score ?? 0;
  }, [progress]);

  const getLevelsCompleted = useCallback((nodeId: string) => {
    return progress.nodes[nodeId]?.levelsCompleted?.length ?? 0;
  }, [progress]);

  return (
    <div 
      ref={scrollRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
      style={{ 
        background: 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: '#3B82F6',
              animation: `float ${8 + Math.random() * 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.2); }
        }
        @keyframes completedShine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -20; }
        }
        @keyframes nodeAppear {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .node-enter { animation: nodeAppear 0.3s ease-out both; }
        .progress-ring { transition: stroke-dasharray 0.8s ease-out; }
      `}</style>

      <div className="relative mx-auto" style={{ width: totalWidth, minHeight: totalHeight }}>
        {/* SVG for connections */}
        <svg 
          className="absolute inset-0 pointer-events-none" 
          width={totalWidth} 
          height={totalHeight}
          style={{ zIndex: 0 }}
        >
          {ALL_NODES.map(node =>
            node.prerequisites.map(preId => {
              const from = nodePositions[preId];
              const to = nodePositions[node.id];
              if (!from || !to) return null;
              
              const fromStatus = computeNodeStatus(preId, ALL_NODES.find(n => n.id === preId)?.prerequisites ?? [], progress);
              const isActive = fromStatus === 'completed' || fromStatus === 'mastered';
              
              // Curved path for visual interest
              const midY = (from.y + to.y) / 2;
              const dx = to.x - from.x;
              const controlOffset = Math.abs(dx) < 10 ? 40 : 0;
              
              return (
                <g key={`${preId}-${node.id}`}>
                  <path
                    d={`M ${from.x} ${from.y + 36} C ${from.x + controlOffset} ${midY}, ${to.x - controlOffset} ${midY}, ${to.x} ${to.y - 36}`}
                    fill="none"
                    stroke={isActive ? '#3B82F6' : '#1E293B'}
                    strokeWidth={isActive ? 3 : 2}
                    strokeDasharray={isActive ? 'none' : '8 6'}
                    opacity={isActive ? 0.7 : 0.3}
                    style={isActive ? {} : { animation: 'dashFlow 1.5s linear infinite' }}
                  />
                  {isActive && (
                    <path
                      d={`M ${from.x} ${from.y + 36} C ${from.x + controlOffset} ${midY}, ${to.x - controlOffset} ${midY}, ${to.x} ${to.y - 36}`}
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth={1}
                      opacity={0.3}
                      filter="blur(4px)"
                    />
                  )}
                </g>
              );
            })
          )}
        </svg>

        {/* Tier labels */}
        {tierLabels.map(({ label, y, color }) => (
          <div
            key={label}
            className="absolute left-0 right-0 flex items-center justify-center"
            style={{ top: y }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-16 opacity-30" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
              <span 
                className="text-sm font-bold tracking-wider uppercase px-4 py-1.5 rounded-full"
                style={{ 
                  color,
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                }}
              >
                {label}
              </span>
              <div className="h-px w-16 opacity-30" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
            </div>
          </div>
        ))}

        {/* Nodes */}
        {ALL_NODES.map((node, i) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          
          const status = getStatus(node);
          const score = getScore(node.id);
          const levelsCompleted = getLevelsCompleted(node.id);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed' || status === 'mastered';
          const isInProgress = status === 'in-progress';
          const isHovered = hoveredNode === node.id;
          const isCurrent = findCurrentNode(progress) === node.id;
          const topicColor = SKILL_TOPIC_COLORS[node.topic as Topic];
          const nodeSize = 72;
          const icon = NODE_ICONS[node.id] ?? TOPIC_ICONS[node.topic] ?? '📐';
          
          const progressPct = levelsCompleted / 4;
          const circumference = 2 * Math.PI * (nodeSize / 2 + 4);
          
          return (
            <div
              key={node.id}
              className="absolute node-enter"
              style={{
                left: pos.x - nodeSize / 2,
                top: pos.y - nodeSize / 2,
                width: nodeSize,
                zIndex: isHovered ? 20 : 10,
                animationDelay: `${i * 0.03}s`,
              }}
            >
              {/* Current node indicator */}
              {isCurrent && !isLocked && (
                <div 
                  className="absolute -inset-3 rounded-full"
                  style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
                />
              )}
              
              <button
                className="relative w-full group"
                style={{ height: nodeSize }}
                onClick={() => !isLocked && onSelectNode(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                disabled={isLocked}
              >
                {/* Progress ring (SVG) */}
                <svg
                  className="absolute -inset-2 progress-ring"
                  width={nodeSize + 16}
                  height={nodeSize + 16}
                  viewBox={`0 0 ${nodeSize + 16} ${nodeSize + 16}`}
                >
                  {/* Background ring */}
                  <circle
                    cx={(nodeSize + 16) / 2}
                    cy={(nodeSize + 16) / 2}
                    r={nodeSize / 2 + 4}
                    fill="none"
                    stroke={isLocked ? '#1E293B' : '#334155'}
                    strokeWidth={3}
                  />
                  {/* Progress arc */}
                  {(isInProgress || isCompleted) && (
                    <circle
                      cx={(nodeSize + 16) / 2}
                      cy={(nodeSize + 16) / 2}
                      r={nodeSize / 2 + 4}
                      fill="none"
                      stroke={isCompleted ? '#22C55E' : '#3B82F6'}
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeDasharray={`${circumference * progressPct} ${circumference}`}
                      transform={`rotate(-90 ${(nodeSize + 16) / 2} ${(nodeSize + 16) / 2})`}
                    />
                  )}
                  {/* Mastered golden ring */}
                  {status === 'mastered' && (
                    <circle
                      cx={(nodeSize + 16) / 2}
                      cy={(nodeSize + 16) / 2}
                      r={nodeSize / 2 + 4}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  )}
                </svg>

                {/* Main node circle */}
                <div
                  className={`
                    w-full h-full rounded-full flex items-center justify-center
                    transition-all duration-300 relative overflow-hidden
                    ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                    ${isHovered && !isLocked ? 'scale-110' : ''}
                  `}
                  style={{
                    background: isLocked
                      ? '#0F172A'
                      : isCompleted
                        ? `linear-gradient(135deg, ${topicColor?.primary ?? '#22C55E'}, ${topicColor?.bg ?? '#16A34A'})`
                        : isInProgress
                          ? `linear-gradient(135deg, #1E40AF, #3B82F6)`
                          : `linear-gradient(135deg, #1E293B, #334155)`,
                    border: isLocked
                      ? '2px solid #1E293B'
                      : isCompleted
                        ? `2px solid ${topicColor?.primary ?? '#22C55E'}`
                        : isInProgress
                          ? '2px solid #3B82F6'
                          : '2px solid #475569',
                    boxShadow: isHovered && !isLocked
                      ? `0 0 20px ${topicColor?.glow ?? '#3B82F640'}`
                      : isCompleted
                        ? `0 0 12px ${topicColor?.glow ?? '#22C55E30'}`
                        : 'none',
                    opacity: isLocked ? 0.5 : 1,
                  }}
                >
                  {/* Shine effect for completed */}
                  {isCompleted && (
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'completedShine 3s ease-in-out infinite',
                      }}
                    />
                  )}
                  
                  {/* Icon */}
                  <span className="text-2xl relative z-10" style={{ filter: isLocked ? 'grayscale(1)' : 'none' }}>
                    {isLocked ? '🔒' : icon}
                  </span>
                </div>
              </button>
              
              {/* Title */}
              <div className="mt-2 text-center">
                <span 
                  className={`text-[11px] font-medium leading-tight block ${
                    isLocked ? 'text-gray-600' : isCompleted ? 'text-gray-200' : 'text-gray-400'
                  }`}
                  style={{ 
                    maxWidth: nodeSize + 20,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {node.title}
                </span>
              </div>
              
              {/* Stars */}
              {isCompleted && (
                <div className="flex justify-center mt-0.5 gap-0.5">
                  {[1, 2, 3].map(star => (
                    <span
                      key={star}
                      className="text-[10px]"
                      style={{ 
                        opacity: score >= (star === 1 ? 1 : star === 2 ? 70 : 90) ? 1 : 0.2,
                        filter: score >= (star === 1 ? 1 : star === 2 ? 70 : 90) ? 'none' : 'grayscale(1)',
                      }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              )}
              
              {/* Level dots */}
              {!isLocked && !isCompleted && isInProgress && (
                <div className="flex justify-center mt-1 gap-1">
                  {[0, 1, 2, 3].map(lvl => (
                    <div
                      key={lvl}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: (progress.nodes[node.id]?.levelsCompleted ?? []).includes(lvl)
                          ? '#3B82F6'
                          : '#334155',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { nodePositions as positions, totalWidth, totalHeight };
