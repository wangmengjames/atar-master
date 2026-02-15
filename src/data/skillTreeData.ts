/**
 * VCE Mathematical Methods Skill Tree — VCAA Victorian Curriculum V2.0
 *
 * Columns represent Year Levels (Year 8 → VCE Exam).
 * Each node is a VCAA strand at that year level.
 */

import { Topic, Subject, type SkillTreeData, type SkillTreeNode } from '../types';

export const TIER_LABELS = ['Year 8', 'Year 9', 'Year 10 / 10A', 'Year 11 (U1&2)', 'Year 12 (U3&4)', 'VCE Exam'];

// ── Year 8 (tier: 0) ────────────────────────────────────────────

const Y8_NUMBER: SkillTreeNode = {
  id: 'y8-number',
  title: 'Number',
  description: 'Integers, rationals, irrationals, exponent laws with positive integers, ratios, percentages, rates.',
  prerequisites: [],
  topic: Topic.FUNCTIONS,
  difficulty: 1,
  tier: 0,
  position: { x: 0, y: 0 },
  questions: [],
  questionTypes: ['Algorithms'],
};

const Y8_ALGEBRA: SkillTreeNode = {
  id: 'y8-algebra',
  title: 'Algebra',
  description: 'Simplify/expand/factorise linear expressions, linear equations & inequalities, graph linear relations, Cartesian plane.',
  prerequisites: [],
  topic: Topic.FUNCTIONS,
  difficulty: 1,
  tier: 0,
  position: { x: 0, y: 1 },
  questions: [],
  questionTypes: ['Algebra', 'Solving Equations', 'Linear Equations', 'Linear Functions', 'Inequalities', 'Simultaneous Equations', 'Coordinate Geometry', 'Graphing', 'Graph Sketching'],
};

const Y8_STATISTICS: SkillTreeNode = {
  id: 'y8-statistics',
  title: 'Statistics',
  description: 'Data displays, measures of centre and spread, comparing data sets.',
  prerequisites: [],
  topic: Topic.PROBABILITY,
  difficulty: 1,
  tier: 0,
  position: { x: 0, y: 2 },
  questions: [],
  questionTypes: ['Median', 'Mean Calculation', 'Variance'],
};

const Y8_PROBABILITY: SkillTreeNode = {
  id: 'y8-probability',
  title: 'Probability',
  description: 'Experiments, outcomes, sample spaces, relative frequency.',
  prerequisites: [],
  topic: Topic.PROBABILITY,
  difficulty: 1,
  tier: 0,
  position: { x: 0, y: 3 },
  questions: [],
  questionTypes: ['Probability', 'Complementary Events'],
};

// ── Year 9 (tier: 1) ────────────────────────────────────────────

const Y9_NUMBER: SkillTreeNode = {
  id: 'y9-number',
  title: 'Number',
  description: 'Index laws extended (zero/negative exponents), surds, scientific notation, simple interest.',
  prerequisites: ['y8-number'],
  topic: Topic.FUNCTIONS,
  difficulty: 2,
  tier: 1,
  position: { x: 1, y: 0 },
  questions: [],
  questionTypes: [],
};

