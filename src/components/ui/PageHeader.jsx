import './ui.css'

function PageHeader({ eyebrow, title, description }) {
  return (
    <header className="page-header container">
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="page-header__description">{description}</p>}
    </header>
  )
}

export default PageHeader
