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
  const showcaseProducts = featuredProducts.slice(0, 6);
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

        {/* 2. LABORATORY PRODUCT SHOWCASE - Horizontal Carousel */}
        <section className="py-6 sm:py-8 lg:py-12 bg-[#FAF8F5]">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with Navigation */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div>
                <div className="text-[7px] sm:text-[8px] tracking-[0.35em] text-zinc-600 mb-1.5 sm:mb-2 uppercase">
                  Latest_Batch
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-900 tracking-tight">
                  Featured Items
                </h2>
              </div>

              {/* Navigation Arrows - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={prevProduct}
                  className="w-9 h-9 border border-zinc-300 hover:border-zinc-500 flex items-center justify-center transition-colors"
                  data-cursor="PREV"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextProduct}
                  className="w-9 h-9 border border-zinc-300 hover:border-zinc-500 flex items-center justify-center transition-colors"
                  data-cursor="NEXT"
                >
                  <svg className="w-3.5 h-3.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Horizontal Scrolling Carousel */}
            <div className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="flex gap-2.5 sm:gap-3 lg:gap-4 pl-4 sm:pl-6 lg:pl-8 pr-4 sm:pr-6 lg:pr-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x">
                {showcaseProducts.map((product, index) => {
                  const emotion = getProductEmotion(product);
                  return (
                    <div key={product.id || index} className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] snap-start first:ml-0">
                      <ProductCard
                        product={product}
                        emotion={emotion}
                        index={index}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shop All Button */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <Link
                href="/collections"
                className="inline-flex border border-zinc-300 hover:border-zinc-900 text-zinc-900 px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] uppercase tracking-[0.25em] font-light transition-all"
                data-cursor="SHOP"
              >
                Shop All
              </Link>
            </div>
          </div>
        </section>

        {/* 3. CAMPAIGN SECTION - Full Screen Video */}
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Content Overlay - Bottom */}
          <div className="relative h-full flex items-end justify-between p-6 sm:p-10 lg:p-12">
            {/* Left: Text */}
            <div className="max-w-lg">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-2 leading-tight tracking-tight">
                Wear Your Emotions
              </h2>
              <p className="text-[11px] sm:text-xs text-white/70 font-light tracking-wide leading-relaxed">
                Explore authentic emotional contraband, limited batch streetwear, and accessories from our latest collection.
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex gap-3">
              <Link
                href="/collections"
                className="inline-flex bg-white text-zinc-900 px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-zinc-100 transition-all"
                data-cursor="SHOP"
              >
                Shop Now
              </Link>
              <Link
                href="/about"
                className="inline-flex border border-white/50 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-light hover:bg-white/10 transition-all"
                data-cursor="VIEW"
              >
                About Alívio
              </Link>
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

        {/* 6. EMOTION COLLECTIONS - Diagonal Split */}
        <section className="relative w-full">
          {/* Header - Positioned Above */}
          <div className="bg-[#FAF8F5] py-12 sm:py-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-zinc-600 mb-3 sm:mb-4 uppercase">
                Core_Emotions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-4">
                Two Emotions
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 max-w-md mx-auto font-light leading-relaxed">
                Authentic emotional contraband. Limited production, batch verified.
              </p>
            </div>
          </div>

          {/* Diagonal Split Container - Full Width */}
          <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
              {/* Euphoria - Top Left Triangle */}
              <Link
                href="/collections/euphoria"
                className="absolute inset-0 group"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
                data-cursor="EUPHORIA"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                  <img
                    src="/euphoria.png"
                    alt="Euphoria"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-transparent" />

                {/* Content */}
                <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
                  <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-white/80 mb-2 sm:mb-3 uppercase font-medium">
                    Schedule_I
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-2 sm:mb-3">
                    Euphoria
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-light tracking-wide max-w-xs">
                    99.7% Purity
                  </p>
                </div>
              </Link>

              {/* Rage - Bottom Right Triangle */}
              <Link
                href="/collections/rage"
                className="absolute inset-0 group"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                data-cursor="RAGE"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-gradient-to-tl from-red-500/20 to-orange-600/20">
                  <img
                    src="/rage.png"
                    alt="Rage"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tl from-red-900/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 text-right">
                  <div className="text-[8px] sm:text-[9px] tracking-[0.35em] text-white/80 mb-2 sm:mb-3 uppercase font-medium">
                    Schedule_I
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-2 sm:mb-3">
                    Rage
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 font-light tracking-wide">
                    96.8% Purity
                  </p>
                </div>
              </Link>

              {/* Diagonal Line Accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom right, transparent 49.5%, rgba(255,255,255,0.3) 49.5%, rgba(255,255,255,0.3) 50.5%, transparent 50.5%)'
                }}
              />
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
