import { useParams } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import SanityImage from '../components/media/SanityImage.jsx'
import YouTubePlayer from '../components/media/YouTubePlayer.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { clientProjectBySlugQuery } from '../lib/queries.js'
import '../components/works/works.css'

function ProjectDetail() {
  const { slug } = useParams()
  const { data: project, isLoading, error, retry } = useSanityQuery(clientProjectBySlugQuery, { slug })

  usePageMeta(
    project?.title || 'Project Not Found',
    project?.description || 'The requested project could not be found.',
  )

  if (isLoading) {
    return <section className="detail-page section container"><Loader label="Loading published project" /></section>
  }

  if (error) {
    return (
      <section className="detail-page section container">
        <ErrorState title="Project could not be loaded" message={error.message} onRetry={retry} />
      </section>
    )
  }

  if (!project) {
    return (
      <section className="detail-page section container">
        <p className="content-eyebrow">404 — Project not found</p>
        <h1 className="detail-page__title">This project is unavailable.</h1>
        <Button to="/works" variant="outline">
          Return to Works
        </Button>
      </section>
    )
  }

  return (
    <article className="detail-page container">
      <div className="detail-page__top">
        <p className="content-eyebrow">{project.category}</p>
        <Button to="/works" variant="outline">
          Back to Works
        </Button>
      </div>
      <header className="detail-page__hero">
        <SanityImage
          className="media-placeholder"
          image={project.thumbnail}
          alt={project.thumbnail?.alt || `${project.title} thumbnail`}
        />
        <div>
          <p className="content-eyebrow">Client production</p>
          <h1 className="detail-page__title">{project.title}</h1>
          <p className="detail-page__description">{project.description}</p>
          <dl className="detail-page__meta">
            <div>
              <dt>Client / organization</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="detail-section" aria-labelledby="project-services">
        <h2 id="project-services">Services provided</h2>
        {project.services?.length ? (
          <ul className="detail-list detail-section__content">
            {project.services.map((service, index) => (
              <li key={`${service}-${index}`}>{service}</li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No services listed" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="project-video">
        <h2 id="project-video">Video</h2>
        {project.youtubeUrl ? (
          <YouTubePlayer
            key={project._id}
            url={project.youtubeUrl}
            title={project.title}
            thumbnail={project.thumbnail}
          />
        ) : (
          <EmptyState title="No approved public video available" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="project-credits">
        <h2 id="project-credits">Credits</h2>
        {project.credits?.length ? (
          <ul className="detail-list detail-section__content">
            {project.credits.map((credit, index) => (
              <li key={credit._key || `${credit.role}-${index}`}>
                <span className="detail-list__label">{credit.role}</span>
                <span>{credit.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No credits published" />
        )}
      </section>

      <section className="detail-section" aria-labelledby="project-awards">
        <h2 id="project-awards">Related awards</h2>
        {project.awards?.length ? (
          <ul className="detail-list detail-section__content">
            {project.awards.map((award) => (
              <li key={award._id}>
                <span>{award.title}</span>
                <span className="detail-list__label">Awarded to: {award.recipient}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No related awards published" />
        )}
      </section>
    </article>
  )
}

export default ProjectDetail
