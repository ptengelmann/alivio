// API route for collection management operations
import {
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection
} from '../../../lib/shopify-admin';

export default async function handler(req, res) {
  try {
    const { method, query } = req;

    switch (method) {
      case 'GET':
        if (query.id) {
          // Get single collection
          const collection = await getCollection(query.id);
          if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
          }
          return res.status(200).json(collection);
        } else {
          // Get all collections
          const collections = await getAllCollections();
          return res.status(200).json(collections);
        }

      case 'POST':
        // Create new collection
        const createResult = await createCollection(req.body);
        if (createResult.success) {
          return res.status(201).json(createResult.collection);
        } else {
          return res.status(400).json({ error: createResult.error });
        }

      case 'PUT':
        // Update collection
        if (!query.id) {
          return res.status(400).json({ error: 'Collection ID required' });
        }
        const updateResult = await updateCollection(query.id, req.body);
        if (updateResult.success) {
          return res.status(200).json(updateResult.collection);
        } else {
          return res.status(400).json({ error: updateResult.error });
        }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('Collections API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}