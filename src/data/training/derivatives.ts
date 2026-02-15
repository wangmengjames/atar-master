import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'derivatives-L1-01', nodeId: 'derivatives', level: 1, title: 'Derivative of constant', text: 'Find $\\frac{d}{dx}(7)$.', hints: ['The derivative of a constant is…'], answer: '$\\frac{d}{dx}(7) = 0$', marks: 1 },
  { id: 'derivatives-L1-02', nodeId: 'derivatives', level: 1, title: 'Derivative of x', text: 'Find $\\frac{d}{dx}(x)$.', hints: ['$x = x^1$, use power rule.'], answer: '$\\frac{d}{dx}(x) = 1$', marks: 1 },
  { id: 'derivatives-L1-03', nodeId: 'derivatives', level: 1, title: 'Power rule basic', text: 'Find $\\frac{d}{dx}(x^3)$.', hints: ['Power rule: $\\frac{d}{dx}(x^n) = nx^{n-1}$'], answer: '$\\frac{d}{dx}(x^3) = 3x^2$', marks: 1 },
  { id: 'derivatives-L1-04', nodeId: 'derivatives', level: 1, title: 'Gradient concept', text: 'What does $f\'(a)$ represent geometrically?', hints: ['Think about the tangent line.'], answer: '$f\'(a)$ is the gradient (slope) of the tangent to $y = f(x)$ at $x = a$.', marks: 1 },

  // Level 2
  { id: 'derivatives-L2-01', nodeId: 'derivatives', level: 2, title: 'Derivative of polynomial', text: 'Find $f\'(x)$ if $f(x) = 3x^2 - 4x + 1$.', hints: ['Differentiate term by term.'], answer: '$f\'(x) = 6x - 4$', marks: 1 },
  { id: 'derivatives-L2-02', nodeId: 'derivatives', level: 2, title: 'Evaluate derivative', text: 'If $f(x) = x^2 + 2x$, find $f\'(3)$.', hints: ['$f\'(x) = 2x + 2$'], answer: '$f\'(x) = 2x + 2$, $f\'(3) = 8$', marks: 2 },
  { id: 'derivatives-L2-03', nodeId: 'derivatives', level: 2, title: 'Negative exponent', text: 'Find $\\frac{d}{dx}\\left(\\frac{1}{x}\\right)$.', hints: ['Write as $x^{-1}$.'], answer: '$\\frac{d}{dx}(x^{-1}) = -x^{-2} = -\\frac{1}{x^2}$', marks: 2 },
  { id: 'derivatives-L2-04', nodeId: 'derivatives', level: 2, title: 'Square root derivative', text: 'Find $\\frac{d}{dx}(\\sqrt{x})$.', hints: ['$\\sqrt{x} = x^{1/2}$'], answer: '$\\frac{d}{dx}(x^{1/2}) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$', marks: 2 },

  // Level 3
  { id: 'derivatives-L3-01', nodeId: 'derivatives', level: 3, title: 'First principles', text: 'Use first principles to find the derivative of $f(x) = x^2$.', hints: ['$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$', 'Expand $(x+h)^2 = x^2 + 2xh + h^2$.'], answer: '$f\'(x) = \\lim_{h\\to 0} \\frac{(x+h)^2 - x^2}{h} = \\lim_{h\\to 0} \\frac{2xh + h^2}{h} = \\lim_{h\\to 0} (2x + h) = 2x$', marks: 3 },
  { id: 'derivatives-L3-02', nodeId: 'derivatives', level: 3, title: 'Instantaneous rate', text: 'The position of a particle is $s(t) = t^3 - 6t$. Find the velocity at $t = 2$.', hints: ['Velocity $= s\'(t)$.', '$s\'(t) = 3t^2 - 6$'], answer: '$s\'(t) = 3t^2 - 6$\n\n$s\'(2) = 12 - 6 = 6$ units/s', marks: 2 },
  { id: 'derivatives-L3-03', nodeId: 'derivatives', level: 3, title: 'Where gradient is zero', text: 'Find the $x$-values where the gradient of $f(x) = x^3 - 3x$ is zero.', hints: ['$f\'(x) = 3x^2 - 3 = 0$'], answer: '$f\'(x) = 3x^2 - 3 = 0$\n\n$x^2 = 1$, so $x = \\pm 1$', marks: 2 },

  // Level 4
  { id: 'derivatives-L4-01', nodeId: 'derivatives', level: 4, title: 'Differentiability', text: 'Is $f(x) = |x|$ differentiable at $x = 0$? Explain.', hints: ['Consider the left and right derivatives.'], answer: 'No. Left derivative $= -1$, right derivative $= 1$. Since they differ, $f$ is not differentiable at $x = 0$ (there is a "corner").', marks: 3 },
  { id: 'derivatives-L4-02', nodeId: 'derivatives', level: 4, title: 'Derivative with fractional power', text: 'Find $\\frac{dy}{dx}$ if $y = 2x^{5/2} - \\frac{3}{\\sqrt{x}}$.', hints: ['Rewrite: $y = 2x^{5/2} - 3x^{-1/2}$'], answer: '$\\frac{dy}{dx} = 5x^{3/2} + \\frac{3}{2}x^{-3/2} = 5x^{3/2} + \\frac{3}{2x^{3/2}}$', marks: 3 },
  { id: 'derivatives-L4-03', nodeId: 'derivatives', level: 4, title: 'Average vs instantaneous rate', text: 'For $f(x) = x^2$, find the average rate of change from $x = 1$ to $x = 3$, and the instantaneous rate at $x = 2$.', hints: ['Average: $\\frac{f(3)-f(1)}{3-1}$', 'Instantaneous: $f\'(2)$'], answer: 'Average: $\\frac{9-1}{2} = 4$\n\nInstantaneous: $f\'(x) = 2x$, $f\'(2) = 4$\n\nThey are equal (by the Mean Value Theorem, this is the midpoint).', marks: 3 },

  // Level 5
  { id: 'derivatives-L5-01', nodeId: 'derivatives', level: 5, title: 'First principles for 1/x', text: 'Use first principles to show that $\\frac{d}{dx}\\left(\\frac{1}{x}\\right) = -\\frac{1}{x^2}$.', hints: ['$\\lim_{h\\to 0} \\frac{\\frac{1}{x+h} - \\frac{1}{x}}{h}$', 'Combine fractions in numerator.'], answer: '$\\lim_{h\\to 0} \\frac{\\frac{1}{x+h}-\\frac{1}{x}}{h} = \\lim_{h\\to 0} \\frac{\\frac{x-(x+h)}{x(x+h)}}{h} = \\lim_{h\\to 0} \\frac{-h}{hx(x+h)} = \\lim_{h\\to 0} \\frac{-1}{x(x+h)} = -\\frac{1}{x^2}$', marks: 4 },
  { id: 'derivatives-L5-02', nodeId: 'derivatives', level: 5, title: 'Tangent meets curve again', text: 'Find where the tangent to $y = x^3$ at $x = 1$ meets the curve again.', hints: ['Tangent at $(1,1)$: $y\' = 3x^2$, so $m = 3$. Tangent: $y = 3x - 2$.', 'Solve $x^3 = 3x - 2$, i.e., $x^3 - 3x + 2 = 0$. Factor out $(x-1)^2$.'], answer: 'At $x = 1$: $y = 1$, $y\' = 3$. Tangent: $y = 3(x-1)+1 = 3x-2$.\n\n$x^3 = 3x - 2 \\Rightarrow x^3 - 3x + 2 = 0$\n\n$(x-1)^2(x+2) = 0$\n\n$x = -2$ (the other intersection). Point: $(-2, -8)$.', marks: 4 },
];

export default questions;
