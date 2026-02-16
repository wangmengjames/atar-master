import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export default function LandingPage() {
  const { user } = useAuth();
  const hero = useReveal();
  const flow = useReveal();
  const cta = useReveal();

  return (
    <div className="min-h-screen bg-white text-black">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .fade-in { animation: fadeUp .75s ease-out both; }
      `}</style>

      {/* Hero */}
      <section ref={hero.ref} className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-24 text-center sm:px-10">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-black/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-black/[0.05] blur-3xl" style={{ animation: 'floatSlow 9s ease-in-out infinite' }} />

        <div className={`relative z-10 mx-auto max-w-4xl ${hero.visible ? 'fade-in' : 'opacity-0'}`}>
          <p className="mb-6 text-xs tracking-[0.24em] text-black/45 sm:text-sm">ATAR MASTER · VCE MATHEMATICAL METHODS</p>

          <h1 className="text-5xl font-semibold leading-[0.94] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Learn clearly.
            <br />
            <span className="text-black/78">Perform confidently.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-black/60 sm:text-xl">
            A calm, focused space for VCE Methods practice — real exams, structured skill progression,
            and no clutter.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/skill-tree"
              className="w-full rounded-xl bg-black px-7 py-3.5 text-base font-semibold text-white transition hover:bg-black/90 sm:w-auto"
            >
              {user ? 'Continue Learning' : 'Start Practicing'}
            </Link>
            <Link
              to="/pricing"
              className="w-full rounded-xl border border-black/20 bg-white px-7 py-3.5 text-base font-medium text-black transition hover:border-black/35 hover:bg-black/[0.02] sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll anchor strip */}
      <section className="border-y border-black/10 bg-black/[0.02] px-6 py-8 sm:px-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <div className="text-2xl font-semibold sm:text-3xl">2,270+</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-black/45">Practice Qs</div>
          </div>
          <div>
            <div className="text-2xl font-semibold sm:text-3xl">2016–2025</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-black/45">VCAA Exams</div>
          </div>
          <div>
            <div className="text-2xl font-semibold sm:text-3xl">31</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-black/45">Skill Nodes</div>
          </div>
          <div>
            <div className="text-2xl font-semibold sm:text-3xl">100%</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-black/45">Coverage</div>
          </div>
        </div>
      </section>

      {/* Scroll section */}
      <section ref={flow.ref} className="px-6 py-24 sm:px-10 sm:py-28">
        <div className={`mx-auto grid max-w-6xl gap-10 md:grid-cols-2 ${flow.visible ? 'fade-in' : 'opacity-0'}`}>
          <div>
            <p className="text-xs tracking-[0.22em] text-black/45">FLOW</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Scroll naturally.
              <br />
              <span className="text-black/65">Focus deeply.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-black/60 sm:text-lg">
              We keep the top clean and premium, then reveal the rest progressively as you scroll —
              like OpenAI and SuperWhisper style landing flow.
            </p>
          </div>

          <div className="space-y-4">
            {[
              ['Step 1', 'Pick your level and start where you are.'],
              ['Step 2', 'Train with real exam-style questions.'],
              ['Step 3', 'Track progress and close weak spots fast.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-sm font-semibold text-black">{title}</p>
                <p className="mt-2 text-sm text-black/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={cta.ref} className="border-t border-black/10 px-6 py-24 text-center sm:px-10">
        <div className={`mx-auto max-w-3xl ${cta.visible ? 'fade-in' : 'opacity-0'}`}>
          <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">Ready when you are.</h3>
          <p className="mx-auto mt-5 max-w-xl text-black/60 sm:text-lg">
            Same ATAR Master power, cleaner OpenAI-like tone.
          </p>
          <div className="mt-9">
            <Link
              to="/skill-tree"
              className="inline-block rounded-xl bg-black px-8 py-3.5 text-base font-semibold text-white transition hover:bg-black/90"
            >
              {user ? 'Continue Learning' : 'Start Practicing'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
