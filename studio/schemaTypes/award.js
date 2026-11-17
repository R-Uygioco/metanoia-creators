import { defineField, defineType } from 'sanity'

const recipientTypes = ['Metanoia / Film', 'Client Project']
const recognitionGroups = [
  { title: 'Metanoia Creators Film Awards', value: 'filmAwards' },
  { title: 'Official Festival Selections', value: 'festivalSelections' },
  { title: 'National Recognition', value: 'nationalRecognition' },
  { title: 'International Recognition', value: 'internationalRecognition' },
  { title: 'Client Project Awards', value: 'clientProjectAwards' },
]

export default defineType({
  name: 'award',
  title: 'Award / recognition',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Award / recognition title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'organization',
      title: 'Competition / organization',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({
      name: 'recipient',
      title: 'Recipient',
      type: 'string',
      description: 'Name the film, client, or recipient exactly as it should appear publicly.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'recipientType',
      title: 'Recipient type',
      type: 'string',
      options: { list: recipientTypes.map((value) => ({ title: value, value })) },
      validation: (Rule) => Rule.required().valid(...recipientTypes),
    }),
    defineField({
      name: 'recognitionGroup',
      title: 'Recognition group',
      type: 'string',
      options: { list: recognitionGroups },
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const recipientType = context.parent?.recipientType
          if (recipientType === 'Client Project' && value !== 'clientProjectAwards') {
            return 'Client project recognition must use the Client Project Awards group.'
          }
          if (recipientType === 'Metanoia / Film' && value === 'clientProjectAwards') {
            return 'Metanoia film recognition cannot use the Client Project Awards group.'
          }
          return true
        }),
    }),
    defineField({
      name: 'relatedWork',
      title: 'Related film or client project',
      type: 'reference',
      to: [{ type: 'film' }, { type: 'clientProject' }],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'certificate',
      title: 'Certificate / official image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alternative text', type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(2000),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'organization' } },
})
