import { defineField, defineType } from 'sanity'
import { creditList, isYouTubeUrl } from './validation.js'

const categories = [
  'Short Films',
  'Commercials & Advertisements',
  'Tourism & Promotional Videos',
  'Corporate & Institutional Videos',
  'Event Coverage',
  'Music Videos & Creative Projects',
]

export default defineType({
  name: 'clientProject',
  title: 'Client project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / organization',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Approved YouTube URL',
      type: 'url',
      validation: (Rule) =>
        Rule.custom((value) =>
          !value || isYouTubeUrl(value) ? true : 'Enter a valid YouTube URL.',
        ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(3000),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'services',
      title: 'Services provided',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField(creditList),
    defineField({
      name: 'awards',
      title: 'Related awards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'award' }] }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: categories.map((category) => ({ title: category, value: category })) },
      validation: (Rule) => Rule.required().valid(...categories),
    }),
    defineField({
      name: 'featured',
      title: 'Feature on the home page',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'client', media: 'thumbnail' } },
})
