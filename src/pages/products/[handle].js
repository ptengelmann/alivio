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
      <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-4 tracking-tight">
            Product Not Found
          </h1>
          <p className="text-zinc-800 text-sm tracking-wide mb-8">
            The requested item is not in our database.
          </p>
          <Link href="/collections" className="inline-block border border-white text-zinc-900 py-3 px-10 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
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

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Minimal Navigation Header */}
        <div className="py-6 border-b border-zinc-200">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 flex justify-between items-center">
            <Link
              href={collectionHandle ? `/collections/${collectionHandle}` : '/collections'}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-800 hover:text-zinc-900 transition-colors"
              data-cursor="BACK"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </Link>
            <div className="flex items-center gap-3 text-[9px] tracking-[0.3em] text-zinc-800 uppercase">
              {emotion?.contraband?.classification && (
                <span style={{ color: emotion.colors.accent }}>
                  {emotion.contraband.classification}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-8 py-8 lg:py-12">
          {/* Product content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Product images - 7 columns */}
            <div className="lg:col-span-7 space-y-3">
              {/* Main selected image - 1:1 aspect ratio */}
              <div className="aspect-square bg-zinc-100 relative overflow-hidden">
                  {allImages[selectedImage]?.node?.url ? (
                    <>
                      <img
                        src={allImages[selectedImage].node.url}
                        alt={allImages[selectedImage].node.altText || product.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Image counter overlay */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-zinc-900/80 backdrop-blur-sm text-white text-[10px] tracking-wider">
                          {selectedImage + 1} / {allImages.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900/10">
                      <div className="text-center">
                        <div className="text-8xl font-light text-zinc-800 mb-4">
                          ALV
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              {/* Image grid thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allImages.map((imageEdge, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative overflow-hidden group transition-all border-2 ${
                        selectedImage === index
                          ? 'opacity-100 border-zinc-900'
                          : 'opacity-60 hover:opacity-100 border-transparent hover:border-zinc-300'
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
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product info - 5 columns */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
              {/* Emotion badge */}
              {emotion && (
                <div
                  className="inline-flex px-3 py-1.5 text-[9px] tracking-[0.3em] uppercase mb-6"
                  style={{
                    backgroundColor: `${emotion.colors.primary}15`,
                    color: emotion.colors.accent,
                    border: `1px solid ${emotion.colors.accent}40`
                  }}
                >
                  {emotion.name}
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-light text-zinc-900 mb-4 leading-tight tracking-tight">
                {product.title}
              </h1>

              {/* Product code */}
              <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-8 uppercase font-mono">
                {emotion?.contraband?.batchNumber?.slice(-7) || product.handle.slice(0,7).toUpperCase()} • {emotion?.contraband?.classification || 'CLASSIFIED'}
              </div>

              {/* Price */}
              <div className="text-2xl text-zinc-900 mb-8 tracking-wide font-light">
                {selectedVariant
                  ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
                  : formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
                }
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-8 pb-8 border-b border-zinc-200">
                  <div
                    className="text-sm text-zinc-700 leading-relaxed tracking-wide prose prose-sm max-w-none prose-p:mb-3 prose-strong:text-zinc-900 prose-strong:font-medium prose-ul:mt-2 prose-li:text-zinc-700"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {/* Specs Grid */}
              <div className="mb-8 pb-8 border-b border-zinc-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[9px] tracking-[0.3em] text-zinc-800 uppercase mb-2">Status</div>
                    <div className="text-xs font-mono">
                      {selectedVariant?.availableForSale ? (
                        <span className="text-green-600">IN STOCK</span>
                      ) : (
                        <span className="text-red-600">OUT OF STOCK</span>
                      )}
                    </div>
                  </div>
                  {emotion && (
                    <>
                      <div>
                        <div className="text-[9px] tracking-[0.3em] text-zinc-800 uppercase mb-2">Purity</div>
                        <div className="text-xs font-mono text-zinc-900">{emotion.contraband?.purity || '99.9%'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.3em] text-zinc-800 uppercase mb-2">Batch</div>
                        <div className="text-xs font-mono text-zinc-900">{emotion.contraband?.batchNumber?.slice(-4) || '0001'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.3em] text-zinc-800 uppercase mb-2">Type</div>
                        <div className="text-xs font-mono text-zinc-900">{emotion.contraband?.classification || 'CLASS-A'}</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product options */}
              {product.options?.map((option) => (
                <div key={option.id} className="mb-8">
                  <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">
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
                          className={`px-5 py-3 border text-[10px] transition-all font-mono tracking-wider ${
                            selectedOptions[option.name] === value
                              ? 'border-zinc-900 bg-zinc-900 text-white'
                              : isAvailable
                              ? 'border-zinc-300 text-zinc-900 hover:border-zinc-900'
                              : 'border-zinc-200 text-zinc-400 cursor-not-allowed opacity-40'
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

              {/* Quantity and Add to Cart in grid */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {/* Quantity selector */}
                <div className="col-span-1">
                  <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase">Qty</div>
                  <div className="flex items-center border border-zinc-300 h-12">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 h-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
                      data-cursor="MINUS"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="flex-1 text-center font-mono text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center hover:bg-zinc-100 transition-colors"
                      data-cursor="PLUS"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="col-span-2">
                  <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-3 uppercase opacity-0">Action</div>
                  <button
                    className="w-full h-12 bg-zinc-900 text-white font-mono text-[10px] tracking-[0.2em] hover:bg-zinc-700 transition-all uppercase disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    disabled={!selectedVariant?.availableForSale}
                    data-cursor={selectedVariant?.availableForSale ? "ACQUIRE" : undefined}
                  >
                    {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

              {/* Additional Info Accordions */}
              <div className="space-y-0 border-t border-zinc-200">
                {/* Specifications */}
                <div className="border-b border-zinc-200">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'specs' ? null : 'specs')}
                    className="w-full py-4 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors"
                    data-cursor="EXPAND"
                  >
                    <span className="font-mono text-[11px] text-zinc-900 uppercase">SPECIFICATIONS</span>
                    {expandedSection === 'specs' ? (
                      <ChevronUp className="w-4 h-4 text-zinc-800" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-800" />
                    )}
                  </button>
                  {expandedSection === 'specs' && (
                    <div className="py-4 border-t border-zinc-200 bg-zinc-50/50">
                      <div className="space-y-3 px-1">
                        <div className="flex justify-between py-2 border-b border-zinc-200">
                          <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Material</span>
                          <span className="text-[10px] font-mono text-zinc-900">100% Cotton</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-200">
                          <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Weight</span>
                          <span className="text-[10px] font-mono text-zinc-900">240GSM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-zinc-200">
                          <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Fit</span>
                          <span className="text-[10px] font-mono text-zinc-900">Oversized</span>
                        </div>
                        {emotion && (
                          <>
                            <div className="flex justify-between py-2 border-b border-zinc-200">
                              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Batch Number</span>
                              <span className="text-[10px] font-mono text-zinc-900">{emotion.contraband?.batchNumber || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Classification</span>
                              <span className="text-[10px] font-mono text-zinc-900">{emotion.contraband?.classification || 'CLASSIFIED'}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Shipping */}
                <div className="border-b border-zinc-200">
                  <button
                    onClick={() => setExpandedSection(expandedSection === 'shipping' ? null : 'shipping')}
                    className="w-full p-4 text-left flex justify-between items-center hover:bg-zinc-50 transition-colors"
                    data-cursor="EXPAND"
                  >
                    <span className="font-mono text-[11px] text-zinc-900 uppercase">SHIPPING_RETURNS</span>
                    {expandedSection === 'shipping' ? (
                      <ChevronUp className="w-4 h-4 text-zinc-800" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-800" />
                    )}
                  </button>
                  {expandedSection === 'shipping' && (
                    <div className="p-4 border-t border-zinc-200">
                      <div className="text-sm text-zinc-700 leading-relaxed space-y-3 font-mono">
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
