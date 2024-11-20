import React from 'react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { createDummyPowerPlants } from '@/typings/Shared/PowerPlant'

export default async function PowerPlantsPage() {
  const plants = createDummyPowerPlants(Math.random() * 10 + 5)

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
