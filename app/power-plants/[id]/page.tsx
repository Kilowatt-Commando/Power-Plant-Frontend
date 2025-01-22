import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Power Plant Details',
  description: 'Details of a specific power plant',
}
export default function PowerPlantDetailPage({ params: { id: powerPlantId } }: { params: { id: string } }) {
  return <div>Power Plant Detail Page: {powerPlantId}</div>
}
