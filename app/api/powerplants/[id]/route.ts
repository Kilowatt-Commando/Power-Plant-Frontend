import { NextRequest, NextResponse } from 'next/server'
import { createDummyPowerPlants } from '@/schemas/PowerPlant'

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl

  const powerPlant = createDummyPowerPlants(1)

  return NextResponse.json(powerPlant[0])
}
