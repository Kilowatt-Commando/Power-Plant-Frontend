import { TableProps } from '@/components/Shared/Table/Table'
import TableItem from '@/components/Shared/Table/TableItem'

export type TableItemsProps<T = object> = Required<TableProps<T>>

export default function TableItems<T>({ items, ...props }: TableItemsProps<T>) {
  return items.map((item) => <TableItem item={item} {...props} key={Math.random()} />)
}
