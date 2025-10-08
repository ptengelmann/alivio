import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');

  const { register, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/account');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        router.push('/account');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Create Account | Alívio - Emotional Contraband</title>
        <meta name="description" content="Create an Alívio account. Access exclusive features, track orders, and join the community." />
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
              <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                Create_Account
              </div>
              <h1 className="text-4xl lg:text-5xl font-light text-zinc-900 tracking-tight mb-8 leading-tight">
                Register
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                      First_Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                      Last_Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
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
                  <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                    Confirm_Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-0.5 accent-white"
                    required
                  />
                  <label className="text-xs text-zinc-500 tracking-wide">
                    I accept the{' '}
                    <Link href="/terms" className="text-zinc-900 hover:text-zinc-300 transition-colors">
                      terms and conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-zinc-900 hover:text-zinc-300 transition-colors">
                      privacy policy
                    </Link>
                  </label>
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
                    {loading ? 'Creating account...' : 'Create Account'}
                  </button>

                  <div className="text-center">
                    <span className="text-zinc-500 text-xs tracking-wide">Already have an account? </span>
                    <Link
                      href="/login"
                      className="text-zinc-900 hover:text-zinc-300 transition-colors text-xs tracking-wide"
                    >
                      Login
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
