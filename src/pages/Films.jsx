import FilmCard from '../components/films/FilmCard.jsx'
import '../components/films/films.css'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { filmsQuery } from '../lib/queries.js'

function Films() {
  const { data, isLoading, error, retry } = useSanityQuery(filmsQuery)
  const films = data || []

  usePageMeta(
    'Films',
    'Explore Metanoia Creators original films, festival selections, and approved public materials.',
  )

  return (
    <div className="films-page">
      <PageHeader
        eyebrow="Original productions"
        title="Films"
        description="Our original short films and competition entries. Festival showcase films are not published in full unless public release is approved."
      />
      <div className="films-page__content container">
        {isLoading ? (
          <Loader label="Loading published films" />
        ) : error ? (
          <ErrorState title="Films could not be loaded" message={error.message} onRetry={retry} />
        ) : films.length === 0 ? (
          <EmptyState title="No films published yet">Published film details will appear here.</EmptyState>
        ) : (
          <div className="film-grid">
            {films.map((film) => (
              <FilmCard film={film} key={film.slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Films
