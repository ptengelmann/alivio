// /lib/shopify-helpers.js - Fixed with robust volume parsing and defensive response handling

import client from './shopify';
import { getEmotionByHandle, isVolumeCollection, getVolumeFromHandle } from './emotions';

// Enhanced collection query with metafields
export const COLLECTION_QUERY = `
  query GetCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      metafields(identifiers: [
        {namespace: "alivio", key: "type"},
        {namespace: "alivio", key: "status"},
        {namespace: "alivio", key: "parent"},
        {namespace: "alivio", key: "volume_number"},
        {namespace: "alivio", key: "tagline"},
        {namespace: "alivio", key: "theme"},
        {namespace: "alivio", key: "hero_video"}
      ]) {
        key
        value
        type
        reference {
          ... on Collection {
            handle
            title
          }
        }
      }
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            images(first: 5) {
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
            }
            tags
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
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

export const ALL_COLLECTIONS_QUERY = `
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
          metafields(identifiers: [
            {namespace: "alivio", key: "type"},
            {namespace: "alivio", key: "status"},
            {namespace: "alivio", key: "parent"},
            {namespace: "alivio", key: "volume_number"},
            {namespace: "alivio", key: "tagline"}
          ]) {
            key
            value
            type
            reference {
              ... on Collection {
                handle
                title
              }
            }
          }
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                featuredImage {
                  url
                  altText
                }
                images(first: 5) {
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
                }
                tags
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
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
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      tags
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

// Robust volume handle parsing
export function parseVolumeHandle(handle) {
  const lc = (handle || '').toLowerCase();
  const patterns = [
    /^(?<emotion>[a-z0-9-]+)-vol-?(?<num>\d+)$/,
    /^(?<emotion>[a-z0-9-]+)-volume-?(?<num>\d+)$/,
    /^(?<emotion>[a-z0-9-]+)-(?<num>\d+)$/,
  ];
  for (const rx of patterns) {
    const m = lc.match(rx);
    if (m?.groups?.emotion && m?.groups?.num) {
      return { emotionId: m.groups.emotion, vol: Number(m.groups.num) };
    }
  }
  return null;
}

export function getParentFromHandle(handle) {
  const parsed = parseVolumeHandle(handle);
  return parsed?.emotionId || (handle || '').split('-')[0];
}

export function getVolNumberFromHandle(handle) {
  const parsed = parseVolumeHandle(handle);
  return parsed?.vol ?? 0;
}

// Convert metafields array to object
function metaToObject(metafields) {
  const meta = {};
  if (!metafields) return meta;
  
  metafields.forEach(field => {
    if (field && field.type === 'collection_reference' && field.reference) {
      meta[field.key] = field.reference;
    } else if (field && field.key) {
      meta[field.key] = field.value;
    }
  });
  
  return meta;
}

// Collection type helpers using metafields with fallbacks
export function isVolume(collection) {
  if (collection.meta?.type === 'volume') return true;
  // Fallback to handle pattern - import from emotions.js
  return !!parseVolumeHandle(collection.handle);
}

export function isMain(collection) {
  if (collection.meta?.type === 'main') return true;
  // Fallback: not a volume and matches emotion pattern
  return !parseVolumeHandle(collection.handle) && getEmotionByHandle(collection.handle);
}

export function getParentHandle(collection) {
  if (collection.meta?.parent?.handle) return collection.meta.parent.handle;
  // Fallback to handle pattern with robust parsing
  return getParentFromHandle(collection.handle);
}

export function getVolNumber(collection) {
  if (collection.meta?.volume_number) return parseInt(collection.meta.volume_number);
  // Fallback to handle pattern with robust parsing
  return getVolNumberFromHandle(collection.handle);
}

// Hero image fallback helper
export function getCollectionHeroImage(collection) {
  const primary = collection?.image?.url;
  if (primary) return { url: primary, alt: collection.image.altText || collection.title };
  const firstProduct = collection?.products?.edges?.[0]?.node;
  const altUrl = firstProduct?.featuredImage?.url || firstProduct?.images?.edges?.[0]?.node?.url;
  if (altUrl) return { url: altUrl, alt: firstProduct?.featuredImage?.altText || collection?.title };
  return null;
}

