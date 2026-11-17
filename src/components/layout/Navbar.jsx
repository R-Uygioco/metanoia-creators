import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navigation } from '../../lib/navigation.js'
import { siteConfig } from '../../lib/siteConfig.js'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus && window.innerWidth <= 860) menuToggleRef.current?.focus()
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        if (window.innerWidth <= 860) menuToggleRef.current?.focus()
      }
    }
    const handleResize = () => {
      if (window.innerWidth > 860) setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <NavLink className="site-logo" to="/" aria-label={`${siteConfig.name} home`}>
          {siteConfig.name}
        </NavLink>
        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle__icon" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          className={`primary-navigation${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => closeMenu(true)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
