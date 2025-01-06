import React from 'react'
import { Table } from '@/components/Shared/Table/Table'
import ManagePowerPlantActionButtons from '@/app/power-plants/manage/ManagePowerPlantActionButtons'
import { createDummyPowerPlants, PowerPlant } from '@/schemas/PowerPlant'

export default async function ManagePowerPlantsPage() {
  const plants = createDummyPowerPlants(20)

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Manage Power Plants</h1>

      <Table<PowerPlant>
        items={plants}
        filterDisplayedProperties={['id', 'name', 'waterThroughput', 'rpm', 'outputVoltage']}
        propertyClasses={{
          name: '',
          waterThroughput: 'hidden @md:table-cell',
          rpm: 'hidden @xl:table-cell',
          outputVoltage: 'hidden @2xl:table-cell',
        }}
        actionButtons={ManagePowerPlantActionButtons}
      />
    </div>
  )
}
