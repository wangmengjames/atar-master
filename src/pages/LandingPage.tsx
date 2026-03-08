import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.16 });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

export default function LandingPage() {
  const { user } = useAuth();
  const [heroRef, heroVisible] = useReveal();
  const [sectionsRef, sectionsVisible] = useReveal();
  const [ctaRef, ctaVisible] = useReveal();

  return (
    <div className="min-h-screen bg-[var(--app-bg)] text-[var(--ink)]">
      <section ref={heroRef} className="overflow-hidden px-6 pb-20 pt-12 sm:px-10 sm:pb-24 sm:pt-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center">
          <div className={heroVisible ? 'page-enter' : 'opacity-0'}>
            <p className="section-kicker">ATAR Master · VCE Mathematical Methods</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
              Study with less noise.
              <br />
              <span className="text-black/58">Get to confident exam work faster.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Built for Methods students who want a calmer workspace: structured skill progression, past VCAA exams,
              and daily practice without dashboard clutter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/skill-tree"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black/85"
              >
                {user ? 'Continue Learning' : 'Start Practicing'}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-medium text-[var(--ink)] transition hover:border-black/15 hover:bg-[var(--surface)]"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              {[
                '31 skill nodes mapped from Year 8 to VCE',
                '2016-2025 exam coverage',
                '2,270+ linked practice questions',
              ].map((item) => (
                <span key={item} className="quiet-pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className={`relative ${heroVisible ? 'page-enter' : 'opacity-0'}`}>
            <div className="soft-panel relative overflow-hidden rounded-[32px] p-6 sm:p-7">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(16,163,127,0.4),transparent)]" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="section-kicker">Preview</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">A study workspace that stays readable.</h2>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--accent)]">
                  <Sparkles size={18} />
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="rounded-[24px] border border-black/8 bg-white/82 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[var(--ink)]">Skill tree</div>
                      <div className="mt-1 text-sm leading-6 text-[var(--muted)]">
                        Follow prerequisites first, then jump directly into the next level of practice.
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold tracking-tight">68%</div>
                      <div className="text-xs text-[var(--muted-soft)]">coverage</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Daily challenge', 'Short session, fresh questions, fast feedback.'],
                    ['Exam library', 'Real papers and linked follow-up practice.'],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-[24px] border border-black/8 bg-white/82 p-5">
                      <div className="text-sm font-medium text-[var(--ink)]">{title}</div>
                      <div className="mt-2 text-sm leading-6 text-[var(--muted)]">{copy}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">What students need most</div>
                  <div className="mt-4 space-y-3">
                    {[
                      'One clear next step instead of too many widgets.',
                      'A clean path from weak topics to exam readiness.',
                      'Less visual clutter during practice sessions.',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                        <CheckCircle2 size={16} className="mt-0.5 text-[var(--accent)]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/8 bg-white/62 px-6 py-6 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ['2,270+', 'Practice questions'],
            ['2016-2025', 'VCAA exams'],
            ['31', 'Skill nodes'],
            ['100%', 'Methods coverage'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[24px] border border-black/8 bg-white/82 p-5">
              <div className="text-3xl font-semibold tracking-tight text-[var(--ink)]">{value}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={sectionsRef} className="px-6 py-20 sm:px-10 sm:py-24">
        <div className={`mx-auto max-w-6xl ${sectionsVisible ? 'page-enter' : 'opacity-0'}`}>
          <div className="max-w-2xl">
            <p className="section-kicker">How It Works</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              One product rhythm from start to finish.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">
              The product now follows a simpler flow: choose a node, inspect the practice ladder, and start the next level.
              Everything is designed to reduce hesitation between intention and action.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              ['Choose your map', 'See the full study structure at once, with prerequisites and progress in view.'],
              ['Open one node', 'The side panel explains what the topic covers, what unlocks it, and what to do next.'],
              ['Practice immediately', 'Jump into the recommended level without navigating through extra overlays.'],
            ].map(([title, copy]) => (
              <div key={title} className="soft-panel rounded-[28px] p-6">
                <div className="section-kicker">{title}</div>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={ctaRef} className="border-t border-black/8 px-6 py-20 sm:px-10 sm:py-24">
        <div className={`mx-auto max-w-4xl rounded-[32px] border border-black/8 bg-white/88 p-8 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10 ${ctaVisible ? 'page-enter' : 'opacity-0'}`}>
          <p className="section-kicker">Ready When You Are</p>
          <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A calmer Methods workflow starts here.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            Open the skill tree, pick the node you are actually working on, and start the next set immediately.
          </p>
          <div className="mt-8">
            <Link
              to="/skill-tree"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition hover:bg-black/85"
            >
              {user ? 'Continue Learning' : 'Start Practicing'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
