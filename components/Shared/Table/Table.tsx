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

  hasActionButtons?: boolean
  actionButtons?: (props: TableActionButtonProps<T>) => React.ReactNode
}

/**
 * This component renders a table for a given set of items
 * @param items

 @example
 <Table<AnyItem>
   items={items}
   filterDisplayedProperties={[ keys of an item that shall be displayed, if not supplied all keys will be displayed ]}
   propertyClasses={
     {
       // ...key's of each item and the class you want to apply to it
       name: 'text-blue-500',
     }
   }
   actionButtons={
     // Client Component that renders the action buttons for each item
   }
 </Table>
 * @constructor
 */
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
