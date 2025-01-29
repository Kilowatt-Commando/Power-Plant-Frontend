'use client'

import { usePowerPlantDetailContext } from '@/components/power-plants/[id]/PowerPlantDetailProvider'
import React from 'react'
import { toast } from 'react-toastify'

export default function DetailsActionButtons() {
  const { manageWaterflow, base_endpoint, powerPlant, toggleManageWaterflow } = usePowerPlantDetailContext()

  const updatePowerPlant = async (action: 'start' | 'stop') => {
    const token = localStorage.getItem('token')
    return await fetch(`${base_endpoint}/${powerPlant.name}/${action}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const handleStart = async (): Promise<void> => {
    if (localStorage.getItem('isAdmin') !== '[ROLE_ADMIN]') {
      toast('You have no permission for this action')
      return
    }
    await updatePowerPlant('start')
      .then((res) => {
        if (!res.ok) {
          return toast('Failed to start the Power Plant!', { type: 'error' })
        }

        toast('Power Plant started successfully', { type: 'success' })
      })
      .catch((error) => {
        toast(`Failed to start power plant, ${error}`, { type: 'error' })
      })
  }

  const handleStop = async (): Promise<void> => {
    if (localStorage.getItem('isAdmin') !== '[ROLE_ADMIN]') {
      toast('You have no permission for this action')
      return
    }
    await updatePowerPlant('stop')
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          return toast('Failed to stop the Power Plant!', { type: 'error' })
        }

        toast('Power Plant stopped successfully', { type: 'success' })
      })
      .catch((error) => {
        toast(`Failed to stop power plant, ${error}`, { type: 'error' })
      })
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
