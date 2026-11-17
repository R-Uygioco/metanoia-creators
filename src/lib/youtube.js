const youtubeHosts = new Set(['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'])
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/

export function parseYouTubeId(value) {
  if (typeof value !== 'string' || !value.trim()) return null

  try {
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port
    ) {
      return null
    }

    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    if (!youtubeHosts.has(host)) return null

    const path = url.pathname.replace(/\/+$/, '')
    const segments = path.split('/').filter(Boolean)
    let videoId = null

    if (host === 'youtu.be') {
      if (segments.length === 1) videoId = segments[0]
    } else if (['youtube.com', 'm.youtube.com'].includes(host) && path === '/watch') {
      videoId = url.searchParams.get('v')
    } else if (
      segments.length === 2 &&
      ['embed', 'shorts'].includes(segments[0]) &&
      (host !== 'youtube-nocookie.com' || segments[0] === 'embed')
    ) {
      videoId = segments[1]
    }

    return videoId && videoIdPattern.test(videoId) ? videoId : null
  } catch {
    return null
  }
}
