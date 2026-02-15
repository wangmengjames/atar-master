import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Check, Target, FileText, BarChart3, Download, UserPlus, BookOpen, TrendingUp } from 'lucide-react';

/* ───────────── optimized mouse tracker hook ───────────── */
function useMousePosition() {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (elementRef.current) {
        elementRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(59,130,246,0.08), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return elementRef;
}

/* ───────────── scroll position hook ───────────── */
function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

/* ───────────── skill tree animation hook ───────────── */
function useSkillTreeAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.2 });
    io.observe(el);
    const t = setTimeout(() => setStarted(true), 3000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return { ref, started };
}

/* ───────────── Skill Tree Section ───────────── */
function SkillTreeShowcase() {
  const { ref, started } = useSkillTreeAnimation();

  const columns = useMemo(() => [
    { year: 'Year 8', nodes: ['Number', 'Algebra'] },
    { year: 'Year 9', nodes: ['Number', 'Algebra'] },
    { year: 'Year 10', nodes: ['Algebra', 'Probability'] },
    { year: 'Year 11', nodes: ['Trig', 'Calculus'] },
    { year: 'Year 12', nodes: ['Differentiation', 'Integration'] },
    { year: 'VCE', nodes: ['Exam Ready ✓'] },
  ], []);

  const delayPerCol = 0.6; // seconds per column

  // Memoize the tagline styles to prevent recreation on every render
  const taglineStyles = useMemo(() => ({
    opacity: started ? 1 : 0,
    transform: started ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 0.8s ease-out ${columns.length * delayPerCol}s, transform 0.8s ease-out ${columns.length * delayPerCol}s`,
  }), [started, columns.length]);

  // Layout constants
  const svgW = 800, svgH = 320;
  const colSpacing = svgW / (columns.length + 1);
  const nodeR = 20;

  // Build node positions
  const nodePositions: { x: number; y: number; label: string; colIdx: number; isVCE: boolean }[] = [];
  columns.forEach((col, ci) => {
    const x = colSpacing * (ci + 1);
    if (col.nodes.length === 1) {
      nodePositions.push({ x, y: svgH / 2, label: col.nodes[0], colIdx: ci, isVCE: ci === 5 });
    } else {
      nodePositions.push({ x, y: svgH / 2 - 45, label: col.nodes[0], colIdx: ci, isVCE: false });
      nodePositions.push({ x, y: svgH / 2 + 45, label: col.nodes[1], colIdx: ci, isVCE: false });
    }
  });

  // Build connections: each node connects to all nodes in the next column
  const connections: { x1: number; y1: number; x2: number; y2: number; colIdx: number }[] = [];
  for (let ci = 0; ci < columns.length - 1; ci++) {
    const fromNodes = nodePositions.filter(n => n.colIdx === ci);
    const toNodes = nodePositions.filter(n => n.colIdx === ci + 1);
    fromNodes.forEach(fn => {
      toNodes.forEach(tn => {
        connections.push({ x1: fn.x + nodeR, y1: fn.y, x2: tn.x - nodeR, y2: tn.y, colIdx: ci });
      });
    });
  }

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <style>{`
        @keyframes skillNodePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        @keyframes skillLineDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes skillTextFade {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your path to exam mastery</h2>
        <p className="text-gray-400 mb-12">From fundamentals to VCE-ready, one skill at a time.</p>

        <div className="flex justify-center">
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full max-w-[800px]"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <filter id="blueGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="goldGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {connections.map((c, i) => {
              const len = Math.sqrt((c.x2 - c.x1) ** 2 + (c.y2 - c.y1) ** 2);
              return (
                <line
                  key={`line-${i}`}
                  x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                  stroke={started ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={2}
                  strokeDasharray={len}
                  strokeDashoffset={started ? undefined : len}
                  style={started ? {
                    animation: `skillLineDraw 0.5s ease-out ${c.colIdx * delayPerCol + 0.3}s forwards`,
                    strokeDashoffset: len,
                  } : { strokeDashoffset: len }}
                />
              );
            })}

            {/* Nodes */}
            {nodePositions.map((n, i) => {
              const delay = n.colIdx * delayPerCol;
              const isActive = started;
              const fillInactive = 'rgba(255,255,255,0.06)';
              const fillActive = n.isVCE ? '#f59e0b' : '#3b82f6';
              const strokeInactive = 'rgba(255,255,255,0.12)';
              const strokeActive = n.isVCE ? '#fbbf24' : '#60a5fa';

              return (
                <g key={`node-${i}`}>
                  <circle
                    cx={n.x} cy={n.y} r={nodeR}
                    fill={isActive ? fillActive : fillInactive}
                    stroke={isActive ? strokeActive : strokeInactive}
                    strokeWidth={2}
                    filter={isActive ? (n.isVCE ? 'url(#goldGlow)' : 'url(#blueGlow)') : undefined}
                    opacity={isActive ? undefined : 0.4}
                    style={isActive ? {
                      opacity: 0,
                      animation: `skillNodePulse 0.6s ease-out ${delay}s forwards`,
                      animationFillMode: 'forwards',
                    } : {}}
                  />
                  {/* opacity trick: use separate style for fill transition */}
                  <circle
                    cx={n.x} cy={n.y} r={nodeR}
                    fill={fillActive}
                    stroke={strokeActive}
                    strokeWidth={2}
                    filter={n.isVCE ? 'url(#goldGlow)' : 'url(#blueGlow)'}
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: `opacity 0.4s ease-out ${delay}s`,
                    }}
                  />
                  {/* Label */}
                  <text
                    x={n.x} y={n.y + nodeR + 18}
                    textAnchor="middle"
                    fill={isActive ? (n.isVCE ? '#fbbf24' : '#93c5fd') : 'rgba(255,255,255,0.25)'}
                    fontSize={11}
                    fontWeight={600}
                    style={{
                      transition: `fill 0.4s ease-out ${delay}s, opacity 0.4s ease-out ${delay}s`,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  >
                    {n.label}
                  </text>
                  {/* Year label (only for first node in column) */}
                  {nodePositions.findIndex(nd => nd.colIdx === n.colIdx) === i && (
                    <text
                      x={n.x} y={30}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.35)"
                      fontSize={12}
                      fontWeight={500}
                    >
                      {columns[n.colIdx].year}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tagline that fades in at the end */}
        <p
          className="text-gray-300 text-lg mt-10 font-medium"
          style={taglineStyles}
        >
          100% of the VCE Methods curriculum. Every topic. Every year.
        </p>
      </div>
    </section>
  );
}

/* ───────────── animated count-up hook ───────────── */
function useCountUp(end: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.1 });
    io.observe(el);
    // Also trigger after a short delay as fallback
    const t = setTimeout(start, 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [start]);

  return { ref, value };
}

/* ───────────── fade-in on scroll ───────────── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    io.observe(el);
    // Fallback: show after 2s regardless
    const t = setTimeout(() => setVisible(true), 2000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return { ref, visible };
}

/* ───────────── stat item ───────────── */
function StatItem({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { ref, value } = useCountUp(end);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {value.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-400 mt-2 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
export default function LandingPage() {
  const features = useFadeIn();
  const steps = useFadeIn();
  const pricing = useFadeIn();
  const mouseGradientRef = useMousePosition();
  const scrollY = useScrollY();

  // Memoize parallax calculations to avoid recalculating on every render
  const parallaxStyles = useMemo(() => ({
    orb1: { transform: `translate(-50%, calc(-50% + ${scrollY * 0.15}px)) scale(1)` },
    orb2: { transform: `translate(-50%, calc(-50% + ${scrollY * -0.1}px)) scale(1)` },
  }), [scrollY]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">
      {/* Mouse-following gradient overlay */}
      <div
        ref={mouseGradientRef}
        className="pointer-events-none fixed inset-0 z-[1]"
      />

      {/* inline keyframes */}
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.15); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(-50%, -50%) scale(1.1); }
          50% { transform: translate(-50%, -50%) scale(0.95); }
        }
        .orb1 { animation: orbFloat 8s ease-in-out infinite; }
        .orb2 { animation: orbFloat2 10s ease-in-out infinite; }
      `}</style>

      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* gradient orbs with parallax */}
        <div className="orb1 pointer-events-none absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" style={parallaxStyles.orb1} />
        <div className="orb2 pointer-events-none absolute top-[40%] left-[55%] w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px]" style={parallaxStyles.orb2} />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-gray-300 mb-10">
            <BookOpen size={14} /> 2016–2025 VCE Methods Exams Available
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight mb-8">
            Master VCE Methods.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
              Score Higher.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            2,270+ practice questions. 10 years of past exams. Smart skill tracking.
            Everything you need to ace Mathematical Methods.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/skill-tree"
              className="group relative px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            >
              Get Started Free
            </Link>
            <Link
              to="/skill-tree"
              className="px-8 py-4 rounded-2xl border border-white/15 hover:border-white/30 text-gray-300 hover:text-white font-medium text-lg transition-all backdrop-blur-sm"
            >
              View Skill Tree
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="relative border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-5xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatItem end={2270} suffix="+" label="Practice Questions" />
          <StatItem end={20} suffix="" label="Past Exam Papers" />
          <StatItem end={10} suffix=" Years" label="VCE Coverage (2016–2025)" />
          <StatItem end={31} suffix="" label="Skill Tree Nodes" />
        </div>
      </section>

      {/* ─── Skill Tree Showcase ─── */}
      <SkillTreeShowcase />

      {/* ─── Features ─── */}
      <section ref={features.ref} className={`mx-auto max-w-6xl px-6 py-28 transition-all duration-700 ${features.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Powerful tools designed to take you from confused to confident.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target size={28} />, title: 'Skill Tree', desc: 'Visual learning path from Year 8 to VCE Exam. See exactly where your gaps are.' },
            { icon: <FileText size={28} />, title: 'Past Exam Practice', desc: '10 years of real VCAA exams with detailed marking guides and solutions.' },
            { icon: <BarChart3 size={28} />, title: 'Progress Tracking', desc: 'Track your mastery across every topic. Know when you\'re exam-ready.' },
            { icon: <Download size={28} />, title: 'PDF Study Guides', desc: 'Download combined question + marking guide PDFs. Study offline.' },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl p-8 border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="mb-5 text-blue-400 group-hover:text-cyan-400 transition-colors">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-3">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section ref={steps.ref} className={`border-y border-white/5 bg-white/[0.01] transition-all duration-700 ${steps.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="mx-auto max-w-5xl px-6 py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400">Three steps to exam mastery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <UserPlus size={24} />, title: 'Sign up for free', desc: 'Create your account in seconds. No credit card required.' },
              { icon: <BookOpen size={24} />, title: 'Practice by topic or exam', desc: 'Choose from the skill tree or dive into real past papers.' },
              { icon: <TrendingUp size={24} />, title: 'Track, improve, ace it', desc: 'Monitor your progress, fill gaps, and walk into the exam confident.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 border border-blue-500/20 text-blue-400 mb-6">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section ref={pricing.ref} className={`mx-auto max-w-4xl px-6 py-28 transition-all duration-700 ${pricing.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple pricing</h2>
          <p className="text-gray-400">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl p-8 border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-xl font-bold mb-1">Free</h3>
            <p className="text-gray-500 text-sm mb-5">Get started at no cost</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-gray-500 text-sm">forever</span>
            </div>
            <Link to="/skill-tree" className="block w-full text-center py-3 rounded-xl border border-white/10 hover:border-white/25 text-gray-300 hover:text-white font-semibold transition-all">
              Get Started Free
            </Link>
            <ul className="mt-6 space-y-3">
              {['Basic skill tree access', '3 free exam papers', 'Progress tracking'].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-gray-400"><Check size={15} className="text-green-500 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="relative rounded-2xl p-8 border border-blue-500/30 bg-gradient-to-b from-blue-600/[0.06] to-transparent">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-xs font-bold tracking-wide">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold mb-1">Pro</h3>
            <p className="text-gray-500 text-sm mb-5">Everything to ace Methods</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold">$9.99</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
            <Link to="/pricing" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              Start Pro Trial
            </Link>
            <ul className="mt-6 space-y-3">
              {[
                'All 10 years of exams (2016–2025)',
                'Full skill tree with unlocks',
                'Unlimited practice questions',
                'PDF study guide downloads',
                'Priority new features',
              ].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-gray-300"><Check size={15} className="text-green-500 shrink-0" />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative py-28 text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to master Methods?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join students across Victoria preparing smarter, not harder.</p>
          <Link to="/skill-tree" className="inline-block px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-all hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl text-blue-400">✦</span>
            <span className="font-bold text-lg">ATAR Master</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <Link to="/skill-tree" className="hover:text-gray-300 transition-colors">Skill Tree</Link>
            <Link to="/exams" className="hover:text-gray-300 transition-colors">Exams</Link>
            <Link to="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link>
            <Link to="/auth" className="hover:text-gray-300 transition-colors">Sign In</Link>
          </div>
          <div className="text-sm text-gray-600 text-center md:text-right">
            <p>Built for VCE students</p>
            <p>© 2026 ATAR Master</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
