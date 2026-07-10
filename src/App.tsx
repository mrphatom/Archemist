import { useState, useCallback, lazy, Suspense } from 'react';
import { ThemeProvider } from '@/lib/ThemeContext';
import { DynamicNotification, showNotification } from '@/components/custom/DynamicNotification';
import { Header } from '@/components/custom/Header';
import { Footer } from '@/sections/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { FeaturedCollections } from '@/sections/FeaturedCollections';
import { MetricsDashboard } from '@/sections/MetricsDashboard';
import { WalletSection } from '@/sections/WalletSection';
import { MarketplaceSection } from '@/sections/MarketplaceSection';
import type { Product } from '@/lib/sanity';
import './App.css';

const CartDrawer = lazy(() => import('@/components/custom/CartDrawer').then(m => ({ default: m.CartDrawer })));

function AppContent() {
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

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => [...prev, product]);
    showNotification(`${product.title} added to cart`, 'success');
  }, []);

  const handleRemoveFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((p) => p._id !== id));
  }, []);

  return (
    <div className="relative min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Header cartCount={cartItems.length} onCartClick={() => setCartOpen(true)} walletConnected={walletConnected} walletAddress={publicKey} onWalletClick={() => document.getElementById('wallet')?.scrollIntoView({ behavior: 'smooth' })} />
      <DynamicNotification />
      <Suspense fallback={null}>
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} items={cartItems} onRemove={handleRemoveFromCart} walletConnected={walletConnected} />
      </Suspense>
      <main>
        <HeroSection />
        <div className="section-divider" />
        <FeaturedCollections />
        <div className="section-divider" />
        <MetricsDashboard />
        <div className="section-divider" />
        <WalletSection walletConnected={walletConnected} publicKey={publicKey} onConnect={handleConnect} onDisconnect={handleDisconnect} />
        <div className="section-divider" />
        <MarketplaceSection onAddToCart={handleAddToCart} />
        <Footer />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;