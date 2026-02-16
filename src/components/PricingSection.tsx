import { useState } from 'react'
import { Check, Crown, BookOpen, Star } from 'lucide-react'
import { createCheckoutSession, PRICE_PRO_MONTHLY, PRICE_PRO_YEARLY } from '../lib/stripe'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

interface PricingSectionProps {
  currentPlan?: 'free' | 'pro'
}

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
      alert('Failed to start checkout. Please try again.')
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
        <h2 className="text-3xl font-bold text-gh-text-primary mb-4">Choose Your Plan</h2>
        <p className="text-gh-text-secondary mb-8">Unlock your full ATAR potential</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 rounded-full bg-gh-surface p-1 border border-gh-border">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              isMonthly ? 'bg-gh-overlay border border-gh-border text-gh-text-primary' : 'text-gh-text-secondary hover:text-gh-text-primary'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              !isMonthly ? 'bg-gh-overlay border border-gh-border text-gh-text-primary' : 'text-gh-text-secondary hover:text-gh-text-primary'
            }`}
          >
            Yearly {savings && <span className="ml-1 text-green-400 text-xs">{savings}</span>}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="rounded-2xl border border-gh-border bg-gh-surface p-6 sm:p-8 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-gh-text-secondary" />
              <h3 className="text-xl font-semibold text-gh-text-primary">Free</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gh-text-primary">$0</span>
              <span className="text-gh-text-secondary">/forever</span>
            </div>
            <p className="text-gh-text-secondary mt-2 text-sm">Get started with the basics</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {['3 exam papers', 'Basic practice mode', 'Progress tracking'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-gh-text-secondary text-sm">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            disabled={currentPlan === 'free'}
            className="w-full py-3 rounded-xl font-medium text-sm border border-gh-border text-gh-text-secondary hover:bg-gh-overlay transition disabled:opacity-50 disabled:cursor-default"
          >
            {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative rounded-2xl border border-gh-border bg-gh-surface p-6 sm:p-8 flex flex-col">
          <div className="absolute -top-3 right-6 flex items-center gap-1 bg-gh-overlay border border-gh-border text-gh-text-secondary text-xs font-bold px-3 py-1 rounded-full">
            <Star className="w-3 h-3" /> RECOMMENDED
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-gh-accent-blue" />
              <h3 className="text-xl font-semibold text-gh-text-primary">Pro</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-gh-text-primary">{proPrice}</span>
              <span className="text-gh-text-secondary">{proPeriod}</span>
            </div>
            <p className="text-gh-text-secondary mt-2 text-sm">Everything you need to ace your ATAR</p>
          </div>

          <ul className="space-y-3 mb-8 flex-1">
            {[
              'ALL exam papers',
              'Topic mastery analytics',
              'Priority support',
              'Advanced practice modes',
              'Everything in Free',
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-gh-text-secondary text-sm">
                <Check className="w-4 h-4 text-gh-text-secondary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <button
            disabled={currentPlan === 'pro' || loading}
            onClick={handleCheckout}
            className="w-full py-3 rounded-xl font-medium text-sm bg-gh-overlay border border-gh-border text-gh-text-primary hover:bg-gh-border transition disabled:opacity-50 disabled:cursor-default"
          >
            {currentPlan === 'pro' ? 'Current Plan' : loading ? 'Redirecting…' : 'Upgrade to Pro'}
          </button>
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
