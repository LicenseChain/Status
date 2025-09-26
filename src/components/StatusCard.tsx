'use client'

import { CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatusCardProps {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  description: string
  lastChecked: string
  responseTime?: number
}

const statusConfig = {
  operational: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Operational'
  },
  degraded: {
    icon: AlertCircle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Degraded Performance'
  },
  outage: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Service Outage'
  },
  maintenance: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Maintenance'
  }
}

export function StatusCard({ name, status, description, lastChecked, responseTime }: StatusCardProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className={cn(
      'rounded-lg border p-6 transition-all duration-200 hover:shadow-md',
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={cn('h-6 w-6', config.color)} />
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        </div>
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-medium',
          config.color,
          config.bgColor
        )}>
          {config.label}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Last checked: {lastChecked}</span>
        {responseTime && (
          <span>Response time: {responseTime}ms</span>
        )}
      </div>
    </div>
  )
}
