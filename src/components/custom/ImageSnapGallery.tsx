import { useRef, useState } from 'react';
import { motion, useTransform, useScroll, useMotionValueEvent } from 'framer-motion';
import { LiquidGlassCard } from './LiquidGlassCard';

interface GalleryImage { src: string; title: string; subtitle: string; }
interface ImageSnapGalleryProps { images: GalleryImage[]; }

const GalleryCard: React.FC<{
  image: GalleryImage; index: number; total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ image, index, total, progress }) => {
  const startRange = index / total, endRange = (index + 1) / total;
  const scale = useTransform(progress, [startRange, endRange], [0.8, 1.05]);
  const brightness = useTransform(progress, [startRange, endRange], [0.4, 1.2]);
  const blur = useTransform(progress, [startRange, endRange], [6, 0]);
  const opacity = useTransform(progress, [startRange, endRange], [0.5, 1]);
  const [blurVal, setBlurVal] = useState(6); const [brightnessVal, setBrightnessVal] = useState(0.4);
  useMotionValueEvent(blur, 'change', (v) => setBlurVal(v));
  useMotionValueEvent(brightness, 'change', (v) => setBrightnessVal(v));

  return (
    <motion.div className="flex-shrink-0 relative overflow-hidden rounded-card" style={{ width: '60vw', maxWidth: '800px', height: '70vh', maxHeight: '600px', scale, opacity }}>
      <img src={image.src} alt={image.title} className="w-full h-full object-cover" style={{ filter: `brightness(${brightnessVal}) blur(${blurVal}px)`, transition: 'filter 0.05s linear' }} />
      <div className="absolute inset-0 flex items-end p-8">
        <LiquidGlassCard className="px-6 py-4" hover={false}>
          <p className="text-xs uppercase tracking-widest text-gold mb-1">{image.subtitle}</p>
          <h3 className="font-serif text-2xl md:text-3xl text-ivory">{image.title}</h3>
        </LiquidGlassCard>
      </div>
    </motion.div>
  );
};

export const ImageSnapGallery: React.FC<ImageSnapGalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <motion.div style={{ display: 'flex', gap: '4rem', x }} className="pl-[20vw]">
          {images.map((image, index) => (
            <GalleryCard key={index} image={image} index={index} total={images.length} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};