import EmptyState from '../ui/EmptyState.jsx'
import AwardItem from './AwardItem.jsx'

function AwardGroup({ group }) {
  return (
    <section className="award-group" aria-labelledby={`award-group-${group.id}`}>
      <h2 id={`award-group-${group.id}`}>{group.title}</h2>
      {group.entries.length === 0 ? (
        <EmptyState title="No published entries in this group" />
      ) : (
        <div className="award-group__entries">
          {group.entries.map((award) => (
            <AwardItem award={award} key={award._id || award.id} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AwardGroup
