import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Terminal, Square, ShoppingBag, Minus, Plus, X, Lock, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    setSessionId(Math.random().toString(36).substr(2, 8).toUpperCase());
    updateTime();
    const interval = setInterval(updateTime, 1000);

    setTimeout(() => setAccessLevel(1), 500);
    setTimeout(() => setAccessLevel(2), 1000);
    setTimeout(() => setAccessLevel(3), 1500);

    return () => clearInterval(interval);
  }, []);

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
        <title>Cart | Alívio | Contraband Acquisition Terminal</title>
        <meta name="description" content="Secure contraband acquisition terminal. Review selected emotional streetwear items and proceed to encrypted checkout for classified delivery." />
        <meta property="og:title" content="Cart | Alívio | Contraband Acquisition" />
        <meta property="og:description" content="Secure acquisition terminal for emotional contraband review and checkout." />
        <link rel="canonical" href="https://alivio.uk/cart" />
      </Head>

      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />

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

        {/* Authentication header */}
        <motion.div
          className="border-b border-zinc-900 p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-full flex justify-between items-center font-mono text-xs">
            <div className="flex items-center gap-4">
              <Terminal className="w-3 h-3" />
              <span className="text-white">ACQUISITION_TERMINAL</span>
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
          {cartItems.length === 0 ? (
            // Empty cart
            <div className="min-h-screen flex items-center justify-center">
              <motion.div
                className="text-center max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ShoppingBag className="w-16 h-16 text-zinc-600 mx-auto mb-8" />
                <h1 className="text-4xl font-black text-white mb-4 font-mono">
                  EMPTY<br />ACQUISITION<br />TERMINAL
                </h1>
                <p className="text-zinc-400 mb-8">
                  No contraband selected for acquisition. Browse available inventory to begin classified operations.
                </p>
                <Link
                  href="/collections"
                  className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                >
                  BROWSE_INVENTORY
                </Link>
              </motion.div>
            </div>
          ) : (
            // Cart with items
            <div className="grid grid-cols-12">
              {/* Left column - Cart items */}
              <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                    <Square className="w-2 h-2 fill-current" />
                    <span>SELECTED_CONTRABAND</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-12 font-mono leading-[0.9]">
                    ACQUISITION<br />TERMINAL
                  </h1>

                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="border border-zinc-900 bg-zinc-950 p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="grid grid-cols-12 gap-6">
                          {/* Product image */}
                          <div className="col-span-12 md:col-span-3">
                            <div className="aspect-[3/4] bg-zinc-800 border border-zinc-700">
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="text-zinc-600 text-xs font-mono">
                                  [CLASSIFIED_IMAGE]
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Product details */}
                          <div className="col-span-12 md:col-span-9">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-mono text-lg text-white font-bold mb-2">
                                  {item.title}
                                </h3>
                                <div className="font-mono text-xs text-zinc-400 mb-2">
                                  SKU: {item.sku}
                                </div>
                                <div className="font-mono text-sm text-zinc-300">
                                  {item.variant}
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="p-2 border border-zinc-700 hover:border-red-500 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex justify-between items-end">
                              {/* Quantity controls */}
                              <div className="flex items-center gap-3">
                                <div className="font-mono text-xs text-zinc-400 mb-2">QUANTITY</div>
                                <div className="flex items-center border border-zinc-700">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-zinc-800 transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <div className="px-4 py-2 font-mono text-sm text-white min-w-[60px] text-center">
                                    {item.quantity}
                                  </div>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-zinc-800 transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="font-mono text-xs text-zinc-400 mb-1">UNIT_PRICE</div>
                                <div className="font-mono text-lg text-white font-bold">
                                  £{item.price.toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="font-mono text-sm text-zinc-400">
                                    Total: £{(item.price * item.quantity).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right column - Order summary */}
              <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="font-mono text-xs text-zinc-400 mb-6">ORDER_SUMMARY</div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-8 font-mono leading-[0.9]">
                    ACQUISITION<br />TOTAL
                  </h2>

                  {/* Order details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="font-mono text-xs text-zinc-400">SUBTOTAL</span>
                      <span className="font-mono text-sm text-white">£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-zinc-800">
                      <span className="font-mono text-xs text-zinc-400">SHIPPING</span>
                      <span className="font-mono text-sm text-white">
                        {shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    {shipping === 0 && (
                      <div className="font-mono text-xs text-green-400">
                        FREE SHIPPING ACTIVATED (Orders £100+)
                      </div>
                    )}
                    <div className="flex justify-between py-3 border-t border-zinc-700">
                      <span className="font-mono text-sm text-white font-bold">TOTAL</span>
                      <span className="font-mono text-lg text-white font-bold">£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <div className="space-y-4 mb-8">
                    <button className="w-full bg-white text-black py-4 px-6 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors">
                      PROCEED_TO_CHECKOUT
                    </button>
                    <Link
                      href="/collections"
                      className="block w-full text-center border border-zinc-800 text-white py-4 px-6 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                    >
                      CONTINUE_SHOPPING
                    </Link>
                  </div>

                  {/* Security info */}
                  <div className="border-t border-zinc-800 pt-6">
                    <div className="font-mono text-xs text-zinc-400 mb-4">SECURITY_PROTOCOLS</div>
                    <div className="space-y-4">
                      {[
                        {
                          icon: Lock,
                          title: "ENCRYPTED_CHECKOUT",
                          description: "256-bit SSL encryption for all transactions"
                        },
                        {
                          icon: Truck,
                          title: "DISCRETE_SHIPPING",
                          description: "Unmarked packages with tracking"
                        }
                      ].map((feature) => (
                        <div key={feature.title} className="flex items-start gap-3">
                          <feature.icon className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-mono text-xs text-white font-bold mb-1">
                              {feature.title}
                            </div>
                            <div className="text-xs text-zinc-400">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Session info */}
                  <div className="border-t border-zinc-800 pt-6 mt-6">
                    <div className="font-mono text-xs text-zinc-400 mb-4">SESSION_DETAILS</div>
                    <div className="space-y-2">
                      {[
                        { label: "SESSION_ID", value: sessionId },
                        { label: "ITEMS", value: cartItems.length.toString() },
                        { label: "SECURITY", value: "MAXIMUM" }
                      ].map((detail) => (
                        <div key={detail.label} className="flex justify-between py-1 border-b border-zinc-800">
                          <span className="text-xs font-mono text-zinc-500">{detail.label}</span>
                          <span className="text-xs font-mono text-white">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Accent element */}
        <motion.div
          className="fixed bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-yellow-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}