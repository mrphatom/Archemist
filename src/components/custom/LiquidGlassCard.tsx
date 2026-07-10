import { useRef, useCallback } from 'react';

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  children, className = '', hover = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card || !hover) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, [hover]);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-card ${className}`}
      style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(16px) saturate(140%)', WebkitBackdropFilter: 'blur(16px) saturate(140%)' }}>
      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: `radial-gradient(ellipse 90% 60% at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(255,255,255,0.08) 0%, transparent 55%)`, mixBlendMode: 'overlay' }} />
      <div className="absolute inset-0 pointer-events-none z-10 rounded-card"
        style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }} />
      {children}
    </div>
  );
};