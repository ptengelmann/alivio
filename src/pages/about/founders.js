import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FOUNDERS = [
  {
    name: 'Pedro Perez Serapiao',
    role: 'Co-Founder & Creative Director',
    nationality: 'Brazilian',
    bio: 'Leading the creative vision behind Alívio\'s emotional contraband. From concept to execution, Pedro shapes how feelings translate into wearable form.',
    image: '/founder1.png'
  },
  {
    name: 'Erick Ricardo Olisah',
    role: 'Co-Founder & Operations',
    nationality: 'Brazilian',
    bio: 'Managing production, authentication, and batch control. Erick ensures every piece meets laboratory-grade standards from Preston to your hands.',
    image: '/founder2.png'
  }
];

export default function FoundersPage() {
  return (
    <>
      <Head>
        <title>Founders | Alívio - Emotional Contraband</title>
        <meta name="description" content="Meet the Brazilian founders behind Alívio's emotional contraband manufacturing in Preston." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Header */}
        <div className="py-8 sm:py-12 lg:py-16 border-b border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-zinc-600 hover:text-zinc-900 transition-colors mb-6 sm:mb-8 font-light"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to About
            </Link>

            <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 mb-3 sm:mb-4 uppercase">
              The_Founders
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4 leading-[1.1]">
              Two Brazilians in Preston
            </h1>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide max-w-2xl">
              From São Paulo to Preston, Pedro and Erick are building an emotional contraband operation that treats streetwear like laboratory science.
            </p>
          </div>
        </div>

        {/* Founders Grid */}
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {FOUNDERS.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group"
                >
                  {/* Image */}
                  <div className="aspect-[3/4] bg-zinc-100 overflow-hidden mb-4 sm:mb-6">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl sm:text-2xl font-light text-zinc-900 tracking-tight">
                        {founder.name}
                      </h2>
                      <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 uppercase">
                        {founder.nationality}
                      </div>
                    </div>

                    <div className="text-[9px] sm:text-[10px] tracking-[0.25em] text-zinc-600 uppercase font-light">
                      {founder.role}
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide pt-2">
                      {founder.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy Statement */}
        <div className="py-12 sm:py-16 lg:py-20 border-t border-zinc-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 mb-4 uppercase">
                Our_Mission
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-900 tracking-tight mb-4 sm:mb-6 leading-[1.1]">
                "Emotion isn't decoration. It's the formula."
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light tracking-wide mb-8 sm:mb-10">
                We started Alívio because streetwear stopped taking risks. Everything became references and nostalgia. We're treating emotions like raw materials—extracting them, refining them, batch-numbering them. This is how feelings move through the underground.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/collections"
                  className="inline-flex bg-zinc-900 text-white py-3 sm:py-3.5 px-8 sm:px-10 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-zinc-700 transition-all"
                >
                  Explore Collections
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
        </div>
      </main>

      <Footer />
    </>
  );
}
