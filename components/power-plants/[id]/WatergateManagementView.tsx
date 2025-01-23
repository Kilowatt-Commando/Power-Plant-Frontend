'use client'
import { usePowerPlantDetailContext } from '@/components/power-plants/[id]/PowerPlantDetailProvider'
import React from 'react'

export default function WatergateManagementView() {
  const { manageWaterflow, waterGateConfig, setWaterGateConfig, powerPlant, base_endpoint } = usePowerPlantDetailContext()

  if (!manageWaterflow) return null

  const updateWaterGateConfig = async () => {
    try {
      const response = await fetch(`${base_endpoint}/${powerPlant.name}/gateClosure`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ closure: String(waterGateConfig) }),
      })
      if (response.ok) {
        alert(`Wasser-Durchsatzmege für ${powerPlant.name} erfolgreich zu ${waterGateConfig} umgestellt`)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Fehler beim Ändern der Wasser-Durchsatzmenge')
      }
    } catch (error) {
      console.error('Error Fehler beim Ändern der Wasser-Durchsatzmenge:', error)
      alert('Fehler beim Ändern der Wasser-Durchsatzmenge')
    }
  }

  return (
    <div className='mt-4 flex flex-col gap-4 items-center w-full'>
      <select value={waterGateConfig} defaultValue='open' onChange={(e) => setWaterGateConfig(e.target.value as any)} className='p-2 border dark:text-black rounded-md shadow-sm w-full'>
        <option value='open'>OPEN</option>
        <option value='closed'>CLOSED</option>
        <option value='quarter'>QUARTER</option>
        <option value='half'>HALF</option>
        <option value='threeQuarter'>THREE_QUARTERS</option>
      </select>
      <button type='button' className='w-full bg-yellow-500 dark:bg-yellow-600 hover:bg-yellow-700 py-2 px-4 rounded-md' onClick={updateWaterGateConfig}>
        Change
      </button>
    </div>
  )
}
