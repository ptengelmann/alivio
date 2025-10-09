import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getAllEmotions } from '../lib/emotions';
import { Terminal, Square, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const allEmotions = getAllEmotions();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Access request:', email);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#FAF8F5] border-t border-zinc-200">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-16 lg:py-24">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">

          {/* Brand info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-zinc-900" />
              <div className="flex flex-col">
                <div className="font-black text-sm text-zinc-900 leading-none mb-0.5">ALIVIO</div>
                <div className="text-[9px] text-zinc-800 tracking-[0.2em] leading-none uppercase">Emotional_Contraband</div>
              </div>
            </div>

            <div className="text-xs text-zinc-700 leading-relaxed mb-6 font-light tracking-wide">
              Laboratory-grade streetwear. Two core emotions. Limited batch production.
            </div>

            <div className="space-y-2 text-[10px] tracking-wider text-zinc-800 uppercase">
              <div className="flex justify-between py-1">
                <span>Status</span>
                <span className="text-green-500/70">Operational</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Collections</span>
                <span className="text-zinc-900">{allEmotions.length.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">Collections</div>

            <div className="space-y-3">
              {allEmotions.map((emotion) => (
                <Link
                  key={emotion.id}
                  href={`/collections/${emotion.id}`}
                  className="block text-xs text-zinc-700 hover:text-zinc-900 transition-colors uppercase tracking-wide"
                  data-cursor="COLLECTION"
                >
                  {emotion.name}
                </Link>
              ))}

              <Link
                href="/collections"
                className="block text-xs text-zinc-700 hover:text-zinc-900 transition-colors pt-3 border-t border-zinc-200 uppercase tracking-wide"
                data-cursor="VIEW"
              >
                Shop All →
              </Link>
            </div>
          </div>

          {/* Brand Links */}
          <div>
            <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">Information</div>

            <div className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'Terms', href: '/terms' },
                { label: 'Privacy', href: '/privacy' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-zinc-700 hover:text-zinc-900 transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="text-[9px] tracking-[0.3em] text-zinc-800 mb-6 uppercase">Newsletter</div>

            <div className="text-xs text-zinc-700 mb-6 leading-relaxed font-light tracking-wide">
              New batch notifications and exclusive access.
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border border-zinc-300 py-3 px-4 text-xs text-zinc-900 placeholder-zinc-600 focus:border-white/50 focus:outline-none transition-colors tracking-wide"
                required
              />

              <button
                type="submit"
                className="w-full bg-zinc-900 text-white py-3 px-4 text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors font-medium"
                data-cursor="SUBMIT"
              >
                Subscribe
              </button>
            </form>

            <div className="flex gap-6">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Twitter', href: '#' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-[10px] text-zinc-700 hover:text-zinc-900 transition-colors uppercase tracking-wider"
                  data-cursor="SOCIAL"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] text-zinc-800 tracking-wider">
            <div className="uppercase">
              © {currentYear} Alívio. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <span className="uppercase tracking-[0.3em]">Batch_Authentication_System</span>
              <div className="w-1 h-1 bg-green-500/50 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}