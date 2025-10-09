import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner({ openDiagnostic = () => {} }) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with dark gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <img
          src="/hero.png"
          alt="Alívio Hero"
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] sm:object-[center_30%]"
          style={{ minHeight: '100%', minWidth: '100%' }}
        />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Minimalist Text Overlay - Left Side */}
      <div className="relative w-full h-full flex items-end justify-start p-6 sm:p-8 lg:p-12 xl:p-16">
        <div className="max-w-[1400px] w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl pb-8 sm:pb-12"
          >
            {/* Tag */}
            <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-white/90 mb-3 sm:mb-4 uppercase font-medium">
              Emotional_Contraband
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight">
              Alívio™ | Authenticated Emotional Contraband
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-5 sm:mb-6 font-light tracking-wide">
              Laboratory-grade streetwear. Launching with Euphoria and Rage—refined, batch-numbered, and authenticated. Limited production runs from Preston.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/collections"
                className="inline-flex bg-white text-zinc-900 px-8 py-3 sm:px-10 sm:py-3.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] hover:bg-zinc-100 transition-all font-medium"
                data-cursor="SHOP"
              >
                Shop Now
              </Link>
              <button
                onClick={() => openDiagnostic('hero')}
                className="inline-flex text-white px-8 py-3 sm:px-10 sm:py-3.5 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] hover:bg-white/10 transition-all font-light border border-white/40 hover:border-white/60"
                data-cursor="SCAN"
              >
                Find Your Emotion
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}