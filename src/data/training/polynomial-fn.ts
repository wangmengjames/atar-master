import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'polynomial-fn-L1-01', nodeId: 'polynomial-fn', level: 1, title: 'Identify degree', text: 'What is the degree of $3x^4 - 2x + 7$?', hints: ['The degree is the highest power of $x$.'], answer: 'Degree 4 (from the $3x^4$ term).', marks: 1 },
  { id: 'polynomial-fn-L1-02', nodeId: 'polynomial-fn', level: 1, title: 'Evaluate polynomial', text: 'If $f(x) = x^2 - 3x + 2$, find $f(1)$.', hints: ['Substitute $x = 1$.'], answer: '$f(1) = 1 - 3 + 2 = 0$', marks: 1 },
  { id: 'polynomial-fn-L1-03', nodeId: 'polynomial-fn', level: 1, title: 'Expand a product', text: 'Expand $(x+2)(x+3)$.', hints: ['Use FOIL.', '$x^2 + 3x + 2x + 6$'], answer: '$(x+2)(x+3) = x^2 + 5x + 6$', marks: 1 },
  { id: 'polynomial-fn-L1-04', nodeId: 'polynomial-fn', level: 1, title: 'Factorise quadratic', text: 'Factorise $x^2 + 7x + 12$.', hints: ['Find two numbers that multiply to 12 and add to 7.', '$3 \\times 4 = 12$, $3 + 4 = 7$.'], answer: '$x^2 + 7x + 12 = (x+3)(x+4)$', marks: 1 },

  // Level 2
  { id: 'polynomial-fn-L2-01', nodeId: 'polynomial-fn', level: 2, title: 'Solve quadratic by factoring', text: 'Solve $x^2 - x - 6 = 0$.', hints: ['Factorise: $(x-3)(x+2)$.'], answer: '$(x-3)(x+2) = 0$\n\n$x = 3$ or $x = -2$', marks: 2 },
  { id: 'polynomial-fn-L2-02', nodeId: 'polynomial-fn', level: 2, title: 'Difference of squares', text: 'Factorise $4x^2 - 9$.', hints: ['$a^2 - b^2 = (a-b)(a+b)$', '$4x^2 = (2x)^2$, $9 = 3^2$'], answer: '$4x^2 - 9 = (2x-3)(2x+3)$', marks: 1 },
  { id: 'polynomial-fn-L2-03', nodeId: 'polynomial-fn', level: 2, title: 'Vertex of parabola', text: 'Find the vertex of $y = x^2 - 6x + 5$.', hints: ['$x = \\frac{-b}{2a} = \\frac{6}{2} = 3$', 'Find $y$ when $x = 3$.'], answer: '$x = 3$, $y = 9 - 18 + 5 = -4$. Vertex: $(3, -4)$.', marks: 2 },
  { id: 'polynomial-fn-L2-04', nodeId: 'polynomial-fn', level: 2, title: 'Quadratic formula', text: 'Solve $2x^2 + 3x - 2 = 0$ using the quadratic formula.', hints: ['$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$', '$a=2, b=3, c=-2$'], answer: '$x = \\frac{-3 \\pm \\sqrt{9 + 16}}{4} = \\frac{-3 \\pm 5}{4}$\n\n$x = \\frac{1}{2}$ or $x = -2$', marks: 2 },

  // Level 3
  { id: 'polynomial-fn-L3-01', nodeId: 'polynomial-fn', level: 3, title: 'Completing the square', text: 'Write $x^2 + 4x + 1$ in the form $(x+a)^2 + b$.', hints: ['$(x+2)^2 = x^2 + 4x + 4$', 'So $x^2 + 4x + 1 = (x+2)^2 - 3$.'], answer: '$x^2 + 4x + 1 = (x+2)^2 - 4 + 1 = (x+2)^2 - 3$', marks: 2 },
  { id: 'polynomial-fn-L3-02', nodeId: 'polynomial-fn', level: 3, title: 'Discriminant', text: 'For $kx^2 + 4x + 1 = 0$, find the values of $k$ for which there are two distinct real solutions.', hints: ['$\\Delta = b^2 - 4ac > 0$', '$16 - 4k > 0$'], answer: '$\\Delta = 16 - 4k > 0$\n\n$k < 4$ (and $k \\neq 0$ for it to be quadratic)', marks: 2 },
  { id: 'polynomial-fn-L3-03', nodeId: 'polynomial-fn', level: 3, title: 'Cubic factorisation', text: 'Factorise $x^3 - 8$.', hints: ['Difference of cubes: $a^3 - b^3 = (a-b)(a^2+ab+b^2)$', '$a = x, b = 2$'], answer: '$x^3 - 8 = (x-2)(x^2 + 2x + 4)$', marks: 2 },

  // Level 4
  { id: 'polynomial-fn-L4-01', nodeId: 'polynomial-fn', level: 4, title: 'Factor theorem', text: 'Show that $(x-2)$ is a factor of $P(x) = x^3 - 3x^2 + 4$, then fully factorise $P(x)$.', hints: ['Check $P(2) = 0$.', 'Divide by $(x-2)$ to get a quadratic.'], answer: '$P(2) = 8 - 12 + 4 = 0$ ✓\n\n$P(x) = (x-2)(x^2 - x - 2) = (x-2)(x-2)(x+1) = (x-2)^2(x+1)$', marks: 3 },
  { id: 'polynomial-fn-L4-02', nodeId: 'polynomial-fn', level: 4, title: 'Sketch a cubic', text: 'Sketch $y = (x+1)(x-1)(x-3)$, labelling all intercepts.', hints: ['$x$-intercepts at $x = -1, 1, 3$.', '$y$-intercept: $y = (1)(-1)(-3) = 3$.'], answer: '$x$-intercepts: $(-1,0), (1,0), (3,0)$.\n\n$y$-intercept: $(0, 3)$.\n\nLeading coefficient positive, cubic with 3 distinct roots, so graph goes from bottom-left to top-right crossing axis at each root.', marks: 3 },
  { id: 'polynomial-fn-L4-03', nodeId: 'polynomial-fn', level: 4, title: 'Remainder theorem', text: 'Find the remainder when $P(x) = 2x^3 + x^2 - 5x + 2$ is divided by $(x+2)$.', hints: ['Remainder $= P(-2)$.'], answer: '$P(-2) = 2(-8) + 4 + 10 + 2 = -16 + 16 = 0$\n\nRemainder is 0 (so $(x+2)$ is actually a factor).', marks: 2 },

  // Level 5
  { id: 'polynomial-fn-L5-01', nodeId: 'polynomial-fn', level: 5, title: 'Quartic with symmetry', text: 'Solve $x^4 - 5x^2 + 4 = 0$.', hints: ['Let $u = x^2$, so $u^2 - 5u + 4 = 0$.', '$(u-1)(u-4) = 0$'], answer: 'Let $u = x^2$: $u^2 - 5u + 4 = 0$\n\n$(u-1)(u-4) = 0$\n\n$u = 1$ or $u = 4$\n\n$x^2 = 1 \\Rightarrow x = \\pm 1$\n\n$x^2 = 4 \\Rightarrow x = \\pm 2$\n\nSolutions: $x \\in \\{-2, -1, 1, 2\\}$', marks: 3 },
  { id: 'polynomial-fn-L5-02', nodeId: 'polynomial-fn', level: 5, title: 'Unknown coefficients', text: 'The polynomial $P(x) = x^3 + ax^2 + bx - 6$ has factors $(x-1)$ and $(x+2)$. Find $a$ and $b$.', hints: ['$P(1) = 0$ and $P(-2) = 0$.', 'Set up simultaneous equations.'], answer: '$P(1) = 1 + a + b - 6 = 0 \\Rightarrow a + b = 5$ ... (1)\n\n$P(-2) = -8 + 4a - 2b - 6 = 0 \\Rightarrow 4a - 2b = 14 \\Rightarrow 2a - b = 7$ ... (2)\n\nFrom (1) + (2): $3a = 12$, $a = 4$, $b = 1$.', marks: 4 },
];

export default questions;
