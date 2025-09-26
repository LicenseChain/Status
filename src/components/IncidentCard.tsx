'use client'

import { AlertTriangle, Clock, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  description: string
  createdAt: string
  updatedAt: string
  affectedServices: string[]
}

interface IncidentCardProps {
  incident: Incident
}

const statusConfig = {
  investigating: {
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    label: 'Investigating',
    gradient: 'from-red-500 to-pink-500'
  },
  identified: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    label: 'Identified',
    gradient: 'from-yellow-500 to-orange-500'
  },
  monitoring: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    label: 'Monitoring',
    gradient: 'from-blue-500 to-indigo-500'
  },
  resolved: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    label: 'Resolved',
    gradient: 'from-green-500 to-emerald-500'
  }
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const config = statusConfig[incident.status]
  const Icon = config.icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Status Header */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r',
        config.gradient
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{incident.title}</h3>
              <p className="text-white/80 text-sm">Incident Report</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium text-sm">{config.label}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {incident.description}
        </p>
        
        {/* Details */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Affected Services</h4>
            <div className="flex flex-wrap gap-2">
              {incident.affectedServices.map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Created</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{incident.createdAt}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Last Updated</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{incident.updatedAt}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={cn(
        'h-1 w-full',
        incident.status === 'resolved' ? 'bg-green-500' :
        incident.status === 'investigating' ? 'bg-red-500' :
        incident.status === 'identified' ? 'bg-yellow-500' : 'bg-blue-500'
      )}></div>
    </div>
  )
}

