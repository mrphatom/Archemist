export default {
  name: 'navbar', title: 'Navigation Bar', type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'items', title: 'Nav Items', type: 'array', of: [{
      type: 'object', name: 'navItem', fields: [
        { name: 'label', title: 'Label', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'href', title: 'Link (URL or #section)', type: 'string', validation: (Rule: any) => Rule.required() },
        { name: 'isExternal', title: 'External Link', type: 'boolean', initialValue: false },
        { name: 'position', title: 'Position', type: 'string', options: { list: [{ title: 'Main', value: 'main' }, { title: 'Utility', value: 'utility' }] }, initialValue: 'main' },
      ],
    }]},
  ],
};