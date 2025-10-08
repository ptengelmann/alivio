import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Terminal, Package, ArrowRight } from 'lucide-react';
import { getEmotionByHandle } from '../lib/emotions';
import useDiagnostic from '../hooks/useDiagnostic';
import EmotionDiagnostic from '../components/EmotionDiagnostic';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';

// Import our systems
import { getAllEmotions } from '../lib/emotions';
import { getFeaturedProducts, getCollectionsWithStats } from '../lib/shopify-helpers';

export default function Homepage({ featuredProducts, emotionsWithStats }) {
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

      <main className="font-mono bg-[#FAF8F5] text-zinc-900">
        {/* 1. HERO BANNER - Editorial Style */}
        <HeroBanner openDiagnostic={openDiagnostic} />

        {/* Emotion Diagnostic Modal */}
        <EmotionDiagnostic
          isOpen={isDiagnosticOpen}
          onClose={closeDiagnostic}
          source="hero"
        />

        {/* 2. LABORATORY PRODUCT SHOWCASE - Editorial Grid */}
        <section className="py-16 lg:py-20 bg-[#FAF8F5]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-4 uppercase">
                  Latest_Batch
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
                  Featured Items
                </h2>
              </div>

              {/* Minimal Navigation */}
              <div className="flex items-center gap-4 text-zinc-700">
                <button
                  onClick={prevProduct}
                  className="text-xs uppercase tracking-wider hover:text-zinc-900 transition-colors"
                  data-cursor="PREV"
                >
                  Prev
                </button>
                <span className="text-[10px]">—</span>
                <button
                  onClick={nextProduct}
                  className="text-xs uppercase tracking-wider hover:text-zinc-900 transition-colors"
                  data-cursor="NEXT"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Editorial Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {showcaseProducts.map((product, index) => {
                const emotion = getProductEmotion(product);
                return (
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    emotion={emotion}
                    index={index}
                  />
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
                  <div className="text-[9px] tracking-[0.3em] text-zinc-700 mb-4 uppercase">
                    Batch_Authentication
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-light text-zinc-900 mb-4 leading-tight tracking-tight">
                    Emotional Contraband
                  </h2>
                  <p className="text-xs text-zinc-700 leading-relaxed font-light tracking-wide">
                    Limited batch production. Each garment authenticated and classified by emotional signature. London-based verification system.
                  </p>
                </div>

                {/* Right: Minimal CTA */}
                <Link
                  href="/about"
                  className="hidden lg:inline-flex text-zinc-900 text-[10px] uppercase tracking-[0.2em] hover:text-zinc-700 transition-all border-b border-white/30 pb-1"
                  data-cursor="LEARN"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ALL PRODUCTS - Magazine Grid */}
        <section className="py-24 lg:py-32 bg-[#FAF8F5]">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {/* Minimal Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-4 uppercase">
                  Complete_Inventory
                </div>
                <h2 className="text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight">
                  Available Now
                </h2>
              </div>
              <Link
                href="/collections"
                className="text-[10px] text-zinc-700 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em] border-b border-zinc-300 pb-1"
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
                  <ProductCard
                    key={product.id || index}
                    product={product}
                    emotion={emotion}
                    index={index}
                  />
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
                <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">
                  System_Manifest
                </div>

                <h2 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-8 leading-tight tracking-tight">
                  Emotional<br />
                  Contraband<br />
                  Manifesto
                </h2>

                <div className="space-y-6 text-zinc-700 leading-relaxed mb-10">
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
                  className="inline-flex text-zinc-900 text-[10px] uppercase tracking-[0.2em] hover:text-zinc-800 transition-all border-b border-zinc-900/30 pb-1"
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

        {/* 6. EMOTION COLLECTIONS - Elegant Grid */}
        <section className="py-32 lg:py-40 bg-[#FAF8F5]">
          <div className="max-w-[1800px] mx-auto px-8 lg:px-12">
            {/* Minimal centered header */}
            <div className="text-center mb-20">
              <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-4 uppercase">
                Core_Emotions
              </div>
              <h2 className="text-5xl lg:text-6xl font-light text-zinc-900 tracking-tight mb-6">
                Two Emotions
              </h2>
              <p className="text-sm text-zinc-700 max-w-md mx-auto font-light leading-relaxed">
                Authentic emotional contraband. Limited production, batch verified.
              </p>
            </div>

            {/* Two column grid with generous spacing */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {emotionsWithStats.slice(0, 2).map((item, index) => {
                const emotion = item.emotion || item;
                if (!emotion) return null;

                // Get first product image from this emotion's collection
                const firstProduct = item.collection?.products?.edges?.[0]?.node;
                const imageUrl = firstProduct?.featuredImage?.url || firstProduct?.images?.edges?.[0]?.node?.url;

                return (
                  <motion.div
                    key={emotion.id || index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <Link
                      href={`/collections/${emotion.id}`}
                      className="group block"
                      data-cursor="EXPLORE"
                    >
                      {/* Image - 1:1 aspect ratio */}
                      <div className="aspect-square relative overflow-hidden mb-6 bg-zinc-100">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={emotion.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-8xl font-light text-zinc-300">ALV</div>
                          </div>
                        )}

                        {/* Minimal classification badge */}
                        {emotion.contraband?.classification && (
                          <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-zinc-200 text-[9px] tracking-[0.3em] uppercase text-zinc-900">
                            {emotion.contraband.classification}
                          </div>
                        )}
                      </div>

                      {/* Content below image */}
                      <div className="space-y-4">
                        {/* Emotion name */}
                        <h3 className="text-3xl lg:text-4xl font-light text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">
                          {emotion.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-zinc-700 leading-relaxed font-light">
                          {emotion.description || "Authentic emotional contraband, batch-verified and laboratory tested."}
                        </p>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200">
                          <div>
                            <div className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase mb-1">Items</div>
                            <div className="text-sm font-mono text-zinc-900">{item.productCount || 0}</div>
                          </div>
                          <div>
                            <div className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase mb-1">Purity</div>
                            <div className="text-sm font-mono text-zinc-900">{emotion.contraband?.purity || "99.9%"}</div>
                          </div>
                          <div>
                            <div className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase mb-1">Batch</div>
                            <div className="text-sm font-mono text-zinc-900">{emotion.contraband?.batchNumber?.slice(-4) || "0001"}</div>
                          </div>
                        </div>

                        {/* Explore link */}
                        <div className="flex items-center gap-2 text-zinc-900 text-xs uppercase tracking-wider pt-2 group-hover:gap-3 transition-all">
                          <span>Explore Collection</span>
                          <span>→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. EMOTION REQUEST - Custom Collection Submission */}
        <section className="py-24 lg:py-32 bg-white border-t border-zinc-200">
          <div className="max-w-2xl mx-auto px-8 lg:px-12">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase flex items-center justify-center gap-2">
                Emotion_Request_System
                <div className="w-1 h-1 bg-zinc-900 rounded-full" />
              </div>

              <h2 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-6 leading-tight tracking-tight">
                Request an Emotion
              </h2>

              <p className="text-sm text-zinc-700 font-light tracking-wide leading-relaxed max-w-lg mx-auto">
                Submit your desired emotion or feeling for consideration in our next batch production.
                All requests are reviewed and authenticated by our laboratory team.
              </p>
            </div>

            {/* Submission Form */}
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-transparent border border-zinc-300 text-zinc-900 px-6 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent border border-zinc-300 text-zinc-900 px-6 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-500"
                  required
                />
              </div>

              {/* Emotion/Feeling */}
              <div>
                <label className="block text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
                  Emotion or Feeling
                </label>
                <input
                  type="text"
                  placeholder="e.g., Serenity, Ambition, Melancholy"
                  className="w-full bg-transparent border border-zinc-300 text-zinc-900 px-6 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Describe the emotion, how it feels, what it represents..."
                  rows="4"
                  className="w-full bg-transparent border border-zinc-300 text-zinc-900 px-6 py-4 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-500 resize-none"
                />
              </div>

              {/* Intensity Slider */}
              <div>
                <label className="block text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
                  Intensity Level
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-zinc-700 font-mono">Low</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    defaultValue="5"
                    className="flex-1 h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                  />
                  <span className="text-xs text-zinc-700 font-mono">High</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-zinc-900 text-white py-5 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-700 transition-colors font-medium"
                  data-cursor="SUBMIT"
                >
                  Submit Request
                </button>
              </div>

              {/* Disclaimer */}
              <div className="text-center text-[9px] text-zinc-700 tracking-wider pt-4">
                Submissions are reviewed quarterly. Selected emotions may be developed into limited batch collections.
              </div>
            </form>
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
