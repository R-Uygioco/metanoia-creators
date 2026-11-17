import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanityClient.js'

export function getSanityImageUrl(image, width = 1600) {
  if (!sanityClient || !image) return ''

  return imageUrlBuilder(sanityClient)
    .image(image)
    .width(width)
    .fit('max')
    .auto('format')
    .url()
}
