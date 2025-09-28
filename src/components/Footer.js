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
    <footer className="bg-black border-t border-zinc-900">
      <div className="max-w-full">
        {/* Main footer content */}
        <div className="grid grid-cols-12">

          {/* Network info */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-8 lg:p-16 border-r border-zinc-900 border-b md:border-b-0">
            <div className="flex items-center gap-2 mb-6">
              <Square className="w-3 h-3 fill-current text-white" />
              <div className="font-black text-lg font-mono text-white">ALÍVIO</div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="font-mono text-xs text-zinc-400">STREETWEAR_BRAND</div>
              <div className="text-sm text-zinc-300 leading-relaxed max-w-xs">
                Premium streetwear collections infused with authentic emotional compounds through limited drops.
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="font-mono text-xs text-zinc-500">STATUS</span>
                <span className="font-mono text-xs text-white">OPERATIONAL</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-900">
                <span className="font-mono text-xs text-zinc-500">COLLECTIONS</span>
                <span className="font-mono text-xs text-white">{allEmotions.length.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-mono text-xs text-zinc-500">SECURITY</span>
                <span className="font-mono text-xs text-white">SSL-ENCRYPTED</span>
              </div>
            </div>
          </div>

          {/* Collection access */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-8 lg:p-16 border-r border-zinc-900 border-b lg:border-b-0">
            <div className="font-mono text-xs text-zinc-400 mb-6">COLLECTION_ACCESS</div>

            <div className="space-y-2">
              {allEmotions.slice(0, 6).map((emotion) => (
                <Link
                  key={emotion.id}
                  href={`/collections/${emotion.id}`}
                  className="block py-2 border-b border-zinc-900 group"
                  data-cursor="COLLECTION"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs text-zinc-300 group-hover:text-white transition-colors">
                        {emotion.name.toUpperCase()}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-600">
                        STREETWEAR • LIMITED
                      </div>
                    </div>
                    <div
                      className="w-1 h-1"
                      style={{ backgroundColor: emotion.colors?.accent || '#71717a' }}
                    />
                  </div>
                </Link>
              ))}

              <Link
                href="/collections"
                className="block py-2 font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                data-cursor="VIEW"
              >
                SHOP_ALL_COLLECTIONS →
              </Link>
            </div>
          </div>

          {/* Brand access */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-8 lg:p-16 border-r border-zinc-900 border-b md:border-b-0">
            <div className="font-mono text-xs text-zinc-400 mb-6">BRAND_LINKS</div>

            <div className="space-y-4">
              {[
                { label: 'Brand Story', href: '/about', cursor: 'INFO' },
                { label: 'Size Guide', href: '/size-guide', cursor: 'GUIDE' },
                { label: 'Contact Us', href: '/contact', cursor: 'CONTACT' },
                { label: 'Store Locator', href: '/stores', cursor: 'LOCATE' },
                { label: 'Lookbook', href: '/lookbook', cursor: 'LOOK' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-xs text-zinc-500 hover:text-white transition-colors py-1"
                  data-cursor={link.cursor}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 p-8 lg:p-16 border-b lg:border-b-0">
            <div className="font-mono text-xs text-zinc-400 mb-6">NEWSLETTER_SIGNUP</div>

            <div className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Get notified about new drops and exclusive releases.
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER_EMAIL_ADDRESS"
                  className="w-full bg-zinc-950 border border-zinc-800 py-3 px-4 font-mono text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 px-4 font-mono font-bold text-xs tracking-wider hover:bg-zinc-100 transition-colors"
                data-cursor="SUBMIT"
              >
                SUBSCRIBE
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-900">
              <div className="font-mono text-xs text-zinc-400 mb-2">SOCIAL_MEDIA</div>
              <div className="flex gap-4">
                {[
                  { label: 'INSTAGRAM', href: '#', cursor: 'SOCIAL' },
                  { label: 'TWITTER', href: '#', cursor: 'SOCIAL' },
                  { label: 'TIKTOK', href: '#', cursor: 'SOCIAL' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="font-mono text-xs text-zinc-500 hover:text-white transition-colors"
                    data-cursor={social.cursor}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900 bg-zinc-950">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-8 p-6 border-r border-zinc-900">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="font-mono text-xs text-zinc-500">
                  © {currentYear} ALÍVIO DISTRIBUTION NETWORK
                </div>
                <div className="flex gap-6">
                  {[
                    { label: 'Terms', href: '/terms' },
                    { label: 'Privacy', href: '/privacy' },
                    { label: 'Security', href: '/security' }
                  ].map((legal) => (
                    <Link
                      key={legal.href}
                      href={legal.href}
                      className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
                      data-cursor="LEGAL"
                    >
                      {legal.label.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 p-6">
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs text-zinc-600">
                  CLASSIFICATION: PREMIUM
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-zinc-600" />
                  <div className="w-1 h-1 bg-zinc-600 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}