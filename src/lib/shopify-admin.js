// Shopify Admin API helper for product management
// Secure server-side operations only

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = '2024-10';

if (!SHOPIFY_DOMAIN || !ADMIN_ACCESS_TOKEN) {
  console.warn('Shopify Admin API credentials not found in environment variables');
}

const API_BASE = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}`;

const headers = {
  'X-Shopify-Access-Token': ADMIN_ACCESS_TOKEN,
  'Content-Type': 'application/json',
};

async function makeAdminRequest(endpoint, method = 'GET', data = null) {
  if (!ADMIN_ACCESS_TOKEN) {
    throw new Error('Shopify Admin API credentials not configured');
  }

  const url = `${API_BASE}${endpoint}`;
  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Shopify Admin API Error ${response.status}:`, errorText);
      throw new Error(`Shopify API Error: ${response.status} - ${errorText}`);
    }

    const text = await response.text();
    if (!text) return { success: true };

    return JSON.parse(text);
  } catch (error) {
    console.error('Shopify Admin API request failed:', error);
    throw error;
  }
}

// Product Management Functions
export async function getAllProducts(limit = 250) {
  try {
    console.log('Fetching products from Shopify Admin API...');
    const response = await makeAdminRequest(`/products.json?limit=${limit}`);
    console.log('Products response:', response);
    const products = response.products || [];
    console.log(`Found ${products.length} products`);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProduct(productId) {
  try {
    const response = await makeAdminRequest(`/products/${productId}.json`);
    return response.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createProduct(productData) {
  try {
    const response = await makeAdminRequest('/products.json', 'POST', {
      product: productData
    });
    return { success: true, product: response.product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(productId, productData) {
  try {
    const response = await makeAdminRequest(`/products/${productId}.json`, 'PUT', {
      product: { id: productId, ...productData }
    });
    return { success: true, product: response.product };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(productId) {
  try {
    await makeAdminRequest(`/products/${productId}.json`, 'DELETE');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error: error.message };
  }
}

// Collection Management Functions
export async function getAllCollections() {
  try {
    console.log('Fetching all collections...');
    const response = await makeAdminRequest('/custom_collections.json?limit=250');
    console.log('All collections response:', response);
    const collections = response.custom_collections || [];
    console.log('All collections with meta:', collections);
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    // Return empty array if no collections exist yet (404 might be normal for new store)
    if (error.message.includes('404')) {
      console.log('No collections found (404) - this is normal for a new store');
      return [];
    }
    return [];
  }
}

export async function getCollection(collectionId) {
  try {
    const response = await makeAdminRequest(`/custom_collections/${collectionId}.json`);
    return response.custom_collection || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

export async function createCollection(collectionData) {
  try {
    const response = await makeAdminRequest('/custom_collections.json', 'POST', {
      custom_collection: collectionData
    });
    return { success: true, collection: response.custom_collection };
  } catch (error) {
    console.error('Error creating collection:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCollection(collectionId, collectionData) {
  try {
    const response = await makeAdminRequest(`/custom_collections/${collectionId}.json`, 'PUT', {
      custom_collection: { id: collectionId, ...collectionData }
    });
    return { success: true, collection: response.custom_collection };
  } catch (error) {
    console.error('Error updating collection:', error);
    return { success: false, error: error.message };
  }
}

// Inventory Management Functions
export async function updateInventory(inventoryItemId, locationId, quantity) {
  try {
    const response = await makeAdminRequest('/inventory_levels/set.json', 'POST', {
      location_id: locationId,
      inventory_item_id: inventoryItemId,
      available: quantity
    });
    return { success: true, inventory: response.inventory_level };
  } catch (error) {
    console.error('Error updating inventory:', error);
    return { success: false, error: error.message };
  }
}

export async function getInventoryLevels(inventoryItemIds) {
  try {
    const ids = Array.isArray(inventoryItemIds) ? inventoryItemIds.join(',') : inventoryItemIds;
    const response = await makeAdminRequest(`/inventory_levels.json?inventory_item_ids=${ids}`);
    return response.inventory_levels || [];
  } catch (error) {
    console.error('Error fetching inventory levels:', error);
    return [];
  }
}

// Bulk Operations
export async function bulkUpdateProducts(products) {
  const results = [];

  for (const product of products) {
    try {
      const result = await updateProduct(product.id, product);
      results.push({ id: product.id, ...result });
    } catch (error) {
      results.push({ id: product.id, success: false, error: error.message });
    }
  }

  return results;
}

// Product Analytics
export async function getProductStats() {
  try {
    const products = await getAllProducts();
    const collections = await getAllCollections();

    const stats = {
      totalProducts: products.length,
      totalCollections: collections.length,
      publishedProducts: products.filter(p => p.status === 'active').length,
      draftProducts: products.filter(p => p.status === 'draft').length,
      totalVariants: products.reduce((sum, p) => sum + (p.variants?.length || 0), 0),
      productsWithImages: products.filter(p => p.images && p.images.length > 0).length,
      collectionsWithProducts: collections.filter(c => c.products_count > 0).length
    };

    return stats;
  } catch (error) {
    console.error('Error getting product stats:', error);
    return {};
  }
}

// Image Management
export async function uploadProductImage(productId, imageData) {
  try {
    const response = await makeAdminRequest(`/products/${productId}/images.json`, 'POST', {
      image: imageData
    });
    return { success: true, image: response.image };
  } catch (error) {
    console.error('Error uploading product image:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteProductImage(productId, imageId) {
  try {
    await makeAdminRequest(`/products/${productId}/images/${imageId}.json`, 'DELETE');
    return { success: true };
  } catch (error) {
    console.error('Error deleting product image:', error);
    return { success: false, error: error.message };
  }
}