/**
 * Shared visual constants for the skill tree.
 */
import {
  Hash, Sigma, BarChart2, Dice5, TrendingUp,
  PieChart, Calculator, Triangle, Waves, Mountain,
  Bell, Binary, PenTool, Monitor, Link2,
  FunctionSquare, Braces, LineChart, GitBranch, Sparkles,
  type LucideIcon,
} from 'lucide-react';

export const TIER_COLORS: [string, string][] = [
  ['#5B6576', '#8D99AE'],
  ['#3F6474', '#6B93A3'],
  ['#4B5E77', '#7A8DA7'],
  ['#1F2937', '#4B5563'],
  ['#215F58', '#4C8A82'],
  ['#7C5A31', '#B58A58'],
];

export const NODE_ICON_MAP: Record<string, LucideIcon> = {
  'y8-number': Hash,
  'y8-algebra': Braces,
  'y8-statistics': BarChart2,
  'y8-probability': Dice5,
  'y9-number': Sigma,
  'y9-algebra': TrendingUp,
  'y9-statistics': LineChart,
  'y9-probability': PieChart,
  'y10-number': Calculator,
  'y10-algebra': FunctionSquare,
  'y10-statistics': BarChart2,
  'y10-probability': GitBranch,
  'y10a-algebra': Link2,
  'y10a-probability': Dice5,
  'y11-a1-linear': TrendingUp,
  'y11-a2-quadratics': Waves,
  'y11-a3-domain-range': Braces,
  'y11-a4-transformations': GitBranch,
  'y11-a5-trigonometry': Triangle,
  'y11-a6-logs-indices': Sigma,
  'y11-a7-differentiation': LineChart,
  'y11-a8-integration': Waves,
  'y11-a9-combinatorics': PieChart,
  'y12-a1-algebra-functions': Sparkles,
  'y12-a2-differentiation': Mountain,
  'y12-a3-integration': Waves,
  'y12-a4-discrete-prob': Dice5,
  'y12-a5-continuous-prob': Bell,
  'y12-a6-pseudocode': Binary,
  'vce-exam1': PenTool,
  'vce-exam2': Monitor,
};
