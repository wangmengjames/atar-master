import type { TrainingQuestion } from './types';

// Import all training question files
import basicAlgebra from './basic-algebra';
import numberOps from './number-ops';
import basicTrig from './basic-trig';
import basicProb from './basic-prob';
import graphingBasics from './graphing-basics';
import polynomialFn from './polynomial-fn';
import exponentialFn from './exponential-fn';
import logarithmicFn from './logarithmic-fn';
import circularFn from './circular-fn';
import transformations from './transformations';
import domainRange from './domain-range';
import compositeFn from './composite-fn';
import inverseFn from './inverse-fn';
import derivatives from './derivatives';
import diffRules from './diff-rules';
import simultEq from './simult-eq';
import tangentLines from './tangent-lines';
import stationaryPts from './stationary-pts';
import optimisation from './optimisation';
import antiDiff from './anti-diff';
import definiteInt from './definite-int';
import areaCurves from './area-curves';
import avgRate from './avg-rate';
import condProb from './cond-prob';
import binomialDist from './binomial-dist';
import normalDist from './normal-dist';
import continuousPdf from './continuous-pdf';
import confidenceInt from './confidence-int';
import sampleProp from './sample-prop';

// Old node ID training data (unchanged)
const oldTraining: Record<string, TrainingQuestion[]> = {
  'basic-algebra': basicAlgebra,
  'number-ops': numberOps,
  'basic-trig': basicTrig,
  'basic-prob': basicProb,
  'graphing-basics': graphingBasics,
  'polynomial-fn': polynomialFn,
  'exponential-fn': exponentialFn,
  'logarithmic-fn': logarithmicFn,
  'circular-fn': circularFn,
  'transformations': transformations,
  'domain-range': domainRange,
  'composite-fn': compositeFn,
  'inverse-fn': inverseFn,
  'derivatives': derivatives,
  'diff-rules': diffRules,
  'simult-eq': simultEq,
  'tangent-lines': tangentLines,
  'stationary-pts': stationaryPts,
  'optimisation': optimisation,
  'anti-diff': antiDiff,
  'definite-int': definiteInt,
  'area-curves': areaCurves,
  'avg-rate': avgRate,
  'cond-prob': condProb,
  'binomial-dist': binomialDist,
  'normal-dist': normalDist,
  'continuous-pdf': continuousPdf,
  'confidence-int': confidenceInt,
  'sample-prop': sampleProp,
};

/**
 * Mapping from new year-level node IDs to old training file IDs.
 * Each new node pulls training questions from one or more old nodes.
 */
const NODE_TO_TRAINING: Record<string, string[]> = {
  // Year 8
  'y8-number': ['number-ops'],
  'y8-algebra': ['basic-algebra'],
  'y8-statistics': ['graphing-basics'],
  'y8-probability': ['basic-prob'],
  // Year 9
  'y9-number': [],
  'y9-algebra': ['polynomial-fn', 'simult-eq'],
  'y9-statistics': ['graphing-basics'],
  'y9-probability': ['basic-prob'],
  // Year 10
  'y10-number': [],
  'y10-algebra': ['exponential-fn', 'domain-range'],
  'y10-statistics': [],
  'y10-probability': ['cond-prob'],
  // Year 10A
  'y10a-algebra': ['composite-fn', 'inverse-fn', 'logarithmic-fn'],
  'y10a-probability': [],
  // Year 11 (A1-A9)
  'y11-a1-linear': ['basic-algebra', 'simult-eq'],
  'y11-a2-quadratics': ['polynomial-fn'],
  'y11-a3-domain-range': ['domain-range', 'composite-fn', 'inverse-fn'],
  'y11-a4-transformations': ['transformations'],
  'y11-a5-trigonometry': ['circular-fn', 'basic-trig'],
  'y11-a6-logs-indices': ['logarithmic-fn', 'exponential-fn'],
  'y11-a7-differentiation': ['derivatives', 'diff-rules'],
  'y11-a8-integration': ['anti-diff'],
  'y11-a9-combinatorics': ['binomial-dist', 'cond-prob'],
  // Year 12 (A1-A6)
  'y12-a1-algebra-functions': ['circular-fn', 'exponential-fn', 'polynomial-fn', 'domain-range', 'composite-fn', 'inverse-fn', 'transformations'],
  'y12-a2-differentiation': ['derivatives', 'diff-rules', 'tangent-lines', 'stationary-pts', 'optimisation', 'avg-rate'],
  'y12-a3-integration': ['anti-diff', 'definite-int', 'area-curves'],
  'y12-a4-discrete-prob': ['binomial-dist', 'cond-prob'],
  'y12-a5-continuous-prob': ['continuous-pdf', 'normal-dist', 'confidence-int', 'sample-prop'],
  'y12-a6-pseudocode': [],
  // VCE Exam — no training, exam questions only
  'vce-exam1': [],
  'vce-exam2': [],
};

/** Merge training from mapped old nodes */
function mergeTraining(sources: string[]): TrainingQuestion[] {
  const result: TrainingQuestion[] = [];
  for (const src of sources) {
    const qs = oldTraining[src];
    if (qs) result.push(...qs);
  }
  return result;
}

// Build the new training map
export const trainingQuestions: Record<string, TrainingQuestion[]> = {};
for (const [newId, sources] of Object.entries(NODE_TO_TRAINING)) {
  trainingQuestions[newId] = mergeTraining(sources);
}

export function getTrainingForNode(nodeId: string): TrainingQuestion[] {
  return trainingQuestions[nodeId] || [];
}

export function getTrainingByLevel(nodeId: string, level: 1 | 2 | 3 | 4 | 5): TrainingQuestion[] {
  return getTrainingForNode(nodeId).filter(q => q.level === level);
}

/**
 * Get training by difficulty bucket:
 * - 'easy' = level 1-2
 * - 'medium' = level 3
 * - 'hard' = level 4-5
 */
export function getTrainingByDifficulty(nodeId: string, difficulty: 'easy' | 'medium' | 'hard'): TrainingQuestion[] {
  const all = getTrainingForNode(nodeId);
  switch (difficulty) {
    case 'easy': return all.filter(q => q.level <= 2);
    case 'medium': return all.filter(q => q.level === 3);
    case 'hard': return all.filter(q => q.level >= 4);
  }
}

export function getTrainingStats(nodeId: string): { total: number; byLevel: Record<number, number> } {
  const questions = getTrainingForNode(nodeId);
  const byLevel: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  questions.forEach(q => { byLevel[q.level] = (byLevel[q.level] || 0) + 1; });
  return { total: questions.length, byLevel };
}

export type { TrainingQuestion } from './types';
