import React from 'react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { PowerPlant } from '@/schemas/PowerPlant'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Available Power Plants',
  description: 'List of currently available power plants',
}

export default async function PowerPlantsPage() {
  const plants = await fetch(`${process.env.DATA_API}/power-plants?count=10`, { cache: 'no-cache' }).then((res) => res.json() as Promise<PowerPlant[]>)

  return (
    <div className='@container'>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Available Power Plants</h1>
      <ul className='grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4 @[94rem]:grid-cols-5 @[110rem]:grid-cols-6 gap-6 px-2'>
        {plants.map((plant) => (
          <PowerPlantPreview key={plant.name} {...plant} />
        ))}
      </ul>
    </div>
  )
}
