import type { TrainingQuestion } from './types';

const questions: TrainingQuestion[] = [
  // Level 1
  { id: 'basic-prob-L1-01', nodeId: 'basic-prob', level: 1, title: 'Simple probability', text: 'A fair die is rolled. What is the probability of rolling a 4?', hints: ['How many outcomes total?', '1 favourable out of 6.'], answer: '$P(4) = \\frac{1}{6}$', marks: 1 },
  { id: 'basic-prob-L1-02', nodeId: 'basic-prob', level: 1, title: 'Coin toss', text: 'A fair coin is tossed. What is $P(\\text{heads})$?', hints: ['Two equally likely outcomes.'], answer: '$P(\\text{heads}) = \\frac{1}{2}$', marks: 1 },
  { id: 'basic-prob-L1-03', nodeId: 'basic-prob', level: 1, title: 'Complementary event', text: 'If $P(A) = 0.3$, what is $P(A\')$?', hints: ['$P(A\') = 1 - P(A)$'], answer: '$P(A\') = 1 - 0.3 = 0.7$', marks: 1 },
  { id: 'basic-prob-L1-04', nodeId: 'basic-prob', level: 1, title: 'Favourable outcomes', text: 'A bag has 3 red, 2 blue, and 5 green marbles. What is the probability of drawing a blue marble?', hints: ['Total = 10 marbles.', '$P = \\frac{\\text{blue}}{\\text{total}}$'], answer: '$P(\\text{blue}) = \\frac{2}{10} = \\frac{1}{5}$', marks: 1 },

  // Level 2
  { id: 'basic-prob-L2-01', nodeId: 'basic-prob', level: 2, title: 'Two events (OR)', text: 'A die is rolled. Find $P(\\text{even or greater than 4})$.', hints: ['Even: {2,4,6}. Greater than 4: {5,6}.', 'Union: {2,4,5,6}.'], answer: 'Favourable = \\{2, 4, 5, 6\\}, so $P = \\frac{4}{6} = \\frac{2}{3}$', marks: 2 },
  { id: 'basic-prob-L2-02', nodeId: 'basic-prob', level: 2, title: 'Independent events', text: 'Two coins are tossed. What is the probability of getting two heads?', hints: ['$P(HH) = P(H) \\times P(H)$', '$\\frac{1}{2} \\times \\frac{1}{2}$'], answer: '$P(HH) = \\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}$', marks: 1 },
  { id: 'basic-prob-L2-03', nodeId: 'basic-prob', level: 2, title: 'Tree diagram', text: 'A bag has 4 red and 6 blue balls. Two balls are drawn with replacement. Find $P(\\text{both red})$.', hints: ['With replacement: events are independent.', '$P(R) = \\frac{4}{10} = \\frac{2}{5}$'], answer: '$P(RR) = \\frac{2}{5} \\times \\frac{2}{5} = \\frac{4}{25}$', marks: 2 },
  { id: 'basic-prob-L2-04', nodeId: 'basic-prob', level: 2, title: 'Experimental probability', text: 'In 50 trials, an event occurred 15 times. What is the experimental probability?', hints: ['$P = \\frac{\\text{frequency}}{\\text{total trials}}$'], answer: '$P = \\frac{15}{50} = \\frac{3}{10} = 0.3$', marks: 1 },

  // Level 3
  { id: 'basic-prob-L3-01', nodeId: 'basic-prob', level: 3, title: 'Without replacement', text: 'A bag has 5 red and 3 blue balls. Two are drawn without replacement. Find $P(\\text{both blue})$.', hints: ['First draw: $P(B) = \\frac{3}{8}$.', 'Second draw: $P(B) = \\frac{2}{7}$.'], answer: '$P(BB) = \\frac{3}{8} \\times \\frac{2}{7} = \\frac{6}{56} = \\frac{3}{28}$', marks: 2 },
  { id: 'basic-prob-L3-02', nodeId: 'basic-prob', level: 3, title: 'Addition rule', text: 'If $P(A) = 0.4$, $P(B) = 0.5$ and $P(A \\cap B) = 0.2$, find $P(A \\cup B)$.', hints: ['$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$'], answer: '$P(A \\cup B) = 0.4 + 0.5 - 0.2 = 0.7$', marks: 2 },
  { id: 'basic-prob-L3-03', nodeId: 'basic-prob', level: 3, title: 'At least one', text: 'A die is rolled 3 times. Find the probability of getting at least one 6.', hints: ['$P(\\text{at least one}) = 1 - P(\\text{none})$', '$P(\\text{no 6}) = (\\frac{5}{6})^3$'], answer: '$P(\\text{at least one 6}) = 1 - \\left(\\frac{5}{6}\\right)^3 = 1 - \\frac{125}{216} = \\frac{91}{216} \\approx 0.421$', marks: 2 },

  // Level 4
  { id: 'basic-prob-L4-01', nodeId: 'basic-prob', level: 4, title: 'Probability table', text: 'Students were surveyed about sport preference. 30 play tennis, 45 play soccer, 10 play both, and 15 play neither. How many students were surveyed? Find $P(\\text{tennis only})$.', hints: ['Use inclusion-exclusion: $|T \\cup S| = 30 + 45 - 10 = 65$.', 'Total $= 65 + 15 = 80$.'], answer: 'Total $= 30 + 45 - 10 + 15 = 80$\n\nTennis only $= 30 - 10 = 20$\n\n$P(\\text{tennis only}) = \\frac{20}{80} = \\frac{1}{4}$', marks: 3 },
  { id: 'basic-prob-L4-02', nodeId: 'basic-prob', level: 4, title: 'Arrangements', text: 'How many ways can 5 people stand in a line?', hints: ['This is a permutation.', '$5!$'], answer: '$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$', marks: 2 },
  { id: 'basic-prob-L4-03', nodeId: 'basic-prob', level: 4, title: 'Combinations', text: 'From a group of 8 people, a committee of 3 is chosen. How many committees are possible?', hints: ['Order does not matter.', '$\\binom{8}{3} = \\frac{8!}{3!5!}$'], answer: '$\\binom{8}{3} = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$', marks: 3 },

  // Level 5
  { id: 'basic-prob-L5-01', nodeId: 'basic-prob', level: 5, title: 'Complex counting', text: 'A password is 4 characters: the first must be a letter (26 choices), the remaining three are digits (0–9). How many passwords are possible? If a password is chosen at random, what is the probability it starts with "A" and ends with "7"?', hints: ['Total passwords: $26 \\times 10^3$.', 'Favourable: $1 \\times 10 \\times 10 \\times 1$.'], answer: 'Total $= 26 \\times 10 \\times 10 \\times 10 = 26000$\n\nFavourable (starts A, ends 7) $= 1 \\times 10 \\times 10 \\times 1 = 100$\n\n$P = \\frac{100}{26000} = \\frac{1}{260}$', marks: 4 },
  { id: 'basic-prob-L5-02', nodeId: 'basic-prob', level: 5, title: 'Conditional reasoning', text: 'Two cards are drawn from a standard 52-card deck without replacement. Find the probability that both are aces.', hints: ['$P(\\text{1st ace}) = \\frac{4}{52}$', '$P(\\text{2nd ace | 1st ace}) = \\frac{3}{51}$'], answer: '$P(\\text{both aces}) = \\frac{4}{52} \\times \\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$', marks: 3 },
];

export default questions;
