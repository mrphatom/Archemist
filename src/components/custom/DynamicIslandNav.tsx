import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Wallet, ShoppingBag, Sparkles, FlaskConical } from 'lucide-react';

interface DynamicIslandNavProps {
  onWalletClick: () => void;
  walletConnected: boolean;
  publicKey: string | null;
}

export const DynamicIslandNav: React.FC<DynamicIslandNavProps> = ({
  onWalletClick, walletConnected, publicKey,
}) => {
  const scrollDirection = useScrollDirection();
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (scrollDirection === 'up') setIsExpanded(true);
    else if (scrollDirection === 'down' && !isHovered) setIsExpanded(false);
  }, [scrollDirection, isHovered]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const navLinks = [
    { label: 'Collections', id: 'collections', icon: Sparkles },
    { label: 'Marketplace', id: 'marketplace', icon: ShoppingBag },
    { label: 'Lab', id: 'wallet', icon: FlaskConical },
  ];

  return (
    <>
      <motion.div className="fixed top-4 left-1/2 z-[100] hidden md:flex items-center"
        onMouseEnter={() => { setIsHovered(true); setIsExpanded(true); }}
        onMouseLeave={() => { setIsHovered(false); if (scrollDirection === 'down') setIsExpanded(false); }}
        style={{ x: '-50%', borderRadius: 9999, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px) saturate(140%)', WebkitBackdropFilter: 'blur(20px) saturate(140%)', boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05)' }}
        initial={{ width: 160, height: 44 }} animate={{ width: isExpanded ? 520 : 160, height: isExpanded ? 56 : 44 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        <div className="flex items-center justify-between w-full px-5">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 text-ivory font-serif text-lg whitespace-nowrap flex-shrink-0">
            <FlaskConical className="w-5 h-5 text-ember" /><span>Archemist</span>
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div className="flex items-center gap-1" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} transition={{ duration: 0.2 }}>
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-platinum hover:text-ivory hover:bg-white/5 transition-all duration-200">
                    <link.icon className="w-3.5 h-3.5" />{link.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button onClick={onWalletClick} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm flex-shrink-0 transition-all duration-200"
            style={{ background: walletConnected ? 'rgba(255, 184, 77, 0.15)' : 'rgba(255, 75, 36, 0.15)', color: walletConnected ? '#ffb84d' : '#ff4b24', border: `1px solid ${walletConnected ? 'rgba(255, 184, 77, 0.2)' : 'rgba(255, 75, 36, 0.2)'}` }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Wallet className="w-3.5 h-3.5" />
            {walletConnected && publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : 'Connect'}
          </motion.button>
        </div>
      </motion.div>

      <div className="md:hidden fixed bottom-4 left-1/2 z-[100]" style={{ transform: 'translateX(-50%)' }}>
        <motion.div className="flex items-center gap-1 px-2 py-2"
          style={{ borderRadius: 9999, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(24px) saturate(140%)', WebkitBackdropFilter: 'blur(24px) saturate(140%)', boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.05)' }}>
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs text-platinum hover:text-ivory hover:bg-white/5 transition-all">
              <link.icon className="w-4 h-4" /><span className="hidden sm:inline">{link.label}</span>
            </button>
          ))}
          <button onClick={onWalletClick} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs transition-all"
            style={{ background: walletConnected ? 'rgba(255, 184, 77, 0.15)' : 'rgba(255, 75, 36, 0.15)', color: walletConnected ? '#ffb84d' : '#ff4b24' }}>
            <Wallet className="w-4 h-4" /><span className="hidden sm:inline">{walletConnected && publicKey ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}` : 'Wallet'}</span>
          </button>
        </motion.div>
      </div>
    </>
  );
};