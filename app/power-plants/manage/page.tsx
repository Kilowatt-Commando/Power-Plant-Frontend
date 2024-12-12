import PowerPlantProps, { createDummyPowerPlants } from '@/typings/Shared/PowerPlant'
import React from 'react'
import { Table } from '@/components/Shared/Table/Table'
import ManagePowerPlantActionButtons from '@/app/power-plants/manage/ManagePowerPlantActionButtons'

export default async function ManagePowerPlantsPage() {
  const plants = createDummyPowerPlants(20)

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Manage Power Plants</h1>

      <Table<PowerPlantProps>
        items={plants}
        filterDisplayedProperties={['id', 'name', 'capacity', 'metric2', 'metric3']}
        propertyClasses={{
          name: 'text-blue-500',
          capacity: 'hidden @md:table-cell text-yellow-500',
          metric2: 'hidden @xl:table-cell text-red-500',
          metric3: 'hidden @2xl:table-cell text-green-500',
        }}
        actionButtons={ManagePowerPlantActionButtons}
      />
    </div>
  )
}
