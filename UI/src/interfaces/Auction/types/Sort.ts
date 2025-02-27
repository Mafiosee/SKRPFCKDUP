export enum Sort {
  Popularity = 'Popularity',
  Price = 'Price',
  Location = 'Location',
}

export const SortName: Record<Sort, string> = {
  [Sort.Popularity]: 'По популярности',
  [Sort.Price]: 'По цене',
  [Sort.Location]: 'По вледению',
}
