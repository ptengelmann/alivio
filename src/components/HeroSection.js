import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection({ openDiagnostic }) {
  const [accessLevel, setAccessLevel] = useState(0);

  useEffect(() => {
    setTimeout(() => setAccessLevel(1), 1000);
    setTimeout(() => setAccessLevel(2), 1400);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center pt-20">

      {/* Massive background image - faded */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('/hero.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Brutalist grid - keeping your aesthetic */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main centered content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">

        {/* Big ALÍVIO heading - reduced sizes */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: accessLevel >= 1 ? 1 : 0,
            y: accessLevel >= 1 ? 0 : 40
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-black leading-[0.8] tracking-tighter mb-6">
            ALÍVIO
          </h1>
        </motion.div>

        {/* Subheader - reduced sizes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: accessLevel >= 2 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 max-w-3xl"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-white/40 w-8" />
            <div className="font-mono text-[10px] sm:text-xs text-zinc-400 tracking-[0.25em]">
              EMOTIONAL_CONTRABAND
            </div>
            <div className="h-px bg-white/40 w-8" />
          </div>

          <p className="text-base sm:text-lg md:text-xl font-light text-zinc-300 leading-relaxed mb-3">
            Laboratory-grade streetwear. Each piece authenticated,
            <br className="hidden sm:block" />
            documented, and infused with emotional compounds.
          </p>

          <div className="font-mono text-[10px] text-zinc-600 tracking-wider">
            CLASSIFIED_DISTRIBUTION • RESTRICTED_BATCHES • UK
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: accessLevel >= 2 ? 1 : 0,
            y: accessLevel >= 2 ? 0 : 20
          }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/collections"
            className="bg-white text-black py-4 px-10 font-mono font-bold text-sm tracking-wider hover:bg-zinc-200 transition-all duration-300"
          >
            ACCESS_CATALOG
          </Link>

          <button
            onClick={() => openDiagnostic?.('hero')}
            className="border border-zinc-800 text-white py-4 px-10 font-mono font-bold text-sm tracking-wider hover:border-white hover:bg-zinc-900 transition-all duration-300"
          >
            RUN_DIAGNOSTIC
          </button>
        </motion.div>
      </div>

      {/* Bottom indicators - keeping the contraband vibe */}
      <motion.div
        className="absolute bottom-6 left-6 right-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: accessLevel >= 2 ? 1 : 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex justify-between items-center font-mono text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-indigo-500 animate-pulse" />
            <span className="hidden sm:inline">BATCH_AUTHENTICATED</span>
          </div>
          <span className="hidden sm:inline">PURITY_99.7%</span>
        </div>
      </motion.div>
    </section>
  );
}