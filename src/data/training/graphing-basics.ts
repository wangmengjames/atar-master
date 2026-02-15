import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'graphing-basics-L1-01', nodeId: 'graphing-basics', level: 1, title: 'Plot a point', text: 'What are the coordinates of a point 3 units right and 2 units up from the origin?', hints: ['Right = positive $x$, up = positive $y$.'], answer: '$(3, 2)$', marks: 1 },
  { id: 'graphing-basics-L1-02', nodeId: 'graphing-basics', level: 1, title: 'Identify quadrant', text: 'In which quadrant is the point $(-2, 5)$?', hints: ['Negative $x$, positive $y$.'], answer: 'Quadrant II (second quadrant)', marks: 1 },
  { id: 'graphing-basics-L1-03', nodeId: 'graphing-basics', level: 1, title: 'Read a graph', text: 'A straight line passes through $(0, 3)$ and $(1, 5)$. What is the $y$-intercept?', hints: ['The $y$-intercept is where $x = 0$.'], answer: 'The $y$-intercept is $3$.', marks: 1 },
  { id: 'graphing-basics-L1-04', nodeId: 'graphing-basics', level: 1, title: 'Table of values', text: 'Complete the table for $y = 2x + 1$ when $x = 0, 1, 2, 3$.', hints: ['Substitute each $x$ value.'], answer: '$x = 0: y = 1$; $x = 1: y = 3$; $x = 2: y = 5$; $x = 3: y = 7$', marks: 1 },

  // Level 2
  { id: 'graphing-basics-L2-01', nodeId: 'graphing-basics', level: 2, title: 'Gradient of a line', text: 'Find the gradient of the line through $(1, 2)$ and $(4, 8)$.', hints: ['$m = \\frac{y_2 - y_1}{x_2 - x_1}$', '$m = \\frac{8-2}{4-1}$'], answer: '$m = \\frac{8-2}{4-1} = \\frac{6}{3} = 2$', marks: 1 },
  { id: 'graphing-basics-L2-02', nodeId: 'graphing-basics', level: 2, title: 'Equation from gradient and intercept', text: 'Write the equation of a line with gradient $3$ and $y$-intercept $-1$.', hints: ['$y = mx + c$'], answer: '$y = 3x - 1$', marks: 1 },
  { id: 'graphing-basics-L2-03', nodeId: 'graphing-basics', level: 2, title: 'Midpoint', text: 'Find the midpoint of $(2, 4)$ and $(6, 10)$.', hints: ['Midpoint $= \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$'], answer: 'Midpoint $= \\left(\\frac{2+6}{2}, \\frac{4+10}{2}\\right) = (4, 7)$', marks: 2 },
  { id: 'graphing-basics-L2-04', nodeId: 'graphing-basics', level: 2, title: 'Distance between points', text: 'Find the distance between $(1, 1)$ and $(4, 5)$.', hints: ['$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$'], answer: '$d = \\sqrt{(4-1)^2 + (5-1)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$', marks: 2 },

  // Level 3
  { id: 'graphing-basics-L3-01', nodeId: 'graphing-basics', level: 3, title: 'Equation from two points', text: 'Find the equation of the line through $(2, 1)$ and $(5, 7)$.', hints: ['Find gradient first.', '$m = \\frac{7-1}{5-2} = 2$. Use point-gradient form.'], answer: '$m = 2$. Using $(2,1)$: $y - 1 = 2(x - 2)$, so $y = 2x - 3$.', marks: 2 },
  { id: 'graphing-basics-L3-02', nodeId: 'graphing-basics', level: 3, title: 'Parallel lines', text: 'Find the equation of the line parallel to $y = 3x + 2$ passing through $(1, -4)$.', hints: ['Parallel lines have equal gradients.', '$m = 3$, use point-gradient form.'], answer: '$y - (-4) = 3(x - 1)$\n\n$y = 3x - 7$', marks: 2 },
  { id: 'graphing-basics-L3-03', nodeId: 'graphing-basics', level: 3, title: 'Perpendicular gradient', text: 'The gradient of a line is $\\frac{2}{3}$. What is the gradient of a perpendicular line?', hints: ['Perpendicular gradients multiply to $-1$.', '$m_\\perp = -\\frac{1}{m}$'], answer: '$m_\\perp = -\\frac{3}{2}$', marks: 1 },

  // Level 4
  { id: 'graphing-basics-L4-01', nodeId: 'graphing-basics', level: 4, title: 'Intersection of lines', text: 'Find the intersection of $y = 2x + 1$ and $y = -x + 7$.', hints: ['Set the equations equal.', '$2x + 1 = -x + 7$'], answer: '$2x + 1 = -x + 7$\n\n$3x = 6$, $x = 2$\n\n$y = 2(2) + 1 = 5$\n\nIntersection: $(2, 5)$', marks: 3 },
  { id: 'graphing-basics-L4-02', nodeId: 'graphing-basics', level: 4, title: 'Perpendicular bisector', text: 'Find the equation of the perpendicular bisector of the segment from $A(1, 3)$ to $B(5, 7)$.', hints: ['Find midpoint and gradient of $AB$.', 'Perpendicular gradient is negative reciprocal.'], answer: 'Midpoint $= (3, 5)$. Gradient of $AB = \\frac{7-3}{5-1} = 1$.\n\nPerpendicular gradient $= -1$.\n\n$y - 5 = -1(x - 3)$\n\n$y = -x + 8$', marks: 3 },
  { id: 'graphing-basics-L4-03', nodeId: 'graphing-basics', level: 4, title: 'Sketch a parabola', text: 'Sketch $y = x^2 - 4x + 3$. Find the vertex and $x$-intercepts.', hints: ['$x$-intercepts: solve $x^2 - 4x + 3 = 0$.', 'Vertex $x = \\frac{-b}{2a} = 2$.'], answer: '$x^2 - 4x + 3 = (x-1)(x-3) = 0$, so $x = 1, 3$.\n\nVertex: $x = 2$, $y = 4 - 8 + 3 = -1$. Vertex $(2, -1)$.\n\nParabola opens upward, $y$-intercept $= 3$.', marks: 3 },

  // Level 5
  { id: 'graphing-basics-L5-01', nodeId: 'graphing-basics', level: 5, title: 'Triangle area from vertices', text: 'Find the area of the triangle with vertices $A(0,0)$, $B(6,0)$, $C(2,5)$.', hints: ['Use the formula: Area $= \\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$', 'Or note base $AB = 6$, height $= 5$.'], answer: 'Base $AB = 6$, height from $C$ to $x$-axis $= 5$.\n\nArea $= \\frac{1}{2} \\times 6 \\times 5 = 15$ square units.', marks: 3 },
  { id: 'graphing-basics-L5-02', nodeId: 'graphing-basics', level: 5, title: 'Line and circle intersection', text: 'Find the points of intersection of $y = x + 1$ and $x^2 + y^2 = 25$.', hints: ['Substitute $y = x + 1$ into the circle equation.', '$x^2 + (x+1)^2 = 25$'], answer: '$x^2 + (x+1)^2 = 25$\n\n$x^2 + x^2 + 2x + 1 = 25$\n\n$2x^2 + 2x - 24 = 0$\n\n$x^2 + x - 12 = 0$\n\n$(x+4)(x-3) = 0$\n\n$x = -4, y = -3$ or $x = 3, y = 4$\n\nIntersection points: $(-4, -3)$ and $(3, 4)$.', marks: 4 },
];

export default questions;
