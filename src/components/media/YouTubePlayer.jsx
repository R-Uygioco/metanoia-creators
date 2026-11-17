import { useState } from 'react'
import { getSanityImageUrl } from '../../lib/imageUrl.js'
import { parseYouTubeId } from '../../lib/youtube.js'
import './youtube-player.css'

function YouTubePlayer({ url, title, thumbnail }) {
  const videoId = parseYouTubeId(url)
  const [activeVideoId, setActiveVideoId] = useState(null)
  const thumbnailUrl = getSanityImageUrl(thumbnail, 1280)

  if (!videoId) {
    return (
      <div className="youtube-player youtube-player--unavailable" role="status">
        <p>This video is unavailable.</p>
      </div>
    )
  }

  if (activeVideoId === videoId) {
    return (
      <div className="youtube-player">
        <iframe
          key={videoId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
          title={`${title} — YouTube video player`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className="youtube-player">
      <button
        className="youtube-player__facade"
        type="button"
        onClick={() => setActiveVideoId(videoId)}
        aria-label={`Play ${title} video. Playback starts muted.`}
      >
        {thumbnailUrl ? (
          <img
            className="youtube-player__thumbnail"
            src={thumbnailUrl}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="youtube-player__thumbnail-fallback" aria-hidden="true">
            Video preview
          </span>
        )}
        <span className="youtube-player__play-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M8 5.5v13l10-6.5z" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default YouTubePlayer
