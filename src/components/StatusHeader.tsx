'use client'

import { Shield, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusHeaderProps {
  lastUpdated: string
  onRefresh: () => void
  isRefreshing: boolean
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

export function StatusHeader({ lastUpdated, onRefresh, isRefreshing, isDarkMode, onToggleDarkMode }: StatusHeaderProps) {
  return (
    <div className={cn(
      "sticky top-0 z-50 w-full glass border-b border-white/20 dark:border-white/10 shadow-lg"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold brand-gradient">LicenseChain Status</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={onToggleDarkMode}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

