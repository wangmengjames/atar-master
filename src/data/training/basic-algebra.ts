import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1 — Warm-up
  { id: 'basic-algebra-L1-01', nodeId: 'basic-algebra', level: 1, title: 'Solve one-step equation', text: 'Solve $x + 5 = 12$.', hints: ['Subtract 5 from both sides.', 'What number plus 5 gives 12?'], answer: '$x + 5 = 12$\n\n$x = 12 - 5 = 7$', marks: 1 },
  { id: 'basic-algebra-L1-02', nodeId: 'basic-algebra', level: 1, title: 'Solve one-step equation (multiplication)', text: 'Solve $3x = 18$.', hints: ['Divide both sides by 3.', '$x = 18 \\div 3$'], answer: '$3x = 18$\n\n$x = 6$', marks: 1 },
  { id: 'basic-algebra-L1-03', nodeId: 'basic-algebra', level: 1, title: 'Evaluate an expression', text: 'If $a = 4$, find the value of $2a + 3$.', hints: ['Substitute $a = 4$.', '$2(4) + 3$'], answer: '$2(4) + 3 = 8 + 3 = 11$', marks: 1 },
  { id: 'basic-algebra-L1-04', nodeId: 'basic-algebra', level: 1, title: 'Simplify like terms', text: 'Simplify $3x + 5x$.', hints: ['These are like terms.', 'Add the coefficients.'], answer: '$3x + 5x = 8x$', marks: 1 },

  // Level 2 — Foundation
  { id: 'basic-algebra-L2-01', nodeId: 'basic-algebra', level: 2, title: 'Two-step equation', text: 'Solve $2x + 3 = 11$.', hints: ['Subtract 3 from both sides first.', 'Then divide by 2.'], answer: '$2x + 3 = 11$\n\n$2x = 8$\n\n$x = 4$', marks: 1 },
  { id: 'basic-algebra-L2-02', nodeId: 'basic-algebra', level: 2, title: 'Expand brackets', text: 'Expand and simplify $3(2x - 4) + 5$.', hints: ['Multiply each term inside the bracket by 3.', '$6x - 12 + 5$'], answer: '$3(2x - 4) + 5 = 6x - 12 + 5 = 6x - 7$', marks: 2 },
  { id: 'basic-algebra-L2-03', nodeId: 'basic-algebra', level: 2, title: 'Equation with negatives', text: 'Solve $5 - 2x = 1$.', hints: ['Subtract 5 from both sides.', '$-2x = -4$, now divide by $-2$.'], answer: '$5 - 2x = 1$\n\n$-2x = -4$\n\n$x = 2$', marks: 1 },
  { id: 'basic-algebra-L2-04', nodeId: 'basic-algebra', level: 2, title: 'Substitution', text: 'If $x = 3$ and $y = -2$, evaluate $x^2 - 2y$.', hints: ['Substitute the values.', '$9 - 2(-2) = 9 + 4$'], answer: '$x^2 - 2y = (3)^2 - 2(-2) = 9 + 4 = 13$', marks: 2 },

  // Level 3 — Developing
  { id: 'basic-algebra-L3-01', nodeId: 'basic-algebra', level: 3, title: 'Variables on both sides', text: 'Solve $5x - 3 = 2x + 9$.', hints: ['Move $x$ terms to one side.', '$3x = 12$'], answer: '$5x - 3 = 2x + 9$\n\n$3x = 12$\n\n$x = 4$', marks: 2 },
  { id: 'basic-algebra-L3-02', nodeId: 'basic-algebra', level: 3, title: 'Factorise common factor', text: 'Factorise $6x^2 + 9x$.', hints: ['Find the highest common factor of 6 and 9.', 'HCF is $3x$.'], answer: '$6x^2 + 9x = 3x(2x + 3)$', marks: 2 },
  { id: 'basic-algebra-L3-03', nodeId: 'basic-algebra', level: 3, title: 'Solve with fractions', text: 'Solve $\\frac{x}{3} + 2 = 5$.', hints: ['Subtract 2 from both sides.', 'Multiply both sides by 3.'], answer: '$\\frac{x}{3} + 2 = 5$\n\n$\\frac{x}{3} = 3$\n\n$x = 9$', marks: 2 },

  // Level 4 — Proficient
  { id: 'basic-algebra-L4-01', nodeId: 'basic-algebra', level: 4, title: 'Quadratic factorisation', text: 'Solve $x^2 - 5x + 6 = 0$.', hints: ['Find two numbers that multiply to 6 and add to $-5$.', '$(x-2)(x-3) = 0$'], answer: '$x^2 - 5x + 6 = 0$\n\n$(x - 2)(x - 3) = 0$\n\n$x = 2$ or $x = 3$', marks: 2 },
  { id: 'basic-algebra-L4-02', nodeId: 'basic-algebra', level: 4, title: 'Algebraic fraction equation', text: 'Solve $\\frac{2x+1}{3} = \\frac{x-2}{2}$.', hints: ['Cross-multiply or multiply both sides by 6.', '$2(2x+1) = 3(x-2)$'], answer: '$2(2x+1) = 3(x-2)$\n\n$4x + 2 = 3x - 6$\n\n$x = -8$', marks: 3 },
  { id: 'basic-algebra-L4-03', nodeId: 'basic-algebra', level: 4, title: 'Form and solve equation', text: 'The sum of three consecutive integers is 72. Find the integers.', hints: ['Let the integers be $n$, $n+1$, $n+2$.', '$3n + 3 = 72$'], answer: 'Let integers be $n, n+1, n+2$.\n\n$n + (n+1) + (n+2) = 72$\n\n$3n + 3 = 72$\n\n$3n = 69$, $n = 23$.\n\nThe integers are 23, 24, 25.', marks: 3 },

  // Level 5 — Challenge
  { id: 'basic-algebra-L5-01', nodeId: 'basic-algebra', level: 5, title: 'Pronumeral proof', text: 'Show that if $\\frac{a}{b} = \\frac{c}{d}$, then $\\frac{a+b}{b} = \\frac{c+d}{d}$.', hints: ['Start with $\\frac{a}{b} = \\frac{c}{d}$.', 'Add 1 to both sides.'], answer: '$\\frac{a}{b} = \\frac{c}{d}$\n\nAdding 1 to both sides:\n\n$\\frac{a}{b} + 1 = \\frac{c}{d} + 1$\n\n$\\frac{a + b}{b} = \\frac{c + d}{d}$ as required.', marks: 3 },
  { id: 'basic-algebra-L5-02', nodeId: 'basic-algebra', level: 5, title: 'Complex algebraic manipulation', text: 'Solve $\\frac{3}{x-1} - \\frac{2}{x+1} = 1$ for $x$.', hints: ['Common denominator is $(x-1)(x+1)$.', 'Expand and solve the resulting quadratic.'], answer: 'LCD $= (x-1)(x+1)$\n\n$3(x+1) - 2(x-1) = (x-1)(x+1)$\n\n$3x + 3 - 2x + 2 = x^2 - 1$\n\n$x + 5 = x^2 - 1$\n\n$x^2 - x - 6 = 0$\n\n$(x-3)(x+2) = 0$\n\n$x = 3$ or $x = -2$', marks: 4 },
];

export default questions;
