import React from 'react'
import { Table } from '@/components/Shared/Table/Table'
import ManagePowerPlantActionButtons from '@/app/power-plants/manage/ManagePowerPlantActionButtons'
import { PowerPlant } from '@/schemas/PowerPlant'

export default async function ManagePowerPlantsPage() {
  const plants = await fetch('http://localhost:3000/api/power-plants?count=20', { cache: 'no-store' }).then((res) => res.json() as Promise<PowerPlant[]>)

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
