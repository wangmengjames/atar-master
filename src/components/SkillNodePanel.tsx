import { useMemo } from 'react';
import { ArrowRight, Calculator, CheckCircle2, Lock, Play, Sparkles, X } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import type { UserProgress } from '../lib/progress';
import { computeNodeStatus, getNodeProgress } from '../lib/progress';
import { formatEstimatedTime } from '../lib/utils';
import { getNodeLevelData, getNodeStudyTotals } from '../lib/skillTree';
import { NODE_ICON_MAP, TIER_COLORS } from '../data/skillTreeVisuals';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onClose: () => void;
  onStartLevel: (nodeId: string, level: number) => void;
}

const TIER_LABELS = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'VCE Exam'];

export default function SkillNodePanel({ nodeId, progress, onClose, onStartLevel }: Props) {
  const node = useMemo(() => ALL_NODES.find((item) => item.id === nodeId), [nodeId]);
  const nodeProgress = getNodeProgress(progress, nodeId);
  const levelData = useMemo(() => getNodeLevelData(nodeId, progress), [nodeId, progress]);
  const studyTotals = useMemo(() => getNodeStudyTotals(nodeId), [nodeId]);
  const Icon = NODE_ICON_MAP[nodeId] ?? Calculator;

  if (!node) return null;

  const [accent] = TIER_COLORS[node.tier] ?? ['#0f172a', '#334155'];
  const nodeStatus = computeNodeStatus(nodeId, node.prerequisites, progress);
  const isLocked = nodeStatus === 'locked';
  const completedLevelCount = levelData.filter((level) => level.isCompleted).length;
  const completionPct = levelData.length ? Math.round((completedLevelCount / levelData.length) * 100) : 0;
  const recommendedLevel = levelData.find((level) => level.isUnlocked && !level.isCompleted)
    ?? levelData.find((level) => level.isUnlocked)
    ?? null;

  const unmetPrereqs = isLocked
    ? node.prerequisites
      .filter((prereqId) => {
        const current = progress.nodes[prereqId];
        return !current || (current.status !== 'completed' && current.status !== 'mastered');
      })
      .map((prereqId) => ALL_NODES.find((item) => item.id === prereqId)?.title ?? prereqId)
    : [];

  return (
    <div className="flex h-full flex-col bg-white/78">
      <div className="border-b border-black/8 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="quiet-pill">{TIER_LABELS[node.tier]}</span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--ink)]">{node.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{node.description}</p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-[var(--muted)] transition hover:border-black/12 hover:text-[var(--ink)]"
            aria-label="Clear selection"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { label: 'Progress', value: `${completionPct}%`, detail: `${completedLevelCount}/${levelData.length || 0} levels completed` },
            { label: 'Best score', value: `${nodeProgress.score}%`, detail: 'Best passing result saved' },
            { label: 'Training', value: `${studyTotals.trainingCount}`, detail: 'Targeted practice questions' },
            { label: 'Exam', value: `${studyTotals.examCount}`, detail: 'Past exam prompts linked' },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] border border-black/8 bg-[var(--surface)] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">{item.label}</div>
              <div className="mt-2 text-xl font-semibold tracking-tight text-[var(--ink)]">{item.value}</div>
              <div className="mt-2 text-xs leading-5 text-[var(--muted)]">{item.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
        <div
          className="rounded-[24px] border p-5"
          style={{
            borderColor: isLocked ? 'rgba(15, 23, 42, 0.08)' : `${accent}22`,
            background: isLocked ? 'rgba(255,255,255,0.92)' : `linear-gradient(180deg, ${accent}12, rgba(255,255,255,0.96))`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="section-kicker">{isLocked ? 'Locked' : 'Next Focus'}</div>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border"
                  style={{ borderColor: `${accent}20`, background: `${accent}10` }}
                >
                  {isLocked ? <Lock size={18} className="text-[var(--muted)]" /> : <Icon size={18} style={{ color: accent }} />}
                </div>

                <div>
                  <div className="text-lg font-semibold tracking-tight text-[var(--ink)]">
                    {isLocked ? 'Finish prerequisites first' : recommendedLevel?.name ?? 'Ready to review'}
                  </div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {isLocked
                      ? unmetPrereqs.join(', ')
                      : recommendedLevel
                        ? `${recommendedLevel.questionCount} questions · ${formatEstimatedTime(recommendedLevel.questionCount * 1.5)}`
                        : 'This node has no linked practice yet.'}
                  </div>
                </div>
              </div>
            </div>

            {!isLocked && recommendedLevel && (
              <button
                onClick={() => onStartLevel(nodeId, recommendedLevel.level)}
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black/85"
              >
                Start
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>

        <div>
          <div className="section-kicker">Practice Path</div>
          <div className="mt-3 space-y-3">
            {levelData.map((level) => {
              const isUnavailable = isLocked || !level.isUnlocked;
              const actionLabel = level.isCompleted ? 'Redo' : 'Start';

              return (
                <div
                  key={level.level}
                  className={`rounded-[24px] border p-4 transition-all ${
                    isUnavailable
                      ? 'border-black/6 bg-white/70 opacity-60'
                      : level.isCompleted
                        ? 'border-emerald-200 bg-emerald-50/70'
                        : 'border-black/10 bg-white hover:border-black/16 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium ${
                            isUnavailable
                              ? 'border-black/8 bg-black/4 text-black/30'
                              : level.isCompleted
                                ? 'border-emerald-200 bg-emerald-100 text-emerald-700'
                                : 'border-black/10 bg-[var(--surface-2)] text-[var(--ink)]'
                          }`}
                        >
                          {level.isCompleted ? <CheckCircle2 size={16} /> : level.level}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold tracking-tight text-[var(--ink)]">{level.name}</h3>
                            {level.isExamLevel && (
                              <span className="quiet-pill">Exam</span>
                            )}
                            {!isUnavailable && !level.isCompleted && recommendedLevel?.level === level.level && (
                              <span className="quiet-pill">Recommended</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{level.description}</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                        <span className="quiet-pill">{level.questionCount} questions</span>
                        <span className="quiet-pill">{formatEstimatedTime(level.questionCount * 1.5)}</span>
                        {level.isCompleted && <span className="quiet-pill">Completed</span>}
                        {isUnavailable && <span className="quiet-pill">Locked</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => onStartLevel(nodeId, level.level)}
                      disabled={isUnavailable}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        isUnavailable
                          ? 'cursor-not-allowed border border-black/8 bg-black/3 text-black/25'
                          : level.isCompleted
                            ? 'border border-black/10 bg-white text-[var(--ink)] hover:border-black/16'
                            : 'bg-black text-white hover:bg-black/85'
                      }`}
                    >
                      {level.isCompleted ? <Sparkles size={14} /> : <Play size={14} fill="currentColor" />}
                      {actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
