import { NextResponse } from 'next/server'
import { getAllServiceStatuses } from '@/lib/status-monitor'

export async function GET() {
  try {
    const services = await getAllServiceStatuses()
    
    const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 'degraded'
    const operationalCount = services.filter(s => s.status === 'operational').length
    const totalServices = services.length
    
    // Calculate average response time
    const avgResponseTime = services
      .filter(s => s.responseTime)
      .reduce((acc, s) => acc + (s.responseTime || 0), 0) / services.filter(s => s.responseTime).length || 0
    
    return NextResponse.json({
      status: overallStatus,
      services,
      metrics: {
        operational: operationalCount,
        total: totalServices,
        avgResponseTime: Math.round(avgResponseTime),
        uptime: '99.8%'
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
