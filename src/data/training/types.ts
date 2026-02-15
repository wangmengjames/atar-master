export interface TrainingQuestion {
  id: string;
  nodeId: string;
  level: 1 | 2 | 3 | 4 | 5;
  title: string;
  text: string;
  hints: string[];
  answer: string;
  marks: number;
  isMultipleChoice?: boolean;
  options?: { label: string; text: string; correct: boolean }[];
}
