import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllEmotions, getEmotionByHandle } from '../../lib/emotions';
import { getFeaturedProducts } from '../../lib/shopify-helpers';
import { useState } from 'react';
import { formatMoney } from '../../lib/money';

export default function CollectionsIndex({ allProducts }) {
  const [selectedEmotion, setSelectedEmotion] = useState('all');

  const allEmotions = getAllEmotions();

  // Filter products by selected emotion
  const filteredProducts = selectedEmotion === 'all'
    ? allProducts
    : allProducts.filter(product => {
        const collectionHandle = product.collections?.edges?.[0]?.node?.handle;
        return collectionHandle === selectedEmotion;
      });

  const getProductEmotion = (product) => {
    const collectionHandle = product.collections?.edges?.[0]?.node?.handle;
    return collectionHandle ? getEmotionByHandle(collectionHandle) : null;
  };

  return (
    <>
      <Head>
        <title>Shop All | Alívio - Emotional Contraband</title>
        <meta name="description" content="Shop all Alívio emotional contraband. Limited batch streetwear. Filter by emotion." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        {/* Minimal Header */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
              Product_Database
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-white tracking-tight">
              Shop All
            </h1>
          </div>
        </div>

        {/* Emotion Filter Pills - Minimal */}
        <div className="sticky top-16 z-40 bg-[#0a0a0f]/95 backdrop-blur-sm border-t border-b border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-6">
            <div className="flex items-center gap-3 overflow-x-auto">
              <button
                onClick={() => setSelectedEmotion('all')}
                className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  selectedEmotion === 'all'
                    ? 'bg-white text-black'
                    : 'border border-zinc-700/50 text-zinc-500 hover:text-white hover:border-zinc-400'
                }`}
                data-cursor="FILTER"
              >
                All Items
              </button>
              {allEmotions.map((emotion) => (
                <button
                  key={emotion.id}
                  onClick={() => setSelectedEmotion(emotion.id)}
                  className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                    selectedEmotion === emotion.id
                      ? 'text-black'
                      : 'border text-zinc-500 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: selectedEmotion === emotion.id ? emotion.colors.accent : 'transparent',
                    borderColor: selectedEmotion === emotion.id ? emotion.colors.accent : 'rgba(63, 63, 70, 0.5)'
                  }}
                  data-cursor="FILTER"
                >
                  {emotion.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="mb-10 text-[10px] text-zinc-600 uppercase tracking-wider">
              {filteredProducts.length} Items Found
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => {
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
                      <div className="aspect-square bg-zinc-50 overflow-hidden mb-4 relative">
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticProps() {
  try {
    const allProducts = await getFeaturedProducts(100); // Get more products for shop all

    return {
      props: {
        allProducts: allProducts || []
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching products:', error);

    return {
      props: {
        allProducts: []
      },
      revalidate: 60
    };
  }
}
