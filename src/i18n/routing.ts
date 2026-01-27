import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // Supported locales
  locales: ['en', 'es', 'fr', 'de', 'ru', 'zh', 'ja', 'pt', 'it'],
  
  // Default locale (English)
  defaultLocale: 'en',
  
  // Locale prefix strategy
  // 'as-needed' means only add prefix for non-default locale
  localePrefix: 'as-needed',
});

// Create navigation helpers
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
