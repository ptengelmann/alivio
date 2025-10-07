import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EditorialBanner() {
  return (
    <section className="relative bg-black border-t border-zinc-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Side */}
        <motion.div
          className="relative aspect-square lg:aspect-auto lg:min-h-[600px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Placeholder for editorial image */}
          <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-black text-zinc-800 mb-4 font-mono">ALV</div>
              <div className="text-xs text-zinc-700 font-mono">EDITORIAL_IMAGE</div>
            </div>
          </div>

          {/* Label overlay */}
          <div className="absolute top-6 left-6">
            <div className="px-3 py-2 bg-black/90 border border-zinc-700">
              <div className="text-xs font-mono text-white tracking-wider">
                EMOTIONAL_CONTRABAND
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          className="bg-zinc-950 p-12 lg:p-16 flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-lg">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-zinc-700" />
              <div className="font-mono text-xs text-zinc-500 tracking-[0.3em]">
                ABOUT_ALÍVIO
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 font-mono leading-tight">
              RELIEF IS<br />REVOLUTIONARY
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8 text-zinc-400 leading-relaxed">
              <p>
                Laboratory-grade streetwear. Each garment infused with emotional compounds,
                authenticated, and documented.
              </p>
              <p className="text-sm">
                We manufacture in restricted batches. Premium materials. Underground distribution.
                Limited availability.
              </p>
            </div>

            {/* Specs */}
            <div className="space-y-3 mb-8 pb-8 border-b border-zinc-800">
              {[
                { label: 'ESTABLISHED', value: '2024' },
                { label: 'LOCATION', value: 'LONDON_UK' },
                { label: 'QUALITY', value: '99.7%_VERIFIED' }
              ].map(spec => (
                <div key={spec.label} className="flex justify-between items-center">
                  <span className="font-mono text-xs text-zinc-600">{spec.label}</span>
                  <span className="font-mono text-xs text-white">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="inline-block border border-zinc-700 text-white py-3 px-8 font-mono text-xs font-bold hover:border-white hover:bg-white hover:text-black transition-all"
              data-cursor="READ"
            >
              READ_MANIFESTO
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
