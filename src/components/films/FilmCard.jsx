import { Link } from 'react-router-dom'
import SanityImage from '../media/SanityImage.jsx'
import FilmStatusBadge from './FilmStatusBadge.jsx'

function FilmCard({ film }) {
  return (
    <article className="film-card">
      <Link
        className="film-card__link"
        to={`/films/${film.slug}`}
        aria-label={`View film: ${film.title}`}
      >
        <SanityImage
          className="media-placeholder film-card__poster"
          image={film.thumbnail || film.poster}
          alt={film.thumbnail?.alt || film.poster?.alt || `${film.title} poster`}
          width={800}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className="film-card__details">
          <div className="film-card__status">
            <p className="content-eyebrow">Original film</p>
            <FilmStatusBadge status={film.publicationStatus} />
          </div>
          <h2>{film.title}</h2>
          <p>{film.logline}</p>
        </div>
      </Link>
    </article>
  )
}

export default FilmCard