const Y9_ALGEBRA: SkillTreeNode = {
  id: 'y9-algebra',
  title: 'Algebra',
  description: 'Expand binomial products, factorise monic quadratics, sketch linear graphs, gradient, midpoint, distance, non-linear relations intro.',
  prerequisites: ['y8-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 2,
  tier: 1,
  position: { x: 1, y: 1 },
  questions: [],
  questionTypes: ['Quadratics', 'Power Functions'],
};

const Y9_STATISTICS: SkillTreeNode = {
  id: 'y9-statistics',
  title: 'Statistics',
  description: 'Comparative data displays, scatter plots, back-to-back stem plots.',
  prerequisites: ['y8-statistics'],
  topic: Topic.PROBABILITY,
  difficulty: 2,
  tier: 1,
  position: { x: 1, y: 2 },
  questions: [],
  questionTypes: [],
};

const Y9_PROBABILITY: SkillTreeNode = {
  id: 'y9-probability',
  title: 'Probability',
  description: 'Two-step experiments, Venn diagrams, tree diagrams, relative frequency from experiments.',
  prerequisites: ['y8-probability'],
  topic: Topic.PROBABILITY,
  difficulty: 2,
  tier: 1,
  position: { x: 1, y: 3 },
  questions: [],
  questionTypes: ['Probability Rules', 'Combinatorics'],
};

// ── Year 10 (tier: 2) ───────────────────────────────────────────

const Y10_NUMBER: SkillTreeNode = {
  id: 'y10-number',
  title: 'Number',
  description: 'Surds and irrational numbers, financial maths (compound interest, depreciation).',
  prerequisites: ['y9-number'],
  topic: Topic.FUNCTIONS,
  difficulty: 2,
  tier: 2,
  position: { x: 2, y: 0 },
  questions: [],
  questionTypes: [],
};

const Y10_ALGEBRA: SkillTreeNode = {
  id: 'y10-algebra',
  title: 'Algebra',
  description: 'Quadratic equations (null factor, quadratic formula), polynomial functions, exponential functions, simultaneous equations, parabola features.',
  prerequisites: ['y9-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 2,
  tier: 2,
  position: { x: 2, y: 1 },
  questions: [],
  questionTypes: [
    'Polynomials', 'Polynomial Equations', 'Discriminant', 'Polynomial Graphs',
    'Exponential Functions', 'Exponentials', 'Exponential Equations',
    'Exponential and Logarithmic Functions',
  ],
};

const Y10_STATISTICS: SkillTreeNode = {
  id: 'y10-statistics',
  title: 'Statistics',
  description: 'Bivariate data, line of best fit, correlation, time series.',
  prerequisites: ['y9-statistics'],
  topic: Topic.PROBABILITY,
  difficulty: 2,
  tier: 2,
  position: { x: 2, y: 2 },
  questions: [],
  questionTypes: [],
};

const Y10_PROBABILITY: SkillTreeNode = {
  id: 'y10-probability',
  title: 'Probability',
  description: 'Conditional probability, independence, combinations and counting.',
  prerequisites: ['y9-probability'],
  topic: Topic.PROBABILITY,
  difficulty: 3,
  tier: 2,
  position: { x: 2, y: 3 },
  questions: [],
  questionTypes: ['Conditional Probability', 'Independent Events', 'Bayes\' Theorem', 'Bayes Theorem', 'Bayes'],
};

// ── Year 10A (tier: 2, below Year 10) ───────────────────────────

const Y10A_ALGEBRA: SkillTreeNode = {
  id: 'y10a-algebra',
  title: 'Algebra (Extension)',
  description: 'Composite & inverse functions, logarithms introduction, sequences & series, circle equations.',
  prerequisites: ['y10-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 2,
  position: { x: 2, y: 4 },
  questions: [],
  questionTypes: [
    'Composite Functions', 'Domain of Composite Functions', 'Composite Graphs',
    'Composite Inequalities', 'Function Operations', 'Function Addition', 'Functional Equations',
    'Inverse Functions',
    'Logarithmic Functions', 'Logarithms', 'Logarithmic Equations', 'Domain of Logarithmic Functions',
    'Cubic Equations', 'Cubic Functions', 'Cubic Polynomials', 'Polynomial Expansion',
    'Polynomial Approximation', 'Remainder Theorem',
  ],
};

const Y10A_PROBABILITY: SkillTreeNode = {
  id: 'y10a-probability',
  title: 'Probability (Extension)',
  description: 'Permutations, combinations (nCr), binomial coefficients.',
  prerequisites: ['y10-probability'],
  topic: Topic.PROBABILITY,
  difficulty: 3,
  tier: 2,
  position: { x: 2, y: 5 },
  questions: [],
  questionTypes: [],
};

// ── Year 11 — Methods Units 1&2 (tier: 3) — 9 Core Topics ──────

const Y11_A1: SkillTreeNode = {
  id: 'y11-a1-linear',
  title: 'A1: Linear Graphs & Algebra',
  description: 'Linear equations, simultaneous equations, linear graphs, gradient, intercepts, distance, midpoint.',
  prerequisites: ['y10-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 0 },
  questions: [],
  questionTypes: ['Linear Equations', 'Linear Functions', 'Simultaneous Equations', 'Coordinate Geometry', 'Perpendicular Lines'],
};

const Y11_A2: SkillTreeNode = {
  id: 'y11-a2-quadratics',
  title: 'A2: Quadratics, Cubics & Quartics',
  description: 'Quadratic/cubic/quartic functions, factoring, graphs, turning points, discriminant.',
  prerequisites: ['y10-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 1 },
  questions: [],
  questionTypes: [
    'Quadratics', 'Power Functions', 'Polynomials', 'Polynomial Equations',
    'Polynomial Graphs', 'Discriminant', 'Cubic Equations', 'Cubic Functions',
    'Cubic Polynomials', 'Polynomial Expansion', 'Remainder Theorem',
  ],
};

const Y11_A3: SkillTreeNode = {
  id: 'y11-a3-domain-range',
  title: 'A3: Domain, Range & Functions',
  description: 'Domain & range, function notation, composite functions, inverse functions, piecewise functions.',
  prerequisites: ['y10-algebra', 'y10a-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 2 },
  questions: [],
  questionTypes: [
    'Domain and Range', 'Domain', 'Range', 'Function Properties', 'Function Evaluation',
    'Functions', 'Functions and Relations', 'Properties of Functions', 'Piecewise Functions',
    'Composite Functions', 'Domain of Composite Functions', 'Composite Graphs',
    'Composite Inequalities', 'Function Operations', 'Function Addition', 'Functional Equations',
    'Inverse Functions', 'Rational Functions', 'Graphing Rationals',
    'Rectangular Hyperbola', 'Asymptotes', 'Limiting Behaviour', 'Intercepts',
    'Undefined Expressions',
  ],
};

const Y11_A4: SkillTreeNode = {
  id: 'y11-a4-transformations',
  title: 'A4: Functions & Transformations',
  description: 'Dilations, reflections, translations of graphs. Transformations of y=f(x).',
  prerequisites: ['y10-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 3 },
  questions: [],
  questionTypes: ['Transformations', 'Modelling'],
};

const Y11_A5: SkillTreeNode = {
  id: 'y11-a5-trigonometry',
  title: 'A5: Trigonometry',
  description: 'Circular functions (sin, cos, tan), unit circle, graphs, amplitude, period, phase shift, trig equations & identities.',
  prerequisites: ['y10-algebra', 'y10a-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 4 },
  questions: [],
  questionTypes: [
    'Circular Functions', 'Trig Functions', 'Trig Asymptotes', 'Periodic Functions',
    'Trigonometry', 'Trigonometric Identities', 'Trigonometric Equations', 'Periodicity',
  ],
};

const Y11_A6: SkillTreeNode = {
  id: 'y11-a6-logs-indices',
  title: 'A6: Logarithms & Indices',
  description: 'Index laws, logarithm laws, exponential & logarithmic equations, exponential/log graphs.',
  prerequisites: ['y10-algebra', 'y10a-algebra'],
  topic: Topic.FUNCTIONS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 5 },
  questions: [],
  questionTypes: [
    'Logarithmic Functions', 'Logarithms', 'Logarithmic Equations',
    'Domain of Logarithmic Functions', 'Exponential Functions', 'Exponentials',
    'Exponential Equations', 'Exponential and Logarithmic Functions',
  ],
};

const Y11_A7: SkillTreeNode = {
  id: 'y11-a7-differentiation',
  title: 'A7: Differentiation',
  description: 'Limits, first principles, power rule, derivative graphs, rates of change, tangent lines intro.',
  prerequisites: ['y10-algebra'],
  topic: Topic.CALCULUS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 6 },
  questions: [],
  questionTypes: [
    'Derivatives', 'Differentiation', 'Gradient',
    'Derivatives of Hybrid Functions', 'Exponential Derivatives',
    'Derivative Graphs', 'Derivatives and Graphs', 'Derivative and Graph',
    'Graph of Derivative', 'Graphing Derivatives', 'Second Derivative',
    'Differentiability', 'Continuity and Differentiability', 'Continuity',
    'Function Analysis', 'Increasing Functions', 'Increasing/Decreasing', 'Odd Functions',
    'Average Rate of Change', 'Rates of Change',
  ],
};

const Y11_A8: SkillTreeNode = {
  id: 'y11-a8-integration',
  title: 'A8: Integration',
  description: 'Anti-differentiation, basic integration rules, introduction to definite integrals.',
  prerequisites: ['y10-algebra'],
  topic: Topic.CALCULUS,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 7 },
  questions: [],
  questionTypes: ['Anti-differentiation', 'Antidifferentiation'],
};

const Y11_A9: SkillTreeNode = {
  id: 'y11-a9-combinatorics',
  title: 'A9: Combinatorics & Probability',
  description: 'Counting principles, permutations, combinations, probability rules, discrete random variables, expected value.',
  prerequisites: ['y10-probability', 'y10a-probability'],
  topic: Topic.PROBABILITY,
  difficulty: 3,
  tier: 3,
  position: { x: 3, y: 8 },
  questions: [],
  questionTypes: ['Probability Distributions', 'Discrete Distributions', 'Discrete Random Variables', 'Expected Value'],
};

// ── Year 12 — Methods Units 3&4 (tier: 4) ──────────────────────

const Y12_FUNCTIONS: SkillTreeNode = {
  id: 'y12-functions',
  title: 'Functions & Graphs',
  description: 'Exponential, logarithmic, circular (sin/cos/tan) functions, transformations, modelling.',
  prerequisites: ['y11-a3-domain-range', 'y11-a4-transformations', 'y11-a5-trigonometry'],
  topic: Topic.FUNCTIONS,
  difficulty: 4,
  tier: 4,
  position: { x: 4, y: 0 },
  questions: [],
  questionTypes: [],
};

const Y12_ALGEBRA: SkillTreeNode = {
  id: 'y12-algebra',
  title: 'Algebra & Structure',
  description: 'Advanced algebra, polynomial division, solving exponential/log/trig equations.',
  prerequisites: ['y11-a1-linear', 'y11-a2-quadratics', 'y11-a6-logs-indices'],
  topic: Topic.FUNCTIONS,
  difficulty: 4,
  tier: 4,
  position: { x: 4, y: 1 },
  questions: [],
  questionTypes: [],
};

const Y12_CALCULUS: SkillTreeNode = {
  id: 'y12-calculus',
  title: 'Calculus',
  description: 'Chain/product/quotient rules, applications (tangent lines, optimization, related rates), anti-differentiation, definite integrals, area under/between curves.',
  prerequisites: ['y11-a7-differentiation', 'y11-a8-integration'],
  topic: Topic.CALCULUS,
  difficulty: 4,
  tier: 4,
  position: { x: 4, y: 2 },
  questions: [],
  questionTypes: [
    'Chain Rule', 'Product Rule', 'Quotient Rule',
    'Tangent Lines', 'Tangents', 'Tangent Properties',
    'Stationary Points', 'Nature of Stationary Points', 'Turning Points', 'Points of Inflection',
    'Optimisation', 'Optimization', 'Distance Optimisation', 'Transformations and Optimisation', 'Min Distance',
    'Intersection Analysis', 'Intersections', 'Proof',
    'Anti-differentiation', 'Antidifferentiation', 'Integration',
    'Definite Integrals', 'Definite Integral', 'Fundamental Theorem of Calculus',
    'Integration Properties', 'Integral Properties', 'Trapezium Rule', 'Riemann Sums',
    'Newton\'s Method', 'Newton', 'Partial Fractions', 'Approximation',
    'Area Between Curves', 'Areas Under Curves', 'Area Under Curve', 'Area under Curve',
    'Area under curve', 'Area', 'Transformations and Integrals',
    'Average Value', 'Applications',
  ],
};

const Y12_PROBABILITY: SkillTreeNode = {
  id: 'y12-probability',
  title: 'Probability & Stats',
  description: 'Continuous random variables, PDF/CDF, normal distribution, confidence intervals, sample proportions, statistical inference.',
  prerequisites: ['y11-a9-combinatorics'],
  topic: Topic.PROBABILITY,
  difficulty: 4,
  tier: 4,
  position: { x: 4, y: 3 },
  questions: [],
  questionTypes: [
    'Continuous PDF', 'Continuous Distributions', 'Continuous Random Variables',
    'Continuous Distribution', 'Transformations of PDF',
    'Transformations of Random Variables',
    'Normal Distribution',
    'Binomial Distribution', 'Binomial Probability', 'Binomial Parameters',
    'Geometric Distribution',
    'Confidence Intervals', 'Sample Proportions', 'Sampling Distribution',
  ],
};

// ── VCE Exam (tier: 5) ─────────────────────────────────────────

const VCE_EXAM1: SkillTreeNode = {
  id: 'vce-exam1',
  title: 'Exam 1 (Tech-Free)',
  description: 'All topics, no CAS calculator allowed.',
  prerequisites: ['y12-functions', 'y12-algebra', 'y12-calculus', 'y12-probability'],
  topic: Topic.CALCULUS,
  difficulty: 5,
  tier: 5,
  position: { x: 5, y: 0 },
  questions: [],
  questionTypes: [],
};

const VCE_EXAM2: SkillTreeNode = {
  id: 'vce-exam2',
  title: 'Exam 2 (Tech-Active)',
  description: 'All topics, CAS calculator allowed.',
  prerequisites: ['y12-functions', 'y12-algebra', 'y12-calculus', 'y12-probability'],
  topic: Topic.CALCULUS,
  difficulty: 5,
  tier: 5,
  position: { x: 5, y: 1 },
  questions: [],
  questionTypes: [],
};

// ── Assemble ────────────────────────────────────────────────────

const ALL_NODES: SkillTreeNode[] = [
  // Year 8
  Y8_NUMBER, Y8_ALGEBRA, Y8_STATISTICS, Y8_PROBABILITY,
  // Year 9
  Y9_NUMBER, Y9_ALGEBRA, Y9_STATISTICS, Y9_PROBABILITY,
  // Year 10
  Y10_NUMBER, Y10_ALGEBRA, Y10_STATISTICS, Y10_PROBABILITY,
  // Year 10A
  Y10A_ALGEBRA, Y10A_PROBABILITY,
  // Year 11 (A1-A9)
  Y11_A1, Y11_A2, Y11_A3, Y11_A4, Y11_A5, Y11_A6, Y11_A7, Y11_A8, Y11_A9,
  // Year 12
  Y12_FUNCTIONS, Y12_ALGEBRA, Y12_CALCULUS, Y12_PROBABILITY,
  // VCE Exam
  VCE_EXAM1, VCE_EXAM2,
];

export const UNIFIED_SKILL_TREE: SkillTreeData = {
  id: 'vce-methods-unified',
  title: 'VCE Methods Skill Tree',
  description: 'Complete VCE Mathematical Methods skill tree — Year 8 through VCE Exam.',
  subject: Subject.METHODS,
  year: 2024,
  nodes: ALL_NODES,
  totalMarks: 0,
};

export { ALL_NODES };
