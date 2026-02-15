import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'domain-range-L1-01', nodeId: 'domain-range', level: 1, title: 'Domain of linear', text: 'What is the domain of $f(x) = 3x + 1$?', hints: ['Can $x$ be any real number?'], answer: 'Domain: $\\mathbb{R}$ (all real numbers)', marks: 1 },
  { id: 'domain-range-L1-02', nodeId: 'domain-range', level: 1, title: 'Range of quadratic', text: 'What is the range of $f(x) = x^2$?', hints: ['$x^2$ is always $\\geq 0$.'], answer: 'Range: $[0, \\infty)$', marks: 1 },
  { id: 'domain-range-L1-03', nodeId: 'domain-range', level: 1, title: 'Domain from set of points', text: 'A function has points $\\{(1,3), (2,5), (4,7)\\}$. What is the domain?', hints: ['Domain = set of $x$-values.'], answer: 'Domain: $\\{1, 2, 4\\}$', marks: 1 },
  { id: 'domain-range-L1-04', nodeId: 'domain-range', level: 1, title: 'Range from graph', text: 'A parabola has vertex $(0, -2)$ and opens upward. What is the range?', hints: ['Minimum $y$-value is at the vertex.'], answer: 'Range: $[-2, \\infty)$', marks: 1 },

  // Level 2
  { id: 'domain-range-L2-01', nodeId: 'domain-range', level: 2, title: 'Domain of square root', text: 'Find the domain of $f(x) = \\sqrt{x - 3}$.', hints: ['Expression under square root must be $\\geq 0$.'], answer: '$x - 3 \\geq 0$, so domain: $[3, \\infty)$', marks: 1 },
  { id: 'domain-range-L2-02', nodeId: 'domain-range', level: 2, title: 'Domain of rational function', text: 'Find the domain of $f(x) = \\frac{1}{x-2}$.', hints: ['Denominator cannot be zero.'], answer: '$x \\neq 2$. Domain: $\\mathbb{R} \\setminus \\{2\\}$', marks: 1 },
  { id: 'domain-range-L2-03', nodeId: 'domain-range', level: 2, title: 'Range of transformed function', text: 'Find the range of $f(x) = x^2 + 3$.', hints: ['$x^2 \\geq 0$, so $x^2 + 3 \\geq 3$.'], answer: 'Range: $[3, \\infty)$', marks: 2 },
  { id: 'domain-range-L2-04', nodeId: 'domain-range', level: 2, title: 'Range of exponential', text: 'Find the range of $f(x) = 2^x + 1$.', hints: ['$2^x > 0$ for all $x$.'], answer: '$2^x > 0$, so $2^x + 1 > 1$. Range: $(1, \\infty)$', marks: 1 },

  // Level 3
  { id: 'domain-range-L3-01', nodeId: 'domain-range', level: 3, title: 'Domain of log function', text: 'Find the domain of $f(x) = \\ln(2x - 6)$.', hints: ['$2x - 6 > 0$'], answer: '$2x - 6 > 0 \\Rightarrow x > 3$. Domain: $(3, \\infty)$', marks: 2 },
  { id: 'domain-range-L3-02', nodeId: 'domain-range', level: 3, title: 'Domain with two restrictions', text: 'Find the domain of $f(x) = \\frac{\\sqrt{x}}{x - 4}$.', hints: ['Need $x \\geq 0$ (square root) and $x \\neq 4$ (denominator).'], answer: 'Domain: $[0, 4) \\cup (4, \\infty)$', marks: 2 },
  { id: 'domain-range-L3-03', nodeId: 'domain-range', level: 3, title: 'Range of rational function', text: 'Find the range of $f(x) = \\frac{1}{x} + 2$.', hints: ['$\\frac{1}{x}$ can be any value except 0.'], answer: '$\\frac{1}{x} \\neq 0$, so $f(x) \\neq 2$. Range: $\\mathbb{R} \\setminus \\{2\\}$', marks: 2 },

  // Level 4
  { id: 'domain-range-L4-01', nodeId: 'domain-range', level: 4, title: 'Maximal domain', text: 'Find the maximal domain of $f(x) = \\log_e\\left(\\frac{x+1}{x-2}\\right)$.', hints: ['Need $\\frac{x+1}{x-2} > 0$.', 'Use a sign diagram for $(x+1)$ and $(x-2)$.'], answer: 'Sign analysis: $\\frac{x+1}{x-2} > 0$ when both positive ($x > 2$) or both negative ($x < -1$).\n\nDomain: $(-\\infty, -1) \\cup (2, \\infty)$', marks: 3 },
  { id: 'domain-range-L4-02', nodeId: 'domain-range', level: 4, title: 'Range of restricted domain', text: 'Find the range of $f(x) = x^2 - 4x + 5$ for $x \\in [0, 5]$.', hints: ['Complete the square: $(x-2)^2 + 1$.', 'Check vertex and endpoints.'], answer: '$f(x) = (x-2)^2 + 1$. Vertex at $x = 2$: $f(2) = 1$.\n\n$f(0) = 5$, $f(5) = 10$.\n\nRange: $[1, 10]$', marks: 3 },
  { id: 'domain-range-L4-03', nodeId: 'domain-range', level: 4, title: 'Domain of trig function', text: 'Find the domain of $f(x) = \\tan(x)$ for $x \\in (-\\pi, \\pi)$.', hints: ['$\\tan(x)$ is undefined where $\\cos(x) = 0$.'], answer: '$\\cos(x) = 0$ at $x = \\pm\\frac{\\pi}{2}$.\n\nDomain: $(-\\pi, -\\frac{\\pi}{2}) \\cup (-\\frac{\\pi}{2}, \\frac{\\pi}{2}) \\cup (\\frac{\\pi}{2}, \\pi)$', marks: 2 },

  // Level 5
  { id: 'domain-range-L5-01', nodeId: 'domain-range', level: 5, title: 'Range using calculus reasoning', text: 'Find the range of $f(x) = \\frac{x^2 + 1}{x^2 + 4}$.', hints: ['Let $y = \\frac{x^2+1}{x^2+4}$ and solve for $x^2$.', '$x^2(y-1) = 1 - 4y$, so $x^2 = \\frac{1-4y}{y-1}$. Need $x^2 \\geq 0$.'], answer: '$y(x^2+4) = x^2+1$\n\n$x^2(y-1) = 1-4y$\n\n$x^2 = \\frac{1-4y}{y-1}$\n\nNeed $x^2 \\geq 0$: $\\frac{1-4y}{y-1} \\geq 0$\n\nSign analysis: $\\frac{1}{4} \\leq y < 1$\n\nAlso $y = \\frac{1}{4}$ when $x = 0$, and $y \\to 1$ as $x \\to \\infty$.\n\nRange: $\\left[\\frac{1}{4}, 1\\right)$', marks: 4 },
  { id: 'domain-range-L5-02', nodeId: 'domain-range', level: 5, title: 'Implied domain of composite', text: 'If $f(x) = \\sqrt{x}$ and $g(x) = 4 - x^2$, find the domain of $f(g(x))$.', hints: ['$f(g(x)) = \\sqrt{4-x^2}$', 'Need $4 - x^2 \\geq 0$.'], answer: '$4 - x^2 \\geq 0 \\Rightarrow x^2 \\leq 4 \\Rightarrow -2 \\leq x \\leq 2$\n\nDomain: $[-2, 2]$', marks: 3 },
];

export default questions;
