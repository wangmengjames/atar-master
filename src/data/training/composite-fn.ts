import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'composite-fn-L1-01', nodeId: 'composite-fn', level: 1, title: 'Evaluate composite', text: 'If $f(x) = 2x$ and $g(x) = x + 3$, find $f(g(1))$.', hints: ['First find $g(1)$.', '$g(1) = 4$, then $f(4)$.'], answer: '$g(1) = 4$, $f(g(1)) = f(4) = 8$', marks: 1 },
  { id: 'composite-fn-L1-02', nodeId: 'composite-fn', level: 1, title: 'Evaluate in other order', text: 'Using $f(x) = 2x$ and $g(x) = x + 3$, find $g(f(1))$.', hints: ['$f(1) = 2$, then $g(2)$.'], answer: '$f(1) = 2$, $g(f(1)) = g(2) = 5$', marks: 1 },
  { id: 'composite-fn-L1-03', nodeId: 'composite-fn', level: 1, title: 'Notation', text: 'If $f(x) = x^2$, what is $f(3)$?', hints: ['Substitute $x = 3$.'], answer: '$f(3) = 9$', marks: 1 },
  { id: 'composite-fn-L1-04', nodeId: 'composite-fn', level: 1, title: 'Simple composite rule', text: 'If $f(x) = x + 1$ and $g(x) = 2x$, find a rule for $f(g(x))$.', hints: ['$f(g(x)) = f(2x) = 2x + 1$'], answer: '$f(g(x)) = 2x + 1$', marks: 1 },

  // Level 2
  { id: 'composite-fn-L2-01', nodeId: 'composite-fn', level: 2, title: 'Composite rule with quadratic', text: 'If $f(x) = x^2$ and $g(x) = x - 1$, find $f(g(x))$.', hints: ['$f(g(x)) = (g(x))^2$'], answer: '$f(g(x)) = (x-1)^2 = x^2 - 2x + 1$', marks: 2 },
  { id: 'composite-fn-L2-02', nodeId: 'composite-fn', level: 2, title: 'Both compositions', text: 'If $f(x) = 3x - 1$ and $g(x) = x^2$, find $g(f(x))$.', hints: ['$g(f(x)) = (f(x))^2 = (3x-1)^2$'], answer: '$g(f(x)) = (3x-1)^2 = 9x^2 - 6x + 1$', marks: 2 },
  { id: 'composite-fn-L2-03', nodeId: 'composite-fn', level: 2, title: 'Composition is not commutative', text: 'Show that $f \\circ g \\neq g \\circ f$ for $f(x) = x + 2$ and $g(x) = 3x$.', hints: ['Find both and compare.'], answer: '$f(g(x)) = 3x + 2$\n\n$g(f(x)) = 3(x+2) = 3x + 6$\n\nSince $3x + 2 \\neq 3x + 6$, $f \\circ g \\neq g \\circ f$.', marks: 2 },
  { id: 'composite-fn-L2-04', nodeId: 'composite-fn', level: 2, title: 'Evaluate nested', text: 'If $f(x) = 2x + 1$, find $f(f(3))$.', hints: ['$f(3) = 7$, then $f(7)$.'], answer: '$f(3) = 7$, $f(f(3)) = f(7) = 15$', marks: 1 },

  // Level 3
  { id: 'composite-fn-L3-01', nodeId: 'composite-fn', level: 3, title: 'Domain of composite', text: 'If $f(x) = \\sqrt{x}$ and $g(x) = 2x - 6$, find the domain of $f \\circ g$.', hints: ['Need $g(x) \\geq 0$.', '$2x - 6 \\geq 0$'], answer: '$f(g(x)) = \\sqrt{2x-6}$. Need $2x - 6 \\geq 0$, so $x \\geq 3$. Domain: $[3, \\infty)$.', marks: 2 },
  { id: 'composite-fn-L3-02', nodeId: 'composite-fn', level: 3, title: 'Composite with trig', text: 'If $f(x) = \\sin(x)$ and $g(x) = 2x$, write the rule for $f \\circ g$ and state its period.', hints: ['$f(g(x)) = \\sin(2x)$', 'Period $= \\frac{2\\pi}{2}$'], answer: '$f(g(x)) = \\sin(2x)$. Period $= \\pi$.', marks: 2 },
  { id: 'composite-fn-L3-03', nodeId: 'composite-fn', level: 3, title: 'Decompose a function', text: 'Express $h(x) = (2x+1)^3$ as a composition $f(g(x))$.', hints: ['What is the "inner" function?', '$g(x) = 2x + 1$, $f(x) = x^3$'], answer: 'Let $g(x) = 2x + 1$ and $f(x) = x^3$. Then $h(x) = f(g(x))$.', marks: 2 },

  // Level 4
  { id: 'composite-fn-L4-01', nodeId: 'composite-fn', level: 4, title: 'Find function from composite', text: 'If $f(g(x)) = 4x^2 - 1$ and $g(x) = 2x$, find $f(x)$.', hints: ['$f(2x) = 4x^2 - 1$', 'Let $u = 2x$, so $x = \\frac{u}{2}$.'], answer: 'Let $u = 2x$: $f(u) = 4\\left(\\frac{u}{2}\\right)^2 - 1 = u^2 - 1$\n\nSo $f(x) = x^2 - 1$.', marks: 3 },
  { id: 'composite-fn-L4-02', nodeId: 'composite-fn', level: 4, title: 'Composite and inverse', text: 'If $f(x) = 3x + 2$, find $f^{-1}(f(x))$.', hints: ['$f^{-1}$ undoes $f$.'], answer: '$f^{-1}(f(x)) = x$ for all $x$ in the domain.', marks: 2 },
  { id: 'composite-fn-L4-03', nodeId: 'composite-fn', level: 4, title: 'Range of composite', text: 'If $f: [0, \\infty) \\to \\mathbb{R}$, $f(x) = \\sqrt{x}$ and $g: \\mathbb{R} \\to \\mathbb{R}$, $g(x) = x^2 - 4$, find the range of $f \\circ g$ on the domain where it exists.', hints: ['Domain of $f \\circ g$: $x^2 - 4 \\geq 0$, so $x \\leq -2$ or $x \\geq 2$.', 'Minimum of $x^2 - 4$ on this domain is 0.'], answer: 'Domain: $(-\\infty, -2] \\cup [2, \\infty)$.\n\n$f(g(x)) = \\sqrt{x^2-4}$. Minimum value is $0$ (at $x = \\pm 2$), unbounded above.\n\nRange: $[0, \\infty)$', marks: 3 },

  // Level 5
  { id: 'composite-fn-L5-01', nodeId: 'composite-fn', level: 5, title: 'Triple composition', text: 'If $f(x) = x + 1$, $g(x) = 2x$, $h(x) = x^2$, find $h(g(f(x)))$ and solve $h(g(f(x))) = 36$.', hints: ['$f(x) = x+1$, $g(f(x)) = 2(x+1) = 2x+2$', '$h(g(f(x))) = (2x+2)^2 = 36$'], answer: '$h(g(f(x))) = (2(x+1))^2 = (2x+2)^2$\n\n$(2x+2)^2 = 36$\n\n$2x+2 = \\pm 6$\n\n$x = 2$ or $x = -4$', marks: 4 },
  { id: 'composite-fn-L5-02', nodeId: 'composite-fn', level: 5, title: 'Self-composition', text: 'If $f(x) = \\frac{1}{1-x}$, find $f(f(f(x)))$.', hints: ['$f(f(x)) = f\\left(\\frac{1}{1-x}\\right) = \\frac{1}{1 - \\frac{1}{1-x}}$', 'Simplify step by step.'], answer: '$f(x) = \\frac{1}{1-x}$\n\n$f(f(x)) = \\frac{1}{1-\\frac{1}{1-x}} = \\frac{1}{\\frac{-x}{1-x}} = \\frac{1-x}{-x} = \\frac{x-1}{x}$\n\n$f(f(f(x))) = f\\left(\\frac{x-1}{x}\\right) = \\frac{1}{1-\\frac{x-1}{x}} = \\frac{1}{\\frac{1}{x}} = x$\n\nSo $f(f(f(x))) = x$.', marks: 4 },
];

export default questions;
