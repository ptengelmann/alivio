import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Terminal, Square, Package, User, Settings, LogOut, Eye, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AccountPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data - replace with real authentication
  const [user] = useState({
    firstName: 'Agent',
    lastName: 'X',
    email: 'agent.x@encrypted.secure',
    joinDate: '2024-01-15',
    totalOrders: 7,
    memberLevel: 'CLASSIFIED'
  });

  // Mock orders data - replace with Shopify Customer API
  const [orders] = useState([
    {
      id: 'ORDER-2024-003',
      date: '2024-09-20',
      status: 'DELIVERED',
      total: '£145.00',
      items: [
        { name: 'Euphoria Tee Vol.1: Surge', quantity: 1, price: '£45.00' },
        { name: 'Rage Trouser Vol.1', quantity: 1, price: '£85.00' },
        { name: 'Shipping', quantity: 1, price: '£15.00' }
      ],
      tracking: 'ALV-2024-789123',
      shippingAddress: '[REDACTED] Safe House, London, UK'
    },
    {
      id: 'ORDER-2024-002',
      date: '2024-09-05',
      status: 'IN_TRANSIT',
      total: '£70.00',
      items: [
        { name: 'Euphoria Cap Vol.1: Control', quantity: 2, price: '£50.00' },
        { name: 'Express Shipping', quantity: 1, price: '£20.00' }
      ],
      tracking: 'ALV-2024-456789',
      shippingAddress: '[CLASSIFIED] Drop Point Alpha'
    },
    {
      id: 'ORDER-2024-001',
      date: '2024-08-28',
      status: 'PROCESSING',
      total: '£185.00',
      items: [
        { name: 'Limited Edition Package', quantity: 1, price: '£170.00' },
        { name: 'Secure Packaging', quantity: 1, price: '£15.00' }
      ],
      tracking: 'ALV-2024-123456',
      shippingAddress: 'Underground Facility, Coordinates: [ENCRYPTED]'
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'DELIVERED': return 'text-green-400';
      case 'IN_TRANSIT': return 'text-blue-400';
      case 'PROCESSING': return 'text-yellow-400';
      default: return 'text-zinc-400';
    }
  };

  return (
    <>
      <Head>
        <title>Account Dashboard | Alívio | Secure Operations Center</title>
        <meta name="description" content="Secure account operations center. Monitor orders, manage profile, track contraband shipments, and access classified intelligence." />
        <meta property="og:title" content="Account Dashboard | Alívio" />
        <meta property="og:description" content="Secure account operations center for emotional contraband management." />
        <link rel="canonical" href="https://alivio.uk/account" />
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
              <span className="text-white">ACCOUNT_TERMINAL</span>
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
          <div className="grid grid-cols-12">

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-3 border-r border-zinc-900 bg-zinc-950">
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  {/* User info */}
                  <div className="mb-8 p-4 border border-zinc-800 bg-black">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-white" />
                      <div>
                        <div className="font-mono text-sm text-white font-bold">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="font-mono text-xs text-zinc-400">
                          LEVEL: {user.memberLevel}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono">
                      SESSION: {sessionId}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="space-y-2">
                    {[
                      { id: 'dashboard', label: 'OVERVIEW', icon: Terminal },
                      { id: 'orders', label: 'ORDER_HISTORY', icon: Package },
                      { id: 'profile', label: 'PROFILE_SETTINGS', icon: Settings },
                      { id: 'logout', label: 'LOGOUT', icon: LogOut }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => item.id === 'logout' ? console.log('Logout') : setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 p-3 font-mono text-xs text-left transition-colors ${
                          activeTab === item.id
                            ? 'bg-black text-white border border-white'
                            : 'bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Main content area */}
            <div className="col-span-12 lg:col-span-9 p-8 lg:p-16">

              {/* Dashboard Overview */}
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                    <Square className="w-2 h-2 fill-current" />
                    <span>OPERATIONS_OVERVIEW</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white mb-12 font-mono leading-[0.9]">
                    ACCOUNT<br />DASHBOARD
                  </h1>

                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                      { label: 'TOTAL_ORDERS', value: user.totalOrders.toString().padStart(2, '0'), icon: Package },
                      { label: 'MEMBER_SINCE', value: '2024', icon: Clock },
                      { label: 'SECURITY_LEVEL', value: user.memberLevel, icon: Terminal }
                    ].map((stat) => (
                      <div key={stat.label} className="border border-zinc-800 p-6 bg-black">
                        <stat.icon className="w-6 h-6 text-white mb-4" />
                        <div className="font-mono text-xs text-zinc-400 mb-2">{stat.label}</div>
                        <div className="font-mono text-2xl text-white font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders */}
                  <div className="border border-zinc-800 p-6 bg-black">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-mono text-lg text-white font-bold">RECENT_OPERATIONS</h2>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="font-mono text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        VIEW_ALL →
                      </button>
                    </div>

                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="border border-zinc-900 p-4 bg-zinc-950">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-mono text-sm text-white">{order.id}</div>
                            <div className={`font-mono text-xs font-bold ${getStatusColor(order.status)}`}>
                              {order.status}
                            </div>
                          </div>
                          <div className="font-mono text-xs text-zinc-400 mb-2">{order.date}</div>
                          <div className="font-mono text-sm text-white">{order.total}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                    <Square className="w-2 h-2 fill-current" />
                    <span>ORDER_INTELLIGENCE</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white mb-12 font-mono leading-[0.9]">
                    ORDER<br />HISTORY
                  </h1>

                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-zinc-800 p-6 bg-black">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Order info */}
                          <div>
                            <div className="font-mono text-lg text-white font-bold mb-2">{order.id}</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-zinc-400">DATE:</span>
                                <span className="text-white">{order.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-zinc-400">STATUS:</span>
                                <span className={getStatusColor(order.status)}>{order.status}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-zinc-400">TOTAL:</span>
                                <span className="text-white">{order.total}</span>
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <div className="font-mono text-xs text-zinc-400 mb-3">ITEMS</div>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-xs">
                                  <span className="text-white">{item.name} x{item.quantity}</span>
                                  <span className="text-zinc-400">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tracking */}
                          <div>
                            <div className="font-mono text-xs text-zinc-400 mb-3">TRACKING</div>
                            <div className="space-y-2 text-xs">
                              <div className="flex items-center gap-2">
                                <Eye className="w-3 h-3 text-white" />
                                <span className="text-white">{order.tracking}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <MapPin className="w-3 h-3 text-white mt-0.5" />
                                <span className="text-zinc-400">{order.shippingAddress}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                    <Square className="w-2 h-2 fill-current" />
                    <span>PROFILE_MANAGEMENT</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-white mb-12 font-mono leading-[0.9]">
                    PROFILE<br />SETTINGS
                  </h1>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal info */}
                    <div className="border border-zinc-800 p-6 bg-black">
                      <h2 className="font-mono text-lg text-white font-bold mb-6">PERSONAL_DATA</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">FIRST_NAME</label>
                          <input
                            type="text"
                            defaultValue={user.firstName}
                            className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-white focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">LAST_NAME</label>
                          <input
                            type="text"
                            defaultValue={user.lastName}
                            className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-white focus:border-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-xs text-zinc-400 mb-2">EMAIL_ADDRESS</label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full bg-zinc-950 border border-zinc-800 p-3 font-mono text-sm text-white focus:border-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security settings */}
                    <div className="border border-zinc-800 p-6 bg-black">
                      <h2 className="font-mono text-lg text-white font-bold mb-6">SECURITY_PROTOCOLS</h2>
                      <div className="space-y-4">
                        <button className="w-full bg-white text-black py-3 px-4 font-mono text-sm font-bold hover:bg-zinc-100 transition-colors">
                          CHANGE_PASSPHRASE
                        </button>
                        <button className="w-full border border-zinc-800 text-white py-3 px-4 font-mono text-sm hover:border-white transition-colors">
                          ENABLE_2FA
                        </button>
                        <button className="w-full border border-red-800 text-red-400 py-3 px-4 font-mono text-sm hover:border-red-400 transition-colors">
                          DELETE_ACCOUNT
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
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
    </>
  );
}