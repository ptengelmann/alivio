import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Terminal, Square, ArrowRight, ChevronDown, ChevronUp,
  ShoppingBag, Lock, Eye, Package, Truck, Shield, Info, Plus, Minus, X
} from 'lucide-react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { getEmotionByHandle } from '../../lib/emotions';
import { formatMoney } from '../../lib/money';

// Create Shopify client with fallback for build time
const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

// Product query
const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      vendor
      productType
      tags
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
            image {
              url
              altText
            }
          }
        }
      }
      options {
        id
        name
        values
      }
      collections(first: 5) {
        edges {
          node {
            handle
            title
          }
        }
      }
    }
  }
`;

export default function ProductPage({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessLevel, setAccessLevel] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product?.variants?.edges?.length > 0) {
      setSelectedVariant(product.variants.edges[0].node);

      // Initialize selected options with first variant's options
      const initialOptions = {};
      product.variants.edges[0].node.selectedOptions.forEach(option => {
        initialOptions[option.name] = option.value;
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 600);
    setTimeout(() => setAccessLevel(1), 1000);
    setTimeout(() => setAccessLevel(2), 1400);
    setTimeout(() => setAccessLevel(3), 1800);
  }, []);

  // Find associated emotion/collection
  const collectionHandle = product?.collections?.edges?.[0]?.node?.handle;
  const emotion = collectionHandle ? getEmotionByHandle(collectionHandle) : null;

  // Handle option selection
  const handleOptionChange = (optionName, value) => {
    const newSelectedOptions = { ...selectedOptions, [optionName]: value };
    setSelectedOptions(newSelectedOptions);

    // Find variant that matches all selected options
    const matchingVariant = product.variants.edges.find(({ node: variant }) => {
      return variant.selectedOptions.every(option =>
        newSelectedOptions[option.name] === option.value
      );
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black font-mono text-white mb-4">
            PRODUCT_NOT_FOUND
          </h1>
          <p className="text-zinc-400 font-mono">
            The requested item is not in our database.
          </p>
          <Link href="/collections" className="inline-block mt-6 border border-zinc-800 text-white py-3 px-6 font-mono hover:border-white transition-colors">
            RETURN_TO_COLLECTIONS
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const currentImage = images[selectedImage]?.node || product.featuredImage;

  return (
    <>
      <Head>
        <title>{product.title} - Alívio Streetwear</title>
        <meta name="description" content={product.description || `${product.title} from Alívio's exclusive streetwear collection.`} />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-black text-white pt-20">
        {/* Authentication header */}
        <motion.div
          className="border-b border-zinc-900 p-6"
          style={{
            backgroundColor: emotion ? `${emotion.colors.primary}10` : 'transparent',
            borderColor: emotion ? `${emotion.colors.primary}30` : '#27272a'
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-4 h-4" style={{ color: emotion?.colors?.accent || '#ffffff' }} />
              <span className="text-white">PRODUCT_DATABASE</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-1 transition-colors duration-300`}
                    style={{
                      backgroundColor: accessLevel >= level
                        ? (emotion?.colors?.accent || '#ffffff')
                        : '#27272a'
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ color: emotion?.colors?.accent || '#a1a1aa' }}>
              {emotion?.contraband?.classification || 'CLASSIFIED'}
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            className="py-6 border-b border-zinc-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: accessLevel >= 1 ? 1 : 0, y: accessLevel >= 1 ? 0 : 10 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Link href="/collections" className="hover:text-white transition-colors">
                COLLECTIONS
              </Link>
              <ArrowRight className="w-3 h-3" />
              {collectionHandle && (
                <>
                  <Link href={`/collections/${collectionHandle}`} className="hover:text-white transition-colors">
                    {emotion?.name?.toUpperCase() || collectionHandle.toUpperCase()}
                  </Link>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
              <span className="text-white">{product.title.toUpperCase()}</span>
            </div>
          </motion.div>

          {/* Product content */}
          <div className="grid grid-cols-12 gap-0">
            {/* Product images */}
            <div className="col-span-12 lg:col-span-7 border-r border-zinc-900">
              <motion.div
                className="p-6 lg:p-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: accessLevel >= 2 ? 1 : 0, x: accessLevel >= 2 ? 0 : -20 }}
                transition={{ delay: 0.7 }}
              >
                {/* Main image */}
                <div className="aspect-[4/5] bg-zinc-950 border border-zinc-800 mb-6 relative overflow-hidden">
                  {currentImage?.url ? (
                    <img
                      src={currentImage.url}
                      alt={currentImage.altText || product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-black text-zinc-700 mb-4 font-mono">
                          {emotion?.name?.charAt(0) || 'P'}
                        </div>
                        <div className="text-sm text-zinc-600 font-mono">
                          PRODUCT_IMAGE
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image metadata */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/90 p-2 border border-zinc-700">
                      <div className="text-[10px] font-mono text-zinc-400">
                        IMAGE_{(selectedImage + 1).toString().padStart(2, '0')} • VERIFIED
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image thumbnails */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {images.map((imageEdge, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square border transition-colors ${
                          selectedImage === index
                            ? 'border-white'
                            : 'border-zinc-800 hover:border-zinc-600'
                        }`}
                      >
                        <img
                          src={imageEdge.node.url}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Product details */}
            <div className="col-span-12 lg:col-span-5">
              <motion.div
                className="p-6 lg:p-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: accessLevel >= 2 ? 1 : 0, x: accessLevel >= 2 ? 0 : 20 }}
                transition={{ delay: 0.9 }}
              >
                {/* Product header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="px-3 py-1 text-[10px] font-mono border border-zinc-800 text-zinc-400">
                      ITEM-{emotion?.contraband?.batchNumber?.slice(-7) || 'UNKNOWN'}
                    </div>
                    <div className="text-xs font-mono text-zinc-600">
                      TYPE: {product.productType || 'STREETWEAR'}
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-black text-white mb-4 font-mono leading-tight">
                    {product.title.toUpperCase()}
                  </h1>

                  <div className="text-3xl font-black font-mono text-white mb-6">
                    {selectedVariant
                      ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                      : formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                    }
                  </div>

                  {/* Accent line */}
                  <div
                    className="w-12 h-px mb-6"
                    style={{ backgroundColor: emotion?.colors?.accent || '#71717a' }}
                  />
                </div>

                {/* Product options */}
                {product.options?.map((option) => (
                  <div key={option.id} className="mb-6">
                    <div className="font-mono text-xs text-zinc-400 mb-3">
                      {option.name.toUpperCase()}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`p-3 border font-mono text-xs transition-colors ${
                            selectedOptions[option.name] === value
                              ? 'border-white bg-white text-black'
                              : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity selector */}
                <div className="mb-6">
                  <div className="font-mono text-xs text-zinc-400 mb-3">QUANTITY</div>
                  <div className="flex items-center border border-zinc-800 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <button
                  className="w-full bg-white text-black py-4 px-6 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors mb-6"
                  disabled={!selectedVariant?.availableForSale}
                >
                  {selectedVariant?.availableForSale ? 'ACQUIRE_ITEM' : 'OUT_OF_STOCK'}
                </button>

                {/* Product specs */}
                <div className="space-y-4">
                  {[
                    {
                      title: 'SPECIFICATIONS',
                      content: (
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">MATERIAL</span>
                            <span className="text-xs font-mono text-white">100% COTTON</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">WEIGHT</span>
                            <span className="text-xs font-mono text-white">240GSM</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">FIT</span>
                            <span className="text-xs font-mono text-white">OVERSIZED</span>
                          </div>
                        </div>
                      )
                    },
                    {
                      title: 'AUTHENTICATION',
                      content: (
                        <div className="space-y-2">
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">BATCH_NUMBER</span>
                            <span className="text-xs font-mono text-white">{emotion?.contraband?.batchNumber || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">PURITY</span>
                            <span className="text-xs font-mono text-white">{emotion?.contraband?.purity || '99.9%'}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-zinc-900">
                            <span className="text-xs font-mono text-zinc-500">VERIFIED</span>
                            <span className="text-xs font-mono text-white">TRUE</span>
                          </div>
                        </div>
                      )
                    },
                    {
                      title: 'SHIPPING',
                      content: (
                        <div className="text-sm text-zinc-400 leading-relaxed">
                          Secure shipping worldwide. All items authenticated before dispatch.
                          Tracking provided for monitoring chain of custody.
                        </div>
                      )
                    }
                  ].map((section) => (
                    <div key={section.title} className="border border-zinc-800">
                      <button
                        onClick={() => setExpandedSection(
                          expandedSection === section.title ? null : section.title
                        )}
                        className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-950 transition-colors"
                      >
                        <span className="font-mono text-xs text-white">{section.title}</span>
                        {expandedSection === section.title ? (
                          <ChevronUp className="w-4 h-4 text-zinc-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-400" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSection === section.title && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 border-t border-zinc-800">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Collection link */}
                {collectionHandle && (
                  <div className="mt-8 pt-8 border-t border-zinc-900">
                    <Link
                      href={`/collections/${collectionHandle}`}
                      className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      VIEW_COMPLETE_COLLECTION
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Static Site Generation
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { handle } = params;

  try {
    if (!client) {
      return {
        props: {
          product: null,
          emotion: null
        },
        revalidate: 60
      };
    }

    const { data } = await client.request(PRODUCT_QUERY, {
      variables: { handle }
    });

    if (!data.product) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        product: data.product
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true
    };
  }
}
