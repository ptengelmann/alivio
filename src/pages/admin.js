import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Grid3x3,
  Image as ImageIcon,
  CheckCircle,
  Clock,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCreateModal from '../components/ProductCreateModal';
import CollectionCreateModal from '../components/CollectionCreateModal';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [productsRes, collectionsRes, statsRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/collections'),
        fetch('/api/admin/products?stats=true')
      ]);

      const [productsData, collectionsData, statsData] = await Promise.all([
        productsRes.json(),
        collectionsRes.json(),
        statsRes.json()
      ]);

      setProducts(productsData);
      setCollections(collectionsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        await loadDashboardData();
        setShowCreateModal(false);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleCreateCollection = async (collectionData) => {
    try {
      const response = await fetch('/api/admin/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collectionData)
      });

      if (response.ok) {
        await loadDashboardData();
        setShowCollectionModal(false);
      }
    } catch (error) {
      console.error('Error creating collection:', error);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#FAF8F5] text-zinc-900 flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase animate-pulse">
              Loading_Dashboard
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Alívio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {/* Header */}
        <div className="py-12 lg:py-16 border-b border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
              Admin_Dashboard
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-zinc-900 tracking-tight mb-12">
              Product Management
            </h1>

            {/* Navigation tabs */}
            <div className="flex gap-3 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: 'Products' },
                { id: 'collections', label: 'Collections' },
                { id: 'analytics', label: 'Analytics' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'border border-zinc-700/50 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 lg:py-16"
            >
              <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                  {[
                    { label: 'Total_Products', value: stats.totalProducts || 0, icon: Package },
                    { label: 'Published', value: stats.publishedProducts || 0, icon: CheckCircle },
                    { label: 'Drafts', value: stats.draftProducts || 0, icon: Clock },
                    { label: 'Collections', value: stats.totalCollections || 0, icon: Grid3x3 }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="border border-zinc-700/30 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <stat.icon className="w-5 h-5 text-zinc-600 mb-4" />
                      <div className="text-3xl font-light text-zinc-900 mb-2">{stat.value}</div>
                      <div className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="border border-zinc-700/30 p-8 text-left hover:border-zinc-500 transition-all group"
                  >
                    <Plus className="w-5 h-5 text-zinc-900 mb-4" />
                    <div className="text-sm text-zinc-900 mb-2 uppercase tracking-wide font-light">Add_Product</div>
                    <div className="text-[10px] text-zinc-500 tracking-wide">Create new product</div>
                  </button>

                  <button
                    onClick={() => setShowCollectionModal(true)}
                    className="border border-zinc-700/30 p-8 text-left hover:border-zinc-500 transition-all group"
                  >
                    <Grid3x3 className="w-5 h-5 text-zinc-900 mb-4" />
                    <div className="text-sm text-zinc-900 mb-2 uppercase tracking-wide font-light">Create_Collection</div>
                    <div className="text-[10px] text-zinc-500 tracking-wide">Organize products</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="border border-zinc-700/30 p-8 text-left hover:border-zinc-500 transition-all group"
                  >
                    <BarChart3 className="w-5 h-5 text-zinc-900 mb-4" />
                    <div className="text-sm text-zinc-900 mb-2 uppercase tracking-wide font-light">View_Analytics</div>
                    <div className="text-[10px] text-zinc-500 tracking-wide">Track performance</div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 lg:py-16"
            >
              <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
                {/* Search and filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-10">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border border-zinc-700/30 pl-12 pr-4 py-3 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-transparent border border-zinc-700/30 px-4 py-3 text-xs text-zinc-900 focus:border-zinc-500 focus:outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors font-light"
                  >
                    Add Product
                  </button>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="border border-zinc-700/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="aspect-square bg-zinc-50 relative">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0].src}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="w-8 h-8 text-zinc-400" />
                          </div>
                        )}
                        <div className={`absolute top-3 left-3 px-2 py-1 text-[8px] tracking-wider uppercase ${
                          product.status === 'active' ? 'bg-green-500 text-zinc-900' :
                          product.status === 'draft' ? 'bg-yellow-500 text-black' :
                          'bg-gray-500 text-zinc-900'
                        }`}>
                          {product.status}
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="text-xs font-light text-zinc-900 mb-2 uppercase tracking-wide truncate">
                          {product.title}
                        </h3>
                        <div className="text-[10px] text-zinc-500 mb-3 tracking-wider">
                          {formatPrice(product.variants?.[0]?.price || 0)}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 border border-zinc-700/30 text-zinc-900 py-2 text-[9px] uppercase tracking-wider hover:border-zinc-500 transition-colors">
                            Edit
                          </button>
                          <button className="border border-zinc-700/30 text-zinc-900 px-3 hover:border-zinc-500 transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-24">
                    <Package className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">No_Products_Found</div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'collections' && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-12 lg:py-16"
            >
              <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
                <div className="flex justify-between items-center mb-10">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                    {collections.length} Collections
                  </div>
                  <button
                    onClick={() => setShowCollectionModal(true)}
                    className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors font-light"
                  >
                    Create Collection
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection, index) => (
                    <motion.div
                      key={collection.id}
                      className="border border-zinc-700/30 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Grid3x3 className="w-5 h-5 text-zinc-600 mb-4" />
                      <h3 className="text-sm font-light text-zinc-900 mb-2 uppercase tracking-wide">{collection.title}</h3>
                      <div className="text-[10px] text-zinc-500 mb-4 tracking-wider">
                        {collection.products_count} products
                      </div>
                      <button className="border border-zinc-700/30 text-zinc-900 py-2 px-4 text-[9px] uppercase tracking-wider hover:border-zinc-500 transition-colors w-full">
                        Edit
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-24"
            >
              <div className="max-w-[1600px] mx-auto px-8 lg:px-12 text-center">
                <BarChart3 className="w-12 h-12 text-zinc-700 mx-auto mb-6" />
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Analytics_Coming_Soon</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <ProductCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProduct}
        collections={collections}
      />

      <CollectionCreateModal
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        onSubmit={handleCreateCollection}
      />
    </>
  );
}
