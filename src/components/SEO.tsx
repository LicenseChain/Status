'use client'

import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  type?: 'website' | 'article'
}

export function SEO({ 
  title = 'LicenseChain Status',
  description = 'Real-time status monitoring of all LicenseChain services and infrastructure. Check service uptime, response times, and incident reports.',
  canonicalUrl
}: SEOProps) {
  const siteUrl = 'https://status.licensechain.app'
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl

  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'LicenseChain',
      url: 'https://licensechain.app',
      logo: 'https://status.licensechain.app/logo.webp',
      description: 'LicenseChain - Enterprise license management platform',
      sameAs: [
        'https://github.com/LicenseChain',
        'https://x.com/licensechainapp',
      ],
    }

    // WebSite Schema
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'LicenseChain Status',
      url: siteUrl,
      description: 'Real-time status monitoring of all LicenseChain services',
      publisher: {
        '@type': 'Organization',
        name: 'LicenseChain',
        logo: {
          '@type': 'ImageObject',
          url: 'https://status.licensechain.app/logo.webp',
        },
      },
    }

    // Service Status Page Schema
    const serviceStatusSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      url: fullUrl,
      publisher: {
        '@type': 'Organization',
        name: 'LicenseChain',
      },
      mainEntity: {
        '@type': 'Service',
        name: 'LicenseChain Services',
        provider: {
          '@type': 'Organization',
          name: 'LicenseChain',
        },
      },
    }

    // Add structured data scripts
    const addStructuredData = (schema: object, id: string) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = id
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    }

    // Remove existing structured data if present
    const existingOrg = document.getElementById('organization-schema')
    const existingSite = document.getElementById('website-schema')
    const existingPage = document.getElementById('service-status-schema')
    
    if (existingOrg) existingOrg.remove()
    if (existingSite) existingSite.remove()
    if (existingPage) existingPage.remove()

    // Add new structured data
    addStructuredData(organizationSchema, 'organization-schema')
    addStructuredData(websiteSchema, 'website-schema')
    addStructuredData(serviceStatusSchema, 'service-status-schema')
  }, [title, description, fullUrl])

  return null
}

