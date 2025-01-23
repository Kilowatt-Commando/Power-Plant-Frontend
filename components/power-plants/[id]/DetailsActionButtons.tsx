'use client'

import { usePowerPlantDetailContext } from '@/components/power-plants/[id]/PowerPlantDetailProvider'
import React from 'react'

export default function DetailsActionButtons() {
  const { manageWaterflow, base_endpoint, powerPlant, toggleManageWaterflow } = usePowerPlantDetailContext()

  const handleStart = async (): Promise<void> => {
    try {
      const response = await fetch(`${base_endpoint}/${powerPlant.name}/start`, {
        method: 'PUT',
      })
      if (response.ok) {
        alert(`${powerPlant.name} erfolgreich gestartet`)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Starten fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error Starten fehlgeschlagen:', error)
      alert('Starten fehlgeschlagen')
    }
  }

  const handleStop = async (): Promise<void> => {
    try {
      const response = await fetch(`${base_endpoint}/${powerPlant.name}/stop`, {
        method: 'PUT',
      })
      if (response.ok) {
        alert(`${powerPlant.name} erfolgreich gestoppt`)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Stoppen fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error Stoppen fehlgeschlagen:', error)
      alert('Stoppen fehlgeschlagen')
    }
  }

  return (
    <div className='flex gap-4 w-full'>
      <button type='button' className='w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md' onClick={handleStart}>
        Start
      </button>
      <button type='button' className='w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md' onClick={handleStop}>
        Stop
      </button>

      <button type='button' className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md' onClick={toggleManageWaterflow}>
        {manageWaterflow ? 'Hide Throughput Management' : 'Manage Water Throughput'}
      </button>
    </div>
  )
}
