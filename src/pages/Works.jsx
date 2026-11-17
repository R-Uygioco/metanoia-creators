import { useState } from 'react'
import CategoryFilter from '../components/works/CategoryFilter.jsx'
import ProjectGrid from '../components/works/ProjectGrid.jsx'
import '../components/works/works.css'
import PageHeader from '../components/ui/PageHeader.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { clientProjectsQuery } from '../lib/queries.js'
import { workCategories } from '../lib/portfolioData.js'

function Works() {
  const [selectedCategory, setSelectedCategory] = useState('All Projects')
  const { data, isLoading, error, retry } = useSanityQuery(clientProjectsQuery)
  const clientProjects = data || []
  const projects =
    (clientProjects || []).filter(
      (project) => selectedCategory === 'All Projects' || project.category === selectedCategory,
    )

  usePageMeta(
    'Our Works',
    'Explore Metanoia Creators films, commercial productions, and creative media.',
  )

  return (
    <div className="works-page">
      <PageHeader
        eyebrow="Portfolio"
        title="Our Works"
        description="A selection of films, client productions, and creative projects."
      />
      <div className="works-page__content container">
        <CategoryFilter
          categories={workCategories}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        {isLoading ? (
          <Loader label="Loading published projects" />
        ) : error ? (
          <ErrorState title="Projects could not be loaded" message={error.message} onRetry={retry} />
        ) : clientProjects.length === 0 ? (
          <EmptyState title="No projects published yet">
            Published client projects will appear here.
          </EmptyState>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </div>
  )
}

export default Works
