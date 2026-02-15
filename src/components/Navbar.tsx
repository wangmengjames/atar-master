import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { GitBranch, FileText, Dumbbell, BarChart3, DollarSign, LogIn, LogOut, User, Menu, X, Shield, ChevronDown, Zap } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDailyChallengeState } from '../lib/dailyChallenge';
import { ADMIN_EMAILS } from '../lib/constants';
import StreakBadge from './StreakBadge';
import ThemeSwitcher from './ThemeSwitcher';

function UserDropdown() {
  const { user, isPro, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isAdmin = ADMIN_EMAILS.includes(user?.email || '');

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gh-surface/50 transition"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gh-surface flex items-center justify-center">
            <User size={14} className="text-gh-text-secondary" />
          </div>
        )}
        <span className="text-sm text-gh-text-secondary hidden sm:inline">
          {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
        </span>
        {isPro && (
          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-gh-accent-blue/20 text-gh-accent-blue rounded-full">PRO</span>
        )}
        <ChevronDown size={14} className="text-gh-text-secondary" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-gh-surface border border-gh-border rounded-xl shadow-lg py-1 z-50">
          <button
            onClick={() => { navigate('/dashboard'); setOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gh-text-primary hover:bg-gh-canvas transition"
          >
            <BarChart3 size={14} /> Dashboard
          </button>
          {isAdmin && (
            <button
              onClick={() => { navigate('/teacher'); setOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gh-text-primary hover:bg-gh-canvas transition"
            >
              <Shield size={14} /> Teacher Dashboard
            </button>
          )}
          <div className="border-t border-gh-border my-1" />
          <button
            onClick={() => { signOut(); setOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gh-canvas transition"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

const NAV_LINKS = [
  { to: '/skill-tree', icon: <GitBranch size={16} />, label: 'Skill Tree' },
  { to: '/exams', icon: <FileText size={16} />, label: 'Exams' },
  { to: '/practice', icon: <Dumbbell size={16} />, label: 'Practice' },
  { to: '/daily', icon: <Zap size={16} />, label: 'Daily', showDot: true },
  { to: '/dashboard', icon: <BarChart3 size={16} />, label: 'Dashboard' },
  { to: '/pricing', icon: <DollarSign size={16} />, label: 'Pricing' },
];

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const dailyDone = useMemo(() => getDailyChallengeState()?.completed ?? false, [location.pathname]);
  const linkBase = 'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative';
  const activeClass = 'bg-blue-600/15 text-blue-400 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.2)]';
  const inactiveClass = 'text-gh-text-secondary hover:text-gh-text-primary hover:bg-gh-surface/50';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-gh-text-primary">
          <span className="text-2xl">🎓</span> ATAR Master
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`relative ${isActive ? 'text-blue-400' : ''}`}>
                    {l.icon}
                    {l.showDot && !dailyDone && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </span>
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-blue-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <div className="ml-2 pl-2 border-l border-gh-border flex items-center gap-2">
            <ThemeSwitcher />
            {user && <StreakBadge />}
            {user ? (
              <UserDropdown />
            ) : (
              <NavLink to="/auth" className={({ isActive }) => `${linkBase} ${isActive ? activeClass : inactiveClass}`}>
                <LogIn size={16} /> Sign In
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gh-text-secondary hover:text-gh-text-primary transition">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 px-4 pb-4 space-y-1 mobile-menu-enter">
          {NAV_LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `${linkBase} w-full ${isActive ? activeClass : inactiveClass}`}
            >
              {l.icon} {l.label}
            </NavLink>
          ))}
          <div className="border-t border-gh-border pt-2 mt-2 flex items-center gap-2">
            {user && <StreakBadge />}
            {user ? (
              <UserDropdown />
            ) : (
              <NavLink to="/auth" className={({ isActive }) => `${linkBase} w-full ${isActive ? activeClass : inactiveClass}`}>
                <LogIn size={16} /> Sign In
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
