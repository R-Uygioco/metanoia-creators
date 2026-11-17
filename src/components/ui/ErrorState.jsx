import './ui.css'

function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="state-message" role="alert">
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {onRetry && (
        <button className="button button--outline" type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorState
