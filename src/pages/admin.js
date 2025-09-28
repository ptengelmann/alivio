import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import {
  Terminal,
  Square,
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Grid3x3,
  Tags,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCreateModal from '../components/ProductCreateModal';
import CollectionCreateModal from '../components/CollectionCreateModal';

export default function AdminDashboard() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
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
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    setTimeout(() => setAccessLevel(1), 500);
    setTimeout(() => setAccessLevel(2), 1000);
    setTimeout(() => setAccessLevel(3), 1500);

    loadDashboardData();

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load products, collections, and stats in parallel
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        // Reload dashboard data
        await loadDashboardData();
        setShowCreateModal(false);
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleCreateCollection = async (collectionData) => {
    try {
      const response = await fetch('/api/admin/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectionData)
      });

      if (response.ok) {
        // Reload dashboard data
        await loadDashboardData();
        setShowCollectionModal(false);
      } else {
        console.error('Failed to create collection');
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
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <Terminal className="w-8 h-8 text-white mx-auto mb-4" />
              <div className="font-mono text-sm text-zinc-400">LOADING_ADMIN_INTERFACE...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Alívio | Product Management System</title>
        <meta name="description" content="Secure admin dashboard for managing Alívio products, collections, and inventory." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Navbar />

      <div className="font-mono min-h-screen bg-black text-white">
        {/* Brutalist grid background */}
        <div
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Admin header */}
        <motion.div
          className="border-b border-zinc-900 p-4 sm:p-6 lg:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-full flex justify-between items-center font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-3 h-3" />
              <span className="text-white">ADMIN_CONTROL_PANEL</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-1 ${
                      accessLevel >= level ? 'bg-white' : 'bg-zinc-800'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
            <div className="text-zinc-600">{systemTime}</div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto">

            {/* Dashboard header */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-zinc-900">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 text-xs mb-4 font-mono text-zinc-400">
                  <Square className="w-2 h-2 fill-current" />
                  <span>PRODUCT_MANAGEMENT_SYSTEM</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 font-mono leading-[0.9] break-words">
                  ADMIN<br />DASHBOARD
                </h1>

                {/* Navigation tabs */}
                <div className="flex flex-col sm:flex-row gap-0 border border-zinc-800">
                  {[
                    { id: 'overview', label: 'OVERVIEW', icon: BarChart3 },
                    { id: 'products', label: 'PRODUCTS', icon: Package },
                    { id: 'collections', label: 'COLLECTIONS', icon: Grid3x3 },
                    { id: 'analytics', label: 'ANALYTICS', icon: TrendingUp }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 sm:px-6 py-3 font-mono text-xs transition-colors border-r sm:border-r border-b sm:border-b-0 border-zinc-800 last:border-r-0 last:border-b-0 sm:last:border-b ${
                        activeTab === tab.id
                          ? 'bg-white text-black'
                          : 'bg-black text-zinc-400 hover:text-white hover:bg-zinc-950'
                      }`}
                    >
                      <tab.icon className="w-3 h-3" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 sm:p-6 lg:p-8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                    {[
                      {
                        label: 'Total Products',
                        value: stats.totalProducts || 0,
                        icon: Package,
                        color: 'text-blue-400'
                      },
                      {
                        label: 'Published',
                        value: stats.publishedProducts || 0,
                        icon: CheckCircle,
                        color: 'text-green-400'
                      },
                      {
                        label: 'Drafts',
                        value: stats.draftProducts || 0,
                        icon: Clock,
                        color: 'text-yellow-400'
                      },
                      {
                        label: 'Collections',
                        value: stats.totalCollections || 0,
                        icon: Grid3x3,
                        color: 'text-purple-400'
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="border border-zinc-800 p-6 bg-zinc-950"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-xs text-zinc-400 font-mono">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <motion.div
                      className="border border-zinc-800 p-6 bg-black hover:bg-zinc-950 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      onClick={() => setShowCreateModal(true)}
                    >
                      <Plus className="w-6 h-6 text-white mb-3" />
                      <div className="font-mono text-sm text-white mb-2">ADD_NEW_PRODUCT</div>
                      <div className="text-xs text-zinc-400">Create and configure new products</div>
                    </motion.div>

                    <motion.div
                      className="border border-zinc-800 p-6 bg-black hover:bg-zinc-950 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => setShowCollectionModal(true)}
                    >
                      <Grid3x3 className="w-6 h-6 text-white mb-3" />
                      <div className="font-mono text-sm text-white mb-2">CREATE_COLLECTION</div>
                      <div className="text-xs text-zinc-400">Organize products by emotional state</div>
                    </motion.div>

                    <motion.div
                      className="border border-zinc-800 p-6 bg-black hover:bg-zinc-950 transition-colors cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => setActiveTab('analytics')}
                    >
                      <BarChart3 className="w-6 h-6 text-white mb-3" />
                      <div className="font-mono text-sm text-white mb-2">VIEW_ANALYTICS</div>
                      <div className="text-xs text-zinc-400">Track performance and insights</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'products' && (
                <motion.div
                  key="products"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 sm:p-6 lg:p-8"
                >
                  {/* Search and filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="SEARCH_PRODUCTS..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full bg-black border border-zinc-800 pl-10 pr-4 py-3 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-black border border-zinc-800 px-4 py-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="all">ALL_STATUS</option>
                        <option value="active">PUBLISHED</option>
                        <option value="draft">DRAFT</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-white text-black px-6 py-3 font-mono text-sm font-bold hover:bg-zinc-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 inline mr-2" />
                        ADD_PRODUCT
                      </button>
                    </div>
                  </div>

                  {/* Products grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="border border-zinc-800 bg-zinc-950 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {/* Product image */}
                        <div className="aspect-square bg-zinc-800 relative">
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0].src}
                              alt={product.images[0].alt || product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <ImageIcon className="w-8 h-8 text-zinc-600" />
                            </div>
                          )}
                          <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-mono ${
                            product.status === 'active' ? 'bg-green-500 text-white' :
                            product.status === 'draft' ? 'bg-yellow-500 text-black' :
                            'bg-gray-500 text-white'
                          }`}>
                            {product.status.toUpperCase()}
                          </div>
                        </div>

                        {/* Product info */}
                        <div className="p-4">
                          <h3 className="font-mono text-sm font-bold text-white mb-2 truncate">
                            {product.title}
                          </h3>
                          <div className="text-xs text-zinc-400 mb-3 font-mono">
                            SKU: {product.variants?.[0]?.sku || 'N/A'}
                          </div>
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-bold text-white">
                              {formatPrice(product.variants?.[0]?.price || 0)}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {product.variants?.length || 0} variant{product.variants?.length !== 1 ? 's' : ''}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button className="flex-1 border border-zinc-700 text-white py-2 px-3 text-xs font-mono hover:border-white transition-colors">
                              <Edit className="w-3 h-3 inline mr-1" />
                              EDIT
                            </button>
                            <button className="border border-zinc-700 text-white py-2 px-3 text-xs font-mono hover:border-white transition-colors">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="border border-red-700 text-red-400 py-2 px-3 text-xs font-mono hover:border-red-500 transition-colors">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                      <div className="font-mono text-zinc-400 mb-2">NO_PRODUCTS_FOUND</div>
                      <div className="text-xs text-zinc-600">
                        {searchTerm || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first product to get started'}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'collections' && (
                <motion.div
                  key="collections"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 sm:p-6 lg:p-8"
                >
                  {/* Collections header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                    <div>
                      <h2 className="font-mono text-xl text-white font-bold">EMOTION_COLLECTIONS</h2>
                      <div className="text-xs text-zinc-400 font-mono mt-1">Organize products by emotional state</div>
                    </div>
                    <button
                      onClick={() => setShowCollectionModal(true)}
                      className="bg-white text-black px-6 py-3 font-mono text-sm font-bold hover:bg-zinc-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 inline mr-2" />
                      CREATE_COLLECTION
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {collections.map((collection, index) => (
                      <motion.div
                        key={collection.id}
                        className="border border-zinc-800 p-6 bg-zinc-950"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <Grid3x3 className="w-5 h-5 text-white" />
                          <h3 className="font-mono text-sm font-bold text-white">{collection.title}</h3>
                        </div>
                        <div className="text-xs text-zinc-400 mb-4 font-mono">
                          {collection.products_count} products
                        </div>
                        <div className="text-xs text-zinc-500 mb-4 line-clamp-3">
                          {collection.body_html ? collection.body_html.replace(/<[^>]*>/g, '') : 'No description'}
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 border border-zinc-700 text-white py-2 px-3 text-xs font-mono hover:border-white transition-colors">
                            <Edit className="w-3 h-3 inline mr-1" />
                            EDIT
                          </button>
                          <button className="border border-zinc-700 text-white py-2 px-3 text-xs font-mono hover:border-white transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 sm:p-6 lg:p-8"
                >
                  <div className="text-center py-8 sm:py-12">
                    <BarChart3 className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <div className="font-mono text-zinc-400 mb-2">ANALYTICS_COMING_SOON</div>
                    <div className="text-xs text-zinc-600">
                      Advanced analytics and reporting features will be available soon
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Accent element */}
        <motion.div
          className="fixed bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-purple-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />

      {/* Product Create Modal */}
      <ProductCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateProduct}
        collections={collections}
      />

      {/* Collection Create Modal */}
      <CollectionCreateModal
        isOpen={showCollectionModal}
        onClose={() => setShowCollectionModal(false)}
        onSubmit={handleCreateCollection}
      />
    </>
  );
}