import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import { ToastContext, useToastProvider } from './hooks/useToast';
import AuthGuard from './components/AuthGuard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ToastContainer from './components/Toast';
import './index.css';

// ── Error Boundary ───────────────────────────────────────────
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold text-black mb-2">Something went wrong</h2>
            <p className="text-black/50 mb-6">An unexpected error occurred. Please try refreshing the page.</p>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-black/85 transition text-sm font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SkillTreePage = lazy(() => import('./pages/SkillTreePage'));
const ExamViewerPage = lazy(() => import('./pages/ExamViewerPage'));
const ExamsPage = lazy(() => import('./pages/ExamsPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const TeacherDashboardPage = lazy(() => import('./pages/TeacherDashboardPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const TopicLandingPage = lazy(() => import('./pages/TopicLandingPage'));
const DailyChallengePage = lazy(() => import('./pages/DailyChallengePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));

const FOOTER_PAGES = ['/', '/exams', '/pricing', '/topics', '/privacy', '/terms'];

function PageWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();
  return <div key={location.pathname} className="page-transition">{children}</div>;
}

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const showFooter = FOOTER_PAGES.includes(location.pathname) || location.pathname.startsWith('/topics/');

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-black font-sans flex flex-col">
      {!isLanding && <Navbar />}
      {/* Spacer for fixed navbar */}
      {!isLanding && <div className="h-[57px]" />}
      <main className="flex-1">
        <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <PageWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/topics/:slug" element={<TopicLandingPage />} />
              <Route path="/skill-tree" element={<AuthGuard><SkillTreePage /></AuthGuard>} />
              <Route path="/exams" element={<AuthGuard><ExamsPage /></AuthGuard>} />
              <Route path="/exam-viewer" element={<AuthGuard><ExamViewerPage /></AuthGuard>} />
              <Route path="/practice" element={<AuthGuard><PracticePage /></AuthGuard>} />
              <Route path="/daily" element={<AuthGuard><DailyChallengePage /></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>} />
              <Route path="/teacher" element={<AuthGuard><TeacherDashboardPage /></AuthGuard>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageWrapper>
        </Suspense>
        </ErrorBoundary>
      </main>
      {showFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  const auth = useAuthProvider();
  const toasts = useToastProvider();

  return (
    <AuthContext.Provider value={auth}>
      <ToastContext.Provider value={toasts}>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}
