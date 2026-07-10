import { motion } from 'framer-motion';
import { LiquidGlassCard } from '@/components/custom/LiquidGlassCard';
import { FlaskConical, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.1) 40%, rgba(10,10,10,0.5) 100%)' }} />
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <LiquidGlassCard className="px-8 py-10 md:px-16 md:py-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center">
            <motion.div className="mb-6" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <FlaskConical className="w-12 h-12 text-ember" />
            </motion.div>
            <h1 className="font-serif text-ivory leading-none tracking-tight" style={{ fontSize: 'clamp(48px, 10vw, 80px)', letterSpacing: '-0.02em' }}>Archemist</h1>
            <motion.p className="mt-4 text-platinum text-lg md:text-xl font-sans font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>Transmute the digital realm.</motion.p>
            <motion.button className="mt-8 px-8 py-3 rounded-pill text-ivory font-medium text-sm tracking-wide" style={{ background: 'linear-gradient(135deg, #ff4b24 0%, #ff6b42 100%)', boxShadow: '0 4px 24px rgba(255, 75, 36, 0.3)' }} whileHover={{ scale: 1.05, boxShadow: '0 6px 32px rgba(255, 75, 36, 0.5)' }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}>Enter the Lab</motion.button>
          </motion.div>
        </LiquidGlassCard>
        <motion.div className="mt-12 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}>
          <span className="text-slate text-xs uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown className="w-5 h-5 text-slate" /></motion.div>
        </motion.div>
      </div>
    </section>
  );
};