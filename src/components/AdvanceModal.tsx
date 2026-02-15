import { useEffect } from 'react';

interface Props {
  nextLevel: number | null; // null = topic mastered
  onDone: () => void;
}

const LEVEL_NAMES: Record<number, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

export default function AdvanceModal({ nextLevel, onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const isMastered = nextLevel === null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onDone}
    >
      <div className="text-center px-8 py-12 rounded-3xl bg-gradient-to-br from-yellow-600/90 to-amber-700/90 border border-yellow-400/40 shadow-2xl shadow-yellow-500/20 max-w-sm mx-4 animate-in zoom-in-95 duration-300">
        <div className="text-6xl mb-4">{isMastered ? '🏆' : '🎉'}</div>
        <h2 className="text-3xl font-extrabold text-white mb-2">
          {isMastered ? 'Topic Mastered!' : 'Level Up!'}
        </h2>
        {!isMastered && (
          <p className="text-xl text-yellow-100 font-semibold">
            → {LEVEL_NAMES[nextLevel]}
          </p>
        )}
        <p className="text-sm text-yellow-200/70 mt-4">Tap to continue</p>
      </div>
    </div>
  );
}
