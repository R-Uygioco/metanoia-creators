import './ui.css'

function Loader({ label = 'Loading content' }) {
  return (
    <div className="loader" role="status">
      <span className="loader__mark" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default Loader
