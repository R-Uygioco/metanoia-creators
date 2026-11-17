export function isYouTubeUrl(value) {
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return false

    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    const path = url.pathname.replace(/\/+$/, '')
    const segments = path.split('/').filter(Boolean)
    let videoId = ''

    if (host === 'youtu.be') {
      if (segments.length === 1) videoId = segments[0]
    } else if (['youtube.com', 'm.youtube.com'].includes(host) && path === '/watch') {
      videoId = url.searchParams.get('v') || ''
    } else if (
      ['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host) &&
      segments.length === 2 &&
      ['embed', 'shorts'].includes(segments[0]) &&
      (host !== 'youtube-nocookie.com' || segments[0] === 'embed')
    ) {
      videoId = segments[1]
    }

    return /^[A-Za-z0-9_-]{11}$/.test(videoId)
  } catch {
    return false
  }
}

export function isHttpsUrl(value) {
  if (typeof value !== 'string') return false

  try {
    const url = new URL(value)
    return url.protocol === 'https:' && Boolean(url.hostname)
  } catch {
    return false
  }
}

export const imageWithAlt = (name, title) => ({
  name,
  title,
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    },
  ],
})

export const creditList = {
  name: 'credits',
  title: 'Production credits',
  type: 'array',
  of: [
    {
      name: 'credit',
      title: 'Credit',
      type: 'object',
      fields: [
        { name: 'role', title: 'Role', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
      ],
      preview: { select: { title: 'name', subtitle: 'role' } },
    },
  ],
}
