import React from 'react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { PowerPlant } from '@/schemas/PowerPlant'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Available Power Plants',
  description: 'List of currently available power plants',
}

export default async function PowerPlantsPage() {
  const token = cookies().get('token')?.value
  let plants: PowerPlant[] = []
  if (!token) {
    return <h1>Please login in order to fetch the Power Plants</h1>
  }
  plants = await fetch(`${process.env.DATA_API}/powerplants/latest`, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json() as Promise<PowerPlant[]>)

  return (
    <div className='@container'>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Available Power Plants</h1>
      <ul className='grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4 @[94rem]:grid-cols-5 @[110rem]:grid-cols-6 gap-6 px-2'>
        {plants.map((plant, index) => (
          <PowerPlantPreview key={plant.name} {...plant} id={(index + 1) * 10} />
        ))}
      </ul>
    </div>
  )
}
