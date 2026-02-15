import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'transformations-L1-01', nodeId: 'transformations', level: 1, title: 'Vertical translation', text: 'The graph of $y = x^2$ is translated 3 units up. Write the new equation.', hints: ['Add 3 to the function.'], answer: '$y = x^2 + 3$', marks: 1 },
  { id: 'transformations-L1-02', nodeId: 'transformations', level: 1, title: 'Horizontal translation', text: 'The graph of $y = x^2$ is translated 2 units to the right. Write the new equation.', hints: ['Replace $x$ with $(x-2)$.'], answer: '$y = (x-2)^2$', marks: 1 },
  { id: 'transformations-L1-03', nodeId: 'transformations', level: 1, title: 'Reflection in x-axis', text: 'Write the equation when $y = x^2$ is reflected in the $x$-axis.', hints: ['Negate the function.'], answer: '$y = -x^2$', marks: 1 },
  { id: 'transformations-L1-04', nodeId: 'transformations', level: 1, title: 'Dilation from x-axis', text: 'The graph of $y = \\sin(x)$ is dilated by a factor of 2 from the $x$-axis. Write the new equation.', hints: ['Multiply the function by 2.'], answer: '$y = 2\\sin(x)$', marks: 1 },

  // Level 2
  { id: 'transformations-L2-01', nodeId: 'transformations', level: 2, title: 'Identify transformation', text: 'Describe the transformation that maps $y = f(x)$ to $y = f(x) - 4$.', hints: ['What changed?'], answer: 'Translation 4 units down.', marks: 1 },
  { id: 'transformations-L2-02', nodeId: 'transformations', level: 2, title: 'Dilation from y-axis', text: 'The graph of $y = \\cos(x)$ is dilated by a factor of $\\frac{1}{3}$ from the $y$-axis. Write the new equation.', hints: ['Replace $x$ with $3x$ (reciprocal of dilation factor).'], answer: '$y = \\cos(3x)$', marks: 2 },
  { id: 'transformations-L2-03', nodeId: 'transformations', level: 2, title: 'Reflection in y-axis', text: 'Write the equation when $y = 2^x$ is reflected in the $y$-axis.', hints: ['Replace $x$ with $-x$.'], answer: '$y = 2^{-x}$', marks: 1 },
  { id: 'transformations-L2-04', nodeId: 'transformations', level: 2, title: 'Combined translations', text: 'The graph of $y = \\sqrt{x}$ is translated 1 unit left and 5 units down. Write the new equation.', hints: ['Left 1: replace $x$ with $x+1$.', 'Down 5: subtract 5.'], answer: '$y = \\sqrt{x+1} - 5$', marks: 2 },

  // Level 3
  { id: 'transformations-L3-01', nodeId: 'transformations', level: 3, title: 'Describe full transformation', text: 'Describe the transformations that map $y = x^2$ to $y = 3(x-1)^2 + 2$.', hints: ['Compare with $y = a(x-h)^2 + k$.', 'Dilation, then translation.'], answer: 'Dilation by factor 3 from the $x$-axis, then translation 1 unit right and 2 units up.', marks: 2 },
  { id: 'transformations-L3-02', nodeId: 'transformations', level: 3, title: 'Image of a point', text: 'The point $(2, 5)$ lies on $y = f(x)$. Find its image under the transformation $y = -f(x-3) + 1$.', hints: ['$x$ shifts right 3: new $x = 2 + 3 = 5$.', 'Negate $y$ and add 1: new $y = -5 + 1 = -4$.'], answer: 'Image: $(5, -4)$', marks: 2 },
  { id: 'transformations-L3-03', nodeId: 'transformations', level: 3, title: 'Transformation matrix', text: 'A dilation of factor 2 from the $x$-axis and factor 3 from the $y$-axis can be represented by what matrix?', hints: ['Dilation from $y$-axis by 3 scales $x$ by 3.', 'Dilation from $x$-axis by 2 scales $y$ by 2.'], answer: '$\\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}$', marks: 2 },

  // Level 4
  { id: 'transformations-L4-01', nodeId: 'transformations', level: 4, title: 'Find original from transformed', text: 'The graph of $y = 2\\sin(3(x - \\frac{\\pi}{4})) + 1$ is obtained from $y = \\sin(x)$ by a sequence of transformations. List them in order.', hints: ['Dilation from $y$-axis by $\\frac{1}{3}$, dilation from $x$-axis by 2, translate right $\\frac{\\pi}{4}$, up 1.'], answer: '1. Dilation by factor $\\frac{1}{3}$ from the $y$-axis\n2. Dilation by factor 2 from the $x$-axis\n3. Translation $\\frac{\\pi}{4}$ units right\n4. Translation 1 unit up', marks: 3 },
  { id: 'transformations-L4-02', nodeId: 'transformations', level: 4, title: 'Transformation with asymptotes', text: 'The graph of $y = \\frac{1}{x}$ is transformed to $y = \\frac{2}{x-3} + 1$. State the equations of the asymptotes of the transformed graph.', hints: ['Vertical asymptote shifts with horizontal translation.', 'Horizontal asymptote shifts with vertical translation.'], answer: 'Vertical asymptote: $x = 3$\n\nHorizontal asymptote: $y = 1$', marks: 2 },
  { id: 'transformations-L4-03', nodeId: 'transformations', level: 4, title: 'Inverse via reflection', text: 'The function $f(x) = 2^x$ has its graph reflected in the line $y = x$. Write the equation of the reflected graph.', hints: ['Reflecting in $y = x$ gives the inverse.'], answer: 'The reflected graph is $y = \\log_2(x)$ (the inverse of $2^x$).', marks: 2 },

  // Level 5
  { id: 'transformations-L5-01', nodeId: 'transformations', level: 5, title: 'Composition of transformations', text: 'Let $T_1$ be a reflection in the $x$-axis and $T_2$ be the transformation $(x,y) \\mapsto (x+2, y-3)$. If $(1, 4)$ is on $y = f(x)$, find its image under $T_2 \\circ T_1$.', hints: ['Apply $T_1$ first (reflect): $(1, -4)$.', 'Then $T_2$: $(3, -7)$.'], answer: '$T_1(1,4) = (1, -4)$\n\n$T_2(1, -4) = (1+2, -4-3) = (3, -7)$', marks: 3 },
  { id: 'transformations-L5-02', nodeId: 'transformations', level: 5, title: 'Write rule from graph', text: 'The graph of $y = f(x)$ where $f(x) = x^3$ is transformed so that the point of inflection moves to $(2, -1)$ and the graph passes through $(3, 2)$. Find the equation of the transformed graph in the form $y = a(x-h)^3 + k$.', hints: ['Inflection at $(2, -1)$: $h = 2, k = -1$.', 'Use $(3, 2)$: $2 = a(1)^3 - 1$, so $a = 3$.'], answer: '$y = a(x-2)^3 - 1$\n\nUsing $(3, 2)$: $2 = a(1) - 1$, $a = 3$.\n\n$y = 3(x-2)^3 - 1$', marks: 4 },
];

export default questions;
