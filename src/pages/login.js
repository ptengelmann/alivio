import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Terminal, Square, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { login, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/account');
      return;
    }

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
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        router.push('/account');
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <>
      <Head>
        <title>Login | Alívio | Secure Access Terminal</title>
        <meta name="description" content="Secure access terminal for authorized personnel. Login to your contraband supplier account for order tracking, profile management, and classified operations." />
        <meta property="og:title" content="Login | Alívio | Secure Access" />
        <meta property="og:description" content="Authorized personnel access terminal for emotional contraband operations." />
        <link rel="canonical" href="https://alivio.uk/login" />
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
              <span className="text-white">LOGIN_TERMINAL</span>
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
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-0">

            {/* Left column - Login form */}
            <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 border-r border-zinc-900">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                  <Square className="w-2 h-2 fill-current" />
                  <span>AUTHORIZED_ACCESS</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 font-mono leading-[0.9]">
                  LOGIN<br />TERMINAL
                </h1>

                <div className="text-lg text-zinc-300 mb-12 max-w-lg">
                  Access your contraband supplier account. Monitor orders,
                  manage profile, and track classified shipments.
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-3">EMAIL_ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ENTER_EMAIL_ADDRESS"
                      className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-3">SECURITY_PASSPHRASE</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="ENTER_PASSPHRASE"
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex justify-between items-center text-xs">
                    <label className="flex items-center gap-2 text-zinc-400">
                      <input type="checkbox" className="w-3 h-3" />
                      <span className="font-mono">REMEMBER_SESSION</span>
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-zinc-400 hover:text-white transition-colors font-mono"
                    >
                      FORGOT_PASSPHRASE?
                    </Link>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-500 text-white p-4 font-mono text-xs">
                      ERROR: {error}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'AUTHENTICATING...' : 'INITIATE_LOGIN'}
                    </button>

                    <div className="text-center">
                      <span className="text-zinc-500 font-mono text-xs">NO_ACCOUNT? </span>
                      <Link
                        href="/register"
                        className="text-white hover:text-zinc-300 transition-colors font-mono text-xs font-bold"
                      >
                        CREATE_ACCOUNT
                      </Link>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right column - Security info */}
            <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 bg-zinc-950">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="font-mono text-xs text-zinc-400 mb-6">SECURITY_PROTOCOLS</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-8 font-mono leading-[0.9]">
                  SECURE<br />ACCESS<br />TERMINAL
                </h2>

                <div className="space-y-6 mb-12">
                  {[
                    {
                      icon: Lock,
                      title: "ENCRYPTED_SESSIONS",
                      description: "Military-grade encryption for all user sessions and data transmission"
                    },
                    {
                      icon: UserCheck,
                      title: "IDENTITY_VERIFICATION",
                      description: "Multi-factor authentication for enhanced account security"
                    },
                    {
                      icon: Terminal,
                      title: "SECURE_TRACKING",
                      description: "Real-time order monitoring with classified shipping updates"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="border border-zinc-800 p-4 bg-black"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <feature.icon className="w-5 h-5 text-white mb-3" />
                      <div className="font-mono text-xs text-white font-bold mb-2">{feature.title}</div>
                      <div className="text-xs text-zinc-400">{feature.description}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Session info */}
                <div className="border-t border-zinc-800 pt-6">
                  <div className="font-mono text-xs text-zinc-400 mb-4">SESSION_DETAILS</div>
                  <div className="space-y-2">
                    {[
                      { label: "SESSION_ID", value: sessionId },
                      { label: "ENCRYPTION", value: "AES-256" },
                      { label: "SECURITY_LEVEL", value: "MAXIMUM" },
                      { label: "ACCESS_TYPE", value: "CUSTOMER" }
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
        </div>

        {/* Accent element */}
        <motion.div
          className="fixed bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-green-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}