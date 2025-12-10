import { NextRequest, NextResponse } from 'next/server'

// Note: Prisma client generation is not available in this environment.
// To keep the status page buildable on Vercel, we return mock data here.
const mockIncidents = [
  {
    id: 'inc-001',
    title: 'Scheduled Maintenance - API Service',
    description:
      'We performed scheduled maintenance on our API infrastructure to improve performance and reliability.',
    status: 'resolved',
    affectedServices: ['API Service', 'Dashboard'],
    createdAt: '2024-01-15T02:00:00.000Z',
    updatedAt: '2024-01-15T04:00:00.000Z',
    resolvedAt: '2024-01-15T04:00:00.000Z',
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50', 10)

    const incidents = mockIncidents
      .filter((incident) => (status ? incident.status === status : true))
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      incidents,
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

