'use client'

import { useState, useEffect } from 'react'
import { StatusHeader } from '@/components/StatusHeader'
import { StatusCard } from '@/components/StatusCard'
import { IncidentCard } from '@/components/IncidentCard'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  description: string
  lastChecked: string
  responseTime?: number
}

interface Incident {
  id: string
  title: string
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved'
  description: string
  createdAt: string
  updatedAt: string
  affectedServices: string[]
}

export default function StatusPage() {
  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'API Service',
      status: 'operational',
      description: 'Core API endpoints for license management and verification',
      lastChecked: '2 minutes ago',
      responseTime: 45
    },
    {
      name: 'Website',
      status: 'operational',
      description: 'Main LicenseChain website and marketing pages',
      lastChecked: '1 minute ago',
      responseTime: 120
    },
    {
      name: 'Documentation',
      status: 'operational',
      description: 'API documentation and developer guides',
      lastChecked: '3 minutes ago',
      responseTime: 89
    },
    {
      name: 'Dashboard',
      status: 'operational',
      description: 'User dashboard for license management',
      lastChecked: '2 minutes ago',
      responseTime: 156
    },
    {
      name: 'Authentication',
      status: 'operational',
      description: 'User authentication and authorization services',
      lastChecked: '1 minute ago',
      responseTime: 67
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      description: 'Stripe payment processing and webhooks',
      lastChecked: '2 minutes ago',
      responseTime: 234
    }
  ])

  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'inc-001',
      title: 'Scheduled Maintenance - API Service',
      status: 'resolved',
      description: 'We performed scheduled maintenance on our API infrastructure to improve performance and reliability.',
      createdAt: '2024-01-15 02:00 UTC',
      updatedAt: '2024-01-15 04:00 UTC',
      affectedServices: ['API Service', 'Dashboard']
    }
  ])

  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    updateLastUpdated()
    const interval = setInterval(updateLastUpdated, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const updateLastUpdated = () => {
    const now = new Date()
    setLastUpdated(now.toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }))
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    updateLastUpdated()
    setIsRefreshing(false)
  }

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded'
  const operationalCount = services.filter(s => s.status === 'operational').length
  const totalServices = services.length

  return (
    <div className="min-h-screen bg-gray-50">
      <StatusHeader 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Status */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Overall Status</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                overallStatus === 'operational' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {overallStatus === 'operational' ? 'All Systems Operational' : 'Some Issues Detected'}
              </div>
            </div>
            <p className="text-gray-600">
              {operationalCount} of {totalServices} services are operational
            </p>
          </div>
        </div>

        {/* Services Status */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <StatusCard
                key={index}
                name={service.name}
                status={service.status}
                description={service.description}
                lastChecked={service.lastChecked}
                responseTime={service.responseTime}
              />
            ))}
          </div>
        </div>

        {/* Incidents */}
        {incidents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Incidents</h2>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Status page powered by LicenseChain</p>
            <p className="mt-2">
              For real-time updates, follow{' '}
              <a href="https://twitter.com/licensechain" className="text-blue-600 hover:text-blue-800">
                @licensechain
              </a>{' '}
              on Twitter
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}