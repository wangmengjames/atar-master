import { useMemo } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight, Lock, Play, Sparkles, Star } from 'lucide-react';
import type { SkillTreeNode } from '../types';
import { SKILL_TOPIC_COLORS } from '../types';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus, getNodeProgress } from '../lib/progress';
import { getMaxLevelsForNode, getNodeLevelData, getNodeStudyTotals } from '../lib/skillTree';
import { formatEstimatedTime } from '../lib/utils';
import { ALL_NODES } from '../data/skillTreeData';

const TIER_LABELS = ['Yr8', 'Yr9', 'Yr10', 'Yr11', 'Yr12', 'VCE'];

interface Props {
  topicLabel: string;
  nodes: SkillTreeNode[];
  progress: UserProgress;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
  onStartLevel: (nodeId: string, level: number) => void;
  recommendedNodeId: string | null;
}

/* ─── helpers ─────────────────────────────────────────────────── */

type NodeStatus = 'locked' | 'unlocked' | 'in-progress' | 'completed' | 'mastered';

function getStatus(node: SkillTreeNode, progress: UserProgress): NodeStatus {
  return computeNodeStatus(node.id, node.prerequisites, progress);
}

function sortedNodes(nodes: SkillTreeNode[]): SkillTreeNode[] {
  return [...nodes].sort((a, b) => a.tier - b.tier || a.position.y - b.position.y);
}

function isComplete(status: NodeStatus): boolean {
  return status === 'completed' || status === 'mastered';
}

/* ─── NodeDetailCard ──────────────────────────────────────────── */

