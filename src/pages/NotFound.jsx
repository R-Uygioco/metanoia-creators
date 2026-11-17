import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../components/ui/ui.css'

function NotFound() {
  usePageMeta('Page Not Found')

  return (
    <section className="placeholder-page section container">
      <p className="section-heading__eyebrow">404 — Page not found</p>
      <h1>Lost in the edit?</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="button button--outline" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFound
