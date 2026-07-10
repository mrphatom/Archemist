import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LuminousAurora } from '@/components/custom/LuminousAurora';
import { CursorGlow } from '@/components/custom/CursorGlow';
import { DynamicIslandNav } from '@/components/custom/DynamicIslandNav';
import { DynamicNotification, showNotification } from '@/components/custom/DynamicNotification';
import { CartDrawer } from '@/components/custom/CartDrawer';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedCollections } from '@/sections/FeaturedCollections';
import { MetricsDashboard } from '@/sections/MetricsDashboard';
import { WalletSection } from '@/sections/WalletSection';
import { MarketplaceSection } from '@/sections/MarketplaceSection';
import { Footer } from '@/sections/Footer';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/sanity';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const handleConnect = useCallback(async (walletName: string) => {
    setWalletConnected(true);
    const mockPubkey = 'Archemist' + Math.random().toString(36).slice(2, 14) + Math.random().toString(36).slice(2, 14);
    setPublicKey(mockPubkey);
    showNotification(`${walletName} wallet connected!`, 'success');
  }, []);

  const handleDisconnect = useCallback(async () => {
    setWalletConnected(false);
    setPublicKey(null);
    showNotification('Wallet disconnected', 'info');
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      setCartItems((prev) => [...prev, product]);
      showNotification(`${product.title} added to cart`, 'success');
    }, []
  );

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((p) => p._id === id);
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  }, []);

  const handleCheckout = useCallback(() => {
    if (!walletConnected) {
      showNotification('Please connect your wallet first', 'warning');
      return;
    }
    showNotification(`Processing ${cartItems.length} items...`, 'info');
    setTimeout(() => {
      showNotification('Transaction confirmed on Solana!', 'success');
      setCartItems([]);
      setCartOpen(false);
    }, 2000);
  }, [walletConnected, cartItems]);

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory overflow-x-hidden">
      <LuminousAurora />
      <CursorGlow />
      <DynamicIslandNav onWalletClick={() => { document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth' }); }} walletConnected={walletConnected} publicKey={publicKey} />
      <DynamicNotification />
      <motion.button className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[90] w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(255, 75, 36, 0.9)', boxShadow: '0 4px 20px rgba(255, 75, 36, 0.4)' }} onClick={() => setCartOpen(true)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring' }}>
        <ShoppingCart className="w-5 h-5 text-ivory" />
        {cartItems.length > 0 && (
          <motion.span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-obsidian text-xs font-bold flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartItems.length}>{cartItems.length}</motion.span>
        )}
      </motion.button>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemoveFromCart} walletConnected={walletConnected} onCheckout={handleCheckout} />
      <main className="relative z-[2]">
        <HeroSection />
        <FeaturedCollections />
        <MetricsDashboard />
        <WalletSection walletConnected={walletConnected} publicKey={publicKey} onConnect={handleConnect} onDisconnect={handleDisconnect} />
        <MarketplaceSection onAddToCart={handleAddToCart} />
        <Footer />
      </main>
    </div>
  );
}

export default App;