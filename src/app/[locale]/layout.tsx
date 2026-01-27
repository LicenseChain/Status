import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://status.licensechain.app'
const defaultTitle = 'LicenseChain - Status Monitoring'
const defaultDescription = 'Real-time status monitoring of all LicenseChain services and infrastructure. Check service uptime, response times, and incident reports.'

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${defaultTitle}`,
  },
  description: defaultDescription,
  keywords: ['LicenseChain', 'status page', 'service status', 'uptime monitoring', 'system status', 'incident reporting', 'service health'],
  authors: [{ name: 'LicenseChain' }],
  creator: 'LicenseChain',
  publisher: 'LicenseChain',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'en': 'https://status.licensechain.app',
      'es': 'https://status.licensechain.app/es',
      'fr': 'https://status.licensechain.app/fr',
      'de': 'https://status.licensechain.app/de',
      'ru': 'https://status.licensechain.app/ru',
      'zh': 'https://status.licensechain.app/zh',
      'ja': 'https://status.licensechain.app/ja',
      'pt': 'https://status.licensechain.app/pt',
      'it': 'https://status.licensechain.app/it',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'LicenseChain - Status Monitoring',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'LicenseChain - Status Monitoring',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: '@licensechainapp',
    site: '@licensechainapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#9333ea' },
      { media: '(prefers-color-scheme: dark)', color: '#9333ea' },
    ],
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const finalLocale = locale || routing.defaultLocale

  if (!routing.locales.includes(finalLocale as (typeof routing.locales)[number])) {
    notFound()
  }

  const messages = await getMessages({ locale: finalLocale })

  return (
    <html lang={finalLocale} className="dark" suppressHydrationWarning>
      <head>
        {/* Hreflang tags for multi-language SEO */}
        {routing.locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${siteUrl}${loc === 'en' ? '' : `/${loc}`}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LicenseChain',
              url: 'https://licensechain.app',
              logo: `${siteUrl}/logo.png`,
              description: 'LicenseChain - Enterprise license management platform',
              sameAs: [
                'https://github.com/LicenseChain',
                'https://x.com/licensechainapp',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@licensechain.app',
                contactType: 'Customer Service',
              },
            }),
          }}
        />
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'LicenseChain - Status Monitoring',
              url: siteUrl,
              description: 'Real-time status monitoring of all LicenseChain services',
              publisher: {
                '@type': 'Organization',
                name: 'LicenseChain',
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/logo.png`,
                },
              },
            }),
          }}
        />
        {/* Structured Data - Service Status Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: defaultTitle,
              description: defaultDescription,
              url: siteUrl,
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
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
