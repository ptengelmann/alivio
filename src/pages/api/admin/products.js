// API route for product management operations
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from '../../../lib/shopify-admin';

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    switch (method) {
      case 'GET':
        if (query.stats === 'true') {
          // Get product statistics
          const stats = await getProductStats();
          return res.status(200).json(stats);
        } else if (query.id) {
          // Get single product
          const product = await getProduct(query.id);
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }
          return res.status(200).json(product);
        } else {
          // Get all products
          const limit = query.limit ? parseInt(query.limit) : 250;
          const products = await getAllProducts(limit);
          return res.status(200).json(products);
        }

      case 'POST':
        // Create new product
        const createResult = await createProduct(req.body);
        if (createResult.success) {
          return res.status(201).json(createResult.product);
        } else {
          return res.status(400).json({ error: createResult.error });
        }

      case 'PUT':
        // Update product
        if (!query.id) {
          return res.status(400).json({ error: 'Product ID required' });
        }
        const updateResult = await updateProduct(query.id, req.body);
        if (updateResult.success) {
          return res.status(200).json(updateResult.product);
        } else {
          return res.status(400).json({ error: updateResult.error });
        }

      case 'DELETE':
        // Delete product
        if (!query.id) {
          return res.status(400).json({ error: 'Product ID required' });
        }
        const deleteResult = await deleteProduct(query.id);
        if (deleteResult.success) {
          return res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          return res.status(400).json({ error: deleteResult.error });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}