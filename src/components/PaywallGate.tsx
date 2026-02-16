import { useAuth } from '../hooks/useAuth'
import { Lock, Crown, Check } from 'lucide-react'
import type { ReactNode } from 'react'

const FREE_PREFIXES = ['mm-2021', 'mm-2022', 'mm-2023'] as const

export function isFreePaper(paperId: string): boolean {
  return FREE_PREFIXES.some((p) => paperId.startsWith(p))
}

interface PaywallGateProps {
  requirePro: boolean
  children: ReactNode
}

export default function PaywallGate({ requirePro, children }: PaywallGateProps) {
  const { isPro } = useAuth()

  if (!requirePro || isPro) return <>{children}</>

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gh-surface border border-gh-border rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gh-overlay border border-gh-border mb-5">
          <Lock className="h-7 w-7 text-gh-text-secondary" />
        </div>

        <h2 className="text-2xl font-bold text-gh-text-primary mb-2">Unlock Pro Papers</h2>
        <p className="text-gh-text-secondary mb-8">
          2024–2025 exam papers and full worked solutions are available on the Pro plan.
        </p>

        <div className="bg-gh-overlay border border-gh-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Crown className="h-5 w-5 text-gh-text-secondary" />
            <span className="text-lg font-semibold text-gh-text-primary">ATAR Master Pro</span>
          </div>
          <div className="text-3xl font-bold text-gh-text-primary mb-1">
            $9.99<span className="text-base font-normal text-gh-text-secondary">/month</span>
          </div>
          <p className="text-sm text-gh-text-secondary mb-4">or $79.99/year (save 33%)</p>

          <ul className="text-left space-y-2 text-sm text-gh-text-secondary">
            {[
              'All exam papers 2021–2025',
              'Full worked solutions',
              'Performance analytics & tracking',
              'Priority support',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gh-text-secondary shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full bg-gh-overlay border border-gh-border hover:bg-gh-border text-gh-text-primary font-medium py-3 rounded-lg transition">
          Upgrade to Pro
        </button>

        <p className="text-xs text-gh-text-muted mt-4">
          Free tier includes 2021–2023 papers. Cancel anytime.
        </p>
      </div>
    </div>
  )
}
