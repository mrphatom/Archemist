import { useState } from 'react';
import { motion } from 'framer-motion';
import { LiquidGlassCard } from '@/components/custom/LiquidGlassCard';
import { useInView } from '@/hooks/useInView';
import { FlaskConical, ArrowRight, Twitter, Github, MessageCircle, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  const { ref, isInView } = useInView(0.1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); setTimeout(() => setSubscribed(false), 3000); }
  };

  return (
    <footer className="relative py-24 md:py-32 px-4 md:px-8 bg-obsidian" ref={ref}>
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}>
          <h2 className="font-serif text-ivory" style={{ fontSize: 'clamp(40px, 8vw, 96px)', lineHeight: 1.05 }}>Join the<br /><span className="text-gradient-ember">Experiment.</span></h2>
        </motion.div>
        <motion.div className="max-w-md mx-auto mb-20" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.8 }}>
          <form onSubmit={handleSubscribe} className="relative">
            <LiquidGlassCard className="flex items-center p-1 pr-1">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 bg-transparent text-ivory placeholder-slate px-4 py-3 text-sm outline-none" />
              <motion.button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-pill text-sm text-ivory font-medium flex-shrink-0" style={{ background: 'linear-gradient(135deg, #ff4b24 0%, #ff6b42 100%)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{subscribed ? 'Subscribed!' : 'Subscribe'}<ArrowRight className="w-4 h-4" /></motion.button>
            </LiquidGlassCard>
          </form>
        </motion.div>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }}>
          {['Platform', 'Community', 'Resources', 'Legal'].map((heading, i) => (
            <div key={heading}>
              <h4 className="text-ivory font-medium mb-4">{heading}</h4>
              <ul className="space-y-2">
                {i === 0 && ['Marketplace', 'Collections', 'Drops', 'Auctions'].map(item => <li key={item}><button className="text-slate hover:text-ivory text-sm transition-colors">{item}</button></li>)}
                {i === 1 && ['Discord', 'Twitter', 'Blog', 'Governance'].map(item => <li key={item}><button className="text-slate hover:text-ivory text-sm transition-colors">{item}</button></li>)}
                {i === 2 && ['Docs', 'API', 'Status', 'Brand Kit'].map(item => <li key={item}><button className="text-slate hover:text-ivory text-sm transition-colors">{item}</button></li>)}
                {i === 3 && ['Terms', 'Privacy', 'Cookies', 'Licenses'].map(item => <li key={item}><button className="text-slate hover:text-ivory text-sm transition-colors">{item}</button></li>)}
              </ul>
            </div>
          ))}
        </motion.div>
        <motion.div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.7, duration: 0.8 }}>
          <div className="flex items-center gap-2 mb-4 md:mb-0"><FlaskConical className="w-5 h-5 text-ember" /><span className="font-serif text-ivory text-lg">Archemist</span></div>
          <p className="text-slate text-xs mb-4 md:mb-0">&copy; 2025 Archemist. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Twitter, Github, MessageCircle, Send].map((Icon, i) => (
              <motion.button key={i} className="w-9 h-9 rounded-full flex items-center justify-center text-slate hover:text-ivory hover:bg-white/5 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><Icon className="w-4 h-4" /></motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};