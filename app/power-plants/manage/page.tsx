import React from 'react'
import { Table } from '@/components/Shared/Table/Table'
import ManagePowerPlantActionButtons from '@/app/power-plants/manage/ManagePowerPlantActionButtons'
import { PowerPlant } from '@/schemas/PowerPlant'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Manage Power Plants',
}
export default async function ManagePowerPlantsPage() {
  const token = cookies().get('token')?.value
  let plants: PowerPlant[] = []
  if (!token) {
    return <h1>Please login in order to manage the Power Plants</h1>
  }
  plants = await fetch(`${process.env.DATA_API}/powerplants/latest`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json() as Promise<PowerPlant[]>)

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Manage Power Plants</h1>

      <Table<PowerPlant>
        items={plants}
        filterDisplayedProperties={['id', 'name', 'rpm', 'waterThroughput', 'outputVoltage', 'status']}
        propertyClasses={{
          name: '',
          status: '',
          waterThroughput: 'hidden @[610px]:table-cell',
          rpm: 'hidden @[510px]:table-cell',
          outputVoltage: 'hidden @[770px]:table-cell',
        }}
        actionButtons={ManagePowerPlantActionButtons}
      />
    </div>
  )
}
