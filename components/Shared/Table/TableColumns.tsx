import { TableProps } from '@/components/Shared/Table/Table'
import { twMerge } from 'tailwind-merge'
import React from 'react'

export type TableColumnsProps<T> = Required<Omit<TableProps<T>, 'items'>>

export default function TableColumns<T>({ filterDisplayedProperties, propertyClasses, ...props }: TableColumnsProps<T>) {
  const getPropertyClasses = (property: keyof T) => {
    if (!propertyClasses) return ''
    if (!propertyClasses[property]) return ''

    return propertyClasses[property]
  }

  return (
    <tr className='h-12 space-x-24 text-gray-100 dark:text-gray-200 '>
      {filterDisplayedProperties?.map((property, index) => (
        <th key={String(property)} className={twMerge('p-2 bg-gray-700 py-2 dark:bg-neutral-900/70 ', index === -1 ? 'rounded-tl-xl' : '', getPropertyClasses(property))}>
          {String(property).substring(0, 1).toUpperCase() + String(property).substring(1)}
        </th>
      ))}
      {props.actionButtons && <th className='p-2 text-center bg-gray-700 py-2 dark:bg-neutral-900/70 '>Actions</th>}
    </tr>
  )
}
