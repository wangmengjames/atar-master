# Skill Tree Path Layout Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current tier-column skill tree layout with a horizontal multi-track path layout where each topic (Functions, Probability, Calculus) is a separate horizontal timeline row, with accordion expansion for node details.

**Architecture:** Three `TopicPathRow` components stacked vertically, each rendering a horizontal timeline of nodes. Clicking a row expands it accordion-style to show larger nodes and a detail card. The existing `CivTreeView` and side-panel layout are replaced; `TrainingSession` is reused as-is.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, lucide-react icons. No new dependencies needed.

---

### Task 1: Create TopicPathRow component (collapsed state)

**Files:**
- Create: `src/components/TopicPathRow.tsx`

**Step 1: Create the collapsed TopicPathRow component**

This component renders one topic as a horizontal row: icon + label on left, timeline dots in the middle, progress fraction on right.

```tsx
// src/components/TopicPathRow.tsx
import { useMemo } from 'react';
import { ChevronDown, ChevronRight, Lock, CheckCircle2, Star } from 'lucide-react';
import type { SkillTreeNode } from '../types';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus } from '../lib/progress';
import { getMaxLevelsForNode } from '../lib/skillTree';
import { TIER_COLORS } from '../data/skillTreeVisuals';
import { SKILL_TOPIC_COLORS } from '../types';

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

const TIER_LABELS = ['Yr8', 'Yr9', 'Yr10', 'Yr11', 'Yr12', 'VCE'];

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
  const sortedNodes = useMemo(
    () => [...nodes].sort((a, b) => a.tier - b.tier || a.position.y - b.position.y),
    [nodes],
  );

  const completedCount = useMemo(
    () =>
      sortedNodes.filter((node) => {
        const status = computeNodeStatus(node.id, node.prerequisites, progress);
        return status === 'completed' || status === 'mastered';
      }).length,
    [sortedNodes, progress],
  );

  const topicColor = SKILL_TOPIC_COLORS[topicLabel] ?? { primary: '#64748b', glow: '#94a3b8', bg: 'rgba(100,116,139,0.15)' };

  return (
    <div className="rounded-[20px] border border-black/8 bg-white/80 transition-all">
      {/* Collapsed row — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-black/[0.02]"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ background: topicColor.bg }}
        >
          {isExpanded ? (
            <ChevronDown size={18} style={{ color: topicColor.primary }} />
          ) : (
            <ChevronRight size={18} style={{ color: topicColor.primary }} />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold tracking-tight text-[var(--ink)]">{topicLabel}</div>
          <div className="mt-1 flex items-center gap-1.5">
            {sortedNodes.map((node) => {
              const status = computeNodeStatus(node.id, node.prerequisites, progress);
              const isCompleted = status === 'completed' || status === 'mastered';
              const isRecommended = node.id === recommendedNodeId;
              const isLocked = status === 'locked';

              return (
                <div key={node.id} className="flex items-center gap-1.5">
                  <div
                    className={`h-3 w-3 rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'border-emerald-500 bg-emerald-500'
                        : isRecommended
                          ? 'border-amber-400 bg-amber-400 animate-pulse'
                          : isLocked
                            ? 'border-black/15 bg-transparent'
                            : 'border-black/25 bg-white'
                    }`}
                    title={`${node.title} (${TIER_LABELS[node.tier]})`}
                  />
                  {node !== sortedNodes[sortedNodes.length - 1] && (
                    <div
                      className={`h-0.5 w-3 ${
                        isCompleted ? 'bg-emerald-400' : 'bg-black/10'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm font-semibold text-[var(--ink)]">
            {completedCount}/{sortedNodes.length}
          </div>
          <div className="text-xs text-[var(--muted)]">
            {sortedNodes.length > 0
              ? `${Math.round((completedCount / sortedNodes.length) * 100)}%`
              : '0%'}
          </div>
        </div>
      </button>

      {/* Expanded content — accordion */}
      {isExpanded && (
        <ExpandedPanel
          nodes={sortedNodes}
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
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  return (
    <div className="border-t border-black/6 px-5 pb-5">
      {/* Expanded timeline with larger nodes */}
      <div className="overflow-x-auto py-5">
        <div className="flex items-start gap-2 min-w-min">
          {nodes.map((node, i) => {
            const status = computeNodeStatus(node.id, node.prerequisites, progress);
            const isCompleted = status === 'completed' || status === 'mastered';
            const isRecommended = node.id === recommendedNodeId;
            const isLocked = status === 'locked';
            const isSelected = node.id === selectedNodeId;
            const nodeProgress = progress.nodes[node.id];
            const maxLevels = getMaxLevelsForNode(node.id);
            const completedLevels = nodeProgress?.levelsCompleted.filter((l) => l <= maxLevels).length ?? 0;

            return (
              <div key={node.id} className="flex items-center gap-2">
                <button
                  onClick={() => onSelectNode(node.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition-all w-[120px] ${
                    isSelected
                      ? 'border-black/20 bg-white shadow-sm ring-2 ring-black/10'
                      : isLocked
                        ? 'border-black/6 bg-white/60 opacity-60'
                        : isCompleted
                          ? 'border-emerald-200 bg-emerald-50/70 hover:border-emerald-300'
                          : 'border-black/10 bg-white hover:border-black/16 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      isCompleted
                        ? 'border-emerald-500 bg-emerald-100'
                        : isRecommended
                          ? 'border-amber-400 bg-amber-50'
                          : isLocked
                            ? 'border-black/12 bg-black/4'
                            : 'border-black/15 bg-white'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : isRecommended ? (
                      <Star size={18} className="text-amber-500" />
                    ) : isLocked ? (
                      <Lock size={14} className="text-black/30" />
                    ) : (
                      <span className="text-xs font-semibold text-[var(--ink)]">{completedLevels}/{maxLevels}</span>
                    )}
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-medium text-[var(--ink)] leading-tight line-clamp-2">
                      {node.title}
                    </div>
                    <div className="mt-1 text-[10px] text-[var(--muted)]">
                      {TIER_LABELS[node.tier]}
                    </div>
                  </div>

                  {/* Mini progress bar */}
                  <div className="w-full h-1 rounded-full bg-black/6 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${maxLevels ? (completedLevels / maxLevels) * 100 : 0}%`,
                        background: isCompleted ? '#10b981' : topicColor.primary,
                      }}
                    />
                  </div>
                </button>

                {/* Connector line */}
                {i < nodes.length - 1 && (
                  <div
                    className={`h-0.5 w-4 shrink-0 ${
                      isCompleted ? 'bg-emerald-400' : 'bg-black/10'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected node detail card */}
      {selectedNode && (
        <NodeDetailCard
          node={selectedNode}
          progress={progress}
          onStartLevel={onStartLevel}
        />
      )}
    </div>
  );
}
```

**Step 2: Create the NodeDetailCard inline component**

Add this at the bottom of `TopicPathRow.tsx`:

```tsx
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { getNodeLevelData, getNodeStudyTotals } from '../lib/skillTree';
import { computeNodeStatus, getNodeProgress } from '../lib/progress';
import { formatEstimatedTime } from '../lib/utils';
import { ALL_NODES } from '../data/skillTreeData';

function NodeDetailCard({
  node,
  progress,
  onStartLevel,
}: {
  node: SkillTreeNode;
  progress: UserProgress;
  onStartLevel: (nodeId: string, level: number) => void;
}) {
  const nodeStatus = computeNodeStatus(node.id, node.prerequisites, progress);
  const isLocked = nodeStatus === 'locked';
  const levelData = getNodeLevelData(node.id, progress);
  const studyTotals = getNodeStudyTotals(node.id);
  const recommendedLevel = levelData.find((l) => l.isUnlocked && !l.isCompleted)
    ?? levelData.find((l) => l.isUnlocked)
    ?? null;

  const unmetPrereqs = isLocked
    ? node.prerequisites
        .filter((id) => {
          const p = progress.nodes[id];
          return !p || (p.status !== 'completed' && p.status !== 'mastered');
        })
        .map((id) => ALL_NODES.find((n) => n.id === id)?.title ?? id)
    : [];

  return (
    <div className="rounded-[20px] border border-black/8 bg-[var(--surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{node.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{node.description}</p>
        </div>
      </div>

      {isLocked ? (
        <div className="mt-4 rounded-xl border border-black/6 bg-white/80 p-4">
          <div className="text-sm font-medium text-[var(--muted)]">Requires:</div>
          <ul className="mt-2 space-y-1">
            {unmetPrereqs.map((name) => (
              <li key={name} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Lock size={12} />
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {levelData.map((level) => {
            const isUnavailable = !level.isUnlocked;

            return (
              <div
                key={level.level}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                  isUnavailable
                    ? 'border-black/6 bg-white/60 opacity-50'
                    : level.isCompleted
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : 'border-black/10 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                      level.isCompleted
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-black/5 text-[var(--ink)]'
                    }`}
                  >
                    {level.isCompleted ? <CheckCircle2 size={14} /> : level.level}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--ink)]">{level.name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {level.questionCount} questions · {formatEstimatedTime(level.questionCount * 1.5)}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartLevel(node.id, level.level)}
                  disabled={isUnavailable}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isUnavailable
                      ? 'cursor-not-allowed text-black/25'
                      : level.isCompleted
                        ? 'border border-black/10 bg-white text-[var(--ink)] hover:border-black/16'
                        : 'bg-black text-white hover:bg-black/85'
                  }`}
                >
                  {level.isCompleted ? <Sparkles size={12} /> : <Play size={12} fill="currentColor" />}
                  {level.isCompleted ? 'Redo' : 'Start'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {studyTotals.totalCount > 0 && (
        <div className="mt-3 text-xs text-[var(--muted)]">
          {studyTotals.trainingCount} training · {studyTotals.examCount} exam questions linked
        </div>
      )}
    </div>
  );
}
```

**Step 3: Verify it compiles**

Run: `cd "/Users/ultron/Library/CloudStorage/GoogleDrive-wangmengjames@gmail.com/My Drive/Claude/Projects/Claude/atar-master/.claude/worktrees/nice-perlman" && npx tsc --noEmit 2>&1 | head -30`

Expected: No errors related to TopicPathRow.tsx (file isn't imported yet, so it should be checked by tsc if `include` covers `src/`)

**Step 4: Commit**

```bash
git add src/components/TopicPathRow.tsx
git commit -m "feat: add TopicPathRow component with collapsed timeline and expanded accordion"
```

---

### Task 2: Rewrite SkillTreePage to use new path layout

**Files:**
- Modify: `src/pages/SkillTreePage.tsx`

**Step 1: Rewrite SkillTreePage**

Replace the CivTreeView + SkillNodePanel layout with TopicPathRow components. Keep the header stats, recommended next, onboarding, year selector, and TrainingSession — only replace the tree+sidebar section.

Key changes:
- Remove `CivTreeView` and `SkillNodePanel` imports
- Add `TopicPathRow` import
- Group `ALL_NODES` by `topic` field
- Track `expandedTopic: string | null` state (accordion)
- Replace the `<div className="mx-auto flex max-w-[1400px]...">` section with vertically stacked `TopicPathRow` components

The header (lines 222-311) stays identical. Replace lines 314-367 (the tree+sidebar section) with:

```tsx
<div className="mx-auto max-w-[1400px] space-y-3 px-4 py-6 sm:px-6">
  {topicGroups.map(({ topic, nodes: topicNodes }) => (
    <TopicPathRow
      key={topic}
      topicLabel={topic}
      nodes={topicNodes}
      progress={progress}
      isExpanded={expandedTopic === topic}
      onToggle={() => setExpandedTopic((prev) => (prev === topic ? null : topic))}
      onSelectNode={handleSelectNode}
      selectedNodeId={selectedNodeId}
      onStartLevel={handleStartLevel}
      recommendedNodeId={recommendedNode?.id ?? null}
    />
  ))}
</div>
```

Add this state and memo:

```tsx
const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

const topicGroups = useMemo(() => {
  const groups: Record<string, typeof ALL_NODES> = {};
  for (const node of ALL_NODES) {
    if (!groups[node.topic]) groups[node.topic] = [];
    groups[node.topic].push(node);
  }
  return Object.entries(groups).map(([topic, nodes]) => ({ topic, nodes }));
}, []);
```

Remove the `handleSelectNode` toggle behavior — clicking a node in TopicPathRow should select it (not toggle off if already selected):

```tsx
const handleSelectNode = useCallback((nodeId: string) => {
  setSelectedNodeId(nodeId);
}, []);
```

**Step 2: Remove unused imports**

Remove these imports from SkillTreePage.tsx:
- `CivTreeView` (no longer used)
- `SkillNodePanel` (no longer used)
- `Sparkles` from lucide-react if not used elsewhere in the file (check first — it's used in the stats section, so keep it)

Add import:
```tsx
import TopicPathRow from '../components/TopicPathRow';
```

**Step 3: Verify build**

Run: `cd "/Users/ultron/Library/CloudStorage/GoogleDrive-wangmengjames@gmail.com/My Drive/Claude/Projects/Claude/atar-master/.claude/worktrees/nice-perlman" && npx tsc --noEmit 2>&1 | head -30`

Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add src/pages/SkillTreePage.tsx
git commit -m "feat: rewrite SkillTreePage with horizontal path layout"
```

---

### Task 3: Visual polish and mobile responsiveness

**Files:**
- Modify: `src/components/TopicPathRow.tsx`

**Step 1: Add responsive breakpoints**

- On mobile (< 640px), the expanded timeline nodes should be narrower (90px instead of 120px)
- The collapsed timeline dots should wrap if too many nodes
- Add `scroll-smooth` to the expanded timeline container

**Step 2: Add hover tooltips on collapsed timeline dots**

The dots already have `title` attributes. Ensure they work well. Consider adding a CSS-only tooltip if the native title is too slow.

**Step 3: Add smooth expand/collapse animation**

Wrap the expanded panel in a container with:
```tsx
<div className="overflow-hidden transition-all duration-300" style={{ maxHeight: isExpanded ? '1000px' : '0' }}>
```

Or use CSS `grid-template-rows: 0fr` → `1fr` animation for a cleaner approach:
```tsx
<div
  className="grid transition-all duration-300"
  style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
>
  <div className="overflow-hidden">
    {/* expanded content */}
  </div>
</div>
```

**Step 4: Verify on dev server**

Run: `npm run dev` and check:
1. Three topic rows visible
2. Click to expand/collapse works
3. Node selection shows detail card
4. Start Practice button works
5. Mobile viewport works

**Step 5: Commit**

```bash
git add src/components/TopicPathRow.tsx
git commit -m "feat: add responsive design and accordion animation to TopicPathRow"
```

---

### Task 4: Clean up old components

**Files:**
- Modify: `src/components/CivTreeView.tsx` — keep file but add deprecation comment (or delete if no other imports)
- Modify: `src/components/MiniMap.tsx` — delete if unused
- Modify: `src/components/SkillNodePanel.tsx` — keep file but verify no other imports

**Step 1: Check for remaining imports of old components**

Run:
```bash
grep -r "CivTreeView\|SkillNodePanel\|MiniMap" src/ --include="*.tsx" --include="*.ts"
```

If only SkillTreePage imported them (which we already updated), they can be safely deleted.

**Step 2: Delete unused component files**

Only delete files that have zero remaining imports.

**Step 3: Verify build still passes**

Run: `npx tsc --noEmit && npm run build`

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove deprecated CivTreeView, SkillNodePanel, MiniMap components"
```

---

### Task 5: Visual verification on live site

**Step 1: Run dev server and verify**

Run: `npm run dev`

Check these scenarios:
1. Page loads showing 3 collapsed topic rows with timeline dots
2. Click "Functions & Graphs" — expands to show 15 nodes horizontally
3. Click a node — detail card appears below with practice levels
4. Click "Start" on a level — enters TrainingSession
5. Complete a session — returns to tree, node updates
6. Click another topic — previous collapses, new one expands (accordion)
7. Recommended node pulses on the correct row
8. Stats bar (Level, Completed nodes, etc.) still works
9. Reset button still works
10. Year level selector and onboarding still work for non-Pro users

**Step 2: Test mobile viewport**

Resize to 375px width and verify:
- Rows stack naturally
- Expanded timeline scrolls horizontally
- Detail card is readable
- No horizontal page overflow

**Step 3: Commit final state if any fixes needed**

```bash
git add -A
git commit -m "fix: polish skill tree path layout after visual testing"
```
