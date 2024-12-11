import React from 'react'
import useTableProps from '@/hooks/useTableProps'
import TableColumns from '@/components/Shared/Table/TableColumns'
import TableItems from '@/components/Shared/Table/TableItems'

export interface TableActionButtonProps<T> {
  item: T
}

export interface TableProps<T = object> {
  items: T[]
  filterDisplayedProperties?: (keyof T)[]
  propertyClasses?: { [key in keyof Partial<T>]: string }
  actionButtons?: (props: TableActionButtonProps<T>) => React.ReactNode
}

export function Table<T = unknown>({ items, ...partialProvidedProps }: TableProps<T>) {
  const { ...props } = useTableProps({ items, ...partialProvidedProps })

  return (
    <table className='w-full rounded-md'>
      <thead className='text-left border dark:border-neutral-900 border-gray-700 rounded-xl '>
        <TableColumns {...props} />
      </thead>
      <tbody className='space-y-24 divide-y divide-gray-400 dark:divide-neutral-500'>
        <TableItems {...props} />
      </tbody>
    </table>
  )
}
