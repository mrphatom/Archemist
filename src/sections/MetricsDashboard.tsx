import { motion } from 'framer-motion';
import { NumberShuffle } from '@/components/custom/NumberShuffle';
import { TerminalText } from '@/components/custom/TerminalText';
import { LiquidGlassCard } from '@/components/custom/LiquidGlassCard';
import { useInView } from '@/hooks/useInView';
import { TrendingUp, Users, Box } from 'lucide-react';

const metrics = [
  { label: 'Total Volume Transmuted', value: 1245893, suffix: ' SOL', prefix: '', icon: TrendingUp },
  { label: 'Active Alchemists', value: 47291, suffix: '', prefix: '', icon: Users },
  { label: 'Current Block Height', value: 284756321, suffix: '', prefix: '#', icon: Box },
];

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const cardVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } } };

export const MetricsDashboard: React.FC = () => {
  const { ref, isInView } = useInView(0.2);
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255, 75, 36, 0.08) 0%, rgba(10,10,10,0) 70%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
        <div className="text-center mb-16">
          <span className="text-slate text-xs uppercase tracking-widest">Network Status</span>
          <h2 className="font-serif text-ivory mt-2" style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.1 }}>Live Metrics</h2>
        </div>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={cardVariants}>
              <LiquidGlassCard className="p-8 text-center">
                <metric.icon className="w-6 h-6 text-ember mx-auto mb-4" />
                <p className="text-slate text-xs uppercase tracking-widest mb-4">{metric.label}</p>
                <NumberShuffle value={metric.value} prefix={metric.prefix} suffix={metric.suffix} duration={2500 + index * 300} />
              </LiquidGlassCard>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
          <LiquidGlassCard className="p-4">
            <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-slate text-xs uppercase tracking-widest">System Log</span></div>
            <div className="mt-2 font-mono text-sm"><TerminalText text="Scanning blockchain nodes for latest transmutations..." typingSpeed={60} deleteSpeed={30} delayBeforeDelete={4000} /></div>
          </LiquidGlassCard>
        </motion.div>
      </div>
    </section>
  );
};