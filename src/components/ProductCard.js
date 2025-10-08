import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMoney } from '../lib/money';

export default function ProductCard({ product, emotion, index = 0 }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Get all product images - handle both Shopify GraphQL and REST API formats
  let allImages = [];

  if (product.images?.edges && product.images.edges.length > 0) {
    // GraphQL format
    allImages = product.images.edges.map(edge => edge.node);
  } else if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    // REST API format or direct array
    allImages = product.images;
  } else if (product.featuredImage) {
    // Fallback to featured image only
    allImages = [product.featuredImage];
  }

  const hasMultipleImages = allImages.length > 1;

  console.log('Product:', product.title, 'Images count:', allImages.length, 'Has multiple:', hasMultipleImages);

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/products/${product.handle}`}
        className="group block"
        data-cursor="VIEW"
      >
        {/* Product Image Container */}
        <div className="aspect-square overflow-hidden mb-4 relative bg-zinc-50">
          <AnimatePresence mode="wait">
            {allImages.length > 0 ? (
              <motion.img
                key={currentImageIndex}
                src={allImages[currentImageIndex].url || allImages[currentImageIndex].src || allImages[currentImageIndex]}
                alt={allImages[currentImageIndex].altText || allImages[currentImageIndex].alt || product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                <div className="text-6xl font-light text-zinc-800">ALV</div>
              </div>
            )}
          </AnimatePresence>

          {/* Image Navigation Arrows - Only show on hover if multiple images */}
          {hasMultipleImages && isHovered && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-900 transition-colors z-10"
                data-cursor="PREV"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-zinc-900 transition-colors z-10"
                data-cursor="NEXT"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>

              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-zinc-900/80 backdrop-blur-sm text-white text-[9px] tracking-wider">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}

          {/* Subtle Classification Badge */}
          {emotion && emotion.contraband?.classification && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 text-[8px] tracking-wider backdrop-blur-sm"
              style={{
                backgroundColor: `${emotion.colors.primary}15`,
                color: emotion.colors.accent,
                border: `1px solid ${emotion.colors.accent}30`
              }}
            >
              {emotion.contraband.classification}
            </div>
          )}
        </div>

        {/* Product Info - Minimal */}
        <div className="space-y-1">
          <h3 className="text-xs font-light text-zinc-900 leading-tight tracking-wide group-hover:text-zinc-700 transition-colors uppercase">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-700 tracking-wider">
              {product.priceRange?.minVariantPrice?.amount
                ? formatMoney(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )
                : product.variants?.edges?.[0]?.node?.price?.amount
                ? formatMoney(
                    product.variants.edges[0].node.price.amount,
                    product.variants.edges[0].node.price.currencyCode
                  )
                : product.variants?.[0]?.price
                ? formatMoney(product.variants[0].price, 'GBP')
                : '—'}
            </div>
            {emotion && (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: emotion.colors.accent }}
                title={emotion.name}
              />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
