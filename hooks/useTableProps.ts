import { TableProps } from '@/components/Shared/Table/Table'

export default function useTableProps<T = object>({ ...props }: TableProps<T>): Required<TableProps<T>> {
  const defaultProps: Required<TableProps<T>> = {
    filterDisplayedProperties: Object.keys(props.items.at(0)),
    propertyClasses: {},
    ...props,
  }

  return defaultProps
}
