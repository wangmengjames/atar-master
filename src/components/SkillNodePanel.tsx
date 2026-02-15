import { useMemo } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { getNodeQuestionCounts } from '../data/questionMatcher';
import { SKILL_TOPIC_COLORS, type Topic } from '../types';
import type { UserProgress } from '../lib/progress';
import { getNodeProgress } from '../lib/progress';

interface Props {
  nodeId: string;
  progress: UserProgress;
  onClose: () => void;
  onEnter: (nodeId: string) => void;
}

export default function SkillNodePanel({ nodeId, progress, onClose, onEnter }: Props) {
  const node = useMemo(() => ALL_NODES.find(n => n.id === nodeId), [nodeId]);
  const np = getNodeProgress(progress, nodeId);
  const qCount = useMemo(() => getNodeQuestionCounts()[nodeId] ?? 0, [nodeId]);
  const topicColor = node ? SKILL_TOPIC_COLORS[node.topic as Topic] : null;

  if (!node) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-80 sm:w-96 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-4 animate-slide-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: topicColor?.primary ?? '#6B7280' }}
          />
          <h3 className="text-white font-bold">{node.title}</h3>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <p className="text-sm text-gray-400 mb-3">{node.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-gray-900 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-white">{np.score}%</div>
          <div className="text-[10px] text-gray-500">Score</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-white">{np.levelsCompleted.length}/5</div>
          <div className="text-[10px] text-gray-500">Levels</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-2 text-center">
          <div className="text-lg font-bold text-white">{qCount}</div>
          <div className="text-[10px] text-gray-500">Questions</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-gray-900 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(np.levelsCompleted.length / 5) * 100}%`,
            backgroundColor: topicColor?.primary ?? '#3B82F6',
          }}
        />
      </div>

      <button
        onClick={() => onEnter(nodeId)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
      >
        Enter Topic <ArrowRight size={16} />
      </button>
    </div>
  );
}
