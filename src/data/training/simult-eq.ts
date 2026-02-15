import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'simult-eq-L1-01', nodeId: 'simult-eq', level: 1, title: 'Read solution from graph', text: 'Two lines intersect at $(2, 3)$. What is the solution to the simultaneous equations?', hints: ['The intersection point is the solution.'], answer: '$x = 2, y = 3$', marks: 1 },
  { id: 'simult-eq-L1-02', nodeId: 'simult-eq', level: 1, title: 'Substitution check', text: 'Verify that $x = 1, y = 2$ satisfies $x + y = 3$ and $2x - y = 0$.', hints: ['Substitute into both equations.'], answer: '$1 + 2 = 3$ ✓, $2(1) - 2 = 0$ ✓. Solution is valid.', marks: 1 },
  { id: 'simult-eq-L1-03', nodeId: 'simult-eq', level: 1, title: 'Simple substitution', text: 'Solve: $y = x + 1$ and $y = 3$.', hints: ['Substitute $y = 3$ into first equation.'], answer: '$3 = x + 1$, $x = 2$. Solution: $(2, 3)$.', marks: 1 },
  { id: 'simult-eq-L1-04', nodeId: 'simult-eq', level: 1, title: 'Simple elimination', text: 'Solve: $x + y = 5$ and $x - y = 1$.', hints: ['Add the equations to eliminate $y$.'], answer: 'Adding: $2x = 6$, $x = 3$, $y = 2$.', marks: 1 },

  // Level 2
  { id: 'simult-eq-L2-01', nodeId: 'simult-eq', level: 2, title: 'Elimination with multiplication', text: 'Solve: $2x + 3y = 12$ and $x + y = 5$.', hints: ['Multiply second equation by 2.', 'Subtract from first.'], answer: '(2) × 2: $2x + 2y = 10$. Subtract from (1): $y = 2$, $x = 3$.', marks: 2 },
  { id: 'simult-eq-L2-02', nodeId: 'simult-eq', level: 2, title: 'Substitution method', text: 'Solve: $y = 2x - 1$ and $3x + y = 9$.', hints: ['Substitute first into second.'], answer: '$3x + (2x - 1) = 9$, $5x = 10$, $x = 2$, $y = 3$', marks: 2 },
  { id: 'simult-eq-L2-03', nodeId: 'simult-eq', level: 2, title: 'Word problem', text: 'Two coffees and a cake cost $\\$11$. One coffee and two cakes cost $\\$13$. Find the cost of each.', hints: ['$2c + k = 11$, $c + 2k = 13$'], answer: '(1) × 2: $4c + 2k = 22$. Subtract (2): $3c = 9$, $c = 3$, $k = 5$.\n\nCoffee: $\\$3$, Cake: $\\$5$', marks: 2 },
  { id: 'simult-eq-L2-04', nodeId: 'simult-eq', level: 2, title: 'Negative solutions', text: 'Solve: $3x + 2y = 1$ and $x - y = 3$.', hints: ['From (2): $x = y + 3$.'], answer: '$3(y+3) + 2y = 1$, $5y = -8$, $y = -\\frac{8}{5}$, $x = \\frac{7}{5}$', marks: 2 },

  // Level 3
  { id: 'simult-eq-L3-01', nodeId: 'simult-eq', level: 3, title: 'Linear and quadratic', text: 'Solve: $y = x + 1$ and $y = x^2 - 1$.', hints: ['$x + 1 = x^2 - 1$', '$x^2 - x - 2 = 0$'], answer: '$(x-2)(x+1) = 0$\n$x = 2, y = 3$ or $x = -1, y = 0$', marks: 2 },
  { id: 'simult-eq-L3-02', nodeId: 'simult-eq', level: 3, title: 'No solution case', text: 'Show that $2x + y = 5$ and $4x + 2y = 3$ have no solution.', hints: ['Multiply first by 2.'], answer: '(1) × 2: $4x + 2y = 10 \\neq 3$. The equations are inconsistent (parallel lines). No solution.', marks: 2 },
  { id: 'simult-eq-L3-03', nodeId: 'simult-eq', level: 3, title: 'Fractional coefficients', text: 'Solve: $\\frac{x}{2} + \\frac{y}{3} = 4$ and $x - y = 3$.', hints: ['Multiply first by 6: $3x + 2y = 24$.'], answer: '$3x + 2y = 24$, $x = y + 3$.\n$3(y+3) + 2y = 24$, $5y = 15$, $y = 3$, $x = 6$', marks: 2 },

  // Level 4
  { id: 'simult-eq-L4-01', nodeId: 'simult-eq', level: 4, title: 'Line and circle', text: 'Find the points of intersection of $x + y = 5$ and $x^2 + y^2 = 13$.', hints: ['$y = 5 - x$, substitute.'], answer: '$x^2 + (5-x)^2 = 13$\n$2x^2 - 10x + 12 = 0$\n$(x-2)(x-3) = 0$\n$(2, 3)$ and $(3, 2)$', marks: 3 },
  { id: 'simult-eq-L4-02', nodeId: 'simult-eq', level: 4, title: 'Three equations', text: 'Solve: $x + y + z = 6$, $x - y + z = 2$, $x + y - z = 4$.', hints: ['(1) - (2) gives $2y = 4$.', '(1) - (3) gives $2z = 2$.'], answer: '(1)-(2): $2y = 4$, $y = 2$.\n(1)-(3): $2z = 2$, $z = 1$.\nFrom (1): $x = 6 - 2 - 1 = 3$.\n\nSolution: $x=3, y=2, z=1$', marks: 3 },
  { id: 'simult-eq-L4-03', nodeId: 'simult-eq', level: 4, title: 'Parameters for unique solution', text: 'For what values of $k$ does $x + ky = 2$ and $kx + y = 2$ have a unique solution?', hints: ['Unique solution when determinant $\\neq 0$.', '$1 \\cdot 1 - k \\cdot k \\neq 0$'], answer: 'Determinant: $1 - k^2 \\neq 0$, so $k \\neq \\pm 1$.\n\nUnique solution for all $k \\in \\mathbb{R} \\setminus \\{-1, 1\\}$.', marks: 3 },

  // Level 5
  { id: 'simult-eq-L5-01', nodeId: 'simult-eq', level: 5, title: 'Non-linear system', text: 'Solve: $xy = 6$ and $x + y = 5$.', hints: ['$y = 5 - x$, substitute.'], answer: '$x(5-x) = 6$, $x^2 - 5x + 6 = 0$\n$(x-2)(x-3) = 0$\n$(x,y) = (2,3)$ or $(3,2)$', marks: 3 },
  { id: 'simult-eq-L5-02', nodeId: 'simult-eq', level: 5, title: 'Tangent to parabola', text: 'Find the values of $c$ for which the line $y = 2x + c$ is tangent to $y = x^2$.', hints: ['Set equal: $x^2 = 2x + c$, need $\\Delta = 0$.', '$x^2 - 2x - c = 0$, $\\Delta = 4 + 4c = 0$.'], answer: '$x^2 - 2x - c = 0$\n\n$\\Delta = 4 + 4c = 0$\n\n$c = -1$\n\nThe tangent line is $y = 2x - 1$.', marks: 4 },
];

export default questions;
