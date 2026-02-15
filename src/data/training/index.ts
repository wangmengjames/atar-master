import type { TrainingQuestion } from './types';

// Tier 0: Prerequisites
import basicAlgebra from './basic-algebra';
import numberOps from './number-ops';
import basicTrig from './basic-trig';
import basicProb from './basic-prob';
import graphingBasics from './graphing-basics';

// Tier 1: Foundation
import polynomialFn from './polynomial-fn';
import exponentialFn from './exponential-fn';
import logarithmicFn from './logarithmic-fn';
import circularFn from './circular-fn';
import transformations from './transformations';
import domainRange from './domain-range';

// Tier 2: Intermediate
import compositeFn from './composite-fn';
import inverseFn from './inverse-fn';
import derivatives from './derivatives';
import diffRules from './diff-rules';
import simultEq from './simult-eq';

// Tier 3: Advanced
import tangentLines from './tangent-lines';
import stationaryPts from './stationary-pts';
import optimisation from './optimisation';
import antiDiff from './anti-diff';
import definiteInt from './definite-int';
import areaCurves from './area-curves';
import avgRate from './avg-rate';

// Tier 4: Probability & Statistics
import condProb from './cond-prob';
import binomialDist from './binomial-dist';
import normalDist from './normal-dist';
import continuousPdf from './continuous-pdf';
import confidenceInt from './confidence-int';
import sampleProp from './sample-prop';

export const trainingQuestions: Record<string, TrainingQuestion[]> = {
  // Tier 0
  'basic-algebra': basicAlgebra,
  'number-ops': numberOps,
  'basic-trig': basicTrig,
  'basic-prob': basicProb,
  'graphing-basics': graphingBasics,
  // Tier 1
  'polynomial-fn': polynomialFn,
  'exponential-fn': exponentialFn,
  'logarithmic-fn': logarithmicFn,
  'circular-fn': circularFn,
  'transformations': transformations,
  'domain-range': domainRange,
  // Tier 2
  'composite-fn': compositeFn,
  'inverse-fn': inverseFn,
  'derivatives': derivatives,
  'diff-rules': diffRules,
  'simult-eq': simultEq,
  // Tier 3
  'tangent-lines': tangentLines,
  'stationary-pts': stationaryPts,
  'optimisation': optimisation,
  'anti-diff': antiDiff,
  'definite-int': definiteInt,
  'area-curves': areaCurves,
  'avg-rate': avgRate,
  // Tier 4
  'cond-prob': condProb,
  'binomial-dist': binomialDist,
  'normal-dist': normalDist,
  'continuous-pdf': continuousPdf,
  'confidence-int': confidenceInt,
  'sample-prop': sampleProp,
};

export function getTrainingForNode(nodeId: string): TrainingQuestion[] {
  return trainingQuestions[nodeId] || [];
}

export function getTrainingByLevel(nodeId: string, level: 1 | 2 | 3 | 4 | 5): TrainingQuestion[] {
  return getTrainingForNode(nodeId).filter(q => q.level === level);
}

export function getTrainingStats(nodeId: string): { total: number; byLevel: Record<number, number> } {
  const questions = getTrainingForNode(nodeId);
  const byLevel: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  questions.forEach(q => { byLevel[q.level] = (byLevel[q.level] || 0) + 1; });
  return { total: questions.length, byLevel };
}

export type { TrainingQuestion } from './types';
