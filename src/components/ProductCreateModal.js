import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Upload, Package, DollarSign, Hash, Tag } from 'lucide-react';

export default function ProductCreateModal({ isOpen, onClose, onSubmit, collections = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    handle: '',
    vendor: 'Alívio',
    product_type: '',
    tags: '',
    status: 'draft',
    variants: [
      {
        title: 'S',
        price: '',
        compare_at_price: '',
        sku: '',
        inventory_quantity: 0,
        weight: 0,
        weight_unit: 'kg',
        requires_shipping: true,
        taxable: true
      }
    ],
    images: [],
    options: [
      {
        name: 'Size',
        values: ['S']
      }
    ],
    seo_title: '',
    seo_description: '',
    collection_ids: []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate handle from title
    if (field === 'title') {
      const handle = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        handle: handle
      }));
    }
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index] = {
      ...newVariants[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      variants: newVariants
    }));
  };

  const addVariant = () => {
    const sizesToAdd = ['M', 'L', 'XL', 'XXL'];
    const nextSize = sizesToAdd[formData.variants.length - 1] || `Size ${formData.variants.length + 1}`;

    setFormData(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          title: nextSize,
          price: '',
          compare_at_price: '',
          sku: '',
          inventory_quantity: 0,
          weight: 0,
          weight_unit: 'kg',
          requires_shipping: true,
          taxable: true
        }
      ]
    }));
  };

  const removeVariant = (index) => {
    if (formData.variants.length > 1) {
      setFormData(prev => ({
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare product data for Shopify
      const productData = {
        title: formData.title,
        body_html: formData.description,
        handle: formData.handle,
        vendor: formData.vendor,
        product_type: formData.product_type,
        tags: formData.tags,
        status: formData.status,
        variants: formData.variants.map(variant => ({
          ...variant,
          price: parseFloat(variant.price) || 0,
          compare_at_price: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,
          inventory_quantity: parseInt(variant.inventory_quantity) || 0,
          weight: parseFloat(variant.weight) || 0
        })),
        options: formData.options,
        metafields: [
          {
            namespace: 'seo',
            key: 'title',
            value: formData.seo_title,
            type: 'single_line_text_field'
          },
          {
            namespace: 'seo',
            key: 'description',
            value: formData.seo_description,
            type: 'single_line_text_field'
          }
        ]
      };

      await onSubmit(productData);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] bg-black border border-zinc-800 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div>
              <h2 className="text-xl font-bold text-white font-mono">CREATE_NEW_PRODUCT</h2>
              <div className="text-xs text-zinc-400 font-mono mt-1">Add new contraband to inventory</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 transition-colors rounded"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-800">
            <div className="flex">
              {[
                { id: 'basic', label: 'BASIC_INFO', icon: Package },
                { id: 'variants', label: 'VARIANTS', icon: Hash },
                { id: 'seo', label: 'SEO_META', icon: Tag }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-mono text-xs transition-colors border-r border-zinc-800 ${
                    activeTab === tab.id
                      ? 'bg-white text-black'
                      : 'bg-black text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <form onSubmit={handleSubmit}>
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">PRODUCT_TITLE *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Euphoria Tee Vol-2"
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Handle */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">URL_HANDLE</label>
                      <input
                        type="text"
                        value={formData.handle}
                        onChange={(e) => handleInputChange('handle', e.target.value)}
                        placeholder="euphoria-tee-vol-2"
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-2">DESCRIPTION</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Detailed product description with emotional contraband specifications..."
                      rows={6}
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Product Type */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">PRODUCT_TYPE</label>
                      <select
                        value={formData.product_type}
                        onChange={(e) => handleInputChange('product_type', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="">Select Type</option>
                        <option value="T-Shirt">T-Shirt</option>
                        <option value="Hoodie">Hoodie</option>
                        <option value="Cap">Cap</option>
                        <option value="Trouser">Trouser</option>
                        <option value="Jacket">Jacket</option>
                        <option value="Accessories">Accessories</option>
                      </select>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">TAGS</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        placeholder="euphoria,streetwear,premium"
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">STATUS</label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="draft">DRAFT</option>
                        <option value="active">PUBLISHED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'variants' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-sm text-white">PRODUCT_VARIANTS</h3>
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-white text-black px-4 py-2 font-mono text-xs font-bold hover:bg-zinc-100 transition-colors"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      ADD_VARIANT
                    </button>
                  </div>

                  {formData.variants.map((variant, index) => (
                    <div key={index} className="border border-zinc-700 p-4 bg-zinc-900">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-mono text-xs text-zinc-400">VARIANT {index + 1}</h4>
                        {formData.variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">TITLE</label>
                          <input
                            type="text"
                            value={variant.title}
                            onChange={(e) => handleVariantChange(index, 'title', e.target.value)}
                            className="w-full bg-black border border-zinc-600 p-2 font-mono text-xs text-white focus:border-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">PRICE (£)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                            className="w-full bg-black border border-zinc-600 p-2 font-mono text-xs text-white focus:border-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">SKU</label>
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                            placeholder="ALV-001"
                            className="w-full bg-black border border-zinc-600 p-2 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">INVENTORY</label>
                          <input
                            type="number"
                            value={variant.inventory_quantity}
                            onChange={(e) => handleVariantChange(index, 'inventory_quantity', e.target.value)}
                            className="w-full bg-black border border-zinc-600 p-2 font-mono text-xs text-white focus:border-white focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-2">SEO_TITLE</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => handleInputChange('seo_title', e.target.value)}
                      placeholder="Product Title | Alívio"
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-2">SEO_DESCRIPTION</label>
                    <textarea
                      value={formData.seo_description}
                      onChange={(e) => handleInputChange('seo_description', e.target.value)}
                      placeholder="SEO-optimized description for search engines..."
                      rows={4}
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-800 p-6">
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="border border-zinc-700 text-white px-6 py-3 font-mono text-sm hover:border-white transition-colors"
              >
                CANCEL
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.title}
                className="bg-white text-black px-6 py-3 font-mono text-sm font-bold hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'CREATING...' : 'CREATE_PRODUCT'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}