import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroImage({
  imageUrl = '/hero.png',
  title = 'EUPHORIA',
  subtitle = 'VOL-1 • NOW AVAILABLE',
  ctaText = 'SHOP_NOW',
  ctaLink = '/collections/euphoria',
  overlayOpacity = 0.4
}) {
  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Full-screen campaign image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        {/* Overlay for text readability */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Minimal content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        <div className="max-w-7xl mx-auto w-full px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Collection label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-white/60" />
              <div className="font-mono text-xs text-white/80 tracking-[0.3em]">
                {subtitle}
              </div>
            </div>

            {/* Main title */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.85]">
              {title}
            </h1>

            {/* CTA */}
            <Link
              href={ctaLink}
              className="inline-block bg-white text-black py-4 px-10 font-mono font-bold text-sm tracking-wider hover:bg-zinc-200 transition-all"
            >
              {ctaText}
            </Link>
          </motion.div>
        </div>

        {/* Bottom info bar */}
        <motion.div
          className="border-t border-white/20 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between text-xs font-mono text-white/60">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                  <span className="hidden sm:inline">BATCH_AUTHENTICATED</span>
                </div>
                <span className="hidden md:inline">LABORATORY_GRADE</span>
              </div>
              <span className="hidden sm:inline">SCROLL_TO_SHOP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
