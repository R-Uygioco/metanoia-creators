const env = import.meta.env

export const siteConfig = {
  name: 'METANOIA CREATORS',
  tagline: 'Stories That Move. Films That Matter.',
  description:
    'Metanoia Creators is an independent film and creative production group based in Butuan City, Philippines.',
  contactEmail: env.VITE_CONTACT_EMAIL || '',
  socialLinks: [
    { label: 'Facebook', url: env.VITE_FACEBOOK_URL || '' },
    { label: 'Instagram', url: env.VITE_INSTAGRAM_URL || '' },
    { label: 'YouTube', url: env.VITE_YOUTUBE_URL || '' },
  ].filter((link) => link.url),
}
