'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { PowerPlant } from '@/schemas/PowerPlant'
import { useState } from 'react'

export default function PowerPlantDetailPage() {
  const searchParams = useSearchParams()
  const plantData = JSON.parse(decodeURIComponent(searchParams.get('powerplant') || '{}')) as PowerPlant
  const [isManagingThroughput, setIsManagingThroughput] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>('OPEN')
  const manualPath = 'http://188.245.157.176:8080/powerplant'

  const handleStart = async (): Promise<void> => {
    try {
      const response = await fetch(`${manualPath}/${plantData.name}/start`, {
        method: 'PUT',
      })
      if (response.ok) {
        alert(`${plantData.name} erfolgreich gestartet`)
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
      const response = await fetch(`${manualPath}/${plantData.name}/stop`, {
        method: 'PUT',
      })
      if (response.ok) {
        alert(`${plantData.name} erfolgreich gestoppt`)
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Stoppen fehlgeschlagen')
      }
    } catch (error) {
      console.error('Error Stoppen fehlgeschlagen:', error)
      alert('Stoppen fehlgeschlagen')
    }
  }

  const handleManageWaterflow = async (): Promise<void> => {
    try {
      const response = await fetch(`${manualPath}/${plantData.name}/gateClosure`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ closure: String(selectedValue) }),
      })
      if (response.ok) {
        alert(`Wasser-Durchsatzmege für ${plantData.name} erfolgreich zu ${selectedValue} umgestellt`)
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
    <div className='flex justify-center items-center p-6'>
      <div className='border border-gray-300 rounded-lg p-6 bg-white max-w-[600px] w-full shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>{plantData.name}</h1>
        <table className='table-auto border-collapse w-full mb-6'>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{plantData.id}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{plantData.status}</td>
            </tr>
            <tr>
              <td>RPM</td>
              <td>{plantData.rpm}</td>
            </tr>
            <tr>
              <td>Output Voltage</td>
              <td>{plantData.outputVoltage}</td>
            </tr>
            <tr>
              <td>Water Throughput</td>
              <td>{plantData.waterThroughput}</td>
            </tr>
            <tr>
              <td>Next Weather</td>
              <td>{plantData.nextWeather}</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>{plantData.timestamp}</td>
            </tr>
          </tbody>
        </table>

        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 w-full'>
            <button type='button' className='w-full bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-md' onClick={handleStart}>
              Start
            </button>
            <button type='button' className='w-full bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md' onClick={handleStop}>
              Stop
            </button>
            <button type='button' className='w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md' onClick={() => setIsManagingThroughput(!isManagingThroughput)}>
              {isManagingThroughput ? 'Hide Throughput Management' : 'Manage Water Throughput'}
            </button>
          </div>

          {isManagingThroughput && (
            <div className='mt-4 flex flex-col gap-4 items-center w-full'>
              <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} className='p-2 border rounded-md shadow-sm w-full'>
                <option value='OPEN'>OPEN</option>
                <option value='CLOSED'>CLOSED</option>
                <option value='QUARTER'>QUARTER</option>
                <option value='HALF'>HALF</option>
                <option value='THREE_QUARTERS'>THREE_QUARTERS</option>
              </select>
              <button type='button' className='w-full bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-md' onClick={handleManageWaterflow}>
                Change
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
