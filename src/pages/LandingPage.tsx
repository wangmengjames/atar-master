import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -18px, 0) scale(1.03); }
        }
        @keyframes dawnPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-1 { animation: fadeUp .7s ease-out .05s both; }
        .fade-2 { animation: fadeUp .7s ease-out .2s both; }
        .fade-3 { animation: fadeUp .7s ease-out .35s both; }
        .fade-4 { animation: fadeUp .7s ease-out .5s both; }
      `}</style>

      {/* left silhouette-like shadow */}
      <div className="pointer-events-none absolute left-[-22rem] top-[-4rem] z-0 h-[48rem] w-[48rem] rounded-full bg-black/70 blur-2xl" />
      <div className="pointer-events-none absolute left-[-12rem] top-[8rem] z-0 h-[28rem] w-[18rem] rounded-[999px] bg-black/70 blur-xl" />

      {/* deep base + dawn glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(120%_90%_at_55%_15%,rgba(43,103,208,0.35),rgba(16,33,78,0.35)_35%,rgba(6,11,30,0.96)_68%,#050816_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(42rem 20rem at 55% 24%, rgba(108,178,255,0.22), rgba(108,178,255,0.06) 48%, transparent 74%)',
          animation: 'dawnPulse 6s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(30rem 14rem at 56% 30%, rgba(170,213,255,0.18), rgba(170,213,255,0.04) 52%, transparent 76%)',
          animation: 'drift 11s ease-in-out infinite',
        }}
      />

      {/* Hero */}
      <section className="relative z-10 flex min-h-[88vh] items-center justify-center px-6 pb-10 pt-24 text-center sm:px-10">
        <div className="max-w-3xl">
          <p className="fade-1 mb-6 text-xs tracking-[0.24em] text-blue-200/70 sm:text-sm">ATAR MASTER · VCE MATHEMATICAL METHODS</p>

          <h1 className="fade-2 text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Study Smarter.
            <br />
            <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">Score Higher.</span>
          </h1>

          <p className="fade-3 mx-auto mt-6 max-w-2xl text-base text-blue-100/78 sm:mt-8 sm:text-xl">
            Real VCE exam practice, clean skill progression, and focused revision.
            No noise. Just results.
          </p>

          <div className="fade-4 mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row">
            <Link
              to="/skill-tree"
              className="w-full rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#0A1638] transition hover:opacity-95 sm:w-auto"
            >
              {user ? 'Continue Learning' : 'Start Practicing'}
            </Link>
            <Link
              to="/pricing"
              className="w-full rounded-xl border border-white/22 bg-white/5 px-7 py-3.5 text-base font-medium text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal social proof strip */}
      <section className="relative z-10 border-y border-white/8 bg-black/16 px-6 py-10 backdrop-blur-[2px] sm:px-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <div>
            <div className="text-2xl font-bold text-white sm:text-3xl">2,270+</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-blue-100/65">Practice Qs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white sm:text-3xl">2016–2025</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-blue-100/65">VCAA Exams</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white sm:text-3xl">31</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-blue-100/65">Skill Nodes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white sm:text-3xl">100%</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-blue-100/65">Methods Coverage</div>
          </div>
        </div>
      </section>

      {/* Scrollable lower content (kept minimal) */}
      <section className="relative z-10 px-6 py-20 sm:px-10 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs tracking-[0.2em] text-blue-200/60">HOW IT WORKS</p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Simple, focused, exam-ready.</h2>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">1. Choose your level</p>
              <p className="mt-2 text-sm text-blue-100/70">Start from Year 8 foundations or jump into Year 12 exam prep.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">2. Practice with real papers</p>
              <p className="mt-2 text-sm text-blue-100/70">Train using authentic VCAA-style questions and past exams.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">3. Track and improve</p>
              <p className="mt-2 text-sm text-blue-100/70">See exactly what to fix before the real exam.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/8 px-6 py-20 text-center sm:px-10 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h3 className="text-2xl font-semibold sm:text-3xl">Ready when you are.</h3>
          <p className="mx-auto mt-4 max-w-xl text-blue-100/75">
            Keep the clean experience. Dive deeper only when you scroll.
          </p>
          <div className="mt-8">
            <Link
              to="/skill-tree"
              className="inline-block rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-[#0A1638] transition hover:opacity-95"
            >
              {user ? 'Continue Learning' : 'Start Practicing'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
