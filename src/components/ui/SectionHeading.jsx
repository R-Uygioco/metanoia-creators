import './ui.css'

function SectionHeading({ eyebrow, children, className = '' }) {
  return (
    <div className={`section-heading${className ? ` ${className}` : ''}`}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2>{children}</h2>
    </div>
  )
}

export default SectionHeading
