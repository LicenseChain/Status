import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteUrl = 'https://status.licensechain.app'

// Locale to OpenGraph locale mapping
const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ru: 'ru_RU',
  zh: 'zh_CN',
  ja: 'ja_JP',
  pt: 'pt_BR',
  it: 'it_IT',
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const finalLocale = locale || routing.defaultLocale

  if (!routing.locales.includes(finalLocale as (typeof routing.locales)[number])) {
    notFound()
  }

  const t = await getTranslations({ locale: finalLocale, namespace: 'status' })
  const title = t('title')
  const description = t('description')
  const currentUrl = `${siteUrl}${finalLocale === 'en' ? '' : `/${finalLocale}`}`

  // Generate locale-specific keywords
  const keywords = [
    'LicenseChain',
    finalLocale === 'en' ? 'status page' : 
    finalLocale === 'es' ? 'página de estado' :
    finalLocale === 'fr' ? 'page de statut' :
    finalLocale === 'de' ? 'Statusseite' :
    finalLocale === 'ru' ? 'страница статуса' :
    finalLocale === 'zh' ? '状态页面' :
    finalLocale === 'ja' ? 'ステータスページ' :
    finalLocale === 'pt' ? 'página de status' :
    'pagina di stato',
    'service status',
    'uptime monitoring',
    'system status',
    'incident reporting',
    'service health',
  ]

  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords,
    authors: [{ name: 'LicenseChain' }],
    creator: 'LicenseChain',
    publisher: 'LicenseChain',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${siteUrl}`,
        'es': `${siteUrl}/es`,
        'fr': `${siteUrl}/fr`,
        'de': `${siteUrl}/de`,
        'ru': `${siteUrl}/ru`,
        'zh': `${siteUrl}/zh`,
        'ja': `${siteUrl}/ja`,
        'pt': `${siteUrl}/pt`,
        'it': `${siteUrl}/it`,
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[finalLocale] || 'en_US',
      url: currentUrl,
      siteName: title,
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      alternateLocale: routing.locales
        .filter(loc => loc !== finalLocale)
        .map(loc => ogLocaleMap[loc] || loc),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
        { url: '/icon.ico', sizes: 'any' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  }
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
  const t = await getTranslations({ locale: finalLocale, namespace: 'status' })
  const title = t('title')
  const description = t('description')
  const currentUrl = `${siteUrl}${finalLocale === 'en' ? '' : `/${finalLocale}`}`

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
        
        {/* Structured Data - Organization (locale-aware) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LicenseChain',
              url: 'https://licensechain.app',
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/logo.webp`,
              },
              description: 'LicenseChain - Enterprise license management platform',
              sameAs: [
                'https://github.com/LicenseChain',
                'https://x.com/licensechainapp',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'support@licensechain.app',
                contactType: 'Customer Service',
                availableLanguage: routing.locales,
              },
            }),
          }}
        />
        
        {/* Structured Data - WebSite (locale-aware) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: title,
              url: siteUrl,
              description,
              inLanguage: finalLocale,
              publisher: {
                '@type': 'Organization',
                name: 'LicenseChain',
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/logo.webp`,
                },
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        
        {/* Structured Data - Service Status Page (locale-aware) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: title,
              description,
              url: currentUrl,
              inLanguage: finalLocale,
              isPartOf: {
                '@type': 'WebSite',
                name: 'LicenseChain Status',
                url: siteUrl,
              },
              publisher: {
                '@type': 'Organization',
                name: 'LicenseChain',
              },
              mainEntity: {
                '@type': 'Service',
                name: 'LicenseChain Services',
                description,
                provider: {
                  '@type': 'Organization',
                  name: 'LicenseChain',
                },
                areaServed: 'Worldwide',
                availableChannel: {
                  '@type': 'ServiceChannel',
                  serviceUrl: currentUrl,
                  availableLanguage: routing.locales,
                },
              },
            }),
          }}
        />
        
        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: title,
                  item: currentUrl,
                },
              ],
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
