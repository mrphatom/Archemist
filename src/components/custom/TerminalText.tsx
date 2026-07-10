import { useState, useEffect } from 'react';

interface TerminalTextProps {
  text?: string; typingSpeed?: number; deleteSpeed?: number;
  delayBeforeDelete?: number; className?: string;
}

export const TerminalText: React.FC<TerminalTextProps> = ({
  text = 'Scanning blockchain nodes...', typingSpeed = 100, deleteSpeed = 50,
  delayBeforeDelete = 3000, className = '',
}) => {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<'typing' | 'deleting' | 'waiting'>('typing');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'typing') return;
    if (index >= text.length) { setTimeout(() => setPhase('deleting'), 1500); return; }
    const timeout = setTimeout(() => { setDisplayed((prev) => prev + text[index]); setIndex((prev) => prev + 1); }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [index, text, typingSpeed, phase]);

  useEffect(() => {
    if (phase !== 'deleting') return;
    if (displayed.length === 0) { setTimeout(() => { setPhase('typing'); setIndex(0); }, delayBeforeDelete); return; }
    const timeout = setTimeout(() => { setDisplayed((prev) => prev.slice(0, -1)); }, deleteSpeed);
    return () => clearTimeout(timeout);
  }, [displayed, phase, deleteSpeed, delayBeforeDelete]);

  return (
    <span className={`font-mono text-gold ${className}`}>{displayed}<span className="animate-pulse">_</span></span>
  );
};