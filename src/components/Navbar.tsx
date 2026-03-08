import { NavLink, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  ChevronDown,
  DollarSign,
  Dumbbell,
  FileText,
  GitBranch,
  LogIn,
  LogOut,
  Menu,
  Shield,
  User,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getDailyChallengeState } from '../lib/dailyChallenge';
import { isAdminUser } from '../lib/constants';
import StreakBadge from './StreakBadge';

function UserDropdown() {
  const { user, isPro, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAdmin = isAdminUser(user);
  const avatarUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/88 px-2.5 py-1.5 text-sm text-[var(--muted)] transition hover:border-black/12 hover:text-[var(--ink)]"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--muted)]">
            <User size={14} />
          </span>
        )}

        <span className="hidden max-w-[120px] truncate sm:inline">
          {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
        </span>

        {isPro && <span className="quiet-pill">Pro</span>}
        <ChevronDown size={14} className="text-black/35" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-[24px] border border-black/8 bg-white/95 p-2 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur">
          <button
            onClick={() => { navigate('/dashboard'); setOpen(false); }}
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
          >
            <BarChart3 size={14} />
            Dashboard
          </button>

          {isAdmin && (
            <button
              onClick={() => { navigate('/teacher'); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
            >
              <Shield size={14} />
              Teacher Dashboard
            </button>
          )}

          <div className="my-2 border-t border-black/8" />

          <button
            onClick={async () => {
              await signOut();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

type NavLinkItem = {
  to: string;
  label: string;
  icon: ReactElement;
  showDot?: boolean;
};

const NAV_LINKS: NavLinkItem[] = [
  { to: '/skill-tree', label: 'Skill Tree', icon: <GitBranch size={16} /> },
  { to: '/exams', label: 'Exams', icon: <FileText size={16} /> },
  { to: '/practice', label: 'Practice', icon: <Dumbbell size={16} /> },
  { to: '/daily', label: 'Daily', icon: <Zap size={16} />, showDot: true },
  { to: '/dashboard', label: 'Dashboard', icon: <BarChart3 size={16} /> },
  { to: '/pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
];

export default function Navbar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dailyDone = getDailyChallengeState()?.completed ?? false;
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-black/8 bg-[rgba(248,246,239,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3 text-[var(--ink)]">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/88 text-[11px] font-semibold tracking-[0.2em]">
            AM
          </span>
          <div>
            <div className="text-sm font-semibold tracking-tight">ATAR Master</div>
            <div className="text-xs text-[var(--muted-soft)]">Focused VCE Methods practice</div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex items-center gap-1 rounded-full border border-black/8 bg-white/86 p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `relative rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                }`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {link.showDot && !dailyDone && (
                      <span className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white/80' : 'bg-[var(--accent)]'}`} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user && <StreakBadge />}
            {user ? (
              <UserDropdown />
            ) : (
              <NavLink
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/88 px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:border-black/12 hover:text-[var(--ink)]"
              >
                <LogIn size={14} />
                Sign In
              </NavLink>
            )}
          </div>
        </div>

        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/88 text-[var(--muted)] transition hover:text-[var(--ink)] lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/8 px-4 pb-4 pt-2 lg:hidden">
          <div className="rounded-[24px] border border-black/8 bg-white/92 p-2 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]'
                }`}
              >
                <span className="relative">
                  {link.icon}
                  {link.showDot && !dailyDone && <span className="absolute -right-0.5 top-0 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
                </span>
                {link.label}
              </NavLink>
            ))}

            <div className="mt-2 border-t border-black/8 pt-2">
              <div className="flex items-center gap-2 px-1">
                {user && <StreakBadge />}
                {user ? (
                  <UserDropdown />
                ) : (
                  <NavLink
                    to="/auth"
                    onClick={closeMobileMenu}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-black/8 bg-white px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)]"
                  >
                    <LogIn size={14} />
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
