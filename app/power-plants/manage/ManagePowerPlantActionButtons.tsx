'use client'

import { TableActionButtonProps } from '@/components/Shared/Table/Table'
import { useTableRowAnimationContext } from '@/components/Shared/Table/TableRowAnimationContextProvider'
import { useEnvironmentVariables } from '@/components/power-plants/manage/EnvironmentVariablesProvider'
import { toast } from 'react-toastify'
import { PowerPlant } from '@/schemas/PowerPlant'

export default function ManagePowerPlantActionButtons<T>(props: TableActionButtonProps<T>) {
  const { scope, animate } = useTableRowAnimationContext()
  const { CONTROL_API } = useEnvironmentVariables()
  const { name } = props.item as PowerPlant

  const updatePowerPlant = async (action: 'start' | 'stop') => {
    return await fetch(`${CONTROL_API}/powerplant/${name}/${action}`, {
      method: 'PUT',
    })
  }

  const animateDeletion = async () => {
    await animate(scope.current, { background: 'rgba(246,54,54,0.26)', overflow: 'none' }, { duration: 0.1 })
    await animate(scope.current, { x: -25, y: 0, opacity: 0.75 }, { duration: 0.5 })
    await animate(scope.current, { opacity: 1, x: 0, background: '' }, { duration: 0.25 })

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

  const animateStart = async () => {
    await animate(scope.current, { background: 'rgba(131,246,54,0.26)', overflow: 'none' }, { duration: 0.1 })
    await animate(scope.current, { x: 25, y: 0, opacity: 0.75 }, { duration: 0.5 })
    await animate(scope.current, { opacity: 1, x: 0, background: '' }, { duration: 0.25 })

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

  return (
    <>
      <button className='py-1.5 px-2.5 rounded-md bg-red-500/30 dark:bg-red-500/20' type='button' onClick={animateDeletion}>
        Shutdown
      </button>
      <button className='py-1.5 px-2.5 rounded-md bg-green-500/30 dark:bg-green-500/20' type='button' onClick={animateStart}>
        Start
      </button>
    </>
  )
}
