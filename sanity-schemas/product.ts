export default {
  name: 'product', title: 'Product', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'price', title: 'Price (SOL)', type: 'number', validation: (Rule: any) => Rule.required().min(0) },
    { name: 'image', title: 'Product Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'category', title: 'Category', type: 'string', options: { list: [{ title: 'Physical', value: 'physical' }, { title: 'Digital', value: 'digital' }, { title: 'NFT', value: 'nft' }] }, validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'isDigital', title: 'Is Digital Product', type: 'boolean', initialValue: false },
    { name: 'nftMetadata', title: 'NFT Metadata', type: 'object', hidden: ({ document }: any) => !document?.isDigital, fields: [
      { name: 'mintAddress', title: 'Mint Address', type: 'string' },
      { name: 'collection', title: 'Collection Name', type: 'string' },
      { name: 'royaltyPercentage', title: 'Royalty %', type: 'number', initialValue: 5 },
    ]},
    { name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false },
    { name: 'stock', title: 'Stock Quantity', type: 'number', initialValue: 100, hidden: ({ document }: any) => document?.isDigital },
  ],
  preview: { select: { title: 'title', subtitle: 'price', media: 'image' }, prepare({ title, subtitle, media }: any) { return { title, subtitle: `${subtitle} SOL`, media }; } },
};