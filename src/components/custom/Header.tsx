import { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, FlaskConical, Wallet } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

interface HeaderProps {
  cartCount: number; onCartClick: () => void;
  walletConnected: boolean; walletAddress: string | null; onWalletClick: () => void;
}

const navLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Lab', href: '#wallet' },
];

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, walletConnected, walletAddress, onWalletClick }) => {
  const { isDark, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'glass-refined-strong shadow-soft' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5 group">
            <FlaskConical className="w-5 h-5 text-[var(--accent-copper)] transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-serif text-lg md:text-xl tracking-tight text-[var(--text-primary)]">Archemist</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--accent-copper)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={onWalletClick} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 btn-press"
              style={{ background: walletConnected ? 'rgba(184, 115, 51, 0.1)' : 'transparent', color: walletConnected ? 'var(--accent-copper)' : 'var(--text-secondary)', border: `1px solid ${walletConnected ? 'rgba(184, 115, 51, 0.2)' : 'transparent'}` }}>
              <Wallet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{walletConnected && walletAddress ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}` : 'Connect'}</span>
            </button>
            <button onClick={onCartClick} className="relative p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[hsl(var(--muted))] transition-all duration-200 btn-press">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--accent-copper)] text-white text-[10px] font-semibold flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={toggle} className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[hsl(var(--muted))] transition-all duration-200 btn-press" aria-label="Toggle theme">
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};