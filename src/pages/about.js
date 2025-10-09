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
        <meta name="description" content="Preston-based emotional contraband manufacturing. Laboratory-grade streetwear, limited batch production." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Hero Statement */}
        <div className="py-12 sm:py-16 lg:py-20 border-b border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Text */}
              <div>
                <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 mb-4 uppercase">
                  About_Alívio
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-6 leading-[1.1]">
                  We don't sell clothing.<br />We distribute emotional contraband.
                </h1>
                <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-light tracking-wide">
                  Preston-based streetwear manufacturing that treats emotion as raw material. Laboratory-tested, batch-numbered, classified by emotional signature.
                </p>
              </div>

              {/* Right - Image */}
              <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                <img
                  src="/blog.png"
                  alt="Alívio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Story Grid */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Origin */}
              <div className="space-y-4">
                <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
                  01_Origin
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 tracking-tight">
                  Founded in Preston, 2025
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide">
                  We operate on a philosophy that intensity doesn't scale. Our production is deliberately limited, our quality standards are uncompromising. Each garment carries a batch number and classification—proof of origin, potency verification, and a commitment to manufacturing streetwear that refuses to stay neutral.
                </p>
              </div>

              {/* Philosophy */}
              <div className="space-y-4">
                <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
                  02_Philosophy
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 tracking-tight">
                  Emotional Architecture
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide">
                  We don't reference feelings—we extract them, refine them, and infuse them into every piece we create. Starting with two core emotions (Euphoria and Rage), we're building a complete emotional archive. Each new emotion is documented, authenticated, and released in controlled batches.
                </p>
              </div>

              {/* Production */}
              <div className="space-y-4">
                <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
                  03_Production
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 tracking-tight">
                  Laboratory Standards
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide">
                  Every piece is laboratory-tested, batch-numbered, and classified by emotional signature. This isn't marketing language—it's verification. Small batch production maintains quality and intensity. All design, testing, and quality control done in Preston.
                </p>
              </div>

              {/* Future */}
              <div className="space-y-4">
                <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
                  04_Expansion
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 tracking-tight">
                  The Archive Grows
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide">
                  Euphoria and Rage are just the beginning. We're developing an entire emotional archive—each new collection explores a different state, classified and authenticated with the same rigor. This is how feelings move through the underground.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet the Founders */}
        <div className="py-12 sm:py-16 lg:py-20 border-t border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 mb-4 uppercase">
              The_Team
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900 mb-3 sm:mb-4 leading-tight tracking-tight">
              Meet the Founders
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide mb-6 sm:mb-8 max-w-xl mx-auto">
              Two Brazilian founders bringing emotional contraband to Preston.
            </p>
            <Link
              href="/about/founders"
              className="inline-flex border border-zinc-300 text-zinc-900 py-3 sm:py-3.5 px-8 sm:px-10 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-light hover:border-zinc-900 transition-all"
            >
              Meet the Team
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 sm:py-16 lg:py-20 border-t border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900 mb-6 sm:mb-8 leading-tight tracking-tight">
              Explore Current Batches
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/collections"
                className="inline-flex bg-zinc-900 text-white py-3 sm:py-3.5 px-8 sm:px-10 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-zinc-700 transition-all"
              >
                Shop Collections
              </Link>
              <Link
                href="/contact"
                className="inline-flex border border-zinc-300 text-zinc-900 py-3 sm:py-3.5 px-8 sm:px-10 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-light hover:border-zinc-900 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
