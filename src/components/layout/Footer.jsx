import { Link } from 'react-router-dom'
import { siteConfig } from '../../lib/siteConfig.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <Link className="site-logo" to="/">
          {siteConfig.name}
        </Link>
        <p>{siteConfig.tagline}</p>
        <div className="site-footer__links">
          {siteConfig.contactEmail && (
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          )}
          {siteConfig.socialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
        <small>© {new Date().getFullYear()} {siteConfig.name}</small>
      </div>
    </footer>
  )
}

export default Footer
