/**
 * Question Matcher
 *
 * Maps skill tree nodes to exam questions by matching
 * the node's `questionTypes` against each question's `subTopic`.
 */

import type { ExamQuestion, ExamPaper } from '../types';
import { getAllExams } from './exams';
import { ALL_NODES } from './skillTreeData';

// ── Build a lookup: normalised subTopic → node id ─────────────

/** Collect every (subTopic → nodeId) pair from the tree definition */
function buildSubTopicIndex(): Map<string, string> {
  const map = new Map<string, string>();
  for (const node of ALL_NODES) {
    for (const qt of node.questionTypes ?? []) {
      map.set(qt.toLowerCase(), node.id);
    }
  }
  return map;
}

const subTopicIndex = buildSubTopicIndex();

// ── Flatten all questions (including subQuestions) ─────────────

interface FlatQuestion {
  question: ExamQuestion;
  examId: string;
  year: number;
  examTitle: string;
}

function flattenExam(exam: ExamPaper): FlatQuestion[] {
  const result: FlatQuestion[] = [];
  const walk = (q: ExamQuestion, parentText?: string) => {
    // If this is a subQuestion and parent had context text, prepend it
    let enrichedQuestion = q;
    if (parentText && parentText.trim().length > 0) {
      const first20 = parentText.slice(0, 20);
      const alreadyHasContext = q.text.includes(first20) || q.text.startsWith('Let ');
      if (!alreadyHasContext) {
        enrichedQuestion = { ...q, text: `[Context] ${parentText}\n\n${q.text}` };
      }
    }
    result.push({ question: enrichedQuestion, examId: exam.id, year: exam.year, examTitle: exam.title });
    if (q.subQuestions) q.subQuestions.forEach(sq => walk(sq, q.text));
  };
  exam.questions.forEach(walk);
  return result;
}

let _allFlat: FlatQuestion[] | null = null;
function getAllFlat(): FlatQuestion[] {
  if (!_allFlat) {
    _allFlat = getAllExams().flatMap(flattenExam);
  }
  return _allFlat;
}

// ── Public API ─────────────────────────────────────────────────

export interface MatchedQuestion {
  question: ExamQuestion;
  examId: string;
  year: number;
  examTitle: string;
}

/**
 * Get all exam questions matching a given skill tree node.
 * Special handling for VCE exam nodes which aggregate all questions from their exam type.
 */
export function getQuestionsForNode(nodeId: string): MatchedQuestion[] {
  const node = ALL_NODES.find(n => n.id === nodeId);
  if (!node) return [];

  // VCE exam questions only for Year 11+ (tier >= 3)
  if (node.tier < 3) return [];

  // VCE Exam nodes: return ALL questions from Exam 1 or Exam 2
  if (nodeId === 'vce-exam1') {
    return getAllFlat().filter(fq => fq.examTitle.includes('Exam 1') || fq.examTitle.includes('exam1'));
  }
  if (nodeId === 'vce-exam2') {
    return getAllFlat().filter(fq => fq.examTitle.includes('Exam 2') || fq.examTitle.includes('exam2'));
  }

  const types = new Set((node.questionTypes ?? []).map(t => t.toLowerCase()));
  if (types.size === 0) return [];

  return getAllFlat().filter(fq => {
    const st = fq.question.subTopic;
    if (!st) return false;
    return types.has(st.toLowerCase());
  });
}

/**
 * Get the node id for a given subTopic string.
 */
export function getNodeIdForSubTopic(subTopic: string): string | undefined {
  return subTopicIndex.get(subTopic.toLowerCase());
}

/**
 * Get a summary: nodeId → question count.
 */
export function getNodeQuestionCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  const allFlat = getAllFlat();

  for (const node of ALL_NODES) {
    // VCE exam questions only for Year 11+ (tier >= 3)
    if (node.tier < 3) {
      counts[node.id] = 0;
      continue;
    }
    // VCE Exam nodes: count all questions from their exam type
    if (node.id === 'vce-exam1') {
      counts[node.id] = allFlat.filter(fq => fq.examTitle.includes('Exam 1') || fq.examTitle.includes('exam1')).length;
      continue;
    }
    if (node.id === 'vce-exam2') {
      counts[node.id] = allFlat.filter(fq => fq.examTitle.includes('Exam 2') || fq.examTitle.includes('exam2')).length;
      continue;
    }

    const types = new Set((node.questionTypes ?? []).map(t => t.toLowerCase()));
    counts[node.id] = allFlat.filter(fq => {
      const st = fq.question.subTopic;
      return st ? types.has(st.toLowerCase()) : false;
    }).length;
  }

  return counts;
}

/**
 * Find subTopics in exam data that are NOT mapped to any node.
 * Useful for debugging coverage.
 */
export function getUnmappedSubTopics(): string[] {
  const mapped = new Set<string>();
  for (const node of ALL_NODES) {
    for (const qt of node.questionTypes ?? []) {
      mapped.add(qt.toLowerCase());
    }
  }

  const seen = new Set<string>();
  for (const fq of getAllFlat()) {
    const st = fq.question.subTopic;
    if (st && !mapped.has(st.toLowerCase())) {
      seen.add(st);
    }
  }

  return [...seen].sort();
}

/**
 * Total marks across all matched questions for a node.
 */
export function getTotalMarksForNode(nodeId: string): number {
  return getQuestionsForNode(nodeId).reduce((sum, mq) => sum + mq.question.marks, 0);
}
