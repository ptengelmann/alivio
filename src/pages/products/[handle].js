import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Minus, Terminal } from 'lucide-react';
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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);

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
      <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Product Not Found
          </h1>
          <p className="text-zinc-500 text-sm tracking-wide mb-8">
            The requested item is not in our database.
          </p>
          <Link href="/collections" className="inline-block border border-white text-white py-3 px-10 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images?.edges || [];
  const allImages = images.length > 0 ? images : [{ node: product.featuredImage }];

  return (
    <>
      <Head>
        <title>{product.title} - Alívio</title>
        <meta name="description" content={product.description || `${product.title} from Alívio's collection.`} />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        {/* Minimal Navigation Header */}
        <div className="py-6 border-b border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 flex justify-between items-center">
            <Link
              href={collectionHandle ? `/collections/${collectionHandle}` : '/collections'}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
              data-cursor="BACK"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
            <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] text-zinc-600 uppercase">
              {emotion?.contraband?.classification && (
                <span style={{ color: emotion.colors.accent }}>
                  {emotion.contraband.classification}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-12 lg:py-16">
          {/* Product content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Product images */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              {/* Main selected image */}
              <div className="aspect-[4/5] bg-zinc-900/20 relative overflow-hidden">
                  {allImages[selectedImage]?.node?.url ? (
                    <>
                      <img
                        src={allImages[selectedImage].node.url}
                        alt={allImages[selectedImage].node.altText || product.title}
                        className="w-full h-full object-cover"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                      <div className="text-center">
                        <div className="text-6xl font-light text-zinc-800 mb-4">
                          {product.title.charAt(0)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              {/* Image grid thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((imageEdge, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative overflow-hidden group transition-opacity ${
                        selectedImage === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                      }`}
                      data-cursor="VIEW"
                    >
                      {imageEdge.node?.url ? (
                        <img
                          src={imageEdge.node.url}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                          <div className="text-zinc-700 text-xs">
                            {index + 1}
                          </div>
                        </div>
                      )}
                      {selectedImage === index && (
                        <div className="absolute inset-0 border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info */}
            <div>
              {/* Product code */}
              <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-8 uppercase">
                {emotion?.contraband?.batchNumber?.slice(-7) || product.handle.slice(0,7)} • {emotion?.contraband?.classification || 'Classified'}
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight tracking-tight uppercase">
                {product.title}
              </h1>

              {/* Price */}
              <div className="text-xl text-zinc-400 mb-10 tracking-wide">
                {selectedVariant
                  ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                  : formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                }
              </div>

              {/* Availability */}
              <div className="mb-10 pb-10 border-b border-zinc-900/50">
                <div className="text-[10px] tracking-wider uppercase space-y-2">
                  <div>
                    {selectedVariant?.availableForSale ? (
                      <span className="text-green-500/70">In Stock</span>
                    ) : (
                      <span className="text-red-500/70">Out of Stock</span>
                    )}
                  </div>
                  {emotion && (
                    <div className="text-zinc-600">
                      PURITY: {emotion.contraband?.purity || '99.9%'}
                    </div>
                  )}
                </div>
              </div>

              {/* Product options */}
              {product.options?.map((option) => (
                <div key={option.id} className="mb-6">
                  <div className="font-mono text-[11px] text-zinc-500 mb-3 uppercase">
                    {option.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      // Check if this variant is available
                      const isAvailable = product.variants.edges.some(({ node: variant }) =>
                        variant.selectedOptions.some(opt => opt.name === option.name && opt.value === value) &&
                        variant.availableForSale
                      );

                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          disabled={!isAvailable}
                          className={`px-4 py-3 border font-mono text-[11px] transition-colors uppercase ${
                            selectedOptions[option.name] === value
                              ? 'border-white bg-white text-black'
                              : isAvailable
                              ? 'border-zinc-800 text-white hover:border-zinc-600'
                              : 'border-zinc-900 text-zinc-700 cursor-not-allowed'
                          }`}
                          data-cursor={isAvailable ? "SELECT" : undefined}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity selector */}
              <div className="mb-8">
                <div className="font-mono text-[11px] text-zinc-500 mb-3 uppercase">QUANTITY</div>
                <div className="flex items-center border border-zinc-800 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-colors"
                    data-cursor="MINUS"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-16 text-center font-mono text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-zinc-900 transition-colors"
                    data-cursor="PLUS"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                className="w-full bg-white text-black py-4 px-6 font-mono font-bold text-sm tracking-wider hover:bg-zinc-200 transition-colors mb-8 uppercase disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed"
                disabled={!selectedVariant?.availableForSale}
                data-cursor={selectedVariant?.availableForSale ? "ACQUIRE" : undefined}
              >
                {selectedVariant?.availableForSale ? 'ACQUIRE_ITEM' : 'OUT_OF_STOCK'}
              </button>

              {/* Product details */}
              <div className="space-y-0 border-t border-zinc-900">
                {/* Description */}
                {product.description && (
                  <div className="border-b border-zinc-900">
                    <button
                      onClick={() => setExpandedSection(expandedSection === 'description' ? null : 'description')}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-950 transition-colors"
                      data-cursor="EXPAND"
                    >
                      <span className="font-mono text-[11px] text-white uppercase">PRODUCT_DETAILS</span>
                      {expandedSection === 'description' ? (
                        <ChevronUp className="w-4 h-4 text-zinc-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                      )}
                    </button>
                    {expandedSection === 'description' && (
                      <div className="p-4 border-t border-zinc-900">
                        <div
                          className="text-sm text-zinc-400 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Specifications */}
                <div className="border-b border-zinc-900">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'specs' ? null : 'specs')}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-950 transition-colors"
                    data-cursor="EXPAND"
                  >
                    <span className="font-mono text-[11px] text-white uppercase">SPECIFICATIONS</span>
                    {expandedSection === 'specs' ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>
                  {expandedSection === 'specs' && (
                    <div className="p-4 border-t border-zinc-900">
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase">MATERIAL</span>
                          <span className="text-[11px] font-mono text-white">100% COTTON</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase">WEIGHT</span>
                          <span className="text-[11px] font-mono text-white">240GSM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-900">
                          <span className="text-[11px] font-mono text-zinc-500 uppercase">FIT</span>
                          <span className="text-[11px] font-mono text-white">OVERSIZED</span>
                        </div>
                        {emotion && (
                          <>
                            <div className="flex justify-between py-2 border-b border-zinc-900">
                              <span className="text-[11px] font-mono text-zinc-500 uppercase">BATCH_NUMBER</span>
                              <span className="text-[11px] font-mono text-white">{emotion.contraband?.batchNumber || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-zinc-900">
                              <span className="text-[11px] font-mono text-zinc-500 uppercase">CLASSIFICATION</span>
                              <span className="text-[11px] font-mono text-white">{emotion.contraband?.classification || 'CLASSIFIED'}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping */}
                <div className="border-b border-zinc-900">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'shipping' ? null : 'shipping')}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-950 transition-colors"
                    data-cursor="EXPAND"
                  >
                    <span className="font-mono text-[11px] text-white uppercase">SHIPPING_RETURNS</span>
                    {expandedSection === 'shipping' ? (
                      <ChevronUp className="w-4 h-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>
                  {expandedSection === 'shipping' && (
                    <div className="p-4 border-t border-zinc-900">
                      <div className="text-sm text-zinc-400 leading-relaxed space-y-3 font-mono">
                        <p>Secure shipping worldwide. All items authenticated before dispatch.</p>
                        <p>Tracking provided for monitoring chain of custody.</p>
                        <p>Returns accepted within 14 days of delivery. Item must remain sealed.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
    // For development, use Admin API directly
    if (process.env.NODE_ENV === 'development' || !client) {
      console.log('Fetching product from Admin API:', handle);

      try {
        const port = '3000';
        const adminResponse = await fetch(`http://localhost:${port}/api/admin/products`);
        if (adminResponse.ok) {
          const adminProducts = await adminResponse.json();
          const product = adminProducts.find(p => p.handle === handle);

          if (!product) {
            return { notFound: true };
          }

          // Convert admin format to storefront format
          const storefrontProduct = {
            id: product.admin_graphql_api_id,
            title: product.title,
            handle: product.handle,
            description: product.body_html,
            vendor: product.vendor,
            productType: product.product_type,
            tags: product.tags ? product.tags.split(', ') : [],
            featuredImage: product.images?.[0] ? {
              url: product.images[0].src,
              altText: product.images[0].alt
            } : null,
            images: {
              edges: product.images?.map(img => ({
                node: {
                  url: img.src,
                  altText: img.alt
                }
              })) || []
            },
            priceRange: {
              minVariantPrice: {
                amount: product.variants?.[0]?.price || '0.00',
                currencyCode: 'GBP'
              },
              maxVariantPrice: {
                amount: product.variants?.[0]?.price || '0.00',
                currencyCode: 'GBP'
              }
            },
            variants: {
              edges: product.variants?.map(variant => ({
                node: {
                  id: variant.admin_graphql_api_id,
                  title: variant.title,
                  availableForSale: variant.inventory_quantity > 0,
                  selectedOptions: variant.option1 ? [
                    { name: 'Size', value: variant.option1 }
                  ] : [],
                  price: {
                    amount: variant.price,
                    currencyCode: 'GBP'
                  },
                  image: product.images?.[0] ? {
                    url: product.images[0].src,
                    altText: product.images[0].alt
                  } : null
                }
              })) || []
            },
            options: product.options?.map(option => ({
              id: option.id,
              name: option.name,
              values: option.values
            })) || [],
            collections: {
              edges: [] // Will be populated based on tags if needed
            }
          };

          return {
            props: {
              product: storefrontProduct
            },
            revalidate: 3600
          };
        }
      } catch (adminError) {
        console.error('Admin API failed for product:', adminError);
      }

      return { notFound: true };
    }

    // Production: use Storefront API
    const { data } = await client.request(PRODUCT_QUERY, {
      variables: { handle }
    });

    if (!data?.product) {
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
