// API endpoint for creating Shopify checkouts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const client = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
}) : null;

const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        subtotalPriceV2 {
          amount
          currencyCode
        }
        totalTaxV2 {
          amount
          currencyCode
        }
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

const CHECKOUT_LINE_ITEMS_ADD_MUTATION = `
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        subtotalPriceV2 {
          amount
          currencyCode
        }
        totalTaxV2 {
          amount
          currencyCode
        }
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!client) {
    return res.status(500).json({
      error: 'Shopify client not configured. Please check environment variables.'
    });
  }

  try {
    const { items, checkoutId } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required and cannot be empty' });
    }

    // Format line items for Shopify
    const lineItems = items.map(item => ({
      variantId: item.variantId || item.variant?.id,
      quantity: parseInt(item.quantity) || 1
    }));

    // Validate that all items have variant IDs
    const invalidItems = lineItems.filter(item => !item.variantId);
    if (invalidItems.length > 0) {
      return res.status(400).json({
        error: 'All items must have a valid variantId',
        invalidItems
      });
    }

    let response;

    if (checkoutId) {
      // Add items to existing checkout
      response = await client.request(CHECKOUT_LINE_ITEMS_ADD_MUTATION, {
        variables: {
          checkoutId,
          lineItems
        }
      });

      if (response.data.checkoutLineItemsAdd.checkoutUserErrors.length > 0) {
        return res.status(400).json({
          error: 'Checkout error',
          errors: response.data.checkoutLineItemsAdd.checkoutUserErrors
        });
      }

      return res.status(200).json({
        success: true,
        checkout: response.data.checkoutLineItemsAdd.checkout,
        checkoutUrl: response.data.checkoutLineItemsAdd.checkout.webUrl
      });

    } else {
      // Create new checkout
      response = await client.request(CHECKOUT_CREATE_MUTATION, {
        variables: {
          input: {
            lineItems,
            allowPartialAddresses: true
          }
        }
      });

      if (response.data.checkoutCreate.checkoutUserErrors.length > 0) {
        return res.status(400).json({
          error: 'Checkout creation error',
          errors: response.data.checkoutCreate.checkoutUserErrors
        });
      }

      return res.status(200).json({
        success: true,
        checkout: response.data.checkoutCreate.checkout,
        checkoutUrl: response.data.checkoutCreate.checkout.webUrl
      });
    }

  } catch (error) {
    console.error('Checkout API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}