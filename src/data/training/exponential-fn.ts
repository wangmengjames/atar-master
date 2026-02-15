import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'exponential-fn-L1-01', nodeId: 'exponential-fn', level: 1, title: 'Evaluate exponential', text: 'Evaluate $2^5$.', hints: ['$2 \\times 2 \\times 2 \\times 2 \\times 2$'], answer: '$2^5 = 32$', marks: 1 },
  { id: 'exponential-fn-L1-02', nodeId: 'exponential-fn', level: 1, title: 'Zero exponent', text: 'What is $7^0$?', hints: ['Any non-zero number to the power of 0 is…'], answer: '$7^0 = 1$', marks: 1 },
  { id: 'exponential-fn-L1-03', nodeId: 'exponential-fn', level: 1, title: 'Identify base and exponent', text: 'In $3^x$, what is the base and what is the exponent?', hints: ['The base is the number being raised.'], answer: 'Base $= 3$, exponent $= x$.', marks: 1 },
  { id: 'exponential-fn-L1-04', nodeId: 'exponential-fn', level: 1, title: 'Simple table', text: 'For $y = 2^x$, find $y$ when $x = 0, 1, 2, 3$.', hints: ['Substitute each value.'], answer: '$x=0: y=1$; $x=1: y=2$; $x=2: y=4$; $x=3: y=8$', marks: 1 },

  // Level 2
  { id: 'exponential-fn-L2-01', nodeId: 'exponential-fn', level: 2, title: 'Sketch exponential', text: 'Describe the key features of $y = 2^x$.', hints: ['Consider the asymptote, intercept, and end behaviour.'], answer: 'Asymptote: $y = 0$ (horizontal). $y$-intercept: $(0, 1)$. Increasing. As $x \\to -\\infty$, $y \\to 0$. As $x \\to \\infty$, $y \\to \\infty$.', marks: 2 },
  { id: 'exponential-fn-L2-02', nodeId: 'exponential-fn', level: 2, title: 'Solve simple exponential', text: 'Solve $3^x = 81$.', hints: ['Express 81 as a power of 3.', '$81 = 3^4$'], answer: '$3^x = 3^4$, so $x = 4$.', marks: 1 },
  { id: 'exponential-fn-L2-03', nodeId: 'exponential-fn', level: 2, title: 'Exponential growth', text: 'A population doubles every year. If it starts at 500, what is the population after 3 years?', hints: ['$P = 500 \\times 2^t$'], answer: '$P = 500 \\times 2^3 = 500 \\times 8 = 4000$', marks: 2 },
  { id: 'exponential-fn-L2-04', nodeId: 'exponential-fn', level: 2, title: 'Transformation of exponential', text: 'What is the asymptote of $y = 2^x + 3$?', hints: ['The graph of $2^x$ is shifted up 3.'], answer: 'Asymptote: $y = 3$', marks: 1 },

  // Level 3
  { id: 'exponential-fn-L3-01', nodeId: 'exponential-fn', level: 3, title: 'Exponential with negative base power', text: 'Sketch and label the key features of $y = 3 \\times 2^{-x} + 1$.', hints: ['This is a decreasing exponential.', 'Asymptote at $y = 1$, $y$-intercept at $y = 3(1) + 1 = 4$.'], answer: 'Asymptote: $y = 1$. $y$-intercept: $(0, 4)$. Decreasing (reflection in $y$-axis). As $x \\to \\infty$, $y \\to 1^+$.', marks: 2 },
  { id: 'exponential-fn-L3-02', nodeId: 'exponential-fn', level: 3, title: 'Compound interest', text: 'An investment of $\\$5000$ earns $6\\%$ p.a. compounded annually. Find its value after 4 years.', hints: ['$A = P(1 + r)^n$', '$A = 5000(1.06)^4$'], answer: '$A = 5000(1.06)^4 = 5000 \\times 1.2625 \\approx \\$6312.38$', marks: 2 },
  { id: 'exponential-fn-L3-03', nodeId: 'exponential-fn', level: 3, title: 'Solve using same base', text: 'Solve $4^{x+1} = 8^x$.', hints: ['Write as powers of 2: $2^{2(x+1)} = 2^{3x}$.', '$2x + 2 = 3x$'], answer: '$2^{2x+2} = 2^{3x}$\n\n$2x + 2 = 3x$\n\n$x = 2$', marks: 2 },

  // Level 4
  { id: 'exponential-fn-L4-01', nodeId: 'exponential-fn', level: 4, title: 'Exponential decay modelling', text: 'The mass of a radioactive substance is modelled by $M = 100e^{-0.05t}$ grams, where $t$ is in years. Find the half-life.', hints: ['Set $M = 50$ and solve for $t$.', '$50 = 100e^{-0.05t}$, so $e^{-0.05t} = 0.5$.'], answer: '$e^{-0.05t} = 0.5$\n\n$-0.05t = \\ln(0.5)$\n\n$t = \\frac{-\\ln(0.5)}{0.05} = \\frac{\\ln 2}{0.05} \\approx 13.86$ years', marks: 3 },
  { id: 'exponential-fn-L4-02', nodeId: 'exponential-fn', level: 4, title: 'Find rule from points', text: 'An exponential function $y = a \\cdot b^x$ passes through $(0, 5)$ and $(2, 45)$. Find $a$ and $b$.', hints: ['From $(0,5)$: $a = 5$.', '$45 = 5b^2$, so $b^2 = 9$.'], answer: 'At $x = 0$: $a = 5$.\n\nAt $x = 2$: $5b^2 = 45$, $b^2 = 9$, $b = 3$ (positive).\n\n$y = 5 \\cdot 3^x$', marks: 3 },
  { id: 'exponential-fn-L4-03', nodeId: 'exponential-fn', level: 4, title: 'Solving with logarithms', text: 'Solve $5 \\cdot 2^x = 160$.', hints: ['$2^x = 32$', '$32 = 2^5$'], answer: '$2^x = \\frac{160}{5} = 32 = 2^5$\n\n$x = 5$', marks: 2 },

  // Level 5
  { id: 'exponential-fn-L5-01', nodeId: 'exponential-fn', level: 5, title: 'Exponential inequality', text: 'Solve $2^{2x} - 5 \\cdot 2^x + 4 < 0$.', hints: ['Let $u = 2^x$, so $u^2 - 5u + 4 < 0$.', '$(u-1)(u-4) < 0$, so $1 < u < 4$.'], answer: 'Let $u = 2^x$: $(u-1)(u-4) < 0 \\Rightarrow 1 < u < 4$\n\n$1 < 2^x < 4$\n\n$2^0 < 2^x < 2^2$\n\n$0 < x < 2$', marks: 4 },
  { id: 'exponential-fn-L5-02', nodeId: 'exponential-fn', level: 5, title: 'Continuous compounding', text: 'A population grows according to $P(t) = P_0 e^{kt}$. The population triples in 8 years. Find $k$, and determine how long until the population is 10 times the original.', hints: ['$3P_0 = P_0 e^{8k}$, so $k = \\frac{\\ln 3}{8}$.', 'For 10 times: $10 = e^{kt}$.'], answer: '$e^{8k} = 3 \\Rightarrow k = \\frac{\\ln 3}{8} \\approx 0.1373$\n\n$e^{kt} = 10 \\Rightarrow t = \\frac{\\ln 10}{k} = \\frac{\\ln 10}{\\ln 3/8} = \\frac{8 \\ln 10}{\\ln 3} \\approx \\frac{8 \\times 2.3026}{1.0986} \\approx 16.77$ years', marks: 4 },
];

export default questions;
