import { ImageSnapGallery } from '@/components/custom/ImageSnapGallery';

const collections = [
  { src: '/images/collection-alchemy.jpg', title: 'Aether Potions', subtitle: 'Collection 01' },
  { src: '/images/collection-geometry.jpg', title: 'Sacred Geometry', subtitle: 'Collection 02' },
  { src: '/images/collection-crystal.jpg', title: 'Ember Relics', subtitle: 'Collection 03' },
  { src: '/images/collection-cards.jpg', title: 'Arcane Cards', subtitle: 'Collection 04' },
];

export const FeaturedCollections: React.FC = () => (
  <section id="collections" className="relative">
    <div className="relative z-10 px-6 md:px-12 pt-20 pb-8">
      <span className="text-slate text-xs uppercase tracking-widest">Featured</span>
      <h2 className="font-serif text-ivory mt-2" style={{ fontSize: 'clamp(36px, 6vw, 56px)', lineHeight: 1.1 }}>The Collections</h2>
    </div>
    <ImageSnapGallery images={collections} />
  </section>
);