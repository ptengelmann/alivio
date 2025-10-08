import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
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
    }
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
        <title>Login | Alívio - Emotional Contraband</title>
        <meta name="description" content="Login to your Alívio account. Track orders, manage your profile, and access exclusive features." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#FAF8F5] text-zinc-900 pt-20 flex items-center">
        <div className="w-full py-12 lg:py-16">
          <div className="max-w-[500px] mx-auto px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">
                Account_Access
              </div>
              <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-8 leading-tight">
                Login
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-[10px] text-zinc-800 mb-3 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10px] text-zinc-800 mb-3 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-800 hover:text-zinc-900 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex justify-between items-center text-xs">
                  <label className="flex items-center gap-2 text-zinc-800 cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 accent-white" />
                    <span className="tracking-wide">Remember me</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-zinc-800 hover:text-zinc-900 transition-colors tracking-wide"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 text-xs tracking-wide">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="space-y-6 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-zinc-900 text-white py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="text-center">
                    <span className="text-zinc-800 text-xs tracking-wide">Don't have an account? </span>
                    <Link
                      href="/register"
                      className="text-zinc-900 hover:text-zinc-300 transition-colors text-xs tracking-wide"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
