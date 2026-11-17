import { defineField, defineType } from 'sanity'
import { imageWithAlt } from './validation.js'

export default defineType({
  name: 'aboutPage',
  title: 'About page content',
  type: 'document',
  description: 'Create one document to manage the public About page copy and behind-the-scenes images.',
  fields: [
    defineField({
      name: 'introduction',
      title: 'Group introduction',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(2000),
    }),
    defineField({
      name: 'background',
      title: 'Background / history',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.max(3000),
    }),
    defineField({
      name: 'creativePhilosophy',
      title: 'Creative philosophy',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.max(3000),
    }),
    defineField({
      name: 'mission',
      title: 'Mission',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(2000),
    }),
    defineField({
      name: 'vision',
      title: 'Vision',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(2000),
    }),
    defineField({
      name: 'productionApproach',
      title: 'Production approach',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.max(3000),
    }),
    defineField({
      name: 'behindTheScenes',
      title: 'Behind-the-scenes photos',
      type: 'array',
      of: [imageWithAlt('aboutImage', 'Behind-the-scenes image')],
    }),
  ],
})
