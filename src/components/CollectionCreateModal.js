import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid3x3, Tag, Hash } from 'lucide-react';

export default function CollectionCreateModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    handle: '',
    collection_type: 'manual',
    published: true,
    sort_order: 'manual',
    body_html: '',
    seo_title: '',
    seo_description: '',
    // Emotion-specific metadata
    emotion_id: '',
    classification: 'SCHEDULE_I',
    purity: '',
    batch_number: '',
    accent_color: '#71717a'
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emotionPresets = [
    { id: 'euphoria', name: 'Euphoria', color: '#3b82f6', purity: '99.7%' },
    { id: 'rage', name: 'Rage', color: '#ef4444', purity: '96.8%' },
    { id: 'melancholy', name: 'Melancholy', color: '#6366f1', purity: '94.2%' },
    { id: 'serenity', name: 'Serenity', color: '#10b981', purity: '98.1%' },
    { id: 'anxiety', name: 'Anxiety', color: '#f59e0b', purity: '92.5%' },
    { id: 'bliss', name: 'Bliss', color: '#ec4899', purity: '97.3%' }
  ];

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
        handle: handle,
        emotion_id: handle
      }));
    }
  };

  const applyEmotionPreset = (emotion) => {
    const currentYear = new Date().getFullYear();
    const batchNumber = `${emotion.id.toUpperCase().substring(0, 3)}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}-${currentYear}`;

    setFormData(prev => ({
      ...prev,
      title: emotion.name,
      emotion_id: emotion.id,
      accent_color: emotion.color,
      purity: emotion.purity,
      batch_number: batchNumber,
      description: `${emotion.name} emotional state collection. Laboratory-grade streetwear designed for maximum ${emotion.name.toLowerCase()} delivery. Premium contraband classification.`,
      body_html: `<p><strong>${emotion.name} Collection</strong></p><p>Peak emotional state streetwear collection. Highly regulated. Extreme potency documented in laboratory conditions. Premium cotton streetwear infused with ${emotion.name.toLowerCase()} compounds.</p><p><strong>Specifications:</strong><br/>• Classification: Schedule I<br/>• Purity: ${emotion.purity}<br/>• Batch: ${batchNumber}<br/>• Distribution: Restricted</p>`,
      seo_title: `${emotion.name} Collection | Alívio | Emotional Contraband`,
      seo_description: `${emotion.name} streetwear collection. Premium emotional contraband with ${emotion.purity} purity. Limited distribution, maximum impact.`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare collection data for Shopify
      const collectionData = {
        title: formData.title,
        body_html: formData.body_html || formData.description,
        handle: formData.handle,
        sort_order: formData.sort_order,
        published: formData.published,
        collection_type: formData.collection_type,
        metafields: [
          {
            namespace: 'alivio',
            key: 'emotion_id',
            value: formData.emotion_id,
            type: 'single_line_text_field'
          },
          {
            namespace: 'alivio',
            key: 'classification',
            value: formData.classification,
            type: 'single_line_text_field'
          },
          {
            namespace: 'alivio',
            key: 'purity',
            value: formData.purity,
            type: 'single_line_text_field'
          },
          {
            namespace: 'alivio',
            key: 'batch_number',
            value: formData.batch_number,
            type: 'single_line_text_field'
          },
          {
            namespace: 'alivio',
            key: 'accent_color',
            value: formData.accent_color,
            type: 'color'
          },
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

      await onSubmit(collectionData);
      onClose();
    } catch (error) {
      console.error('Error creating collection:', error);
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
              <h2 className="text-xl font-bold text-white font-mono">CREATE_NEW_COLLECTION</h2>
              <div className="text-xs text-zinc-400 font-mono mt-1">Organize contraband by emotional state</div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-800 transition-colors rounded"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Emotion Presets */}
          <div className="p-6 border-b border-zinc-800 bg-zinc-950">
            <div className="font-mono text-xs text-zinc-400 mb-4">QUICK_EMOTION_PRESETS</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {emotionPresets.map((emotion) => (
                <button
                  key={emotion.id}
                  type="button"
                  onClick={() => applyEmotionPreset(emotion)}
                  className="p-3 border border-zinc-700 hover:border-zinc-500 transition-colors bg-black group"
                >
                  <div
                    className="w-3 h-3 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: emotion.color }}
                  />
                  <div className="font-mono text-xs text-white group-hover:text-zinc-300 transition-colors">
                    {emotion.name.toUpperCase()}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">
                    {emotion.purity}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-zinc-800">
            <div className="flex">
              {[
                { id: 'basic', label: 'COLLECTION_INFO', icon: Grid3x3 },
                { id: 'metadata', label: 'METADATA', icon: Hash },
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
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            <form onSubmit={handleSubmit}>
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">COLLECTION_TITLE *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Euphoria"
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
                        placeholder="euphoria"
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
                      placeholder="Peak emotional state streetwear collection..."
                      rows={4}
                      className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Collection Type */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">COLLECTION_TYPE</label>
                      <div className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-zinc-400">
                        MANUAL (RECOMMENDED)
                      </div>
                    </div>

                    {/* Sort Order */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">SORT_ORDER</label>
                      <select
                        value={formData.sort_order}
                        onChange={(e) => handleInputChange('sort_order', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="manual">MANUAL</option>
                        <option value="alpha-asc">ALPHABETICAL A-Z</option>
                        <option value="alpha-desc">ALPHABETICAL Z-A</option>
                        <option value="price-asc">PRICE LOW-HIGH</option>
                        <option value="price-desc">PRICE HIGH-LOW</option>
                        <option value="created-desc">NEWEST FIRST</option>
                        <option value="created-asc">OLDEST FIRST</option>
                      </select>
                    </div>

                    {/* Published */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">STATUS</label>
                      <select
                        value={formData.published ? 'published' : 'draft'}
                        onChange={(e) => handleInputChange('published', e.target.value === 'published')}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="published">PUBLISHED</option>
                        <option value="draft">DRAFT</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metadata' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Classification */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">CLASSIFICATION</label>
                      <select
                        value={formData.classification}
                        onChange={(e) => handleInputChange('classification', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="SCHEDULE_I">SCHEDULE_I</option>
                        <option value="SCHEDULE_II">SCHEDULE_II</option>
                        <option value="SCHEDULE_III">SCHEDULE_III</option>
                        <option value="UNCLASSIFIED">UNCLASSIFIED</option>
                      </select>
                    </div>

                    {/* Purity */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">PURITY</label>
                      <input
                        type="text"
                        value={formData.purity}
                        onChange={(e) => handleInputChange('purity', e.target.value)}
                        placeholder="99.7%"
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Batch Number */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">BATCH_NUMBER</label>
                      <input
                        type="text"
                        value={formData.batch_number}
                        onChange={(e) => handleInputChange('batch_number', e.target.value)}
                        placeholder="EUP-001-2024"
                        className="w-full bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-2">ACCENT_COLOR</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={formData.accent_color}
                          onChange={(e) => handleInputChange('accent_color', e.target.value)}
                          className="w-12 h-12 border border-zinc-700 bg-zinc-900 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.accent_color}
                          onChange={(e) => handleInputChange('accent_color', e.target.value)}
                          placeholder="#71717a"
                          className="flex-1 bg-zinc-900 border border-zinc-700 p-3 font-mono text-sm text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
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
                      placeholder="Euphoria Collection | Alívio"
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
                {isSubmitting ? 'CREATING...' : 'CREATE_COLLECTION'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}