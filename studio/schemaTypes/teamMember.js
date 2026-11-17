import { defineField, defineType } from 'sanity'
import { isHttpsUrl } from './validation.js'

export default defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'position',
      title: 'Position / role',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.max(2000),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          title: 'Social link',
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: { list: ['Facebook', 'Instagram', 'YouTube', 'Other'] },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  isHttpsUrl(value) ? true : 'Enter a valid HTTPS URL.',
                ),
            },
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'position', media: 'photo' } },
})
