import { getFilmPublicationDetails } from '../../lib/portfolioData.js'

function FilmStatusBadge({ status }) {
  const { label } = getFilmPublicationDetails(status)

  return <span className="film-status">{label}</span>
}

export default FilmStatusBadge
