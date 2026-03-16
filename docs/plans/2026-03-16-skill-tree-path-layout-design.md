# Skill Tree Path Layout Redesign

## Problem

The current skill tree uses a tier-column layout with SVG connection lines. Pain points:
- Horizontal scrolling required to see all tiers
- 31 nodes are dense and hard to navigate
- SVG prerequisite lines cross and clutter
- Layout doesn't feel like a progression path

## Design: Horizontal Multi-Track + Accordion Detail

Combines a compact global overview (Approach A) with expandable detail panels (Approach B).

### Global View (Default State)

Three horizontal topic timelines stacked vertically:

```
┌─ Stats Bar ──────────────────────────────────┐
│  Level 5  ·  420 XP  ·  12/31 mastered       │
└──────────────────────────────────────────────┘

Functions     ●━━●━━●━━★━━○━━○━━○    3/7
Probability   ●━━●━━○━━○━━○          2/5
Calculus      ●━━●━━●━━○━━○━━○       3/6
```

- Each topic is one row: icon + label on left, progress fraction on right
- Nodes are circles: ● completed (green), ★ current/recommended (pulsing), ○ locked (gray)
- Lines are solid (completed) or dashed (locked)
- Hover shows tooltip with node name + status
- Fits in one screen, no scrolling needed

### Expanded Detail (Click Topic Row)

Accordion expansion below the clicked row:

```
Functions     ●━━●━━●━━★━━○━━○━━○    3/7   ▼

┌─────────────────────────────────────────────┐
│  Larger nodes with labels:                  │
│  ●          ●          ●          ★         │
│  Number     Basic      Polynomial  Power    │
│  Systems    Algebra    Functions   Funcs    │
│  Yr8 ✓     Yr9 ✓      Yr10 ✓     Yr10     │
│                                             │
│  ┌─ Selected Node Detail ───────────────┐   │
│  │  Title, tier, difficulty, levels     │   │
│  │  Prerequisites status                │   │
│  │  [Start Practice →]                  │   │
│  └──────────────────────────────────────┘   │
│                                             │
│  ○          ○          ○                    │
│  Locked nodes with lock icons               │
└─────────────────────────────────────────────┘

Probability   ●━━●━━○━━○━━○          2/5
Calculus      ●━━●━━●━━○━━○━━○       3/6
```

- Only one topic expanded at a time (accordion)
- Expanded view shows larger nodes with names and tier labels
- Clicking a node shows its detail card inline
- Cross-topic prerequisites shown as text: "Requires: Functions > Polynomial Functions"
- Other topic rows remain visible below

### Data Mapping

| Topic | Nodes | Tiers |
|-------|-------|-------|
| Functions | 15 | Yr8 → VCE Exam |
| Probability | 10 | Yr8 → VCE Exam |
| Calculus | 6 | Yr10 → VCE Exam |

Nodes grouped by `topic` field from `skillTreeData.ts`. Within each topic, ordered by `tier` then `position.y`.

### Responsive Design

- **Desktop (≥1024px)**: 3 rows, generous node spacing, full-width detail panel
- **Tablet (768-1023px)**: 3 rows, slightly smaller nodes
- **Mobile (<768px)**: 3 rows stacked, timeline may scroll horizontally within row for topics with many nodes (15 Functions nodes); expanded detail uses vertical node list

### Component Architecture

```
SkillTreePage (rewrite)
├── StatsBar (reuse existing)
├── TopicPathRow × 3 (new)
│   ├── PathTimeline (new - horizontal node dots + lines)
│   │   └── TimelineNode × N (new - single circle)
│   └── TopicDetailPanel (new - accordion content)
│       ├── ExpandedTimeline (new - larger nodes with labels)
│       └── NodeDetailCard (adapted from SkillNodePanel)
└── TrainingSession (reuse existing)
```

Files affected:
- `CivTreeView.tsx` → replaced by `TopicPathRow` + `PathTimeline`
- `SkillNodePanel.tsx` → adapted into `NodeDetailCard`
- `SkillTreePage.tsx` → rewritten with new layout
- `TrainingSession.tsx` → no changes
- `MiniMap.tsx` → removed (no longer needed)

### Interaction Flow

1. Page loads → 3 horizontal timelines + stats bar
2. Hover node → tooltip with name and status
3. Click topic row → accordion expands with large nodes
4. Click specific node → show detail card with practice entry
5. Click "Start Practice" → enter TrainingSession (existing)
6. Complete practice → update node status, timeline updates

### Visual Design

- Use existing tier color gradients for node fills
- Completed nodes: solid fill with checkmark
- Current/recommended: pulsing animation + star highlight
- Locked: gray outline, lock icon, reduced opacity
- Topic row labels use existing `NODE_ICON_MAP` icons from lucide-react
- Clean white background, consistent with current minimal theme
