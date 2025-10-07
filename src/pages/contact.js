import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

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
        <title>Contact | Alívio - Emotional Contraband</title>
        <meta name="description" content="Get in touch with Alívio. Product inquiries, custom orders, and general questions." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        {/* Contact Form */}
        <div className="py-12 lg:py-16">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left - Form */}
              <div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                  Get_In_Touch
                </div>
                <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-8 leading-tight">
                  Contact Us
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                      Inquiry_Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-zinc-700/30 py-3 px-4 text-xs text-white focus:border-zinc-500 focus:outline-none transition-all duration-300"
                    >
                      <option value="general">General_Inquiry</option>
                      <option value="product">Product_Information</option>
                      <option value="custom">Custom_Order</option>
                      <option value="wholesale">Wholesale</option>
                      <option value="press">Press</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="w-full bg-transparent border border-zinc-700/30 py-3 px-4 text-xs text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                        required
                      />
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
                        className="w-full bg-transparent border border-zinc-700/30 py-3 px-4 text-xs text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full bg-transparent border border-zinc-700/30 py-3 px-4 text-xs text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] text-zinc-500 mb-3 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      rows={8}
                      className="w-full bg-transparent border border-zinc-700/30 py-3 px-4 text-xs text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="bg-white text-black py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300"
                    >
                      Send Message
                    </button>
                    <button
                      type="reset"
                      onClick={() => setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'general' })}
                      className="border border-zinc-700/30 text-white py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:border-zinc-500 transition-all duration-300"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Right - Info */}
              <div className="space-y-12">
                <div>
                  <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
                    Response_Time
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light tracking-wide">
                    We typically respond within 24-48 hours. For urgent inquiries, please mark your message as high priority in the subject line.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: "Location",
                      info: "London, United Kingdom"
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      info: "hello@alivio.uk"
                    },
                    {
                      icon: MessageSquare,
                      title: "Support",
                      info: "24/7 form monitoring"
                    }
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <contact.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-white mb-2 uppercase tracking-wide font-light">
                            {contact.title}
                          </div>
                          <div className="text-xs text-zinc-500 tracking-wide">
                            {contact.info}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-12 lg:py-16 border-t border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-light text-white mb-8 leading-tight tracking-tight">
                While you wait, explore the collection
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/collections"
                  className="inline-flex bg-white text-black py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:bg-zinc-200 transition-all duration-300"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="inline-flex border border-zinc-700/30 text-white py-4 px-10 text-[10px] uppercase tracking-[0.2em] font-light hover:border-zinc-500 transition-all duration-300"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
