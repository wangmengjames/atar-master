import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'inverse-fn-L1-01', nodeId: 'inverse-fn', level: 1, title: 'Inverse concept', text: 'If $f(3) = 7$, what is $f^{-1}(7)$?', hints: ['The inverse reverses input and output.'], answer: '$f^{-1}(7) = 3$', marks: 1 },
  { id: 'inverse-fn-L1-02', nodeId: 'inverse-fn', level: 1, title: 'Inverse of linear', text: 'Find the inverse of $f(x) = x + 5$.', hints: ['Swap $x$ and $y$, solve for $y$.'], answer: '$f^{-1}(x) = x - 5$', marks: 1 },
  { id: 'inverse-fn-L1-03', nodeId: 'inverse-fn', level: 1, title: 'Inverse from table', text: 'Given $f$: $\\{(1,4), (2,7), (3,10)\\}$. Write $f^{-1}$.', hints: ['Swap each pair.'], answer: '$f^{-1} = \\{(4,1), (7,2), (10,3)\\}$', marks: 1 },
  { id: 'inverse-fn-L1-04', nodeId: 'inverse-fn', level: 1, title: 'Graph of inverse', text: 'The graph of $f^{-1}$ is a reflection of $f$ in which line?', hints: ['Think about swapping $x$ and $y$.'], answer: 'The line $y = x$.', marks: 1 },

  // Level 2
  { id: 'inverse-fn-L2-01', nodeId: 'inverse-fn', level: 2, title: 'Inverse of linear function', text: 'Find the inverse of $f(x) = 3x - 2$.', hints: ['$y = 3x - 2$, swap: $x = 3y - 2$.'], answer: '$x = 3y - 2 \\Rightarrow y = \\frac{x+2}{3}$\n\n$f^{-1}(x) = \\frac{x+2}{3}$', marks: 2 },
  { id: 'inverse-fn-L2-02', nodeId: 'inverse-fn', level: 2, title: 'Verify inverse', text: 'Verify that $f(x) = 2x + 1$ and $g(x) = \\frac{x-1}{2}$ are inverses.', hints: ['Show $f(g(x)) = x$ and $g(f(x)) = x$.'], answer: '$f(g(x)) = 2 \\cdot \\frac{x-1}{2} + 1 = x - 1 + 1 = x$ ✓\n\n$g(f(x)) = \\frac{(2x+1)-1}{2} = x$ ✓', marks: 2 },
  { id: 'inverse-fn-L2-03', nodeId: 'inverse-fn', level: 2, title: 'Domain and range swap', text: 'If $f$ has domain $[0, \\infty)$ and range $[2, \\infty)$, what are the domain and range of $f^{-1}$?', hints: ['Domain and range swap for the inverse.'], answer: 'Domain of $f^{-1}$: $[2, \\infty)$. Range of $f^{-1}$: $[0, \\infty)$.', marks: 1 },
  { id: 'inverse-fn-L2-04', nodeId: 'inverse-fn', level: 2, title: 'One-to-one check', text: 'Does $f(x) = x^2$ (for all real $x$) have an inverse function? Why or why not?', hints: ['Is it one-to-one?', '$f(2) = f(-2) = 4$.'], answer: 'No. $f$ is not one-to-one (e.g., $f(2) = f(-2) = 4$), so it does not have an inverse unless the domain is restricted.', marks: 2 },

  // Level 3
  { id: 'inverse-fn-L3-01', nodeId: 'inverse-fn', level: 3, title: 'Inverse of restricted quadratic', text: 'Find the inverse of $f(x) = x^2 + 1$ for $x \\geq 0$.', hints: ['$y = x^2 + 1$, swap: $x = y^2 + 1$.', '$y = \\sqrt{x-1}$ (positive root since $x \\geq 0$).'], answer: '$x = y^2 + 1 \\Rightarrow y = \\sqrt{x-1}$\n\n$f^{-1}(x) = \\sqrt{x-1}$, domain $[1, \\infty)$', marks: 2 },
  { id: 'inverse-fn-L3-02', nodeId: 'inverse-fn', level: 3, title: 'Inverse of exponential', text: 'Find the inverse of $f(x) = e^{x+1}$.', hints: ['$y = e^{x+1}$, swap and take $\\ln$.'], answer: '$x = e^{y+1}$\n\n$\\ln x = y + 1$\n\n$f^{-1}(x) = \\ln x - 1$, domain $(0, \\infty)$', marks: 2 },
  { id: 'inverse-fn-L3-03', nodeId: 'inverse-fn', level: 3, title: 'Intersection with inverse', text: 'Where does $f(x) = 2x - 1$ intersect its inverse?', hints: ['$f$ and $f^{-1}$ intersect on the line $y = x$.', 'Solve $2x - 1 = x$.'], answer: '$f$ intersects $f^{-1}$ on $y = x$: $2x - 1 = x \\Rightarrow x = 1$.\n\nPoint of intersection: $(1, 1)$.', marks: 2 },

  // Level 4
  { id: 'inverse-fn-L4-01', nodeId: 'inverse-fn', level: 4, title: 'Inverse of rational function', text: 'Find the inverse of $f(x) = \\frac{2x+1}{x-3}$, $x \\neq 3$.', hints: ['Swap $x$ and $y$: $x = \\frac{2y+1}{y-3}$.', 'Solve for $y$: $x(y-3) = 2y+1$.'], answer: '$x(y-3) = 2y + 1$\n\n$xy - 3x = 2y + 1$\n\n$y(x-2) = 3x + 1$\n\n$f^{-1}(x) = \\frac{3x+1}{x-2}$, $x \\neq 2$', marks: 3 },
  { id: 'inverse-fn-L4-02', nodeId: 'inverse-fn', level: 4, title: 'Restrict domain for inverse', text: 'Find the largest domain containing $x = 3$ for which $f(x) = (x-1)^2 - 4$ has an inverse. Find the inverse.', hints: ['Vertex at $x = 1$. For one-to-one, take $x \\geq 1$.', 'Since 3 > 1, domain is $[1, \\infty)$.'], answer: 'Domain: $[1, \\infty)$ (right of vertex).\n\n$y = (x-1)^2 - 4$, swap: $x = (y-1)^2 - 4$\n\n$(y-1)^2 = x + 4$, $y = 1 + \\sqrt{x+4}$ (positive root)\n\n$f^{-1}(x) = 1 + \\sqrt{x+4}$, domain $[-4, \\infty)$', marks: 3 },
  { id: 'inverse-fn-L4-03', nodeId: 'inverse-fn', level: 4, title: 'Self-inverse function', text: 'Show that $f(x) = \\frac{1}{x}$ is its own inverse.', hints: ['Find $f^{-1}$ and show it equals $f$.'], answer: '$y = \\frac{1}{x}$, swap: $x = \\frac{1}{y}$, so $y = \\frac{1}{x}$.\n\n$f^{-1}(x) = \\frac{1}{x} = f(x)$. Hence $f$ is self-inverse.', marks: 2 },

  // Level 5
  { id: 'inverse-fn-L5-01', nodeId: 'inverse-fn', level: 5, title: 'Composite inverse', text: 'If $f(x) = 2x + 3$ and $g(x) = x^2$ (for $x \\geq 0$), find $(f \\circ g)^{-1}(x)$.', hints: ['$(f \\circ g)^{-1} = g^{-1} \\circ f^{-1}$', '$f^{-1}(x) = \\frac{x-3}{2}$, $g^{-1}(x) = \\sqrt{x}$'], answer: '$(f \\circ g)(x) = 2x^2 + 3$\n\n$(f \\circ g)^{-1}$: $x = 2y^2 + 3 \\Rightarrow y^2 = \\frac{x-3}{2} \\Rightarrow y = \\sqrt{\\frac{x-3}{2}}$\n\nDomain: $[3, \\infty)$', marks: 4 },
  { id: 'inverse-fn-L5-02', nodeId: 'inverse-fn', level: 5, title: 'Inverse with parameters', text: 'The function $f(x) = \\frac{ax+b}{cx+d}$ is self-inverse. Given $f(0) = -2$ and $f(1) = 3$, find $a, b, c, d$.', hints: ['Self-inverse means $f(f(x)) = x$.', '$f(0) = \\frac{b}{d} = -2$, $f(1) = \\frac{a+b}{c+d} = 3$.'], answer: '$f(0) = \\frac{b}{d} = -2$, so $b = -2d$.\n\nSelf-inverse requires $a = -d$ (and $ad - bc \\neq 0$).\n\n$f(1) = \\frac{a-2d}{c+d} = 3$, and $a = -d$: $\\frac{-d-2d}{c+d} = \\frac{-3d}{c+d} = 3$, so $c + d = -d$, $c = -2d$.\n\nChoose $d = 1$: $a = -1, b = -2, c = -2, d = 1$.\n\n$f(x) = \\frac{-x-2}{-2x+1}$', marks: 4 },
];

export default questions;
