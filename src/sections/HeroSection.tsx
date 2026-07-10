import { motion } from 'framer-motion';
import { FlaskConical, ArrowDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden bg-[hsl(var(--background))]">
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-8">Web3 Commerce</motion.span>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mb-8">
          <div className="w-16 h-16 rounded-full border border-[var(--surface-glass-border)] flex items-center justify-center bg-[hsl(var(--muted))]">
            <FlaskConical className="w-7 h-7 text-[var(--accent-copper)]" />
          </div>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} className="heading-editorial text-[var(--text-primary)]" style={{ fontSize: 'clamp(48px, 9vw, 96px)' }}>Archemist</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-6 text-[var(--text-secondary)] text-lg md:text-xl font-light max-w-md leading-relaxed">
          A curated marketplace where physical craft meets digital provenance. Trade goods and NFTs on Solana.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.9 }} className="mt-10 flex items-center gap-4">
          <a href="#marketplace" className="px-8 py-3.5 bg-[var(--text-primary)] text-[hsl(var(--primary-foreground))] rounded-full text-sm font-medium btn-press transition-all duration-200 hover:opacity-90">Browse Marketplace</a>
          <a href="#wallet" className="px-8 py-3.5 border border-[hsl(var(--border))] text-[var(--text-primary)] rounded-full text-sm font-medium btn-press transition-all duration-200 hover:bg-[hsl(var(--muted))]">Connect Wallet</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[var(--text-tertiary)] text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown className="w-4 h-4 text-[var(--text-tertiary)]" /></motion.div>
        </motion.div>
      </div>
    </section>
  );
};