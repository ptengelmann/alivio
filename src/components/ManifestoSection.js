import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Square, Zap } from 'lucide-react';

export default function ManifestoSection({ openDiagnostic }) {
  return (
    <section className="bg-black border-t border-zinc-900">
      <div className="max-w-full">
        {/* Section header - Brutalist */}
        <div className="grid grid-cols-12 border-b border-zinc-900">
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
            <motion.div
              className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Square className="w-2 h-2 fill-current" />
              <span>BRAND_MANIFESTO.TXT</span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.8]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              BRAND<br />PHILOSOPHY
            </motion.h2>

            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
                Fashion is conformity. Mass production strips individuality.
                Most people accept generic streetwear manufactured without soul or purpose.
              </div>

              <div className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
                <span className="text-white font-mono">We manufacture differently.</span> Each garment
                is infused with authentic emotional compounds, crafted in limited batches, and released through
                underground drops. Authentic. Limited. Premium.
              </div>

              <div className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
                Alívio exists to provide <span className="text-white font-mono">relief</span> from fashion
                conformity. We create wearable emotions. Manufacture authentic streetwear.
                Distribute through exclusive collections.
              </div>

              <div className="font-mono text-sm text-zinc-400 border-l-2 border-zinc-800 pl-4">
                Relief is revolutionary. Authenticity is rare. We manufacture both.
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => openDiagnostic('manifesto')}
                className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider transition-all hover:bg-zinc-100"
                data-cursor="ANALYZE"
              >
                RUN_EMOTIONAL_ANALYSIS
              </button>

              <Link
                href="/collections"
                className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider transition-all hover:border-white"
                data-cursor="ACCESS"
              >
                SHOP_COLLECTIONS
              </Link>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {/* Operating principles */}
              <div>
                <div className="font-mono text-xs text-zinc-400 mb-6">MANUFACTURING_PRINCIPLES</div>
                <div className="space-y-4">
                  {[
                    { principle: "QUALITY_OVER_QUANTITY", status: "ENFORCED" },
                    { principle: "LIMITED_OVER_MASS_PRODUCTION", status: "VERIFIED" },
                    { principle: "AUTHENTICITY_OVER_IMITATION", status: "ACTIVE" },
                    { principle: "EMOTION_OVER_CONFORMITY", status: "ONGOING" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.principle}
                      className="flex justify-between py-2 border-b border-zinc-800"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <span className="text-xs font-mono text-zinc-500">{item.principle}</span>
                      <span className="text-xs font-mono text-white">{item.status}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Manufacturing network */}
              <div>
                <div className="font-mono text-xs text-zinc-400 mb-6">PRODUCTION_STATUS</div>
                <div className="space-y-4">
                  {[
                    { node: "DESIGN_STUDIO", status: "OPERATIONAL" },
                    { node: "MANUFACTURING_FACILITY", status: "ACTIVE" },
                    { node: "QUALITY_CONTROL", status: "VERIFIED" },
                    { node: "DISTRIBUTION_NETWORK", status: "LIVE" }
                  ].map((node, index) => (
                    <div key={node.node} className="flex items-center justify-between">
                      <span className="text-xs font-mono text-zinc-500">{node.node}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white">{node.status}</span>
                        <div className="w-1 h-1 bg-white animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authentication */}
              <div className="pt-6 border-t border-zinc-800">
                <button
                  onClick={() => openDiagnostic('network')}
                  className="w-full border border-zinc-800 py-3 px-4 font-mono text-xs hover:border-white transition-colors"
                  data-cursor="VERIFY"
                >
                  VERIFY_PRODUCTION_STATUS
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Classification footer */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 p-8 lg:p-16 border-r border-zinc-900 bg-zinc-950">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <div className="font-mono text-xs text-zinc-400">
                CLASSIFICATION: PREMIUM • DISTRIBUTION: LIMITED_DROPS_ONLY
              </div>
              <div className="font-mono text-xs text-zinc-600">
                ALIVIO_BRAND_ID: ████████
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}