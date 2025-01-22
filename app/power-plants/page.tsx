'use client'

import React, { useEffect, useState } from 'react'
import PowerPlantPreview from '@/components/power-plants/PowerPlantPreview'
import { PowerPlant } from '@/schemas/PowerPlant'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Available Power Plants',
  description: 'List of currently available power plants',
}

const PowerPlantsPage: React.FC = () => {
  const [plants, setPlants] = useState<PowerPlant[]>([])

  useEffect(() => {
    const fetchPlants = async () => {
      console.log(localStorage.getItem('token'))
      try {
        const response = await fetch(`http://188.245.157.176:9090/api/powerplants/latest`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`Serverfehler (${response.status}):`, errorText)
          throw new Error(`Fehler: ${response.status}`)
        }
        console.log(response)
        const data = await response.json()
        console.log(data)
        setPlants(data)
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error)
      }
    }

    fetchPlants()
  }, [])

  return (
    <div className='@container'>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Available Power Plants</h1>
      <ul className='grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @6xl:grid-cols-4 @[94rem]:grid-cols-5 @[110rem]:grid-cols-6 gap-6 px-2'>
        {plants.map((plant) => (
          <PowerPlantPreview key={plant.name} {...plant} />
        ))}
      </ul>
    </div>
  )
}

export default PowerPlantsPage
