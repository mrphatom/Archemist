export default {
  name: 'homepage', title: 'Homepage', type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'heroHeadline', title: 'Hero Headline', type: 'string', initialValue: 'Archemist' },
    { name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 2, initialValue: 'A curated marketplace where physical craft meets digital provenance.' },
    { name: 'heroCtaPrimary', title: 'Primary CTA Text', type: 'string', initialValue: 'Browse Marketplace' },
    { name: 'heroCtaSecondary', title: 'Secondary CTA Text', type: 'string', initialValue: 'Connect Wallet' },
    { name: 'featuredCollections', title: 'Featured Collections', type: 'array', of: [{ type: 'reference', to: [{ type: 'collection' }] }], validation: (Rule: any) => Rule.max(4) },
    { name: 'featuredProducts', title: 'Featured Products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }], validation: (Rule: any) => Rule.max(6) },
    { name: 'metricsEnabled', title: 'Show Live Metrics', type: 'boolean', initialValue: true },
    { name: 'walletSectionEnabled', title: 'Show Wallet Section', type: 'boolean', initialValue: true },
  ],
};