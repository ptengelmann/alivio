import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Square } from 'lucide-react';

export default function EmotionsSection({ emotions = [] }) {
  const [selectedEmotion, setSelectedEmotion] = useState(0);

  return (
    <section className="bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-full">
        {/* Section header - Brutalist grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-900">
          <div className="lg:col-span-8 p-4 sm:p-6 lg:p-16 border-b lg:border-b-0 lg:border-r border-zinc-900">
            <motion.div
              className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Square className="w-2 h-2 fill-current" />
              <span>CLOTHING_COLLECTION_DATABASE</span>
            </motion.div>

            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black text-white mb-6 lg:mb-8 font-mono leading-[0.9] break-words"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              CLOTHING<br />COLLECTIONS
            </motion.h2>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-lg text-zinc-300 max-w-2xl">
                Streetwear infused with emotional compounds. Each garment manufactured
                in restricted batches.
              </div>
              <div className="font-mono text-sm text-zinc-400">
                T-shirts • Hoodies • Accessories. Quality-verified. Limited availability.
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 p-4 sm:p-6 lg:p-16 bg-zinc-950">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="font-mono text-xs text-zinc-400 mb-4">COLLECTION_STATUS</div>
              <div className="space-y-3">
                {[
                  { label: "COLLECTIONS_ACTIVE", value: emotions.length.toString().padStart(2, '0') },
                  { label: "TOTAL_PRODUCTS", value: emotions.reduce((sum, e) => sum + (e.productCount || 0), 0).toString().padStart(2, '0') },
                  { label: "AVAILABLE_UNITS", value: emotions.reduce((sum, e) => sum + (e.totalUnits || 0), 0).toString().padStart(3, '0') },
                  { label: "QUALITY_VERIFIED", value: "99.7%" },
                  { label: "MANUFACTURING", value: "LIVE" }
                ].map((stat, index) => (
                  <div key={stat.label} className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-xs font-mono text-zinc-500">{stat.label}</span>
                    <span className="text-xs font-mono text-white">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Protocol showcase - Grid layout */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 border-r border-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedEmotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-8 lg:p-16"
              >
                {/* Garment header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="px-3 py-1 text-xs font-mono border border-zinc-800 text-zinc-400">
                    ITEM-{emotions[selectedEmotion]?.contraband?.batchNumber?.slice(-7) || 'LOADING'}
                  </div>
                  <div className="text-xs font-mono text-zinc-600">
                    TYPE: STREETWEAR
                  </div>
                  <div className="text-xs font-mono text-zinc-600">
                    QUALITY: {emotions[selectedEmotion]?.contraband?.purity || 'PREMIUM'}
                  </div>
                </div>

                <h3 className="text-6xl md:text-8xl font-black text-white mb-4 font-mono leading-[0.8]">
                  {emotions[selectedEmotion]?.name.toUpperCase() || 'LOADING'}
                </h3>

                <div className="text-sm text-zinc-400 mb-8 font-mono">
                  {emotions[selectedEmotion]?.tagline || 'PROCESSING...'}
                </div>

                {/* Single accent line */}
                <div
                  className="w-8 h-px mb-8"
                  style={{
                    backgroundColor: emotions[selectedEmotion]?.colors?.accent || '#71717a'
                  }}
                />

                <div className="text-lg text-zinc-300 mb-12 leading-relaxed max-w-2xl">
                  {emotions[selectedEmotion]?.description || 'Description loading...'}
                </div>

                {/* Garment specs - Clinical layout */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <div className="font-mono text-xs text-zinc-400 mb-3">GARMENT_SPECIFICATIONS</div>
                    {[
                      { label: "MATERIAL", value: "100% COTTON" },
                      { label: "WEIGHT", value: emotions[selectedEmotion]?.intensity || '240GSM' },
                      { label: "FIT", value: emotions[selectedEmotion]?.frequency || 'OVERSIZED' }
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between py-1 border-b border-zinc-900">
                        <span className="font-mono text-xs text-zinc-500">{spec.label}</span>
                        <span className="font-mono text-xs text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="font-mono text-xs text-zinc-400 mb-3">MANUFACTURING_DETAILS</div>
                    {[
                      { label: "BATCH_SIZE", value: "LIMITED" },
                      { label: "PRODUCTION", value: "███" },
                      { label: "QUALITY_GRADE", value: "A+" }
                    ].map((spec) => (
                      <div key={spec.label} className="flex justify-between py-1 border-b border-zinc-900">
                        <span className="font-mono text-xs text-zinc-500">{spec.label}</span>
                        <span className="font-mono text-xs text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real Products from Collection */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {emotions[selectedEmotion]?.collection?.products?.edges?.slice(0, 2).map((product, index) => (
                    <Link
                      key={product.node.id}
                      href={`/products/${product.node.handle}`}
                      className="aspect-[4/5] border border-zinc-800 bg-zinc-900 p-2 group hover:border-white transition-colors"
                    >
                      <div className="w-full h-full relative overflow-hidden">
                        {product.node.featuredImage?.url ? (
                          <img
                            src={product.node.featuredImage.url}
                            alt={product.node.featuredImage.altText || product.node.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-black text-zinc-700 mb-2 font-mono">
                                {emotions[selectedEmotion]?.name?.charAt(0) || 'T'}
                              </div>
                              <div className="text-xs text-zinc-600 font-mono">PRODUCT</div>
                            </div>
                          </div>
                        )}

                        {/* Product metadata */}
                        <div className="absolute bottom-1 left-1 right-1 bg-black/80 p-1">
                          <div className="text-[8px] font-mono text-zinc-400">
                            {product.node.title.toUpperCase()} • AVAILABLE
                          </div>
                        </div>

                        {/* Product number */}
                        <div className="absolute top-1 right-1 bg-white text-black px-1 py-0.5 text-[8px] font-mono font-bold">
                          #{String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </Link>
                  )) || (
                    // Fallback for collections without products
                    <div className="col-span-2 aspect-[4/5] border border-zinc-800 bg-zinc-900 p-2">
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs font-mono text-zinc-600 mb-2">
                            NO PRODUCTS AVAILABLE
                          </div>
                          <div className="text-[10px] font-mono text-zinc-700">COMING SOON</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/collections/${emotions[selectedEmotion]?.id || 'euphoria'}`}
                    className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider transition-all hover:bg-zinc-100"
                    data-cursor="ACQUIRE"
                  >
                    SHOP_COLLECTION
                  </Link>

                  <button className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider transition-all hover:border-white">
                    VIEW_SIZE_CHART
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Protocol selector - Right column */}
          <div className="col-span-12 lg:col-span-4 bg-zinc-950">
            <div className="p-8 lg:p-16">
              <div className="font-mono text-xs text-zinc-400 mb-6">AVAILABLE_COLLECTIONS</div>

              <div className="space-y-2">
                {emotions.map((emotion, index) => (
                  <motion.button
                    key={emotion.id}
                    onClick={() => setSelectedEmotion(index)}
                    className={`w-full text-left p-4 border transition-all font-mono ${
                      index === selectedEmotion
                        ? 'border-white bg-black text-white'
                        : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    data-cursor="SELECT"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-white">{emotion.name.toUpperCase()}</div>
                      <div
                        className="w-2 h-2"
                        style={{ backgroundColor: emotion.colors?.accent || '#71717a' }}
                      />
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      ITEM-{emotion.contraband?.batchNumber?.slice(-7) || 'UNKNOWN'}
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-1">
                      {emotion.productCount || 0} PRODUCTS • {emotion.availableProducts || 0} AVAILABLE
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick stats */}
              <div className="mt-12 pt-8 border-t border-zinc-800">
                <div className="font-mono text-xs text-zinc-400 mb-4">CURRENT_SELECTION</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">STATUS</span>
                    <span className="text-white font-mono">
                      {emotions[selectedEmotion]?.availableProducts > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">PRODUCTS</span>
                    <span className="text-white font-mono">
                      {emotions[selectedEmotion]?.productCount || '0'}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500 font-mono">TOTAL_UNITS</span>
                    <span className="text-white font-mono">
                      {emotions[selectedEmotion]?.totalUnits || '---'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}