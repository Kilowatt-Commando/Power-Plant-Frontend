'use client'

import { useAnimate } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import React from 'react'
import { TableActionButtonProps, TableProps } from '@/components/Shared/Table/Table'

export interface TableItemProps<T = object> extends Required<Omit<TableProps<T>, 'items'>> {
  item: T
}

export default function TableItem<T>({ item, filterDisplayedProperties, ...props }: TableItemProps<T>) {
  const [scope, animate] = useAnimate()

  return (
    <tr
      key={Math.random()}
      ref={scope}
      className={twMerge(
        'h-12 transition-colors duration-200 dark:text-gray-300 border-neutral-400  dark:border-neutral-500 dark:hover:bg-neutral-700  shadow-md shadow-neutral-300 dark:shadow-neutral-900',
      )}>
      {filterDisplayedProperties.map((property, index) => (
        <td key={index.toString()} className='p-2'>
          {item[property]}
        </td>
      ))}
      <ItemActionButtons item={item} animate={animate} scope={scope} {...props} />
    </tr>
  )
}

function ItemActionButtons<T>({ item, animate, scope, actionButtons: ActionButtons }: TableActionButtonProps<T> & Required<TableProps<T>>) {
  if (!ActionButtons) return null

  return (
    <td className='flex justify-center h-12 gap-4 p-1.5'>
      <ActionButtons item={item} animate={animate} scope={scope} />
    </td>
  )
}
