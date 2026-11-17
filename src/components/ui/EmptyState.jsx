import './ui.css'

function EmptyState({ title = 'Nothing here yet', children }) {
  return (
    <div className="state-message">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  )
}

export default EmptyState
