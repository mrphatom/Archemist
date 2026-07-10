export default {
  name: 'product', title: 'Product', type: 'document',
  fieldsets: [
    { name: 'fulfillment', title: 'Fulfillment & Escrow', options: { collapsible: true, collapsed: false } },
    { name: 'nft', title: 'NFT Metadata', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'price', title: 'Price (SOL)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
    { name: 'compareAtPrice', title: 'Compare At Price (SOL)', type: 'number', description: 'Original price before discount' },
    { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'gallery', title: 'Image Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'category', title: 'Category', type: 'string', options: { list: [
      { title: 'Physical', value: 'physical' },
      { title: 'Digital', value: 'digital' },
      { title: 'NFT', value: 'nft' },
    ]}, validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, description: 'Shown in product cards' },
    { name: 'isDigital', title: 'Is Digital Product', type: 'boolean', initialValue: false },
    { name: 'variants', title: 'Product Variants', type: 'array', of: [{
      type: 'object', name: 'variant', fields: [
        { name: 'title', title: 'Variant Title', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'sku', title: 'SKU', type: 'string' },
        { name: 'price', title: 'Variant Price Override', type: 'number' },
        { name: 'options', title: 'Options', type: 'array', of: [{ type: 'object', fields: [
          { name: 'name', title: 'Option Name', type: 'string' },
          { name: 'value', title: 'Option Value', type: 'string' },
        ]}]},
        { name: 'stock', title: 'Stock', type: 'number', initialValue: 0 },
        { name: 'image', title: 'Variant Image', type: 'image', options: { hotspot: true } },
      ],
    }]},
    { name: 'fulfillmentType', title: 'Fulfillment Type', type: 'string', fieldset: 'fulfillment', options: { list: [
      { title: 'Escrow (Physical)', value: 'escrow' },
      { title: 'Instant (Digital)', value: 'instant' },
    ]}, initialValue: 'escrow', validation: (Rule: any) => Rule.required() },
    { name: 'escrowTimeout', title: 'Escrow Timeout (days)', type: 'number', fieldset: 'fulfillment', initialValue: 14, description: 'Days until auto-release if buyer does not dispute' },
    { name: 'shippingRegions', title: 'Shipping Regions', type: 'array', fieldset: 'fulfillment', of: [{ type: 'string' }], options: { list: [
      { title: 'North America', value: 'na' },
      { title: 'Europe', value: 'eu' },
      { title: 'Asia Pacific', value: 'apac' },
      { title: 'Rest of World', value: 'row' },
    ]}},
    { name: 'shippingCost', title: 'Shipping Cost (SOL)', type: 'number', fieldset: 'fulfillment', initialValue: 0 },
    { name: 'estimatedDelivery', title: 'Estimated Delivery', type: 'string', fieldset: 'fulfillment', initialValue: '7-14 business days' },
    { name: 'nftMetadata', title: 'NFT Metadata', type: 'object', fieldset: 'nft', hidden: ({ document }: any) => !document?.isDigital, fields: [
      { name: 'mintAddress', title: 'Mint Address', type: 'string' },
      { name: 'collection', title: 'Collection Name', type: 'string' },
      { name: 'royaltyPercentage', title: 'Royalty %', type: 'number', initialValue: 5 },
      { name: 'maxSupply', title: 'Max Supply', type: 'number' },
      { name: 'attributes', title: 'Attributes', type: 'array', of: [{ type: 'object', fields: [
        { name: 'trait_type', title: 'Trait Type', type: 'string' },
        { name: 'value', title: 'Value', type: 'string' },
      ]}]},
    ]},
    { name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false },
    { name: 'stock', title: 'Stock Quantity', type: 'number', initialValue: 100, hidden: ({ document }: any) => document?.isDigital },
    { name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'seo', title: 'SEO', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
    ]},
  ],
  preview: {
    select: { title: 'title', subtitle: 'price', media: 'image', fulfillmentType: 'fulfillmentType' },
    prepare({ title, subtitle, media, fulfillmentType }: any) {
      return { title, subtitle: `${subtitle} SOL \u00b7 ${fulfillmentType === 'escrow' ? 'Escrow' : 'Instant'}`, media };
    },
  },
};