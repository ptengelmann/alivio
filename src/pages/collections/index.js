import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import EmotionDiagnostic from '../../components/EmotionDiagnostic';
import useDiagnostic from '../../hooks/useDiagnostic';
import { Terminal, Square, ArrowRight, Eye, Lock } from 'lucide-react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { getAllEmotions } from '../../lib/emotions';

// Create Shopify client with fallback for build time
const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

// Collections query
const ALL_COLLECTIONS_QUERY = `
  query GetAllCollections {
    collections(first: 50) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default function CollectionsIndex({ collections: shopifyCollections }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const { isOpen: isDiagnosticOpen, openDiagnostic, closeDiagnostic } = useDiagnostic();

  const emotions = getAllEmotions();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Authentication sequence
    setTimeout(() => setIsLoaded(true), 800);
    setTimeout(() => setAccessLevel(1), 1200);
    setTimeout(() => setAccessLevel(2), 1600);
    setTimeout(() => setAccessLevel(3), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Collections - Alívio Streetwear</title>
        <meta name="description" content="Explore Alívio's premium streetwear collections. Emotional compounds infused into limited-edition clothing drops." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-black text-white pt-20">
        {/* Authentication header */}
        <motion.div
          className="border-b border-zinc-900 p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-4 h-4" />
              <span className="text-white">COLLECTIONS_DATABASE</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-1 ${
                      accessLevel >= level ? 'bg-white' : 'bg-zinc-800'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
            <div className="text-zinc-400">{systemTime}</div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          {/* Header section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-900">
            <div className="lg:col-span-8 p-4 sm:p-6 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-zinc-900 overflow-hidden">
              <motion.div
                className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: accessLevel >= 1 ? 1 : 0, y: accessLevel >= 1 ? 0 : 20 }}
                transition={{ delay: 0.5 }}
              >
                <Square className="w-2 h-2 fill-current" />
                <span>CLASSIFIED_STREETWEAR_CATALOG</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 font-mono leading-[0.9] overflow-hidden break-words"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 30 }}
                transition={{ delay: 0.7 }}
              >
                ACTIVE<br />COLLECTIONS
              </motion.h1>

              <motion.div
                className="space-y-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: accessLevel >= 3 ? 1 : 0, y: accessLevel >= 3 ? 0 : 20 }}
                transition={{ delay: 0.9 }}
              >
                <div className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
                  Premium streetwear collections infused with emotional compounds.
                  Each drop manufactured in restricted batches.
                </div>
                <div className="font-mono text-sm text-zinc-400">
                  Select collection protocol for detailed case file access.
                </div>
              </motion.div>

              <motion.button
                onClick={() => openDiagnostic('collections')}
                className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: accessLevel >= 3 ? 1 : 0, y: accessLevel >= 3 ? 0 : 20 }}
                transition={{ delay: 1.1 }}
                data-cursor="SCAN"
              >
                FIND_MY_COLLECTION
              </motion.button>
            </div>

            <div className="lg:col-span-4 p-4 sm:p-6 lg:p-12 xl:p-16 bg-zinc-950">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: accessLevel >= 2 ? 1 : 0, x: accessLevel >= 2 ? 0 : 20 }}
                transition={{ delay: 0.8 }}
              >
                <div className="font-mono text-xs text-zinc-400 mb-4">SYSTEM_STATUS</div>
                <div className="space-y-3">
                  {[
                    { label: "ACTIVE_COLLECTIONS", value: emotions.length.toString().padStart(2, '0') },
                    { label: "MANUFACTURING", value: "LIVE" },
                    { label: "QUALITY_CONTROL", value: "99.7%" },
                    { label: "AUTHENTICATION", value: "VERIFIED" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex justify-between py-2 border-b border-zinc-800"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <span className="text-xs font-mono text-zinc-500">{stat.label}</span>
                      <span className="text-xs font-mono text-white">{stat.value}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Collections grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {emotions.map((emotion, index) => (
              <motion.div
                key={emotion.id}
                className="border border-zinc-900 bg-black group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                {/* Collection preview */}
                <div className="aspect-[4/3] relative border-b border-zinc-900 bg-zinc-950">
                  {/* Placeholder for collection hero image */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-black text-zinc-700 mb-4 font-mono">
                        {emotion.name.charAt(0)}
                      </div>
                      <div className="text-sm text-zinc-600 font-mono">
                        COLLECTION_PREVIEW
                      </div>
                    </div>
                  </div>

                  {/* Collection status overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                      STATUS: ACTIVE
                    </div>
                  </div>

                  {/* Access level indicator */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-white">
                      {emotion.contraband?.classification || 'CLASSIFIED'}
                    </div>
                  </div>

                  {/* Collection identifier */}
                  <div className="absolute bottom-4 right-4">
                    <div className="w-2 h-2 animate-pulse" style={{ backgroundColor: emotion.colors?.accent || '#71717a' }} />
                  </div>
                </div>

                {/* Collection data */}
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-black font-mono text-white mb-2">
                      {emotion.name.toUpperCase()}
                    </h3>
                    <div className="text-xs text-zinc-500 font-mono mb-4">
                      COLLECTION_ID: {emotion.contraband?.batchNumber?.slice(-7) || 'UNKNOWN'}
                    </div>
                    <div className="text-sm text-zinc-300 leading-relaxed">
                      {emotion.description}
                    </div>
                  </div>

                  {/* Collection specs */}
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">PIECES</span>
                      <span className="text-xs font-mono text-white">5-8 ITEMS</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">QUALITY</span>
                      <span className="text-xs font-mono text-white">{emotion.contraband?.purity || 'PREMIUM'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-zinc-900">
                      <span className="text-xs font-mono text-zinc-500">AVAILABILITY</span>
                      <span className="text-xs font-mono text-white">LIMITED</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link
                      href={`/collections/${emotion.id}`}
                      className="block w-full bg-white text-black py-4 px-6 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors text-center group-hover:bg-zinc-100"
                      data-cursor="ACCESS"
                    >
                      ACCESS_CASE_FILE
                    </Link>
                    {/* Volume quick access */}
                    <div className="space-y-2">
                      <div className="font-mono text-[10px] text-zinc-500 mb-2">AVAILABLE_DROPS</div>
                      {Object.entries(emotion?.volumes || {}).map(([volumeId, volume]) => (
                        <Link
                          key={volumeId}
                          href={`/collections/${emotion.id}/${volumeId}`}
                          className={`block w-full text-left p-2 border font-mono text-[10px] transition-colors ${
                            volume.status === 'available'
                              ? 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                              : 'border-zinc-800 text-zinc-600'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{volume.batchCode}</span>
                            <span className={`px-1 py-0.5 text-[8px] ${
                              volume.status === 'available' ? 'text-green-400' :
                              volume.status === 'coming-soon' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {volume.status.toUpperCase().replace('-', '_')}
                            </span>
                          </div>
                          <div className="text-[8px] text-zinc-600 mt-1">
                            {volume.units} units • {volume.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming soon collections */}
          <div className="border-t border-zinc-900 bg-zinc-950">
            <div className="p-4 sm:p-6 lg:p-8 xl:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-zinc-900 pb-8 lg:pb-0 pr-0 lg:pr-8 xl:pr-16">
                  <div className="font-mono text-xs text-zinc-400 mb-6">COMING_SOON</div>
                  <h2 className="text-3xl sm:text-4xl font-black font-mono text-white mb-6">
                    FUTURE<br />PROTOCOLS
                  </h2>
                  <div className="text-lg text-zinc-300 mb-8 leading-relaxed">
                    Additional collections under development. Synthesis in progress.
                  </div>
                </div>
                <div className="lg:col-span-6 pt-8 lg:pt-0 pl-0 lg:pl-8">
                  <div className="space-y-4">
                    {[
                      { name: "MELANCHOLY", status: "SYNTHESIS_PHASE", date: "SPRING_2025" },
                      { name: "ANXIETY", status: "CONCEPT_DEVELOPMENT", date: "SUMMER_2025" },
                      { name: "SERENITY", status: "RESEARCH_PHASE", date: "FALL_2025" }
                    ].map((collection, index) => (
                      <motion.div
                        key={collection.name}
                        className="flex justify-between items-center py-3 border-b border-zinc-800"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2 + index * 0.1 }}
                      >
                        <div>
                          <div className="font-mono text-sm text-white">{collection.name}</div>
                          <div className="font-mono text-xs text-zinc-500">{collection.status}</div>
                        </div>
                        <div className="font-mono text-xs text-zinc-400">{collection.date}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


      <Footer />

      {/* Diagnostic Modal */}
      <EmotionDiagnostic
        isOpen={isDiagnosticOpen}
        onClose={closeDiagnostic}
        source="collections"
      />
    </>
  );
}

export async function getStaticProps() {
  try {
    // For development, use Admin API directly (same as homepage)
    if (process.env.NODE_ENV === 'development' || !client) {
      console.log('Collections page: Using Admin API fallback');
      return {
        props: {
          collections: [],
        },
        revalidate: 60,
      };
    }

    // For production, try Storefront API
    const { data } = await client.request(ALL_COLLECTIONS_QUERY);

    return {
      props: {
        collections: data?.collections?.edges || [],
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching collections:', error);
    return {
      props: {
        collections: [],
      },
      revalidate: 3600,
    };
  }
}