import { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Check, X, Trophy, Clock, Zap, Flame, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import {
  getDailyChallenge,
  getDailyChallengeState,
  saveDailyChallengeResult,
  getSecondsUntilRefresh,
} from '../lib/dailyChallenge';
import { recordActivity } from '../lib/streak';
import type { TrainingQuestion } from '../data/training/types';
import MathText from '../components/MathText';
import { Link } from 'react-router-dom';

function formatCountdown(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

const OPTION_KEYS = ['a', 'b', 'c', 'd', 'e'];

export default function DailyChallengePage() {
  const existingState = useMemo(() => getDailyChallengeState(), []);
  const questions = useMemo(() => existingState?.questions || getDailyChallenge(), [existingState]);
  const [completed, setCompleted] = useState(existingState?.completed || false);
  const [finalState, setFinalState] = useState(existingState);

  // Countdown
  const [countdown, setCountdown] = useState(getSecondsUntilRefresh());
  useEffect(() => {
    const t = setInterval(() => setCountdown(getSecondsUntilRefresh()), 1000);
    return () => clearInterval(t);
  }, []);

  // Quiz state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState(Date.now());

  const current = questions[currentIdx] as TrainingQuestion | undefined;
  const total = questions.length;
  const correctCount = Object.values(results).filter(Boolean).length;

  const todayStr = new Date().toLocaleDateString('en-AU', {
    timeZone: 'Australia/Melbourne',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

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
      // Finish
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const finalCorrect = Object.values({ ...results, [currentIdx]: results[currentIdx] }).filter(Boolean).length;
      const state = saveDailyChallengeResult(finalCorrect, total, timeSpent);
      recordActivity();
      window.dispatchEvent(new Event('streak-updated'));
      setFinalState(state);
      setCompleted(true);
      return;
    }
    setFeedbackVisible(false);
    setCurrentIdx(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
  }, [currentIdx, total, results, startTime]);

  // Keyboard shortcuts
  useEffect(() => {
    if (completed) return;
    const handler = (e: KeyboardEvent) => {
      if (!current) return;
      const key = e.key.toLowerCase();
      if (!isAnswered && current.options) {
        const idx = OPTION_KEYS.indexOf(key);
        if (idx !== -1 && idx < current.options.length) {
          handleSelect(current.options[idx].label);
          return;
        }
      }
      if (key === 'enter') {
        e.preventDefault();
        if (!isAnswered && selectedOption) handleSubmit();
        else if (isAnswered) handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [completed, current, isAnswered, selectedOption, handleSelect, handleSubmit, handleNext]);

  // ── Header ──
  const header = (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/15 text-yellow-400 text-sm font-semibold mb-3">
        <Zap size={16} /> Daily Challenge
      </div>
      <h1 className="text-2xl font-bold text-white mb-1">{todayStr}</h1>
      <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
        <Clock size={14} /> Refreshes in {formatCountdown(countdown)}
      </p>
    </div>
  );

  // ── Completed View ──
  if (completed && finalState) {
    const pct = finalState.total ? Math.round((finalState.score! / finalState.total) * 100) : 0;
    const circumference = 2 * Math.PI * 54;
    const strokeDash = (pct / 100) * circumference;

    return (
      <div className="min-h-[calc(100vh-57px)] bg-gray-900 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {header}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-2xl p-8 text-center backdrop-blur">
            {/* Circular progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#1f2937" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={pct >= 60 ? '#22c55e' : '#f97316'}
                  strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{finalState.score}/{finalState.total}</span>
                <span className="text-sm text-gray-400">{pct}%</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 bg-green-500/20 text-green-400">
              <Trophy size={16} /> Challenge Complete!
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <Clock size={18} className="text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{formatTime(finalState.timeSpent || 0)}</div>
                <div className="text-xs text-gray-400">Time Spent</div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <Flame size={18} className="text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{finalState.streak || 1}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
            </div>

            <p className="text-gray-400 mb-6">Come back tomorrow for a new challenge! 🌟</p>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── No questions ──
  if (!current) {
    return (
      <div className="min-h-[calc(100vh-57px)] bg-gray-900 flex items-center justify-center p-6">
        <div className="text-center">
          {header}
          <p className="text-gray-400">No questions available today.</p>
        </div>
      </div>
    );
  }

  // ── Quiz View ──
  const isCorrect = results[currentIdx];
  const correctOption = current.options?.find(o => o.correct);
  const progressPct = ((currentIdx + (isAnswered ? 1 : 0)) / total) * 100;
  const levelLabels = ['L1 · Easy', 'L2 · Basic', 'L3 · Medium', 'L4 · Hard', 'L5 · Expert'];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gray-900 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-[57px] z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800/50 px-4 sm:px-6 pt-4 pb-3">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-400">Daily Challenge</span>
            </div>
            <span className="text-sm text-gray-300">
              <span className="text-white font-bold">{currentIdx + 1}</span> / {total}
            </span>
            <span className="text-xs text-gray-500">{formatCountdown(countdown)}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all ${
                  i < currentIdx ? (results[i] ? 'bg-green-500' : 'bg-red-500')
                    : i === currentIdx ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 border border-gray-700/40 rounded-2xl p-5 sm:p-7 mb-5">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
                {levelLabels[current.level - 1] || `L${current.level}`}
              </span>
              {current.marks && (
                <span className="text-xs text-gray-400 bg-gray-700/60 px-2.5 py-0.5 rounded-full">
                  {current.marks} {current.marks === 1 ? 'mark' : 'marks'}
                </span>
              )}
            </div>
            <div className="text-lg text-white leading-relaxed">
              <MathText text={current.text} />
            </div>
          </div>

          {/* Options */}
          {current.options && current.options.length > 0 && (
            <div className="space-y-3 mb-5">
              {current.options.map((opt, idx) => {
                const isSelected = selectedOption === opt.label;
                let border = 'border-gray-700/40';
                let bg = 'bg-gray-800/30';
                let labelBg = 'bg-gray-700 text-gray-400';
                let textColor = 'text-gray-300';
                let icon: React.ReactNode = opt.label;
                let ringClass = '';

                if (isAnswered) {
                  if (opt.correct) {
                    border = 'border-green-500/60'; bg = 'bg-green-500/10';
                    labelBg = 'bg-green-500 text-white'; textColor = 'text-green-200';
                    icon = <Check size={14} strokeWidth={3} />;
                  } else if (isSelected && !opt.correct) {
                    border = 'border-red-500/60'; bg = 'bg-red-500/10';
                    labelBg = 'bg-red-500 text-white'; textColor = 'text-red-200';
                    icon = <X size={14} strokeWidth={3} />;
                  } else { textColor = 'text-gray-500'; }
                } else if (isSelected) {
                  border = 'border-blue-500/60'; bg = 'bg-blue-500/10';
                  labelBg = 'bg-blue-500 text-white'; textColor = 'text-blue-100';
                  ringClass = 'ring-1 ring-blue-500/30';
                }

                return (
                  <button
                    key={opt.label}
                    onClick={() => handleSelect(opt.label)}
                    disabled={isAnswered}
                    className={`w-full flex items-center gap-4 py-5 px-6 rounded-xl border transition-all duration-200 ${border} ${bg} ${ringClass} ${
                      !isAnswered ? 'hover:border-blue-500/40 hover:bg-blue-500/5 cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${labelBg}`}>
                      {icon}
                    </div>
                    <span className={`text-left text-base leading-relaxed ${textColor}`}>
                      <MathText text={opt.text} />
                    </span>
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

          {/* Hint */}
          {!isAnswered && current.hints && current.hints.length > 0 && (
            <div className="mb-5">
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="flex items-center gap-2 text-sm text-yellow-500/70 hover:text-yellow-400 transition-colors"
              >
                <Lightbulb size={15} /> Need a hint?
                {showHint ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showHint && (
                <div className="mt-3 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                  <div className="text-sm text-yellow-200/80"><MathText text={current.hints[0]} /></div>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {isAnswered && (
            <div className={`mb-5 rounded-xl border p-5 transition-all duration-300 ${
              feedbackVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            } ${isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className={`text-base font-semibold mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              {!isCorrect && correctOption && (
                <p className="text-sm text-gray-300 mb-2">
                  The answer is <span className="font-bold text-white">{correctOption.label}</span>
                </p>
              )}
              {current.answer && (
                <div className="text-sm text-gray-300"><MathText text={current.answer} /></div>
              )}
            </div>
          )}

          {/* Action */}
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
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
