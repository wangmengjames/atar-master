import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'diff-rules-L1-01', nodeId: 'diff-rules', level: 1, title: 'Power rule', text: 'Differentiate $y = x^5$.', hints: ['$\\frac{d}{dx}(x^n) = nx^{n-1}$'], answer: '$\\frac{dy}{dx} = 5x^4$', marks: 1 },
  { id: 'diff-rules-L1-02', nodeId: 'diff-rules', level: 1, title: 'Constant multiple rule', text: 'Differentiate $y = 4x^3$.', hints: ['Constant comes out.'], answer: '$\\frac{dy}{dx} = 12x^2$', marks: 1 },
  { id: 'diff-rules-L1-03', nodeId: 'diff-rules', level: 1, title: 'Sum rule', text: 'Differentiate $y = x^2 + 3x$.', hints: ['Differentiate each term.'], answer: '$\\frac{dy}{dx} = 2x + 3$', marks: 1 },
  { id: 'diff-rules-L1-04', nodeId: 'diff-rules', level: 1, title: 'Derivative of e^x', text: 'Differentiate $y = e^x$.', hints: ['Special function — its own derivative.'], answer: '$\\frac{dy}{dx} = e^x$', marks: 1 },

  // Level 2
  { id: 'diff-rules-L2-01', nodeId: 'diff-rules', level: 2, title: 'Derivative of sin and cos', text: 'Differentiate $y = \\sin(x) + \\cos(x)$.', hints: ['$\\frac{d}{dx}\\sin(x) = \\cos(x)$, $\\frac{d}{dx}\\cos(x) = -\\sin(x)$'], answer: '$\\frac{dy}{dx} = \\cos(x) - \\sin(x)$', marks: 1 },
  { id: 'diff-rules-L2-02', nodeId: 'diff-rules', level: 2, title: 'Chain rule basic', text: 'Differentiate $y = (2x+1)^3$.', hints: ['Let $u = 2x+1$, $y = u^3$.', '$\\frac{dy}{dx} = 3u^2 \\cdot 2$'], answer: '$\\frac{dy}{dx} = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2$', marks: 2 },
  { id: 'diff-rules-L2-03', nodeId: 'diff-rules', level: 2, title: 'Chain rule with e', text: 'Differentiate $y = e^{3x}$.', hints: ['Chain rule: derivative of exponent times $e^{3x}$.'], answer: '$\\frac{dy}{dx} = 3e^{3x}$', marks: 1 },
  { id: 'diff-rules-L2-04', nodeId: 'diff-rules', level: 2, title: 'Derivative of ln', text: 'Differentiate $y = \\ln(x)$.', hints: ['Standard result.'], answer: '$\\frac{dy}{dx} = \\frac{1}{x}$', marks: 1 },

  // Level 3
  { id: 'diff-rules-L3-01', nodeId: 'diff-rules', level: 3, title: 'Product rule', text: 'Differentiate $y = x^2 \\sin(x)$.', hints: ['Product rule: $(uv)\' = u\'v + uv\'$', '$u = x^2, v = \\sin(x)$'], answer: '$\\frac{dy}{dx} = 2x\\sin(x) + x^2\\cos(x)$', marks: 2 },
  { id: 'diff-rules-L3-02', nodeId: 'diff-rules', level: 3, title: 'Quotient rule', text: 'Differentiate $y = \\frac{x}{x+1}$.', hints: ['$\\frac{d}{dx}\\frac{u}{v} = \\frac{u\'v - uv\'}{v^2}$'], answer: '$\\frac{dy}{dx} = \\frac{(1)(x+1) - x(1)}{(x+1)^2} = \\frac{1}{(x+1)^2}$', marks: 2 },
  { id: 'diff-rules-L3-03', nodeId: 'diff-rules', level: 3, title: 'Chain rule with trig', text: 'Differentiate $y = \\cos(3x + 1)$.', hints: ['Chain rule with $u = 3x + 1$.'], answer: '$\\frac{dy}{dx} = -\\sin(3x+1) \\cdot 3 = -3\\sin(3x+1)$', marks: 2 },

  // Level 4
  { id: 'diff-rules-L4-01', nodeId: 'diff-rules', level: 4, title: 'Combined rules', text: 'Differentiate $y = x^2 e^{-x}$.', hints: ['Product rule with $u = x^2$ and $v = e^{-x}$.', '$v\' = -e^{-x}$'], answer: '$\\frac{dy}{dx} = 2xe^{-x} + x^2(-e^{-x}) = e^{-x}(2x - x^2) = xe^{-x}(2-x)$', marks: 3 },
  { id: 'diff-rules-L4-02', nodeId: 'diff-rules', level: 4, title: 'Chain rule with ln', text: 'Differentiate $y = \\ln(x^2 + 1)$.', hints: ['$\\frac{d}{dx}\\ln(u) = \\frac{u\'}{u}$'], answer: '$\\frac{dy}{dx} = \\frac{2x}{x^2+1}$', marks: 2 },
  { id: 'diff-rules-L4-03', nodeId: 'diff-rules', level: 4, title: 'Second derivative', text: 'Find $f\'\'(x)$ if $f(x) = x^4 - 3x^2 + 2$.', hints: ['$f\'(x) = 4x^3 - 6x$', 'Differentiate again.'], answer: '$f\'(x) = 4x^3 - 6x$\n\n$f\'\'(x) = 12x^2 - 6$', marks: 3 },

  // Level 5
  { id: 'diff-rules-L5-01', nodeId: 'diff-rules', level: 5, title: 'Triple chain rule', text: 'Differentiate $y = e^{\\sin(x^2)}$.', hints: ['Outer: $e^u$, middle: $\\sin(v)$, inner: $x^2$.', '$\\frac{dy}{dx} = e^{\\sin(x^2)} \\cdot \\cos(x^2) \\cdot 2x$'], answer: '$\\frac{dy}{dx} = 2x\\cos(x^2) \\cdot e^{\\sin(x^2)}$', marks: 4 },
  { id: 'diff-rules-L5-02', nodeId: 'diff-rules', level: 5, title: 'Quotient with chain', text: 'Differentiate $y = \\frac{e^{2x}}{\\sin(x) + 1}$.', hints: ['Quotient rule with $u = e^{2x}$ and $v = \\sin(x) + 1$.'], answer: '$\\frac{dy}{dx} = \\frac{2e^{2x}(\\sin x + 1) - e^{2x}\\cos x}{(\\sin x + 1)^2} = \\frac{e^{2x}(2\\sin x + 2 - \\cos x)}{(\\sin x + 1)^2}$', marks: 4 },
];

export default questions;
