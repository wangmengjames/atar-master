import { useMemo } from 'react';
import { ArrowLeft, Lock, Play, CheckCircle2 } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getQuestionsForNode } from '../data/questionMatcher';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress } from '../lib/progress';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onBack: () => void;
  onStartLevel: (nodeId: string, level: number) => void;
}

const LEVEL_NAMES = ['Warm-up', 'Foundation', 'Developing', 'Proficient', 'Challenge + Exam'];
const LEVEL_DESCRIPTIONS = [
  'Basic concept check — get started!',
  'Build core understanding',
  'Apply knowledge to standard problems',
  'Tackle complex multi-step problems',
  'Real VCE exam questions & challenge problems',
];

export default function TopicSubTree({ nodeId, progress, onBack, onStartLevel }: Props) {
  const node = useMemo(() => ALL_NODES.find(n => n.id === nodeId), [nodeId]);
  const np = getNodeProgress(progress, nodeId);
  const questions = useMemo(() => getQuestionsForNode(nodeId), [nodeId]);
  const topicColor = node ? SKILL_TOPIC_COLORS[node.topic as Topic] : null;

  if (!node) return null;

  // Split questions into 5 levels by difficulty/marks
  const levels = useMemo(() => {
    const sorted = [...questions].sort((a, b) => a.question.marks - b.question.marks);
    const perLevel = Math.max(1, Math.ceil(sorted.length / 5));
    return Array.from({ length: 5 }, (_, i) => {
      const start = i * perLevel;
      return sorted.slice(start, start + perLevel);
    });
  }, [questions]);

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
          <div className="text-2xl font-bold text-white">{np.score}%</div>
          <div className="text-xs text-gray-500">mastery</div>
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-4">
        {levels.map((levelQuestions, i) => {
          const levelNum = i + 1;
          const isCompleted = np.levelsCompleted.includes(levelNum);
          const isUnlocked = levelNum === 1 || np.levelsCompleted.includes(levelNum - 1);
          const isLocked = !isUnlocked;
          const stars = levelNum;

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
                  {/* Status icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isLocked ? 'bg-gray-800' : isCompleted ? 'bg-green-900/50' : 'bg-blue-900/30'
                  }`}>
                    {isLocked ? (
                      <Lock size={18} className="text-gray-600" />
                    ) : isCompleted ? (
                      <CheckCircle2 size={18} className="text-green-400" />
                    ) : (
                      <Play size={18} className="text-blue-400" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${isLocked ? 'text-gray-600' : 'text-white'}`}>
                        Level {levelNum}: {LEVEL_NAMES[i]}
                      </h3>
                      <span className="text-yellow-400 text-sm">
                        {'⭐'.repeat(stars)}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${isLocked ? 'text-gray-700' : 'text-gray-400'}`}>
                      {LEVEL_DESCRIPTIONS[i]} • {levelQuestions.length} question{levelQuestions.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Action */}
                {!isLocked && !isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Start
                  </button>
                )}
                {isCompleted && (
                  <button
                    onClick={() => onStartLevel(nodeId, levelNum)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium rounded-lg transition-colors"
                  >
                    Redo
                  </button>
                )}
              </div>

              {/* Question cards preview (collapsed for locked) */}
              {!isLocked && levelQuestions.length > 0 && (
                <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
                  {levelQuestions.map((mq, qi) => (
                    <div
                      key={qi}
                      className={`flex-shrink-0 w-48 p-3 rounded-lg border text-xs ${
                        isCompleted
                          ? 'bg-green-900/20 border-green-800/30 text-green-300'
                          : 'bg-gray-900 border-gray-700 text-gray-400'
                      }`}
                    >
                      <div className="font-mono text-[10px] text-gray-500 mb-1">
                        {mq.examTitle} • {mq.question.marks}mk
                      </div>
                      <div className="line-clamp-2">
                        {mq.question.text.slice(0, 80)}…
                      </div>
                    </div>
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
