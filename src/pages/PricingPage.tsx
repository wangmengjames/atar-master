import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PricingSection from '../components/PricingSection'
import { useAuth } from '../hooks/useAuth'

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: "Yes! You can cancel your subscription at any time from your account settings. You'll keep Pro access until the end of your billing period.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) through our secure payment provider Stripe.',
  },
  {
    q: 'Will I be charged automatically?',
    a: "Yes, subscriptions renew automatically. You'll receive an email reminder before each renewal.",
  },
  {
    q: 'Can I switch between monthly and yearly?',
    a: "Absolutely. You can switch plans at any time. If upgrading to yearly, we'll prorate the remaining balance.",
  },
  {
    q: 'Is there a student discount?',
    a: 'Our pricing is already designed to be affordable for students. The yearly plan saves you ~25% compared to monthly billing.',
  },
]

export default function PricingPage() {
  const { isPro } = useAuth()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-12 pb-4 text-center px-4">
        <h1 className="text-4xl font-bold text-black">Pricing</h1>
        <p className="text-black/50 mt-2">Simple, transparent pricing for every student</p>
      </div>

      <PricingSection currentPlan={isPro ? 'pro' : 'free'} />

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-black text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-black/10 bg-white">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-black">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/35 shrink-0 ml-4 transition-transform ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="px-5 pb-4 text-sm text-black/55">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
