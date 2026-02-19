import { useMemo } from 'react';
import { ArrowLeft, Lock, Play, CheckCircle2, Flame } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getQuestionsForNode } from '../data/questionMatcher';
import { getTrainingByDifficulty, type TrainingQuestion } from '../data/training';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress } from '../lib/progress';
import { formatEstimatedTime } from '../lib/utils';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onBack: () => void;
  onStartLevel: (nodeId: string, level: number) => void;
}

const LEVEL_NAMES = ['Easy', 'Medium', 'Hard', 'Real Exam'];
const LEVEL_DESCRIPTIONS = [
  'Foundation practice — build your confidence',
  'Intermediate challenge — solidify your skills',
  'Advanced problems — push your limits',
  'Actual VCE exam questions — prove your mastery',
];

const DIFFICULTY_KEYS: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

interface LevelData {
  training: TrainingQuestion[];
  examCount: number;
  isExamLevel: boolean;
}

export default function TopicSubTree({ nodeId, progress, onBack, onStartLevel }: Props) {
  const node = useMemo(() => ALL_NODES.find(n => n.id === nodeId), [nodeId]);
  const np = getNodeProgress(progress, nodeId);
  const examQuestions = useMemo(() => getQuestionsForNode(nodeId), [nodeId]);
  const topicColor = node ? SKILL_TOPIC_COLORS[node.topic as Topic] : null;

  if (!node) return null;

  const maxLevels = node.tier >= 3 ? 4 : 3;

  const levels: LevelData[] = useMemo(() => {
    return Array.from({ length: maxLevels }, (_, i) => i + 1).map(level => {
      if (level === 4) {
        return { training: [], examCount: examQuestions.length, isExamLevel: true };
      }
      const diff = DIFFICULTY_KEYS[level - 1];
      return {
        training: getTrainingByDifficulty(nodeId, diff),
        examCount: 0,
        isExamLevel: false,
      };
    });
  }, [nodeId, examQuestions, maxLevels]);

  return (
    <div className="min-h-full bg-[#FAFAFA] p-4 sm:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-black/50 hover:text-black bg-white hover:bg-black/[0.03] rounded-lg border border-black/10 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: topicColor?.primary ?? '#6B7280' }}
            />
            {node.title}
          </h2>
          <p className="text-sm text-black/45 mt-0.5">{node.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-black">{np.levelsCompleted.filter(l => l <= maxLevels).length}/{levels.filter(l => (l.isExamLevel ? l.examCount : l.training.length) > 0).length}</div>
          <div className="text-xs text-black/35">levels done</div>
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-3">
        {levels.map((levelData, i) => {
          const levelNum = i + 1;
          const isCompleted = np.levelsCompleted.includes(levelNum);
          const qCount = levelData.isExamLevel ? levelData.examCount : levelData.training.length;

          // Don't show levels with no content
          if (qCount === 0) return null;

          // Unlock: the first level with content is always open.
          // For subsequent levels, the previous level must be completed.
          // (Levels with no content are skipped, so we look at the previous
          //  non-empty level rather than levelNum - 1.)
          const prevNonEmptyLevelNum = levels
            .slice(0, i)
            .map((l, j) => ({ l, j }))
            .filter(({ l }) => (l.isExamLevel ? l.examCount : l.training.length) > 0)
            .at(-1)?.j;
          const isUnlocked =
            prevNonEmptyLevelNum === undefined ||
            np.levelsCompleted.includes(prevNonEmptyLevelNum + 1);
          const isLocked = !isUnlocked;

          return (
            <div
              key={levelNum}
              className={`rounded-xl border transition-all duration-200 ${
                isLocked
                  ? 'bg-white border-black/6 opacity-40'
                  : isCompleted
                    ? 'bg-white border-green-200'
                    : 'bg-white border-black/10 hover:border-black/20'
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isLocked
                      ? 'bg-black/[0.04]'
                      : isCompleted
                        ? 'bg-green-50'
                        : levelData.isExamLevel
                          ? 'bg-orange-50'
                          : 'bg-black/[0.04]'
                  }`}>
                    {isLocked ? (
                      <Lock size={18} className="text-black/20" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={18} className="text-green-500" />
                    ) : levelData.isExamLevel ? (
                      <Flame size={18} className="text-orange-500" />
                    ) : (
                      <Play size={18} className="text-black/50" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold text-sm ${isLocked ? 'text-black/20' : 'text-black'}`}>
                        {LEVEL_NAMES[i]}
                      </h3>
                      {levelData.isExamLevel && !isLocked && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-50 text-orange-500 border border-orange-200 rounded-full">
                          REAL EXAMS
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${isLocked ? 'text-black/15' : 'text-black/45'}`}>
                      {LEVEL_DESCRIPTIONS[i]} · {qCount}q · {formatEstimatedTime(qCount * 1.5)}
                    </p>
                  </div>
                </div>

                {!isLocked && qCount > 0 && !isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/85 transition-colors"
                  >
                    Start
                  </button>
                )}
                {!isLocked && qCount > 0 && isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className="px-4 py-2 bg-black/[0.05] hover:bg-black/[0.08] text-black/55 text-sm font-medium rounded-lg border border-black/10 transition-colors"
                  >
                    Redo
                  </button>
                )}
                {!isLocked && qCount === 0 && (
                  <span className="text-xs text-black/25 italic">Coming soon</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
