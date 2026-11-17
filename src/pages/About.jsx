import PageHeader from '../components/ui/PageHeader.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import SanityImage from '../components/media/SanityImage.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { siteConfig } from '../lib/siteConfig.js'
import { aboutQuery } from '../lib/queries.js'
import './About.css'

function About() {
  const { data, isLoading, error, retry } = useSanityQuery(aboutQuery)
  const pageContent = data?.pageContent || {}
  const services = data?.services || []
  const teamMembers = data?.teamMembers || []

  usePageMeta('About', siteConfig.description)

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An independent creative group."
        description={
          pageContent.introduction || siteConfig.description
        }
      />

      <section className="about-introduction section container" aria-labelledby="about-intro-title">
        <p className="content-eyebrow">01 / Our background</p>
        <div>
          <h2 id="about-intro-title">A story still being told.</h2>
          <p>
            {pageContent.background || siteConfig.description}
          </p>
        </div>
      </section>

      <section className="about-philosophy section" aria-labelledby="about-philosophy-title">
        <div className="container about-philosophy__inner">
          <p className="content-eyebrow">02 / Creative philosophy</p>
          <div>
            <h2 id="about-philosophy-title">Stories that move. Films that matter.</h2>
            <p>
              {pageContent.creativePhilosophy || siteConfig.tagline}
            </p>
          </div>
          {pageContent.behindTheScenes?.length ? (
            <div className="about-behind-scenes">
              {pageContent.behindTheScenes.map((image) => (
                <SanityImage
                  className="about-image-placeholder"
                  image={image}
                  alt={image.alt}
                  key={image._key}
                  width={1200}
                />
              ))}
            </div>
          ) : (
            <div className="about-image-placeholder" aria-hidden="true" />
          )}
        </div>
      </section>

      {(pageContent.mission || pageContent.vision) && (
        <section className="about-mission section container" aria-label="Mission and vision">
          {pageContent.mission && (
            <div>
              <p className="content-eyebrow">Mission</p>
              <p>{pageContent.mission}</p>
            </div>
          )}
          {pageContent.vision && (
            <div>
              <p className="content-eyebrow">Vision</p>
              <p>{pageContent.vision}</p>
            </div>
          )}
        </section>
      )}

      {pageContent.productionApproach && (
        <section className="about-practice section container" aria-labelledby="about-practice-title">
          <p className="content-eyebrow">03 / Production approach</p>
          <div className="about-practice__content">
            <h2 id="about-practice-title">From first idea to final frame.</h2>
            <p>{pageContent.productionApproach}</p>
          </div>
        </section>
      )}

      <section className="about-services section container" aria-labelledby="about-services-title">
        <p className="content-eyebrow">04 / Services</p>
        <div className="about-services__content">
          <h2 id="about-services-title">What we do.</h2>
          {isLoading ? (
            <Loader label="Loading published services" />
          ) : error ? (
            <ErrorState title="Services could not be loaded" message={error.message} onRetry={retry} />
          ) : services.length === 0 ? (
            <EmptyState title="No services published yet" />
          ) : (
            <div className="about-service-grid">
              {services.map((service) => (
                <article className="about-service-card" key={service._id}>
                  {service.featuredImage && (
                    <SanityImage
                      className="about-service-card__image"
                      image={service.featuredImage}
                      alt={service.featuredImage.alt || service.name}
                      width={900}
                    />
                  )}
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="about-team section" aria-labelledby="about-team-title">
        <div className="container">
          <p className="content-eyebrow">05 / The team</p>
          <h2 id="about-team-title">The people behind the work.</h2>
          {isLoading ? (
            <Loader label="Loading published team members" />
          ) : error ? (
            <ErrorState title="Team members could not be loaded" message={error.message} onRetry={retry} />
          ) : teamMembers.length === 0 ? (
            <EmptyState title="No team members published yet">
              Team profiles will appear here when approved.
            </EmptyState>
          ) : (
            <div className="about-team-grid">
              {teamMembers.map((member) => (
                <article className="about-team-card" key={member._id}>
                  <SanityImage
                    className="about-team-card__photo"
                    image={member.photo}
                    alt={member.photo?.alt || `${member.name} photo`}
                    width={900}
                  />
                  <p className="content-eyebrow">{member.position}</p>
                  <h3>{member.name}</h3>
                  {member.bio && <p>{member.bio}</p>}
                  {member.socialLinks?.length > 0 && (
                    <ul className="about-team-card__links">
                      {member.socialLinks.map((link) => (
                        <li key={link._key}>
                          <a href={link.url} target="_blank" rel="noreferrer">
                            {link.platform}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default About
