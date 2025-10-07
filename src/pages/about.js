import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Lock, Zap, Shield, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Brand | Alívio - Emotional Contraband</title>
        <meta name="description" content="London-based emotional contraband manufacturing. Laboratory-grade streetwear, limited batch production." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        {/* About Section */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left - Text */}
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                  About_Us
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-8 leading-tight">
                  Emotional contraband from London
                </h1>
                <div className="space-y-6 text-sm text-zinc-400 leading-relaxed font-light tracking-wide">
                  <p>
                    Alívio is a London-based streetwear brand that treats emotion as raw material. We don't reference feelings—we extract them, refine them, and infuse them into every piece we create.
                  </p>
                  <p>
                    Founded in 2024, we operate on a philosophy that intensity doesn't scale. Our production is deliberately limited, our quality standards are uncompromising, and our two core emotions—Euphoria and Rage—are documented, authenticated, and released in controlled batches.
                  </p>
                  <p>
                    Each garment carries a batch number and classification. This isn't marketing language. It's proof of origin, potency verification, and a commitment to manufacturing streetwear that refuses to stay neutral.
                  </p>
                </div>
              </div>

              {/* Right - Image */}
              <div className="aspect-video lg:aspect-[4/3] overflow-hidden">
                <img
                  src="/hero.png"
                  alt="Alívio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="py-12 lg:py-16 border-t border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="mb-12">
              <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                What_We_Do
              </div>
              <h2 className="text-3xl lg:text-4xl font-light text-white tracking-tight">
                Our Process
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {[
                {
                  icon: Lock,
                  label: "Limited Production",
                  description: "Small batch manufacturing to maintain quality and intensity"
                },
                {
                  icon: Shield,
                  label: "Batch Authentication",
                  description: "Every piece tracked, numbered, and verified for authenticity"
                },
                {
                  icon: Target,
                  label: "Two Core Emotions",
                  description: "Euphoria and Rage in permanent rotation, no seasonal dilution"
                },
                {
                  icon: Zap,
                  label: "London Based",
                  description: "All design, testing, and quality control done on-site"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-sm text-white mb-3 uppercase tracking-wide font-light">
                    {item.label}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light tracking-wide">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 lg:py-16 border-t border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 leading-tight tracking-tight">
                Explore the current batch
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/collections"
                  className="inline-flex bg-white text-black py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300"
                >
                  Shop Collections
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex border border-zinc-700/30 text-white py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:border-zinc-500 transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
