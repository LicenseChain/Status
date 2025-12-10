'use client'

import { Activity, RefreshCw, Shield, Clock, Sun, Moon } from 'lucide-react'
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold brand-gradient">LicenseChain Status</h1>
              <p className="text-xs text-muted-foreground">Real-time monitoring of all our services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right px-4 py-2 rounded-lg glass-card dark:glass-card-dark">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Last updated</span>
              </div>
              <p className="text-xs font-medium text-foreground">{lastUpdated}</p>
            </div>
            
            <button
              onClick={onToggleDarkMode}
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <RefreshCw className={cn('h-4 w-4 mr-2', isRefreshing ? 'animate-spin' : '')} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

