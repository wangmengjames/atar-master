import { useState, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Download, Lock, Crown, ChevronDown, ChevronUp, Play, BookOpen, Flame, CheckCircle, Tag, BarChart3, Clock } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import AuthModal from '../components/AuthModal'
import { getAllExams } from '../data/exams'
import type { ExamPaper, ExamQuestion } from '../types'
import { SKILL_TOPIC_COLORS } from '../types'
import { formatEstimatedTime } from '../lib/utils'

const ALL_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016]
const FREE_YEARS = new Set([2018, 2019, 2020])
const RECOMMENDED_YEARS = new Set([2021, 2022, 2023, 2024, 2025])

// Difficulty ratings by year (curated)
const DIFFICULTY_RATINGS: Record<number, { label: string; color: string }> = {
  2016: { label: 'Average', color: 'text-gh-text-secondary' },
  2017: { label: 'Average', color: 'text-gh-text-secondary' },
  2018: { label: 'Slightly easier', color: 'text-gh-text-secondary' },
  2019: { label: 'Hard', color: 'text-gh-text-secondary' },
  2020: { label: 'Average', color: 'text-gh-text-secondary' },
  2021: { label: 'Harder than usual', color: 'text-gh-text-secondary' },
  2022: { label: 'Average', color: 'text-gh-text-secondary' },
  2023: { label: 'Hard', color: 'text-gh-text-secondary' },
  2024: { label: 'Slightly easier', color: 'text-gh-text-secondary' },
  2025: { label: 'Average', color: 'text-gh-text-secondary' },
}

interface YearData {
  year: number
  exams: ExamPaper[]
  totalQuestions: number
  totalMarks: number
  topSubTopics: string[]
}

function flattenQuestions(q: ExamQuestion): ExamQuestion[] {
  if (q.subQuestions && q.subQuestions.length > 0) {
    return q.subQuestions.flatMap(flattenQuestions)
  }
  return [q]
}

function buildYearData(year: number, allExams: ExamPaper[]): YearData {
  const exams = allExams.filter(e => e.year === year)
  const allQs = exams.flatMap(e => e.questions.flatMap(flattenQuestions))
  const totalMarks = allQs.reduce((s, q) => s + q.marks, 0)

  // Top subTopics by frequency
  const subTopicCount: Record<string, number> = {}
  for (const q of allQs) {
    const st = q.subTopic || q.topic
    subTopicCount[st] = (subTopicCount[st] || 0) + 1
  }
  const topSubTopics = Object.entries(subTopicCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name)

  return { year, exams, totalQuestions: allQs.length, totalMarks, topSubTopics }
}

function ExamCard({ data, examIndex }: { data: YearData; examIndex: 0 | 1 }) {
  const exam = data.exams[examIndex]
  if (!exam) return null

  const questions = exam.questions.flatMap(flattenQuestions)
  const marks = questions.reduce((s, q) => s + q.marks, 0)

  return (
    <div className="mt-3 bg-gh-canvas/50 rounded-xl border border-gh-border/50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gh-border/50 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gh-text-primary">{exam.title}</h4>
        <span className="text-xs text-gh-text-muted">{questions.length} questions · {marks} marks</span>
      </div>
      <div className="divide-y divide-gh-border/30">
        {exam.questions.map(q => (
          <QuestionRow key={q.id} question={q} depth={0} />
        ))}
      </div>
    </div>
  )
}

