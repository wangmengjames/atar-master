import { useState, useMemo, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, X, RotateCcw, Trophy, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { getTrainingByDifficulty, type TrainingQuestion } from '../data/training';
import { getQuestionsForNode } from '../data/questionMatcher';
import MathText from './MathText';
import { checkAchievements, type Achievement } from '../lib/achievements';
import { loadProgress } from '../lib/progress';
import { getStreak } from '../lib/streak';
import AchievementToast from './AchievementToast';
import AdvanceModal from './AdvanceModal';

interface Props {
  nodeId: string;
  level: number;
  onComplete: (nodeId: string, level: number, score: number, total: number, advance?: boolean) => void;
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
        isMultipleChoice: !!mq.question.options?.length,
        options: mq.question.options ? mq.question.options.map(opt => ({
          label: opt.label,
          text: opt.text,
          correct: opt.label === mq.question.answer || opt.text === mq.question.answer,
        })) : [],
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
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [advanceNextLevel, setAdvanceNextLevel] = useState<number | null>(null);
  const ADVANCE_THRESHOLD = 5;

  const current = questions[currentIdx] as TrainingQuestion | undefined;
  const total = questions.length;
  const correctCount = Object.values(results).filter(Boolean).length;
  const answeredCount = Object.keys(results).length;

  const handleSelect = useCallback((label: string) => {
    if (isAnswered) return;
    setSelectedOption(label);
  }, [isAnswered]);

  const [speedAnswerThisSession, setSpeedAnswerThisSession] = useState(false);

  const handleSubmit = useCallback(() => {
    if (!current || !selectedOption) return;
    const correct = current.options?.find(o => o.label === selectedOption)?.correct ?? false;
    setResults(prev => ({ ...prev, [currentIdx]: correct }));
    setIsAnswered(true);
    setTimeout(() => setFeedbackVisible(true), 50);
    if (correct && (Date.now() - questionStartTime) < 10000) {
      setSpeedAnswerThisSession(true);
    }
    if (correct) {
      const newCount = consecutiveCorrect + 1;
      setConsecutiveCorrect(newCount);
      if (newCount >= ADVANCE_THRESHOLD) {
        const nextLvl = level < 3 ? level + 1 : null;
        setAdvanceNextLevel(nextLvl);
        setTimeout(() => setShowAdvanceModal(true), 800);
      }
    } else {
      setConsecutiveCorrect(0);
    }
  }, [current, selectedOption, currentIdx, questionStartTime, consecutiveCorrect, level]);

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
    setQuestionStartTime(Date.now());
  }, [currentIdx, total]);

  const handleFinish = useCallback(() => {
    import('../lib/streak').then(({ recordActivity }) => {
      recordActivity();
      window.dispatchEvent(new Event('streak-updated'));
    });

    const progress = loadProgress();
    const streak = getStreak();
    let maxStreak = 0, cur = 0;
    for (let i = 0; i < total; i++) {
      if (results[i]) { cur++; maxStreak = Math.max(maxStreak, cur); } else { cur = 0; }
    }
    const newAchievements = checkAchievements({
      progress,
      streak,
      sessionCorrectStreak: maxStreak,
      perfectLevel: correctCount === total && total > 0,
      speedAnswer: speedAnswerThisSession,
      completedLevel: level,
    });
    if (newAchievements.length > 0) {
      setAchievementQueue(newAchievements);
    }

    onComplete(nodeId, level, correctCount, total);
  }, [nodeId, level, correctCount, total, onComplete, results, speedAnswerThisSession]);

  const handleAdvanceDone = useCallback(() => {
    setShowAdvanceModal(false);
    import('../lib/streak').then(({ recordActivity }) => {
      recordActivity();
      window.dispatchEvent(new Event('streak-updated'));
    });
    onComplete(nodeId, level, correctCount, answeredCount, true);
  }, [nodeId, level, correctCount, answeredCount, onComplete]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase !== 'quiz' || !current) return;
      const key = e.key.toLowerCase();

      if (!isAnswered && current.options) {
        const optIdx = OPTION_KEYS.indexOf(key);
        if (optIdx !== -1 && optIdx < current.options.length) {
          handleSelect(current.options[optIdx].label);
          return;
        }
      }

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
      <div className="min-h-full bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-black/45 mb-4">No questions available for this level yet.</p>
          <button onClick={onBack} className="px-6 py-3 bg-black text-white rounded-xl hover:bg-black/85 transition">
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
      <div className="min-h-full bg-[#FAFAFA] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="bg-white border border-black/10 rounded-2xl p-8 text-center">
            {/* Circular progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="8" />
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
                <span className="text-3xl font-bold text-black">{correctCount}/{total}</span>
                <span className="text-sm text-black/40">{pct}%</span>
              </div>
            </div>

            {/* Pass/Fail badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border ${
              passed
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-orange-50 border-orange-200 text-orange-700'
            }`}>
              {passed ? <Trophy size={16} /> : <RotateCcw size={16} />}
              {passed ? 'Passed' : 'Not Yet'}
            </div>

            <h2 className="text-2xl font-bold text-black mb-2">
              {passed ? 'You passed!' : 'Keep practicing'}
            </h2>
            <p className="text-black/50 mb-6">
              {passed ? "Great work — you're ready to move on." : 'You need 70% to pass. You\'ll get there!'}
            </p>

            {/* Score breakdown bars */}
            <div className="space-y-2 mb-8 text-left">
              <div className="flex items-center gap-3">
                <span className="text-xs text-black/45 w-16">Correct</span>
                <div className="flex-1 h-2 bg-black/6 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${total > 0 ? (correctCount / total) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-green-600 w-6 text-right">{correctCount}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-black/45 w-16">Wrong</span>
                <div className="flex-1 h-2 bg-black/6 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full transition-all duration-700" style={{ width: `${total > 0 ? (incorrectCount / total) * 100 : 0}%` }} />
                </div>
                <span className="text-xs text-red-500 w-6 text-right">{incorrectCount}</span>
              </div>
              {skippedCount > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-black/45 w-16">Skipped</span>
                  <div className="flex-1 h-2 bg-black/6 rounded-full overflow-hidden">
                    <div className="h-full bg-black/20 rounded-full transition-all duration-700" style={{ width: `${(skippedCount / total) * 100}%` }} />
                  </div>
                  <span className="text-xs text-black/40 w-6 text-right">{skippedCount}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onBack}
                className="flex-1 px-4 py-3.5 bg-black/[0.05] hover:bg-black/[0.08] text-black/65 font-medium rounded-xl border border-black/10 transition"
              >
                Back to Topics
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 px-4 py-3.5 bg-black hover:bg-black/85 text-white font-medium rounded-xl transition"
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
    <div className="min-h-full bg-[#FAFAFA] flex flex-col">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-black/8 px-4 sm:px-6 pt-4 pb-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-black/40 hover:text-black transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Exit</span>
            </button>
            <span className="text-sm text-black/55 font-medium">
              Question <span className="text-black font-bold">{currentIdx + 1}</span> of {total}
            </span>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-green-600 font-bold">{correctCount}</span>
              <span className="text-black/20">/</span>
              <span className="text-black/40">{answeredCount}</span>
              <Check size={14} className="text-green-600" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-black/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-black rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">

          {/* Question Card */}
          <div className="bg-white border border-black/10 rounded-2xl p-5 sm:p-7 mb-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-black/[0.06] text-black/50">
                Q{currentIdx + 1}
              </span>
              {current!.marks && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/[0.04] text-black/40">
                  {current!.marks} {current!.marks === 1 ? 'mark' : 'marks'}
                </span>
              )}
            </div>
            <div className="text-base sm:text-lg text-black leading-relaxed">
              <MathText text={current!.text} />
            </div>
          </div>

          {/* Options */}
          {current!.options && current!.options.length > 0 && (
            <div className="space-y-2.5 mb-5">
              {current!.options.map((opt: { label: string; text: string; correct: boolean }, idx: number) => {
                const isSelected = selectedOption === opt.label;
                let borderClass = 'border-black/10';
                let bgClass = 'bg-white';
                let labelBg = 'bg-black/[0.06] text-black/50';
                let textColor = 'text-black/70';
                let icon: React.ReactNode = opt.label;
                let ringClass = '';

                if (isAnswered) {
                  if (opt.correct) {
                    borderClass = 'border-green-200';
                    bgClass = 'bg-green-50';
                    labelBg = 'bg-green-500 text-white';
                    textColor = 'text-green-700';
                    icon = <Check size={14} strokeWidth={3} />;
                  } else if (isSelected && !opt.correct) {
                    borderClass = 'border-red-200';
                    bgClass = 'bg-red-50';
                    labelBg = 'bg-red-500 text-white';
                    textColor = 'text-red-600';
                    icon = <X size={14} strokeWidth={3} />;
                  } else {
                    textColor = 'text-black/25';
                    labelBg = 'bg-black/[0.04] text-black/25';
                  }
                } else if (isSelected) {
                  borderClass = 'border-black/30';
                  bgClass = 'bg-black/[0.03]';
                  labelBg = 'bg-black text-white';
                  textColor = 'text-black';
                  ringClass = 'ring-1 ring-black/10';
                }

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    disabled={isAnswered}
                    className={`w-full flex items-center gap-4 py-4 px-5 rounded-xl border transition-all duration-200 ${borderClass} ${bgClass} ${ringClass} ${
                      !isAnswered ? 'hover:border-black/20 hover:bg-black/[0.02] active:scale-[0.99] cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-200 ${labelBg}`}>
                      {icon}
                    </div>
                    <span className={`text-left text-base leading-relaxed ${textColor} transition-colors duration-200`}>
                      <MathText text={opt.text} />
                    </span>
                    {!isAnswered && idx < OPTION_KEYS.length && (
                      <span className="ml-auto text-xs text-black/20 font-mono hidden sm:block">
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
            <p className="text-xs text-black/25 text-center mb-5 hidden sm:block">
              Press <span className="font-mono">A</span>–<span className="font-mono">{OPTION_KEYS[Math.min(current!.options.length, OPTION_KEYS.length) - 1].toUpperCase()}</span> to select, <span className="font-mono">Enter</span> to submit
            </p>
          )}

          {/* Hint Section */}
          {!isAnswered && current!.hints && current!.hints.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="flex items-center gap-2 text-sm text-amber-500/80 hover:text-amber-600 transition-colors"
              >
                <Lightbulb size={15} />
                Need a hint?
                {showHint ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showHint && (
                <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="text-sm text-amber-700 leading-relaxed">
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
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className={`text-base font-semibold mb-2 ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && correctOption && (
                <p className="text-sm text-black/60 mb-2">
                  The answer is <span className="font-bold text-black">{correctOption.label}</span>
                </p>
              )}
              {current!.answer && (
                <div className="text-sm text-black/55 leading-relaxed">
                  <MathText text={current!.answer} />
                </div>
              )}
              {current!.hints && current!.hints.length > 1 && (
                <div className="mt-3 pt-3 border-t border-black/8">
                  <p className="text-xs font-semibold text-black/35 uppercase tracking-wide mb-2">Marking Guide</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-black/50">
                    {current!.hints.map((step, i) => (
                      <li key={i}><MathText text={step} /></li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Consecutive correct streak dots */}
          <div className="flex items-center justify-center gap-2 mb-5">
            {Array.from({ length: ADVANCE_THRESHOLD }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i < consecutiveCorrect
                    ? 'bg-green-500 scale-110'
                    : 'bg-black/[0.08]'
                }`}
              />
            ))}
            <span className="text-xs text-black/30 ml-2">{consecutiveCorrect}/{ADVANCE_THRESHOLD}</span>
          </div>

          {/* Action Buttons */}
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full py-4 bg-black hover:bg-black/85 disabled:opacity-20 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-all duration-200 active:scale-[0.99]"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-black hover:bg-black/85 text-white font-semibold text-base rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              {currentIdx + 1 >= total ? 'See Results' : 'Next Question'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
      {achievementQueue.length > 0 && (
        <AchievementToast
          achievement={achievementQueue[0]}
          onDone={() => setAchievementQueue(q => q.slice(1))}
        />
      )}
      {showAdvanceModal && (
        <AdvanceModal nextLevel={advanceNextLevel} onDone={handleAdvanceDone} />
      )}
    </div>
  );
}
