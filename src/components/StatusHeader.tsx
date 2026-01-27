'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sun, Moon, Globe, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter, usePathname } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { useLocale } from 'next-intl'

interface StatusHeaderProps {
  lastUpdated: string
  onRefresh: () => void
  isRefreshing: boolean
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

const localeNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  pt: 'Português',
  it: 'Italiano',
}

export function StatusHeader({ isDarkMode, onToggleDarkMode }: StatusHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode
    onToggleDarkMode()
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  const handleLanguageChange = (newLocale: string) => {
    setIsLanguageMenuOpen(false)
    router.push(pathname, { locale: newLocale })
  }

  // Close language menu when clicking outside
  useEffect(() => {
    if (!isLanguageMenuOpen) return
    
    const handleClickOutside = () => setIsLanguageMenuOpen(false)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isLanguageMenuOpen])

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 w-full glass border-b border-white/20 dark:border-white/10 shadow-lg"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center">
              <div className="relative h-10 w-10 flex items-center justify-center">
                <Image
                  src="/favicon.svg"
                  alt="LicenseChain"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsLanguageMenuOpen(!isLanguageMenuOpen)
                }}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Change language"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{localeNames[locale] || 'English'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isLanguageMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  />
                  <div 
                    className="absolute right-0 mt-2 w-48 rounded-lg bg-background border border-border shadow-lg z-20 py-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleLanguageChange(loc)}
                        className={cn(
                          "w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors",
                          locale === loc && "bg-accent font-medium"
                        )}
                      >
                        {localeNames[loc]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={handleToggleDarkMode}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

