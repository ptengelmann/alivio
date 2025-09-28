import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal, Square } from 'lucide-react';

export default function HeroSection({ openDiagnostic, emotionsWithStats = [], featuredProducts = [] }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    // Generate session ID only on client
    setSessionId(Math.random().toString(36).substr(2, 8).toUpperCase());

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Authentication sequence
    setTimeout(() => setIsLoaded(true), 800);
    setTimeout(() => setAccessLevel(1), 1200);
    setTimeout(() => setAccessLevel(2), 1600);
    setTimeout(() => setAccessLevel(3), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Brutalist grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Authentication header */}
      <motion.div
        className="absolute top-8 left-8 right-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-4">
            <Terminal className="w-3 h-3" />
            <span className="text-white">ALÍVIO_DATABASE</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-1 h-1 ${
                    accessLevel >= level ? 'bg-white' : 'bg-zinc-800'
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          </div>
          <div className="text-zinc-600">{systemTime}</div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-12 gap-0">

        {/* Left column - Typography */}
        <div className="col-span-12 lg:col-span-7 flex items-center p-8 lg:p-16">
          <div className="max-w-4xl">

            {/* Authentication status */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: accessLevel >= 1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 text-xs font-mono mb-2">
                <Square className="w-2 h-2 fill-current" />
                <span className="text-zinc-400">ACCESS_GRANTED</span>
              </div>
              <div className="text-xs text-zinc-600 font-mono">
                SESSION_ID: {sessionId || 'LOADING'}
              </div>
            </motion.div>

            {/* Main title - Fashion brand focus */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, x: -60 }}
              animate={{
                opacity: accessLevel >= 2 ? 1 : 0,
                x: accessLevel >= 2 ? 0 : -60
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black leading-[0.8] tracking-tighter mb-4">
                ALÍVIO
              </h1>

              {/* Fashion-focused subtitle */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-white w-8" />
                <div className="font-mono text-xs text-zinc-400 tracking-[0.2em]">
                  STREETWEAR_MANUFACTURING_PROTOCOL
                </div>
              </div>
            </motion.div>

            {/* Clothing brand information */}
            <motion.div
              className="mb-12 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: accessLevel >= 3 ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                Underground streetwear. Each garment infused with authentic emotional compounds.
                Manufactured in restricted batches.
              </div>

              <div className="font-mono text-sm text-zinc-400">
                T-shirts • Hoodies • Accessories. Contraband-grade quality. Limited drops.
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: accessLevel >= 3 ? 1 : 0,
                y: accessLevel >= 3 ? 0 : 20
              }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <button
                onClick={() => openDiagnostic('hero')}
                className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                data-cursor="INITIATE"
              >
                INITIATE_SCAN
              </button>

              <Link
                href="/collections"
                className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                data-cursor="ACCESS"
              >
                BROWSE_CLOTHING_COLLECTION
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right column - Data interface */}
        <div className="col-span-12 lg:col-span-5 border-l border-zinc-900 p-8 lg:p-16 flex items-center">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 40 }}
            animate={{
              opacity: accessLevel >= 2 ? 1 : 0,
              x: accessLevel >= 2 ? 0 : 40
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >

            {/* System status */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-zinc-400">SYSTEM_STATUS</div>
                <div className="w-2 h-2 bg-white animate-pulse" />
              </div>

              <div className="space-y-3">
                {[
                  { label: "CLOTHING_LINES", value: emotionsWithStats.length.toString().padStart(2, '0'), status: "VERIFIED" },
                  { label: "TOTAL_PRODUCTS", value: emotionsWithStats.reduce((sum, e) => sum + (e.productCount || 0), 0).toString().padStart(2, '0'), status: "AUTHENTICATED" },
                  { label: "MANUFACTURING", value: "LIVE", status: "OPERATIONAL" },
                  { label: "AVAILABLE_STOCK", value: emotionsWithStats.reduce((sum, e) => sum + (e.availableProducts || 0), 0).toString().padStart(2, '0'), status: "VERIFIED" }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex justify-between py-2 border-b border-zinc-900"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <span className="font-mono text-xs text-zinc-400">{item.label}</span>
                    <span className="font-mono text-xs text-white">{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Current drops */}
            <div className="mb-8">
              <div className="font-mono text-xs text-zinc-400 mb-4">CURRENT_DROPS</div>

              <div className="grid grid-cols-2 gap-2">
                {featuredProducts.slice(0, 4).map((product, index) => {
                  const emotionColors = {
                    'euphoria': 'border-indigo-500',
                    'rage': 'border-red-500',
                    'anxiety': 'border-amber-500',
                    'melancholy': 'border-slate-500'
                  };
                  const emotion = product.emotion?.id || 'default';
                  const borderColor = emotionColors[emotion] || 'border-zinc-500';

                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.handle}`}
                      className={`border ${borderColor} p-3 bg-black hover:bg-zinc-950 transition-colors cursor-pointer block`}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                        data-cursor="EXAMINE"
                      >
                        <div className="font-mono text-xs text-white">
                          {product.title.slice(0, 8).toUpperCase()}
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500 mt-1">
                          {product.productType?.toUpperCase() || 'PRODUCT'}
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick access */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <button
                onClick={() => openDiagnostic('system')}
                className="w-full border border-zinc-800 py-3 px-4 font-mono text-xs hover:border-white transition-colors text-left"
                data-cursor="SCAN"
              >
                RUN_EMOTIONAL_DIAGNOSTICS
              </button>

              <Link
                href="/collections"
                className="block w-full border border-zinc-800 py-3 px-4 font-mono text-xs hover:border-white transition-colors"
                data-cursor="BROWSE"
              >
                BROWSE_CLOTHING_CATALOG
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Minimal accent - single emotion hint */}
      <motion.div
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: accessLevel >= 3 ? 0.6 : 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="w-2 h-2 bg-indigo-500 animate-pulse" />
      </motion.div>
    </section>
  );
}