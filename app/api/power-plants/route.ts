import { NextRequest, NextResponse } from 'next/server'
import { createDummyPowerPlants } from '@/schemas/PowerPlant'

export function GET(req: NextRequest): NextResponse {
  const { searchParams } = req.nextUrl
  const count = searchParams.get('count')

  const powerPlants = createDummyPowerPlants(count ? parseInt(count) : 5)

  return new NextResponse(JSON.stringify(powerPlants))
}
