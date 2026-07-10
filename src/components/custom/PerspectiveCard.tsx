import { useRef, useCallback, useState } from 'react';

interface PerspectiveCardProps {
  children: React.ReactNode; className?: string;
  onClick?: () => void; signature?: string; signatureColor?: string;
}

export const PerspectiveCard: React.FC<PerspectiveCardProps> = ({
  children, className = '', onClick, signature = 'CONNECT', signatureColor = '#ff4b24',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current; if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    card.style.setProperty('--r-x', `${(x - 0.5) * 20}deg`);
    card.style.setProperty('--r-y', `${(0.5 - y) * 20}deg`);
    card.style.setProperty('--x', `${x * 100}%`);
    card.style.setProperty('--y', `${y * 100}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current; if (!card) return;
    card.style.setProperty('--r-x', '0deg'); card.style.setProperty('--r-y', '0deg');
    setIsHovered(false);
  }, []);

  return (
    <div ref={cardRef} className={`relative cursor-pointer ${className}`} style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setIsHovered(true)} onClick={onClick}>
      <div className="relative w-full h-full rounded-card overflow-hidden transition-transform duration-200 ease-out"
        style={{ transform: 'rotateY(var(--r-x, 0deg)) rotateX(var(--r-y, 0deg))', transformStyle: 'preserve-3d', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="absolute inset-0 pointer-events-none z-10"
          style={{ background: `radial-gradient(ellipse 80% 50% at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.06) 0%, transparent 60%)`, mixBlendMode: 'overlay' }} />
        {children}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 200 60" preserveAspectRatio="xMidYMid meet">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="none" stroke={signatureColor} strokeWidth="0.8"
            strokeDasharray="300" strokeDashoffset={isHovered ? 0 : 300}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.445, 0.05, 0.55, 0.95), stroke 0.6s linear, opacity 0.3s ease', opacity: isHovered ? 1 : 0, fontSize: '14px', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '4px' }}>
            {signature}
          </text>
        </svg>
      </div>
    </div>
  );
};