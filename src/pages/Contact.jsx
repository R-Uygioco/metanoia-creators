import ContactForm from '../components/contact/ContactForm.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { siteConfig } from '../lib/siteConfig.js'
import './Contact.css'

function Contact() {
  usePageMeta('Contact', 'Contact Metanoia Creators about production, partnerships, or sponsorships.')

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Have a story to tell?"
        description="Tell us a little about your project, production inquiry, partnership, or sponsorship."
      />
      <section className="contact-content section container" aria-label="Contact Metanoia Creators">
        <div className="contact-details">
          <p className="content-eyebrow">Start a conversation</p>
          <h2>Let’s make something meaningful.</h2>
          <p>
            Share what you have in mind and the team will follow up using your preferred contact
            method.
          </p>
          {siteConfig.contactEmail && (
            <div className="contact-details__item">
              <h3>Email</h3>
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </div>
          )}
          {siteConfig.socialLinks.length > 0 && (
            <div className="contact-details__item">
              <h3>Social</h3>
              <ul>
                {siteConfig.socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ContactForm />
      </section>
    </>
  )
}

export default Contact
