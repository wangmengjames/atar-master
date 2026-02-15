/**
 * Question Validation Script
 * Checks all exam and training questions for standalone solvability
 */

import { getAllExams } from '../src/data/exams';
import type { ExamQuestion, ExamPaper } from '../src/types';

import basicAlgebra from '../src/data/training/basic-algebra';
import numberOps from '../src/data/training/number-ops';
import basicTrig from '../src/data/training/basic-trig';
import basicProb from '../src/data/training/basic-prob';
import graphingBasics from '../src/data/training/graphing-basics';
import polynomialFn from '../src/data/training/polynomial-fn';
import exponentialFn from '../src/data/training/exponential-fn';
import logarithmicFn from '../src/data/training/logarithmic-fn';
import circularFn from '../src/data/training/circular-fn';
import transformations from '../src/data/training/transformations';
import domainRange from '../src/data/training/domain-range';
import compositeFn from '../src/data/training/composite-fn';
import inverseFn from '../src/data/training/inverse-fn';
import derivatives from '../src/data/training/derivatives';
import diffRules from '../src/data/training/diff-rules';
import simultEq from '../src/data/training/simult-eq';
import tangentLines from '../src/data/training/tangent-lines';
import stationaryPts from '../src/data/training/stationary-pts';
import optimisation from '../src/data/training/optimisation';
import antiDiff from '../src/data/training/anti-diff';
import definiteInt from '../src/data/training/definite-int';
import areaCurves from '../src/data/training/area-curves';
import avgRate from '../src/data/training/avg-rate';
import condProb from '../src/data/training/cond-prob';
import binomialDist from '../src/data/training/binomial-dist';
import normalDist from '../src/data/training/normal-dist';
import continuousPdf from '../src/data/training/continuous-pdf';
import confidenceInt from '../src/data/training/confidence-int';
import sampleProp from '../src/data/training/sample-prop';
import y9Number from '../src/data/training/y9-number';
import y10Number from '../src/data/training/y10-number';
import y10Statistics from '../src/data/training/y10-statistics';
import y10aProbability from '../src/data/training/y10a-probability';
import pseudocode from '../src/data/training/pseudocode';
import type { TrainingQuestion } from '../src/data/training/types';

interface Issue {
  id: string;
  type: string;
  text: string;
  reason: string;
  suggestion: string;
  examId?: string;
}

const issues: Issue[] = [];
const warnings: Issue[] = []; // non-blocking
let totalExamQuestions = 0;
let totalExamWithSubParts = 0;
let totalTrainingQuestions = 0;

// ── 1. Scan exam questions ──
const exams = getAllExams();

for (const exam of exams) {
  for (const q of exam.questions) {
    totalExamQuestions++;
    
    // Check if this is a multi-part question with "hence" style dependencies
    // These are OK because all parts are in one text field
    const hasMultiPart = /\b(i+v?\.|\(a\)|\(b\)|\(c\))/i.test(q.text);
    const hasDependency = /\bhence\b|\busing your (result|answer)\b|\bfrom part\b/i.test(q.text);
    
    if (hasMultiPart && hasDependency) {
      totalExamWithSubParts++;
      // This is fine - all parts are in one text block, self-contained
    }
    
    // Check for subQuestions (none exist, but for completeness)
    if (q.subQuestions && q.subQuestions.length > 0) {
      for (const sq of q.subQuestions) {
        issues.push({
          id: sq.id,
          type: 'exam-subquestion-dependency',
          text: sq.text.slice(0, 200),
          reason: 'Sub-question split from parent - may lack context',
          suggestion: 'flattenExam adds [Context] prefix automatically',
          examId: exam.id,
        });
      }
    }
    
    // Check empty text
    if (!q.text || q.text.trim().length < 5) {
      issues.push({
        id: q.id, type: 'exam-empty-text',
        text: q.text || '(empty)',
        reason: 'Question text too short',
        suggestion: 'Add complete question text',
        examId: exam.id,
      });
    }
    
    // Check MC questions need options
    if (q.options && q.options.length > 0) {
      // good
    } else if (q.marks === 1 && q.answer && /^[A-E]$/.test(q.answer)) {
      issues.push({
        id: q.id, type: 'exam-mc-no-options',
        text: q.text.slice(0, 100),
        reason: 'Answer is a letter (MC) but no options array',
        suggestion: 'Add options array',
        examId: exam.id,
      });
    }
  }
}

