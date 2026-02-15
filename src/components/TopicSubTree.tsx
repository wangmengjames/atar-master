import { useMemo } from 'react';
import { ArrowLeft, Lock, Play, CheckCircle2, Flame } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getQuestionsForNode } from '../data/questionMatcher';
import { getTrainingByDifficulty, type TrainingQuestion } from '../data/training';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress } from '../lib/progress';
import MathText from './MathText';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onBack: () => void;
  onStartLevel: (nodeId: string, level: number) => void;
}

const LEVEL_NAMES = ['Easy ⭐', 'Medium ⭐⭐', 'Hard ⭐⭐⭐', 'Real Exam Questions'];
const LEVEL_DESCRIPTIONS = [
  'Foundation practice — build your confidence',
  'Intermediate challenge — solidify your skills',
  'Advanced problems — push your limits',
  'Actual VCE exam questions — prove your mastery!',
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

  // 4 levels: Easy, Medium, Hard, Real Exam
  const levels: LevelData[] = useMemo(() => {
    return [1, 2, 3, 4].map(level => {
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
  }, [nodeId, examQuestions]);

  return (
    <div className="min-h-full bg-gray-900 p-4 sm:p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: topicColor?.primary ?? '#6B7280' }}
            />
            {node.title}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">{node.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{np.levelsCompleted.length}/4</div>
          <div className="text-xs text-gray-500">levels done</div>
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-4">
        {levels.map((levelData, i) => {
          const levelNum = i + 1;
          const isCompleted = np.levelsCompleted.includes(levelNum);
          const isUnlocked = levelNum === 1 || np.levelsCompleted.includes(levelNum - 1);
          const isLocked = !isUnlocked;
          const qCount = levelData.isExamLevel ? levelData.examCount : levelData.training.length;

          return (
            <div
              key={levelNum}
              className={`rounded-xl border transition-all duration-300 ${
                isLocked
                  ? 'bg-gray-900 border-gray-800 opacity-50'
                  : isCompleted
                  ? 'bg-gray-800/50 border-green-800/50'
                  : 'bg-gray-800 border-gray-700 hover:border-blue-600/50'
              }`}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isLocked ? 'bg-gray-800' : isCompleted ? 'bg-green-900/50' : levelData.isExamLevel ? 'bg-orange-900/30' : 'bg-blue-900/30'
                  }`}>
                    {isLocked ? (
                      <Lock size={18} className="text-gray-600" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={18} className="text-green-400" />
                    ) : levelData.isExamLevel ? (
                      <Flame size={18} className="text-orange-400" />
                    ) : (
                      <Play size={18} className="text-blue-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${isLocked ? 'text-gray-600' : 'text-white'}`}>
                        {LEVEL_NAMES[i]}
                      </h3>
                      {levelData.isExamLevel && !isLocked && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-orange-500/20 text-orange-400 rounded-full">
                          REAL EXAMS
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${isLocked ? 'text-gray-700' : 'text-gray-400'}`}>
                      {LEVEL_DESCRIPTIONS[i]} • {qCount} question{qCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {!isLocked && qCount > 0 && !isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                      levelData.isExamLevel
                        ? 'bg-orange-600 hover:bg-orange-500'
                        : 'bg-blue-600 hover:bg-blue-500'
                    }`}
                  >
                    Start
                  </button>
                )}
                {!isLocked && qCount > 0 && isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  >
                    Redo
                  </button>
                )}
                {!isLocked && qCount === 0 && (
                  <span className="text-xs text-gray-600 italic">Coming soon</span>
                )}
              </div>

              {/* Training question preview */}
              {!isLocked && !levelData.isExamLevel && levelData.training.length > 0 && (
                <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
                  {levelData.training.slice(0, 6).map((tq, qi) => (
                    <div
                      key={qi}
                      className={`flex-shrink-0 w-48 p-3 rounded-lg border text-xs ${
                        isCompleted
                          ? 'bg-green-900/20 border-green-800/30 text-green-300'
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-gray-500 mb-1">
                        {tq.marks} marks
                      </div>
                      <div className="line-clamp-2">
                        <MathText text={tq.text.slice(0, 80) + (tq.text.length > 80 ? '…' : '')} />
                      </div>
                    </div>
                  ))}
                  {levelData.training.length > 6 && (
                    <div className="flex-shrink-0 w-24 p-3 rounded-lg border border-gray-700 bg-gray-900 flex items-center justify-center text-xs text-gray-500">
                      +{levelData.training.length - 6} more
                    </div>
                  )}
                </div>
              )}

              {/* Exam question preview */}
              {!isLocked && levelData.isExamLevel && examQuestions.length > 0 && (
                <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
                  {examQuestions.slice(0, 6).map((mq, qi) => (
                    <div
                      key={qi}
                      className={`flex-shrink-0 w-48 p-3 rounded-lg border text-xs ${
                        isCompleted
                          ? 'bg-green-900/20 border-green-800/30 text-green-300'
                          : 'bg-gray-900 border-orange-800/30 text-gray-400'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-orange-500/70 mb-1">
                        {mq.examTitle} • {mq.question.marks}mk
                      </div>
                      <div className="line-clamp-2">
                        {mq.question.text.slice(0, 80)}…
                      </div>
                    </div>
                  ))}
                  {examQuestions.length > 6 && (
                    <div className="flex-shrink-0 w-24 p-3 rounded-lg border border-orange-800/30 bg-gray-900 flex items-center justify-center text-xs text-orange-500/50">
                      +{examQuestions.length - 6} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
