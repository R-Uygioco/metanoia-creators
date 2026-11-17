import EmptyState from '../ui/EmptyState.jsx'

function FestivalTimeline({ entries }) {
  if (!entries?.length) {
    return (
      <EmptyState title="No published festival milestones">
        Festival journey details will appear here when published.
      </EmptyState>
    )
  }

  return (
    <ol className="film-timeline">
      {entries.map((entry) => (
        <li className="film-timeline__entry" key={entry._key}>
          {entry.date && <p className="content-eyebrow">{entry.date}</p>}
          <h3>{entry.title}</h3>
          {entry.description && <p>{entry.description}</p>}
        </li>
      ))}
    </ol>
  )
}

export default FestivalTimeline
