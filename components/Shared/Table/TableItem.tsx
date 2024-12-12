import React from 'react'
import { TableProps } from '@/components/Shared/Table/Table'
import TableRowAnimationContextProvider from '@/components/Shared/Table/TableRowAnimationContextProvider'
import { twMerge } from 'tailwind-merge'

export interface TableItemProps<T = object> extends Required<Omit<TableProps<T>, 'items'>> {
  item: T
}

export default function TableItem<T>({ item, filterDisplayedProperties, actionButtons: ActionButtons, ...props }: TableItemProps<T>) {
  const getClasses = (property: keyof T) => {
    if (!props.propertyClasses) return ''
    if (!props.propertyClasses[property]) return ''
    return props.propertyClasses[property]
  }
  return (
    <TableRowAnimationContextProvider
      className={twMerge(
        'h-12 transition-colors duration-200 dark:text-gray-300 border-neutral-400  dark:border-neutral-500 dark:hover:bg-neutral-700  shadow-md shadow-neutral-300 dark:shadow-neutral-900',
      )}>
      {filterDisplayedProperties.map((property, index) => (
        <td key={index.toString()} className={twMerge('p-2', getClasses(property))}>
          {String(item[property])}
        </td>
      ))}
      <td className={twMerge('flex justify-center h-12 gap-4 p-1.5', !props.hasActionButtons ? 'hidden' : '')}>
        <ActionButtons item={item} />
      </td>
    </TableRowAnimationContextProvider>
  )
}
