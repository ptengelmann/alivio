import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import EmotionsSection from '../components/EmotionsSection';
import FeaturedSection from '../components/FeaturedSection';
import ManifestoSection from '../components/ManifestoSection';
import EmotionDiagnostic from '../components/EmotionDiagnostic';
import useDiagnostic from '../hooks/useDiagnostic';

// Import our systems
import { getAllEmotions } from '../lib/emotions';
import { getFeaturedProducts, getOrganizedCollections, getCollectionsWithStats } from '../lib/shopify-helpers';

export default function Homepage({ featuredProducts, organizedCollections, allEmotions, emotionsWithStats }) {
  // Diagnostic modal
  const { isOpen: isDiagnosticOpen, openDiagnostic, closeDiagnostic } = useDiagnostic();

  return (
    <>
      <Head>
        <title>Alívio | Emotional Contraband | Premium Streetwear UK</title>
        <meta name="description" content="Laboratory-grade emotional contraband. Each feeling authenticated, documented, and wearable. Relief is revolutionary. Alívio - your contraband supplier." />
        <meta property="og:title" content="Alívio | Emotional Contraband" />
        <meta property="og:description" content="Laboratory-grade emotional contraband. Each feeling authenticated, documented, and wearable." />
        <link rel="canonical" href="https://alivio.uk" />
      </Head>

      <Navbar />

      <div className="font-mono min-h-screen bg-black text-white">
        {/* Hero Section */}
        <HeroSection
          openDiagnostic={openDiagnostic}
          emotionsWithStats={emotionsWithStats}
          featuredProducts={featuredProducts}
        />

        {/* Emotions Section */}
        <EmotionsSection emotions={emotionsWithStats || allEmotions} />

        {/* Featured Products */}
        <FeaturedSection featuredProducts={featuredProducts} />

        {/* Manifesto Section */}
        <ManifestoSection openDiagnostic={openDiagnostic} />

        {/* Diagnostic Modal */}
        <EmotionDiagnostic
          isOpen={isDiagnosticOpen}
          onClose={closeDiagnostic}
          source="homepage"
        />
      </div>

      <Footer />
    </>
  );
}

// Static Site Generation
export async function getStaticProps() {
  try {
    const [featuredProducts, organizedCollections, emotionsWithStats] = await Promise.all([
      getFeaturedProducts(6),
      getOrganizedCollections(),
      getCollectionsWithStats()
    ]);

    const allEmotions = getAllEmotions();

    return {
      props: {
        featuredProducts: featuredProducts || [],
        organizedCollections: organizedCollections || { main: [], volumes: {}, all: [] },
        allEmotions: allEmotions || [],
        emotionsWithStats: emotionsWithStats || []
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);

    // Fallback data
    const allEmotions = getAllEmotions();

    return {
      props: {
        featuredProducts: [],
        organizedCollections: { main: [], volumes: {}, all: [] },
        allEmotions: allEmotions || [],
        emotionsWithStats: []
      },
      revalidate: 60 // Try again sooner if there was an error
    };
  }
}