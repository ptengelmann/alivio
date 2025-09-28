import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  Terminal, Square, ArrowRight, ChevronDown, Eye,
  ShoppingBag, Lock, Play, Volume2, VolumeX, Camera
} from 'lucide-react';
import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { getEmotion, getEmotionByHandle } from '../../lib/emotions';
import { formatMoney } from '../../lib/money';

// Create Shopify client
const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

// Collection with products query
const COLLECTION_QUERY = `
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
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`;

function EuphoriaCollection({ collection, emotion }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessLevel, setAccessLevel] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 600);
    setTimeout(() => setAccessLevel(1), 900);
    setTimeout(() => setAccessLevel(2), 1200);
  }, []);

  const products = collection?.products?.edges || [];


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Collection header */}
      <motion.div
        className="border-b border-zinc-900 p-6 bg-zinc-950"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-4 h-4" />
              <span className="text-white">COLLECTION_ACCESS</span>
              <div className="flex gap-1">
                {[1, 2].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-1 ${
                      accessLevel >= level ? 'bg-white' : 'bg-zinc-800'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
            <div className="text-zinc-400">{products.length} ITEMS</div>
          </div>
        </div>
      </motion.div>

      {/* Collection content */}
      <div className="max-w-7xl mx-auto">
        {/* Collection header */}
        <div className="grid grid-cols-12 border-b border-zinc-900">
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
            <motion.div
              className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: accessLevel >= 1 ? 1 : 0, y: accessLevel >= 1 ? 0 : 20 }}
              transition={{ delay: 0.5 }}
            >
              <Square className="w-2 h-2 fill-current" />
              <span>STREETWEAR_COLLECTION</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.8]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 30 }}
              transition={{ delay: 0.7 }}
              style={{ color: emotion?.colors?.accent || '#818cf8' }}
            >
              EUPHORIA
            </motion.h1>

            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 20 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
                {emotion?.description || "Peak emotional state streetwear collection. Premium cotton streetwear infused with emotional compounds."}
              </div>
              <div className="flex gap-4 text-sm font-mono text-zinc-400">
                <span>Quality: {emotion?.contraband?.purity || '99.7%'}</span>
                <span>•</span>
                <span>Batch: {emotion?.contraband?.batchNumber || 'EUP-001-2024'}</span>
                <span>•</span>
                <span>{products.length} Items</span>
              </div>

              {/* View mode toggle */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 font-mono text-xs border transition-colors ${
                    viewMode === 'grid'
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  GRID_VIEW
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 font-mono text-xs border transition-colors ${
                    viewMode === 'list'
                      ? 'border-white bg-white text-black'
                      : 'border-zinc-800 text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  LIST_VIEW
                </button>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, x: accessLevel >= 2 ? 0 : 20 }}
              transition={{ delay: 0.8 }}
            >
              <div className="font-mono text-xs text-zinc-400 mb-4">COLLECTION_INFO</div>
              <div className="space-y-3">
                {[
                  { label: "ITEMS_AVAILABLE", value: products.length.toString().padStart(2, '0') },
                  { label: "RELEASE_DATE", value: "MAR_2024" },
                  { label: "STATUS", value: "ACTIVE" },
                  { label: "CLASSIFICATION", value: emotion?.contraband?.classification || 'PREMIUM' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex justify-between py-2 border-b border-zinc-800"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <span className="text-xs font-mono text-zinc-500">{stat.label}</span>
                    <span className="text-xs font-mono text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Available Volumes */}
              <div className="pt-8 border-t border-zinc-800">
                <div className="font-mono text-xs text-zinc-400 mb-4">AVAILABLE_DROPS</div>
                <div className="space-y-2">
                  {Object.entries(emotion?.volumes || {}).map(([volumeId, volume]) => (
                    <Link
                      key={volumeId}
                      href={`/collections/${emotion.id}/${volumeId}`}
                      className={`block w-full text-left p-4 border transition-colors font-mono text-xs ${
                        volume.status === 'available'
                          ? 'border-zinc-700 text-zinc-300 hover:border-white hover:bg-zinc-900'
                          : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-bold">{volume.title.toUpperCase()}</div>
                        <div
                          className={`px-2 py-1 text-[10px] border ${
                            volume.status === 'available'
                              ? 'border-blue-500 text-blue-400'
                              : volume.status === 'coming-soon'
                              ? 'border-yellow-500 text-yellow-400'
                              : 'border-red-500 text-red-400'
                          }`}
                        >
                          {volume.status.toUpperCase().replace('-', '_')}
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-500 mb-1">
                        {volume.batchCode}
                      </div>
                      <div className="text-[10px] text-zinc-600">
                        {volume.units} UNITS
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Volumes/Drops Section */}
        <div className="p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {/* Section header */}
            <div className="mb-12">
              <h2 className="text-3xl font-black font-mono text-white mb-4">
                AVAILABLE_DROPS
              </h2>
              <div className="text-zinc-400 font-mono text-sm">
                Select a drop to explore specific volume collections and products.
              </div>
            </div>

            {/* Volumes grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {Object.entries(emotion?.volumes || {}).map(([volumeId, volume], index) => (
                <motion.div
                  key={volumeId}
                  className="border border-zinc-800 bg-zinc-950 group hover:border-zinc-600 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                >
                  {/* Volume header */}
                  <div className="p-8 border-b border-zinc-800">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black font-mono text-white mb-2">
                          {volume.title.toUpperCase()}
                        </h3>
                        <div className="text-sm font-mono text-zinc-400 mb-4">
                          {volume.subtitle}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 text-xs font-mono border ${
                          volume.status === 'available'
                            ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                            : volume.status === 'coming-soon'
                            ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
                            : 'border-red-500 text-red-400 bg-red-500/10'
                        }`}
                      >
                        {volume.status.toUpperCase().replace('-', '_')}
                      </div>
                    </div>

                    <div className="text-zinc-300 leading-relaxed mb-6">
                      {volume.story?.description || volume.subtitle}
                    </div>

                    {/* Volume specs */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-zinc-800">
                          <span className="text-xs font-mono text-zinc-500">BATCH</span>
                          <span className="text-xs font-mono text-white">{volume.batchCode}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-800">
                          <span className="text-xs font-mono text-zinc-500">UNITS</span>
                          <span className="text-xs font-mono text-white">{volume.units}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-zinc-800">
                          <span className="text-xs font-mono text-zinc-500">RELEASE</span>
                          <span className="text-xs font-mono text-white">{volume.timestamp.split('T')[0]}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-zinc-800">
                          <span className="text-xs font-mono text-zinc-500">ITEMS</span>
                          <span className="text-xs font-mono text-white">{volume.products?.length || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <Link
                      href={`/collections/${emotion.id}/${volumeId}`}
                      className={`block w-full py-4 px-6 font-mono font-bold text-sm tracking-wider transition-all text-center ${
                        volume.status === 'available'
                          ? 'bg-white text-black hover:bg-zinc-100'
                          : 'border border-zinc-700 text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      {volume.status === 'available' ? 'EXPLORE_DROP' : 'NOTIFY_WHEN_AVAILABLE'}
                    </Link>
                  </div>

                  {/* Volume preview */}
                  <div className="p-8">
                    <div className="aspect-[16/9] bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-zinc-600 mb-4 font-mono">
                          {emotion?.name?.charAt(0)}
                        </div>
                        <div className="text-sm text-zinc-600 font-mono">
                          VOLUME_PREVIEW
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-500 text-center">
                      {volume.story?.title || volume.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* All Products Section */}
            <div className="border-t border-zinc-800 pt-16">
              <div className="mb-8">
                <h2 className="text-2xl font-black font-mono text-white mb-4">
                  ALL_PRODUCTS
                </h2>
                <div className="text-zinc-400 font-mono text-sm">
                  Browse all items from this collection across all volumes.
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-900">
                  {products.map((productEdge, index) => {
                    const product = productEdge.node;
                    return (
                      <motion.div
                        key={product.id}
                        className="border border-zinc-900 bg-black group relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.05 }}
                      >
                        {/* Product image with overlays */}
                        <div className="aspect-[4/5] relative border-b border-zinc-900">
                          {product.featuredImage?.url ? (
                            <img
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-4xl font-black text-zinc-700 mb-2 font-mono">
                                  {emotion?.name?.charAt(0) || 'T'}
                                </div>
                                <div className="text-xs text-zinc-600 font-mono">TEXTILE</div>
                              </div>
                            </div>
                          )}

                          {/* Size range overlay */}
                          <div className="absolute top-4 left-4">
                            <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                              {product.variants?.edges?.length > 1 ? 'MULTI-SIZE' : 'ONE SIZE'}
                            </div>
                          </div>

                          {/* Item code overlay */}
                          <div className="absolute top-4 right-4">
                            <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-white">
                              ITEM-{emotion?.contraband?.batchNumber?.slice(-7) || 'UNKNOWN'}
                            </div>
                          </div>

                          {/* Status indicator */}
                          <div className="absolute bottom-4 right-4">
                            <div className="w-2 h-2 bg-green-400 animate-pulse" />
                          </div>

                          {/* Classification overlay */}
                          <div className="absolute bottom-4 left-4">
                            <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                              {emotion?.contraband?.classification || 'CLASS-A'}
                            </div>
                          </div>
                        </div>

                        {/* Product details */}
                        <div className="p-6">
                          {/* Header */}
                          <div className="mb-4">
                            <h4 className="font-black font-mono text-white mb-1 text-sm leading-tight">
                              {product.title.toUpperCase()}
                            </h4>
                            <div className="text-xs text-zinc-500 font-mono">
                              {emotion?.name?.toUpperCase() || 'UNCLASSIFIED'}_COLLECTION
                            </div>
                          </div>

                          {/* Specs */}
                          <div className="space-y-2 mb-6">
                            <div className="flex justify-between py-1 border-b border-zinc-900">
                              <span className="text-xs font-mono text-zinc-500">PRICE</span>
                              <span className="text-xs font-mono text-white">
                                {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                              </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-900">
                              <span className="text-xs font-mono text-zinc-500">POTENCY</span>
                              <span className="text-xs font-mono text-white">
                                {emotion?.contraband?.purity || '99.7%'}
                              </span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-900">
                              <span className="text-xs font-mono text-zinc-500">MATERIAL</span>
                              <span className="text-xs font-mono text-white">100% COTTON</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-zinc-900">
                              <span className="text-xs font-mono text-zinc-500">STATUS</span>
                              <span className="text-xs font-mono text-green-400">AVAILABLE</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <Link
                              href={`/products/${product.handle}`}
                              className="block w-full bg-white text-black py-3 px-4 font-mono font-bold text-xs tracking-wider hover:bg-zinc-100 transition-colors text-center group-hover:bg-yellow-400"
                              data-cursor="ACQUIRE"
                            >
                              ACQUIRE_ITEM
                            </Link>
                            <button className="w-full border border-zinc-800 text-white py-2 px-4 font-mono text-xs hover:border-white transition-colors">
                              MOLECULAR_ANALYSIS
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((productEdge, index) => {
                    const product = productEdge.node;
                    return (
                      <motion.div
                        key={product.id}
                        className="border border-zinc-800 bg-zinc-950 p-6 hover:border-zinc-600 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.02 }}
                      >
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-12 md:col-span-3">
                            <div className="aspect-[4/5] bg-zinc-800 border border-zinc-700">
                              {product.featuredImage?.url ? (
                                <img
                                  src={product.featuredImage.url}
                                  alt={product.featuredImage.altText || product.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-black text-zinc-600 mb-2 font-mono">E</div>
                                    <div className="text-xs text-zinc-700 font-mono">ITEM</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-black font-mono text-white mb-2">
                                  {product.title.toUpperCase()}
                                </h3>
                              </div>
                              <div className="text-xl font-mono text-white">
                                {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                              </div>
                            </div>

                            <div className="text-sm text-zinc-300 leading-relaxed mb-6">
                              {product.description || "Premium streetwear piece from the Euphoria collection. Crafted with emotional compounds and premium materials."}
                            </div>

                            <Link
                              href={`/products/${product.handle}`}
                              className="bg-white text-black py-3 px-6 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                            >
                              VIEW_DETAILS
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RageCollection({ collection, emotion }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessLevel, setAccessLevel] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 600);
    setTimeout(() => setAccessLevel(1), 900);
    setTimeout(() => setAccessLevel(2), 1200);
  }, []);

  const products = collection?.products?.edges || [];


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Collection header */}
      <motion.div
        className="border-b border-red-900 p-6 bg-red-950/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-4 h-4 text-red-400" />
              <span className="text-white">COLLECTION_ACCESS</span>
              <div className="flex gap-1">
                {[1, 2].map((level) => (
                  <div
                    key={level}
                    className={`w-1 h-1 ${
                      accessLevel >= level ? 'bg-red-400' : 'bg-red-900'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
            </div>
            <div className="text-red-400">{products.length} ITEMS</div>
          </div>
        </div>
      </motion.div>

      {/* Collection content */}
      <div className="max-w-7xl mx-auto">
        {/* Collection header */}
        <div className="grid grid-cols-12 border-b border-red-900">
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-red-900">
            <motion.div
              className="flex items-center gap-2 text-xs mb-8 font-mono text-red-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: accessLevel >= 1 ? 1 : 0, y: accessLevel >= 1 ? 0 : 20 }}
              transition={{ delay: 0.5 }}
            >
              <Square className="w-2 h-2 fill-current" />
              <span>STREETWEAR_COLLECTION</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.8]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 30 }}
              transition={{ delay: 0.7 }}
              style={{ color: emotion?.colors?.accent || '#ef4444' }}
            >
              RAGE
            </motion.h1>

            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 20 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
                {emotion?.description || "High-energy streetwear collection. Extreme potency. Restricted distribution for maximum impact scenarios."}
              </div>
              <div className="flex gap-4 text-sm font-mono text-zinc-400">
                <span>Quality: {emotion?.contraband?.purity || '96.8%'}</span>
                <span>•</span>
                <span>Batch: {emotion?.contraband?.batchNumber || 'RAG-004-2024'}</span>
                <span>•</span>
                <span>{products.length} Items</span>
              </div>

              {/* View mode toggle */}
              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 font-mono text-xs border transition-colors ${
                    viewMode === 'grid'
                      ? 'border-red-400 bg-red-400 text-black'
                      : 'border-red-800 text-red-400 hover:border-red-600'
                  }`}
                >
                  GRID_VIEW
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 font-mono text-xs border transition-colors ${
                    viewMode === 'list'
                      ? 'border-red-400 bg-red-400 text-black'
                      : 'border-red-800 text-red-400 hover:border-red-600'
                  }`}
                >
                  LIST_VIEW
                </button>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-red-950/20">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, x: accessLevel >= 2 ? 0 : 20 }}
              transition={{ delay: 0.8 }}
            >
              <div className="font-mono text-xs text-red-400 mb-4">COLLECTION_INFO</div>
              <div className="space-y-3">
                {[
                  { label: "ITEMS_AVAILABLE", value: products.length.toString().padStart(2, '0') },
                  { label: "RELEASE_DATE", value: "JUN_2024" },
                  { label: "STATUS", value: "ACTIVE" },
                  { label: "CLASSIFICATION", value: emotion?.contraband?.classification || 'SCHEDULE_I' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex justify-between py-2 border-b border-red-900"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <span className="text-xs font-mono text-red-500">{stat.label}</span>
                    <span className="text-xs font-mono text-white">{stat.value}</span>
                  </motion.div>
                ))}
              </div>

              {/* Available Volumes */}
              <div className="pt-8 border-t border-red-800">
                <div className="font-mono text-xs text-red-400 mb-4">AVAILABLE_DROPS</div>
                <div className="space-y-2">
                  {Object.entries(emotion?.volumes || {}).map(([volumeId, volume]) => (
                    <Link
                      key={volumeId}
                      href={`/collections/${emotion.id}/${volumeId}`}
                      className={`block w-full text-left p-4 border transition-colors font-mono text-xs ${
                        volume.status === 'available'
                          ? 'border-red-800 text-red-300 hover:border-red-600 hover:bg-red-950/40'
                          : 'border-red-900 text-red-600 hover:border-red-800'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-white font-bold">{volume.title.toUpperCase()}</div>
                        <div
                          className={`px-2 py-1 text-[10px] border ${
                            volume.status === 'available'
                              ? 'border-red-500 text-red-400'
                              : volume.status === 'coming-soon'
                              ? 'border-yellow-500 text-yellow-400'
                              : 'border-red-700 text-red-600'
                          }`}
                        >
                          {volume.status.toUpperCase().replace('-', '_')}
                        </div>
                      </div>
                      <div className="text-[10px] text-red-500 mb-1">
                        {volume.batchCode}
                      </div>
                      <div className="text-[10px] text-red-600">
                        {volume.units} UNITS
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Volumes/Drops Section */}
        <div className="p-8 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            {/* Section header */}
            <div className="mb-12">
              <h2 className="text-3xl font-black font-mono text-white mb-4">
                AVAILABLE_DROPS
              </h2>
              <div className="text-zinc-400 font-mono text-sm">
                Select a drop to explore specific volume collections and products.
              </div>
            </div>

            {/* Volumes grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {Object.entries(emotion?.volumes || {}).map(([volumeId, volume], index) => (
                <motion.div
                  key={volumeId}
                  className="border border-red-900 bg-red-950/10 group hover:border-red-600 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                >
                  {/* Volume header */}
                  <div className="p-8 border-b border-red-900">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-black font-mono text-white mb-2">
                          {volume.title.toUpperCase()}
                        </h3>
                        <div className="text-sm font-mono text-red-400 mb-4">
                          {volume.subtitle}
                        </div>
                      </div>
                      <div
                        className={`px-3 py-1 text-xs font-mono border ${
                          volume.status === 'available'
                            ? 'border-red-500 text-red-400 bg-red-500/10'
                            : volume.status === 'coming-soon'
                            ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10'
                            : 'border-red-700 text-red-600 bg-red-700/10'
                        }`}
                      >
                        {volume.status.toUpperCase().replace('-', '_')}
                      </div>
                    </div>

                    <div className="text-zinc-300 leading-relaxed mb-6">
                      {volume.story?.description || volume.subtitle}
                    </div>

                    {/* Volume specs */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-red-900">
                          <span className="text-xs font-mono text-red-500">BATCH</span>
                          <span className="text-xs font-mono text-white">{volume.batchCode}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-red-900">
                          <span className="text-xs font-mono text-red-500">UNITS</span>
                          <span className="text-xs font-mono text-white">{volume.units}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-red-900">
                          <span className="text-xs font-mono text-red-500">RELEASE</span>
                          <span className="text-xs font-mono text-white">{volume.timestamp.split('T')[0]}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-red-900">
                          <span className="text-xs font-mono text-red-500">ITEMS</span>
                          <span className="text-xs font-mono text-white">{volume.products?.length || '0'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <Link
                      href={`/collections/${emotion.id}/${volumeId}`}
                      className={`block w-full py-4 px-6 font-mono font-bold text-sm tracking-wider transition-all text-center ${
                        volume.status === 'available'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'border border-red-800 text-red-400 hover:border-red-600'
                      }`}
                    >
                      {volume.status === 'available' ? 'EXPLORE_DROP' : 'NOTIFY_WHEN_AVAILABLE'}
                    </Link>
                  </div>

                  {/* Volume preview */}
                  <div className="p-8">
                    <div className="aspect-[16/9] bg-red-900 border border-red-800 flex items-center justify-center mb-4">
                      <div className="text-center">
                        <div className="text-4xl font-black text-red-400 mb-4 font-mono">
                          {emotion?.name?.charAt(0)}
                        </div>
                        <div className="text-sm text-red-600 font-mono">
                          VOLUME_PREVIEW
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-red-500 text-center">
                      {volume.story?.title || volume.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* All Products Section */}
            <div className="border-t border-red-800 pt-16">
              <div className="mb-8">
                <h2 className="text-2xl font-black font-mono text-white mb-4">
                  ALL_PRODUCTS
                </h2>
                <div className="text-zinc-400 font-mono text-sm">
                  Browse all items from this collection across all volumes.
                </div>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((productEdge, index) => {
                    const product = productEdge.node;
                    return (
                      <motion.div
                        key={product.id}
                        className="border border-red-900 bg-red-950/10 group hover:border-red-600 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.05 }}
                      >
                        <div className="aspect-[4/5] bg-red-900 border-b border-red-900">
                          {product.featuredImage?.url ? (
                            <img
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-black text-red-400 mb-2 font-mono">R</div>
                                <div className="text-xs text-red-600 font-mono">ITEM</div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-6">
                          <h3 className="font-black font-mono text-white mb-2 text-lg">
                            {product.title.toUpperCase()}
                          </h3>
                          <div className="text-lg font-mono text-white mb-6">
                            {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                          </div>
                          <Link
                            href={`/products/${product.handle}`}
                            className="block w-full bg-red-600 text-white py-3 px-6 font-mono font-bold text-sm tracking-wider hover:bg-red-700 transition-colors text-center"
                          >
                            VIEW_ITEM
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((productEdge, index) => {
                    const product = productEdge.node;
                    return (
                      <motion.div
                        key={product.id}
                        className="border border-red-900 bg-red-950/10 p-6 hover:border-red-600 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8 + index * 0.02 }}
                      >
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-12 md:col-span-3">
                            <div className="aspect-[4/5] bg-red-900 border border-red-800">
                              {product.featuredImage?.url ? (
                                <img
                                  src={product.featuredImage.url}
                                  alt={product.featuredImage.altText || product.title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="text-center">
                                    <div className="text-2xl font-black text-red-400 mb-2 font-mono">R</div>
                                    <div className="text-xs text-red-600 font-mono">ITEM</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-9">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-black font-mono text-white mb-2">
                                  {product.title.toUpperCase()}
                                </h3>
                              </div>
                              <div className="text-xl font-mono text-white">
                                {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                              </div>
                            </div>

                            <div className="text-sm text-zinc-300 leading-relaxed mb-6">
                              {product.description || "High-intensity streetwear piece from the Rage collection. Engineered for maximum impact and unstoppable momentum."}
                            </div>

                            <Link
                              href={`/products/${product.handle}`}
                              className="bg-red-600 text-white py-3 px-6 font-mono font-bold text-sm tracking-wider hover:bg-red-700 transition-colors"
                            >
                              VIEW_DETAILS
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function VolumeStory({ emotion, volumeId, collection }) {
  const volume = emotion?.volumes?.[volumeId];
  const [isLoaded, setIsLoaded] = useState(false);
  const [accessLevel, setAccessLevel] = useState(0);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 600);
    setTimeout(() => setAccessLevel(1), 1000);
    setTimeout(() => setAccessLevel(2), 1400);
    setTimeout(() => setAccessLevel(3), 1800);
  }, []);

  if (!volume) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black font-mono text-white mb-4">
            VOLUME_NOT_FOUND
          </h1>
          <p className="text-zinc-400 font-mono">
            This drop is not available or access restricted.
          </p>
          <Link href={`/collections/${emotion?.id}`} className="inline-block mt-6 border border-zinc-800 text-white py-3 px-6 font-mono hover:border-white transition-colors">
            RETURN_TO_COLLECTION
          </Link>
        </div>
      </div>
    );
  }

  const products = collection?.products?.edges || [];
  const volumeProducts = products.filter(productEdge =>
    volume.products?.some(productHandle =>
      productEdge.node.handle === productHandle
    )
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Authentication header */}
      <motion.div
        className="border-b border-zinc-900 p-6"
        style={{
          backgroundColor: emotion ? `${emotion.colors.primary}15` : 'transparent',
          borderColor: emotion ? `${emotion.colors.primary}40` : '#27272a'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
        transition={{ delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center font-mono text-xs">
          <div className="flex items-center gap-4">
            <Terminal className="w-4 h-4" style={{ color: emotion?.colors?.accent }} />
            <span className="text-white">VOLUME_DATABASE</span>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`w-1 h-1 transition-colors duration-300`}
                  style={{
                    backgroundColor: accessLevel >= level
                      ? (emotion?.colors?.accent || '#ffffff')
                      : '#27272a'
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ color: emotion?.colors?.accent }}>
            {volume.status.toUpperCase()}
          </div>
        </div>
      </motion.div>

      {/* Volume content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: accessLevel >= 2 ? 1 : 0, y: accessLevel >= 2 ? 0 : 20 }}
              transition={{ delay: 0.7 }}
            >
              {/* Back to collection */}
              <div className="mb-6">
                <Link
                  href={`/collections/${emotion?.id}`}
                  className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span>BACK_TO_{emotion?.name?.toUpperCase()}</span>
                </Link>
              </div>

              {/* Volume header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-3 py-1 text-[10px] font-mono border border-zinc-800 text-zinc-400">
                    {volume.batchCode}
                  </div>
                  <div className="text-xs font-mono text-zinc-600">
                    {volume.timestamp}
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 font-mono leading-tight">
                  {volume.story?.title || volume.title.toUpperCase()}
                </h1>

                <div className="text-lg text-zinc-300 mb-8 leading-relaxed">
                  {volume.story?.description || volume.subtitle}
                </div>

                <div
                  className="w-12 h-px mb-8"
                  style={{ backgroundColor: emotion?.colors?.accent || '#71717a' }}
                />
              </div>

              {/* Story content */}
              {volume.story?.chapters?.map((chapter, index) => (
                <div key={chapter.id} className="mb-12">
                  <h3 className="text-2xl font-black font-mono text-white mb-4">
                    {chapter.title}
                  </h3>
                  <div className="text-zinc-400 leading-relaxed mb-8">
                    {chapter.content}
                  </div>
                </div>
              ))}

              {/* Volume products - Enhanced display matching homepage quality */}
              {volumeProducts.length > 0 && (
                <div className="space-y-8">
                  <div className="font-mono text-xs text-zinc-400 mb-6">
                    AVAILABLE_ITEMS • {volume.units} UNITS • LABORATORY_GRADE
                  </div>

                  {/* Enhanced products grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-zinc-900">
                    {volumeProducts.map((productEdge, index) => {
                      const product = productEdge.node;
                      return (
                        <motion.div
                          key={product.id}
                          className="border border-zinc-900 bg-black group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          {/* Product image with overlays */}
                          <div className="aspect-[4/5] relative border-b border-zinc-900">
                            {product.featuredImage?.url ? (
                              <img
                                src={product.featuredImage.url}
                                alt={product.featuredImage.altText || product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-zinc-950 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-4xl font-black text-zinc-700 mb-2 font-mono">
                                    {emotion?.name?.charAt(0) || 'T'}
                                  </div>
                                  <div className="text-xs text-zinc-600 font-mono">TEXTILE</div>
                                </div>
                              </div>
                            )}

                            {/* Size range overlay */}
                            <div className="absolute top-4 left-4">
                              <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                                {product.variants?.edges?.length > 1 ? 'MULTI-SIZE' : 'ONE SIZE'}
                              </div>
                            </div>

                            {/* Batch code overlay */}
                            <div className="absolute top-4 right-4">
                              <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-white">
                                {volume.batchCode?.slice(-7) || 'BATCH-01'}
                              </div>
                            </div>

                            {/* Stock status indicator */}
                            <div className="absolute bottom-4 right-4">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 animate-pulse" />
                                <div className="text-[10px] font-mono text-green-400">LIVE</div>
                              </div>
                            </div>

                            {/* Emotion classification */}
                            <div className="absolute bottom-4 left-4">
                              <div className="px-2 py-1 text-[10px] font-mono bg-black/90 border border-zinc-700 text-zinc-300">
                                {emotion?.contraband?.classification || 'CLASS-A'}
                              </div>
                            </div>
                          </div>

                          {/* Product details */}
                          <div className="p-6">
                            {/* Header */}
                            <div className="mb-4">
                              <h4 className="font-black font-mono text-white mb-1 text-sm leading-tight">
                                {product.title.toUpperCase()}
                              </h4>
                              <div className="text-xs text-zinc-500 font-mono">
                                {emotion?.name?.toUpperCase() || 'UNKNOWN'}_COLLECTION • VOL.{volume.batchCode?.slice(-1) || '1'}
                              </div>
                            </div>

                            {/* Contraband specs */}
                            <div className="space-y-2 mb-6">
                              <div className="flex justify-between py-1 border-b border-zinc-900">
                                <span className="text-xs font-mono text-zinc-500">PRICE</span>
                                <span className="text-xs font-mono text-white">
                                  {formatMoney(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                                </span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-zinc-900">
                                <span className="text-xs font-mono text-zinc-500">POTENCY</span>
                                <span className="text-xs font-mono text-white">
                                  {emotion?.contraband?.purity || '99.7%'}
                                </span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-zinc-900">
                                <span className="text-xs font-mono text-zinc-500">MATERIAL</span>
                                <span className="text-xs font-mono text-white">100% COTTON</span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-zinc-900">
                                <span className="text-xs font-mono text-zinc-500">STATUS</span>
                                <span className="text-xs font-mono text-green-400">AVAILABLE</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2">
                              <Link
                                href={`/products/${product.handle}`}
                                className="block w-full bg-white text-black py-3 px-4 font-mono font-bold text-xs tracking-wider hover:bg-zinc-100 transition-colors text-center group-hover:bg-yellow-400"
                                data-cursor="ACQUIRE"
                              >
                                ACQUIRE_ITEM
                              </Link>
                              <button className="w-full border border-zinc-800 text-white py-2 px-4 font-mono text-xs hover:border-white transition-colors">
                                MOLECULAR_ANALYSIS
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4" style={{ backgroundColor: `${emotion?.colors?.primary}05` }}>
            <div className="p-8 lg:p-16">
              <div className="space-y-8">
                {/* Volume info */}
                <div>
                  <div className="font-mono text-xs mb-4" style={{ color: emotion?.colors?.accent }}>
                    VOLUME_SPECS
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-500">BATCH</span>
                      <span className="text-xs font-mono text-white">{volume.batchCode}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-500">UNITS</span>
                      <span className="text-xs font-mono text-white">{volume.units}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-500">STATUS</span>
                      <span className="text-xs font-mono text-white">{volume.status.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="text-xs font-mono text-zinc-500">ITEMS</span>
                      <span className="text-xs font-mono text-white">{volumeProducts.length}</span>
                    </div>
                  </div>
                </div>

                {/* Back to collection */}
                <div className="pt-8 border-t border-zinc-800">
                  <Link
                    href={`/collections/${emotion?.id}`}
                    className="flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    VIEW_ALL_VOLUMES
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollectionPage({ collection, emotionId, volumeId }) {
  const emotion = getEmotion(emotionId);

  if (!collection) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black font-mono text-white mb-4">
            ACCESS_DENIED
          </h1>
          <p className="text-zinc-400 font-mono">
            Collection not found or access restricted.
          </p>
          <Link href="/collections" className="inline-block mt-6 border border-zinc-800 text-white py-3 px-6 font-mono hover:border-white transition-colors">
            RETURN_TO_DATABASE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {volumeId
            ? `${emotion?.volumes?.[volumeId]?.title} - ${emotion?.name} - Alívio`
            : `${collection.title} - Alívio Streetwear`
          }
        </title>
        <meta name="description" content={
          volumeId
            ? emotion?.volumes?.[volumeId]?.story?.description
            : collection.description || `Explore the ${collection.title} collection from Alívio.`
        } />
      </Head>

      <Navbar />

      <main className="pt-20">
        {volumeId ? (
          <VolumeStory emotion={emotion} volumeId={volumeId} collection={collection} />
        ) : emotionId === 'euphoria' ? (
          <EuphoriaCollection collection={collection} emotion={emotion} />
        ) : emotionId === 'rage' ? (
          <RageCollection collection={collection} emotion={emotion} />
        ) : (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-black font-mono text-white mb-4">
                COLLECTION_UNAVAILABLE
              </h1>
              <p className="text-zinc-400 font-mono">
                This collection is not currently active.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  // Generate paths for our main collections and volumes
  const paths = [
    { params: { slug: ['euphoria'] } },
    { params: { slug: ['rage'] } },
    // Volume paths
    { params: { slug: ['euphoria', 'vol-1'] } },
    { params: { slug: ['euphoria', 'vol-2'] } },
    { params: { slug: ['rage', 'vol-1'] } },
    { params: { slug: ['rage', 'vol-2'] } }
  ];

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const [emotionId, volumeId] = params.slug; // destructure collection and volume

  try {
    const { data } = await client.request(COLLECTION_QUERY, {
      variables: { handle: emotionId }
    });

    if (!data.collection) {
      return {
        notFound: true
      };
    }

    // If volumeId is provided, verify it exists
    if (volumeId) {
      const emotion = getEmotion(emotionId);
      if (!emotion?.volumes?.[volumeId]) {
        return {
          notFound: true
        };
      }
    }

    return {
      props: {
        collection: data.collection,
        emotionId,
        volumeId: volumeId || null
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    return {
      notFound: true
    };
  }
}