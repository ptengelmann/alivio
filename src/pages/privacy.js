import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Alívio - Emotional Contraband</title>
        <meta name="description" content="Privacy policy for Alívio. Learn how we collect, use, and protect your personal information." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        <div className="py-12 lg:py-16">
          <div className="max-w-[900px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
              Legal
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-12 leading-tight">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-sm text-zinc-400 leading-relaxed font-light tracking-wide">
              <div>
                <p className="mb-4">
                  Last updated: October 2024
                </p>
                <p>
                  At Alívio, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website and services.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Name, email address, and contact details</li>
                  <li>Billing and delivery addresses</li>
                  <li>Payment information (processed securely by our payment provider)</li>
                  <li>Order history and preferences</li>
                  <li>Communications with us</li>
                </ul>
                <p className="mb-4">
                  We also automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">2. How We Use Your Information</h2>
                <p className="mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Process and fulfil your orders</li>
                  <li>Communicate with you about your orders and account</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">3. Legal Basis for Processing (UK GDPR)</h2>
                <p className="mb-4">
                  We process your personal data on the following legal bases:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Performance of contract: To fulfil orders and provide services</li>
                  <li>Legitimate interests: To improve our services and prevent fraud</li>
                  <li>Consent: For marketing communications</li>
                  <li>Legal obligation: To comply with tax and accounting requirements</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">4. Sharing Your Information</h2>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Payment processors to complete transactions</li>
                  <li>Shipping carriers to deliver your orders</li>
                  <li>Service providers who assist in operating our website</li>
                  <li>Law enforcement when required by law</li>
                </ul>
                <p>
                  We do not sell your personal information to third parties.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">5. Cookies</h2>
                <p className="mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Remember your preferences and cart items</li>
                  <li>Understand how you use our site</li>
                  <li>Provide personalised content</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">6. Your Rights</h2>
                <p className="mb-4">
                  Under UK GDPR, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request erasure of your data</li>
                  <li>Restrict processing of your data</li>
                  <li>Object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us at hello@alivio.uk.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">7. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Order information is typically retained for 7 years for tax purposes.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">8. Data Security</h2>
                <p>
                  We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">9. International Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries outside the UK. When we do this, we ensure appropriate safeguards are in place to protect your information in accordance with UK data protection laws.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">10. Children's Privacy</h2>
                <p>
                  Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">11. Changes to This Policy</h2>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">12. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <p className="mb-2">
                  Email: hello@alivio.uk
                </p>
                <p className="mb-4">
                  Alívio<br />
                  London, United Kingdom
                </p>
                <p>
                  You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's data protection authority, if you believe we have not handled your data properly.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-900/50">
              <Link
                href="/terms"
                className="text-xs text-zinc-500 hover:text-white transition-colors tracking-wide"
              >
                View Terms & Conditions →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