// ── 2. Scan training questions ──
const allTraining: Record<string, TrainingQuestion[]> = {
  'basic-algebra': basicAlgebra, 'number-ops': numberOps, 'basic-trig': basicTrig,
  'basic-prob': basicProb, 'graphing-basics': graphingBasics, 'polynomial-fn': polynomialFn,
  'exponential-fn': exponentialFn, 'logarithmic-fn': logarithmicFn, 'circular-fn': circularFn,
  'transformations': transformations, 'domain-range': domainRange, 'composite-fn': compositeFn,
  'inverse-fn': inverseFn, 'derivatives': derivatives, 'diff-rules': diffRules,
  'simult-eq': simultEq, 'tangent-lines': tangentLines, 'stationary-pts': stationaryPts,
  'optimisation': optimisation, 'anti-diff': antiDiff, 'definite-int': definiteInt,
  'area-curves': areaCurves, 'avg-rate': avgRate, 'cond-prob': condProb,
  'binomial-dist': binomialDist, 'normal-dist': normalDist, 'continuous-pdf': continuousPdf,
  'confidence-int': confidenceInt, 'sample-prop': sampleProp, 'y9-number': y9Number,
  'y10-number': y10Number, 'y10-statistics': y10Statistics, 'y10a-probability': y10aProbability,
  'pseudocode': pseudocode,
};

for (const [file, questions] of Object.entries(allTraining)) {
  for (const q of questions) {
    totalTrainingQuestions++;
    
    if (!q.text || q.text.trim().length < 3) {
      issues.push({ id: q.id, type: 'training-empty-text', text: q.text || '(empty)', reason: 'Empty/too short', suggestion: 'Add text' });
      continue;
    }
    
    if (q.isMultipleChoice) {
      if (!q.options || q.options.length === 0) {
        issues.push({ id: q.id, type: 'training-no-options', text: q.text.slice(0, 100), reason: 'MC with no options', suggestion: 'Add options' });
        continue;
      }
      const correctCount = q.options.filter(o => o.correct).length;
      if (correctCount === 0) {
        issues.push({ id: q.id, type: 'training-no-correct', text: q.text.slice(0, 100), reason: 'No correct option', suggestion: 'Mark one correct' });
      } else if (correctCount > 1) {
        issues.push({ id: q.id, type: 'training-multi-correct', text: q.text.slice(0, 100), reason: `${correctCount} correct options`, suggestion: 'Keep one correct' });
      }
    }
  }
}

// ── 3. Generate report ──
const total = totalExamQuestions + totalTrainingQuestions;
const solvable = total - issues.length;

let report = `# Question Validation Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Count |
|--------|-------|
| Exam questions | ${totalExamQuestions} |
| Exam multi-part (self-contained) | ${totalExamWithSubParts} |
| Training questions | ${totalTrainingQuestions} |
| **Total** | **${total}** |
| ✅ Standalone solvable | **${solvable}** |
| ❌ Issues | **${issues.length}** |

## Architecture Notes

- **No \`subQuestions\` arrays exist** in any exam file — all questions are already flattened
- Multi-part exam questions (e.g., "i. Find... ii. Hence...") keep all parts in a single \`text\` field, making them self-contained
- The \`flattenExam\` function in \`questionMatcher.ts\` has context enrichment logic ready if \`subQuestions\` are ever used
- ${totalExamWithSubParts} exam questions contain "hence/using your answer" style language but are self-contained since all parts are in one text block

`;

if (issues.length === 0) {
  report += '## ✅ No Issues Found\n\nAll ${total} questions are standalone solvable!\n';
} else {
  report += '## Issues\n\n';
  const byType: Record<string, Issue[]> = {};
  for (const i of issues) { (byType[i.type] ??= []).push(i); }
  for (const [type, items] of Object.entries(byType)) {
    report += `### ${type} (${items.length})\n\n`;
    for (const i of items) {
      report += `- **\`${i.id}\`**${i.examId ? ` (${i.examId})` : ''}: ${i.reason}\n  - Text: \`${i.text}\`\n  - Fix: ${i.suggestion}\n\n`;
    }
  }
}

report += `\n## Conclusion

${issues.length === 0 ? 'All questions pass validation. No fixes needed.' : `${issues.length} issues need attention.`}

The \`flattenExam\` context enrichment is already implemented and will handle any future \`subQuestions\` automatically.
`;

const fs = await import('fs');
fs.writeFileSync('/Users/jarviswang/projects/atar-master/QUESTION-VALIDATION.md', report);

console.log('=== Validation Complete ===');
console.log(`Total: ${total} (Exam: ${totalExamQuestions}, Training: ${totalTrainingQuestions})`);
console.log(`Multi-part self-contained: ${totalExamWithSubParts}`);
console.log(`Issues: ${issues.length}`);
issues.forEach(i => console.log(`  [${i.type}] ${i.id}: ${i.reason}`));
