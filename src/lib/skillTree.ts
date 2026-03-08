import { getQuestionsForNode } from '../data/questionMatcher';
import { getTrainingByDifficulty, getTrainingForNode, type TrainingQuestion } from '../data/training';
import { ALL_NODES } from '../data/skillTreeData';
import type { UserProgress } from './progress';
import { getNodeProgress } from './progress';

export const SKILL_LEVEL_NAMES = ['Easy', 'Medium', 'Hard', 'Real Exam'] as const;

export const SKILL_LEVEL_DESCRIPTIONS = [
  'Start with guided drills and quick wins.',
  'Build fluency with mixed practice.',
  'Push accuracy on tougher questions.',
  'Finish with real VCE exam prompts.',
] as const;

const DIFFICULTY_KEYS = ['easy', 'medium', 'hard'] as const;

export interface SkillTreeLevelData {
  level: number;
  name: string;
  description: string;
  questionCount: number;
  training: TrainingQuestion[];
  examCount: number;
  isExamLevel: boolean;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export function getMaxLevelsForNode(nodeId: string): 3 | 4 {
  const node = ALL_NODES.find((item) => item.id === nodeId);
  return node && node.tier >= 3 ? 4 : 3;
}

export function getNodeStudyTotals(nodeId: string) {
  const trainingCount = getTrainingForNode(nodeId).length;
  const examCount = getQuestionsForNode(nodeId).length;

  return {
    trainingCount,
    examCount,
    totalCount: trainingCount + examCount,
  };
}

export function getNodeLevelData(nodeId: string, progress: UserProgress): SkillTreeLevelData[] {
  const maxLevels = getMaxLevelsForNode(nodeId);
  const nodeProgress = getNodeProgress(progress, nodeId);
  const examQuestions = getQuestionsForNode(nodeId);

  const rawLevels = Array.from({ length: maxLevels }, (_, index) => {
    const level = index + 1;

    if (level === 4) {
      return {
        level,
        name: SKILL_LEVEL_NAMES[index],
        description: SKILL_LEVEL_DESCRIPTIONS[index],
        questionCount: examQuestions.length,
        training: [],
        examCount: examQuestions.length,
        isExamLevel: true,
      };
    }

    const training = getTrainingByDifficulty(nodeId, DIFFICULTY_KEYS[index]);

    return {
      level,
      name: SKILL_LEVEL_NAMES[index],
      description: SKILL_LEVEL_DESCRIPTIONS[index],
      questionCount: training.length,
      training,
      examCount: 0,
      isExamLevel: false,
    };
  }).filter((level) => level.questionCount > 0);

  return rawLevels.map((level, index) => {
    const previousVisibleLevel = rawLevels[index - 1];
    const isUnlocked = !previousVisibleLevel || nodeProgress.levelsCompleted.includes(previousVisibleLevel.level);

    return {
      ...level,
      isUnlocked,
      isCompleted: nodeProgress.levelsCompleted.includes(level.level),
    };
  });
}

export function getRecommendedLevel(nodeId: string, progress: UserProgress): SkillTreeLevelData | null {
  const levels = getNodeLevelData(nodeId, progress);

  return levels.find((level) => level.isUnlocked && !level.isCompleted)
    ?? levels.find((level) => level.isUnlocked)
    ?? null;
}
