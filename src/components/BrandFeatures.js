import { motion } from 'framer-motion';
import { Shield, Package, Zap, Lock } from 'lucide-react';

export default function BrandFeatures() {
  const features = [
    {
      icon: Shield,
      label: 'AUTHENTICATED',
      value: '99.7% PURITY',
      description: 'Each garment batch-verified and quality-tested'
    },
    {
      icon: Package,
      label: 'LIMITED_BATCHES',
      value: 'RESTRICTED',
      description: 'Small-run production. Once sold out, archived'
    },
    {
      icon: Zap,
      label: 'FAST_SHIPPING',
      value: '2-4 DAYS UK',
      description: 'Secure dispatch with tracking authentication'
    },
    {
      icon: Lock,
      label: 'SECURE_PAYMENT',
      value: 'ENCRYPTED',
      description: 'Military-grade checkout security protocols'
    }
  ];

  return (
    <section className="bg-black border-y border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-zinc-400" />
                </div>
              </div>
              <div className="font-mono text-xs text-zinc-500 mb-2 tracking-wider">
                {feature.label}
              </div>
              <div className="font-mono text-sm text-white font-bold mb-3">
                {feature.value}
              </div>
              <div className="font-mono text-xs text-zinc-600 leading-relaxed">
                {feature.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