// Enhanced collection fetching with defensive parsing and fast timeout
export async function getCollection(handle) {
  try {
    if (!client) {
      console.log('Shopify client not available, returning null for collection:', handle);
      return null;
    }

    console.log('Fetching collection:', handle);

    // Add timeout to prevent long waits during development
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storefront API timeout')), 5000)
    );

    const apiCall = client.request(COLLECTION_QUERY, { variables: { handle } });

    const { data } = await Promise.race([apiCall, timeout]);
    const collection = data?.collection ?? null;

    if (!collection) return null;

    // Attach metafields as meta object
    collection.meta = metaToObject(collection.metafields);

    console.log('Collection with meta:', collection);
    return collection;
  } catch (error) {
    console.error('Error fetching collection:', handle, error.message);
    return null;
  }
}

export async function getAllCollections() {
  try {
    // For development, skip Storefront API and go straight to Admin API
    if (process.env.NODE_ENV === 'development' || !client) {
      console.log('Using Admin API directly for collections in development');

      try {
        const port = process.env.NODE_ENV === 'development' ? '3001' : '3000';
        const adminResponse = await fetch(`http://localhost:${port}/api/admin/collections`);
        if (adminResponse.ok) {
          const adminCollections = await adminResponse.json();
          console.log('Admin API collections:', adminCollections.length);

          // Convert admin format to storefront format
          return adminCollections.map(col => ({
            id: col.admin_graphql_api_id,
            title: col.title,
            handle: col.handle,
            description: col.body_html,
            products: { edges: [] }, // Empty for now
            meta: {}
          }));
        }
      } catch (adminError) {
        console.error('Admin API failed:', adminError);
      }

      return [];
    }

    console.log('Fetching all collections from Storefront API...');

    // Add timeout to prevent long waits during development
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Storefront API timeout')), 3000)
    );

    const apiCall = client.request(ALL_COLLECTIONS_QUERY);

    try {
      const { data } = await Promise.race([apiCall, timeout]);

      // Handle case where no collections exist yet
      if (!data || !data.collections || !data.collections.edges || data.collections.edges.length === 0) {
        console.log('No collections data returned from Storefront API');
        return [];
      }

      const collections = data.collections.edges?.map(({ node }) => {
        // Attach metafields as meta object
        node.meta = metaToObject(node.metafields);
        return node;
      }) || [];

      console.log('All collections with meta:', collections);
      return collections;
    } catch (storefrontError) {
      console.error('Storefront API failed:', storefrontError.message);
      return [];
    }
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}

export async function getProduct(handle) {
  try {
    if (!client) {
      console.log('Shopify client not available, returning null for product:', handle);
      return null;
    }

    console.log('Fetching product:', handle);
    const { data } = await client.request(PRODUCT_QUERY, { variables: { handle } });
    return data?.product || null;
  } catch (error) {
    console.error('Error fetching product:', handle, error);
    return null;
  }
}

// Enhanced collection organization using robust parsing
export async function getOrganizedCollections() {
  const collections = await getAllCollections();
  
  const organized = {
    main: [],
    volumes: {},
    all: collections
  };

  collections.forEach(collection => {
    // Skip archived collections
    if (collection.meta?.status === 'archived') return;
    
    if (isVolume(collection)) {
      const parentHandle = getParentHandle(collection);
      if (!organized.volumes[parentHandle]) {
        organized.volumes[parentHandle] = [];
      }
      organized.volumes[parentHandle].push(collection);
    } else if (isMain(collection)) {
      organized.main.push(collection);
    }
  });

  // Sort volumes by volume_number using robust parsing
  Object.keys(organized.volumes).forEach(emotionId => {
    organized.volumes[emotionId].sort((a, b) => getVolNumber(a) - getVolNumber(b));
  });

  return organized;
}