function QuestionRow({ question, depth }: { question: ExamQuestion; depth: number }) {
  const topicColor = SKILL_TOPIC_COLORS[question.topic]
  const hasSubs = question.subQuestions && question.subQuestions.length > 0

  return (
    <>
      <div className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gh-overlay/30 transition ${depth > 0 ? 'pl-8' : ''}`}>
        <span className="text-gh-text-secondary font-mono text-xs w-24 shrink-0">{question.number}</span>
        <Link
          to={`/skill-tree`}
          className="text-xs px-2 py-0.5 rounded-full shrink-0 hover:opacity-80 transition"
          style={{
            backgroundColor: topicColor?.bg || 'rgba(139,148,158,0.15)',
            color: topicColor?.primary || '#8b949e',
          }}
        >
          {question.subTopic || question.topic}
        </Link>
        <span className="ml-auto text-xs text-gh-text-muted shrink-0">{question.marks} mk{question.marks !== 1 ? 's' : ''}</span>
      </div>
      {hasSubs && question.subQuestions!.map(sq => (
        <QuestionRow key={sq.id} question={sq} depth={depth + 1} />
      ))}
    </>
  )
}

export default function ExamsPage() {
  const { user, isPro } = useAuth()
  const navigate = useNavigate()
  const [showAuth, setShowAuth] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  const allExams = useMemo(() => getAllExams(), [])
  const yearDataMap = useMemo(() => {
    const m: Record<number, YearData> = {}
    for (const y of ALL_YEARS) m[y] = buildYearData(y, allExams)
    return m
  }, [allExams])

  const canDownload = (year: number) => isPro || FREE_YEARS.has(year)

  const handleDownload = (year: number, exam: 1 | 2) => {
    if (!user) { setShowAuth(true); return }
    if (!canDownload(year)) { setShowUpgrade(true); return }
    const suffix = exam === 1 ? 'exam1' : 'exam2'
    window.open(`/pdfs/mm-${year}-${suffix}-guide.pdf`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gh-canvas">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gh-text-primary mb-2">VCE Methods Exam Papers</h1>
          <p className="text-gh-text-secondary">Past exams with marking guides, difficulty ratings & question breakdowns</p>
        </div>

        <div className="flex flex-col gap-4">
          {ALL_YEARS.map(year => {
            const isFree = FREE_YEARS.has(year)
            const unlocked = canDownload(year)
            const isRecommended = RECOMMENDED_YEARS.has(year)
            const expanded = expandedYear === year
            const data = yearDataMap[year]
            const diff = DIFFICULTY_RATINGS[year]

            return (
              <div key={year} className={`rounded-2xl border bg-gh-surface transition-all ${
                isRecommended ? 'border-gh-border/80' : 'border-gh-border'
              } ${unlocked ? 'hover:border-gh-text-muted' : 'opacity-85'}`}>
                {/* Main card content */}
                <div className="p-5">
                  {/* Top row: year + badges */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h2 className="text-2xl font-bold text-gh-text-primary">{year}</h2>
                      {isFree ? (
                        <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-gh-overlay text-gh-text-secondary border border-gh-border">FREE</span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-gh-overlay text-gh-text-secondary border border-gh-border">
                          <Crown size={11} /> PRO
                        </span>
                      )}
                      {isRecommended && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-bold rounded-full bg-gh-overlay text-gh-text-secondary border border-gh-border">
                          <Flame size={11} /> Relevant
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gh-text-secondary mb-3">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 size={12} /> <span className={diff?.color || ''}>{diff?.label || 'N/A'}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={12} /> {data.totalQuestions} questions · {data.totalMarks} marks
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> {formatEstimatedTime(data.totalMarks * 1.5)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-gh-text-secondary" /> Includes marking guide
                    </span>
                  </div>

                  {/* SubTopic tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {data.topSubTopics.map(st => (
                      <span key={st} className="flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full bg-gh-overlay text-gh-text-muted border border-gh-border/50">
                        <Tag size={10} /> {st}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleDownload(year, 1)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        unlocked ? 'bg-gh-overlay text-gh-text-primary hover:bg-gh-border border border-gh-border' : 'bg-gh-overlay text-gh-text-muted hover:bg-gh-border border border-gh-border'
                      }`}
                    >
                      {unlocked ? <Download size={14} /> : <Lock size={14} />} Exam 1
                    </button>
                    <button
                      onClick={() => handleDownload(year, 2)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                        unlocked ? 'bg-gh-overlay text-gh-text-primary hover:bg-gh-border border border-gh-border' : 'bg-gh-overlay text-gh-text-muted hover:bg-gh-border border border-gh-border'
                      }`}
                    >
                      {unlocked ? <Download size={14} /> : <Lock size={14} />} Exam 2
                    </button>
                    <button
                      onClick={() => navigate(`/practice?year=${year}`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gh-overlay border border-gh-border text-gh-text-primary hover:bg-gh-border transition"
                    >
                      <Play size={14} /> Practice this exam
                    </button>
                    <button
                      onClick={() => setExpandedYear(expanded ? null : year)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-gh-overlay text-gh-text-secondary hover:bg-gh-border transition ml-auto"
                    >
                      <BookOpen size={14} /> Questions {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Expanded question list */}
                {expanded && (
                  <div className="px-5 pb-5 space-y-2">
                    <ExamCard data={data} examIndex={0} />
                    <ExamCard data={data} examIndex={1} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Pro upsell banner */}
        {!isPro && user && (
          <div className="mt-10 rounded-2xl border border-gh-border bg-gh-surface p-6 text-center">
            <Crown className="mx-auto h-8 w-8 text-gh-text-secondary mb-3" />
            <h3 className="text-lg font-bold text-gh-text-primary mb-1">Unlock All Exam Papers</h3>
            <p className="text-sm text-gh-text-secondary mb-4">Upgrade to Pro to download all years of past exams</p>
            <button onClick={() => navigate('/pricing')}
              className="px-6 py-2.5 bg-gh-overlay border border-gh-border hover:bg-gh-border text-gh-text-primary font-medium rounded-lg transition text-sm">
              View Pricing
            </button>
          </div>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} message="Sign in to download exams" />}
      {showUpgrade && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowUpgrade(false)}>
          <div className="bg-gh-surface border border-gh-border rounded-2xl p-8 max-w-sm text-center" onClick={e => e.stopPropagation()}>
            <Crown className="mx-auto h-10 w-10 text-gh-text-secondary mb-3" />
            <h3 className="text-lg font-bold text-gh-text-primary mb-2">Pro Feature</h3>
            <p className="text-sm text-gh-text-secondary mb-5">This exam paper is available with a Pro subscription.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowUpgrade(false)}
                className="flex-1 py-2.5 rounded-lg border border-gh-border text-gh-text-secondary hover:bg-gh-overlay transition text-sm">
                Cancel
              </button>
              <button onClick={() => { setShowUpgrade(false); navigate('/pricing') }}
                className="flex-1 py-2.5 rounded-lg bg-gh-overlay border border-gh-border hover:bg-gh-border text-gh-text-primary font-medium transition text-sm">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
