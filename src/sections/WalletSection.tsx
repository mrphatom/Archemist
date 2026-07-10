import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PerspectiveCard } from '@/components/custom/PerspectiveCard';
import { TerminalText } from '@/components/custom/TerminalText';
import { LiquidGlassCard } from '@/components/custom/LiquidGlassCard';
import { useInView } from '@/hooks/useInView';
import { formatAddress } from '@/lib/solana';
import { Wallet, Zap, Shield, Globe, Cpu, Key, Lock } from 'lucide-react';

interface WalletSectionProps {
  walletConnected: boolean; publicKey: string | null;
  onConnect: (walletName: string) => void; onDisconnect: () => void;
}

const walletOptions = [
  { name: 'Phantom', icon: Zap, color: '#ab9ff2' }, { name: 'Solflare', icon: Shield, color: '#fc4e4e' },
  { name: 'Backpack', icon: Lock, color: '#e593ff' }, { name: 'Glow', icon: Globe, color: '#00e5ff' },
  { name: 'Ledger', icon: Key, color: '#ffb84d' }, { name: 'Torus', icon: Cpu, color: '#0364ff' },
  { name: 'Slope', icon: Wallet, color: '#ff4b24' }, { name: 'Math', icon: Zap, color: '#00c853' },
  { name: 'BitKeep', icon: Shield, color: '#7524f9' },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { opacity: 0, y: 30, rotateX: 15 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export const WalletSection: React.FC<WalletSectionProps> = ({ walletConnected, publicKey, onConnect, onDisconnect }) => {
  const { ref, isInView } = useInView(0.15);
  const [showWalletGrid, setShowWalletGrid] = useState(false);
  const [balance] = useState<number | null>(null);

  return (
    <section id="wallet" className="relative py-24 md:py-32 px-4 md:px-8" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255, 75, 36, 0.06) 0%, rgba(10,10,10,0) 60%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-slate text-xs uppercase tracking-widest">Web3 Integration</span>
          <h2 className="font-serif text-ivory mt-2" style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.1 }}>The Alchemist&apos;s Vault</h2>
          <p className="text-slate mt-4 max-w-lg mx-auto">Connect your Solana wallet to transmute digital assets on the blockchain.</p>
        </div>
        <AnimatePresence mode="wait">
          {!walletConnected || showWalletGrid ? (
            <motion.div key="wallet-grid" className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
              {walletOptions.map((wallet) => (
                <motion.div key={wallet.name} variants={cardVariants}>
                  <PerspectiveCard className="h-32 md:h-40" onClick={() => { onConnect(wallet.name); setShowWalletGrid(false); }} signature="SELECT" signatureColor={wallet.color}>
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                      <wallet.icon className="w-8 h-8 md:w-10 md:h-10" style={{ color: wallet.color }} />
                      <span className="text-ivory text-sm font-medium">{wallet.name}</span>
                    </div>
                  </PerspectiveCard>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="wallet-connected" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
              <LiquidGlassCard className="p-8 md:p-12 max-w-lg mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"><Zap className="w-8 h-8 text-gold" /></div>
                <h3 className="font-serif text-2xl text-ivory mb-2">Wallet Connected</h3>
                <p className="text-slate text-sm font-mono mb-4">{publicKey ? formatAddress(publicKey) : 'Unknown'}</p>
                {balance !== null && <p className="text-gold text-3xl font-semibold mb-6">{balance.toFixed(4)} <span className="text-lg">SOL</span></p>}
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setShowWalletGrid(true)} className="px-6 py-2.5 rounded-pill text-sm text-ivory bg-white/5 hover:bg-white/10 transition-colors border border-white/10">Switch Wallet</button>
                  <button onClick={onDisconnect} className="px-6 py-2.5 rounded-pill text-sm text-ember bg-ember/10 hover:bg-ember/20 transition-colors border border-ember/20">Disconnect</button>
                </div>
              </LiquidGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div className="mt-8 max-w-lg mx-auto" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1, duration: 0.6 }}>
          <LiquidGlassCard className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: walletConnected ? '#00e5ff' : '#ff4b24' }} />
              <span className="text-slate text-xs uppercase tracking-widest">{walletConnected ? 'Node Active' : 'Awaiting Connection'}</span>
            </div>
            <div className="font-mono text-sm"><TerminalText text={walletConnected ? `Wallet verified. Public key: ${publicKey?.slice(0, 16)}... Ready for transmutation.` : 'Awaiting wallet connection. Select a provider to initialize the vault...'} typingSpeed={50} deleteSpeed={25} delayBeforeDelete={6000} /></div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    </section>
  );
};