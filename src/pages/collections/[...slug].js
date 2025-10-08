import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { getEmotion } from '../../lib/emotions';
import { formatMoney } from '../../lib/money';
import { ArrowLeft, Database } from 'lucide-react';

const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

const COLLECTION_QUERY = `
  query GetCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
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
`;

export default function CollectionPage({ collection, emotionId }) {
  const emotion = getEmotion(emotionId);
  const products = collection?.products?.edges || [];

  if (!collection) {
    return (
      <>
        <Head><title>Not Found | Alívio</title></Head>
        <Navbar />
        <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 flex items-center justify-center pt-20">
          <div className="text-center px-6">
            <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-6 tracking-tight">Collection Not Found</h1>
            <p className="text-zinc-700 text-xs tracking-wide mb-8 font-light">The requested collection is not in our database.</p>
            <Link href="/collections" className="inline-block border border-zinc-900 text-zinc-900 py-3 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-900 hover:text-white transition-all duration-300" data-cursor="BACK">
              Return to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{emotion?.name || collection.title} | Alívio - Emotional Contraband</title>
        <meta name="description" content={emotion?.philosophy || collection.description || `Shop ${collection.title}`} />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Minimal Navigation Header */}
        <div className="py-6 border-b border-zinc-200">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 flex justify-between items-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-700 hover:text-zinc-900 transition-colors font-light"
              data-cursor="BACK"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
            <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] text-zinc-700 uppercase">
              {emotion?.contraband?.classification && (
                <span style={{ color: emotion.colors.accent }}>{emotion.contraband.classification}</span>
              )}
            </div>
          </div>
        </div>

        {/* Collection Header */}
        <div className="py-16 lg:py-24 border-b border-zinc-200">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                {/* Classification Badge */}
                {emotion?.contraband?.classification && (
                  <div
                    className="inline-block px-3 py-1.5 text-[8px] tracking-wider backdrop-blur-sm mb-8"
                    style={{
                      backgroundColor: `${emotion.colors.primary}15`,
                      color: emotion.colors.accent,
                      border: `1px solid ${emotion.colors.accent}30`
                    }}
                  >
                    {emotion.contraband.classification}
                  </div>
                )}

                <h1 className="text-5xl lg:text-6xl font-light text-zinc-900 mb-8 leading-tight tracking-tight uppercase">
                  {emotion?.name || collection.title}
                </h1>

                <div className="flex items-center gap-6 text-[10px] text-zinc-700 mb-10 flex-wrap uppercase tracking-wider">
                  <span>{products.length} Items Available</span>
                  {emotion?.contraband?.batchNumber && (
                    <span>Batch {emotion.contraband.batchNumber.slice(-7)}</span>
                  )}
                  {emotion?.contraband?.potency && (
                    <span style={{ color: emotion.colors.accent }}>
                      {emotion.contraband.potency}
                    </span>
                  )}
                </div>

                {emotion?.philosophy && (
                  <p className="text-xs text-zinc-700 leading-relaxed font-light tracking-wide max-w-xl">
                    {emotion.philosophy}
                  </p>
                )}
              </div>

              {/* Contraband Info Card */}
              {emotion?.contraband && (
                <div className="border border-zinc-200 p-8 lg:p-10 bg-white">
                  <div className="flex items-center gap-3 mb-8">
                    <Database className="w-4 h-4 text-zinc-700" />
                    <span className="text-[9px] tracking-[0.3em] text-zinc-700 uppercase">Classification_Data</span>
                  </div>

                  <div className="space-y-1">
                    {emotion.contraband.batchNumber && (
                      <div className="flex justify-between py-3 border-b border-zinc-200">
                        <span className="text-[10px] text-zinc-700 uppercase tracking-wider font-light">Batch Number</span>
                        <span className="text-[10px] text-zinc-900 tracking-wider">{emotion.contraband.batchNumber}</span>
                      </div>
                    )}
                    {emotion.contraband.purity && (
                      <div className="flex justify-between py-3 border-b border-zinc-200">
                        <span className="text-[10px] text-zinc-700 uppercase tracking-wider font-light">Purity</span>
                        <span className="text-[10px] text-zinc-900 tracking-wider">{emotion.contraband.purity}</span>
                      </div>
                    )}
                    {emotion.contraband.potency && (
                      <div className="flex justify-between py-3 border-b border-zinc-200">
                        <span className="text-[10px] text-zinc-700 uppercase tracking-wider font-light">Potency</span>
                        <span className="text-[10px] tracking-wider" style={{ color: emotion.colors.accent }}>{emotion.contraband.potency}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3">
                      <span className="text-[10px] text-zinc-700 uppercase tracking-wider font-light">Status</span>
                      <span className="text-[10px] text-green-600 uppercase tracking-wider">Verified</span>
                    </div>
                  </div>

                  {emotion.contraband?.symptoms && emotion.contraband.symptoms.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-zinc-200">
                      <div className="text-[9px] tracking-[0.3em] text-zinc-700 mb-4 uppercase">Symptoms</div>
                      <div className="flex flex-wrap gap-2">
                        {emotion.contraband.symptoms.map((symptom, i) => (
                          <div
                            key={i}
                            className="px-2.5 py-1 text-[8px] tracking-wider backdrop-blur-sm uppercase"
                            style={{
                              backgroundColor: `${emotion.colors.primary}15`,
                              color: emotion.colors.accent,
                              border: `1px solid ${emotion.colors.accent}30`
                            }}
                          >
                            {symptom}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {products.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-zinc-700 text-xs uppercase tracking-wider font-light mb-2">No Items In Inventory</div>
                <div className="text-zinc-600 text-[10px] tracking-wide font-light">Check back soon for new releases</div>
              </div>
            ) : (
              <>
                <div className="mb-10 text-[10px] text-zinc-700 uppercase tracking-wider">
                  {products.length} Items Found
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                  {products.map((productEdge, index) => {
                    const product = productEdge.node;

                    return (
                      <motion.div
                        key={product.id}
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
                              <>
                                <img
                                  src={product.featuredImage.url}
                                  alt={product.featuredImage.altText || product.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />

                                {/* Emotion Badge */}
                                {emotion && (
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
                              </>
                            ) : (
                              <div
                                className="w-full h-full flex items-center justify-center"
                                style={{ backgroundColor: `${emotion?.colors?.primary}10` }}
                              >
                                <div
                                  className="text-6xl font-light"
                                  style={{ color: emotion?.colors?.primary || '#27272a' }}
                                >
                                  {emotion?.name?.charAt(0) || 'A'}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="space-y-1">
                            <h3 className="text-xs font-light text-zinc-900 leading-tight tracking-wide uppercase">
                              {product.title}
                            </h3>
                            <div className="text-[10px] text-zinc-700 tracking-wider">
                              {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { slug: ['euphoria'] } },
    { params: { slug: ['rage'] } },
    { params: { slug: ['melancholy'] } },
    { params: { slug: ['anxiety'] } },
    { params: { slug: ['serenity'] } },
    { params: { slug: ['nostalgia'] } },
    { params: { slug: ['transcendence'] } }
  ];

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const [emotionId] = params.slug;

  try {
    if (process.env.NODE_ENV === 'development' || !client) {
      try {
        const port = '3000';
        const adminResponse = await fetch(`http://localhost:${port}/api/admin/collections`);

        if (adminResponse.ok) {
          const adminCollections = await adminResponse.json();
          const collection = adminCollections.find(c => c.handle === emotionId);

          if (!collection) return { notFound: true };

          const productsResponse = await fetch(`http://localhost:${port}/api/admin/products`);
          const allProducts = productsResponse.ok ? await productsResponse.json() : [];

          const collectionProducts = allProducts.filter(product =>
            product.tags && product.tags.includes(emotionId)
          );

          const storefrontCollection = {
            id: collection.admin_graphql_api_id,
            title: collection.title,
            handle: collection.handle,
            description: collection.body_html,
            products: {
              edges: collectionProducts.map(product => ({
                node: {
                  id: product.admin_graphql_api_id,
                  title: product.title,
                  handle: product.handle,
                  featuredImage: product.images?.[0] ? {
                    url: product.images[0].src,
                    altText: product.images[0].alt
                  } : null,
                  priceRange: {
                    minVariantPrice: {
                      amount: product.variants?.[0]?.price || '0.00',
                      currencyCode: 'GBP'
                    }
                  }
                }
              }))
            }
          };

          return { props: { collection: storefrontCollection, emotionId }, revalidate: 60 };
        }
      } catch (adminError) {
        console.error('Admin API failed:', adminError);
      }

      return { notFound: true };
    }

    const { data } = await client.request(COLLECTION_QUERY, {
      variables: { handle: emotionId }
    });

    if (!data.collection) return { notFound: true };

    return {
      props: { collection: data.collection, emotionId },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    return { notFound: true };
  }
}
