import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingCart, Trash2, ExternalLink } from 'lucide-react';
import { LiquidGlassCard } from './LiquidGlassCard';
import type { Product } from '@/lib/sanity';

interface CartDrawerProps {
  isOpen: boolean; onClose: () => void; items: Product[];
  onRemove: (id: string) => void; walletConnected: boolean; onCheckout: () => void;
}

const imageMap: Record<string, string> = {
  'product-wearable': '/images/product-wearable.jpg', 'product-tumbler': '/images/product-tumbler.jpg',
  'collection-alchemy': '/images/collection-alchemy.jpg', 'collection-crystal': '/images/collection-crystal.jpg',
  'collection-cards': '/images/collection-cards.jpg', 'collection-geometry': '/images/collection-geometry.jpg',
};

const getImageSrc = (product: Product): string => {
  if (typeof product.image === 'string') return product.image;
  if (product.image?.asset?._ref) return imageMap[product.image.asset._ref] || '/images/collection-alchemy.jpg';
  return '/images/collection-alchemy.jpg';
};

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, walletConnected, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 bg-black/50 z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed right-0 top-0 bottom-0 w-full max-w-md z-[201] overflow-y-auto scrollbar-hide"
            style={{ background: '#0a0a0a', borderLeft: '1px solid rgba(255, 255, 255, 0.06)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-ember" />
                  <h2 className="text-ivory font-serif text-xl">Your Cart</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-ember/15 text-ember">{items.length}</span>
                </div>
                <motion.button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-slate hover:text-ivory hover:bg-white/5 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><X className="w-4 h-4" /></motion.button>
              </div>
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingCart className="w-12 h-12 text-slate/30 mb-4" />
                  <p className="text-slate text-sm">Your cart is empty</p>
                  <p className="text-slate/60 text-xs mt-1">Add items from the marketplace</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    <AnimatePresence>
                      {items.map((item, index) => (
                        <motion.div key={`${item._id}-${index}`} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                          <LiquidGlassCard className="p-3 flex gap-4" hover={false}>
                            <img src={getImageSrc(item)} alt={item.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-ivory text-sm font-medium truncate">{item.title}</h4>
                              <p className="text-gold text-sm mt-1">{item.price} <span className="text-slate text-xs">SOL</span></p>
                              {item.isDigital && <span className="text-cyan text-xs">Digital NFT</span>}
                            </div>
                            <motion.button onClick={() => onRemove(item._id)} className="w-7 h-7 rounded-full flex items-center justify-center text-slate hover:text-ember hover:bg-ember/10 transition-colors flex-shrink-0 self-center" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Trash2 className="w-3.5 h-3.5" /></motion.button>
                          </LiquidGlassCard>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <div className="border-t border-white/5 pt-6 mb-6">
                    <div className="flex items-center justify-between mb-2"><span className="text-slate text-sm">Subtotal</span><span className="text-ivory text-sm">{total.toFixed(2)} SOL</span></div>
                    <div className="flex items-center justify-between mb-2"><span className="text-slate text-sm">Network Fee</span><span className="text-ivory text-sm">0.005 SOL</span></div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5"><span className="text-ivory font-medium">Total</span><span className="text-gold text-xl font-semibold">{(total + 0.005).toFixed(3)} SOL</span></div>
                  </div>
                  <motion.button onClick={onCheckout} className="w-full py-4 rounded-pill text-ivory font-medium text-sm tracking-wide"
                    style={{ background: walletConnected ? 'linear-gradient(135deg, #ff4b24 0%, #ff6b42 100%)' : 'rgba(255, 75, 36, 0.2)', opacity: walletConnected ? 1 : 0.5 }}
                    whileHover={walletConnected ? { scale: 1.02 } : {}} whileTap={walletConnected ? { scale: 0.98 } : {}} disabled={!walletConnected}>
                    {walletConnected ? <span className="flex items-center justify-center gap-2"><ExternalLink className="w-4 h-4" />Checkout with Solana</span> : 'Connect Wallet to Checkout'}
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};