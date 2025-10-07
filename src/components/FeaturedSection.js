import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatMoney } from '../lib/money';

export default function FeaturedSection({ featuredProducts = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (featuredProducts.length === 0) {
    return (
      <section className="bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="text-xs font-mono text-zinc-500 mb-4">COLLECTION_UNAVAILABLE</div>
          <div className="text-2xl font-black text-white mb-8 font-mono">
            NEW_DROPS_COMING_SOON
          </div>
          <Link
            href="/collections"
            className="inline-block border border-zinc-800 text-white py-3 px-8 font-mono text-xs hover:border-white transition-colors"
          >
            VIEW_COLLECTIONS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black border-t border-zinc-900">
      {/* Minimal Header */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-zinc-500 mb-2">CURRENT_DROPS</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden sm:block border border-zinc-800 text-white py-2 px-6 font-mono text-xs hover:border-white hover:bg-white hover:text-black transition-all"
            data-cursor="BROWSE"
          >
            VIEW_ALL
          </Link>
        </div>
      </div>

      {/* Large Product Grid */}
      <div className="max-w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.05 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <Link
                href={`/products/${product.handle}`}
                className="group block border border-zinc-900 hover:border-white transition-colors"
                data-cursor="VIEW"
              >
                {/* Large Product Image */}
                <div className="aspect-[3/4] relative overflow-hidden bg-zinc-950">
                  {product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-black text-zinc-800 mb-2 font-mono">
                          ALV
                        </div>
                        <div className="text-xs text-zinc-700 font-mono">NO_IMAGE</div>
                      </div>
                    </div>
                  )}

                  {/* Minimal Overlay - Only on hover */}
                  <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border border-white text-white py-3 px-8 font-mono text-xs font-bold">
                        VIEW_PRODUCT
                      </div>
                    </div>
                  </div>

                  {/* Stock indicator - top right */}
                  <div className="absolute top-3 right-3">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Product Info - Minimal */}
                <div className="p-4 bg-black border-t border-zinc-900">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono text-xs text-white truncate mb-1">
                        {product.title.toUpperCase()}
                      </h3>
                      <div className="text-[10px] text-zinc-500 font-mono truncate">
                        {product.emotion?.name?.toUpperCase() || product.collection?.title?.toUpperCase() || 'ALÍVIO'}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-white font-bold whitespace-nowrap">
                      {product.priceRange?.minVariantPrice?.amount
                        ? formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                        : product.variants?.edges?.[0]?.node?.price?.amount
                          ? formatMoney(product.variants.edges[0].node.price.amount, product.variants.edges[0].node.price.currencyCode)
                          : product.variants?.[0]?.price
                            ? formatMoney(product.variants[0].price, 'GBP')
                            : '—'}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="text-xs font-mono text-zinc-500 mb-4">
            {featuredProducts.length} PRODUCTS_AVAILABLE
          </div>
          <Link
            href="/collections"
            className="inline-block bg-white text-black py-4 px-12 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
            data-cursor="SHOP"
          >
            SHOP_ALL_PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
