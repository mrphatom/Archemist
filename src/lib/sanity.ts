import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max');
}

export interface Product {
  _id: string; title: string; slug: { current: string };
  price: number; image: any; category: string;
  description: string; isDigital: boolean;
  nftMetadata?: { mintAddress: string; collection: string };
}

export interface Collection {
  _id: string; title: string; slug: { current: string };
  coverImage: any; description: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "product"] | order(_createdAt desc) { _id, title, slug, price, image, category, description, isDigital, nftMetadata }`;
  return sanityClient.fetch(query);
}

export async function fetchCollections(): Promise<Collection[]> {
  const query = `*[_type == "collection"] | order(_createdAt desc) { _id, title, slug, coverImage, description }`;
  return sanityClient.fetch(query);
}

export const mockProducts: Product[] = [
  { _id: '1', title: 'Aether Band', slug: { current: 'aether-band' }, price: 2.5, image: { asset: { _ref: 'product-wearable' } }, category: 'Physical', description: 'A futuristic wearable tech band with soft glowing cyan indicator.', isDigital: false },
  { _id: '2', title: 'Aurum Tumbler', slug: { current: 'aurum-tumbler' }, price: 1.8, image: { asset: { _ref: 'product-tumbler' } }, category: 'Physical', description: 'Premium glass tumbler filled with dark effervescent liquid.', isDigital: false },
  { _id: '3', title: 'Digital Flask NFT', slug: { current: 'digital-flask' }, price: 5.0, image: { asset: { _ref: 'collection-alchemy' } }, category: 'Digital', description: 'A mystical alchemy flask containing swirling neon cyan and ember-orange liquids.', isDigital: true, nftMetadata: { mintAddress: '', collection: 'Archemist Originals' } },
  { _id: '4', title: 'Crystal Artifact', slug: { current: 'crystal-artifact' }, price: 8.5, image: { asset: { _ref: 'collection-crystal' } }, category: 'Digital', description: 'Crystalline digital artifact refracting deep red and orange light.', isDigital: true, nftMetadata: { mintAddress: '', collection: 'Archemist Originals' } },
  { _id: '5', title: 'Arcane Card', slug: { current: 'arcane-card' }, price: 3.2, image: { asset: { _ref: 'collection-cards' } }, category: 'Physical', description: 'Sleek metallic card embossed with arcane symbols.', isDigital: false },
  { _id: '6', title: 'Geometry Print', slug: { current: 'geometry-print' }, price: 1.5, image: { asset: { _ref: 'collection-geometry' } }, category: 'Digital', description: 'Abstract scientific diagram of an impossible geometric structure.', isDigital: true, nftMetadata: { mintAddress: '', collection: 'Archemist Originals' } },
];

export const mockCollections = [
  { _id: 'c1', title: 'Aether Potions', slug: { current: 'aether-potions' }, coverImage: { asset: { _ref: 'collection-alchemy' } }, description: 'Liquid alchemy captured in crystalline vessels' },
  { _id: 'c2', title: 'Celestial Artifacts', slug: { current: 'celestial-artifacts' }, coverImage: { asset: { _ref: 'collection-geometry' } }, description: 'Sacred geometry from the digital cosmos' },
  { _id: 'c3', title: 'Ember Relics', slug: { current: 'ember-relics' }, coverImage: { asset: { _ref: 'collection-crystal' } }, description: 'Crystallized fire from the blockchain forge' },
  { _id: 'c4', title: 'Arcane Cards', slug: { current: 'arcane-cards' }, coverImage: { asset: { _ref: 'collection-cards' } }, description: 'Metal-bound secrets of the digital realm' },
];