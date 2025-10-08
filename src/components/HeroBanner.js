import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroBanner({ openDiagnostic }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image with dark gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt="Alívio Hero"
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Minimalist Text Overlay - Bottom Right */}
      <div className="absolute bottom-0 right-0 p-12 lg:p-20 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-right"
        >
          <div className="text-[9px] tracking-[0.3em] text-white mb-6 uppercase font-medium">
            Emotional_Contraband
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-white mb-6 leading-[0.95] tracking-tight">
            Authenticated<br />
            Emotional<br />
            Contraband
          </h1>
          <p className="text-xs text-zinc-200 leading-relaxed mb-8 font-light tracking-wide">
            Two core emotions. Limited batch production.<br />
            London-based authentication.
          </p>
          <div className="flex flex-col gap-3 items-end">
            <Link
              href="/collections"
              className="inline-flex bg-zinc-900 text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-700 transition-all font-medium"
              data-cursor="SHOP"
            >
              Shop Now
            </Link>
            <button
              onClick={() => openDiagnostic('hero')}
              className="inline-flex text-zinc-900 px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:text-zinc-700 transition-all font-light border border-zinc-900 hover:border-zinc-700"
              data-cursor="SCAN"
            >
              Find Your Emotion
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
