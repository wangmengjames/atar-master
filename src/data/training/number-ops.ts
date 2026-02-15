import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'number-ops-L1-01', nodeId: 'number-ops', level: 1, title: 'Order of operations', text: 'Evaluate $3 + 4 \\times 2$.', hints: ['Multiplication before addition.', '$4 \\times 2 = 8$'], answer: '$3 + 4 \\times 2 = 3 + 8 = 11$', marks: 1 },
  { id: 'number-ops-L1-02', nodeId: 'number-ops', level: 1, title: 'Integer addition', text: 'Evaluate $-3 + 7$.', hints: ['Think of a number line.', 'Start at $-3$, move 7 right.'], answer: '$-3 + 7 = 4$', marks: 1 },
  { id: 'number-ops-L1-03', nodeId: 'number-ops', level: 1, title: 'Fraction simplification', text: 'Simplify $\\frac{12}{18}$.', hints: ['Find the HCF of 12 and 18.', 'HCF is 6.'], answer: '$\\frac{12}{18} = \\frac{12 \\div 6}{18 \\div 6} = \\frac{2}{3}$', marks: 1 },
  { id: 'number-ops-L1-04', nodeId: 'number-ops', level: 1, title: 'Decimal to fraction', text: 'Convert $0.75$ to a fraction in simplest form.', hints: ['$0.75 = \\frac{75}{100}$', 'Simplify by dividing by 25.'], answer: '$0.75 = \\frac{75}{100} = \\frac{3}{4}$', marks: 1 },

  // Level 2
  { id: 'number-ops-L2-01', nodeId: 'number-ops', level: 2, title: 'Fraction arithmetic', text: 'Evaluate $\\frac{2}{3} + \\frac{3}{4}$.', hints: ['Find a common denominator (12).', '$\\frac{8}{12} + \\frac{9}{12}$'], answer: '$\\frac{2}{3} + \\frac{3}{4} = \\frac{8}{12} + \\frac{9}{12} = \\frac{17}{12}$', marks: 2 },
  { id: 'number-ops-L2-02', nodeId: 'number-ops', level: 2, title: 'Percentage of amount', text: 'Find $15\\%$ of $240$.', hints: ['$15\\% = 0.15$', '$0.15 \\times 240$'], answer: '$15\\% \\times 240 = 0.15 \\times 240 = 36$', marks: 1 },
  { id: 'number-ops-L2-03', nodeId: 'number-ops', level: 2, title: 'Index laws', text: 'Simplify $2^3 \\times 2^4$.', hints: ['When multiplying same base, add indices.', '$2^{3+4}$'], answer: '$2^3 \\times 2^4 = 2^{3+4} = 2^7 = 128$', marks: 1 },
  { id: 'number-ops-L2-04', nodeId: 'number-ops', level: 2, title: 'Negative indices', text: 'Evaluate $5^{-2}$.', hints: ['$a^{-n} = \\frac{1}{a^n}$', '$\\frac{1}{5^2}$'], answer: '$5^{-2} = \\frac{1}{5^2} = \\frac{1}{25}$', marks: 1 },

  // Level 3
  { id: 'number-ops-L3-01', nodeId: 'number-ops', level: 3, title: 'Surds simplification', text: 'Simplify $\\sqrt{48}$.', hints: ['$48 = 16 \\times 3$', '$\\sqrt{16} = 4$'], answer: '$\\sqrt{48} = \\sqrt{16 \\times 3} = 4\\sqrt{3}$', marks: 2 },
  { id: 'number-ops-L3-02', nodeId: 'number-ops', level: 3, title: 'Scientific notation', text: 'Express $0.00042$ in scientific notation.', hints: ['Move the decimal point right.', '$4.2 \\times 10^{?}$'], answer: '$0.00042 = 4.2 \\times 10^{-4}$', marks: 1 },
  { id: 'number-ops-L3-03', nodeId: 'number-ops', level: 3, title: 'Fractional indices', text: 'Evaluate $27^{\\frac{2}{3}}$.', hints: ['$a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$', '$\\sqrt[3]{27} = 3$'], answer: '$27^{\\frac{2}{3}} = (\\sqrt[3]{27})^2 = 3^2 = 9$', marks: 2 },

  // Level 4
  { id: 'number-ops-L4-01', nodeId: 'number-ops', level: 4, title: 'Rationalise denominator', text: 'Rationalise $\\frac{3}{\\sqrt{5} - 1}$.', hints: ['Multiply by $\\frac{\\sqrt{5}+1}{\\sqrt{5}+1}$.', 'Denominator becomes $5 - 1 = 4$.'], answer: '$\\frac{3}{\\sqrt{5}-1} \\times \\frac{\\sqrt{5}+1}{\\sqrt{5}+1} = \\frac{3(\\sqrt{5}+1)}{5-1} = \\frac{3(\\sqrt{5}+1)}{4}$', marks: 3 },
  { id: 'number-ops-L4-02', nodeId: 'number-ops', level: 4, title: 'Complex surd arithmetic', text: 'Simplify $(2\\sqrt{3} + 1)(\\sqrt{3} - 2)$.', hints: ['Expand using FOIL.', '$2\\sqrt{3} \\cdot \\sqrt{3} = 2 \\cdot 3 = 6$'], answer: '$(2\\sqrt{3}+1)(\\sqrt{3}-2) = 2(3) - 4\\sqrt{3} + \\sqrt{3} - 2 = 6 - 3\\sqrt{3} - 2 = 4 - 3\\sqrt{3}$', marks: 3 },
  { id: 'number-ops-L4-03', nodeId: 'number-ops', level: 4, title: 'Index equation', text: 'Solve $4^x = 8$.', hints: ['Write both sides as powers of 2.', '$2^{2x} = 2^3$'], answer: '$4^x = 8$\n\n$(2^2)^x = 2^3$\n\n$2^{2x} = 2^3$\n\n$2x = 3$\n\n$x = \\frac{3}{2}$', marks: 3 },

  // Level 5
  { id: 'number-ops-L5-01', nodeId: 'number-ops', level: 5, title: 'Nested surds', text: 'Simplify $\\sqrt{6 + 2\\sqrt{5}}$.', hints: ['Try writing $6 + 2\\sqrt{5}$ as $(a+b)^2$.', '$(\\sqrt{5}+1)^2 = 5 + 2\\sqrt{5} + 1 = 6 + 2\\sqrt{5}$'], answer: '$6 + 2\\sqrt{5} = (\\sqrt{5})^2 + 2\\sqrt{5} + 1 = (\\sqrt{5}+1)^2$\n\n$\\sqrt{6+2\\sqrt{5}} = \\sqrt{5} + 1$', marks: 4 },
  { id: 'number-ops-L5-02', nodeId: 'number-ops', level: 5, title: 'Proof with indices', text: 'Show that $\\frac{8^{n+1} - 8^n}{7 \\times 8^n} = 1$ for all positive integers $n$.', hints: ['Factor $8^n$ from the numerator.', '$8^{n+1} = 8 \\cdot 8^n$'], answer: '$\\frac{8^{n+1} - 8^n}{7 \\times 8^n} = \\frac{8^n(8-1)}{7 \\times 8^n} = \\frac{8^n \\cdot 7}{7 \\times 8^n} = 1$', marks: 3 },
];

export default questions;
