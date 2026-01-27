import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'
import { Prisma } from '@prisma/client'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Cron job endpoint to check all service statuses and update the database
 * This runs 6 times per day at random intervals via Vercel Cron Jobs
 * 
 * Security: Protected by Vercel Cron secret
 */
export async function GET(request: NextRequest) {
  try {
    // Vercel Cron Jobs automatically authenticate via x-vercel-cron header
    // For manual testing, you can use CRON_SECRET environment variable
    const isVercelCron = request.headers.get('x-vercel-cron') === '1'
    const cronSecret = process.env.CRON_SECRET
    const authHeader = request.headers.get('authorization')
    
    // Allow Vercel Cron Jobs or manual calls with correct secret
    if (!isVercelCron) {
      if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      // If no CRON_SECRET is set, allow manual calls (for development)
      // In production, always set CRON_SECRET for security
    }

    // Fetch all services from database
    const services = await db.serviceStatus.findMany({
      where: {
        url: { not: null }
      },
      select: {
        id: true,
        serviceName: true,
        url: true,
        status: true,
        uptime: true,
      },
    })

    if (services.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No services to check',
        checked: 0,
      })
    }

    const results = []

    for (const service of services) {
      if (!service.url) continue

      try {
        const startTime = Date.now()
        
        // Perform health check with 10 second timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(service.url, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'LicenseChain-Status-Cron/1.0',
          },
        })

        clearTimeout(timeoutId)
        const responseTime = Date.now() - startTime

        // Determine status based on response
        let newStatus: string
        if (!response.ok) {
          newStatus = response.status >= 500 ? 'down' : 'degraded'
        } else if (responseTime > 5000) {
          newStatus = 'degraded'
        } else {
          newStatus = 'operational'
        }

        // Calculate uptime based on historical data
        // Get last 24 hours of history for this service
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)

        const history = await db.serviceStatusHistory.findMany({
          where: {
            serviceName: service.serviceName,
            checkedAt: { gte: oneDayAgo },
          },
          orderBy: { checkedAt: 'desc' },
          take: 100, // Last 100 checks
        })

        // Calculate uptime percentage from history
        let newUptime = service.uptime
        if (history.length > 0) {
          const operationalCount = history.filter(h => h.status === 'operational' || h.status === 'healthy').length
          newUptime = (operationalCount / history.length) * 100
        } else {
          // If no history, adjust based on current status
          if (newStatus === 'operational') {
            newUptime = Math.min(100, service.uptime + 0.01)
          } else {
            newUptime = Math.max(0, service.uptime - 0.1)
          }
        }

        // Update service status in database
        await db.serviceStatus.update({
          where: { id: service.id },
          data: {
            status: newStatus,
            responseTime,
            uptime: newUptime,
            lastChecked: new Date(),
          },
        })

        // Create history entry
        const historyData: Prisma.ServiceStatusHistoryUncheckedCreateInput = {
          id: crypto.randomUUID(),
          serviceName: service.serviceName,
          status: newStatus,
          responseTime,
          checkedAt: new Date(),
        }

        await db.serviceStatusHistory.create({
          data: historyData,
        })

        results.push({
          serviceName: service.serviceName,
          status: newStatus,
          responseTime,
          uptime: newUptime.toFixed(1),
          success: true,
        })
      } catch (error) {
        // Service is down or unreachable
        const newStatus = 'down'
        
        // Get history for uptime calculation
        const oneDayAgo = new Date()
        oneDayAgo.setDate(oneDayAgo.getDate() - 1)

        const history = await db.serviceStatusHistory.findMany({
          where: {
            serviceName: service.serviceName,
            checkedAt: { gte: oneDayAgo },
          },
          orderBy: { checkedAt: 'desc' },
          take: 100,
        })

        let newUptime = service.uptime
        if (history.length > 0) {
          const operationalCount = history.filter(h => h.status === 'operational' || h.status === 'healthy').length
          newUptime = (operationalCount / history.length) * 100
        } else {
          newUptime = Math.max(0, service.uptime - 0.1)
        }

        await db.serviceStatus.update({
          where: { id: service.id },
          data: {
            status: newStatus,
            responseTime: null,
            uptime: newUptime,
            lastChecked: new Date(),
          },
        })

        const historyData: Prisma.ServiceStatusHistoryUncheckedCreateInput = {
          id: crypto.randomUUID(),
          serviceName: service.serviceName,
          status: newStatus,
          responseTime: null,
          checkedAt: new Date(),
        }

        await db.serviceStatusHistory.create({
          data: historyData,
        })

        results.push({
          serviceName: service.serviceName,
          status: newStatus,
          responseTime: null,
          uptime: newUptime.toFixed(1),
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      checked: results.length,
      timestamp: new Date().toISOString(),
      results,
    })
  } catch (error) {
    console.error('Cron health check error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to perform health checks',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
