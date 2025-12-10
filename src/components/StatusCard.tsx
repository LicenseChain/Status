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
    <div className={cn(
      "group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
      "glass-card dark:glass-card-dark"
    )}>
      {/* Status Header */}
      <div className={cn(
        'px-6 py-4 bg-gradient-to-r backdrop-blur-sm',
        config.gradient,
        'border-b border-white/20'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
              <ServiceIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white drop-shadow-md">{service.name}</h3>
              <p className="text-white/90 text-sm drop-shadow-sm">{service.uptime} uptime</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20">
            <StatusIcon className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm drop-shadow-sm">{config.label}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {service.description}
        </p>
        
        {/* Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm p-2 rounded-lg glass-card dark:glass-card-dark">
            <span className="text-muted-foreground">Last checked</span>
            <span className="font-medium text-foreground">{service.lastChecked}</span>
          </div>
          {service.responseTime && (
            <div className="flex items-center justify-between text-sm p-2 rounded-lg glass-card dark:glass-card-dark">
              <span className="text-muted-foreground">Response time</span>
              <span className="font-medium text-foreground">{service.responseTime}ms</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm p-2 rounded-lg glass-card dark:glass-card-dark">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-medium text-green-600 dark:text-green-400">{service.uptime}</span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={cn(
        'h-1 w-full backdrop-blur-sm',
        service.status === 'operational' ? 'bg-green-500/80' :
        service.status === 'degraded' ? 'bg-yellow-500/80' :
        service.status === 'outage' ? 'bg-red-500/80' : 'bg-blue-500/80'
      )}></div>
    </div>
  )
}
