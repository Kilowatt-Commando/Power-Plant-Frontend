'use client'

import { createContext, useContext, useState } from 'react'
import { PowerPlant } from '@/schemas/PowerPlant'

interface PowerPlantDetailContextProps {
  manageWaterflow: boolean
  setManageWaterflow: (value: boolean) => void
  waterGateConfig: 'open' | 'closed' | 'half' | 'quarter' | 'threeQuarter'
  setWaterGateConfig: (value: 'open' | 'closed' | 'half' | 'quarter' | 'threeQuarter') => void
  powerPlant: PowerPlant
  toggleManageWaterflow: () => void
  base_endpoint: string
}

const Context = createContext<PowerPlantDetailContextProps>({} as any)

/**
 * This component wraps the given children within a Context to provide powerplant-details related information to nested components.
 * @param children
 * @param powerPlant The powerPlant that is being displayed on the page
 * @param base_endpoint The base api endpoint used for in- / outgoing requests
 */
export default function PowerPlantDetailProvider({ children, powerPlant, base_endpoint }: { powerPlant: PowerPlant; children: React.ReactNode; base_endpoint: string }) {
  const [manageWaterflow, setManageWaterflow] = useState<boolean>(false)
  const [waterGateConfig, setWaterGateConfig] = useState<'open' | 'closed' | 'half' | 'quarter' | 'threeQuarter'>('open')

  const toggleManageWaterflow = () => {
    setManageWaterflow((prev) => !prev)
  }

  return <Context.Provider value={{ powerPlant, base_endpoint, toggleManageWaterflow, manageWaterflow, setManageWaterflow, waterGateConfig, setWaterGateConfig }}>{children}</Context.Provider>
}

export function usePowerPlantDetailContext(): PowerPlantDetailContextProps | never {
  const props = useContext(Context)

  if (!props) {
    throw new Error('usePowerPlantDetailContext must be used within a PowerPlantDetailProvider')
  }

  return props
}
