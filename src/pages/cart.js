import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { ShoppingBag, Minus, Plus, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Euphoria Essential Hoodie',
      variant: 'L / Black',
      price: 89.99,
      quantity: 1,
      image: '/api/placeholder/300/400',
      sku: 'EUR-HOD-BLK-L'
    },
    {
      id: 2,
      title: 'Rage Combat Pants',
      variant: 'M / Tactical Black',
      price: 129.99,
      quantity: 2,
      image: '/api/placeholder/300/400',
      sku: 'RAG-PNT-TBL-M'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15.99;
  const total = subtotal + shipping;

  return (
    <>
      <Head>
        <title>Cart | Alívio - Emotional Contraband</title>
        <meta name="description" content="Review your cart and proceed to checkout." />
      </Head>

      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20">
        {cartItems.length === 0 ? (
          // Empty cart
          <div className="min-h-[80vh] flex items-center justify-center">
            <motion.div
              className="text-center max-w-lg px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ShoppingBag className="w-12 h-12 text-zinc-800 mx-auto mb-8" />
              <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 mb-6 tracking-tight">
                Your cart is empty
              </h1>
              <p className="text-sm text-zinc-700 mb-10 tracking-wide font-light">
                Browse our collections to find pieces that speak to your emotional state.
              </p>
              <Link
                href="/collections"
                className="inline-flex bg-zinc-900 text-white py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        ) : (
          // Cart with items
          <div className="py-12 lg:py-16">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Left - Cart items */}
                <div className="lg:col-span-8">
                  <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">
                    Shopping_Cart
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-12">
                    Your Cart
                  </h1>

                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="border border-zinc-300 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <div className="flex gap-6">
                          {/* Product image */}
                          <div className="w-24 h-32 bg-zinc-900/20 flex-shrink-0">
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-zinc-800 text-[10px] uppercase tracking-wider">
                                Image
                              </div>
                            </div>
                          </div>

                          {/* Product details */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm text-zinc-900 font-light tracking-wide uppercase">
                                  {item.title}
                                </h3>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-1 text-zinc-800 hover:text-zinc-900 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="text-[10px] text-zinc-800 mb-1 uppercase tracking-wider">
                                {item.variant}
                              </div>
                              <div className="text-[10px] text-zinc-800 uppercase tracking-wider">
                                SKU: {item.sku}
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-zinc-300">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-2 hover:bg-zinc-900/50 transition-colors"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <div className="px-4 py-2 text-xs text-zinc-900 min-w-[50px] text-center">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-2 hover:bg-zinc-900/50 transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="text-sm text-zinc-900 tracking-wide">
                                  £{(item.price * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-[10px] text-zinc-800 tracking-wider">
                                    £{item.price.toFixed(2)} each
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right - Order summary */}
                <div className="lg:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="border border-zinc-300 p-8 sticky top-24"
                  >
                    <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">
                      Order_Summary
                    </div>

                    {/* Order details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between py-3 border-b border-zinc-300">
                        <span className="text-[10px] text-zinc-800 uppercase tracking-wider">Subtotal</span>
                        <span className="text-sm text-zinc-900 tracking-wide">£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-zinc-300">
                        <span className="text-[10px] text-zinc-800 uppercase tracking-wider">Shipping</span>
                        <span className="text-sm text-zinc-900 tracking-wide">
                          {shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      {shipping === 0 && (
                        <div className="text-[10px] text-green-500/70 uppercase tracking-wider">
                          Free shipping activated
                        </div>
                      )}
                      <div className="flex justify-between py-4 border-t border-zinc-300">
                        <span className="text-xs text-zinc-900 uppercase tracking-wider">Total</span>
                        <span className="text-lg text-zinc-900 tracking-wide">£{total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout button */}
                    <div className="space-y-4">
                      <button className="w-full bg-zinc-900 text-white py-4 px-6 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300">
                        Checkout
                      </button>
                      <Link
                        href="/collections"
                        className="block w-full text-center border border-zinc-300 text-zinc-900 py-4 px-6 text-[10px] uppercase tracking-[0.2em] font-light hover:border-zinc-500 transition-all duration-300"
                      >
                        Continue Shopping
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
