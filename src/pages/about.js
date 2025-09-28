import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Terminal, Square, Lock, Zap, Shield, Target } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');

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

  return (
    <>
      <Head>
        <title>About | Alívio | Emotional Contraband Manufacturing</title>
        <meta name="description" content="Underground emotional contraband manufacturing. Restricted intelligence on our streetwear laboratory operations, quality protocols, and contraband distribution network." />
        <meta property="og:title" content="About | Alívio | Emotional Contraband" />
        <meta property="og:description" content="Classified intelligence on emotional contraband manufacturing and streetwear laboratory operations." />
        <link rel="canonical" href="https://alivio.uk/about" />
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
              <span className="text-white">ABOUT_DATABASE</span>
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
          {/* Hero Section */}
          <section className="border-b border-zinc-900">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
                <motion.div
                  className="flex items-center gap-2 text-xs mb-8 font-mono text-zinc-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Square className="w-2 h-2 fill-current" />
                  <span>CLASSIFIED_INTELLIGENCE</span>
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.9]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  ABOUT<br />ALÍVIO
                </motion.h1>

                <motion.div
                  className="space-y-6 text-lg text-zinc-300 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p>
                    Underground emotional contraband manufacturing facility. Operating since [REDACTED].
                    Specialized in premium streetwear infused with authentic emotional compounds.
                  </p>
                  <p>
                    Each garment undergoes rigorous laboratory testing and quality verification.
                    Limited production runs ensure maximum potency and exclusivity.
                  </p>
                </motion.div>
              </div>

              <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="font-mono text-xs text-zinc-400 mb-4">FACILITY_STATUS</div>
                  <div className="space-y-3">
                    {[
                      { label: "OPERATIONAL_SINCE", value: "[CLASSIFIED]" },
                      { label: "SECURITY_LEVEL", value: "MAXIMUM" },
                      { label: "QUALITY_GRADE", value: "A+" },
                      { label: "MANUFACTURING", value: "ACTIVE" }
                    ].map((stat) => (
                      <div key={stat.label} className="flex justify-between py-2 border-b border-zinc-800">
                        <span className="text-xs font-mono text-zinc-500">{stat.label}</span>
                        <span className="text-xs font-mono text-white">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="border-b border-zinc-900">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-6 p-8 lg:p-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="font-mono text-xs text-zinc-400 mb-6">MISSION_PROTOCOL</div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                    EMOTIONAL<br />LIBERATION
                  </h2>
                  <div className="space-y-4 text-zinc-300">
                    <p>
                      Revolutionary streetwear designed to liberate suppressed emotions.
                      Each piece manufactured with precision-engineered emotional compounds.
                    </p>
                    <p>
                      Our underground laboratory operates beyond conventional fashion boundaries,
                      creating garments that serve as vessels for authentic emotional expression.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="col-span-12 lg:col-span-6 p-8 lg:p-16 border-l border-zinc-900">
                <motion.div
                  className="grid grid-cols-2 gap-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {[
                    { icon: Lock, label: "SECURITY", value: "CLASSIFIED" },
                    { icon: Zap, label: "POTENCY", value: "MAXIMUM" },
                    { icon: Shield, label: "QUALITY", value: "VERIFIED" },
                    { icon: Target, label: "PRECISION", value: "100%" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="border border-zinc-800 p-6 bg-black"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <item.icon className="w-6 h-6 text-white mb-4" />
                      <div className="font-mono text-xs text-zinc-400 mb-2">{item.label}</div>
                      <div className="font-mono text-sm text-white font-bold">{item.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Manufacturing Process */}
          <section className="border-b border-zinc-900">
            <div className="p-8 lg:p-16">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="font-mono text-xs text-zinc-400 mb-6">MANUFACTURING_PROTOCOL</div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                  LABORATORY<br />PROCESS
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  {
                    step: "01",
                    title: "EMOTIONAL_EXTRACTION",
                    description: "Raw emotional compounds are carefully extracted and purified in our underground laboratory facilities.",
                    status: "ACTIVE"
                  },
                  {
                    step: "02",
                    title: "TEXTILE_INFUSION",
                    description: "Premium cotton fibers are infused with concentrated emotional compounds using proprietary manufacturing techniques.",
                    status: "VERIFIED"
                  },
                  {
                    step: "03",
                    title: "QUALITY_CONTROL",
                    description: "Each garment undergoes rigorous testing to ensure maximum potency and authentic emotional delivery.",
                    status: "CERTIFIED"
                  }
                ].map((process, index) => (
                  <motion.div
                    key={process.step}
                    className="border border-zinc-900 p-8 bg-black group hover:bg-zinc-950 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="font-mono text-2xl font-black text-white mb-4">{process.step}</div>
                    <div className="font-mono text-sm text-white mb-4 font-bold">{process.title}</div>
                    <div className="text-sm text-zinc-400 mb-6 leading-relaxed">{process.description}</div>
                    <div className="font-mono text-xs text-zinc-500 border-t border-zinc-800 pt-4">
                      STATUS: {process.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="p-8 lg:p-16">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="font-mono text-xs text-zinc-400 mb-6">ACCESS_GRANTED</div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                READY TO ACCESS<br />THE COLLECTION?
              </h2>
              <div className="text-lg text-zinc-300 mb-12 max-w-2xl mx-auto">
                Browse our current inventory of emotional contraband streetwear.
                Limited quantities available.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/collections"
                  className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                >
                  BROWSE_COLLECTIONS
                </Link>
                <Link
                  href="/contact"
                  className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                >
                  CONTACT_FACILITY
                </Link>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Accent element */}
        <motion.div
          className="fixed bottom-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2 }}
        >
          <div className="w-2 h-2 bg-indigo-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}