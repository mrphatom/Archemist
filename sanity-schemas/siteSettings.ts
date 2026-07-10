export default {
  name: 'siteSettings', title: 'Site Settings', type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'siteName', title: 'Site Name', type: 'string', initialValue: 'Archemist' },
    { name: 'tagline', title: 'Tagline', type: 'string', initialValue: 'Transmute the digital realm.' },
    { name: 'heroCta', title: 'Hero CTA Button Text', type: 'string', initialValue: 'Enter the Lab' },
    { name: 'footerCta', title: 'Footer CTA Text', type: 'string', initialValue: 'Join the Experiment.' },
    { name: 'socialLinks', title: 'Social Media Links', type: 'object', fields: [
      { name: 'twitter', title: 'Twitter URL', type: 'url' },
      { name: 'github', title: 'GitHub URL', type: 'url' },
      { name: 'discord', title: 'Discord URL', type: 'url' },
      { name: 'telegram', title: 'Telegram URL', type: 'url' },
    ]},
    { name: 'seo', title: 'SEO Settings', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
      { name: 'ogImage', title: 'Open Graph Image', type: 'image' },
    ]},
  ],
};