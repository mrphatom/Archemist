import { useState, useEffect, useRef } from 'react';
import NumberFlow from '@number-flow/react';
import { useInView } from '@/hooks/useInView';

interface NumberShuffleProps {
  value: number; prefix?: string; suffix?: string;
  duration?: number; className?: string;
}

export const NumberShuffle: React.FC<NumberShuffleProps> = ({
  value, prefix = '', suffix = '', duration = 2000, className = '',
}) => {
  const { ref, isInView } = useInView(0.3);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * value));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isInView, value, duration, hasAnimated]);

  return (
    <div ref={ref} className={className}>
      <span className="text-slate text-xs uppercase tracking-widest">{prefix}</span>
      <NumberFlow value={displayValue} className="tabular-nums font-semibold text-ivory text-4xl md:text-5xl"
        transformTiming={{ duration: 500, easing: 'ease-out' }} spinTiming={{ duration: 500, easing: 'ease-out' }} />
      <span className="text-slate text-sm">{suffix}</span>
    </div>
  );
};