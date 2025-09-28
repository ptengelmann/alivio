import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Terminal, Square, Mail, MessageSquare, MapPin, Clock, Shield, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [systemTime, setSystemTime] = useState('');
  const [accessLevel, setAccessLevel] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <>
      <Head>
        <title>Contact | Alívio | Secure Communication Channel</title>
        <meta name="description" content="Secure communication channel for emotional contraband inquiries. Contact our underground facility for product information, custom orders, and classified intelligence." />
        <meta property="og:title" content="Contact | Alívio | Secure Communication" />
        <meta property="og:description" content="Encrypted communication channel for emotional contraband facility inquiries and orders." />
        <link rel="canonical" href="https://alivio.uk/contact" />
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
              <span className="text-white">SECURE_COMMUNICATION</span>
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
                  <span>ENCRYPTED_CHANNEL</span>
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 font-mono leading-[0.9]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  CONTACT<br />FACILITY
                </motion.h1>

                <motion.div
                  className="space-y-6 text-lg text-zinc-300 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p>
                    Secure communication channel established. All transmissions encrypted
                    and monitored by facility security protocols.
                  </p>
                  <p>
                    For product inquiries, custom orders, or classified intelligence,
                    use the encrypted form below.
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
                  <div className="font-mono text-xs text-zinc-400 mb-4">COMMUNICATION_STATUS</div>
                  <div className="space-y-3">
                    {[
                      { label: "ENCRYPTION_LEVEL", value: "MAXIMUM" },
                      { label: "RESPONSE_TIME", value: "24-48H" },
                      { label: "SECURITY_STATUS", value: "ACTIVE" },
                      { label: "SESSION_ID", value: sessionId }
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

          {/* Contact Form */}
          <section className="border-b border-zinc-900">
            <div className="grid grid-cols-12">
              <div className="col-span-12 lg:col-span-8 p-8 lg:p-16 border-r border-zinc-900">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="font-mono text-xs text-zinc-400 mb-6">TRANSMISSION_FORM</div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                    SEND<br />ENCRYPTED<br />MESSAGE
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">INQUIRY_TYPE</label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white focus:border-white focus:outline-none transition-colors"
                      >
                        <option value="general">GENERAL_INQUIRY</option>
                        <option value="product">PRODUCT_INFORMATION</option>
                        <option value="custom">CUSTOM_ORDER</option>
                        <option value="wholesale">WHOLESALE_DISTRIBUTION</option>
                        <option value="press">PRESS_INTELLIGENCE</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block font-mono text-xs text-zinc-400 mb-3">IDENTIFICATION</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="ENTER_NAME"
                          className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block font-mono text-xs text-zinc-400 mb-3">COMMUNICATION_ADDRESS</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="ENTER_EMAIL"
                          className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">TRANSMISSION_SUBJECT</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="ENTER_SUBJECT"
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-3">CLASSIFIED_MESSAGE</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="ENTER_ENCRYPTED_MESSAGE"
                        rows={8}
                        className="w-full bg-black border border-zinc-800 p-4 font-mono text-sm text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        type="submit"
                        className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                      >
                        TRANSMIT_MESSAGE
                      </button>
                      <button
                        type="reset"
                        onClick={() => setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' })}
                        className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                      >
                        CLEAR_FORM
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>

              <div className="col-span-12 lg:col-span-4 p-8 lg:p-16 bg-zinc-950">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="font-mono text-xs text-zinc-400 mb-6">SECURITY_PROTOCOLS</div>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Shield,
                        title: "ENCRYPTED",
                        description: "All communications encrypted with military-grade protocols"
                      },
                      {
                        icon: Zap,
                        title: "FAST_RESPONSE",
                        description: "24-48 hour response time for all inquiries"
                      },
                      {
                        icon: Mail,
                        title: "SECURE_DELIVERY",
                        description: "Messages delivered through secure channels only"
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
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-b border-zinc-900">
            <div className="p-8 lg:p-16">
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="font-mono text-xs text-zinc-400 mb-6">FACILITY_INTELLIGENCE</div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                  CLASSIFIED<br />COORDINATES
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {[
                  {
                    icon: MapPin,
                    title: "LOCATION",
                    info: ["Underground Facility", "United Kingdom", "[COORDINATES_CLASSIFIED]"]
                  },
                  {
                    icon: Clock,
                    title: "OPERATING_HOURS",
                    info: ["24/7 Monitoring", "Response: 24-48H", "Emergency: Immediate"]
                  },
                  {
                    icon: MessageSquare,
                    title: "CHANNELS",
                    info: ["Secure Form", "Encrypted Email", "Emergency Protocol"]
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    className="border border-zinc-900 p-8 bg-black group hover:bg-zinc-950 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <contact.icon className="w-6 h-6 text-white mb-4" />
                    <div className="font-mono text-sm text-white mb-4 font-bold">{contact.title}</div>
                    <div className="space-y-2">
                      {contact.info.map((line, idx) => (
                        <div key={idx} className="text-sm text-zinc-400">{line}</div>
                      ))}
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
              <div className="font-mono text-xs text-zinc-400 mb-6">ALTERNATIVE_ACCESS</div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 font-mono leading-[0.9]">
                EXPLORE<br />THE FACILITY
              </h2>
              <div className="text-lg text-zinc-300 mb-12 max-w-2xl mx-auto">
                While your transmission is being processed, explore our emotional contraband collections
                and learn more about our underground operations.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/collections"
                  className="bg-white text-black py-4 px-8 font-mono font-bold text-sm tracking-wider hover:bg-zinc-100 transition-colors"
                >
                  BROWSE_INVENTORY
                </Link>
                <Link
                  href="/about"
                  className="border border-zinc-800 text-white py-4 px-8 font-mono font-bold text-sm tracking-wider hover:border-white transition-colors"
                >
                  FACILITY_INTEL
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
          <div className="w-2 h-2 bg-red-500 animate-pulse" />
        </motion.div>
      </div>

      <Footer />
    </>
  );
}