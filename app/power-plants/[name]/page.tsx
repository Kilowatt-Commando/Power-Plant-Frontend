import React from 'react'
import { PowerPlant } from '@/schemas/PowerPlant'
import PowerPlantDetailProvider from '@/components/power-plants/[id]/PowerPlantDetailProvider'
import DetailsActionButtons from '@/components/power-plants/[id]/DetailsActionButtons'
import WatergateManagementView from '@/components/power-plants/[id]/WatergateManagementView'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export const metadata: Metadata = {
  title: 'Power Plant Details',
  description: 'Details of a specific power plant',
}
export default async function PowerPlantDetailPage({ params: { name } }: { params: { name: string | undefined } }) {
  const token = cookies().get('token')?.value
  const powerPlant = await fetch(`${process.env.DATA_API}/powerplants/latest/${name}`, {
    cache: 'no-cache',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json() as Promise<PowerPlant[]>)
    .then((plants) => plants?.at(0))
  if (!powerPlant) return notFound()

  return (
    <PowerPlantDetailProvider powerPlant={powerPlant} base_endpoint={`${process.env.CONTROL_API}/powerplant`}>
      <div className='flex justify-center items-center p-6'>
        <div className='border border-gray-300 dark:border-neutral-500 rounded-lg p-6 bg-white dark:bg-neutral-700 dark:shadow-neutral-800 max-w-[600px] w-full shadow-md'>
          <h1 className='text-2xl font-bold mb-6 text-center'>{powerPlant.name}</h1>
          <table className='table-auto border-collapse w-full mb-6'>
            <tbody>
              {Object.entries(powerPlant).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex flex-col gap-4'>
            <DetailsActionButtons />
            <WatergateManagementView />
          </div>
        </div>
      </div>
    </PowerPlantDetailProvider>
  )
}
