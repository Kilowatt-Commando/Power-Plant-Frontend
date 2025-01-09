import React from 'react'
import { Table } from '@/components/Shared/Table/Table'
import ManagePowerPlantActionButtons from '@/app/power-plants/manage/ManagePowerPlantActionButtons'
import { PowerPlant } from '@/schemas/PowerPlant'

export default async function ManagePowerPlantsPage() {
  const plants = await fetch(`${process.env.DATA_API}/power-plants?count=20`, { cache: 'no-store' }).then((res) => res.json() as Promise<PowerPlant[]>)

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Manage Power Plants</h1>

      <Table<PowerPlant>
        items={plants}
        filterDisplayedProperties={['id', 'name', 'rpm', 'waterThroughput', 'outputVoltage']}
        propertyClasses={{
          name: '',
          waterThroughput: 'hidden @[610px]:table-cell',
          rpm: 'hidden @[510px]:table-cell',
          outputVoltage: 'hidden @[770px]:table-cell',
        }}
        actionButtons={ManagePowerPlantActionButtons}
      />
    </div>
  )
}
