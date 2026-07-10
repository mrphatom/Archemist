import { useRef, useEffect } from 'react';

export function useMousePosition() {
  const position = useRef({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      position.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  return position;
}