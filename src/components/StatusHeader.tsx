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
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">LicenseChain Status</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Real-time monitoring of all our services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Last updated</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lastUpdated}</p>
            </div>
            
            <button
              onClick={onToggleDarkMode}
              className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

