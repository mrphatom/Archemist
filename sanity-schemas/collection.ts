export default {
  name: 'collection', title: 'Collection', type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule: any) => Rule.required() },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'products', title: 'Products in Collection', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
    { name: 'featured', title: 'Featured Collection', type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
};