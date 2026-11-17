import { useState } from 'react'
import Button from '../ui/Button.jsx'
import './contact.css'

const inquiryTypes = [
  'Film Production',
  'Commercial Production',
  'Event Coverage',
  'Creative Collaboration',
  'Sponsorship',
  'Other',
]

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [preferredContactMethod, setPreferredContactMethod] = useState('email')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.reportValidity()) return

    setIsSubmitting(true)
    setFeedback({ type: '', message: '' })
    setFieldErrors({})

    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()

      if (!response.ok) {
        setFieldErrors(result.fieldErrors || {})
        setFeedback({
          type: 'error',
          message: result.error || 'We could not send your message. Please try again.',
        })
        return
      }

      form.reset()
      setPreferredContactMethod('email')
      setFeedback({
        type: 'success',
        message: 'Thank you. Your inquiry has been sent.',
      })
    } catch {
      setFeedback({
        type: 'error',
        message: 'We could not connect to the contact service. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  function fieldError(name) {
    return fieldErrors[name] ? (
      <span className="contact-form__error" id={`${name}-error`}>
        {fieldErrors[name]}
      </span>
    ) : null
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      <div className="contact-form__field">
        <label htmlFor="fullName">Full name <span aria-hidden="true">*</span></label>
        <input
          id="fullName"
          name="fullName"
          autoComplete="name"
          maxLength="120"
          required
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
        />
        {fieldError('fullName')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength="254"
          required
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldError('email')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="organization">Organization <span className="contact-form__optional">(optional)</span></label>
        <input
          id="organization"
          name="organization"
          autoComplete="organization"
          maxLength="160"
          aria-invalid={Boolean(fieldErrors.organization)}
          aria-describedby={fieldErrors.organization ? 'organization-error' : undefined}
        />
        {fieldError('organization')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="inquiryType">Inquiry type <span aria-hidden="true">*</span></label>
        <select
          id="inquiryType"
          name="inquiryType"
          required
          defaultValue=""
          aria-invalid={Boolean(fieldErrors.inquiryType)}
          aria-describedby={fieldErrors.inquiryType ? 'inquiryType-error' : undefined}
        >
          <option value="" disabled>Select an inquiry type</option>
          {inquiryTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {fieldError('inquiryType')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="projectDescription">Project description <span aria-hidden="true">*</span></label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          rows="6"
          minLength="10"
          maxLength="5000"
          required
          aria-invalid={Boolean(fieldErrors.projectDescription)}
          aria-describedby={fieldErrors.projectDescription ? 'projectDescription-error' : undefined}
        />
        {fieldError('projectDescription')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="estimatedBudget">
          Estimated budget <span className="contact-form__optional">(optional)</span>
        </label>
        <input
          id="estimatedBudget"
          name="estimatedBudget"
          maxLength="120"
          placeholder="Share a range, or leave blank"
          aria-invalid={Boolean(fieldErrors.estimatedBudget)}
          aria-describedby={fieldErrors.estimatedBudget ? 'estimatedBudget-error' : undefined}
        />
        {fieldError('estimatedBudget')}
      </div>

      <div className="contact-form__field">
        <label htmlFor="preferredContactMethod">Preferred contact method <span aria-hidden="true">*</span></label>
        <select
          id="preferredContactMethod"
          name="preferredContactMethod"
          value={preferredContactMethod}
          onChange={(event) => setPreferredContactMethod(event.target.value)}
          required
          aria-invalid={Boolean(fieldErrors.preferredContactMethod)}
          aria-describedby={
            fieldErrors.preferredContactMethod ? 'preferredContactMethod-error' : undefined
          }
        >
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        {fieldError('preferredContactMethod')}
      </div>

      {preferredContactMethod === 'phone' && (
        <div className="contact-form__field">
          <label htmlFor="phone">Phone number <span aria-hidden="true">*</span></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength="30"
            pattern="^\+?[0-9\s().-]{7,30}$"
            required
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
          />
          {fieldError('phone')}
        </div>
      )}

      {feedback.message && (
        <p
          className={`contact-form__feedback contact-form__feedback--${feedback.type}`}
          role={feedback.type === 'error' ? 'alert' : 'status'}
          aria-live={feedback.type === 'error' ? 'assertive' : 'polite'}
        >
          {feedback.message}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send Inquiry'}
      </Button>
    </form>
  )
}

export default ContactForm
