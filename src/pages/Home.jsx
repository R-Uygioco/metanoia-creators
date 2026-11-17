import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import Loader from '../components/ui/Loader.jsx'
import SanityImage from '../components/media/SanityImage.jsx'
import useSanityQuery from '../hooks/useSanityQuery.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { homeQuery } from '../lib/queries.js'
import { siteConfig } from '../lib/siteConfig.js'
import heroImage from '../assets/637580717_1263112342577640_2208762383101995185_n.jpg'
import './Home.css'

function Home() {
  const { data, isLoading, error, retry } = useSanityQuery(homeQuery)
  const featuredProjects = data?.featuredProjects || []
  const filmRecognition = data?.filmRecognition
  const clientRecognition = data?.clientRecognition

  usePageMeta('', siteConfig.description)

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__inner container">
          <div className="home-hero__copy">
            <p className="home-eyebrow">Independent creative production · Butuan City, Philippines</p>
            <p className="home-brand">{siteConfig.name}</p>
            <h1 id="home-title">
              Independent Film Collective.
              <br />
              Creators of change.
            </h1>
            <p className="home-hero__description">
              We make short films, commercial videos, promotional campaigns, and other creative
              media.
            </p>
            <div className="home-hero__actions">
              <Button to="/works">Explore Our Works</Button>
              <Button to="/contact" variant="outline">
                Work With Us
              </Button>
            </div>
          </div>
          <img className="home-hero__visual" src={heroImage} />
          <a className="home-hero__scroll" href="#introduction">
            <span aria-hidden="true">↓</span>
            Scroll to explore
          </a>
        </div>
      </section>

      <section className="home-intro section container" id="introduction">
        <div className="home-intro__label">
          <p className="home-eyebrow">01 / Introduction</p>
        </div>
        <div className="home-intro__content">
          <SectionHeading>WE ARE METANOIA.</SectionHeading>
          <p>
            We bring storytelling, visual artistry, and creative filmmaking together to make
            meaningful films and media.
          </p>
        </div>
      </section>

      <section className="home-featured section">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">02 / Selected work</p>
              <SectionHeading>Featured Works</SectionHeading>
            </div>
            <Button to="/works" variant="outline">
              Explore All Works
            </Button>
          </div>
          {isLoading ? (
            <Loader label="Loading featured projects" />
          ) : error ? (
            <ErrorState title="Featured projects could not be loaded" message={error.message} onRetry={retry} />
          ) : featuredProjects.length === 0 ? (
            <EmptyState title="No featured projects published yet" />
          ) : (
            <>
              <p className="home-section-note">Selected published projects from our portfolio.</p>
              <div className="featured-placeholders">
                {featuredProjects.map((project) => (
                  <article className="featured-placeholder" key={project._id}>
                    <Link
                      className="featured-placeholder__link"
                      to={`/works/${project.slug}`}
                      aria-label={`View project: ${project.title}`}
                    >
                      <SanityImage
                        className="home-visual-placeholder featured-placeholder__visual"
                        image={project.thumbnail}
                        alt={project.thumbnail?.alt || `${project.title} thumbnail`}
                        width={1000}
                        sizes="(max-width: 560px) 100vw, 33vw"
                      />
                      <p className="home-eyebrow">{project.category}</p>
                      <h3>{project.title}</h3>
                      <p>{project.client} / {project.year || 'Year not specified'}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="home-recognition section container">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">03 / Recognition</p>
            <SectionHeading>Awards &amp; Recognition</SectionHeading>
          </div>
          <Button to="/recognition" variant="outline">
            View Recognition
          </Button>
        </div>
        {isLoading ? (
          <Loader label="Loading recognition" />
        ) : error ? (
          <ErrorState title="Recognition could not be loaded" message={error.message} onRetry={retry} />
        ) : (
          <div className="recognition-placeholders">
            <article className="recognition-placeholder">
              <p className="home-eyebrow">Metanoia film recognition</p>
              {filmRecognition ? (
                <>
                  <h3>{filmRecognition.title}</h3>
                  <p>{filmRecognition.organization} · {filmRecognition.year}</p>
                  <p>Awarded to: {filmRecognition.recipient}</p>
                </>
              ) : (
                <EmptyState title="No published film recognition" />
              )}
            </article>
            <article className="recognition-placeholder">
              <p className="home-eyebrow">Client project awards</p>
              {clientRecognition ? (
                <>
                  <h3>{clientRecognition.title}</h3>
                  <p>{clientRecognition.organization} · {clientRecognition.year}</p>
                  <p>Awarded to: {clientRecognition.recipient}</p>
                </>
              ) : (
                <EmptyState title="No published client project awards" />
              )}
            </article>
          </div>
        )}
      </section>

      <section className="home-about section">
        <div className="home-about__inner container">
          <div className="home-visual-placeholder home-about__visual" aria-hidden="true" />
          <div className="home-about__copy">
            <p className="home-eyebrow">04 / About</p>
            <SectionHeading>An independent creative group.</SectionHeading>
            <p>{data?.aboutIntroduction || siteConfig.description}</p>
            <Button to="/about" variant="outline">
              Get to Know Us
            </Button>
          </div>
        </div>
      </section>

      <section className="home-contact section container">
        <p className="home-eyebrow">05 / Contact</p>
        <h2>Have a story to tell?</h2>
        <p>Let’s talk about your next film, campaign, or creative project.</p>
        <Button to="/contact">Start a Project With Us</Button>
      </section>
    </>
  )
}

export default Home
