import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Terminal, Square, Lock, Eye, EyeOff, UserPlus, Shield, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
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
        <title>Register | Alívio | Account Creation Terminal</title>
        <meta name="description" content="Create new contraband supplier account. Join the underground network for exclusive access to emotional streetwear and classified operations." />
        <meta property="og:title" content="Register | Alívio | Account Creation" />
        <meta property="og:description" content="Join the emotional contraband network with secure account creation." />
        <link rel="canonical" href="https://alivio.uk/register" />
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
              <span className="text-white">REGISTRATION_TERMINAL</span>
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
          <div className="w-full max-w-6xl mx-auto grid grid-cols-12 gap-0">

            {/* Left column - Registration form */}
            <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                  <Square className="w-2 h-2 fill-current" />
                  <span>NETWORK_REGISTRATION</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 font-mono leading-[0.9]">
                  CREATE<br />ACCOUNT
                </h1>

                <div className="text-lg text-zinc-300 mb-12 max-w-2xl">
                  Join the underground emotional contraband network. Gain access to exclusive drops,
                  order tracking, and classified supplier intelligence.
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">FIRST_NAME</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="ENTER_FIRST_NAME"
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">LAST_NAME</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="ENTER_LAST_NAME"
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Confirm Password */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">CONFIRM_PASSPHRASE</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="CONFIRM_PASSPHRASE"
                          className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms acceptance */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      className="w-4 h-4 mt-1"
                      required
                    />
                    <div className="text-xs text-zinc-400 font-mono">
                      I accept the{' '}
                      <Link href="/terms" className="text-white hover:text-zinc-300 underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-white hover:text-zinc-300 underline">
                        Privacy Policy
                      </Link>{' '}
                      for underground contraband operations
                    </div>
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
                      disabled={loading || !formData.acceptTerms}
                      className="w-full bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'CREATING_ACCOUNT...' : 'CREATE_ACCOUNT'}
                    </button>

                    <div className="text-center">
                      <span className="text-zinc-500 font-mono text-xs">ALREADY_HAVE_ACCOUNT? </span>
                      <Link
                        href="/login"
                        className="text-white hover:text-zinc-300 transition-colors font-mono text-xs font-bold"
                      >
                        LOGIN_HERE
                      </Link>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Right column - Security & Benefits */}
            <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="font-mono text-xs text-zinc-400 mb-6">MEMBER_BENEFITS</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-8 font-mono leading-[0.9]">
                  ACCESS<br />BENEFITS
                </h2>

                <div className="space-y-6 mb-12">
                  {[
                    {
                      icon: UserPlus,
                      title: "EXCLUSIVE_ACCESS",
                      description: "Early access to new drops and limited edition contraband releases"
                    },
                    {
                      icon: Clock,
                      title: "ORDER_TRACKING",
                      description: "Real-time tracking of all contraband shipments and delivery updates"
                    },
                    {
                      icon: Shield,
                      title: "SECURE_PROFILE",
                      description: "Encrypted profile management with secure payment and address storage"
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      className="border border-zinc-800 p-4 bg-black"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <benefit.icon className="w-5 h-5 text-white mb-3" />
                      <div className="font-mono text-xs text-white font-bold mb-2">{benefit.title}</div>
                      <div className="text-xs text-zinc-400">{benefit.description}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Registration requirements */}
                <div className="border-t border-zinc-800 pt-6">
                  <div className="font-mono text-xs text-zinc-400 mb-4">REQUIREMENTS</div>
                  <div className="space-y-2 text-xs text-zinc-500 font-mono">
                    <div>• VALID_EMAIL: Required</div>
                    <div>• SECURE_PASSWORD: 8+ characters</div>
                    <div>• TERMS_ACCEPTANCE: Mandatory</div>
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
          <div className="w-2 h-2 bg-blue-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}