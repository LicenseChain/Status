import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    // Fetch all services from database
    const dbServices = await db.serviceStatus.findMany({
      orderBy: { serviceName: 'asc' },
      select: {
        id: true,
        serviceName: true,
        url: true,
        status: true,
        responseTime: true,
        lastChecked: true,
        uptime: true,
        category: true,
      },
    })

    // Map database services to frontend format
    const services = dbServices.map((service) => {
      // Map status values
      let status: 'operational' | 'degraded' | 'outage' | 'maintenance' = 'operational'
      if (service.status === 'operational' || service.status === 'healthy') {
        status = 'operational'
      } else if (service.status === 'degraded' || service.status === 'warning') {
        status = 'degraded'
      } else if (service.status === 'down' || service.status === 'outage') {
        status = 'outage'
      } else if (service.status === 'maintenance') {
        status = 'maintenance'
      }

      // Format last checked
      const lastChecked = new Date(service.lastChecked).toLocaleString('en-US', {
        timeZone: 'UTC',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })

      // Format uptime
      const uptime = `${service.uptime.toFixed(1)}%`

      // Get description based on service name
      const descriptions: Record<string, string> = {
        'API Service': 'Core API endpoints for license management and verification',
        'Website': 'LicenseChain website and marketing pages',
        'Documentation': 'API documentation and developer guides',
        'Dashboard': 'User dashboard for license management',
        'Authentication': 'User authentication and authorization services',
        'Crypto Processing': 'Crypto payment processing and webhooks',
        'Stripe Processing': 'Stripe payment processing and webhooks',
      }

      return {
        name: service.serviceName,
        status,
        description: descriptions[service.serviceName] || 'Service monitoring',
        lastChecked,
        responseTime: service.responseTime || undefined,
        uptime,
        category: service.category as 'core' | 'infrastructure' | 'payment',
        url: service.url || undefined,
      }
    })

    const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded'
    const operationalCount = services.filter(s => s.status === 'operational').length
    const totalServices = services.length
    
    // Calculate average response time
    const servicesWithResponseTime = services.filter(s => s.responseTime)
    const avgResponseTime = servicesWithResponseTime.length > 0
      ? Math.round(servicesWithResponseTime.reduce((acc, s) => acc + (s.responseTime || 0), 0) / servicesWithResponseTime.length)
      : 0

    // Calculate average uptime
    const avgUptime = services.length > 0
      ? services.reduce((acc, s) => {
          const uptimeValue = parseFloat(s.uptime.replace('%', ''))
          return acc + uptimeValue
        }, 0) / services.length
      : 100

    return NextResponse.json({
      status: overallStatus,
      services,
      metrics: {
        operational: operationalCount,
        total: totalServices,
        avgResponseTime,
        uptime: `${avgUptime.toFixed(1)}%`
      },
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Status check failed:', error)
    return NextResponse.json(
      { error: 'Failed to check service status' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
