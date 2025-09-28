// /lib/shopify.js - Debug version

import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// Debug environment variables
console.log('Shopify Environment Check:');
console.log('Store Domain:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
console.log('Access Token exists:', !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
console.log('Access Token length:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length);

const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10', // Updated to a valid version
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

// Test the connection
async function testConnection() {
  try {
    const testQuery = `
      query {
        shop {
          name
          description
        }
      }
    `;
    
    console.log('Testing Shopify connection...');
    const result = await client.request(testQuery);
    console.log('Connection successful:', result);
    return result;
  } catch (error) {
    console.error('Shopify connection failed:', error);
    return null;
  }
}

// Run test in browser only
if (typeof window !== 'undefined') {
  testConnection();
}

export default client;