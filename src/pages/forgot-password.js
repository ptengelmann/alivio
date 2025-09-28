import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Terminal, Square, Shield, Mail, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ForgotPasswordPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <>
      <Head>
        <title>Reset Password | Alívio | Security Recovery Terminal</title>
        <meta name="description" content="Security recovery terminal for contraband supplier accounts. Reset your access credentials through encrypted recovery protocols." />
        <meta property="og:title" content="Reset Password | Alívio | Security Recovery" />
        <meta property="og:description" content="Encrypted password recovery terminal for emotional contraband network access." />
        <link rel="canonical" href="https://alivio.uk/forgot-password" />
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
              <span className="text-white">RECOVERY_TERMINAL</span>
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

            {/* Left column - Recovery form */}
            <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 border-r border-zinc-900">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>RETURN_TO_LOGIN</span>
                </Link>

                <div className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400">
                  <Square className="w-2 h-2 fill-current" />
                  <span>CREDENTIAL_RECOVERY</span>
                </div>

                {!isSubmitted ? (
                  <>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 font-mono leading-[0.9]">
                      RESET<br />ACCESS<br />CODES
                    </h1>

                    <div className="text-lg text-zinc-300 mb-12 max-w-lg">
                      Enter your registered email address to receive encrypted
                      recovery instructions for your contraband supplier account.
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Email */}
                      <div>
                        <label className="block font-mono text-xs text-zinc-400 mb-3">REGISTERED_EMAIL</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ENTER_EMAIL_ADDRESS"
                          className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      {/* Submit */}
                      <div className="space-y-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isLoading ? 'SENDING_RECOVERY...' : 'SEND_RECOVERY_CODES'}
                        </button>

                        <div className="text-center">
                          <span className="text-zinc-500 font-mono text-xs">REMEMBER_CREDENTIALS? </span>
                          <Link
                            href="/login"
                            className="text-white hover:text-zinc-300 transition-colors font-mono text-xs font-bold"
                          >
                            RETURN_TO_LOGIN
                          </Link>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-8 font-mono leading-[0.9]">
                      RECOVERY<br />INITIATED
                    </h1>

                    <div className="text-lg text-zinc-300 mb-12 max-w-lg">
                      Encrypted recovery instructions have been transmitted to your registered
                      communication address. Check your secure inbox for further instructions.
                    </div>

                    <div className="space-y-4">
                      <Link
                        href="/login"
                        className="block w-full text-center bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                      >
                        RETURN_TO_LOGIN
                      </Link>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setEmail('');
                        }}
                        className="block w-full text-center border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                      >
                        SEND_AGAIN
                      </button>
                    </div>
                  </>
                )}
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
                <div className="font-mono text-xs text-zinc-400 mb-6">RECOVERY_PROTOCOLS</div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-8 font-mono leading-[0.9]">
                  SECURE<br />RECOVERY<br />SYSTEM
                </h2>

                <div className="space-y-6 mb-12">
                  {[
                    {
                      icon: Mail,
                      title: "ENCRYPTED_DELIVERY",
                      description: "Recovery codes sent via secure encrypted channels only"
                    },
                    {
                      icon: Shield,
                      title: "IDENTITY_VERIFICATION",
                      description: "Multiple security checks before credential reset"
                    },
                    {
                      icon: Terminal,
                      title: "TIME_LIMITED",
                      description: "Recovery codes expire after 15 minutes for maximum security"
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

                {/* Recovery info */}
                <div className="border-t border-zinc-800 pt-6">
                  <div className="font-mono text-xs text-zinc-400 mb-4">RECOVERY_STATUS</div>
                  <div className="space-y-2">
                    {[
                      { label: "SESSION_ID", value: sessionId },
                      { label: "ENCRYPTION", value: "AES-256" },
                      { label: "DELIVERY_TIME", value: "2-5 MIN" },
                      { label: "EXPIRY_TIME", value: "15 MIN" }
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
          <div className="w-2 h-2 bg-orange-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}