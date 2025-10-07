import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Alívio - Emotional Contraband</title>
        <meta name="description" content="Terms and conditions for Alívio. Read our policies before making a purchase." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        <div className="py-12 lg:py-16">
          <div className="max-w-[900px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
              Legal
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-12 leading-tight">
              Terms & Conditions
            </h1>

            <div className="space-y-8 text-sm text-zinc-400 leading-relaxed font-light tracking-wide">
              <div>
                <p className="mb-4">
                  Last updated: October 2024
                </p>
                <p>
                  Welcome to Alívio. By accessing or using our website and purchasing our products, you agree to be bound by these terms and conditions. Please read them carefully.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">1. General Terms</h2>
                <p className="mb-4">
                  These terms apply to all visitors, users, and others who access or use our service. By accessing this website, you warrant and represent that you are at least 18 years of age and have the legal capacity to enter into these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">2. Products & Orders</h2>
                <p className="mb-4">
                  All products are subject to availability. We reserve the right to limit quantities of any products or services and to refuse service to anyone at any time. Prices are subject to change without notice.
                </p>
                <p className="mb-4">
                  Product descriptions are provided as accurately as possible. However, we do not warrant that product descriptions, colours, or other content on this site are accurate, complete, reliable, or error-free.
                </p>
                <p>
                  Once an order is placed, you will receive a confirmation email. This does not constitute acceptance of your order. We reserve the right to accept or decline your order for any reason.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">3. Payment</h2>
                <p className="mb-4">
                  We accept major credit cards and other payment methods as displayed at checkout. All payments are processed securely through our payment provider.
                </p>
                <p>
                  You agree to provide current, complete, and accurate purchase and account information. You agree to promptly update your account and payment information as necessary.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">4. Shipping & Delivery</h2>
                <p className="mb-4">
                  We ship to addresses within the United Kingdom and select international locations. Shipping times are estimates and are not guaranteed.
                </p>
                <p className="mb-4">
                  Risk of loss and title for items purchased pass to you upon delivery to the carrier. We are not responsible for delays caused by shipping carriers or customs.
                </p>
                <p>
                  Free shipping is available on orders over £100 to UK addresses only.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">5. Returns & Exchanges</h2>
                <p className="mb-4">
                  We accept returns within 14 days of delivery for unworn, unwashed items in their original condition with all tags attached.
                </p>
                <p className="mb-4">
                  To initiate a return, please contact us at hello@alivio.uk. Return shipping costs are the responsibility of the customer unless the item is defective or we made an error.
                </p>
                <p>
                  Refunds will be processed to the original payment method within 7-10 business days of receiving the returned item.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">6. Intellectual Property</h2>
                <p className="mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Alívio and is protected by UK and international copyright laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">7. Limitation of Liability</h2>
                <p className="mb-4">
                  To the fullest extent permitted by law, Alívio shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our products or services.
                </p>
                <p>
                  Our total liability for any claim arising out of or relating to these terms shall not exceed the amount paid by you for the product in question.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">8. Governing Law</h2>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">9. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this website. Your continued use of the site following any changes constitutes acceptance of those changes.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-white font-light mb-4 tracking-tight">10. Contact</h2>
                <p className="mb-4">
                  If you have any questions about these terms, please contact us:
                </p>
                <p className="mb-2">
                  Email: hello@alivio.uk
                </p>
                <p>
                  Alívio<br />
                  London, United Kingdom
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-900/50">
              <Link
                href="/privacy"
                className="text-xs text-zinc-500 hover:text-white transition-colors tracking-wide"
              >
                View Privacy Policy →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
