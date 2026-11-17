import SanityImage from '../media/SanityImage.jsx'

function AwardItem({ award }) {
  return (
    <article className="award-item">
      <div className="award-item__title">
        <p className="content-eyebrow">{award.organization}</p>
        <h3>{award.title}</h3>
        {award.description && <p>{award.description}</p>}
      </div>
      <dl className="award-item__details">
        <div>
          <dt>Category</dt>
          <dd>{award.category}</dd>
        </div>
        <div>
          <dt>Recipient type</dt>
          <dd>{award.recipientType}</dd>
        </div>
        <div>
          <dt>Related work</dt>
          <dd>{award.relatedWork?.title || 'Not specified'}</dd>
        </div>
        <div>
          <dt>Year</dt>
          <dd>{award.year}</dd>
        </div>
      </dl>
      <p className="award-item__recipient">
        Awarded to: <strong>{award.recipient}</strong>
      </p>
      {award.certificate && (
        <SanityImage
          className="award-item__certificate"
          image={award.certificate}
          alt={award.certificate.alt || `${award.title} certificate`}
          width={1000}
        />
      )}
    </article>
  )
}

export default AwardItem
