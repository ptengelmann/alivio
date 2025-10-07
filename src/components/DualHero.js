import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DualHero({ collections = [] }) {
  const [hoveredSide, setHoveredSide] = useState(null);

  // Get first two collections (Euphoria and Rage)
  const leftCollection = collections[0] || {
    id: 'euphoria',
    name: 'Euphoria',
    colors: { primary: '#6366f1', accent: '#818cf8' },
    tagline: 'CONTROLLED_SUBSTANCE_CLASS_A'
  };

  const rightCollection = collections[1] || {
    id: 'rage',
    name: 'Rage',
    colors: { primary: '#dc2626', accent: '#ef4444' },
    tagline: 'WEAPONS_GRADE_CATALYST'
  };

  // Get hero images from collections (first product image)
  const leftImage = leftCollection.collection?.products?.edges?.[0]?.node?.featuredImage?.url || '/euphoria.png';
  const rightImage = rightCollection.collection?.products?.edges?.[0]?.node?.featuredImage?.url || '/rage.png';

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT SIDE - Collection 1 */}
        <motion.div
          className="relative overflow-hidden group cursor-pointer"
          onHoverStart={() => setHoveredSide('left')}
          onHoverEnd={() => setHoveredSide(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link href={`/collections/${leftCollection.id}`} className="block h-full" data-cursor={`SHOP_${leftCollection.name?.toUpperCase()}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${leftImage}')`,
                  backgroundPosition: 'center'
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />

              {/* Color accent overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundColor: leftCollection.colors?.primary || '#6366f1',
                  opacity: hoveredSide === 'left' ? 0.15 : 0.05
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Empty top spacer */}
              <div />

              {/* Center - Collection Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center px-4"
              >
                {/* New Collection Label - moved here */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: leftCollection.colors?.accent || '#818cf8' }}
                  />
                  <div className="font-mono text-xs text-white/80 tracking-[0.3em]">
                    NEW_COLLECTION
                  </div>
                </motion.div>

                <div className="mb-4 font-mono text-xs text-white/60 tracking-wider">
                  {leftCollection.tagline || leftCollection.contraband?.classification || 'VOL-1'}
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-mono leading-[0.85] whitespace-nowrap">
                  {leftCollection.name?.toUpperCase()}
                </h2>
                <div className="inline-block border-2 border-white text-white py-3 px-8 font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all">
                  SHOP_NOW
                </div>
              </motion.div>

              {/* Bottom - Product Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between text-xs font-mono text-white/60"
              >
                <div>{leftCollection.productCount || 0} PRODUCTS</div>
                <div className="hidden sm:block">LIMITED_AVAILABILITY</div>
              </motion.div>
            </div>
          </Link>

          {/* Vertical Accent Line */}
          <div
            className="absolute top-0 right-0 w-1 h-full transition-all duration-500"
            style={{
              backgroundColor: leftCollection.colors?.accent || '#818cf8',
              opacity: hoveredSide === 'left' ? 1 : 0.3
            }}
          />
        </motion.div>

        {/* RIGHT SIDE - Collection 2 */}
        <motion.div
          className="relative overflow-hidden group cursor-pointer"
          onHoverStart={() => setHoveredSide('right')}
          onHoverEnd={() => setHoveredSide(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link href={`/collections/${rightCollection.id}`} className="block h-full" data-cursor={`SHOP_${rightCollection.name?.toUpperCase()}`}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${rightImage}')`,
                  backgroundPosition: 'center'
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />

              {/* Color accent overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundColor: rightCollection.colors?.primary || '#dc2626',
                  opacity: hoveredSide === 'right' ? 0.15 : 0.05
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-12">
              {/* Empty top spacer */}
              <div />

              {/* Center - Collection Name */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center px-4"
              >
                {/* New Collection Label - moved here */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: rightCollection.colors?.accent || '#ef4444' }}
                  />
                  <div className="font-mono text-xs text-white/80 tracking-[0.3em]">
                    NEW_COLLECTION
                  </div>
                </motion.div>

                <div className="mb-4 font-mono text-xs text-white/60 tracking-wider">
                  {rightCollection.tagline || rightCollection.contraband?.classification || 'VOL-1'}
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 font-mono leading-[0.85] whitespace-nowrap">
                  {rightCollection.name?.toUpperCase()}
                </h2>
                <div className="inline-block border-2 border-white text-white py-3 px-8 font-mono text-xs font-bold tracking-wider hover:bg-white hover:text-black transition-all">
                  SHOP_NOW
                </div>
              </motion.div>

              {/* Bottom - Product Count */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex items-center justify-between text-xs font-mono text-white/60"
              >
                <div className="hidden sm:block">LIMITED_AVAILABILITY</div>
                <div>{rightCollection.productCount || 0} PRODUCTS</div>
              </motion.div>
            </div>
          </Link>

          {/* Vertical Accent Line */}
          <div
            className="absolute top-0 left-0 w-1 h-full transition-all duration-500"
            style={{
              backgroundColor: rightCollection.colors?.accent || '#ef4444',
              opacity: hoveredSide === 'right' ? 1 : 0.3
            }}
          />
        </motion.div>
      </div>

      {/* Center Divider - Desktop only */}
      <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/20 z-20" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs font-mono text-white/40 tracking-wider">SCROLL</div>
          <div className="w-px h-12 bg-white/20" />
        </div>
      </motion.div>
    </section>
  );
}
