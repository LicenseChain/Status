'use client'

import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  description: string
  lastChecked: string
  responseTime?: number
  icon: React.ComponentType<{ className?: string }>
  uptime: string
  category: 'core' | 'infrastructure' | 'payment'
}

interface StatusCardProps {
  service: ServiceStatus
}

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
    label: 'Operational',
    gradient: 'from-green-500 to-emerald-500'
  },
  degraded: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
    label: 'Degraded Performance',
    gradient: 'from-yellow-500 to-orange-500'
  },
  outage: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
    label: 'Service Outage',
    gradient: 'from-red-500 to-pink-500'
  },
  maintenance: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    label: 'Maintenance',
    gradient: 'from-blue-500 to-indigo-500'
  }
}

export function StatusCard({ service }: StatusCardProps) {
  const config = statusConfig[service.status]
  const StatusIcon = config.icon
  const ServiceIcon = service.icon

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Status Header */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r',
        config.gradient
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl">
              <ServiceIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{service.name}</h3>
              <p className="text-white/80 text-sm">{service.uptime} uptime</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusIcon className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">{config.label}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {service.description}
        </p>
        
        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Last checked</span>
            <span className="font-medium text-gray-900 dark:text-white">{service.lastChecked}</span>
          </div>
          {service.responseTime && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Response time</span>
              <span className="font-medium text-gray-900 dark:text-white">{service.responseTime}ms</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Uptime</span>
            <span className="font-medium text-green-600 dark:text-green-400">{service.uptime}</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={cn(
        'h-1 w-full',
        service.status === 'operational' ? 'bg-green-500' :
        service.status === 'degraded' ? 'bg-yellow-500' :
        service.status === 'outage' ? 'bg-red-500' : 'bg-blue-500'
      )}></div>
    </div>
  )
}
