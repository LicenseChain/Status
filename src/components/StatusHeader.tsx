'use client'

import { Activity, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusHeaderProps {
  lastUpdated: string
  onRefresh: () => void
  isRefreshing: boolean
}

export function StatusHeader({ lastUpdated, onRefresh, isRefreshing }: StatusHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LicenseChain Status</h1>
              <p className="text-sm text-gray-500">Real-time status of all our services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-900">{lastUpdated}</p>
            </div>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={cn('h-4 w-4 mr-2', isRefreshing ? 'animate-spin' : '')} />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

