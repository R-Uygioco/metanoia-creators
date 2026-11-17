import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import './layout.css'

function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
