import { useState, useEffect, useMemo } from 'react';
import { useProgress } from '../hooks/useProgress';
import type { PracticeSession } from '../hooks/useProgress';
import { getAllExams } from '../data/exams';
import { type ExamQuestion, Topic, SKILL_TOPIC_COLORS } from '../types';
import { Play, Shuffle, Target, TrendingUp, Eye, Lightbulb, Check, X, BarChart3, RotateCcw, Sparkles } from 'lucide-react';
import MathText from '../components/MathText';

type Mode = 'topic' | 'exam' | 'random' | 'weak';
type Phase = 'select' | 'practice' | 'summary';

const TOPICS = Object.values(Topic);

export default function PracticePage() {
  const progress = useProgress();
  const [phase, setPhase] = useState<Phase>('select');
  const [mode, setMode] = useState<Mode>('topic');
  const [selectedTopic, setSelectedTopic] = useState<Topic>(Topic.CALCULUS);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<Record<string, 'correct' | 'weak'>>({});

  // MC state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  // SA state
  const [hintsShown, setHintsShown] = useState(0);
  const [answerShown, setAnswerShown] = useState(false);

  const allExams = useMemo(() => getAllExams(), []);
  const currentQ = questions[currentIdx];

  useEffect(() => {
    if (phase === 'practice') progress.startTimer();
    return () => { if (phase === 'practice') progress.stopTimer(); };
  }, [phase]);

  function startPractice() {
    let qs: ExamQuestion[] = [];
    if (mode === 'topic') {
      qs = allExams.flatMap(e => e.questions).filter(q => q.topic === selectedTopic);
    } else if (mode === 'exam') {
      const exam = allExams.find(e => e.id === selectedExamId);
      qs = exam ? [...exam.questions] : [];
    } else if (mode === 'random') {
      const all = allExams.flatMap(e => e.questions);
      qs = shuffle(all).slice(0, 20);
    } else {
      const weakIds = progress.getWeakQuestions();
      qs = allExams.flatMap(e => e.questions).filter(q => weakIds.includes(q.id));
      if (qs.length === 0) {
        const completed = progress.getCompletedQuestions();
        qs = shuffle(allExams.flatMap(e => e.questions).filter(q => !completed.includes(q.id))).slice(0, 10);
      }
    }
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrentIdx(0);
    setResults({});
    resetQState();
    setPhase('practice');
  }

  function resetQState() {
    setSelectedOption(null);
    setHintsShown(0);
    setAnswerShown(false);
  }

  function handleGotIt() {
    progress.markQuestionComplete(currentQ.id);
    setResults(r => ({ ...r, [currentQ.id]: 'correct' }));
    advance();
  }

  function handleNeedMore() {
    progress.markQuestionWeak(currentQ.id);
    setResults(r => ({ ...r, [currentQ.id]: 'weak' }));
    advance();
  }

  function advance() {
    if (currentIdx + 1 >= questions.length) {
      progress.stopTimer();
      const correct = Object.values({ ...results, [currentQ.id]: results[currentQ.id] ?? 'correct' }).filter(v => v === 'correct').length;
      progress.addSession({
        date: new Date().toISOString(),
        mode,
        correct,
        total: questions.length,
      } as PracticeSession);
      setPhase('summary');
    } else {
      setCurrentIdx(i => i + 1);
      resetQState();
    }
  }

  // ── Render helpers ──────────────────────────────────────────

  const isMC = currentQ?.options && currentQ.options.length > 0;
  const answered = isMC ? selectedOption !== null : answerShown;

  const correctCount = Object.values(results).filter(v => v === 'correct').length;
  const weakCount = Object.values(results).filter(v => v === 'weak').length;

  // ── SELECT phase ────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold mb-2 text-gh-text-primary">Practice Mode</h1>
        <p className="text-gh-text-secondary mb-8">Choose how you want to practice</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {([
            { m: 'topic' as Mode, icon: <Target size={20} />, label: 'By Topic', desc: 'Focus on one topic' },
            { m: 'exam' as Mode, icon: <BarChart3 size={20} />, label: 'By Exam', desc: 'Practice a full exam' },
            { m: 'random' as Mode, icon: <Shuffle size={20} />, label: 'Random Mix', desc: '20 random questions' },
            { m: 'weak' as Mode, icon: <TrendingUp size={20} />, label: 'Weak Areas', desc: 'Questions you struggled with' },
          ]).map(({ m, icon, label, desc }) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`p-5 rounded-xl border text-left transition-all ${mode === m ? 'border-black/20 bg-black/[0.03]' : 'border-gh-border bg-gh-surface hover:border-black/20'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-gh-text-primary font-semibold">{icon} {label}</div>
              <div className="text-sm text-gh-text-secondary">{desc}</div>
            </button>
          ))}
        </div>

        {mode === 'topic' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gh-text-secondary mb-2">Select Topic</label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map(t => {
                const color = SKILL_TOPIC_COLORS[t];
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
                    style={{
                      borderColor: selectedTopic === t ? color?.primary : 'var(--gh-border)',
                      background: selectedTopic === t ? color?.bg : 'transparent',
                      color: selectedTopic === t ? color?.primary : 'var(--gh-text-secondary)',
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {mode === 'exam' && (
          <div className="mb-8">
            <label className="block text-sm font-medium text-gh-text-secondary mb-2">Select Exam</label>
            <select
              className="w-full bg-gh-surface border border-gh-border rounded-lg px-4 py-2 text-gh-text-primary"
              value={selectedExamId}
              onChange={e => setSelectedExamId(e.target.value)}
            >
              <option value="">-- Choose --</option>
              {allExams.map(e => (
                <option key={e.id} value={e.id}>{e.title} ({e.year})</option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={startPractice}
          disabled={mode === 'exam' && !selectedExamId}
          className="flex items-center gap-2 px-6 py-3 bg-gh-overlay border border-gh-border text-gh-text-primary font-semibold rounded-xl hover:bg-gh-border transition disabled:opacity-40"
        >
          <Play size={18} /> Start Practice
        </button>
      </div>
    );
  }

  // ── PRACTICE phase ──────────────────────────────────────────
  if (phase === 'practice' && currentQ) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gh-text-secondary">
            Question {currentIdx + 1} / {questions.length}
          </span>
          <span className="text-xs px-2 py-1 rounded-full" style={{
            background: SKILL_TOPIC_COLORS[currentQ.topic]?.bg,
            color: SKILL_TOPIC_COLORS[currentQ.topic]?.primary,
          }}>
            {currentQ.topic}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gh-surface rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gh-accent-blue rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-gh-surface border border-gh-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-gh-text-secondary">Q{currentQ.number}</span>
            <span className="text-xs text-gh-text-secondary">({currentQ.marks} mark{currentQ.marks > 1 ? 's' : ''})</span>
          </div>
          <div className="text-gh-text-primary whitespace-pre-wrap leading-relaxed"><MathText text={currentQ.text} /></div>
        </div>

        {/* MC options */}
        {isMC && (
          <div className="space-y-3 mb-6">
            {currentQ.options!.map(opt => {
              const isSelected = selectedOption === opt.label;
              const isCorrect = opt.label === currentQ.answer;
              const showResult = selectedOption !== null;
              let borderColor = 'border-gh-border';
              let bg = 'bg-gh-canvas';
              if (showResult && isCorrect) { borderColor = 'border-green-500'; bg = 'bg-green-500/10'; }
              else if (showResult && isSelected && !isCorrect) { borderColor = 'border-red-500'; bg = 'bg-red-500/10'; }
              else if (isSelected) { borderColor = 'border-gh-accent-blue'; }

              return (
                <button
                  key={opt.label}
                  disabled={showResult}
                  onClick={() => setSelectedOption(opt.label)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${borderColor} ${bg}`}
                >
                  <span className="font-bold mr-3 text-gh-text-secondary">{opt.label}.</span>
                  <span className="text-gh-text-primary"><MathText text={opt.text} /></span>
                  {showResult && isCorrect && <Check className="inline ml-2 text-green-400" size={16} />}
                  {showResult && isSelected && !isCorrect && <X className="inline ml-2 text-red-400" size={16} />}
                </button>
              );
            })}
          </div>
        )}

        {/* SA controls */}
        {!isMC && (
          <div className="space-y-4 mb-6">
            {/* Hints */}
            {currentQ.markingGuide && currentQ.markingGuide.length > 0 && hintsShown < currentQ.markingGuide.length && !answerShown && (
              <button
                onClick={() => setHintsShown(h => h + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-gh-overlay text-gh-text-primary border border-gh-border rounded-lg hover:bg-gh-border transition"
              >
                <Lightbulb size={16} /> Show Hint ({hintsShown}/{currentQ.markingGuide.length})
              </button>
            )}

            {hintsShown > 0 && !answerShown && (
              <div className="bg-gh-overlay border border-gh-border rounded-xl p-4 space-y-2">
                {currentQ.markingGuide.slice(0, hintsShown).map((h, i) => (
                  <div key={i} className="text-sm text-gh-text-secondary flex items-start gap-2"><Lightbulb size={14} className="mt-0.5 shrink-0" /> <MathText text={h} /></div>
                ))}
              </div>
            )}

            {!answerShown && (
              <button
                onClick={() => setAnswerShown(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gh-overlay text-gh-text-primary border border-gh-border rounded-lg hover:bg-gh-border transition"
              >
                <Eye size={16} /> Show Answer
              </button>
            )}

            {answerShown && (
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
                <div className="text-sm font-semibold text-green-400 mb-2">Answer:</div>
                <div className="text-gh-text-primary whitespace-pre-wrap"><MathText text={currentQ.answer} /></div>
                {currentQ.markingGuide.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gh-border">
                    <div className="text-sm font-semibold text-gh-text-secondary mb-1">Marking Guide:</div>
                    {currentQ.markingGuide.map((m, i) => (
                      <div key={i} className="text-sm text-gh-text-secondary">• <MathText text={m} /></div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Self-assessment */}
        {answered && (
          <div className="flex gap-3">
            <button onClick={handleGotIt} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gh-overlay border border-gh-border hover:bg-gh-border text-gh-text-primary font-semibold rounded-xl transition">
              <Check size={18} /> Got it
            </button>
            <button onClick={handleNeedMore} className="flex-1 flex items-center justify-center gap-2 py-3 bg-gh-overlay border border-gh-border hover:bg-gh-border text-gh-text-primary font-semibold rounded-xl transition">
              <X size={18} /> Need more practice
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── SUMMARY phase ───────────────────────────────────────────
  if (phase === 'summary') {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="flex justify-center mb-4"><Sparkles className="h-10 w-10 text-gh-text-secondary" /></div>
        <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
        <p className="text-gh-text-secondary mb-8">Here's how you did</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{correctCount}</div>
            <div className="text-sm text-gh-text-secondary">Got it</div>
          </div>
          <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400">{weakCount}</div>
            <div className="text-sm text-gh-text-secondary">Need practice</div>
          </div>
        </div>

        <div className="w-full bg-gh-surface rounded-full h-4 mb-2 overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${questions.length ? (correctCount / questions.length) * 100 : 0}%` }} />
        </div>
        <p className="text-sm text-gh-text-secondary mb-8">{questions.length ? Math.round((correctCount / questions.length) * 100) : 0}% mastery</p>

        <div className="flex gap-3 justify-center">
          <button onClick={() => { resetQState(); setPhase('select'); }} className="flex items-center gap-2 px-5 py-3 bg-gh-surface border border-gh-border rounded-xl hover:bg-gh-border/30 transition text-gh-text-primary font-medium">
            <RotateCcw size={16} /> New Practice
          </button>
          <button onClick={() => { setCurrentIdx(0); resetQState(); setResults({}); setPhase('practice'); }} className="flex items-center gap-2 px-5 py-3 bg-gh-overlay border border-gh-border text-gh-text-primary rounded-xl hover:bg-gh-border transition font-medium">
            <RotateCcw size={16} /> Retry Same
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
