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
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Investigating'
  },
  identified: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Identified'
  },
  monitoring: {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Monitoring'
  },
  resolved: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Resolved'
  }
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const config = statusConfig[incident.status]
  const Icon = config.icon

  return (
    <div className={cn(
      'rounded-lg border p-6 mb-4',
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className={cn('h-5 w-5 mt-0.5', config.color)} />
          <h3 className="text-lg font-semibold text-gray-900">{incident.title}</h3>
        </div>
        <span className={cn(
          'px-3 py-1 rounded-full text-sm font-medium',
          config.color,
          config.bgColor
        )}>
          {config.label}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{incident.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Affected services:</span>
          <span>{incident.affectedServices.join(', ')}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Created:</span>
          <span>{incident.createdAt}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Last updated:</span>
          <span>{incident.updatedAt}</span>
        </div>
      </div>
    </div>
  )
}

