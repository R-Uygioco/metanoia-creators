import { getSanityImageUrl } from '../../lib/imageUrl.js'

function SanityImage({ image, alt, className = '', width = 1600, sizes }) {
  const src = getSanityImageUrl(image, width)

  if (!src) {
    return (
      <div
        className={`media-placeholder ${className}`.trim()}
        role="img"
        aria-label={alt || 'Image not provided'}
      >
        <span>{alt || 'Image not provided'}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt || image.alt || ''}
      loading="lazy"
      decoding="async"
      sizes={sizes}
    />
  )
}

export default SanityImage
