import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Terminal, User, LogOut } from 'lucide-react';
import { getAllEmotions } from '../lib/emotions';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import EmotionDiagnostic from './EmotionDiagnostic';
import useDiagnostic from '../hooks/useDiagnostic';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { isOpen: isDiagnosticOpen, openDiagnostic, closeDiagnostic } = useDiagnostic();
  const { isAuthenticated, user, logout } = useAuth();
  const { getItemCount } = useCart();

  const allEmotions = getAllEmotions();
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  const isActivePage = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-zinc-900/50'
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="max-w-[1600px] mx-auto">
          <div className={`flex items-center justify-between h-20 px-8 lg:px-12 transition-all duration-700 ${
            !isScrolled ? 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]' : ''
          }`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" data-cursor="HOME">
              {/* White Square Logo */}
              <div className="w-8 h-8 bg-white group-hover:opacity-80 transition-opacity duration-300" />

              {/* Logo Text */}
              <div className="flex flex-col">
                <div className="font-black text-sm font-mono text-white leading-none mb-0.5 tracking-tight">
                  ALIVIO
                </div>
                <div className={`text-[9px] font-mono transition-colors duration-300 leading-none tracking-[0.2em] uppercase ${
                  isScrolled ? 'text-zinc-600' : 'text-white/50'
                }`}>
                  Emotional_Contraband
                </div>
              </div>
            </Link>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-12">
              {[
                { href: '/collections', label: 'Collections' },
                { href: '/blog', label: 'Journal' },
                { href: '/about', label: 'Brand' },
                { href: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] font-light transition-all duration-300 relative group ${
                    isActivePage(item.href)
                      ? 'text-white'
                      : isScrolled
                        ? 'text-zinc-500 hover:text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                  data-cursor={`VIEW_${item.label.toUpperCase()}`}
                >
                  {item.label}
                  {/* Active indicator */}
                  {isActivePage(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Account */}
              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/account"
                    className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                      isScrolled
                        ? 'border-zinc-700/30 hover:border-zinc-500'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                    data-cursor="ACCOUNT"
                  >
                    <User className="w-3.5 h-3.5 text-white" />
                  </Link>
                  <button
                    onClick={logout}
                    className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                      isScrolled
                        ? 'border-zinc-700/30 hover:border-red-500/50'
                        : 'border-white/10 hover:border-red-500/50'
                    }`}
                    data-cursor="LOGOUT"
                  >
                    <LogOut className="w-3.5 h-3.5 text-white hover:text-red-400 transition-colors" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:flex w-9 h-9 items-center justify-center border transition-all duration-300 ${
                    isScrolled
                      ? 'border-zinc-700/30 hover:border-zinc-500'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  data-cursor="LOGIN"
                >
                  <User className="w-3.5 h-3.5 text-white" />
                </Link>
              )}

              {/* Diagnostic */}
              <button
                onClick={() => openDiagnostic('nav')}
                className={`hidden sm:flex w-9 h-9 items-center justify-center border transition-all duration-300 ${
                  isScrolled
                    ? 'border-zinc-700/30 hover:border-zinc-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
                data-cursor="SCAN"
              >
                <Terminal className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className={`relative w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                  isScrolled
                    ? 'border-zinc-700/30 hover:border-zinc-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
                data-cursor="CART"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[9px] font-mono font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                  isScrolled
                    ? 'border-zinc-700/30 hover:border-zinc-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
                data-cursor="MENU"
              >
                {isMenuOpen ? (
                  <X className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Menu className="w-3.5 h-3.5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="lg:hidden bg-[#0a0a0f]/98 backdrop-blur-md border-t border-zinc-900/50 overflow-hidden"
            >
              <div className="max-w-[1600px] mx-auto">
                {/* Main Navigation */}
                <div className="border-b border-zinc-900/50">
                  {[
                    { href: '/collections', label: 'Collections' },
                    { href: '/blog', label: 'Journal' },
                    { href: '/about', label: 'Brand' },
                    { href: '/contact', label: 'Contact' },
                    { href: isAuthenticated ? '/account' : '/login', label: isAuthenticated ? 'Account' : 'Login' }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block py-5 px-8 border-b border-zinc-900/50 font-mono text-[10px] uppercase tracking-[0.2em] font-light transition-all duration-300 ${
                        isActivePage(item.href)
                          ? 'text-white bg-zinc-900/30'
                          : 'text-zinc-500 hover:text-white hover:bg-zinc-900/20'
                      }`}
                      data-cursor="NAV"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                {/* Quick Collections */}
                <div className="p-8 border-b border-zinc-900/50">
                  <div className="font-mono text-[9px] text-zinc-600 mb-6 uppercase tracking-[0.3em]">
                    Quick_Access
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {allEmotions.slice(0, 4).map((emotion) => (
                      <Link
                        key={emotion.id}
                        href={`/collections/${emotion.id}`}
                        className="p-4 border border-zinc-700/30 hover:border-zinc-600/50 transition-all duration-300 group"
                        data-cursor="COLLECTION"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-mono text-[10px] text-white font-light group-hover:opacity-70 transition-opacity uppercase tracking-wide">
                            {emotion.name.toUpperCase()}
                          </div>
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: emotion.colors?.accent || '#71717a' }}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="p-8 flex items-center gap-3 sm:hidden">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/account"
                        className="flex-1 border border-zinc-700/30 hover:border-zinc-500 text-white py-3.5 px-4 font-mono text-[10px] text-center uppercase tracking-[0.2em] font-light transition-all duration-300"
                        data-cursor="ACCOUNT"
                      >
                        Account
                      </Link>
                      <button
                        onClick={logout}
                        className="flex-1 border border-zinc-700/30 hover:border-red-500/50 text-white hover:text-red-400 py-3.5 px-4 font-mono text-[10px] uppercase tracking-[0.2em] font-light transition-all duration-300"
                        data-cursor="LOGOUT"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex-1 border border-zinc-700/30 hover:border-zinc-500 text-white py-3.5 px-4 font-mono text-[10px] text-center uppercase tracking-[0.2em] font-light transition-all duration-300"
                      data-cursor="LOGIN"
                    >
                      Login
                    </Link>
                  )}
                  <button
                    onClick={() => openDiagnostic('nav')}
                    className="w-12 h-12 border border-zinc-700/30 hover:border-zinc-500 flex items-center justify-center transition-all duration-300"
                    data-cursor="SCAN"
                  >
                    <Terminal className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Status Bar */}
                <div className="p-8 bg-zinc-950/50">
                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-600 uppercase tracking-[0.3em]">
                    <div>System_Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500/70 rounded-full animate-pulse" />
                      <span className="text-green-500/70">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Diagnostic Modal */}
      <EmotionDiagnostic
        isOpen={isDiagnosticOpen}
        onClose={closeDiagnostic}
        source="navbar"
      />
    </>
  );
}
