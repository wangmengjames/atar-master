import { useCallback, useState } from 'react';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { ALL_NODES } from '../data/skillTreeData';
import { saveStoredYearLevel } from '../lib/yearLevel';

const YEAR_LEVELS = [
  { label: 'Year 8', tier: 0, description: 'Start with arithmetic, algebra, statistics and probability.', color: '#5B6576' },
  { label: 'Year 9', tier: 1, description: 'Build pattern fluency and move into more abstract structure.', color: '#3F6474' },
  { label: 'Year 10', tier: 2, description: 'Sharpen quadratics, exponentials and conditional reasoning.', color: '#4B5E77' },
  { label: 'Year 11', tier: 3, description: 'Transition into Methods units with trigonometry and early calculus.', color: '#215F58' },
  { label: 'Year 12', tier: 4, description: 'Focus on full-calculus execution, distributions and exam fluency.', color: '#7C5A31' },
] as const;

interface Props {
  onComplete: (yearLevel: number, unlockedNodeIds: string[]) => void;
}

function getNodesUpToTier(maxTier: number): string[] {
  return ALL_NODES
    .filter((node) => node.tier <= maxTier)
    .map((node) => node.id);
}

export default function YearLevelSelector({ onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);

  const handleSelect = useCallback((tier: number) => {
    setSelected(tier);
  }, []);

  const handleConfirm = useCallback(() => {
    if (selected === null) return;

    setAnimatingOut(true);
    saveStoredYearLevel(selected);

    const nodeIds = getNodesUpToTier(selected);
    setTimeout(() => onComplete(selected, nodeIds), 280);
  }, [onComplete, selected]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[rgba(245,243,236,0.94)] px-4 backdrop-blur-xl transition-opacity duration-300 ${animatingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-3xl rounded-[32px] border border-black/8 bg-white/92 p-6 shadow-[0_32px_120px_rgba(15,23,42,0.14)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-2)] text-[var(--accent)]">
              <GraduationCap size={22} />
            </div>
            <p className="section-kicker mt-5">Choose Your Starting Point</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--ink)]">
              Unlock the right part of the map first.
            </h1>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
              We will open every topic up to your year level so the first session feels focused instead of overwhelming.
            </p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
              selected === null
                ? 'cursor-not-allowed border border-black/8 bg-black/3 text-black/30'
                : 'bg-black text-white hover:bg-black/85'
            }`}
          >
            Continue
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {YEAR_LEVELS.map((year) => {
            const isSelected = selected === year.tier;

            return (
              <button
                key={year.tier}
                onClick={() => handleSelect(year.tier)}
                className={`rounded-[24px] border p-5 text-left transition-all ${
                  isSelected
                    ? 'border-black/15 bg-[var(--surface)] shadow-[0_16px_40px_rgba(15,23,42,0.08)]'
                    : 'border-black/8 bg-white hover:border-black/12 hover:bg-[var(--surface)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
                      style={{ background: `${year.color}12`, color: year.color }}
                    >
                      {year.label}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{year.description}</p>
                  </div>

                  <div
                    className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border transition ${
                      isSelected ? 'border-black bg-black' : 'border-black/15 bg-white'
                    }`}
                  >
                    {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
