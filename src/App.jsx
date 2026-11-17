import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Works from './pages/Works.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Films from './pages/Films.jsx'
import FilmDetail from './pages/FilmDetail.jsx'
import Recognition from './pages/Recognition.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="works" element={<Works />} />
        <Route path="works/:slug" element={<ProjectDetail />} />
        <Route path="films" element={<Films />} />
        <Route path="films/:slug" element={<FilmDetail />} />
        <Route path="recognition" element={<Recognition />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
