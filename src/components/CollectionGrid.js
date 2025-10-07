import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CollectionGrid({ collections = [] }) {
  if (collections.length === 0) {
    return null;
  }

  // Take first 2-4 collections for homepage
  const displayCollections = collections.slice(0, 4);

  return (
    <section className="bg-black border-t border-zinc-900">
      {/* Minimal header */}
      <div className="border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-xs font-mono text-zinc-500 mb-2">SHOP_BY_EMOTION</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono">
            COLLECTIONS
          </h2>
        </div>
      </div>

      {/* Large collection tiles */}
      <div className={`grid grid-cols-1 ${displayCollections.length >= 4 ? 'md:grid-cols-2' : displayCollections.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-0`}>
        {displayCollections.map((collection, index) => {
          const emotion = collection.emotion || collection;
          const heroImage = collection.collection?.products?.edges?.[0]?.node?.featuredImage?.url ||
                           collection.products?.edges?.[0]?.node?.featuredImage?.url;

          return (
            <motion.div
              key={emotion.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/collections/${emotion.id}`}
                className="group block relative aspect-[4/5] md:aspect-square border border-zinc-900 hover:border-white transition-colors overflow-hidden"
              >
                {/* Background image or color */}
                {heroImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${heroImage}')`,
                    }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      backgroundColor: emotion.colors?.primary || '#18181b',
                      opacity: 0.3
                    }}
                  />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Stats - top right */}
                  <div className="absolute top-6 right-6 text-right">
                    <div className="text-xs font-mono text-white/60 mb-1">
                      {collection.productCount || 0} PRODUCTS
                    </div>
                    <div
                      className="w-2 h-2 ml-auto rounded-full"
                      style={{ backgroundColor: emotion.colors?.accent || '#ffffff' }}
                    />
                  </div>

                  {/* Collection info */}
                  <div className="mb-4">
                    <div className="text-xs font-mono text-white/60 mb-3 tracking-wider">
                      {emotion.contraband?.classification || emotion.tagline?.slice(0, 30) || 'COLLECTION'}
                    </div>

                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 font-mono leading-[0.9]">
                      {emotion.name?.toUpperCase()}
                    </h3>

                    <p className="text-sm text-white/80 mb-4 line-clamp-2">
                      {emotion.description?.slice(0, 80) || 'Explore the collection'}
                    </p>
                  </div>

                  {/* CTA button */}
                  <div className="border border-white/40 text-white py-3 px-6 font-mono text-xs font-bold text-center group-hover:bg-white group-hover:text-black transition-all">
                    SHOP_{emotion.name?.toUpperCase()}
                  </div>
                </div>

                {/* Accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: emotion.colors?.accent || '#ffffff' }}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* View all CTA */}
      <div className="border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <Link
            href="/collections"
            className="inline-block border border-zinc-800 text-white py-4 px-12 font-mono font-bold text-sm tracking-wider hover:border-white hover:bg-white hover:text-black transition-all"
          >
            VIEW_ALL_COLLECTIONS
          </Link>
        </div>
      </div>
    </section>
  );
}
