'use client'

import { TableActionButtonProps } from '@/components/Shared/Table/Table'
import { useTableRowAnimationContext } from '@/components/Shared/Table/TableRowAnimationContextProvider'
import React from 'react'

export default function ManagePowerPlantActionButtons<T>(props: TableActionButtonProps<T>) {
  const { animate, scope } = useTableRowAnimationContext()
  const animateDeletion = async () => {
    await animate(scope.current, { background: 'rgba(246,54,54,0.56)', overflow: 'none' }, { duration: 0.1 })
    animate(scope.current, { x: -50, y: 0 }, { duration: 0.5 })
    await animate(scope.current, { opacity: 0, display: 'none' }, { duration: 0.5 })
  }

  return (
    <>
      <button className='py-1.5 px-2.5 rounded-md dark:bg-red-500/20' type='button' onClick={animateDeletion}>
        Delete
      </button>
    </>
  )
}
