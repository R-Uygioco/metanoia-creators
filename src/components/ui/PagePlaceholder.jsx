import { usePageMeta } from '../../hooks/usePageMeta.js'
import './ui.css'

function PagePlaceholder({ title }) {
  usePageMeta(title)

  return (
    <section className="placeholder-page section container">
      <p className="section-heading__eyebrow">Under construction</p>
      <h1>{title}</h1>
      <p>This page is under construction.</p>
    </section>
  )
}

export default PagePlaceholder
