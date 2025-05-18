import { UIKitSelectItem } from '../../../ui-kit/Select/data/Item'

export enum Sort {
  Amount = 'Amount',
  Weight = 'Weight',
  Type = 'Type',
}

export const SortName: Record<Sort, string> = {
  [Sort.Amount]: 'По количеству',
  [Sort.Weight]: 'По весу',
  [Sort.Type]: 'По типу',
}

export const SortList: UIKitSelectItem[] = Object.values(Sort).map((sort) => ({
  id: sort,
  name: SortName[sort],
}))