function NodeDetailCard({
  node,
  progress,
  onStartLevel,
}: {
  node: SkillTreeNode;
  progress: UserProgress;
  onStartLevel: (nodeId: string, level: number) => void;
}) {
  const status = getStatus(node, progress);
  const isLocked = status === 'locked';
  const levelData = useMemo(() => getNodeLevelData(node.id, progress), [node.id, progress]);
  const studyTotals = useMemo(() => getNodeStudyTotals(node.id), [node.id]);

  const unmetPrereqs = isLocked
    ? node.prerequisites
        .filter((prereqId) => {
          const current = progress.nodes[prereqId];
          return !current || (current.status !== 'completed' && current.status !== 'mastered');
        })
        .map((prereqId) => ALL_NODES.find((n) => n.id === prereqId)?.title ?? prereqId)
    : [];

  return (
    <div className="rounded-[20px] border border-black/8 bg-white/80 p-5">
      <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{node.title}</h3>
      <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{node.description}</p>

      {isLocked ? (
        <div className="mt-4 rounded-2xl border border-black/6 bg-white/70 p-4">
          <div className="section-kicker">Requires</div>
          <ul className="mt-2 space-y-1">
            {unmetPrereqs.map((name) => (
              <li key={name} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Lock size={12} className="shrink-0 text-[var(--muted)]" />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <div className="section-kicker">Practice Path</div>
          {levelData.map((level) => {
            const actionLabel = level.isCompleted ? 'Redo' : 'Start';
            const isUnavailable = !level.isUnlocked;

            return (
              <div
                key={level.level}
                className={`flex items-center justify-between gap-3 rounded-2xl border p-3 transition-all ${
                  isUnavailable
                    ? 'border-black/6 bg-white/70 opacity-60'
                    : level.isCompleted
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : 'border-black/10 bg-white hover:border-black/16'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                      isUnavailable
                        ? 'border-black/8 bg-black/4 text-black/30'
                        : level.isCompleted
                          ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                          : 'border-black/10 bg-[var(--surface-2)] text-[var(--ink)]'
                    }`}
                  >
                    {level.isCompleted ? <CheckCircle2 size={14} /> : level.level}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--ink)]">{level.name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {level.questionCount}q &middot; {formatEstimatedTime(level.questionCount * 1.5)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onStartLevel(node.id, level.level)}
                  disabled={isUnavailable}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isUnavailable
                      ? 'cursor-not-allowed border border-black/8 bg-black/3 text-black/25'
                      : level.isCompleted
                        ? 'border border-black/10 bg-white text-[var(--ink)] hover:border-black/16'
                        : 'bg-black text-white hover:bg-black/85'
                  }`}
                >
                  {level.isCompleted ? <Sparkles size={12} /> : <Play size={12} fill="currentColor" />}
                  {actionLabel}
                </button>
              </div>
            );
          })}

          {studyTotals.totalCount > 0 && (
            <div className="mt-2 flex gap-2 text-xs text-[var(--muted)]">
              <span className="quiet-pill">{studyTotals.trainingCount} training</span>
              <span className="quiet-pill">{studyTotals.examCount} exam</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── ExpandedPanel ───────────────────────────────────────────── */

function ExpandedPanel({
  nodes,
  progress,
  selectedNodeId,
  onSelectNode,
  onStartLevel,
  recommendedNodeId,
  topicColor,
}: {
  nodes: SkillTreeNode[];
  progress: UserProgress;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onStartLevel: (nodeId: string, level: number) => void;
  recommendedNodeId: string | null;
  topicColor: { primary: string; glow: string; bg: string };
}) {
  const sorted = useMemo(() => sortedNodes(nodes), [nodes]);
  const selectedNode = selectedNodeId ? sorted.find((n) => n.id === selectedNodeId) ?? null : null;

  return (
    <div className="border-t border-black/6 bg-white/40 px-4 py-4">
      {/* Horizontal card row */}
      <div className="flex gap-3 overflow-x-auto pb-3">
        {sorted.map((node, i) => {
          const status = getStatus(node, progress);
          const np = getNodeProgress(progress, node.id);
          const maxLevels = getMaxLevelsForNode(node.id);
          const completedCount = np.levelsCompleted.filter((l) => l <= maxLevels).length;
          const isSelected = selectedNodeId === node.id;
          const isRecommended = recommendedNodeId === node.id;
          const prevNode = sorted[i - 1];
          const prevComplete = prevNode ? isComplete(getStatus(prevNode, progress)) : false;

          return (
            <div key={node.id} className="flex items-center shrink-0">
              {/* Connector line between cards */}
              {i > 0 && (
                <div
                  className={`h-0.5 w-4 shrink-0 ${
                    prevComplete ? 'bg-emerald-400' : 'bg-black/10'
                  }`}
                />
              )}
              <button
                onClick={() => onSelectNode(node.id)}
                className={`flex w-[120px] shrink-0 flex-col items-center gap-2 rounded-[20px] border p-3 transition-all ${
                  isSelected
                    ? 'border-black/20 bg-white shadow-sm'
                    : 'border-black/8 bg-white/80 hover:border-black/14 hover:bg-white'
                }`}
              >
                {/* Status circle */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10">
                  {status === 'locked' ? (
                    <Lock size={16} className="text-black/25" />
                  ) : isComplete(status) ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : isRecommended ? (
                    <Star size={16} className="text-amber-500 animate-pulse" />
                  ) : completedCount > 0 ? (
                    <span className="text-xs font-medium text-[var(--ink)]">
                      {completedCount}/{maxLevels}
                    </span>
                  ) : (
                    <Play size={14} className="text-black/40" />
                  )}
                </div>

                {/* Title */}
                <span className="line-clamp-2 text-center text-xs font-medium leading-tight text-[var(--ink)]">
                  {node.title}
                </span>

                {/* Tier label */}
                <span className="text-[10px] text-[var(--muted)]">
                  {TIER_LABELS[node.tier] ?? `T${node.tier}`}
                </span>

                {/* Mini progress bar */}
                <div className="h-1 w-full rounded-full bg-black/6">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${maxLevels > 0 ? Math.round((completedCount / maxLevels) * 100) : 0}%`,
                      backgroundColor: topicColor.primary,
                    }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Detail card for the selected node */}
      {selectedNode && (
        <div className="mt-3">
          <NodeDetailCard
            node={selectedNode}
            progress={progress}
            onStartLevel={onStartLevel}
          />
        </div>
      )}
    </div>
  );
}

/* ─── TopicPathRow (default export) ───────────────────────────── */

export default function TopicPathRow({
  topicLabel,
  nodes,
  progress,
  isExpanded,
  onToggle,
  onSelectNode,
  selectedNodeId,
  onStartLevel,
  recommendedNodeId,
}: Props) {
  const sorted = useMemo(() => sortedNodes(nodes), [nodes]);
  const topicColor = SKILL_TOPIC_COLORS[topicLabel] ?? { primary: '#6B7280', glow: '#9CA3AF', bg: 'rgba(107,114,128,0.15)' };

  const completedCount = sorted.filter((n) => isComplete(getStatus(n, progress))).length;
  const totalCount = sorted.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="rounded-[20px] border border-black/8 bg-white/80 overflow-hidden">
      {/* Collapsed row — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-black/[0.02]"
      >
        {/* Chevron + topic color dot */}
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: topicColor.bg }}
        >
          {isExpanded ? (
            <ChevronDown size={16} style={{ color: topicColor.primary }} />
          ) : (
            <ChevronRight size={16} style={{ color: topicColor.primary }} />
          )}
        </span>

        {/* Topic label */}
        <span className="text-sm font-semibold tracking-tight text-[var(--ink)] shrink-0">
          {topicLabel}
        </span>

        {/* Timeline dots */}
        <div className="flex items-center gap-0 flex-1 overflow-hidden mx-2">
          {sorted.map((node, i) => {
            const status = getStatus(node, progress);
            const isRecommended = recommendedNodeId === node.id;
            const prevNode = sorted[i - 1];
            const prevComplete = prevNode ? isComplete(getStatus(prevNode, progress)) : false;

            return (
              <div key={node.id} className="flex items-center shrink-0">
                {/* Connector line */}
                {i > 0 && (
                  <div
                    className={`h-px w-3 ${
                      prevComplete ? 'bg-emerald-400' : 'bg-black/10'
                    }`}
                  />
                )}
                {/* Dot */}
                <div
                  className={`h-2.5 w-2.5 shrink-0 rounded-full border transition-all ${
                    isComplete(status)
                      ? 'border-emerald-400 bg-emerald-400'
                      : isRecommended
                        ? 'border-amber-400 bg-amber-400 animate-pulse'
                        : status === 'locked'
                          ? 'border-black/15 bg-transparent'
                          : 'border-black/20 bg-white'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Progress fraction */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-[var(--ink)]">
            {completedCount}/{totalCount}
          </span>
          <span className="text-xs text-[var(--muted)]">{pct}%</span>
        </div>
      </button>

      {/* Expanded accordion */}
      {isExpanded && (
        <ExpandedPanel
          nodes={sorted}
          progress={progress}
          selectedNodeId={selectedNodeId}
          onSelectNode={onSelectNode}
          onStartLevel={onStartLevel}
          recommendedNodeId={recommendedNodeId}
          topicColor={topicColor}
        />
      )}
    </div>
  );
}
