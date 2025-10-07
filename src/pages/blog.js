import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, ArrowRight } from 'lucide-react';

// Mock blog posts - replace with actual data source later
const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Architecture of Emotion',
    slug: 'architecture-of-emotion',
    excerpt: 'Exploring the intersection of feeling and form. How we translate abstract emotional states into wearable contraband.',
    date: '2025-01-15',
    category: 'Philosophy',
    readTime: '8 min',
    image: '/hero.png',
    featured: true
  },
  {
    id: 2,
    title: 'Batch Authentication Protocol',
    slug: 'batch-authentication-protocol',
    excerpt: 'Behind our laboratory-grade production system. Every piece is verified, tracked, and authenticated.',
    date: '2025-01-10',
    category: 'Process',
    readTime: '6 min',
    image: null,
    featured: false
  },
  {
    id: 3,
    title: 'Euphoria Collection: Design Notes',
    slug: 'euphoria-collection-design',
    excerpt: 'The technical and emotional considerations behind our first core emotion. From concept to contraband.',
    date: '2025-01-05',
    category: 'Collections',
    readTime: '10 min',
    image: null,
    featured: false
  },
  {
    id: 4,
    title: 'Limited Production Philosophy',
    slug: 'limited-production-philosophy',
    excerpt: 'Why we manufacture in small batches. Quality, authenticity, and the economics of emotional contraband.',
    date: '2024-12-28',
    category: 'Philosophy',
    readTime: '7 min',
    image: null,
    featured: false
  },
  {
    id: 5,
    title: 'Material Science: Technical Fabrics',
    slug: 'material-science-technical-fabrics',
    excerpt: 'An examination of our fabric selection process. Performance textiles meet emotional expression.',
    date: '2024-12-20',
    category: 'Process',
    readTime: '9 min',
    image: null,
    featured: false
  },
  {
    id: 6,
    title: 'Rage Collection: Development Log',
    slug: 'rage-collection-development',
    excerpt: 'Documenting the creation of our second core emotion. Intensity, power, and controlled chaos.',
    date: '2024-12-15',
    category: 'Collections',
    readTime: '11 min',
    image: null,
    featured: false
  }
];

const CATEGORIES = ['All', 'Philosophy', 'Process', 'Collections'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const featuredPost = BLOG_POSTS.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Head>
        <title>Journal | Alívio - Emotional Contraband</title>
        <meta name="description" content="Thoughts on design, production, and the architecture of emotion." />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#0a0a0f] text-white pt-20">
        {/* Header */}
        <div className="py-16 lg:py-24 border-b border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-6 uppercase">
              Emotional_Database
            </div>
            <h1 className="text-5xl lg:text-6xl font-light text-white tracking-tight mb-6">
              Journal
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed font-light tracking-wide max-w-xl">
              Thoughts on design, production, and the architecture of emotion. Laboratory notes from the Alívio archive.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="sticky top-20 z-40 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-zinc-900/50">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-6">
            <div className="flex items-center gap-3 overflow-x-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 font-light ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'border border-zinc-700/50 text-zinc-500 hover:text-white hover:border-zinc-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {selectedCategory === 'All' && featuredPost && (
          <div className="py-16 lg:py-24 border-b border-zinc-900/50">
            <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
              <div className="text-[9px] tracking-[0.3em] text-zinc-600 mb-10 uppercase">
                Featured
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                  {/* Image */}
                  <div className="aspect-square overflow-hidden flex items-center justify-center">
                    {featuredPost.image ? (
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900/20">
                        <div className="text-6xl font-light text-zinc-800">A</div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="inline-block px-3 py-1.5 text-[8px] tracking-wider backdrop-blur-sm mb-6 border border-zinc-700/30 text-zinc-500 uppercase w-fit">
                      {featuredPost.category}
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-light text-white mb-6 leading-tight tracking-tight group-hover:text-zinc-300 transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    <p className="text-xs text-zinc-400 leading-relaxed font-light tracking-wide mb-8">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-6 text-[10px] text-zinc-600 uppercase tracking-wider mb-8">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <span>{featuredPost.readTime} read</span>
                    </div>

                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white group-hover:gap-3 transition-all duration-300">
                      Read Article
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="py-16 lg:py-24">
          <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
            {regularPosts.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-zinc-600 text-xs uppercase tracking-wider font-light mb-2">
                  No Articles Found
                </div>
                <div className="text-zinc-700 text-[10px] tracking-wide font-light">
                  Try selecting a different category
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 text-[10px] text-zinc-600 uppercase tracking-wider">
                  {regularPosts.length} {regularPosts.length === 1 ? 'Article' : 'Articles'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                  {regularPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.6 }}
                    >
                      <Link href={`/blog/${post.slug}`} className="group block">
                        {/* Image */}
                        <div className="aspect-[4/3] bg-zinc-900/20 overflow-hidden mb-6 relative">
                          {post.image ? (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-5xl font-light text-zinc-800">A</div>
                            </div>
                          )}

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3 px-2.5 py-1 text-[8px] tracking-wider backdrop-blur-sm bg-[#0a0a0f]/80 border border-zinc-700/30 text-zinc-500 uppercase">
                            {post.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div>
                          <h3 className="text-lg font-light text-white mb-3 leading-tight tracking-tight group-hover:text-zinc-300 transition-colors duration-300">
                            {post.title}
                          </h3>

                          <p className="text-xs text-zinc-500 leading-relaxed font-light tracking-wide mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
