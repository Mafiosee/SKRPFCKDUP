export enum Sort {
  Name = 'Name',
  Quality = 'Quality',
}

type SortConfigItem = {
  name: string
}

export const SortConfig: Record<Sort, SortConfigItem> = {
  [Sort.Name]: {
    name: 'По имени (А-Z)',
  },
  [Sort.Quality]: {
    name: 'По качеству',
  },
}
