import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Terminal, Square, User, LogOut } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-zinc-800' : 'bg-black'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-12 border-b border-zinc-900">
          {/* Left section - Logo and system info */}
          <div className="col-span-6 lg:col-span-4 flex items-center p-4 border-r border-zinc-900">
            <Link href="/" className="flex items-center gap-3" data-cursor="HOME">
              <Square className="w-4 h-4 fill-current text-white" />
              <div>
                <div className="font-black text-lg font-mono text-white">ALÍVIO</div>
                <div className="text-xs font-mono text-zinc-500">STREETWEAR_BRAND</div>
              </div>
            </Link>
          </div>

          {/* Center section - Main navigation */}
          <div className="hidden lg:flex lg:col-span-6 items-center border-r border-zinc-900">
            <div className="flex w-full">
              {[
                { href: '/collections', label: 'COLLECTIONS', cursor: 'BROWSE' },
                { href: '/about', label: 'BRAND', cursor: 'INFO' },
                { href: '/contact', label: 'CONTACT', cursor: 'CONTACT' },
                { href: isAuthenticated ? '/account' : '/login', label: 'ACCOUNT', cursor: isAuthenticated ? 'ACCOUNT' : 'LOGIN' }
              ].map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-1 py-4 px-6 font-mono text-xs text-center border-r border-zinc-900 last:border-r-0 transition-colors ${
                    isActivePage(item.href)
                      ? 'text-white bg-zinc-950'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-950'
                  }`}
                  data-cursor={item.cursor}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="col-span-6 lg:col-span-2 flex items-center justify-end p-4">
            <div className="flex items-center gap-4">
              {/* Account / Logout */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/account"
                    className="p-2 border border-zinc-800 hover:border-white transition-colors"
                    data-cursor="ACCOUNT"
                  >
                    <User className="w-4 h-4 text-white" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 border border-zinc-800 hover:border-red-500 hover:text-red-500 transition-colors"
                    data-cursor="LOGOUT"
                  >
                    <LogOut className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2 border border-zinc-800 hover:border-white transition-colors"
                  data-cursor="LOGIN"
                >
                  <User className="w-4 h-4 text-white" />
                </Link>
              )}

              {/* Diagnostic */}
              <button
                onClick={() => openDiagnostic('nav')}
                className="p-2 border border-zinc-800 hover:border-white transition-colors"
                data-cursor="SCAN"
              >
                <Terminal className="w-4 h-4 text-white" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 border border-zinc-800 hover:border-white transition-colors"
                data-cursor="CART"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs font-mono font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 border border-zinc-800 hover:border-white transition-colors"
                data-cursor="MENU"
              >
                {isMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black border-b border-zinc-900 overflow-hidden"
            >
              <div className="grid grid-cols-1">
                {/* Main links */}
                {(isAuthenticated ? [
                  { href: '/collections', label: 'CLOTHING_COLLECTIONS' },
                  { href: '/about', label: 'BRAND_INFO' },
                  { href: '/contact', label: 'CONTACT_US' },
                  { href: '/account', label: 'MY_ACCOUNT' }
                ] : [
                  { href: '/collections', label: 'CLOTHING_COLLECTIONS' },
                  { href: '/about', label: 'BRAND_INFO' },
                  { href: '/contact', label: 'CONTACT_US' },
                  { href: '/login', label: 'LOGIN_ACCOUNT' },
                  { href: '/register', label: 'CREATE_ACCOUNT' }
                ]).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-4 px-6 border-b border-zinc-900 font-mono text-sm transition-colors ${
                      isActivePage(item.href)
                        ? 'text-white bg-zinc-950'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-950'
                    }`}
                    data-cursor="NAV"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Collections grid */}
                <div className="p-6 border-b border-zinc-900">
                  <div className="font-mono text-xs text-zinc-400 mb-4">AVAILABLE_COLLECTIONS</div>
                  <div className="grid grid-cols-2 gap-2">
                    {allEmotions.slice(0, 6).map((emotion) => (
                      <Link
                        key={emotion.id}
                        href={`/collections/${emotion.id}`}
                        className="p-3 border border-zinc-800 hover:border-zinc-600 transition-colors"
                        data-cursor="COLLECTION"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-mono text-xs text-white">{emotion.name.toUpperCase()}</div>
                            <div className="font-mono text-[10px] text-zinc-500">
                              STREETWEAR • LIMITED
                            </div>
                          </div>
                          <div
                            className="w-2 h-2"
                            style={{ backgroundColor: emotion.colors?.accent || '#71717a' }}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Brand status */}
                <div className="p-6 bg-zinc-950">
                  <div className="font-mono text-xs text-zinc-400 mb-4">{isAuthenticated ? 'USER_STATUS' : 'BRAND_STATUS'}</div>
                  <div className="space-y-2">
                    {isAuthenticated ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-zinc-500">USER</span>
                          <span className="font-mono text-xs text-white">{user?.firstName || 'OPERATIVE'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-zinc-500">ACCESS</span>
                          <span className="font-mono text-xs text-white">{user?.accessLevel || 'CLASSIFIED'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-zinc-500">ORDERS</span>
                          <span className="font-mono text-xs text-white">{user?.orders?.length || 0}</span>
                        </div>
                        <button
                          onClick={logout}
                          className="w-full mt-4 border border-red-500 text-red-500 py-2 px-4 font-mono text-xs hover:bg-red-500 hover:text-white transition-colors"
                        >
                          LOGOUT_SYSTEM
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-zinc-500">STORE</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-white">ONLINE</span>
                            <div className="w-1 h-1 bg-white animate-pulse" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-zinc-500">COLLECTIONS</span>
                          <span className="font-mono text-xs text-white">{allEmotions.length}</span>
                        </div>
                      </>
                    )}
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