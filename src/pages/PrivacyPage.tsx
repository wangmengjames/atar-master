import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gh-text-secondary mb-4">Last updated: 16 February 2026</p>

      <div className="space-y-6 text-gh-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">1. Introduction</h2>
          <p>
            ATAR Master ("we", "our", "us") operates the website atarmaster.com. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">2. Information We Collect</h2>
          <p className="mb-2">When you create an account or use our service, we may collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Account information:</strong> Email address and name (provided via email signup or Google OAuth)</li>
            <li><strong>Usage data:</strong> Your learning progress, quiz scores, streak data, and achievements</li>
            <li><strong>Payment information:</strong> Processed securely by Stripe — we do not store your card details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain our learning platform</li>
            <li>To track your learning progress and personalise your experience</li>
            <li>To process payments for premium subscriptions</li>
            <li>To communicate with you about your account or service updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">4. Data Storage & Security</h2>
          <p>
            Your data is stored securely using Supabase (hosted in Sydney, Australia). We use industry-standard encryption and security practices to protect your information. We do not sell or share your personal data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">5. Third-Party Services</h2>
          <p className="mb-2">We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Supabase:</strong> Authentication and data storage</li>
            <li><strong>Stripe:</strong> Payment processing</li>
            <li><strong>Google:</strong> OAuth sign-in</li>
            <li><strong>Vercel:</strong> Website hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access, update, or delete your personal information</li>
            <li>Export your learning data</li>
            <li>Delete your account at any time</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">7. Cookies</h2>
          <p>
            We use essential cookies for authentication and session management. We do not use third-party tracking cookies or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">8. Children's Privacy</h2>
          <p>
            Our service is designed for VCE students (typically aged 15-18). We do not knowingly collect information from children under 13. If you are under 13, please do not use our service without parental consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:drjarvisw@gmail.com" className="text-blue-400 hover:underline">drjarvisw@gmail.com</a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gh-border">
        <Link to="/" className="text-blue-400 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}
