import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'logarithmic-fn-L1-01', nodeId: 'logarithmic-fn', level: 1, title: 'Log definition', text: 'Evaluate $\\log_2(8)$.', hints: ['$2^? = 8$'], answer: '$\\log_2(8) = 3$ since $2^3 = 8$', marks: 1 },
  { id: 'logarithmic-fn-L1-02', nodeId: 'logarithmic-fn', level: 1, title: 'Log of 1', text: 'Evaluate $\\log_5(1)$.', hints: ['$5^? = 1$'], answer: '$\\log_5(1) = 0$ since $5^0 = 1$', marks: 1 },
  { id: 'logarithmic-fn-L1-03', nodeId: 'logarithmic-fn', level: 1, title: 'Log of base', text: 'Evaluate $\\log_3(3)$.', hints: ['$3^? = 3$'], answer: '$\\log_3(3) = 1$', marks: 1 },
  { id: 'logarithmic-fn-L1-04', nodeId: 'logarithmic-fn', level: 1, title: 'Convert to exponential', text: 'Write $\\log_4(16) = 2$ in exponential form.', hints: ['$\\log_b(a) = c$ means $b^c = a$.'], answer: '$4^2 = 16$', marks: 1 },

  // Level 2
  { id: 'logarithmic-fn-L2-01', nodeId: 'logarithmic-fn', level: 2, title: 'Log law: product', text: 'Simplify $\\log_2(4) + \\log_2(8)$.', hints: ['$\\log(a) + \\log(b) = \\log(ab)$', 'Or evaluate each: $2 + 3$.'], answer: '$\\log_2(4) + \\log_2(8) = 2 + 3 = 5$\n\nOr: $\\log_2(32) = 5$', marks: 1 },
  { id: 'logarithmic-fn-L2-02', nodeId: 'logarithmic-fn', level: 2, title: 'Log law: quotient', text: 'Simplify $\\log_{10}(1000) - \\log_{10}(10)$.', hints: ['$\\log(a) - \\log(b) = \\log(\\frac{a}{b})$'], answer: '$\\log_{10}(1000) - \\log_{10}(10) = 3 - 1 = 2$', marks: 1 },
  { id: 'logarithmic-fn-L2-03', nodeId: 'logarithmic-fn', level: 2, title: 'Log law: power', text: 'Simplify $\\log_3(9^5)$.', hints: ['$\\log(a^n) = n\\log(a)$', '$9 = 3^2$'], answer: '$\\log_3(9^5) = 5\\log_3(9) = 5 \\times 2 = 10$', marks: 2 },
  { id: 'logarithmic-fn-L2-04', nodeId: 'logarithmic-fn', level: 2, title: 'Solve using logs', text: 'Solve $10^x = 500$.', hints: ['Take $\\log_{10}$ of both sides.'], answer: '$x = \\log_{10}(500) \\approx 2.699$', marks: 2 },

  // Level 3
  { id: 'logarithmic-fn-L3-01', nodeId: 'logarithmic-fn', level: 3, title: 'Graph of log function', text: 'State the domain, range, and asymptote of $y = \\log_2(x - 1)$.', hints: ['The argument must be positive: $x - 1 > 0$.', 'Vertical asymptote where argument $= 0$.'], answer: 'Domain: $x > 1$ (i.e., $(1, \\infty)$).\n\nRange: $(-\\infty, \\infty)$.\n\nVertical asymptote: $x = 1$.', marks: 2 },
  { id: 'logarithmic-fn-L3-02', nodeId: 'logarithmic-fn', level: 3, title: 'Change of base', text: 'Evaluate $\\log_3(20)$ correct to 3 decimal places using the change of base rule.', hints: ['$\\log_3(20) = \\frac{\\ln 20}{\\ln 3}$'], answer: '$\\log_3(20) = \\frac{\\ln 20}{\\ln 3} = \\frac{2.9957}{1.0986} \\approx 2.727$', marks: 2 },
  { id: 'logarithmic-fn-L3-03', nodeId: 'logarithmic-fn', level: 3, title: 'Solve log equation', text: 'Solve $\\log_2(x) + \\log_2(x-2) = 3$.', hints: ['Combine: $\\log_2(x(x-2)) = 3$.', '$x(x-2) = 8$'], answer: '$\\log_2(x(x-2)) = 3$\n\n$x^2 - 2x = 8$\n\n$x^2 - 2x - 8 = 0$\n\n$(x-4)(x+2) = 0$\n\n$x = 4$ (reject $x = -2$ since $\\log$ requires positive argument)', marks: 3 },

  // Level 4
  { id: 'logarithmic-fn-L4-01', nodeId: 'logarithmic-fn', level: 4, title: 'Logarithmic modelling', text: 'The Richter scale magnitude is $M = \\log_{10}\\left(\\frac{I}{I_0}\\right)$. An earthquake of magnitude 5 is how many times more intense than one of magnitude 3?', hints: ['$M_1 - M_2 = \\log_{10}\\left(\\frac{I_1}{I_2}\\right)$', '$5 - 3 = 2$'], answer: '$\\log_{10}\\left(\\frac{I_1}{I_2}\\right) = 5 - 3 = 2$\n\n$\\frac{I_1}{I_2} = 10^2 = 100$\n\nIt is 100 times more intense.', marks: 3 },
  { id: 'logarithmic-fn-L4-02', nodeId: 'logarithmic-fn', level: 4, title: 'Solve exponential with logs', text: 'Solve $3^{2x-1} = 7$.', hints: ['Take $\\ln$ of both sides.', '$(2x-1)\\ln 3 = \\ln 7$'], answer: '$(2x-1)\\ln 3 = \\ln 7$\n\n$2x - 1 = \\frac{\\ln 7}{\\ln 3} \\approx 1.7712$\n\n$2x \\approx 2.7712$\n\n$x \\approx 1.386$', marks: 3 },
  { id: 'logarithmic-fn-L4-03', nodeId: 'logarithmic-fn', level: 4, title: 'Inverse of exponential', text: 'Find the inverse function of $f(x) = 2 \\cdot 3^{x-1} + 5$.', hints: ['Swap $x$ and $y$, then solve for $y$.', '$x - 5 = 2 \\cdot 3^{y-1}$'], answer: '$x = 2 \\cdot 3^{y-1} + 5$\n\n$\\frac{x-5}{2} = 3^{y-1}$\n\n$y - 1 = \\log_3\\left(\\frac{x-5}{2}\\right)$\n\n$f^{-1}(x) = 1 + \\log_3\\left(\\frac{x-5}{2}\\right)$, domain $x > 5$', marks: 3 },

  // Level 5
  { id: 'logarithmic-fn-L5-01', nodeId: 'logarithmic-fn', level: 5, title: 'Log equation with extraneous solutions', text: 'Solve $\\log(x+3) + \\log(x-1) = \\log(3x+1)$ where $\\log$ is base 10.', hints: ['$\\log((x+3)(x-1)) = \\log(3x+1)$', 'So $(x+3)(x-1) = 3x+1$. Check domain.'], answer: '$(x+3)(x-1) = 3x + 1$\n\n$x^2 + 2x - 3 = 3x + 1$\n\n$x^2 - x - 4 = 0$\n\n$x = \\frac{1 \\pm \\sqrt{17}}{2}$\n\n$x \\approx 2.56$ or $x \\approx -1.56$\n\nCheck domain: need $x > 1$ (for $\\log(x-1)$), so $x = \\frac{1+\\sqrt{17}}{2} \\approx 2.56$', marks: 4 },
  { id: 'logarithmic-fn-L5-02', nodeId: 'logarithmic-fn', level: 5, title: 'Prove log identity', text: 'Prove that $\\log_a b \\cdot \\log_b a = 1$.', hints: ['Use change of base.', '$\\log_a b = \\frac{\\ln b}{\\ln a}$'], answer: '$\\log_a b \\cdot \\log_b a = \\frac{\\ln b}{\\ln a} \\cdot \\frac{\\ln a}{\\ln b} = 1$', marks: 3 },
];

export default questions;
