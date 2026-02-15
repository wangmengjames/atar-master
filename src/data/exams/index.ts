import type { ExamPaper } from '../../types';

import { MM_2021_EXAM1 } from './mm_2021_exam1';
import { MM_2021_EXAM2 } from './mm_2021_exam2';
import { MM_2022_EXAM1 } from './mm_2022_exam1';
import { MM_2022_EXAM2 } from './mm_2022_exam2';
import { MM_2023_EXAM1 } from './mm_2023_exam1';
import { MM_2023_EXAM2 } from './mm_2023_exam2';
import { MM_2024_EXAM1 } from './mm_2024_exam1';
import { MM_2024_EXAM2 } from './mm_2024_exam2';
import { MM_2025_EXAM1 } from './mm_2025_exam1';
import { MM_2025_EXAM2 } from './mm_2025_exam2';

const ALL_EXAMS: ExamPaper[] = [
  MM_2021_EXAM1,
  MM_2021_EXAM2,
  MM_2022_EXAM1,
  MM_2022_EXAM2,
  MM_2023_EXAM1,
  MM_2023_EXAM2,
  MM_2024_EXAM1,
  MM_2024_EXAM2,
  MM_2025_EXAM1,
  MM_2025_EXAM2,
];

export function getAllExams(): ExamPaper[] {
  return ALL_EXAMS;
}

export function getExamById(id: string): ExamPaper | undefined {
  return ALL_EXAMS.find((e) => e.id === id);
}

export {
  MM_2021_EXAM1,
  MM_2021_EXAM2,
  MM_2022_EXAM1,
  MM_2022_EXAM2,
  MM_2023_EXAM1,
  MM_2023_EXAM2,
  MM_2024_EXAM1,
  MM_2024_EXAM2,
  MM_2025_EXAM1,
  MM_2025_EXAM2,
};
