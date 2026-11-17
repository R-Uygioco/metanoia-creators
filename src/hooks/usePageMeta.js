import { useEffect } from 'react'
import { siteConfig } from '../lib/siteConfig.js'

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

export function usePageMeta(title, description = siteConfig.description) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`
    document.title = pageTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', pageTitle)
    setMeta('property', 'og:description', description)
  }, [description, title])
}
