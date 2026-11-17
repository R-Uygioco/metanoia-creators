import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(2000),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'description', media: 'featuredImage' } },
})
