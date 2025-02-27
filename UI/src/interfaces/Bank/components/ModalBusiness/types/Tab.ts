export enum Tab {
  Warehouse = 'Warehouse',
  Rent = 'Rent',
}

export const TabName: Record<Tab, string> = {
  [Tab.Warehouse]: 'Хранилище',
  [Tab.Rent]: 'Аренда',
}
