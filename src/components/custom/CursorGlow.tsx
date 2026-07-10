import { useEffect, useRef } from 'react';

export const CursorGlow: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const handleMouseMove = (e: MouseEvent) => {
      glow.style.setProperty('--x', `${e.clientX}px`);
      glow.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={glowRef} className="fixed inset-0 pointer-events-none z-50"
      style={{ background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(255, 75, 36, 0.04), transparent 60%)` }} />
  );
};