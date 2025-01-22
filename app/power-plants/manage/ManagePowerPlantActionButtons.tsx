'use client'

import { TableActionButtonProps } from '@/components/Shared/Table/Table'
import { useTableRowAnimationContext } from '@/components/Shared/Table/TableRowAnimationContextProvider'

export default function ManagePowerPlantActionButtons<T>(props: TableActionButtonProps<T>) {
  const { scope, animate } = useTableRowAnimationContext()
  const animateDeletion = async () => {
    await animate(scope.current, { background: 'rgba(246,54,54,0.26)', overflow: 'none' }, { duration: 0.1 })
    await animate(scope.current, { x: -25, y: 0, opacity: 0.75 }, { duration: 0.5 })
    await animate(scope.current, { opacity: 1, x: 0, background: '' }, { duration: 0.25 })

    try {
      const response = await fetch(`http://188.245.157.176:8080/powerplant/${props.item}/stop`, {
        method: 'PUT',
      })

      if (response.ok) {
        alert('Powerplant erfolgreich gestoppt')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Stoppen fehlgeschlagen')
      }
    } catch (error) {
      console.error('Stoppen fehlgeschlagen:', error)
      alert('Stoppen fehlgeschlagen')
    }
  }

  const animateStart = async () => {
    await animate(scope.current, { background: 'rgba(131,246,54,0.26)', overflow: 'none' }, { duration: 0.1 })
    await animate(scope.current, { x: 25, y: 0, opacity: 0.75 }, { duration: 0.5 })
    await animate(scope.current, { opacity: 1, x: 0, background: '' }, { duration: 0.25 })

    try {
      const response = await fetch(`http://188.245.157.176:8080/powerplant/${props.item}/start`, {
        method: 'PUT',
      })

      if (response.ok) {
        alert('Powerplant erfolgreich gestartet')
      } else {
        const errorData = await response.json()
        alert(errorData.message || 'Starten fehlgeschlagen')
      }
    } catch (error) {
      console.error('Starten fehlgeschlagen:', error)
      alert('Starten fehlgeschlagen')
    }
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
