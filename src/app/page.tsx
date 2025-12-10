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

  const [incidents, setIncidents] = useState<Incident[]>([])

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
        'Crypto Processing': CreditCard,
        'Stripe Processing': CreditCard
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

  const fetchIncidents = async () => {
    try {
      const response = await fetch('/api/incidents?limit=10')
      if (!response.ok) {
        throw new Error('Failed to fetch incidents')
      }
      
      const data = await response.json()
      if (data.success) {
        setIncidents(data.incidents.map((incident: any) => ({
          id: incident.id,
          title: incident.title,
          status: incident.status,
          description: incident.description,
          createdAt: new Date(incident.createdAt).toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }),
          updatedAt: new Date(incident.updatedAt).toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }),
          affectedServices: incident.affectedServices
        })))
      }
    } catch (err) {
      console.error('Error fetching incidents:', err)
    }
  }

  useEffect(() => {
    fetchStatusData()
    fetchIncidents()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStatusData()
      fetchIncidents()
    }, 30000)
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
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_50%)]"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center glass-card dark:glass-card-dark rounded-3xl p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 animate-pulse shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Loading Status...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_50%)]"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8 glass-card dark:glass-card-dark rounded-3xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-6 shadow-lg">
              <XCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">Status Unavailable</h1>
            <p className="text-white/90 mb-6">{error}</p>
            <button
              onClick={fetchStatusData}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_50%)]"></div>
      </div>
      <StatusHeader 
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">

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
                <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{operationalCount}</div>
                  <div className="text-sm text-slate-600 dark:text-gray-300">Operational Services</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">0</div>
                  <div className="text-sm text-slate-600 dark:text-gray-300">Active Incidents</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">45ms</div>
                  <div className="text-sm text-slate-600 dark:text-gray-300">Avg Response Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        {coreServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Core Services</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((service, index) => (
                <StatusCard key={`core-${index}`} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Infrastructure Services */}
        {infrastructureServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Infrastructure</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {infrastructureServices.map((service, index) => (
                <StatusCard key={`infra-${index}`} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Payment Services */}
        {paymentServices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Processing</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paymentServices.map((service, index) => (
                <StatusCard key={`payment-${index}`} service={service} />
              ))}
            </div>
          </div>
        )}

        {/* Incidents */}
        {incidents.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Incidents</h2>
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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {services.length > 0 ? Math.round((operationalCount / totalServices) * 100) : 0}%
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-300">Service Uptime</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                <div className="text-2xl font-bold text-primary">
                  {services.length > 0 
                    ? Math.round(services.reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.filter(s => s.responseTime).length) || 0
                    : 0}ms
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-300">Avg Response</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                <div className="text-2xl font-bold text-primary">{operationalCount}</div>
                <div className="text-sm text-slate-600 dark:text-gray-300">Operational</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {totalServices - operationalCount}
                </div>
                <div className="text-sm text-slate-600 dark:text-gray-300">Issues</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 dark:border-white/10">
          <div className="text-center glass-card dark:glass-card-dark rounded-2xl p-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-slate-600 dark:text-gray-300">Status page powered by LicenseChain LLC</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-gray-300">
              For real-time updates, follow{' '}
              <a href="https://x.com/licensechainapp" className="text-primary hover:text-primary/80 font-medium transition-colors">
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