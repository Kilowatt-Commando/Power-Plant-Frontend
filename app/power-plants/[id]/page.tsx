'use client'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Power Plant Details',
}
export default function PowerPlantDetailPage({ params: { id: powerPlantId } }: { params: { id: string } }) {
  return <div>Power Plant Detail Page: {powerPlantId}</div>
}