// Get collections for a specific emotion with metafields
export async function getEmotionCollections(emotionId) {
  const collections = await getAllCollections();
  
  const mainCollection = collections.find(c => 
    c.handle === emotionId && isMain(c) && c.meta?.status !== 'archived'
  );
  
  const volumes = collections.filter(c => 
    getParentHandle(c) === emotionId && 
    isVolume(c) && 
    c.meta?.status !== 'archived'
  ).sort((a, b) => getVolNumber(a) - getVolNumber(b));

  return {
    main: mainCollection,
    volumes,
    emotion: getEmotionByHandle(emotionId)
  };
}

// Enhanced helper that combines Shopify data with emotion system
export async function getEnhancedCollection(handle) {
  const collection = await getCollection(handle);
  if (!collection) {
    console.log('No collection found for handle:', handle);
    return null;
  }

  const emotion = getEmotionByHandle(handle);
  const volume = parseVolumeHandle(handle) ? getVolumeFromHandle(handle) : null;

  return {
    ...collection,
    emotion,
    volume,
    pageType: isVolume(collection) ? 'volume' : 'main',
    emotionId: getParentHandle(collection)
  };
}

// Get featured products (for homepage) - Enhanced with real product data and fast fallback
export async function getFeaturedProducts(limit = 6) {
  try {
    // Use Admin API directly for faster loading during development
    console.log('Fetching featured products directly from Admin API for speed');
    try {
      const port = process.env.NODE_ENV === 'development' ? '3002' : '3000';
      const adminResponse = await fetch(`http://localhost:${port}/api/admin/products?limit=${limit * 2}`);
      if (adminResponse.ok) {
        const adminProducts = await adminResponse.json();
        console.log('Admin API products found:', adminProducts.length);

        // Convert admin format to featured format
        const featured = adminProducts.slice(0, limit).map(product => ({
          id: product.admin_graphql_api_id,
          title: product.title,
          handle: product.handle,
          description: product.body_html,
          featuredImage: product.images?.[0] ? {
            url: product.images[0].src,
            altText: product.images[0].alt
          } : null,
          priceRange: product.variants && product.variants.length > 0 ? {
            minVariantPrice: {
              amount: product.variants[0].price,
              currencyCode: 'GBP'
            }
          } : null,
          variants: {
            edges: product.variants?.map(variant => ({
              node: {
                id: variant.admin_graphql_api_id,
                price: {
                  amount: variant.price,
                  currencyCode: 'GBP'
                },
                availableForSale: variant.inventory_quantity > 0
              }
            })) || []
          },
          collection: null, // Will be populated if needed
          emotion: null,
          isFeatured: true,
          createdAt: product.created_at,
          availableForSale: product.status === 'active'
        }));

        console.log('Featured products found:', featured.length);
        return featured;
      }
    } catch (adminError) {
      console.error('Admin API failed for featured products:', adminError);
    }

    // Fallback to Storefront API if Admin API fails
    const collections = await getAllCollections();
    let featured = [];

    if (collections && collections.length > 0) {
      collections.forEach(collection => {
        // Skip archived collections
        if (collection.meta?.status === 'archived') return;

        const products = collection.products?.edges?.map(({ node }) => node) || [];
        // Add collection info to products for context
        products.forEach(product => {
          product.collection = {
            handle: collection.handle,
            title: collection.title,
            id: collection.id
          };
          product.emotion = getEmotionByHandle(collection.handle);
          product.isFeatured = true;
        });
        featured.push(...products);
      });
    }

    // Prioritize products with images, then sort by newest
    const sortedFeatured = featured.sort((a, b) => {
      // Prioritize products with images
      if (a.featuredImage?.url && !b.featuredImage?.url) return -1;
      if (!a.featuredImage?.url && b.featuredImage?.url) return 1;

      // Then sort by creation date (newest first)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

    console.log('Featured products found:', sortedFeatured.length);
    return sortedFeatured.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Get collections with product counts for EmotionsSection
export async function getCollectionsWithStats() {
  try {
    const collections = await getAllCollections();

    // Handle empty store gracefully
    if (!collections || collections.length === 0) {
      console.log('No collections found - returning empty emotions with stats');
      return [];
    }

    // Get products to calculate proper counts
    let allProducts = [];
    try {
      // Try to get products from Admin API fallback if collections don't have products
      const port = process.env.NODE_ENV === 'development' ? '3002' : '3000';
      const adminResponse = await fetch(`http://localhost:${port}/api/admin/products`);
      if (adminResponse.ok) {
        allProducts = await adminResponse.json();
        console.log('Got products for collections stats:', allProducts.length);
      }
    } catch (error) {
      console.log('Could not fetch products for stats:', error);
    }

    const emotionsWithStats = [];

    collections.forEach(collection => {
      // Skip archived collections and only include main collections (not volumes)
      if (collection.meta?.status === 'archived') return;
      if (isVolumeCollection(collection.handle)) return;

      const emotion = getEmotionByHandle(collection.handle);
      if (emotion) {
        // Calculate product counts based on available data
        let productCount = 0;
        let availableProducts = 0;

        // Check if collection has products from Storefront API
        if (collection.products?.edges && collection.products.edges.length > 0) {
          productCount = collection.products.edges.length;
          availableProducts = collection.products.edges.filter(edge =>
            edge.node.availableForSale || edge.node.variants?.edges?.some(v => v.node.availableForSale)
          ).length;
        }
        // If no products in collection, try to match from all products by collection handle
        else if (allProducts.length > 0) {
          // Filter products that belong to this collection based on tags or collection handle
          const collectionProducts = allProducts.filter(product => {
            const tags = product.tags ? product.tags.toLowerCase() : '';
            const collectionHandle = collection.handle.toLowerCase();
            return tags.includes(collectionHandle) || tags.includes(collectionHandle + '-vol-');
          });

          productCount = collectionProducts.length;
          availableProducts = collectionProducts.filter(product =>
            product.status === 'active' &&
            product.variants &&
            product.variants.length > 0 &&
            product.variants.some(variant => variant.inventory_quantity > 0)
          ).length;

          // Convert Admin API products to Storefront API format for EmotionsSection
          collection.products = {
            edges: collectionProducts.slice(0, 4).map(product => ({
              node: {
                id: product.admin_graphql_api_id,
                title: product.title,
                handle: product.handle,
                featuredImage: product.images && product.images.length > 0 ? {
                  url: product.images[0].src,
                  altText: product.images[0].alt || product.title
                } : null,
                priceRange: product.variants && product.variants.length > 0 ? {
                  minVariantPrice: {
                    amount: product.variants[0].price,
                    currencyCode: 'GBP'
                  }
                } : null,
                availableForSale: product.status === 'active'
              }
            }))
          };

          console.log(`Collection ${collection.handle}: ${productCount} products, ${availableProducts} available`);
        }

        emotionsWithStats.push({
          ...emotion,
          collection,
          productCount,
          availableProducts,
          totalUnits: Object.values(emotion.volumes || {}).reduce((sum, vol) => sum + (vol.units || 0), 0),
          latestDrop: Object.values(emotion.volumes || {}).sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
          )[0],
          shopifyData: {
            id: collection.id,
            handle: collection.handle,
            title: collection.title,
            description: collection.description
          }
        });
      }
    });

    console.log('Collections with stats:', emotionsWithStats.map(e => ({
      handle: e.collection.handle,
      productCount: e.productCount,
      availableProducts: e.availableProducts
    })));

    return emotionsWithStats;
  } catch (error) {
    console.error('Error fetching collections with stats:', error);
    return [];
  }
}

// Analytics helper for tracking
export function trackCollectionView(collection, pageType) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: collection.title,
      page_type: pageType,
      emotion: collection.emotionId || 'unknown',
      collection_handle: collection.handle
    });
  }
}

export function trackProductView(product) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: product.priceRange.minVariantPrice.currencyCode,
      value: parseFloat(product.priceRange.minVariantPrice.amount),
      items: [{
        item_id: product.id,
        item_name: product.title,
        item_category: product.collection?.handle || 'unknown',
        price: parseFloat(product.priceRange.minVariantPrice.amount)
      }]
    });
  }
}