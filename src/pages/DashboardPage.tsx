import { useMemo, useState, useEffect } from 'react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../hooks/useAuth';
import { getAllExams } from '../data/exams';
import { Topic, SKILL_TOPIC_COLORS } from '../types';
import { loadProgress } from '../lib/progress';
import {
  Flame, Clock, CheckCircle2, TrendingUp, Play, Save, Crown, ExternalLink,
  User as UserIcon, Mail, School, GraduationCap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AchievementPanel from '../components/AchievementPanel';
import { getDailyChallengeState } from '../lib/dailyChallenge';

const TOPICS = Object.values(Topic);
const YEAR_LEVELS = ['Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12'];

interface ProfileData {
  displayName: string;
  school: string;
  yearLevel: string;
}

function loadProfile(): ProfileData {
  try {
    const raw = localStorage.getItem('atar-profile');
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { displayName: '', school: '', yearLevel: '' };
}
function saveProfileData(p: ProfileData) {
  localStorage.setItem('atar-profile', JSON.stringify(p));
}

export default function DashboardPage() {
  const { user, isPro } = useAuth();
  const progress = useProgress();
  const overall = progress.getOverallProgress();
  const streak = progress.getStreak();
  const practiceTime = progress.getTotalPracticeTime();
  const sessions = progress.getRecentSessions();
  const weakCount = progress.getWeakQuestions().length;

  // Skill tree progress
  const skillTreeProgress = useMemo(() => {
    const p = loadProgress();
    const completed = Object.values(p.nodes).filter(
      n => n.status === 'completed' || n.status === 'mastered'
    ).length;
    return completed;
  }, []);

  // Profile
  const dailyState = useMemo(() => getDailyChallengeState(), []);
  const [profile, setProfile] = useState<ProfileData>(loadProfile);
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    if (user && !profile.displayName) {
      setProfile(prev => ({
        ...prev,
        displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
      }));
    }
  }, [user, profile.displayName]);

  const handleSaveProfile = () => {
    saveProfileData(profile);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const topicData = useMemo(() =>
    TOPICS.map(t => ({ topic: t, ...progress.getTopicProgress(t) })).filter(t => t.total > 0),
    [progress]
  );

  const allExams = useMemo(() => getAllExams(), []);

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-gh-border" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gh-surface border-2 border-gh-border flex items-center justify-center">
            <UserIcon size={28} className="text-gh-text-secondary" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}</h1>
          <p className="text-sm text-gh-text-secondary">{user?.email}</p>
          {isPro && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-xs font-bold bg-gh-accent-blue/20 text-gh-accent-blue rounded-full">
              <Crown size={12} /> PRO
            </span>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {([
          { icon: <CheckCircle2 size={20} className="text-green-400" />, value: `${overall.completed}/${overall.total}`, label: 'Questions Done' },
          { icon: <Flame size={20} className="text-orange-400" />, value: `${streak}`, label: 'Day Streak' },
          { icon: <Clock size={20} className="text-blue-400" />, value: `${Math.round(practiceTime)}m`, label: 'Practice Time' },
          { icon: <TrendingUp size={20} className="text-purple-400" />, value: `${skillTreeProgress}/31`, label: 'Skills Completed' },
        ]).map((s, i) => (
          <div key={i} className="bg-gh-surface border border-gh-border rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-gh-text-primary">{s.value}</div>
            <div className="text-xs text-gh-text-secondary">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Daily Challenge Card */}
      <div className="bg-gh-surface border border-gh-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-gh-text-primary">
              <Flame size={16} /> Daily Challenge
            </h2>
            {dailyState?.completed ? (
              <p className="text-sm text-gray-400 mt-1">
                Today's score: <span className="text-gh-text-primary font-bold">{dailyState.score}/{dailyState.total}</span> — Come back tomorrow!
              </p>
            ) : (
              <p className="text-sm text-gray-400 mt-1">5 mixed-difficulty questions. New challenge every day!</p>
            )}
          </div>
          <Link
            to="/daily"
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition border ${
              dailyState?.completed
                ? 'bg-gh-overlay border-gh-border text-gh-text-secondary hover:bg-gh-border'
                : 'bg-gh-overlay border-gh-border text-gh-text-primary hover:bg-gh-border'
            }`}
          >
            {dailyState?.completed ? 'View Results' : 'Start Challenge'}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile Section */}
        <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><UserIcon size={18} /> Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gh-text-secondary flex items-center gap-1 mb-1"><Mail size={12} /> Email</label>
              <input disabled value={user?.email || ''} className="w-full px-3 py-2 bg-gh-canvas border border-gh-border rounded-lg text-sm text-gh-text-secondary" />
            </div>
            <div>
              <label className="text-xs text-gh-text-secondary flex items-center gap-1 mb-1"><UserIcon size={12} /> Display Name</label>
              <input
                value={profile.displayName}
                onChange={e => setProfile(p => ({ ...p, displayName: e.target.value }))}
                className="w-full px-3 py-2 bg-gh-canvas border border-gh-border rounded-lg text-sm text-gh-text-primary focus:border-gh-accent-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gh-text-secondary flex items-center gap-1 mb-1"><School size={12} /> School</label>
              <input
                value={profile.school}
                onChange={e => setProfile(p => ({ ...p, school: e.target.value }))}
                placeholder="Enter your school"
                className="w-full px-3 py-2 bg-gh-canvas border border-gh-border rounded-lg text-sm text-gh-text-primary focus:border-gh-accent-blue focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gh-text-secondary flex items-center gap-1 mb-1"><GraduationCap size={12} /> Year Level</label>
              <select
                value={profile.yearLevel}
                onChange={e => setProfile(p => ({ ...p, yearLevel: e.target.value }))}
                className="w-full px-3 py-2 bg-gh-canvas border border-gh-border rounded-lg text-sm text-gh-text-primary focus:border-gh-accent-blue focus:outline-none"
              >
                <option value="">Select year level</option>
                {YEAR_LEVELS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 px-4 py-2 bg-gh-overlay border border-gh-border text-gh-text-primary text-sm font-medium rounded-lg hover:bg-gh-border transition"
            >
              <Save size={14} /> {profileSaved ? 'Saved' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Crown size={18} /> Subscription</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gh-text-secondary">Current Plan</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${isPro ? 'bg-gh-accent-blue/20 text-gh-accent-blue' : 'bg-gray-700 text-gray-300'}`}>
                {isPro ? 'Pro' : 'Free'}
              </span>
            </div>
            {isPro ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gh-text-secondary">Status</span>
                  <span className="text-sm text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gh-text-secondary">Next billing</span>
                  <span className="text-sm text-gh-text-secondary">—</span>
                </div>
                <Link
                  to="/pricing"
                  className="flex items-center gap-2 text-sm text-gh-accent-blue hover:underline"
                >
                  <ExternalLink size={14} /> Manage Subscription
                </Link>
              </>
            ) : (
              <div>
                <p className="text-sm text-gh-text-secondary mb-4">Upgrade to Pro for unlimited access to all exams, practice questions, and skill trees.</p>
                <Link
                  to="/pricing"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gh-overlay border border-gh-border text-gh-text-primary font-semibold rounded-xl hover:bg-gh-border transition"
                >
                  <Crown size={16} /> Upgrade to Pro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Topic progress */}
      <div className="bg-gh-surface border border-gh-border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Topic Mastery</h2>
        <div className="space-y-4">
          {topicData.map(({ topic, completed, total }) => {
            const pct = total ? Math.round((completed / total) * 100) : 0;
            const color = SKILL_TOPIC_COLORS[topic];
            return (
              <div key={topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span style={{ color: color?.primary }}>{topic}</span>
                  <span className="text-gh-text-secondary">{completed}/{total} ({pct}%)</span>
                </div>
                <div className="w-full h-2 bg-gh-canvas rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color?.primary }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent sessions + recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Practice</h2>
          {sessions.length === 0 ? (
            <p className="text-sm text-gh-text-secondary">No practice sessions yet. Start one!</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {sessions.slice(0, 5).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gh-text-primary capitalize">{s.mode}</span>
                    <span className="text-gh-text-secondary ml-2">{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                  <span className={s.correct / s.total >= 0.7 ? 'text-green-400' : 'text-yellow-400'}>
                    {s.correct}/{s.total}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gh-surface border border-gh-border rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp size={16} /> Recommended Next</h2>
          <p className="text-gh-text-secondary text-sm mb-4 flex-1">
            {weakCount > 0
              ? `You have ${weakCount} questions to revisit. Let's strengthen those weak spots!`
              : 'Keep practicing to improve your weakest topics!'
            }
          </p>
          <Link
            to="/practice"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gh-overlay border border-gh-border text-gh-text-primary font-semibold rounded-xl hover:bg-gh-border transition"
          >
            <Play size={16} /> Start Practice
          </Link>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <AchievementPanel />
      </div>

      {/* Exam progress */}
      <div className="bg-gh-surface border border-gh-border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Exam Completion</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allExams.map(exam => {
            const ep = progress.getExamProgress(exam.id);
            return (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gh-canvas rounded-lg border border-gh-border">
                <span className="text-sm text-gh-text-primary">{exam.title}</span>
                <span className="text-xs text-gh-text-secondary">{ep.percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
