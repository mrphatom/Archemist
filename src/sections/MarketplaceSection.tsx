import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { mockProducts, type Product } from '@/lib/sanity';
import { ShoppingCart, Sparkles, Package } from 'lucide-react';

interface MarketplaceSectionProps { onAddToCart: (product: Product) => void; }

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } } };

const imageMap: Record<string, string> = {
  'product-wearable': '/images/product-wearable.jpg', 'product-tumbler': '/images/product-tumbler.jpg',
  'collection-alchemy': '/images/collection-alchemy.jpg', 'collection-crystal': '/images/collection-crystal.jpg',
  'collection-cards': '/images/collection-cards.jpg', 'collection-geometry': '/images/collection-geometry.jpg',
};

export const MarketplaceSection: React.FC<MarketplaceSectionProps> = ({ onAddToCart }) => {
  const { ref, isInView } = useInView(0.1);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filter, setFilter] = useState<'all' | 'physical' | 'digital'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try { const { fetchProducts } = await import('@/lib/sanity'); const data = await fetchProducts(); if (data?.length) setProducts(data); }
      catch { /* use mock */ }
    }; fetchData();
  }, []);

  const filtered = filter === 'all' ? products : products.filter((p) => filter === 'digital' ? p.isDigital : !p.isDigital);

  const getImageSrc = (product: Product): string => {
    if (typeof product.image === 'string') return product.image;
    if (product.image?.asset?._ref) return imageMap[product.image.asset._ref] || '/images/collection-alchemy.jpg';
    return '/images/collection-alchemy.jpg';
  };

  return (
    <section id="marketplace" className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="relative z-10 max-w-7xl mx-auto" ref={ref}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div><span className="text-slate text-xs uppercase tracking-widest">Shop</span><h2 className="font-serif text-ivory mt-2" style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.1 }}>The Marketplace</h2></div>
          <div className="flex gap-2">
            {(['all', 'physical', 'digital'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-pill text-xs uppercase tracking-widest transition-all duration-300 ${filter === f ? 'bg-ember text-ivory' : 'bg-white/5 text-slate hover:text-ivory hover:bg-white/10'}`}>{f}</button>
            ))}
          </div>
        </div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {filtered.map((product) => (
            <motion.div key={product._id} variants={cardVariants}>
              <motion.div className="group relative rounded-card overflow-hidden bg-surface border border-white/5" style={{ boxShadow: '0px 8px 32px rgba(0,0,0,0.4)' }}
                whileHover={{ y: -8, boxShadow: '0px 12px 40px rgba(255, 75, 36, 0.15)', borderColor: 'rgba(255, 75, 36, 0.3)' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
                <div className="relative aspect-square overflow-hidden">
                  <img src={getImageSrc(product)} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-pill text-xs font-medium" style={{ background: product.isDigital ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 184, 77, 0.15)', color: product.isDigital ? '#00e5ff' : '#ffb84d', border: `1px solid ${product.isDigital ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 184, 77, 0.2)'}` }>
                      {product.isDigital ? <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" />Digital</span> : <span className="flex items-center gap-1"><Package className="w-3 h-3" />Physical</span>}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-ivory font-medium text-lg mb-1">{product.title}</h3>
                  <p className="text-slate text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-semibold text-xl">{product.price} <span className="text-sm text-slate font-normal">SOL</span></span>
                    <motion.button onClick={() => onAddToCart(product)} className="flex items-center gap-2 px-4 py-2 rounded-pill text-sm text-ivory transition-colors" style={{ background: 'rgba(255, 75, 36, 0.15)' }} whileHover={{ background: 'rgba(255, 75, 36, 0.3)', scale: 1.05 }} whileTap={{ scale: 0.95 }}><ShoppingCart className="w-4 h-4" />Add</motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};