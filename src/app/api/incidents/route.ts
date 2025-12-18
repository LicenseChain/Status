import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')

    const where: any = {}
    if (status) {
      where.status = status
    }

    const incidents = await db.incident.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit
    })

    return NextResponse.json({
      success: true,
      incidents: incidents.map(incident => ({
        id: incident.id,
        title: incident.title,
        description: incident.description,
        status: incident.status,
        affectedServices: incident.affectedServices,
        createdAt: incident.createdAt.toISOString(),
        updatedAt: incident.updatedAt.toISOString(),
        resolvedAt: incident.resolvedAt?.toISOString()
      }))
    })
  } catch (error) {
    console.error('Failed to fetch incidents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'

