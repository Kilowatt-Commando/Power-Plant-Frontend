import { TableProps } from '@/components/Shared/Table/Table'
import getObjectKeys from '@/lib/getObjectKeys'

export default function useTableProps<T = object>({ ...props }: TableProps<T>): Required<TableProps<T>> {
  const defaultProps: Required<TableProps<T>> = {
    filterDisplayedProperties: getObjectKeys<T>(props.items.at(0)),
    propertyClasses: {} as { [key in keyof Partial<T>]: string },
    actionButtons: () => null,
    ...props,
  }

  return defaultProps
}
