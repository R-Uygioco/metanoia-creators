const inquiryTypes = new Set([
  'Film Production',
  'Commercial Production',
  'Event Coverage',
  'Creative Collaboration',
  'Sponsorship',
  'Other',
])

function respond(res, status, body) {
  return res.status(status).json(body)
}

function asString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeText(value) {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}

function validateContact(body) {
  const fieldErrors = {}
  const contact = {
    fullName: asString(body.fullName),
    email: asString(body.email),
    organization: asString(body.organization),
    inquiryType: asString(body.inquiryType),
    projectDescription: asString(body.projectDescription),
    estimatedBudget: asString(body.estimatedBudget),
    preferredContactMethod: asString(body.preferredContactMethod),
    phone: asString(body.phone),
  }

  if (!contact.fullName || contact.fullName.length > 120) {
    fieldErrors.fullName = 'Enter your name (up to 120 characters).'
  }
  if (
    contact.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
  ) {
    fieldErrors.email = 'Enter a valid email address.'
  }
  if (contact.organization.length > 160) {
    fieldErrors.organization = 'Use 160 characters or fewer.'
  }
  if (!inquiryTypes.has(contact.inquiryType)) {
    fieldErrors.inquiryType = 'Select one of the listed inquiry types.'
  }
  if (contact.projectDescription.length < 10 || contact.projectDescription.length > 5000) {
    fieldErrors.projectDescription = 'Enter 10 to 5,000 characters.'
  }
  if (contact.estimatedBudget.length > 120) {
    fieldErrors.estimatedBudget = 'Use 120 characters or fewer.'
  }
  if (!['email', 'phone'].includes(contact.preferredContactMethod)) {
    fieldErrors.preferredContactMethod = 'Select email or phone.'
  }
  if (
    contact.preferredContactMethod === 'phone' &&
    !/^\+?[0-9\s().-]{7,30}$/.test(contact.phone)
  ) {
    fieldErrors.phone = 'Enter a valid phone number.'
  }

  return { contact, fieldErrors }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return respond(res, 405, { error: 'Method not allowed.' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return respond(res, 400, { error: 'Invalid request body.' })
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respond(res, 400, { error: 'Invalid request body.' })
  }

  if (asString(body.website)) {
    return respond(res, 200, { ok: true })
  }

  const { contact, fieldErrors } = validateContact(body)
  if (Object.keys(fieldErrors).length > 0) {
    return respond(res, 400, {
      error: 'Please review the highlighted fields and try again.',
      fieldErrors,
    })
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error('Contact service configuration is incomplete.')
    return respond(res, 503, {
      error: 'The contact service is not configured. Please try again later.',
    })
  }

  const message = [
    `Name: ${escapeText(contact.fullName)}`,
    `Email: ${escapeText(contact.email)}`,
    `Organization: ${escapeText(contact.organization || 'Not provided')}`,
    `Inquiry type: ${contact.inquiryType}`,
    `Preferred contact method: ${contact.preferredContactMethod}`,
    ...(contact.phone ? [`Phone: ${escapeText(contact.phone)}`] : []),
    `Estimated budget: ${escapeText(contact.estimatedBudget || 'Not provided')}`,
    '',
    'Project description:',
    escapeText(contact.projectDescription),
  ].join('\n')

  let emailResponse
  try {
    emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: contact.email,
        subject: `New ${contact.inquiryType} inquiry`,
        text: message,
      }),
    })
  } catch {
    console.error('Contact email provider request failed.')
    return respond(res, 502, {
      error: 'We could not send your inquiry right now. Please try again later.',
    })
  }

  if (!emailResponse.ok) {
    console.error(`Contact email provider returned status ${emailResponse.status}.`)
    return respond(res, 502, {
      error: 'We could not send your inquiry right now. Please try again later.',
    })
  }

  return respond(res, 200, { ok: true })
}
