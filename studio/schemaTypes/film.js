import { defineField, defineType } from 'sanity'
import { creditList, imageWithAlt, isYouTubeUrl } from './validation.js'

const videoStatuses = ['approvedTrailer', 'publiclyReleased']

export default defineType({
  name: 'film',
  title: 'Film',
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
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
    }),
    defineField({
      name: 'logline',
      title: 'Logline',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'synopsis',
      title: 'Synopsis',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(5000),
    }),
    defineField({ name: 'director', title: 'Director', type: 'string' }),
    defineField(creditList),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'festivalSelections',
      title: 'Official festival selections',
      type: 'array',
      of: [
        {
          name: 'festivalSelection',
          title: 'Festival selection',
          type: 'object',
          fields: [
            { name: 'festival', title: 'Festival', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'title', title: 'Selection / section', type: 'string' },
            { name: 'year', title: 'Year', type: 'number', validation: (Rule) => Rule.integer().min(1900).max(2100) },
          ],
          preview: { select: { title: 'festival', subtitle: 'title' } },
        },
      ],
    }),
    defineField({
      name: 'awards',
      title: 'Awards and nominations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'award' }] }],
    }),
    defineField({
      name: 'stills',
      title: 'Cinematic stills',
      type: 'array',
      of: [imageWithAlt('filmStill', 'Film still')],
    }),
    defineField({
      name: 'behindTheScenes',
      title: 'Behind-the-scenes images',
      type: 'array',
      of: [imageWithAlt('behindTheScenesImage', 'Behind-the-scenes image')],
    }),
    defineField({
      name: 'festivalJourney',
      title: 'Festival journey',
      type: 'array',
      of: [
        {
          name: 'festivalMilestone',
          title: 'Festival milestone',
          type: 'object',
          fields: [
            { name: 'date', title: 'Date or year', type: 'string' },
            { name: 'title', title: 'Milestone', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'description', title: 'Details', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title', subtitle: 'date' } },
        },
      ],
    }),
    defineField({
      name: 'publicationStatus',
      title: 'Publication status',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Festival Showcase Only', value: 'festivalOnly' },
          { title: 'Approved Trailer Available', value: 'approvedTrailer' },
          { title: 'Publicly Released', value: 'publiclyReleased' },
        ],
      },
      initialValue: 'festivalOnly',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'Approved YouTube URL',
      type: 'url',
      hidden: ({ parent }) => !videoStatuses.includes(parent?.publicationStatus),
      description:
        'Use only a trailer approved for public viewing or a publicly released film. Clear this URL when changing back to Festival Showcase Only. Unlisted or private videos are not exempt from festival rules.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!videoStatuses.includes(context.parent?.publicationStatus)) return true
          if (!value) return 'A YouTube URL is required for this publication status.'
          return isYouTubeUrl(value) ? true : 'Enter a valid YouTube watch, youtu.be, embed, or Shorts URL.'
        }),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'year', media: 'poster' } },
})
