import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Square } from 'lucide-react';
import { formatMoney } from '../lib/money';

export default function FeaturedSection({ featuredProducts = [] }) {
  return (
    <section className="bg-black border-t border-zinc-900">
      <div className="max-w-full">
        {/* Section header - Brutalist */}
        <div className="grid grid-cols-12 border-b border-zinc-900">
          <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 border-r border-zinc-900">
            <motion.div
              className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Square className="w-2 h-2 fill-current" />
              <span>CURRENT_CLOTHING_DROPS</span>
            </motion.div>

            <motion.h2
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.8]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              LATEST<br />DROPS
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-lg text-zinc-300 max-w-2xl">
                Premium streetwear drops. Limited quantities. Emotional compound infusion.
              </div>
              <div className="font-mono text-sm text-zinc-400">
                T-shirts • Hoodies • Accessories. Quality-verified. Underground manufacturing.
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 bg-zinc-950">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="font-mono text-xs text-zinc-400 mb-4">DROP_STATUS</div>
              <div className="space-y-3">
                {[
                  { label: "PRODUCTS_LIVE", value: featuredProducts.length.toString().padStart(2, '0') },
                  { label: "COLLECTIONS_ACTIVE", value: new Set(featuredProducts.map(p => p.collection?.handle)).size.toString().padStart(2, '0') },
                  { label: "QUALITY_VERIFIED", value: "100%" },
                  { label: "MANUFACTURING", value: "COMPLETE" },
                  { label: "STOREFRONT_STATUS", value: "LIVE" }
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between py-2 border-b border-zinc-800">
                    <span className="text-xs font-mono text-zinc-500">{stat.label}</span>
                    <span className="text-xs font-mono text-white">{stat.value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/collections"
                className="block w-full mt-8 border border-zinc-800 py-3 px-4 font-mono text-xs hover:border-white transition-colors text-center"
                data-cursor="VIEW"
              >
                SHOP_ALL_COLLECTIONS
              </Link>
            </motion.div>
          </div>
        </div>


        {/* Products grid - Clinical layout */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-zinc-900">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <motion.div
                key={product.id}
                className="border border-zinc-900 bg-black group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Product image */}
                <div className="aspect-[4/5] relative border-b border-zinc-900">
                  {product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-black text-zinc-700 mb-2 font-mono">
                          {product.emotion?.name?.charAt(0) || 'T'}
                        </div>
                        <div className="text-xs text-zinc-600 font-mono">TEXTILE</div>
                      </div>
                    </div>
                  )}

                  {/* Size range overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                      XS - XL AVAILABLE
                    </div>
                  </div>

                  {/* Item code */}
                  <div className="absolute top-4 right-4">
                    <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-white">
                      ITEM-{product.emotion?.contraband?.batchNumber?.slice(-7) || 'UNKNOWN'}
                    </div>
                  </div>

                  {/* Status indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-2 h-2 bg-white animate-pulse" />
                  </div>
                </div>

                {/* Product data */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <h4 className="font-black font-mono text-white mb-1 text-sm">{product.title}</h4>
                    <div className="text-xs text-zinc-500 font-mono">
                      {product.emotion?.name?.toUpperCase() || 'UNCLASSIFIED'}_COLLECTION
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">PRICE</span>
                      <span className="text-xs font-mono text-white">
                        {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">MATERIAL</span>
                      <span className="text-xs font-mono text-white">
                        100% COTTON
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">STOCK</span>
                      <span className="text-xs font-mono text-white">IN STOCK</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Link
                      href={`/products/${product.handle}`}
                      className="block w-full bg-white text-black py-3 px-4 font-mono font-bold text-xs tracking-wider hover:bg-zinc-100 transition-colors text-center"
                      data-cursor="VIEW"
                    >
                      VIEW_PRODUCT
                    </Link>
                    <button className="w-full border border-zinc-800 text-white py-2 px-4 font-mono text-xs hover:border-white transition-colors">
                      SIZE_GUIDE
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No products fallback */
          <div className="p-16 border-t border-zinc-900 bg-zinc-950">
            <motion.div
              className="max-w-lg mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-black text-white mb-4 font-mono">
                COLLECTION_UNAVAILABLE
              </div>
              <p className="text-zinc-400 mb-8 font-mono text-sm">
                Current clothing drops under production.
                <br />
                New releases coming soon.
              </p>
              <Link
                href="/collections"
                className="border border-zinc-800 text-white py-3 px-6 font-mono font-bold text-xs hover:border-white transition-all"
                data-cursor="ACCESS"
              >
                NOTIFY_ME
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}