import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import FestivalTimeline from '../components/films/FestivalTimeline.jsx'
import FilmStatusBadge from '../components/films/FilmStatusBadge.jsx'
import SanityImage from '../components/media/SanityImage.jsx'
import YouTubePlayer from '../components/media/YouTubePlayer.jsx'
import '../components/films/films.css'
import '../components/works/works.css'
import { usePageMeta } from '../hooks/usePageMeta.js'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { filmBySlugQuery } from '../lib/queries.js'
import { getFilmPublicationDetails } from '../lib/portfolioData.js'

function FilmDetail() {
  const { slug } = useParams()
  const { data: film, isLoading, error, retry } = useSanityQuery(filmBySlugQuery, { slug })
  const publication = getFilmPublicationDetails(film?.publicationStatus)

  usePageMeta(
    film?.title || 'Film Not Found',
    film?.logline || 'The requested film could not be found.',
  )

  if (isLoading) {
    return <section className="detail-page section container"><Loader label="Loading published film" /></section>
  }

  if (error) {
    return (
      <section className="detail-page section container">
        <ErrorState title="Film could not be loaded" message={error.message} onRetry={retry} />
      </section>
    )
  }

  if (!film) {
    return (
      <section className="detail-page section container">
        <p className="content-eyebrow">404 — Film not found</p>
        <h1 className="detail-page__title">This film is unavailable.</h1>
        <Button to="/films" variant="outline">
          Return to Films
        </Button>
      </section>
    )
  }

  return (
    <article className="detail-page container">
      <div className="detail-page__top">
        <FilmStatusBadge status={film.publicationStatus} />
        <Button to="/films" variant="outline">
          Back to Films
        </Button>
      </div>
      <header className="detail-page__hero">
        <SanityImage
          className="media-placeholder film-detail__poster"
          image={film.poster}
          alt={film.poster?.alt || `${film.title} poster`}
          width={900}
        />
        <div>
          <p className="content-eyebrow">Original film</p>
          <h1 className="detail-page__title">{film.title}</h1>
          <p className="film-detail__logline">{film.logline}</p>
          <dl className="detail-page__meta">
            <div>
              <dt>Director</dt>
              <dd>{film.director}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{film.year}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="detail-section" aria-labelledby="film-synopsis">
        <h2 id="film-synopsis">Synopsis</h2>
        <p className="detail-section__content">{film.synopsis}</p>
      </section>

      <section className="detail-section" aria-labelledby="film-publication">
        <h2 id="film-publication">Publication status</h2>
        {publication.videoMode === 'none' ? (
          <p className="detail-note">
            Festival Showcase Only: the page shows approved promotional materials, never the full
            film.
          </p>
        ) : film.youtubeUrl ? (
          <YouTubePlayer
            key={film._id}
            url={film.youtubeUrl}
            title={
              publication.videoMode === 'trailer'
                ? `${film.title} approved trailer`
                : film.title
            }
            thumbnail={film.thumbnail || film.poster}
          />
        ) : (
          <EmptyState title="No approved public video available">
            This film’s publication status permits a video, but no valid URL is available.
          </EmptyState>
        )}
      </section>

      <section className="detail-section" aria-labelledby="film-credits">
        <h2 id="film-credits">Production credits</h2>
        {film.credits?.length ? (
          <ul className="detail-list detail-section__content">
            {film.credits.map((credit, index) => (
              <li key={credit._key || `${credit.role}-${index}`}>
                <span className="detail-list__label">{credit.role}</span>
                <span>{credit.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No credits published" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="film-selections">
        <h2 id="film-selections">Official selections</h2>
        {film.festivalSelections?.length ? (
          <ul className="detail-list detail-section__content">
            {film.festivalSelections.map((selection, index) => (
              <li key={selection._key || `${selection.festival}-${index}`}>
                <span>{selection.festival}{selection.title ? ` — ${selection.title}` : ''}</span>
                {selection.year && <span className="detail-list__label">{selection.year}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No published festival selections" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="film-awards">
        <h2 id="film-awards">Awards and nominations</h2>
        {film.awards?.length ? (
          <ul className="detail-list detail-section__content">
            {film.awards.map((award) => (
              <li key={award._id}>
                <span>{award.title}</span>
                <span className="detail-list__label">Awarded to: {award.recipient}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No published awards or nominations" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="film-stills">
        <h2 id="film-stills">Stills and behind the scenes</h2>
        {(film.stills?.length || 0) + (film.behindTheScenes?.length || 0) === 0 ? (
          <EmptyState title="No published images">
            Film stills and behind-the-scenes photos will appear here when published.
          </EmptyState>
        ) : (
          <div className="film-image-gallery">
            {(film.stills || []).map((image) => (
              <SanityImage
                className="media-placeholder"
                image={image}
                alt={image.alt}
                key={`still-${image._key}`}
                width={1000}
              />
            ))}
            {(film.behindTheScenes || []).map((image) => (
              <SanityImage
                className="media-placeholder"
                image={image}
                alt={image.alt}
                key={`behind-${image._key}`}
                width={1000}
              />
            ))}
          </div>
        )}
      </section>

      <section className="detail-section" aria-labelledby="film-journey">
        <h2 id="film-journey">Festival journey</h2>
        <FestivalTimeline entries={film.festivalJourney} />
      </section>
    </article>
  )
}

export default FilmDetail
