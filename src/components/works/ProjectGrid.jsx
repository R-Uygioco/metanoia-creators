import EmptyState from '../ui/EmptyState.jsx'
import ProjectCard from './ProjectCard.jsx'

function ProjectGrid({ projects }) {
  if (projects.length === 0) {
    return (
      <EmptyState title="No projects in this category">
        Try another filter or return to all projects.
      </EmptyState>
    )
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid
