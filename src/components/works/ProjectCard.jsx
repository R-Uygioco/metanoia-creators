import { Link } from 'react-router-dom'
import SanityImage from '../media/SanityImage.jsx'

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <Link
        className="project-card__link"
        to={`/works/${project.slug}`}
        aria-label={`View project: ${project.title}`}
      >
        <SanityImage
          className="media-placeholder project-card__thumbnail"
          image={project.thumbnail}
          alt={project.thumbnail?.alt || `${project.title} thumbnail`}
          width={1000}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
        <div className="project-card__details">
          <p className="content-eyebrow">{project.category}</p>
          <h2>{project.title}</h2>
          <p className="project-card__meta">
            {project.client} <span aria-hidden="true">/</span> {project.year}
          </p>
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard
