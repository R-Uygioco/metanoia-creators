import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemaTypes from './schemaTypes/index.js'

const projectId = import.meta.env.SANITY_STUDIO_PROJECT_ID
const dataset = import.meta.env.SANITY_STUDIO_DATASET || 'production'

if (!projectId) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID in studio/.env before starting Sanity Studio.')
}

export default defineConfig({
  name: 'default',
  title: 'Metanoia Creators',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('About page content')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
                  .title('About page content'),
              ),
            ...S.documentTypeListItems().filter((item) => item.getId() !== 'aboutPage'),
          ]),
    }),
  ],
  document: {
    actions: (previous, { schemaType }) =>
      schemaType === 'aboutPage'
        ? previous.filter(({ action }) => !['delete', 'duplicate'].includes(action))
        : previous,
    newDocumentOptions: (previous) =>
      previous.filter(({ templateId }) => templateId !== 'aboutPage'),
  },
  schema: { types: schemaTypes },
})
