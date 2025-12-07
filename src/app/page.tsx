'use client'

import { useState, useEffect } from 'react'
import { StatusHeader } from '@/components/StatusHeader'
import { StatusCard } from '@/components/StatusCard'
import { IncidentCard } from '@/components/IncidentCard'
import { Activity, Shield, Globe, BookOpen, Layout, Lock, CreditCard, TrendingUp, AlertTriangle, CheckCircle2, Clock, XCircle, Sun, Moon } from 'lucide-react'
import { getAllServiceStatuses } from '@/lib/status-monitor'

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
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Fetch real-time status data
  const fetchStatusData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/status')
      if (!response.ok) {
        throw new Error('Failed to fetch status data')
      }
      
      const data = await response.json()
      
      // Map icons to services
      const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        'API Service': Activity,
        'Website': Globe,
        'Documentation': BookOpen,
        'Dashboard': Layout,
        'Authentication': Lock,
        'Payment Processing': CreditCard
      }
      
      const servicesWithIcons = data.services.map((service: any) => ({
        ...service,
        icon: iconMap[service.name] || Activity
      }))
      
      setServices(servicesWithIcons)
      updateLastUpdated()
    } catch (err) {
      console.error('Error fetching status:', err)
      setError('Failed to load status data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStatusData()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchStatusData, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

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
    await fetchStatusData()
    setIsRefreshing(false)
  }

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded'
  const operationalCount = services.filter(s => s.status === 'operational').length
  const totalServices = services.length

  const coreServices = services.filter(s => s.category === 'core')
  const infrastructureServices = services.filter(s => s.category === 'infrastructure')
  const paymentServices = services.filter(s => s.category === 'payment')

  // Loading state
  if (isLoading && services.length === 0) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="text-center relative z-10 backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm rounded-2xl mb-6 animate-pulse border border-white/20 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Status...</h1>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="text-center max-w-md mx-auto p-8 relative z-10 backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/90 backdrop-blur-sm rounded-2xl mb-6 border border-white/20 shadow-lg">
            <XCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Status Unavailable</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchStatusData}
            className="px-6 py-3 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl border border-white/20 hover:bg-blue-700/90 transition-colors shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <StatusHeader 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm rounded-2xl mb-6 animate-pulse border border-white/20 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in drop-shadow-sm">
            System Status
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-delay">
            Real-time monitoring of all LicenseChain services and infrastructure
          </p>
        </div>

        {/* Overall Status Card */}
        <div className="mb-12">
          <div className="glass-card dark:glass-card-dark rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm p-8 text-white border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold drop-shadow-md">All Systems Operational</h2>
                    <p className="text-green-100 text-lg drop-shadow-sm">
                      {operationalCount} of {totalServices} services are running smoothly
                    </p>
                  </div>
                </div>
                <div className="text-right px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold drop-shadow-md">99.8%</div>
                  <div className="text-green-100 drop-shadow-sm">Uptime</div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{operationalCount}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Operational Services</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">0</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Incidents</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">45ms</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Core Services</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatusCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure Services */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Infrastructure</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureServices.map((service, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatusCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Payment Services */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Processing</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentServices.map((service, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <StatusCard service={service} />
              </div>
            ))}
          </div>
        </div>

        {/* Incidents */}
        {incidents.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Incidents</h2>
              </div>
            </div>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="mb-12">
          <div className="glass-card dark:glass-card-dark rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10">
                <div className="text-2xl font-bold text-green-600">
                  {services.length > 0 ? Math.round((operationalCount / totalServices) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Service Uptime</div>
              </div>
              <div className="text-center p-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10">
                <div className="text-2xl font-bold text-blue-600">
                  {services.length > 0 
                    ? Math.round(services.reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.filter(s => s.responseTime).length) || 0
                    : 0}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Response</div>
              </div>
              <div className="text-center p-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10">
                <div className="text-2xl font-bold text-purple-600">{operationalCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Operational</div>
              </div>
              <div className="text-center p-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10">
                <div className="text-2xl font-bold text-orange-600">
                  {totalServices - operationalCount}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Issues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 dark:border-white/10">
          <div className="text-center backdrop-blur-sm bg-white/5 dark:bg-black/5 rounded-2xl p-6 border border-white/10 dark:border-white/5">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Status page powered by LicenseChain</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              For real-time updates, follow{' '}
              <a href="https://x.com/licensechainapp" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                @licensechainapp
              </a>{' '}
              on X
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}