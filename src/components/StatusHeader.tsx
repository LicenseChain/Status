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
      "sticky top-0 z-50",
      isDarkMode ? "glass-header-dark" : "glass-header"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg backdrop-blur-sm border border-white/20">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LicenseChain Status</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Real-time monitoring of all our services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right px-4 py-2 rounded-xl backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Last updated</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lastUpdated}</p>
            </div>
            
            <button
              onClick={onToggleDarkMode}
              className="inline-flex items-center justify-center w-10 h-10 backdrop-blur-sm bg-white/20 dark:bg-black/20 text-gray-700 dark:text-gray-200 rounded-xl border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm text-white rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

