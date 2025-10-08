import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllEmotions, getEmotionByHandle } from '../../lib/emotions';
import { getFeaturedProducts } from '../../lib/shopify-helpers';
import { useState } from 'react';
import { formatMoney } from '../../lib/money';
import ProductCard from '../../components/ProductCard';

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

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Minimal Header */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">
              Product_Database
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-zinc-900 tracking-tight">
              Shop All
            </h1>
          </div>
        </div>

        {/* Emotion Filter Pills - Minimal */}
        <div className="sticky top-16 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-t border-b border-zinc-200">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-6">
            <div className="flex items-center gap-3 overflow-x-auto">
              <button
                onClick={() => setSelectedEmotion('all')}
                className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  selectedEmotion === 'all'
                    ? 'bg-zinc-900 text-white'
                    : 'border border-zinc-700/50 text-zinc-800 hover:text-zinc-900 hover:border-zinc-400'
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
                      : 'border text-zinc-800 hover:text-zinc-900'
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
            <div className="mb-10 text-[10px] text-zinc-800 uppercase tracking-wider">
              {filteredProducts.length} Items Found
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => {
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
