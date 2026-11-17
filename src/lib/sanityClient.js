import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || ''
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || ''

export const sanityConfig = { projectId, dataset }
export const sanityClient =
  projectId && dataset
    ? createClient({
        ...sanityConfig,
        apiVersion: '2024-01-01',
        useCdn: true,
        perspective: 'published',
      })
    : null
