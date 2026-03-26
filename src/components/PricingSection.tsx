import { useState } from 'react'
import { Check, Crown, BookOpen, Star, Sparkles, Zap } from 'lucide-react'
import { createCheckoutSession, PRICE_PRO_MONTHLY, PRICE_PRO_YEARLY } from '../lib/stripe'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

interface PricingSectionProps {
  currentPlan?: 'free' | 'pro'
}

const FREE_FEATURES = [
  '3 exam papers',
  'Basic practice mode',
  'Progress tracking',
]

const PRO_FEATURES = [
  { text: 'ALL exam papers — full library', highlight: true },
  { text: 'Topic mastery analytics', highlight: true },
  { text: 'Advanced practice modes', highlight: true },
  { text: 'Priority support', highlight: false },
  { text: 'Everything in Free, plus more', highlight: false },
]

export default function PricingSection({ currentPlan = 'free' }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [pendingCheckout, setPendingCheckout] = useState(false)
  const { user } = useAuth()

  const isMonthly = billingCycle === 'monthly'
  const proPrice = isMonthly ? '$9.99' : '$89.99'
  const proPeriod = isMonthly ? '/mo' : '/yr'
  const savings = isMonthly ? null : 'Save ~25%'

  async function doCheckout() {
    setLoading(true)
    try {
      const priceId = isMonthly ? PRICE_PRO_MONTHLY : PRICE_PRO_YEARLY
      const { url } = await createCheckoutSession(priceId)
      window.location.href = url
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleCheckout() {
    if (!user) {
      setPendingCheckout(true)
      setShowAuth(true)
      return
    }
    doCheckout()
  }

  function handleAuthSuccess() {
    setShowAuth(false)
    if (pendingCheckout) {
      setPendingCheckout(false)
      doCheckout()
    }
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-black mb-4">Choose Your Plan</h2>
        <p className="text-black/50 mb-8">Unlock your full ATAR potential</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              isMonthly
                ? 'bg-white border border-black/10 text-black shadow-sm'
                : 'text-black/45 hover:text-black/70'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              !isMonthly
                ? 'bg-white border border-black/10 text-black shadow-sm'
                : 'text-black/45 hover:text-black/70'
            }`}
          >
            Yearly {savings && <span className="ml-1 text-green-600 text-xs font-semibold">{savings}</span>}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ───── Free Plan ───── */}
        <div className="rounded-2xl border border-black/[0.06] bg-white/60 p-6 sm:p-8 flex flex-col mt-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-black/25" />
              <h3 className="text-lg font-semibold text-black/60">Free</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-black/50">$0</span>
              <span className="text-black/30">/forever</span>
            </div>
            <p className="text-black/35 mt-2 text-sm">Get started with the basics</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-black/40 text-sm">
                <Check className="w-4 h-4 text-black/20 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            disabled={currentPlan === 'free'}
            className="w-full py-3 rounded-xl font-medium text-sm border border-black/[0.06] text-black/30 hover:bg-black/[0.02] transition disabled:opacity-50 disabled:cursor-default"
          >
            {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* ───── Pro Plan ───── */}
        <div
          className="relative rounded-2xl p-6 sm:p-8 flex flex-col pro-card-glow"
          style={{
            background: 'white',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
          }}
        >
          {/* Gold gradient border via wrapper */}
          <div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{
              background: 'linear-gradient(135deg, #D4A844, #F5D060, #B8860B, #F5D060, #D4A844)',
              margin: '-2px',
              borderRadius: 'inherit',
            }}
          />
          <div
            className="absolute inset-0 rounded-2xl -z-[5]"
            style={{ background: 'white', margin: '0' }}
          />

          {/* RECOMMENDED badge */}
          <div
            className="absolute -top-3.5 right-6 flex items-center gap-1.5 text-xs font-bold px-4 py-1.5 rounded-full pro-badge-shimmer"
            style={{
              background: 'linear-gradient(135deg, #D4A844, #F5D060, #B8860B)',
              color: 'white',
              boxShadow: '0 2px 12px rgba(212, 168, 68, 0.4), 0 0 20px rgba(245, 208, 96, 0.2)',
              letterSpacing: '0.05em',
            }}
          >
            <Sparkles className="w-3 h-3" /> RECOMMENDED
          </div>

          {/* Most popular pill */}
          <div
            className="absolute -top-3.5 left-6 text-[10px] font-semibold px-3 py-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 168, 68, 0.08), rgba(245, 208, 96, 0.12))',
              color: '#B8860B',
              border: '1px solid rgba(212, 168, 68, 0.2)',
            }}
          >
            Most popular
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown
                className="w-5 h-5"
                style={{ color: '#D4A844', filter: 'drop-shadow(0 0 4px rgba(212, 168, 68, 0.4))' }}
              />
              <h3 className="text-xl font-bold text-black">Pro</h3>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 168, 68, 0.1), rgba(245, 208, 96, 0.15))',
                  color: '#B8860B',
                }}
              >
                BEST VALUE
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-black">{proPrice}</span>
              <span className="text-black/45">{proPeriod}</span>
            </div>
            <p className="text-black/55 mt-2 text-sm">Everything you need to ace your ATAR</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {PRO_FEATURES.map(({ text, highlight }) => (
              <li
                key={text}
                className={`flex items-center gap-2 text-sm ${
                  highlight ? 'text-black/75 font-medium' : 'text-black/55'
                }`}
              >
                <Check
                  className="w-4 h-4 shrink-0"
                  style={{ color: '#D4A844' }}
                />
                {text}
                {highlight && (
                  <Zap
                    className="w-3 h-3 ml-auto shrink-0"
                    style={{ color: 'rgba(212, 168, 68, 0.4)' }}
                  />
                )}
              </li>
            ))}
          </ul>

          <button
            disabled={currentPlan === 'pro' || loading}
            onClick={handleCheckout}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-default hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
            style={{
              background: currentPlan === 'pro'
                ? '#ccc'
                : 'linear-gradient(135deg, #D4A844, #C09530, #B8860B)',
              boxShadow: currentPlan === 'pro'
                ? 'none'
                : '0 4px 16px rgba(212, 168, 68, 0.35), 0 1px 3px rgba(184, 134, 11, 0.2)',
            }}
          >
            {currentPlan === 'pro' ? 'Current Plan' : loading ? 'Redirecting…' : 'Upgrade to Pro'}
          </button>

          {currentPlan !== 'pro' && (
            <p className="text-center text-[11px] text-black/30 mt-2.5">
              Cancel anytime &middot; Secure checkout via Stripe
            </p>
          )}
        </div>
      </div>

      {showAuth && (
        <AuthModal
          onClose={() => { setShowAuth(false); setPendingCheckout(false) }}
          onSuccess={handleAuthSuccess}
          message="Sign in to upgrade to Pro"
        />
      )}
    </section>
  )
}
