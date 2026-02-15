import { useState, useMemo, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, X, RotateCcw, Trophy, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { getTrainingByDifficulty, type TrainingQuestion } from '../data/training';
import { getQuestionsForNode } from '../data/questionMatcher';
import MathText from './MathText';

interface Props {
  nodeId: string;
  level: number;
  onComplete: (nodeId: string, level: number, score: number, total: number) => void;
  onBack: () => void;
}

type Phase = 'quiz' | 'summary';

const OPTION_KEYS = ['a', 'b', 'c', 'd', 'e'];

export default function TrainingSession({ nodeId, level, onComplete, onBack }: Props) {
  const questions = useMemo(() => {
    if (level === 4) {
      return getQuestionsForNode(nodeId).map(mq => ({
        id: mq.question.id,
        text: mq.question.text,
        marks: mq.question.marks,
        hints: mq.question.markingGuide || [],
        answer: mq.question.answer || '',
        isMultipleChoice: !!(mq.question as any).options?.length,
        options: (mq.question as any).options || [],
        examTitle: mq.examTitle,
      }));
    }
    const diffKeys: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    return getTrainingByDifficulty(nodeId, diffKeys[level - 1]);
  }, [nodeId, level]);

  const [phase, setPhase] = useState<Phase>('quiz');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const current = questions[currentIdx] as TrainingQuestion | undefined;
  const total = questions.length;
  const correctCount = Object.values(results).filter(Boolean).length;
  const answeredCount = Object.keys(results).length;

  const handleSelect = useCallback((label: string) => {
    if (isAnswered) return;
    setSelectedOption(label);
  }, [isAnswered]);

  const handleSubmit = useCallback(() => {
    if (!current || !selectedOption) return;
    const correct = current.options?.find(o => o.label === selectedOption)?.correct ?? false;
    setResults(prev => ({ ...prev, [currentIdx]: correct }));
    setIsAnswered(true);
    setTimeout(() => setFeedbackVisible(true), 50);
  }, [current, selectedOption, currentIdx]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= total) {
      setPhase('summary');
      return;
    }
    setFeedbackVisible(false);
    setCurrentIdx(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
  }, [currentIdx, total]);

  const handleFinish = useCallback(() => {
    onComplete(nodeId, level, correctCount, total);
  }, [nodeId, level, correctCount, total, onComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== 'quiz' || !current) return;
      const key = e.key.toLowerCase();

      // Option selection via A-E
      if (!isAnswered && current.options) {
        const optIdx = OPTION_KEYS.indexOf(key);
        if (optIdx !== -1 && optIdx < current.options.length) {
          handleSelect(current.options[optIdx].label);
          return;
        }
      }

      // Enter to submit or next
      if (key === 'enter') {
        e.preventDefault();
        if (!isAnswered && selectedOption) {
          handleSubmit();
        } else if (isAnswered) {
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, current, isAnswered, selectedOption, handleSelect, handleSubmit, handleNext]);

  // No questions
  if (!current && phase === 'quiz') {
    return (
      <div className="min-h-full bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No questions available for this level yet.</p>
          <button onClick={onBack} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition">
            Back
          </button>
        </div>
      </div>
    );
  }

  // ── Summary Phase ──
  if (phase === 'summary') {
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
    const passed = pct >= 70;
    const incorrectCount = answeredCount - correctCount;
    const skippedCount = total - answeredCount;
    const circumference = 2 * Math.PI * 54;
    const strokeDash = (pct / 100) * circumference;

    return (
      <div className="min-h-full bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 text-center backdrop-blur">
            {/* Circular progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#1f2937" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={passed ? '#22c55e' : '#f97316'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{correctCount}/{total}</span>
                <span className="text-sm text-gray-400">{pct}%</span>
              </div>
            </div>

            {/* Pass/Fail badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
              passed ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
            }`}>
              {passed ? <Trophy size={16} /> : <RotateCcw size={16} />}
              {passed ? 'Passed' : 'Not Yet'}
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {passed ? 'You passed! 🎉' : 'Keep practicing'}
            </h2>
            <p className="text-gray-400 mb-6">
              {passed ? 'Great work — you\'re ready to move on.' : 'You need 70% to pass. You\'ll get there!'}
            </p>

            {/* Score breakdown bars */}
            <div className="space-y-2 mb-8 text-left">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-16">Correct</span>
                <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${total > 0 ? (correctCount / total) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-green-400 w-6 text-right">{correctCount}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-16">Wrong</span>
                <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full transition-all duration-700" style={{ width: `${total > 0 ? (incorrectCount / total) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-red-400 w-6 text-right">{incorrectCount}</span>
              </div>
              {skippedCount > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-16">Skipped</span>
                  <div className="flex-1 h-3 bg-gray-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-600 rounded-full transition-all duration-700" style={{ width: `${(skippedCount / total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{skippedCount}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 px-4 py-3.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition"
              >
                Back to Topics
              </button>
              <button
                onClick={handleFinish}
                className={`flex-1 px-4 py-3.5 font-medium rounded-xl transition text-white ${
                  passed ? 'bg-green-600 hover:bg-green-500' : 'bg-orange-600 hover:bg-orange-500'
                }`}
              >
                {passed ? 'Continue →' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz Phase ──
  const isCorrect = results[currentIdx];
  const correctOption = current!.options?.find(o => o.correct);
  const progressPct = ((currentIdx + (isAnswered ? 1 : 0)) / total) * 100;

  return (
    <div className="min-h-full bg-gray-900 flex flex-col">
      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800/50 px-4 sm:px-6 pt-4 pb-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Exit</span>
            </button>
            <span className="text-sm text-gray-300 font-medium">
              Question <span className="text-white">{currentIdx + 1}</span> of {total}
            </span>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-green-400 font-bold">{correctCount}</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">{answeredCount}</span>
              <Check size={14} className="text-green-400" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">

          {/* Question Card */}
          <div className="bg-gray-800/50 border border-gray-700/40 rounded-2xl p-5 sm:p-7 mb-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                Q{currentIdx + 1}
              </span>
              {current!.marks && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700/60 text-gray-400">
                  {current!.marks} {current!.marks === 1 ? 'mark' : 'marks'}
                </span>
              )}
            </div>
            <div className="text-lg text-white leading-relaxed">
              <MathText text={current!.text} />
            </div>
          </div>

          {/* Options */}
          {current!.options && current!.options.length > 0 && (
            <div className="space-y-3 mb-5">
              {current!.options.map((opt: { label: string; text: string; correct: boolean }, idx: number) => {
                const isSelected = selectedOption === opt.label;
                let border = 'border-gray-700/40';
                let bg = 'bg-gray-800/30';
                let labelBg = 'bg-gray-700 text-gray-400';
                let textColor = 'text-gray-300';
                let icon: React.ReactNode = opt.label;
                let ringClass = '';

                if (isAnswered) {
                  if (opt.correct) {
                    border = 'border-green-500/60';
                    bg = 'bg-green-500/10';
                    labelBg = 'bg-green-500 text-white';
                    textColor = 'text-green-200';
                    icon = <Check size={14} strokeWidth={3} />;
                  } else if (isSelected && !opt.correct) {
                    border = 'border-red-500/60';
                    bg = 'bg-red-500/10';
                    labelBg = 'bg-red-500 text-white';
                    textColor = 'text-red-200';
                    icon = <X size={14} strokeWidth={3} />;
                  } else {
                    textColor = 'text-gray-500';
                  }
                } else if (isSelected) {
                  border = 'border-blue-500/60';
                  bg = 'bg-blue-500/10';
                  labelBg = 'bg-blue-500 text-white';
                  textColor = 'text-blue-100';
                  ringClass = 'ring-1 ring-blue-500/30';
                }

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    disabled={isAnswered}
                    className={`w-full flex items-center gap-4 py-5 px-6 rounded-xl border transition-all duration-200 ${border} ${bg} ${ringClass} ${
                      !isAnswered ? 'hover:border-blue-500/40 hover:bg-blue-500/5 active:scale-[0.99] cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-200 ${labelBg}`}>
                      {icon}
                    </div>
                    <span className={`text-left text-base leading-relaxed ${textColor} transition-colors duration-200`}>
                      <MathText text={opt.text} />
                    </span>
                    {/* Keyboard shortcut hint */}
                    {!isAnswered && idx < OPTION_KEYS.length && (
                      <span className="ml-auto text-xs text-gray-600 font-mono hidden sm:block">
                        {OPTION_KEYS[idx].toUpperCase()}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Keyboard hint */}
          {!isAnswered && current!.options && current!.options.length > 0 && (
            <p className="text-xs text-gray-600 text-center mb-5 hidden sm:block">
              Press <span className="font-mono">A</span>–<span className="font-mono">{OPTION_KEYS[Math.min(current!.options.length, OPTION_KEYS.length) - 1].toUpperCase()}</span> to select, <span className="font-mono">Enter</span> to submit
            </p>
          )}

          {/* Hint Section */}
          {!isAnswered && current!.hints && current!.hints.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="flex items-center gap-2 text-sm text-yellow-500/70 hover:text-yellow-400 transition-colors"
              >
                <Lightbulb size={15} />
                Need a hint?
                {showHint ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showHint && (
                <div className="mt-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <div className="text-sm text-yellow-200/80 leading-relaxed">
                    <MathText text={current!.hints[0]} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Answer Feedback */}
          {isAnswered && (
            <div className={`mb-5 rounded-xl border p-5 transition-all duration-300 ${
              feedbackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${
              isCorrect
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className={`text-base font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && correctOption && (
                <p className="text-sm text-gray-300 mb-2">
                  The answer is <span className="font-bold text-white">{correctOption.label}</span>
                </p>
              )}
              {current!.answer && (
                <div className="text-sm text-gray-300 leading-relaxed">
                  <MathText text={current!.answer} />
                </div>
              )}
              {/* Marking guide steps */}
              {current!.hints && current!.hints.length > 1 && (
                <div className="mt-3 pt-3 border-t border-gray-700/30">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Marking Guide</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-400">
                    {current!.hints.map((step, i) => (
                      <li key={i}><MathText text={step} /></li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-all duration-200 active:scale-[0.99]"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {currentIdx + 1 >= total ? 'See Results' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
