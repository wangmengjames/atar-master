import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Home, GitBranch, FileText, Dumbbell, BarChart3, DollarSign, LogIn, LogOut, User, Menu, X } from 'lucide-react';
import { useState, lazy, Suspense } from 'react';
import { AuthContext, useAuth, useAuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Lazy-loaded pages for code splitting
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SkillTreePage = lazy(() => import('./pages/SkillTreePage'));
const ExamViewerPage = lazy(() => import('./pages/ExamViewerPage'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gh-accent-blue border-t-transparent" />
    </div>
  );
}

function NavBar() {
  const { user, isPro, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const link = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors';
  const active = 'bg-gh-surface text-gh-accent-blue';
  const inactive = 'text-gh-text-secondary hover:text-gh-text-primary hover:bg-gh-surface/50';

  const navLinks = [
    { to: '/', icon: <Home size={16} />, label: 'Home', end: true },
    { to: '/skill-tree', icon: <GitBranch size={16} />, label: 'Skill Tree' },
    { to: '/exams', icon: <FileText size={16} />, label: 'Exams' },
    { to: '/practice', icon: <Dumbbell size={16} />, label: 'Practice' },
    { to: '/dashboard', icon: <BarChart3 size={16} />, label: 'Dashboard' },
    { to: '/pricing', icon: <DollarSign size={16} />, label: 'Pricing' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gh-border bg-gh-canvas/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-gh-text-primary">
          <span className="text-2xl">🎓</span> ATAR Master
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `${link} ${isActive ? active : inactive}`}>
              {l.icon} {l.label}
            </NavLink>
          ))}
          <div className="ml-2 pl-2 border-l border-gh-border flex items-center gap-2">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 text-sm text-gh-text-secondary">
                  <User size={14} />
                  {user.email?.split('@')[0]}
                  {isPro && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-gh-accent-blue/20 text-gh-accent-blue rounded-full">
                      PRO
                    </span>
                  )}
                </span>
                <button onClick={() => signOut()} className={`${link} ${inactive}`}>
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <NavLink to="/auth" className={({ isActive }) => `${link} ${isActive ? active : inactive}`}>
                <LogIn size={16} /> Sign In
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gh-text-secondary hover:text-gh-text-primary">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gh-border bg-gh-canvas px-4 pb-4 space-y-1">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => `${link} w-full ${isActive ? active : inactive}`}
            >
              {l.icon} {l.label}
            </NavLink>
          ))}
          <div className="border-t border-gh-border pt-2 mt-2">
            {user ? (
              <>
                <span className="flex items-center gap-1.5 px-3 py-2 text-sm text-gh-text-secondary">
                  <User size={14} />
                  {user.email?.split('@')[0]}
                  {isPro && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-gh-accent-blue/20 text-gh-accent-blue rounded-full">
                      PRO
                    </span>
                  )}
                </span>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className={`${link} w-full ${inactive}`}>
                  <LogOut size={16} /> Sign Out
                </button>
              </>
            ) : (
              <NavLink to="/auth" onClick={() => setMobileOpen(false)} className={({ isActive }) => `${link} w-full ${isActive ? active : inactive}`}>
                <LogIn size={16} /> Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gh-canvas text-gh-text-primary font-sans">
      <NavBar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/skill-tree" element={<SkillTreePage />} />
          <Route path="/exams" element={<ExamViewerPage />} />
          <Route path="/practice" element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default function App() {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
