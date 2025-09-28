// /src/pages/debug-shopify.js - Simple debug page without dependencies

import { useState, useEffect } from 'react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Create Shopify client with fallback for build time
const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

// Simple collection query
const COLLECTIONS_QUERY = `
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
          products(first: 5) {
            edges {
              node {
                id
                title
                handle
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Single collection query
const SINGLE_COLLECTION_QUERY = `
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
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export default function DebugShopify() {
  const [collections, setCollections] = useState([]);
  const [euphoriaCollection, setEuphoriaCollection] = useState(null);
  const [euphoriaVol1Collection, setEuphoriaVol1Collection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Shopify connection...');
        console.log('Store Domain:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
        console.log('Token exists:', !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);

        if (!client) {
          console.log('Client not initialized - missing environment variables');
          setError('Shopify client not configured - missing environment variables');
          return;
        }

        // Test 1: Get all collections
        console.log('Fetching all collections...');
        const { data: allData } = await client.request(COLLECTIONS_QUERY);
        const allCollections = allData?.collections?.edges?.map(({ node }) => node) || [];
        console.log('All collections:', allCollections);
        setCollections(allCollections);

        // Test 2: Try to get euphoria collection specifically
        console.log('Fetching euphoria collection...');
        try {
          const { data: euphoriaData } = await client.request(SINGLE_COLLECTION_QUERY, { 
            variables: { handle: 'euphoria' } 
          });
          const euphoriaCol = euphoriaData?.collection;
          console.log('euphoria collection:', euphoriaCol);
          setEuphoriaCollection(euphoriaCol);
        } catch (err) {
          console.log('euphoria collection error:', err);
        }
        
        // Test 3: Try to get euphoria-vol-1 collection
        console.log('Fetching euphoria-vol-1 collection...');
        try {
          const { data: vol1Data } = await client.request(SINGLE_COLLECTION_QUERY, { 
            variables: { handle: 'euphoria-vol-1' } 
          });
          const vol1Col = vol1Data?.collection;
          console.log('euphoria-vol-1 collection:', vol1Col);
          setEuphoriaVol1Collection(vol1Col);
        } catch (err) {
          console.log('euphoria-vol-1 collection error:', err);
        }
        
      } catch (err) {
        console.error('Debug error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  if (loading) return <div className="p-8 bg-black text-white font-mono">Loading Shopify debug...</div>;

  return (
    <div className="p-8 bg-black text-white font-mono">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">SHOPIFY_DEBUG.SYS</h1>
      
      {error && (
        <div className="bg-red-900 border border-red-500 p-4 mb-6">
          <h2 className="font-bold text-red-400">ERROR:</h2>
          <p className="text-red-300">{error}</p>
        </div>
      )}
      
      <div className="space-y-8">
        {/* Connection Status */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-green-400">CONNECTION_STATUS</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Store Domain:</span>
              <span className="ml-2 text-white">{process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'NOT_SET'}</span>
            </div>
            <div>
              <span className="text-gray-400">Token Length:</span>
              <span className="ml-2 text-white">{process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length || 'NOT_SET'}</span>
            </div>
          </div>
        </div>

        {/* Raw Collection Handles */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-red-400">RAW_COLLECTION_HANDLES ({collections.length})</h2>
          <div className="bg-gray-900 p-3">
            <div className="text-xs font-mono">
              {collections.length > 0 ? collections.map((col, i) => (
                <div key={i} className="mb-1">
                  <span className="text-cyan-300">{i + 1}.</span>
                  <span className="text-white ml-2">"{col.handle}"</span>
                  <span className="text-gray-400 ml-2">→ {col.title}</span>
                  <span className="text-yellow-300 ml-2">({col.products?.edges?.length || 0} products)</span>
                </div>
              )) : (
                <div className="text-red-400">No collections found!</div>
              )}
            </div>
          </div>
        </div>

        {/* Euphoria Collection Test */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-blue-400">EUPHORIA_COLLECTION_TEST</h2>
          <div className="bg-gray-900 p-4">
            {euphoriaCollection ? (
              <div className="space-y-2">
                <div><span className="text-green-400">✓ Found:</span> Yes</div>
                <div><span className="text-gray-400">Title:</span> <span className="text-white">{euphoriaCollection.title}</span></div>
                <div><span className="text-gray-400">Handle:</span> <span className="text-blue-300">{euphoriaCollection.handle}</span></div>
                <div><span className="text-gray-400">Products:</span> <span className="text-yellow-300">{euphoriaCollection.products?.edges?.length || 0}</span></div>
                
                {/* Hero Image Test */}
                <div>
                  <span className="text-gray-400">Collection Image:</span>
                  <span className="text-cyan-300 ml-2">
                    {euphoriaCollection.image?.url ? `${euphoriaCollection.image.url.substring(0, 50)}...` : 'No image set'}
                  </span>
                </div>
                
                {/* First Product Image Test */}
                {euphoriaCollection.products?.edges?.[0]?.node?.featuredImage && (
                  <div>
                    <span className="text-gray-400">First Product Image:</span>
                    <span className="text-green-300 ml-2">
                      {euphoriaCollection.products.edges[0].node.featuredImage.url.substring(0, 50)}...
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-400">✗ Euphoria collection not found</div>
            )}
          </div>
        </div>

        {/* Euphoria Vol 1 Collection Test */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-purple-400">EUPHORIA_VOL_1_TEST</h2>
          <div className="bg-gray-900 p-4">
            {euphoriaVol1Collection ? (
              <div className="space-y-2">
                <div><span className="text-green-400">✓ Found:</span> Yes</div>
                <div><span className="text-gray-400">Title:</span> <span className="text-white">{euphoriaVol1Collection.title}</span></div>
                <div><span className="text-gray-400">Handle:</span> <span className="text-blue-300">{euphoriaVol1Collection.handle}</span></div>
                <div><span className="text-gray-400">Products:</span> <span className="text-yellow-300">{euphoriaVol1Collection.products?.edges?.length || 0}</span></div>
              </div>
            ) : (
              <div className="text-red-400">✗ euphoria-vol-1 collection not found</div>
            )}
          </div>
        </div>

        {/* Look for any collection with "euphoria" in the name */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-orange-400">EUPHORIA_SEARCH_RESULTS</h2>
          <div className="bg-gray-900 p-4">
            {(() => {
              const euphoriaCollections = collections.filter(col => 
                col.handle.toLowerCase().includes('euphoria') || 
                col.title.toLowerCase().includes('euphoria')
              );
              
              return euphoriaCollections.length > 0 ? (
                euphoriaCollections.map((col, i) => (
                  <div key={i} className="mb-2">
                    <span className="text-green-400">Found:</span>
                    <span className="text-white ml-2">"{col.handle}" → {col.title}</span>
                  </div>
                ))
              ) : (
                <div className="text-red-400">No collections found containing "euphoria"</div>
              );
            })()}
          </div>
        </div>

        {/* Environment Check */}
        <div className="border border-gray-700 p-4">
          <h2 className="text-lg font-bold mb-3 text-orange-400">ENVIRONMENT_CHECK</h2>
          <div className="bg-gray-900 p-3 text-sm">
            <div className="mb-2">
              <span className="text-gray-400">NODE_ENV:</span>
              <span className="ml-2 text-white">{process.env.NODE_ENV}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Store Domain Set:</span>
              <span className="ml-2 text-white">{process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? '✓' : '✗'}</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-400">Access Token Set:</span>
              <span className="ml-2 text-white">{process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✓' : '✗'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}