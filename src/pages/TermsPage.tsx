import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-gh-text-secondary mb-4">Last updated: 16 February 2026</p>

      <div className="space-y-6 text-gh-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ATAR Master (atarmaster.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">2. Description of Service</h2>
          <p>
            ATAR Master is an online learning platform for VCE Mathematical Methods. We provide practice questions, past exam papers, skill tracking, and study tools to help students prepare for their VCE exams.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">3. Accounts</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must provide accurate information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must not share your account with others</li>
            <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">4. Free and Pro Plans</h2>
          <p className="mb-2">ATAR Master offers both free and paid (Pro) tiers:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Free plan:</strong> Access to limited exam papers and basic practice questions</li>
            <li><strong>Pro plan:</strong> Full access to all content, including all exam papers, advanced practice, and premium features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">5. Payments & Subscriptions</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Pro subscriptions are billed monthly or annually via Stripe</li>
            <li>You can cancel your subscription at any time — access continues until the end of the billing period</li>
            <li>Refunds are handled on a case-by-case basis</li>
            <li>Prices are in Australian Dollars (AUD) and may change with notice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">6. Content & Intellectual Property</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>VCAA exam questions are sourced from publicly available past papers and remain the property of VCAA</li>
            <li>Original training questions and platform content are owned by ATAR Master</li>
            <li>You may not reproduce, distribute, or commercially use our content without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">7. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the service for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to other accounts or systems</li>
            <li>Scrape, copy, or redistribute our content</li>
            <li>Interfere with the proper functioning of the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">8. Disclaimer</h2>
          <p>
            ATAR Master is a supplementary study tool. We do not guarantee any specific ATAR score or exam result. Our content is provided "as is" and we make no warranties about its completeness or accuracy. Always consult your teacher and the official VCAA study design.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by Australian law, ATAR Master shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">10. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Victoria, Australia. Any disputes shall be resolved in the courts of Victoria.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">11. Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gh-text-primary mb-3">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
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
