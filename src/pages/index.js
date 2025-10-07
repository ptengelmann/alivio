import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { formatMoney } from '../lib/money';
import { Terminal, Package, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getEmotionByHandle } from '../lib/emotions';
import useDiagnostic from '../hooks/useDiagnostic';
import EmotionDiagnostic from '../components/EmotionDiagnostic';

// Import our systems
import { getAllEmotions } from '../lib/emotions';
import { getFeaturedProducts, getCollectionsWithStats } from '../lib/shopify-helpers';

export default function Homepage({ featuredProducts, emotionsWithStats }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { isOpen: isDiagnosticOpen, openDiagnostic, closeDiagnostic } = useDiagnostic();

  // Get emotion for each product based on collection
  const getProductEmotion = (product) => {
    const collectionHandle = product.collections?.edges?.[0]?.node?.handle;
    return collectionHandle ? getEmotionByHandle(collectionHandle) : null;
  };

  // Carousel navigation
  const showcaseProducts = featuredProducts.slice(0, 5);
  const nextProduct = () => {
    setCarouselIndex((prev) => (prev + 1) % showcaseProducts.length);
  };
  const prevProduct = () => {
    setCarouselIndex((prev) => (prev - 1 + showcaseProducts.length) % showcaseProducts.length);
  };

  return (
    <>
      <Head>
        <title>Alívio | Emotional Contraband | Premium Streetwear UK</title>
        <meta name="description" content="Laboratory-grade streetwear. Limited batches. London-based." />
        <meta property="og:title" content="Alívio | Emotional Contraband Streetwear" />
        <meta property="og:type" content="website" />
      </Head>

      <Navbar />

      <main className="font-mono bg-[#0a0a0f] text-zinc-100">
        {/* 1. HERO BANNER - Editorial Style */}
        <section className="relative min-h-screen overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src="/hero.png"
              alt="Alívio Hero"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/40 via-transparent to-[#0a0a0f]/80" />
          </div>

          {/* Minimalist Text Overlay - Bottom Right */}
          <div className="absolute bottom-0 right-0 p-12 lg:p-20 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-right"
            >
              <div className="text-[9px] tracking-[0.3em] text-zinc-400 mb-6 uppercase">
                Emotional_Contraband
              </div>
              <h1 className="text-5xl lg:text-6xl font-light text-white mb-6 leading-[0.95] tracking-tight">
                Authenticated<br />
                Emotional<br />
                Contraband
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed mb-8 font-light tracking-wide">
                Two core emotions. Limited batch production.<br />
                London-based authentication.
              </p>
              <div className="flex flex-col gap-3 items-end">
                <Link
                  href="/collections"
                  className="inline-flex bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all font-medium"
                  data-cursor="SHOP"
                >
                  Shop Now
                </Link>
                <button
                  onClick={() => openDiagnostic('hero')}
                  className="inline-flex text-zinc-300 px-10 py-4 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-all font-light border border-zinc-700/30 hover:border-zinc-400"
                  data-cursor="SCAN"
                >
                  Find Your Emotion
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emotion Diagnostic Modal */}
        <EmotionDiagnostic
          isOpen={isDiagnosticOpen}
          onClose={closeDiagnostic}
          source="hero"
        />

        {/* 2. LABORATORY PRODUCT SHOWCASE - Editorial Grid */}
        <section className="py-24 lg:py-32 bg-[#0a0a0f]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-4 uppercase">
                  Latest_Batch
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                  Featured Items
                </h2>
              </div>

              {/* Minimal Navigation */}
              <div className="flex items-center gap-4 text-zinc-500">
                <button
                  onClick={prevProduct}
                  className="text-xs uppercase tracking-wider hover:text-white transition-colors"
                  data-cursor="PREV"
                >
                  Prev
                </button>
                <span className="text-[10px]">—</span>
                <button
                  onClick={nextProduct}
                  className="text-xs uppercase tracking-wider hover:text-white transition-colors"
                  data-cursor="NEXT"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Editorial Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
              {showcaseProducts.map((product, index) => {
                const emotion = getProductEmotion(product);
                return (
                  <motion.div
                    key={product.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                  >
                    <Link
                      href={`/products/${product.handle}`}
                      className="group block"
                      data-cursor="VIEW"
                    >
                      {/* Product Image - Clean */}
                      <div className="aspect-square overflow-hidden mb-4 relative bg-zinc-50">
                        {product.featuredImage?.url ? (
                          <img
                            src={product.featuredImage.url}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                            <div className="text-6xl font-light text-zinc-800">ALV</div>
                          </div>
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
                        <h3 className="text-xs font-light text-white leading-tight tracking-wide group-hover:text-zinc-400 transition-colors uppercase">
                          {product.title}
                        </h3>
                        <div className="text-[10px] text-zinc-500 tracking-wider">
                          {product.priceRange?.minVariantPrice?.amount
                            ? formatMoney(
                                product.priceRange.minVariantPrice.amount,
                                product.priceRange.minVariantPrice.currencyCode
                              )
                            : '—'}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. CAMPAIGN SECTION - Full Bleed Editorial */}
        <section className="relative">
          <div className="aspect-[21/10] bg-zinc-900 relative overflow-hidden">
            {/* Video Background */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/city.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Minimalist Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-16 z-10">
              <div className="max-w-[1600px] mx-auto flex items-end justify-between">
                {/* Left: Title and Description */}
                <div className="max-w-md">
                  <div className="text-[9px] tracking-[0.3em] text-zinc-400 mb-4 uppercase">
                    Batch_Authentication
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-light text-white mb-4 leading-tight tracking-tight">
                    Emotional Contraband
                  </h2>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light tracking-wide">
                    Limited batch production. Each garment authenticated and classified by emotional signature. London-based verification system.
                  </p>
                </div>

                {/* Right: Minimal CTA */}
                <Link
                  href="/about"
                  className="hidden lg:inline-flex text-white text-[10px] uppercase tracking-[0.2em] hover:text-zinc-400 transition-all border-b border-white/30 pb-1"
                  data-cursor="LEARN"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ALL PRODUCTS - Magazine Grid */}
        <section className="py-24 lg:py-32 bg-[#0a0a0f]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-4 uppercase">
                  Complete_Inventory
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                  Available Now
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-[10px] text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-zinc-700/30 pb-1"
                data-cursor="BROWSE"
              >
                View All →
              </Link>
            </div>

            {/* Editorial Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {featuredProducts.map((product, index) => {
                const emotion = getProductEmotion(product);

                return (
                  <motion.div
                    key={product.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                  >
                    <Link
                      href={`/products/${product.handle}`}
                      className="group block"
                      data-cursor="VIEW"
                    >
                      {/* Product Image */}
                      <div className="aspect-square relative overflow-hidden mb-4 bg-zinc-50">
                        {product.featuredImage?.url ? (
                          <>
                            <img
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />

                            {/* Subtle Emotion Badge */}
                            {emotion && (
                              <div
                                className="absolute top-3 left-3 px-2.5 py-1 text-[8px] tracking-wider backdrop-blur-sm"
                                style={{
                                  backgroundColor: `${emotion.colors.primary}15`,
                                  color: emotion.colors.accent,
                                  border: `1px solid ${emotion.colors.accent}30`
                                }}
                              >
                                {emotion.name.toUpperCase()}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                            <div className="text-6xl font-light text-zinc-800">
                              {product.title.charAt(0)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Product Info - Minimal */}
                      <div className="space-y-1">
                        <h3 className="text-xs font-light text-white leading-tight tracking-wide group-hover:text-zinc-400 transition-colors uppercase">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-zinc-500 tracking-wider">
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
              })}
            </div>
          </div>
        </section>

        {/* 5. MANIFESTO - Editorial Two Column */}
        <section className="py-24 lg:py-32 bg-zinc-900/30">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                  System_Manifest
                </div>

                <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 leading-tight tracking-tight">
                  Emotional<br />
                  Contraband<br />
                  Manifesto
                </h2>

                <div className="space-y-6 text-zinc-400 leading-relaxed mb-10">
                  <p className="text-sm lg:text-base font-light tracking-wide">
                    We don't sell clothing. We distribute authenticated emotional states disguised as streetwear.
                  </p>
                  <p className="text-xs lg:text-sm font-light tracking-wide">
                    Each piece is laboratory-tested, batch-numbered, and classified by its emotional signature. Two core emotions. Limited production runs. Every garment verified for purity and potency.
                  </p>
                  <p className="text-xs lg:text-sm font-light tracking-wide">
                    This is not fashion. This is contraband. This is how feelings move through the underground.
                  </p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex text-white text-[10px] uppercase tracking-[0.2em] hover:text-zinc-400 transition-all border-b border-white/30 pb-1"
                  data-cursor="READ"
                >
                  Read Full Manifest →
                </Link>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-square lg:aspect-[4/5] bg-zinc-900/50"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl font-extralight text-zinc-800">ALV</div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[9px] text-zinc-700 tracking-[0.3em] uppercase">
                    Laboratory_Imagery
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. EMOTION COLLECTIONS - Editorial Style */}
        <section className="py-24 lg:py-32 bg-[#0a0a0f]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-4 uppercase">
                  Emotion_Database
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
                  Two Emotions
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-[10px] text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] border-b border-zinc-700/30 pb-1"
                data-cursor="BROWSE"
              >
                Browse All →
              </Link>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {emotionsWithStats.slice(0, 2).map((item, index) => {
                const emotion = item.emotion || item;
                if (!emotion) return null;

                // Get first product image from this emotion's collection
                const firstProduct = item.collection?.products?.edges?.[0]?.node;
                const imageUrl = firstProduct?.featuredImage?.url || firstProduct?.images?.edges?.[0]?.node?.url;

                return (
                  <motion.div
                    key={emotion.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Link
                      href={`/collections/${emotion.id}`}
                      className="group relative overflow-hidden bg-zinc-900/30 aspect-[4/5] block"
                      data-cursor="EXPLORE"
                    >
                      {/* Background Image */}
                      {imageUrl && (
                        <div className="absolute inset-0">
                          <img
                            src={imageUrl}
                            alt={emotion.name}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                          />
                          {/* Subtle Gradient Overlay */}
                          <div
                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 h-full p-8 lg:p-10 flex flex-col justify-between">
                        {/* Top: Classification Badge */}
                        <div>
                          {emotion.contraband?.classification && (
                            <div
                              className="inline-block px-2.5 py-1 text-[8px] tracking-wider backdrop-blur-sm"
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

                        {/* Bottom: Emotion Info */}
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-light text-white mb-3 tracking-tight group-hover:text-opacity-70 transition-opacity uppercase">
                            {emotion.name}
                          </h3>
                          <div className="flex items-center justify-between text-[10px] tracking-wider">
                            <div className="text-white/50 uppercase">
                              {item.productCount || 0} Items Available
                            </div>
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: emotion.colors.accent }}
                            />
                          </div>
                          {/* Batch Number */}
                          {emotion.contraband?.batchNumber && (
                            <div className="text-[9px] text-white/30 mt-2 tracking-wider">
                              BATCH_{emotion.contraband.batchNumber.slice(-7)}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Minimal Arrow */}
                      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. NEWSLETTER - Minimal CTA */}
        <section className="py-24 lg:py-32 bg-zinc-900/30">
          <div className="max-w-xl mx-auto px-8 text-center">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase flex items-center justify-center gap-2">
              System_Updates
              <div className="w-1 h-1 bg-green-500/50 rounded-full animate-pulse" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-light text-white mb-4 leading-tight tracking-tight">
              Batch Notifications
            </h2>

            <p className="text-zinc-400 text-xs mb-12 font-light tracking-wide leading-relaxed">
              Authenticated access to new batch releases, restock alerts, and classified product information.
            </p>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border border-zinc-700/50 text-white px-6 py-4 text-xs focus:outline-none focus:border-white/50 transition-colors placeholder:text-zinc-600 tracking-wide"
              />
              <button
                type="submit"
                className="bg-white text-black px-8 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors whitespace-nowrap font-medium"
                data-cursor="SUBMIT"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 text-[9px] text-zinc-600 tracking-wider">
              No spam. Unsubscribe anytime.
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Static Site Generation
export async function getStaticProps() {
  try {
    const [featuredProducts, emotionsWithStats] = await Promise.all([
      getFeaturedProducts(12),
      getCollectionsWithStats()
    ]);

    const allEmotions = getAllEmotions();

    return {
      props: {
        featuredProducts: featuredProducts || [],
        emotionsWithStats: emotionsWithStats?.length > 0 ? emotionsWithStats : allEmotions || []
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    const allEmotions = getAllEmotions();

    return {
      props: {
        featuredProducts: [],
        emotionsWithStats: allEmotions || []
      },
      revalidate: 60
    };
  }
}
